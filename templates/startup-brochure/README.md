# Foundry Labs

A compact brochure template with disciplined spacing, clear positioning, and enough personality to avoid the usual interchangeable startup landing page.

## Pages

- `index.html`
- `about.html`
- `services.html`
- `contact.html`

## Included Files

- `styles.css`
- `script.js`
- `assets/`
- `.github/workflows/deploy-pages.yml`

## Local Preview

```bash
python3 -m http.server 4321
```

Then open `http://127.0.0.1:4321`.

## Browser Review

```bash
node ../e2e/forced-browser-review.mjs --config ../e2e/configs/startup-brochure.json
```

## Deployment

This template is GitHub Pages ready and uses relative paths so it can publish from a project subpath.
