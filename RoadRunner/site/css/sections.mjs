// Page-specific section layouts: manifesto, loop, white-label, graphs, chapters, 404.
export const sections = String.raw`
/* ---------- manifesto (home) ---------- */
.manifesto { display: grid; grid-template-columns: minmax(0, 6.8fr) minmax(0, 4.2fr); gap: clamp(22px, 3.2vw, 46px); align-items: start; }
.manifesto-statement { display: grid; gap: 15px; position: sticky; top: 84px; }
.manifesto-statement .fear {
  font-family: var(--font-display);
  font-size: clamp(1.4rem, .92rem + 1.65vw, 2.4rem);
  font-weight: 450;
  font-style: italic;
  letter-spacing: -.012em;
  line-height: 1.14;
  color: var(--muted);
}
.manifesto-statement .fix {
  font-family: var(--font-display);
  font-size: clamp(1.45rem, .95rem + 2vw, 2.75rem);
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
.contrast-row { padding: 14px 4px; border-bottom: 1px solid var(--line-soft); display: grid; gap: 8px; }
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
  padding: 17px 16px;
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

.g-edge { stroke: rgba(182, 194, 203, .28); stroke-width: 1.6; transition: stroke .6s var(--ease-out), opacity .6s var(--ease-out); }
.g-edge.hot { stroke: var(--rose-deep); stroke-width: 2.6; filter: drop-shadow(0 0 6px rgba(244, 63, 94, .55)); }
.g-node circle, .g-node rect { fill: var(--panel-2); stroke: rgba(182, 194, 203, .4); stroke-width: 1.5; transition: stroke .6s var(--ease-out), opacity .6s var(--ease-out); }
.g-node.hot circle, .g-node.hot rect { stroke: var(--rose); filter: drop-shadow(0 0 7px rgba(244, 63, 94, .5)); }
.g-node.t0 circle { fill: rgba(244, 63, 94, .16); stroke: var(--rose-deep); stroke-width: 2; }
.g-node text { fill: var(--soft); font-family: var(--font-mono); font-size: 10.5px; transition: fill .6s; }
.g-node .sub { fill: var(--faint); font-size: 8.5px; }

/* --- the edge cut: staged ignition, then the sever --- */
html.js svg[data-graph] .g-edge.hot { stroke-dasharray: 4 6; }
html.js svg[data-graph].ignited .g-edge.hot { stroke-dasharray: none; }
html.js svg[data-graph] .cut-mark { transform-box: fill-box; transform-origin: center; }
svg[data-graph].severed .cut-target { stroke: var(--faint); stroke-width: 1.4; filter: none; stroke-dasharray: 3 5; opacity: .5; }
svg[data-graph].severed .downstream { stroke: rgba(182, 194, 203, .18); filter: none; stroke-width: 1.4; opacity: .45; }
svg[data-graph].severed .g-node[data-node="sess"] circle,
svg[data-graph].severed .g-node[data-node="sess"] text { stroke: rgba(182,194,203,.3); filter: none; fill: var(--faint); opacity: .55; }
html.js svg[data-graph].severed .cut-mark { animation: cut-flash .55s var(--ease-snap) forwards; }
svg[data-graph].severed .cut-mark { opacity: 1; }
.graph-verdict {
  display: inline-flex; align-items: center; gap: 12px;
  margin-top: 4px;
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: .04em;
  color: var(--rose);
  transition: color .5s;
}
.graph-verdict.severed { color: var(--green); }
.graph-verdict .dot { width: 8px; height: 8px; border-radius: 50%; background: currentColor; box-shadow: 0 0 8px currentColor; }

/* ---------- collector rules ---------- */
.rules { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0; border: 1px solid var(--line); border-radius: var(--radius-s); overflow: hidden; }
.rule-cell { padding: 17px 16px; border-right: 1px solid var(--line-soft); display: grid; gap: 8px; align-content: start; background: rgba(255,255,255,.012); }
.rule-cell:last-child { border-right: 0; }
.rule-cell .k { font-family: var(--font-mono); font-size: 10px; letter-spacing: .15em; text-transform: uppercase; color: var(--teal); }
.rule-cell.no .k { color: var(--rose); }
.rule-cell h3 { font-size: 1rem; font-weight: 680; }
.rule-cell p { font-size: 13px; color: var(--muted); line-height: 1.6; }

/* ---------- walkthrough chapters ---------- */
.chapter { position: relative; }
.chapter-head { display: grid; grid-template-columns: auto 1fr; gap: clamp(12px, 2vw, 28px); align-items: baseline; margin-bottom: var(--sp-block); }
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
  margin-top: 12px;
  padding: 12px 14px;
  border: 1px solid var(--line-soft);
  border-left: 2px solid var(--teal);
  border-radius: 0 var(--radius-s) var(--radius-s) 0;
  background: rgba(45, 212, 191, .04);
}
.chapter-note .k { font-family: var(--font-mono); font-size: 10px; letter-spacing: .14em; color: var(--teal); text-transform: uppercase; padding-top: 3px; }
.chapter-note p { font-size: 14px; color: var(--soft); line-height: 1.6; }

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
  margin-top: 14px;
  padding: 14px 16px;
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
.fold-stage { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 6fr); gap: clamp(18px, 3vw, 44px); align-items: center; }
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
.notfound { min-height: 68vh; display: grid; place-content: center; text-align: left; gap: 22px; padding-block: 60px; }
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

/* ---------- score deconstruction (Moment 4) ---------- */
.gauge-wrap { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 6fr); gap: clamp(18px, 2.8vw, 40px); align-items: center; }
.gauge-stage { position: relative; display: grid; justify-items: center; gap: 4px; transition: opacity .7s var(--ease-out), transform .7s var(--ease-out), filter .7s; }
.gauge-stage svg { max-width: 300px; }
.gauge-caption { font-family: var(--font-mono); font-size: 10.5px; letter-spacing: .13em; text-transform: uppercase; color: var(--amber); opacity: .8; }
html.js [data-gauge].shattered .gauge-stage { opacity: .32; transform: scale(.94); filter: saturate(.5); }
#gauge-arc { transition: stroke-dashoffset 1.3s var(--ease-out); }

.worklist { display: grid; gap: 0; border-top: 1px solid var(--line); overflow: clip; }
.worklist-head { font-family: var(--font-mono); font-size: 10.5px; letter-spacing: .14em; text-transform: uppercase; color: var(--muted); padding: 12px 4px; }
.workitem { display: grid; grid-template-columns: auto 1fr auto; gap: 16px; align-items: center; padding: 15px 4px; border-bottom: 1px solid var(--line-soft); }
html.js [data-worklist] .workitem { opacity: 0; transform: translateX(18px); }
html.js [data-worklist].cascade .workitem { animation: shard-in .55s var(--ease-out) forwards; }
.workitem .rank { font-family: var(--font-mono); font-size: 11px; color: var(--teal); width: 24px; }
.workitem .what { font-size: 14.5px; color: var(--soft); }
.workitem .what strong { color: var(--ink); font-weight: 640; display: block; font-size: 14.5px; }
.workitem .what span { font-size: 12px; color: var(--faint); font-family: var(--font-mono); }
@keyframes shard-in { from { opacity: 0; transform: translateX(18px) scale(.98); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) {
  html.js [data-worklist] .workitem { opacity: 1; transform: none; }
  html.js [data-gauge].shattered .gauge-stage { opacity: 1; transform: none; filter: none; }
}

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
@media (max-width: 560px) {
  .rules { grid-template-columns: 1fr; }
  .rule-cell { border-right: 0; }
  .chapter-head { grid-template-columns: 1fr; gap: 10px; }
  .sow-row { grid-template-columns: 48px 1fr; }
  .sow-check { display: none; }
}
`;
