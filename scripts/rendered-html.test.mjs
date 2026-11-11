import test from "node:test";
import assert from "node:assert/strict";
import { assertVerifiedVersions, installedVersions, verifiedWith } from "./lib/render-markdown.mjs";
import { htmlParser, normalizeFormat, serialize, wrappedHeading } from "./lib/rendered-html.mjs";

// The normalization that lets a converted article match the HTML it replaced
// (scripts/lib/rendered-html.mjs) may only drop what a browser does not show.
const parse = await htmlParser();
const nodes = (html) => parse(html).nodes;
const same = (a, b, options) => serialize(normalizeFormat(nodes(a), options)) === serialize(normalizeFormat(nodes(b), options));

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

test("Starlight's heading link is dropped only in its exact form", () => {
  const headingLink = (heading) => `<a class="sl-anchor-link" href="#${heading.attrs.find(([name]) => name === "id")[1]}"><span class="sr-only">Section titled ${serialize(heading.children)}</span></a>`;
  const wrapper = (inner, cls = "sl-heading-wrapper level-h2") => `<div class="${cls}"><h2 id="setup">Setup</h2>${inner}</div>`;
  const exact = wrapper('<a class="sl-anchor-link" href="#setup"><span class="sr-only">Section titled Setup</span></a>');
  assert.ok(same(exact, '<h2 id="setup">Setup</h2>', { headingLink }));
  assert.equal(wrappedHeading(nodes(exact)[0], headingLink)?.tag, "h2");
  for (const changed of [
    wrapper('<a class="sl-anchor-link" href="#other"><span class="sr-only">Section titled Setup</span></a>'),
    wrapper('<a class="sl-anchor-link" href="#setup"><span class="sr-only">Section titled Setup, and more</span></a>'),
    wrapper('<a class="sl-anchor-link" href="#setup"><span class="sr-only">Section titled Setup</span></a>extra'),
    wrapper('<a class="sl-anchor-link" href="#setup"><span class="sr-only">Section titled Setup</span></a>', "sl-heading-wrapper level-h3"),
    `<div class="sl-heading-wrapper level-h2" hidden><h2 id="setup">Setup</h2><a class="sl-anchor-link" href="#setup"><span class="sr-only">Section titled Setup</span></a></div>`,
  ]) assert.ok(!same(changed, '<h2 id="setup">Setup</h2>', { headingLink }), changed);
  // Without the site's heading link the wrapper always counts.
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

test("the offline renderer runs on the package versions it was checked against", () => {
  assert.deepEqual(installedVersions(), verifiedWith);
  assert.deepEqual(assertVerifiedVersions(), verifiedWith);
  assert.throws(() => assertVerifiedVersions(process.cwd(), { ...verifiedWith, astro: "0.0.0" }), /checked with astro 0\.0\.0, but astro 7\.\d+\.\d+ is installed\. It uses Astro internals/);
});
