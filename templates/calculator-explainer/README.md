# Margin Modeler

A calculator template for pricing, scenario comparison, and recommendation framing that treats information design as a first-class design problem.

## Pages

- `index.html`

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
node ../e2e/forced-browser-review.mjs --config ../e2e/configs/calculator-explainer.json
```

## Deployment

This template is GitHub Pages ready and uses relative paths so it can publish from a project subpath.
