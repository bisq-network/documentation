import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { additionalArticles, restoreRecordedFormatting, verifyAdditionalArticles } from "./lib/additional-articles.mjs";
import { collectGuides, loadIntegration, sections } from "./lib/documentation.mjs";

test("additional historical sources retain raw, rendered and media receipts", () => {
  assert.equal(verifyAdditionalArticles().length, 3);
  for (const item of additionalArticles) {
    assert.throws(() => verifyAdditionalArticles((path) => path === item.file ? Buffer.from("changed warning") : readFileSync(path)), /rendered article drift/);
    assert.throws(() => verifyAdditionalArticles((path) => path === `public${item.source_download}` ? Buffer.from("changed source") : readFileSync(path)), /raw source drift/);
  }
});

test("a formatted addition accepts only its recorded line breaks", () => {
  const item = additionalArticles.find((entry) => entry.slug === "emergency-multisig-payout-tool");
  const formatted = readFileSync(item.file, "utf8");
  assert.ok(formatted.split("\n").length > 100, "expected one source line per element");
  const reformatted = formatted.replace("</h2>\n<p>", "</h2>&#10;<p>");
  assert.throws(() => verifyAdditionalArticles((path) => path === item.file ? Buffer.from(reformatted) : readFileSync(path)), /rendered article drift/);
});

test("a formatting record cannot drop or add text through its offsets", () => {
  const sha = (value) => createHash("sha256").update(value).digest("hex");
  const original = "<p>a</p>&#10;<p>b</p>&#10;<p>c</p>";
  const formatted = original.replaceAll("&#10;", "\n");
  const offsets = [...formatted].flatMap((character, index) => character === "\n" ? [index] : []);
  const records = (changes = {}, bytes = formatted) => [{
    slug: "x", decoded_newline_entities: offsets.length, decoded_newline_offsets: offsets,
    original_file_sha256: sha(original), formatted_file_sha256: sha(bytes), ...changes,
  }];
  assert.equal(restoreRecordedFormatting(Buffer.from(formatted), "x", records()), original);
  // A string offset makes slice() skip text, so padding after it could vanish from the receipt check.
  const padded = formatted + "<p>Inserted text.</p>";
  assert.throws(() => restoreRecordedFormatting(Buffer.from(padded), "x", records({ decoded_newline_offsets: [offsets[0], String(offsets[1])] }, padded)), /invalid formatting offset/);
  assert.throws(() => restoreRecordedFormatting(Buffer.from(formatted), "x", records({ decoded_newline_offsets: [offsets[0], offsets[1] + 0.5] })), /invalid formatting offset/);
  assert.throws(() => restoreRecordedFormatting(Buffer.from(formatted), "x", records({ decoded_newline_offsets: "12" })), /missing exact formatting offsets/);
  assert.throws(() => restoreRecordedFormatting(Buffer.from(padded), "x", records({}, padded)), /no longer reconstructs/);
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
