// Pricing — the scope document. Paper-first, no fake tier grid.
import { sectionHead, rail, railCard, table, contactSection } from "../helpers.mjs";

export function pricingBody() {
  return `
${pilotSow()}
${commercialModels()}
${pricingInputs()}
${boundary()}
${contactSection()}`;
}

// P5 polish target: this is the flagship paper artifact.
function pilotSow() {
  const week = (w, title, text, done = false) => `<div class="sow-row rv">
    <span class="sow-week">${w}</span>
    <div class="sow-body"><strong>${title}</strong><span>${text}</span></div>
    <span class="sow-check ${done ? "done" : ""}" aria-hidden="true">${done ? "✓" : ""}</span>
  </div>`;
  return `<section class="section">
    <div class="shell">
      ${sectionHead("Pilot shape", "A useful pilot proves the loop in 2 to 4 weeks.", "If the weekly findings and closure trail do not create usable work, the pilot ends cleanly with the output retained.")}
      <div class="paper rv-scale sow">
        <div class="paper-doc"><span>RR-SOW-DRAFT · Pilot scope of work</span><span>2–4 weeks · read-only</span></div>
        ${week("W0", "Scope and access", "Confirm tenant count, Microsoft/on-prem scope, white-label needs, and read-only access.")}
        ${week("W1", "Baseline", "Run the first assessment and review highest-priority findings.")}
        ${week("W2", "Work the queue", "Fix selected findings, refresh evidence, and watch validation behavior.")}
        ${week("W4", "Decision", "Deliver report, roadmap, and recommendation to continue, expand, or stop.")}
        <div class="sow-exit rv">
          <span class="k">Exit ramp</span>
          <p>Continue only if the output creates useful work. If it does not, the pilot ends cleanly and you keep the report, the roadmap, and everything learned.</p>
        </div>
        <div class="paper-foot"><span>ROADRUNNER SECURE · PILOT SOW</span><span>NO LONG-TERM COMMITMENT BEFORE DECISION</span></div>
      </div>
    </div>
  </section>`;
}

function commercialModels() {
  return `<section class="section tight tinted tint-teal">
    <div class="shell">
      ${sectionHead("Commercial models", "Pricing follows scope, not a generic seat grid.", "Quotes are based on deployment shape, evidence sources, and the support model required to keep closure moving.")}
      ${table([
        ["Model", "Best fit", "Included shape"],
        ["Pilot", "A first tenant or controlled client sample", "Baseline assessment, weekly finding review, final report, and remediation roadmap"],
        ["MSP Partner", "Recurring white-label delivery across clients", "Client portals, MSP operating queue, white-label reporting, and tenant rollout planning"],
        ["Enterprise / Custom", "Customer-owned or constrained deployment", "Custom access model, evidence flow review, security review support, and tailored source scope"]
      ])}
    </div>
  </section>`;
}

function pricingInputs() {
  return `<section class="section tight">
    <div class="shell">
      ${sectionHead("Pricing inputs", "Bring the facts that change the scope.", "These inputs help size the assessment accurately without pretending every tenant needs the same plan.")}
      ${rail(3, [
        railCard("SIZE", "Environment size", "Users, endpoints, tenants, subscriptions, and on-prem domains."),
        railCard("SOURCES", "Evidence sources", "Microsoft-only, on-prem AD, endpoint/security tooling, and manual evidence needs."),
        railCard("DEPLOY", "Deployment model", "RoadRunner-hosted, MSP-managed, customer-owned, or offline collector requirements.")
      ])}
    </div>
  </section>`;
}

function boundary() {
  return `<section class="section tight tinted tint-rose" style="--tint-x: 82%">
    <div class="shell">
      ${sectionHead("Boundary", "Define the pilot before it starts.", "This prevents the first assessment from turning into an open-ended consulting engagement.", "rose")}
      ${table([
        ["Included", "Not included by default"],
        ["Read-only connector setup and evidence review", "Production remediation performed by RoadRunner"],
        ["Baseline assessment and weekly finding reviews", "Destructive testing, exploit execution, or credential harvesting"],
        ["Validation runs and closure trail", "Custom integrations outside agreed pilot scope"],
        ["Final report and remediation roadmap", "Long-term managed service commitment before pilot decision"]
      ])}
    </div>
  </section>`;
}
