// Markdown rendering rules for the restored wiki articles (src/content/docs/wiki/).
//
// The articles were converted from HTML to Markdown and must render exactly as before:
// - explicitHeadingIds: every Markdown heading carries its ID, `## List of Teams {#list-of-teams}`.
//   The ID never depends on the wording, so saved links keep working when a heading is
//   edited. A heading without an ID, or an ID used twice on the page (headings and raw HTML
//   such as legacy anchors and figures), fails the build.
// - plainHeadings: no Starlight anchor-link wrapper around article headings. The page script
//   (src/scripts/article-experience.ts) already adds the article's own copy-link button.
// - externalLinkRel: Markdown links to http(s) URLs get rel="noopener noreferrer", as the
//   converted HTML had, so browsers keep not sending a Referer.
// Other pages keep Starlight's defaults. The site's Markdown engine is Sätteri: the first
// rule runs on the Markdown tree (mdast), the other two on the HTML tree (hast).

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

const HEADING_TAGS = new Set(["h1", "h2", "h3", "h4", "h5", "h6"]);
const classes = (node) => {
  const value = node.properties?.className ?? node.properties?.class ?? [];
  return Array.isArray(value) ? value : String(value).split(/\s+/);
};

export function plainHeadings() {
  return {
    name: "wiki-plain-headings",
    element: {
      filter: ["div"],
      visit(node) {
        if (!classes(node).includes("sl-heading-wrapper")) return;
        return node.children.find((child) => child.type === "element" && HEADING_TAGS.has(child.tagName));
      },
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
        processor.options.hastPlugins.push(({ fileURL }) => (isWikiArticle(fileURL) ? [plainHeadings(), externalLinkRel()] : null));
      },
    },
  };
}
