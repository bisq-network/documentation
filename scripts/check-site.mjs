import { readFile, readdir, stat } from "node:fs/promises";
import { join, resolve, sep } from "node:path";

const root = resolve(process.env.DOCS_DIST || "dist");
const base = `/${(process.env.DOCS_BASE || "/").replace(/^\/+|\/+$/g, "")}`.replace(/^\/$/, "");
const failures = [];
const files = [];
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) await walk(path);
    else if (path.endsWith(".html")) files.push(path);
  }
}
await walk(root);
const documents = new Map();
for (const file of files) documents.set(file, await readFile(file, "utf8"));
for (const [file, html] of documents) {
  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const href = match[1].replaceAll("&amp;", "&");
    if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(href)) continue;
    const url = new URL(href, `https://local.invalid${base}/${file.slice(root.length + 1).replace(/index\.html$/, "")}`);
    if (base && !(url.pathname === base || url.pathname.startsWith(`${base}/`))) {
      failures.push(`${file}: link outside configured base: ${href}`);
      continue;
    }
    let path = decodeURIComponent(url.pathname.slice(base.length));
    let target = resolve(root, `.${path}`);
    if (!(target === root || target.startsWith(root + sep))) { failures.push(`${file}: invalid path ${href}`); continue; }
    try { if ((await stat(target)).isDirectory()) target = join(target, "index.html"); }
    catch { failures.push(`${file}: missing ${href}`); continue; }
    if (url.hash) {
      try {
        const targetHtml = documents.get(target) ?? await readFile(target, "utf8");
        const id = decodeURIComponent(url.hash.slice(1));
        if (!targetHtml.includes(`id="${id}"`) && !targetHtml.includes(`id='${id}'`)) failures.push(`${file}: missing fragment ${href}`);
      } catch { failures.push(`${file}: missing ${href}`); }
    }
  }
}
// Each migrated page must exist and expose unique IDs for its local heading links.
try {
  const articles = JSON.parse(await readFile("migration/articles.json", "utf8")).items;
  if (!Array.isArray(articles) || articles.length !== 209) failures.push("expected 209 recovered articles");
  else for (const article of articles) {
    if (/reserved|in.progress/i.test(article.status || "")) failures.push(`unfinished migration status for ${article.title}`);
    if (!/^\/wiki\/[a-z0-9-]+\/$/.test(article.route)) { failures.push(`invalid article route ${article.route}`); continue; }
    const path = join(root, article.route.slice(1), "index.html");
    const html = documents.get(path);
    if (!html) { failures.push(`missing imported article ${article.route}`); continue; }
    const headings = [...html.matchAll(/<h1(?:\s|>)/gi)].length;
    if (headings !== 1) failures.push(`${article.route}: expected one page H1, found ${headings}`);
    for (const code of html.matchAll(/<(pre|code)\b[^>]*>([\s\S]*?)<\/\1>/gi)) {
      if (/<(?:h[1-6]|p|div|ul|ol|li|table|figure|blockquote|section|article|aside|hr)(?:\s|>)/i.test(code[2])) failures.push(`${article.route}: block element inside literal ${code[1]}`);
    }
    const ids = new Set();
    // Only inspect real start tags: escaped historical source can contain literal id= text.
    for (const tag of html.matchAll(/<[a-z][^>]*>/gi)) {
      const match = tag[0].match(/\sid=["']([^"']+)["']/);
      if (!match) continue;
      if (ids.has(match[1])) failures.push(`duplicate id ${match[1]} in ${article.route}`);
      ids.add(match[1]);
    }
  }
} catch (error) { if (error.code === "ENOENT") failures.push("missing migration/articles.json"); else throw error; }
// Keep the primary search index limited to current-guide and core pages.
const searchable = new Set([
  "index.html", "start/choose-bisq/index.html", "dao/overview/index.html", "contribute/getting-started/index.html",
  "bisq-1/install-and-verify/index.html", "bisq-1/first-trade/index.html", "bisq-1/payment-accounts/index.html", "bisq-1/backup-and-recovery/index.html", "bisq-1/dispute-help/index.html",
  "bisq-2/install-and-verify/index.html", "bisq-2/first-trade/index.html", "bisq-2/bisq-easy-safety/index.html", "bisq-2/backup-and-recovery/index.html", "bisq-2/get-help/index.html",
]);
for (const [file, html] of documents) {
  const path = file.slice(root.length + 1).split(sep).join("/");
  const indexed = /<main\b[^>]*\bdata-pagefind-body(?:\s|=|>)/i.test(html);
  if (indexed !== searchable.has(path)) failures.push(`unexpected search scope for ${path}`);
}
for (const path of searchable) if (!documents.has(join(root, path))) failures.push(`missing searchable page ${path}`);
for (const path of ["Bisq_2/index.html", "Downloading_and_installing/index.html"]) {
  if (!documents.get(join(root, path))?.includes("data-pagefind-ignore")) failures.push(`legacy page not excluded from search: ${path}`);
}
try {
  const index = JSON.parse(await readFile(join(root, "pagefind/pagefind-entry.json"), "utf8"));
  const count = Object.values(index.languages || {}).reduce((total, language) => total + language.page_count, 0);
  if (count !== searchable.size) failures.push(`search index contains ${count} pages; expected ${searchable.size}`);
} catch { failures.push("missing or invalid local search index"); }
for (const [path, ids] of [["Bisq_2/index.html", ["Installation", "Known_issues_with_installation"]], ["Downloading_and_installing/index.html", ["OS-specific_install_notes"]]]) {
  const html = documents.get(join(root, path));
  if (!html) failures.push(`missing legacy page ${path}`);
  else for (const id of ids) if (!html.includes(`id="${id}"`)) failures.push(`missing legacy anchor ${path}#${id}`);
}
if (failures.length) { console.error(failures.join("\n")); process.exitCode = 1; }
else console.log(`Checked ${documents.size} HTML pages, internal links and image/script sources, fragments, selected legacy anchors, and search scope.`);
