# Transit Summit

A campaign-driven event template built around bold date treatment, lineup rhythm, and a visual system that feels like design rather than conference software.

## Pages

- `index.html`
- `rsvp.html`

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
node ../e2e/forced-browser-review.mjs --config ../e2e/configs/event-launch.json
```

## Deployment

This template is GitHub Pages ready and uses relative paths so it can publish from a project subpath.
