// CASEFILE design tokens — the entire visual system reads from these.
export const tokens = String.raw`
:root {
  color-scheme: dark;

  /* ---- void: the ops surface ---- */
  --void-0: #04060a;
  --void-1: #070c13;
  --panel-0: #0b121b;
  --panel-1: #0f1722;
  --panel-2: #131e2b;

  --ink: #f2f6f9;
  --soft: #b4c0cb;
  --muted: #6d7b88;
  --faint: #46525e;

  --line: rgba(198, 220, 236, .13);
  --line-soft: rgba(198, 220, 236, .07);
  --line-strong: rgba(45, 212, 191, .45);

  /* ---- semantic arc: exposure -> work -> closure ---- */
  --teal: #2dd4bf;        /* brand / system / read-only */
  --teal-hi: #7ff0e1;
  --teal-dim: rgba(45, 212, 191, .14);
  --rose: #fb7185;        /* exposure */
  --rose-deep: #f43f5e;
  --rose-dim: rgba(244, 63, 94, .13);
  --amber: #fbbf24;       /* work in motion */
  --amber-dim: rgba(251, 191, 36, .12);
  --green: #34d399;       /* verified closure */
  --green-dim: rgba(52, 211, 153, .13);

  /* ---- paper: the report artifact ---- */
  --paper: #f4f0e6;
  --paper-2: #ede8da;
  --paper-edge: #d9d2bf;
  --paper-ink: #14181d;
  --paper-soft: #4a5058;
  --paper-muted: #8a8574;
  --paper-line: rgba(20, 24, 29, .16);
  --paper-stamp: #1a7a5e;
  --paper-rose: #b43a4e;

  /* ---- type ---- */
  --font-display: "Newsreader", Georgia, "Times New Roman", serif;
  --font-body: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
  --font-mono: ui-monospace, "SF Mono", SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace;

  --text-hero: clamp(2.95rem, 1.15rem + 5.4vw, 5.9rem);
  --text-h2: clamp(1.95rem, 1.25rem + 2.2vw, 3.15rem);
  --text-h3: clamp(1.25rem, 1.05rem + .6vw, 1.6rem);
  --text-lead: clamp(1.08rem, 1rem + .3vw, 1.22rem);
  --text-body: 1.02rem;
  --text-mono-s: .72rem;

  /* ---- rhythm ---- */
  --sp-section: clamp(3.25rem, 2.5rem + 3.5vw, 6.25rem);
  --sp-block: clamp(1.45rem, 1.2rem + 1vw, 2.4rem);
  --shell-max: 1400px;
  --shell-pad: clamp(8px, 1.3vw, 16px);

  /* ---- surface ---- */
  --radius: 12px;
  --radius-s: 8px;
  --radius-paper: 3px;
  --shadow-panel: 0 24px 70px rgba(0, 0, 0, .5), 0 4px 18px rgba(0, 0, 0, .35);
  --shadow-exhibit: 0 40px 110px rgba(0, 0, 0, .58), 0 8px 28px rgba(0, 0, 0, .4);
  --shadow-paper: 0 30px 80px rgba(0, 0, 0, .55), 0 12px 30px rgba(0, 0, 0, .38), 0 2px 6px rgba(0, 0, 0, .3);

  /* ---- motion ---- */
  --ease-out: cubic-bezier(.19, .8, .22, 1);
  --ease-snap: cubic-bezier(.7, -0.2, .25, 1.25);
  --dur-1: .45s;
  --dur-2: .8s;
}
`;
