import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import repairs from "../migration/section-repairs-20261108.json" with { type: "json" };
import { renderArticle } from "./lib/render-markdown.mjs";
import { attributeValue, elementsOf, htmlParser } from "./lib/rendered-html.mjs";
import { renderSectionRepairs } from "./lib/section-repairs.mjs";

// Each reviewed section repair still matches its original source line, its target
// section exists on the target article's rendered page (a Markdown heading carries
// its ID as {#id}, so the source alone does not show it), and the repair applies to
// the source article's rendered page exactly as src/components/SourceHistory.astro
// applies it.
const parse = await htmlParser();
const rendered = async (slug) => {
  const path = `src/content/docs/wiki/${slug}.md`;
  return renderArticle(readFileSync(path, "utf8"), path);
};
assert.equal(repairs.items.length, 10);
for (const item of repairs.items) {
  assert.match(item.source_slug, /^[a-z0-9-]+$/);
  assert.match(item.target_slug, /^[a-z0-9-]+$/);
  assert.match(item.target_fragment, /^[a-z0-9-]+$/);
  const source = readFileSync(`public/wiki-source/${item.source_slug}.wiki.txt`, "utf8");
  assert.equal(createHash("sha256").update(source).digest("hex"), item.source_sha256);
  assert.equal(source.split("\n")[item.source_line - 1].trim(), item.source_excerpt);
  const ids = elementsOf(parse(await rendered(item.target_slug)).nodes).map((element) => attributeValue(element, "id"));
  assert.ok(ids.includes(item.target_fragment), `target section missing: ${item.target_slug}#${item.target_fragment}`);
}
for (const slug of new Set(repairs.items.map((item) => item.source_slug))) {
  const expected = repairs.items.filter((item) => item.source_slug === slug).length;
  assert.equal(renderSectionRepairs(await rendered(slug), slug).restored, expected, `section repairs no longer apply to ${slug}`);
}
console.log("Checked 10 source-specific section repairs against original source hashes, lines, exact target IDs and the rendered articles.");
