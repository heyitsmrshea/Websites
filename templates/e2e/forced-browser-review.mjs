#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import http from "node:http";
import { fileURLToPath } from "node:url";
import { chromium, devices } from "playwright";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function parseArgs(argv) {
  const options = {
    config: null,
    headed: false
  };

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === "--config") {
      options.config = argv[index + 1];
      index += 1;
      continue;
    }
    if (token === "--headed") {
      options.headed = true;
    }
  }

  if (!options.config) {
    throw new Error("Usage: node forced-browser-review.mjs --config path/to/config.json [--headed]");
  }

  return options;
}

async function readJson(filePath) {
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw);
}

function mimeType(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  switch (extension) {
    case ".html":
      return "text/html; charset=utf-8";
    case ".css":
      return "text/css; charset=utf-8";
    case ".js":
    case ".mjs":
      return "text/javascript; charset=utf-8";
    case ".json":
      return "application/json; charset=utf-8";
    case ".svg":
      return "image/svg+xml";
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".webp":
      return "image/webp";
    case ".gif":
      return "image/gif";
    case ".ico":
      return "image/x-icon";
    case ".woff":
      return "font/woff";
    case ".woff2":
      return "font/woff2";
    case ".txt":
      return "text/plain; charset=utf-8";
    default:
      return "application/octet-stream";
  }
}

function createStaticServer(rootDir) {
  return http.createServer(async (req, res) => {
    try {
      const requestPath = decodeURIComponent((req.url || "/").split("?")[0].split("#")[0]);
      const safePath = requestPath === "/" ? "/index.html" : requestPath;
      const resolvedPath = path.resolve(rootDir, `.${safePath}`);

      if (!resolvedPath.startsWith(path.resolve(rootDir))) {
        res.writeHead(403);
        res.end("Forbidden");
        return;
      }

      let stat;
      try {
        stat = await fs.stat(resolvedPath);
      } catch {
        res.writeHead(404);
        res.end("Not Found");
        return;
      }

      const filePath = stat.isDirectory() ? path.join(resolvedPath, "index.html") : resolvedPath;
      const content = await fs.readFile(filePath);
      res.writeHead(200, { "Content-Type": mimeType(filePath) });
      res.end(content);
    } catch (error) {
      res.writeHead(500);
      res.end(`Server error: ${error.message}`);
    }
  });
}

function sanitize(value) {
  return String(value).replace(/[^a-z0-9_-]+/gi, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").toLowerCase();
}

function escapeForAttribute(value) {
  return String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

async function collectVisuals(page) {
  return page.evaluate(() => {
    function cssPath(node) {
      if (!(node instanceof Element)) {
        return "";
      }
      if (node.id) {
        return `#${CSS.escape(node.id)}`;
      }
      const parts = [];
      let current = node;
      while (current && current.nodeType === Node.ELEMENT_NODE && parts.length < 6) {
        let selector = current.tagName.toLowerCase();
        if (current.dataset.reviewImage) {
          selector += `[data-review-image="${CSS.escape(current.dataset.reviewImage)}"]`;
          parts.unshift(selector);
          break;
        }
        const parent = current.parentElement;
        if (parent) {
          const siblings = Array.from(parent.children).filter((child) => child.tagName === current.tagName);
          if (siblings.length > 1) {
            selector += `:nth-of-type(${siblings.indexOf(current) + 1})`;
          }
        }
        parts.unshift(selector);
        current = parent;
      }
      return parts.join(" > ");
    }

    function elementSource(node, backgroundImage) {
      if (node.tagName === "IMG") {
        return node.currentSrc || node.getAttribute("src") || "";
      }
      if (node.tagName === "VIDEO") {
        return node.getAttribute("poster") || "";
      }
      if (backgroundImage && backgroundImage !== "none") {
        return backgroundImage;
      }
      return "";
    }

    const candidates = new Set();
    for (const node of document.querySelectorAll("[data-review-image], img, picture img, video[poster]")) {
      candidates.add(node);
    }
    for (const node of document.querySelectorAll("*")) {
      const style = window.getComputedStyle(node);
      if (style.backgroundImage && style.backgroundImage !== "none") {
        candidates.add(node);
      }
    }

    return Array.from(candidates).map((node, index) => {
      const style = window.getComputedStyle(node);
      const rect = node.getBoundingClientRect();
      const isImg = node.tagName === "IMG";
      const backgroundImage = style.backgroundImage;
      const source = elementSource(node, backgroundImage);
      const role = node.dataset.reviewImage || null;
      const visible = rect.width > 0 && rect.height > 0 && style.visibility !== "hidden" && style.display !== "none";
      const requiresReviewRole = Boolean(isImg || node.tagName === "VIDEO" || (backgroundImage && backgroundImage !== "none"));

      return {
        index,
        tag: node.tagName.toLowerCase(),
        role,
        selector: cssPath(node),
        source,
        visible,
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        naturalWidth: isImg ? node.naturalWidth : null,
        naturalHeight: isImg ? node.naturalHeight : null,
        requiresReviewRole
      };
    }).filter((item) => item.requiresReviewRole || item.role);
  });
}

async function verifyPageShape(page, pageConfig) {
  const bodySlug = await page.getAttribute("body", "data-review-page");
  if (bodySlug !== pageConfig.slug) {
    throw new Error(`Expected body data-review-page="${pageConfig.slug}" but found "${bodySlug}"`);
  }

  for (const sectionName of pageConfig.requiredSections || []) {
    const count = await page.locator(`[data-review-section="${escapeForAttribute(sectionName)}"]`).count();
    if (count < 1) {
      throw new Error(`Missing required section "${sectionName}" on ${pageConfig.path}`);
    }
  }
}

async function captureFullPage(page, destination) {
  await page.screenshot({ path: destination, fullPage: true });
}

async function captureVisual(page, visual, destination) {
  let locator;
  if (visual.role) {
    locator = page.locator(`[data-review-image="${escapeForAttribute(visual.role)}"]`).first();
  } else {
    locator = page.locator(visual.selector).first();
  }

  await locator.scrollIntoViewIfNeeded();
  await locator.screenshot({ path: destination });
}

async function reviewDevice(origin, outputDir, templateConfig, deviceName, contextOptions, headed) {
  const browser = await chromium.launch({ headless: !headed });
  const context = await browser.newContext(contextOptions);
  const page = await context.newPage();
  const manifestLines = [];
  const summary = [];

  try {
    for (const pageConfig of templateConfig.pages) {
      const url = new URL(pageConfig.path, `${origin}/`).toString();
      await page.goto(url, { waitUntil: "domcontentloaded" });
      await page.waitForLoadState("networkidle").catch(() => {});

      await verifyPageShape(page, pageConfig);

      const visuals = await collectVisuals(page);
      const missingRole = visuals.filter((visual) => visual.requiresReviewRole && !visual.role);
      if (missingRole.length > 0) {
        throw new Error(`Page ${pageConfig.path} has visual assets without data-review-image: ${missingRole.map((item) => item.selector || item.tag).join(", ")}`);
      }

      const roleSet = new Set(visuals.filter((visual) => visual.role).map((visual) => visual.role));
      for (const role of pageConfig.requiredReviewImages || []) {
        if (!roleSet.has(role)) {
          throw new Error(`Page ${pageConfig.path} is missing required review image role "${role}"`);
        }
      }

      const fullPageName = `${pageConfig.slug}-${deviceName}-full.png`;
      await captureFullPage(page, path.join(outputDir, fullPageName));
      manifestLines.push(`- ${deviceName} full page: ${fullPageName} <- ${pageConfig.path}`);

      const capturedRoles = [];
      for (const visual of visuals.filter((item) => item.role)) {
        if (!visual.visible) {
          throw new Error(`Review image "${visual.role}" exists on ${pageConfig.path} but is not visible on ${deviceName}`);
        }
        if (visual.tag === "img" && (!visual.naturalWidth || !visual.naturalHeight)) {
          throw new Error(`Image "${visual.role}" on ${pageConfig.path} did not load on ${deviceName}`);
        }

        const fileName = `${pageConfig.slug}-${deviceName}-${sanitize(visual.role)}.png`;
        await captureVisual(page, visual, path.join(outputDir, fileName));
        manifestLines.push(`- ${deviceName} visual: ${fileName} <- ${pageConfig.path} [${visual.role}]`);
        capturedRoles.push(visual.role);
      }

      summary.push({
        device: deviceName,
        page: pageConfig.path,
        slug: pageConfig.slug,
        capturedRoles
      });
    }
  } finally {
    await context.close();
    await browser.close();
  }

  return { manifestLines, summary };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const configPath = path.resolve(process.cwd(), args.config);
  const config = await readJson(configPath);

  const siteDir = path.resolve(path.dirname(configPath), config.siteDir);
  const artifactsDir = path.resolve(path.dirname(configPath), config.artifactsDir);
  await ensureDir(artifactsDir);

  const server = createStaticServer(siteDir);
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  const origin = `http://127.0.0.1:${address.port}`;

  const devicePresets = [
    { name: "desktop", options: { viewport: { width: 1440, height: 1200 } } },
    { name: "mobile", options: devices["iPhone 13"] }
  ];

  try {
    const allManifestLines = [`# Browser Review Manifest`, ``, `Template: ${config.slug}`, `Origin: ${origin}`, ``];
    const allSummary = [];

    for (const device of devicePresets) {
      const result = await reviewDevice(origin, artifactsDir, config, device.name, device.options, args.headed);
      allManifestLines.push(`## ${device.name}`);
      allManifestLines.push(...result.manifestLines);
      allManifestLines.push("");
      allSummary.push(...result.summary);
    }

    await fs.writeFile(path.join(artifactsDir, "manifest.md"), allManifestLines.join("\n"));
    await fs.writeFile(
      path.join(artifactsDir, "summary.json"),
      JSON.stringify(
        {
          template: config.slug,
          siteDir,
          artifactsDir,
          pages: config.pages.length,
          devices: devicePresets.map((device) => device.name),
          runs: allSummary
        },
        null,
        2
      )
    );

    process.stdout.write(`Browser review complete for ${config.slug}\nArtifacts: ${artifactsDir}\n`);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}

main().catch((error) => {
  process.stderr.write(`${error.stack || error.message}\n`);
  process.exitCode = 1;
});
