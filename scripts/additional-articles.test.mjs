import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { additionalArticles, verifyAdditionalArticles } from "./lib/additional-articles.mjs";
import { collectGuides, loadIntegration, sections } from "./lib/documentation.mjs";

test("additional historical sources retain raw, rendered and media receipts", () => {
  assert.equal(verifyAdditionalArticles().length, 3);
  for (const item of additionalArticles) {
    assert.throws(() => verifyAdditionalArticles((path) => path === item.file ? Buffer.from("changed warning") : readFileSync(path)), /rendered article drift/);
    assert.throws(() => verifyAdditionalArticles((path) => path === `public${item.source_download}` ? Buffer.from("changed source") : readFileSync(path)), /raw source drift/);
  }
});

test("original articles and additions appear once in navigation and discovery", () => {
  const original = JSON.parse(readFileSync("migration/articles.json", "utf8")).items;
  const all = loadIntegration();
  assert.equal(original.length, 209);
  assert.equal(all.length, 212);
  assert.equal(new Set(all.map((item) => item.route)).size, 212);
  assert.equal(collectGuides().length, 212);
  assert.equal(sections.reduce((sum, group) => sum + group.count, 0), 212);
  for (const item of original) assert.equal(all.find((a) => a.title === item.title).wikitext_sha256, item.wikitext_sha256);
  for (const item of additionalArticles) assert.equal(collectGuides().filter((guide) => guide.slug === item.slug).length, 1);
});
