// Walkthrough — the guided casefile: scenario, three chapters, the combined finding.
import { sectionHead, exhibit, flow, findingArtifact, findings, contactSection, stamp } from "../helpers.mjs";
import { brand } from "../meta.mjs";

export function demoBody() {
  return `
${scenario()}
${liveDemo()}
${chapter(1, "walkthrough-executive", "Executive command center", "Leadership gets top decisions, open work, blocked visibility, owner load, source health, and the story of what changed.", {
    img: "exhibit-exec", url: "roadrunnersecure.com/demo/executive", letter: "A",
    alt: "RoadRunner Secure executive command center showing top critical decisions, risk and work metrics, closure and regression counts, what changed since last run, and source health",
    caption: "Executive posture — the run in one screen", width: 1280, height: 720
  }, "The composite number is context. The decisions are the product: critical/high work, SLA breaches, regressions, data gaps, low confidence, conflicts, blocked sources, monthly savings, and source health are visible in the same executive surface.")}
${chapter(2, "walkthrough-workbench", "Action Workbench", "Every open finding can be filtered, drilled, exported, and worked toward validation.", {
    img: "exhibit-queue", url: "roadrunnersecure.com/demo/workbench", letter: "B",
    alt: "RoadRunner Secure Action Workbench showing finding filters, 72-hour and two-week queues, severity and source filters, and a table of open actions with affected entities and timelines",
    caption: "Action Workbench — filter, drill, close", width: 1280, height: 720
  }, "The live demo now treats the queue as a real workbench: all open, my queue, 72-hour work, two-week work, blocked-by-source, waiting-on-customer, verified, regressed, SLA-breached, conflict, owner, confidence, source, and export views.")}
${chapter(3, "walkthrough-onprem", "On-prem collector and attack paths", "The on-prem view shows module coverage before it asks anyone to trust the path output.", {
    img: "exhibit-attack", url: "roadrunnersecure.com/demo/onprem", letter: "C",
    alt: "RoadRunner Secure on-prem assessment showing collector run registry, requested and collected modules, failed modules, skipped modules, findings, entities, and graph counts",
    caption: "On-prem — collector coverage before path closure", width: 1280, height: 720
  }, "The current on-prem demo exposes the collector run registry, requested modules, collected modules, failures, skips, findings, entities, and graph counts. A failed ADReplication module becomes a visible limitation instead of a hidden blind spot.", true)}
${chapter(4, "walkthrough-sources", "Source and Coverage Center", "Coverage is treated as evidence: collecting, available, blocked, limited, and what each source unlocks.", {
    img: "exhibit-sources", url: "roadrunnersecure.com/demo/sources", letter: "D",
    alt: "RoadRunner Secure Source and Coverage Center showing collecting sources, available connectors, blocked or limited coverage, closure capability, prerequisites, findings, and conflicts",
    caption: "Source coverage — what is known, missing, blocked, or unlockable", width: 1280, height: 720
  }, "The live demo now makes source readiness first-class: 13 collecting sources, 3 available connectors, blocked or limited Purview coverage, closure capability, prerequisites, unlocked finding families, and source conflicts.")}
${chapter(5, "walkthrough-microsoft", "Evidence-grounded AI vCISO", "Answers are grounded in findings and source evidence. Missing data is stated instead of invented.", {
    img: "exhibit-vciso", url: "roadrunnersecure.com/demo/vciso", letter: "E",
    alt: "RoadRunner Secure AI vCISO view answering with entity names and cited finding IDs and sources, and stating a data gap rather than inventing",
    caption: "AI vCISO — cited, scoped, honest", width: 1280, height: 720
  }, "Ask what to fix first and the answer names entities, cites the action queue, weekly finding status, closure history, source conflicts, and source readiness. When data is missing, it tells you exactly which connector unlocks the answer.")}
${combinedFinding()}
${reportFold()}
${contactSection()}`;
}

function scenario() {
  return `<section class="section" id="walkthrough">
    <div class="shell">
      ${sectionHead("Scenario", "Privilege sprawl, CA gaps, and on-prem exposure.", "The walkthrough follows one synthetic weekly run from baseline through findings, remediation queue, validation, and reporting.")}
      ${flow([
        ["Baseline", "Connect read-only sources and establish the first evidence snapshot."],
        ["Findings", "Create named findings tied to accounts, devices, policies, and paths."],
        ["Queue", "Rank this week’s work and assign owners."],
        ["Coverage", "Show what is collecting, blocked, stale, or available to unlock."],
        ["Fix", "Customer or MSP makes approved changes outside RoadRunner."],
        ["Validate", "Next run checks whether evidence changed."],
        ["Report", "Leadership sees verified closure and remaining exposure."],
        ["Repeat", "Regressions and source gaps feed the next weekly run."]
      ])}
    </div>
  </section>`;
}

function liveDemo() {
  return `<section class="section tight tinted tint-teal" style="--tint-x:82%">
    <div class="shell">
      <div class="artifact rv-scale">
        <div class="artifact-top">
          <div>
            <span class="label">Live RoadRunner demo · Synthetic fixture</span>
            <h3>Open the current RoadRunner Secure assessment.</h3>
          </div>
          <span class="tag live">LIVE DEMO</span>
        </div>
        <div class="artifact-grid">
          ${demoField("Routes", "Executive, Action Workbench, On-Prem, Source & Coverage, AI vCISO")}
          ${demoField("Fixture", "Northwind Trading Co. and Cascade Logistics demo tenants; all figures are fictional.")}
          ${demoField("What changed", "The demo now foregrounds blocked sources, confidence, conflicts, module coverage, source unlocks, and queue filtering.")}
          ${demoField("Use it for", "Showing how RoadRunner can power an MSP-branded client experience without pretending synthetic data is real.")}
          <div class="artifact-field rule">
            <b>Open demo</b>
            <span><a class="textlink" href="${brand.demoUrl}" target="_blank" rel="noopener">Launch roadrunnersecure.com/demo</a></span>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

function demoField(label, text) {
  return `<div class="artifact-field"><b>${label}</b><span>${text}</span></div>`;
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
      ${sectionHead("The finale", "Two weak signals. One provable exposure.", "The walkthrough ends with combined evidence, one artifact, a validation condition, and a next run that decides.", "green")}
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
