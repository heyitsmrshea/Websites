# Websites

Single-repository GitHub Pages deployment for the template library in [templates](/Users/andrewshea/Desktop/Websites/templates).

## Published Structure

- `templates/index.html` is the landing page.
- `templates/<template-name>/` contains each of the 10 live starter sites.
- `templates/review/` contains the captured page screenshots.
- `templates/review-criteria/` contains the per-screenshot criteria reports and master summary.

## Local Commands

```bash
cd templates
npm install
./run-autonomous-finish-loop.sh
```

## Deployment

The repository-level GitHub Actions workflow publishes the `templates/` directory to GitHub Pages.
