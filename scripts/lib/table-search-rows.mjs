// Search indexing helper for rendered tables.
//
// Pagefind reads table cells one by one, so an excerpt for a match inside a table is a run of
// cell values separated by periods, with no column names. For each simple table this keeps the
// visible table out of the index and adds a hidden copy of each body row written as
// "Column: value · Column: value", so the excerpt shows the row that matched.
// Tables with colspan or rowspan are left as they are because their cells do not line up with headers.

const decode = (text) => text
  .replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
  .replace(/&quot;/g, '"').replace(/&#39;|&#x27;/g, "'").replace(/&amp;/g, "&");
const encode = (text) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const plain = (html) => decode(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();

export function addTableRowSummaries(html) {
  return html.replace(/<table\b([^>]*)>([\s\S]*?)<\/table>/g, (whole, attributes, inner) => {
    if (/\b(?:colspan|rowspan)\s*=/i.test(inner) || attributes.includes("data-pagefind-ignore")) return whole;
    const rows = [...inner.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/g)].map((row) =>
      [...row[1].matchAll(/<t([hd])\b[^>]*>([\s\S]*?)<\/t[hd]>/g)].map((cell) => ({ header: cell[1] === "h", text: plain(cell[2]) })));
    const header = rows.length > 1 && rows[0].length && rows[0].every((cell) => cell.header) ? rows.shift().map((cell) => cell.text) : null;
    const lines = rows
      .map((row) => row.map((cell, index) => (header?.[index] && cell.text ? `${header[index]}: ` : "") + cell.text).filter(Boolean).join(" · "))
      .filter(Boolean);
    if (!lines.length) return whole;
    const summary = `<div class="table-search-rows" hidden>${lines.map((line) => `<p>${encode(line)}</p>`).join("")}</div>`;
    return `<table${attributes} data-pagefind-ignore>${inner}</table>${summary}`;
  });
}
