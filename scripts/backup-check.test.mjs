import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { loadIntegration } from "./lib/documentation.mjs";

const check = JSON.parse(readFileSync("src/data/backup-check.json", "utf8"));

test("every restored article has its result from the full wiki backup", () => {
  // A restored article added later must be checked against the backup before it is listed.
  const slugs = loadIntegration().map((article) => article.slug).sort();
  const listed = [...check.matches, ...check.not_in_backup].sort();
  assert.deepEqual(listed, slugs);
  assert.equal(new Set(listed).size, listed.length, "an article is listed once");
});

test("the backup summary states what the comparison found", () => {
  assert.equal(check.backup.taken, "2026-10-19");
  assert.equal(check.backup.newer_revisions, 0);
  assert.equal(check.backup.redirect_disagreements, 0);
  assert.equal(check.backup.pages_not_restored, 0);
  assert.match(check.backup.export_sha256, /^[0-9a-f]{64}$/);
});
