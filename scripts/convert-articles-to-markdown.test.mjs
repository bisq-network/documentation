import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { createArticleConverter } from "./lib/markdown-conversion.mjs";
import { createSiteMarkdownRenderer } from "./lib/render-markdown.mjs";

const render = await createSiteMarkdownRenderer();
const convert = createArticleConverter({ render });
const fixture = (name) => readFileSync(`scripts/fixtures/markdown-conversion/${name}`, "utf8");

test("an HTML article converts to the expected Markdown and renders the same", async () => {
  const result = await convert(fixture("sample-article.html.md"), "sample-article");
  assert.equal(result.ok, true);
  assert.equal(result.text, fixture("sample-article.md"));
  // Bare e-mail addresses and URLs would become links in Markdown: that paragraph stays HTML.
  assert.match(result.text, /\n<p>Write to support@example\.com today\.<\/p>\n/);
  // The link before a "section not recovered" marker stays HTML for the section repair.
  assert.match(result.text, /See the <a href="\.\.\/arbitration\/">payout<\/a> <small class="wiki-link-gap">\[section not recovered: Payout\]<\/small>\./);
});

test("conversion is deterministic", async () => {
  const input = fixture("sample-article.html.md");
  assert.equal((await convert(input, "sample-article")).text, (await convert(input, "sample-article")).text);
});

test("an article that is already Markdown is refused", async () => {
  await assert.rejects(convert(fixture("sample-article.md"), "sample-article"), /already Markdown/);
});

test("every article renders: explicit heading IDs present and unique", async () => {
  const files = readdirSync("src/content/docs/wiki").filter((file) => file.endsWith(".md"));
  assert.ok(files.length >= 212);
  for (const file of files) {
    const path = `src/content/docs/wiki/${file}`;
    await assert.doesNotReject(render(readFileSync(path, "utf8"), path), path);
  }
});
