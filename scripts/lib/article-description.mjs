// A page description for an article: its first sentence, as plain text, at most 155 characters.
// src/route-data.ts puts it into the page's description meta tags at build time; the article
// files stay as they are.
const blockStart = /^(?:<(?:figure|nav|table|details|div|span class="wiki-legacy-anchor"|\/div)|#|\||```|- |\* |\d+\. |>|---|\{)/;
const maxLength = 155;

/** Plain text of one Markdown paragraph from a restored article. */
export function plainText(markdown) {
  return markdown
    .replace(/(?:<|&lt;)!--[\s\S]*?--(?:>|&gt;)/g, "")
    // A Markdown hard break (backslash at the end of a line) is a space here.
    .replace(/\\\n/g, " ")
    // Recovery markers: keep a lost link's words, drop unsupported-markup and template notes.
    .replace(/<span class="wiki-(?:markup|template)-gap"[^>]*>[\s\S]*?<\/span>/g, "")
    .replace(/\[Unresolved template:[^\]]*\]/g, "")
    .replace(/<small>\[(?:unrecovered article|unresolved link|section not recovered)[^\]]*\]<\/small>/g, "")
    .replace(/<sup>[\s\S]*?<\/sup>/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\\(.)/g, "$1")
    .replace(/[*_`]+/g, "")
    .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, "\"").replace(/&#39;/g, "'")
    // Bare addresses read badly in a description: drop them, with their brackets.
    .replace(/\s*\(https?:\/\/[^)\s]*\)/g, "")
    .replace(/\s*https?:\/\/\S+/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** The first sentence of an article's Markdown file, trimmed to 155 characters, or undefined. */
export function articleDescription(file) {
  const body = file.replace(/^---\n[\s\S]*?\n---\n/, "");
  const start = body.indexOf('<div class="wiki-recovered-article"');
  const article = start >= 0 ? body.slice(body.indexOf("\n", start) + 1) : body;
  let text = "";
  for (const block of article.split(/\n\s*\n/)) {
    const trimmed = block.trim();
    if (!trimmed || blockStart.test(trimmed)) continue;
    const piece = plainText(trimmed);
    if (!/\p{L}{2}/u.test(piece)) continue;
    // A label on its own line ("Warning", "Note") is not the first sentence.
    if (!text && /^\*\*[^*]+\*\*$/.test(trimmed) && piece.split(" ").length <= 3 && !/[.!?]$/.test(piece)) continue;
    text = text ? `${text} ${piece}` : piece;
    // A paragraph that ends mid-sentence continues in the next one.
    if (/[.!?…:"”)]$/.test(text) || text.length > maxLength) break;
  }
  if (!text) return undefined;
  // The first full stop, question or exclamation mark before a capital letter or the end, unless
  // it ends an abbreviation such as "e.g.".
  let sentence = text;
  for (const match of text.matchAll(/[.!?](?=\s+["“(]?\p{Lu}|\s*$)/gu)) {
    const end = match.index + 1;
    if (/(?:^|[\s(])(?:e\.g|i\.e|etc|vs|approx|cf|ca|no)\.$/i.test(text.slice(0, end))) continue;
    sentence = text.slice(0, end);
    break;
  }
  if (sentence.length <= maxLength) return sentence;
  const cut = sentence.slice(0, maxLength - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ") > 80 ? cut.lastIndexOf(" ") : cut.length).replace(/[\s,;:–—-]+$/, "")}…`;
}
