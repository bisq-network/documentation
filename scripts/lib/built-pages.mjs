// Checks on the built site that tie each published article page to what the fidelity
// gate checked (scripts/check-rendered-articles.mjs runs them after astro build).
import { createHash } from "node:crypto";
import { attributeValue, classes, elementsOf, serialize, startTag, textContent } from "./rendered-html.mjs";

// The page files the site has. Anything else under src/pages/ could publish a page at
// an article's route (a static file wins over the generated article), so a new page
// file needs a deliberate change here.
export const knownPageFiles = ["404.astro", "[...legacy].astro", "saved-wiki-links.json.ts"];

/** Problems with the files under src/pages/ (repository-relative to src/pages/). */
export function pageFileProblems(files) {
  return files.filter((file) => !knownPageFiles.includes(file))
    .map((file) => `src/pages/${file} is not a known page file; a page there could replace a published article (scripts/lib/built-pages.mjs lists the known ones)`);
}

/**
 * Problems with one built article page: its content element must hold exactly the
 * expected page content (the rendered article after scripts/lib/article-page.mjs), and
 * every ID in the article must be unique on the whole page, so an article cannot take
 * over an ID the page's own scripts or links use.
 * page: the built document as nodes; expected: the expected content as nodes.
 */
export function builtArticleProblems(page, expected) {
  const problems = [];
  const all = elementsOf(page);
  const contents = all.filter((element) => element.tag === "div" && classes(element).includes("sl-markdown-content"));
  if (contents.length !== 1) return [`the page has ${contents.length} content elements, not one`];
  if (serialize(contents[0].children) !== serialize(expected)) problems.push("the page does not show the article as the gate checked it");
  const articles = elementsOf(contents[0].children).filter((element) => element.tag === "div" && classes(element).includes("wiki-recovered-article"));
  if (articles.length !== 1) return [...problems, `the page has ${articles.length} article containers, not one`];
  const pageIds = new Map();
  for (const element of all) {
    const id = attributeValue(element, "id");
    if (id !== undefined) pageIds.set(id, (pageIds.get(id) ?? 0) + 1);
  }
  const shared = [...new Set(elementsOf(articles[0].children).map((element) => attributeValue(element, "id")).filter((id) => id !== undefined && pageIds.get(id) > 1))];
  if (shared.length) problems.push(`IDs used more than once on the page: ${shared.map((id) => `#${id}`).join(", ")}`);
  return problems;
}

// The docs entries that are MDX; every other docs entry is Markdown. MDX can import
// components and run code, so a new MDX entry needs a deliberate change here.
export const knownMdxEntries = ["src/content/docs/index.mdx", "src/content/docs/browse/all.mdx"];
// Front-matter fields docs entries may set. Starlight reads more (head adds tags to the
// page's <head>, template, hero, banner, sidebar, pagefind…), which could change a page
// outside its content; such a field needs a deliberate change here.
export const knownFrontmatterFields = ["title", "description", "tableOfContents", "prev", "next", "slug"];

/** The route of a docs entry id, as Starlight turns ids into routes ("browse/index" -> "browse"). */
export const routeOfId = (id) => (id === "index" ? "" : id.replace(/\/index$/, ""));
/** The route a docs file has by its path. */
export const routeOfFile = (file) => routeOfId(file.replace(/^src\/content\/docs\//, "").replace(/\.mdx?$/, ""));

/**
 * Problems with the docs entries of a build: entries [{ id, filePath, frontmatter }],
 * reservedRoutes the routes other pages generate (old wiki addresses and aliases).
 * Every entry is a known kind of file, keeps the route its path gives it (a slug in
 * the front matter may only repeat it), sets only known front-matter fields, has a
 * route of its own, and takes no reserved route.
 */
export function docsEntryProblems(entries, reservedRoutes = []) {
  const problems = [];
  const routes = new Map();
  const reserved = new Set(reservedRoutes.map((route) => route.replace(/^\/|\/$/g, "").toLowerCase()));
  for (const { id, filePath, frontmatter = {} } of entries) {
    if (!/^src\/content\/docs\/.+\.md$/.test(filePath) && !knownMdxEntries.includes(filePath)) problems.push(`${filePath} is not a Markdown docs entry or a known MDX entry`);
    const route = routeOfId(id);
    if (route !== routeOfFile(filePath)) problems.push(`${filePath} is published at /${route}/, not at the route its path gives it (/${routeOfFile(filePath)}/)`);
    const unknown = Object.keys(frontmatter).filter((key) => !knownFrontmatterFields.includes(key));
    if (unknown.length) problems.push(`${filePath} sets ${unknown.join(", ")} in its front matter, which could change the page outside its content`);
    if ("slug" in frontmatter && frontmatter.slug !== routeOfFile(filePath)) problems.push(`${filePath} sets slug ${JSON.stringify(frontmatter.slug)}, not its path's route`);
    if (routes.has(route.toLowerCase())) problems.push(`${filePath} and ${routes.get(route.toLowerCase())} are both published at /${route}/`);
    routes.set(route.toLowerCase(), filePath);
    if (reserved.has(route.toLowerCase())) problems.push(`${filePath} is published at /${route}/, an old wiki address or alias`);
  }
  return problems;
}

// What public/ may hold: files are copied into the site as they are, so one could take
// the place of an article or an old wiki address. Only these top-level entries, and no
// HTML anywhere.
export const knownPublicEntries = ["favicon.ico", "fonts", "media", "wiki-source"];

/** Problems with the files under public/ (paths relative to public/). */
export function publicFileProblems(files) {
  const problems = [];
  for (const file of files) {
    if (!knownPublicEntries.includes(file.split("/")[0])) problems.push(`public/${file} is not under a known public entry (${knownPublicEntries.join(", ")})`);
    else if (/\.x?html?$/i.test(file)) problems.push(`public/${file} is an HTML file; it could take the place of a page`);
  }
  return problems;
}

const hash = (value) => createHash("sha256").update(value).digest("hex").slice(0, 16);
// Elements that run, load or style something, or redirect the page.
const active = new Set(["script", "style", "link", "base", "meta", "iframe", "object", "embed", "frame", "frameset", "noscript", "template", "form"]);
const optionalScripts = /\/_astro\/(?:Mobile)?TableOfContents\.astro_astro_type_script_index_\d+_lang\.[\w-]+\.js$/;

/**
 * What runs or loads on a built page outside its content element: scripts (by source
 * or by the hash of their text), styles, stylesheets and preloads, base, refresh and
 * other http-equiv metas, frames, objects and forms, and any on* attribute. Data
 * scripts (application/json), descriptive metas and the canonical link vary by page
 * and are left out.
 */
export function pageChrome(page) {
  const all = elementsOf(page);
  const content = all.find((element) => element.tag === "div" && classes(element).includes("sl-markdown-content"));
  const inside = new Set(content ? elementsOf(content.children) : []);
  const items = [];
  for (const element of all) {
    if (inside.has(element)) continue;
    for (const [name] of element.attrs) if (/^on/i.test(name)) items.push(`${element.tag} ${name}`);
    if (!active.has(element.tag)) continue;
    if (element.tag === "script") {
      const type = attributeValue(element, "type") ?? "";
      if (/^application\/(?:ld\+)?json$/.test(type)) continue;
      items.push(`script ${type} ${attributeValue(element, "src") ?? hash(textContent(element))}`);
    } else if (element.tag === "style") items.push(`style ${hash(textContent(element))}`);
    else if (element.tag === "meta") { if (attributeValue(element, "http-equiv") !== undefined) items.push(startTag(element)); }
    else if (element.tag === "link") { if (!["canonical", "alternate", "sitemap"].includes(attributeValue(element, "rel"))) items.push(startTag(element)); }
    else items.push(startTag(element));
  }
  return items;
}

/**
 * Problems with the article pages' surroundings (pages: Map name -> page nodes): what
 * runs or loads outside the content must be the same on every article page, apart from
 * the contents-list scripts on pages with headings. A page that adds a script or a
 * redirect of its own stands out.
 */
export function pageChromeProblems(pages) {
  const chrome = new Map([...pages].map(([name, page]) => [name, pageChrome(page)]));
  const sets = [...chrome.values()].map((items) => new Set(items));
  const common = sets.length ? [...sets[0]].filter((item) => sets.every((set) => set.has(item))) : [];
  const problems = [];
  for (const [name, items] of chrome) {
    const extra = [...new Set(items)].filter((item) => !common.includes(item) && !optionalScripts.test(item.replace(/^script module /, "")));
    if (extra.length) problems.push(`${name} has what other article pages do not: ${extra.map((item) => item.slice(0, 120)).join("; ")}`);
  }
  return problems;
}
