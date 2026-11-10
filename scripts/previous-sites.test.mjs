import test from "node:test";
import assert from "node:assert/strict";
import { buildSavedWikiLinks } from "./lib/saved-wiki-links.mjs";
import { loadIntegration } from "./lib/documentation.mjs";
import { PREVIOUS_SITES } from "../src/lib/previous-sites.mjs";
import { parseSavedWikiLink, resolveSavedWikiLink } from "../src/lib/resolve-saved-wiki-link.mjs";

const map = buildSavedWikiLinks(loadIntegration());
// The site after the move: a different origin and base path than the preview.
const moved = { origin: "https://bisq-network.github.io", base: "/documentation/", previousSites: PREVIOUS_SITES };

test("preview links resolve after the site moves", () => {
  const article = resolveSavedWikiLink("https://hiciefte.github.io/bisq-docs/wiki/last-resort-restore/#import-raw-data-from-backup", map, moved);
  assert.equal(article.kind, "match");
  assert.equal(article.target, "/wiki/last-resort-restore/#import-raw-data-from-backup");
  const legacy = resolveSavedWikiLink("https://hiciefte.github.io/bisq-docs/Last_resort_restore", map, moved);
  assert.equal(legacy.kind, "match");
  assert.equal(legacy.target, "/wiki/last-resort-restore/");
});

test("current-site links keep working next to previous sites", () => {
  const result = resolveSavedWikiLink("https://bisq-network.github.io/documentation/wiki/last-resort-restore/", map, moved);
  assert.equal(result.kind, "match");
  assert.equal(result.target, "/wiki/last-resort-restore/");
});

test("previous hosts are accepted only under their base path", () => {
  assert.equal(parseSavedWikiLink("https://hiciefte.github.io/another-project/Last_resort_restore", moved), null);
  assert.equal(parseSavedWikiLink("https://hiciefte.github.io/bisq-docsx/Last_resort_restore", moved), null);
  assert.equal(parseSavedWikiLink("https://example.org/bisq-docs/Last_resort_restore", moved), null);
  assert.equal(parseSavedWikiLink("https://user:pw@hiciefte.github.io/bisq-docs/Last_resort_restore", moved), null);
  assert.equal(resolveSavedWikiLink("https://hiciefte.github.io/bisq-docs/Last_resort_restore", map, { ...moved, previousSites: [] }).kind, "invalid");
});
