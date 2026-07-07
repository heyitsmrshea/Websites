// Brand + route metadata. Titles/descriptions/URLs are the SEO contract — preserved
// from the previous build. h1/lead are presentation and may use markup.
export const brand = {
  name: "RoadRunner Secure",
  owner: "RoadRunner Strategies",
  email: "drew@roadrunnersecure.com",
  root: "https://roadrunnersecure.com",
  demoUrl: "https://demo.polarisconsulting.net"
};

export const navItems = [
  ["/", "Home"],
  ["/platform/", "Platform"],
  ["/on-prem-attack-paths/", "On-Prem"],
  ["/microsoft-security/", "Microsoft"],
  ["/pricing/", "Pricing"],
  ["/security/", "Security"],
  ["/demo/", "Walkthrough"],
  ["/contact/", "Contact"]
];

export const pageMeta = [
  {
    key: "home",
    file: "index.html",
    slug: "",
    active: "Home",
    og: "home",
    title: "RoadRunner Secure | Evidence-verified security assessment",
    description: "RoadRunner Secure turns Microsoft, endpoint, cloud, and on-prem evidence into named findings, weekly remediation work, and evidence-verified closure.",
    eyebrow: "RoadRunner-owned assessment platform",
    h1: `A dashboard is not a <span class="ital">decision.</span>`,
    lead: "RoadRunner Secure converts tenant evidence into a weekly operating loop: what changed, who is affected, what to fix, who owns it, and what the next run must prove before closure.",
    primary: ["/demo/", "Open the walkthrough"],
    secondary: ["/contact/", "Scope a pilot"]
  },
  {
    key: "platform",
    file: "Platform.dc.html",
    slug: "platform",
    active: "Platform",
    og: "platform",
    title: "Platform | RoadRunner Secure evidence workflow",
    description: "How RoadRunner Secure turns read-only evidence into findings, remediation queues, validation runs, and client-ready reporting.",
    eyebrow: "Platform workflow",
    h1: `Evidence in. <span class="ital">Verified closure</span> out.`,
    lead: "The product is a repeatable assessment machine. Sources are read, findings are generated, work is prioritized, and the next run decides what is actually closed.",
    primary: ["/demo/", "See the workflow"],
    secondary: ["/security/", "Review trust model"]
  },
  {
    key: "onprem",
    file: "OnPrem Attack Paths.dc.html",
    slug: "on-prem-attack-paths",
    active: "On-Prem",
    og: "on-prem-attack-paths",
    title: "On-Prem Attack Paths | Active Directory path assessment",
    description: "RoadRunner Secure maps Active Directory attack paths, recommends low-disruption fixes, and verifies path closure on the next run.",
    eyebrow: "On-prem attack paths",
    h1: `Find the path. Cut the edge. <span class="ital">Prove it died.</span>`,
    lead: "RoadRunner turns Active Directory topology into practical path-closure work: which account, group, delegation, or server creates exposure, what to change, and what the next collector run must prove.",
    primary: ["/demo/#walkthrough-onprem", "Open AD walkthrough"],
    secondary: ["/contact/", "Scope on-prem"]
  },
  {
    key: "microsoft",
    file: "Microsoft Security.dc.html",
    slug: "microsoft-security",
    active: "Microsoft",
    og: "microsoft-security",
    title: "Microsoft Security | Entra, Defender, Intune, M365, and Azure assessment",
    description: "RoadRunner Secure converts Microsoft security evidence into prioritized findings, owner-ready remediation, and verified closure.",
    eyebrow: "Microsoft security assessment",
    h1: `Microsoft posture without <span class="ital">score theater.</span>`,
    lead: "Secure Score is useful context, not the assessment. RoadRunner turns Entra, Defender, Intune, M365, and Azure evidence into specific work your team can assign and validate.",
    primary: ["/demo/#walkthrough-microsoft", "Open Microsoft walkthrough"],
    secondary: ["/security/", "Review permissions"]
  },
  {
    key: "pricing",
    file: "Pricing.dc.html",
    slug: "pricing",
    active: "Pricing",
    og: "pricing",
    title: "Pricing | RoadRunner Secure pilot and MSP partner models",
    description: "RoadRunner Secure starts with a scoped pilot, then prices by tenant count, evidence sources, deployment model, and white-label requirements.",
    eyebrow: "Pilot-first pricing",
    h1: `Price the assessment around <span class="ital">proof.</span>`,
    lead: "Start with a focused pilot that produces real findings, a weekly queue, and a final remediation roadmap. Continue only if the output creates useful work.",
    primary: ["/contact/", "Scope a pilot"],
    secondary: ["/demo/", "Review walkthrough"]
  },
  {
    key: "security",
    file: "Security.dc.html",
    slug: "security",
    active: "Security",
    og: "security",
    title: "Security | RoadRunner Secure data handling and connector posture",
    description: "Security posture for RoadRunner Secure: read-only collection, connector permissions, tenant isolation, retention, offboarding, and disclosure process.",
    eyebrow: "Security and trust",
    h1: `Sensitive evidence needs <span class="ital">explicit rules.</span>`,
    lead: "RoadRunner Secure is designed around read-only evidence collection, least-privilege access, tenant separation, visible limitations, and customer-controlled deployment options where required.",
    primary: ["/contact/", "Ask security questions"],
    secondary: ["/pricing/", "Discuss pilot"]
  },
  {
    key: "demo",
    file: "Demo.dc.html",
    slug: "demo",
    active: "Walkthrough",
    og: "demo",
    title: "Product Walkthrough | RoadRunner Secure",
    description: "A guided synthetic RoadRunner Secure walkthrough showing executive posture, action workbench, source coverage, on-prem collector evidence, AI vCISO, and white-label reporting.",
    eyebrow: "Guided product walkthrough",
    h1: `A weekly run, <span class="ital">start to finish.</span>`,
    lead: "A synthetic run using fictional evidence. Polaris branding demonstrates the live MSP white-label demo powered by RoadRunner Secure.",
    primary: ["#walkthrough", "Start walkthrough"],
    secondary: ["https://demo.polarisconsulting.net", "Open live demo"]
  },
  {
    key: "contact",
    file: "Contact.dc.html",
    slug: "contact",
    active: "Contact",
    og: "contact",
    title: "Contact | RoadRunner Secure pilot and white-label assessment",
    description: "Contact RoadRunner Secure to scope a pilot, review the MSP white-label model, or walk through the synthetic assessment demo.",
    eyebrow: "Contact RoadRunner",
    h1: `Scope the <span class="ital">first assessment run.</span>`,
    lead: "Use this page to request a pilot, review the MSP white-label model, or walk through the synthetic product flow. The static form opens your email client and stores nothing on the site.",
    primary: [`mailto:drew@roadrunnersecure.com?subject=RoadRunner%20Secure%20pilot%20scope`, "Email directly"],
    secondary: ["/demo/", "Review walkthrough"]
  }
];
