// Motion layer: reveal grammar, stamps, feeds, signature-moment keyframes.
// Rule: transform/opacity/clip-path only. Reduced-motion gets the finished state.
export const motion = String.raw`
/* ---------- reveal grammar ---------- */
html.js .rv {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity var(--dur-2) var(--ease-out), transform var(--dur-2) var(--ease-out);
  transition-delay: var(--d, 0s);
}
html.js .rv.in { opacity: 1; transform: none; }
html.js .rv-scale { opacity: 0; transform: scale(.965) translateY(10px); transition: opacity var(--dur-2) var(--ease-out), transform var(--dur-2) var(--ease-out); transition-delay: var(--d, 0s); }
html.js .rv-scale.in { opacity: 1; transform: none; }

/* hero entrance: staged once on load */
html.js .hero-copy > * { transform: translateY(12px); animation: rise .65s var(--ease-out) forwards; }
html.js .hero-copy > *:nth-child(1) { animation-delay: .05s; }
html.js .hero-copy > *:nth-child(2) { animation-delay: .14s; }
html.js .hero-copy > *:nth-child(3) { animation-delay: .26s; }
html.js .hero-copy > *:nth-child(4) { animation-delay: .36s; }
html.js .hero-copy > *:nth-child(5) { animation-delay: .44s; }
html.js .hero-visual { transform: translateY(14px) scale(.99); animation: rise-panel .75s var(--ease-out) .22s forwards; }

@keyframes rise { to { opacity: 1; transform: none; } }
@keyframes rise-panel { to { opacity: 1; transform: none; } }

/* ---------- stamp slam ---------- */
@keyframes stamp-in {
  0% { opacity: 0; transform: rotate(-3.5deg) scale(2.1); }
  55% { opacity: 1; transform: rotate(-3.5deg) scale(.93); }
  75% { transform: rotate(-3.5deg) scale(1.04); }
  100% { opacity: 1; transform: rotate(-3.5deg) scale(1); }
}
html.js .stamp.will-slam { opacity: 0; }
html.js .stamp.slam { animation: stamp-in .5s var(--ease-snap) forwards; }

/* ---------- feed line entrances (hero run panel) ---------- */
@keyframes feed-in { from { opacity: 0; transform: translateX(-8px); } to { opacity: 1; transform: none; } }

/* ---------- dash flow for pipeline/graph edges ---------- */
@keyframes dash-flow { to { stroke-dashoffset: -28; } }
.flowing { stroke-dasharray: 6 8; animation: dash-flow 1.6s linear infinite; }

/* ---------- gauge draw ---------- */
@keyframes draw-arc { from { stroke-dashoffset: var(--arc-len, 400); } to { stroke-dashoffset: var(--arc-rest, 120); } }

/* ---------- edge cut snap ---------- */
@keyframes cut-flash { 0% { opacity: 0; transform: scale(.4) rotate(-8deg); } 40% { opacity: 1; transform: scale(1.25) rotate(3deg); } 100% { opacity: 1; transform: scale(1) rotate(0); } }

/* ---------- soft float for atmosphere accents ---------- */
@keyframes drift { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-9px); } }

/* ---------- reduced motion: everything arrives finished ---------- */
@media (prefers-reduced-motion: reduce) {
  html.js .rv, html.js .rv-scale, html.js .hero-copy > *, html.js .hero-visual { opacity: 1 !important; transform: none !important; animation: none !important; transition: none !important; }
  html.js .stamp.will-slam { opacity: 1; }
  .flowing { animation: none; }
  .live-dot::before { animation: none; }
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
}
`;
