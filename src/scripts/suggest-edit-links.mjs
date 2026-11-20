// The GitHub addresses behind "Suggest an edit" (src/components/SuggestEdit.astro), the "Suggest a
// fix" button next to selected text (src/scripts/suggest-edit.ts) and the contribute page. Pure
// functions without the DOM, so the page script and the build share them; scripts/suggest-edit.test.mjs
// tests them.
//
// GitHub's issue forms fill a text field or text area from the query parameter named after the
// field's id (`article`, `details` in .github/ISSUE_TEMPLATE/article-review.yml); dropdowns are not
// filled. /edit/main/<path> opens GitHub's editor, which offers a fork to anyone who cannot write.

export const REPOSITORY = "https://github.com/bisq-network/documentation";
/** Selected text goes into the issue form up to this many characters. */
export const QUOTE_LIMIT = 1000;
/** And up to this many characters once encoded, so text in other scripts keeps the address short. */
export const ENCODED_QUOTE_LIMIT = 6000;
/** What the issue form's details field starts with after the quote. */
export const SUGGESTED_WORDING = "Suggested wording: ";

/** The issue form for a correction to an article. */
export const REPORT_FORM = `${REPOSITORY}/issues/new?template=article-review.yml`;
/** The issue form for a new article. */
export const NEW_ARTICLE_FORM = `${REPOSITORY}/issues/new?template=new-article.yml`;

/**
 * The article file and slug for a docs entry's file path (Starlight's entry.filePath), or
 * undefined when the entry is not an article in src/content/docs/wiki/.
 */
export function articleFile(filePath) {
  const match = /^src\/content\/docs\/wiki\/([a-z0-9]+(?:-[a-z0-9]+)*)\.md$/.exec(String(filePath ?? ""));
  return match ? { path: match[0], slug: match[1] } : undefined;
}

/** GitHub's editor for a file in the repository. */
export function editUrl(path) {
  return `${REPOSITORY}/edit/main/${String(path).split("/").map(encodeURIComponent).join("/")}`;
}

/**
 * Selected text as one line for the issue: whitespace collapsed, at most `limit` characters
 * (cut at a word where one is near, then "…"), and @names and #numbers in backticks, so quoting an
 * article that names a chat handle does not notify a GitHub user or link an issue.
 */
export function quoteOf(text, limit = QUOTE_LIMIT) {
  const characters = Array.from(String(text ?? "").replace(/\s+/g, " ").trim());
  let line = characters.join("");
  if (characters.length > limit) {
    const cut = characters.slice(0, limit - 1).join("");
    const space = cut.lastIndexOf(" ");
    line = `${(space > cut.length * 0.8 ? cut.slice(0, space) : cut).trimEnd()}…`;
  }
  return line.replace(/(^|[^\w`/.])(@[a-z\d][\w-]*|#\d+\b)/gi, "$1`$2`");
}

/** The details field: the quote as a Markdown quote, then the start of the reader's wording. */
export function detailsFor(quote) {
  return `> ${quote}\n\n${SUGGESTED_WORDING}`;
}

/**
 * The correction form for a page, prefilled with the page's address (with the section's
 * anchor when one is given) and, when the reader selected text, the quote.
 */
export function reportUrl({ page, section, quote } = {}) {
  let url = REPORT_FORM;
  if (page) {
    const address = new URL(page);
    address.hash = section ?? "";
    url += `&article=${encodeURIComponent(address.href)}`;
  }
  let limit = QUOTE_LIMIT;
  let text = quote ? quoteOf(quote, limit) : "";
  while (text && limit > 10 && encodeURIComponent(text).length > ENCODED_QUOTE_LIMIT) text = quoteOf(quote, (limit = Math.floor(limit * 0.8)));
  if (text) url += `&details=${encodeURIComponent(detailsFor(text))}`;
  return url;
}
