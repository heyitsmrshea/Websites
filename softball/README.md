# South Florida Select Softball — Site Redesign

Complete redesign of [southfloridaselectsoftball.com](https://www.southfloridaselectsoftball.com/) (currently a Squarespace site). Static HTML/CSS/JS, no build step.

## Design direction

**Sunny Florida energy** — bright, warm, youthful (the camp is for girls entering 8th–12th grade), and trustworthy for the parents making the $300 decision. The palette derives from the shield logo: deep ocean teal, seafoam mint, cream, optic softball yellow, with coral sunset accents and stitch-red details.

- **Type**: Bricolage Grotesque (display) · Schibsted Grotesk (body) · Yellowtail (script accents echoing the logo's script, used sparingly)
- **Motifs**: softball-as-sun with rotating sunburst rays, dashed ball-flight arcs, stitch underlines, wave section dividers, college-program marquee, polaroid-style photo frames

## Pages

| File | Purpose |
|---|---|
| `index.html` | Hero, program marquee, stats, value props, day-at-a-glance band with camp flyer, founder teaser, waitlist CTA |
| `camp-details.html` | Key facts grid, program wall grouped by division (D1/D2/NAIA/JUCO), FAQ, disclaimer |
| `about.html` | Coach Emily Estroff: story, credential timeline, playing-days photo strip, mission pull quote |
| `register.html` | Waitlist (primary) + registration cards, how-the-waitlist-works steps, socials |

## Structure

```
softball/
├── index.html / camp-details.html / about.html / register.html
├── css/base.css      # tokens, reset, nav, footer, buttons, marquee, reveal
├── css/pages.css     # page-section styles
├── js/main.js        # mobile nav, header shadow, reveal-on-scroll, marquee loop
└── assets/           # logo + photos pulled from the live Squarespace CDN (all WebP)
```

## Integrations (all point at existing live services)

- **Waitlist**: Jotform — `https://form.jotform.com/262007029279053`
- **Registration ($300)**: existing Squarespace store product page
- **Socials**: Instagram `@sofloselectprospectcamp`, Facebook, X `@SoFloSelectSB`

## Content notes

- All facts (date, time, cost, address, venue "Pompano Four Fields", grades, school list, bio, disclaimer) come from the live site and the official camp flyer — nothing invented.
- Division groupings (D1/D2/NAIA/JUCO) on the program wall were added editorially; worth a quick client confirm.
- July 31, 2026 verified as a Friday.

## Accessibility & performance

- Semantic landmarks, aria-current nav, aria-labels on icon links, alt text on all images
- `prefers-reduced-motion` disables the marquee, sun animation, and scroll reveals
- Explicit width/height on every image, lazy loading below the fold, two font families + one script accent with `font-display: swap`
- No horizontal overflow verified at 375 / 768 / 1440

## Local preview

```bash
python3 -m http.server 8000
# open http://localhost:8000
```
