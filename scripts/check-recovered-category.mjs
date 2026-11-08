import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

/** Verify the original category text, bounded member evidence and source hashes. */
export function verifyRecoveredCategory(read = readFileSync) {
  const record = JSON.parse(read("migration/recovered-category-teams-20261014.json", "utf8"));
  assert.equal(record.schema_version, 1);
  assert.equal(record.capture_date, "2026-10-14");
  assert.equal(record.archive_item, "https://archive.org/details/wiki-bisq.wiki-20261014");
  assert.equal(record.categories.length, 2);
  const expected = new Map([["Category:Teams", ["11", "1190", "b38669e319519f70d5cb1df261f368278d83017b75dd4099b906e79005231c98"]], ["Category:Roles", ["13", "1191", "1c94838fd3622970f0d4024a51a85bb20cd6a345acf489b036eca2620a9cd6ae"]]]);
  for (const item of record.categories) {
    const data = expected.get(item.title);
    assert.ok(data, `unexpected category: ${item.title}`);
    assert.equal(item.page_id, data[0]); assert.equal(item.latest_revision_id, data[1]); assert.equal(item.wikitext_sha256, data[2]);
    assert.equal(item.original_revision_url, `https://bisq.wiki/index.php?oldid=${data[1]}`);
    assert.equal(item.source_download, `/wiki-source/archive-categories/${data[0]}.wiki.txt`);
    assert.equal(createHash("sha256").update(read(`public${item.source_download}`)).digest("hex"), data[2]);
    expected.delete(item.title);
  }
  assert.equal(expected.size, 0);
  const raw = read("public/wiki-source/archive-categories/11.wiki.txt", "utf8");
  assert.match(raw, /\[\[Category:DAO\]\]\s*$/);
  const body = raw.replace(/\n*\[\[Category:DAO\]\]\s*$/, "").trim();
  const landing = read("src/content/docs/categories/teams.md", "utf8");
  const actual = landing.match(/<!-- recovered-category-source-start -->\s*([\s\S]*?)\s*<!-- recovered-category-source-end -->/)?.[1];
  assert.equal(actual, body, "category source prose changed");
  assert.match(read("public/wiki-source/archive-categories/13.wiki.txt", "utf8"), /\[\[Category:Teams\]\]\s*$/);
  const members = [["Dev Team", "dev-team"], ["Growth Team", "growth-team"], ["Ops Team", "ops-team"], ["Security Team", "security-team"], ["Support Team", "support-team"]];
  assert.equal(record.members.length, members.length);
  for (const [title, slug] of members) {
    const item = record.members.find((entry) => entry.title === title && entry.slug === slug);
    assert.ok(item, `missing member: ${title}`);
    assert.equal(item.route, `/wiki/${slug}/`);
    const bytes = read(`public/wiki-source/${slug}.wiki.txt`);
    assert.equal(createHash("sha256").update(bytes).digest("hex"), item.source_sha256);
    assert.ok(bytes.toString("utf8").split("\n")[item.source_line - 1].includes("[[Category:Teams]]"));
    assert.ok(landing.includes(`[${title}](../../wiki/${slug}/)`));
  }
  assert.match(landing, /not a complete historical membership list/);
  assert.match(landing, /archive-categories\/13\.wiki\.txt/);
  return { categories: 2, members: 5 };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { const result = verifyRecoveredCategory(); console.log(`Checked ${result.categories} archived category sources and ${result.members} bounded members.`); }
  catch (error) { console.error(`Recovered category check failed: ${error.message}`); process.exitCode = 1; }
}
