// Brand + route metadata. Titles/descriptions/URLs are the SEO contract — preserved
// from the previous build. h1/lead are presentation and may use markup.
export const brand = {
  name: "RoadRunner Secure",
  owner: "RoadRunner Strategies",
  email: "drew@roadrunnersecure.com",
  root: "https://roadrunnersecure.com",
  demoUrl: "https://roadrunnersecure.com/demo/"
};

export const navItems = [
  ["/platform/", "Platform"],
  ["/pricing/", "Pricing"],
  ["/security/", "Security"],
  ["/contact/", "Contact"]
];

// Detailed routes remain available in the footer without crowding the primary navigation.
export const footerItems = [
  ["/platform/", "Platform"],
  ["/on-prem-attack-paths/", "On-Prem"],
  ["/microsoft-security/", "Microsoft"],
  ["/pricing/", "Pricing"],
  ["/security/", "Security"],
  ["/demo/", "Demo"],
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
    eyebrow: "Security assessment platform",
    h1: `Turn security evidence into clear, verified action.`,
    lead: "RoadRunner Secure identifies the identities, devices, policies, and attack paths that need attention, assigns the work, and verifies closure on the next assessment run.",
    primary: ["/demo/", "Live Demo"],
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
    h1: `Turn evidence into verified security work.`,
    lead: "The product is a repeatable assessment machine. Sources are read, findings are generated, work is prioritized, and the next run decides what is actually closed.",
    primary: ["/demo/", "View Live Demo"],
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
    h1: `Find and close Active Directory attack paths.`,
    lead: "RoadRunner turns Active Directory topology into practical path-closure work: which account, group, delegation, or server creates exposure, what to change, and what the next collector run must prove.",
    primary: ["/demo/#walkthrough-onprem", "Open AD demo"],
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
    h1: `Prioritize Microsoft security findings.`,
    lead: "Secure Score is useful context, not the assessment. RoadRunner turns Entra, Defender, Intune, M365, and Azure evidence into specific work your team can assign and validate.",
    primary: ["/demo/#walkthrough-microsoft", "Open Microsoft demo"],
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
    h1: `Start with a focused assessment pilot.`,
    lead: "Start with a focused pilot that produces real findings, a weekly queue, and a final remediation roadmap. Continue only if the output creates useful work.",
    primary: ["/contact/", "Scope a pilot"],
    secondary: ["/demo/", "View Live Demo"]
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
    h1: `Protect sensitive evidence with explicit controls.`,
    lead: "RoadRunner Secure is designed around read-only evidence collection, least-privilege access, tenant separation, visible limitations, and customer-controlled deployment options where required.",
    primary: ["/contact/", "Ask security questions"],
    secondary: ["/pricing/", "Discuss pilot"]
  },
  {
    key: "demo",
    file: "Demo.dc.html",
    slug: "demo",
    active: "Demo",
    og: "demo",
    title: "Live Demo | RoadRunner Secure",
    description: "A synthetic RoadRunner Secure demo showing executive posture, action workbench, source coverage, on-prem collector evidence, AI vCISO, and white-label reporting.",
    eyebrow: "Live product demo",
    h1: `Explore a weekly assessment run.`,
    lead: "A synthetic RoadRunner Secure run using fictional organizations, fictional evidence, and no connected tenant.",
    primary: ["#demo-overview", "Explore the demo"],
    secondary: ["/contact/", "Talk to us"]
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
    h1: `Plan your first assessment run.`,
    lead: "Use this page to request a pilot, review the MSP white-label model, or view the synthetic product demo. The static form opens your email client and stores nothing on the site.",
    primary: [`mailto:drew@roadrunnersecure.com?subject=RoadRunner%20Secure%20pilot%20scope`, "Email directly"],
    secondary: ["/demo/", "View Live Demo"]
  }
];
