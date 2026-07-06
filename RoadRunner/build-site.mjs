// RoadRunner Secure — static site generator (CASEFILE redesign).
// Zero dependencies. `node build-site.mjs` writes every deployable file in place.
// Deploy contract: GitHub Pages / Cloudflare Pages serve this directory as-is.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { brand, pageMeta } from "./site/meta.mjs";
import { tokens } from "./site/css/tokens.mjs";
import { base } from "./site/css/base.mjs";
import { components } from "./site/css/components.mjs";
import { sections } from "./site/css/sections.mjs";
import { moments } from "./site/css/moments.mjs";
import { motion } from "./site/css/motion.mjs";
import { clientJs } from "./site/js.mjs";
import { shell, legacyRedirectPage, designArchivePage, notFoundPage, robotsTxt, sitemapXml } from "./site/shell.mjs";

import { homeBody } from "./site/pages/home.mjs";
import { platformBody } from "./site/pages/platform.mjs";
import { onpremBody } from "./site/pages/onprem.mjs";
import { microsoftBody } from "./site/pages/microsoft.mjs";
import { pricingBody } from "./site/pages/pricing.mjs";
import { securityBody } from "./site/pages/security.mjs";
import { demoBody } from "./site/pages/demo.mjs";
import { contactBody } from "./site/pages/contact.mjs";

const siteDir = dirname(fileURLToPath(import.meta.url));

const bodies = {
  home: homeBody,
  platform: platformBody,
  onprem: onpremBody,
  microsoft: microsoftBody,
  pricing: pricingBody,
  security: securityBody,
  demo: demoBody,
  contact: contactBody
};

const pages = pageMeta.map((meta) => ({ ...meta, body: bodies[meta.key] }));
const missing = pages.filter((p) => typeof p.body !== "function");
if (missing.length) {
  throw new Error(`Pages missing body builders: ${missing.map((p) => p.key).join(", ")}`);
}

writeLogoVariants();
writeFileSync(join(siteDir, "styles.css"), minifyCss([tokens, base, components, sections, moments, motion].join("\n")));
writeFileSync(join(siteDir, "script.js"), clientJs(brand));

for (const page of pages) {
  writeCleanPage(page);
  if (page.file !== "index.html") {
    writeFileSync(join(siteDir, page.file), legacyRedirectPage(page));
  }
}

writeFileSync(join(siteDir, "Home.dc.html"), legacyRedirectPage(pages[0], "RoadRunner Secure homepage moved"));
writeFileSync(join(siteDir, "Homepage Directions.dc.html"), designArchivePage());
writeFileSync(join(siteDir, "404.html"), notFoundPage());
writeFileSync(join(siteDir, "robots.txt"), robotsTxt());
writeFileSync(join(siteDir, "sitemap.xml"), sitemapXml(pages));

console.log(`Generated RoadRunner Secure routes, assets, and deploy metadata in ${siteDir}`);

function writeCleanPage(page) {
  if (!page.slug) {
    writeFileSync(join(siteDir, "index.html"), shell(page));
    return;
  }
  const routeDir = join(siteDir, page.slug);
  mkdirSync(routeDir, { recursive: true });
  writeFileSync(join(routeDir, "index.html"), shell(page));
}

function writeLogoVariants() {
  const sourcePath = join(siteDir, "assets", "roadrunner-logo.svg");
  const source = readFileSync(sourcePath, "utf8");
  const markPath = source.match(/<path d="([^"]+)"/)?.[1];
  if (!markPath) return;

  const markSvg = (fill) => `<svg width="180" height="130" viewBox="120 0 590 420" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="${markPath}" fill="${fill}"/>
</svg>
`;
  const lockupSvg = (ink, accent) => `<svg width="760" height="140" viewBox="0 0 760 140" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="RoadRunner Secure">
  <path d="${markPath}" fill="${accent}" transform="translate(-86 -8) scale(.25)"/>
  <text x="176" y="58" fill="${ink}" font-family="Inter, Arial, sans-serif" font-size="44" font-weight="850">RoadRunner Secure</text>
  <text x="178" y="94" fill="${accent}" font-family="ui-monospace, Menlo, monospace" font-size="18" font-weight="700">Evidence verified closure</text>
</svg>
`;
  writeFileSync(join(siteDir, "assets", "roadrunner-mark.svg"), markSvg("#2DD4BF"));
  writeFileSync(join(siteDir, "assets", "roadrunner-mark-dark.svg"), markSvg("#0D385B"));
  writeFileSync(join(siteDir, "assets", "roadrunner-lockup-secure.svg"), lockupSvg("#F4F8FB", "#2DD4BF"));
  writeFileSync(join(siteDir, "assets", "roadrunner-lockup-secure-dark.svg"), lockupSvg("#071019", "#0D385B"));
}

function minifyCss(css) {
  let out = "";
  let quote = "";
  let token = "";
  const strings = [];
  for (let i = 0; i < css.length; i++) {
    const ch = css[i];
    const next = css[i + 1];
    if (quote) {
      token += ch;
      if (ch === "\\" && next) token += css[++i];
      else if (ch === quote) {
        strings.push(token);
        out += `__CSS_STRING_${strings.length - 1}__`;
        token = "";
        quote = "";
      }
      continue;
    }
    if (ch === '"' || ch === "'") {
      quote = ch;
      token = ch;
      continue;
    }
    if (ch === "/" && next === "*") {
      i += 2;
      while (i < css.length && !(css[i] === "*" && css[i + 1] === "/")) i++;
      i++;
      continue;
    }
    out += ch;
  }
  return out
    .replace(/\s+/g, " ")
    .replace(/\s*([{}:;,>+~])\s*/g, "$1")
    .replace(/;}/g, "}")
    .trim()
    .replace(/__CSS_STRING_(\d+)__/g, (_, i) => strings[Number(i)]);
}
