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
      ${sectionHead("Source coverage", "Signals are useful only when their limits are visible.", "The live Polaris demo separates collecting sources, available connectors, blocked or limited sources, confidence, conflicts, and what each source unlocks. Missing visibility becomes work, not a quiet blank space.")}
      ${table([
        ["Coverage state", "What it says", "Assessment value"],
        ["Collecting", "The source is fresh enough to create findings, verify closures, and show confidence level.", "Turns evidence into owner-ready work and gives closure a source-backed proof path."],
        ["Available to connect", "The product knows the connector would improve coverage, but it is not currently connected.", "Creates an honest opportunity list: Action1 patch, CrowdStrike EDR, XDR hunting, or similar sources."],
        ["Blocked or limited", "The source is blocked by license, permission, export-only access, stale data, or unsupported API behavior.", "Prevents silent blind spots and explains exactly what would unlock better assessment."],
        ["Conflict", "Two sources disagree or a source cannot fully support closure.", "Escalates ambiguity into a human decision instead of hiding it in a score."]
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
        railCard("02", "Qualify", "Classify findings by state, confidence, conflict, source health, SLA, and owner."),
        railCard("03", "Prioritize", "Rank 72-hour, two-week, 30-day, backlog, blocked, waiting, regressed, and verified work."),
        railCard("04", "Report", "Show verified closure, regressions, blocked visibility, and source unlocks to leadership.")
      ])}
    </div>
  </section>`;
}

function roleViews() {
  return `<section class="section">
    <div class="shell">
      ${sectionHead("Role-based views", "Same evidence, different decisions.", "RoadRunner gives each stakeholder the same evidence in the format they can act on.")}
      ${rail(3, [
        railCard("MSP", "MSP operator", "Needs source health, client queues, owner status, blocked evidence, and service delivery notes."),
        railCard("EXEC", "Client executive", "Needs risk direction, verified closures, unresolved priority items, and business-facing posture summaries."),
        railCard("TECH", "Technical owner", "Needs affected entities, fix steps, proof, and exact validation criteria for the next run.")
      ])}
    </div>
  </section>`;
}
