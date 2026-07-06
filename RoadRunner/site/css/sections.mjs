// Page-specific section layouts: manifesto, loop, white-label, graphs, chapters, 404.
export const sections = String.raw`
/* ---------- manifesto (home) ---------- */
.manifesto { display: grid; grid-template-columns: minmax(0, 6fr) minmax(0, 5fr); gap: clamp(36px, 5vw, 80px); align-items: start; }
.manifesto-statement { display: grid; gap: 22px; position: sticky; top: 110px; }
.manifesto-statement .fear {
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 1.15rem + 2.5vw, 3.1rem);
  font-weight: 450;
  font-style: italic;
  letter-spacing: -.012em;
  line-height: 1.14;
  color: var(--muted);
}
.manifesto-statement .fix {
  font-family: var(--font-display);
  font-size: clamp(1.95rem, 1.2rem + 3vw, 3.6rem);
  font-weight: 500;
  letter-spacing: -.015em;
  line-height: 1.08;
}
.manifesto-statement .fix em {
  font-style: normal;
  background: linear-gradient(180deg, transparent 68%, rgba(45, 212, 191, .32) 68%);
}
.manifesto-statement .sub { font-family: var(--font-mono); font-size: 12px; line-height: 1.8; letter-spacing: .03em; color: var(--muted); max-width: 44ch; }
.contrast-ledger { display: grid; gap: 0; border-top: 1px solid var(--line); }
.contrast-row { padding: 24px 4px; border-bottom: 1px solid var(--line-soft); display: grid; gap: 12px; }
.contrast-row .them, .contrast-row .us { display: grid; grid-template-columns: 118px 1fr; gap: 16px; align-items: baseline; }
.contrast-row .who {
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 650;
  letter-spacing: .15em;
  text-transform: uppercase;
}
.contrast-row .them .who { color: var(--faint); }
.contrast-row .them span { color: var(--muted); font-style: italic; font-family: var(--font-display); font-size: 1.05rem; }
.contrast-row .us .who { color: var(--teal); }
.contrast-row .us span { color: var(--ink); font-size: 15px; font-weight: 560; line-height: 1.55; }

/* ---------- white-label chain ---------- */
.chain { display: grid; grid-template-columns: 1fr auto 1fr auto 1fr; gap: 14px; align-items: stretch; }
.chain-node {
  border: 1px solid var(--line);
  border-radius: var(--radius-s);
  padding: 24px 22px;
  display: grid;
  gap: 10px;
  align-content: start;
  background: linear-gradient(178deg, var(--panel-1), var(--panel-0));
  transition: border-color .3s;
}
.chain-node:hover { border-color: var(--line-strong); }
.chain-node .who { font-family: var(--font-mono); font-size: 10px; letter-spacing: .15em; text-transform: uppercase; color: var(--teal); }
.chain-node h3 { font-size: 1.12rem; font-weight: 700; }
.chain-node p { font-size: 13.5px; color: var(--muted); line-height: 1.6; }
.chain-link { align-self: center; color: var(--faint); font-family: var(--font-mono); font-size: 18px; }

/* ---------- attack graph canvas ---------- */
.graph-panel { position: relative; }
.graph-canvas { padding: 8px 4px 4px; }
.graph-canvas svg { display: block; width: 100%; height: auto; }
.graph-legend { display: flex; flex-wrap: wrap; gap: 14px; padding: 12px 4px 2px; border-top: 1px solid var(--line-soft); }
.graph-legend span { font-family: var(--font-mono); font-size: 10px; letter-spacing: .1em; color: var(--muted); display: inline-flex; align-items: center; gap: 7px; }
.graph-legend i { width: 9px; height: 9px; border-radius: 50%; }

.g-edge { stroke: rgba(182, 194, 203, .28); stroke-width: 1.6; }
.g-edge.hot { stroke: var(--rose-deep); stroke-width: 2.6; filter: drop-shadow(0 0 6px rgba(244, 63, 94, .55)); }
.g-edge.cuttable { stroke: var(--rose-deep); stroke-width: 3.4; }
.g-node circle, .g-node rect { fill: var(--panel-2); stroke: rgba(182, 194, 203, .4); stroke-width: 1.5; }
.g-node.hot circle, .g-node.hot rect { stroke: var(--rose); filter: drop-shadow(0 0 7px rgba(244, 63, 94, .5)); }
.g-node.t0 circle { fill: rgba(244, 63, 94, .16); stroke: var(--rose-deep); stroke-width: 2; }
.g-node text { fill: var(--soft); font-family: var(--font-mono); font-size: 10.5px; }
.g-node .sub { fill: var(--faint); font-size: 8.5px; }

/* ---------- collector rules ---------- */
.rules { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0; border: 1px solid var(--line); border-radius: var(--radius-s); overflow: hidden; }
.rule-cell { padding: 24px 22px; border-right: 1px solid var(--line-soft); display: grid; gap: 10px; align-content: start; background: rgba(255,255,255,.012); }
.rule-cell:last-child { border-right: 0; }
.rule-cell .k { font-family: var(--font-mono); font-size: 10px; letter-spacing: .15em; text-transform: uppercase; color: var(--teal); }
.rule-cell.no .k { color: var(--rose); }
.rule-cell h3 { font-size: 1rem; font-weight: 680; }
.rule-cell p { font-size: 13px; color: var(--muted); line-height: 1.6; }

/* ---------- walkthrough chapters ---------- */
.chapter { position: relative; }
.chapter-head { display: grid; grid-template-columns: auto 1fr; gap: clamp(20px, 3vw, 44px); align-items: baseline; margin-bottom: var(--sp-block); }
.chapter-num {
  font-family: var(--font-display);
  font-size: clamp(4.4rem, 2.5rem + 8vw, 9rem);
  font-weight: 380;
  line-height: .8;
  color: transparent;
  -webkit-text-stroke: 1px rgba(182, 194, 203, .38);
}
.chapter.active .chapter-num, .chapter:hover .chapter-num { color: rgba(45, 212, 191, .14); -webkit-text-stroke: 1px var(--teal); }
.chapter-title { display: grid; gap: 12px; }
.chapter-title .eyebrow { margin-bottom: 2px; }
.chapter-note {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 14px;
  align-items: start;
  margin-top: 22px;
  padding: 16px 18px;
  border: 1px solid var(--line-soft);
  border-left: 2px solid var(--teal);
  border-radius: 0 var(--radius-s) var(--radius-s) 0;
  background: rgba(45, 212, 191, .04);
}
.chapter-note .k { font-family: var(--font-mono); font-size: 10px; letter-spacing: .14em; color: var(--teal); text-transform: uppercase; padding-top: 3px; }
.chapter-note p { font-size: 14px; color: var(--soft); line-height: 1.6; }

/* ---------- positioning memo (paper) ---------- */
.memo-q { padding: 22px 0; border-bottom: 1px solid var(--paper-line); }
.memo-q:last-of-type { border-bottom: 0; }
.memo-q h3 {
  font-family: var(--font-display);
  font-weight: 520;
  font-size: 1.3rem;
  letter-spacing: -.008em;
  margin-bottom: 14px;
}
.memo-answers { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; }
.memo-answers > div { display: grid; gap: 6px; align-content: start; }
.memo-answers .who {
  font-family: var(--font-mono);
  font-size: 9.5px;
  font-weight: 650;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: var(--paper-muted);
}
.memo-answers span:last-child { font-size: 13.5px; color: var(--paper-soft); line-height: 1.55; font-style: italic; font-family: var(--font-display); }
.memo-answers .rr .who { color: var(--paper-stamp); }
.memo-answers .rr span:last-child { color: var(--paper-ink); font-style: normal; font-family: var(--font-body); font-weight: 620; }

/* ---------- pilot SOW (paper) ---------- */
.sow-row {
  display: grid;
  grid-template-columns: 64px 1fr 40px;
  gap: 20px;
  align-items: center;
  padding: 18px 0;
  border-bottom: 1px solid var(--paper-line);
}
.sow-week {
  font-family: var(--font-mono);
  font-size: 15px;
  font-weight: 700;
  color: var(--paper-stamp);
  letter-spacing: .06em;
}
.sow-body { display: grid; gap: 4px; }
.sow-body strong { font-size: 15.5px; font-weight: 680; color: var(--paper-ink); }
.sow-body span { font-size: 13.5px; color: var(--paper-soft); line-height: 1.55; }
.sow-check {
  width: 26px; height: 26px;
  border: 1.5px solid var(--paper-line);
  border-radius: 6px;
  display: grid;
  place-items: center;
  color: var(--paper-stamp);
  font-weight: 800;
}
.sow-exit {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 16px;
  align-items: start;
  margin-top: 24px;
  padding: 18px 20px;
  border: 1px dashed rgba(26, 122, 94, .5);
  border-radius: 6px;
  background: rgba(26, 122, 94, .05);
}
.sow-exit .k { font-family: var(--font-mono); font-size: 10px; letter-spacing: .14em; text-transform: uppercase; color: var(--paper-stamp); padding-top: 3px; font-weight: 700; }
.sow-exit p { font-size: 14px; color: var(--paper-ink); line-height: 1.6; }

/* ---------- report fold (walkthrough finale, Moment 6) ---------- */
.fold { position: relative; overflow: clip; }
.fold::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(1100px 480px at 30% 120%, rgba(52, 211, 153, .08), transparent 65%);
}
.fold-stage { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 6fr); gap: clamp(30px, 5vw, 70px); align-items: center; }
.report-frame {
  margin: 0;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: var(--shadow-paper);
  transform: perspective(1600px) rotateY(4deg) rotateX(1.5deg);
  transition: transform .7s var(--ease-out);
  transform-origin: left center;
}
.report-frame:hover { transform: perspective(1600px) rotateY(0deg) rotateX(0deg); }
.report-frame img { display: block; width: 100%; }
.fold-note { display: grid; gap: 18px; align-content: center; justify-items: start; }
.fold-note p { color: var(--soft); font-size: 15.5px; line-height: 1.66; max-width: 44ch; }
.fold-meta { display: grid; gap: 10px; width: 100%; max-width: 360px; margin: 4px 0; }
.fold-meta div { display: grid; grid-template-columns: 110px 1fr; gap: 14px; padding: 10px 0; border-bottom: 1px solid var(--line-soft); }
.fold-meta b { font-family: var(--font-mono); font-size: 10px; letter-spacing: .13em; text-transform: uppercase; color: var(--faint); }
.fold-meta span { font-size: 13.5px; color: var(--soft); font-family: var(--font-mono); }
@media (max-width: 900px) {
  .fold-stage { grid-template-columns: 1fr; }
  .report-frame { transform: none; max-width: 520px; justify-self: center; }
  .report-frame:hover { transform: none; }
}

/* ---------- 404 ---------- */
.notfound { min-height: 72vh; display: grid; place-content: center; text-align: left; gap: 26px; padding-block: 80px; }
.notfound .code { font-family: var(--font-mono); font-size: 12px; letter-spacing: .2em; color: var(--rose); }
.notfound h1 { max-width: 16ch; }
.notfound .routes { display: grid; gap: 0; border-top: 1px solid var(--line); margin-top: 14px; min-width: min(520px, 86vw); }
.notfound .routes a {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  text-decoration: none;
  padding: 13px 4px;
  border-bottom: 1px solid var(--line-soft);
  color: var(--soft);
  font-size: 14.5px;
  font-weight: 580;
  transition: color .16s, padding-left .25s var(--ease-out);
}
.notfound .routes a:hover { color: var(--teal-hi); padding-left: 10px; }
.notfound .routes .mono { color: var(--faint); font-size: 11px; }

/* ---------- score deconstruction placeholder (P4 upgrades) ---------- */
.gauge-wrap { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 6fr); gap: clamp(30px, 4vw, 64px); align-items: center; }
.worklist { display: grid; gap: 0; border-top: 1px solid var(--line); }
.workitem { display: grid; grid-template-columns: auto 1fr auto; gap: 16px; align-items: center; padding: 15px 4px; border-bottom: 1px solid var(--line-soft); }
.workitem .rank { font-family: var(--font-mono); font-size: 11px; color: var(--teal); width: 24px; }
.workitem .what { font-size: 14.5px; color: var(--soft); }
.workitem .what strong { color: var(--ink); font-weight: 640; display: block; font-size: 14.5px; }
.workitem .what span { font-size: 12px; color: var(--faint); font-family: var(--font-mono); }

/* ---------- responsive ---------- */
@media (max-width: 980px) {
  .manifesto { grid-template-columns: 1fr; }
  .manifesto-statement { position: static; }
  .chain { grid-template-columns: 1fr; }
  .chain-link { transform: rotate(90deg); justify-self: center; }
  .rules { grid-template-columns: 1fr 1fr; }
  .rule-cell:nth-child(2n) { border-right: 0; }
  .rule-cell { border-bottom: 1px solid var(--line-soft); }
  .gauge-wrap { grid-template-columns: 1fr; }
}
@media (max-width: 700px) {
  .memo-answers { grid-template-columns: 1fr; gap: 12px; }
}
@media (max-width: 560px) {
  .rules { grid-template-columns: 1fr; }
  .rule-cell { border-right: 0; }
  .chapter-head { grid-template-columns: 1fr; gap: 10px; }
  .sow-row { grid-template-columns: 48px 1fr; }
  .sow-check { display: none; }
}
`;
