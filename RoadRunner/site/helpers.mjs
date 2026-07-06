// Shared HTML builders — the component vocabulary every page speaks.
import { brand } from "./meta.mjs";

export function sectionHead(eyebrow, title, copy, tone = "") {
  return `<div class="section-head rv">
    <div>
      <div class="eyebrow ${tone}">${eyebrow}</div>
      <h2>${title}</h2>
    </div>
    <p>${copy}</p>
  </div>`;
}

export function railCard(num, title, text) {
  return `<div class="railcard rv" ${num ? "" : ""}>
    ${num ? `<span class="num">${num}</span>` : ""}
    <h3>${title}</h3>
    <p>${text}</p>
  </div>`;
}

export function rail(cols, cards) {
  return `<div class="rail cols-${cols}">${cards.map((c, i) => c.replace(`class="railcard rv"`, `class="railcard rv" style="--d:${(i * 0.07).toFixed(2)}s"`)).join("")}</div>`;
}

export function ledgerRow(k, v, status = "") {
  return `<div class="ledger-row rv">
    <span class="k">${k}</span>
    <span class="v">${v}</span>
    ${status}
  </div>`;
}

export function tag(level) {
  const cls = level === "DONE" || level === "OK" || level === "PASS" ? "done"
    : level === "GAP" || level === "SET" || level === "OPTION" || level === "NEEDED" ? "gap"
    : level === "HIGH" || level === "TIER 0" ? "high" : "live";
  return `<span class="tag ${cls}">${level}</span>`;
}

export function stamp(text, tone = "", slam = true) {
  return `<span class="stamp ${tone} ${slam ? "will-slam" : ""}">${text}</span>`;
}

export function table(rows, opts = {}) {
  const [head, ...body] = rows;
  return `<div class="tablewrap rv ${opts.cls || ""}">
    <table>
      <thead><tr>${head.map((cell) => `<th>${cell}</th>`).join("")}</tr></thead>
      <tbody>${body.map((row) => `<tr>${row.map((cell, i) => `<td data-label="${head[i] || ""}">${cell}</td>`).join("")}</tr>`).join("")}</tbody>
    </table>
  </div>`;
}

export function exhibit({ img, url, letter, alt, caption, meta = "SYNTHETIC TENANT", width = 1440, height = 900, eager = false }) {
  // img is the base name under /assets/img (no extension); WebP with PNG fallback.
  const webp = `/assets/img/${img}.webp`;
  const png = `/assets/img/${img}.png`;
  return `<figure class="exhibit rv-scale">
    <div class="exhibit-bar">
      <span class="exhibit-dots"><i></i><i></i><i></i></span>
      <span class="exhibit-url">${url}</span>
      <span class="exhibit-tag">EXHIBIT ${letter} · ${meta}</span>
    </div>
    <picture>
      <source srcset="${webp}" type="image/webp">
      <img src="${png}" alt="${alt}" width="${width}" height="${height}" ${eager ? `loading="eager" fetchpriority="high"` : `loading="lazy" decoding="async"`}>
    </picture>
    <figcaption class="exhibit-caption"><span>${caption}</span><span>RUN RR-2026-07</span></figcaption>
  </figure>`;
}

export function exhibitRow(exhibitHtml, title, text, flip = false, extra = "") {
  return `<div class="exhibit-row ${flip ? "flip" : ""}">
    <div class="exhibit-col">${exhibitHtml}</div>
    <div class="copy rv">
      <h3>${title}</h3>
      <p>${text}</p>
      ${extra}
    </div>
  </div>`;
}

export function flow(steps) {
  return `<div class="flow rv" data-flow><span class="flow-progress" aria-hidden="true"></span>${steps.map(([t, s], i) =>
    `<div class="flow-step" style="--d:${(i * 0.09).toFixed(2)}s"><span class="num">${String(i + 1).padStart(2, "0")}</span><strong>${t}</strong><span>${s}</span></div>`
  ).join("")}</div>`;
}

export function findingArtifact(item, opts = {}) {
  return `<div class="artifact rv-scale ${opts.cls || ""}">
    <div class="artifact-top">
      <div>
        <span class="label">${item.label} · ${item.id || "RR-F-0117"}</span>
        <h3>${item.title}</h3>
      </div>
      ${tag(item.severity)}
    </div>
    <div class="artifact-grid">
      ${artifactField("Affected", item.affected)}
      ${artifactField("Evidence", item.evidence)}
      ${artifactField("Risk", item.risk)}
      ${artifactField("Recommended action", item.action)}
      ${artifactField("Validation", item.validation)}
      <div class="artifact-field rule">
        <b>Closure rule</b>
        <span>Manual status cannot close this finding. Evidence from the next run must satisfy the validation condition.</span>
      </div>
    </div>
  </div>`;
}

export function artifactField(label, text) {
  return `<div class="artifact-field"><b>${label}</b><span>${text}</span></div>`;
}

export const findings = {
  home: {
    label: "Sample assessment finding",
    id: "RR-F-0117",
    title: "Standing privileged access remains assigned outside emergency workflow",
    severity: "HIGH",
    affected: "3 Global Admins, 2 Privileged Role Administrators",
    evidence: "Entra role assignments observed in current evidence snapshot; no just-in-time activation record attached.",
    risk: "Compromised daily-use or stale privileged accounts can bypass normal access controls and expand blast radius.",
    action: "Move standing admins to eligible access, require phishing-resistant MFA, and document break-glass exceptions.",
    validation: "Next run must show no standing privileged assignment except approved break-glass accounts."
  },
  onprem: {
    label: "Sample path finding",
    id: "RR-F-0142",
    title: "Service account creates path from workstation admin to Tier 0",
    severity: "HIGH",
    affected: "CORP\\svc-build, Workstation Admins, ENG-WS-044, Domain Admins",
    evidence: "Collector graph shows memberOf, localAdmin, and activeSession edges forming a route to Tier 0.",
    risk: "An attacker controlling the service account can move through a managed workstation into a privileged session.",
    action: "Remove the account from broad workstation administration or isolate admin sessions from exposed endpoints.",
    validation: "Next collector run must show no route from CORP\\svc-build to Tier 0."
  },
  microsoft: {
    label: "Sample Microsoft finding",
    id: "RR-F-0155",
    title: "Conditional Access excludes legacy service accounts without compensating control",
    severity: "HIGH",
    affected: "4 accounts excluded from MFA policy; 2 observed interactive sign-ins in the last 14 days",
    evidence: "Policy exclusion list plus sign-in evidence shows recent use outside expected service context.",
    risk: "Excluded accounts create a durable identity bypass that attackers can use after password compromise.",
    action: "Remove interactive-capable accounts from exclusion or attach documented exception controls.",
    validation: "Next run must show no recent interactive sign-ins for excluded service accounts or an approved exception."
  },
  demo: {
    label: "Walkthrough finding",
    id: "RR-F-0161",
    title: "MFA exception and AD path combine into a priority remediation item",
    severity: "HIGH",
    affected: "One excluded identity, one exposed admin path, one client-visible closure objective",
    evidence: "Microsoft policy evidence plus AD collector path evidence create a higher-confidence exposure story.",
    risk: "Single-domain findings may look manageable alone; combined evidence shows a realistic path to impact.",
    action: "Close the identity exception and cut the AD path edge before treating either item as resolved.",
    validation: "Next run must show the policy exception removed and the AD graph path broken."
  }
};

export function contactSection() {
  return `<section class="section tinted tint-teal" style="--tint-x: 85%">
    <div class="shell contact-grid">
      <div class="rv">
        <div class="eyebrow">Contact</div>
        <h2>Walk through the product or scope a pilot.</h2>
        <p class="lead">The form opens a structured email draft. The static site does not collect, transmit, or store form data by itself.</p>
        <a class="button secondary" href="mailto:${brand.email}">${brand.email}</a>
      </div>
      <form class="contact-form rv" style="--d:.12s" data-contact-form>
        <div class="field-grid">
          <label>Name<input name="name" autocomplete="name" required></label>
          <label>Work email<input name="email" type="email" autocomplete="email" required></label>
        </div>
        <div class="field-grid">
          <label>Company<input name="company" autocomplete="organization"></label>
          <label>Role<input name="role" autocomplete="organization-title"></label>
        </div>
        <label>Interest
          <select name="interest">
            <option value="pilot">Scope a pilot</option>
            <option value="white-label">Review MSP white-label model</option>
            <option value="walkthrough">Product walkthrough</option>
            <option value="security">Security review</option>
          </select>
        </label>
        <div class="field-grid">
          <label>Environment size<input name="size" placeholder="Users, endpoints, tenants"></label>
          <label>Microsoft / on-prem scope<input name="scope" placeholder="M365, Azure, AD, Defender, Intune"></label>
        </div>
        <label>Notes
          <textarea name="notes" rows="5" placeholder="Pilot goals, MSP/client model, deployment constraints, security-review concerns"></textarea>
        </label>
        <button class="button primary" type="submit">Open email draft</button>
        <p class="form-note">No data is stored by this static page unless you send the generated email.</p>
      </form>
    </div>
  </section>`;
}

export function termBlock({ title, id, lines, tabs = null }) {
  const rendered = lines.map((l) => {
    if (l.startsWith("$ ")) return `<span class="p">$</span> ${l.slice(2)}`;
    if (l.startsWith("# ")) return `<span class="c">${l}</span>`;
    return l;
  }).join("\n");
  const rawCommands = lines.filter((l) => l.startsWith("$ ")).map((l) => l.slice(2)).join("\n") || lines.join("\n");
  return `<div class="term rv-scale">
    ${tabs || ""}
    <div class="term-bar">
      <span class="exhibit-dots"><i></i><i></i><i></i></span>
      <span class="term-title">${title}</span>
      <button class="term-copy" type="button" data-copy="${id}">COPY</button>
    </div>
    <div class="term-body"><pre id="${id}" data-raw="${rawCommands.replaceAll("\\", "&#92;").replaceAll(`"`, "&quot;").replaceAll("\n", "&#10;")}">${rendered}</pre></div>
  </div>`;
}
