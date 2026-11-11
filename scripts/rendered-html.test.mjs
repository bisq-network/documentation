import test from "node:test";
import assert from "node:assert/strict";
import { assertVerifiedVersions, installedVersions, verifiedWith } from "./lib/render-markdown.mjs";
import { builtArticleProblems, pageFileProblems } from "./lib/built-pages.mjs";
import { documentParser, dropHeadingLinks, htmlParser, normalizeFormat, serialize, wrappedHeading } from "./lib/rendered-html.mjs";

// The normalization that lets a converted article match the HTML it replaced
// (scripts/lib/rendered-html.mjs) may only drop what a browser does not show.
const parse = await htmlParser();
const nodes = (html) => parse(html).nodes;
const same = (a, b) => serialize(normalizeFormat(nodes(a))) === serialize(normalizeFormat(nodes(b)));

test("whitespace a browser does not show, attribute order and Starlight's dir=auto are normalized", () => {
  for (const [a, b] of [
    ["<p> a  b\n</p>", "<p>a b</p>"],
    ['<p>x <a href="y" id="z">link</a></p>', '<p>x <a id="z" href="y">link</a></p>'],
    ['<p>Use <code dir="auto">x</code>.</p>', "<p>Use <code>x</code>.</p>"],
    ['<p>a</p>\n<a href="y">\nlink</a>', '<p>a</p><a href="y">link</a>'],
    ['<p>a</p>\n<span id="A" class="wiki-legacy-anchor" aria-hidden="true">\n</span>\n<h2 id="b"> B </h2>', '<p>a</p><span id="A" class="wiki-legacy-anchor" aria-hidden="true"></span><h2 id="b">B</h2>'],
    ["<ul>\n<li>a</li>\n</ul>", "<ul><li>a</li></ul>"],
    ["<p>a<br>\nb</p>", "<p>a<br>b</p>"],
  ]) assert.ok(same(a, b), `${a} should match ${b}`);
});

test("text, visible whitespace and everything else still differ", () => {
  for (const [a, b] of [
    ["<p>ab</p>", "<p>a b</p>"],
    ["<p>a b</p>", "<p>a b</p>"],
    // A space inside an ID span in the middle of a line is shown.
    ['<p>a<span id="x"> </span>b</p>', '<p>a<span id="x"></span>b</p>'],
    ["<p><span></span> a</p>", "<p>a</p>"],
    ["<p>a <br>b</p>", "<p>a<br>b</p>"],
    // Nothing inside code or pre is normalized, nor dir on pre or on right-to-left code.
    ["<p><code>a  b</code></p>", "<p><code>a b</code></p>"],
    ["<pre>a  b</pre>", "<pre>a b</pre>"],
    ['<pre dir="ltr">x</pre>', "<pre>x</pre>"],
    ['<p><code dir="auto">שלום</code></p>', "<p><code>שלום</code></p>"],
    ['<p><a href="x">t</a></p>', '<p><a href="x/">t</a></p>'],
    ["<p>a<!-- c --></p>", "<p>a</p>"],
    ["<p>a<span></span></p>", "<p>a</p>"],
    ["<p>&lt;b&gt;x</p>", "<p><b>x</b></p>"],
  ]) assert.ok(!same(a, b), `${a} should differ from ${b}`);
});

test("the site's heading link is dropped only in its exact form", () => {
  const headingLink = (heading) => `<a class="sl-anchor-link" href="#${heading.attrs.find(([name]) => name === "id")[1]}"><span class="sr-only">Section titled ${serialize(heading.children)}</span></a>`;
  const dropped = (html) => serialize(dropHeadingLinks(nodes(html), headingLink));
  const wrapper = (inner, cls = "sl-heading-wrapper level-h2") => `<div class="${cls}"><h2 id="setup">Setup</h2>${inner}</div>`;
  const exact = wrapper('<a class="sl-anchor-link" href="#setup"><span class="sr-only">Section titled Setup</span></a>');
  assert.equal(dropped(`<p>a</p>${exact}`), '<p>a</p><h2 id="setup">Setup</h2>');
  assert.equal(wrappedHeading(nodes(exact)[0], headingLink)?.tag, "h2");
  for (const changed of [
    wrapper('<a class="sl-anchor-link" href="#other"><span class="sr-only">Section titled Setup</span></a>'),
    wrapper('<a class="sl-anchor-link" href="#setup"><span class="sr-only">Section titled Setup, and more</span></a>'),
    wrapper('<a class="sl-anchor-link" href="#setup"><span class="sr-only">Section titled Setup</span></a>extra'),
    wrapper('<a class="sl-anchor-link" href="#setup"><span class="sr-only">Section titled Setup</span></a>', "sl-heading-wrapper level-h3"),
    `<div class="sl-heading-wrapper level-h2" hidden><h2 id="setup">Setup</h2><a class="sl-anchor-link" href="#setup"><span class="sr-only">Section titled Setup</span></a></div>`,
  ]) assert.equal(dropped(changed), serialize(nodes(changed)), changed);
  // The comparison of two rendered pages never drops it: both pages must carry the same links.
  assert.ok(!same(exact, '<h2 id="setup">Setup</h2>'));
});

test("HTML that would change the page around the article is found", () => {
  assert.equal(parse("<p>a <b>b</b></p><div>x</div>").selfContained, true);
  // An omitted </p> or </li> closes where the page would close it.
  assert.equal(parse("<p>a<ul><li>x</ul>").selfContained, true);
  for (const html of ["<div>open", "</div><p>after</p>", "<p>a <b>bold", '<p><a href="https://example.org">link</p>', "<span>open", "<table><tr><td>x"]) {
    assert.equal(parse(html).selfContained, false, html);
  }
});

// Review findings (PR #188): a fragment parse dropped what a browser applies to the page.
test("tags that act on the page's own html, head, body or main element are found", () => {
  for (const [html, problem] of [
    ['Bisq is a <body onload="alert(1)">project', /<body> tag/],
    ['<html hidden style="display:none">', /<html> tag/],
    ["<body inert>", /<body> tag/],
    ['There is no CEO.<body onpageshow="document.title=\'pwned\'"> True', /<body> tag/],
    ['<body dir="rtl" style="unicode-bidi:bidi-override">', /<body> tag/],
    ["</body></html>after", /<\/body> tag/],
    ["There is no CEO.</main> True Names", /<\/main> tag/],
    ["<frameset><frame></frameset>", /<frameset> tag/],
    ["<head><title>x</title></head>", /<head> tag/],
    ["x</HEAD>y", /<\/head> tag/],
  ]) {
    const result = parse(`<div class="wiki-recovered-article"><p>${html}</p></div>`);
    assert.equal(result.selfContained, false, html);
    assert.match(result.problem, problem, html);
  }
  // The parse itself sees the page's elements: <body> adds its attributes to the page, </main> moves text out.
  assert.equal(parse("<p>a<BODY onload=x>b</p>".replace("BODY", "bOdY")).selfContained, false);
  // Look-alike tags are fine; any </main> is refused, even one closing a <main> of the article's own.
  assert.equal(parse("<header>x</header><p>a <bodyguard>b</bodyguard></p>").selfContained, true);
  assert.equal(parse("<main>y</main>").selfContained, false);
});

test("a built article page must show exactly the checked article, with IDs unique on the page", async () => {
  const parseDocument = await documentParser();
  const article = '<div class="wiki-recovered-article" lang="en"><p id="note">Text</p></div>';
  const page = (content, extra = "") => parseDocument(`<!doctype html><html><head></head><body><main><div class="sl-markdown-content">${content}</div>${extra}</main></body></html>`);
  assert.deepEqual(builtArticleProblems(page(article), nodes(article)), []);
  assert.deepEqual(builtArticleProblems(page(article.replace("Text", "Other text")), nodes(article)), ["the page does not show the article as the gate checked it"]);
  // An article ID the page's own script data uses (src/scripts/article-experience.ts reads #article-media-data).
  assert.deepEqual(builtArticleProblems(page(article.replace('id="note"', 'id="article-media-data"'), '<script type="application/json" id="article-media-data">[]</script>'), nodes(article.replace('id="note"', 'id="article-media-data"'))), ["IDs used more than once on the page: #article-media-data"]);
  assert.deepEqual(pageFileProblems(["404.astro", "[...legacy].astro", "saved-wiki-links.json.ts"]), []);
  assert.match(pageFileProblems(["wiki/teams/index.html"])[0], /src\/pages\/wiki\/teams\/index\.html is not a known page file/);
});

test("the offline renderer runs on the package versions it was checked against", () => {
  assert.deepEqual(installedVersions(), verifiedWith);
  assert.deepEqual(assertVerifiedVersions(), verifiedWith);
  assert.throws(() => assertVerifiedVersions(process.cwd(), { ...verifiedWith, astro: "0.0.0" }), /checked with astro 0\.0\.0, but astro 7\.\d+\.\d+ is installed\. It uses Astro internals/);
});
