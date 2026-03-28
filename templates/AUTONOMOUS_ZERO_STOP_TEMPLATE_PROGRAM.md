# Autonomous Zero-Stop Template Program

## Mission

Build all 10 website templates end-to-end under `/Users/andrewshea/Desktop/Websites/templates/` and stop for absolutely nothing except hard technical impossibility. Do not ask for aesthetic approval, partial review, or checkpoints. Keep building, reviewing, correcting, and re-running browser validation until every template is production-ready.

## Operating Posture

- You are not brainstorming.
- You are not drafting.
- You are not waiting for permission after each template.
- You are shipping a full template system.
- If something is weak, fix it.
- If browser review fails, fix it.
- If a page feels underdesigned, redesign it.
- If a layout collapses on mobile, rebuild it.
- If an image is awkwardly cropped, correct the composition.
- If a template looks generic, push it further until it feels authored.

## Absolute Constraints

- Do not use pill-shaped UI.
- Do not use rounded-full buttons, rounded badges, rounded chips, rounded filter controls, or rounded stat modules.
- Do not repeat the same hero composition across templates.
- Do not repeat the same nav treatment across templates.
- Do not fall back to generic startup layouts.
- Do not stop at “good enough.”
- Do not leave placeholder junk copy.
- Do not skip browser review.
- Do not skip image review.
- Do not declare completion unless every template passes desktop and mobile review.

## Required Output

Create these 10 template directories:

- `/Users/andrewshea/Desktop/Websites/templates/corporate-investment`
- `/Users/andrewshea/Desktop/Websites/templates/industrial-services`
- `/Users/andrewshea/Desktop/Websites/templates/luxury-product-launch`
- `/Users/andrewshea/Desktop/Websites/templates/photography-portfolio`
- `/Users/andrewshea/Desktop/Websites/templates/consultancy`
- `/Users/andrewshea/Desktop/Websites/templates/saas-marketing`
- `/Users/andrewshea/Desktop/Websites/templates/startup-brochure`
- `/Users/andrewshea/Desktop/Websites/templates/event-launch`
- `/Users/andrewshea/Desktop/Websites/templates/presentation-microsite`
- `/Users/andrewshea/Desktop/Websites/templates/calculator-explainer`

Every template must include:

- `index.html`
- any required secondary HTML pages
- `styles.css`
- `script.js`
- `assets/`
- `README.md`
- `.nojekyll`
- `.github/workflows/deploy-pages.yml`

## Source Documents

Use these files as binding source material:

- `/Users/andrewshea/Desktop/Websites/templates/AUTONOMOUS_TEMPLATE_BUILD_SCRIPT.md`
- `/Users/andrewshea/Desktop/Websites/templates/TEMPLATE_E2E_EXECUTION_PLAN.md`
- `/Users/andrewshea/Desktop/Websites/templates/e2e/configs/corporate-investment.json`
- `/Users/andrewshea/Desktop/Websites/templates/e2e/configs/industrial-services.json`
- `/Users/andrewshea/Desktop/Websites/templates/e2e/configs/luxury-product-launch.json`
- `/Users/andrewshea/Desktop/Websites/templates/e2e/configs/photography-portfolio.json`
- `/Users/andrewshea/Desktop/Websites/templates/e2e/configs/consultancy.json`
- `/Users/andrewshea/Desktop/Websites/templates/e2e/configs/saas-marketing.json`
- `/Users/andrewshea/Desktop/Websites/templates/e2e/configs/startup-brochure.json`
- `/Users/andrewshea/Desktop/Websites/templates/e2e/configs/event-launch.json`
- `/Users/andrewshea/Desktop/Websites/templates/e2e/configs/presentation-microsite.json`
- `/Users/andrewshea/Desktop/Websites/templates/e2e/configs/calculator-explainer.json`
- `/Users/andrewshea/Desktop/Websites/templates/e2e/forced-browser-review.mjs`

## Execution Order

Build in this order:

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

## Per-Template Build Loop

For each template, do this exact loop:

1. Create the folder structure.
2. Create all required pages from the matching E2E config.
3. Add `data-review-page` to every page body.
4. Add `data-review-section` to every required section.
5. Add `data-review-image` to every meaningful visual.
6. Build a fully authored homepage.
7. Build every secondary page to the same quality bar.
8. Add realistic copy and believable placeholder assets if final assets do not exist.
9. Add GitHub Pages deployment workflow.
10. Open the site in browser.
11. Review every page on desktop.
12. Review every page on mobile.
13. Review every required image individually on desktop.
14. Review every required image individually on mobile.
15. Run the E2E review script.
16. If it fails, fix the site and rerun it.
17. If the review passes but the site still looks generic, improve it and rerun the review.
18. Do not move to the next template until the current one is genuinely finished.

## Browser Review Command

Run this exact review command for each template:

```bash
node /Users/andrewshea/Desktop/Websites/templates/e2e/forced-browser-review.mjs \
  --config /Users/andrewshea/Desktop/Websites/templates/e2e/configs/<template>.json
```

Optional visible review:

```bash
node /Users/andrewshea/Desktop/Websites/templates/e2e/forced-browser-review.mjs \
  --config /Users/andrewshea/Desktop/Websites/templates/e2e/configs/<template>.json \
  --headed
```

## Completion Gate Per Template

A template is complete only when all of the following are true:

- every required page exists
- every required section exists
- every required review image role exists
- the browser review script passes on desktop and mobile
- full-page screenshots exist
- per-image screenshots exist
- the design is clearly distinct from the other templates
- the design contains no pills
- the mobile view feels authored
- the README explains purpose, pages, usage, and deployment

## Global Completion Gate

The system is complete only when all 10 templates meet all per-template completion gates.

At the end, verify:

- all 10 template folders exist
- all 10 E2E configs pass
- all review manifests exist
- all review summaries exist
- every template is visually distinct at first glance
- none of the templates use pills

## Design Discipline By Template

### Corporate Investment

- quiet, editorial, institutional
- serif authority, restrained sans body
- dense but controlled information
- no gimmicks

### Industrial Services

- mechanical, exact, composed
- hard-edged diagrams and facility imagery
- real operational confidence

### Luxury Product Launch

- dark, tactile, pressure-driven
- image-led and expensive
- no ecommerce-template shortcuts

### Photography Portfolio

- gallery-first and sparse
- image rhythm matters more than widgets
- captions and project pacing must feel curated

### Consultancy

- text-led and premium
- strong argument structure
- spare but confident

### SaaS Marketing

- product-first, not startup-generic
- interface compositions must be authored
- no purple drift

### Startup Brochure

- minimal but not generic
- one recurring visual motif
- fast-launch credibility

### Event Launch

- poster-like and campaign-driven
- bold date and lineup treatment
- must feel urgent

### Presentation Microsite

- slide-driven and cinematic
- every slide composed with intent
- works as a deck, not a fake webpage

### Calculator Explainer

- analytical and persuasive
- tables and outputs designed, not default
- strong hierarchy and readable results

## Failure Protocol

If any of these happen, do not ask for guidance. Fix them:

- broken layout
- weak spacing
- bad crop
- unreadable type
- generic section composition
- missing page
- missing image role
- E2E failure
- underdesigned mobile layout
- inconsistent navigation
- empty-feeling section
- overused cards
- accidental pills

## Final State

Only conclude when:

- all templates are implemented
- all templates are reviewed in browser
- all templates pass the forced browser review
- all templates are deployable to GitHub Pages
- all templates are visibly production-grade

No partial completion. No “next step” handoff. Finish the system.
