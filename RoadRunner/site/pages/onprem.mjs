// On-Prem — the cinematic page: the graph, the collector, the closure proof.
import { sectionHead, rail, table, findingArtifact, findings, termBlock, contactSection, exhibit } from "../helpers.mjs";
import { attackGraphSvg } from "../visuals.mjs";

export function onpremBody() {
  return `
${graphSection()}
${sampleFinding()}
${collectorRules()}
${collectorTerminal()}
${pathClosure()}
${contactSection()}`;
}

// P4 upgrades this into the scroll-staged edge-cut sequence.
function graphSection() {
  return `<section class="section tinted tint-rose" id="walkthrough-onprem">
    <div class="shell">
      ${sectionHead("The path", "One service account. Three hops. Tier 0.", "The graph below is a synthetic topology. The product finds the shortest privilege path to Domain Admins and points at the cheapest edge to cut.", "rose")}
      <div class="runpanel graph-panel rv-scale" data-edgecut>
        <div class="runpanel-top">
          <div class="titleblock">
            <strong>Attack-path graph — corp.example</strong>
            <span class="runid">collector rr-ad-2026-07-05.json · SAMPLE FIXTURE</span>
          </div>
          <span class="tag high" data-cut-tag>TIER 0 REACHABLE</span>
        </div>
        <div class="graph-canvas">${attackGraphSvg("adgraph-main")}</div>
        <div class="graph-legend" style="justify-content:space-between">
          <span class="graph-verdict" data-verdict><span class="dot"></span><span data-verdict-text>svc-build → Domain Admins · 4 hops · Tier 0 reachable</span></span>
          <span style="font-family:var(--font-mono);font-size:10px;color:var(--faint);letter-spacing:.08em">scroll to cut the edge ↓</span>
        </div>
      </div>
    </div>
  </section>`;
}

function sampleFinding() {
  return `<section class="section tight">
    <div class="shell">
      ${sectionHead("The finding", "The graph is not the product. The cut is.", "Every path resolves into one artifact: the exposure, the cheapest defensible change, and what the next collector run must prove.")}
      ${findingArtifact(findings.onprem)}
    </div>
  </section>`;
}

function collectorRules() {
  return `<section class="section">
    <div class="shell">
      ${sectionHead("Collector model", "Read-only, scoped, and deployable by normal IT operations.", "The collector should be explainable to an AD owner before it ever runs.")}
      <div class="rules rv">
        <div class="rule-cell">
          <span class="k">Permissions</span>
          <h3>Scoped read access</h3>
          <p>Enough to enumerate directory objects, group membership, ACLs, delegation, and computer metadata. Nothing more.</p>
        </div>
        <div class="rule-cell">
          <span class="k">Collected</span>
          <h3>Topology, not secrets</h3>
          <p>Users, groups, computers, memberships, privileged relationships, ACL edges, delegation indicators, source timestamps.</p>
        </div>
        <div class="rule-cell no">
          <span class="k">Never collected</span>
          <h3>No password material</h3>
          <p>No credential harvesting, no destructive testing, no automatic changes to directory objects. Ever.</p>
        </div>
        <div class="rule-cell">
          <span class="k">Upload paths</span>
          <h3>Fits your isolation</h3>
          <p>Direct upload to the tenant evidence store, MSP-managed upload, or offline export for isolated environments.</p>
        </div>
      </div>
    </div>
  </section>`;
}

function collectorTerminal() {
  return `<section class="section tinted tint-teal" style="--tint-x: 78%">
    <div class="shell">
      ${sectionHead("Redacted collector sample", "Technical buyers need to see the shape of evidence.", "Representative output makes clear the collector is topology-focused, not credential-focused.")}
      ${termBlock({
        title: "DC-01 · read-only · changes nothing on the box",
        id: "collector-sample",
        lines: [
          "$ roadrunner-ad-collector.exe --domain corp.example --mode read-only --output rr-ad-2026-07-05.json",
          "",
          "{",
          `  "domain": "corp.example",`,
          `  "collected_at": "2026-07-05T14:31:00Z",`,
          `  "objects": { "users": 1842, "groups": 412, "computers": 637 },`,
          `  "edges": [`,
          `    { "from": "CORP\\\\svc-build", "to": "Workstation Admins", "type": "memberOf" },`,
          `    { "from": "Workstation Admins", "to": "ENG-WS-044", "type": "localAdmin" },`,
          `    { "from": "ENG-WS-044", "to": "Domain Admins", "type": "activeSession", "confidence": "medium" }`,
          `  ],`,
          `  "secrets_collected": false,`,
          `  "changes_made": false`,
          "}"
        ]
      })}
    </div>
  </section>`;
}

function pathClosure() {
  return `<section class="section tight tinted tint-green">
    <div class="shell">
      ${sectionHead("Path closure", "Every path finding maps to a fix and a validation condition.", "The useful output is not a large graph. It is the cheapest defensible change that kills meaningful exposure.", "green")}
      ${table([
        ["Finding", "Evidence", "Recommended fix", "Validation"],
        ["Service account creates path to Tier 0", "svc-build → Workstation Admins → ENG-WS-044 → Domain Admins", "Remove svc-build from workstation admin path or isolate admin session exposure", "Next collector run no longer contains a route from svc-build to Tier 0"],
        ["Stale admin group expands blast radius", "Dormant users remain in Server Operators", "Remove dormant members and document exception owner", "Membership diff shows removed principals or approved exception"],
        ["Delegation edge enables lateral movement", "Unconstrained delegation detected on legacy app server", "Move service to constrained delegation or isolate server", "Delegation edge disappears or compensating control is attached"]
      ])}
    </div>
  </section>`;
}
