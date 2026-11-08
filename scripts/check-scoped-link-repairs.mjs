import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import records from "../migration/scoped-link-repairs-20261108.json" with { type: "json" };
import { resolveArchivedRedirects } from "./lib/archived-redirects.mjs";
import { loadIntegration } from "./lib/documentation.mjs";

assert.equal(records.items.length, 6);
for (const entry of records.items) {
  assert.match(entry.source_slug, /^[a-z0-9-]+$/);
  const source = readFileSync(`public/wiki-source/${entry.source_slug}.wiki.txt`);
  assert.equal(createHash("sha256").update(source).digest("hex"), entry.source_sha256);
  assert.ok(source.toString("utf8").split("\n")[entry.source_line - 1].includes(entry.original_title));
  if (entry.target.startsWith("https:")) assert.equal(entry.target, "https://satispay.com/it-it/privati/");
  else {
    assert.match(entry.target, /^\/wiki\/[a-z0-9-]+\/$/);
    readFileSync(`src/content/docs${entry.target.slice(0,-1)}.md`);
  }
}
const matches = resolveArchivedRedirects(loadIntegration()).resolved.filter((item) => item.name.toLowerCase() === "xmr");
assert.equal(matches.length, 1);
assert.equal(matches[0].target, "/wiki/trading-monero/");
console.log("Checked six scoped link repairs and unique archived Xmr redirect.");
