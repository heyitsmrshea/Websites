// Home — the emotional arc: thesis, the finding, the proof, the model, the memo.
import { sectionHead, exhibit, exhibitRow, findingArtifact, findings, contactSection } from "../helpers.mjs";

export function homeBody() {
  return `
${manifesto()}
${sampleFinding()}
${productProof()}
${whiteLabel()}
${positioningMemo()}
${contactSection()}`;
}

function manifesto() {
  return `<section class="section tinted tint-rose">
    <div class="shell manifesto">
      <div class="manifesto-statement rv">
        <div class="eyebrow rose">Operating thesis</div>
        <p class="fear">Most security tools tell you to be afraid.</p>
        <p class="fix">RoadRunner tells you <em>what to fix.</em></p>
        <p class="sub">NAMES. HOSTNAMES. APP IDS. ATTACK-PATH EDGES. VALIDATION CRITERIA.<br>The artifact matters because it turns anxiety into a work queue.</p>
      </div>
      <div class="contrast-ledger">
        ${contrastRow("Dashboard", "“You are at risk.”", "These identities, devices, policies, and paths need action this week.", 0)}
        ${contrastRow("Audit", "“Here is a point-in-time report.”", "Here is the next run condition that proves closure.", 1)}
        ${contrastRow("Score", "“Improve the number.”", "Close the exposure and show the changed evidence.", 2)}
      </div>
    </div>
  </section>`;
}

function contrastRow(who, them, us, i) {
  return `<div class="contrast-row rv" style="--d:${(i * 0.1).toFixed(1)}s">
    <div class="them"><span class="who">${who} says</span><span>${them}</span></div>
    <div class="us"><span class="who">RoadRunner says</span><span>${us}</span></div>
  </div>`;
}

function sampleFinding() {
  return `<section class="section tight">
    <div class="shell">
      ${sectionHead("The unit of work", "This is what a finding looks like.", "Not a chart. Not a score. A named exposure with an owner-ready fix and the evidence condition that closes it.")}
      ${findingArtifact(findings.home)}
    </div>
  </section>`;
}

function productProof() {
  return `<section class="section tinted tint-teal" style="--tint-x: 80%">
    <div class="shell">
      ${sectionHead("Product proof", "Show the real surfaces, not decoration.", "The Polaris screens are MSP white-label examples. RoadRunner owns the assessment logic underneath.")}
      ${exhibitRow(
        exhibit({ img: "exhibit-exec", url: "polaris.msp/executive", letter: "A", alt: "Polaris executive posture dashboard: composite gauge at 65.8%, 27 needs-action, $10k savings, a what-changed list of new and resolved findings, and a coverage-and-honesty panel", caption: "Executive posture — risk direction, closure counts, source gaps", width: 1440, height: 900 }),
        "Leadership sees the story, not a wall of charts.",
        "Risk direction, verified closure counts, identified savings, and exactly what changed since last run — with the honesty panel showing what cannot be assessed yet."
      )}
      ${exhibitRow(
        exhibit({ img: "exhibit-attack", url: "polaris.msp/on-prem", letter: "B", alt: "Polaris on-prem view: an Active Directory attack-path graph with the shortest route from svc-build to Domain Admins ignited in red, a four-hop breakdown panel, and a recommended-cut callout", caption: "On-prem attack paths — the edge that should die this week", width: 1440, height: 900 }),
        "Technical owners see the path and the cut.",
        "AD topology becomes a shortest-path-to-Tier-0 graph, the risky edge, low-disruption collector options, and the validation target for the next run.",
        true
      )}
      ${exhibitRow(
        exhibit({ img: "exhibit-vciso", url: "polaris.msp/vciso", letter: "C", alt: "Polaris AI vCISO answering what to fix first, naming entities and citing finding IDs and evidence sources for every claim, and stating a data gap instead of inventing", caption: "Evidence-grounded vCISO — cited answers, no invention", width: 1440, height: 900 }),
        "Answers cite evidence instead of inventing it.",
        "The vCISO names entities, cites the finding and source for every claim, and says plainly when data is missing instead of writing fiction around it."
      )}
    </div>
  </section>`;
}

function whiteLabel() {
  return `<section class="section">
    <div class="shell">
      ${sectionHead("White-label model", "RoadRunner powers the assessment. MSPs own the client-facing brand.", "Polaris is the MSP you work for. The brand relationship is explicit: the assessment machine is RoadRunner's, and MSPs can put their name on the client surface.")}
      <div class="chain rv">
        <div class="chain-node">
          <span class="who">The engine</span>
          <h3>RoadRunner</h3>
          <p>Owns the assessment method, product logic, evidence model, validation doctrine, and the RoadRunner Secure brand.</p>
        </div>
        <span class="chain-link" aria-hidden="true">→</span>
        <div class="chain-node">
          <span class="who">The brand</span>
          <h3>MSP partner</h3>
          <p>Presents the client-facing portal, reporting language, and service package under its own brand.</p>
        </div>
        <span class="chain-link" aria-hidden="true">→</span>
        <div class="chain-node">
          <span class="who">The outcome</span>
          <h3>Client</h3>
          <p>Receives named findings, proof, remediation guidance, and a closure history they can review.</p>
        </div>
      </div>
    </div>
  </section>`;
}

function positioningMemo() {
  const q = (question, dash, pit, rr, i) => `<div class="memo-q rv" style="--d:${(i * 0.08).toFixed(2)}s">
    <h3>${question}</h3>
    <div class="memo-answers">
      <div><span class="who">Dashboard</span><span>${dash}</span></div>
      <div><span class="who">Point-in-time assessment</span><span>${pit}</span></div>
      <div class="rr"><span class="who">RoadRunner Secure</span><span>${rr}</span></div>
    </div>
  </div>`;
  return `<section class="section tinted tint-green" style="--tint-x: 15%">
    <div class="shell">
      ${sectionHead("Positioning", "Dashboards report. Assessments age. <span class='ital'>RoadRunner closes.</span>", "The distinction matters: a finding is open until evidence changes, not until someone clicks done.", "green")}
      <div class="paper rv-scale">
        <div class="paper-doc"><span>RR-MEMO-001 · Positioning</span><span>Internal · Reviewed weekly</span></div>
        ${q("What changed this week?", "Usually buried in charts", "Not available after delivery", "Diffed every run", 0)}
        ${q("Who is affected?", "Often a count", "Usually sampled", "Named accounts, devices, resources, and paths", 1)}
        ${q("How does it close?", "Manual status or score movement", "Follow-up meeting", "Evidence must prove closure", 2)}
        ${q("What if data is missing?", "Silent blind spot", "Caveat in the report", "Visible data-gap finding", 3)}
        <div class="paper-foot"><span>ROADRUNNER SECURE · POSITIONING MEMO</span><span>SHA 9F21C4 · PAGE 1/1</span></div>
      </div>
    </div>
  </section>`;
}
