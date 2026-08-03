// Home — a concise overview of the workflow and product.
import { contactSection, exhibit, exhibitRow, rail, railCard, sectionHead } from "../helpers.mjs";

export function homeBody() {
  return `
${howItWorks()}
${productProof()}
${contactSection()}`;
}

function howItWorks() {
  return `<section class="section">
    <div class="shell">
      ${sectionHead(
        "How it works",
        "From evidence to verified closure.",
        "RoadRunner turns each assessment run into a short, accountable work cycle."
      )}
      ${rail(3, [
        railCard("01", "Read the environment.", "Read-only connectors and the on-prem collector capture current evidence and make source gaps visible."),
        railCard("02", "Prioritize the work.", "Named findings identify the affected accounts, devices, policies, and attack paths, with an owner and a clear next action."),
        railCard("03", "Verify the result.", "The next run checks the evidence again. Findings close only when the validation condition is satisfied.")
      ])}
      <p class="rv" style="margin-top:22px"><a class="textlink" href="/platform/">See the platform workflow</a></p>
    </div>
  </section>`;
}

function productProof() {
  return `<section class="section tinted tint-teal" style="--tint-x:80%">
    <div class="shell">
      ${sectionHead(
        "Product",
        "See the work clearly.",
        "Three core surfaces from the live demo, rendered with synthetic evidence."
      )}
      ${exhibitRow(
        exhibit({ img: "exhibit-exec", url: "roadrunnersecure.com/demo/executive", letter: "A", alt: "RoadRunner Secure executive view with priority work, closure, owner workload, and source health", caption: "Executive view — priorities, ownership, and closure", width: 1280, height: 720 }),
        "One view for leadership.",
        "Priority work, ownership, verified closures, regressions, and source gaps appear together without burying the decision in charts."
      )}
      ${exhibitRow(
        exhibit({ img: "exhibit-queue", url: "roadrunnersecure.com/demo/workbench", letter: "B", alt: "RoadRunner Secure Action Workbench with filters, findings, owners, affected entities, timelines, and validation controls", caption: "Action Workbench — filter, assign, validate", width: 1280, height: 720 }),
        "A practical queue for operators.",
        "Filter, assign, and validate findings with the affected entities, source evidence, timeline, and closure condition in the same place.",
        true
      )}
      ${exhibitRow(
        exhibit({ img: "exhibit-attack", url: "roadrunnersecure.com/demo/onprem", letter: "C", alt: "RoadRunner Secure on-prem view with collector coverage, findings, entities, and attack-path data", caption: "On-prem assessment — coverage before conclusions", width: 1280, height: 720 }),
        "Collector coverage stays visible.",
        "Technical owners can see which modules ran, failed, or were skipped before acting on Active Directory findings and attack paths."
      )}
      <p class="rv" style="margin-top:26px"><a class="button primary" href="/demo/">Open Live Demo</a></p>
    </div>
  </section>`;
}
