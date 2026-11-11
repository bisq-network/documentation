// The format record of restored articles converted from HTML to Markdown.
//
// migration/markdown-format.json lists, per converted article, the HTML file it was
// converted from (the restored article, or its last accepted edit) and the Markdown
// file that replaced it, by SHA-256. The fidelity gate rebuilds that HTML file from
// the preserved original in migration/restored-articles/ and checks, on every run,
// that the Markdown renders to the same page as the HTML, with only the normalization
// in scripts/lib/rendered-html.mjs (normalizeFormat). Any later change to the Markdown
// is a wording change: it needs a receipt like any other (CONTRIBUTING.md).
//
// scripts/record-markdown-format.mjs writes the record after checking the conversion.
import { createHash } from "node:crypto";
import { renderArticle } from "./render-markdown.mjs";
import { attribute, dropHeadingLinks, elementsOf, escapeText, firstDifference, htmlParser, normalizeFormat, serialize, splitRenderedArticle, startTag, textContent } from "./rendered-html.mjs";

export const markdownFormatPath = "migration/markdown-format.json";
export const preservedArticlesDir = "migration/restored-articles";
export const preservedArticlePath = (slug) => `${preservedArticlesDir}/${slug}.md`;
export const articlePath = (slug) => `src/content/docs/wiki/${slug}.md`;

const sha256 = /^[a-f0-9]{64}$/;
const hash = (value) => createHash("sha256").update(value).digest("hex");

/** Validate the format record; returns a Map slug -> item. Throws on any problem. */
export function parseMarkdownFormat(record, slugs) {
  if (record?.schema_version !== 1) throw new Error("unsupported Markdown format record (expected schema_version 1)");
  if (!Array.isArray(record.items)) throw new Error("items must be a list");
  const items = new Map();
  for (const item of record.items) {
    const keys = Object.keys(item ?? {}).sort().join(",");
    if (keys !== "html_file_sha256,markdown_file_sha256,slug") throw new Error(`each item has exactly slug, html_file_sha256 and markdown_file_sha256 (got ${keys || "nothing"})`);
    if (!slugs.has(item.slug)) throw new Error(`${JSON.stringify(item.slug)} is not one of the 209 restored articles`);
    if (items.has(item.slug)) throw new Error(`${item.slug} is listed twice`);
    if (!sha256.test(item.html_file_sha256) || !sha256.test(item.markdown_file_sha256)) throw new Error(`${item.slug}: hashes must be SHA-256 hex digests`);
    if (item.html_file_sha256 === item.markdown_file_sha256) throw new Error(`${item.slug}: the HTML and Markdown hashes are equal; nothing was converted`);
    items.set(item.slug, item);
  }
  const order = record.items.map((item) => item.slug);
  if (order.join("\n") !== [...order].sort().join("\n")) throw new Error("items must be sorted by slug");
  return items;
}

/** The record's text for items (sorted by slug). */
export const markdownFormatText = (items) => `${JSON.stringify({ schema_version: 1, items: [...items].sort((a, b) => (a.slug < b.slug ? -1 : 1)) }, null, 2)}\n`;

const frontMatter = (text) => /^---\n[\s\S]*?\n---\n/.exec(text)?.[0];
const checked = new Map();

/**
 * Why the Markdown file does not render to the same page as the HTML file it
 * replaced, or undefined when it does. Both are rendered as the article at
 * articlePath(slug), and compared after normalizeFormat (scripts/lib/rendered-html.mjs).
 * The front matter must be identical. The HTML file must render as itself: its
 * article container exactly as in its source, everything else up to normalizeFormat,
 * apart from the link the site adds to each heading (headingLinkOf), which is site
 * navigation derived from the heading and is accepted only in its exact form. So a
 * renderer that dropped or changed content cannot make the two match. The two
 * rendered pages, heading links included, may then differ only by normalizeFormat.
 */
export async function formatDifference({ slug, html, markdown, root = process.cwd() }) {
  const key = [root, slug, hash(html), hash(markdown)].join("\0");
  if (!checked.has(key)) checked.set(key, compare(slug, html, markdown, root));
  return checked.get(key);
}

async function compare(slug, html, markdown, root) {
  const path = articlePath(slug);
  const htmlFront = frontMatter(html);
  if (!htmlFront) return "the HTML file has no front matter";
  if (frontMatter(markdown) !== htmlFront) return "its front matter (title, route and options) differs from the HTML file's";
  const parse = await htmlParser(root);
  const rendered = async (text, which) => {
    let output;
    try { output = await renderArticle(text, path, root); } catch (error) { throw new Error(`the ${which} file does not render: ${error.message}`); }
    const tree = parse(output);
    if (!tree.selfContained) throw new Error(`the rendered ${which} file leaves an element open, closes one it did not open, or carries formatting past its end`);
    return tree.nodes;
  };
  try {
    const headingLink = await headingLinkOf(path, root);
    const before = await rendered(html, "HTML");
    // The HTML renders as its source; the site only adds its link to each heading (exact form).
    const source = parse(html.slice(htmlFront.length));
    const linked = headingLink ? dropHeadingLinks(before, headingLink) : before;
    const container = (nodes) => serialize([splitRenderedArticle(nodes).container]);
    if (!source.selfContained || container(source.nodes) !== container(linked) || serialize(normalizeFormat(source.nodes)) !== serialize(normalizeFormat(linked))) {
      return "the HTML file does not render as itself, so it cannot anchor the comparison";
    }
    const after = await rendered(markdown, "Markdown");
    splitRenderedArticle(after);
    // Both pages carry the site's heading links; they are compared as rendered.
    const [x, y] = [normalizeFormat(before), normalizeFormat(after)];
    if (serialize(x) === serialize(y)) return undefined;
    return `the Markdown renders differently from the HTML it replaced, ${firstDifference(x, y)}`;
  } catch (error) {
    return error.message;
  }
}

const headingLinks = new Map();

/**
 * The site renders every article heading with a link to it: Starlight's heading
 * link on Markdown headings, and the same link added to headings that stay HTML
 * (src/markdown/wiki-markdown.mjs). The restored HTML had none. Learn the exact link
 * the site renders for an article heading, by rendering a sample heading at the
 * article's path, and return a function heading -> the canonical HTML of the link
 * the site adds to that heading (or undefined when it adds none). A wrapper is
 * dropped only when it holds the heading and exactly this link, so nothing else can
 * hide in it.
 */
function headingLinkOf(path, root) {
  const key = `${root}\0${path}`;
  if (!headingLinks.has(key)) headingLinks.set(key, learnHeadingLink(path, root));
  return headingLinks.get(key);
}

// The link's label names the heading with its whitespace collapsed and trimmed
// (headingLinkLabels in src/markdown/wiki-markdown.mjs); the sample checks this.
const headingTitle = (text) => text.replace(/\s+/g, " ").trim();

async function learnHeadingLink(path, root) {
  const [title, id] = ["Sample  heading title ", "sample-heading-id"];
  const html = await renderArticle(`---\ntitle: "Sample"\n---\n\n## ${title}{#${id}}\n`, path, root);
  const { nodes } = (await htmlParser(root))(html);
  const wrapper = elementsOf(nodes).find((element) => element.tag === "div" && startTag(element) === '<div class="sl-heading-wrapper level-h2">');
  if (!wrapper) return undefined;
  const [heading, link, ...rest] = wrapper.children;
  if (rest.length || heading?.type !== "element" || heading.tag !== "h2" || attribute(heading, "id") !== id || textContent(heading) !== title || link?.type !== "element" || link.tag !== "a") {
    throw new Error("the site's heading link has an unexpected form; scripts/lib/markdown-format.mjs needs updating");
  }
  const template = serialize([link]);
  const [linkTarget, label] = [`href="#${id}"`, escapeText(headingTitle(title))];
  if (template.split(linkTarget).length !== 2 || template.split(label).length !== 2) {
    throw new Error("the site's heading link does not name its heading exactly once; scripts/lib/markdown-format.mjs needs updating");
  }
  return (element) => template.replace(linkTarget, `href="#${attribute(element, "id")}"`).replace(label, escapeText(headingTitle(textContent(element))));
}
