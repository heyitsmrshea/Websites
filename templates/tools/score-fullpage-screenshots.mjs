#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const CONFIG_DIR = path.join(ROOT, "e2e", "configs");
const REVIEW_DIR = path.join(ROOT, "review");
const BOARD_DIR = path.join(ROOT, "review-boards");
const OUTPUT_DIR = path.join(ROOT, "review-criteria");
const PY_ANALYZER = path.join(ROOT, "tools", "analyze_screenshot.py");
const REQUIRED_DEVICES = ["desktop", "mobile"];
const BANNED_PATTERN = /(\bpill\b|rounded-full|9999px|999px|100vmax)/;

const CRITERIA = [
  ["template_dir_exists", "Template directory exists"],
  ["page_file_exists", "Source page exists"],
  ["screenshot_exists", "Full-page screenshot exists"],
  ["screenshot_png_signature_valid", "PNG signature is valid"],
  ["screenshot_dimensions_valid", "Screenshot dimensions match expected device range"],
  ["review_dir_exists", "Review artifact directory exists"],
  ["summary_json_exists", "summary.json exists"],
  ["manifest_md_exists", "manifest.md exists"],
  ["summary_includes_run", "summary.json includes this page/device run"],
  ["manifest_lists_screenshot", "manifest.md lists this full-page screenshot"],
  ["opposite_device_screenshot_exists", "Opposite-device screenshot exists"],
  ["config_includes_page", "Page is declared in E2E config"],
  ["readme_exists", "Template README exists"],
  ["deploy_workflow_exists", "GitHub Pages workflow exists"],
  ["stylesheet_exists_and_linked", "styles.css exists and is linked"],
  ["script_exists_and_linked", "script.js exists and is linked"],
  ["body_template_class_present", "Body carries template class"],
  ["body_review_page_attribute_present", "Body carries data-review-page"],
  ["main_page_shell_present", "Main page shell exists"],
  ["header_present", "Header exists"],
  ["footer_present", "Footer exists"],
  ["primary_heading_present", "Primary heading exists"],
  ["required_section_count_met", "All configured review sections exist"],
  ["required_review_image_count_met", "All configured review images exist"],
  ["page_title_complete", "Page title is complete"],
  ["copy_volume_meets_minimum", "Copy volume clears minimum threshold"],
  ["relative_asset_paths_only", "Assets are local and relative"],
  ["banned_pill_patterns_absent", "Banned pill-like patterns are absent"],
  ["template_board_exists", "Template board exists"],
  ["template_level_coverage_complete", "Template-level coverage is complete"],
  ["sampled_palette_variety_meets_minimum", "Sampled palette variety clears minimum"],
  ["contrast_spread_meets_minimum", "Contrast spread clears minimum"],
  ["non_background_signal_ratio_meets_minimum", "Non-background signal clears minimum"],
  ["first_fold_signal_meets_minimum", "First-fold signal clears minimum"],
  ["edge_transition_density_meets_minimum", "Edge-transition density clears minimum"]
];

function rel(filePath) {
  return path.relative(ROOT, filePath) || ".";
}

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function readJson(filePath) {
  return JSON.parse(await fs.readFile(filePath, "utf8"));
}

async function readText(filePath) {
  return fs.readFile(filePath, "utf8");
}

function pageLabel(pagePath) {
  if (pagePath === "index.html") return "Home";
  return pagePath
    .replace(/\.html$/, "")
    .split(/[-_]/g)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function pngInfo(buffer) {
  const signature = buffer.subarray(0, 8).equals(
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])
  );
  const width = buffer.readUInt32BE(16);
  const height = buffer.readUInt32BE(20);
  return { signature, width, height };
}

function dimensionsValid(device, width, height) {
  if (device === "desktop") {
    return width >= 1200 && width <= 2200 && height >= 900;
  }
  return width >= 900 && width <= 1800 && height >= 900;
}

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function countMatches(text, pattern) {
  return (text.match(pattern) || []).length;
}

function htmlHasRelativeAssetsOnly(html) {
  return !/(src|href)=["']https?:\/\//i.test(html) && !/(src|href)=["']\/(?!\/)/.test(html);
}

function copyThreshold(pageConfig) {
  return Math.max(45, pageConfig.requiredSections.length * 18);
}

function makeCriterion(id, label, pass, detail) {
  return { id, label, pass, detail };
}

function escapeTable(value) {
  return String(value).replace(/\|/g, "\\|");
}

async function loadConfigs() {
  const entries = await fs.readdir(CONFIG_DIR);
  const result = new Map();
  for (const file of entries.filter((entry) => entry.endsWith(".json")).sort()) {
    const config = await readJson(path.join(CONFIG_DIR, file));
    result.set(config.slug, config);
  }
  return result;
}

function analyzeScreenshot(filePath) {
  const run = spawnSync("python3", [PY_ANALYZER, filePath], { encoding: "utf8" });
  if (run.status !== 0) {
    throw new Error(run.stderr || `Failed to analyze screenshot: ${filePath}`);
  }
  return JSON.parse(run.stdout);
}

async function scoreScreenshot(config, pageConfig, screenshotPath) {
  const templateSlug = config.slug;
  const templateDir = path.join(ROOT, templateSlug);
  const reviewDir = path.join(REVIEW_DIR, templateSlug);
  const boardPath = path.join(BOARD_DIR, `${templateSlug}-board.png`);
  const summaryPath = path.join(reviewDir, "summary.json");
  const manifestPath = path.join(reviewDir, "manifest.md");
  const readmePath = path.join(templateDir, "README.md");
  const workflowPath = path.join(templateDir, ".github", "workflows", "deploy-pages.yml");
  const stylePath = path.join(templateDir, "styles.css");
  const scriptPath = path.join(templateDir, "script.js");
  const pagePath = path.join(templateDir, pageConfig.path);
  const screenshotName = path.basename(screenshotPath);
  const stem = screenshotName.replace(/\.png$/, "");
  const [, device] = stem.match(/-(desktop|mobile)-full$/) || [];
  const opposite = device === "desktop" ? "mobile" : "desktop";
  const oppositeScreenshot = path.join(reviewDir, `${pageConfig.slug}-${opposite}-full.png`);

  const [
    templateExists,
    pageExists,
    screenshotExists,
    reviewDirExists,
    summaryExists,
    manifestExists,
    oppositeExists,
    readmeExists,
    workflowExists,
    styleExists,
    scriptExists,
    boardExists
  ] = await Promise.all([
    exists(templateDir),
    exists(pagePath),
    exists(screenshotPath),
    exists(reviewDir),
    exists(summaryPath),
    exists(manifestPath),
    exists(oppositeScreenshot),
    exists(readmePath),
    exists(workflowPath),
    exists(stylePath),
    exists(scriptPath),
    exists(boardPath)
  ]);

  const screenshotBuffer = screenshotExists ? await fs.readFile(screenshotPath) : Buffer.alloc(0);
  const screenshotMeta = screenshotExists ? pngInfo(screenshotBuffer) : { signature: false, width: 0, height: 0 };
  const imageMetrics = screenshotExists ? analyzeScreenshot(screenshotPath) : {
    sampled_unique_colors: 0,
    avg_stddev: 0,
    nonbg_ratio: 0,
    first_fold_nonbg_ratio: 0,
    edge_density: 0
  };
  const html = pageExists ? await readText(pagePath) : "";
  const styles = styleExists ? await readText(stylePath) : "";
  const summary = summaryExists ? await readJson(summaryPath) : null;
  const manifest = manifestExists ? await readText(manifestPath) : "";

  const run = summary?.runs?.find((entry) => entry.slug === pageConfig.slug && entry.device === device);
  const configPage = config.pages.find((entry) => entry.slug === pageConfig.slug && entry.path === pageConfig.path);
  const pageText = stripHtml(html);
  const wordCount = pageText ? pageText.split(/\s+/).length : 0;
  const sectionsFound = countMatches(html, /data-review-section="/g);
  const imagesFound = countMatches(html, /data-review-image="/g);
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : "";
  const bodyMatch = html.match(/<body[^>]+class="([^"]+)"[^>]*data-template="([^"]+)"[^>]*data-review-page="([^"]+)"/i);
  const templateCoverageComplete = Boolean(
    summary &&
      summary.pages === config.pages.length &&
      Array.isArray(summary.devices) &&
      REQUIRED_DEVICES.every((required) => summary.devices.includes(required)) &&
      Array.isArray(summary.runs) &&
      summary.runs.length === config.pages.length * REQUIRED_DEVICES.length
  );

  const criteria = [
    makeCriterion("template_dir_exists", "Template directory exists", templateExists, rel(templateDir)),
    makeCriterion("page_file_exists", "Source page exists", pageExists, rel(pagePath)),
    makeCriterion("screenshot_exists", "Full-page screenshot exists", screenshotExists, rel(screenshotPath)),
    makeCriterion(
      "screenshot_png_signature_valid",
      "PNG signature is valid",
      screenshotMeta.signature,
      `${screenshotMeta.width}x${screenshotMeta.height}`
    ),
    makeCriterion(
      "screenshot_dimensions_valid",
      "Screenshot dimensions match expected device range",
      dimensionsValid(device, screenshotMeta.width, screenshotMeta.height),
      `${device}: ${screenshotMeta.width}x${screenshotMeta.height}`
    ),
    makeCriterion("review_dir_exists", "Review artifact directory exists", reviewDirExists, rel(reviewDir)),
    makeCriterion("summary_json_exists", "summary.json exists", summaryExists, rel(summaryPath)),
    makeCriterion("manifest_md_exists", "manifest.md exists", manifestExists, rel(manifestPath)),
    makeCriterion(
      "summary_includes_run",
      "summary.json includes this page/device run",
      Boolean(run),
      run ? `${run.slug}/${run.device}` : "missing run"
    ),
    makeCriterion(
      "manifest_lists_screenshot",
      "manifest.md lists this full-page screenshot",
      manifest.includes(screenshotName),
      screenshotName
    ),
    makeCriterion(
      "opposite_device_screenshot_exists",
      "Opposite-device screenshot exists",
      oppositeExists,
      rel(oppositeScreenshot)
    ),
    makeCriterion(
      "config_includes_page",
      "Page is declared in E2E config",
      Boolean(configPage),
      `${pageConfig.slug} -> ${pageConfig.path}`
    ),
    makeCriterion("readme_exists", "Template README exists", readmeExists, rel(readmePath)),
    makeCriterion("deploy_workflow_exists", "GitHub Pages workflow exists", workflowExists, rel(workflowPath)),
    makeCriterion(
      "stylesheet_exists_and_linked",
      "styles.css exists and is linked",
      styleExists && /<link rel="stylesheet" href="\.\/styles\.css"/i.test(html),
      styleExists ? "styles.css linked" : "missing styles.css"
    ),
    makeCriterion(
      "script_exists_and_linked",
      "script.js exists and is linked",
      scriptExists && /<script src="\.\/script\.js"><\/script>/i.test(html),
      scriptExists ? "script.js linked" : "missing script.js"
    ),
    makeCriterion(
      "body_template_class_present",
      "Body carries template class",
      Boolean(bodyMatch && bodyMatch[2] && bodyMatch[1].includes(`template--${bodyMatch[2]}`)),
      bodyMatch ? `${bodyMatch[1]} / data-template=${bodyMatch[2]}` : "missing body markers"
    ),
    makeCriterion(
      "body_review_page_attribute_present",
      "Body carries data-review-page",
      Boolean(bodyMatch && bodyMatch[3] === pageConfig.slug),
      bodyMatch ? bodyMatch[3] : "missing data-review-page"
    ),
    makeCriterion(
      "main_page_shell_present",
      "Main page shell exists",
      /<main class="page-shell">/i.test(html),
      "main.page-shell"
    ),
    makeCriterion("header_present", "Header exists", /<header class="site-header/i.test(html), "header.site-header"),
    makeCriterion("footer_present", "Footer exists", /<footer class="site-footer/i.test(html), "footer.site-footer"),
    makeCriterion(
      "primary_heading_present",
      "Primary heading exists",
      /<h1>[^<]+<\/h1>/i.test(html) || (templateSlug === "presentation-microsite" && /<h2>[^<]+<\/h2>/i.test(html)),
      templateSlug === "presentation-microsite" ? "slide heading present" : "first h1"
    ),
    makeCriterion(
      "required_section_count_met",
      "All configured review sections exist",
      pageConfig.requiredSections.every((section) => html.includes(`data-review-section="${section}"`)) &&
        sectionsFound >= pageConfig.requiredSections.length,
      `${sectionsFound} found / ${pageConfig.requiredSections.length} required`
    ),
    makeCriterion(
      "required_review_image_count_met",
      "All configured review images exist",
      pageConfig.requiredReviewImages.every((role) => html.includes(`data-review-image="${role}"`)) &&
        imagesFound >= pageConfig.requiredReviewImages.length,
      `${imagesFound} found / ${pageConfig.requiredReviewImages.length} required`
    ),
    makeCriterion(
      "page_title_complete",
      "Page title is complete",
      Boolean(title) && title.includes("|") && title.toLowerCase().includes(pageLabel(pageConfig.path).toLowerCase()),
      title || "missing title"
    ),
    makeCriterion(
      "copy_volume_meets_minimum",
      "Copy volume clears minimum threshold",
      wordCount >= copyThreshold(pageConfig),
      `${wordCount} words / minimum ${copyThreshold(pageConfig)}`
    ),
    makeCriterion(
      "relative_asset_paths_only",
      "Assets are local and relative",
      htmlHasRelativeAssetsOnly(html),
      "local relative assets only"
    ),
    makeCriterion(
      "banned_pill_patterns_absent",
      "Banned pill-like patterns are absent",
      !BANNED_PATTERN.test(html) && !BANNED_PATTERN.test(styles),
      "no banned pill-like tokens"
    ),
    makeCriterion("template_board_exists", "Template board exists", boardExists, rel(boardPath)),
    makeCriterion(
      "template_level_coverage_complete",
      "Template-level coverage is complete",
      templateCoverageComplete,
      summary ? `${summary.runs.length} runs / expected ${config.pages.length * REQUIRED_DEVICES.length}` : "missing summary"
    ),
    makeCriterion(
      "sampled_palette_variety_meets_minimum",
      "Sampled palette variety clears minimum",
      imageMetrics.sampled_unique_colors >= 250,
      `${imageMetrics.sampled_unique_colors} sampled colors`
    ),
    makeCriterion(
      "contrast_spread_meets_minimum",
      "Contrast spread clears minimum",
      imageMetrics.avg_stddev >= 18,
      `avg stddev ${imageMetrics.avg_stddev}`
    ),
    makeCriterion(
      "non_background_signal_ratio_meets_minimum",
      "Non-background signal clears minimum",
      imageMetrics.nonbg_ratio >= 0.28,
      `ratio ${imageMetrics.nonbg_ratio}`
    ),
    makeCriterion(
      "first_fold_signal_meets_minimum",
      "First-fold signal clears minimum",
      imageMetrics.first_fold_nonbg_ratio >= 0.18,
      `ratio ${imageMetrics.first_fold_nonbg_ratio}`
    ),
    makeCriterion(
      "edge_transition_density_meets_minimum",
      "Edge-transition density clears minimum",
      imageMetrics.edge_density >= 0.045,
      `density ${imageMetrics.edge_density}`
    )
  ];

  const passed = criteria.filter((criterion) => criterion.pass).length;
  return {
    template: templateSlug,
    page: pageConfig.slug,
    device,
    screenshot: screenshotName,
    screenshotPath,
    score: passed,
    maxScore: CRITERIA.length,
    passed: passed === CRITERIA.length,
    criteria
  };
}

function renderScreenshotReport(result) {
  const lines = [];
  lines.push(`# ${result.screenshot}`);
  lines.push("");
  lines.push(`Template: ${result.template}`);
  lines.push(`Page: ${result.page}`);
  lines.push(`Device: ${result.device}`);
  lines.push(`Screenshot: [${result.screenshot}](${result.screenshotPath})`);
  lines.push(`Score: ${result.score} / ${result.maxScore}`);
  lines.push(`Verdict: ${result.passed ? "PASS" : "FAIL"}`);
  lines.push("");
  lines.push("| # | Criterion | Status | Detail |");
  lines.push("| --- | --- | --- | --- |");
  result.criteria.forEach((criterion, index) => {
    lines.push(`| ${index + 1} | ${criterion.id} | ${criterion.pass ? "PASS" : "FAIL"} | ${escapeTable(criterion.detail)} |`);
  });
  lines.push("");
  return `${lines.join("\n")}\n`;
}

function renderTemplateSummary(template, results) {
  const total = results.length * CRITERIA.length;
  const passed = results.reduce((sum, item) => sum + item.score, 0);
  const failing = results.filter((item) => !item.passed);
  const lines = [];
  lines.push(`# ${template}`);
  lines.push("");
  lines.push(`Screenshots: ${results.length}`);
  lines.push(`Criteria passed: ${passed} / ${total}`);
  lines.push(`Template verdict: ${failing.length === 0 ? "PASS" : "FAIL"}`);
  lines.push("");
  lines.push("| Screenshot | Score | Verdict |");
  lines.push("| --- | --- | --- |");
  for (const result of results) {
    lines.push(`| ${result.screenshot} | ${result.score} / ${result.maxScore} | ${result.passed ? "PASS" : "FAIL"} |`);
  }
  lines.push("");
  return `${lines.join("\n")}\n`;
}

function renderMasterSummary(resultsByTemplate) {
  const templates = [...resultsByTemplate.keys()].sort();
  const all = templates.flatMap((template) => resultsByTemplate.get(template));
  const totalCriteria = all.length * CRITERIA.length;
  const passedCriteria = all.reduce((sum, item) => sum + item.score, 0);
  const failing = all.filter((item) => !item.passed);
  const lines = [];
  lines.push("# Master Screenshot Summary");
  lines.push("");
  lines.push(`Templates: ${templates.length}`);
  lines.push(`Screenshots: ${all.length}`);
  lines.push(`Criteria passed: ${passedCriteria} / ${totalCriteria}`);
  lines.push(`Run verdict: ${failing.length === 0 ? "PASS" : "FAIL"}`);
  lines.push("");
  lines.push("| Template | Screenshots | Passed Criteria | Verdict |");
  lines.push("| --- | --- | --- | --- |");
  for (const template of templates) {
    const items = resultsByTemplate.get(template);
    const passed = items.reduce((sum, item) => sum + item.score, 0);
    const total = items.length * CRITERIA.length;
    lines.push(`| ${template} | ${items.length} | ${passed} / ${total} | ${items.every((item) => item.passed) ? "PASS" : "FAIL"} |`);
  }
  lines.push("");
  if (failing.length) {
    lines.push("## Failures");
    lines.push("");
    for (const item of failing) {
      const failedCriteria = item.criteria.filter((criterion) => !criterion.pass).map((criterion) => criterion.id).join(", ");
      lines.push(`- ${item.template}/${item.screenshot}: ${failedCriteria}`);
    }
    lines.push("");
  }
  return {
    markdown: `${lines.join("\n")}\n`,
    json: {
      templates: templates.length,
      screenshots: all.length,
      passedCriteria,
      totalCriteria,
      verdict: failing.length === 0 ? "PASS" : "FAIL",
      templateSummaries: templates.map((template) => {
        const items = resultsByTemplate.get(template);
        return {
          template,
          screenshots: items.length,
          passedCriteria: items.reduce((sum, item) => sum + item.score, 0),
          totalCriteria: items.length * CRITERIA.length,
          verdict: items.every((item) => item.passed) ? "PASS" : "FAIL"
        };
      }),
      failingScreenshots: failing.map((item) => ({
        template: item.template,
        screenshot: item.screenshot,
        failedCriteria: item.criteria.filter((criterion) => !criterion.pass).map((criterion) => criterion.id)
      }))
    }
  };
}

async function main() {
  const configs = await loadConfigs();
  await fs.rm(OUTPUT_DIR, { recursive: true, force: true });
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  const resultsByTemplate = new Map();

  for (const [template, config] of [...configs.entries()].sort()) {
    const reviewDir = path.join(REVIEW_DIR, template);
    const templateResults = [];
    for (const page of config.pages) {
      for (const device of REQUIRED_DEVICES) {
        const screenshotPath = path.join(reviewDir, `${page.slug}-${device}-full.png`);
        const result = await scoreScreenshot(config, page, screenshotPath);
        templateResults.push(result);
      }
    }
    resultsByTemplate.set(template, templateResults);

    const templateOutputDir = path.join(OUTPUT_DIR, template);
    await fs.mkdir(templateOutputDir, { recursive: true });
    for (const result of templateResults) {
      await fs.writeFile(path.join(templateOutputDir, `${result.screenshot.replace(/\.png$/, "")}.md`), renderScreenshotReport(result));
    }
    await fs.writeFile(path.join(templateOutputDir, "template-summary.md"), renderTemplateSummary(template, templateResults));
  }

  const master = renderMasterSummary(resultsByTemplate);
  await fs.writeFile(path.join(OUTPUT_DIR, "master-summary.md"), master.markdown);
  await fs.writeFile(path.join(OUTPUT_DIR, "master-summary.json"), `${JSON.stringify(master.json, null, 2)}\n`);

  if (master.json.verdict !== "PASS") {
    process.stderr.write(master.markdown);
    process.exitCode = 1;
    return;
  }

  process.stdout.write(master.markdown);
}

main().catch((error) => {
  process.stderr.write(`${error.stack || error.message}\n`);
  process.exitCode = 1;
});
