import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { verifyArchiveSources } from "./check-archive-sources.mjs";

/** Replace one parsed manifest in memory without modifying the checkout. */
function withModifiedManifest(path, modify) {
  return (requested, encoding) => {
    const value = readFileSync(requested, encoding);
    if (requested !== path) return value;
    const manifest = JSON.parse(value);
    modify(manifest);
    return JSON.stringify(manifest);
  };
}

test("all archived sources match their dated metadata and content hashes", () => {
  assert.deepEqual(verifyArchiveSources(), { redirectSources: 63, templateSources: 18, requiredTemplates: 14, substantiveTails: 2 });
});

test("a modified source file is rejected", () => {
  const read = (path, encoding) => path === "public/wiki-source/archive-redirects/635.wiki.txt"
    ? Buffer.from("modified source") : readFileSync(path, encoding);
  assert.throws(() => verifyArchiveSources({ read }), /source hash mismatch/);
});

test("source metadata rejects traversal, missing revisions and duplicate records", () => {
  const path = "migration/archive-templates-20261014.json";
  assert.throws(() => verifyArchiveSources({ read: withModifiedManifest(path, (data) => { data.items[0].source_download = "/wiki-source/archive-templates/../private"; }) }));
  assert.throws(() => verifyArchiveSources({ read: withModifiedManifest(path, (data) => { data.items[0].latest_revision_id = ""; }) }));
  assert.throws(() => verifyArchiveSources({ read: withModifiedManifest(path, (data) => { data.items[1] = data.items[0]; }) }));
});

test("the source inventory rejects missing or unexpected files", () => {
  const list = (path) => path.endsWith("archive-redirects") ? [...readdirSync(path), "untracked.wiki.txt"] : readdirSync(path);
  assert.throws(() => verifyArchiveSources({ list }), /unexpected archive-redirects source files/);
  const missing = (path) => path.endsWith("archive-redirects") ? readdirSync(path).slice(1) : readdirSync(path);
  assert.throws(() => verifyArchiveSources({ list: missing }), /unexpected archive-redirects source files/);
});

test("recorded redirect target and revision must agree with the source", () => {
  const path = "migration/archive-redirects-20261014.json";
  assert.throws(() => verifyArchiveSources({ read: withModifiedManifest(path, (data) => { data.items[0].target_title = "Wrong destination"; }) }));
  assert.throws(() => verifyArchiveSources({ read: withModifiedManifest(path, (data) => { data.items[0].latest_revision_timestamp = "2026-11-01T00:00:00Z"; }) }));
});
