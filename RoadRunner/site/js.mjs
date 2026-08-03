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
  setTimeout(() => {
    revealEls.forEach((el) => el.classList.add("in"));
    document.querySelectorAll("[data-flow]").forEach((f) => f.classList.add("flowed"));
  }, 2600);

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

  /* ---------- Moment 1: hero run replays ---------- */
  const runpanel = document.querySelector("[data-replay]");
  if (runpanel && motionOK() && "IntersectionObserver" in window) {
    const scan = document.createElement("div");
    scan.className = "scanline";
    runpanel.prepend(scan);
    let onScreen = false, timer = 0;
    const play = () => {
      runpanel.style.setProperty("--scan-h", runpanel.offsetHeight + "px");
      runpanel.classList.remove("replaying");
      void runpanel.offsetWidth; // reflow to restart animations
      runpanel.classList.add("replaying");
    };
    const loop = () => {
      if (!onScreen) return;
      play();
      timer = window.setTimeout(loop, 9000);
    };
    new IntersectionObserver((entries) => {
      onScreen = entries[0].isIntersecting;
      if (onScreen) { if (!timer) loop(); }
      else { clearTimeout(timer); timer = 0; }
    }, { threshold: 0.4 }).observe(runpanel);
  }

  /* ---------- Moment 2: the Loop scrollytelling ---------- */
  const loopEl = document.querySelector("[data-loop]");
  if (loopEl) {
    const stages = [...loopEl.querySelectorAll(".loop-stage")];
    const card = loopEl.querySelector(".loop-card");
    const pips = [...loopEl.querySelectorAll(".loop-pip")];
    const paintCard = (idx) => {
      const s = stages[idx];
      loopEl.style.setProperty("--stage-c", s.dataset.color);
      pips.forEach((p, i) => {
        p.classList.toggle("on", i === idx);
        p.classList.toggle("done", i < idx);
      });
      if (card) {
        card.querySelector(".lc-label").textContent = s.dataset.label;
        card.querySelector("h4").textContent = s.dataset.title;
        card.querySelector(".lc-state").textContent = s.dataset.state;
        card.querySelector(".lc-evidence").textContent = s.dataset.evidence;
      }
    };
    if ("IntersectionObserver" in window && !rm.matches) {
      const setStage = (idx) => {
        stages.forEach((el, i) => el.classList.toggle("active", i === idx));
        paintCard(idx);
      };
      const sio = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setStage(stages.indexOf(e.target)); });
      }, { rootMargin: "-45% 0px -45% 0px", threshold: 0 });
      stages.forEach((s) => sio.observe(s));
      setStage(0);
    } else {
      // reduced motion / no IO: every stage readable, card rests on closure
      stages.forEach((s) => s.classList.add("active"));
      pips.forEach((p) => p.classList.add("done"));
      paintCard(stages.length - 1);
    }
  }

  /* ---------- Moment 4: gauge shatters into work (microsoft) ---------- */
  const gauge = document.querySelector("[data-gauge]");
  if (gauge) {
    const arc = gauge.querySelector("#gauge-arc");
    const num = gauge.querySelector("#gauge-num");
    const worklist = gauge.querySelector("[data-worklist]");
    const items = [...gauge.querySelectorAll(".workitem")];
    items.forEach((it, i) => (it.style.animationDelay = (0.15 + i * 0.11).toFixed(2) + "s"));
    const play = () => {
      if (rm.matches) { gauge.classList.add("shattered"); worklist.classList.add("cascade"); return; }
      // 1) draw the arc to 65.8% (offset 612 -> 215) + count the number
      requestAnimationFrame(() => { if (arc) arc.style.strokeDashoffset = "215"; });
      if (num) {
        const t0 = performance.now();
        const tick = (t) => {
          const p = Math.min(1, (t - t0) / 1200);
          num.textContent = (65.8 * (1 - Math.pow(1 - p, 3))).toFixed(1) + "%";
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
      // 2) shatter into work
      setTimeout(() => { gauge.classList.add("shattered"); worklist.classList.add("cascade"); }, 1500);
    };
    if ("IntersectionObserver" in window) {
      new IntersectionObserver((e, obs) => {
        if (e[0].isIntersecting) { play(); obs.disconnect(); }
      }, { threshold: 0.4 }).observe(gauge);
    } else {
      gauge.classList.add("shattered"); worklist.classList.add("cascade");
    }
  }

  /* ---------- Moment: the edge cut (on-prem) ---------- */
  const edgecut = document.querySelector("[data-edgecut]");
  if (edgecut) {
    const svg = edgecut.querySelector("svg[data-graph]");
    const tag = edgecut.querySelector("[data-cut-tag]");
    const verdict = edgecut.querySelector("[data-verdict]");
    const vtext = edgecut.querySelector("[data-verdict-text]");
    const sever = () => {
      svg.classList.add("severed");
      if (tag) { tag.textContent = "PATH SEVERED"; tag.classList.remove("high"); tag.classList.add("done"); }
      if (verdict) verdict.classList.add("severed");
      if (vtext) vtext.textContent = "edge cut · no route to Tier 0 · proven on run RR-2026-08";
    };
    if ("IntersectionObserver" in window && !rm.matches) {
      let armed = false;
      new IntersectionObserver((entries, obs) => {
        if (entries[0].isIntersecting && !armed) {
          armed = true;
          svg.classList.add("ignited");
          setTimeout(sever, 1900);
          obs.disconnect();
        }
      }, { threshold: 0.5 }).observe(edgecut);
    }
    // reduced motion / no IO: leave the ignited path standing (the exposure);
    // the recommended cut is stated in the finding + closure table below.
  }

  /* ---------- flow pipelines fill on approach ---------- */
  const flows = document.querySelectorAll("[data-flow]");
  if (flows.length && "IntersectionObserver" in window) {
    const fio = new IntersectionObserver((entries, obs) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("flowed"); obs.unobserve(e.target); }
      });
    }, { threshold: 0.3 });
    flows.forEach((f) => fio.observe(f));
  } else {
    flows.forEach((f) => f.classList.add("flowed"));
  }

  /* ---------- demo chapters highlight on approach ---------- */
  const chapters = document.querySelectorAll(".chapter");
  if (chapters.length && "IntersectionObserver" in window) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((e) => e.target.classList.toggle("active", e.isIntersecting));
    }, { rootMargin: "-30% 0px -45% 0px", threshold: 0 });
    chapters.forEach((c) => cio.observe(c));
  } else {
    chapters.forEach((c) => c.classList.add("active"));
  }

  /* ---------- Moment 3: brand swap ---------- */
  const swap = document.querySelector("[data-brandswap]");
  if (swap) {
    const portal = swap.querySelector(".swap-portal");
    const btns = [...swap.querySelectorAll(".swap-btn")];
    const nameEls = swap.querySelectorAll("[data-brandname]");
    const footEl = swap.querySelector("[data-brandfoot]");
    const apply = (btn) => {
      portal.style.setProperty("--accent", btn.dataset.accent);
      portal.classList.toggle("round", btn.dataset.round === "1");
      nameEls.forEach((el) => {
        el.textContent = el.dataset.brandname === "mono" ? btn.dataset.name.toUpperCase() : btn.dataset.name;
      });
      if (footEl) footEl.textContent = btn.dataset.foot;
      btns.forEach((b) => b.setAttribute("aria-pressed", b === btn ? "true" : "false"));
    };
    btns.forEach((b) => b.addEventListener("click", () => apply(b)));
  }

  /* ---------- contact form -> structured mailto draft ---------- */
  const form = document.querySelector("[data-contact-form]");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const subjectByInterest = {
        demo: "RoadRunner Secure product demo",
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
