# RoadRunner Secure customer-owned Active Directory collector
# Version 3.0.0 | Windows PowerShell 5.1+ | read-only against Active Directory
#
# This script writes one local JSON file. It never changes directory objects, installs software,
# creates scheduled tasks, opens inbound ports, or uploads data. The customer chooses whether to
# upload the resulting file to their own RoadRunner Secure application.

[CmdletBinding()]
param(
    [ValidateSet('Quick', 'Full')]
    [string]$Mode = 'Full',

    [string]$OutputPath = '',

    [switch]$ValidateOnly,

    [ValidateRange(30, 730)]
    [int]$InactiveDays = 90
)

$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'
$startedAt = [DateTime]::UtcNow
$collectorVersion = '3.0.0'

function Get-RRFinding {
    param(
        [string]$Id,
        [ValidateSet('critical', 'high', 'medium', 'low', 'informational')]
        [string]$Severity,
        [string]$Title,
        [string]$Description,
        [string]$Remediation,
        [string]$Verify,
        [object]$Evidence,
        [string[]]$Controls = @()
    )
    [pscustomobject]@{
        finding_id = $Id
        severity = $Severity
        title = $Title
        description = $Description
        remediation = $Remediation
        verify = $Verify
        evidence = $Evidence
        controls = $Controls
    }
}

function Get-RRModuleResult {
    param([object[]]$Items, [object[]]$Findings, [string[]]$Errors)
    [pscustomobject]@{
        items = @($Items)
        findings = @($Findings)
        errors = @($Errors)
    }
}

function Get-RRSafeName {
    param([object]$Value)
    if ($null -eq $Value) { return '' }
    return [string]$Value
}

if ($PSVersionTable.PSVersion.Major -lt 5) {
    throw 'Windows PowerShell 5.1 or later is required.'
}
if (-not $IsWindows -and $PSVersionTable.PSEdition -eq 'Core') {
    throw 'Run the collector on a domain-connected Windows system.'
}

Import-Module ActiveDirectory -ErrorAction Stop
$rootDse = Get-ADRootDSE
$domain = Get-ADDomain
$forest = Get-ADForest

$preflight = [pscustomobject]@{
    ready = $true
    powershell = [string]$PSVersionTable.PSVersion
    active_directory_module = [string](Get-Module ActiveDirectory).Version
    domain = $domain.DNSRoot
    forest = $forest.Name
    domain_controller = $rootDse.DnsHostName
    mode = $Mode.ToLowerInvariant()
    read_only = $true
}

if ($ValidateOnly) {
    $preflight | ConvertTo-Json -Depth 5
    exit 0
}

$modules = [ordered]@{}

# ---- Attack-path evidence -------------------------------------------------
$attackItems = @()
$attackFindings = @()
$attackErrors = @()
try {
    $knownAdminPattern = '(?i)(SYSTEM|Enterprise Admins|Domain Admins|Administrators|CREATOR OWNER)$'
    $dangerousRights = 'GenericAll|WriteDacl|WriteOwner|GenericWrite|WriteProperty|ExtendedRight'
    $targets = @(
        [pscustomobject]@{ target_label = 'AdminSDHolder'; target_dn = "CN=AdminSDHolder,CN=System,$($domain.DistinguishedName)" },
        [pscustomobject]@{ target_label = 'Domain Admins'; target_dn = (Get-ADGroup -Identity 'Domain Admins').DistinguishedName },
        [pscustomobject]@{ target_label = 'Domain Controllers OU'; target_dn = $domain.DomainControllersContainer }
    )
    $aclRows = @()
    foreach ($target in $targets) {
        $entries = @()
        try {
            $acl = Get-Acl -Path ('AD:\' + $target.target_dn)
            foreach ($ace in $acl.Access) {
                $principal = Get-RRSafeName $ace.IdentityReference
                $rights = Get-RRSafeName $ace.ActiveDirectoryRights
                if (-not $ace.IsInherited -and $principal -notmatch $knownAdminPattern -and $rights -match $dangerousRights) {
                    $entries += [pscustomobject]@{
                        principal = $principal
                        rights = $rights
                        inherited = [bool]$ace.IsInherited
                        access_type = Get-RRSafeName $ace.AccessControlType
                        inheritance_type = Get-RRSafeName $ace.InheritanceType
                    }
                    $attackFindings += Get-RRFinding -Id ('ONPREM-ACL-001-' + $entries.Count + '-' + $target.target_label.Replace(' ', '-')) -Severity 'critical' `
                        -Title "Non-default privileged ACL: $principal on $($target.target_label)" `
                        -Description "$principal has $rights on the Tier-0 object $($target.target_label)." `
                        -Remediation "Confirm the business owner, then remove only the unauthorized $rights access control entry from $($target.target_label)." `
                        -Verify "Run the collector again and confirm this principal/right pair is absent from $($target.target_label)." `
                        -Evidence ([pscustomobject]@{ principal = $principal; target = $target.target_label; rights = $rights }) `
                        -Controls @('AC.L2-3.1.5', 'AC.L2-3.1.7')
                }
            }
        } catch {
            $attackErrors += "ACL read failed for $($target.target_label): $($_.Exception.Message)"
        }
        $aclRows += [pscustomobject]@{
            target_label = $target.target_label
            target_dn = $target.target_dn
            non_default_entries = @($entries)
        }
    }
    $attackItems += [pscustomobject]@{ category = 'critical_object_acls'; data = @($aclRows) }

    $domainControllers = @(Get-ADDomainController -Filter * | ForEach-Object { $_.ComputerObjectDN })
    $delegationRows = @()
    foreach ($computer in @(Get-ADComputer -Filter 'TrustedForDelegation -eq $true' -Properties TrustedForDelegation, OperatingSystem, Enabled, DistinguishedName)) {
        $isDc = $domainControllers -contains $computer.DistinguishedName
        $delegationRows += [pscustomobject]@{
            sam_account_name = $computer.SamAccountName
            name = $computer.Name
            enabled = [bool]$computer.Enabled
            os = Get-RRSafeName $computer.OperatingSystem
            is_domain_controller = $isDc
            is_tier0 = $isDc
        }
        if (-not $isDc) {
            $attackFindings += Get-RRFinding -Id ('ONPREM-DELEG-001-' + $computer.ObjectGuid.Guid) -Severity 'critical' `
                -Title "Unconstrained delegation enabled on $($computer.Name)" `
                -Description 'A non-domain-controller computer can receive reusable Kerberos credentials.' `
                -Remediation "Replace unconstrained delegation on $($computer.Name) with resource-based constrained delegation after application-owner validation." `
                -Verify "Run the collector again and confirm TrustedForDelegation is false on $($computer.Name)." `
                -Evidence ([pscustomobject]@{ computer = $computer.SamAccountName; trusted_for_delegation = $true }) `
                -Controls @('AC.L2-3.1.1', 'IA.L2-3.5.3')
        }
    }
    $attackItems += [pscustomobject]@{ category = 'unconstrained_delegation'; data = @($delegationRows) }

    $rbcdRows = @()
    foreach ($computer in @(Get-ADComputer -LDAPFilter '(msDS-AllowedToActOnBehalfOfOtherIdentity=*)' -Properties 'msDS-AllowedToActOnBehalfOfOtherIdentity')) {
        $rbcdRows += [pscustomobject]@{
            sam_account_name = $computer.SamAccountName
            name = $computer.Name
            object_class = 'computer'
            is_domain_controller = $domainControllers -contains $computer.DistinguishedName
            principal_count = 1
        }
        $attackFindings += Get-RRFinding -Id ('ONPREM-RBCD-001-' + $computer.ObjectGuid.Guid) -Severity 'high' `
            -Title "Resource-based constrained delegation is configured on $($computer.Name)" `
            -Description 'The target has an RBCD security descriptor; principal resolution requires an administrator review.' `
            -Remediation "Resolve the RBCD descriptor on $($computer.Name) and remove principals that do not have an approved application dependency." `
            -Verify "Run the collector again and confirm only approved principals remain, or the RBCD attribute is absent." `
            -Evidence ([pscustomobject]@{ target = $computer.SamAccountName; descriptor_present = $true }) `
            -Controls @('AC.L2-3.1.1', 'AC.L2-3.1.5')
    }
    $attackItems += [pscustomobject]@{ category = 'rbcd_entries'; data = @($rbcdRows) }

    $kerbRows = @()
    foreach ($user in @(Get-ADUser -LDAPFilter '(&(servicePrincipalName=*)(!(objectClass=computer)))' -Properties ServicePrincipalName, Enabled, AdminCount, PasswordLastSet)) {
        if (-not $user.Enabled) { continue }
        $kerbRows += [pscustomobject]@{
            sam_account_name = $user.SamAccountName
            service_principal_names = @($user.ServicePrincipalName)
            is_tier0 = [int]$user.AdminCount -eq 1
            password_last_set = if ($user.PasswordLastSet) { $user.PasswordLastSet.ToUniversalTime().ToString('o') } else { '' }
        }
        $attackFindings += Get-RRFinding -Id ('ONPREM-KERB-001-' + $user.ObjectGuid.Guid) -Severity $(if ([int]$user.AdminCount -eq 1) { 'critical' } else { 'high' }) `
            -Title "Kerberoastable account: $($user.SamAccountName)" `
            -Description 'An enabled user account has one or more SPNs and its service ticket can be attacked offline.' `
            -Remediation "Convert $($user.SamAccountName) to a gMSA where supported; otherwise rotate to a long random password and remove unnecessary SPNs." `
            -Verify "Run the collector again and confirm the account is a gMSA, disabled, or no longer has unnecessary SPNs." `
            -Evidence ([pscustomobject]@{ account = $user.SamAccountName; spn_count = @($user.ServicePrincipalName).Count }) `
            -Controls @('IA.L2-3.5.7', 'IA.L2-3.5.8')
    }
    $attackItems += [pscustomobject]@{ category = 'kerberoastable_accounts'; data = @($kerbRows) }

    $asrepRows = @()
    foreach ($user in @(Get-ADUser -LDAPFilter '(&(objectCategory=person)(objectClass=user)(userAccountControl:1.2.840.113556.1.4.803:=4194304))' -Properties Enabled)) {
        if (-not $user.Enabled) { continue }
        $asrepRows += [pscustomobject]@{ sam_account_name = $user.SamAccountName }
        $attackFindings += Get-RRFinding -Id ('ONPREM-ASREP-001-' + $user.ObjectGuid.Guid) -Severity 'high' `
            -Title "Kerberos pre-authentication disabled: $($user.SamAccountName)" `
            -Description 'The account is susceptible to offline AS-REP password attacks.' `
            -Remediation "Require Kerberos pre-authentication for $($user.SamAccountName), then rotate the password." `
            -Verify "Run the collector again and confirm $($user.SamAccountName) is absent from AS-REP-roastable accounts." `
            -Evidence ([pscustomobject]@{ account = $user.SamAccountName; preauthentication_required = $false }) `
            -Controls @('IA.L2-3.5.2', 'IA.L2-3.5.7')
    }
    $attackItems += [pscustomobject]@{ category = 'asrep_roastable_accounts'; data = @($asrepRows) }

    $sidHistoryRows = @()
    foreach ($user in @(Get-ADUser -LDAPFilter '(sIDHistory=*)' -Properties SIDHistory, Enabled)) {
        $sidHistoryRows += [pscustomobject]@{ sam_account_name = $user.SamAccountName; enabled = [bool]$user.Enabled; sid_history_count = @($user.SIDHistory).Count }
        $attackFindings += Get-RRFinding -Id ('ONPREM-SIDHISTORY-001-' + $user.ObjectGuid.Guid) -Severity 'high' `
            -Title "SIDHistory remains on $($user.SamAccountName)" `
            -Description 'SIDHistory can preserve legacy privileges and create a hidden escalation path.' `
            -Remediation "Validate migration dependencies and remove obsolete SIDHistory values from $($user.SamAccountName) under change control." `
            -Verify "Run the collector again and confirm only explicitly approved migration SIDHistory remains." `
            -Evidence ([pscustomobject]@{ account = $user.SamAccountName; sid_history_count = @($user.SIDHistory).Count }) `
            -Controls @('AC.L2-3.1.1', 'AC.L2-3.1.4')
    }
    $attackItems += [pscustomobject]@{ category = 'sid_history_accounts'; data = @($sidHistoryRows) }

    # This version does not infer msDS-KeyCredentialLink writers without a complete schema-aware ACL
    # evaluation. An empty category is explicit and prevents fabricated attack-path edges.
    $attackItems += [pscustomobject]@{ category = 'shadow_credentials_exposure'; data = @() }
} catch {
    $attackErrors += $_.Exception.Message
}
$modules['ADAttackPath'] = Get-RRModuleResult -Items $attackItems -Findings $attackFindings -Errors $attackErrors

# ---- Tier-0 membership ----------------------------------------------------
$tierItems = @()
$tierFindings = @()
$tierErrors = @()
try {
    $tierGroups = @('Domain Admins', 'Enterprise Admins', 'Schema Admins', 'Administrators')
    $membership = @()
    foreach ($groupName in $tierGroups) {
        try {
            $group = Get-ADGroup -Identity $groupName
            foreach ($member in @(Get-ADGroupMember -Identity $group -Recursive)) {
                $membership += [pscustomobject]@{
                    group = $groupName
                    member = $member.SamAccountName
                    object_class = $member.ObjectClass
                    distinguished_name = $member.DistinguishedName
                }
            }
        } catch {
            $tierErrors += "Tier-0 group read failed for ${groupName}: $($_.Exception.Message)"
        }
    }
    $tierItems += [pscustomobject]@{ category = 'privileged_group_membership'; data = @($membership) }
} catch {
    $tierErrors += $_.Exception.Message
}
$modules['ADTier0'] = Get-RRModuleResult -Items $tierItems -Findings $tierFindings -Errors $tierErrors

# ---- Password policy ------------------------------------------------------
$policyItems = @()
$policyFindings = @()
$policyErrors = @()
try {
    $policy = Get-ADDefaultDomainPasswordPolicy
    $policyRow = [pscustomobject]@{
        min_password_length = [int]$policy.MinPasswordLength
        complexity_enabled = [bool]$policy.ComplexityEnabled
        lockout_threshold = [int]$policy.LockoutThreshold
        password_history_count = [int]$policy.PasswordHistoryCount
        max_password_age_days = [int]$policy.MaxPasswordAge.TotalDays
    }
    $policyItems += [pscustomobject]@{ category = 'default_domain_password_policy'; data = @($policyRow) }
    if ([int]$policy.MinPasswordLength -lt 14 -or -not $policy.ComplexityEnabled -or [int]$policy.LockoutThreshold -eq 0) {
        $policyFindings += Get-RRFinding -Id 'ONPREM-PASSWORD-001' -Severity 'high' `
            -Title 'Default domain password policy is below the assessment baseline' `
            -Description 'Password length, complexity, or lockout controls do not meet the RoadRunner assessment baseline.' `
            -Remediation 'Approve and deploy a domain password policy with at least 14 characters, complexity enabled, and a tested non-zero lockout threshold.' `
            -Verify 'Run the collector again and confirm all password-policy baseline checks pass.' `
            -Evidence $policyRow -Controls @('IA.L2-3.5.7', 'IA.L2-3.5.8')
    }
} catch {
    $policyErrors += $_.Exception.Message
}
$modules['ADPolicy'] = Get-RRModuleResult -Items $policyItems -Findings $policyFindings -Errors $policyErrors

# Quick mode deliberately stops after the highest-value identity and policy evidence.
if ($Mode -eq 'Full') {
    # ---- Windows LAPS coverage --------------------------------------------
    $lapsItems = @()
    $lapsFindings = @()
    $lapsErrors = @()
    try {
        $computers = @(Get-ADComputer -Filter 'Enabled -eq $true' -Properties 'msLAPS-PasswordExpirationTime', 'ms-Mcs-AdmPwdExpirationTime', OperatingSystem)
        $covered = @($computers | Where-Object { $_.'msLAPS-PasswordExpirationTime' -or $_.'ms-Mcs-AdmPwdExpirationTime' })
        $eligible = @($computers | Where-Object { $_.OperatingSystem -match 'Windows' })
        $coveragePercent = if ($eligible.Count -gt 0) { [Math]::Round(100 * $covered.Count / $eligible.Count, 1) } else { 0 }
        $lapsRow = [pscustomobject]@{ eligible_windows_computers = $eligible.Count; covered_computers = $covered.Count; coverage_percent = $coveragePercent }
        $lapsItems += [pscustomobject]@{ category = 'laps_coverage'; data = @($lapsRow) }
        if ($eligible.Count -gt 0 -and $coveragePercent -lt 95) {
            $lapsFindings += Get-RRFinding -Id 'ONPREM-LAPS-001' -Severity 'high' `
                -Title "Windows LAPS coverage is $coveragePercent%" `
                -Description "$($eligible.Count - $covered.Count) eligible Windows computers have no observable LAPS expiration attribute." `
                -Remediation 'Deploy Windows LAPS through approved policy, escrow passwords in the customer directory, and scope read permissions to authorized support roles.' `
                -Verify 'Run the collector again and confirm at least 95% of eligible Windows computers expose a current LAPS expiration attribute.' `
                -Evidence $lapsRow -Controls @('IA.L2-3.5.10', 'AC.L2-3.1.5')
        }
    } catch {
        $lapsErrors += $_.Exception.Message
    }
    $modules['LAPS'] = Get-RRModuleResult -Items $lapsItems -Findings $lapsFindings -Errors $lapsErrors

    # ---- Account and computer hygiene -------------------------------------
    $hygieneItems = @()
    $hygieneFindings = @()
    $hygieneErrors = @()
    try {
        $cutoff = [DateTime]::UtcNow.AddDays(-1 * $InactiveDays)
        $staleUsers = @(Get-ADUser -Filter 'Enabled -eq $true' -Properties LastLogonDate, PasswordLastSet | Where-Object { -not $_.LastLogonDate -or $_.LastLogonDate.ToUniversalTime() -lt $cutoff })
        $staleComputers = @(Get-ADComputer -Filter 'Enabled -eq $true' -Properties LastLogonDate, OperatingSystem | Where-Object { -not $_.LastLogonDate -or $_.LastLogonDate.ToUniversalTime() -lt $cutoff })
        $hygieneRow = [pscustomobject]@{
            inactive_days = $InactiveDays
            stale_enabled_users = $staleUsers.Count
            stale_enabled_computers = $staleComputers.Count
            user_samples = @($staleUsers | Select-Object -First 25 -ExpandProperty SamAccountName)
            computer_samples = @($staleComputers | Select-Object -First 25 -ExpandProperty SamAccountName)
        }
        $hygieneItems += [pscustomobject]@{ category = 'inactive_accounts_and_devices'; data = @($hygieneRow) }
        if ($staleUsers.Count -gt 0) {
            $hygieneFindings += Get-RRFinding -Id 'ONPREM-STALE-USERS-001' -Severity 'medium' `
                -Title "$($staleUsers.Count) enabled user accounts appear inactive" `
                -Description "Enabled accounts have no observed logon within $InactiveDays days." `
                -Remediation 'Have account owners validate the sampled accounts, then disable only accounts confirmed to be unused through the customer change process.' `
                -Verify 'Run the collector again and confirm confirmed-unused accounts are disabled and approved exceptions are documented.' `
                -Evidence $hygieneRow -Controls @('AC.L2-3.1.1', 'AC.L2-3.1.2')
        }
        if ($staleComputers.Count -gt 0) {
            $hygieneFindings += Get-RRFinding -Id 'ONPREM-STALE-COMPUTERS-001' -Severity 'medium' `
                -Title "$($staleComputers.Count) enabled computer accounts appear inactive" `
                -Description "Enabled computer accounts have no observed logon within $InactiveDays days." `
                -Remediation 'Validate ownership and decommission confirmed-stale computer accounts through the customer change process.' `
                -Verify 'Run the collector again and confirm confirmed-stale devices are disabled or removed and approved exceptions are documented.' `
                -Evidence $hygieneRow -Controls @('CM.L2-3.4.1', 'CM.L2-3.4.3')
        }
    } catch {
        $hygieneErrors += $_.Exception.Message
    }
    $modules['ADHygiene'] = Get-RRModuleResult -Items $hygieneItems -Findings $hygieneFindings -Errors $hygieneErrors

    # ---- Trust inventory --------------------------------------------------
    $trustItems = @()
    $trustErrors = @()
    try {
        $trustRows = @(Get-ADTrust -Filter * | ForEach-Object {
            [pscustomobject]@{
                name = $_.Name
                direction = Get-RRSafeName $_.Direction
                trust_type = Get-RRSafeName $_.TrustType
                selective_authentication = [bool]$_.SelectiveAuthentication
                sid_filtering_forest_aware = [bool]$_.SIDFilteringForestAware
                sid_filtering_quarantined = [bool]$_.SIDFilteringQuarantined
            }
        })
        $trustItems += [pscustomobject]@{ category = 'domain_trusts'; data = @($trustRows) }
    } catch {
        $trustErrors += $_.Exception.Message
    }
    $modules['ADTrusts'] = Get-RRModuleResult -Items $trustItems -Findings @() -Errors $trustErrors

    # ---- AD CS inventory --------------------------------------------------
    $adcsItems = @()
    $adcsErrors = @()
    try {
        $configDn = $rootDse.ConfigurationNamingContext
        $cas = @(Get-ADObject -SearchBase "CN=Enrollment Services,CN=Public Key Services,CN=Services,$configDn" -LDAPFilter '(objectClass=pKIEnrollmentService)' -Properties dNSHostName, certificateTemplates | ForEach-Object {
            [pscustomobject]@{
                name = $_.Name
                dns_host_name = Get-RRSafeName $_.dNSHostName
                certificate_template_count = @($_.certificateTemplates).Count
            }
        })
        $adcsItems += [pscustomobject]@{ category = 'enterprise_certificate_authorities'; data = @($cas) }
    } catch {
        $adcsErrors += $_.Exception.Message
    }
    $modules['ADCS'] = Get-RRModuleResult -Items $adcsItems -Findings @() -Errors $adcsErrors

    # ---- Group Policy inventory ------------------------------------------
    $gpoItems = @()
    $gpoErrors = @()
    try {
        Import-Module GroupPolicy -ErrorAction Stop
        $gpos = @(Get-GPO -All | ForEach-Object {
            [pscustomobject]@{
                id = $_.Id.Guid
                display_name = $_.DisplayName
                gpo_status = Get-RRSafeName $_.GpoStatus
                modification_time = $_.ModificationTime.ToUniversalTime().ToString('o')
            }
        })
        $gpoItems += [pscustomobject]@{ category = 'group_policy_inventory'; data = @($gpos) }
    } catch {
        $gpoErrors += "Group Policy inventory unavailable: $($_.Exception.Message)"
    }
    $modules['GroupPolicy'] = Get-RRModuleResult -Items $gpoItems -Findings @() -Errors $gpoErrors
}

$finishedAt = [DateTime]::UtcNow
$envelope = [ordered]@{
    schema_version = '3'
    collector_version = $collectorVersion
    mode = $Mode.ToLowerInvariant()
    host = $env:COMPUTERNAME
    domain = $domain.DNSRoot
    forest = $forest.Name
    started_at = $startedAt.ToString('o')
    finished_at = $finishedAt.ToString('o')
    read_only = $true
    modules = $modules
}

if ([string]::IsNullOrWhiteSpace($OutputPath)) {
    $OutputPath = Join-Path (Get-Location) ('rrsecure-scan-' + [DateTime]::UtcNow.ToString('yyyyMMddTHHmmssZ') + '.json')
}
$absoluteOutput = [IO.Path]::GetFullPath($OutputPath)
$parent = [IO.Path]::GetDirectoryName($absoluteOutput)
if (-not [string]::IsNullOrWhiteSpace($parent)) {
    [void][IO.Directory]::CreateDirectory($parent)
}
$json = $envelope | ConvertTo-Json -Depth 15
[IO.File]::WriteAllText($absoluteOutput, $json, [Text.UTF8Encoding]::new($false))

[pscustomobject]@{
    ok = $true
    output = $absoluteOutput
    bytes = ([IO.FileInfo]$absoluteOutput).Length
    modules = $modules.Count
    started_at = $startedAt.ToString('o')
    finished_at = $finishedAt.ToString('o')
    upload = 'manual_to_customer_owned_application'
} | ConvertTo-Json -Depth 5
