// Microsoft — coverage, the finding, score deconstruction, permissions manifest.
import { sectionHead, rail, railCard, table, findingArtifact, findings, contactSection } from "../helpers.mjs";

export function microsoftBody() {
  return `
${coverage()}
${sampleFinding()}
${scoreSection()}
${permissions()}
${contactSection()}`;
}

function coverage() {
  return `<section class="section" id="walkthrough-microsoft">
    <div class="shell">
      ${sectionHead("Microsoft coverage", "Exact domains, exact findings, exact limits.", "Coverage depends on licensing and granted permissions. RoadRunner says what it can prove and what remains unknown.")}
      ${rail(3, [
        railCard("ENTRA", "Entra ID", "Privileged roles, MFA coverage, Conditional Access gaps, risky users, legacy auth, guest exposure, and role drift."),
        railCard("MDE", "Defender", "Incident backlog, exposure signals, device risk, alert hygiene, and onboarding coverage where available."),
        railCard("INTUNE", "Intune", "Compliance policy coverage, unmanaged devices, stale enrollments, device encryption, and baseline gaps."),
        railCard("M365", "Exchange and M365", "Legacy protocol exposure, mailbox forwarding, audit posture, sharing controls, and risky collaboration settings."),
        railCard("SPO", "SharePoint and OneDrive", "External sharing posture, sensitive site exposure, anonymous links, and admin control coverage."),
        railCard("AZURE", "Azure posture", "Subscription security settings, Defender plan coverage, privileged access, network exposure, and policy gaps.")
      ])}
    </div>
  </section>`;
}

function sampleFinding() {
  return `<section class="section tight tinted tint-rose">
    <div class="shell">
      ${sectionHead("The finding", "Policy exceptions are where tenants actually break.", "A score will not tell you which four accounts bypass MFA. The finding does — and it names the condition that closes it.", "rose")}
      ${findingArtifact(findings.microsoft)}
    </div>
  </section>`;
}

// P4 turns the gauge into the assemble-then-shatter sequence.
function scoreSection() {
  return `<section class="section tinted tint-amber" id="score-theater">
    <div class="shell">
      ${sectionHead("Secure Score is not enough", "The score is context. <span class='ital'>The work is the product.</span>", "RoadRunner can use Microsoft score data as context, but the output is built around named evidence and validation.", "amber")}
      <div class="gauge-wrap">
        <div class="rv" id="gauge-stage">
          <svg viewBox="0 0 340 220" role="img" aria-label="A Secure-Score-style gauge shown as context, not the deliverable">
            <path d="M 40 190 A 130 130 0 1 1 300 190" fill="none" stroke="rgba(198,220,236,.12)" stroke-width="16" stroke-linecap="round"/>
            <path id="gauge-arc" d="M 40 190 A 130 130 0 1 1 300 190" fill="none" stroke="#fbbf24" stroke-width="16" stroke-linecap="round" stroke-dasharray="612" stroke-dashoffset="215"/>
            <text x="170" y="150" text-anchor="middle" fill="#f2f6f9" font-family="ui-monospace, Menlo, monospace" font-size="44" font-weight="640">65.8%</text>
            <text x="170" y="180" text-anchor="middle" fill="#6d7b88" font-family="ui-monospace, Menlo, monospace" font-size="11" letter-spacing="3">COMPOSITE</text>
          </svg>
        </div>
        <div class="worklist">
          ${workItem(1, "Remove 4 interactive-capable accounts from the MFA exclusion list", "ENTRA · POLICY · owner: identity")}
          ${workItem(2, "Move 3 standing Global Admins to PIM-eligible access", "ENTRA · ROLES · owner: identity")}
          ${workItem(3, "Onboard Intune or record the device-posture data gap", "INTUNE · SOURCE GAP · owner: endpoint")}
          ${workItem(4, "Disable legacy authentication for 2 named service accounts", "ENTRA · SIGN-IN · owner: identity")}
          ${workItem(5, "Remove standing Owner roles at subscription scope", "AZURE · RBAC · owner: cloud")}
        </div>
      </div>
      ${table([
        ["Question", "Microsoft Secure Score", "RoadRunner Secure"],
        ["What is wrong?", "Control-level recommendations", "Named findings with affected accounts, devices, policies, or resources"],
        ["Who owns it?", "Usually outside the score", "Owner-ready queue with remediation context"],
        ["Why this first?", "Score impact may dominate", "Prioritized by exposure, blast radius, confidence, and urgency"],
        ["How does it close?", "Score movement or manual review", "Next evidence run must satisfy validation criteria"]
      ])}
    </div>
  </section>`;
}

function workItem(rank, what, meta) {
  return `<div class="workitem rv" style="--d:${(rank * 0.09).toFixed(2)}s">
    <span class="rank">${String(rank).padStart(2, "0")}</span>
    <div class="what"><strong>${what}</strong><span>${meta}</span></div>
    <span class="tag high">OPEN</span>
  </div>`;
}

function permissions() {
  return `<section class="section tight">
    <div class="shell">
      ${sectionHead("Connector permissions", "Permissions are part of the buying decision.", "Exact permission names should match implementation, but the public page should explain purpose and read-only posture.")}
      ${table([
        ["Area", "Typical read purpose", "Assessment value"],
        ["Directory", "Read users, groups, roles, guests, and assignments", "Detect privilege sprawl, stale access, and risky identities"],
        ["Policy", "Read Conditional Access and authentication posture", "Find MFA exceptions, weak access paths, and policy drift"],
        ["Security", "Read incidents, alerts, and exposure signals where licensed", "Fold detection and response gaps into the weekly queue"],
        ["Device", "Read Intune compliance and device inventory where available", "Find unmanaged or noncompliant endpoints tied to identity risk"],
        ["Azure", "Read subscription posture and security configuration", "Assess cloud control coverage and prioritized misconfigurations"]
      ])}
    </div>
  </section>`;
}
