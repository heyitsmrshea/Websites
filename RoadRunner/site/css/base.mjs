// Base layer: fonts, reset, typography voices, atmosphere, header, footer, buttons.
export const base = String.raw`
@font-face {
  font-family: "Newsreader";
  src: url("/assets/fonts/newsreader-var.woff2") format("woff2");
  font-weight: 200 800;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "Newsreader";
  src: url("/assets/fonts/newsreader-italic-var.woff2") format("woff2");
  font-weight: 200 800;
  font-style: italic;
  font-display: swap;
}
@font-face {
  font-family: "Inter";
  src: url("/assets/fonts/inter-var.woff2") format("woff2");
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }
body {
  margin: 0;
  background: var(--void-0);
  color: var(--ink);
  font-family: var(--font-body);
  font-size: var(--text-body);
  line-height: 1.62;
  overflow-x: clip;
}

/* film grain over everything — the room has air in it */
body::after {
  content: "";
  position: fixed;
  inset: -20%;
  z-index: 90;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.92' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E");
  opacity: .045;
  mix-blend-mode: overlay;
}

img, svg, video { max-width: 100%; height: auto; }

/* QA capture hook: full-page screenshot tools toggle this class */
html.qa-shot { scroll-behavior: auto; }
html.qa-shot body::after { position: absolute; inset: 0; }
a { color: inherit; }
::selection { background: rgba(45, 212, 191, .32); color: var(--ink); }

h1, h2, h3, h4 { margin: 0; font-weight: 500; }
p { margin: 0; }

/* --- the three voices --- */
.v-display {
  font-family: var(--font-display);
  font-weight: 470;
  letter-spacing: -.015em;
  line-height: 1.04;
}
.ital { font-style: italic; font-weight: 440; }
.mono { font-family: var(--font-mono); }

h1 {
  font-family: var(--font-display);
  font-weight: 470;
  font-size: var(--text-hero);
  line-height: 1.02;
  letter-spacing: -.018em;
  text-wrap: balance;
}
h1 .ital, h2 .ital { font-style: italic; font-weight: 430; }
h2 {
  font-family: var(--font-display);
  font-weight: 480;
  font-size: var(--text-h2);
  line-height: 1.08;
  letter-spacing: -.012em;
  text-wrap: balance;
}
h3 { font-size: var(--text-h3); font-weight: 620; letter-spacing: -.01em; }

.eyebrow {
  font-family: var(--font-mono);
  font-size: var(--text-mono-s);
  font-weight: 600;
  letter-spacing: .19em;
  text-transform: uppercase;
  color: var(--teal);
  display: flex;
  align-items: center;
  gap: 10px;
}
.eyebrow::before { content: "//"; color: var(--faint); letter-spacing: 0; }
.eyebrow.rose { color: var(--rose); }
.eyebrow.amber { color: var(--amber); }
.eyebrow.green { color: var(--green); }

.lead {
  font-size: var(--text-lead);
  line-height: 1.6;
  color: var(--soft);
  max-width: 58ch;
  text-wrap: pretty;
}
.subtle { color: var(--muted); }

a:focus-visible, button:focus-visible, input:focus-visible, select:focus-visible,
textarea:focus-visible, summary:focus-visible {
  outline: 3px solid var(--teal);
  outline-offset: 3px;
  border-radius: 2px;
}

.skip-link {
  position: absolute;
  left: 16px;
  top: -64px;
  z-index: 200;
  background: var(--teal);
  color: var(--void-0);
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 800;
  text-decoration: none;
}
.skip-link:focus { top: 14px; }

/* ---------- shell ---------- */
.shell {
  max-width: var(--shell-max);
  margin: 0 auto;
  padding-inline: var(--shell-pad);
}
.section { padding-block: var(--sp-section); position: relative; }
.section.tight { padding-block: calc(var(--sp-section) * .54); }

/* ambient tints — the emotional temperature of a section */
.tinted { position: relative; }
.tinted::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(900px 520px at var(--tint-x, 12%) 8%, var(--tint, transparent), transparent 68%);
  opacity: .5;
  transition: background 1.2s var(--ease-out);
}
.tint-rose { --tint: rgba(244, 63, 94, .075); }
.tint-amber { --tint: rgba(251, 191, 36, .06); }
.tint-green { --tint: rgba(52, 211, 153, .07); }
.tint-teal { --tint: rgba(45, 212, 191, .06); }

/* engineering grid — only where the machine lives */
.gridded {
  background-image:
    linear-gradient(90deg, var(--line-soft) 1px, transparent 1px),
    linear-gradient(180deg, var(--line-soft) 1px, transparent 1px);
  background-size: 56px 56px;
  -webkit-mask-image: radial-gradient(75% 85% at 50% 30%, #000 30%, transparent 100%);
  mask-image: radial-gradient(75% 85% at 50% 30%, #000 30%, transparent 100%);
}

/* ---------- header ---------- */
.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: color-mix(in srgb, var(--void-0) 76%, transparent);
  border-bottom: 1px solid var(--line-soft);
  backdrop-filter: blur(16px) saturate(140%);
  -webkit-backdrop-filter: blur(16px) saturate(140%);
}
.nav-shell {
  max-width: 1440px;
  margin: 0 auto;
  padding: 8px clamp(10px, 1.6vw, 20px);
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 20px;
}
.brand { display: inline-flex; align-items: center; gap: 11px; text-decoration: none; min-width: 0; }
.brand img { width: 40px; height: auto; display: block; }
.brand-title { display: grid; gap: 0; line-height: 1.15; }
.brand-title strong { font-size: 14.5px; font-weight: 750; letter-spacing: -.01em; }
.brand-title span {
  font-family: var(--font-mono);
  font-size: 9.5px;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: var(--muted);
}
.nav-links { display: flex; justify-content: center; gap: 4px; flex-wrap: wrap; }
.nav-links a {
  position: relative;
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
  color: var(--soft);
  padding: 9px 11px;
  border-radius: 7px;
  transition: color .18s var(--ease-out), background .18s var(--ease-out);
}
.nav-links a:hover { color: var(--ink); background: rgba(255, 255, 255, .05); }
.nav-links a[aria-current="page"] { color: var(--teal-hi); }
.nav-links a[aria-current="page"]::after {
  content: "";
  position: absolute;
  left: 11px; right: 11px; bottom: 3px;
  height: 2px;
  background: var(--teal);
  border-radius: 2px;
}
.nav-cta { display: flex; gap: 10px; justify-content: flex-end; }

/* ---------- buttons ---------- */
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 660;
  font-size: 14.5px;
  padding: 12px 22px;
  border-radius: 9px;
  border: 1px solid transparent;
  text-decoration: none;
  cursor: pointer;
  transition: transform .18s var(--ease-out), background .18s, border-color .18s, box-shadow .18s, color .18s;
}
.button.primary {
  background: var(--teal);
  color: #032620;
  box-shadow: 0 6px 26px rgba(45, 212, 191, .22);
}
.button.primary:hover { background: var(--teal-hi); transform: translateY(-1px); box-shadow: 0 10px 34px rgba(45, 212, 191, .3); }
.button.primary:active { transform: translateY(0); }
.button.secondary { border-color: var(--line); color: var(--ink); background: rgba(255, 255, 255, .02); }
.button.secondary:hover { border-color: var(--line-strong); background: rgba(45, 212, 191, .06); transform: translateY(-1px); }
.button.small { padding: 8px 15px; font-size: 13px; border-radius: 8px; }

.textlink {
  color: var(--teal);
  font-weight: 620;
  text-decoration: none;
  border-bottom: 1px solid rgba(45, 212, 191, .35);
  padding-bottom: 1px;
  transition: border-color .16s, color .16s;
}
.textlink:hover { color: var(--teal-hi); border-color: var(--teal-hi); }

/* ---------- mobile menu ---------- */
.mobile-menu { display: none; }

/* ---------- footer ---------- */
.site-footer {
  border-top: 1px solid var(--line-soft);
  margin-top: calc(var(--sp-section) * .52);
  background: linear-gradient(180deg, transparent, rgba(45, 212, 191, .035));
}
.footer-inner { max-width: var(--shell-max); margin: 0 auto; padding: 40px var(--shell-pad) 24px; }
.footer-sign {
  font-family: var(--font-display);
  font-size: clamp(1.7rem, 1.1rem + 2.4vw, 3rem);
  font-weight: 460;
  letter-spacing: -.014em;
  line-height: 1.12;
  max-width: 21ch;
}
.footer-sign .ital { color: var(--teal); }
.footer-top {
  display: grid;
  grid-template-columns: 1.2fr .8fr;
  gap: 28px;
  align-items: start;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--line-soft);
}
.footer-links { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 6px 28px; justify-self: end; }
.footer-links a {
  text-decoration: none;
  color: var(--soft);
  font-size: 13.5px;
  font-weight: 560;
  padding: 5px 0;
  transition: color .15s;
}
.footer-links a:hover { color: var(--teal-hi); }
.footer-brandline { display: flex; align-items: center; gap: 10px; margin-top: 14px; color: var(--muted); font-size: 13px; }
.footer-brandline img { width: 30px; }
.footer-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 26px;
  padding-top: 16px;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: var(--faint);
}
.footer-meta .sep { color: var(--faint); }

@media (max-width: 960px) {
  .nav-links, .nav-cta { display: none; }
  .nav-shell { grid-template-columns: auto 1fr auto; }
  .mobile-menu { display: block; justify-self: end; position: relative; }
  .mobile-menu summary {
    list-style: none;
    cursor: pointer;
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: .16em;
    text-transform: uppercase;
    color: var(--ink);
    border: 1px solid var(--line);
    border-radius: 8px;
    padding: 9px 14px;
  }
  .mobile-menu summary::-webkit-details-marker { display: none; }
  .mobile-menu[open] summary { border-color: var(--line-strong); color: var(--teal-hi); }
  .mobile-menu-panel {
    position: absolute;
    right: 0;
    top: calc(100% + 10px);
    width: min(78vw, 320px);
    display: grid;
    gap: 2px;
    background: var(--panel-1);
    border: 1px solid var(--line);
    border-radius: 14px;
    padding: 10px;
    box-shadow: var(--shadow-panel);
  }
  .mobile-menu-panel a {
    text-decoration: none;
    color: var(--soft);
    font-weight: 600;
    font-size: 15px;
    padding: 11px 12px;
    border-radius: 9px;
  }
  .mobile-menu-panel a:hover, .mobile-menu-panel a[aria-current="page"] { color: var(--teal-hi); background: rgba(45, 212, 191, .07); }
  .footer-top { grid-template-columns: 1fr; }
  .footer-links { justify-self: start; }
}
`;
