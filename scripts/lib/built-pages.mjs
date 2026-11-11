// Checks on the built site that tie each published article page to what the fidelity
// gate checked (scripts/check-rendered-articles.mjs runs them after astro build).
import { attributeValue, classes, elementsOf, serialize } from "./rendered-html.mjs";

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
