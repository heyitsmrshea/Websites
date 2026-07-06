// Client-side JS, assembled into /script.js. Vanilla, no dependencies.
// Signature-moment timelines are added by later build phases; everything here
// degrades to a complete static page without JS.
export function clientJs(brand) {
  return String.raw`(() => {
  "use strict";
  document.documentElement.classList.add("js");
  const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
  const motionOK = () => !rm.matches;

  /* ---------- reveal grammar ---------- */
  const revealEls = document.querySelectorAll(".rv, .rv-scale");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      }
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in"));
  }
  // Safety net: nothing stays hidden if observation never fires (print,
  // full-page capture, partial JS failure). Reveal is enhancement, not a gate.
  setTimeout(() => revealEls.forEach((el) => el.classList.add("in")), 2600);

  /* ---------- stamps slam when seen ---------- */
  const stamps = document.querySelectorAll(".stamp.will-slam");
  if ("IntersectionObserver" in window && stamps.length) {
    const sio = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("slam");
          sio.unobserve(e.target);
        }
      }
    }, { threshold: 0.6 });
    stamps.forEach((el) => sio.observe(el));
  } else {
    stamps.forEach((el) => el.classList.add("slam"));
  }

  /* ---------- count-up numbers ---------- */
  const counters = document.querySelectorAll("[data-count]");
  const runCount = (el) => {
    const target = parseFloat(el.dataset.count);
    const prefix = el.dataset.prefix || "";
    const suffix = el.dataset.suffix || "";
    if (!motionOK() || !isFinite(target)) { el.textContent = prefix + el.dataset.count + suffix; return; }
    const dur = 900;
    const t0 = performance.now();
    const step = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ("IntersectionObserver" in window && counters.length) {
    const cio = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) { runCount(e.target); cio.unobserve(e.target); }
      }
    }, { threshold: 0.7 });
    counters.forEach((el) => cio.observe(el));
  } else {
    counters.forEach(runCount);
  }

  /* ---------- generic tabs ---------- */
  document.querySelectorAll("[data-tabs]").forEach((root) => {
    const tabs = root.querySelectorAll("[role=tab]");
    const panels = root.querySelectorAll("[role=tabpanel]");
    const select = (tab) => {
      tabs.forEach((t) => {
        const on = t === tab;
        t.setAttribute("aria-selected", on ? "true" : "false");
        t.tabIndex = on ? 0 : -1;
      });
      panels.forEach((p) => { p.hidden = p.id !== tab.getAttribute("aria-controls"); });
    };
    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => select(tab));
      tab.addEventListener("keydown", (ev) => {
        const dir = ev.key === "ArrowRight" ? 1 : ev.key === "ArrowLeft" ? -1 : 0;
        if (!dir) return;
        ev.preventDefault();
        const next = tabs[(i + dir + tabs.length) % tabs.length];
        next.focus();
        select(next);
      });
    });
  });

  /* ---------- copy buttons ---------- */
  document.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const src = document.getElementById(btn.dataset.copy);
      if (!src) return;
      try {
        await navigator.clipboard.writeText((src.dataset.raw || src.textContent).trim());
        btn.classList.add("copied");
        const prev = btn.textContent;
        btn.textContent = "COPIED";
        setTimeout(() => { btn.classList.remove("copied"); btn.textContent = prev; }, 1600);
      } catch { /* clipboard unavailable; selection still works */ }
    });
  });

  /* ---------- mobile menu: close after navigating ---------- */
  document.querySelectorAll(".mobile-menu a").forEach((a) => {
    a.addEventListener("click", () => a.closest("details")?.removeAttribute("open"));
  });

  /* ---------- contact form -> structured mailto draft ---------- */
  const form = document.querySelector("[data-contact-form]");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const subjectByInterest = {
        walkthrough: "RoadRunner Secure product walkthrough",
        pilot: "RoadRunner Secure pilot scope",
        "white-label": "RoadRunner Secure MSP white-label model",
        security: "RoadRunner Secure security review"
      };
      const interest = data.get("interest") || "pilot";
      const body = [
        "Name: " + (data.get("name") || ""),
        "Work email: " + (data.get("email") || ""),
        "Company: " + (data.get("company") || ""),
        "Role: " + (data.get("role") || ""),
        "Interest: " + interest,
        "Environment size: " + (data.get("size") || ""),
        "Microsoft / on-prem scope: " + (data.get("scope") || ""),
        "",
        "Notes:",
        data.get("notes") || ""
      ].join("\n");
      window.location.href = "mailto:${brand.email}?subject=" +
        encodeURIComponent(subjectByInterest[interest] || subjectByInterest.pilot) +
        "&body=" + encodeURIComponent(body);
    });
  }
})();
`;
}
