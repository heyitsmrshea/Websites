#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";

async function exists(target) {
  try {
    await fs.access(target);
    return true;
  } catch {
    return false;
  }
}

async function readJson(filePath) {
  return JSON.parse(await fs.readFile(filePath, "utf8"));
}

function fail(message) {
  throw new Error(message);
}

async function collectFiles(dir) {
  const output = [];
  async function walk(current) {
    const entries = await fs.readdir(current, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        await walk(fullPath);
      } else {
        output.push(fullPath);
      }
    }
  }
  await walk(dir);
  return output;
}

function expectedPngCount(config) {
  const pageCount = config.pages.length;
  const roleCount = config.pages.reduce((sum, page) => sum + page.requiredReviewImages.length, 0);
  return pageCount * 2 + roleCount * 2;
}

async function main() {
  const template = process.argv[2];
  if (!template) {
    fail("Usage: node validate-template-criteria.mjs <template-slug>");
  }

  const root = process.cwd();
  const templateDir = path.join(root, template);
  const configPath = path.join(root, "e2e", "configs", `${template}.json`);
  const reviewDir = path.join(root, "review", template);

  if (!(await exists(templateDir))) fail(`Missing template directory: ${templateDir}`);
  if (!(await exists(configPath))) fail(`Missing config: ${configPath}`);

  const config = await readJson(configPath);

  const requiredFiles = [
    "index.html",
    "styles.css",
    "script.js",
    "README.md",
    ".nojekyll",
    ".github/workflows/deploy-pages.yml"
  ];

  for (const file of requiredFiles) {
    if (!(await exists(path.join(templateDir, file)))) {
      fail(`Missing required file ${file} in ${template}`);
    }
  }

  if (!(await exists(path.join(templateDir, "assets")))) {
    fail(`Missing assets directory in ${template}`);
  }

  for (const page of config.pages) {
    if (!(await exists(path.join(templateDir, page.path)))) {
      fail(`Missing configured page ${page.path} in ${template}`);
    }
  }

  const manifestPath = path.join(reviewDir, "manifest.md");
  const summaryPath = path.join(reviewDir, "summary.json");
  if (!(await exists(manifestPath))) fail(`Missing manifest for ${template}`);
  if (!(await exists(summaryPath))) fail(`Missing summary for ${template}`);

  const summary = await readJson(summaryPath);
  if (summary.template !== template) {
    fail(`Summary template mismatch for ${template}`);
  }

  const manifest = await fs.readFile(manifestPath, "utf8");
  if (!manifest.includes("# Browser Review Manifest")) {
    fail(`Manifest header missing for ${template}`);
  }

  const pngFiles = (await fs.readdir(reviewDir)).filter((name) => name.endsWith(".png"));
  const expected = expectedPngCount(config);
  if (pngFiles.length !== expected) {
    fail(`Expected ${expected} screenshots for ${template}, found ${pngFiles.length}`);
  }

  for (const page of config.pages) {
    const desktopFull = `${page.slug}-desktop-full.png`;
    const mobileFull = `${page.slug}-mobile-full.png`;
    if (!pngFiles.includes(desktopFull)) fail(`Missing ${desktopFull}`);
    if (!pngFiles.includes(mobileFull)) fail(`Missing ${mobileFull}`);
    for (const role of page.requiredReviewImages) {
      const desktopRole = `${page.slug}-desktop-${role}.png`;
      const mobileRole = `${page.slug}-mobile-${role}.png`;
      if (!pngFiles.includes(desktopRole)) fail(`Missing ${desktopRole}`);
      if (!pngFiles.includes(mobileRole)) fail(`Missing ${mobileRole}`);
    }
  }

  const sourceFiles = (await collectFiles(templateDir)).filter((file) => /\.(html|css|js|md)$/i.test(file));
  const bannedPatterns = [
    /\bpill\b/i,
    /\brounded-full\b/i,
    /9999px/i,
    /999px/i,
    /100vmax/i
  ];

  for (const file of sourceFiles) {
    const content = await fs.readFile(file, "utf8");
    for (const pattern of bannedPatterns) {
      if (pattern.test(content)) {
        fail(`Banned pill-like pattern ${pattern} found in ${file}`);
      }
    }
  }

  process.stdout.write(`Validation criteria passed for ${template}\n`);
}

main().catch((error) => {
  process.stderr.write(`${error.stack || error.message}\n`);
  process.exitCode = 1;
});
