// A strict parser for the well-formed HTML the wiki converter writes (and that
// the site's Markdown renderer emits). It keeps source offsets so unconverted
// elements can be copied verbatim. Anything outside the expected subset throws:
// the caller then keeps the whole article as HTML instead of guessing.

export const VOID = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"]);

const NAMED = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
export function decodeEntities(text) {
  return text.replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi, (whole, entity) => {
    if (entity[0] === "#") {
      const hex = entity[1].toLowerCase() === "x";
      return String.fromCodePoint(parseInt(entity.slice(hex ? 2 : 1), hex ? 16 : 10));
    }
    const value = NAMED[entity.toLowerCase()];
    if (value === undefined) throw new Error(`unknown entity ${whole}`);
    return value;
  });
}

/**
 * Parse an HTML fragment into { type: "root", children }.
 * Elements: { type: "element", tag, attrs: [[name, value]], children, start, end, openEnd, closeStart }
 * Text: { type: "text", value (decoded), raw, start, end }
 */
export function parseHtml(html) {
  const root = { type: "root", children: [], start: 0, end: html.length };
  const stack = [root];
  const tagPattern = /<(\/?)([a-zA-Z][a-zA-Z0-9-]*)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:="[^"<]*")?)*)\s*(\/?)>/y;
  let index = 0;
  let textStart = 0;
  const flushText = (end) => {
    if (end > textStart) {
      const raw = html.slice(textStart, end);
      if (/[<>]/.test(raw)) throw new Error(`unescaped angle bracket in text: ${JSON.stringify(raw.slice(0, 80))}`);
      stack.at(-1).children.push({ type: "text", value: decodeEntities(raw), raw, start: textStart, end });
    }
  };
  while (index < html.length) {
    const next = html.indexOf("<", index);
    if (next < 0) break;
    if (html.startsWith("<!--", next)) throw new Error("HTML comment");
    tagPattern.lastIndex = next;
    const match = tagPattern.exec(html);
    if (!match) throw new Error(`unparsed markup at ${next}: ${JSON.stringify(html.slice(next, next + 60))}`);
    flushText(next);
    const [whole, closing, rawName, rawAttrs, selfClosing] = match;
    const tag = rawName.toLowerCase();
    if (closing) {
      const open = stack.pop();
      if (!open || open.type !== "element" || open.tag !== tag) throw new Error(`mismatched </${tag}> at ${next}`);
      open.closeStart = next;
      open.end = next + whole.length;
    } else {
      const attrs = [...rawAttrs.matchAll(/\s+([^\s=]+)(?:="([^"]*)")?/g)].map(([, name, value]) => [name.toLowerCase(), value === undefined ? "" : decodeEntities(value)]);
      const element = { type: "element", tag, attrs, children: [], start: next, openEnd: next + whole.length, end: next + whole.length };
      stack.at(-1).children.push(element);
      if (!VOID.has(tag) && !selfClosing) stack.push(element);
      else element.closeStart = element.end;
    }
    index = textStart = next + whole.length;
  }
  flushText(html.length);
  if (stack.length !== 1) throw new Error(`unclosed <${stack.at(-1).tag}>`);
  return root;
}

export const attr = (node, name) => node.attrs?.find(([key]) => key === name)?.[1];
export const textContent = (node) => (node.type === "text" ? node.value : (node.children ?? []).map(textContent).join(""));
