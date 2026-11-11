import test from "node:test";
import assert from "node:assert/strict";
import { createSiteMarkdownRenderer } from "./lib/render-markdown.mjs";

// Rendered with the site's own pipeline, including src/markdown/wiki-markdown.mjs.
const render = await createSiteMarkdownRenderer();
const wiki = async (markdown) => (await render(markdown, "src/content/docs/wiki/test-article.md")).html;
const otherPage = async (markdown) => (await render(markdown, "src/content/docs/review.md")).html;

test("a wiki heading keeps its explicit ID, and the space before the ID stays text", async () => {
  assert.equal(await wiki("## List of **Teams** {#list-of-teams}\n"), '<h2 id="list-of-teams">List of <strong>Teams</strong> </h2>\n');
  assert.equal(await wiki("### Why?{#why}\n"), '<h3 id="why">Why?</h3>\n');
});

test("rewording a heading keeps its ID, so saved links keep working", async () => {
  assert.equal(await wiki("## Teams and their roles {#list-of-teams}\n"), '<h2 id="list-of-teams">Teams and their roles </h2>\n');
});

test("an escaped brace is heading text, not an ID", async () => {
  assert.equal(await wiki("## Use \\{#braces} {#braces-id}\n"), '<h2 id="braces-id">Use {#braces} </h2>\n');
});

test("a wiki heading without an explicit ID fails the build", async () => {
  await assert.rejects(wiki("## No ID here\n"), /heading "No ID here" has no ID/);
});

test("an ID used twice on a page fails the build, including IDs in HTML", async () => {
  await assert.rejects(wiki("## A {#same}\n\n## B {#same}\n"), /duplicate IDs: #same \(heading "A", heading "B"\)/);
  await assert.rejects(wiki('<figure class="wiki-source-image" id="setup"></figure>\n\n## Setup {#setup}\n'), /duplicate IDs: #setup/);
  await assert.rejects(wiki('<span class="wiki-legacy-anchor" id="Setup" aria-hidden="true">\n</span><span id="Setup"></span>\n\n## Setup {#setup}\n'), /duplicate IDs: #Setup/);
});

test("wiki headings have no Starlight anchor-link wrapper", async () => {
  assert.doesNotMatch(await wiki("## Setup {#setup}\n"), /sl-heading-wrapper|sl-anchor-link/);
});

test("external Markdown links get rel=\"noopener noreferrer\"; others do not", async () => {
  assert.equal(
    await wiki("[a](https://bisq.network/) [b](http://example.com) [c](../trading-rules/) [d](#setup)\n"),
    '<p><a href="https://bisq.network/" rel="noopener noreferrer">a</a> <a href="http://example.com" rel="noopener noreferrer">b</a> <a href="../trading-rules/">c</a> <a href="#setup">d</a></p>\n',
  );
});

test("other pages keep Starlight's heading links, automatic IDs and links", async () => {
  const html = await otherPage("## Plain heading\n\n[x](https://example.com)\n");
  assert.match(html, /<div class="sl-heading-wrapper level-h2"><h2 id="plain-heading">Plain heading<\/h2><a class="sl-anchor-link"/);
  assert.match(html, /<p><a href="https:\/\/example.com">x<\/a><\/p>/);
});
