// What a page shows of a rendered article: src/components/SourceHistory.astro runs
// this on the Markdown processor's HTML (its rendered.html) and puts the result in the
// page. The fidelity gate runs the same function, so it checks what readers see, not
// the HTML before these string replacements (scripts/check-source-fidelity.mjs), and
// scripts/check-rendered-articles.mjs compares the result with every built article page.
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { linkRawHeading } from "../../src/markdown/wiki-markdown.mjs";
import { renderArchivedTemplates } from "./archived-templates.mjs";
import { loadIntegration } from "./documentation.mjs";
import { allRecoveredAliases, renderRecoveredLinks } from "./recovered-link-aliases.mjs";
import { renderSectionRepairs } from "./section-repairs.mjs";
import { renderSupplementalMedia } from "./supplemental-media.mjs";
import { addTableRowSummaries } from "./table-search-rows.mjs";

let integration;
/** The original article whose route is /<id>/, or undefined for any other page. */
export function articleForPage(id) {
  integration ??= loadIntegration();
  const route = id ? `/${id}/` : "/";
  return integration.find((item) => item.target === route);
}

/**
 * The page content for rendered HTML of the page with entry id (such as
 * "wiki/teams"), with base the site's base path. Returns the content and what the
 * page reports about it: { content, links, sections, templates, media }.
 */
export function articlePageContent(rendered, id, base = "/") {
  const article = articleForPage(id);
  const rawContent = rendered.replace(
    /<details\b([^>]*\bclass="[^"]*\bwiki-table-source\b[^"]*"[^>]*)>/g,
    (tag, attributes) => attributes.includes("data-pagefind-ignore") ? tag : `<details${attributes} data-pagefind-ignore>`,
  );
  const sourceText = article ? readFileSync(resolve(process.cwd(), `public${article.source_download}`), "utf8") : "";
  const links = article ? renderRecoveredLinks(rawContent, base, allRecoveredAliases(integration), article.slug, sourceText) : { content: rawContent, unresolved: 0 };
  const sections = article ? renderSectionRepairs(links.content, article.slug) : { content: links.content, unresolved: 0 };
  const templates = article ? renderArchivedTemplates(sections.content, base, article.slug) : { content: links.content, restored: 0, unresolved: 0 };
  const media = article ? renderSupplementalMedia(templates.content, article.image_occurrences || [], base) : { content: links.content, images: [] };
  const content = media.content.replace(
    "Missing introduction and reasons templates remain explicitly unresolved; no replacement prose has been invented.",
    "The introduction and reasons sections are rendered from recovered historical templates."
  );
  return { article, content: addTableRowSummaries(article ? linkRawHeading(content) : content), links, sections, templates, media };
}
