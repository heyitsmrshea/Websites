// Hero visuals and SVG builders — the ops-surface furniture.
import { tag } from "./helpers.mjs";

function feedRow(level, text, meta) {
  return `<div class="feed-row">${tag(level)}<span>${text}</span><span class="meta">${meta}</span></div>`;
}

export function runPanel() {
  return `<aside class="runpanel" id="hero-run" aria-label="RoadRunner Secure weekly assessment run">
    <div class="runpanel-top">
      <div class="titleblock">
        <strong>Weekly assessment run</strong>
        <span class="runid">tenant: roadrunner-live · run RR-2026-07 · evidence sha 9f21c4</span>
      </div>
      <span class="live-dot">LIVE</span>
    </div>
    <div class="metric-row">
      <div class="metric rose"><strong data-count="27">27</strong><span>Needs action now</span></div>
      <div class="metric green"><strong data-count="19">19</strong><span>Verified closed</span></div>
      <div class="metric amber"><strong data-count="3">3</strong><span>Source gaps</span></div>
      <div class="metric teal"><strong data-count="10" data-prefix="$" data-suffix="k">$10k</strong><span>Monthly savings found</span></div>
    </div>
    <div class="feed">
      ${feedRow("HIGH", "Standing Global Admins remain assigned outside just-in-time access", "owner: identity")}
      ${feedRow("HIGH", "Legacy auth still active for named service accounts", "validate next run")}
      ${feedRow("GAP", "Cannot assess device compliance — Intune not onboarded", "source gap")}
      ${feedRow("DONE", "MFA exception removed and evidence stamped closed", "closed")}
    </div>
  </aside>`;
}

export function pipelinePanel() {
  return `<aside class="runpanel" aria-label="RoadRunner Secure evidence pipeline">
    <div class="runpanel-top">
      <div class="titleblock">
        <strong>Evidence pipeline</strong>
        <span class="runid">read → normalize → decide → validate</span>
      </div>
      <span class="tag live">RUNNING</span>
    </div>
    <svg viewBox="0 0 560 210" role="img" aria-label="Evidence flows from sources through the finding engine to outputs">
      <g fill="none" stroke="rgba(45,212,191,.5)" stroke-width="1.6">
        <path class="flowing" d="M156 50 C 186 50, 184 84, 210 92"/>
        <path class="flowing" d="M156 104 L 210 104"/>
        <path class="flowing" d="M156 170 C 186 170, 184 124, 210 116"/>
        <path class="flowing" d="M360 104 L 404 104"/>
      </g>
      ${pipeNode(16, 24, "Microsoft", "Entra · Defender · Intune", 140)}
      ${pipeNode(16, 84, "On-prem AD", "topology · privilege edges", 140)}
      ${pipeNode(16, 144, "Manual", "exceptions · context", 140)}
      ${pipeNode(210, 78, "Finding engine", "named · owned · provable", 150, true)}
      ${pipeNode(404, 78, "Outputs", "queue · report · portal", 140)}
    </svg>
  </aside>`;
}

function pipeNode(x, y, title, sub, width = 140, hot = false) {
  return `<g transform="translate(${x} ${y})">
    <rect width="${width}" height="52" rx="9" fill="${hot ? "rgba(45,212,191,.09)" : "#0f1722"}" stroke="${hot ? "rgba(45,212,191,.55)" : "rgba(198,220,236,.18)"}" stroke-width="1.4"/>
    <text x="14" y="22" fill="#f2f6f9" font-family="ui-monospace, Menlo, monospace" font-size="11.5" font-weight="600">${title}</text>
    <text x="14" y="38" fill="#6d7b88" font-family="ui-monospace, Menlo, monospace" font-size="8.5">${sub}</text>
  </g>`;
}

// AD attack graph — shared by the on-prem hero and the P4 edge-cut sequence.
export function attackGraphSvg(id = "adgraph") {
  const nodes = [
    { id: "svc", x: 70, y: 300, label: "svc-build", sub: "service acct", shape: "circle" },
    { id: "grp", x: 218, y: 246, label: "Workstation Admins", sub: "group", shape: "rect" },
    { id: "ws", x: 392, y: 292, label: "ENG-WS-044", sub: "workstation", shape: "rect" },
    { id: "sess", x: 540, y: 208, label: "admin session", sub: "activeSession", shape: "circle" },
    { id: "da", x: 664, y: 118, label: "Domain Admins", sub: "TIER 0", shape: "hex" },
    { id: "u1", x: 180, y: 96, label: "j.keller", sub: "user", shape: "circle" },
    { id: "u2", x: 348, y: 62, label: "helpdesk-7", sub: "group", shape: "rect" },
    { id: "srv", x: 520, y: 356, label: "FS-01", sub: "server", shape: "rect" }
  ];
  const edges = [
    { from: "svc", to: "grp", cls: "path-1", label: "memberOf" },
    { from: "grp", to: "ws", cls: "path-2", label: "localAdmin" },
    { from: "ws", to: "sess", cls: "path-3 cut-target", label: "activeSession" },
    { from: "sess", to: "da", cls: "path-4", label: "sessionOf" },
    { from: "u1", to: "u2", cls: "", label: "" },
    { from: "u2", to: "da", cls: "", label: "" },
    { from: "srv", to: "ws", cls: "", label: "" }
  ];
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
  const edgeSvg = edges.map((e) => {
    const a = byId[e.from], b = byId[e.to];
    return `<line class="g-edge ${e.cls}" x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}"/>`;
  }).join("\n      ");
  const nodeSvg = nodes.map((n) => {
    const shape = n.shape === "rect"
      ? `<rect x="-15" y="-15" width="30" height="30" rx="7"/>`
      : n.shape === "hex"
        ? `<circle r="20"/>`
        : `<circle r="15"/>`;
    return `<g class="g-node ${n.sub === "TIER 0" ? "t0" : ""}" data-node="${n.id}" transform="translate(${n.x} ${n.y})">
      ${shape}
      <text x="0" y="${n.shape === "hex" ? 38 : 32}" text-anchor="middle">${n.label}</text>
      <text class="sub" x="0" y="${n.shape === "hex" ? 50 : 44}" text-anchor="middle">${n.sub}</text>
    </g>`;
  }).join("\n      ");
  return `<svg id="${id}" viewBox="0 0 760 420" role="img" aria-label="Synthetic Active Directory attack path: svc-build reaches Domain Admins through workstation admin and an exposed session">
      ${edgeSvg}
      <g class="cut-mark" opacity="0"><line x1="452" y1="222" x2="480" y2="278" stroke="#f43f5e" stroke-width="3.5" stroke-linecap="round"/><line x1="480" y1="222" x2="452" y2="278" stroke="#f43f5e" stroke-width="3.5" stroke-linecap="round"/></g>
      ${nodeSvg}
    </svg>`;
}

export function attackPanel() {
  return `<aside class="runpanel graph-panel" aria-label="Active Directory attack path preview">
    <div class="runpanel-top">
      <div class="titleblock">
        <strong>Attack-path graph</strong>
        <span class="runid">shortest path to Tier 0 · collector rr-ad-2026-07-05.json</span>
      </div>
      <span class="tag high">TIER 0</span>
    </div>
    <div class="graph-canvas hero-graph">${attackGraphSvg("hero-adgraph")}</div>
    <div class="graph-legend">
      <span><i style="background:var(--rose-deep)"></i>ignited path</span>
      <span><i style="background:var(--panel-2);border:1px solid rgba(182,194,203,.5)"></i>principal / computer</span>
      <span><i style="background:rgba(244,63,94,.35)"></i>Tier 0</span>
    </div>
  </aside>`;
}

export function matrixPanel() {
  return `<aside class="runpanel" aria-label="Microsoft evidence matrix">
    <div class="runpanel-top">
      <div class="titleblock">
        <strong>Microsoft evidence matrix</strong>
        <span class="runid">score context is not closure</span>
      </div>
      <span class="tag live">GRAPH · READ-ONLY</span>
    </div>
    <div class="feed">
      ${feedRow("HIGH", "Entra — privileged roles, MFA coverage, guests", "12 findings")}
      ${feedRow("GAP", "Defender — plan coverage blocks endpoint confidence", "source gap")}
      ${feedRow("GAP", "Intune — not onboarded, device posture unknown", "data-gap finding")}
      ${feedRow("DONE", "M365 — legacy protocols disabled, evidence stamped", "closed")}
      ${feedRow("HIGH", "Azure — standing owner roles at subscription scope", "4 findings")}
    </div>
  </aside>`;
}

export function deploymentPanel() {
  return `<aside class="runpanel" aria-label="RoadRunner deployment models">
    <div class="runpanel-top">
      <div class="titleblock">
        <strong>Deployment model</strong>
        <span class="runid">pilot → MSP partner → enterprise controls</span>
      </div>
      <span class="tag live">PILOT-FIRST</span>
    </div>
    <div class="feed">
      ${feedRow("LIVE", "01 · Scoped pilot — 2 to 4 weeks, one tenant, real findings", "priced by scope")}
      ${feedRow("LIVE", "02 · MSP partner — white-label portal, recurring cadence", "priced by scope")}
      ${feedRow("LIVE", "03 · Enterprise custom — customer-owned evidence flow", "priced by scope")}
    </div>
  </aside>`;
}

export function trustPanel() {
  return `<aside class="runpanel" aria-label="RoadRunner Secure trust controls">
    <div class="runpanel-top">
      <div class="titleblock">
        <strong>Trust control ledger</strong>
        <span class="runid">explicit rules for sensitive evidence</span>
      </div>
      <span class="tag live">READ-ONLY</span>
    </div>
    <div class="feed">
      ${feedRow("DONE", "Collection — read-only connectors, offline collector options", "PASS")}
      ${feedRow("DONE", "Boundary — no credentials, no auto-remediation", "LOCKED")}
      ${feedRow("GAP", "Retention — defined during pilot or contract", "SET")}
      ${feedRow("DONE", "Offboarding — revoke, export, delete, confirm", "READY")}
    </div>
  </aside>`;
}

export function walkthroughPanel() {
  return `<aside class="runpanel" aria-label="RoadRunner walkthrough preview">
    <div class="runpanel-top">
      <div class="titleblock">
        <strong>Product walkthrough</strong>
        <span class="runid">Polaris is the MSP white-label surface</span>
      </div>
      <span class="tag gap">SYNTHETIC</span>
    </div>
    <div class="feed">
      ${feedRow("LIVE", "Chapter 01 — Executive posture: direction, cost, what changed", "3 min")}
      ${feedRow("HIGH", "Chapter 02 — On-prem attack path: find, cut, prove", "4 min")}
      ${feedRow("LIVE", "Chapter 03 — Evidence-grounded vCISO: ask, cited, honest", "3 min")}
      ${feedRow("DONE", "Finale — the weekly report your client actually receives", "stamped")}
    </div>
  </aside>`;
}

export function contactPanel() {
  return `<aside class="runpanel" aria-label="RoadRunner pilot intake">
    <div class="runpanel-top">
      <div class="titleblock">
        <strong>Pilot intake</strong>
        <span class="runid">the first call should produce a run plan</span>
      </div>
      <span class="tag live">READY</span>
    </div>
    <div class="feed">
      ${feedRow("GAP", "Scope — tenants, users, endpoints, AD domains", "needed")}
      ${feedRow("GAP", "Access — Microsoft and collector read-only review", "needed")}
      ${feedRow("DONE", "Output — weekly queue, validation, final roadmap", "set")}
      ${feedRow("LIVE", "White-label — MSP brand surface and client reporting", "option")}
    </div>
  </aside>`;
}

export const heroVisuals = {
  home: runPanel,
  platform: pipelinePanel,
  onprem: attackPanel,
  microsoft: matrixPanel,
  pricing: deploymentPanel,
  security: trustPanel,
  demo: walkthroughPanel,
  contact: contactPanel
};
