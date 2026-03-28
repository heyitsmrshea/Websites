# Template E2E Execution Plan

## Goal

Define the exact browser-review contract for all 10 templates before implementation starts. The system must force page-by-page and image-by-image review in a real browser, capture evidence, and fail when a page, image, or required visual role is missing.

## Review Contract

Every template must implement these attributes:

- `data-review-page="slug"` on the `<body>` of every page
- `data-review-section="name"` on every major section that must be checked
- `data-review-image="role"` on every meaningful visual asset

Meaningful visual assets include:

- `<img>`
- `<picture> img`
- `<video poster>`
- elements using `background-image`
- diagrams, charts, or artwork blocks that are key to the page

## Hard Rules

- The E2E script must open every page in Chromium.
- The E2E script must evaluate every page on desktop and mobile.
- The E2E script must capture a full-page screenshot for every page on both devices.
- The E2E script must capture every `data-review-image` element on both devices.
- The E2E script must fail if any visual asset exists without `data-review-image`.
- The E2E script must fail if any required page is missing.
- The E2E script must fail if any required section is missing.
- The E2E script must fail if any required review-image role is missing.
- The E2E script must write a review manifest and summary report.

## Review Flow

For each template:

1. Start a local server for the template directory.
2. Open every page in Chromium desktop.
3. Verify `data-review-page`.
4. Verify all required sections.
5. Enumerate all review images and all other visual assets.
6. Fail if any real visual lacks `data-review-image`.
7. Capture the full page.
8. Scroll each review image into view and capture it individually.
9. Repeat the full process on mobile.
10. Write a machine-readable summary and a human-readable manifest.

## Required Artifacts

For every template run:

- `review/<template>/summary.json`
- `review/<template>/manifest.md`
- `review/<template>/<page>-desktop-full.png`
- `review/<template>/<page>-mobile-full.png`
- `review/<template>/<page>-desktop-<role>.png`
- `review/<template>/<page>-mobile-<role>.png`

## Template 01: Corporate Investment

**Slug**

`corporate-investment`

**Page Inventory**

- `index.html`
- `firm.html`
- `strategy.html`
- `transactions.html`
- `leadership.html`
- `contact.html`
- `privacy.html`
- `terms.html`

**Required Sections**

- `index.html`: `hero`, `snapshot`, `thesis`, `model`, `transactions-preview`, `leadership-preview`, `contact-cta`
- `firm.html`: `hero`, `positioning`, `history`, `operating-principles`, `team`
- `strategy.html`: `hero`, `mandate`, `sectors`, `value-creation`, `criteria`
- `transactions.html`: `hero`, `featured-transactions`, `table`, `approach`
- `leadership.html`: `hero`, `leaders`, `advisors`, `contact-cta`
- `contact.html`: `hero`, `contact-details`, `inquiry`
- `privacy.html`: `hero`, `policy`
- `terms.html`: `hero`, `terms`

**Required Review Images**

- `index.html`: `hero-frame`, `snapshot-graphic`, `thesis-diagram`, `transaction-01`, `transaction-02`, `leadership-group`
- `firm.html`: `hero-frame`, `timeline-graphic`, `team-portrait`
- `strategy.html`: `hero-frame`, `sector-map`, `value-creation-diagram`
- `transactions.html`: `hero-frame`, `transaction-01`, `transaction-02`, `transaction-03`, `table-frame`
- `leadership.html`: `hero-frame`, `leader-01`, `leader-02`, `leader-03`
- `contact.html`: `hero-frame`, `office-frame`
- `privacy.html`: none required beyond full-page review
- `terms.html`: none required beyond full-page review

**Pass Criteria**

- Dense pages remain readable at desktop and mobile.
- Tables are clipped nowhere.
- Leadership portraits align consistently.
- No page feels empty or under-art-directed.

## Template 02: Industrial Services

**Slug**

`industrial-services`

**Page Inventory**

- `index.html`
- `services.html`
- `capabilities.html`
- `ownership.html`
- `about.html`
- `contact.html`

**Required Sections**

- `index.html`: `hero`, `service-pillars`, `facility`, `process`, `proof`, `contact-cta`
- `services.html`: `hero`, `service-grid`, `response`, `coverage`
- `capabilities.html`: `hero`, `systems`, `equipment`, `certifications`, `facility`
- `ownership.html`: `hero`, `owners`, `departments`, `culture`
- `about.html`: `hero`, `story`, `values`, `standards`
- `contact.html`: `hero`, `request`, `location`

**Required Review Images**

- `index.html`: `hero-frame`, `service-01`, `service-02`, `facility-diagram`, `proof-image`
- `services.html`: `hero-frame`, `service-01`, `service-02`, `service-03`
- `capabilities.html`: `hero-frame`, `systems-diagram`, `equipment-01`, `equipment-02`, `facility-frame`
- `ownership.html`: `hero-frame`, `owner-portrait`, `team-floor`
- `about.html`: `hero-frame`, `story-image`, `values-image`
- `contact.html`: `hero-frame`, `location-map`

**Pass Criteria**

- All technical diagrams stay legible.
- Asymmetric hero framing survives mobile collapse.
- Equipment and facility imagery feels intentional, not decorative filler.

## Template 03: Luxury Product Launch

**Slug**

`luxury-product-launch`

**Page Inventory**

- `index.html`
- `product.html`
- `story.html`
- `inquiry.html`

**Required Sections**

- `index.html`: `hero`, `highlights`, `craft`, `gallery`, `inquiry-cta`
- `product.html`: `hero`, `specs`, `detail-gallery`, `edition-note`, `ownership`
- `story.html`: `hero`, `origin`, `materials`, `process`, `closing`
- `inquiry.html`: `hero`, `inquiry`, `availability`

**Required Review Images**

- `index.html`: `hero-primary`, `hero-secondary`, `product-detail-01`, `product-detail-02`, `gallery-01`, `gallery-02`
- `product.html`: `hero-primary`, `spec-frame`, `detail-01`, `detail-02`, `detail-03`, `detail-04`
- `story.html`: `hero-primary`, `materials-frame`, `process-frame`, `craft-image`
- `inquiry.html`: `hero-primary`, `ownership-frame`

**Pass Criteria**

- Product crops feel expensive on both devices.
- The hero is dominant without causing clipping.
- Inquiry page still feels designed, not like a plain form stub.

## Template 04: Photography Portfolio

**Slug**

`photography-portfolio`

**Page Inventory**

- `index.html`
- `portfolio.html`
- `project-editorial.html`
- `about.html`
- `contact.html`

**Required Sections**

- `index.html`: `hero`, `selected-work`, `artist-note`, `clients`, `inquiry`
- `portfolio.html`: `hero`, `project-list`
- `project-editorial.html`: `hero`, `gallery-a`, `gallery-b`, `captions`, `closing`
- `about.html`: `hero`, `bio`, `press`
- `contact.html`: `hero`, `inquiry`

**Required Review Images**

- `index.html`: `hero-image`, `project-01`, `project-02`, `project-03`, `project-04`
- `portfolio.html`: `thumb-01`, `thumb-02`, `thumb-03`, `thumb-04`, `thumb-05`, `thumb-06`
- `project-editorial.html`: `hero-image`, `gallery-01`, `gallery-02`, `gallery-03`, `gallery-04`, `gallery-05`, `gallery-06`
- `about.html`: `portrait`, `studio-image`
- `contact.html`: `portrait`

**Pass Criteria**

- No gallery image is awkwardly cropped.
- Project rhythm still works on mobile.
- Caption spacing and image pacing feel curated.

## Template 05: Consultancy

**Slug**

`consultancy`

**Page Inventory**

- `index.html`
- `services.html`
- `work.html`
- `about.html`
- `contact.html`

**Required Sections**

- `index.html`: `hero`, `offer`, `proof`, `engagement-model`, `bio`, `contact-cta`
- `services.html`: `hero`, `services`, `approach`, `faq`
- `work.html`: `hero`, `case-studies`, `outcomes`
- `about.html`: `hero`, `bio`, `principles`
- `contact.html`: `hero`, `contact`

**Required Review Images**

- `index.html`: `hero-frame`, `proof-graphic`
- `services.html`: `hero-frame`
- `work.html`: `case-study-01`, `case-study-02`, `case-study-03`
- `about.html`: `portrait`
- `contact.html`: `portrait`

**Pass Criteria**

- Text-heavy pages still feel shaped and premium.
- Proof graphics are legible and not token decoration.
- Sparse pages do not feel unfinished.

## Template 06: SaaS Marketing

**Slug**

`saas-marketing`

**Page Inventory**

- `index.html`
- `product.html`
- `pricing.html`
- `company.html`
- `demo.html`

**Required Sections**

- `index.html`: `hero`, `feature-architecture`, `proof`, `workflow`, `pricing-preview`, `demo-cta`
- `product.html`: `hero`, `feature-deep-dive`, `integrations`, `security`, `ui-gallery`
- `pricing.html`: `hero`, `plans`, `comparison`, `faq`
- `company.html`: `hero`, `story`, `team`, `principles`
- `demo.html`: `hero`, `request`, `expectations`

**Required Review Images**

- `index.html`: `hero-ui`, `workflow-ui`, `feature-ui-01`, `feature-ui-02`, `proof-graphic`
- `product.html`: `hero-ui`, `gallery-01`, `gallery-02`, `gallery-03`, `security-graphic`
- `pricing.html`: `comparison-frame`
- `company.html`: `team-image`, `story-image`
- `demo.html`: `hero-ui`

**Pass Criteria**

- Product UI is the hero, not generic browser chrome floating in space.
- Pricing comparison is readable on mobile.
- Accent color does not drift into purple startup cliches.

## Template 07: Startup Brochure

**Slug**

`startup-brochure`

**Page Inventory**

- `index.html`
- `about.html`
- `services.html`
- `contact.html`

**Required Sections**

- `index.html`: `hero`, `what-we-do`, `why-us`, `process`, `contact-cta`
- `about.html`: `hero`, `story`, `team`
- `services.html`: `hero`, `services`, `approach`
- `contact.html`: `hero`, `contact`

**Required Review Images**

- `index.html`: `hero-frame`, `process-graphic`
- `about.html`: `team-image`
- `services.html`: `service-graphic`
- `contact.html`: `contact-image`

**Pass Criteria**

- The template feels fast and credible, not generic.
- Empty space reads intentional.
- The single recurring visual motif is present on every page.

## Template 08: Event Launch

**Slug**

`event-launch`

**Page Inventory**

- `index.html`
- `rsvp.html`

**Required Sections**

- `index.html`: `hero`, `date-location`, `lineup`, `agenda`, `rsvp-cta`, `footer`
- `rsvp.html`: `hero`, `form`, `details`

**Required Review Images**

- `index.html`: `hero-poster`, `speaker-01`, `speaker-02`, `speaker-03`, `venue-image`
- `rsvp.html`: `hero-poster`

**Pass Criteria**

- The page reads like campaign design, not conference SaaS.
- Large date treatment survives both breakpoints.
- Speaker frames stay visually coherent.

## Template 09: Presentation Microsite

**Slug**

`presentation-microsite`

**Page Inventory**

- `index.html`

**Required Sections**

- `index.html`: `slide-01`, `slide-02`, `slide-03`, `slide-04`, `slide-05`, `slide-06`, `slide-07`, `slide-08`

**Required Review Images**

- `index.html`: `slide-01-frame`, `slide-02-frame`, `slide-03-frame`, `slide-04-frame`, `slide-05-frame`, `slide-06-frame`, `slide-07-frame`, `slide-08-frame`

**Pass Criteria**

- Every slide is captured individually in browser.
- Dense slides remain readable.
- Sparse slides still feel composed and intentional.

## Template 10: Calculator Explainer

**Slug**

`calculator-explainer`

**Page Inventory**

- `index.html`

**Required Sections**

- `index.html`: `hero`, `calculator`, `assumptions`, `outputs`, `recommendation`, `next-step`

**Required Review Images**

- `index.html`: `hero-graphic`, `calculator-frame`, `output-chart`, `comparison-table`

**Pass Criteria**

- Inputs, outputs, and table hierarchy are legible on both devices.
- The recommendation block reads as designed interpretation, not auto-generated filler.
- No analytics clutter or dashboard noise appears.

## Implementation Rule

Before any template is considered complete:

- its config must exist
- its page inventory must match reality
- its required sections must match reality
- its required review-image roles must match reality
- the E2E script must pass with no missing pages, sections, or visuals

## Execution Command

Use the script in [forced-browser-review.mjs](/Users/andrewshea/Desktop/Websites/templates/e2e/forced-browser-review.mjs) with a per-template config JSON based on [template-review-catalog.json](/Users/andrewshea/Desktop/Websites/templates/e2e/template-review-catalog.json).
