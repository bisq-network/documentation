import test from "node:test";
import assert from "node:assert/strict";
import { buildSavedWikiLinks } from "./lib/saved-wiki-links.mjs";
import { loadIntegration } from "./lib/documentation.mjs";
import { PREVIOUS_SITES } from "../src/lib/previous-sites.mjs";
import { parseSavedWikiLink, resolveSavedWikiLink } from "../src/lib/resolve-saved-wiki-link.mjs";

const map = buildSavedWikiLinks(loadIntegration());
// The site now: the original wiki's domain at the root, after the preview and github.io addresses.
const moved = { origin: "https://bisq.wiki", base: "/", previousSites: PREVIOUS_SITES };

test("preview links resolve after the site moves", () => {
  const article = resolveSavedWikiLink("https://hiciefte.github.io/bisq-docs/wiki/last-resort-restore/#import-raw-data-from-backup", map, moved);
  assert.equal(article.kind, "match");
  assert.equal(article.target, "/wiki/last-resort-restore/#import-raw-data-from-backup");
  const legacy = resolveSavedWikiLink("https://hiciefte.github.io/bisq-docs/Last_resort_restore", map, moved);
  assert.equal(legacy.kind, "match");
  assert.equal(legacy.target, "/wiki/last-resort-restore/");
});

test("current-site links keep working next to previous sites", () => {
  const result = resolveSavedWikiLink("https://bisq.wiki/wiki/last-resort-restore/", map, moved);
  assert.equal(result.kind, "match");
  assert.equal(result.target, "/wiki/last-resort-restore/");
});

test("original wiki links resolve on bisq.wiki itself", () => {
  const section = resolveSavedWikiLink("https://bisq.wiki/Last_resort_restore#Import_raw_data_from_backup", map, moved);
  assert.equal(section.kind, "match");
  assert.equal(section.target, "/wiki/last-resort-restore/#import-raw-data-from-backup");
  assert.equal(resolveSavedWikiLink("https://bisq.wiki/index.php?title=Last_resort_restore", map, moved).target, "/wiki/last-resort-restore/");
});

test("github.io/documentation links resolve after the move to bisq.wiki", () => {
  const section = resolveSavedWikiLink("https://bisq-network.github.io/documentation/wiki/last-resort-restore/#import-raw-data-from-backup", map, moved);
  assert.equal(section.kind, "match");
  assert.equal(section.target, "/wiki/last-resort-restore/#import-raw-data-from-backup");
  for (const input of [
    "https://bisq-network.github.io/documentation/Last_resort_restore",
    "http://bisq-network.github.io/documentation/wiki/last-resort-restore/",
    "bisq-network.github.io/documentation/wiki/last-resort-restore/",
    "/documentation/wiki/last-resort-restore/",
  ]) {
    const result = resolveSavedWikiLink(input, map, moved);
    assert.equal(result.kind, "match", input);
    assert.equal(result.target, "/wiki/last-resort-restore/", input);
  }
});

test("preview links pasted as http, without a scheme, as a path or with index.html resolve", () => {
  for (const input of [
    "http://hiciefte.github.io/bisq-docs/wiki/last-resort-restore/",
    "hiciefte.github.io/bisq-docs/wiki/last-resort-restore/",
    "HICIEFTE.GITHUB.IO/bisq-docs/wiki/last-resort-restore",
    "/bisq-docs/wiki/last-resort-restore/",
    "https://hiciefte.github.io/bisq-docs/wiki/last-resort-restore/index.html",
    "https://bisq-network.github.io/documentation/wiki/last-resort-restore/index.html",
  ]) {
    const result = resolveSavedWikiLink(input, map, moved);
    assert.equal(result.kind, "match", input);
    assert.equal(result.target, "/wiki/last-resort-restore/", input);
  }
  // Same-site paths outside the old base are looked up as before.
  assert.equal(resolveSavedWikiLink("/Last_resort_restore", map, moved).target, "/wiki/last-resort-restore/");
});

test("look-alike hosts are not treated as previous sites", () => {
  assert.equal(parseSavedWikiLink("http://hiciefte.github.io/another-project/Last_resort_restore", moved), null);
  assert.equal(parseSavedWikiLink("http://hiciefte.github.io.evil.example/bisq-docs/Last_resort_restore", moved), null);
  const pasted = parseSavedWikiLink("hiciefte.github.io.evil.example/bisq-docs/Last_resort_restore", moved);
  assert.equal(pasted.path, "hiciefte.github.io.evil.example/bisq-docs/Last_resort_restore");
  assert.notEqual(resolveSavedWikiLink("hiciefte.github.io.evil.example/bisq-docs/Last_resort_restore", map, moved).kind, "match");
});

test("previous hosts are accepted only under their base path", () => {
  assert.equal(parseSavedWikiLink("https://hiciefte.github.io/another-project/Last_resort_restore", moved), null);
  assert.equal(parseSavedWikiLink("https://hiciefte.github.io/bisq-docsx/Last_resort_restore", moved), null);
  assert.equal(parseSavedWikiLink("https://example.org/bisq-docs/Last_resort_restore", moved), null);
  assert.equal(parseSavedWikiLink("https://user:pw@hiciefte.github.io/bisq-docs/Last_resort_restore", moved), null);
  assert.equal(parseSavedWikiLink("https://bisq-network.github.io/another-project/Last_resort_restore", moved), null);
  assert.equal(parseSavedWikiLink("https://bisq-network.github.io/documentationx/Last_resort_restore", moved), null);
  assert.notEqual(resolveSavedWikiLink("bisq-network.github.io.evil.example/documentation/Last_resort_restore", map, moved).kind, "match");
  assert.equal(resolveSavedWikiLink("https://hiciefte.github.io/bisq-docs/Last_resort_restore", map, { ...moved, previousSites: [] }).kind, "invalid");
});
