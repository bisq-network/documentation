import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import supplement from "../recovery-evidence/supplemental-media.json" with { type: "json" };
import articles from "../migration/articles.json" with { type: "json" };
import { renderSupplementalMedia } from "./lib/supplemental-media.mjs";

test("supplemental originals match their hashes and preserve baseline bytes", () => {
  assert.equal(supplement.items.length, 26);
  for (const item of [...supplement.items, ...supplement.linked_resources]) {
    const bytes = readFileSync(`public${item.asset_path}`);
    assert.equal(createHash("sha256").update(bytes).digest("hex"), item.sha256);
  }
});

test("partial and missing figures retain IDs and captions at project base", () => {
  for (const slug of ["account-limits", "failed-trades-reimbursement-of-trade-fees-and-miner-fees", "automatic-backup"]) {
    const article = articles.items.find(x => x.slug === slug);
    const file = `src/content/docs/wiki/${slug}.md`;
    const before = readFileSync(file, "utf8");
    const result = renderSupplementalMedia(before, article.image_occurrences, "/bisq-docs/");
    for (const image of result.images.filter(x => supplement.items.some(y => y.canonical_filename === x.canonical_filename))) {
      const fig = result.content.match(new RegExp(`<figure[^>]*id="${image.element_id}"[^>]*>[\\s\\S]*?<\\/figure>`))?.[0];
      assert.ok(fig?.includes(`/bisq-docs/${image.asset_path}`));
      assert.ok(fig?.includes("<img"));
      assert.equal(image.status, "original");
    }
    if (slug.startsWith("failed-trades")) assert.ok(result.content.includes("This shows where you can find your miner fees on a blockchain explorer such as mempool.space"));
    assert.equal(readFileSync(file, "utf8"), before);
  }
});
