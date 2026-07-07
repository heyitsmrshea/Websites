// Security — the trust ledger. Quiet on purpose; it earns trust by being calm.
import { sectionHead, ledgerRow, tag, rail, railCard, table, contactSection } from "../helpers.mjs";
import { brand } from "../meta.mjs";

export function securityBody() {
  return `
${trustLedger()}
${connectorPermissions()}
${dataHandling()}
${boundaries()}
${maturity()}
${contactSection()}`;
}

function trustLedger() {
  return `<section class="section">
    <div class="shell">
      ${sectionHead("Trust posture", "Security claims stay specific enough to review.", "This page covers the minimum categories a security reviewer expects before deeper due diligence.")}
      <div class="ledger">
        ${ledgerRow("Data handling", "Evidence is collected for assessment, reporting, validation, and source-health visibility — <strong>nothing else</strong>.", tag("PASS"))}
        ${ledgerRow("Encryption", "Encrypted transport for uploads and encrypted storage for retained evidence and reports.", tag("PASS"))}
        ${ledgerRow("Access control", "Access limited by tenant, role, and operational need. Access paths revoked during offboarding.", tag("PASS"))}
        ${ledgerRow("Tenant isolation", "Customer evidence scoped by tenant; client surfaces separated for MSP delivery.", tag("PASS"))}
        ${ledgerRow("Logging", "Connector status, evidence freshness, access activity, and validation runs are tracked.", tag("PASS"))}
        ${ledgerRow("Retention", "Set during the pilot or contract; evidence deleted or exported during offboarding as agreed.", tag("SET"))}
      </div>
    </div>
  </section>`;
}

function connectorPermissions() {
  return `<section class="section tight tinted tint-teal">
    <div class="shell">
      ${sectionHead("Connector permissions", "Read-only by design, with permissions tied to assessment value.", "Permission names are confirmed against the live implementation and customer approval package.")}
      <div class="paper rv-scale">
        <div class="paper-doc"><span>RR-ACCESS-001 · Access manifest</span><span>Read-only · least privilege</span></div>
        ${table([
          ["Connector", "Permission intent", "Why it is needed"],
          ["Microsoft Graph", "Read directory, policy, device, and security posture where granted", "Create identity, device, policy, and incident findings"],
          ["Defender / security signals", "Read alerts, exposure, and onboarding state where licensed", "Surface detection backlog, endpoint gaps, and response work"],
          ["On-prem collector", "Read AD topology and privilege relationships", "Map attack paths without collecting secrets or changing objects"],
          ["Manual evidence", "Accept customer/MSP notes and approved exceptions", "Attach business context without overriding evidence validation"]
        ])}
        <div class="paper-foot"><span>ROADRUNNER SECURE · ACCESS MANIFEST</span><span>NO WRITE SCOPES REQUESTED</span></div>
      </div>
    </div>
  </section>`;
}

function dataHandling() {
  return `<section class="section tight">
    <div class="shell">
      ${sectionHead("Data handling", "Make offboarding and limits explicit.", "This is the difference between a trust page and vague reassurance.")}
      ${rail(3, [
        railCard("RETAIN", "Retention", "Pilot retention is defined before access is granted. Long-term retention follows contract and reporting needs."),
        railCard("OFFBOARD", "Offboarding", "Revoke connectors, export agreed reports, delete retained evidence according to timeline, and confirm completion."),
        railCard("SUBPROC", "Subprocessors", "List hosting, email, analytics, and operational subprocessors before production procurement.")
      ])}
    </div>
  </section>`;
}

function boundaries() {
  return `<section class="section tight tinted tint-rose" style="--tint-x: 80%">
    <div class="shell">
      ${sectionHead("Boundaries", "What RoadRunner does not do by default.", "Explicit boundaries reduce fear and prevent the product from sounding like an exploit platform.", "rose")}
      ${rail(4, [
        railCard("01", "No destructive testing", "The assessment observes configuration and evidence. Destructive testing is not default behavior."),
        railCard("02", "No credential collection", "Collectors do not harvest passwords, hashes, tokens, or secrets."),
        railCard("03", "No automatic changes", "RoadRunner recommends fixes. Customers or MSPs execute approved changes."),
        railCard("04", "Disclosure path", `Send security reports to ${brand.email}. Valid reports receive direct remediation coordination.`)
      ])}
    </div>
  </section>`;
}

function maturity() {
  return `<section class="section tight">
    <div class="shell">
      ${sectionHead("Review maturity", "Clear separation between current controls and procurement artifacts.", "Formal certifications are represented only when they are available and reviewable.")}
      ${rail(3, [
        railCard("NOW", "Current review package", "Connector purposes, read-only posture, retention plan, offboarding plan, subprocessors, and deployment model."),
        railCard("SLA", "Disclosure SLA", `Security reports sent to ${brand.email} receive acknowledgement within one business day after validation.`),
        railCard("NEXT", "Compliance roadmap", "Formal control mapping and third-party assurance can be added as enterprise demand requires.")
      ])}
    </div>
  </section>`;
}
