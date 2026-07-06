// Walkthrough — the guided casefile: scenario, three chapters, the combined finding.
import { sectionHead, exhibit, flow, findingArtifact, findings, contactSection, stamp } from "../helpers.mjs";

export function demoBody() {
  return `
${scenario()}
${chapter(1, "walkthrough-executive", "Executive posture", "Leadership gets risk direction, closure counts, source gaps, and the story of what changed.", {
    img: "exhibit-exec", url: "polaris.msp/executive", letter: "A",
    alt: "Polaris executive posture view: composite gauge at 65.8%, needs-action count, monthly savings, a what-changed list, and a coverage-and-honesty panel",
    caption: "Executive posture — the run in one screen", width: 1440, height: 900
  }, "The composite number is context. The panel that matters is <em>what changed</em> — findings new and resolved, diffed against the previous run, plus the coverage panel that says out loud what cannot be assessed yet.")}
${chapter(2, "walkthrough-onprem", "On-prem attack path", "The product does not stop at graph visualization. It points to the path edge that should be cut.", {
    img: "exhibit-attack", url: "polaris.msp/on-prem", letter: "B",
    alt: "Polaris on-prem view: an AD attack-path graph with the svc-build-to-Tier-0 route ignited, a four-hop breakdown, a recommended cut, and a read-only collector command",
    caption: "On-prem — find the path, cut the edge", width: 1440, height: 900
  }, "Click any node and the shortest privilege path to Tier 0 ignites hop by hop. Beside it, the four-hop breakdown and the cheapest defensible edge to cut — with a read-only collector command below.", true)}
${chapter(3, "walkthrough-microsoft", "Evidence-grounded vCISO", "Answers are grounded in findings and source evidence. Missing data is stated instead of invented.", {
    img: "exhibit-vciso", url: "polaris.msp/vciso", letter: "C",
    alt: "Polaris AI vCISO view answering with entity names and cited finding IDs and sources, and stating a data gap rather than inventing",
    caption: "AI vCISO — cited, scoped, honest", width: 1440, height: 900
  }, "Ask what to fix first and the answer names entities, cites the finding and the source for every claim, and refuses to invent around missing evidence.")}
${combinedFinding()}
${reportFold()}
${contactSection()}`;
}

function scenario() {
  return `<section class="section" id="walkthrough">
    <div class="shell">
      ${sectionHead("Scenario", "A client has privilege sprawl, Conditional Access gaps, and on-prem lateral movement exposure.", "The walkthrough follows one synthetic weekly run from baseline through findings, remediation queue, validation, and reporting.")}
      ${flow([
        ["Baseline", "Connect read-only sources and establish the first evidence snapshot."],
        ["Findings", "Create named findings tied to accounts, devices, policies, and paths."],
        ["Queue", "Rank what should happen this week and assign owners."],
        ["Fix", "Customer or MSP makes approved changes outside RoadRunner."],
        ["Validate", "Next run checks whether evidence changed."],
        ["Report", "Leadership sees verified closure and remaining exposure."],
        ["Repeat", "Regressions and source gaps feed the next weekly run."]
      ])}
    </div>
  </section>`;
}

function chapter(num, id, title, subtitle, shot, note, flip = false) {
  return `<section class="section chapter tinted ${num === 2 ? "tint-rose" : num === 3 ? "tint-teal" : "tint-amber"}" id="${id}">
    <div class="shell">
      <div class="chapter-head rv">
        <span class="chapter-num" aria-hidden="true">0${num}</span>
        <div class="chapter-title">
          <div class="eyebrow">Chapter 0${num} · Synthetic fixture</div>
          <h2>${title}</h2>
          <p class="lead" style="max-width:52ch">${subtitle}</p>
        </div>
      </div>
      ${exhibit(shot)}
      <div class="chapter-note rv">
        <span class="k">Watch for</span>
        <p>${note}</p>
      </div>
    </div>
  </section>`;
}

function combinedFinding() {
  return `<section class="section tinted tint-green">
    <div class="shell">
      ${sectionHead("The finale", "Two weak signals. One provable exposure.", "The walkthrough ends the way every week should: combined evidence becomes one artifact with a validation condition — and the next run decides.", "green")}
      ${findingArtifact(findings.demo)}
      <p style="margin-top:28px; display:flex; gap:18px; align-items:center; flex-wrap:wrap">
        ${stamp("Next run decides")}
        <span class="subtle" style="font-size:14px">Manual status cannot close it. That is the whole point.</span>
      </p>
    </div>
  </section>`;
}

// Moment 6: the ops surface hands off to paper — the report the client receives.
function reportFold() {
  return `<section class="section fold">
    <div class="shell">
      ${sectionHead("The deliverable", "And then it becomes a document.", "Everything above collapses into one artifact your client actually receives: stamped closures, the open 72-hour lane, and what the next run must prove — signed and hashed.")}
      <div class="fold-stage">
        <figure class="report-frame rv-scale">
          <picture>
            <source srcset="/assets/img/exhibit-report.webp" type="image/webp">
            <img src="/assets/img/exhibit-report.png" alt="The weekly assessment report on paper: run RR-2026-07, an executive summary, a closed-with-proof table with VERIFIED stamps, the open 72-hour lane, and a next-run-must-prove checklist, footed with an evidence hash" width="1000" height="1310" loading="lazy" decoding="async">
          </picture>
        </figure>
        <div class="fold-note rv">
          <div class="eyebrow green">What the client keeps</div>
          <p>A board-ready weekly report — verified closures with their evidence, remaining exposure ranked and owned, and the conditions the next run must satisfy. No score theater. No blind spots hidden. Just what changed, and the proof.</p>
          <div class="fold-meta">
            <div><b>Run</b><span>RR-2026-07</span></div>
            <div><b>Closures</b><span>6 verified · evidence-diffed</span></div>
            <div><b>Evidence sha</b><span>9F21C4</span></div>
          </div>
          <a class="button primary" href="/contact/">Scope a run of your own</a>
        </div>
      </div>
    </div>
  </section>`;
}
