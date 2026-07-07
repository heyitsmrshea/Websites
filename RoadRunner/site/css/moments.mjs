// Signature-moment styles: hero replay, the Loop scrollytelling, brand swap.
export const moments = String.raw`
/* ===================== Moment 1: hero run replay ===================== */
.runpanel { overflow: clip; }
.scanline {
  position: absolute;
  left: 0; right: 0; top: 0;
  height: 90px;
  pointer-events: none;
  background: linear-gradient(180deg, transparent, rgba(45, 212, 191, .16) 60%, rgba(127, 240, 225, .28));
  opacity: 0;
  z-index: 3;
}
html.js .runpanel.replaying .scanline { animation: scan 1.25s var(--ease-out); }
@keyframes scan {
  0% { transform: translateY(-90px); opacity: 0; }
  20% { opacity: 1; }
  85% { opacity: 1; }
  100% { transform: translateY(var(--scan-h, 420px)); opacity: 0; }
}
html.js .runpanel.replaying .feed-row { animation: feed-in .5s var(--ease-out) both; }
html.js .runpanel.replaying .feed-row:nth-child(1) { animation-delay: .12s; }
html.js .runpanel.replaying .feed-row:nth-child(2) { animation-delay: .26s; }
html.js .runpanel.replaying .feed-row:nth-child(3) { animation-delay: .4s; }
html.js .runpanel.replaying .feed-row:nth-child(4) { animation-delay: .54s; }
.feed-row .stamp-mini {
  margin-left: 8px;
  font-family: var(--font-mono);
  font-size: 8.5px;
  font-weight: 750;
  letter-spacing: .12em;
  color: var(--green);
  border: 1.5px solid var(--green);
  border-radius: 4px;
  padding: 2px 5px;
  display: inline-block;
  vertical-align: middle;
}
html.js .runpanel.replaying .feed-row:last-child .stamp-mini { animation: stamp-in .5s var(--ease-snap) .78s both; }

/* ===================== Moment 2: the Loop scrollytelling ===================== */
.loop { position: relative; }
.loop-scroller { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr); gap: clamp(18px, 3vw, 46px); align-items: start; }
.loop-stages { display: grid; gap: 0; }
.loop-stage {
  padding: clamp(18px, 4vh, 38px) 0;
  border-top: 1px solid var(--line-soft);
  opacity: .32;
  transition: opacity .5s var(--ease-out);
}
.loop-stage:first-child { border-top: 0; }
.loop-stage.active { opacity: 1; }
.loop-stage .n {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 650;
  letter-spacing: .16em;
  color: var(--stage-c, var(--teal));
}
.loop-stage h3 {
  font-family: var(--font-display);
  font-weight: 500;
  font-size: clamp(1.25rem, 1rem + 1vw, 1.85rem);
  letter-spacing: -.012em;
  margin: 10px 0 12px;
}
.loop-stage p { color: var(--muted); font-size: 15px; line-height: 1.62; max-width: 42ch; }
.loop-stage .evi { margin-top: 10px; font-family: var(--font-mono); font-size: 11.5px; color: var(--faint); letter-spacing: .03em; }
.loop-stage.active .evi { color: var(--stage-c, var(--teal)); }

/* sticky visual — the traveling finding */
.loop-sticky { position: sticky; top: 14vh; height: 72vh; display: grid; align-content: center; }
.loop-card {
  position: relative;
  background: linear-gradient(178deg, var(--panel-1), var(--panel-0));
  border: 1px solid var(--line);
  border-top-color: rgba(255, 255, 255, .12);
  border-radius: var(--radius);
  box-shadow: var(--shadow-panel);
  padding: 18px;
  overflow: clip;
  transition: border-color .6s var(--ease-out);
}
.loop-card::before {
  content: "";
  position: absolute; inset: 0 auto 0 0; width: 3px;
  background: var(--stage-c, var(--teal));
  transition: background .6s var(--ease-out);
}
.loop-track { display: flex; justify-content: space-between; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid var(--line-soft); }
.loop-pip { display: grid; gap: 7px; justify-items: center; flex: 1; position: relative; }
.loop-pip i {
  width: 11px; height: 11px; border-radius: 50%;
  background: var(--panel-2); border: 1.5px solid var(--faint);
  transition: all .4s var(--ease-out);
  z-index: 1;
}
.loop-pip span { font-family: var(--font-mono); font-size: 8.5px; letter-spacing: .08em; color: var(--faint); transition: color .4s; }
.loop-pip.done i { background: var(--stage-c); border-color: var(--stage-c); }
.loop-pip.on i { background: var(--stage-c); border-color: var(--stage-c); box-shadow: 0 0 0 4px color-mix(in srgb, var(--stage-c) 22%, transparent); transform: scale(1.25); }
.loop-pip.on span, .loop-pip.done span { color: var(--soft); }
.loop-pip:not(:last-child)::after {
  content: ""; position: absolute; top: 5px; left: 50%; width: 100%; height: 1.5px;
  background: var(--line); z-index: 0;
}
.loop-pip.done:not(:last-child)::after { background: var(--stage-c); }
.loop-card .lc-label { font-family: var(--font-mono); font-size: 10px; letter-spacing: .15em; text-transform: uppercase; color: var(--muted); margin-bottom: 8px; }
.loop-card h4 { font-family: var(--font-display); font-weight: 500; font-size: 1.5rem; line-height: 1.16; letter-spacing: -.01em; margin-bottom: 16px; }
.loop-card .lc-state {
  display: inline-flex; align-items: center; gap: 10px;
  font-family: var(--font-mono); font-size: 11px; letter-spacing: .06em;
  padding: 9px 13px; border-radius: 8px;
  border: 1px solid var(--stage-c);
  color: var(--stage-c);
  background: color-mix(in srgb, var(--stage-c) 8%, transparent);
  transition: all .5s var(--ease-out);
}
.loop-card .lc-state .stamp { transform: rotate(-3deg); }
.loop-card .lc-meta { margin-top: 14px; display: grid; gap: 8px; }
.loop-card .lc-meta div { display: grid; grid-template-columns: 92px 1fr; gap: 12px; font-size: 12.5px; }
.loop-card .lc-meta b { font-family: var(--font-mono); font-size: 9.5px; letter-spacing: .12em; text-transform: uppercase; color: var(--faint); padding-top: 2px; }
.loop-card .lc-meta span { color: var(--soft); }

/* ===================== Moment 3: brand swap ===================== */
.brandswap { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: clamp(18px, 2.8vw, 38px); align-items: center; }
.swap-controls { display: grid; gap: 10px; }
.swap-controls .k { font-family: var(--font-mono); font-size: 10.5px; letter-spacing: .15em; text-transform: uppercase; color: var(--muted); margin-bottom: 4px; }
.swap-btn {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 14px;
  align-items: center;
  text-align: left;
  padding: 15px 18px;
  border: 1px solid var(--line);
  border-radius: var(--radius-s);
  background: rgba(255, 255, 255, .015);
  cursor: pointer;
  transition: border-color .2s, background .2s;
  color: inherit;
}
.swap-btn:hover { border-color: var(--line-strong); }
.swap-btn[aria-pressed="true"] { border-color: var(--sw, var(--teal)); background: color-mix(in srgb, var(--sw, var(--teal)) 8%, transparent); }
.swap-btn .dot { width: 13px; height: 13px; border-radius: 4px; background: var(--sw, var(--teal)); transform: rotate(45deg); }
.swap-btn.round .dot { border-radius: 50%; transform: none; }
.swap-btn > span:last-child { display: grid; gap: 2px; }
.swap-btn .bn { font-weight: 700; font-size: 14.5px; }
.swap-btn .bd { font-size: 12px; color: var(--muted); }

/* live mini portal that re-skins */
.swap-portal {
  --accent: #2dd4bf;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  overflow: clip;
  background: var(--panel-0);
  box-shadow: var(--shadow-panel);
  transition: box-shadow .4s;
}
.swap-portal-bar {
  display: flex; align-items: center; gap: 12px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--line-soft);
  background: rgba(255, 255, 255, .02);
}
.swap-gem { width: 14px; height: 14px; background: var(--accent); transform: rotate(45deg); border-radius: 3px; box-shadow: 0 0 12px color-mix(in srgb, var(--accent) 60%, transparent); transition: all .4s; }
.swap-portal.round .swap-gem { border-radius: 50%; transform: none; }
.swap-brandname { font-family: var(--font-mono); font-weight: 700; letter-spacing: .28em; font-size: 13px; color: var(--accent); transition: color .4s; }
.swap-portal-bar .live { margin-left: auto; font-family: var(--font-mono); font-size: 9px; letter-spacing: .16em; color: var(--green); }
.swap-portal-body { padding: 20px; display: grid; gap: 14px; }
.swap-kpis { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.swap-kpi { border: 1px solid var(--line-soft); border-radius: 9px; padding: 13px; border-top: 2px solid var(--kc, var(--accent)); }
.swap-kpi b { font-family: var(--font-mono); font-size: 1.5rem; font-weight: 640; color: var(--kc, var(--accent)); display: block; line-height: 1; }
.swap-kpi span { font-size: 10px; color: var(--muted); }
.swap-rows { display: grid; gap: 0; }
.swap-rows .r { display: grid; grid-template-columns: auto 1fr auto; gap: 12px; align-items: center; padding: 9px 0; border-bottom: 1px solid var(--line-soft); font-size: 12px; color: var(--soft); }
.swap-rows .r:last-child { border-bottom: 0; }
.swap-rows .v { font-family: var(--font-mono); font-size: 8px; font-weight: 750; letter-spacing: .1em; color: var(--accent); border: 1.5px solid var(--accent); border-radius: 4px; padding: 3px 6px; transition: color .4s, border-color .4s; }
.swap-foot { font-family: var(--font-mono); font-size: 9.5px; letter-spacing: .1em; color: var(--faint); padding-top: 4px; }
.swap-foot b { color: var(--accent); font-weight: 700; transition: color .4s; }

@media (max-width: 940px) {
  .loop-scroller { grid-template-columns: 1fr; }
  .loop-sticky { position: static; height: auto; margin-bottom: 20px; order: -1; }
  .brandswap { grid-template-columns: 1fr; }
  .swap-controls { grid-template-columns: 1fr 1fr 1fr; display: grid; }
  .swap-controls .k { grid-column: 1 / -1; }
}
@media (max-width: 560px) {
  .swap-controls { grid-template-columns: 1fr; }
  .swap-kpis { grid-template-columns: 1fr 1fr; }
}
`;
