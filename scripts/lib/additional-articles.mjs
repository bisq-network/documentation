import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

// Additions have their own source/render receipts. The original restoration
// manifest remains immutable and continues to protect all 209 original files.
export const additionalManifest = JSON.parse(readFileSync("migration/additional-articles.json", "utf8"));
export const additionalArticles = additionalManifest.items;
const expectedSlugs = ["bitcointalk-moderator", "emergency-multisig-payout-tool", "running-bisq-in-china-sstap"];
const digest = (value) => createHash("sha256").update(value).digest("hex");

/** Verify each additional historical article, source record, and media hash. */
export function verifyAdditionalArticles(read = (path) => readFileSync(path)) {
  assert.equal(additionalManifest.schema_version, 1);
  assert.equal(additionalManifest.count, 3);
  assert.deepEqual(additionalArticles.map((item) => item.slug).sort(), expectedSlugs);
  for (const item of additionalArticles) {
    assert.equal(item.file, `src/content/docs/wiki/${item.slug}.md`);
    assert.equal(item.route, `/wiki/${item.slug}/`);
    assert.equal(item.source_download, `/wiki-source/${item.slug}.wiki.txt`);
    assert.equal(item.source_metadata, `/wiki-source/${item.slug}.json`);
    assert.equal(item.historical_only, true);
    assert(item.recovery_note && item.snapshot_label);
    const rendered = read(item.file);
    assert.equal(digest(rendered), item.output_sha256, `additional rendered article drift: ${item.slug}`);
    assert.equal(digest(read(`public${item.source_download}`)), item.wikitext_sha256, `additional raw source drift: ${item.slug}`);
    const metadataBytes = read(`public${item.source_metadata}`);
    assert.equal(digest(metadataBytes), item.source_metadata_sha256, `additional metadata drift: ${item.slug}`);
    const metadata = JSON.parse(metadataBytes.toString());
    assert.equal(metadata.revision_id, item.revision_id);
    assert.equal(metadata.wikitext_sha256, item.wikitext_sha256);
    for (const image of item.image_occurrences) {
      assert(/^media\/wiki\/[a-f0-9]{64}\.(?:png|jpg|gif)$/.test(image.asset_path));
      assert.equal(digest(read(`public/${image.asset_path}`)), image.sha256, `additional image drift: ${image.canonical_filename}`);
    }
  }
  return additionalArticles;
}
