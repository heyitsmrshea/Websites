# RoadRunner Secure Marketing Site

Static deploy package for `roadrunnersecure.com`.

## Local build

```bash
node build-site.mjs
python3 -m http.server 5181 --bind 127.0.0.1
```

Open `http://127.0.0.1:5181/`.

## Production routes

- `/`
- `/platform/`
- `/on-prem-attack-paths/`
- `/microsoft-security/`
- `/pricing/`
- `/security/`
- `/demo/`
- `/contact/`

Legacy `.dc.html` files are generated as noindex redirects for old local/export links.

## Cloudflare Pages

Use these settings if deploying from the `heyitsmrshea/Websites` monorepo:

- Project root: `RoadRunner`
- Build command: `node build-site.mjs`
- Build output directory: `.`
- Production branch: `main`

Then attach:

- `roadrunnersecure.com`
- `www.roadrunnersecure.com`

The live domain is currently served by GoDaddy Website Builder. To make this version live, point DNS for `roadrunnersecure.com` and `www.roadrunnersecure.com` to the static host you choose, or replace the GoDaddy site with this static package.
