// Home — the emotional arc: thesis, the finding, the proof, the model, the memo.
import { sectionHead, exhibit, exhibitRow, contactSection } from "../helpers.mjs";

export function homeBody() {
  return `
${manifesto()}
${theLoop()}
${productProof()}
${whiteLabel()}
${positioningMemo()}
${contactSection()}`;
}

// Moment 2: one finding travels evidence -> findings -> queue -> fix -> prove
// as you scroll; the sticky card and ambient color walk rose -> amber -> green.
function theLoop() {
  const stage = (n, color, label, kicker, body, evi, cardTitle, state, evidence) =>
    `<div class="loop-stage" data-color="${color}" data-label="${label}" data-title="${cardTitle}" data-state="${state}" data-evidence="${evidence}" style="--stage-c:${color}">
      <span class="n">${n}</span>
      <h3>${kicker}</h3>
      <p>${body}</p>
      <div class="evi">${evi}</div>
    </div>`;
  return `<section class="section loop" data-loop aria-label="How a finding travels from evidence to verified closure">
    <div class="shell">
      <div class="loop-intro rv" style="margin-bottom:8px">
        <div class="eyebrow">The operating loop</div>
        <h2 style="max-width:20ch">One finding, from raw evidence to <span class="ital">verified death.</span></h2>
      </div>
      <div class="loop-scroller">
        <div class="loop-stages">
          ${stage("01", "#fb7185", "Stage 01 · Evidence", "Read the tenant.", "Read-only connectors and the collector observe posture. No changes, no agents left behind — just a fresh snapshot with source health attached.", "entra.roles[] · sign_ins[14d] · rr-ad-2026-07-05.json", "Standing privileged access outside emergency workflow", "OPEN · EXPOSED", "3 Global Admins · no JIT activation record")}
          ${stage("02", "#fb7185", "Stage 02 · Finding", "Name the exposure.", "Rules turn evidence into a named finding — the accounts, the risk, the blast radius. Not a score. A thing you can hand to a person.", "RR-F-0117 · severity HIGH · owner: identity", "Standing privileged access outside emergency workflow", "HIGH · NAMED", "3 Global Admins, 2 Privileged Role Admins")}
          ${stage("03", "#fbbf24", "Stage 03 · Queue", "Rank and assign.", "The finding lands in the weekly queue, ranked by exposure and blast radius, routed to an owner with a fix and a lane. Now it is work.", "queued → identity · 72-hour lane", "Standing privileged access outside emergency workflow", "IN QUEUE · 72H", "move to PIM-eligible · require phishing-resistant MFA")}
          ${stage("04", "#fbbf24", "Stage 04 · Fix", "The team acts.", "The customer or MSP makes the approved change outside RoadRunner. We recommend; we never auto-remediate. The evidence will decide, not the checkbox.", "admins moved to eligible access · break-glass documented", "Standing privileged access outside emergency workflow", "FIX CLAIMED", "awaiting next evidence run")}
          ${stage("05", "#34d399", "Stage 05 · Prove", "The next run decides.", "The following run re-reads the evidence. If no standing assignment remains outside break-glass, the finding closes — with a hash. If it regresses, it reopens itself.", "next run: 0 standing assignments · closure sha 3af9", "Standing privileged access outside emergency workflow", "VERIFIED CLOSED", "evidence diff satisfied validation · sha 3af9")}
        </div>
        <div class="loop-sticky">
          <div class="loop-card">
            <div class="loop-track">
              <div class="loop-pip"><i></i><span>EVIDENCE</span></div>
              <div class="loop-pip"><i></i><span>FINDING</span></div>
              <div class="loop-pip"><i></i><span>QUEUE</span></div>
              <div class="loop-pip"><i></i><span>FIX</span></div>
              <div class="loop-pip"><i></i><span>PROVE</span></div>
            </div>
            <div class="lc-label">Sample finding · RR-F-0117</div>
            <h4>Standing privileged access outside emergency workflow</h4>
            <span class="lc-state">OPEN · EXPOSED</span>
            <div class="lc-meta">
              <div><b>Evidence</b><span class="lc-evidence">3 Global Admins · no JIT activation record</span></div>
              <div><b>Closure</b><span>Manual status cannot close it — the next run must prove it.</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`;
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

// Moment 3: the same client portal, re-skinned live. RoadRunner owns the
// engine; the MSP owns the brand on the client surface.
function whiteLabel() {
  return `<section class="section">
    <div class="shell">
      ${sectionHead("White-label model", "One assessment engine. <span class='ital'>Your name on the door.</span>", "RoadRunner owns the method, the evidence model, and the validation doctrine. The MSP owns the brand the client sees. Flip the switch — same product, same proof, different logo.")}
      <div class="brandswap rv" data-brandswap>
        <div class="swap-controls" role="group" aria-label="Choose the client-facing brand">
          <span class="k">Client sees</span>
          <button class="swap-btn round" style="--sw:#2dd4bf" data-accent="#2dd4bf" data-name="RoadRunner" data-round="1" data-foot="ROADRUNNER SECURE · DIRECT ENGAGEMENT" aria-pressed="false">
            <span class="dot"></span><span><span class="bn">RoadRunner</span><span class="bd">direct — the engine, unbranded</span></span>
          </button>
          <button class="swap-btn" style="--sw:#5b9cf6" data-accent="#5b9cf6" data-name="Polaris" data-round="0" data-foot="POLARIS · YOUR MSP'S SECURITY PRACTICE" aria-pressed="true">
            <span class="dot"></span><span><span class="bn">Polaris MSP</span><span class="bd">white-label partner (demo)</span></span>
          </button>
          <button class="swap-btn round" style="--sw:#f59e0b" data-accent="#f59e0b" data-name="Meridian" data-round="1" data-foot="MERIDIAN MSP · MANAGED SECURITY REVIEW" aria-pressed="false">
            <span class="dot"></span><span><span class="bn">Meridian MSP</span><span class="bd">a second partner brand</span></span>
          </button>
        </div>
        <div class="swap-portal">
          <div class="swap-portal-bar">
            <span class="swap-gem"></span>
            <span class="swap-brandname" data-brandname="mono">POLARIS</span>
            <span class="live">● CURRENT</span>
          </div>
          <div class="swap-portal-body">
            <div class="swap-kpis">
              <div class="swap-kpi" style="--kc:#34d399"><b>6</b><span>Verified closed</span></div>
              <div class="swap-kpi" style="--kc:#f43f5e"><b>5</b><span>In your queue</span></div>
              <div class="swap-kpi"><b>3</b><span>Data gaps</span></div>
            </div>
            <div class="swap-rows">
              <div class="r"><span class="v">VERIFIED</span><span>MFA exception removed — sign-in evidence attached</span><span class="meta mono">RUN 07</span></div>
              <div class="r"><span class="v">VERIFIED</span><span>Anonymous sharing disabled tenant-wide — policy diff</span><span class="meta mono">RUN 07</span></div>
              <div class="r"><span class="v">VERIFIED</span><span>Dormant admins removed from Server Operators</span><span class="meta mono">RUN 06</span></div>
            </div>
            <div class="swap-foot">Prepared by <b data-brandname="proper">Polaris</b> · <span data-brandfoot>POLARIS · YOUR MSP'S SECURITY PRACTICE</span> · powered by RoadRunner Secure</div>
          </div>
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
