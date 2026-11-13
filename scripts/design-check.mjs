// Design check: measure the built site in a browser and compare it with a budget.
//
// Serves dist/ at the project base path (/documentation/, as on GitHub Pages) and
// measures it with Playwright and axe-core:
//
// - axe violations (WCAG 2.0/2.1 A and AA, WCAG 2.2 AA) on key pages and on the search
//   dialog with a query, in light and dark, at desktop (1440×900) and phone (390×844);
// - for every article at 390×844, how far down the first sentence of the article starts;
// - the reading column's left edge on every article at 1440 and 1920 wide;
// - the distinct font sizes on each page (text outside pre and code);
// - layout shift on the home page at phone size;
// - script loaded before search opens (gzipped);
// - visible "[unresolved link" and "[Unsupported MediaWiki markup" text;
// - a set of screenshots.
//
// It writes tmp/design-check/report.json, report.md and screenshots/, and fails when a
// metric is above its ceiling in scripts/design-check-budget.json. Ceilings may only
// fall: lower them when a change improves a number.
//
//   DOCS_BASE=/documentation/ npm run build
//   npm run design-check [-- --baseline <report.json>] [--out <dir>] [--no-screenshots]
//
// Playwright uses its own Chromium; if it is missing, run `npx playwright install chromium`.
import { createReadStream, existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, resolve } from "node:path";
import { parseArgs } from "node:util";
import { gzipSync } from "node:zlib";
import AxeBuilder from "@axe-core/playwright";
import { chromium } from "playwright";
import { cumulativeLayoutShift, groupValues, kilobytes, overBudget, spread } from "./lib/design-metrics.mjs";

const { values: options } = parseArgs({
  options: {
    baseline: { type: "string" },
    out: { type: "string", default: "tmp/design-check" },
    budget: { type: "string", default: "scripts/design-check-budget.json" },
    "no-screenshots": { type: "boolean", default: false },
  },
});
const dist = resolve(process.env.DOCS_DIST || "dist");
const base = "/documentation/";
const out = resolve(options.out);
const tags = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];
const viewports = { desktop: { width: 1440, height: 900 }, phone: { width: 390, height: 844 } };
const themes = ["light", "dark"];
// The pages every review looks at; 404 is any address the site does not have.
const keyPages = [
  ["home", ""],
  ["last-resort-restore", "wiki/last-resort-restore/"],
  ["bisq-easy", "wiki/bisq-easy/"],
  ["restoring-your-wallet-from-seed", "wiki/restoring-your-wallet-from-seed/"],
  ["browse-all", "browse/all/"],
  ["browse-payment-methods", "browse/payment-methods/"],
  ["review", "review/"],
  ["404", "design-check-missing-page/"],
];
const searchQuery = "mediator";
const markers = { unresolvedLink: "[unresolved link", unsupportedMarkup: "[Unsupported MediaWiki markup" };

if (!existsSync(join(dist, "index.html"))) fail(`${dist}/index.html is missing; run DOCS_BASE=${base} npm run build first`);
if (!readFileSync(join(dist, "index.html"), "utf8").includes(`${base}_astro/`)) fail(`dist/ was not built with DOCS_BASE=${base}; run DOCS_BASE=${base} npm run build first`);

const articles = [
  ...JSON.parse(readFileSync("migration/articles.json", "utf8")).items,
  ...JSON.parse(readFileSync("migration/additional-articles.json", "utf8")).items,
].map((article) => ({ slug: article.slug, path: `wiki/${article.slug}/` }));

// A static server for dist/ under the base path, like GitHub Pages: directories
// redirect to their trailing slash, unknown addresses get 404.html with status 404.
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".mjs": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".gif": "image/gif", ".webp": "image/webp", ".ico": "image/x-icon", ".woff2": "font/woff2", ".woff": "font/woff", ".txt": "text/plain; charset=utf-8", ".xml": "application/xml", ".wasm": "application/wasm" };
const server = createServer((request, response) => {
  const url = new URL(request.url, "http://localhost");
  const send = (file, status = 200) => {
    response.writeHead(status, { "content-type": types[extname(file)] ?? "application/octet-stream" });
    createReadStream(file).pipe(response);
  };
  if (!url.pathname.startsWith(base)) { response.writeHead(302, { location: base }); response.end(); return; }
  const file = join(dist, decodeURIComponent(url.pathname.slice(base.length)));
  if (!file.startsWith(dist)) { response.writeHead(400); response.end(); return; }
  if (existsSync(file) && statSync(file).isDirectory()) {
    if (!url.pathname.endsWith("/")) { response.writeHead(301, { location: `${url.pathname}/` }); response.end(); return; }
    if (existsSync(join(file, "index.html"))) { send(join(file, "index.html")); return; }
  } else if (existsSync(file)) { send(file); return; }
  send(join(dist, "404.html"), 404);
});
await new Promise((done) => server.listen(0, "127.0.0.1", done));
const origin = `http://127.0.0.1:${server.address().port}`;
const pageUrl = (path) => `${origin}${base}${path}`;

const browser = await chromium.launch().catch((error) => fail(`Chromium did not start (${error.message.split("\n")[0]}); run npx playwright install chromium`));
const report = { measuredAt: new Date().toISOString(), base, axe: [], pages: {}, articles: {}, homeLayoutShift: null, scripts: {}, metrics: {} };
mkdirSync(join(out, "screenshots"), { recursive: true });

/** A browser context at a viewport and theme; phones get touch and a mobile user agent. */
async function newContext(viewport, theme) {
  const phone = viewport === "phone";
  const context = await browser.newContext({ viewport: viewports[viewport], colorScheme: theme, isMobile: phone, hasTouch: phone, deviceScaleFactor: 1, reducedMotion: "no-preference" });
  // Starlight keeps the chosen theme in localStorage and applies it before the first paint.
  await context.addInitScript((value) => { try { localStorage.setItem("starlight-theme", value); } catch {} }, theme);
  return context;
}

/** Open a page and wait until it has loaded, fonts are ready and idle callbacks have run. */
async function open(page, path) {
  const response = await page.goto(pageUrl(path), { waitUntil: "load" });
  await page.evaluate(async () => {
    await document.fonts.ready;
    await new Promise((done) => requestIdleCallback(() => done(), { timeout: 2000 }));
    await new Promise((done) => setTimeout(done, 300));
  });
  return response;
}

/** Open the search dialog and search; resolves once results (or the no-result message) show. */
async function openSearch(page, query) {
  await page.locator("site-search button[data-open-modal]").first().click();
  const input = page.locator(".pagefind-ui__search-input");
  await input.waitFor({ state: "visible", timeout: 15000 });
  await input.fill(query);
  await page.locator(".pagefind-ui__result, .pagefind-ui__message").first().waitFor({ timeout: 15000 });
  await page.waitForTimeout(800);
}

// What the browser measures on a page (run in the page).
function measurePage() {
  const visible = (element) => element.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true });
  const sizes = {};
  for (const element of document.body.querySelectorAll("*")) {
    if (element.closest("pre, code, svg")) continue;
    if (![...element.childNodes].some((node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim())) continue;
    if (!visible(element)) continue;
    const box = element.getBoundingClientRect();
    if (box.width <= 1 && box.height <= 1) continue;
    const size = getComputedStyle(element).fontSize;
    sizes[size] = (sizes[size] ?? 0) + 1;
  }
  const article = document.querySelector(".wiki-recovered-article");
  let firstSentence = null;
  if (article) {
    // The first visible words of the article's own text, outside headings, figures and code.
    const skip = "h1, h2, h3, h4, h5, h6, .sl-heading-wrapper, nav, figure, figcaption, pre, code, script, style, .sr-only, [aria-hidden='true']";
    const walker = document.createTreeWalker(article, NodeFilter.SHOW_TEXT);
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      if (!/\p{L}{2}/u.test(node.textContent)) continue;
      const parent = node.parentElement;
      if (!parent || parent.closest(skip) || !visible(parent)) continue;
      const range = document.createRange();
      range.selectNodeContents(node);
      const rect = [...range.getClientRects()].find((item) => item.width > 0 && item.height > 0);
      if (!rect) continue;
      firstSentence = { top: Math.round(rect.top + scrollY), text: node.textContent.trim().slice(0, 80) };
      break;
    }
  }
  const content = document.querySelector(".sl-markdown-content");
  const text = document.querySelector("main")?.innerText ?? "";
  return {
    fontSizes: Object.keys(sizes).sort((a, b) => parseFloat(a) - parseFloat(b)),
    firstSentence,
    columnLeft: content ? Math.round(content.getBoundingClientRect().left) : null,
    text,
  };
}
const count = (text, marker) => text.split(marker).length - 1;

// 1. Key pages and the search dialog: axe, font sizes and screenshots, per viewport and theme.
for (const viewport of Object.keys(viewports)) {
  for (const theme of themes) {
    const context = await newContext(viewport, theme);
    const page = await context.newPage();
    for (const [name, path] of [...keyPages, ["search", ""]]) {
      const response = await open(page, path);
      if (name === "404" ? response.status() !== 404 : !response.ok()) throw new Error(`${path} answered ${response.status()}`);
      if (name === "search") await openSearch(page, searchQuery);
      const result = await new AxeBuilder({ page }).withTags(tags).analyze();
      for (const violation of result.violations) {
        report.axe.push({ page: name, viewport, theme, id: violation.id, impact: violation.impact, help: violation.help, nodes: violation.nodes.length, targets: violation.nodes.slice(0, 3).map((node) => node.target.join(" ")) });
      }
      const measured = await page.evaluate(measurePage);
      const entry = (report.pages[name] ??= { path, fontSizes: {} });
      entry.fontSizes[`${viewport}-${theme}`] = measured.fontSizes;
      if (!options["no-screenshots"]) await page.screenshot({ path: join(out, "screenshots", `${name}-${viewport}-${theme}.png`) });
    }
    await context.close();
  }
}

// 2. Every article: first sentence at phone size, column at 1440 and 1920, font sizes, markers.
async function sweep(viewport, measure) {
  const context = await browser.newContext({ viewport, colorScheme: "light", isMobile: viewport.width < 768, hasTouch: viewport.width < 768 });
  const queue = [...articles];
  await Promise.all(Array.from({ length: 6 }, async () => {
    const page = await context.newPage();
    for (let article = queue.shift(); article; article = queue.shift()) {
      await page.goto(pageUrl(article.path), { waitUntil: "load" });
      await page.evaluate(() => document.fonts.ready);
      measure(article, await page.evaluate(measurePage));
    }
    await page.close();
  }));
  await context.close();
}
await sweep({ width: 390, height: 844 }, (article, measured) => {
  const record = (report.articles[article.slug] ??= {});
  record.firstSentenceTop = measured.firstSentence?.top ?? null;
  record.firstSentenceText = measured.firstSentence?.text ?? null;
  record.unresolvedLinks = count(measured.text, markers.unresolvedLink);
  record.unsupportedMarkup = count(measured.text, markers.unsupportedMarkup);
});
await sweep({ width: 1440, height: 900 }, (article, measured) => {
  report.articles[article.slug].columnLeft1440 = measured.columnLeft;
  report.articles[article.slug].fontSizes = measured.fontSizes.length;
});
await sweep({ width: 1920, height: 1080 }, (article, measured) => { report.articles[article.slug].columnLeft1920 = measured.columnLeft; });

// 3. Layout shift on the home page at phone size, and script loaded before search opens.
{
  const context = await newContext("phone", "light");
  await context.addInitScript(() => {
    window.__shifts = [];
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.__shifts.push({ value: entry.value, time: entry.startTime, sources: (entry.sources ?? []).map((source) => source.node ? `${source.node.nodeName.toLowerCase()}${source.node.className && typeof source.node.className === "string" ? `.${source.node.className.trim().split(/\s+/).join(".")}` : ""}` : "") });
    }).observe({ type: "layout-shift", buffered: true });
  });
  const page = await context.newPage();
  // A phone's connection and processor (Lighthouse's mobile settings: 150 ms, 1.6 Mbit/s,
  // 4× slower CPU), so content that scripts reveal after the first paint shows its shift.
  const cdp = await context.newCDPSession(page);
  await cdp.send("Network.enable");
  await cdp.send("Network.emulateNetworkConditions", { offline: false, latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 });
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  // Scripts arrive a second after the page: what they reveal or move after the first
  // paint then counts, as on a slow connection (on the live site this gave 0.0775 on
  // 13 Nov 2026, the audit's 0.077).
  await page.route(/\/_astro\/.*\.js$/, async (route) => { await new Promise((done) => setTimeout(done, 1000)); await route.continue(); });
  await open(page, "");
  await page.waitForTimeout(1500);
  const shifts = await page.evaluate(() => window.__shifts);
  report.homeLayoutShift = { cls: cumulativeLayoutShift(shifts), shifts: shifts.map((shift) => ({ ...shift, value: Math.round(shift.value * 10000) / 10000, time: Math.round(shift.time) })) };
  await context.close();
}
for (const [name, path] of [["home", ""], ["article", "wiki/restoring-your-wallet-from-seed/"]]) {
  const context = await newContext("desktop", "light");
  const page = await context.newPage();
  const scripts = [];
  page.on("response", async (response) => {
    if (response.request().resourceType() !== "script") return;
    const body = await response.body().catch(() => Buffer.alloc(0));
    scripts.push({ url: new URL(response.url()).pathname.replace(base, "/"), bytes: body.length, gzip: gzipSync(body).length });
  });
  await open(page, path);
  await page.waitForTimeout(1500);
  scripts.sort((a, b) => b.gzip - a.gzip);
  report.scripts[name] = { gzip: scripts.reduce((sum, script) => sum + script.gzip, 0), files: scripts };
  await context.close();
}
await browser.close();
server.close();

// 4. Metrics, budget and report.
const list = Object.entries(report.articles).map(([slug, record]) => ({ slug, ...record }));
const belowFold = list.filter((record) => record.firstSentenceTop === null || record.firstSentenceTop >= viewports.phone.height);
const columns1440 = groupValues(list, (record) => record.columnLeft1440, (record) => record.slug);
const columns1920 = groupValues(list, (record) => record.columnLeft1920, (record) => record.slug);
const pageFontSizes = Object.values(report.pages).flatMap((entry) => Object.values(entry.fontSizes).map((sizes) => sizes.length));
const articleFontSizes = spread(list.map((record) => record.fontSizes));
const unresolved = list.filter((record) => record.unresolvedLinks > 0);
const unsupported = list.filter((record) => record.unsupportedMarkup > 0);
report.metrics = {
  axeViolations: report.axe.length,
  articlesFirstSentenceBelowFold: belowFold.length,
  columnPositions1440: columns1440.length,
  columnPositions1920: columns1920.length,
  columnJump1440: spread(columns1440.map((group) => group.value)).max - spread(columns1440.map((group) => group.value)).min,
  columnJump1920: spread(columns1920.map((group) => group.value)).max - spread(columns1920.map((group) => group.value)).min,
  maxFontSizesKeyPage: Math.max(...pageFontSizes),
  maxFontSizesArticle: articleFontSizes.max,
  homeLayoutShift: report.homeLayoutShift.cls,
  scriptKilobytesBeforeSearchHome: kilobytes(report.scripts.home.gzip),
  scriptKilobytesBeforeSearchArticle: kilobytes(report.scripts.article.gzip),
  unresolvedLinkMarkers: list.reduce((sum, record) => sum + record.unresolvedLinks, 0),
  unsupportedMarkupPages: unsupported.length,
};
report.summary = {
  articles: list.length,
  belowFold: belowFold.map((record) => `${record.slug} (${record.firstSentenceTop ?? "no sentence"})`),
  columns1440,
  columns1920,
  articleFontSizes,
  unresolvedLinkArticles: unresolved.length,
  unsupportedMarkupArticles: unsupported.map((record) => record.slug),
};
const budget = existsSync(options.budget) ? JSON.parse(readFileSync(options.budget, "utf8")) : {};
const over = overBudget(report.metrics, budget);
const before = options.baseline ? JSON.parse(readFileSync(options.baseline, "utf8")).metrics : undefined;

const labels = {
  axeViolations: "axe violations (pages × viewports × themes)",
  articlesFirstSentenceBelowFold: `Articles whose first sentence starts at or below ${viewports.phone.height} px (390×844)`,
  columnPositions1440: "Distinct reading-column x positions at 1440",
  columnPositions1920: "Distinct reading-column x positions at 1920",
  columnJump1440: "Largest column jump at 1440 (px)",
  columnJump1920: "Largest column jump at 1920 (px)",
  maxFontSizesKeyPage: "Most font sizes on a key page",
  maxFontSizesArticle: "Most font sizes on an article (1440)",
  homeLayoutShift: "Home layout shift, phone (CLS)",
  scriptKilobytesBeforeSearchHome: "Script before search opens, home (KB gzip)",
  scriptKilobytesBeforeSearchArticle: "Script before search opens, article (KB gzip)",
  unresolvedLinkMarkers: "Visible \"[unresolved link\" markers",
  unsupportedMarkupPages: "Pages showing \"[Unsupported MediaWiki markup\"",
};
const lines = [
  `# Design check, ${report.measuredAt.slice(0, 10)}`,
  "",
  before ? "| Metric | Before | After | Ceiling |\n| --- | ---: | ---: | ---: |" : "| Metric | Value | Ceiling |\n| --- | ---: | ---: |",
  ...Object.entries(report.metrics).map(([metric, value]) => `| ${labels[metric] ?? metric} |${before ? ` ${before[metric] ?? "–"} |` : ""} ${value} | ${budget[metric] ?? "–"} |`),
  "",
  `Articles measured: ${list.length}. Font sizes per article: ${articleFontSizes.min}–${articleFontSizes.max}. Unresolved-link markers in ${unresolved.length} articles.`,
  `Column x at 1440: ${columns1440.map((group) => `${group.value} px (${group.count})`).join(", ")}. At 1920: ${columns1920.map((group) => `${group.value} px (${group.count})`).join(", ")}.`,
  `Home layout shifts: ${report.homeLayoutShift.shifts.map((shift) => `${shift.value} at ${shift.time} ms (${shift.sources.filter(Boolean).join(", ") || "unknown"})`).join("; ") || "none"}.`,
  `Script before search, home: ${report.scripts.home.files.map((file) => `${file.url} ${kilobytes(file.gzip)} KB`).join(", ")}.`,
  "",
  "## axe violations",
  "",
  ...(report.axe.length ? report.axe.map((item) => `- ${item.page}, ${item.viewport}, ${item.theme}: ${item.id} (${item.impact}, ${item.nodes} nodes) ${item.help}: ${item.targets.join(" | ")}`) : ["None."]),
  "",
  "## Font sizes on key pages",
  "",
  ...Object.entries(report.pages).map(([name, entry]) => `- ${name}: ${Object.entries(entry.fontSizes).map(([key, sizes]) => `${key} ${sizes.length}`).join(", ")} (desktop-light: ${entry.fontSizes["desktop-light"].join(" ")})`),
  "",
  `## First sentence below ${viewports.phone.height} px at 390×844 (${belowFold.length})`,
  "",
  ...belowFold.map((record) => `- ${record.slug}: ${record.firstSentenceTop ?? "no sentence found"}`),
];
if (over.length) lines.push("", "## Over budget", "", ...over.map((item) => `- ${labels[item.metric] ?? item.metric}: ${item.value} (ceiling ${item.ceiling})`));
writeFileSync(join(out, "report.json"), `${JSON.stringify(report, null, 2)}\n`);
writeFileSync(join(out, "report.md"), `${lines.join("\n")}\n`);
console.log(lines.slice(0, 4 + Object.keys(report.metrics).length + 5).join("\n"));
console.log(`\nReport: ${join(options.out, "report.md")}${options["no-screenshots"] ? "" : `, screenshots in ${join(options.out, "screenshots")}`}`);
if (over.length) {
  console.error(`\nDesign check FAILED: ${over.map((item) => `${item.metric} ${item.value} > ${item.ceiling}`).join("; ")}`);
  process.exitCode = 1;
}

function fail(message) {
  console.error(`Design check FAILED: ${message}`);
  process.exit(1);
}
