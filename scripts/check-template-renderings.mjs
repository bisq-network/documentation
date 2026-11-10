import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import archive from "../migration/archive-templates-20261014.json" with { type: "json" };
import derived from "../migration/template-renderings-20261014.json" with { type: "json" };

const hash = (text) => createHash("sha256").update(text).digest("hex");
const decode = (value) => value.replace(/&#(x[\da-f]+|\d+);|&(amp|lt|gt|quot|apos);/gi, (all, numeric, named) => numeric ? String.fromCodePoint(numeric[0].toLowerCase() === "x" ? parseInt(numeric.slice(1), 16) : Number(numeric)) : { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'" }[named.toLowerCase()]);
assert.equal(derived.schema_version, 1);
assert.equal(derived.items.length, 17);
assert.equal(derived.items.reduce((n, item) => n + item.articles.length, 0), 71);
assert.equal(new Set(derived.items.map((item) => item.invocation)).size, derived.items.length);
for (const item of derived.items) {
  const definition = archive.items.find((entry) => entry.source_download === item.source_download);
  assert.ok(definition, `missing definition for ${item.invocation}`);
  assert.equal(hash(readFileSync(`public${item.source_download}`)), item.definition_sha256, `definition changed: ${item.name}`);
  assert.equal(item.definition_sha256, definition.wikitext_sha256);
  assert.equal(hash(item.html), item.rendered_sha256, `derived HTML changed: ${item.invocation}`);
  assert.ok(item.articles.length);
  for (const slug of new Set(item.articles)) {
    assert.match(slug, /^[a-z0-9-]+$/);
    const source = readFileSync(`src/content/docs/wiki/${slug}.md`, "utf8");
    const invocations = [...source.matchAll(/<span class="wiki-template-gap" role="note"><strong>\[Unresolved template: [^<]+\]<\/strong> <code>([\s\S]*?)<\/code><\/span>/g)].map((match) => decode(match[1]));
    assert.equal(invocations.filter((value) => value === item.invocation).length, item.articles.filter((entry) => entry === slug).length, `source invocation changed: ${slug} ${item.name}`);
  }
}
const media = JSON.parse(readFileSync("recovery-evidence/template-media.json", "utf8"));
for (const item of media.items) assert.equal(hash(readFileSync(`public${item.asset_path}`)), item.sha256, `template image changed: ${item.canonical_filename}`);
console.log(`Checked 17 source-derived template renderings, 71 original placements and ${media.items.length} template image hashes.`);
