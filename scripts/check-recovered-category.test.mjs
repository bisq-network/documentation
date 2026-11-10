import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { verifyRecoveredCategory } from "./check-recovered-category.mjs";
import { buildSavedWikiLinks } from "./lib/saved-wiki-links.mjs";
import { loadIntegration } from "./lib/documentation.mjs";
import { resolveSavedWikiLink } from "../src/lib/resolve-saved-wiki-link.mjs";
import { renderRecoveredLinks } from "./lib/recovered-link-aliases.mjs";

const options = { origin: "https://local.invalid", base: "/bisq-docs/" };
test("category source and five explicit memberships match the snapshot", () => {
  assert.deepEqual(verifyRecoveredCategory(), { categories: 2, members: 5 });
});

test("category prose and membership tampering fail closed", () => {
  const read = (path, encoding) => {
    const data = readFileSync(path, encoding);
    if (path === "src/content/docs/categories/teams.md") return data.replace("Contributors can have many roles", "Contributors have one role");
    return data;
  };
  assert.throws(() => verifyRecoveredCategory(read), /category source prose changed/);
});

test("saved wiki category link resolves at the project base", () => {
  const result = resolveSavedWikiLink("https://bisq.wiki/Category:Teams", buildSavedWikiLinks(loadIntegration()), options);
  assert.equal(result.kind, "match"); assert.equal(result.target, "/categories/teams/");
  assert.equal(resolveSavedWikiLink("Category:Teams", buildSavedWikiLinks(loadIntegration()), options).target, result.target);
});

test("only the verified Project management category marker is repaired", () => {
  const marker = '<span class="wiki-link-gap">teams <small>[unrecovered article: :Category:Teams]</small></span>';
  const source = readFileSync("public/wiki-source/project-management.wiki.txt", "utf8");
  assert.match(renderRecoveredLinks(marker, "/bisq-docs/", undefined, "project-management", source).content, /href="\/bisq-docs\/categories\/teams\/">teams/);
  assert.match(renderRecoveredLinks(marker, "/", undefined, "wrong-page", source).content, /unresolved link/);
});
