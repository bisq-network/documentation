import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { test } from "node:test";
import { articleDescription, plainText } from "./lib/article-description.mjs";

const article = (body) => `---\ntitle: "T"\n---\n\n<nav class="wiki-source-toc"><details open><summary>On this page</summary></details></nav>\n\n<div class="wiki-recovered-article" lang="en">\n\n${body}\n\n</div>\n`;

test("the first sentence of the first paragraph, as plain text", () => {
  assert.equal(articleDescription(article("**Zelle** is a [payment method](../x/). It is fast.\n\nMore.")), "Zelle is a payment method.");
  assert.equal(articleDescription(article("<span class=\"wiki-legacy-anchor\" id=\"A\" aria-hidden=\"true\">\n</span>\n\n## A {#a}\n\nWon\\'t start (e.g. Bisq.old) is fine.")), "Won't start (e.g. Bisq.old) is fine.");
});

test("labels, figures and recovery notes are skipped; lost links keep their words", () => {
  assert.equal(articleDescription(article("<aside class=\"wiki-admonition\" role=\"note\">\n\n**Warning**\n\nThe role is retired.\n\n</aside>")), "The role is retired.");
  assert.equal(articleDescription(article("<figure class=\"wiki-source-image\"><img alt=\"x\"></figure>\n\nBisq is a <span class=\"wiki-link-gap\">DAO <small>[unrecovered article: DAO]</small></span> project.")), "Bisq is a DAO project.");
  assert.equal(plainText("<span class=\"wiki-markup-gap\" role=\"note\"><strong>[Unsupported MediaWiki markup: languages]</strong> <code>&lt;languages/&gt;</code></span> Bisq offers"), "Bisq offers");
});

test("a paragraph that stops mid-sentence continues; long sentences are cut at a word", () => {
  assert.equal(articleDescription(article("Unlike most systems,\n\n[Tails runs *entirely* in memory.](https://x)")), "Unlike most systems, Tails runs entirely in memory.");
  const long = `${"word ".repeat(60)}end.`;
  const description = articleDescription(article(long));
  assert.ok(description.length <= 155 && description.endsWith("…"), description);
});

test("every restored article has a description of at most 155 characters", () => {
  for (const file of readdirSync("src/content/docs/wiki").filter((name) => name.endsWith(".md"))) {
    const text = readFileSync(`src/content/docs/wiki/${file}`, "utf8");
    const description = articleDescription(text);
    if (/^description:/m.test(text.split("\n---")[0])) continue;
    assert.ok(description && description.length <= 155, `${file}: ${description}`);
  }
});
