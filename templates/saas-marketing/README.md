# SignalStack

A software marketing template that puts product UI, workflow clarity, and proof structure ahead of the usual startup chrome.

## Pages

- `index.html`
- `product.html`
- `pricing.html`
- `company.html`
- `demo.html`

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
node ../e2e/forced-browser-review.mjs --config ../e2e/configs/saas-marketing.json
```

## Deployment

This template is GitHub Pages ready and uses relative paths so it can publish from a project subpath.
