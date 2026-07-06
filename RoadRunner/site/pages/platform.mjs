// Platform — the machine: pipeline, sources, lifecycle, role views.
import { sectionHead, rail, railCard, table, flow, contactSection } from "../helpers.mjs";

export function platformBody() {
  return `
${architecture()}
${sourceCoverage()}
${lifecycle()}
${roleViews()}
${contactSection()}`;
}

function architecture() {
  return `<section class="section">
    <div class="shell">
      ${sectionHead("Architecture", "Simple enough to inspect. Strong enough to operate weekly.", "RoadRunner is organized around the assessment chain: source evidence, stored proof, generated findings, assigned work, validation, and reporting.")}
      ${flow([
        ["Sources", "Microsoft, endpoint, cloud, AD, and manual evidence."],
        ["Collect", "Read-only connectors and collector exports observe posture."],
        ["Normalize", "Evidence is stored with freshness and source health."],
        ["Decide", "Rules produce named, explainable findings."],
        ["Assign", "Prioritized work is routed by owner."],
        ["Validate", "The next run checks whether evidence changed."],
        ["Report", "Verified closures roll into client-ready artifacts."]
      ])}
    </div>
  </section>`;
}

function sourceCoverage() {
  return `<section class="section tinted tint-teal">
    <div class="shell">
      ${sectionHead("Source coverage", "Signals are useful only when their limits are visible.", "Missing visibility should become a data-gap finding, not a quiet blank space in a dashboard.")}
      ${table([
        ["Source", "Typical evidence", "Assessment value"],
        ["Microsoft", "Entra roles, Conditional Access, sign-ins, Defender, Intune, M365, Azure posture", "Creates identity, endpoint, cloud, and collaboration findings with owner-ready remediation."],
        ["On-prem AD", "Groups, ACLs, delegation, sessions where available, local admin exposure, path topology", "Maps attack paths and recommends low-disruption edge cuts."],
        ["Endpoint/security tools", "Device health, onboarding state, incident backlog, exposure signals", "Turns coverage and response gaps into weekly work."],
        ["Manual evidence", "Exceptions, business context, compensating controls, MSP notes", "Adds human context without letting manual status override validation evidence."]
      ])}
    </div>
  </section>`;
}

function lifecycle() {
  return `<section class="section tight">
    <div class="shell">
      ${sectionHead("Lifecycle", "Discovery to closure without losing the thread.", "The workflow is built for recurring execution, not one more static report.")}
      ${rail(4, [
        railCard("01", "Discover", "Collect evidence, detect gaps, and baseline the tenant."),
        railCard("02", "Prioritize", "Rank findings across Microsoft, endpoint, cloud, and on-prem work."),
        railCard("03", "Assign", "Give owners the entities, fix steps, and validation criteria."),
        railCard("04", "Report", "Show verified closure, regressions, and blocked visibility to leadership.")
      ])}
    </div>
  </section>`;
}

function roleViews() {
  return `<section class="section">
    <div class="shell">
      ${sectionHead("Role-based views", "Same evidence, different decisions.", "RoadRunner should not make every stakeholder read the same security artifact.")}
      ${rail(3, [
        railCard("MSP", "MSP operator", "Needs source health, client queues, owner status, blocked evidence, and service delivery notes."),
        railCard("EXEC", "Client executive", "Needs risk direction, verified closures, unresolved priority items, and business-facing posture summaries."),
        railCard("TECH", "Technical owner", "Needs affected entities, fix steps, proof, and exact validation criteria for the next run.")
      ])}
    </div>
  </section>`;
}
