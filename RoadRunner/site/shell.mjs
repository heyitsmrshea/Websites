// Document shell: head, header, hero, footer, 404, legacy redirects, robots, sitemap.
import { brand, navItems } from "./meta.mjs";
import { heroVisuals } from "./visuals.mjs";

const BUILD_DATE = new Date().toISOString().slice(0, 10);

export function shell(page) {
  const canonical = page.slug ? `${brand.root}/${page.slug}/` : `${brand.root}/`;
  const ogImage = page.ogImage || `${brand.root}/assets/roadrunner-logo.png`;
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${page.title}</title>
  <meta name="description" content="${page.description}">
  <meta name="theme-color" content="#04060a">
  <link rel="canonical" href="${canonical}">
  <meta property="og:site_name" content="${brand.name}">
  <meta property="og:title" content="${page.title}">
  <meta property="og:description" content="${page.description}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${ogImage}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:image" content="${ogImage}">
  <link rel="icon" href="/assets/roadrunner-mark.svg" type="image/svg+xml">
  <link rel="alternate icon" href="/favicon.ico">
  <link rel="preload" href="/assets/fonts/newsreader-var.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/assets/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="/styles.css">
  ${page.slug === "" ? structuredData() : ""}
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  ${header(page.active)}
  <main id="main">
    ${hero(page)}
    ${page.body()}
  </main>
  ${footer()}
  <script src="/script.js" defer></script>
</body>
</html>
`;
}

function structuredData() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: brand.name,
        url: brand.root,
        logo: `${brand.root}/assets/roadrunner-logo.png`,
        email: brand.email,
        parentOrganization: { "@type": "Organization", name: `${brand.owner}, LLC` }
      },
      {
        "@type": "WebSite",
        name: brand.name,
        url: brand.root
      }
    ]
  };
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

export function header(active) {
  const links = navItems.map(([href, label]) => {
    const current = label === active ? ` aria-current="page"` : "";
    return `<a href="${href}"${current}>${label}</a>`;
  }).join("");
  return `<header class="site-header">
    <div class="nav-shell">
      <a class="brand" href="/" aria-label="RoadRunner Secure home">
        <img src="/assets/roadrunner-mark.svg" alt="" width="40" height="33">
        <span class="brand-title"><strong>RoadRunner Secure</strong><span>Evidence-verified closure</span></span>
      </a>
      <nav class="nav-links" aria-label="Primary navigation">${links}</nav>
      <div class="nav-cta">
        <a class="button secondary small" href="/contact/">Scope pilot</a>
        <a class="button primary small" href="/demo/">Walkthrough</a>
      </div>
      <details class="mobile-menu">
        <summary aria-label="Open navigation">Menu</summary>
        <nav class="mobile-menu-panel" aria-label="Mobile navigation">${links}<a href="/contact/">Scope pilot</a><a href="/demo/">Walkthrough</a></nav>
      </details>
    </div>
  </header>`;
}

export function hero(page) {
  const visual = heroVisuals[page.key];
  return `<section class="hero gridded">
    <div class="shell hero-inner">
      <div class="hero-copy">
        <div class="eyebrow">${page.eyebrow}</div>
        <h1>${page.h1}</h1>
        <p class="lead">${page.lead}</p>
        <div class="hero-actions">
          <a class="button primary" href="${page.primary[0]}">${page.primary[1]}</a>
          <a class="button secondary" href="${page.secondary[0]}">${page.secondary[1]}</a>
        </div>
        <div class="signal-row">
          <span class="chip">Read-only</span>
          <span class="chip plain">White-label</span>
          <span class="chip green">Validated closure</span>
        </div>
      </div>
      <div class="hero-visual">${visual ? visual() : ""}</div>
    </div>
  </section>`;
}

export function footer() {
  const links = navItems.slice(1).map(([href, label]) => `<a href="${href}">${label}</a>`).join("");
  return `<footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-top">
        <div>
          <p class="footer-sign">Find the path. Cut the edge. <span class="ital">Prove it died.</span></p>
          <div class="footer-brandline">
            <img src="/assets/roadrunner-mark.svg" alt="">
            <span>RoadRunner owns the assessment method. MSPs deliver the client-facing surface under their own brand.</span>
          </div>
        </div>
        <nav class="footer-links" aria-label="Footer navigation">${links}</nav>
      </div>
      <div class="footer-meta">
        <span>Read-only evidence posture</span>
        <span>No automatic remediation by default</span>
        <span>Synthetic walkthrough uses fictional evidence</span>
        <span>&copy; ${brand.owner}, LLC</span>
        <span>BUILD ${BUILD_DATE}</span>
      </div>
    </div>
  </footer>`;
}

export function notFoundPage() {
  const routes = navItems.map(([href, label]) => {
    return `<a href="${href}"><span>${label}</span><span class="mono">${href}</span></a>`;
  }).join("");
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex">
  <title>404 | RoadRunner Secure</title>
  <meta name="theme-color" content="#04060a">
  <link rel="icon" href="/assets/roadrunner-mark.svg" type="image/svg+xml">
  <link rel="stylesheet" href="/styles.css">
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  ${header("")}
  <main id="main">
    <section class="hero gridded">
      <div class="shell notfound">
        <span class="code">HTTP 404 — PATH NOT FOUND</span>
        <h1>This path doesn't exist. <span class="ital">These do.</span></h1>
        <p class="lead">No route to this page was found in the current evidence snapshot.</p>
        <nav class="routes" aria-label="Site routes">${routes}</nav>
      </div>
    </section>
  </main>
  ${footer()}
  <script src="/script.js" defer></script>
</body>
</html>
`;
}

export function legacyRedirectPage(page, title = `${page.title} moved`) {
  const target = page.slug ? `/${page.slug}/` : "/";
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex">
  <meta http-equiv="refresh" content="0; url=${target}">
  <title>${title}</title>
  <link rel="canonical" href="${page.slug ? `${brand.root}/${page.slug}/` : `${brand.root}/`}">
  <link rel="stylesheet" href="/styles.css">
</head>
<body>
  ${header(page.active)}
  <main id="main">
    <section class="hero">
      <div class="shell">
        <div class="eyebrow">Moved</div>
        <h1>This page now lives at the clean RoadRunner Secure route.</h1>
        <p class="lead">If you are not redirected automatically, open the current page.</p>
        <div class="hero-actions" style="margin-top:22px">
          <a class="button primary" href="${target}">Open current page</a>
        </div>
      </div>
    </section>
  </main>
  ${footer()}
</body>
</html>
`;
}

export function designArchivePage() {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex">
  <title>RoadRunner Secure internal design archive</title>
  <meta name="description" content="Internal noindex design archive for RoadRunner Secure homepage directions.">
  <link rel="stylesheet" href="/styles.css">
</head>
<body>
  <main id="main">
    <section class="hero">
      <div class="shell">
        <div class="eyebrow">Internal archive</div>
        <h1>Homepage directions were consolidated into the production site.</h1>
        <p class="lead">This page is intentionally noindexed and unlinked from the public navigation. Use the current RoadRunner Secure pages for review.</p>
        <div class="hero-actions" style="margin-top:22px">
          <a class="button primary" href="/">Open current homepage</a>
          <a class="button secondary" href="/demo/">Open walkthrough</a>
        </div>
      </div>
    </section>
  </main>
</body>
</html>
`;
}

export function robotsTxt() {
  return `User-agent: *
Allow: /
Disallow: /Homepage%20Directions.dc.html
Disallow: /Homepage Directions.dc.html
Disallow: /Home.dc.html

Sitemap: ${brand.root}/sitemap.xml
`;
}

export function sitemapXml(pages) {
  const urls = pages.map((page) => {
    const loc = page.slug ? `${brand.root}/${page.slug}/` : `${brand.root}/`;
    return `  <url><loc>${loc}</loc></url>`;
  }).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}
