# RoadRunner Secure — Redesign Handoff

**For:** the next engineer picking this up
**Date:** 2026-07-06
**Status:** Redesign phases 0–5 complete and committed locally. **Not pushed, not deployed.** Phase 6 (full QA + deploy) remains.
**Design codename:** CASEFILE (see `REDESIGN_PLAN.md` for the full creative brief and rationale)

---

## 1. TL;DR — where things stand

The RoadRunner Secure marketing site (`roadrunnersecure.com`, 8 routes) has been fully redesigned from a flat dark-SaaS look into an editorial "forensic casefile" system. The old 2,131-line single-file generator was refactored into small modules. Everything still builds with the **same one command** and deploys through the **same unchanged pipeline**.

- **6 commits on `main`, all local — nothing pushed yet.** Push triggers a live deploy (see §7), so that's the next deliberate step after QA.
- The build is green; every page renders. The four "signature moments" work in-browser (verified with Playwright screenshots).
- **Remaining work is Phase 6:** the full QA matrix (breakpoints, cross-browser, Lighthouse, keyboard, reduced-motion sweep), fix whatever it turns up, then push to deploy.

---

## 2. Git state

- **Repo:** `https://github.com/heyitsmrshea/Websites.git` (the site lives in the `RoadRunner/` subfolder of this monorepo)
- **Branch:** `main`
- **Local commits, oldest→newest (none pushed):**
  | SHA | Phase | What |
  |---|---|---|
  | `6669f9b` | P0 | CASEFILE foundation — modular generator, type system, atmosphere, all routes rebuilt |
  | `2459ebb` | P1 | Synthetic exhibits, OG cards, favicon set |
  | `b32a1b0` | P2 | Home signature moments — hero replay, the Loop, brand swap |
  | `3ac6f80` | P3 | Walkthrough casefile — chapter ignition + paper report fold |
  | `6301978` | P4 | Spear-page moments — AD edge cut + Secure Score shatter |
  | `e3ac9f0` | P5 | Paper-page polish + directional flow pipelines |

### ⚠️ Critical repo-hygiene warning
The parent `Websites` repo has **~715 unrelated pending deletions** under `templates/` and a modified root `README.md` that are **not part of this work**. **Never run `git add -A` / `git add .` in this repo.** Always stage explicitly:
```bash
git add RoadRunner/
```
All six commits above were staged this way and contain only `RoadRunner/` changes. Verify with `git show --stat <sha>` if in doubt.

---

## 3. How to build, preview, deploy

Nothing here changed from before the redesign — same contract.

```bash
cd RoadRunner
node build-site.mjs          # regenerates every HTML file, styles.css, script.js, robots, sitemap, logo SVGs
python3 -m http.server 5181 --bind 127.0.0.1   # preview at http://127.0.0.1:5181/
```

- **Zero dependencies.** Pure Node, no npm install, no build tools.
- **Output goes in place** — the generator writes into the `RoadRunner/` directory root, which is what gets served.
- The generated files (`index.html`, `platform/index.html`, `styles.css`, `script.js`, `*.dc.html`, `robots.txt`, `sitemap.xml`, `404.html`, and the four `assets/roadrunner-*.svg` logo variants) **are committed** — the deploy serves them statically; it does not run the generator. **So you must run `node build-site.mjs` and commit the output after any source change.**

### Deploy
`.github/workflows/deploy-pages.yml` (at the monorepo root) uploads the `RoadRunner/` directory to **GitHub Pages** on every push to `main`. So: **`git push` = deploy.** There is no separate build step in CI. Cloudflare Pages settings (root `RoadRunner`, build `node build-site.mjs`, output `.`) are documented in `README.md` as an alternative host and remain valid.

---

## 4. Architecture — the modular generator

`build-site.mjs` is now a ~90-line orchestrator that imports modules from `site/` and writes files. **All content and styling lives in `site/`.**

```
RoadRunner/
├── build-site.mjs            # entry point (unchanged command; now imports modules)
├── site/
│   ├── meta.mjs              # brand info, nav items, per-page metadata (title/desc/h1/lead/CTAs/og key)
│   │                         #   ← SEO contract (titles/descriptions/URLs) lives here, preserved from old build
│   ├── shell.mjs             # <head>, header, hero, footer, 404, legacy redirects, robots, sitemap, JSON-LD
│   ├── helpers.mjs           # shared HTML builders: sectionHead, rail, table, exhibit, stamp, ledger,
│   │                         #   findingArtifact, termBlock, contactSection, the `findings` data objects
│   ├── visuals.mjs           # hero panels + SVG builders (run panel, pipeline, attack graph, matrix, etc.)
│   ├── js.mjs                # ALL client JS → concatenated into /script.js (vanilla, ~13KB)
│   ├── css/
│   │   ├── tokens.mjs        # :root design tokens (colors, type scale, spacing, motion)
│   │   ├── base.mjs          # reset, fonts, typography voices, atmosphere (grain/grid), header, footer
│   │   ├── components.mjs    # exhibits, stamps, ledgers, terminal, paper, tables, forms, run panels
│   │   ├── sections.mjs      # page-specific layouts (manifesto, loop, chapters, report fold, gauge, 404)
│   │   ├── moments.mjs       # the 3 Home signature-moment styles (hero replay, Loop, brand swap)
│   │   └── motion.mjs        # reveal grammar, keyframes, reduced-motion overrides (LAST so it can override)
│   └── pages/
│       ├── home.mjs          # thesis → the Loop → product proof → brand swap → positioning memo → contact
│       ├── platform.mjs      # architecture flow, source coverage, lifecycle, role views
│       ├── onprem.mjs        # attack graph (edge cut), the finding, collector rules, terminal, path closure
│       ├── microsoft.mjs     # coverage, the finding, Secure Score shatter, permissions
│       ├── pricing.mjs       # paper SOW artifact, commercial models, pricing inputs, boundary
│       ├── security.mjs      # trust ledger, paper access manifest, data handling, boundaries, maturity
│       ├── demo.mjs          # scenario flow, 3 casefile chapters, combined finding, paper report fold
│       └── contact.mjs       # two conversations, next-steps rail, intake form
├── shots/                    # screenshot MOCK SOURCES (see §6) — deployed but noindexed via robots
├── assets/
│   ├── fonts/                # self-hosted Newsreader + Inter (variable woff2, latin subset)
│   ├── img/                  # exhibit screenshots (webp + png fallback)
│   ├── og/                   # per-page Open Graph cards (jpg, 1200×630)
│   ├── apple-touch-icon.png, favicon-16/32.png   # generated favicon set
│   └── roadrunner-*.svg      # logo variants (generated by build-site.mjs from roadrunner-logo.svg)
├── refs/                     # OLD Polaris screenshots — RETIRED from the site, kept only as reference
└── REDESIGN_PLAN.md          # the full creative brief (design direction, moments, page specs, budgets)
```

**CSS assembly order** (in `build-site.mjs`): `tokens → base → components → sections → moments → motion`. Motion is last so its reduced-motion rules and reveal states override everything. If you add a CSS module, respect this order.

**To edit a page's content:** edit its `site/pages/*.mjs`, run `node build-site.mjs`, refresh. To change design tokens (color, type), edit `site/css/tokens.mjs`.

---

## 5. Design system — CASEFILE

Full rationale in `REDESIGN_PLAN.md §4`. The short version:

- **Two materials:** the dark **ops surface** (where evidence streams and graphs live) and the warm **paper report** (the signed deliverable — positioning memo, pilot SOW, access manifest, the weekly report). Paper sections use `.paper` and deliberately look like a different physical object.
- **Semantic color arc:** exposure = **rose** (`--rose`), work-in-motion = **amber**, verified closure = **green**, brand/system = **teal**. Color follows the story, it's not decorative. Section tints (`.tinted .tint-rose/-amber/-green/-teal`) shift a section's emotional temperature.
- **Three type voices:** **Newsreader** (serif, editorial — headlines, emotional emphasis via italics), **Inter** (product/body/UI), **system monospace** (machine truth — run IDs, hashes, evidence, eyebrows). Both custom fonts are self-hosted variable woff2, latin-subset, preloaded, `font-display: swap`.
- **Reveal grammar:** elements with `.rv` / `.rv-scale` fade+rise in on scroll via IntersectionObserver. There's a **safety net** (`js.mjs`, ~2.6s timeout) that force-reveals everything if the observer never fires — reveal is enhancement, never a gate. Full-page screenshot tooling adds `html.qa-shot` + force-reveals (see the QA snippet in §8).
- **Reduced motion:** every animation has a `prefers-reduced-motion` static end-state. This is load-bearing — keep it working when you touch motion.

---

## 6. Asset pipeline (`shots/` → `assets/`)

The old `refs/polaris-*.png` screenshots were uneven quality (one blurred by a modal). They're **retired from the site** (kept in `refs/` only as reference). New product exhibits are **authored as self-contained HTML mock pages** in `shots/`, then screenshotted.

**The mock sources** (`shots/`, styled by `shots/polaris.css`):
- `exec.html` — executive posture dashboard (gauge, KPIs, what-changed, coverage/honesty)
- `queue.html` — the work queue (72h / 2-week lanes, owners)
- `attack.html` — AD attack-path graph with ignited path + collector command
- `vciso.html` — AI vCISO answering with cited findings/sources
- `portal.html` — white-label client portal, re-skins via `?brand=polaris|meridian|roadrunner`
- `report.html` — the paper weekly report (used in the walkthrough finale fold)
- `og.html` — OG card template (`?t=&i=&k=` params; **uses `textContent` only** — do not switch to innerHTML, a security hook blocks it and it'd be a real DOM-XSS since `shots/` is deployed)
- `favicon.html` — favicon tile source

**Regenerating exhibits/OG/favicons:** they were captured with Playwright at 2× and converted:
```bash
# WebP (exhibits):  cwebp -q 88 -m 6 -sharp_yuv exhibit-X.png -o exhibit-X.webp
# OG cards:          sips -s format jpeg -s formatOptions 82 ...
# favicons:          sips -z 32 32 apple-touch-icon.png --out favicon-32.png  (and 16)
```
The exact capture script is in the session history; the current committed assets are final. Every exhibit is served as `<picture>` with WebP + PNG fallback (see `exhibit()` in `helpers.mjs`) and all are <85KB. Per-page OG images are wired in `shell.mjs` via each page's `og` key in `meta.mjs`.

---

## 7. The four (well, six) signature moments — how they work

All are in `site/js.mjs` with styles in `moments.mjs`/`sections.mjs`. All degrade to complete static states.

1. **Hero run replay** (`[data-replay]`, Home hero) — the weekly-run panel replays on a 9s loop: a scanline sweeps top-to-bottom, feed rows re-stagger, the `VERIFIED CLOSED` stamp slams. Pauses off-screen and under reduced-motion.
2. **The Loop** (`[data-loop]`, Home) — scroll-pinned 5-stage pipeline (Evidence→Finding→Queue→Fix→Prove). A sticky card shows **one finding traveling** the stages as you scroll; the ambient tint and card color walk rose→amber→green. IntersectionObserver-driven (works in Safari, no scroll-timeline dependency). Reduced-motion: all stages readable, card rests on closure.
3. **Brand swap** (`[data-brandswap]`, Home) — RoadRunner/Polaris/Meridian toggle re-skins a **live mini client-portal** (not a screenshot) via CSS variables + `textContent` swaps.
4. **Chapter ignition** (`.chapter`, Walkthrough) — the big outlined chapter numbers fill teal as you scroll to each.
5. **The edge cut** (`[data-edgecut]`, On-Prem) — the AD graph shows the ignited svc-build→Tier-0 path, then on scroll the offending edge is **cut**: red X slams in, downstream dims to ash, tag flips green to `PATH SEVERED`. Reduced-motion leaves the ignited path standing (the exposure); the fix is explained in text below.
6. **Secure Score shatter** (`[data-gauge]`, Microsoft) — the gauge draws its arc + counts up, then dims to context (scaled/desaturated) while the ranked named-work list cascades in. Plus the **paper report fold** (`.fold`, Walkthrough finale) — the ops surface hands off to the paper weekly report in 3D perspective with a `RUN VERIFIED` stamp.

---

## 8. Phase 6 — what remains (the actual to-do list)

None of this is started. This is the next engineer's job.

### 8a. Verify the one unconfirmed animation
The **flow-pipeline animation** (P5: the `.flow` step reveal + progress line on Platform's architecture section and Demo's scenario) is **coded and the built HTML is correct** (confirmed the served file contains `data-flow` via `curl`), but final in-browser confirmation was blocked by a Playwright page-cache artifact (the browser kept serving a pre-P5 cached copy). **Re-verify with a hard reload / fresh browser context.** If it doesn't animate, check that `[data-flow].flowed` is being added by the IntersectionObserver in `js.mjs` and that `styles.css` includes the `flow-progress` / `flow-step-in` rules (it does as of `e3ac9f0`).

### 8b. Full QA matrix (from `REDESIGN_PLAN.md §10`)
- **Visual/responsive:** all 8 pages + 404 at **320 / 390 / 768 / 1024 / 1440 / 1920**, in both motion and reduced-motion. Verify **no horizontal overflow** anywhere (there's a per-element overflow probe pattern used in earlier phases — a Playwright `evaluate` that flags any element wider than the viewport).
- **Cross-browser:** Chrome, **Safari** (verify the IO fallbacks for the Loop and edge cut), Firefox.
- **Lighthouse ≥ 95** perf/a11y/SEO on Home, On-Prem, Walkthrough (mobile).
- **Keyboard-only pass** on every page; skip link; visible focus. The brand-swap buttons and tabs have ARIA already — confirm they're operable.
- **Link/route audit:** all legacy `*.dc.html` redirects still land (they're generated); sitemap URLs 200; `CNAME` untouched (still `roadrunnersecure.com`).
- **Honesty audit:** every synthetic surface is labeled (it is — "SYNTHETIC FIXTURE", "fictional"); no invented customer logos/testimonials/compliance claims.

**QA screenshot snippet** (forces all reveals for full-page capture):
```js
await page.evaluate(() => {
  document.documentElement.classList.add("qa-shot");
  document.querySelectorAll(".rv, .rv-scale").forEach(el => el.classList.add("in"));
  document.querySelectorAll(".stamp.will-slam").forEach(el => el.classList.add("slam"));
});
```

### 8c. Ship it
After QA passes and fixes are committed (`git add RoadRunner/` only!):
```bash
git push origin main      # ← this deploys to GitHub Pages automatically
```
Then smoke-test the live site: `/`, `/demo/`, `/on-prem-attack-paths/`, a legacy redirect (`/Platform.dc.html` → `/platform/`), `/404.html`, and confirm `CNAME`/custom domain still resolves.

---

## 9. Guardrails (don't break these)

- **Never `git add -A`** in this repo (see §2).
- **Don't reintroduce a parallel resume/report renderer** — not relevant here, but the product-truth rule from the parent project applies to copy: RoadRunner is **read-only, no auto-remediation, honesty-first**. Keep synthetic data labeled; don't invent customers, logos, testimonials, or compliance certifications.
- **Preserve the SEO contract:** page titles/descriptions/URLs in `meta.mjs` match the old build. Legacy `*.dc.html` redirects and `robots.txt` disallows must keep generating. Don't rename routes.
- **Keep the zero-dependency, one-command build.** No npm, no bundler. If you need a new asset, generate it into `assets/` and commit it.
- **Keep reduced-motion and no-JS fallbacks working** whenever you touch motion or a signature moment.
- **`textContent` only** in `shots/` templates and anywhere query params or dynamic values hit the DOM (a PreToolUse security hook enforces this; it also caught a real issue during the build).
- **Page-weight budgets** (microsite class, from the plan): JS <20KB gz, CSS <30KB gz, each exhibit <150KB. Current raw: `styles.css` 60KB / `script.js` 13KB (both compress well under budget gzipped, but re-check after changes).

---

## 10. Quick reference

| Thing | Value |
|---|---|
| Preview | `cd RoadRunner && node build-site.mjs && python3 -m http.server 5181 --bind 127.0.0.1` |
| Routes | `/`, `/platform/`, `/on-prem-attack-paths/`, `/microsoft-security/`, `/pricing/`, `/security/`, `/demo/`, `/contact/`, `/404.html` |
| Deploy | push to `main` → GitHub Pages (`.github/workflows/deploy-pages.yml`, path `RoadRunner`) |
| Domain | `roadrunnersecure.com` (via `CNAME`) |
| Fonts | Newsreader (serif), Inter (body), system mono — self-hosted in `assets/fonts/` |
| Creative brief | `REDESIGN_PLAN.md` |
| This doc | `HANDOFF.md` |
