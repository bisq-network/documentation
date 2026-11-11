import test from "node:test";
import assert from "node:assert/strict";
import { createSiteMarkdownRenderer } from "./lib/render-markdown.mjs";
import { linkRawHeading } from "../src/markdown/wiki-markdown.mjs";

// Rendered with the site's own pipeline, including src/markdown/wiki-markdown.mjs.
const render = await createSiteMarkdownRenderer();
const wiki = async (markdown) => (await render(markdown, "src/content/docs/wiki/test-article.md")).html;
const otherPage = async (markdown) => (await render(markdown, "src/content/docs/review.md")).html;
// The heading element itself, without Starlight's wrapper and link.
const heading = async (markdown) => /<(h[1-6]) [^>]*>[\s\S]*?<\/\1>/.exec(await wiki(markdown))?.[0];

test("a wiki heading keeps its explicit ID, and the space before the ID stays text", async () => {
  assert.equal(await heading("## List of **Teams** {#list-of-teams}\n"), '<h2 id="list-of-teams">List of <strong>Teams</strong> </h2>');
  assert.equal(await heading("### Why?{#why}\n"), '<h3 id="why">Why?</h3>');
});

test("rewording a heading keeps its ID, so saved links keep working", async () => {
  assert.equal(await heading("## Teams and their roles {#list-of-teams}\n"), '<h2 id="list-of-teams">Teams and their roles </h2>');
});

test("an escaped brace is heading text, not an ID", async () => {
  assert.equal(await heading("## Use \\{#braces} {#braces-id}\n"), '<h2 id="braces-id">Use {#braces} </h2>');
});

test("a wiki heading without an explicit ID fails the build", async () => {
  await assert.rejects(wiki("## No ID here\n"), /heading "No ID here" has no ID/);
});

test("an ID used twice on a page fails the build, including IDs in HTML", async () => {
  await assert.rejects(wiki("## A {#same}\n\n## B {#same}\n"), /duplicate IDs: #same \(heading "A", heading "B"\)/);
  await assert.rejects(wiki('<figure class="wiki-source-image" id="setup"></figure>\n\n## Setup {#setup}\n'), /duplicate IDs: #setup/);
  await assert.rejects(wiki('<span class="wiki-legacy-anchor" id="Setup" aria-hidden="true">\n</span><span id="Setup"></span>\n\n## Setup {#setup}\n'), /duplicate IDs: #Setup/);
});

test("wiki headings get Starlight's standard heading link, pointing at their ID", async () => {
  const html = await wiki("## Setup {#setup}\n");
  assert.match(html, /^<div class="sl-heading-wrapper level-h2"><h2 id="setup">Setup <\/h2><a class="sl-anchor-link" href="#setup">/);
  // Starlight's label, without the space the heading keeps at its end.
  assert.match(html, /<span class="sr-only" data-pagefind-ignore>Section titled \u201cSetup\u201d<\/span><\/a><\/div>\n$/);
  assert.equal(html.match(/<a /g).length, 1);
});

test("a heading that stays HTML gets exactly the link Starlight gives a Markdown heading", async () => {
  const markdown = await wiki("### Why it **matters** & more{#why}\n");
  const html = await wiki('<div class="x"><h3 id="why">Why it <strong>matters</strong> &amp; more</h3></div>\n');
  assert.equal(html, `<div class="x">${markdown.trimEnd()}</div>\n`);
});

test("headings added after rendering (archived templates) get the link once", async () => {
  const once = linkRawHeading('<div class="wiki-template-expanded"><h2 id="tpl-1"> Fix </h2></div>');
  assert.match(once, /^<div class="wiki-template-expanded"><div class="sl-heading-wrapper level-h2"><h2 id="tpl-1"> Fix <\/h2><a class="sl-anchor-link" href="#tpl-1">/);
  assert.equal(linkRawHeading(once), once);
  assert.equal(linkRawHeading("<h2>No ID</h2>"), "<h2>No ID</h2>");
});

test("legacy anchor spans stay right before the linked HTML heading", async () => {
  const html = await wiki('<span class="wiki-legacy-anchor" id="Setup" aria-hidden="true">\n</span><h2 id="setup"> Setup </h2>\n');
  assert.match(html, /^<span class="wiki-legacy-anchor" id="Setup" aria-hidden="true">\n<\/span><div class="sl-heading-wrapper level-h2"><h2 id="setup"> Setup <\/h2><a class="sl-anchor-link" href="#setup">/);
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
