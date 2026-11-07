import { readFile, readdir, stat } from "node:fs/promises";
import { createHash } from "node:crypto";
import { join, resolve, sep } from "node:path";
import { collectGuides, loadIntegration } from "./lib/documentation.mjs";
import { buildLegacyRoutes } from "./lib/legacy-routes.mjs";

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
const fileForRoute = (route) => join(root, decodeURIComponent(new URL(route, "https://local.invalid").pathname).slice(1), "index.html");
const digest = (bytes) => createHash("sha256").update(bytes).digest("hex");
async function documentForRoute(route) {
  const file = fileForRoute(route);
  try { return documents.get(file) ?? await readFile(file, "utf8"); }
  catch { return null; }
}
function idsFrom(html) {
  return [...html.matchAll(/<[a-z][^>]*>/gi)].flatMap((tag) => {
    const id = tag[0].match(/\sid=["']([^"']+)["']/);
    return id ? [id[1]] : [];
  });
}
for (const [file, html] of documents) {
  const ids = idsFrom(html);
  if (new Set(ids).size !== ids.length) failures.push(`${file}: duplicate element ID`);
  if ([...html.matchAll(/<h1(?:\s|>)/gi)].length !== 1) failures.push(`${file}: expected one page H1`);
  for (const match of html.matchAll(/\b(?:href|src)=(["'])(.*?)\1/g)) {
    const href = match[2].replaceAll("&amp;", "&");
    if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(href)) continue;
    const url = new URL(href, `https://local.invalid${base}/${file.slice(root.length + 1).replace(/index\.html$/, "")}`);
    if (base && !(url.pathname === base || url.pathname.startsWith(`${base}/`))) {
      failures.push(`${file}: link outside configured base: ${href}`); continue;
    }
    const path = decodeURIComponent(url.pathname.slice(base.length));
    let target = resolve(root, `.${path}`);
    if (!(target === root || target.startsWith(root + sep))) { failures.push(`${file}: invalid path ${href}`); continue; }
    try { if ((await stat(target)).isDirectory()) target = join(target, "index.html"); }
    catch { failures.push(`${file}: missing ${href}`); continue; }
    if (url.hash) {
      try {
        const targetHtml = documents.get(target) ?? await readFile(target, "utf8");
        const id = decodeURIComponent(url.hash.slice(1));
        if (!idsFrom(targetHtml).includes(id)) failures.push(`${file}: missing fragment ${href}`);
      } catch { failures.push(`${file}: missing ${href}`); }
    }
  }
}
const migration = loadIntegration();
const guides = collectGuides();
const searchable = new Set(["index.html", ...guides.map((guide) => `${guide.route.slice(1)}index.html`)]);
for (const [file, html] of documents) {
  const path = file.slice(root.length + 1).split(sep).join("/");
  const indexed = /<main\b[^>]*\bdata-pagefind-body(?:\s|=|>)/i.test(html);
  if (indexed !== searchable.has(path)) failures.push(`unexpected search scope for ${path}`);
}
for (const path of searchable) if (!documents.has(join(root, path))) failures.push(`missing searchable page ${path}`);
const count = Object.values(JSON.parse(await readFile(join(root, "pagefind/pagefind-entry.json"), "utf8")).languages || {}).reduce((n, language) => n + language.page_count, 0);
if (count !== searchable.size) failures.push(`search index contains ${count} pages; expected ${searchable.size}`);
for (const article of migration) {
  const html = await documentForRoute(article.target);
  const fragment = article.target.split("#")[1];
  if (!html || (fragment && !idsFrom(html).includes(fragment))) failures.push(`invalid integrated destination for ${article.title}: ${article.target}`);
  if (html && !/<main\b[^>]*\bdata-pagefind-body(?:\s|=|>)/i.test(html)) failures.push(`destination not searchable: ${article.title}`);
  const raw = await readFile(join(root, article.source_download.slice(1)));
  if (digest(raw) !== article.wikitext_sha256) failures.push(`source bytes changed: ${article.title}`);
}
const legacy = buildLegacyRoutes(migration);
for (const route of legacy) {
  const html = await documentForRoute(`/${route.path}/`);
  if (!html || !html.includes('id="legacy-destination"') || !html.includes("data-pagefind-ignore")) failures.push(`missing compatibility route: ${route.path}`);
  if (html) {
    const json = html.match(/<script[^>]*id="legacy-destination"[^>]*>([\s\S]*?)<\/script>/)?.[1];
    try {
      const config = JSON.parse(json);
      if (config.target !== route.target || config.base !== base) failures.push(`wrong compatibility destination: ${route.path}`);
      for (const target of new Set(Object.values(config.fragments))) {
        const content = await documentForRoute(target);
        const fragment = target.split("#")[1];
        if (!content || (fragment && !idsFrom(content).includes(fragment))) failures.push(`invalid legacy fragment destination ${route.path}: ${target}`);
      }
    } catch { failures.push(`invalid compatibility data: ${route.path}`); }
  }
}
const media = JSON.parse(await readFile("public/media/wiki/mapping.json", "utf8")).files;
for (const asset of media) if (digest(await readFile(join(root, asset.file))) !== asset.sha256) failures.push(`recovered image changed: ${asset.filename}`);
const mediaDispositions = JSON.parse(await readFile("migration/media-disposition.json", "utf8")).items;
if (mediaDispositions.length !== media.length || new Set(mediaDispositions.map((item) => item.sha256)).size !== media.length) failures.push("incomplete media disposition inventory");
for (const asset of media) {
  const item = mediaDispositions.find((entry) => entry.sha256 === asset.sha256);
  if (!item?.reason || item.file !== asset.file || !["inline", "catalogue-only"].includes(item.disposition)) {
    failures.push(`missing media disposition: ${asset.filename}`); continue;
  }
  const actualGuides = [];
  for (const guide of guides) {
    const html = await documentForRoute(guide.route);
    if (html?.includes(asset.sha256)) actualGuides.push(guide.route);
  }
  if (JSON.stringify(actualGuides.sort()) !== JSON.stringify([...item.guides].sort()) || (item.disposition === "inline") !== (actualGuides.length > 0)) failures.push(`media placement changed without disposition update: ${asset.filename}`);
}
const mediator = migration.find((item) => item.title === "Finding your mediator");
const mediatorHtml = await documentForRoute(mediator.target);
for (const name of ["suddenwhipvapor", "luis3672"]) if (!mediatorHtml?.includes(name)) failures.push(`mediator name missing: ${name}`);
if (failures.length) { console.error([...new Set(failures)].join("\n")); process.exitCode = 1; }
else console.log(`Checked ${documents.size} HTML pages, ${guides.length} searchable guides, ${migration.length} topic dispositions, ${legacy.length} legacy routes, ${media.length} unchanged images, source hashes, links and fragments.`);
