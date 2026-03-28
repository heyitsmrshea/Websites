# Validation Criteria

Validation is not optional. A template automatically fails unless all criteria below pass.

## Required Per Template

- The template directory exists.
- `index.html` exists.
- Every page listed in the matching E2E config exists.
- `styles.css` exists.
- `script.js` exists.
- `assets/` exists.
- `README.md` exists.
- `.nojekyll` exists.
- `.github/workflows/deploy-pages.yml` exists.

## Required Browser Review Outputs

- `review/<template>/manifest.md` exists.
- `review/<template>/summary.json` exists.
- A desktop full-page screenshot exists for every page.
- A mobile full-page screenshot exists for every page.
- A desktop per-image screenshot exists for every required review image.
- A mobile per-image screenshot exists for every required review image.
- The screenshot count exactly matches the config-defined expectation.

## Required Review Coverage

- Every page must have `data-review-page`.
- Every required section from the config must exist in the real page.
- Every required review-image role from the config must exist in the real page.
- Every meaningful visual asset must be tagged with `data-review-image`.
- The forced browser review must pass in Chromium.

## Automatic Design Failure Conditions

- Any use of `pill` naming in HTML, CSS, or JS.
- Any use of `rounded-full`.
- Any extreme border radius shortcut such as `9999px`, `999px`, `100vmax`, or `50%` on UI controls intended to create pill shapes.
- Any missing page-level or image-level screenshot coverage.
- Any broken review manifest or malformed summary JSON.

## Completion Rule

A template is only valid if:

1. The forced browser review passes.
2. The validation criteria script passes.
3. No banned pill patterns are present.
4. Screenshot coverage matches the exact expected count.

If any one of these fails, the template fails.
