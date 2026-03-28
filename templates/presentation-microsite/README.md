# Ledger Briefing

A full-viewport presentation template for briefings, talks, and narrative decks where slide composition matters as much as the copy.

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
node ../e2e/forced-browser-review.mjs --config ../e2e/configs/presentation-microsite.json
```

## Deployment

This template is GitHub Pages ready and uses relative paths so it can publish from a project subpath.
