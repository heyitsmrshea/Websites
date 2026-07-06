# RoadRunner Secure — Site Redesign Plan

**Codename: CASEFILE**
Date: 2026-07-06 · Scope: full redesign of `roadrunnersecure.com` (all 8 routes) · Status: PLAN — awaiting build

---

## 1. Objective

Redesign the RoadRunner Secure marketing site so it is **emotional, technical, and attractive at the same time** — pushing well past the current "competent dark SaaS" look without losing what already works (the copy voice, the honesty posture, the static zero-dependency build).

The test for every screen: *would a skeptical MSP owner screenshot this and send it to a colleague?*

## 2. Product truth (what the design must express)

- RoadRunner Secure converts **read-only evidence** (Entra, Defender, Intune, M365, Azure, on-prem AD) into **named findings → weekly remediation queue → next-run validation → verified closure**.
- Core positioning is **anti-fear and anti-dashboard**: "Most security tools tell you to be afraid. RoadRunner tells you what to fix." A finding is open until *evidence* changes — not until someone clicks done.
- **Honesty is a feature**: visible data-gap findings, "what we can't assess," synthetic-demo disclaimers.
- **White-label** for MSPs: RoadRunner owns the assessment machine; the MSP (demo brand: **Polaris**) owns the client-facing brand.
- Sold by one operator (Drew). The site must sell the walkthrough while he sleeps.

## 3. Audit of the current site

### Keep (strengths)
- **The copy voice.** "A dashboard is not a decision." / "Find the path. Cut the edge. Prove it died." / "posture without score theater" / "Dashboards report. Assessments age. RoadRunner closes." This is the best asset the site has. The redesign amplifies it; it does not rewrite it.
- The **information architecture** (8 routes) and all URLs, legacy `.dc.html` redirects, `CNAME`, `robots.txt`, `sitemap.xml`.
- The **zero-dependency generator** model (`node build-site.mjs`, output dir `.`, Cloudflare Pages-ready).
- Accessibility bones: skip link, focus-visible styles, semantic landmarks, aria-current nav.
- Teal as the product/system accent (continuity with the Polaris product UI).

### Kill list (what makes it look generic today)
1. **Flat panel soup** — every section is a thin-bordered box on near-black; no depth, overlap, or scale contrast between sections.
2. **One typographic voice** — Inter for everything; headlines have weight but no character. (IBM Plex Mono is referenced in CSS but never actually loaded.)
3. **Zero motion** — `script.js` is 31 lines of form handling. Nothing stages, reveals, or pays off.
4. **No atmosphere** — the 72px grid background is barely perceptible; sections don't shift temperature or mood.
5. **Screenshots presented apologetically** — small 3-up grid of PNGs (`refs/polaris-*.png`) with soft captions; two of the four source shots are dim/blurred (palette shot is unusable at small size).
6. **Light sections are generic** — the white "white-label / positioning" bands read as default SaaS, not as anything meaningful.
7. **The emotional arc is absent** — the product's whole story is *anxiety → clarity → verified closure*, and the page never makes you feel it.
8. No 404 page, no OG images, no per-page social cards.

## 4. Design direction — "CASEFILE: forensic editorial"

**One direction, fully committed:** the site is presented as a **live assessment casefile**. Two physical materials carry the whole design:

- **The Ops Surface (dark)** — where evidence streams, graphs ignite, and the machine runs. Deep layered blacks, teal system accents, mono evidence text, atmospheric glow.
- **The Report (paper)** — the signed deliverable. Warm paper, editorial serif, exhibit labels, stamps, hash footers. Light sections stop being "generic white band" and become *the artifact the client receives*.

The narrative every page tells: **exposure (rose) → work (amber) → verified closure (green stamp)**. Color is semantic, not decorative — the page's temperature follows the story.

**Emotional tone:** not fear (that's the competitors), but the **relief of certainty**. Calm, precise, a little cinematic. The one thing a visitor must remember: **watching a finding die** — a red attack edge cut, then a `VERIFIED CLOSED` stamp with an evidence hash.

### The three typographic voices
| Voice | Role | Face |
|---|---|---|
| **Human stakes** | Display headlines, manifesto lines, pull quotes | **Newsreader** (variable, optical sizes; test Fraunces as alternate in Phase 0) — big, editorial, with sharp italics for emotional emphasis |
| **Product** | Body, UI, nav, cards | **Inter** (kept — continuity with product screenshots) |
| **Machine truth** | Evidence, run IDs, hashes, commands, tables, eyebrows | `ui-monospace` system stack (SF Mono/Menlo/Consolas) — zero bytes, authentic |

Two loaded font families max (Newsreader + Inter, self-hosted woff2 subsets, `font-display: swap`, preload display weight only). Headlines mix voices deliberately: *"Find the path. Cut the edge. **Prove it died.**"* — last clause in serif italic.

### Palette (tokens)
```
--void-0: #04060a      /* page base */
--void-1: #080d14      /* section alt */
--panel:  #0c131c / #101a26 / #14202e   /* elevation steps */
--ink:    #f2f6f9      --soft: #b6c2cd      --muted: #6f7d8a
--teal:   #2dd4bf  (brand/system/verified-run)   --teal-hi: #7ff0e1
--rose:   #fb7185  (exposure/risk)                --rose-deep: #f43f5e
--amber:  #fbbf24  (work-in-motion)
--green:  #34d399  (verified closure — the stamp)
--paper:  #f4f0e6  (report surface)   --paper-edge: #e6dfd0   --paper-ink: #12161b
```
Atmosphere: layered radial glows (teal horizon behind hero, rose bloom behind exposure sections), ultra-subtle SVG-turbulence grain on both surfaces, grid texture that **responds** to sections (tightens/brightens near diagrams) instead of one global wallpaper.

### Surface & depth rules
- Panels get elevation via *layering and glow*, not heavier borders: overlap the hero visual across the section seam; let the paper report "sit on top of" the dark surface with real shadow.
- Corner language: 10px radius panels; **paper artifacts get 2px radius + a subtle deckle/edge line** so the two materials never look like the same component re-skinned.
- Exhibit framing: every product screenshot lives in a browser-chrome frame with a mono caption bar — `EXHIBIT A — executive posture · synthetic tenant · run RR-2026-07`.

### Motion system (meaningful, cheap, compositor-only)
- **Rule: one signature moment per page**, staged reveals elsewhere. Everything `transform`/`opacity`/`clip-path` only; scroll-driven via CSS scroll-timeline where supported, IntersectionObserver fallback; full `prefers-reduced-motion` static variants.
- Reveal grammar: mono eyebrow types on → headline rises with slight clip → panel content stacks in 40ms staggers. Used consistently; never random hovers.
- Budget: vanilla JS < 15KB total (no GSAP, no dependencies).

## 5. Signature moments (the "push the limits" list)

1. **Hero: the run replays** *(Home)* — headline is static DOM (LCP-safe); beside it the weekly-run panel actually *runs* on a ~14s loop: evidence lines tick in (mono, timestamped) → a finding materializes and gets an owner chip → validation line appears → `VERIFIED CLOSED` stamp thunks down (scale+opacity, 1 frame of overshoot) with a hash. Loop pauses off-viewport and under reduced-motion.
2. **The Loop scrollytelling** *(Home)* — a pinned 5-stage sequence (Evidence → Findings → Queue → Fix → Prove) where **one real finding travels the whole pipeline** as you scroll; the section's ambient tint walks rose → amber → green as the finding approaches closure.
3. **The edge cut** *(On-Prem)* — the AD attack-path graph ignites the shortest path to Tier 0 in rose as it enters the viewport; at the "recommended fix" step the offending edge is literally **cut** (stroke-dashoffset snap + downstream path dims to ash). Caption: "Path died on run RR-2026-08."
4. **Score theater, deconstructed** *(Microsoft)* — a big glowing Secure-Score-style gauge assembles… then **shatters into a ranked list of named work items**. "The score is context. The work is the product."
5. **The brand swap** *(Home, white-label section)* — a three-position toggle (RoadRunner ⇄ Polaris ⇄ "Your brand") that re-skins a mini client-portal mock in place via CSS variables. Instantly explains the MSP model better than any paragraph.
6. **Dark → paper fold** *(Home close + Walkthrough finale)* — the ops surface hands off to the paper report artifact (stamped, hash-footed, exhibit-numbered): *this is what your client actually receives.*

## 6. Page-by-page spec

Every page keeps its URL, title/description (light copy polish allowed), and primary/secondary CTAs unless noted.

### 6.1 Home `/` — the emotional arc
**Remember:** the finding that died in the hero.
1. Hero — "A dashboard is not a decision." (serif italic on *decision*) + live run replay panel (Moment 1). Trust chips (`READ-ONLY · WHITE-LABEL · VALIDATED CLOSURE`) as mono badges.
2. Operating thesis — fear-vs-fix manifesto as an **editorial spread** (huge serif pull-line left, three contrast rows right), not three grey cards.
3. The Loop — Moment 2 scrollytelling (this replaces the current static "sample finding" table; that finding *is* the traveler).
4. Product proof — "Show the real surfaces, not decoration." Exhibit-framed screenshots (new set, §7), large, one per row on desktop with alternating offsets — no 3-up thumbnail grid.
5. White-label — Moment 5 brand-swap + the three-party model (RoadRunner / MSP / Client) as a labeled chain, not three equal cards.
6. Positioning — "Dashboards report. Assessments age. RoadRunner closes." as a typographic comparison ledger (mono table on paper).
7. Close — dark→paper fold (Moment 6) into final CTA: *Open the walkthrough / Scope a pilot*.

### 6.2 Platform `/platform/` — the machine
**Remember:** evidence in → verified closure out, as one continuous animated pipeline.
- Hero with compact pipeline diagram; then an **animated architecture flow** (sources → collectors → findings engine → queue → validation → report) drawn as one SVG with staged stroke reveals.
- Source coverage table (mono, per-source: what's read, what's produced).
- Lifecycle section as a numbered run calendar ("what a week looks like").
- Role views: Exec / IT / vCISO tab strip swapping exhibit screenshots.

### 6.3 On-Prem `/on-prem-attack-paths/` — the cinematic page
**Remember:** the edge cut (Moment 3).
- Hero: "Find the path. Cut the edge. *Prove it died.*"
- Interactive-feel SVG attack graph (prebuilt topology, scroll-staged ignition; keyboard/static fallback = annotated highlighted path).
- Collector section: **real terminal block** (one-liner + RMM + scheduled task + air-gapped tabs), styled as a true terminal with copy button — this is tech-credibility currency; make it beautiful.
- Path-closure table: before-run / change / after-run proof rows.

### 6.4 Microsoft `/microsoft-security/`
**Remember:** the gauge shattering into work (Moment 4).
- Hero: "Microsoft posture without score theater."
- Coverage grid per workload (Entra / Defender / Intune / M365 / Azure) with named example findings each.
- Secure Score section = Moment 4.
- Permissions table (read-only Graph scopes) styled as an access manifest on paper.

### 6.5 Pricing `/pricing/` — the scope document
**Remember:** pilot-first honesty; it reads like a scoping sheet, not a SaaS grid.
- Pilot shape as a **paper scope-of-work artifact** (deliverables checklist, timeline, exit ramp: "continue only if the output creates useful work").
- Pricing inputs (tenants, sources, deployment, white-label) as a spec sheet with mono values.
- What's included ledger. No fake tier grid — pricing is scoped; the design owns that honestly.

### 6.6 Security `/security/` — the trust ledger
**Remember:** read-only, least privilege, and visible limits — signed like a document.
- Trust grid → **ledger rows with stamp-style status marks** (READ-ONLY, TENANT-ISOLATED, CUSTOMER-DEPLOYABLE…).
- Connector permissions table, data handling, boundaries, compliance posture — mostly paper material, mono-heavy, quiet. This page earns trust by looking like it was written by a careful adult; motion is minimal here *on purpose*.

### 6.7 Walkthrough `/demo/` — the guided casefile
**Remember:** a complete weekly run, start to finish, ending in the stamp.
- Restage the 3 chapters (Executive posture / On-prem attack path / Evidence-grounded vCISO) as **CASEFILE chapters** with oversized numbered openers, exhibit-framed screenshots (with CSS zoom-pan focus highlights on key regions), and mono annotation callouts.
- The synthetic-evidence disclaimer becomes a designed element (a `SYNTHETIC FIXTURE` stamp), not a caption apology.
- Finale: the "MFA exception + AD path combine" finding artifact → paper report fold (Moment 6) → CTA.

### 6.8 Contact `/contact/` — scope the first run
- Form restyled as an **intake/scoping sheet** on paper (keeps the mailto-draft mechanic and "stores nothing" honesty line).
- Add a "what happens next" rail: 30-min scope → connector consent → first run inside week one.
- Direct email prominent.

### New: `/404.html`
Branded miss page ("This path doesn't exist. These do.") with nav — Cloudflare Pages picks up `404.html` automatically.

## 7. Asset plan — new product screenshots

Current `refs/polaris-*.png` are the right *content* but inconsistent quality (one blurred by a modal, dark thumbnails). Per Drew: screenshots reference **GitHub/Grafana-grade dashboard design** and new ones may be produced.

**Pipeline:** build `shots/` — small self-contained HTML mock pages of the Polaris product UI (dark, teal, serif panel headings — faithful to the real product's language, GitHub/Grafana-tier polish: dense-but-legible tables, honest charts, real mono values) → capture with Playwright at 2× → export **AVIF + WebP + PNG fallback**, exact render sizes, explicit width/height.

Shot list (all clearly synthetic-data):
1. **Executive posture** — composite gauge, needs-action count, monthly savings, "what changed" diff list, coverage-honesty panel.
2. **Work queue (IT Help Desk)** — "fix these, in order" with owners and 72-hour/2-week lanes.
3. **Attack-path graph** — ignited shortest path to Tier 0, principal panel populated.
4. **AI vCISO** — grounded answer citing findings + sources chip (crop tighter than current ref).
5. **White-label pair** — same screen as Polaris and as a second fictional MSP brand (for Moment 5).
6. **The weekly report** — paper artifact page (used in Moment 6 and the walkthrough finale).

Also produce: refreshed favicon set from the mark, **per-page OG cards** (1200×630, generated from an HTML template in the same pipeline), and the hero/loop SVG illustrations. `refs/` stays as reference-only (never shipped into page weight).

## 8. Technical architecture

**Keep:** zero-dependency Node generator, `node build-site.mjs`, output dir `.`, Cloudflare Pages settings, CNAME/robots/sitemap/legacy-redirect generation, mailto contact form.

**Restructure** (the current 2,131-line single file would triple otherwise):
```
RoadRunner/
  build-site.mjs          # entry: imports modules, writes pages (command unchanged)
  site/
    tokens.css.mjs        # design tokens
    base.css.mjs          # reset, type, surfaces, atmosphere
    components.css.mjs    # exhibits, ledgers, stamps, terminal, paper
    motion.css.mjs        # scroll-timelines, reveals, reduced-motion variants
    js/                   # loop-replay.mjs, edge-cut.mjs, brand-swap.mjs, reveal.mjs (<15KB total, concatenated + inlined)
    pages/*.mjs           # one content module per route
    visuals/*.mjs         # hero + diagram SVG builders
  shots/                  # screenshot mock sources + capture script (not linked from site)
  assets/fonts/           # Newsreader + Inter woff2 subsets
  assets/img/             # exhibits (avif/webp/png), og/
```
Each module stays under ~400 lines (per repo coding standards).

**Budgets & gates** (microsite class):
- LCP < 2.0s (hero headline is text; preload 1 font), CLS < 0.1 (all media has dimensions), INP < 200ms.
- JS < 20KB gz total, CSS < 30KB gz, fonts ≤ 2 families subset ≤ 120KB total, every exhibit ≤ 150KB (AVIF), lazy-load below fold, `fetchpriority=high` only on hero visual.
- Accessibility: AA contrast on **both** surfaces (paper ink ≥ 7:1), full keyboard paths, focus-visible kept, reduced-motion = complete static story (stamps pre-applied, paths pre-highlighted), all exhibits alt-texted with real descriptions.
- SEO: titles/descriptions preserved, OG/Twitter cards per page, `Organization` + `WebSite` JSON-LD, canonical tags, sitemap regenerated.

## 9. Execution phases

Ship after every phase; site never breaks. One commit per phase minimum (stage `RoadRunner/` paths explicitly — the parent repo has 715 unrelated pending deletions that must never ride along).

| Phase | Deliverable | Acceptance |
|---|---|---|
| **0. Foundation** | Generator refactor into modules (byte-identical output check first), tokens, fonts self-hosted, atmosphere, reveal grammar, exhibit/ledger/stamp/terminal components, 404 page. Type study: Newsreader vs Fraunces side-by-side shot for Drew. | `node build-site.mjs` output parity → then new foundation renders on a hidden `/styleguide/` page (noindex, later removed) |
| **1. Screenshots** | `shots/` mocks + capture pipeline; 6-shot set + OG cards + favicons. | Every exhibit crisp at 2×, AVIF+fallback, synthetic labels visible |
| **2. Home** | Full rebuild with Moments 1, 2, 5, 6. | Desktop+mobile screenshots pass review; budgets hold; reduced-motion complete |
| **3. Walkthrough** | Casefile chapters + finale fold. | Chapter flow reads start-to-finish without clicking anything |
| **4. Spear pages** | On-Prem (Moment 3) + Microsoft (Moment 4). | Edge-cut and gauge-shatter work via scroll, keyboard, and reduced-motion |
| **5. Paper pages** | Pricing, Security, Contact, Platform pipeline. | Paper material consistent; trust page reads calm |
| **6. QA + launch** | Full matrix + fixes, then deploy. | See §10 gates |

## 10. QA & validation (Phase 6 gates)

- **Visual matrix:** Playwright full-page shots — all 8 pages + 404 × {320, 390, 768, 1024, 1440, 1920} × {motion, reduced-motion}. No horizontal overflow anywhere.
- **Cross-browser:** Chrome, Safari (scroll-timeline fallback path!), Firefox.
- **Lighthouse ≥ 95** perf/a11y/SEO on Home, On-Prem, Walkthrough (mobile emulation).
- **Keyboard-only pass** through every page; skip link; visible focus everywhere.
- **Link/route audit:** all legacy `.dc.html` redirects still land; sitemap URLs 200; CNAME untouched.
- **Honesty audit:** every synthetic surface labeled; no invented customer logos, no fake testimonials, no fabricated compliance claims (posture stated as posture, not certification).

## 11. Risks & guardrails

- **Taste risk (biggest):** serif+stamp+paper can tip into costume. Guardrail: forensic elements carry *real* information (actual run IDs, real hashes of the page build, honest labels) — never decoration; Security page stays quiet.
- **Motion on cheap hardware:** compositor-only properties, no canvas/WebGL, loop pauses off-screen; test on a throttled mobile profile.
- **Safari scroll-timeline gaps:** every scroll moment has an IO-driven class-toggle fallback; verify Moment 2 & 3 there first.
- **Repo hygiene:** never `git add -A` in this repo (unrelated mass deletions pending); stage `RoadRunner/` explicitly.
- **Deploy contract:** Cloudflare Pages root `RoadRunner`, build `node build-site.mjs`, output `.`, production branch `main` — the refactor must not change any of these.
- **Font licensing:** Newsreader/Fraunces/Inter are all OFL — safe to self-host.

## 12. Open decisions for Drew (non-blocking; defaults chosen)

1. **Display serif:** Newsreader (default) vs Fraunces — Phase 0 produces a side-by-side; say the word and we swap one token.
2. **Hero intensity:** full run-replay loop (default) vs a single-pass animation that settles permanently.
3. **Screenshot replacement:** new synthetic exhibit set fully replaces `refs/polaris-*.png` on-page (default yes; refs stay in the repo as reference).
4. **Second fictional MSP brand name** for the brand-swap toggle (default: "Meridian MSP").

---

*Build order note: Phases 0–1 are foundation and can start immediately; Phase 2 (Home) is the flagship review checkpoint — if the direction lands there, the rest is execution.*
