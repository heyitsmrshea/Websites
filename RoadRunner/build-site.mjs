import { mkdirSync, writeFileSync } from "node:fs";
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

const messaging = {
  proofLine: "RoadRunner owns the assessment method and product logic. MSPs can deliver the client-facing surface under their own brand.",
  productOutcome: "Evidence becomes findings, findings become weekly work, and only changed evidence closes the loop.",
  polarisNote: "Polaris-branded screens are examples of an MSP white-label client surface powered by RoadRunner Secure."
};

const pages = [
  {
    file: "index.html",
    slug: "",
    active: "Home",
    title: "RoadRunner Secure | Weekly evidence-based security assessment",
    description: "RoadRunner Secure turns Microsoft, endpoint, cloud, and on-prem evidence into prioritized findings, weekly remediation work, and verified closure.",
    eyebrow: "RoadRunner-owned assessment platform",
    h1: "Security findings that actually close.",
    lead: "RoadRunner Secure converts tenant evidence into a weekly assessment loop: specific findings, named affected entities, recommended fixes, validation criteria, and client-ready reporting. Polaris branding appears only as a white-label MSP example.",
    primary: ["/demo/", "Review product walkthrough"],
    secondary: ["/contact/", "Scope a pilot"],
    body: homeBody()
  },
  {
    file: "Platform.dc.html",
    slug: "platform",
    active: "Platform",
    title: "Platform | RoadRunner Secure assessment workflow",
    description: "How RoadRunner Secure turns read-only evidence into findings, remediation queues, validation runs, and client-ready reporting.",
    eyebrow: "Platform workflow",
    h1: "Evidence in. Verified closure out.",
    lead: "The platform is a repeatable operating loop. Sources are read, findings are generated, work is prioritized, and the next run decides what is truly closed.",
    primary: ["/demo/", "See the workflow"],
    secondary: ["/contact/", "Discuss deployment"],
    body: platformBody()
  },
  {
    file: "OnPrem Attack Paths.dc.html",
    slug: "on-prem-attack-paths",
    active: "On-Prem",
    title: "On-Prem Attack Paths | Active Directory path assessment",
    description: "RoadRunner Secure maps Active Directory attack paths, recommends low-disruption fixes, and verifies path closure on the next run.",
    eyebrow: "On-prem attack paths",
    h1: "Find the path. Cut the right edge. Prove it died.",
    lead: "RoadRunner Secure turns Active Directory topology into practical path-closure work: which account, group, delegation, or server creates exposure, what to change, and what the next collector run must prove.",
    primary: ["/demo/#walkthrough-onprem", "View AD walkthrough"],
    secondary: ["/contact/", "Scope on-prem"],
    body: onPremBody()
  },
  {
    file: "Microsoft Security.dc.html",
    slug: "microsoft-security",
    active: "Microsoft",
    title: "Microsoft Security | Entra, Defender, Intune, M365, and Azure assessment",
    description: "RoadRunner Secure converts Microsoft security evidence into prioritized findings, owner-ready remediation, and verified closure.",
    eyebrow: "Microsoft security assessment",
    h1: "Microsoft posture without the score theater.",
    lead: "Secure Score is useful context, not the whole assessment. RoadRunner turns Entra, Defender, Intune, M365, and Azure evidence into specific work your team can assign and validate.",
    primary: ["/demo/#walkthrough-microsoft", "View Microsoft walkthrough"],
    secondary: ["/security/", "Review permissions"],
    body: microsoftBody()
  },
  {
    file: "Pricing.dc.html",
    slug: "pricing",
    active: "Pricing",
    title: "Pricing | RoadRunner Secure pilot and MSP partner models",
    description: "RoadRunner Secure starts with a scoped pilot, then prices by tenant count, evidence sources, deployment model, and white-label requirements.",
    eyebrow: "Pilot-first pricing",
    h1: "Price the assessment around proof.",
    lead: "Start with a focused pilot that produces real findings, a weekly queue, and a final remediation roadmap. Continue only if the output creates useful work.",
    primary: ["/contact/", "Scope a pilot"],
    secondary: ["/demo/", "Review walkthrough"],
    body: pricingBody()
  },
  {
    file: "Security.dc.html",
    slug: "security",
    active: "Security",
    title: "Security | RoadRunner Secure data handling and connector posture",
    description: "Security posture for RoadRunner Secure: read-only collection, connector permissions, tenant isolation, retention, offboarding, and disclosure process.",
    eyebrow: "Security and trust",
    h1: "Sensitive evidence needs explicit rules.",
    lead: "RoadRunner Secure is designed around read-only evidence collection, least-privilege access, tenant separation, visible limitations, and customer-controlled deployment options where required.",
    primary: ["/contact/", "Ask security questions"],
    secondary: ["/pricing/", "Discuss pilot"],
    body: securityBody()
  },
  {
    file: "Demo.dc.html",
    slug: "demo",
    active: "Walkthrough",
    title: "Product Walkthrough | RoadRunner Secure",
    description: "A guided synthetic RoadRunner Secure walkthrough showing baseline assessment, findings, remediation queue, validation, and white-label reporting.",
    eyebrow: "Guided product walkthrough",
    h1: "A weekly run, start to finish.",
    lead: "This is a synthetic walkthrough using fictional evidence. Polaris branding demonstrates an MSP white-label client portal powered by RoadRunner Secure.",
    primary: ["#walkthrough", "Start walkthrough"],
    secondary: ["/contact/", "Walk through it live"],
    body: demoBody()
  },
  {
    file: "Contact.dc.html",
    slug: "contact",
    active: "Contact",
    title: "Contact | RoadRunner Secure pilot and white-label assessment",
    description: "Contact RoadRunner Secure to scope a pilot, review the MSP white-label model, or walk through the synthetic assessment demo.",
    eyebrow: "Contact RoadRunner",
    h1: "Scope the first assessment run.",
    lead: "Use this page to request a pilot, review the MSP white-label model, or walk through the synthetic product flow. The static form opens your email client and stores nothing on the site.",
    primary: [`mailto:${brand.email}?subject=RoadRunner%20Secure%20pilot%20scope`, "Email directly"],
    secondary: ["/demo/", "Review walkthrough"],
    body: contactBody()
  }
];

const css = String.raw`
:root {
  --ink: #081522;
  --navy: #0d385b;
  --navy-2: #124568;
  --cyan: #2dd4bf;
  --cyan-2: #0ea5a4;
  --paper: #f7f8f4;
  --paper-2: #eef3ef;
  --paper-3: #e6ece8;
  --line: rgba(8, 21, 34, .14);
  --line-dark: rgba(247, 248, 244, .16);
  --muted: #5c6b74;
  --muted-light: rgba(247, 248, 244, .7);
  --danger: #e04f5f;
  --warn: #b06a00;
  --success: #14723a;
  --radius: 8px;
  --shadow: 0 20px 60px rgba(8, 21, 34, .16);
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  background: var(--paper);
  color: var(--ink);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  line-height: 1.5;
}
img, svg { max-width: 100%; }
a { color: inherit; }
a:focus-visible, button:focus-visible, input:focus-visible, select:focus-visible, textarea:focus-visible {
  outline: 3px solid var(--cyan);
  outline-offset: 3px;
}
.skip-link {
  position: absolute;
  left: 16px;
  top: -60px;
  z-index: 100;
  background: var(--cyan);
  color: var(--ink);
  padding: 10px 14px;
  border-radius: var(--radius);
  font-weight: 800;
}
.skip-link:focus { top: 16px; }

.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(247, 248, 244, .94);
  border-bottom: 1px solid var(--line);
  backdrop-filter: blur(14px);
}
.nav-shell {
  max-width: 1240px;
  margin: 0 auto;
  padding: 14px 24px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 16px;
}
.brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  min-width: 0;
}
.brand-logo-box {
  width: 48px;
  height: 48px;
  border-radius: var(--radius);
  display: grid;
  place-items: center;
  background: #fff;
  border: 1px solid var(--line);
  overflow: hidden;
  flex: none;
}
.brand-logo-box img {
  width: 40px;
  height: 40px;
  object-fit: contain;
}
.brand-title { display: grid; gap: 1px; }
.brand-title strong {
  font-size: 15px;
  letter-spacing: .08em;
  text-transform: uppercase;
}
.brand-title span {
  font-size: 12px;
  color: var(--muted);
}
.nav-links {
  display: flex;
  justify-content: center;
  gap: 4px;
  flex-wrap: wrap;
}
.nav-links a {
  text-decoration: none;
  font-size: 12.5px;
  font-weight: 750;
  color: #40515d;
  padding: 7px 8px;
  border-radius: var(--radius);
}
.nav-links a:hover, .nav-links a[aria-current="page"] {
  background: rgba(13, 56, 91, .08);
  color: var(--navy);
}
.nav-cta {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: flex-end;
}
.mobile-menu {
  display: none;
}
.mobile-menu summary {
  list-style: none;
}
.mobile-menu summary::-webkit-details-marker {
  display: none;
}
.mobile-menu-panel {
  display: grid;
  gap: 8px;
  padding-top: 12px;
}
.mobile-menu:not([open]) .mobile-menu-panel {
  display: none;
}
.mobile-menu-panel a {
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius);
  border: 1px solid var(--line);
  background: #fff;
  color: var(--ink);
  text-decoration: none;
  font-weight: 800;
}
.mobile-menu-panel a[aria-current="page"] {
  background: rgba(13, 56, 91, .08);
  color: var(--navy);
  border-color: rgba(13, 56, 91, .28);
}
.button, button.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  border-radius: var(--radius);
  border: 1px solid transparent;
  padding: 11px 16px;
  text-decoration: none;
  font-weight: 800;
  font-size: 14px;
  cursor: pointer;
}
.button.primary { background: var(--navy); color: #fff; }
.button.primary:hover { background: var(--navy-2); }
.button.secondary {
  border-color: var(--line);
  background: #fff;
  color: var(--ink);
}
.button.secondary:hover { border-color: rgba(13, 56, 91, .4); }

.hero {
  background:
    radial-gradient(circle at top right, rgba(45, 212, 191, .15), transparent 28rem),
    linear-gradient(180deg, #fff, var(--paper));
}
.hero-inner, .section-inner {
  max-width: 1240px;
  margin: 0 auto;
  padding: 84px 24px;
}
.hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(360px, .9fr);
  gap: 44px;
  align-items: center;
}
.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 18px;
  color: var(--navy);
  font-size: 12px;
  letter-spacing: .12em;
  text-transform: uppercase;
  font-weight: 900;
}
.eyebrow::before {
  content: "";
  width: 9px;
  height: 9px;
  background: var(--cyan);
  transform: rotate(45deg);
  border-radius: 2px;
}
h1, h2, h3 {
  margin: 0;
  line-height: 1.08;
  letter-spacing: 0;
}
h1 {
  max-width: 12ch;
  font-size: clamp(42px, 7vw, 76px);
  font-weight: 900;
}
h2 {
  font-size: clamp(30px, 4vw, 48px);
  font-weight: 900;
}
h3 {
  font-size: 20px;
  font-weight: 850;
}
.lead {
  margin: 22px 0 0;
  max-width: 66ch;
  color: #40515d;
  font-size: 18px;
}
.hero-actions, .section-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 30px;
}
.assurance-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 22px;
}
.pill {
  display: inline-flex;
  align-items: center;
  min-height: 30px;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: #fff;
  color: #40515d;
  padding: 6px 10px;
  font-size: 12px;
  font-weight: 800;
}
.hero-card, .panel {
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: #fff;
  box-shadow: var(--shadow);
}
.hero-card { padding: 22px; }
.logo-hero {
  display: grid;
  grid-template-columns: 112px 1fr;
  gap: 20px;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--line);
}
.logo-hero img {
  display: block;
  width: 112px;
  height: auto;
}
.metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 18px;
}
.metric {
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 16px;
  background: var(--paper);
}
.metric strong {
  display: block;
  font-size: 34px;
  line-height: 1;
  color: var(--navy);
}
.metric span {
  display: block;
  margin-top: 6px;
  color: var(--muted);
  font-size: 13px;
  font-weight: 750;
}
.queue {
  margin-top: 18px;
  display: grid;
  gap: 8px;
}
.queue-row {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 12px;
  align-items: center;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 12px;
  background: #fff;
  font-size: 13px;
}
.tag {
  display: inline-flex;
  border-radius: 5px;
  padding: 4px 7px;
  font-size: 11px;
  font-weight: 900;
  line-height: 1;
}
.tag.high { color: var(--danger); background: rgba(224, 79, 95, .12); }
.tag.gap { color: var(--warn); background: rgba(240, 162, 41, .16); }
.tag.done { color: var(--success); background: rgba(72, 199, 116, .16); }

.section { border-top: 1px solid var(--line); }
.section.dark {
  background: var(--ink);
  color: var(--paper);
  border-color: var(--line-dark);
}
.section.alt { background: var(--paper-2); }
.section.dark .lead, .section.dark .subtle, .section.dark p { color: var(--muted-light); }
.section.dark .eyebrow { color: var(--cyan); }
.section.dark .card, .section.dark .panel, .section.dark .proof-card, .section.dark .artifact {
  background: #0d1c2a;
  border-color: var(--line-dark);
  box-shadow: none;
}
.section-head {
  display: grid;
  grid-template-columns: minmax(0, .85fr) minmax(280px, .55fr);
  gap: 32px;
  align-items: end;
  margin-bottom: 34px;
}
.section-head p {
  margin: 0;
  color: var(--muted);
  font-size: 16px;
}
.grid { display: grid; gap: 16px; }
.grid.one { grid-template-columns: 1fr; }
.grid.two { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.grid.three { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.grid.four { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.card, .proof-card, .artifact {
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: #fff;
  padding: 22px;
}
.card p, .proof-card p, .artifact p {
  margin: 10px 0 0;
  color: var(--muted);
}
.number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 30px;
  height: 30px;
  padding: 0 9px;
  border-radius: var(--radius);
  background: rgba(13, 56, 91, .1);
  color: var(--navy);
  font-size: 12px;
  font-weight: 900;
  margin-bottom: 16px;
}
.section.dark .number {
  background: rgba(45, 212, 191, .14);
  color: var(--cyan);
}
.product-shot {
  border: 1px solid var(--line-dark);
  border-radius: var(--radius);
  overflow: hidden;
  background: #02070c;
}
.product-shot img {
  display: block;
  width: 100%;
}
.caption {
  padding: 12px 14px;
  border-top: 1px solid var(--line-dark);
  color: rgba(247, 248, 244, .72);
  font-size: 13px;
}
.proof-list { display: grid; gap: 12px; }
.proof-item {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 14px;
  border-top: 1px solid var(--line);
  padding-top: 14px;
}
.proof-item:first-child {
  border-top: 0;
  padding-top: 0;
}
.proof-item strong { color: var(--navy); }
.section.dark .proof-item { border-color: var(--line-dark); }
.section.dark .proof-item strong { color: var(--cyan); }

.artifact {
  display: grid;
  gap: 16px;
}
.artifact-header {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}
.artifact-title {
  display: grid;
  gap: 4px;
}
.artifact-title strong {
  color: var(--navy);
  font-size: 13px;
  letter-spacing: .08em;
  text-transform: uppercase;
}
.artifact-title h3 { font-size: 24px; }
.section.dark .artifact-title strong { color: var(--cyan); }
.artifact-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}
.artifact-field {
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--paper);
  padding: 14px;
}
.section.dark .artifact-field {
  background: #081522;
  border-color: var(--line-dark);
}
.artifact-field b {
  display: block;
  margin-bottom: 6px;
  color: var(--navy);
  font-size: 12px;
  letter-spacing: .08em;
  text-transform: uppercase;
}
.section.dark .artifact-field b { color: var(--cyan); }
.artifact-field span {
  display: block;
  color: #40515d;
  font-size: 14px;
}
.section.dark .artifact-field span { color: var(--muted-light); }
.code-block {
  overflow-x: auto;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: #07111b;
  color: #d6f7ef;
  padding: 16px;
  font-family: "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 13px;
  line-height: 1.55;
}
.flow {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 10px;
}
.flow-step {
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: #fff;
  padding: 14px;
}
.flow-step strong {
  display: block;
  color: var(--navy);
  font-size: 13px;
  margin-bottom: 8px;
}
.flow-step span {
  color: var(--muted);
  font-size: 13px;
}

.comparison {
  overflow-x: auto;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: #fff;
  color: var(--ink);
}
.comparison table {
  width: 100%;
  border-collapse: collapse;
  min-width: 720px;
}
.comparison th, .comparison td {
  padding: 16px;
  text-align: left;
  border-bottom: 1px solid var(--line);
  vertical-align: top;
  color: var(--ink);
}
.comparison tr:last-child th, .comparison tr:last-child td { border-bottom: 0; }
.comparison th {
  color: var(--navy);
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: .06em;
}
.callout {
  border: 1px solid rgba(45, 212, 191, .45);
  border-radius: var(--radius);
  background: rgba(45, 212, 191, .08);
  padding: 22px;
}
.contact-grid {
  display: grid;
  grid-template-columns: minmax(0, .75fr) minmax(320px, .9fr);
  gap: 28px;
  align-items: start;
}
.contact-form { display: grid; gap: 14px; }
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
  border-radius: var(--radius);
  background: #fff;
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
  background: #06101b;
  color: var(--paper);
}
.footer-inner {
  max-width: 1240px;
  margin: 0 auto;
  padding: 36px 24px;
  display: grid;
  gap: 22px;
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
  gap: 12px;
}
.footer-logo {
  width: 54px;
  height: 54px;
  border-radius: var(--radius);
  background: #fff;
  display: grid;
  place-items: center;
  overflow: hidden;
}
.footer-logo img { width: 46px; }
.footer-links {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  color: rgba(247, 248, 244, .68);
}
.footer-links a { text-decoration: none; }
.footer-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  color: rgba(247, 248, 244, .54);
  font-size: 12px;
}
.subtle { color: var(--muted); }
.mono {
  font-family: "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
  letter-spacing: .02em;
}

@media (max-width: 1120px) {
  .nav-shell {
    grid-template-columns: 1fr;
    align-items: start;
  }
  .nav-links, .nav-cta { justify-content: flex-start; }
  .hero-grid, .section-head, .contact-grid { grid-template-columns: 1fr; }
  h1 { max-width: 14ch; }
  .grid.four { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .flow { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (max-width: 760px) {
  .hero-inner, .section-inner { padding: 58px 18px; }
  .nav-shell {
    padding: 12px 16px;
    gap: 14px;
    grid-template-columns: 1fr auto;
    align-items: center;
  }
  .nav-links,
  .nav-cta {
    display: none;
  }
  .mobile-menu {
    display: block;
    justify-self: end;
  }
  .mobile-menu[open] {
    grid-column: 1 / -1;
    justify-self: stretch;
  }
  .mobile-menu summary {
    min-width: 48px;
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--line);
    border-radius: var(--radius);
    background: #fff;
    color: var(--ink);
    font-weight: 900;
    cursor: pointer;
  }
  .brand-logo-box {
    width: 42px;
    height: 42px;
  }
  .brand-title strong { font-size: 13px; }
  .brand-title span { font-size: 11px; }
  .nav-links { gap: 4px; }
  .nav-links a {
    padding: 7px 8px;
    font-size: 12px;
  }
  h1 {
    max-width: none;
    font-size: clamp(34px, 10vw, 42px);
  }
  h2 {
    font-size: clamp(28px, 9vw, 36px);
  }
  .lead {
    font-size: 16px;
  }
  .queue-row, .grid.two, .grid.three, .grid.four, .field-grid, .proof-item, .artifact-grid, .flow {
    grid-template-columns: 1fr;
  }
  .logo-hero {
    grid-template-columns: 84px 1fr;
    gap: 14px;
  }
  .logo-hero img {
    width: 84px;
  }
  .metrics {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  .metric {
    padding: 12px 8px;
  }
  .metric strong {
    font-size: 28px;
  }
  .metric span {
    font-size: 11px;
  }
  .hero-grid { gap: 28px; }
  .hero-card { padding: 16px; }
  .hero-card .queue {
    display: none;
  }
  .queue-row { align-items: start; }
  .button { width: 100%; }
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
    border-bottom: 1px solid var(--line);
    padding: 10px 0;
  }
  .comparison tr:last-child {
    border-bottom: 0;
  }
  .comparison td {
    border-bottom: 0;
    padding: 9px 14px;
  }
  .comparison td::before {
    content: attr(data-label);
    display: block;
    margin-bottom: 4px;
    color: var(--navy);
    font-size: 11px;
    font-weight: 900;
    letter-spacing: .08em;
    text-transform: uppercase;
  }
  .section.dark .comparison td::before {
    color: var(--navy);
  }
  .code-block {
    font-size: 12px;
    padding: 12px;
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
    border: 1px solid var(--line-dark);
    border-radius: var(--radius);
    padding: 8px 10px;
  }
}

@media (max-width: 360px) {
  .brand-title span {
    display: none;
  }
  .hero-inner, .section-inner {
    padding-left: 16px;
    padding-right: 16px;
  }
  .metrics {
    grid-template-columns: 1fr;
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
    const interest = data.get("interest") || "walkthrough";
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
      encodeURIComponent(subjectByInterest[interest] || subjectByInterest.walkthrough) +
      "&body=" + encodeURIComponent(body);
  });
}
`;

function shell(page) {
  const canonical = `${brand.root}/${page.slug}`;
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
  <link rel="icon" href="/assets/roadrunner-logo.svg" type="image/svg+xml">
  <link rel="alternate icon" href="/favicon.ico">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500;700&family=Inter:wght@400;600;700;800;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/styles.css">
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  ${header(page.active)}
  <main id="main">
    <section class="hero">
      <div class="hero-inner hero-grid">
        <div>
          <div class="eyebrow">${page.eyebrow}</div>
          <h1>${page.h1}</h1>
          <p class="lead">${page.lead}</p>
          <div class="hero-actions">
            <a class="button primary" href="${page.primary[0]}">${page.primary[1]}</a>
            <a class="button secondary" href="${page.secondary[0]}">${page.secondary[1]}</a>
          </div>
          <div class="assurance-row">
            <span class="pill">Read-only evidence</span>
            <span class="pill">White-label ready</span>
            <span class="pill">Evidence-verified closure</span>
          </div>
        </div>
        ${heroCard()}
      </div>
    </section>
    ${page.body}
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
        <span class="brand-logo-box"><img src="/assets/roadrunner-logo.svg" alt=""></span>
        <span class="brand-title"><strong>RoadRunner Secure</strong><span>Assessment by ${brand.owner}</span></span>
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

function footer() {
  const links = navItems.slice(1).map(([href, label]) => `<a href="${href}">${label}</a>`).join("");
  return `<footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-top">
        <div class="footer-brand">
          <span class="footer-logo"><img src="/assets/roadrunner-logo.svg" alt=""></span>
          <div><strong>${brand.name}</strong><br><span class="subtle">${messaging.proofLine}</span></div>
        </div>
        <nav class="footer-links" aria-label="Footer navigation">${links}</nav>
      </div>
      <div class="footer-meta">
        <span>Read-only evidence posture</span>
        <span>No auto-remediation by default</span>
        <span>Synthetic walkthrough uses fictional evidence</span>
        <span>&copy; ${brand.owner}, LLC</span>
      </div>
    </div>
  </footer>`;
}

function heroCard() {
  return `<aside class="hero-card" aria-label="RoadRunner Secure assessment summary">
    <div class="logo-hero">
      <img src="/assets/roadrunner-logo.svg" alt="RoadRunner Strategies">
      <div>
        <h3>Weekly assessment run</h3>
        <p class="subtle">${messaging.productOutcome}</p>
      </div>
    </div>
    <div class="metrics">
      <div class="metric"><strong>14</strong><span>Needs action now</span></div>
      <div class="metric"><strong>9</strong><span>Verified closed</span></div>
      <div class="metric"><strong>3</strong><span>Source gaps surfaced</span></div>
    </div>
    <div class="queue">
      <div class="queue-row"><span class="tag high">HIGH</span><span>Legacy authentication still active for named accounts</span><span class="mono">validate next run</span></div>
      <div class="queue-row"><span class="tag high">HIGH</span><span>Standing Global Admins should move to just-in-time access</span><span class="mono">owner: identity</span></div>
      <div class="queue-row"><span class="tag done">DONE</span><span>MFA gap closed by evidence change</span><span class="mono">stamped closed</span></div>
    </div>
  </aside>`;
}

function homeBody() {
  return `
${whatItDoes()}
${sampleFindingCard("home")}
${weeklyAssessmentLoop()}
${whiteLabelPolarisNote()}
${artifactScreens()}
${comparisonSection()}
${contactSection()}`;
}

function whatItDoes() {
  return `<section class="section">
    <div class="section-inner">
      <div class="section-head">
        <div>
          <div class="eyebrow">What RoadRunner does</div>
          <h2>It turns posture evidence into accountable weekly work.</h2>
        </div>
        <p>Most tools expose more information than a lean team can absorb. RoadRunner turns the evidence into a smaller set of findings with owners, target states, and validation logic.</p>
      </div>
      <div class="grid four">
        ${plainCard("Evidence", "Read Microsoft, endpoint, cloud, on-prem, and manual evidence sources without changing customer systems.")}
        ${plainCard("Findings", "Produce findings that name affected entities and explain why the exposure matters.")}
        ${plainCard("Work queue", "Rank fixes across domains so the team can decide what happens this week.")}
        ${plainCard("Closure trail", "Stamp work closed only when the next run proves the evidence changed.")}
      </div>
    </div>
  </section>`;
}

function weeklyAssessmentLoop() {
  return `<section class="section alt">
    <div class="section-inner">
      <div class="section-head">
        <div>
          <div class="eyebrow">Weekly assessment loop</div>
          <h2>Six answers, in the same order every run.</h2>
        </div>
        <p>The point is operational rhythm. A finding is not done because someone clicked done. It is done when source evidence proves it.</p>
      </div>
      <div class="grid three">
        ${card("01", "What changed", "New, regressed, verified-closed, and data-gap findings this run versus last.")}
        ${card("02", "What matters", "Ranked by exposure, exploitability, blast radius, and confidence in the evidence.")}
        ${card("03", "What to fix", "A concrete target state, not vague guidance like review configuration.")}
        ${card("04", "Who is affected", "Named accounts, devices, resources, groups, and paths. A count alone is not a finding.")}
        ${card("05", "How to fix it", "Steps a capable IT generalist, MSP engineer, or security owner can execute or assign.")}
        ${card("06", "How to validate", "Every fix states what next week's evidence must show before closure is stamped.")}
      </div>
    </div>
  </section>`;
}

function whiteLabelPolarisNote() {
  return `<section class="section dark">
    <div class="section-inner">
      <div class="section-head">
        <div>
          <div class="eyebrow">White-label model</div>
          <h2>RoadRunner powers the assessment. MSPs can own the client-facing brand.</h2>
        </div>
        <p>${messaging.polarisNote} The brand relationship is explicit so the site does not blur RoadRunner, Polaris, and customer delivery.</p>
      </div>
      <div class="grid two">
        <div class="product-shot">
          <img src="/refs/polaris-executive-v2.png" alt="Polaris-branded white-label executive posture dashboard">
          <div class="caption">Example MSP-branded client portal: executive posture, closure metrics, and source gaps under Polaris branding.</div>
        </div>
        <div class="panel card">
          <span class="number">RR</span>
          <h3>Brand ownership model</h3>
          <div class="proof-list">
            <div class="proof-item"><strong>RoadRunner</strong><span>Owns the assessment method, platform logic, evidence model, and closure doctrine.</span></div>
            <div class="proof-item"><strong>MSP</strong><span>Can present client-facing assessment delivery under its own brand and service packaging.</span></div>
            <div class="proof-item"><strong>Client</strong><span>Receives named findings, proof, remediation guidance, and validation history they can review.</span></div>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

function artifactScreens() {
  return `<section class="section">
    <div class="section-inner">
      <div class="section-head">
        <div>
          <div class="eyebrow">Product artifacts</div>
          <h2>Use screenshots as proof, not decoration.</h2>
        </div>
        <p>Each visual explains what decision the viewer can make from the product surface.</p>
      </div>
      <div class="grid two">
        <div class="product-shot">
          <img src="/refs/polaris-onprem.png" alt="White-label Active Directory attack-path graph and collector workflow">
          <div class="caption">On-prem attack paths: see the route to Tier 0, the risky edge, and the collector options that refresh evidence.</div>
        </div>
        <div class="product-shot">
          <img src="/refs/polaris-vciso-v2.png" alt="White-label AI vCISO screen grounded in finding evidence">
          <div class="caption">Grounded vCISO answers: cite the underlying findings and state when evidence is missing.</div>
        </div>
      </div>
    </div>
  </section>`;
}

function platformBody() {
  return `
${dataFlowSection()}
${sourceCoverageTable()}
${lifecycleSection()}
${roleViews()}
${whiteLabelPolarisNote()}
${contactSection()}`;
}

function dataFlowSection() {
  return `<section class="section">
    <div class="section-inner">
      <div class="section-head">
        <div>
          <div class="eyebrow">Data flow</div>
          <h2>The architecture is simple enough to inspect.</h2>
        </div>
        <p>RoadRunner is intentionally organized around the assessment chain: source evidence, stored proof, generated findings, assigned work, validation, and reporting.</p>
      </div>
      <div class="flow" aria-label="RoadRunner Secure data flow">
        ${flowStep("Sources", "Microsoft, endpoint, cloud, AD, and manual evidence.")}
        ${flowStep("Read-only collection", "Connectors and collectors observe posture.")}
        ${flowStep("Evidence store", "Normalized proof with freshness and source health.")}
        ${flowStep("Finding engine", "Rules produce named, explainable findings.")}
        ${flowStep("Weekly queue", "Prioritized remediation work by owner.")}
        ${flowStep("Validation run", "Next run checks whether evidence changed.")}
        ${flowStep("Closure trail", "Verified findings roll into reports.")}
      </div>
    </div>
  </section>`;
}

function sourceCoverageTable() {
  return `<section class="section alt">
    <div class="section-inner">
      <div class="section-head">
        <div>
          <div class="eyebrow">Source coverage</div>
          <h2>Signals are useful only when their limits are visible.</h2>
        </div>
        <p>RoadRunner treats missing visibility as an assessment finding, not a quiet blank space in a dashboard.</p>
      </div>
      ${table([
        ["Source", "Typical evidence", "What RoadRunner does with it"],
        ["Microsoft", "Entra roles, Conditional Access, sign-ins, Defender, Intune, M365, Azure posture", "Creates identity, endpoint, cloud, and collaboration findings with owner-ready remediation."],
        ["On-prem AD", "Groups, ACLs, delegation, sessions where available, local admin exposure, path topology", "Maps attack paths and recommends low-disruption edge cuts."],
        ["Endpoint/security tools", "Device health, onboarding state, incidents, alert backlog, exposure signals", "Turns coverage and response gaps into weekly work."],
        ["Manual evidence", "Exceptions, business context, compensating controls, MSP notes", "Adds human context without letting manual status override validation evidence."]
      ])}
    </div>
  </section>`;
}

function lifecycleSection() {
  return `<section class="section dark">
    <div class="section-inner">
      <div class="section-head">
        <div>
          <div class="eyebrow">Lifecycle</div>
          <h2>Discovery to closure without losing the thread.</h2>
        </div>
        <p>The workflow is built for teams that need recurring execution, not one more static report.</p>
      </div>
      <div class="grid four">
        ${card("01", "Discover", "Collect evidence, detect gaps, and baseline the tenant.")}
        ${card("02", "Prioritize", "Rank findings across Microsoft, endpoint, cloud, and on-prem work.")}
        ${card("03", "Assign", "Give owners the entities, fix steps, and validation criteria.")}
        ${card("04", "Report", "Show verified closure, regressions, and blocked visibility to leadership.")}
      </div>
    </div>
  </section>`;
}

function roleViews() {
  return `<section class="section">
    <div class="section-inner">
      <div class="section-head">
        <div>
          <div class="eyebrow">Role-based views</div>
          <h2>Same evidence, different decisions.</h2>
        </div>
        <p>RoadRunner should not make every stakeholder read the same security artifact.</p>
      </div>
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
<section class="section dark" id="walkthrough-onprem"><div class="section-inner">
  <div class="product-shot">
    <img src="/refs/polaris-onprem.png" alt="White-label Active Directory attack-path graph and collector options">
    <div class="caption">Representative white-label AD topology and collector workflow. RoadRunner assessment logic powers the path analysis.</div>
  </div>
</div></section>
${sampleFindingCard("onprem")}
${collectorDetailSection()}
${collectorSampleSection()}
${remediationMappingSection()}
${contactSection()}`;
}

function collectorDetailSection() {
  return `<section class="section">
    <div class="section-inner">
      <div class="section-head">
        <div>
          <div class="eyebrow">Collector model</div>
          <h2>Read-only, scoped, and deployable by normal IT operations.</h2>
        </div>
        <p>The collector should be explainable to an AD owner before it ever runs. This page now states what it reads, what it avoids, and how evidence can move.</p>
      </div>
      <div class="grid four">
        ${plainCard("Permissions", "Run with scoped read access sufficient to enumerate directory objects, group membership, ACLs, delegation, and relevant computer metadata.")}
        ${plainCard("Collected fields", "Users, groups, computers, memberships, privileged relationships, ACL edges, delegation indicators, and source timestamps.")}
        ${plainCard("Never collected", "No password material, no credential harvesting, no destructive testing, and no automatic changes to directory objects.")}
        ${plainCard("Upload paths", "Direct upload to the tenant evidence store, MSP-managed upload, or offline export for isolated environments.")}
      </div>
    </div>
  </section>`;
}

function collectorSampleSection() {
  return `<section class="section alt">
    <div class="section-inner">
      <div class="section-head">
        <div>
          <div class="eyebrow">Redacted collector sample</div>
          <h2>Technical buyers need to see the shape of evidence.</h2>
        </div>
        <p>This is representative output, not customer data. It makes clear that the collector is topology-focused rather than credential-focused.</p>
      </div>
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

function remediationMappingSection() {
  return `<section class="section dark">
    <div class="section-inner">
      <div class="section-head">
        <div>
          <div class="eyebrow">Path closure</div>
          <h2>Every path finding maps to a fix and a validation condition.</h2>
        </div>
        <p>The useful output is not a large graph. It is the cheapest defensible change that kills meaningful exposure.</p>
      </div>
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
<section class="section" id="walkthrough-microsoft"><div class="section-inner">
  <div class="section-head"><div><div class="eyebrow">Microsoft coverage</div><h2>Exact domains, exact findings, exact limits.</h2></div><p>Coverage depends on licensing and granted permissions. RoadRunner should say what it can prove and what remains unknown.</p></div>
  <div class="grid three">
    ${plainCard("Entra ID", "Privileged roles, MFA coverage, Conditional Access gaps, risky users, legacy auth, guest exposure, and role assignment drift.")}
    ${plainCard("Defender", "Incident backlog, exposure signals, device risk, alert hygiene, and onboarding coverage where available.")}
    ${plainCard("Intune", "Compliance policy coverage, unmanaged devices, stale enrollments, device encryption, and platform-specific baseline gaps.")}
    ${plainCard("Exchange and M365", "Legacy protocol exposure, mailbox forwarding, audit posture, sharing controls, and risky collaboration settings.")}
    ${plainCard("SharePoint and OneDrive", "External sharing posture, sensitive site exposure, anonymous links, and admin control coverage.")}
    ${plainCard("Azure posture", "Subscription security settings, Defender plan coverage, privileged access, network exposure, and policy gaps.")}
  </div>
</div></section>
${sampleFindingCard("microsoft")}
${secureScoreSection()}
${permissionsSection()}
${contactSection()}`;
}

function secureScoreSection() {
  return `<section class="section dark">
    <div class="section-inner">
      <div class="section-head">
        <div>
          <div class="eyebrow">Secure Score is not enough</div>
          <h2>Scores do not assign work or prove closure.</h2>
        </div>
        <p>RoadRunner can use Microsoft score data as context, but the assessment output is built around named evidence and validation.</p>
      </div>
      ${table([
        ["Question", "Microsoft Secure Score", "RoadRunner Secure"],
        ["What is wrong?", "Control-level recommendations", "Named findings with affected accounts, devices, policies, or resources"],
        ["Who owns it?", "Usually outside the score", "Owner-ready queue with remediation context"],
        ["Why this first?", "Score impact may dominate", "Prioritized by exposure, blast radius, confidence, and operational urgency"],
        ["How does it close?", "Score movement or manual review", "Next evidence run must satisfy validation criteria"]
      ])}
    </div>
  </section>`;
}

function permissionsSection() {
  return `<section class="section alt">
    <div class="section-inner">
      <div class="section-head">
        <div>
          <div class="eyebrow">Connector permissions</div>
          <h2>Permissions are part of the buying decision.</h2>
        </div>
        <p>Exact permission names should be finalized against the implementation, but the public page now explains the purpose and read-only posture.</p>
      </div>
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
${includedNotIncludedSection()}
${pricingInputsSection()}
${buyingObjectionsSection()}
${contactSection()}`;
}

function pilotShapeSection() {
  return `<section class="section">
    <div class="section-inner">
      <div class="section-head">
        <div>
          <div class="eyebrow">Pilot shape</div>
          <h2>A useful pilot proves the loop in 2 to 4 weeks.</h2>
        </div>
        <p>If the weekly findings and closure trail do not create usable work, the pilot should end cleanly with the output retained.</p>
      </div>
      <div class="grid four">
        ${card("Week 0", "Scope and access", "Confirm tenant count, Microsoft/on-prem scope, white-label needs, and read-only access.")}
        ${card("Week 1", "Baseline", "Run the first assessment and review highest-priority findings.")}
        ${card("Weeks 2-3", "Work the queue", "Fix selected findings, refresh evidence, and watch validation behavior.")}
        ${card("Week 4", "Decision", "Deliver report, roadmap, and recommendation to continue, expand, or stop.")}
      </div>
    </div>
  </section>`;
}

function packageSection() {
  return `<section class="section dark">
    <div class="section-inner">
      <div class="section-head">
        <div>
          <div class="eyebrow">Commercial models</div>
          <h2>Pricing follows scope, not a generic seat grid.</h2>
        </div>
        <p>Exact numbers can be quoted after the deployment shape is known. The public page should still make the buying motion concrete.</p>
      </div>
      ${table([
        ["Model", "Best fit", "Included shape"],
        ["Pilot", "A first tenant or controlled client sample", "Baseline assessment, weekly findings review, final report, and remediation roadmap"],
        ["MSP Partner", "Recurring white-label delivery across clients", "Client portals, MSP operating queue, white-label reporting, and tenant rollout planning"],
        ["Enterprise / Custom", "Customer-owned or constrained deployment", "Custom access model, evidence flow review, security review support, and tailored source scope"]
      ])}
    </div>
  </section>`;
}

function pricingInputsSection() {
  return `<section class="section alt">
    <div class="section-inner">
      <div class="section-head">
        <div>
          <div class="eyebrow">Pricing inputs</div>
          <h2>Bring the facts that change the scope.</h2>
        </div>
        <p>These inputs keep the conversation concrete without publishing a fake one-size-fits-all price.</p>
      </div>
      <div class="grid three">
        ${plainCard("Environment size", "Users, endpoints, tenants, subscriptions, and on-prem domains.")}
        ${plainCard("Evidence sources", "Microsoft-only, on-prem AD, endpoint/security tooling, and any manual evidence needs.")}
        ${plainCard("Deployment model", "RoadRunner-hosted, MSP-managed, customer-owned, or offline collector requirements.")}
      </div>
    </div>
  </section>`;
}

function includedNotIncludedSection() {
  return `<section class="section">
    <div class="section-inner">
      <div class="section-head">
        <div>
          <div class="eyebrow">Included and not included</div>
          <h2>Define the boundary before the pilot starts.</h2>
        </div>
        <p>This prevents the first assessment from turning into an open-ended consulting engagement.</p>
      </div>
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

function buyingObjectionsSection() {
  return `<section class="section">
    <div class="section-inner">
      <div class="section-head">
        <div>
          <div class="eyebrow">Common objections</div>
          <h2>The pilot is designed to reduce procurement friction.</h2>
        </div>
        <p>The site should answer the questions a cautious buyer will ask before they book the first call.</p>
      </div>
      <div class="grid three">
        ${plainCard("No long-term commitment", "Start with a bounded pilot and continue only if the closure trail is useful.")}
        ${plainCard("Scoped access", "Use read-only permissions and document what each connector needs before approval.")}
        ${plainCard("Clear deliverables", "Baseline findings, weekly queue, validation results, final report, and roadmap.")}
      </div>
    </div>
  </section>`;
}

function securityBody() {
  return `
${securityTrustGrid()}
${connectorPermissionsTable()}
${dataHandlingSection()}
${securityBoundariesSection()}
${complianceRoadmapSection()}
${contactSection()}`;
}

function securityTrustGrid() {
  return `<section class="section">
    <div class="section-inner">
      <div class="section-head">
        <div>
          <div class="eyebrow">Trust posture</div>
          <h2>Security claims should be specific enough to review.</h2>
        </div>
        <p>This page now covers the minimum categories a security reviewer will expect before deeper due diligence.</p>
      </div>
      <div class="grid three">
        ${plainCard("Data handling", "Evidence is collected for assessment, reporting, validation, and source-health visibility.")}
        ${plainCard("Encryption", "Use encrypted transport for uploads and encrypted storage for retained evidence and reports.")}
        ${plainCard("Access control", "Limit access by tenant, role, and operational need. Revoke customer access paths during offboarding.")}
        ${plainCard("Tenant isolation", "Keep customer evidence scoped by tenant and separate client surfaces for MSP delivery.")}
        ${plainCard("Logging", "Track connector status, evidence freshness, access activity, and validation runs.")}
        ${plainCard("Retention", "Set retention during the pilot or contract; delete or export evidence during offboarding as agreed.")}
      </div>
    </div>
  </section>`;
}

function connectorPermissionsTable() {
  return `<section class="section dark">
    <div class="section-inner">
      <div class="section-head">
        <div>
          <div class="eyebrow">Connector permissions</div>
          <h2>Read-only by design, with permissions tied to assessment value.</h2>
        </div>
        <p>Final permission names should match the live implementation and customer approval package. This page states the operational intent clearly.</p>
      </div>
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
      <div class="section-head">
        <div>
          <div class="eyebrow">Data handling</div>
          <h2>Make offboarding and limits explicit.</h2>
        </div>
        <p>This is the difference between a trust page and vague reassurance.</p>
      </div>
      <div class="grid three">
        ${plainCard("Retention", "Pilot retention should be defined before access is granted. Long-term retention follows the contract and reporting needs.")}
        ${plainCard("Offboarding", "Revoke connectors, export agreed reports, delete retained evidence according to the agreed timeline, and confirm completion.")}
        ${plainCard("Subprocessors", "List hosting, email, analytics, and operational subprocessors before production procurement. If none are used for a category, say so.")}
      </div>
    </div>
  </section>`;
}

function securityBoundariesSection() {
  return `<section class="section">
    <div class="section-inner">
      <div class="section-head">
        <div>
          <div class="eyebrow">Boundaries</div>
          <h2>What RoadRunner does not do by default.</h2>
        </div>
        <p>Explicit boundaries reduce fear and prevent the product from sounding like an exploit platform.</p>
      </div>
      <div class="grid four">
        ${plainCard("No destructive testing", "The assessment observes configuration and evidence. Destructive testing is not part of default behavior.")}
        ${plainCard("No credential collection", "Collectors do not harvest passwords, hashes, tokens, or secrets.")}
        ${plainCard("No automatic changes", "RoadRunner recommends fixes. Customers or MSPs execute approved changes.")}
        ${plainCard("Disclosure path", `Send security reports to ${brand.email}. Acknowledge valid reports and coordinate remediation directly.`)}
      </div>
    </div>
  </section>`;
}

function complianceRoadmapSection() {
  return `<section class="section alt">
    <div class="section-inner">
      <div class="section-head">
        <div>
          <div class="eyebrow">Review maturity</div>
          <h2>Be clear about what exists now and what belongs in procurement.</h2>
        </div>
        <p>If formal certifications are not yet available, the page should not imply them. It should describe the review path and the evidence package that can be supplied.</p>
      </div>
      <div class="grid three">
        ${plainCard("Current review package", "Connector purposes, read-only posture, retention plan, offboarding plan, subprocessors, and deployment model.")}
        ${plainCard("Disclosure SLA", `Security reports sent to ${brand.email} should receive acknowledgement within one business day and remediation coordination after validation.`)}
        ${plainCard("Compliance roadmap", "Formal control mapping and third-party assurance can be added as enterprise demand requires. Do not claim certifications before they exist.")}
      </div>
    </div>
  </section>`;
}

function demoBody() {
  return `
<section class="section" id="walkthrough">
  <div class="section-inner">
    <div class="section-head">
      <div>
        <div class="eyebrow">Scenario</div>
        <h2>A client has privilege sprawl, Conditional Access gaps, and on-prem lateral movement exposure.</h2>
      </div>
      <p>The walkthrough follows one synthetic weekly run from baseline through findings, remediation queue, validation, and reporting.</p>
    </div>
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
${guidedScreenshot("walkthrough-executive", "1. Executive posture", "/refs/polaris-executive-v2.png", "Polaris-branded executive dashboard", "What to notice: leadership gets risk direction, closure counts, source gaps, and the story of what changed. This is an MSP white-label view powered by RoadRunner.")}
${guidedScreenshot("walkthrough-onprem", "2. On-prem attack path", "/refs/polaris-onprem.png", "Polaris-branded Active Directory attack path screen", "What to notice: the product does not stop at graph visualization. It points to the path edge that should be cut and gives the next collector run a validation job.")}
${guidedScreenshot("walkthrough-microsoft", "3. Evidence-grounded vCISO", "/refs/polaris-vciso-v2.png", "Polaris-branded evidence-grounded vCISO screen", "What to notice: answers are grounded in findings and source evidence. Missing data is stated instead of invented.")}
${sampleFindingCard("demo")}
${contactSection()}`;
}

function guidedScreenshot(id, title, image, alt, caption) {
  return `<section class="section dark" id="${id}">
    <div class="section-inner">
      <div class="section-head">
        <div>
          <div class="eyebrow">Product walkthrough</div>
          <h2>${title}</h2>
        </div>
        <p>${caption}</p>
      </div>
      <div class="product-shot">
        <img src="${image}" alt="${alt}">
        <div class="caption">${caption}</div>
      </div>
    </div>
  </section>`;
}

function contactBody() {
  return `
<section class="section"><div class="section-inner">
  <div class="section-head">
    <div>
      <div class="eyebrow">Two useful conversations</div>
      <h2>Scope a pilot or review the MSP white-label model.</h2>
    </div>
    <p>A good first call should leave with enough detail to define access, source scope, deployment model, and the first four weekly runs.</p>
  </div>
  <div class="grid two">
    ${plainCard("Scope a pilot", "Define tenant size, Microsoft/on-prem coverage, read-only access, timeline, expected deliverables, and the first remediation queue.")}
    ${plainCard("Review MSP model", "Discuss white-label branding, client portal needs, reporting language, tenant rollout, and operating rhythm for service delivery.")}
  </div>
</div></section>
<section class="section alt"><div class="section-inner">
  <div class="section-head">
    <div>
      <div class="eyebrow">What happens next</div>
      <h2>The next step should be concrete.</h2>
    </div>
    <p>Bring approximate users, endpoints, tenants, Microsoft licensing, on-prem AD scope, and any deployment constraints.</p>
  </div>
  <div class="grid four">
    ${card("01", "30-minute fit call", "Confirm use case, buyer role, and whether the pilot should be direct or MSP white-label.")}
    ${card("02", "Scope confirmation", "Define sources, tenant count, on-prem needs, security review requirements, and success criteria.")}
    ${card("03", "Access review", "Approve read-only connectors, collector model, retention, and offboarding behavior.")}
    ${card("04", "Pilot kickoff", "Run baseline assessment and review the first queue of findings.")}
  </div>
</div></section>
${contactSection()}`;
}

function contactSection() {
  return `<section class="section">
    <div class="section-inner">
      ${contactSectionInner()}
    </div>
  </section>`;
}

function contactSectionInner() {
  return `<div class="contact-grid">
    <div>
      <div class="eyebrow">Contact</div>
      <h2>Walk through the product or scope a pilot.</h2>
      <p class="lead">The form opens a structured email draft. The static site does not collect, transmit, or store form data by itself.</p>
      <div class="section-actions">
        <a class="button secondary" href="mailto:${brand.email}">${brand.email}</a>
      </div>
    </div>
    <form class="panel card contact-form" data-contact-form>
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
  </div>`;
}

function sampleFindingCard(context) {
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
      action: "Remove interactive-capable accounts from exclusion, convert to managed identities where possible, or attach documented exception controls.",
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
      <div class="artifact">
        <div class="artifact-header">
          <div class="artifact-title">
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
  return `<section class="section">
    <div class="section-inner">
      <div class="section-head">
        <div>
          <div class="eyebrow">Positioning</div>
          <h2>Dashboards report. Assessments age. RoadRunner closes.</h2>
        </div>
        <p>The distinction matters: a finding is open until evidence changes, not until someone clicks done.</p>
      </div>
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
  return `<div class="card"><span class="number">${num}</span><h3>${title}</h3><p>${text}</p></div>`;
}

function plainCard(title, text) {
  return `<div class="card"><h3>${title}</h3><p>${text}</p></div>`;
}

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

console.log(`Generated clean routes, legacy redirects, and deploy metadata in ${siteDir}`);

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
  <link rel="canonical" href="${brand.root}/${page.slug}">
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
    const loc = page.slug ? `${brand.root}/${page.slug}` : `${brand.root}/`;
    return `  <url><loc>${loc}</loc></url>`;
  }).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}
