import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const siteDir = dirname(fileURLToPath(import.meta.url));

const brand = {
  name: "RoadRunner Secure",
  owner: "RoadRunner Strategies",
  email: "drew@roadrunnerstrategies.com",
  root: "https://roadrunnersecure.com"
};

const navItems = [
  ["/", "Home"],
  ["/platform/", "Platform"],
  ["/on-prem-attack-paths/", "On-Prem"],
  ["/microsoft-security/", "Microsoft"],
  ["/pricing/", "Pricing"],
  ["/security/", "Security"],
  ["/demo/", "Walkthrough"],
  ["/contact/", "Contact"]
];

const pages = [
  {
    file: "index.html",
    slug: "",
    active: "Home",
    visual: "cockpit",
    title: "RoadRunner Secure | Evidence-verified security assessment",
    description: "RoadRunner Secure turns Microsoft, endpoint, cloud, and on-prem evidence into named findings, weekly remediation work, and evidence-verified closure.",
    eyebrow: "RoadRunner-owned assessment platform",
    h1: "A dashboard is not a decision.",
    lead: "RoadRunner Secure converts tenant evidence into a weekly operating loop: what changed, who is affected, what to fix, who owns it, and what the next run must prove before closure.",
    primary: ["/demo/", "Open the walkthrough"],
    secondary: ["/contact/", "Scope a pilot"],
    body: homeBody
  },
  {
    file: "Platform.dc.html",
    slug: "platform",
    active: "Platform",
    visual: "architecture",
    title: "Platform | RoadRunner Secure evidence workflow",
    description: "How RoadRunner Secure turns read-only evidence into findings, remediation queues, validation runs, and client-ready reporting.",
    eyebrow: "Platform workflow",
    h1: "Evidence in. Verified closure out.",
    lead: "The product is a repeatable assessment machine. Sources are read, findings are generated, work is prioritized, and the next run decides what is actually closed.",
    primary: ["/demo/", "See the workflow"],
    secondary: ["/security/", "Review trust model"],
    body: platformBody
  },
  {
    file: "OnPrem Attack Paths.dc.html",
    slug: "on-prem-attack-paths",
    active: "On-Prem",
    visual: "attack",
    title: "On-Prem Attack Paths | Active Directory path assessment",
    description: "RoadRunner Secure maps Active Directory attack paths, recommends low-disruption fixes, and verifies path closure on the next run.",
    eyebrow: "On-prem attack paths",
    h1: "Find the path. Cut the edge. Prove it died.",
    lead: "RoadRunner turns Active Directory topology into practical path-closure work: which account, group, delegation, or server creates exposure, what to change, and what the next collector run must prove.",
    primary: ["/demo/#walkthrough-onprem", "Open AD walkthrough"],
    secondary: ["/contact/", "Scope on-prem"],
    body: onPremBody
  },
  {
    file: "Microsoft Security.dc.html",
    slug: "microsoft-security",
    active: "Microsoft",
    visual: "microsoft",
    title: "Microsoft Security | Entra, Defender, Intune, M365, and Azure assessment",
    description: "RoadRunner Secure converts Microsoft security evidence into prioritized findings, owner-ready remediation, and verified closure.",
    eyebrow: "Microsoft security assessment",
    h1: "Microsoft posture without score theater.",
    lead: "Secure Score is useful context, not the assessment. RoadRunner turns Entra, Defender, Intune, M365, and Azure evidence into specific work your team can assign and validate.",
    primary: ["/demo/#walkthrough-microsoft", "Open Microsoft walkthrough"],
    secondary: ["/security/", "Review permissions"],
    body: microsoftBody
  },
  {
    file: "Pricing.dc.html",
    slug: "pricing",
    active: "Pricing",
    visual: "deployment",
    title: "Pricing | RoadRunner Secure pilot and MSP partner models",
    description: "RoadRunner Secure starts with a scoped pilot, then prices by tenant count, evidence sources, deployment model, and white-label requirements.",
    eyebrow: "Pilot-first pricing",
    h1: "Price the assessment around proof.",
    lead: "Start with a focused pilot that produces real findings, a weekly queue, and a final remediation roadmap. Continue only if the output creates useful work.",
    primary: ["/contact/", "Scope a pilot"],
    secondary: ["/demo/", "Review walkthrough"],
    body: pricingBody
  },
  {
    file: "Security.dc.html",
    slug: "security",
    active: "Security",
    visual: "trust",
    title: "Security | RoadRunner Secure data handling and connector posture",
    description: "Security posture for RoadRunner Secure: read-only collection, connector permissions, tenant isolation, retention, offboarding, and disclosure process.",
    eyebrow: "Security and trust",
    h1: "Sensitive evidence needs explicit rules.",
    lead: "RoadRunner Secure is designed around read-only evidence collection, least-privilege access, tenant separation, visible limitations, and customer-controlled deployment options where required.",
    primary: ["/contact/", "Ask security questions"],
    secondary: ["/pricing/", "Discuss pilot"],
    body: securityBody
  },
  {
    file: "Demo.dc.html",
    slug: "demo",
    active: "Walkthrough",
    visual: "walkthrough",
    title: "Product Walkthrough | RoadRunner Secure",
    description: "A guided synthetic RoadRunner Secure walkthrough showing baseline assessment, findings, remediation queue, validation, and white-label reporting.",
    eyebrow: "Guided product walkthrough",
    h1: "A weekly run, start to finish.",
    lead: "A synthetic run using fictional evidence. Polaris branding demonstrates an MSP white-label client portal powered by RoadRunner Secure.",
    primary: ["#walkthrough", "Start walkthrough"],
    secondary: ["/contact/", "Walk through it live"],
    body: demoBody
  },
  {
    file: "Contact.dc.html",
    slug: "contact",
    active: "Contact",
    visual: "contact",
    title: "Contact | RoadRunner Secure pilot and white-label assessment",
    description: "Contact RoadRunner Secure to scope a pilot, review the MSP white-label model, or walk through the synthetic assessment demo.",
    eyebrow: "Contact RoadRunner",
    h1: "Scope the first assessment run.",
    lead: "Use this page to request a pilot, review the MSP white-label model, or walk through the synthetic product flow. The static form opens your email client and stores nothing on the site.",
    primary: [`mailto:${brand.email}?subject=RoadRunner%20Secure%20pilot%20scope`, "Email directly"],
    secondary: ["/demo/", "Review walkthrough"],
    body: contactBody
  }
];

const css = String.raw`
:root {
  color-scheme: dark;
  --void: #03070b;
  --void-2: #071019;
  --ink: #f4f8fb;
  --soft: #b8c4ce;
  --muted: #6f7d8a;
  --panel: #0b121a;
  --panel-2: #101922;
  --panel-3: #131f2a;
  --line: rgba(203, 224, 238, .15);
  --line-strong: rgba(45, 212, 191, .42);
  --cyan: #2dd4bf;
  --cyan-2: #67e8f9;
  --blue: #3b82f6;
  --red: #f43f5e;
  --amber: #f59e0b;
  --green: #22c55e;
  --paper: #f7f9fb;
  --paper-ink: #071019;
  --radius: 8px;
  --shadow: 0 32px 110px rgba(0, 0, 0, .45);
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  background:
    linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px),
    linear-gradient(180deg, rgba(255,255,255,.03) 1px, transparent 1px),
    var(--void);
  background-size: 72px 72px;
  color: var(--ink);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  line-height: 1.5;
}
img, svg { max-width: 100%; }
a { color: inherit; }
a:focus-visible, button:focus-visible, input:focus-visible, select:focus-visible, textarea:focus-visible, summary:focus-visible {
  outline: 3px solid var(--cyan);
  outline-offset: 3px;
}
.skip-link {
  position: absolute;
  left: 16px;
  top: -60px;
  z-index: 100;
  background: var(--cyan);
  color: var(--void);
  padding: 10px 14px;
  border-radius: var(--radius);
  font-weight: 900;
}
.skip-link:focus { top: 16px; }

.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(3, 7, 11, .84);
  border-bottom: 1px solid var(--line);
  backdrop-filter: blur(18px) saturate(130%);
}
.nav-shell {
  max-width: 1320px;
  margin: 0 auto;
  padding: 12px 24px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 18px;
}
.brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  min-width: 0;
}
.brand-mark {
  width: 44px;
  height: 36px;
  display: grid;
  place-items: center;
  flex: none;
}
.brand-mark img { width: 44px; height: auto; display: block; }
.brand-title {
  display: grid;
  gap: 1px;
  min-width: 0;
}
.brand-title strong {
  font-size: 14px;
  line-height: 1.1;
  font-weight: 850;
}
.brand-title span {
  color: var(--muted);
  font-family: "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px;
}
.nav-links {
  display: flex;
  justify-content: center;
  gap: 2px;
  flex-wrap: wrap;
}
.nav-links a {
  text-decoration: none;
  font-size: 12px;
  font-weight: 750;
  color: var(--soft);
  padding: 8px 9px;
  border: 1px solid transparent;
  border-radius: 6px;
}
.nav-links a:hover, .nav-links a[aria-current="page"] {
  color: var(--ink);
  border-color: var(--line);
  background: rgba(255,255,255,.05);
}
.nav-cta {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}
.mobile-menu { display: none; }
.mobile-menu summary {
  list-style: none;
}
.mobile-menu summary::-webkit-details-marker { display: none; }
.mobile-menu-panel {
  display: grid;
  gap: 8px;
  padding-top: 12px;
}
.mobile-menu:not([open]) .mobile-menu-panel { display: none; }
.mobile-menu-panel a {
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius);
  border: 1px solid var(--line);
  background: rgba(255,255,255,.055);
  color: var(--ink);
  text-decoration: none;
  font-weight: 850;
}
.mobile-menu-panel a[aria-current="page"] {
  border-color: var(--line-strong);
  color: var(--cyan);
}

.button, button.button {
  min-height: 42px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  border-radius: 6px;
  border: 1px solid var(--line);
  padding: 11px 16px;
  font: inherit;
  font-size: 13px;
  font-weight: 850;
  text-decoration: none;
  cursor: pointer;
}
.button.primary {
  background: var(--cyan);
  border-color: var(--cyan);
  color: var(--void);
  box-shadow: 0 0 30px rgba(45, 212, 191, .22);
}
.button.secondary {
  background: rgba(255,255,255,.045);
  color: var(--ink);
}
.button:hover { transform: translateY(-1px); }

.hero {
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid var(--line);
}
.hero::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(115deg, rgba(45, 212, 191, .16), transparent 28%),
    linear-gradient(180deg, rgba(7, 16, 25, .62), rgba(3, 7, 11, .95));
}
.hero::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: .35;
  background: repeating-linear-gradient(180deg, transparent 0, transparent 5px, rgba(255,255,255,.035) 6px);
  mix-blend-mode: overlay;
}
.hero-inner, .section-inner {
  position: relative;
  z-index: 1;
  max-width: 1320px;
  margin: 0 auto;
  padding: 88px 24px;
}
.hero-grid {
  min-height: 690px;
  display: grid;
  grid-template-columns: minmax(0, .88fr) minmax(520px, 1.12fr);
  gap: 44px;
  align-items: center;
}
.hero-copy { max-width: 660px; }
.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  margin-bottom: 20px;
  color: var(--cyan);
  font-family: "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
}
.eyebrow::before {
  content: "";
  width: 8px;
  height: 8px;
  background: var(--cyan);
  box-shadow: 0 0 20px rgba(45, 212, 191, .72);
}
h1, h2, h3 {
  margin: 0;
  line-height: 1.06;
  letter-spacing: 0;
}
h1 {
  font-size: 76px;
  font-weight: 900;
}
h2 {
  font-size: 46px;
  font-weight: 900;
}
h3 {
  font-size: 20px;
  font-weight: 850;
}
.lead {
  margin: 24px 0 0;
  max-width: 66ch;
  color: var(--soft);
  font-size: 18px;
}
.hero-actions, .section-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 32px;
}
.signal-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 24px;
}
.signal-chip {
  min-height: 30px;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  border: 1px solid var(--line);
  border-radius: 6px;
  background: rgba(255,255,255,.045);
  color: var(--soft);
  padding: 6px 9px;
  font-family: "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
}
.signal-chip::before {
  content: "";
  width: 6px;
  height: 6px;
  background: var(--cyan);
}

.command-surface, .data-panel, .finding-artifact, .product-shot, .comparison, .contact-form {
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: linear-gradient(180deg, rgba(16, 25, 34, .96), rgba(8, 14, 21, .98));
  box-shadow: var(--shadow);
}
.command-surface {
  min-height: 520px;
  padding: 18px;
  overflow: hidden;
}
.surface-top {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: start;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--line);
}
.surface-title {
  display: flex;
  align-items: center;
  gap: 12px;
}
.surface-title img {
  width: 52px;
  height: auto;
}
.surface-title strong { display: block; }
.surface-title span, .surface-kicker {
  display: block;
  color: var(--muted);
  font-family: "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px;
}
.live-dot {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: var(--green);
  font-family: "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px;
  font-weight: 800;
}
.live-dot::before {
  content: "";
  width: 8px;
  height: 8px;
  background: var(--green);
  box-shadow: 0 0 16px rgba(34, 197, 94, .8);
}
.surface-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
  margin-top: 16px;
}
.metric-tile {
  min-height: 116px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 14px;
  background: rgba(255,255,255,.035);
}
.metric-tile strong {
  display: block;
  color: var(--ink);
  font-size: 38px;
  line-height: 1;
}
.metric-tile span {
  display: block;
  margin-top: 10px;
  color: var(--muted);
  font-size: 13px;
}
.metric-tile.red { border-left: 3px solid var(--red); }
.metric-tile.cyan { border-left: 3px solid var(--cyan); }
.metric-tile.green { border-left: 3px solid var(--green); }
.metric-tile.amber { border-left: 3px solid var(--amber); }
.finding-feed {
  display: grid;
  gap: 8px;
  margin-top: 16px;
}
.feed-row {
  display: grid;
  grid-template-columns: 72px 1fr auto;
  gap: 12px;
  align-items: center;
  border: 1px solid var(--line);
  border-radius: 6px;
  padding: 12px;
  background: rgba(3,7,11,.55);
  font-size: 13px;
}
.mono {
  color: var(--muted);
  font-family: "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px;
}
.tag {
  display: inline-flex;
  justify-content: center;
  border-radius: 4px;
  padding: 4px 7px;
  font-family: "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 10px;
  font-weight: 900;
  text-transform: uppercase;
}
.tag.high { color: var(--red); background: rgba(244, 63, 94, .12); }
.tag.gap { color: var(--amber); background: rgba(245, 158, 11, .12); }
.tag.done { color: var(--green); background: rgba(34, 197, 94, .12); }
.tag.live { color: var(--cyan); background: rgba(45, 212, 191, .12); }

.hero-visual {
  position: relative;
}
.mini-map, .attack-map, .matrix-map, .deployment-map, .trust-map, .contact-map {
  display: grid;
  gap: 14px;
  padding: 18px;
}
.node-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}
.node {
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 14px;
  background: rgba(255,255,255,.035);
}
.node strong { display: block; color: var(--ink); }
.node span { display: block; margin-top: 6px; color: var(--muted); font-size: 13px; }
.trace-line {
  min-height: 42px;
  border-left: 2px solid var(--cyan);
  border-bottom: 2px solid var(--cyan);
  margin-left: 24px;
  opacity: .8;
}
.attack-canvas {
  min-height: 340px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background:
    linear-gradient(90deg, rgba(45,212,191,.08) 1px, transparent 1px),
    linear-gradient(180deg, rgba(45,212,191,.06) 1px, transparent 1px),
    #050a10;
  background-size: 36px 36px;
  position: relative;
  overflow: hidden;
}
.attack-canvas svg { position: absolute; inset: 0; width: 100%; height: 100%; }
.matrix {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}
.matrix .node { min-height: 124px; }
.deployment-lane {
  display: grid;
  gap: 8px;
}
.trust-row {
  display: grid;
  grid-template-columns: 150px 1fr auto;
  gap: 12px;
  align-items: center;
  border: 1px solid var(--line);
  border-radius: 6px;
  padding: 12px;
  background: rgba(255,255,255,.035);
}

.section {
  border-top: 1px solid var(--line);
  background: rgba(3, 7, 11, .88);
}
.section.alt {
  background: #071019;
}
.section.light {
  background: var(--paper);
  color: var(--paper-ink);
}
.section.light .lead, .section.light .section-head p, .section.light .info-card p, .section.light .subtle {
  color: #455260;
}
.section.light .eyebrow { color: #0d385b; }
.section.light .eyebrow::before { background: #0d385b; box-shadow: none; }
.section-head {
  display: grid;
  grid-template-columns: minmax(0, .92fr) minmax(300px, .58fr);
  gap: 36px;
  align-items: end;
  margin-bottom: 34px;
}
.section-head p {
  margin: 0;
  color: var(--soft);
  font-size: 16px;
}
.grid { display: grid; gap: 16px; }
.grid.two { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.grid.three { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.grid.four { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.info-card {
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: rgba(255,255,255,.035);
  padding: 22px;
}
.section.light .info-card {
  background: #fff;
  border-color: rgba(7, 16, 25, .13);
}
.info-card p {
  margin: 10px 0 0;
  color: var(--soft);
}
.number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 34px;
  height: 30px;
  margin-bottom: 16px;
  border: 1px solid var(--line-strong);
  border-radius: 4px;
  color: var(--cyan);
  font-family: "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 12px;
  font-weight: 900;
}
.manifesto {
  display: grid;
  grid-template-columns: minmax(0, .72fr) minmax(360px, 1fr);
  gap: 24px;
  align-items: stretch;
}
.statement {
  border-left: 3px solid var(--cyan);
  padding: 8px 0 8px 20px;
}
.statement strong {
  display: block;
  font-size: 30px;
  line-height: 1.12;
}
.statement span {
  display: block;
  margin-top: 12px;
  color: var(--soft);
}
.contrast-list {
  display: grid;
  gap: 10px;
}
.contrast-row {
  display: grid;
  grid-template-columns: minmax(150px, .38fr) 1fr;
  gap: 12px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 14px;
  background: rgba(255,255,255,.035);
}
.contrast-row b { color: var(--red); }
.contrast-row strong { color: var(--cyan); }

.finding-artifact {
  overflow: hidden;
}
.artifact-top {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  align-items: start;
  padding: 20px;
  border-bottom: 1px solid var(--line);
}
.artifact-top strong {
  display: block;
  color: var(--cyan);
  font-family: "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 12px;
  text-transform: uppercase;
}
.artifact-top h3 {
  margin-top: 6px;
  font-size: 28px;
}
.artifact-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
.artifact-field {
  min-height: 128px;
  border-right: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  padding: 18px 20px;
}
.artifact-field:nth-child(even) { border-right: 0; }
.artifact-field b {
  display: block;
  margin-bottom: 8px;
  color: var(--muted);
  font-family: "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px;
  text-transform: uppercase;
}
.artifact-field span { color: var(--soft); }
.code-block {
  overflow-x: auto;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: #02060a;
  color: #d6f7ef;
  padding: 18px;
  font-family: "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 13px;
  line-height: 1.6;
}
.code-block code {
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}
.flow {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 10px;
}
.flow-step {
  min-height: 150px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: rgba(255,255,255,.035);
  padding: 14px;
}
.flow-step strong {
  display: block;
  color: var(--cyan);
  font-family: "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 12px;
  margin-bottom: 10px;
}
.flow-step span { color: var(--soft); font-size: 13px; }
.product-shot {
  overflow: hidden;
  background: #02060a;
}
.product-shot img {
  display: block;
  width: 100%;
}
.caption {
  padding: 12px 14px;
  border-top: 1px solid var(--line);
  color: var(--soft);
  font-size: 13px;
}
.comparison {
  overflow-x: auto;
  background: rgba(255,255,255,.98);
  color: var(--paper-ink);
  box-shadow: none;
}
.comparison table {
  width: 100%;
  min-width: 760px;
  border-collapse: collapse;
}
.comparison th, .comparison td {
  padding: 16px;
  text-align: left;
  border-bottom: 1px solid rgba(7, 16, 25, .12);
  vertical-align: top;
}
.comparison tr:last-child th, .comparison tr:last-child td { border-bottom: 0; }
.comparison th {
  color: #0d385b;
  font-family: "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 12px;
  text-transform: uppercase;
}
.split {
  display: grid;
  grid-template-columns: minmax(0, .75fr) minmax(360px, .85fr);
  gap: 28px;
  align-items: start;
}
.contact-grid {
  display: grid;
  grid-template-columns: minmax(0, .72fr) minmax(360px, .95fr);
  gap: 28px;
  align-items: start;
}
.contact-form {
  display: grid;
  gap: 14px;
  padding: 22px;
}
.field-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}
label {
  display: grid;
  gap: 7px;
  font-size: 13px;
  font-weight: 850;
}
input, select, textarea {
  width: 100%;
  border: 1px solid var(--line);
  border-radius: 6px;
  background: #060b11;
  color: var(--ink);
  padding: 12px 13px;
  font: inherit;
}
textarea { resize: vertical; }
.form-note {
  margin: 0;
  color: var(--muted);
  font-size: 13px;
}
.site-footer {
  border-top: 1px solid var(--line);
  background: #02060a;
}
.footer-inner {
  max-width: 1320px;
  margin: 0 auto;
  padding: 38px 24px;
  display: grid;
  gap: 24px;
}
.footer-top {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
}
.footer-brand {
  display: flex;
  align-items: center;
  gap: 14px;
  max-width: 620px;
}
.footer-brand img { width: 74px; }
.footer-links {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  color: var(--soft);
}
.footer-links a {
  min-height: 44px;
  display: flex;
  align-items: center;
  text-decoration: none;
}
.footer-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  color: var(--muted);
  font-family: "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px;
}
.subtle { color: var(--muted); }

@media (max-width: 1160px) {
  .nav-shell { grid-template-columns: 1fr auto; }
  .nav-links, .nav-cta { display: none; }
  .mobile-menu { display: block; justify-self: end; }
  .mobile-menu[open] { grid-column: 1 / -1; justify-self: stretch; }
  .mobile-menu summary {
    min-width: 52px;
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--line);
    border-radius: 6px;
    background: rgba(255,255,255,.055);
    color: var(--ink);
    font-weight: 900;
    cursor: pointer;
  }
  .hero-grid, .section-head, .manifesto, .split, .contact-grid {
    grid-template-columns: 1fr;
  }
  .hero-grid { min-height: auto; }
  .hero-copy { max-width: none; }
  .grid.four { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .flow { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (max-width: 760px) {
  .nav-shell { padding: 10px 16px; }
  .brand-mark { width: 40px; }
  .brand-mark img { width: 40px; }
  .brand-title strong { font-size: 13px; }
  .brand-title span { display: none; }
  .hero-inner, .section-inner { padding: 58px 18px; }
  h1 { font-size: 40px; }
  h2 { font-size: 32px; }
  .lead { font-size: 16px; }
  .hero-actions .button, .section-actions .button, button.button { width: 100%; }
  .command-surface { min-height: 0; padding: 14px; }
  .hero-inner { padding-top: 44px; padding-bottom: 44px; }
  .hero-grid { gap: 28px; }
  .surface-top, .artifact-top { display: grid; }
  .grid.two, .grid.three, .grid.four, .field-grid, .artifact-grid, .node-grid, .matrix {
    grid-template-columns: 1fr;
  }
  .surface-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .metric-tile {
    min-height: 92px;
    padding: 12px;
  }
  .metric-tile strong {
    font-size: 30px;
  }
  .attack-canvas {
    min-height: 230px;
  }
  .hero .finding-feed .feed-row:nth-child(n+3) {
    display: none;
  }
  .feed-row, .trust-row, .contrast-row {
    grid-template-columns: 1fr;
    align-items: start;
  }
  .artifact-field, .artifact-field:nth-child(even) {
    border-right: 0;
  }
  .comparison {
    overflow-x: visible;
  }
  .comparison table,
  .comparison thead,
  .comparison tbody,
  .comparison tr,
  .comparison th,
  .comparison td {
    display: block;
    min-width: 0;
    width: 100%;
  }
  .comparison thead {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    white-space: nowrap;
  }
  .comparison tr {
    border-bottom: 1px solid rgba(7, 16, 25, .12);
    padding: 10px 0;
  }
  .comparison tr:last-child { border-bottom: 0; }
  .comparison td {
    border-bottom: 0;
    padding: 9px 14px;
  }
  .comparison td::before {
    content: attr(data-label);
    display: block;
    margin-bottom: 4px;
    color: #0d385b;
    font-family: "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 11px;
    font-weight: 900;
    text-transform: uppercase;
  }
  .footer-links {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
  }
  .footer-links a {
    min-height: 44px;
    display: flex;
    align-items: center;
    border: 1px solid var(--line);
    border-radius: var(--radius);
    padding: 8px 10px;
  }
}

@media (max-width: 360px) {
  .hero-inner, .section-inner { padding-left: 16px; padding-right: 16px; }
  h1 { font-size: 36px; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .001ms !important;
    scroll-behavior: auto !important;
  }
}
`;

const js = String.raw`
const form = document.querySelector("[data-contact-form]");

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const subjectByInterest = {
      walkthrough: "RoadRunner Secure product walkthrough",
      pilot: "RoadRunner Secure pilot scope",
      "white-label": "RoadRunner Secure MSP white-label model",
      security: "RoadRunner Secure security review"
    };
    const interest = data.get("interest") || "pilot";
    const body = [
      "Name: " + (data.get("name") || ""),
      "Work email: " + (data.get("email") || ""),
      "Company: " + (data.get("company") || ""),
      "Role: " + (data.get("role") || ""),
      "Interest: " + interest,
      "Environment size: " + (data.get("size") || ""),
      "Microsoft / on-prem scope: " + (data.get("scope") || ""),
      "",
      "Notes:",
      data.get("notes") || ""
    ].join("\n");
    window.location.href = "mailto:${brand.email}?subject=" +
      encodeURIComponent(subjectByInterest[interest] || subjectByInterest.pilot) +
      "&body=" + encodeURIComponent(body);
  });
}
`;

function shell(page) {
  const canonical = page.slug ? `${brand.root}/${page.slug}/` : `${brand.root}/`;
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${page.title}</title>
  <meta name="description" content="${page.description}">
  <link rel="canonical" href="${canonical}">
  <meta property="og:title" content="${page.title}">
  <meta property="og:description" content="${page.description}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${brand.root}/assets/roadrunner-logo.png">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="/assets/roadrunner-mark.svg" type="image/svg+xml">
  <link rel="alternate icon" href="/favicon.ico">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500;600;700&family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/styles.css">
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  ${header(page.active)}
  <main id="main">
    ${hero(page)}
    ${page.body()}
  </main>
  ${footer()}
  <script src="/script.js"></script>
</body>
</html>
`;
}

function header(active) {
  const links = navItems.map(([href, label]) => {
    const current = label === active ? ` aria-current="page"` : "";
    return `<a href="${href}"${current}>${label}</a>`;
  }).join("");

  return `<header class="site-header">
    <div class="nav-shell">
      <a class="brand" href="/" aria-label="RoadRunner Secure home">
        <span class="brand-mark"><img src="/assets/roadrunner-mark.svg" alt=""></span>
        <span class="brand-title"><strong>RoadRunner Secure</strong><span>Evidence verified closure</span></span>
      </a>
      <nav class="nav-links" aria-label="Primary navigation">${links}</nav>
      <div class="nav-cta">
        <a class="button secondary" href="/contact/">Scope pilot</a>
        <a class="button primary" href="/demo/">Walkthrough</a>
      </div>
      <details class="mobile-menu">
        <summary aria-label="Open navigation">Menu</summary>
        <nav class="mobile-menu-panel" aria-label="Mobile navigation">${links}<a href="/contact/">Scope pilot</a><a href="/demo/">Walkthrough</a></nav>
      </details>
    </div>
  </header>`;
}

function hero(page) {
  return `<section class="hero hero-${page.visual}">
    <div class="hero-inner hero-grid">
      <div class="hero-copy">
        <div class="eyebrow">${page.eyebrow}</div>
        <h1>${page.h1}</h1>
        <p class="lead">${page.lead}</p>
        <div class="hero-actions">
          <a class="button primary" href="${page.primary[0]}">${page.primary[1]}</a>
          <a class="button secondary" href="${page.secondary[0]}">${page.secondary[1]}</a>
        </div>
        <div class="signal-row">
          <span class="signal-chip">Read-only</span>
          <span class="signal-chip">White-label</span>
          <span class="signal-chip">Validated closure</span>
        </div>
      </div>
      <div class="hero-visual">${heroVisual(page.visual)}</div>
    </div>
  </section>`;
}

function heroVisual(visual) {
  const visuals = {
    cockpit: cockpitVisual,
    architecture: architectureVisual,
    attack: attackVisual,
    microsoft: microsoftVisual,
    deployment: deploymentVisual,
    trust: trustVisual,
    walkthrough: walkthroughVisual,
    contact: contactVisual
  };
  return (visuals[visual] || cockpitVisual)();
}

function cockpitVisual() {
  return `<aside class="command-surface" aria-label="RoadRunner Secure weekly assessment cockpit">
    <div class="surface-top">
      <div class="surface-title">
        <img src="/assets/roadrunner-mark.svg" alt="">
        <div><strong>Weekly assessment run</strong><span>tenant: RoadRunner live / run RR-2026-07</span></div>
      </div>
      <span class="live-dot">LIVE</span>
    </div>
    <div class="surface-grid">
      <div class="metric-tile red"><strong>27</strong><span>Needs action now</span></div>
      <div class="metric-tile green"><strong>19</strong><span>Verified closed</span></div>
      <div class="metric-tile amber"><strong>3</strong><span>Source gaps</span></div>
      <div class="metric-tile cyan"><strong>$10k</strong><span>Monthly savings found</span></div>
    </div>
    <div class="finding-feed">
      ${feedRow("HIGH", "Standing Global Admins remain assigned outside just-in-time access", "owner: identity")}
      ${feedRow("HIGH", "Legacy auth still active for named service accounts", "validate next run")}
      ${feedRow("GAP", "Cannot assess device compliance because Intune is not onboarded", "source gap")}
      ${feedRow("DONE", "MFA exception removed and evidence stamped closed", "closed")}
    </div>
  </aside>`;
}

function architectureVisual() {
  return `<aside class="command-surface mini-map" aria-label="RoadRunner Secure platform architecture">
    <div class="surface-top">
      <div><strong>Evidence pipeline</strong><span class="surface-kicker">read -> normalize -> decide -> validate</span></div>
      <span class="tag live">RUNNING</span>
    </div>
    <div class="node-grid">
      ${node("Microsoft", "Entra, Defender, Intune, M365, Azure")}
      ${node("On-Prem", "AD topology, privilege edges, collector export")}
      ${node("Manual", "Exceptions, service notes, context")}
    </div>
    <div class="trace-line"></div>
    <div class="node-grid">
      ${node("Evidence Store", "Freshness, source health, tenant boundary")}
      ${node("Finding Engine", "Named entities, risk, fix, validation")}
      ${node("Output", "Queue, report, white-label portal")}
    </div>
  </aside>`;
}

function attackVisual() {
  return `<aside class="command-surface attack-map" aria-label="Active Directory attack path preview">
    <div class="surface-top">
      <div><strong>Attack-path graph</strong><span class="surface-kicker">click edge -> cut path -> re-run collector</span></div>
      <span class="tag high">TIER 0</span>
    </div>
    <div class="attack-canvas">
      <svg viewBox="0 0 760 340" role="img" aria-label="Synthetic Active Directory attack path">
        <defs>
          <filter id="glow"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        <path d="M80 250 L190 220 L300 235 L410 170 L540 155 L660 84" fill="none" stroke="#2dd4bf" stroke-width="3" stroke-dasharray="8 8" filter="url(#glow)"/>
        <path d="M300 235 L410 170" fill="none" stroke="#f43f5e" stroke-width="6" filter="url(#glow)"/>
        ${graphNode(80,250,"svc")}
        ${graphNode(190,220,"grp")}
        ${graphNode(300,235,"ws")}
        ${graphNode(410,170,"sess")}
        ${graphNode(540,155,"adm")}
        ${graphNode(660,84,"T0")}
      </svg>
    </div>
    <div class="finding-feed">
      ${feedRow("HIGH", "CORP\\svc-build reaches Tier 0 through workstation admin path", "cut edge")}
      ${feedRow("DONE", "Next collector run must show no route to Domain Admins", "validation")}
    </div>
  </aside>`;
}

function microsoftVisual() {
  return `<aside class="command-surface matrix-map" aria-label="Microsoft evidence matrix">
    <div class="surface-top">
      <div><strong>Microsoft evidence matrix</strong><span class="surface-kicker">score context is not closure</span></div>
      <span class="tag live">GRAPH</span>
    </div>
    <div class="matrix">
      ${node("Entra", "Privileged roles, MFA, guests", "HIGH")}
      ${node("Defender", "Incidents, exposure, coverage", "GAP")}
      ${node("Intune", "Compliance, stale devices", "GAP")}
      ${node("M365", "Mail, sharing, audit posture", "OK")}
      ${node("Azure", "Subscriptions, policy, network", "HIGH")}
      ${node("Closure", "Changed evidence only", "DONE")}
    </div>
    <div class="finding-feed">
      ${feedRow("HIGH", "Conditional Access excludes interactive-capable service accounts", "owner: identity")}
      ${feedRow("GAP", "Defender plan coverage blocks endpoint confidence", "source gap")}
    </div>
  </aside>`;
}

function deploymentVisual() {
  return `<aside class="command-surface deployment-map" aria-label="RoadRunner deployment models">
    <div class="surface-top">
      <div><strong>Deployment model</strong><span class="surface-kicker">pilot -> MSP partner -> enterprise controls</span></div>
      <span class="tag live">PILOT</span>
    </div>
    <div class="deployment-lane">
      ${lane("01", "Scoped pilot", "2 to 4 weeks, one tenant or client sample, real findings")}
      ${lane("02", "MSP partner", "White-label portal, multi-client queue, recurring run cadence")}
      ${lane("03", "Enterprise custom", "Customer-owned evidence flow, security review, tailored retention")}
    </div>
  </aside>`;
}

function trustVisual() {
  return `<aside class="command-surface trust-map" aria-label="RoadRunner Secure trust controls">
    <div class="surface-top">
      <div><strong>Trust control ledger</strong><span class="surface-kicker">explicit rules for sensitive evidence</span></div>
      <span class="tag live">READ ONLY</span>
    </div>
    ${trustRow("Collection", "Read-only connectors and offline collector options", "PASS")}
    ${trustRow("Retention", "Defined during pilot or contract", "SET")}
    ${trustRow("Offboarding", "Revoke, export, delete, confirm", "READY")}
    ${trustRow("Boundary", "No credentials, no auto-remediation", "LOCKED")}
  </aside>`;
}

function walkthroughVisual() {
  return `<aside class="command-surface" aria-label="RoadRunner walkthrough preview">
    <div class="surface-top">
      <div><strong>Product walkthrough</strong><span class="surface-kicker">Polaris is the MSP white-label surface</span></div>
      <span class="tag live">SYNTHETIC</span>
    </div>
    <div class="grid three" style="margin-top:16px">
      ${imageTile("/refs/polaris-executive-v2.png", "Executive")}
      ${imageTile("/refs/polaris-onprem.png", "On-Prem")}
      ${imageTile("/refs/polaris-vciso-v2.png", "AI vCISO")}
    </div>
    <div class="finding-feed">
      ${feedRow("HIGH", "MFA exception and AD path combine into priority work", "walkthrough")}
      ${feedRow("DONE", "The next run decides whether the fix is closed", "evidence")}
    </div>
  </aside>`;
}

function contactVisual() {
  return `<aside class="command-surface contact-map" aria-label="RoadRunner pilot intake">
    <div class="surface-top">
      <div><strong>Pilot intake</strong><span class="surface-kicker">the first call should produce a run plan</span></div>
      <span class="tag live">READY</span>
    </div>
    ${trustRow("Scope", "Tenants, users, endpoints, AD domains", "NEEDED")}
    ${trustRow("Access", "Microsoft and collector read-only review", "NEEDED")}
    ${trustRow("Output", "Weekly queue, validation, final roadmap", "SET")}
    ${trustRow("White-label", "MSP brand surface and client reporting", "OPTION")}
  </aside>`;
}

function feedRow(level, text, meta) {
  const cls = level === "DONE" ? "done" : level === "GAP" ? "gap" : "high";
  return `<div class="feed-row"><span class="tag ${cls}">${level}</span><span>${text}</span><span class="mono">${meta}</span></div>`;
}

function node(title, text, status = "") {
  return `<div class="node"><strong>${title}</strong><span>${text}</span>${status ? `<span class="tag ${status === "DONE" || status === "OK" ? "done" : status === "GAP" ? "gap" : "high"}" style="margin-top:12px">${status}</span>` : ""}</div>`;
}

function graphNode(x, y, label) {
  return `<g><circle cx="${x}" cy="${y}" r="22" fill="#0b121a" stroke="#2dd4bf" stroke-width="2"/><text x="${x}" y="${y + 5}" text-anchor="middle" fill="#f4f8fb" font-size="12" font-family="monospace">${label}</text></g>`;
}

function lane(num, title, text) {
  return `<div class="feed-row"><span class="number">${num}</span><span><strong>${title}</strong><br><span class="subtle">${text}</span></span><span class="mono">priced by scope</span></div>`;
}

function trustRow(title, text, status) {
  return `<div class="trust-row"><strong>${title}</strong><span>${text}</span><span class="tag live">${status}</span></div>`;
}

function imageTile(src, label) {
  return `<div class="node"><img src="${src}" alt="${label} product screenshot" loading="lazy"><span>${label}</span></div>`;
}

function footer() {
  const links = navItems.slice(1).map(([href, label]) => `<a href="${href}">${label}</a>`).join("");
  return `<footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-top">
        <div class="footer-brand">
          <img src="/assets/roadrunner-mark.svg" alt="">
          <div><strong>${brand.name}</strong><br><span class="subtle">RoadRunner owns the assessment method. MSPs can deliver the client-facing surface under their own brand.</span></div>
        </div>
        <nav class="footer-links" aria-label="Footer navigation">${links}</nav>
      </div>
      <div class="footer-meta">
        <span>Read-only evidence posture</span>
        <span>No automatic remediation by default</span>
        <span>Synthetic walkthrough uses fictional evidence</span>
        <span>&copy; ${brand.owner}, LLC</span>
      </div>
    </div>
  </footer>`;
}

function homeBody() {
  return `
${manifestoSection()}
${sampleFindingSection("home")}
${productGallerySection()}
${whiteLabelSection()}
${comparisonSection()}
${contactSection()}`;
}

function manifestoSection() {
  return `<section class="section">
    <div class="section-inner manifesto">
      <div class="statement">
        <div class="eyebrow">Operating thesis</div>
        <strong>Most security tools tell you to be afraid. RoadRunner tells you what to fix.</strong>
        <span>Names. Hostnames. App IDs. Attack-path edges. Validation criteria. The artifact matters because it turns anxiety into a work queue.</span>
      </div>
      <div class="contrast-list">
        ${contrast("Dashboard", "You are at risk.", "RoadRunner", "These identities, devices, policies, and paths need action this week.")}
        ${contrast("Audit", "Here is a point-in-time report.", "RoadRunner", "Here is the next run condition that proves closure.")}
        ${contrast("Score", "Improve the number.", "RoadRunner", "Close the exposure and show the changed evidence.")}
      </div>
    </div>
  </section>`;
}

function contrast(leftLabel, left, rightLabel, right) {
  return `<div class="contrast-row"><div><b>${leftLabel}</b><br><span class="subtle">${left}</span></div><div><strong>${rightLabel}</strong><br><span>${right}</span></div></div>`;
}

function productGallerySection() {
  return `<section class="section alt">
    <div class="section-inner">
      ${sectionHead("Product proof", "Show the real surfaces, not decoration.", "The Polaris screens are MSP white-label examples. RoadRunner owns the assessment logic underneath.")}
      <div class="grid three">
        ${productShot("/refs/polaris-executive-v2.png", "Executive posture", "Leadership sees risk direction, closure counts, source gaps, and what changed.")}
        ${productShot("/refs/polaris-onprem.png", "On-prem attack paths", "Technical owners see the path, the risky edge, collector options, and validation target.")}
        ${productShot("/refs/polaris-vciso-v2.png", "Evidence-grounded vCISO", "Answers cite findings and source evidence instead of inventing around missing data.")}
      </div>
    </div>
  </section>`;
}

function whiteLabelSection() {
  return `<section class="section light">
    <div class="section-inner">
      ${sectionHead("White-label model", "RoadRunner powers the assessment. MSPs can own the client-facing brand.", "Polaris is the MSP you work for. The site must make the brand relationship explicit: RoadRunner is yours, the assessment is yours, and MSPs can put their name on the client surface.")}
      <div class="grid three">
        ${plainCard("RoadRunner", "Owns the assessment method, product logic, evidence model, validation doctrine, and RoadRunner Secure brand.")}
        ${plainCard("MSP partner", "Can present the client-facing portal, reporting language, and service package under its own brand.")}
        ${plainCard("Client", "Receives named findings, proof, remediation guidance, and closure history they can review.")}
      </div>
    </div>
  </section>`;
}

function platformBody() {
  return `
${architectureSection()}
${sourceCoverageTable()}
${lifecycleSection()}
${roleViewsSection()}
${contactSection()}`;
}

function architectureSection() {
  return `<section class="section">
    <div class="section-inner">
      ${sectionHead("Architecture", "Simple enough to inspect. Strong enough to operate weekly.", "RoadRunner is organized around the assessment chain: source evidence, stored proof, generated findings, assigned work, validation, and reporting.")}
      <div class="flow">
        ${flowStep("Sources", "Microsoft, endpoint, cloud, AD, and manual evidence.")}
        ${flowStep("Collect", "Read-only connectors and collector exports observe posture.")}
        ${flowStep("Normalize", "Evidence is stored with freshness and source health.")}
        ${flowStep("Decide", "Rules produce named, explainable findings.")}
        ${flowStep("Assign", "Prioritized work is routed by owner.")}
        ${flowStep("Validate", "The next run checks whether evidence changed.")}
        ${flowStep("Report", "Verified closures roll into client-ready artifacts.")}
      </div>
    </div>
  </section>`;
}

function sourceCoverageTable() {
  return `<section class="section light">
    <div class="section-inner">
      ${sectionHead("Source coverage", "Signals are useful only when their limits are visible.", "Missing visibility should become a data-gap finding, not a quiet blank space in a dashboard.")}
      ${table([
        ["Source", "Typical evidence", "Assessment value"],
        ["Microsoft", "Entra roles, Conditional Access, sign-ins, Defender, Intune, M365, Azure posture", "Creates identity, endpoint, cloud, and collaboration findings with owner-ready remediation."],
        ["On-prem AD", "Groups, ACLs, delegation, sessions where available, local admin exposure, path topology", "Maps attack paths and recommends low-disruption edge cuts."],
        ["Endpoint/security tools", "Device health, onboarding state, incident backlog, exposure signals", "Turns coverage and response gaps into weekly work."],
        ["Manual evidence", "Exceptions, business context, compensating controls, MSP notes", "Adds human context without letting manual status override validation evidence."]
      ])}
    </div>
  </section>`;
}

function lifecycleSection() {
  return `<section class="section alt">
    <div class="section-inner">
      ${sectionHead("Lifecycle", "Discovery to closure without losing the thread.", "The workflow is built for recurring execution, not one more static report.")}
      <div class="grid four">
        ${card("01", "Discover", "Collect evidence, detect gaps, and baseline the tenant.")}
        ${card("02", "Prioritize", "Rank findings across Microsoft, endpoint, cloud, and on-prem work.")}
        ${card("03", "Assign", "Give owners the entities, fix steps, and validation criteria.")}
        ${card("04", "Report", "Show verified closure, regressions, and blocked visibility to leadership.")}
      </div>
    </div>
  </section>`;
}

function roleViewsSection() {
  return `<section class="section">
    <div class="section-inner">
      ${sectionHead("Role-based views", "Same evidence, different decisions.", "RoadRunner should not make every stakeholder read the same security artifact.")}
      <div class="grid three">
        ${plainCard("MSP operator", "Needs source health, client queues, owner status, blocked evidence, and service delivery notes.")}
        ${plainCard("Client executive", "Needs risk direction, verified closures, unresolved priority items, and business-facing posture summaries.")}
        ${plainCard("Technical owner", "Needs affected entities, fix steps, proof, and exact validation criteria for the next run.")}
      </div>
    </div>
  </section>`;
}

function onPremBody() {
  return `
<section class="section alt" id="walkthrough-onprem">
  <div class="section-inner">
    ${productShot("/refs/polaris-onprem.png", "White-label Active Directory attack-path graph", "Representative AD topology and collector workflow. RoadRunner assessment logic powers the path analysis.")}
  </div>
</section>
${sampleFindingSection("onprem")}
${collectorSection()}
${collectorSampleSection()}
${pathClosureTable()}
${contactSection()}`;
}

function collectorSection() {
  return `<section class="section">
    <div class="section-inner">
      ${sectionHead("Collector model", "Read-only, scoped, and deployable by normal IT operations.", "The collector should be explainable to an AD owner before it ever runs.")}
      <div class="grid four">
        ${plainCard("Permissions", "Scoped read access sufficient to enumerate directory objects, group membership, ACLs, delegation, and computer metadata.")}
        ${plainCard("Collected fields", "Users, groups, computers, memberships, privileged relationships, ACL edges, delegation indicators, and source timestamps.")}
        ${plainCard("Never collected", "No password material, no credential harvesting, no destructive testing, and no automatic changes to directory objects.")}
        ${plainCard("Upload paths", "Direct upload to tenant evidence store, MSP-managed upload, or offline export for isolated environments.")}
      </div>
    </div>
  </section>`;
}

function collectorSampleSection() {
  return `<section class="section light">
    <div class="section-inner">
      ${sectionHead("Redacted collector sample", "Technical buyers need to see the shape of evidence.", "Representative output makes clear the collector is topology-focused, not credential-focused.")}
      <pre class="code-block"><code>roadrunner-ad-collector.exe --domain corp.example --mode read-only --output rr-ad-2026-07-05.json

{
  "domain": "corp.example",
  "collected_at": "2026-07-05T14:31:00Z",
  "objects": { "users": 1842, "groups": 412, "computers": 637 },
  "edges": [
    { "from": "CORP\\svc-build", "to": "Workstation Admins", "type": "memberOf" },
    { "from": "Workstation Admins", "to": "ENG-WS-044", "type": "localAdmin" },
    { "from": "ENG-WS-044", "to": "Domain Admins", "type": "activeSession", "confidence": "medium" }
  ],
  "secrets_collected": false,
  "changes_made": false
}</code></pre>
    </div>
  </section>`;
}

function pathClosureTable() {
  return `<section class="section alt">
    <div class="section-inner">
      ${sectionHead("Path closure", "Every path finding maps to a fix and a validation condition.", "The useful output is not a large graph. It is the cheapest defensible change that kills meaningful exposure.")}
      ${table([
        ["Finding", "Evidence", "Recommended fix", "Validation"],
        ["Service account creates path to Tier 0", "svc-build -> Workstation Admins -> ENG-WS-044 -> Domain Admins", "Remove svc-build from workstation admin path or isolate admin session exposure", "Next collector run no longer contains a route from svc-build to Tier 0"],
        ["Stale admin group expands blast radius", "Dormant users remain in Server Operators", "Remove dormant members and document exception owner", "Membership diff shows removed principals or approved exception"],
        ["Delegation edge enables lateral movement", "Unconstrained delegation detected on legacy app server", "Move service to constrained delegation or isolate server", "Delegation edge disappears or compensating control is attached"]
      ])}
    </div>
  </section>`;
}

function microsoftBody() {
  return `
${microsoftCoverageSection()}
${sampleFindingSection("microsoft")}
${secureScoreSection()}
${permissionsSection()}
${contactSection()}`;
}

function microsoftCoverageSection() {
  return `<section class="section" id="walkthrough-microsoft">
    <div class="section-inner">
      ${sectionHead("Microsoft coverage", "Exact domains, exact findings, exact limits.", "Coverage depends on licensing and granted permissions. RoadRunner says what it can prove and what remains unknown.")}
      <div class="grid three">
        ${plainCard("Entra ID", "Privileged roles, MFA coverage, Conditional Access gaps, risky users, legacy auth, guest exposure, and role drift.")}
        ${plainCard("Defender", "Incident backlog, exposure signals, device risk, alert hygiene, and onboarding coverage where available.")}
        ${plainCard("Intune", "Compliance policy coverage, unmanaged devices, stale enrollments, device encryption, and baseline gaps.")}
        ${plainCard("Exchange and M365", "Legacy protocol exposure, mailbox forwarding, audit posture, sharing controls, and risky collaboration settings.")}
        ${plainCard("SharePoint and OneDrive", "External sharing posture, sensitive site exposure, anonymous links, and admin control coverage.")}
        ${plainCard("Azure posture", "Subscription security settings, Defender plan coverage, privileged access, network exposure, and policy gaps.")}
      </div>
    </div>
  </section>`;
}

function secureScoreSection() {
  return `<section class="section light">
    <div class="section-inner">
      ${sectionHead("Secure Score is not enough", "Scores do not assign work or prove closure.", "RoadRunner can use Microsoft score data as context, but the output is built around named evidence and validation.")}
      ${table([
        ["Question", "Microsoft Secure Score", "RoadRunner Secure"],
        ["What is wrong?", "Control-level recommendations", "Named findings with affected accounts, devices, policies, or resources"],
        ["Who owns it?", "Usually outside the score", "Owner-ready queue with remediation context"],
        ["Why this first?", "Score impact may dominate", "Prioritized by exposure, blast radius, confidence, and urgency"],
        ["How does it close?", "Score movement or manual review", "Next evidence run must satisfy validation criteria"]
      ])}
    </div>
  </section>`;
}

function permissionsSection() {
  return `<section class="section alt">
    <div class="section-inner">
      ${sectionHead("Connector permissions", "Permissions are part of the buying decision.", "Exact permission names should match implementation, but the public page should explain purpose and read-only posture.")}
      ${table([
        ["Area", "Typical read purpose", "Assessment value"],
        ["Directory", "Read users, groups, roles, guests, and assignments", "Detect privilege sprawl, stale access, and risky identities"],
        ["Policy", "Read Conditional Access and authentication posture", "Find MFA exceptions, weak access paths, and policy drift"],
        ["Security", "Read incidents, alerts, and exposure signals where licensed", "Fold detection and response gaps into the weekly queue"],
        ["Device", "Read Intune compliance and device inventory where available", "Find unmanaged or noncompliant endpoints tied to identity risk"],
        ["Azure", "Read subscription posture and security configuration", "Assess cloud control coverage and prioritized misconfigurations"]
      ])}
    </div>
  </section>`;
}

function pricingBody() {
  return `
${pilotShapeSection()}
${packageSection()}
${pricingInputsSection()}
${includedSection()}
${contactSection()}`;
}

function pilotShapeSection() {
  return `<section class="section">
    <div class="section-inner">
      ${sectionHead("Pilot shape", "A useful pilot proves the loop in 2 to 4 weeks.", "If the weekly findings and closure trail do not create usable work, the pilot should end cleanly with the output retained.")}
      <div class="grid four">
        ${card("W0", "Scope and access", "Confirm tenant count, Microsoft/on-prem scope, white-label needs, and read-only access.")}
        ${card("W1", "Baseline", "Run the first assessment and review highest-priority findings.")}
        ${card("W2", "Work the queue", "Fix selected findings, refresh evidence, and watch validation behavior.")}
        ${card("W4", "Decision", "Deliver report, roadmap, and recommendation to continue, expand, or stop.")}
      </div>
    </div>
  </section>`;
}

function packageSection() {
  return `<section class="section light">
    <div class="section-inner">
      ${sectionHead("Commercial models", "Pricing follows scope, not a generic seat grid.", "Exact numbers can be quoted after deployment shape is known. The public page should still make the buying motion concrete.")}
      ${table([
        ["Model", "Best fit", "Included shape"],
        ["Pilot", "A first tenant or controlled client sample", "Baseline assessment, weekly finding review, final report, and remediation roadmap"],
        ["MSP Partner", "Recurring white-label delivery across clients", "Client portals, MSP operating queue, white-label reporting, and tenant rollout planning"],
        ["Enterprise / Custom", "Customer-owned or constrained deployment", "Custom access model, evidence flow review, security review support, and tailored source scope"]
      ])}
    </div>
  </section>`;
}

function pricingInputsSection() {
  return `<section class="section alt">
    <div class="section-inner">
      ${sectionHead("Pricing inputs", "Bring the facts that change the scope.", "These inputs keep the conversation concrete without publishing a fake one-size-fits-all price.")}
      <div class="grid three">
        ${plainCard("Environment size", "Users, endpoints, tenants, subscriptions, and on-prem domains.")}
        ${plainCard("Evidence sources", "Microsoft-only, on-prem AD, endpoint/security tooling, and manual evidence needs.")}
        ${plainCard("Deployment model", "RoadRunner-hosted, MSP-managed, customer-owned, or offline collector requirements.")}
      </div>
    </div>
  </section>`;
}

function includedSection() {
  return `<section class="section">
    <div class="section-inner">
      ${sectionHead("Boundary", "Define the pilot before it starts.", "This prevents the first assessment from turning into an open-ended consulting engagement.")}
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

function securityBody() {
  return `
${securityTrustGrid()}
${connectorPermissionsTable()}
${dataHandlingSection()}
${securityBoundariesSection()}
${complianceSection()}
${contactSection()}`;
}

function securityTrustGrid() {
  return `<section class="section">
    <div class="section-inner">
      ${sectionHead("Trust posture", "Security claims should be specific enough to review.", "This page covers the minimum categories a security reviewer expects before deeper due diligence.")}
      <div class="grid three">
        ${plainCard("Data handling", "Evidence is collected for assessment, reporting, validation, and source-health visibility.")}
        ${plainCard("Encryption", "Use encrypted transport for uploads and encrypted storage for retained evidence and reports.")}
        ${plainCard("Access control", "Limit access by tenant, role, and operational need. Revoke access paths during offboarding.")}
        ${plainCard("Tenant isolation", "Keep customer evidence scoped by tenant and separate client surfaces for MSP delivery.")}
        ${plainCard("Logging", "Track connector status, evidence freshness, access activity, and validation runs.")}
        ${plainCard("Retention", "Set retention during the pilot or contract; delete or export evidence during offboarding as agreed.")}
      </div>
    </div>
  </section>`;
}

function connectorPermissionsTable() {
  return `<section class="section light">
    <div class="section-inner">
      ${sectionHead("Connector permissions", "Read-only by design, with permissions tied to assessment value.", "Final permission names should match the live implementation and customer approval package.")}
      ${table([
        ["Connector", "Permission intent", "Why it is needed"],
        ["Microsoft Graph", "Read directory, policy, device, and security posture where granted", "Create identity, device, policy, and incident findings"],
        ["Defender / security signals", "Read alerts, exposure, and onboarding state where licensed", "Surface detection backlog, endpoint gaps, and response work"],
        ["On-prem collector", "Read AD topology and privilege relationships", "Map attack paths without collecting secrets or changing objects"],
        ["Manual evidence", "Accept customer/MSP notes and approved exceptions", "Attach business context without overriding evidence validation"]
      ])}
    </div>
  </section>`;
}

function dataHandlingSection() {
  return `<section class="section alt">
    <div class="section-inner">
      ${sectionHead("Data handling", "Make offboarding and limits explicit.", "This is the difference between a trust page and vague reassurance.")}
      <div class="grid three">
        ${plainCard("Retention", "Pilot retention should be defined before access is granted. Long-term retention follows contract and reporting needs.")}
        ${plainCard("Offboarding", "Revoke connectors, export agreed reports, delete retained evidence according to timeline, and confirm completion.")}
        ${plainCard("Subprocessors", "List hosting, email, analytics, and operational subprocessors before production procurement.")}
      </div>
    </div>
  </section>`;
}

function securityBoundariesSection() {
  return `<section class="section">
    <div class="section-inner">
      ${sectionHead("Boundaries", "What RoadRunner does not do by default.", "Explicit boundaries reduce fear and prevent the product from sounding like an exploit platform.")}
      <div class="grid four">
        ${plainCard("No destructive testing", "The assessment observes configuration and evidence. Destructive testing is not default behavior.")}
        ${plainCard("No credential collection", "Collectors do not harvest passwords, hashes, tokens, or secrets.")}
        ${plainCard("No automatic changes", "RoadRunner recommends fixes. Customers or MSPs execute approved changes.")}
        ${plainCard("Disclosure path", `Send security reports to ${brand.email}. Valid reports receive direct remediation coordination.`)}
      </div>
    </div>
  </section>`;
}

function complianceSection() {
  return `<section class="section light">
    <div class="section-inner">
      ${sectionHead("Review maturity", "Be clear about what exists now and what belongs in procurement.", "If formal certifications are not yet available, the page should not imply them.")}
      <div class="grid three">
        ${plainCard("Current review package", "Connector purposes, read-only posture, retention plan, offboarding plan, subprocessors, and deployment model.")}
        ${plainCard("Disclosure SLA", `Security reports sent to ${brand.email} should receive acknowledgement within one business day after validation.`)}
        ${plainCard("Compliance roadmap", "Formal control mapping and third-party assurance can be added as enterprise demand requires.")}
      </div>
    </div>
  </section>`;
}

function demoBody() {
  return `
<section class="section" id="walkthrough">
  <div class="section-inner">
    ${sectionHead("Scenario", "A client has privilege sprawl, Conditional Access gaps, and on-prem lateral movement exposure.", "The walkthrough follows one synthetic weekly run from baseline through findings, remediation queue, validation, and reporting.")}
    <div class="flow">
      ${flowStep("Baseline", "Connect read-only sources and establish the first evidence snapshot.")}
      ${flowStep("Findings", "Create named findings tied to accounts, devices, policies, and paths.")}
      ${flowStep("Queue", "Rank what should happen this week and assign owners.")}
      ${flowStep("Fix", "Customer or MSP makes approved changes outside RoadRunner.")}
      ${flowStep("Validate", "Next run checks whether evidence changed.")}
      ${flowStep("Report", "Leadership sees verified closure and remaining exposure.")}
      ${flowStep("Repeat", "Regressions and source gaps feed the next weekly run.")}
    </div>
  </div>
</section>
${guidedScreenshot("walkthrough-executive", "1. Executive posture", "/refs/polaris-executive-v2.png", "Leadership gets risk direction, closure counts, source gaps, and the story of what changed.")}
${guidedScreenshot("walkthrough-onprem", "2. On-prem attack path", "/refs/polaris-onprem.png", "The product does not stop at graph visualization. It points to the path edge that should be cut.")}
${guidedScreenshot("walkthrough-microsoft", "3. Evidence-grounded vCISO", "/refs/polaris-vciso-v2.png", "Answers are grounded in findings and source evidence. Missing data is stated instead of invented.")}
${sampleFindingSection("demo")}
${contactSection()}`;
}

function guidedScreenshot(id, title, image, caption) {
  return `<section class="section alt" id="${id}">
    <div class="section-inner">
      ${sectionHead("Product walkthrough", title, caption)}
      ${productShot(image, title, caption)}
    </div>
  </section>`;
}

function contactBody() {
  return `
<section class="section">
  <div class="section-inner">
    ${sectionHead("Two useful conversations", "Scope a pilot or review the MSP white-label model.", "A good first call should leave with enough detail to define access, source scope, deployment model, and the first four weekly runs.")}
    <div class="grid two">
      ${plainCard("Scope a pilot", "Define tenant size, Microsoft/on-prem coverage, read-only access, timeline, expected deliverables, and the first remediation queue.")}
      ${plainCard("Review MSP model", "Discuss white-label branding, client portal needs, reporting language, tenant rollout, and service delivery rhythm.")}
    </div>
  </div>
</section>
<section class="section light">
  <div class="section-inner">
    ${sectionHead("What happens next", "The next step should be concrete.", "Bring approximate users, endpoints, tenants, Microsoft licensing, on-prem AD scope, and deployment constraints.")}
    <div class="grid four">
      ${card("01", "30-minute fit call", "Confirm use case, buyer role, and whether the pilot should be direct or MSP white-label.")}
      ${card("02", "Scope confirmation", "Define sources, tenant count, on-prem needs, security review requirements, and success criteria.")}
      ${card("03", "Access review", "Approve read-only connectors, collector model, retention, and offboarding behavior.")}
      ${card("04", "Pilot kickoff", "Run baseline assessment and review the first queue of findings.")}
    </div>
  </div>
</section>
${contactSection()}`;
}

function sampleFindingSection(context) {
  const examples = {
    home: {
      label: "Sample assessment finding",
      title: "Standing privileged access remains assigned outside emergency workflow",
      severity: "HIGH",
      affected: "3 Global Admins, 2 Privileged Role Administrators",
      evidence: "Entra role assignments observed in current evidence snapshot; no just-in-time activation record attached.",
      risk: "Compromised daily-use or stale privileged accounts can bypass normal access controls and expand blast radius.",
      action: "Move standing admins to eligible access, require phishing-resistant MFA, and document break-glass exceptions.",
      validation: "Next run must show no standing privileged assignment except approved break-glass accounts."
    },
    onprem: {
      label: "Sample path finding",
      title: "Service account creates path from workstation admin to Tier 0",
      severity: "HIGH",
      affected: "CORP\\svc-build, Workstation Admins, ENG-WS-044, Domain Admins",
      evidence: "Collector graph shows memberOf, localAdmin, and activeSession edges forming a route to Tier 0.",
      risk: "An attacker controlling the service account can move through a managed workstation into a privileged session.",
      action: "Remove the account from broad workstation administration or isolate admin sessions from exposed endpoints.",
      validation: "Next collector run must show no route from CORP\\svc-build to Tier 0."
    },
    microsoft: {
      label: "Sample Microsoft finding",
      title: "Conditional Access excludes legacy service accounts without compensating control",
      severity: "HIGH",
      affected: "4 accounts excluded from MFA policy; 2 observed interactive sign-ins in the last 14 days",
      evidence: "Policy exclusion list plus sign-in evidence shows recent use outside expected service context.",
      risk: "Excluded accounts create a durable identity bypass that attackers can use after password compromise.",
      action: "Remove interactive-capable accounts from exclusion or attach documented exception controls.",
      validation: "Next run must show no recent interactive sign-ins for excluded service accounts or an approved exception."
    },
    demo: {
      label: "Walkthrough finding",
      title: "MFA exception and AD path combine into a priority remediation item",
      severity: "HIGH",
      affected: "One excluded identity, one exposed admin path, one client-visible closure objective",
      evidence: "Microsoft policy evidence plus AD collector path evidence create a higher-confidence exposure story.",
      risk: "Single-domain findings may look manageable alone; combined evidence shows a realistic path to impact.",
      action: "Close the identity exception and cut the AD path edge before treating either item as resolved.",
      validation: "Next run must show the policy exception removed and the AD graph path broken."
    }
  };
  const item = examples[context] || examples.home;
  return `<section class="section">
    <div class="section-inner">
      <div class="finding-artifact">
        <div class="artifact-top">
          <div>
            <strong>${item.label}</strong>
            <h3>${item.title}</h3>
          </div>
          <span class="tag high">${item.severity}</span>
        </div>
        <div class="artifact-grid">
          ${artifactField("Affected", item.affected)}
          ${artifactField("Evidence", item.evidence)}
          ${artifactField("Risk", item.risk)}
          ${artifactField("Recommended action", item.action)}
          ${artifactField("Validation", item.validation)}
          ${artifactField("Closure rule", "Manual status cannot close this finding. Evidence from the next run must satisfy the validation condition.")}
        </div>
      </div>
    </div>
  </section>`;
}

function artifactField(label, text) {
  return `<div class="artifact-field"><b>${label}</b><span>${text}</span></div>`;
}

function comparisonSection() {
  return `<section class="section light">
    <div class="section-inner">
      ${sectionHead("Positioning", "Dashboards report. Assessments age. RoadRunner closes.", "The distinction matters: a finding is open until evidence changes, not until someone clicks done.")}
      ${table([
        ["Question", "Dashboard", "Point-in-time assessment", "RoadRunner Secure"],
        ["What changed this week?", "Usually buried in charts", "Not available after delivery", "Diffed every run"],
        ["Who is affected?", "Often a count", "Usually sampled", "Named accounts, devices, resources, and paths"],
        ["How does it close?", "Manual status or score movement", "Follow-up meeting", "Evidence must prove closure"],
        ["What if data is missing?", "Silent blind spot", "Caveat in the report", "Visible data-gap finding"]
      ])}
    </div>
  </section>`;
}

function contactSection() {
  return `<section class="section">
    <div class="section-inner contact-grid">
      <div>
        <div class="eyebrow">Contact</div>
        <h2>Walk through the product or scope a pilot.</h2>
        <p class="lead">The form opens a structured email draft. The static site does not collect, transmit, or store form data by itself.</p>
        <div class="section-actions">
          <a class="button secondary" href="mailto:${brand.email}">${brand.email}</a>
        </div>
      </div>
      <form class="contact-form" data-contact-form>
        <div class="field-grid">
          <label>Name<input name="name" autocomplete="name" required></label>
          <label>Work email<input name="email" type="email" autocomplete="email" required></label>
        </div>
        <div class="field-grid">
          <label>Company<input name="company" autocomplete="organization"></label>
          <label>Role<input name="role" autocomplete="organization-title"></label>
        </div>
        <label>Interest
          <select name="interest">
            <option value="pilot">Scope a pilot</option>
            <option value="white-label">Review MSP white-label model</option>
            <option value="walkthrough">Product walkthrough</option>
            <option value="security">Security review</option>
          </select>
        </label>
        <div class="field-grid">
          <label>Environment size<input name="size" placeholder="Users, endpoints, tenants"></label>
          <label>Microsoft / on-prem scope<input name="scope" placeholder="M365, Azure, AD, Defender, Intune"></label>
        </div>
        <label>Notes
          <textarea name="notes" rows="5" placeholder="Pilot goals, MSP/client model, deployment constraints, security-review concerns"></textarea>
        </label>
        <button class="button primary" type="submit">Open email draft</button>
        <p class="form-note">No data is stored by this static page unless you send the generated email.</p>
      </form>
    </div>
  </section>`;
}

function sectionHead(eyebrow, title, copy) {
  return `<div class="section-head">
    <div>
      <div class="eyebrow">${eyebrow}</div>
      <h2>${title}</h2>
    </div>
    <p>${copy}</p>
  </div>`;
}

function productShot(image, alt, caption) {
  return `<div class="product-shot">
    <img src="${image}" alt="${alt}" loading="lazy">
    <div class="caption">${caption}</div>
  </div>`;
}

function table(rows) {
  const [head, ...body] = rows;
  return `<div class="comparison">
    <table>
      <thead><tr>${head.map((cell) => `<th>${cell}</th>`).join("")}</tr></thead>
      <tbody>${body.map((row) => `<tr>${row.map((cell, index) => `<td data-label="${head[index] || ""}">${cell}</td>`).join("")}</tr>`).join("")}</tbody>
    </table>
  </div>`;
}

function flowStep(title, text) {
  return `<div class="flow-step"><strong>${title}</strong><span>${text}</span></div>`;
}

function card(num, title, text) {
  return `<div class="info-card"><span class="number">${num}</span><h3>${title}</h3><p>${text}</p></div>`;
}

function plainCard(title, text) {
  return `<div class="info-card"><h3>${title}</h3><p>${text}</p></div>`;
}

function writeLogoVariants() {
  const sourcePath = join(siteDir, "assets", "roadrunner-logo.svg");
  const source = readFileSync(sourcePath, "utf8");
  const markPath = source.match(/<path d="([^"]+)"/)?.[1];
  if (!markPath) return;

  const markSvg = (fill) => `<svg width="180" height="120" viewBox="0 0 180 120" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="${markPath}" fill="${fill}" transform="translate(-110 0) scale(.22)"/>
</svg>
`;
  const lockupSvg = (ink, accent) => `<svg width="760" height="140" viewBox="0 0 760 140" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="RoadRunner Secure">
  <path d="${markPath}" fill="${accent}" transform="translate(-86 -8) scale(.25)"/>
  <text x="176" y="58" fill="${ink}" font-family="Inter, Arial, sans-serif" font-size="44" font-weight="850">RoadRunner Secure</text>
  <text x="178" y="94" fill="${accent}" font-family="IBM Plex Mono, monospace" font-size="18" font-weight="700">Evidence verified closure</text>
</svg>
`;
  writeFileSync(join(siteDir, "assets", "roadrunner-mark.svg"), markSvg("#2DD4BF"));
  writeFileSync(join(siteDir, "assets", "roadrunner-mark-dark.svg"), markSvg("#0D385B"));
  writeFileSync(join(siteDir, "assets", "roadrunner-lockup-secure.svg"), lockupSvg("#F4F8FB", "#2DD4BF"));
  writeFileSync(join(siteDir, "assets", "roadrunner-lockup-secure-dark.svg"), lockupSvg("#071019", "#0D385B"));
}

writeLogoVariants();
writeFileSync(join(siteDir, "styles.css"), css);
writeFileSync(join(siteDir, "script.js"), js);

for (const page of pages) {
  writeCleanPage(page);
  if (page.file !== "index.html") {
    writeFileSync(join(siteDir, page.file), legacyRedirectPage(page));
  }
}

writeFileSync(join(siteDir, "Home.dc.html"), legacyRedirectPage(pages[0], "RoadRunner Secure homepage moved"));
writeFileSync(join(siteDir, "Homepage Directions.dc.html"), designArchivePage());
writeFileSync(join(siteDir, "robots.txt"), robotsTxt());
writeFileSync(join(siteDir, "sitemap.xml"), sitemapXml());

console.log(`Generated RoadRunner Secure routes, assets, and deploy metadata in ${siteDir}`);

function writeCleanPage(page) {
  if (!page.slug) {
    writeFileSync(join(siteDir, "index.html"), shell(page));
    return;
  }
  const routeDir = join(siteDir, page.slug);
  mkdirSync(routeDir, { recursive: true });
  writeFileSync(join(routeDir, "index.html"), shell(page));
}

function legacyRedirectPage(page, title = `${page.title} moved`) {
  const target = page.slug ? `/${page.slug}/` : "/";
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex">
  <meta http-equiv="refresh" content="0; url=${target}">
  <title>${title}</title>
  <link rel="canonical" href="${page.slug ? `${brand.root}/${page.slug}/` : `${brand.root}/`}">
  <link rel="stylesheet" href="/styles.css">
</head>
<body>
  ${header(page.active)}
  <main id="main">
    <section class="hero">
      <div class="hero-inner">
        <div class="eyebrow">Moved</div>
        <h1>This page now lives at the clean RoadRunner Secure route.</h1>
        <p class="lead">If you are not redirected automatically, open the current page.</p>
        <div class="hero-actions">
          <a class="button primary" href="${target}">Open current page</a>
        </div>
      </div>
    </section>
  </main>
  ${footer()}
</body>
</html>
`;
}

function designArchivePage() {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex">
  <title>RoadRunner Secure internal design archive</title>
  <meta name="description" content="Internal noindex design archive for RoadRunner Secure homepage directions.">
  <link rel="stylesheet" href="/styles.css">
</head>
<body>
  <main id="main">
    <section class="hero">
      <div class="hero-inner">
        <div class="eyebrow">Internal archive</div>
        <h1>Homepage directions were consolidated into the production site.</h1>
        <p class="lead">This page is intentionally noindexed and unlinked from the public navigation. Use the current RoadRunner Secure pages for review.</p>
        <div class="hero-actions">
          <a class="button primary" href="/">Open current homepage</a>
          <a class="button secondary" href="/demo/">Open walkthrough</a>
        </div>
      </div>
    </section>
  </main>
</body>
</html>
`;
}

function robotsTxt() {
  return `User-agent: *
Allow: /
Disallow: /Homepage%20Directions.dc.html
Disallow: /Homepage Directions.dc.html
Disallow: /Home.dc.html

Sitemap: ${brand.root}/sitemap.xml
`;
}

function sitemapXml() {
  const urls = pages.map((page) => {
    const loc = page.slug ? `${brand.root}/${page.slug}/` : `${brand.root}/`;
    return `  <url><loc>${loc}</loc></url>`;
  }).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}
