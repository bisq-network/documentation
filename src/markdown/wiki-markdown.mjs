// Markdown rendering rules for the restored wiki articles (src/content/docs/wiki/).
//
// The articles were converted from HTML to Markdown. Their headings use Starlight's standard
// heading link (div.sl-heading-wrapper with a.sl-anchor-link), like the site's other pages.
// - explicitHeadingIds: every Markdown heading carries its ID, `## List of Teams {#list-of-teams}`.
//   The ID never depends on the wording, so saved links keep working when a heading is
//   edited. A heading without an ID, or an ID used twice on the page (headings and raw HTML
//   such as legacy anchors and figures), fails the build.
// - headingLinkLabels: the link's screen-reader label without the space headings keep at the end
//   ("Section titled “Setup”").
// - rawHeadingLinks: headings that stay HTML (a few in converted articles, all in the additional
//   historical articles) get the same anchor link Starlight adds to Markdown headings, pointing
//   at their existing ID, so every article heading has exactly one link.
// - externalLinkRel: Markdown links to http(s) URLs get rel="noopener noreferrer", as the
//   converted HTML had, so browsers keep not sending a Referer.
// Other pages keep Starlight's defaults. The site's Markdown engine is Sätteri: the first
// rule runs on the Markdown tree (mdast), the others on the HTML tree (hast).

import { fileURLToPath } from "node:url";

const wikiDirectory = fileURLToPath(new URL("../content/docs/wiki/", import.meta.url));
const isWikiArticle = (fileURL) => Boolean(fileURL) && fileURLToPath(fileURL).startsWith(wikiDirectory);
const where = (fileURL) => fileURLToPath(fileURL).slice(wikiDirectory.length - "src/content/docs/wiki/".length);

/** `{#id}` at the end of a heading's last text. Whatever precedes it, including a space, stays text. */
export const HEADING_ID = /\{#([^\s{}]+)\}[ \t]*$/;
const RAW_ID = /<[A-Za-z][^<>]*?\sid="([^"]+)"/g;

export function explicitHeadingIds(fileURL) {
  const ids = new Map();
  const add = (id, what) => ids.set(id, [...(ids.get(id) ?? []), what]);
  return {
    name: "wiki-explicit-heading-ids",
    heading(node, ctx) {
      const last = node.children.at(-1);
      const match = last?.type === "text" ? HEADING_ID.exec(last.value) : null;
      if (!match) {
        throw new Error(`${where(fileURL)}: heading "${ctx.textContent(node).trim()}" has no ID. End it with {#id}, keeping the ID it had before if it was renamed.`);
      }
      const id = match[1];
      const text = last.value.slice(0, match.index);
      if (text) ctx.setField(last, "value", text);
      else ctx.removeNode(last);
      ctx.setField(node, "data", { ...node.data, hProperties: { ...node.data?.hProperties, id } });
      add(id, `heading "${ctx.textContent(node).replace(HEADING_ID, "").trim()}"`);
    },
    html(node) {
      for (const match of node.value.matchAll(RAW_ID)) add(match[1], "HTML element");
    },
    after() {
      const duplicates = [...ids].filter(([, uses]) => uses.length > 1);
      if (duplicates.length) {
        throw new Error(`${where(fileURL)}: duplicate IDs: ${duplicates.map(([id, uses]) => `#${id} (${uses.join(", ")})`).join("; ")}`);
      }
    },
  };
}

// Starlight's markup for a heading link (@astrojs/starlight satteriAutolinkHeadingsPlugin, English
// label, "link-alt" icon). scripts/wiki-markdown.test.mjs checks it against Starlight's own output.
const LINK_ICON = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="m12.11 15.39-3.88 3.88a2.52 2.52 0 0 1-3.5 0 2.47 2.47 0 0 1 0-3.5l3.88-3.88a1 1 0 1 0-1.42-1.42l-3.88 3.89a4.48 4.48 0 0 0 6.33 6.33l3.89-3.88a1 1 0 0 0-1.42-1.42m8.58-12.08a4.49 4.49 0 0 0-6.33 0l-3.89 3.88a1 1 0 1 0 1.42 1.42l3.88-3.88a2.52 2.52 0 0 1 3.5 0 2.47 2.47 0 0 1 0 3.5l-3.88 3.88a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l3.88-3.89a4.49 4.49 0 0 0 0-6.33M8.83 15.17a1 1 0 0 0 .71.29 1 1 0 0 0 .71-.29l4.92-4.92a1 1 0 1 0-1.42-1.42l-4.92 4.92a1 1 0 0 0 0 1.42"></path></svg>';
const NAMED = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: "\u00a0" };
const decode = (text) => text.replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi, (whole, entity) => (entity[0] === "#"
  ? String.fromCodePoint(entity[1].toLowerCase() === "x" ? parseInt(entity.slice(2), 16) : Number(entity.slice(1)))
  : NAMED[entity.toLowerCase()] ?? whole));
const escapeText = (text) => text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const RAW_HEADING = /<(h[1-6])((?:\s+[a-z-]+="[^"]*")*)\s*>([\s\S]*?)<\/\1>/g;

/** Wrap HTML headings with an ID the way Starlight wraps a Markdown heading (skipping wrapped ones). */
export function linkRawHeading(html) {
  return html.replace(RAW_HEADING, (heading, tag, attributes, inner, offset) => {
    const id = /\sid="([^"]+)"/.exec(attributes)?.[1];
    if (!id || html.slice(0, offset).endsWith(`<div class="sl-heading-wrapper level-${tag}">`)) return heading;
    const label = `Section titled \u201c${escapeText(headingTitle(decode(inner.replace(/<[^>]*>/g, ""))))}\u201d`;
    return `<div class="sl-heading-wrapper level-${tag}">${heading}<a class="sl-anchor-link" href="#${id}"><span aria-hidden="true" class="sl-anchor-icon">${LINK_ICON}</span><span class="sr-only" data-pagefind-ignore>${label}</span></a></div>`;
  });
}

/** A heading's title for its link label: whitespace collapsed and trimmed. */
const headingTitle = (text) => text.replace(/\s+/g, " ").trim();
const LABEL = /^(Section titled \u201c)([\s\S]*)(\u201d)$/;

/** Starlight's label repeats the heading text as is; articles keep a space at the end of headings. */
export function headingLinkLabels() {
  return {
    name: "wiki-heading-link-labels",
    element: {
      filter: ["span"],
      visit(node, ctx) {
        const parent = ctx.parent(node);
        const classes = (element) => String(element?.properties?.className ?? element?.properties?.class ?? "").split(/[\s,]+/);
        if (!classes(node).includes("sr-only") || parent?.tagName !== "a" || !classes(parent).includes("sl-anchor-link")) return;
        const [text] = node.children;
        const match = node.children.length === 1 && text.type === "text" ? LABEL.exec(text.value) : null;
        if (match && match[2] !== headingTitle(match[2])) ctx.setField(text, "value", `${match[1]}${headingTitle(match[2])}${match[3]}`);
      },
    },
  };
}

export function rawHeadingLinks() {
  return {
    name: "wiki-raw-heading-links",
    raw(node, ctx) {
      const value = linkRawHeading(node.value);
      if (value !== node.value) ctx.setField(node, "value", value);
    },
  };
}

export const EXTERNAL_URL = /^https?:\/\//i;

export function externalLinkRel() {
  return {
    name: "wiki-external-link-rel",
    element: {
      filter: ["a"],
      visit(node, ctx) {
        const href = node.properties?.href;
        if (typeof href === "string" && EXTERNAL_URL.test(href) && node.properties.rel === undefined) {
          ctx.setProperty(node, "rel", ["noopener", "noreferrer"]);
        }
      },
    },
  };
}

/** Astro integration: register the rules on the configured Sätteri processor, after Starlight's. */
export function wikiMarkdown() {
  return {
    name: "wiki-markdown",
    hooks: {
      "astro:config:setup": ({ config }) => {
        const processor = config.markdown?.processor;
        if (processor?.name !== "satteri") throw new Error("wiki-markdown needs Astro's Sätteri Markdown processor");
        processor.options.mdastPlugins.push(({ fileURL }) => (isWikiArticle(fileURL) ? explicitHeadingIds(fileURL) : null));
        processor.options.hastPlugins.push(({ fileURL }) => (isWikiArticle(fileURL) ? [rawHeadingLinks(), headingLinkLabels(), externalLinkRel()] : null));
      },
    },
  };
}
