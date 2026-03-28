# Autonomous Template Build Script

## Objective

Create a static-first template system with 10 production-ready website templates. Every template must be deployable to GitHub Pages, easy to clone into a new client repo, visually distinct, and clearly authored. None of them may look like generic SaaS boilerplate.

## Non-Negotiables

- Build with static HTML, CSS, and JavaScript by default.
- Use GitHub Pages as the default deployment target.
- Keep all templates subpath-safe with relative asset paths.
- Every template must have desktop and mobile layouts that feel intentionally designed, not adapted at the last second.
- Do not use pill-shaped buttons, pill tags, pill nav items, pill counters, pill filters, or pill badges.
- Avoid rounded-full UI almost entirely. Corners should usually be square, slightly eased, chamfered, or sharply rounded at small radii only.
- Do not repeat the same hero structure across templates.
- Do not rely on purple gradients, glassmorphism, or stock startup aesthetics.
- Motion must support composition, not rescue weak design.
- Typography must be a deliberate part of the design system, not an afterthought.

## Shared System

Each template should include:

- `index.html`
- Additional HTML pages if the template is multi-page
- `styles.css`
- `script.js`
- `assets/`
- `README.md`
- `.nojekyll`
- `.github/workflows/deploy-pages.yml`

Each template should expose:

- a clear page map
- one strong hero concept
- one repeatable section rhythm
- one opinionated type system
- one defined motion language
- one deploy path

## Build Standard

For every template:

1. Define a distinct art direction.
2. Define typography, spacing, grid, and image treatment before building sections.
3. Build the homepage first.
4. Build the remaining pages or sections from the same system.
5. Validate desktop and mobile screenshots.
6. Keep content placeholders high-quality and believable.
7. Ship with a README that explains what the template is for and how to reuse it.

## Template 01: Corporate Investment

**Slug**

`corporate-investment`

**Purpose**

Private equity, investment firm, holding company, advisory group, serious B2B finance.

**Look**

Quiet, rigorous, editorial, expensive without trying to be flashy. More institutional than startup. Dense information handled with control.

**Typography**

- Headings: elegant serif with authority
- Body: restrained grotesk or neo-grotesk sans
- Numbers: tabular, prominent, clean

**Palette**

- Bone
- carbon
- iron gray
- muted olive or dark bronze accent

**Layout**

Multi-page. Strong topbar. Wide margins. Strong grid alignment. Hero split between thesis copy and one information-dense visual frame. Section spacing should feel composed, not airy for the sake of looking modern.

**Pages**

- Home
- Firm
- Strategy or Solutions
- Transactions or Portfolio
- Leadership
- Contact
- Privacy
- Terms

**Homepage Structure**

- statement-led hero
- firm snapshot metrics in a grid, not chips
- investment thesis band
- operating model or differentiators
- selected transactions preview
- leadership preview
- final contact block

**Signature Details**

- timelines
- transaction tables
- leadership cards with strict alignment
- quote blocks that read like annual-report pull quotes

**Motion**

Low and precise. Fade, slide, and line-draw only where it adds orientation.

**Never Do**

- glowing cards
- floating glass panels
- pill statistics

## Template 02: Industrial Services

**Slug**

`industrial-services`

**Purpose**

Aviation maintenance, fabrication, logistics, field service, heavy equipment, operations-driven companies.

**Look**

Controlled, mechanical, exact, capable. Less rugged cosplay, more real operational confidence.

**Typography**

- Headings: condensed or semi-condensed sans
- Body: pragmatic sans
- Labels: uppercase utility style

**Palette**

- engine black
- aluminum
- sand
- safety orange or oxidized red accent

**Layout**

Multi-page. Hero should use asymmetry and strong framing. Sections should alternate between technical density and calm breathing room. Surfaces can use subtle panel logic, linework, or diagrammatic framing.

**Pages**

- Home
- Services
- Capabilities
- Ownership or Leadership
- About
- Contact

**Homepage Structure**

- operational positioning hero
- service pillars
- facility or capability diagram
- process strip
- trust proof
- service request CTA

**Signature Details**

- annotated imagery
- spec-list sections
- grid-based capability breakdowns
- process diagrams with hard edges

**Motion**

Reveal by sequence, wipe, measured parallax at most. No bounce.

**Never Do**

- faux construction-site grunge
- pill filters
- soft startup gradients

## Template 03: Luxury Product Launch

**Slug**

`luxury-product-launch`

**Purpose**

High-end physical product, collector object, premium launch edition, boutique manufacturing.

**Look**

Editorial commerce with pressure and restraint. Dark, tactile, deliberate. The product should feel photographed, staged, and coveted.

**Typography**

- Headings: fashion-grade serif or sharply styled display face
- Body: refined sans
- Supporting labels: spaced uppercase

**Palette**

- soot
- gunmetal
- parchment
- burnished metal accent

**Layout**

Single-page or light multi-page. Large immersive hero. Heavy reliance on image cropping, negative space, and strong contrast. Content blocks should feel like a launch booklet, not an ecommerce template.

**Pages**

- Home
- Product Detail
- Story
- Inquiry or Contact

**Homepage Structure**

- dominant hero image with launch statement
- product highlights
- craftsmanship story
- gallery band
- ownership or inquiry section

**Signature Details**

- oversized product frames
- launch note blocks
- edition metadata panels
- image-first storytelling modules

**Motion**

Slow image drift, masked reveals, subtle zoom, no gimmicks.

**Never Do**

- store-style icon rows
- rounded promotional tags
- generic buy-now SaaS CTA styling

## Template 04: Photography Portfolio

**Slug**

`photography-portfolio`

**Purpose**

Photographer, director, visual artist, studio, editorial portfolio.

**Look**

Gallery-first, sparse, cinematic, image-led. The site should feel curated, not widgetized.

**Typography**

- Headings: restrained serif or humanist sans
- Body: minimal supporting sans

**Palette**

- off-white
- charcoal
- warm gray
- one muted accent only if needed

**Layout**

Light multi-page. Navigation should stay quiet. Homepage should behave like an exhibition landing page. Project listing should privilege scale and rhythm over card repetition.

**Pages**

- Home
- Portfolio Index
- Project Detail template
- About
- Contact

**Homepage Structure**

- statement or image-led opening
- selected projects stack
- artist note
- press or client list
- inquiry footer

**Signature Details**

- edge-to-edge image blocks
- alternating portrait and landscape rhythm
- project transitions that feel like gallery pacing
- caption systems with discipline

**Motion**

Crossfades, image reveal masks, scroll pacing. Very little else.

**Never Do**

- masonry chaos
- badge clutter
- pill category tabs

## Template 05: Consultancy

**Slug**

`consultancy`

**Purpose**

Independent consultant, strategic advisor, boutique practice, executive operator.

**Look**

Sharp, articulate, lean, text-forward. This should feel like a premium point of view, not a bloated agency site.

**Typography**

- Headings: assertive serif or narrow sans
- Body: readable serif or clean sans, depending on direction

**Palette**

- ivory
- black
- graphite
- muted red, forest, or navy accent

**Layout**

Single-page or compact multi-page. Strong vertical reading flow. Heavy emphasis on argument, proof, and clarity of offer.

**Pages**

- Home
- Services
- Case Studies or Work
- About
- Contact

**Homepage Structure**

- thesis hero
- how I help
- proof or outcomes
- engagement model
- short bio
- direct inquiry section

**Signature Details**

- text-led modules
- evidence panels
- strategically placed pull quotes
- spare but intentional dividers

**Motion**

Almost none. Focus on pace and crisp transitions.

**Never Do**

- agency-style blobs
- rounded cards everywhere
- social-proof chip walls

## Template 06: SaaS Marketing

**Slug**

`saas-marketing`

**Purpose**

Software product, B2B SaaS, workflow platform, AI tool, internal ops product.

**Look**

Confident product storytelling without defaulting to generic startup chrome. Cleaner, more systematic, more product-interface-led than decorative.

**Typography**

- Headings: modern sans with strong weight control
- Body: neutral sans
- Data labels: mono or utility sans in moderation

**Palette**

- white or warm off-white base
- ink
- steel
- one strong non-purple accent such as cobalt, green, orange, or acid yellow

**Layout**

Single-page with optional pricing and docs stubs, or light multi-page. Hero should integrate product UI composition rather than isolated browser mockups floating in space.

**Pages**

- Home
- Product
- Pricing
- About or Company
- Contact or Demo

**Homepage Structure**

- product thesis hero with composed UI scene
- core feature architecture
- proof or customer outcomes
- workflow breakdown
- pricing preview
- demo CTA

**Signature Details**

- interface closeups
- before-and-after workflow diagrams
- proof metrics in a grid
- strong comparison sections

**Motion**

Controlled interface transitions, staged reveals, scroll-linked emphasis sparingly.

**Never Do**

- purple gradients
- floating pill buttons
- random testimonial cards with avatars in circles

## Template 07: Startup Brochure

**Slug**

`startup-brochure`

**Purpose**

Fast-launch company site for a new business that needs credibility quickly without looking cheap.

**Look**

Minimal, fast, modern, but not trendy. This is the neutral high-utility template, yet it still needs a spine.

**Typography**

- Headings: sturdy modern sans
- Body: neutral sans

**Palette**

- white
- black
- slate
- one accent color chosen per client

**Layout**

Compact multi-page or high-performing single-page. The value is speed and adaptability, so the system must be simple without becoming generic.

**Pages**

- Home
- About
- Services or Product
- Contact

**Homepage Structure**

- clear positioning hero
- what we do
- why us
- process
- contact CTA

**Signature Details**

- disciplined spacing
- one visual motif that repeats across the whole site
- high-quality empty space

**Motion**

Small entrance motion only.

**Never Do**

- copycat Stripe clone styling
- pills for every supporting point
- noisy illustrations by default

## Template 08: Event Launch

**Slug**

`event-launch`

**Purpose**

Conference, summit, release event, product drop, pop-up, screening, or invitation-based experience.

**Look**

Urgent, poster-like, graphic, striking. It should feel like campaign design translated into the browser.

**Typography**

- Headings: expressive display face
- Body: narrow supporting sans
- Labels: event-system utility text

**Palette**

High contrast and bold. Could be cream and red, black and acid yellow, navy and silver, or another strong pair.

**Layout**

Single-page. The site should be designed like a sequence of posters or stacked panels, not a corporate landing page.

**Pages**

- Home only, or Home plus RSVP/Details

**Homepage Structure**

- poster hero
- date, location, lineup block
- agenda or key moments
- featured speakers or elements
- RSVP block
- practical footer

**Signature Details**

- big date treatments
- layered type composition
- diagonal or framed section transitions where appropriate
- countdown or schedule modules without gimmicks

**Motion**

Staggered reveals, poster wipes, selective typography motion.

**Never Do**

- generic conference card grids
- pill tags for speakers
- boring neutral hero layouts

## Template 09: Presentation Microsite

**Slug**

`presentation-microsite`

**Purpose**

Standalone talk deck, internal presentation, public briefing, campaign deck, sales narrative.

**Look**

Narrative, sequence-driven, cinematic. Strong slide composition. Should feel like a designed presentation environment, not a webpage pretending to be slides.

**Typography**

- Headings: bold display or elegant serif depending on subject
- Body: presentation-friendly sans

**Palette**

Depends on topic, but every deck must commit to a narrow palette with clear background discipline.

**Layout**

Slide-based single-page app in plain HTML/CSS/JS. Full viewport sections. Keyboard navigation. Mobile should still work as stacked sections or adapted deck mode.

**Pages**

- Deck only

**Homepage Structure**

- title slide
- argument or agenda
- evidence sequence
- case study or supporting slides
- conclusion
- closing CTA or contact

**Signature Details**

- strong title slide
- disciplined slide rhythm
- contrast between dense and sparse slides
- export-friendly visual structure

**Motion**

Slide transitions, staged build-ins, no novelty effects.

**Never Do**

- carousel UI metaphors
- rounded pager pills
- dashboard components dropped into slides without design integration

## Template 10: Calculator Explainer

**Slug**

`calculator-explainer`

**Purpose**

Interactive pricing tool, scenario comparison, forecast explainer, table-driven decision aid.

**Look**

Analytical, crisp, readable, persuasive. More information design than marketing fluff.

**Typography**

- Headings: clean sans or restrained serif
- Body: utility sans
- Numeric output: mono or tabular sans

**Palette**

- white or paper
- dark ink
- one or two chart accents

**Layout**

Single-page. One main interactive module supported by explanation, assumptions, and result framing. Strong hierarchy. Tables and outputs should feel designed, not default browser tables.

**Pages**

- Home only

**Homepage Structure**

- short positioning hero
- primary calculator or comparison table
- assumptions block
- scenario outputs
- recommendation or interpretation
- contact or next-step section

**Signature Details**

- strong table styling
- explicit input groups with labels
- chart or output region with hierarchy
- explanation copy that makes the model feel trustworthy

**Motion**

Number transitions, chart updates, subtle focus changes only.

**Never Do**

- bright dashboard clutter
- rounded pills for filters
- fake analytics visual noise

## Cross-Template Guardrails

- Use buttons that are rectangular, square-ended, lightly beveled, or modestly rounded.
- If a label must be highlighted, use rules, blocks, underlines, corner brackets, or contrasting panels instead of pills.
- Use cards only when the content truly needs containment.
- Prefer section composition, typography, and image treatment over decorative UI objects.
- Every template must have a different header treatment.
- Every template must have a different hero mechanic.
- Every template must have a different section cadence.
- At least half the templates should be comfortable with text density.
- At least half should rely on strong image or graphic composition.

## Recommended Build Order

1. `corporate-investment`
2. `industrial-services`
3. `luxury-product-launch`
4. `presentation-microsite`
5. `calculator-explainer`
6. `consultancy`
7. `saas-marketing`
8. `photography-portfolio`
9. `startup-brochure`
10. `event-launch`

## Success Criteria

- All 10 templates are clearly different at first glance.
- None rely on pills or startup-template shorthand.
- Each template has a believable use case and coherent page system.
- Each template can be deployed directly to GitHub Pages.
- Each template can become a client site with only content, asset, and palette swaps.
- The template family feels like a disciplined studio system, not a random folder of experiments.
