#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const CONFIG_DIR = path.join(ROOT, "e2e", "configs");

const TEMPLATE_META = {
  "corporate-investment": {
    name: "Northline Capital",
    shortName: "Northline",
    variant: "corporate",
    sector: "Institutional investment",
    heroLine: "Calm capital for complicated operating situations.",
    subline:
      "A composed private investment platform focused on durable middle-market businesses, disciplined underwriting, and practical value creation.",
    location: "Chicago, Illinois",
    palette: {
      bg: "#f3efe6",
      surface: "#fbf8f1",
      panel: "#e7decd",
      text: "#1f221e",
      muted: "#58584e",
      line: "#b6ab98",
      accent: "#5e6852",
      accent2: "#8f7a55"
    },
    fonts: {
      display: "\"Baskerville\", \"Iowan Old Style\", \"Palatino Linotype\", serif",
      body: "\"Avenir Next\", \"Helvetica Neue\", Arial, sans-serif",
      mono: "\"Courier New\", monospace"
    }
  },
  "industrial-services": {
    name: "Vector Field Services",
    shortName: "Vector Field",
    variant: "industrial",
    sector: "Industrial operations",
    heroLine: "Technical service capacity without performance theater.",
    subline:
      "Field response, equipment support, and facility-grade execution for operators who care more about standards than slogans.",
    location: "Tulsa, Oklahoma",
    palette: {
      bg: "#f0ece4",
      surface: "#f8f5ef",
      panel: "#d9d2c4",
      text: "#151718",
      muted: "#52585a",
      line: "#948d80",
      accent: "#b14d24",
      accent2: "#525e67"
    },
    fonts: {
      display: "\"Arial Narrow\", \"Avenir Next Condensed\", sans-serif",
      body: "\"Trebuchet MS\", \"Avenir Next\", sans-serif",
      mono: "\"Courier New\", monospace"
    }
  },
  "luxury-product-launch": {
    name: "Atelier Meridian",
    shortName: "Meridian",
    variant: "luxury",
    sector: "Collector product launch",
    heroLine: "A launch piece designed to hold its shape under scrutiny.",
    subline:
      "A premium physical product template built for limited releases, collector narratives, and high-intent inquiry rather than generic commerce tropes.",
    location: "New York, New York",
    palette: {
      bg: "#121212",
      surface: "#191919",
      panel: "#22201d",
      text: "#ece5d8",
      muted: "#b6ab9c",
      line: "#4f483f",
      accent: "#9d7d55",
      accent2: "#c7b28d"
    },
    fonts: {
      display: "\"Didot\", \"Bodoni 72\", Georgia, serif",
      body: "\"Optima\", \"Segoe UI\", sans-serif",
      mono: "\"Courier New\", monospace"
    }
  },
  "photography-portfolio": {
    name: "Lena Vale Studio",
    shortName: "Lena Vale",
    variant: "photo",
    sector: "Photography portfolio",
    heroLine: "A gallery system designed to let image pacing do the talking.",
    subline:
      "A portfolio template for photographers and image-makers who need rigorous composition, project rhythm, and clean editorial restraint.",
    location: "Los Angeles, California",
    palette: {
      bg: "#f7f4ee",
      surface: "#fffdf9",
      panel: "#ebe6dd",
      text: "#171716",
      muted: "#666159",
      line: "#c8c0b4",
      accent: "#7b6d5a",
      accent2: "#36312d"
    },
    fonts: {
      display: "\"Cormorant Garamond\", Garamond, Georgia, serif",
      body: "\"Helvetica Neue\", Arial, sans-serif",
      mono: "\"Courier New\", monospace"
    }
  },
  consultancy: {
    name: "Merit Advisory",
    shortName: "Merit",
    variant: "consultancy",
    sector: "Independent consultancy",
    heroLine: "A direct operating point of view for companies that need clearer decisions.",
    subline:
      "A consultancy template that prioritizes argument, proof, and a premium reading experience over bloated agency-site patterns.",
    location: "Nashville, Tennessee",
    palette: {
      bg: "#f3efe7",
      surface: "#fcf8f1",
      panel: "#e4dbce",
      text: "#191816",
      muted: "#645d53",
      line: "#b8ae9f",
      accent: "#8a3f34",
      accent2: "#34443e"
    },
    fonts: {
      display: "\"Iowan Old Style\", \"Palatino Linotype\", serif",
      body: "\"Gill Sans\", \"Trebuchet MS\", sans-serif",
      mono: "\"Courier New\", monospace"
    }
  },
  "saas-marketing": {
    name: "SignalStack",
    shortName: "SignalStack",
    variant: "saas",
    sector: "B2B software",
    heroLine: "A product site with real interface gravity.",
    subline:
      "A software marketing template that puts product UI, workflow clarity, and proof structure ahead of the usual startup chrome.",
    location: "Austin, Texas",
    palette: {
      bg: "#f2f5f3",
      surface: "#ffffff",
      panel: "#dde7e1",
      text: "#14201c",
      muted: "#566760",
      line: "#b7cac0",
      accent: "#12734b",
      accent2: "#123d6b"
    },
    fonts: {
      display: "\"Avenir Next\", \"Helvetica Neue\", Arial, sans-serif",
      body: "\"Inter\", \"Helvetica Neue\", Arial, sans-serif",
      mono: "\"Courier New\", monospace"
    }
  },
  "startup-brochure": {
    name: "Foundry Labs",
    shortName: "Foundry",
    variant: "startup",
    sector: "Fast-launch company site",
    heroLine: "A clean launch system for teams that need credibility fast.",
    subline:
      "A compact brochure template with disciplined spacing, clear positioning, and enough personality to avoid the usual interchangeable startup landing page.",
    location: "Denver, Colorado",
    palette: {
      bg: "#f5f7f7",
      surface: "#ffffff",
      panel: "#dce4e8",
      text: "#1a2128",
      muted: "#5a6772",
      line: "#b8c7cf",
      accent: "#2456a6",
      accent2: "#3e6b50"
    },
    fonts: {
      display: "\"Avenir Next\", \"Helvetica Neue\", Arial, sans-serif",
      body: "\"Segoe UI\", Arial, sans-serif",
      mono: "\"Courier New\", monospace"
    }
  },
  "event-launch": {
    name: "Transit Summit",
    shortName: "Transit",
    variant: "event",
    sector: "Event launch",
    heroLine: "Poster energy, schedule clarity, and an RSVP path that feels intentional.",
    subline:
      "A campaign-driven event template built around bold date treatment, lineup rhythm, and a visual system that feels like design rather than conference software.",
    location: "Detroit, Michigan",
    palette: {
      bg: "#f5eadb",
      surface: "#fff7ed",
      panel: "#f0d8be",
      text: "#19120f",
      muted: "#6b4e3c",
      line: "#c59b74",
      accent: "#b22b20",
      accent2: "#2f3b5a"
    },
    fonts: {
      display: "\"Impact\", \"Arial Black\", sans-serif",
      body: "\"Arial Narrow\", \"Helvetica Neue\", Arial, sans-serif",
      mono: "\"Courier New\", monospace"
    }
  },
  "presentation-microsite": {
    name: "Ledger Briefing",
    shortName: "Ledger",
    variant: "presentation",
    sector: "Presentation microsite",
    heroLine: "A slide system that feels authored in-browser.",
    subline:
      "A full-viewport presentation template for briefings, talks, and narrative decks where slide composition matters as much as the copy.",
    location: "Remote presentation mode",
    palette: {
      bg: "#0f1824",
      surface: "#172131",
      panel: "#223148",
      text: "#edf3f7",
      muted: "#9fb0c3",
      line: "#38516f",
      accent: "#d4a94d",
      accent2: "#7aa2d0"
    },
    fonts: {
      display: "\"Avenir Next Condensed\", \"Arial Narrow\", sans-serif",
      body: "\"Avenir Next\", \"Helvetica Neue\", Arial, sans-serif",
      mono: "\"Courier New\", monospace"
    }
  },
  "calculator-explainer": {
    name: "Margin Modeler",
    shortName: "Margin Modeler",
    variant: "calculator",
    sector: "Interactive explainer",
    heroLine: "An interactive recommendation engine with designed hierarchy.",
    subline:
      "A calculator template for pricing, scenario comparison, and recommendation framing that treats information design as a first-class design problem.",
    location: "Browser-based tool",
    palette: {
      bg: "#f3f1ea",
      surface: "#fffdfa",
      panel: "#e3ded1",
      text: "#181613",
      muted: "#5d574f",
      line: "#bab1a2",
      accent: "#2d5b73",
      accent2: "#8e6133"
    },
    fonts: {
      display: "\"Franklin Gothic Medium\", \"Arial Narrow\", sans-serif",
      body: "\"Helvetica Neue\", Arial, sans-serif",
      mono: "\"Courier New\", monospace"
    }
  }
};

const BUILD_ORDER = [
  "corporate-investment",
  "industrial-services",
  "luxury-product-launch",
  "presentation-microsite",
  "calculator-explainer",
  "consultancy",
  "saas-marketing",
  "photography-portfolio",
  "startup-brochure",
  "event-launch"
];

const PAGE_HERO_TITLES = {
  "corporate-investment": {
    home: "Calm capital for complicated operating situations.",
    firm: "An institutional posture without institutional bloat.",
    strategy: "A mandate built around underwriting discipline and operating clarity.",
    transactions: "Selected situations where composure mattered more than spectacle.",
    leadership: "Operators, investors, and advisors with a bias toward substance.",
    contact: "A direct path for serious introductions and company situations.",
    privacy: "Privacy terms written to support a serious operating posture.",
    terms: "Terms structured for clarity rather than ornamental legalese."
  },
  "industrial-services": {
    home: "Technical service capacity without performance theater.",
    services: "Field-ready service lines with clean response logic.",
    capabilities: "Systems, equipment, and technical scope shown without embellishment.",
    ownership: "Leadership and departmental structure with operational accountability.",
    about: "A standards-driven story built around execution rather than attitude.",
    contact: "Request service through a page designed for speed and clarity."
  },
  "luxury-product-launch": {
    home: "A launch piece designed to hold its shape under scrutiny.",
    product: "Every proportion, finish, and surface explained with editorial restraint.",
    story: "A product story built around craft pressure, not generic origin myth.",
    inquiry: "An inquiry flow that feels like allocation, not checkout."
  },
  "photography-portfolio": {
    home: "Selected work arranged to let pacing, silence, and image weight lead.",
    portfolio: "A project index shaped like an exhibition list rather than a thumbnail dump.",
    "project-editorial": "An editorial project page with room for scale, quiet, and sequence.",
    about: "Background, process, and press framed with the same restraint as the work.",
    contact: "An inquiry page that keeps the visual tone intact."
  },
  consultancy: {
    home: "A direct operating point of view for companies that need clearer decisions.",
    services: "Services framed as intervention points, not menu items.",
    work: "Case studies organized around decisions, outcomes, and operating signal.",
    about: "Background, principles, and point of view without agency theater.",
    contact: "A direct contact path for executives who already know the stakes."
  },
  "saas-marketing": {
    home: "A product site with real interface gravity.",
    product: "Feature depth told through interface logic instead of decorative mockups.",
    pricing: "Pricing and comparison designed for comprehension, not conversion gimmicks.",
    company: "A company story with enough structure to support product credibility.",
    demo: "A demo request flow that feels product-native and intentional."
  },
  "startup-brochure": {
    home: "A clean launch system for teams that need credibility fast.",
    about: "A compact about page that makes the company feel deliberate from day one.",
    services: "A services page built to explain scope without turning into filler.",
    contact: "A fast, credible contact page that still feels authored."
  },
  "event-launch": {
    home: "Poster energy, schedule clarity, and an RSVP path that feels intentional.",
    rsvp: "An RSVP page that keeps the campaign language alive."
  },
  "presentation-microsite": {
    deck: "A slide system that feels authored in-browser."
  },
  "calculator-explainer": {
    home: "An interactive recommendation engine with designed hierarchy."
  }
};

const SECTION_COPY = {
  "corporate-investment": {
    snapshot: "The opening data frame should read like a confident investor memorandum: selective metrics, no dashboard clutter, and enough density to imply real operating fluency.",
    thesis: "The investment thesis section needs to prove taste and restraint. It should communicate what the firm looks for, what it avoids, and why that selectivity compounds over time.",
    model: "The operating model must feel practical rather than consultant-heavy. Show how capital, operating work, and reporting cadence fit together without turning the page into process wallpaper.",
    "transactions-preview": "Selected situations should read as editorial proof. Fewer examples, better framing, and crisp context beat an overcrowded tombstone wall.",
    "leadership-preview": "Leadership preview should establish judgment and posture immediately. Titles matter less than whether the page conveys clear operating seniority.",
    positioning: "Firm positioning is where the language must tighten. This section should explain market posture, geography, and deal judgment without sounding inflated.",
    history: "History should feel deliberate and quiet. Present a real progression of operating maturity rather than a startup-style origin story.",
    "operating-principles": "Operating principles should read like internal standards made public: crisp, selective, and concrete enough to imply a real decision-making culture.",
    mandate: "The mandate section should turn strategy into boundaries. What qualifies, what does not, and what kind of partner behavior the firm expects should all be legible.",
    sectors: "Sector coverage is better when it is selective. A narrower set of sectors with conviction will always read stronger than a wide generic spread.",
    "value-creation": "Value creation must be described in operational terms. Replace abstract promises with specific levers, pacing, and reporting behavior.",
    criteria: "Criteria is where discipline becomes visible. This section should make the audience believe the firm knows exactly what it is willing to underwrite.",
    "featured-transactions": "Each transaction should earn its place. Use clean context, a short rationale, and disciplined still frames rather than decorative logos.",
    table: "The table frame should look like a designed working document: readable, aligned, and clearly part of the brand system.",
    approach: "This closing strategy frame should explain how the team behaves once a situation becomes real, not merely how it markets itself.",
    leaders: "Leaders should be framed with consistency, but not sterility. The page needs alignment and still a sense of distinct operating judgment.",
    advisors: "Advisors belong here only if they strengthen the institutional posture. The design should keep them secondary without making them feel decorative.",
    "contact-details": "Contact details should feel private and direct. The page should suggest seriousness of access rather than broad funnel capture.",
    inquiry: "Inquiry should be shaped for real company situations, intermediated introductions, and limited but high-signal outreach.",
    policy: "Even a policy page should hold the system together: tight width, calm typography, and enough structure to feel intentional.",
    terms: "Terms should be readable in still frames. The value is clarity and composure, not ornamental legal presentation."
  },
  "industrial-services": {
    "service-pillars": "Service pillars should feel earned and practical. Each one needs to communicate a real operating function with the tone of a crew that actually shows up.",
    facility: "Facility and systems imagery must communicate technical readiness. The page should feel diagrammatic and operational rather than cinematic for its own sake.",
    process: "Process has to be easy to audit in a screenshot. Show the sequence clearly, from request to field response to documentation and close-out.",
    proof: "Proof should look like an operator built it. Certifications, standards, and customer trust markers should feel solid, not like light marketing garnish.",
    "service-grid": "This grid should read as service architecture, not card clutter. Keep the language specific and the spacing decisive.",
    response: "Response is where tempo matters. Make the section feel urgent without becoming noisy, and show exactly what escalation looks like.",
    coverage: "Coverage should establish range and logistics. It needs to feel like dispatch logic and capacity planning, not a vague map blob.",
    systems: "Systems should be described in concrete terms with strong diagram frames and technical language that stays readable at a glance.",
    equipment: "Equipment framing should emphasize maintained readiness and practical utility, not generic heavy-industry aesthetics.",
    certifications: "Certifications must look like part of the operating system. Avoid treating them like badge wallpaper.",
    owners: "Ownership should communicate leadership and accountability together. This page is not about personality first; it is about operating seriousness.",
    departments: "Department structure needs to show how work really moves across the operation, not just who reports to whom.",
    culture: "Culture here should mean standards under pressure. Keep it grounded and operational.",
    story: "The company story should be anchored in craft and uptime, not in founder mythology.",
    standards: "Standards should feel procedural, measurable, and visual enough to survive screenshot review.",
    request: "The request flow must feel fast and legible for someone who is already in a real service situation.",
    location: "Location should carry practical access information and reinforce the facility footprint without looking like a default contact card."
  },
  "luxury-product-launch": {
    highlights: "Highlights should feel like controlled pressure on the object. Every supporting line should make the product feel more exact, not more advertised.",
    craft: "Craft is where this template proves it is editorial rather than ecommerce. Use the section to slow the pace and increase attention.",
    gallery: "The gallery should feel curated and cinematic. Crops, rhythm, and negative space matter more than the raw count of images.",
    specs: "Specs should look like luxury documentation. Precision matters, but the frame still needs atmosphere.",
    "detail-gallery": "Detail images need to hold interest through composition rather than through UI embellishment.",
    "edition-note": "Edition language should feel selective and serious. Keep it tight, confident, and a little withholding.",
    ownership: "Ownership and inquiry sections should sustain the product aura instead of collapsing into a generic form experience.",
    origin: "Origin should avoid the standard founder narrative. Focus on the logic of the object and the standards that shaped it.",
    materials: "Materials need to feel tactile and specific. The still frame should suggest texture, weight, and finish quality.",
    closing: "The closing section should leave controlled tension in the page rather than wrapping everything up too neatly.",
    availability: "Availability should make the inquiry feel consequential. The template works best when access feels selective."
  },
  "photography-portfolio": {
    "selected-work": "Selected work should feel like sequencing, not merchandising. The arrangement matters as much as the images themselves.",
    "artist-note": "The artist note needs to be short, credible, and quiet. It should deepen the frame, not explain the work to death.",
    clients: "A client or press list should feel incidental and clean, never like a trust badge pile.",
    inquiry: "Inquiry belongs in the same tonal register as the work: light, controlled, and image-aware.",
    "project-list": "The project list should read like a curated index. The spacing should imply editing judgment before any user clicks.",
    captions: "Captions should carry context without crowding the page. The best portfolio pages feel generous with space and selective with language.",
    bio: "The bio should be human and precise. Keep the visual weight on the work, with the biography acting as context rather than centerpiece.",
    press: "Press or recognition should be handled with enough restraint that it adds authority without becoming its own performance."
  },
  consultancy: {
    offer: "The offer should be framed as a narrow, high-conviction intervention. This page gets stronger the more specific it becomes.",
    proof: "Proof should feel like evidence from actual operating work. Charts and statements should reinforce clarity, not mimic startup dashboards.",
    "engagement-model": "Engagement model should make scope, cadence, and access feel concrete. The best version reads like a working agreement.",
    bio: "Bio needs enough detail to establish credibility and enough restraint to avoid feeling promotional.",
    services: "Services should be grouped by decision type, not inflated into agency-style packages.",
    approach: "Approach belongs in sentence-level clarity. Keep the argument sequential and hard to misread.",
    faq: "FAQ should answer the practical questions executives actually ask before they commit to a focused engagement.",
    "case-studies": "Case studies should foreground the decision, the operating tension, and the result rather than defaulting to vague before-and-after language.",
    outcomes: "Outcomes should be specific enough to feel earned and sparse enough to keep the page premium.",
    principles: "Principles are only useful if they feel like constraints the consultant actually uses."
  },
  "saas-marketing": {
    "feature-architecture": "Feature architecture should read like product thinking. Use the section to show how the system is organized, not just what it claims.",
    proof: "Proof needs to be product-adjacent: usage lift, time saved, lower handoff friction, and better operating visibility.",
    workflow: "Workflow framing should connect interface scenes to real sequences of work instead of floating isolated UI cards in empty space.",
    "pricing-preview": "Pricing preview should orient the buyer without turning the home page into a sales sheet.",
    "demo-cta": "The demo CTA should feel like the product continues through the form, not like the site hands off to a generic lead funnel.",
    "feature-deep-dive": "Deep-dive content should show how the interface behaves and why that behavior matters. Feature names alone are not enough.",
    integrations: "Integrations should be organized like part of the product system rather than as logo wallpaper.",
    security: "Security needs to read as product rigor and governance clarity, not as fear-based copy.",
    "ui-gallery": "The UI gallery should help the reader build a mental model of the product without becoming repetitive.",
    plans: "Plans should be easy to parse in still frames. The layout has to survive mobile without turning into mush.",
    comparison: "Comparison is only useful if the hierarchy is sharp enough for a fast screenshot read.",
    story: "Company story should support product trust. Keep it compact and operational.",
    team: "Team framing should suggest product maturity rather than startup personality theater.",
    principles: "Principles should match the interface language: clear, narrow, and disciplined.",
    request: "The request flow should tell the user what kind of demo experience they are entering.",
    expectations: "Expectations should set tone and reduce ambiguity about pace, scope, and next steps."
  },
  "startup-brochure": {
    "what-we-do": "This section should get to the point quickly and still feel designed. The right version reads like a capable company landing in public for the first time.",
    "why-us": "Why us must establish confidence without exaggeration. Keep the language compact and the composition sharp.",
    process: "Process should make the team feel real and organized even when the business is early.",
    story: "The story section should create belief with very little copy. It is a launch page, not a memoir.",
    team: "Team framing needs enough structure to feel credible without pretending the company is larger than it is.",
    services: "Services should be framed as clean categories with light explanation and no placeholder bloat.",
    approach: "Approach should tell the user how work actually gets done after the first conversation.",
    contact: "Contact should be direct, short, and still visibly part of the design system."
  },
  "event-launch": {
    "date-location": "Date and location should feel like headline information, not metadata. This section should read like poster design with utility.",
    lineup: "Lineup needs hierarchy and rhythm. Every speaker or element should feel chosen, not dropped into a neutral grid.",
    agenda: "Agenda should make the event legible immediately in still frames. The sequence needs visual snap.",
    "rsvp-cta": "The RSVP call should feel urgent and designed rather than like a default registration block.",
    footer: "The footer should preserve the campaign tone all the way to the bottom of the page.",
    form: "The RSVP form needs to remain inside the visual language of the event rather than collapsing into generic inputs.",
    details: "Details should answer practical questions without flattening the page into plain admin copy."
  },
  "presentation-microsite": {
    "slide-01": "The opening slide should feel title-card strong: decisive composition, memorable type, and no wasted elements.",
    "slide-02": "Slide two should establish structure and stakes quickly enough that the audience feels the deck has direction.",
    "slide-03": "This evidence slide should show how dense material can stay readable without losing designed tension.",
    "slide-04": "The fourth slide should shift rhythm and keep the deck from becoming monotonous.",
    "slide-05": "This section should rebalance detail and silence. The best deck pages know when to reduce content.",
    "slide-06": "Slide six should feel like a hinge point in the narrative rather than more of the same.",
    "slide-07": "This late slide should reinforce the core argument with a still frame strong enough to stand alone.",
    "slide-08": "The closing slide should feel resolved but not dead. Leave the audience with a shape, not just a CTA."
  },
  "calculator-explainer": {
    calculator: "The calculator frame should look designed and usable at first glance. Inputs, labels, and grouping need to be unmistakable.",
    assumptions: "Assumptions should be explicit enough that the model feels trustworthy rather than magical.",
    outputs: "Outputs need hierarchy, contrast, and enough spacing to survive mobile and still feel credible.",
    recommendation: "Recommendation is where the tool proves it is more than a widget. The interpretation has to feel authored.",
    "next-step": "The closing section should make it obvious what someone does with the result after reading it."
  }
};

const HERO_SUPPLEMENTS = {
  "corporate-investment": {
    home: "Designed for firms that need an institutional exterior with an authored editorial core.",
    firm: "A firm page should make posture visible before a single transaction is discussed.",
    strategy: "Strategy belongs in boundaries, not slogans.",
    transactions: "Still frames must carry credibility even before someone reads the detail.",
    leadership: "The page works when the portraits align and the judgment still feels individual.",
    contact: "High-signal contact flow, low visual noise."
  },
  "industrial-services": {
    home: "This template is built for operators who want standards to show up in the first screen.",
    services: "Service architecture should feel dispatch-ready and practical.",
    capabilities: "Technical pages fail when the diagrams are decorative. This one must stay readable.",
    ownership: "Leadership pages should show accountability, not posture alone.",
    about: "The story only works when it feels grounded in execution.",
    contact: "Fast request path with enough detail to be useful."
  },
  "luxury-product-launch": {
    home: "The object should dominate the frame without turning the page into a store.",
    product: "Every specification should strengthen the aura rather than break it.",
    story: "Narrative pressure belongs on materials, process, and release logic.",
    inquiry: "Inquiry should feel like admission to a selective release."
  },
  "photography-portfolio": {
    home: "Image rhythm is the primary interface here.",
    portfolio: "The index must feel edited before anyone clicks into a project.",
    "project-editorial": "Project pages need room, silence, and a strong caption system.",
    about: "The biography should support the work and then step back.",
    contact: "The inquiry path should not break the tone of the portfolio."
  },
  consultancy: {
    home: "The best consultancy pages read like a point of view with proof behind it.",
    services: "Keep the offer narrow, serious, and easy to understand.",
    work: "Work pages should prioritize decisions and outcomes over decorative case study framing.",
    about: "The about page exists to establish judgment, not personality theater.",
    contact: "Direct, credible, and intentionally spare."
  },
  "saas-marketing": {
    home: "Interface scenes should do more of the selling than decorative gradients ever could.",
    product: "Feature depth must stay tied to workflow clarity.",
    pricing: "Comparison must survive screenshot review without collapsing into clutter.",
    company: "Company tone should support product trust, not distract from it.",
    demo: "The request path should feel inside the product system."
  },
  "startup-brochure": {
    home: "A launch brochure still needs a spine.",
    about: "Believability beats grandiosity.",
    services: "Clear categories, clean spacing, no filler.",
    contact: "Short, direct, and still designed."
  },
  "event-launch": {
    home: "The page should feel like a campaign poster translated into browser space.",
    rsvp: "Registration should not drain the energy out of the visual system."
  },
  "presentation-microsite": {
    deck: "Every slide must survive both keyboard navigation and still-frame review."
  },
  "calculator-explainer": {
    home: "The recommendation engine is only convincing if the structure is immediately legible."
  }
};

const DEPLOY_WORKFLOW = `name: Deploy static site to GitHub Pages

on:
  push:
    branches:
      - main
      - master
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest

    steps:
      - name: Check out repository
        uses: actions/checkout@v4

      - name: Set up GitHub Pages
        uses: actions/configure-pages@v5

      - name: Upload static site artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: .

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
`;

function titleCase(value) {
  return value
    .split(/[-_]/g)
    .filter(Boolean)
    .map((token) => token.charAt(0).toUpperCase() + token.slice(1))
    .join(" ");
}

function pageLabel(pagePath) {
  if (pagePath === "index.html") {
    return "Home";
  }
  return titleCase(pagePath.replace(/\.html$/, ""));
}

function sectionLabel(section) {
  const custom = {
    "contact-cta": "Contact",
    "date-location": "Date and Location",
    "feature-architecture": "Feature Architecture",
    "transactions-preview": "Selected Transactions",
    "leadership-preview": "Leadership",
    "featured-transactions": "Featured Transactions",
    "service-pillars": "Service Pillars",
    "pricing-preview": "Pricing Preview",
    "ui-gallery": "Interface Gallery",
    "engagement-model": "Engagement Model",
    "what-we-do": "What We Do",
    "why-us": "Why Us",
    "selected-work": "Selected Work",
    "artist-note": "Artist Note",
    "case-studies": "Case Studies",
    "project-list": "Project Listing",
    "gallery-a": "Gallery A",
    "gallery-b": "Gallery B",
    "next-step": "Next Step"
  };
  return custom[section] || titleCase(section);
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function readConfig(slug) {
  const raw = await fs.readFile(path.join(CONFIG_DIR, `${slug}.json`), "utf8");
  return JSON.parse(raw);
}

async function writeFile(filePath, content) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, content);
}

function pickSectionForRole(role, sections) {
  const checks = [
    ["hero", /^hero|^slide-|hero-|^hero$/],
    ["gallery", /gallery|detail|thumb/],
    ["transactions-preview", /transaction/],
    ["featured-transactions", /transaction/],
    ["table", /table/],
    ["comparison", /comparison|table/],
    ["plans", /comparison|table/],
    ["outputs", /chart|output|comparison/],
    ["calculator", /calculator/],
    ["proof", /proof|graphic/],
    ["workflow", /workflow|ui/],
    ["feature-architecture", /ui|graphic/],
    ["ui-gallery", /ui|gallery/],
    ["security", /security/],
    ["facility", /facility|map|diagram/],
    ["systems", /systems|diagram/],
    ["equipment", /equipment/],
    ["leaders", /leader/],
    ["advisors", /leader/],
    ["owners", /owner|portrait/],
    ["team", /portrait|team/],
    ["bio", /portrait/],
    ["contact", /portrait|office/],
    ["contact-details", /office/],
    ["request", /map|location/],
    ["location", /map|location/],
    ["lineup", /speaker/],
    ["date-location", /venue/],
    ["slide-01", /^slide-01/],
    ["slide-02", /^slide-02/],
    ["slide-03", /^slide-03/],
    ["slide-04", /^slide-04/],
    ["slide-05", /^slide-05/],
    ["slide-06", /^slide-06/],
    ["slide-07", /^slide-07/],
    ["slide-08", /^slide-08/]
  ];

  for (const [sectionName, pattern] of checks) {
    if (sections.includes(sectionName) && pattern.test(role)) {
      return sectionName;
    }
  }

  return sections[Math.min(sections.length - 1, 1)] || sections[0];
}

function mapRolesToSections(pageConfig) {
  const mapped = new Map(pageConfig.requiredSections.map((section) => [section, []]));
  for (const role of pageConfig.requiredReviewImages) {
    const target = pickSectionForRole(role, pageConfig.requiredSections);
    mapped.get(target).push(role);
  }
  return mapped;
}

function assetFile(pageSlug, role) {
  return `${pageSlug}-${role}.svg`;
}

function hashString(value) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return hash;
}

function roleKind(role) {
  if (/portrait|leader|owner|team|speaker/.test(role)) return "portrait";
  if (/ui|workflow|feature|security/.test(role)) return "ui";
  if (/chart|output|graph/.test(role)) return "chart";
  if (/table|comparison/.test(role)) return "table";
  if (/map|facility|systems|diagram/.test(role)) return "diagram";
  if (/gallery|detail|product|materials|craft|hero|image|frame|thumb|venue/.test(role)) return "photo";
  return "graphic";
}

function svgText(label) {
  return label.toUpperCase();
}

function svgFor(meta, pageSlug, role) {
  const palette = meta.palette;
  const kind = roleKind(role);
  const seed = hashString(`${meta.variant}:${pageSlug}:${role}`);
  const baseLabel = svgText(sectionLabel(role));
  const subtitle = svgText(pageSlug.replace(/-/g, " "));
  const x1 = 120 + (seed % 180);
  const y1 = 140 + (seed % 90);
  const x2 = 870 + (seed % 220);
  const y2 = 300 + (seed % 160);
  const featureFrame = `<rect x="56" y="56" width="1488" height="888" rx="14" fill="${palette.surface}" stroke="${palette.line}" stroke-width="8"/>`;
  const caption = `
    <rect x="86" y="84" width="360" height="68" fill="${palette.bg}" opacity="0.88"/>
    <text x="104" y="127" fill="${palette.text}" font-size="24" font-family="Arial, sans-serif" letter-spacing="4">${baseLabel}</text>
    <text x="104" y="914" fill="${palette.muted}" font-size="21" font-family="Arial, sans-serif" letter-spacing="6">${subtitle}</text>
  `;

  const variantWash = {
    corporate: `<rect x="92" y="92" width="1416" height="824" fill="${palette.bg}" opacity="0.72"/><rect x="96" y="96" width="420" height="760" fill="${palette.panel}" opacity="0.92"/>`,
    industrial: `<rect x="86" y="86" width="1428" height="164" fill="${palette.accent}" opacity="0.12"/><rect x="86" y="292" width="1428" height="586" fill="${palette.surface}" opacity="0.94"/>`,
    luxury: `<rect x="86" y="86" width="1428" height="828" fill="${palette.bg}" opacity="0.96"/><circle cx="1180" cy="520" r="250" fill="${palette.accent}" opacity="0.22"/>`,
    photo: `<rect x="86" y="86" width="1428" height="828" fill="${palette.surface}" opacity="0.98"/><rect x="118" y="118" width="420" height="764" fill="${palette.panel}" opacity="0.55"/>`,
    consultancy: `<rect x="86" y="86" width="1428" height="828" fill="${palette.surface}" opacity="0.98"/><rect x="780" y="110" width="640" height="90" fill="${palette.panel}" opacity="0.65"/>`,
    saas: `<rect x="86" y="86" width="1428" height="828" rx="18" fill="${palette.surface}" opacity="0.98"/><rect x="86" y="86" width="1428" height="68" rx="18" fill="${palette.panel}"/>`,
    startup: `<rect x="86" y="86" width="1428" height="828" fill="${palette.surface}" opacity="0.98"/><rect x="86" y="690" width="1428" height="140" fill="${palette.panel}" opacity="0.42"/>`,
    event: `<rect x="86" y="86" width="1428" height="828" fill="${palette.surface}" opacity="0.98"/><rect x="112" y="112" width="1376" height="140" fill="${palette.accent}" opacity="0.16"/>`,
    presentation: `<rect x="86" y="86" width="1428" height="828" fill="${palette.panel}" opacity="0.95"/><rect x="86" y="86" width="1428" height="84" fill="${palette.bg}" opacity="0.58"/>`,
    calculator: `<rect x="86" y="86" width="1428" height="828" fill="${palette.surface}" opacity="0.98"/><rect x="86" y="86" width="520" height="828" fill="${palette.bg}" opacity="0.78"/>`
  };

  const photoBody = `
    <rect x="${x1}" y="${y1}" width="720" height="560" fill="${palette.panel}" stroke="${palette.line}" stroke-width="4"/>
    <rect x="${x2}" y="${y2}" width="360" height="420" fill="${palette.bg}" stroke="${palette.line}" stroke-width="4"/>
    <rect x="${x1 + 60}" y="${y1 + 60}" width="600" height="440" fill="${palette.accent}" opacity="0.18"/>
    <rect x="${x2 + 40}" y="${y2 + 40}" width="280" height="320" fill="${palette.accent2}" opacity="0.18"/>
  `;
  const portraitBody = `
    <rect x="188" y="130" width="520" height="700" fill="${palette.panel}" stroke="${palette.line}" stroke-width="4"/>
    <ellipse cx="448" cy="366" rx="138" ry="168" fill="${palette.accent}" opacity="0.32"/>
    <rect x="812" y="180" width="520" height="520" fill="${palette.bg}" stroke="${palette.line}" stroke-width="4"/>
    <rect x="874" y="246" width="396" height="120" fill="${palette.panel}" opacity="0.65"/>
    <rect x="874" y="410" width="396" height="28" fill="${palette.panel}" opacity="0.85"/>
    <rect x="874" y="462" width="334" height="18" fill="${palette.panel}" opacity="0.55"/>
    <rect x="874" y="506" width="366" height="18" fill="${palette.panel}" opacity="0.55"/>
  `;
  const uiBody = `
    <rect x="142" y="170" width="1316" height="650" rx="24" fill="${palette.surface}" stroke="${palette.line}" stroke-width="6"/>
    <rect x="142" y="170" width="1316" height="72" rx="24" fill="${palette.panel}"/>
    <rect x="214" y="310" width="260" height="424" fill="${palette.bg}" stroke="${palette.line}" stroke-width="4"/>
    <rect x="526" y="310" width="408" height="190" fill="${palette.panel}" stroke="${palette.line}" stroke-width="4"/>
    <rect x="982" y="310" width="388" height="190" fill="${palette.bg}" stroke="${palette.line}" stroke-width="4"/>
    <rect x="526" y="548" width="844" height="186" fill="${palette.surface}" stroke="${palette.line}" stroke-width="4"/>
    <path d="M590 676 L704 590 L786 614 L894 516 L1000 552 L1142 442 L1280 490" fill="none" stroke="${palette.accent}" stroke-width="14"/>
  `;
  const chartBody = `
    <rect x="148" y="186" width="540" height="612" fill="${palette.bg}" stroke="${palette.line}" stroke-width="4"/>
    <rect x="768" y="186" width="624" height="612" fill="${palette.surface}" stroke="${palette.line}" stroke-width="4"/>
    <line x1="846" y1="706" x2="1320" y2="706" stroke="${palette.line}" stroke-width="4"/>
    <line x1="846" y1="626" x2="1320" y2="626" stroke="${palette.line}" stroke-width="3"/>
    <line x1="846" y1="546" x2="1320" y2="546" stroke="${palette.line}" stroke-width="3"/>
    <path d="M860 676 L944 618 L1012 632 L1108 534 L1206 558 L1290 426" fill="none" stroke="${palette.accent}" stroke-width="14"/>
    <rect x="220" y="300" width="392" height="38" fill="${palette.panel}" opacity="0.85"/>
    <rect x="220" y="368" width="340" height="22" fill="${palette.panel}" opacity="0.6"/>
    <rect x="220" y="420" width="370" height="22" fill="${palette.panel}" opacity="0.6"/>
  `;
  const tableBody = `
    <rect x="124" y="168" width="1350" height="660" fill="${palette.surface}" stroke="${palette.line}" stroke-width="6"/>
    <rect x="124" y="168" width="1350" height="86" fill="${palette.panel}" opacity="0.8"/>
    ${Array.from({ length: 5 })
      .map((_, i) => `<line x1="124" y1="${330 + i * 90}" x2="1474" y2="${330 + i * 90}" stroke="${palette.line}" stroke-width="3"/>`)
      .join("")}
    ${Array.from({ length: 4 })
      .map((_, i) => `<line x1="${430 + i * 260}" y1="168" x2="${430 + i * 260}" y2="828" stroke="${palette.line}" stroke-width="3"/>`)
      .join("")}
    <rect x="178" y="286" width="172" height="24" fill="${palette.accent}" opacity="0.28"/>
    <rect x="468" y="376" width="172" height="24" fill="${palette.accent2}" opacity="0.22"/>
    <rect x="992" y="556" width="190" height="24" fill="${palette.accent}" opacity="0.22"/>
  `;
  const diagramBody = `
    <rect x="146" y="168" width="404" height="244" fill="${palette.bg}" stroke="${palette.line}" stroke-width="4"/>
    <rect x="638" y="168" width="326" height="244" fill="${palette.panel}" stroke="${palette.line}" stroke-width="4"/>
    <rect x="1042" y="168" width="388" height="244" fill="${palette.bg}" stroke="${palette.line}" stroke-width="4"/>
    <rect x="276" y="580" width="292" height="188" fill="${palette.panel}" stroke="${palette.line}" stroke-width="4"/>
    <rect x="810" y="522" width="420" height="256" fill="${palette.surface}" stroke="${palette.line}" stroke-width="4"/>
    <path d="M350 412 L350 560 L548 560" fill="none" stroke="${palette.accent}" stroke-width="14"/>
    <path d="M802 290 L964 290 L964 520" fill="none" stroke="${palette.accent2}" stroke-width="14"/>
    <path d="M1160 412 L1160 510 L1018 510" fill="none" stroke="${palette.accent}" stroke-width="14"/>
  `;
  const graphicBody = `
    <rect x="138" y="154" width="1324" height="692" fill="${palette.surface}" stroke="${palette.line}" stroke-width="6"/>
    <rect x="214" y="230" width="440" height="500" fill="${palette.panel}" stroke="${palette.line}" stroke-width="4"/>
    <rect x="718" y="230" width="668" height="190" fill="${palette.bg}" stroke="${palette.line}" stroke-width="4"/>
    <rect x="718" y="470" width="668" height="260" fill="${palette.panel}" stroke="${palette.line}" stroke-width="4"/>
  `;

  const bodyByKind = {
    photo: photoBody,
    portrait: portraitBody,
    ui: uiBody,
    chart: chartBody,
    table: tableBody,
    diagram: diagramBody,
    graphic: graphicBody
  };

  const overlays = {
    corporate: `<line x1="990" y1="748" x2="1326" y2="492" stroke="${palette.accent}" stroke-width="12"/><circle cx="1098" cy="664" r="14" fill="${palette.accent2}"/><circle cx="1210" cy="580" r="14" fill="${palette.accent2}"/>`,
    industrial: `<line x1="142" y1="866" x2="1458" y2="866" stroke="${palette.accent}" stroke-width="10"/>`,
    luxury: `<rect x="1006" y="540" width="236" height="164" fill="${palette.bg}" opacity="0.82" stroke="${palette.accent2}" stroke-width="4"/>`,
    photo: `<rect x="1220" y="760" width="180" height="72" fill="${palette.bg}" opacity="0.76"/>`,
    consultancy: `<rect x="860" y="724" width="440" height="18" fill="${palette.accent}" opacity="0.22"/>`,
    saas: `<circle cx="236" cy="206" r="8" fill="${palette.accent}"/><circle cx="266" cy="206" r="8" fill="${palette.accent2}"/>`,
    startup: `<rect x="126" y="126" width="168" height="24" fill="${palette.accent}" opacity="0.22"/>`,
    event: `<text x="132" y="236" fill="${palette.accent}" font-size="120" font-family="Arial, sans-serif" font-weight="700">27</text>`,
    presentation: `<rect x="182" y="770" width="320" height="20" fill="${palette.accent}" opacity="0.22"/>`,
    calculator: `<rect x="202" y="748" width="294" height="20" fill="${palette.accent2}" opacity="0.22"/>`
  };

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1600" height="1000" viewBox="0 0 1600 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1600" height="1000" fill="${palette.bg}"/>
  ${featureFrame}
  ${variantWash[meta.variant]}
  ${bodyByKind[kind]}
  ${overlays[meta.variant]}
  ${caption}
</svg>
`;
}

function renderFigure(pageSlug, role) {
  const alt = sectionLabel(role);
  const kind = roleKind(role);
  return `
    <figure class="review-visual review-visual--${kind}">
      <img src="./assets/${assetFile(pageSlug, role)}" alt="${alt}" data-review-image="${role}" />
      <figcaption>${alt}</figcaption>
    </figure>
  `;
}

function splitText(meta, section, pageName) {
  const sectionName = sectionLabel(section);
  const phrases = {
    corporate:
      `${meta.shortName} uses ${sectionName.toLowerCase()} to establish credibility through structure, pacing, and real information density rather than decorative startup shortcuts.`,
    industrial:
      `${meta.shortName} frames ${sectionName.toLowerCase()} as proof of operating readiness, with clear standards, measured copy, and no cosplay ruggedness.`,
    luxury:
      `${meta.shortName} treats ${sectionName.toLowerCase()} like an editorial spread, using restraint, contrast, and collector-grade framing to keep pressure on the object.`,
    photo:
      `${meta.shortName} uses ${sectionName.toLowerCase()} to control image rhythm, quiet transitions, and caption discipline so the work reads as curated rather than dumped into a grid.`,
    consultancy:
      `${meta.shortName} shapes ${sectionName.toLowerCase()} as argument, evidence, and clarity of offer, keeping the reading experience spare, premium, and direct.`,
    saas:
      `${meta.shortName} turns ${sectionName.toLowerCase()} into product storytelling with interface gravity, operational proof, and a cleaner structure than most SaaS boilerplate.`,
    startup:
      `${meta.shortName} uses ${sectionName.toLowerCase()} to establish immediate credibility with clean pacing, strong hierarchy, and just enough personality to avoid sameness.`,
    event:
      `${meta.shortName} pushes ${sectionName.toLowerCase()} like campaign design translated into browser space, using contrast, poster logic, and urgency instead of conference software patterns.`,
    presentation:
      `${meta.shortName} composes ${sectionName.toLowerCase()} as a designed narrative slide, balancing argument, evidence, and still-frame legibility.`,
    calculator:
      `${meta.shortName} treats ${sectionName.toLowerCase()} as an information design problem, keeping the model understandable, the outputs legible, and the recommendation credible.`
  };
  return `${phrases[meta.variant]} This ${pageName.toLowerCase()} page stays consistent with the template system while giving this section its own visual weight.`;
}

function pageHeroTitle(meta, config, pageConfig) {
  const pageMap = PAGE_HERO_TITLES[config.slug] || {};
  return pageMap[pageConfig.slug] || meta.heroLine;
}

function sectionCopy(meta, config, pageConfig, section, pageName) {
  const variantCopy = SECTION_COPY[config.slug] || {};
  return variantCopy[section] || splitText(meta, section, pageName);
}

function heroSupplement(meta, config, pageConfig) {
  const map = HERO_SUPPLEMENTS[config.slug] || {};
  return map[pageConfig.slug] || "";
}

function renderSupportRail(meta, section) {
  const copy = {
    corporate: ["Selective mandate", "Operator context", "Calm reporting"],
    industrial: ["Response logic", "Technical standards", "Field accountability"],
    luxury: ["Limited volume", "Tactile finish", "Controlled release"],
    photo: ["Project rhythm", "Quiet captions", "Curated sequencing"],
    consultancy: ["Narrow offer", "Clear proof", "Short engagement"],
    saas: ["Workflow clarity", "Product evidence", "Measured outcomes"],
    startup: ["Fast launch", "Clean structure", "Low friction"],
    event: ["Poster logic", "Schedule snap", "RSVP urgency"],
    presentation: ["Narrative pace", "Evidence rhythm", "Slide contrast"],
    calculator: ["Input clarity", "Readable outputs", "Credible interpretation"]
  };
  const items = copy[meta.variant] || copy.startup;
  return `
    <div class="support-rail support-rail--${slugify(section)}">
      ${items.map((item) => `<div class="support-rail__item">${item}</div>`).join("")}
    </div>
  `;
}

function renderMetrics(meta) {
  const sets = {
    corporate: [
      ["Focus", "North American middle market"],
      ["Hold posture", "3 to 7 year horizon"],
      ["Approach", "Operator-led value creation"]
    ],
    industrial: [
      ["Response", "24 hour field escalation"],
      ["Coverage", "Rotating regional teams"],
      ["Standard", "Facility-first quality control"]
    ],
    luxury: [
      ["Edition", "Low-volume release"],
      ["Finish", "Collector-grade detailing"],
      ["Acquisition", "Inquiry-led allocation"]
    ],
    photo: [
      ["Practice", "Editorial and portraiture"],
      ["Format", "Project-led releases"],
      ["Availability", "Selective commissions"]
    ],
    consultancy: [
      ["Work mode", "Hands-on strategic operator"],
      ["Focus", "Decision clarity and operating rhythm"],
      ["Engagement", "Short, high-conviction sprints"]
    ],
    saas: [
      ["Activation", "Fast team rollout"],
      ["Time saved", "4.6 hours per workflow"],
      ["Retention", "Higher usage through clarity"]
    ],
    startup: [
      ["Launch pace", "Ship inside two weeks"],
      ["Structure", "Compact but complete"],
      ["Outcome", "Credibility without bloat"]
    ],
    event: [
      ["Format", "One-night live program"],
      ["Audience", "Operators, makers, founders"],
      ["Entry", "RSVP confirmation required"]
    ],
    presentation: [
      ["Mode", "Keyboard and scroll-ready"],
      ["Format", "Full viewport sections"],
      ["Use", "Talks, briefings, narrative decks"]
    ],
    calculator: [
      ["Method", "Transparent assumptions"],
      ["Output", "Structured recommendation"],
      ["Mode", "Interactive scenario testing"]
    ]
  };

  return `
    <div class="data-grid">
      ${sets[meta.variant]
        .map(
          ([label, value]) => `
            <article class="metric">
              <div class="metric__label">${label}</div>
              <div class="metric__value">${value}</div>
            </article>
          `
        )
        .join("")}
    </div>
  `;
}

function renderList(section) {
  const items = {
    process: ["Scope the current state", "Design the operating model", "Validate visually in browser", "Ship without drift"],
    workflow: ["Capture work in one lane", "Route with exact ownership", "Approve on signal rather than noise", "Close with an auditable trail"],
    faq: ["How quickly can this launch?", "What content should be customized first?", "How do review screenshots get captured?"],
    agenda: ["18:00 Doors", "18:45 Opening keynote", "19:30 Panel and demonstration", "20:30 RSVP-only after session"],
    lineup: ["Founders and operators", "Design leads with a point of view", "Builders shipping inside constraints"],
    values: ["Restraint", "Precision", "Readability", "Signal over noise"],
    principles: ["Fewer promises, better systems", "Clear decisions beat charismatic confusion", "Proof should survive still frames"],
    services: ["Strategic audits", "Launch systems", "Narrative architecture", "Operating rhythm design"]
  };
  const fallback = ["Clear position", "Structured proof", "Strong pacing", "Deliberate close"];
  const lines = items[section] || fallback;
  return `
    <ol class="steps">
      ${lines.map((item) => `<li>${item}</li>`).join("")}
    </ol>
  `;
}

function renderTable(meta, section) {
  const heading = sectionLabel(section);
  return `
    <div class="table-shell">
      <div class="table-shell__title">${heading}</div>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Signal</th>
            <th>Implication</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Primary frame</td>
            <td>Clear hierarchy</td>
            <td>Faster comprehension</td>
          </tr>
          <tr>
            <td>Section density</td>
            <td>Measured text load</td>
            <td>More trust, less filler</td>
          </tr>
          <tr>
            <td>Visual rhythm</td>
            <td>Deliberate cadence</td>
            <td>Memorable still frames</td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

function renderPeopleGrid() {
  const people = [
    ["Avery Lane", "Managing Partner"],
    ["Jordan Pike", "Operating Principal"],
    ["Mina Sol", "Portfolio Strategy"]
  ];
  return `
    <div class="people-grid">
      ${people
        .map(
          ([name, role]) => `
            <article class="person-card">
              <h3>${name}</h3>
              <p>${role}</p>
            </article>
          `
        )
        .join("")}
    </div>
  `;
}

function renderPricing() {
  const plans = [
    ["Launch", "$49", "Fast setup for a small team"],
    ["Scale", "$149", "Expanded workflow depth"],
    ["Control", "Custom", "Advanced governance and support"]
  ];
  return `
    <div class="pricing-grid">
      ${plans
        .map(
          ([name, price, note]) => `
            <article class="price-card">
              <div class="price-card__label">${name}</div>
              <div class="price-card__value">${price}</div>
              <p>${note}</p>
            </article>
          `
        )
        .join("")}
    </div>
  `;
}

function renderForm(section) {
  return `
    <form class="form-grid" data-form="${section}">
      <label><span>Name</span><input type="text" placeholder="Your name" /></label>
      <label><span>Email</span><input type="email" placeholder="name@company.com" /></label>
      <label class="form-grid__wide"><span>Project context</span><textarea rows="5" placeholder="What are you launching, replacing, or clarifying?"></textarea></label>
      <button type="button">Send Inquiry</button>
    </form>
  `;
}

function renderCalculatorSection(section, mappedRoles, pageSlug) {
  if (section === "calculator") {
    return `
      <form class="calculator-grid" id="scenario-form">
        <label><span>Monthly volume</span><input id="volume" type="number" value="180" min="10" step="10" /></label>
        <label><span>Average order value</span><input id="aov" type="number" value="420" min="10" step="10" /></label>
        <label><span>Margin uplift %</span><input id="uplift" type="number" value="14" min="1" step="1" /></label>
        <label><span>Monthly software cost</span><input id="cost" type="number" value="2800" min="100" step="50" /></label>
      </form>
      ${mappedRoles.length ? `<div class="utility-visuals">${mappedRoles.map((role) => renderFigure(pageSlug, role)).join("")}</div>` : ""}
    `;
  }
  if (section === "outputs") {
    return `
      <div class="calculator-results">
        <article><div class="result__label">Projected added margin</div><div class="result__value" id="out-margin">$10,584</div></article>
        <article><div class="result__label">Net monthly gain</div><div class="result__value" id="out-net">$7,784</div></article>
        <article><div class="result__label">Recommendation</div><div class="result__value result__value--small" id="out-reco">Proceed with the higher-throughput plan.</div></article>
      </div>
      ${mappedRoles.length ? `<div class="utility-visuals">${mappedRoles.map((role) => renderFigure(pageSlug, role)).join("")}</div>` : ""}
    `;
  }
  return "";
}

function renderSlideSection(meta, section, pageSlug, roles, index) {
  const mode = index % 3 === 0 ? "media-first" : index % 3 === 1 ? "split" : "note";
  const tone = index % 3 === 0 ? "alpha" : index % 3 === 1 ? "beta" : "gamma";
  return `
    <section class="panel panel--slide panel--slide-${mode} panel--slide-${tone}" id="${section}" data-review-section="${section}">
      <div class="panel__rail">${String(index + 1).padStart(2, "0")}</div>
      <div class="panel__copy">
        <p class="eyebrow">${meta.shortName} briefing</p>
        <h2>${sectionLabel(section)}</h2>
        <p>${splitText(meta, section, "Deck")}</p>
        ${mode === "note" ? renderSupportRail(meta, section) : ""}
      </div>
      <div class="panel__media">
        ${roles.map((role) => renderFigure(pageSlug, role)).join("")}
      </div>
    </section>
  `;
}

function renderHeroAside(meta) {
  const blocks = {
    corporate: ["Underwriting discipline", "Operator-led diligence", "Quiet reporting cadence"],
    industrial: ["24 hour escalation", "Region-based crew routing", "Documentation-first service handoff"],
    luxury: ["Collector allocation", "Limited release cadence", "Finish quality over volume"],
    photo: ["Editorial projects", "Quiet portraiture", "Selective assignments"],
    consultancy: ["Strategy clarity", "Decision architecture", "Short high-conviction engagements"],
    saas: ["Workflow mapping", "Interface clarity", "Measurable usage lift"],
    startup: ["Fast launch structure", "Clean service framing", "Simple conversion path"],
    event: ["One-night format", "Limited capacity", "Poster-led rollout"],
    calculator: ["Transparent assumptions", "Structured outputs", "Recommendation logic"]
  };
  const items = blocks[meta.variant] || [];
  if (!items.length) {
    return "";
  }
  return `
    <div class="hero-aside">
      ${items
        .map(
          (item, index) => `
            <article class="hero-aside__item">
              <span>${String(index + 1).padStart(2, "0")}</span>
              <strong>${item}</strong>
            </article>
          `
        )
        .join("")}
    </div>
  `;
}

function renderSection(meta, config, pageConfig, section, roles, index) {
  if (meta.variant === "presentation") {
    return renderSlideSection(meta, section, pageConfig.slug, roles, index);
  }

  const label = sectionLabel(section);
  const pageName = pageLabel(pageConfig.path);
  const body = sectionCopy(meta, config, pageConfig, section, pageName);
  const visuals = roles.length
    ? `<div class="visual-grid visual-grid--${Math.min(roles.length, 3)} visual-grid--role-${roleKind(roles[0])}">${roles.map((role) => renderFigure(pageConfig.slug, role)).join("")}</div>`
    : "";
  const special =
    section === "table" || section === "comparison"
      ? renderTable(meta, section)
      : section === "plans"
        ? renderPricing()
        : /leaders|advisors|owners|team/.test(section)
          ? renderPeopleGrid()
          : /contact|inquiry|request|form/.test(section)
            ? renderForm(section)
            : /process|workflow|faq|agenda|lineup|values|principles|services/.test(section)
              ? renderList(section)
              : meta.variant === "calculator"
                ? renderCalculatorSection(section, roles, pageConfig.slug)
                : "";
  const support =
    section === "hero"
      ? ""
      : !special || /contact|inquiry|request|location|about|policy|terms|story|closing|recommendation|next-step/.test(section)
        ? renderSupportRail(meta, section)
        : "";

  const intro =
    meta.variant === "event" && section === "hero"
      ? `<div class="poster-date"><span>27</span><small>SEP</small></div>`
      : meta.variant === "corporate" && section === "hero"
        ? renderHeroAside(meta)
        : meta.variant === "industrial" && section === "hero"
          ? renderHeroAside(meta)
          : meta.variant === "luxury" && section === "hero"
            ? `<div class="launch-note">Launch allocation opens by inquiry only.</div>`
            : meta.variant === "photo" && section === "hero"
              ? `<div class="gallery-kicker">Selected commissions, editorial, portrait, and project work.</div>`
              : meta.variant === "consultancy" && section === "hero"
                ? `<blockquote class="quote-note">Clarity is a design problem before it is an operating problem.</blockquote>`
                : meta.variant === "saas" && section === "hero"
                  ? `<div class="status-strip"><span>Live workflows</span><strong>148 active teams</strong></div>`
                  : meta.variant === "startup" && section === "hero"
                    ? `<div class="startup-mark">Launch structure with a spine.</div>`
                    : meta.variant === "calculator" && section === "hero"
                      ? `<div class="status-strip"><span>Model state</span><strong>Recommendation updates live</strong></div>`
                      : "";

  const copyBlock = `
      <div class="panel__copy">
        <p class="eyebrow">${meta.sector}</p>
        ${section === "hero" ? `<h1>${pageHeroTitle(meta, config, pageConfig)}</h1>` : `<h2>${label}</h2>`}
        ${intro}
        <p>${section === "hero" ? `${meta.subline} ${heroSupplement(meta, config, pageConfig)}`.trim() : body}</p>
        ${section === "hero" ? renderMetrics(meta) : ""}
      </div>
  `;

  const bodyBlock = `
      <div class="panel__body">
        ${special}
        ${support}
        ${visuals}
      </div>
  `;

  const layoutMode =
    meta.variant === "photo"
      ? (section === "hero" || section.includes("gallery") || pageConfig.slug.includes("project") ? "media-first" : "copy-first")
      : meta.variant === "luxury"
        ? (section === "hero" || section === "gallery" || section.includes("detail") ? "media-first" : "copy-first")
        : meta.variant === "event"
          ? "stacked"
          : meta.variant === "consultancy"
            ? (section === "hero"
                ? "wide"
                : /case|proof|outcomes|services|approach/.test(section)
                  ? "wide"
                  : index % 2 === 0
                    ? "media-first"
                    : "stacked")
        : meta.variant === "calculator"
              ? (section === "calculator" || section === "outputs" ? "wide" : "split")
              : meta.variant === "startup"
                ? (section === "hero"
                    ? "wide"
                    : /what|why|services|approach|process/.test(section)
                      ? "wide"
                      : index % 2 === 0
                        ? "media-first"
                        : "copy-first")
                : meta.variant === "saas"
                  ? (section === "hero" || section.includes("feature") || section.includes("workflow") ? "wide" : "copy-first")
                  : meta.variant === "industrial"
                    ? (section === "hero" || section === "facility" || section === "systems" ? "wide" : "copy-first")
                    : meta.variant === "corporate"
                      ? (section === "hero" || section === "table" || section === "featured-transactions" ? "wide" : "copy-first")
                      : "copy-first";

  const sectionClass = [
    "panel",
    section === "hero" ? "panel--hero" : "",
    section.includes("gallery") ? "panel--gallery" : "",
    section.includes("pricing") || section === "plans" ? "panel--plans" : "",
    section === "calculator" || section === "outputs" ? "panel--utility" : "",
    layoutMode === "wide" ? "panel--wide" : "",
    layoutMode === "media-first" ? "panel--media-first" : "",
    layoutMode === "stacked" ? "panel--stacked" : "",
    meta.variant === "event" ? "panel--poster" : "",
    meta.variant === "photo" ? "panel--gallery-shell" : "",
    meta.variant === "consultancy" ? "panel--essay" : ""
  ]
    .filter(Boolean)
    .join(" ");

  return `
    <section class="${sectionClass}" id="${section}" data-review-section="${section}">
      ${layoutMode === "media-first" ? `${bodyBlock}${copyBlock}` : `${copyBlock}${bodyBlock}`}
    </section>
  `;
}

function renderHeader(meta, config, pageConfig) {
  const navLinks = config.pages
    .map((page) => `<a href="./${page.path}">${pageLabel(page.path)}</a>`)
    .join("");
  const current = pageLabel(pageConfig.path);
  if (meta.variant === "luxury") {
    return `
      <header class="site-header site-header--luxury">
        <div class="site-header__inner">
          <a class="brand-mark" href="./index.html">${meta.shortName}</a>
          <div class="page-indicator">${current}</div>
          <nav class="site-nav" aria-label="Primary navigation">${navLinks}</nav>
        </div>
      </header>
    `;
  }
  if (meta.variant === "photo") {
    return `
      <header class="site-header site-header--photo">
        <div class="site-header__inner">
          <div class="brand-copy brand-copy--stacked">
            <a class="brand-mark" href="./index.html">${meta.shortName}</a>
            <span>${meta.location}</span>
          </div>
          <nav class="site-nav" aria-label="Primary navigation">${navLinks}</nav>
        </div>
      </header>
    `;
  }
  if (meta.variant === "event") {
    return `
      <header class="site-header site-header--event">
        <div class="site-header__inner">
          <div class="brand-block">
            <a class="brand-mark" href="./index.html">${meta.shortName}</a>
            <div class="page-indicator">${current}</div>
          </div>
          <div class="site-header__meta">
            <div class="brand-copy"><span>${meta.location}</span><strong>One-night live program</strong></div>
            <nav class="site-nav" aria-label="Primary navigation">${navLinks}</nav>
          </div>
        </div>
      </header>
    `;
  }
  if (meta.variant === "presentation") {
    return `
      <header class="site-header site-header--presentation">
        <div class="site-header__inner">
          <div class="brand-block">
            <a class="brand-mark" href="./index.html">${meta.shortName}</a>
            <div class="brand-copy"><span>Deck mode</span><strong>Arrow keys enabled</strong></div>
          </div>
          <nav class="site-nav" aria-label="Primary navigation">${navLinks}</nav>
        </div>
      </header>
    `;
  }
  if (meta.variant === "calculator") {
    return `
      <header class="site-header site-header--calculator">
        <div class="site-header__inner">
          <div class="brand-block">
            <a class="brand-mark" href="./index.html">${meta.shortName}</a>
            <div class="brand-copy"><span>${meta.sector}</span><strong>Interactive recommendation model</strong></div>
          </div>
          <div class="site-header__meta">
            <div class="page-indicator">Scenario</div>
            <nav class="site-nav" aria-label="Primary navigation">${navLinks}</nav>
          </div>
        </div>
      </header>
    `;
  }
  return `
    <header class="site-header">
      <div class="site-header__inner">
        <div class="brand-block">
          <a class="brand-mark" href="./index.html">${meta.shortName}</a>
          <div class="brand-copy">
            <span>${meta.sector}</span>
            <strong>${meta.location}</strong>
          </div>
        </div>
        <div class="site-header__meta">
          <div class="page-indicator">${current}</div>
          <nav class="site-nav" aria-label="Primary navigation">${navLinks}</nav>
        </div>
      </div>
    </header>
  `;
}

function renderFooter(meta, config) {
  if (meta.variant === "event") {
    return `
      <footer class="site-footer site-footer--event">
        <div class="site-footer__inner">
          <div>
            <strong>${meta.name}</strong>
            <p>${meta.location} · RSVP required</p>
          </div>
          <div class="site-footer__links">
            ${config.pages.map((page) => `<a href="./${page.path}">${pageLabel(page.path)}</a>`).join("")}
          </div>
        </div>
      </footer>
    `;
  }
  return `
    <footer class="site-footer">
      <div class="site-footer__inner">
        <div>
          <strong>${meta.name}</strong>
          <p>${meta.subline}</p>
        </div>
        <div class="site-footer__links">
          ${config.pages.map((page) => `<a href="./${page.path}">${pageLabel(page.path)}</a>`).join("")}
        </div>
      </div>
    </footer>
  `;
}

function buildPage(meta, config, pageConfig) {
  const roleMap = mapRolesToSections(pageConfig);
  const sections = pageConfig.requiredSections.map((section, index) =>
    renderSection(meta, config, pageConfig, section, roleMap.get(section) || [], index)
  );

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${meta.name} | ${pageLabel(pageConfig.path)}</title>
    <meta name="description" content="${meta.subline}" />
    <link rel="stylesheet" href="./styles.css" />
  </head>
  <body class="template template--${meta.variant} page--${pageConfig.slug}" data-template="${meta.variant}" data-review-page="${pageConfig.slug}">
    ${renderHeader(meta, config, pageConfig)}
    <main class="page-shell">
      ${sections.join("\n")}
    </main>
    ${renderFooter(meta, config)}
    <script src="./script.js"></script>
  </body>
</html>
`;
}

function buildStyles(meta) {
  const p = meta.palette;
  const f = meta.fonts;
  const variantTweaks = {
    corporate: `
      .site-header__inner, .site-footer__inner, .page-shell { max-width: 1660px; }
      .panel--hero { grid-template-columns: 1.05fr .95fr; }
      .panel { border-width: 1px; }
      h1, h2 { letter-spacing: -0.03em; }
      .hero-aside { grid-template-columns: 1fr; }
      .page--transactions .panel,
      .page--strategy .panel { grid-template-columns: .95fr 1.05fr; }
      .page--privacy .panel,
      .page--terms .panel { grid-template-columns: .9fr 1.1fr; }
    `,
    industrial: `
      .site-header { border-bottom-width: 2px; }
      .site-nav a { text-transform: uppercase; font-size: .84rem; letter-spacing: .14em; }
      .panel { border-width: 2px; }
      .panel--hero { grid-template-columns: .92fr 1.08fr; }
      h1, h2 { text-transform: uppercase; letter-spacing: -0.03em; }
      .panel { box-shadow: inset 0 -12px 0 rgba(0,0,0,.03); }
      .site-header__inner, .site-footer__inner, .page-shell { max-width: 1660px; }
      .page--capabilities .panel,
      .page--services .panel { grid-template-columns: .88fr 1.12fr; }
    `,
    luxury: `
      body { color: ${p.text}; }
      .site-header, .panel, .site-footer { border-color: ${p.line}; }
      .panel { background: ${p.surface}; }
      .panel--hero { min-height: 86vh; align-items: end; }
      .panel--media-first .panel__body { padding-right: 6vw; }
      .site-nav a { letter-spacing: .18em; text-transform: uppercase; font-size: .8rem; }
      .site-header__inner { grid-template-columns: auto 1fr auto; align-items: center; }
      h1, h2 { letter-spacing: -0.04em; }
      .review-visual--photo img { aspect-ratio: 4 / 3; }
      .page--home .panel--hero,
      .page--product .panel--hero { grid-template-columns: 1.2fr .8fr; }
    `,
    photo: `
      .site-header__inner { grid-template-columns: 1fr auto; max-width: 1620px; }
      .site-nav { gap: 1rem; }
      .panel { grid-template-columns: .58fr 1.42fr; }
      .panel--hero { min-height: 88vh; }
      .panel { background: ${p.surface}; box-shadow: inset 22rem 0 0 rgba(235, 230, 221, 0.86); }
      .panel--gallery-shell { background: ${p.surface}; box-shadow: inset 24rem 0 0 rgba(235, 230, 221, 0.92); border: 1px solid ${p.line}; padding-left: 1rem; padding-right: 1rem; }
      .panel--gallery-shell .panel__copy { padding-left: 0.35rem; }
      .panel:nth-child(even) { box-shadow: inset 26rem 0 0 rgba(230, 223, 212, 0.92); }
      .review-visual figcaption { text-transform: none; }
      h1, h2 { letter-spacing: -0.04em; }
      .review-visual--photo img { aspect-ratio: 5 / 4; }
      .page-shell { max-width: 1640px; }
      .support-rail__item { background: rgba(255,253,249,0.92); }
    `,
    consultancy: `
      .page-shell { max-width: 1640px; }
      .panel { grid-template-columns: .9fr 1.1fr; }
      .panel--essay { grid-template-columns: 1fr; }
      .panel__copy { max-width: 36rem; }
      h1, h2 { max-width: 14ch; letter-spacing: -0.04em; }
      .site-nav a { text-transform: uppercase; font-size: .78rem; letter-spacing: .16em; }
      .page--work .panel,
      .page--services .panel { grid-template-columns: 1fr; }
      .page--home .panel--hero,
      .page--work .panel--hero { grid-template-columns: 1.1fr .9fr; }
      .quote-note { max-width: 22ch; font-size: 1.4rem; }
    `,
    saas: `
      .site-header { position: sticky; top: 0; backdrop-filter: blur(6px); }
      .panel { border-radius: 14px; }
      .review-visual img { border-radius: 12px; }
      .site-header { background: rgba(242,245,243,.92); z-index: 20; }
      h1, h2 { letter-spacing: -0.05em; }
      .panel--wide { grid-template-columns: 1.12fr .88fr; }
      .page-shell { max-width: 1620px; }
    `,
    startup: `
      .page-shell { max-width: 1640px; }
      .panel { border-radius: 10px; }
      .panel:nth-child(odd) { box-shadow: inset 0 -18px 0 rgba(36, 86, 166, 0.06); }
      .site-nav a { font-weight: 600; }
      h1, h2 { letter-spacing: -0.05em; }
      .panel--wide { grid-template-columns: 1.08fr .92fr; }
      .page--home .panel--hero { grid-template-columns: 1.15fr .85fr; }
    `,
    event: `
      .page-shell { max-width: 1660px; }
      .site-header__inner { grid-template-columns: auto 1fr; align-items: start; }
      .brand-mark { font-size: 1.5rem; text-transform: uppercase; letter-spacing: .08em; }
      .page-indicator { font-size: 4rem; line-height: .9; color: ${p.accent}; }
      .panel--hero { min-height: 88vh; }
      .panel--poster { grid-template-columns: 1fr; border-width: 2px; }
      .panel--poster .panel__copy { max-width: 52rem; }
      h1, h2 { text-transform: uppercase; letter-spacing: -0.06em; }
    `,
    presentation: `
      .page-shell { width: min(calc(100% - 0.2rem), 100%); max-width: none; gap: 2rem; padding-top: 1rem; padding-bottom: 4rem; }
      .site-header__inner, .site-footer__inner { max-width: 1800px; }
      .panel--slide { min-height: 100vh; grid-template-columns: 96px .9fr 1.1fr; align-items: center; margin: 0 auto; width: min(calc(100% - 0.5rem), 1780px); }
      .panel--slide-media-first { grid-template-columns: 96px 1.18fr .82fr; }
      .panel--slide-note { grid-template-columns: 96px .86fr 1.14fr; }
      .panel--slide-alpha { background: rgb(12, 20, 31); box-shadow: inset -28rem 0 0 rgba(58, 86, 124, 0.94); }
      .panel--slide-beta { background: rgb(38, 57, 86); box-shadow: inset 28rem 0 0 rgba(14, 22, 34, 0.97); }
      .panel--slide-gamma { background: rgb(10, 17, 27); box-shadow: inset -32rem 0 0 rgba(72, 103, 145, 0.94); }
      .panel--slide::before { background: linear-gradient(135deg, rgba(212,169,77,0.08), transparent 58%); }
      .panel__rail { font-size: 1rem; letter-spacing: .2em; text-transform: uppercase; color: ${p.accent}; writing-mode: vertical-rl; transform: rotate(180deg); }
      .site-header { position: sticky; top: 0; z-index: 8; }
      .site-nav a { text-transform: uppercase; letter-spacing: .14em; font-size: .76rem; }
      h1, h2 { letter-spacing: -0.05em; }
      .panel__media .review-visual img { aspect-ratio: 16 / 11; }
      .panel--slide .panel__copy { max-width: 42rem; }
      .panel--slide .metric,
      .panel--slide .support-rail__item,
      .panel--slide .review-visual img { background: rgba(44, 63, 91, 0.96); }
      .panel--slide .review-visual img { border-color: rgba(122, 162, 208, 0.35); }
    `,
    calculator: `
      .panel--utility .panel__body { width: 100%; }
      .panel { grid-template-columns: .86fr 1.14fr; }
      h1, h2 { text-transform: uppercase; letter-spacing: -0.04em; }
      .site-nav a { font-family: ${f.mono}; font-size: .82rem; }
      .panel--wide { grid-template-columns: 1.12fr .88fr; }
      .page-shell { max-width: 1680px; }
      .page--home .panel--hero { grid-template-columns: 1.08fr .92fr; }
      .calculator-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
    `
  };

  return `:root {
  --bg: ${p.bg};
  --surface: ${p.surface};
  --panel: ${p.panel};
  --text: ${p.text};
  --muted: ${p.muted};
  --line: ${p.line};
  --accent: ${p.accent};
  --accent-2: ${p.accent2};
  --display: ${f.display};
  --body: ${f.body};
  --mono: ${f.mono};
  --max: 1620px;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family: var(--body);
  line-height: 1.5;
  position: relative;
  min-height: 100vh;
}

body::before,
body::after {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: -2;
}

body::after {
  z-index: -1;
  opacity: 0.5;
}

a {
  color: inherit;
  text-decoration: none;
}

img {
  display: block;
  width: 100%;
  height: auto;
}

button,
input,
textarea {
  font: inherit;
}

button {
  border: 1px solid var(--text);
  background: var(--text);
  color: var(--bg);
  padding: 0.95rem 1.15rem;
  cursor: pointer;
  border-radius: 8px;
}

input,
textarea {
  width: 100%;
  border: 1px solid var(--line);
  background: var(--surface);
  color: var(--text);
  padding: 0.9rem 0.95rem;
  border-radius: 8px;
}

.site-header {
  border-bottom: 1px solid var(--line);
  background: var(--bg);
}

.site-header__inner,
.site-footer__inner,
.page-shell {
  width: min(calc(100% - 0.6rem), var(--max));
  margin: 0 auto;
}

.site-header__inner {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1.5rem;
  padding: 1rem 0;
}

.brand-block,
.site-header__meta {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.brand-mark {
  font-family: var(--display);
  font-size: 1.25rem;
  font-weight: 700;
}

.brand-copy {
  display: grid;
  gap: 0.2rem;
  font-size: 0.82rem;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.brand-copy strong {
  color: var(--text);
  font-weight: 600;
}

.site-header__meta {
  flex-direction: column;
  align-items: flex-end;
}

.page-indicator {
  font-family: var(--mono);
  color: var(--accent);
}

.site-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem 1.2rem;
  justify-content: flex-end;
}

.site-nav a {
  padding-bottom: 0.15rem;
  border-bottom: 1px solid transparent;
}

.site-nav a:hover,
.site-nav a:focus-visible {
  border-color: var(--accent);
}

.page-shell {
  display: grid;
  gap: 2rem;
  padding: 0.8rem 0 3.4rem;
}

.panel {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: clamp(1.5rem, 2.2vw, 2.6rem);
  border: 1px solid var(--line);
  background: var(--surface);
  position: relative;
  overflow: clip;
  isolation: isolate;
}

.panel--hero {
  min-height: 76vh;
  align-items: center;
}

.panel::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(135deg, color-mix(in srgb, var(--panel) 34%, transparent), transparent 54%);
  opacity: 0.9;
  z-index: -1;
}

.panel--hero::after {
  content: "";
  position: absolute;
  right: -6rem;
  top: -5rem;
  width: 26rem;
  height: 26rem;
  border-radius: 50%;
  background: color-mix(in srgb, var(--accent) 14%, transparent);
  filter: blur(4px);
  z-index: -1;
}

.panel--wide {
  grid-template-columns: 1fr 1fr;
}

.panel__copy,
.panel__body {
  display: grid;
  align-content: start;
  gap: 1.1rem;
}

.panel--media-first > .panel__body {
  order: -1;
}

.panel--stacked {
  grid-template-columns: 1fr;
}

.eyebrow {
  margin: 0;
  color: var(--accent);
  font-family: var(--mono);
  font-size: 0.82rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

h1,
h2,
h3 {
  margin: 0;
  font-family: var(--display);
  line-height: 0.95;
}

h1 {
  font-size: clamp(3rem, 6vw, 6rem);
}

h2 {
  font-size: clamp(2rem, 4vw, 3.7rem);
}

h3 {
  font-size: 1.1rem;
}

p {
  margin: 0;
  max-width: 58ch;
  color: var(--muted);
}

.data-grid,
.people-grid,
.pricing-grid,
.visual-grid,
.calculator-results {
  display: grid;
  gap: 1rem;
}

.data-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.metric,
.person-card,
.price-card,
.calculator-results article {
  border: 1px solid var(--line);
  background: var(--bg);
  padding: 1rem;
}

.metric__label,
.price-card__label,
.result__label {
  font-family: var(--mono);
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--muted);
}

.metric__value,
.price-card__value,
.result__value {
  margin-top: 0.45rem;
  font-size: clamp(1.15rem, 2vw, 2rem);
  line-height: 1.05;
  color: var(--text);
}

.result__value--small {
  font-size: 1.15rem;
  line-height: 1.3;
}

.hero-aside,
.utility-visuals,
.support-rail {
  display: grid;
  gap: 0.8rem;
}

.hero-aside__item,
.quote-note,
.launch-note,
.gallery-kicker,
.status-strip,
.startup-mark,
.poster-date {
  border: 1px solid var(--line);
  background: var(--bg);
}

.hero-aside__item {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.8rem;
  padding: 0.9rem 1rem;
}

.hero-aside__item span {
  font-family: var(--mono);
  color: var(--accent);
}

.quote-note,
.launch-note,
.gallery-kicker,
.status-strip,
.startup-mark,
.support-rail__item {
  padding: 0.9rem 1rem;
  color: var(--text);
}

.support-rail {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.support-rail__item {
  border: 1px solid var(--line);
  background: var(--bg);
  font-family: var(--mono);
  font-size: 0.76rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
}

.quote-note {
  margin: 0;
  font-family: var(--display);
  font-size: 1.2rem;
  line-height: 1.2;
}

.status-strip {
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
  font-family: var(--mono);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.78rem;
}

.status-strip strong {
  font-size: 0.94rem;
  color: var(--text);
}

.poster-date {
  display: inline-grid;
  gap: 0.25rem;
  width: min-content;
  padding: 0.8rem 1rem;
}

.poster-date span {
  font-family: var(--display);
  font-size: clamp(3rem, 10vw, 7rem);
  line-height: 0.85;
  color: var(--accent);
}

.poster-date small {
  font-family: var(--mono);
  letter-spacing: 0.2em;
}

.visual-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: start;
}

.visual-grid--1 {
  grid-template-columns: 1fr;
}

.visual-grid--3 {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.review-visual {
  margin: 0;
  display: grid;
  gap: 0.55rem;
}

.review-visual img {
  border: 1px solid var(--line);
  background: var(--panel);
  aspect-ratio: 16 / 10;
  object-fit: cover;
}

.review-visual--portrait img {
  aspect-ratio: 4 / 5;
}

.review-visual--table img,
.review-visual--chart img,
.review-visual--ui img,
.review-visual--diagram img {
  aspect-ratio: 16 / 10;
}

.panel--hero .review-visual img,
.panel--gallery .review-visual img {
  min-height: 280px;
}

.visual-grid--role-photo .review-visual:first-child,
.visual-grid--role-ui .review-visual:first-child,
.visual-grid--role-diagram .review-visual:first-child {
  grid-column: 1 / -1;
}

.review-visual figcaption {
  font-family: var(--mono);
  font-size: 0.74rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
}

.steps {
  margin: 0;
  padding-left: 1.2rem;
  display: grid;
  gap: 0.8rem;
}

.table-shell {
  border: 1px solid var(--line);
  background: var(--bg);
}

.table-shell__title {
  padding: 0.9rem 1rem;
  border-bottom: 1px solid var(--line);
  font-family: var(--mono);
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--muted);
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 0.85rem 1rem;
  text-align: left;
  border-bottom: 1px solid var(--line);
  vertical-align: top;
}

th {
  font-family: var(--mono);
  font-size: 0.76rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--muted);
}

.form-grid,
.calculator-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.form-grid label,
.calculator-grid label {
  display: grid;
  gap: 0.45rem;
}

.form-grid span,
.calculator-grid span {
  font-family: var(--mono);
  font-size: 0.76rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--muted);
}

.form-grid__wide {
  grid-column: 1 / -1;
}

.calculator-grid {
  border: 1px solid var(--line);
  background: var(--bg);
  padding: 1rem;
}

.calculator-results {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.utility-visuals {
  display: grid;
  gap: 1rem;
}

.site-footer {
  border-top: 1px solid var(--line);
}

.site-footer__inner {
  display: grid;
  grid-template-columns: 1.2fr .8fr;
  gap: 1rem;
  padding: 1.2rem 0 2rem;
}

.site-footer__links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1rem;
  justify-content: flex-end;
}

.site-footer__links a {
  font-family: var(--mono);
  font-size: 0.76rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--muted);
}

.brand-copy--stacked {
  align-items: start;
}

body.template--corporate::before {
  background:
    linear-gradient(180deg, #ebe4d6 0, #f3efe6 22rem, #f3efe6 100%);
}

body.template--corporate::after {
  background:
    linear-gradient(90deg, transparent 0 8%, rgba(94, 104, 82, 0.08) 8% 38%, transparent 38% 100%);
}

body.template--industrial::before {
  background:
    linear-gradient(180deg, #e4ddd1 0, #f0ece4 18rem, #f0ece4 100%);
}

body.template--industrial::after {
  background:
    linear-gradient(90deg, rgba(177, 77, 36, 0.08) 0 24%, transparent 24% 100%);
}

body.template--luxury::before {
  background:
    radial-gradient(circle at 74% 18%, rgba(157, 125, 85, 0.16), transparent 24rem),
    linear-gradient(180deg, #0d0d0d 0, #121212 20rem, #121212 100%);
}

body.template--luxury::after {
  background:
    linear-gradient(90deg, transparent 0 62%, rgba(199, 178, 141, 0.04) 62% 100%);
}

body.template--photo::before {
  background:
    linear-gradient(90deg, rgba(235, 230, 221, 0.8) 0 22%, transparent 22% 100%),
    linear-gradient(180deg, #f0ece4 0, #f7f4ee 20rem, #f7f4ee 100%);
}

body.template--photo::after {
  background:
    linear-gradient(180deg, transparent 0 10rem, rgba(54, 49, 45, 0.03) 10rem 10.1rem, transparent 10.1rem 100%);
}

body.template--consultancy::before {
  background:
    linear-gradient(90deg, transparent 0 58%, rgba(138, 63, 52, 0.09) 58% 100%),
    linear-gradient(180deg, #efe7da 0, #f3efe7 18rem, #f3efe7 100%);
}

body.template--consultancy::after {
  background:
    linear-gradient(180deg, transparent 0 11rem, rgba(52, 68, 62, 0.035) 11rem 11.1rem, transparent 11.1rem 100%);
}

body.template--saas::before {
  background:
    linear-gradient(180deg, #e7eeea 0, #f2f5f3 16rem, #f2f5f3 100%);
}

body.template--saas::after {
  background:
    linear-gradient(90deg, transparent 0 64%, rgba(18, 115, 75, 0.07) 64% 100%);
}

body.template--startup::before {
  background:
    linear-gradient(180deg, #ebf0f3 0, #f5f7f7 14rem, #f5f7f7 100%);
}

body.template--startup::after {
  background:
    linear-gradient(90deg, rgba(36, 86, 166, 0.05) 0 26%, transparent 26% 100%);
}

body.template--event::before {
  background:
    linear-gradient(180deg, #efd7bf 0, #f5eadb 14rem, #f5eadb 100%);
}

body.template--event::after {
  background:
    linear-gradient(90deg, rgba(178, 43, 32, 0.08) 0 18%, transparent 18% 100%);
}

body.template--presentation::before {
  background:
    radial-gradient(circle at 24% 12%, rgba(122, 162, 208, 0.12), transparent 24rem),
    linear-gradient(180deg, #0a1320 0, #0f1824 18rem, #0f1824 100%);
}

body.template--presentation::after {
  background:
    linear-gradient(90deg, transparent 0 70%, rgba(212, 169, 77, 0.06) 70% 100%);
}

body.template--calculator::before {
  background:
    linear-gradient(90deg, rgba(227, 222, 209, 0.82) 0 34%, transparent 34% 100%),
    linear-gradient(180deg, #ece7dd 0, #f3f1ea 18rem, #f3f1ea 100%);
}

body.template--calculator::after {
  background:
    linear-gradient(180deg, transparent 0 9rem, rgba(45, 91, 115, 0.04) 9rem 9.08rem, transparent 9.08rem 100%);
}

${variantTweaks[meta.variant]}

@media (max-width: 960px) {
  .site-header__inner,
  .site-footer__inner,
  .panel,
  .panel--slide {
    grid-template-columns: 1fr;
  }

  .panel--media-first > .panel__body {
    order: 0;
  }

  .site-header__meta,
  .site-footer__links {
    align-items: flex-start;
    justify-content: flex-start;
  }

  .data-grid,
  .visual-grid,
  .visual-grid--3,
  .calculator-results,
  .pricing-grid,
  .people-grid,
  .form-grid,
  .calculator-grid,
  .support-rail {
    grid-template-columns: 1fr;
  }

  .panel__rail {
    writing-mode: horizontal-tb;
    transform: none;
  }

  h1 {
    font-size: clamp(2.6rem, 10vw, 4rem);
  }

  body::before,
  body::after {
    position: absolute;
  }
}
`;
}

function buildScript(meta) {
  const common = `
const body = document.body;
const template = body.dataset.template;

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const href = anchor.getAttribute('href');
    const target = href ? document.querySelector(href) : null;
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
`;

  const presentation = `
const slides = Array.from(document.querySelectorAll('[data-review-section^="slide-"]'));
let activeIndex = 0;

function focusSlide(index) {
  activeIndex = Math.max(0, Math.min(slides.length - 1, index));
  slides[activeIndex]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

window.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight' || event.key === 'PageDown' || event.key === ' ') {
    event.preventDefault();
    focusSlide(activeIndex + 1);
  }
  if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
    event.preventDefault();
    focusSlide(activeIndex - 1);
  }
});

const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      const found = slides.indexOf(entry.target);
      if (found >= 0) activeIndex = found;
    }
  }
}, { threshold: 0.55 });

slides.forEach((slide) => observer.observe(slide));
`;

  const calculator = `
const volume = document.getElementById('volume');
const aov = document.getElementById('aov');
const uplift = document.getElementById('uplift');
const cost = document.getElementById('cost');
const outMargin = document.getElementById('out-margin');
const outNet = document.getElementById('out-net');
const outReco = document.getElementById('out-reco');

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
}

function recalc() {
  const monthlyVolume = Number(volume?.value || 0);
  const orderValue = Number(aov?.value || 0);
  const upliftPct = Number(uplift?.value || 0) / 100;
  const monthlyCost = Number(cost?.value || 0);
  const addedMargin = monthlyVolume * orderValue * upliftPct;
  const net = addedMargin - monthlyCost;
  if (outMargin) outMargin.textContent = formatCurrency(addedMargin);
  if (outNet) outNet.textContent = formatCurrency(net);
  if (outReco) {
    outReco.textContent = net >= 0
      ? 'Proceed with the structured rollout. The model clears monthly cost with room to spare.'
      : 'Revise volume assumptions before rollout. Current scenario does not clear monthly cost.';
  }
}

[volume, aov, uplift, cost].forEach((node) => node?.addEventListener('input', recalc));
recalc();
`;

  return `${common}
${meta.variant === "presentation" ? presentation : ""}
${meta.variant === "calculator" ? calculator : ""}
`;
}

function buildReadme(meta, config) {
  return `# ${meta.name}

${meta.subline}

## Pages

${config.pages.map((page) => `- \`${page.path}\``).join("\n")}

## Included Files

- \`styles.css\`
- \`script.js\`
- \`assets/\`
- \`.github/workflows/deploy-pages.yml\`

## Local Preview

\`\`\`bash
python3 -m http.server 4321
\`\`\`

Then open \`http://127.0.0.1:4321\`.

## Browser Review

\`\`\`bash
node ../e2e/forced-browser-review.mjs --config ../e2e/configs/${config.slug}.json
\`\`\`

## Deployment

This template is GitHub Pages ready and uses relative paths so it can publish from a project subpath.
`;
}

async function buildTemplate(slug) {
  const meta = TEMPLATE_META[slug];
  const config = await readConfig(slug);
  const dir = path.join(ROOT, slug);

  await fs.rm(dir, { recursive: true, force: true });
  await fs.mkdir(path.join(dir, "assets"), { recursive: true });

  for (const page of config.pages) {
    for (const role of page.requiredReviewImages) {
      await writeFile(path.join(dir, "assets", assetFile(page.slug, role)), svgFor(meta, page.slug, role));
    }
  }

  await writeFile(path.join(dir, "styles.css"), buildStyles(meta));
  await writeFile(path.join(dir, "script.js"), buildScript(meta));
  await writeFile(path.join(dir, "README.md"), buildReadme(meta, config));
  await writeFile(path.join(dir, ".nojekyll"), "");
  await writeFile(path.join(dir, ".github", "workflows", "deploy-pages.yml"), DEPLOY_WORKFLOW);

  for (const page of config.pages) {
    await writeFile(path.join(dir, page.path), buildPage(meta, config, page));
  }
}

async function main() {
  for (const slug of BUILD_ORDER) {
    await buildTemplate(slug);
    process.stdout.write(`Built ${slug}\n`);
  }
}

main().catch((error) => {
  process.stderr.write(`${error.stack || error.message}\n`);
  process.exitCode = 1;
});
