// Contact — two conversations, a concrete next-step rail, and the intake form.
import { sectionHead, rail, railCard, contactSection } from "../helpers.mjs";

export function contactBody() {
  return `
${conversations()}
${nextSteps()}
${contactSection()}`;
}

function conversations() {
  return `<section class="section">
    <div class="shell">
      ${sectionHead("Two useful conversations", "Scope a pilot or review the MSP white-label model.", "A good first call should leave with enough detail to define access, source scope, deployment model, and the first four weekly runs.")}
      ${rail(2, [
        railCard("PILOT", "Scope a pilot", "Define tenant size, Microsoft/on-prem coverage, read-only access, timeline, expected deliverables, and the first remediation queue."),
        railCard("MSP", "Review MSP model", "Discuss white-label branding, client portal needs, reporting language, tenant rollout, and service delivery rhythm.")
      ])}
    </div>
  </section>`;
}

function nextSteps() {
  return `<section class="section tight tinted tint-teal">
    <div class="shell">
      ${sectionHead("What happens next", "The next step should be concrete.", "Bring approximate users, endpoints, tenants, Microsoft licensing, on-prem AD scope, and deployment constraints.")}
      ${rail(4, [
        railCard("01", "30-minute fit call", "Confirm use case, buyer role, and whether the pilot should be direct or MSP white-label."),
        railCard("02", "Scope confirmation", "Define sources, tenant count, on-prem needs, security review requirements, and success criteria."),
        railCard("03", "Access review", "Approve read-only connectors, collector model, retention, and offboarding behavior."),
        railCard("04", "Pilot kickoff", "Run baseline assessment and review the first queue of findings.")
      ])}
    </div>
  </section>`;
}
