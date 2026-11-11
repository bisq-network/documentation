// The rendered HTML of an article as a tree, for the fidelity gate.
//
// Rendered output (scripts/lib/render-markdown.mjs) is parsed with the HTML5 parser
// of the Markdown processor the site uses (Sätteri's htmlToHast), so elements,
// attributes and text are what a browser builds from the page. Attributes are taken
// from the same library's serializer, so every element has one canonical start tag:
// lowercase names, double-quoted values, attributes in a fixed (sorted) order.
//
// Two comparisons use these trees:
// - formatDifference (scripts/lib/markdown-format.mjs): a converted Markdown article
//   against the HTML it was converted from, after the narrow normalization in
//   normalizeFormat (attribute order, whitespace a browser does not display, and
//   Starlight's dir="auto" on inline code). Nothing else is normalized; the site's
//   heading links are on both pages and must match.
// - the accepted-edit structure checks in scripts/check-source-fidelity.mjs, on the
//   exact trees (attribute order aside).
import { createHash } from "node:crypto";
import { loadSatteri } from "./render-markdown.mjs";

const parsers = new Map();
const parsed = new Map();

/**
 * A parser for rendered article HTML: html -> { nodes, selfContained, problem }.
 * Cached by content. problem says why the HTML is not self-contained.
 */
export async function htmlParser(root = process.cwd()) {
  if (!parsers.has(root)) parsers.set(root, loadSatteri(root).then((satteri) => (html) => parseWith(satteri, html)));
  const parse = await parsers.get(root);
  return (html) => {
    const key = createHash("sha256").update(html).digest("hex");
    if (!parsed.has(key)) parsed.set(key, parse(html));
    return parsed.get(key);
  };
}

// The rendered article is inserted into a page, inside <main> and Starlight's content
// element. It is parsed as a whole document with those ancestors: <html>, <head> and
// <body> without attributes, <main>, a wrapper, an end marker holding text, and a
// paragraph after <main>. A fragment parse would drop what the page applies: a
// <body> or <html> start tag inside the article adds its attributes (onload, hidden,
// style, dir…) to the page's own element, and </main> moves what follows out of
// <main>. Unless everything comes out exactly as built here, with the end marker as the
// wrapper's last child holding only its text, the HTML changes the page around the
// article: it adds attributes to the page, leaves an element open, closes one it did not
// open, or leaves formatting (such as a link) that the parser would carry into the text
// after it.
const wrapperId = "rendered-article-fragment";
const endId = "rendered-article-fragment-end";
const endText = "end of rendered article";
const afterId = "rendered-article-after";
const afterText = "after the article";
// Tags that act on the page's own elements, refused in rendered output even where a
// browser would ignore them.
const pageTag = /<(?:html|head|body|frameset)(?=[\s/>])|<\/(?:html|head|body|main|frameset)(?=[\s/>])/i;

/** A whole HTML document (such as a built page) as nodes, parsed as a browser does. */
export async function documentParser(root = process.cwd()) {
  const satteri = await loadSatteri(root);
  return (html) => convertTree(satteri, satteri.htmlToHast(html, { fragment: false }));
}

function convertTree(satteri, tree) {
  const convert = (node) => {
    if (node.type === "text") return { type: "text", value: node.value };
    if (node.type === "comment") return { type: "comment", value: node.value };
    if (node.type !== "element") return { type: node.type, value: String(node.value ?? "") };
    const html = satteri.hastToHtml({ type: "element", tagName: node.tagName, properties: node.properties ?? {}, children: [] });
    const end = `</${node.tagName}>`;
    const start = html.endsWith(end) ? html.slice(0, -end.length) : html;
    return { type: "element", tag: node.tagName, attrs: attributesOf(start), children: (node.children ?? []).map(convert) };
  };
  return tree.children.map(convert);
}

function parseWith(satteri, html) {
  const page = `<!doctype html><html><head></head><body><main><div id="${wrapperId}">${html}<p id="${endId}">${endText}</p></div></main><p id="${afterId}">${afterText}</p></body></html>`;
  const nodes = convertTree(satteri, satteri.htmlToHast(page, { fragment: false }));
  const element = (node, tag, attrs = []) => node?.type === "element" && node.tag === tag && sameAttributes(node, attrs);
  const textOnly = (node, text) => node.children.length === 1 && node.children[0].type === "text" && node.children[0].value === text;
  const [doctype, htmlElement, ...extra] = nodes;
  const [head, body, ...afterBody] = htmlElement?.children ?? [];
  const [main, after, ...afterMain] = body?.children ?? [];
  const wrapper = main?.children[0];
  const end = wrapper?.children.at(-1);
  const problem = pageTag.exec(html)?.[0].replace(/^(<\/?[a-z]+).*$/i, (_, tag) => `it has a ${tag.toLowerCase()}> tag`)
    ?? (!(doctype?.type === "doctype" && !extra.length && element(htmlElement, "html") && !afterBody.length && element(head, "head") && !head.children.length && element(body, "body"))
      ? "it adds attributes or content to the page's html, head or body element" : undefined)
    ?? (!(element(main, "main") && main.children.length === 1 && element(wrapper, "div", [["id", wrapperId]]) && element(after, "p", [["id", afterId]]) && textOnly(after, afterText) && !afterMain.length
      && element(end, "p", [["id", endId]]) && textOnly(end, endText))
      ? "it leaves an element open, closes one it did not open, or carries formatting past its end" : undefined);
  // Browsers run scripts, so they show <noscript> as text and attach <template
  // shadowrootmode> content in place of the element's own; this parse (scripting off)
  // would see something else. Article content uses neither.
  const unlike = problem ? undefined : elementsOf(wrapper.children).find((element) => element.tag === "noscript" || element.tag === "template");
  const found = problem ?? (unlike && `it has a <${unlike.tag}> element, which a browser shows differently than this check sees it`);
  return { nodes: found ? nodes : wrapper.children.slice(0, -1), selfContained: !found, problem: found };
}

const sameAttributes = (element, attrs) => JSON.stringify(element.attrs) === JSON.stringify(attrs);

/** [name, value] pairs, sorted by name, from a canonical start tag. Values stay HTML-escaped. */
function attributesOf(startTag) {
  const match = /^<([^\s<>/]+)((?:\s+[^\s"'<>/=]+(?:="[^"]*")?)*)\s*\/?>$/.exec(startTag);
  if (!match) throw new Error(`cannot read the rendered start tag ${JSON.stringify(startTag.slice(0, 120))}`);
  return [...match[2].matchAll(/\s+([^\s"'<>/=]+)(?:="([^"]*)")?/g)].map(([, name, value]) => [name, value ?? null])
    .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));
}

/** An element's start tag with its attributes in canonical order. */
export const startTag = (element) => `<${element.tag}${element.attrs.map(([name, value]) => (value === null ? ` ${name}` : ` ${name}="${value}"`)).join("")}>`;
export const attribute = (element, name) => element.attrs.find(([key]) => key === name)?.[1];
// The serializer escapes attribute values with these references only.
const decode = (value) => value.replace(/&(?:#x([\da-f]+)|#(\d+)|(amp|quot|lt|gt|apos));/gi, (whole, hex, decimal, name) => {
  if (hex || decimal) return String.fromCodePoint(parseInt(hex ?? decimal, hex ? 16 : 10));
  return { amp: "&", quot: '"', lt: "<", gt: ">", apos: "'" }[name.toLowerCase()];
});
/** An attribute's value, unescaped (undefined when absent, "" for a bare attribute). */
export const attributeValue = (element, name) => {
  const pair = element.attrs.find(([key]) => key === name);
  return pair ? decode(pair[1] ?? "") : undefined;
};
export const classes = (element) => (attributeValue(element, "class") ?? "").split(/[\t\n\f\r ]+/).filter(Boolean);
export const textContent = (node) => (node.type === "text" ? node.value : node.type === "element" ? node.children.map(textContent).join("") : "");
export const escapeText = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

/** Canonical HTML of nodes: canonical start tags, escaped text, comments. Equal output means equal trees. */
export function serialize(nodes) {
  return nodes.map((node) => {
    if (node.type === "text") return escapeText(node.value);
    if (node.type === "comment") return `<!--${node.value.replaceAll("-->", "--&gt;")}-->`;
    if (node.type !== "element") return `<!${node.type} ${escapeText(node.value)}>`;
    return `${startTag(node)}${serialize(node.children)}</${node.tag}>`;
  }).join("");
}

/** Every element below nodes, in document order. */
export function elementsOf(nodes, found = []) {
  for (const node of nodes) {
    if (node.type !== "element") continue;
    found.push(node);
    elementsOf(node.children, found);
  }
  return found;
}

/** Every comment (or other non-element, non-text node) below nodes. */
export function commentsOf(nodes, found = []) {
  for (const node of nodes) {
    if (node.type === "element") commentsOf(node.children, found);
    else if (node.type !== "text") found.push(node);
  }
  return found;
}

const articleClass = "wiki-recovered-article";

/**
 * Split rendered nodes into the article container and everything around it.
 * outside is the canonical HTML with the container's content left out.
 */
export function splitRenderedArticle(nodes) {
  const containers = elementsOf(nodes).filter((element) => element.tag === "div" && classes(element).includes(articleClass));
  if (!containers.length) throw new Error("the rendered page has no article container");
  if (containers.length > 1) throw new Error("the rendered page has more than one article container");
  const [container] = containers;
  const outside = serialize(replaceNode(nodes, container, { ...container, children: [{ type: "text", value: "\0" }] }));
  return { container, body: container.children, outside };
}

function replaceNode(nodes, target, replacement) {
  return nodes.map((node) => {
    if (node === target) return replacement;
    return node.type === "element" ? { ...node, children: replaceNode(node.children, target, replacement) } : node;
  });
}

// CSS (white-space: normal) collapses each run of these characters to one space and
// removes it at the start and end of a line. Other characters, such as U+00A0, stay.
const collapsible = /[\t\n\f\r ]+/g;
// Elements whose text keeps its whitespace (or may, depending on styles): never normalized.
const preserving = new Set(["pre", "textarea", "code", "kbd", "samp", "listing", "plaintext", "xmp", "script", "style"]);
// Elements that start and end a line by default.
const blocks = new Set(["address", "article", "aside", "blockquote", "caption", "col", "colgroup", "dd", "details", "dialog", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "hr", "li", "main", "nav", "ol", "p", "pre", "section", "summary", "table", "tbody", "td", "tfoot", "th", "thead", "tr", "ul"]);
// Elements shown as a box of their own: content on the line, never looked into.
const atomic = new Set(["audio", "button", "canvas", "embed", "iframe", "img", "input", "math", "meter", "object", "picture", "progress", "select", "svg", "textarea", "video"]);
// Characters with a right-to-left direction; dir="auto" on code holding one could change how it is shown.
// Bidirectional control characters that set right-to-left (RLM, ALM, RLE, RLO, RLI) count as well.
const rightToLeft = /[\u0590-\u08ff\ufb1d-\ufdff\ufe70-\ufefc\u{10800}-\u{10fff}\u{1e800}-\u{1efff}\u061c\u200f\u202b\u202e\u2067]/u;

/**
 * Normalize rendered nodes for comparing a converted article with the HTML it
 * replaced. Only what a browser does not show is normalized, and only as far as the
 * conversion needs it:
 * 1. Attribute order (attributes are always sorted).
 * 2. Whitespace in text outside pre, code, kbd, samp and textarea, as CSS
 *    (white-space: normal) displays it: each run of space, tab, line feed, form feed
 *    or carriage return is one space; the space is dropped where a line starts (at the
 *    start of a block element, after a block element, after <br>) and where it ends (at
 *    the end of a block element, before a block element). The first and last text of a
 *    line count also inside an inline element that starts or ends the line, such as a
 *    link or an empty anchor span holding a line break; anything else on the line (an
 *    inline element, an image, a comment) ends the line's edge. The page itself is
 *    inside a block element. Text left empty disappears; text next to text is joined.
 * 3. dir="auto" on a code element outside pre (Starlight adds it to Markdown inline
 *    code), unless the code holds a right-to-left character.
 * Text, elements, comments and every other attribute and value stay exactly as
 * rendered. These are within the differences the converter tolerates
 * (TOLERATED in scripts/lib/markdown-conversion.mjs) and narrower: whitespace inside
 * inline code, whitespace inside an ID span in the middle of a line, and dir="ltr" on
 * pre are not normalized.
 */
export function normalizeFormat(nodes) {
  const copy = (children, preserve, insidePre) => children.map((node) => {
    if (node.type === "text") return { type: "text", value: preserve ? node.value : node.value.replace(collapsible, " "), preserve };
    if (node.type !== "element") return node;
    let { attrs } = node;
    if (node.tag === "code" && !insidePre && attribute(node, "dir") === "auto" && !rightToLeft.test(textContent(node))) {
      attrs = attrs.filter(([name]) => name !== "dir");
    }
    return { ...node, attrs, children: copy(node.children, preserve || preserving.has(node.tag), insidePre || node.tag === "pre") };
  });
  const tree = copy(nodes, false, false);
  trimLineEdges(tree, true);
  trimLineEdges(tree, false);
  return clean(tree);
}

/**
 * nodes with each exact heading-link wrapper (wrappedHeading) replaced by its
 * heading; nothing else changes. Used only to see that an HTML article renders as
 * its source, apart from the link the site adds to each heading.
 */
export function dropHeadingLinks(nodes, headingLink) {
  return nodes.map((node) => {
    if (node.type !== "element") return node;
    const heading = wrappedHeading(node, headingLink);
    return heading ?? { ...node, children: dropHeadingLinks(node.children, headingLink) };
  });
}

/**
 * The heading inside Starlight's heading-link wrapper, when element is exactly that:
 * <div class="sl-heading-wrapper level-hN"> holding the hN heading and then exactly
 * the link headingLink(heading) describes, and nothing else.
 */
export function wrappedHeading(element, headingLink) {
  if (element.tag !== "div" || element.attrs.length !== 1 || element.children.length !== 2) return undefined;
  const [heading, link] = element.children;
  if (heading.type !== "element" || !/^h[1-6]$/.test(heading.tag) || attribute(heading, "id") === undefined) return undefined;
  if (startTag(element) !== `<div class="sl-heading-wrapper level-${heading.tag}">`) return undefined;
  return link.type === "element" && serialize([link]) === headingLink(heading) ? heading : undefined;
}

/** Drop the space at each line start (forward) or line end (backward), in place. */
function trimLineEdges(nodes, forward) {
  let atEdge = true;
  const walk = (children) => {
    for (const node of forward ? children : [...children].reverse()) {
      if (node.type === "text") {
        if (!node.preserve && atEdge) node.value = forward ? node.value.replace(/^ /, "") : node.value.replace(/ $/, "");
        if (node.value) atEdge = false;
      } else if (node.type === "element" && blocks.has(node.tag)) {
        atEdge = true;
        walk(node.children);
        atEdge = true;
      } else if (node.type === "element" && node.tag === "br") {
        // A line starts after <br>; the space before it is kept.
        atEdge = forward;
      } else {
        // An inline element at the edge of a line: its first (or last) text is at the edge too.
        if (node.type === "element" && !atomic.has(node.tag)) walk(node.children);
        atEdge = false;
      }
    }
  };
  walk(nodes);
}

function clean(nodes) {
  const out = [];
  for (const node of nodes) {
    if (node.type === "text") {
      if (!node.value) continue;
      if (out.at(-1)?.type === "text") out[out.length - 1] = { type: "text", value: out.at(-1).value + node.value };
      else out.push({ type: "text", value: node.value });
    } else out.push(node.type === "element" ? { ...node, children: clean(node.children) } : node);
  }
  return out;
}

/**
 * The first difference between two node lists, as a short description, or
 * undefined when they are equal (by canonical serialization).
 */
export function firstDifference(a, b, path = "") {
  const clipped = (value) => (value.length > 100 ? `${value.slice(0, 100)}…` : value);
  const label = (node) => (node === undefined ? "nothing" : clipped(node.type === "element" ? startTag(node) : node.type === "text" ? JSON.stringify(node.value) : serialize([node])));
  for (let index = 0; index < Math.max(a.length, b.length); index += 1) {
    const [x, y] = [a[index], b[index]];
    if (x && y && serialize([x]) === serialize([y])) continue;
    const here = `${path}${path ? " > " : ""}${x?.type === "element" ? startTag(x) : `#${index + 1}`}`;
    if (x?.type === "element" && y?.type === "element" && startTag(x) === startTag(y)) return firstDifference(x.children, y.children, here);
    return `at ${path || "the top level"}: ${label(x)} became ${label(y)}`;
  }
  return undefined;
}
