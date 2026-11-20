// The page-not-found page (src/pages/404.astro) offers to search for the words in the address the
// reader followed: /Arbitraton/ becomes "Arbitraton", /wiki/last-resort-restre/ "last resort restre",
// and an old wiki address such as /index.php?title=Trading_rules "Trading rules".

// Path parts that are not words: the article prefix, old wiki script names, earlier site prefixes.
const noise = new Set(["wiki", "w", "index", "index.php", "index.html", "documentation", "bisq-docs"]);

/** Decode a URL part for reading; a malformed escape keeps the text as it was. */
function decode(text) {
  try { return decodeURIComponent(text.replace(/\+/g, " ")); } catch { return text; }
}

/**
 * The words to search for, from an address's path (without the site's `base`) and its `title`,
 * `search` or `q` parameter. Separators (/ _ - + and spaces), file endings such as .html, and
 * path parts that are not words (wiki, index.php) are dropped. At most `limit` words.
 */
export function searchWordsFromAddress(pathname, search = "", { base = "", limit = 6 } = {}) {
  const prefix = base.replace(/\/$/, "");
  let path = pathname;
  if (prefix && (path === prefix || path.startsWith(`${prefix}/`))) path = path.slice(prefix.length);
  const params = new URLSearchParams(search);
  const parts = [
    ...path.split("/").map(decode),
    ...["title", "search", "q"].map((name) => params.get(name) ?? ""),
  ];
  const words = parts
    .map((part) => part.trim().replace(/\.(?:html?|php|aspx?)$/i, ""))
    .filter((part) => part && !noise.has(part.toLowerCase()))
    .flatMap((part) => part.split(/[\s_\-+/]+/u))
    .map((word) => word.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, ""))
    .filter(Boolean);
  return words.slice(0, limit).join(" ").slice(0, 80).trim();
}
