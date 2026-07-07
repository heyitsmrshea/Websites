// Component layer: hero, run panels, exhibits, stamps, ledgers, terminal, paper, tables, forms.
export const components = String.raw`
/* ---------- hero ---------- */
.hero {
  position: relative;
  padding-top: clamp(40px, 6vh, 74px);
  padding-bottom: clamp(34px, 5.5vh, 64px);
  overflow: clip;
}
.hero::before {
  content: "";
  position: absolute;
  inset: -1px 0 auto;
  height: 130%;
  pointer-events: none;
  background:
    radial-gradient(1000px 480px at 74% -12%, rgba(45, 212, 191, .13), transparent 62%),
    radial-gradient(720px 420px at 8% 4%, rgba(59, 130, 246, .06), transparent 60%);
}
.hero-inner {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.02fr) minmax(0, .98fr);
  gap: clamp(22px, 3.2vw, 44px);
  align-items: center;
}
.hero-copy { display: grid; gap: 18px; justify-items: start; }
.hero-copy .lead { max-width: 54ch; }
.hero-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 4px; }
.signal-row { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }

.chip {
  font-family: var(--font-mono);
  font-size: 10.5px;
  font-weight: 650;
  letter-spacing: .13em;
  text-transform: uppercase;
  color: var(--soft);
  border: 1px solid var(--line);
  border-radius: 6px;
  padding: 6px 10px;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: rgba(255, 255, 255, .02);
}
.chip::before { content: ""; width: 5px; height: 5px; border-radius: 50%; background: var(--teal); box-shadow: 0 0 8px var(--teal); }
.chip.rose::before { background: var(--rose); box-shadow: 0 0 8px var(--rose); }
.chip.amber::before { background: var(--amber); box-shadow: 0 0 8px var(--amber); }
.chip.green::before { background: var(--green); box-shadow: 0 0 8px var(--green); }
.chip.plain::before { display: none; }

/* ---------- tags (severity) ---------- */
.tag {
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .12em;
  padding: 4px 8px;
  border-radius: 5px;
  border: 1px solid;
  white-space: nowrap;
}
.tag.high { color: var(--rose); border-color: rgba(244, 63, 94, .4); background: var(--rose-dim); }
.tag.gap { color: var(--amber); border-color: rgba(251, 191, 36, .38); background: var(--amber-dim); }
.tag.done { color: var(--green); border-color: rgba(52, 211, 153, .4); background: var(--green-dim); }
.tag.live { color: var(--teal); border-color: rgba(45, 212, 191, .4); background: var(--teal-dim); }

/* ---------- run panel (ops surfaces in heroes) ---------- */
.runpanel {
  position: relative;
  background: linear-gradient(178deg, var(--panel-1), var(--panel-0) 72%);
  border: 1px solid var(--line);
  border-top-color: rgba(255, 255, 255, .13);
  border-radius: var(--radius);
  box-shadow: var(--shadow-panel);
  padding: 22px;
  display: grid;
  gap: 18px;
}
.runpanel-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 14px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--line-soft);
}
.runpanel-top .titleblock { display: grid; gap: 3px; min-width: 0; }
.runpanel-top strong { font-size: 14.5px; font-weight: 700; letter-spacing: -.01em; }
.runpanel-top .runid {
  font-family: var(--font-mono);
  font-size: 10.5px;
  letter-spacing: .07em;
  color: var(--muted);
}
.live-dot {
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .16em;
  color: var(--teal);
  display: inline-flex;
  align-items: center;
  gap: 7px;
}
.live-dot::before {
  content: "";
  width: 7px; height: 7px;
  border-radius: 50%;
  background: var(--teal);
  box-shadow: 0 0 10px var(--teal);
  animation: pulse 2.2s ease-in-out infinite;
}
.metric-row { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; }
.metric {
  border: 1px solid var(--line-soft);
  border-radius: 9px;
  padding: 13px 12px 11px;
  display: grid;
  gap: 3px;
  background: rgba(255, 255, 255, .015);
  border-top: 2px solid var(--m, var(--teal));
}
.metric strong { font-family: var(--font-mono); font-size: clamp(1.35rem, 1.5vw + 1rem, 1.7rem); font-weight: 640; letter-spacing: -.02em; line-height: 1; color: var(--m, var(--teal)); }
.metric span { font-size: 10.5px; color: var(--muted); line-height: 1.35; }
.metric.rose { --m: var(--rose); }
.metric.green { --m: var(--green); }
.metric.amber { --m: var(--amber); }
.metric.teal { --m: var(--teal); }

.feed { display: grid; gap: 0; }
.feed-row {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 12px;
  align-items: center;
  padding: 10px 2px;
  border-bottom: 1px solid var(--line-soft);
  font-size: 12.5px;
  color: var(--soft);
}
.feed-row:last-child { border-bottom: 0; }
.feed-row .meta { font-family: var(--font-mono); font-size: 10px; color: var(--faint); letter-spacing: .05em; }

/* ---------- stamps ---------- */
.stamp {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 750;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: var(--green);
  border: 2px solid currentColor;
  border-radius: 5px;
  padding: 7px 13px;
  transform: rotate(-3.5deg);
  box-shadow: inset 0 0 0 2.5px var(--void-0), inset 0 0 0 3.5px currentColor;
  background: rgba(52, 211, 153, .07);
  white-space: nowrap;
}
.stamp.rose { color: var(--rose-deep); background: rgba(244, 63, 94, .07); }
.stamp.teal { color: var(--teal); background: rgba(45, 212, 191, .06); }
.stamp.small { font-size: 9.5px; padding: 4px 8px; letter-spacing: .14em; }
.paper .stamp { color: var(--paper-stamp); box-shadow: inset 0 0 0 2.5px var(--paper), inset 0 0 0 3.5px currentColor; background: rgba(26, 122, 94, .06); }
.paper .stamp.rose { color: var(--paper-rose); background: rgba(180, 58, 78, .06); }

/* ---------- section head ---------- */
.section-head {
  display: grid;
  grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
  gap: 16px 42px;
  align-items: end;
  margin-bottom: var(--sp-block);
  padding-top: 14px;
  border-top: 1px solid var(--line-soft);
}
.section-head .eyebrow { margin-bottom: 9px; }
.section-head p { color: var(--muted); font-size: 15.5px; line-height: 1.65; max-width: 46ch; padding-bottom: 6px; }

/* ---------- rail cards (hairline, not boxes) ---------- */
.rail { display: grid; gap: clamp(20px, 3vw, 34px); }
.rail.cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.rail.cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.rail.cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.railcard { border-top: 1px solid var(--line); padding-top: 18px; display: grid; gap: 9px; align-content: start; position: relative; transition: border-color .25s var(--ease-out); }
.railcard:hover { border-top-color: var(--line-strong); }
.railcard .num {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 650;
  letter-spacing: .14em;
  color: var(--teal);
}
.railcard h3 { font-size: 1.06rem; font-weight: 680; letter-spacing: -.005em; }
.railcard p { font-size: 14px; color: var(--muted); line-height: 1.62; }

/* ---------- ledger ---------- */
.ledger { border-top: 1px solid var(--line); }
.ledger-row {
  display: grid;
  grid-template-columns: 170px 1fr auto;
  gap: 18px;
  align-items: center;
  padding: 17px 4px;
  border-bottom: 1px solid var(--line-soft);
  transition: background .2s;
}
.ledger-row:hover { background: rgba(255, 255, 255, .02); }
.ledger-row .k {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 650;
  letter-spacing: .13em;
  text-transform: uppercase;
  color: var(--soft);
}
.ledger-row .v { font-size: 14.5px; color: var(--muted); line-height: 1.55; }
.ledger-row .v strong { color: var(--ink); font-weight: 640; }

/* ---------- finding artifact ---------- */
.artifact {
  position: relative;
  background: linear-gradient(178deg, var(--panel-1), var(--panel-0));
  border: 1px solid var(--line);
  border-top-color: rgba(255, 255, 255, .12);
  border-radius: var(--radius);
  box-shadow: var(--shadow-panel);
  overflow: clip;
}
.artifact::before {
  content: "";
  position: absolute;
  inset: 0 auto 0 0;
  width: 3px;
  background: linear-gradient(180deg, var(--rose-deep), var(--amber) 55%, var(--green));
}
.artifact-top {
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 20px;
  padding: 26px 28px 20px;
  border-bottom: 1px solid var(--line-soft);
}
.artifact-top .label { font-family: var(--font-mono); font-size: 10.5px; letter-spacing: .16em; text-transform: uppercase; color: var(--muted); display: block; margin-bottom: 10px; }
.artifact-top h3 {
  font-family: var(--font-display);
  font-size: clamp(1.35rem, 1.05rem + 1.2vw, 1.9rem);
  font-weight: 490;
  letter-spacing: -.01em;
  line-height: 1.18;
  max-width: 30ch;
}
.artifact-grid { display: grid; grid-template-columns: 1fr 1fr; }
.artifact-field { padding: 18px 28px; border-bottom: 1px solid var(--line-soft); border-right: 1px solid var(--line-soft); display: grid; gap: 6px; align-content: start; }
.artifact-field:nth-child(2n) { border-right: 0; }
.artifact-field b {
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 650;
  letter-spacing: .15em;
  text-transform: uppercase;
  color: var(--faint);
}
.artifact-field span { font-size: 14px; color: var(--soft); line-height: 1.6; }
.artifact-field.rule { grid-column: 1 / -1; border-right: 0; background: rgba(45, 212, 191, .045); border-left: 2px solid var(--teal); }
.artifact-field.rule b { color: var(--teal); }
.artifact-field.rule span { color: var(--ink); }

/* ---------- exhibit (browser-framed product proof) ---------- */
.exhibit {
  margin: 0;
  border-radius: 14px;
  border: 1px solid var(--line);
  background: var(--panel-0);
  box-shadow: var(--shadow-exhibit);
  overflow: clip;
  transition: transform .5s var(--ease-out), border-color .5s, box-shadow .5s;
}
.exhibit:hover { transform: translateY(-4px); border-color: rgba(45, 212, 191, .3); }
.exhibit-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  background: rgba(255, 255, 255, .025);
  border-bottom: 1px solid var(--line-soft);
}
.exhibit-dots { display: flex; gap: 5px; }
.exhibit-dots i { width: 9px; height: 9px; border-radius: 50%; background: var(--faint); opacity: .55; }
.exhibit-url {
  flex: 1;
  min-width: 0;
  font-family: var(--font-mono);
  font-size: 10.5px;
  letter-spacing: .04em;
  color: var(--muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.exhibit-tag { font-family: var(--font-mono); font-size: 9.5px; font-weight: 700; letter-spacing: .13em; color: var(--amber); white-space: nowrap; }
.exhibit img { display: block; width: 100%; }
.exhibit-caption {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: .05em;
  color: var(--muted);
  padding: 12px 14px;
  border-top: 1px solid var(--line-soft);
}

/* exhibit rows: screenshot + copy, alternating */
.exhibit-row {
  display: grid;
  grid-template-columns: minmax(0, 7fr) minmax(0, 4fr);
  gap: clamp(18px, 2.8vw, 38px);
  align-items: center;
}
.exhibit-row > * { min-width: 0; }
@media (max-width: 620px) {
  .exhibit-tag { display: none; }
}
.exhibit-row + .exhibit-row { margin-top: clamp(26px, 3.6vw, 50px); }
.exhibit-row.flip .exhibit-col { order: 2; }
.exhibit-row .copy { display: grid; gap: 14px; align-content: center; }
.exhibit-row .copy h3 { font-family: var(--font-display); font-weight: 490; font-size: clamp(1.4rem, 1.1rem + 1.2vw, 2rem); letter-spacing: -.01em; line-height: 1.15; }
.exhibit-row .copy p { color: var(--muted); font-size: 15px; line-height: 1.66; }

/* ---------- terminal ---------- */
.term {
  background: #05090e;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  box-shadow: var(--shadow-panel);
  overflow: clip;
}
.term-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 11px 16px;
  border-bottom: 1px solid var(--line-soft);
  background: rgba(255, 255, 255, .02);
}
.term-title { font-family: var(--font-mono); font-size: 11px; letter-spacing: .1em; color: var(--muted); flex: 1; }
.term-copy {
  min-height: 32px;
  font-family: var(--font-mono);
  font-size: 10.5px;
  letter-spacing: .08em;
  color: var(--teal);
  background: var(--teal-dim);
  border: 1px solid rgba(45, 212, 191, .35);
  border-radius: 6px;
  padding: 5px 11px;
  cursor: pointer;
  transition: background .18s, color .18s;
}
.term-copy:hover { background: rgba(45, 212, 191, .22); }
.term-copy.copied { color: var(--void-0); background: var(--green); border-color: var(--green); }
.term-body { padding: 20px 22px; overflow-x: auto; }
.term-body pre { margin: 0; font-family: var(--font-mono); font-size: 12.8px; line-height: 1.75; color: var(--soft); }
.term-body .p { color: var(--teal); user-select: none; }
.term-body .c { color: var(--faint); }
.term-body .s { color: var(--amber); }
.term-body .k { color: var(--teal-hi); }
.term-tabs { display: flex; flex-wrap: wrap; gap: 6px; padding: 12px 16px 0; }
.term-tab {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: .08em;
  color: var(--muted);
  background: transparent;
  border: 1px solid var(--line-soft);
  border-radius: 7px;
  padding: 7px 13px;
  cursor: pointer;
  transition: color .16s, border-color .16s, background .16s;
}
.term-tab[aria-selected="true"] { color: var(--teal-hi); border-color: var(--line-strong); background: var(--teal-dim); }
.term-tab:hover { color: var(--ink); }

/* ---------- paper: the report material ---------- */
.paper {
  position: relative;
  background: linear-gradient(174deg, var(--paper), var(--paper-2));
  color: var(--paper-ink);
  border-radius: var(--radius-paper);
  box-shadow: var(--shadow-paper);
  padding: clamp(20px, 3vw, 38px);
}
.paper::before {
  content: "";
  position: absolute;
  inset: 10px;
  border: 1px solid var(--paper-line);
  border-radius: 2px;
  pointer-events: none;
}
.paper > * { position: relative; }
.paper h2, .paper h3 { color: var(--paper-ink); }
.paper .eyebrow { color: var(--paper-stamp); }
.paper .eyebrow::before { color: var(--paper-muted); }
.paper p { color: var(--paper-soft); }
.paper-doc {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 16px;
  font-family: var(--font-mono);
  font-size: 10.5px;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: var(--paper-muted);
  border-bottom: 1px solid var(--paper-line);
  padding-bottom: 14px;
  margin-bottom: 30px;
}
.paper-foot {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 10px 20px;
  border-top: 1px solid var(--paper-line);
  margin-top: 34px;
  padding-top: 16px;
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: .1em;
  color: var(--paper-muted);
}

/* ---------- tables ---------- */
.tablewrap { overflow-x: auto; border: 1px solid var(--line); border-radius: var(--radius-s); }
table { width: 100%; border-collapse: collapse; font-size: 14px; }
thead th {
  font-family: var(--font-mono);
  font-size: 10.5px;
  font-weight: 650;
  letter-spacing: .14em;
  text-transform: uppercase;
  text-align: left;
  color: var(--muted);
  padding: 14px 18px;
  border-bottom: 1px solid var(--line);
  background: rgba(255, 255, 255, .02);
}
tbody td { padding: 15px 18px; border-bottom: 1px solid var(--line-soft); color: var(--muted); vertical-align: top; line-height: 1.6; }
tbody tr:last-child td { border-bottom: 0; }
tbody td:first-child { color: var(--ink); font-weight: 620; }
tbody tr { transition: background .15s; }
tbody tr:hover { background: rgba(255, 255, 255, .02); }

.paper .tablewrap { border-color: var(--paper-line); }
.paper thead th { color: var(--paper-muted); border-color: var(--paper-line); background: rgba(20, 24, 29, .035); }
.paper tbody td { color: var(--paper-soft); border-color: var(--paper-line); }
.paper tbody td:first-child { color: var(--paper-ink); }
.paper tbody tr:hover { background: rgba(20, 24, 29, .03); }

/* ---------- flow rail (numbered pipeline steps) ---------- */
.flow { position: relative; display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 0; border: 1px solid var(--line); border-radius: var(--radius-s); overflow: hidden; }
.flow-progress { position: absolute; top: 0; left: 0; height: 2px; width: 100%; transform: scaleX(0); transform-origin: left; background: linear-gradient(90deg, var(--rose-deep), var(--amber) 55%, var(--green)); z-index: 2; }
html.js [data-flow].flowed .flow-progress { animation: flow-fill 1.5s var(--ease-out) forwards; }
@keyframes flow-fill { to { transform: scaleX(1); } }
.flow-step { padding: 20px 18px; border-right: 1px solid var(--line-soft); display: grid; gap: 8px; align-content: start; background: rgba(255,255,255,.012); position: relative; }
.flow-step:last-child { border-right: 0; }
.flow-step::after { content: "›"; position: absolute; right: -6px; top: 22px; z-index: 1; font-family: var(--font-mono); color: var(--faint); font-size: 14px; }
.flow-step:last-child::after { display: none; }
html.js [data-flow] .flow-step { opacity: 0; transform: translateY(8px); }
html.js [data-flow].flowed .flow-step { animation: flow-step-in .5s var(--ease-out) both; animation-delay: var(--d, 0s); }
@keyframes flow-step-in { to { opacity: 1; transform: none; } }
.flow-step .num { font-family: var(--font-mono); font-size: 10px; color: var(--teal); letter-spacing: .14em; }
.flow-step strong { font-size: 13.5px; font-weight: 680; }
.flow-step span { font-size: 12.5px; color: var(--muted); line-height: 1.55; }
@media (prefers-reduced-motion: reduce) {
  html.js [data-flow] .flow-step { opacity: 1; transform: none; }
  html.js [data-flow].flowed .flow-progress { animation: none; transform: scaleX(1); }
}

/* ---------- contact ---------- */
.contact-section { border-top: 1px solid var(--line-soft); padding-top: var(--sp-section); }
.contact-grid { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 6fr); gap: clamp(22px, 3.2vw, 44px); align-items: start; }
.contact-grid > * { min-width: 0; }
.contact-grid > div:first-child { display: grid; gap: 20px; justify-items: start; }
.contact-form {
  min-width: 0;
  display: grid;
  gap: 16px;
  background: linear-gradient(178deg, var(--panel-1), var(--panel-0));
  border: 1px solid var(--line);
  border-top-color: rgba(255, 255, 255, .12);
  border-radius: var(--radius);
  box-shadow: var(--shadow-panel);
  padding: clamp(22px, 3vw, 34px);
}
.contact-form label {
  display: grid;
  gap: 7px;
  font-family: var(--font-mono);
  font-size: 10.5px;
  font-weight: 650;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: var(--muted);
}
.contact-form input, .contact-form select, .contact-form textarea {
  min-width: 0;
  width: 100%;
  font: 500 14.5px/1.5 var(--font-body);
  color: var(--ink);
  background: rgba(255, 255, 255, .03);
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 11px 13px;
  transition: border-color .18s, background .18s;
}
.contact-form input:focus, .contact-form select:focus, .contact-form textarea:focus {
  outline: none;
  border-color: var(--line-strong);
  background: rgba(45, 212, 191, .05);
}
.contact-form textarea { resize: vertical; }
.field-grid { min-width: 0; display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 14px; }
.form-note { font-size: 12px; color: var(--faint); }

/* ---------- misc ---------- */
.code-block {
  background: #05090e;
  border: 1px solid var(--line);
  border-radius: var(--radius-s);
  padding: 22px 24px;
  overflow-x: auto;
  font-family: var(--font-mono);
  font-size: 12.8px;
  line-height: 1.7;
  color: var(--soft);
  margin: 0;
}

@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .35; } }

/* ---------- responsive ---------- */
@media (max-width: 1060px) {
  .hero-inner { grid-template-columns: 1fr; gap: 44px; }
  .hero-copy { max-width: 640px; }
}
@media (max-width: 900px) {
  .section-head { grid-template-columns: 1fr; align-items: start; gap: 14px; }
  .rail.cols-3, .rail.cols-4 { grid-template-columns: 1fr 1fr; }
  .exhibit-row, .exhibit-row.flip { grid-template-columns: 1fr; }
  .exhibit-row.flip .exhibit-col { order: 0; }
  .contact-grid { grid-template-columns: 1fr; }
  .artifact-grid { grid-template-columns: 1fr; }
  .artifact-field { border-right: 0; }
}
@media (max-width: 620px) {
  .rail.cols-3, .rail.cols-4, .rail.cols-2 { grid-template-columns: 1fr; }
  .metric-row { grid-template-columns: 1fr 1fr; }
  .field-grid { grid-template-columns: 1fr; }
  .ledger-row { grid-template-columns: 1fr; gap: 6px; }
  .tablewrap { overflow: visible; border: 0; border-radius: 0; }
  table, thead, tbody, tr, th, td { display: block; }
  thead { display: none; }
  tbody { display: grid; gap: 12px; }
  tbody tr {
    border: 1px solid var(--line);
    border-radius: var(--radius-s);
    overflow: hidden;
    background: rgba(255, 255, 255, .012);
  }
  tbody tr:hover { background: rgba(255, 255, 255, .018); }
  tbody td {
    display: grid;
    grid-template-columns: minmax(84px, .38fr) minmax(0, 1fr);
    gap: 14px;
    padding: 13px 14px;
    border-bottom: 1px solid var(--line-soft);
  }
  tbody td::before {
    content: attr(data-label);
    font-family: var(--font-mono);
    font-size: 9.5px;
    font-weight: 650;
    letter-spacing: .14em;
    text-transform: uppercase;
    color: var(--faint);
  }
  .paper .tablewrap { border: 0; }
  .paper tbody tr { border-color: var(--paper-line); background: rgba(20, 24, 29, .025); }
  .paper tbody td { border-color: var(--paper-line); }
  .paper tbody td::before { color: var(--paper-muted); }
  .flow { grid-template-columns: 1fr 1fr; }
  .flow-step { border-bottom: 1px solid var(--line-soft); }
  .hero { padding-top: 34px; }
  .feed-row { grid-template-columns: auto 1fr; }
  .feed-row .meta { display: none; }
}
`;
