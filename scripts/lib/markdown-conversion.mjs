// Convert a restored wiki article (HTML body inside <div class="wiki-recovered-article">)
// to Markdown, keeping raw HTML only where Markdown cannot reproduce the rendered page.
//
// Deterministic: the same input always gives the same output. Every Markdown block is
// rendered with the site's own pipeline (scripts/lib/render-markdown.mjs, including
// src/markdown/wiki-markdown.mjs) and compared with the original HTML; a block that does
// not render the same falls back to its original HTML, copied byte for byte. The whole
// article is compared again at the end, heading IDs included.
//
// Output format (see scripts/convert-articles-to-markdown.mjs for the command):
// - frontmatter and the generated "On this page" <nav> are unchanged;
// - the body stays inside <div class="wiki-recovered-article" lang="..">, with blank lines
//   around the Markdown blocks;
// - headings: `## Text {#id}` with the existing ID. `## Text{#id}` (no space) where the
//   original heading text had no trailing space, which changes how it wraps and how search
//   excerpts read;
// - legacy anchor spans before a heading: the first span's opening tag alone on a line,
//   then `</span>` (and any further spans), then a blank line and the heading. A span alone
//   on one line would be wrapped in a <p> and move saved-link targets;
// - quotes, double hyphens and ellipses are backslash-escaped, because the site renders
//   Markdown with smart punctuation;
// - HTML kept as is: figures, code with source-code IDs, gap markers (matched as exact
//   strings by src/components/SourceHistory.astro) and the link before a "section not recovered"
//   marker, tables Markdown cannot express,
//   definition lists, <details> sources, admonition and <div> tags around Markdown content,
//   and inline content placed directly in the article container.

import { attr, parseHtml, textContent } from "./html-tree.mjs";
import { EXTERNAL_URL, HEADING_ID } from "../../src/markdown/wiki-markdown.mjs";

const SMART_PUNCTUATION = true; // astro.config.mjs keeps Astro's default smart punctuation

// CommonMark HTML block start tags: type 6, plus pre (type 1).
const BLOCK_START = new Set(["address", "article", "aside", "base", "basefont", "blockquote", "body", "caption", "center", "col", "colgroup", "dd", "details", "dialog", "dir", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hr", "html", "iframe", "legend", "li", "link", "main", "menu", "menuitem", "nav", "noframes", "ol", "optgroup", "option", "p", "param", "search", "section", "summary", "table", "tbody", "td", "tfoot", "th", "thead", "title", "tr", "track", "ul", "pre"]);
// Elements laid out as blocks (whitespace next to them is not rendered).
const BLOCK_LEVEL = new Set(["address", "article", "aside", "blockquote", "body", "caption", "center", "dd", "details", "dialog", "dir", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hr", "html", "iframe", "legend", "li", "main", "menu", "nav", "noframes", "ol", "p", "pre", "search", "section", "summary", "table", "tbody", "td", "tfoot", "th", "thead", "tr", "ul"]);
const HEADINGS = new Set(["h1", "h2", "h3", "h4", "h5", "h6"]);
const CONTAINERS = new Set(["aside", "div"]);
// src/components/SourceHistory.astro matches these as exact HTML strings in the rendered page.
const CRITICAL_CLASSES = ["wiki-link-gap", "wiki-template-gap", "wiki-markup-gap", "wiki-image-gap", "wiki-source-image"];
const isCritical = (node) => node.type === "element" && CRITICAL_CLASSES.some((name) => (attr(node, "class") ?? "").split(/\s+/).includes(name));
const isWhitespace = (node) => node.type === "text" && !node.value.trim();
const isAnchorSpan = (node) => node.type === "element" && node.tag === "span" && !node.children.length && attr(node, "id") !== undefined
  && node.attrs.every(([name]) => ["id", "class", "aria-hidden"].includes(name));
const CONTAINER_MARKER = /<div class="wiki-recovered-article" lang="[a-z-]+">/g;

class Unsupported extends Error {}
const unsupported = (why) => { throw new Unsupported(why); };
const openTag = (source, node) => source.slice(node.start, node.openEnd);

// ---------------------------------------------------------------- escaping
function escapeText(text, { table = false } = {}) {
  let out = "";
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    const prev = text[i - 1] ?? "";
    const next = text[i + 1] ?? "";
    if ("\\`*[]~".includes(c)) out += `\\${c}`;
    else if (c === "_") out += /[\p{L}\p{N}]/u.test(prev) && /[\p{L}\p{N}]/u.test(next) ? c : "\\_";
    else if (c === "<" && /[A-Za-z/!?]/.test(next)) out += "\\<";
    else if (c === "&" && /^&(#x?[\da-f]+|[a-z][a-z\d]*);/i.test(text.slice(i))) out += "\\&";
    else if (c === "|" && table) out += "\\|";
    else if (SMART_PUNCTUATION && (c === "'" || c === '"')) out += `\\${c}`;
    else if (SMART_PUNCTUATION && c === "-" && next === "-") out += "-\\";
    else if (SMART_PUNCTUATION && c === "." && next === "." && text[i + 2] === ".") { out += ".\\."; i += 1; }
    else out += c;
  }
  return out;
}

/** Escape what would start a block construct at the beginning of a line. */
function escapeLineStarts(markdown) {
  return markdown.split("\n").map((line) => {
    const [, indent, rest] = /^(\s*)(.*)$/.exec(line);
    if (!/^([-+>#=]|\d+[.)])/.test(rest)) return line;
    const number = /^(\d+)([.)])/.exec(rest);
    return indent + (number ? `${number[1]}\\${number[2]}${rest.slice(number[0].length)}` : `\\${rest}`);
  }).join("\n");
}

function codeSpan(text) {
  if (!text || /^ +$/.test(text)) unsupported("empty inline code");
  if (text.includes("\n")) unsupported("multi-line inline code");
  let fence = "`";
  while (text.includes(fence)) fence += "`";
  const pad = text.startsWith("`") || text.endsWith("`") || (text.startsWith(" ") && text.endsWith(" ")) ? " " : "";
  return `${fence}${pad}${text}${pad}${fence}`;
}

function linkDestination(href) {
  if (/[\s<>\u0000-\u001f]/.test(href)) unsupported("link destination needs encoding");
  let depth = 0;
  for (const c of href) { if (c === "(") depth++; if (c === ")" && --depth < 0) break; }
  return depth === 0 ? href.replace(/\\/g, "\\\\") : `<${href}>`;
}

// ---------------------------------------------------------------- inline content
// A link followed by a "section not recovered" marker stays HTML: src/components/SourceHistory.astro
// repairs the pair, and scripts that read the article sources look for it as written.
function precedesSectionGap(nodes, index) {
  if (nodes[index].tag !== "a") return false;
  let next = index + 1;
  while (nodes[next] && isWhitespace(nodes[next])) next++;
  return nodes[next]?.type === "element" && nodes[next].tag === "small" && (attr(nodes[next], "class") ?? "") === "wiki-link-gap";
}

function inline(nodes, source, ctx) {
  let out = "";
  let afterBreak = false;
  for (const [index, node] of nodes.entries()) {
    if (node.type === "text") {
      // Whitespace after a line break is not rendered; a Markdown hard break already ends the line.
      out += escapeText(afterBreak ? node.value.replace(/^[ \t\n]+/, "") : node.value, ctx);
      afterBreak = false;
      continue;
    }
    afterBreak = false;
    if (isCritical(node) || precedesSectionGap(nodes, index)) { out += source.slice(node.start, node.end); continue; }
    const inner = () => inline(node.children, source, ctx);
    const plain = !node.attrs.length;
    switch (node.tag) {
      case "br":
        if (ctx.table || ctx.heading || nodes.slice(index + 1).every(isWhitespace)) out += source.slice(node.start, node.end);
        else { out = `${out.replace(/[ \t]+$/, "")}\\\n`; afterBreak = true; }
        break;
      case "strong":
      case "b":
        out += plain && !ctx.htmlEmphasis ? `**${inner()}**` : `${openTag(source, node)}${inner()}</${node.tag}>`;
        break;
      case "em":
      case "i":
        out += plain && !ctx.htmlEmphasis ? `*${inner()}*` : `${openTag(source, node)}${inner()}</${node.tag}>`;
        break;
      case "code":
        out += plain && node.children.every((child) => child.type === "text") ? codeSpan(textContent(node)) : `${openTag(source, node)}${inner()}</code>`;
        break;
      case "a": {
        // A Markdown link renders exactly when its rel is what src/markdown/wiki-markdown.mjs adds.
        const href = attr(node, "href");
        const rel = attr(node, "rel");
        const expectedRel = href !== undefined && EXTERNAL_URL.test(href) ? "noopener noreferrer" : undefined;
        const markdown = href !== undefined && node.children.length && rel === expectedRel && node.attrs.every(([name]) => name === "href" || name === "rel");
        out += markdown ? `[${inner()}](${linkDestination(href)})` : `${openTag(source, node)}${inner()}</a>`;
        break;
      }
      case "img":
        unsupported("inline image");
        break;
      default:
        if (BLOCK_LEVEL.has(node.tag)) unsupported(`block <${node.tag}> in inline content`);
        out += `${openTag(source, node)}${inner()}</${node.tag}>`;
    }
  }
  return out;
}

function inlineBlock(nodes, source, ctx) {
  const text = inline(nodes, source, ctx).replace(/^[ \t\n]+|[ \t\n]+$/g, "");
  if (!text) unsupported("empty block");
  if (/\n[ \t]*\n/.test(text)) unsupported("blank line in block");
  return escapeLineStarts(text);
}

// ---------------------------------------------------------------- blocks
function list(node, source, ctx, marker) {
  if (node.attrs.length) unsupported("list attributes");
  const items = node.children.filter((child) => !isWhitespace(child));
  if (!items.length || items.some((item) => item.type !== "element" || item.tag !== "li" || item.attrs.length)) unsupported("list structure");
  return items.map((item, index) => {
    const bullet = node.tag === "ol" ? `${index + 1}${marker}` : marker;
    const pad = " ".repeat(bullet.length + 1);
    const kids = item.children;
    let split = kids.length;
    while (split > 0 && (isWhitespace(kids[split - 1]) || (kids[split - 1].type === "element" && ["ul", "ol"].includes(kids[split - 1].tag)))) split--;
    const head = kids.slice(0, split);
    if (head.some((child) => child.type === "element" && BLOCK_LEVEL.has(child.tag))) unsupported("block content in list item");
    const text = head.length ? inline(head, source, ctx).replace(/^[ \t\n]+|[ \t\n]+$/g, "") : "";
    if (/\n[ \t]*\n/.test(text)) unsupported("blank line in list item");
    const lines = (text ? escapeLineStarts(text) : "").split("\n");
    let out = `${bullet} ${lines[0]}`.trimEnd() + lines.slice(1).map((line) => `\n${pad}${line}`).join("");
    kids.slice(split).filter((child) => !isWhitespace(child)).forEach((sub, subIndex) => {
      const subMarker = sub.tag === "ol" ? (subIndex % 2 ? ")" : ".") : (subIndex % 2 ? "*" : "-");
      out += `\n${list(sub, source, ctx, subMarker).split("\n").map((line) => (line ? pad + line : line)).join("\n")}`;
    });
    return out;
  }).join("\n");
}

function table(node, source, ctx) {
  if (node.attrs.length) unsupported("table attributes");
  const sections = node.children.filter((child) => !isWhitespace(child));
  if (sections.map((section) => section.tag).join() !== "thead,tbody" || sections.some((section) => section.attrs.length)) unsupported("table sections");
  const rows = sections.map((section) => section.children.filter((child) => !isWhitespace(child)));
  if (rows[0].length !== 1 || !rows[1].length) unsupported("table rows");
  const cells = (row, tag) => {
    if (row.tag !== "tr" || row.attrs.length) unsupported("table row");
    const cellNodes = row.children.filter((child) => !isWhitespace(child));
    if (cellNodes.some((cell) => cell.tag !== tag || cell.attrs.length)) unsupported("table cell");
    return cellNodes.map((cell) => {
      if (cell.children.some((child) => child.type === "element" && BLOCK_LEVEL.has(child.tag))) unsupported("block in cell");
      const text = inline(cell.children, source, { ...ctx, table: true }).trim();
      if (text.includes("\n")) unsupported("newline in cell");
      return text;
    });
  };
  const header = cells(rows[0][0], "th");
  const body = rows[1].map((row) => cells(row, "td"));
  if (body.some((row) => row.length !== header.length)) unsupported("ragged table");
  const line = (row) => `| ${row.join(" | ")} |`.replace(/ {2}\|/g, " |");
  return [line(header), `|${header.map(() => " --- ").join("|")}|`, ...body.map(line)].join("\n");
}

function heading(node, source, ctx) {
  const id = attr(node, "id");
  if (id === undefined || node.attrs.length !== 1 || !/^[^\s{}]+$/.test(id)) unsupported("heading attributes");
  const text = inline(node.children, source, { ...ctx, heading: true });
  const content = text.replace(/^[ \t\n]+|[ \t\n]+$/g, "");
  if (!content || content.includes("\n")) unsupported("heading text");
  // A trailing space stays text (wrapping, search excerpts); a {#…} at the end would be read as the ID.
  const safe = HEADING_ID.test(content) ? content.replace(/\{(?=#[^{}]*\}[ \t]*$)/, "\\{") : content;
  return `${"#".repeat(Number(node.tag[1]))} ${safe}${/[ \t\n]$/.test(text) ? " " : ""}{#${id}}`;
}

// ---------------------------------------------------------------- rendering comparison
/** Differences the Markdown pipeline adds by design. None of them is rendered. */
export const TOLERATED = [
  "whitespace that is not rendered: collapsed runs, and whitespace at block edges, at the start of a line, next to blocks and after <br> (not inside <pre>)",
  "dir=\"auto\" on Markdown inline code and dir=\"ltr\" on <pre> (Starlight's right-to-left support)",
  "a line break inside an empty anchor span (the two-line anchor form described above)",
];

/** Normalise a parsed fragment for comparison (TOLERATED). */
export function normalize(nodes) {
  return trimBlocks(normalizeInner(nodes, false), true);
}
function normalizeInner(nodes, inPre) {
  return nodes.map((node) => {
    if (node.type === "text") return inPre ? { type: "text", value: node.value, pre: true } : { type: "text", value: node.value.replace(/[ \t\n\r\f]+/g, " ") };
    let children = node.children;
    if (node.tag === "span" && attr(node, "id") !== undefined && children.length && children.every(isWhitespace)) children = [];
    const attrs = node.attrs
      .filter(([name, value]) => !(name === "dir" && ((node.tag === "code" && value === "auto") || (node.tag === "pre" && value === "ltr"))))
      .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));
    return { type: "element", tag: node.tag, attrs, children: normalizeInner(children, inPre || node.tag === "pre") };
  });
}
// lineStart: an inline parent that begins a line, so its leading whitespace is not rendered either.
function trimBlocks(nodes, blockParent, lineStart = blockParent) {
  const isBlock = (node) => node?.type === "element" && BLOCK_LEVEL.has(node.tag);
  const isBreak = (node) => node?.type === "element" && node.tag === "br";
  // Whitespace-only text before a node does not keep it off the start of the line.
  const startsLine = (i) => {
    let j = i - 1;
    while (j >= 0 && nodes[j].type === "text" && !nodes[j].pre && !nodes[j].value.trim()) j--;
    return j < 0 ? lineStart : isBlock(nodes[j]) || isBreak(nodes[j]);
  };
  const result = nodes.map((node, i) => (node.type === "element"
    ? { ...node, children: BLOCK_LEVEL.has(node.tag) ? trimBlocks(node.children, true) : trimBlocks(node.children, false, startsLine(i)) }
    : { ...node }));
  result.forEach((node, i) => {
    if (node.type !== "text" || node.pre) return;
    const after = i === result.length - 1 ? (blockParent ? "edge" : null) : result[i + 1];
    if (startsLine(i)) node.value = node.value.replace(/^ +/, "");
    if (after === "edge" || isBlock(after)) node.value = node.value.replace(/ +$/, "");
  });
  const merged = [];
  for (const node of result) {
    if (node.type === "text" && !node.value) continue;
    if (node.type === "text" && merged.at(-1)?.type === "text" && !!merged.at(-1).pre === !!node.pre) merged.at(-1).value += node.value;
    else merged.push(node);
  }
  return merged;
}
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

// ---------------------------------------------------------------- article
/**
 * @param {{ render: (text: string, path: string) => Promise<{ html: string }> }} options
 *   render: scripts/lib/render-markdown.mjs createSiteMarkdownRenderer()
 * @returns convertArticle(text, slug) -> { text, ok, stats }; ok is false when the whole
 *   article would not render like the original (then do not use text).
 */
export function createArticleConverter({ render }) {
  async function renders(markdown, originalNodes, path) {
    const { html } = await render(`${markdown}\n`, path);
    let tree;
    try { tree = parseHtml(html); } catch { return { ok: false, hint: "rendered HTML not parseable" }; }
    if (same(normalize(tree.children), normalize(originalNodes))) return { ok: true, html };
    const links = (nodes) => nodes.reduce((count, node) => count + (node.type === "element" ? (node.tag === "a" ? 1 : 0) + links(node.children) : 0), 0);
    return { ok: false, hint: links(tree.children) > links(originalNodes) ? "GFM autolink literal (a bare URL or e-mail address in text)" : "structure or text differs" };
  }

  return async function convertArticle(text, slug) {
    const path = `src/content/docs/wiki/${slug}.md`;
    const markers = [...text.matchAll(CONTAINER_MARKER)];
    if (markers.length !== 1) throw new Error("article container not found exactly once");
    const start = markers[0].index;
    const source = text.slice(start);
    // The converter's HTML body never contains a blank line; a Markdown body always does.
    if (/\n[ \t]*\n/.test(source)) throw new Error("article body is not a single HTML block (already Markdown?)");
    const container = parseHtml(source).children[0];
    if (container?.type !== "element" || container.tag !== "div") throw new Error("unexpected article body");
    if (source.slice(container.end) !== "\n") throw new Error("unexpected text after the article body");
    const stats = { blocks: 0, markdown: 0, html: 0, headingsMarkdown: 0, headingsHtml: 0, reasons: {} };
    const note = (why) => { stats.reasons[why] = (stats.reasons[why] ?? 0) + 1; };

    // Markdown for one unit (an element, or anchor spans plus their heading), or null to keep its HTML.
    async function convertUnit(unit, ctx) {
      const { node } = unit;
      let reason = null;
      const attempt = async (make, compareNodes = [node]) => {
        let markdown;
        try { markdown = make(); } catch (error) {
          if (!(error instanceof Unsupported)) throw error;
          reason = `not expressible in Markdown: ${error.message}`;
          return null;
        }
        const result = await renders(markdown, compareNodes, path);
        if (!result.ok) { reason = `does not render the same: ${result.hint}`; return null; }
        const critical = [];
        const walk = (child) => { if (isCritical(child)) critical.push(source.slice(child.start, child.end)); else child.children?.forEach(walk); };
        compareNodes.forEach(walk);
        if (!critical.every((exact) => result.html.includes(exact))) { reason = "gap marker or figure HTML would change"; return null; }
        return markdown;
      };
      const tryAll = async (label, makers, compareNodes) => {
        for (const make of makers) {
          const markdown = await attempt(make, compareNodes);
          if (markdown) return markdown;
        }
        note(`${label} ${reason}`);
        return null;
      };
      if (unit.heading) {
        const anchors = unit.anchors.length ? `${anchorLines(unit.anchors)}\n\n` : "";
        return tryAll(`<${node.tag}>`, [() => anchors + heading(node, source, ctx), () => anchors + heading(node, source, { ...ctx, htmlEmphasis: true })], [...unit.anchors, node]);
      }
      if (node.type !== "element") { note("text directly in the container"); return null; }
      switch (node.tag) {
        case "p":
          if (node.attrs.length) { note("<p> with attributes"); return null; }
          return tryAll("<p>", [() => inlineBlock(node.children, source, ctx), () => inlineBlock(node.children, source, { ...ctx, htmlEmphasis: true })]);
        case "ul":
        case "ol": {
          const marker = node.tag === "ol" ? (unit.alternate ? ")" : ".") : (unit.alternate ? "*" : "-");
          return tryAll(`<${node.tag}>`, [() => list(node, source, ctx, marker), () => list(node, source, { ...ctx, htmlEmphasis: true }, marker)]);
        }
        case "table":
          return tryAll("<table>", [() => table(node, source, ctx)]);
        default:
          if (CONTAINERS.has(node.tag) && !isCritical(node) && node.attrs.every(([name]) => ["class", "role"].includes(name)) && (node.tag !== "div" || !node.attrs.length)) {
            const inner = await convertChildren(node.children, ctx);
            if (inner.every((block) => block.html)) return null;
            const markdown = await wrap(openTag(source, node), inner, `</${node.tag}>`);
            if ((await renders(markdown, [node], path)).ok) return markdown;
            note(`<${node.tag}> container does not render the same`);
            return null;
          }
          note(`<${node.tag}${attr(node, "class") ? `.${attr(node, "class").split(" ")[0]}` : ""}> kept as HTML`);
          return null;
      }
    }

    // Group a container's children into units and convert them.
    async function convertChildren(children, ctx) {
      const units = [];
      for (let i = 0; i < children.length; i++) {
        const node = children[i];
        if (isWhitespace(node)) continue;
        if (isAnchorSpan(node)) {
          let j = i;
          const anchors = [];
          while (j < children.length && isAnchorSpan(children[j])) anchors.push(children[j++]);
          if (children[j]?.type === "element" && HEADINGS.has(children[j].tag)) {
            units.push({ node: children[j], heading: true, anchors, first: anchors[0] });
            i = j;
            continue;
          }
        }
        units.push({ node, first: node, anchors: [], heading: node.type === "element" && HEADINGS.has(node.tag) });
      }
      const blocks = [];
      let previousList = null;
      for (const unit of units) {
        const isList = unit.node.type === "element" && ["ul", "ol"].includes(unit.node.tag);
        // Adjacent Markdown lists of the same type would merge: alternate the marker.
        if (isList) unit.alternate = previousList?.tag === unit.node.tag && previousList.markdown ? !previousList.alternate : false;
        const markdown = await convertUnit(unit, ctx);
        blocks.push({ unit, markdown, html: !markdown, start: unit.first.start, end: unit.node.end, siblings: children });
        previousList = isList ? { tag: unit.node.tag, alternate: unit.alternate, markdown: !!markdown } : null;
      }
      // Inline HTML cannot start an HTML block. A link's opening tag alone on its line starts a
      // CommonMark type 7 block (its text then begins with a line break, which is not rendered);
      // other inline content joins the HTML of the block before it.
      for (let i = blocks.length - 1; i >= 0; i--) {
        const block = blocks[i];
        const { unit } = block;
        if (!block.html || (unit.heading && unit.anchors.length) || (unit.first.type === "element" && BLOCK_START.has(unit.first.tag))) continue;
        if (unit.first.type === "element" && unit.first.tag === "a" && unit.first.children.length) block.lineAfterOpenTag = true;
        else if (i > 0) Object.assign(blocks[i - 1], { html: true, markdown: null, joinNext: true });
      }
      for (const block of blocks) {
        stats.blocks++;
        stats[block.html ? "html" : "markdown"]++;
        if (block.unit.heading) stats[block.html ? "headingsHtml" : "headingsMarkdown"]++;
      }
      return blocks;
    }

    // The first anchor span's opening tag alone on its line starts a CommonMark type 7 HTML
    // block, so the spans stay exactly where they are (only a line break inside the span).
    function anchorLines(anchors) {
      const [first] = anchors;
      return `${source.slice(first.start, first.openEnd)}\n${source.slice(first.openEnd, anchors.at(-1).end)}`;
    }
    const htmlSlice = (first, last) => {
      if (first.unit.heading && first.unit.anchors.length) return `${anchorLines([first.unit.anchors[0]])}${source.slice(first.unit.anchors[0].end, last.end)}`;
      if (first.lineAfterOpenTag) {
        const link = first.unit.first;
        // Already followed by a line break in the source: another one would end the HTML block.
        return source[link.openEnd] === "\n" ? source.slice(first.start, last.end) : `${openTag(source, link)}\n${source.slice(link.openEnd, last.end)}`;
      }
      return source.slice(first.start, last.end);
    };

    async function assemble(blocks) {
      const parts = [];
      for (let i = 0; i < blocks.length; i++) {
        if (!blocks[i].html) { parts.push(blocks[i].markdown); continue; }
        // Consecutive HTML blocks stay one verbatim slice with the original whitespace between
        // them, if that renders the same (a <pre> block ends on its closing line); otherwise only
        // the blocks that must stay together are joined.
        let j = i;
        while (blocks[j + 1]?.html) j++;
        if (j > i) {
          const nodes = blocks[i].siblings.filter((node) => node.start >= blocks[i].start && node.end <= blocks[j].end);
          if (!(await renders(htmlSlice(blocks[i], blocks[j]), nodes, path)).ok) {
            j = i;
            while (blocks[j].joinNext && blocks[j + 1]?.html) j++;
          }
        }
        parts.push(htmlSlice(blocks[i], blocks[j]));
        i = j;
      }
      return parts.join("\n\n");
    }

    // The opening tag line, the blocks, and the closing tag. HTML that cannot start an HTML block
    // stays on the opening tag's line.
    async function wrap(open, blocks, close) {
      if (!blocks.length) return `${open}${close}`;
      const [first] = blocks;
      const joinOpen = first.html && !first.lineAfterOpenTag && !(first.unit.first.type === "element" && BLOCK_START.has(first.unit.first.tag)) && !(first.unit.heading && first.unit.anchors.length);
      return `${open}${joinOpen ? "" : "\n\n"}${await assemble(blocks)}\n\n${close}`;
    }

    const blocks = await convertChildren(container.children, {});
    const converted = `${text.slice(0, start)}${await wrap(openTag(source, container), blocks, "</div>")}\n`;
    const whole = await renders(converted.slice(start), [container], path);
    return { text: converted, ok: whole.ok, stats };
  };
}
