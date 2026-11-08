import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const archiveItem = "https://archive.org/details/wiki-bisq.wiki-20261014";
const captureDate = "2026-10-14";
const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");

/** Verify the dated redirect and template source files without changing them. */
export function verifyArchiveSources({ read = readFileSync, list = readdirSync } = {}) {
  const load = (path) => JSON.parse(read(path, "utf8"));
  const redirects = load("migration/archive-redirects-20261014.json");
  const templates = load("migration/archive-templates-20261014.json");
  for (const data of [redirects, templates]) {
    assert.equal(data.schema_version, 1);
    assert.equal(data.capture_date, captureDate);
    assert.equal(data.archive_item, archiveItem);
    assert.ok(Array.isArray(data.items));
  }
  assert.equal(redirects.case_rule, "first-letter");
  assert.equal(redirects.items.length, 63);
  assert.equal(templates.count, 18);
  assert.equal(templates.items.length, 18);
  assert.equal(templates.required_count, 14);
  assert.equal(templates.items.filter((item) => item.required_by_production === true).length, 14);

  const verifyGroup = (items, directory) => {
    const seen = new Set();
    for (const item of items) {
      assert.match(item.page_id, /^[1-9]\d*$/);
      assert.match(item.latest_revision_id, /^[1-9]\d*$/);
      assert.match(item.latest_revision_timestamp, /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\dZ$/);
      const revisionDate = Date.parse(item.latest_revision_timestamp);
      assert.ok(Number.isFinite(revisionDate) && revisionDate < Date.parse("2026-10-15T00:00:00Z"));
      assert.equal(item.original_revision_url, `https://bisq.wiki/index.php?oldid=${item.latest_revision_id}`);
      const filename = `${item.page_id}.wiki.txt`;
      assert.equal(item.source_download, `/wiki-source/${directory}/${filename}`);
      assert.ok(!seen.has(filename), `duplicate source page: ${filename}`);
      seen.add(filename);
      assert.match(item.wikitext_sha256, /^[a-f0-9]{64}$/);
      const bytes = read(`public${item.source_download}`);
      assert.equal(sha256(bytes), item.wikitext_sha256, `source hash mismatch: ${filename}`);
      assert.ok(bytes.length, `empty source: ${filename}`);
      if (directory === "archive-redirects") {
        assert.equal(typeof item.is_pure_redirect, "boolean");
        assert.equal(item.has_substantive_trailing_body, !item.is_pure_redirect);
        assert.ok(item.source_title && item.target_title && item.raw_target);
        const directive = item.redirect_line.match(/^\s*#redirect\s*\[\[([^\]]+)\]\]/i);
        assert.ok(directive, `invalid redirect directive: ${filename}`);
        assert.equal(directive[1], item.raw_target);
        const [title, ...fragment] = item.raw_target.split("#");
        assert.equal(title.replaceAll("_", " "), item.target_title);
        assert.equal(fragment.length ? fragment.join("#") : null, item.target_fragment);
        assert.ok(bytes.toString("utf8").includes(item.redirect_line), `redirect line absent: ${filename}`);
      } else {
        assert.ok(item.title.startsWith("Template:"));
        assert.equal(item.title.slice("Template:".length).replaceAll("_", " "), item.template_normalized_name.replaceAll("_", " "));
        assert.equal(item.historical_only, true);
        assert.equal(item.complete_template_dependency_closure_verified, false);
        assert.equal(item.current_product_correctness_verified, false);
      }
    }
    assert.deepEqual(list(`public/wiki-source/${directory}`).sort(), [...seen].sort(), `unexpected ${directory} source files`);
  };
  verifyGroup(redirects.items, "archive-redirects");
  verifyGroup(templates.items, "archive-templates");
  assert.equal(redirects.items.filter((item) => item.is_pure_redirect).length, 61);
  assert.deepEqual(redirects.items.filter((item) => item.has_substantive_trailing_body).map((item) => item.source_title).sort(), ["Bitcointalk Moderator", "在中国运行Bisq (Running Bisq in China)"].sort());
  return { redirectSources: 63, templateSources: 18, requiredTemplates: 14, substantiveTails: 2 };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const result = verifyArchiveSources();
    console.log(`Archive sources verified: ${result.redirectSources} redirect records, ${result.templateSources} template definitions, ${result.substantiveTails} substantive tails.`);
  } catch (error) {
    console.error(`Archive source verification failed: ${error.message}`);
    process.exitCode = 1;
  }
}
