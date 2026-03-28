# Merit Advisory

A consultancy template that prioritizes argument, proof, and a premium reading experience over bloated agency-site patterns.

## Pages

- `index.html`
- `services.html`
- `work.html`
- `about.html`
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
node ../e2e/forced-browser-review.mjs --config ../e2e/configs/consultancy.json
```

## Deployment

This template is GitHub Pages ready and uses relative paths so it can publish from a project subpath.
