import archive from "../../migration/archive-templates-20261014.json" with { type: "json" };
import renderings from "../../migration/template-renderings-20261014.json" with { type: "json" };
import { normalizeWikiTitle } from "./archived-redirects.mjs";

const templates = new Map(archive.items.map((item) => [normalizeWikiTitle(item.template_normalized_name), item]));
const derived = new Map(renderings.items.map((item) => [item.invocation, item]));
const escape = (value) => String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const decode = (value) => value.replace(/&#(x[\da-f]+|\d+);|&(amp|lt|gt|quot|apos);/gi, (all, numeric, named) => {
  if (numeric) return String.fromCodePoint(numeric[0].toLowerCase() === "x" ? parseInt(numeric.slice(1), 16) : Number(numeric));
  return { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'" }[named.toLowerCase()];
});

/** Return the archived definition download for a known template title. */
export function templateDefinitionTarget(title) {
  if (!title.startsWith("Template:")) return null;
  return templates.get(normalizeWikiTitle(title.slice("Template:".length)))?.source_download || null;
}

/** Render source-locked historical expansions at their verified article occurrences. */
export function renderArchivedTemplates(html, base = "/", sourceSlug = "") {
  let restored = 0;
  let unresolved = 0;
  const prefix = base.replace(/\/$/, "");
  const seen = new Map();
  // The invocation is text only, so a match never reaches into another element.
  const content = html.replace(/<span class="wiki-template-gap" role="note"><strong>\[Unresolved template: ([^<]+)\]<\/strong> <code>([^<]*)<\/code><\/span>/g, (original, name, encodedInvocation) => {
    const invocation = decode(encodedInvocation);
    const item = derived.get(invocation);
    if (!item || !item.articles.includes(sourceSlug)) { unresolved++; return original; }
    const count = (seen.get(invocation) || 0) + 1;
    if (count > item.articles.filter((slug) => slug === sourceSlug).length) throw new Error(`Unexpected template occurrence in ${sourceSlug}: ${invocation}`);
    seen.set(invocation, count);
    restored++;
    const link = `${prefix}${item.source_download}`;
    if (item.inline) {
      const body = item.scalar ? item.html : item.html.replace(/^<p>([\s\S]*)<\/p>\s*$/, "$1");
      return `<span class="wiki-template-expanded">${body}<sup><a href="${escape(link)}" aria-label="Historical template source for ${escape(name)}, 14 October 2026">2026 source</a></sup></span>`;
    }
    return `<div class="wiki-template-expanded">${item.html}<p><small>Historical template from the 14 October 2026 archive · <a href="${escape(link)}">source</a></small></p></div>`;
  });
  for (const item of renderings.items) {
    const expected = item.articles.filter((slug) => slug === sourceSlug).length;
    if ((seen.get(item.invocation) || 0) !== expected) throw new Error(`Template occurrence count changed in ${sourceSlug}: ${item.invocation}`);
  }
  return { content, restored, unresolved };
}
