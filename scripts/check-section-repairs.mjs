import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import repairs from "../migration/section-repairs-20261108.json" with { type: "json" };

assert.equal(repairs.items.length, 10);
for (const item of repairs.items) {
  assert.match(item.source_slug, /^[a-z0-9-]+$/);
  assert.match(item.target_slug, /^[a-z0-9-]+$/);
  assert.match(item.target_fragment, /^[a-z0-9-]+$/);
  const source = readFileSync(`public/wiki-source/${item.source_slug}.wiki.txt`, "utf8");
  assert.equal(createHash("sha256").update(source).digest("hex"), item.source_sha256);
  assert.equal(source.split("\n")[item.source_line - 1].trim(), item.source_excerpt);
  const target = readFileSync(`src/content/docs/wiki/${item.target_slug}.md`, "utf8");
  assert.ok(target.includes(`id="${item.target_fragment}"`), `target section missing: ${item.target_slug}#${item.target_fragment}`);
}
console.log("Checked 10 source-specific section repairs against original source hashes, lines and exact target IDs.");
