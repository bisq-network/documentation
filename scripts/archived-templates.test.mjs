import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import data from "../migration/archive-templates-20261014.json" with { type: "json" };
import { renderArchivedTemplates, templateDefinitionTarget } from "./lib/archived-templates.mjs";
import { renderRecoveredLinks } from "./lib/recovered-link-aliases.mjs";

test("all 18 archived definitions are available and hash-verified", () => {
  assert.equal(data.items.length, 18);
  assert.equal(data.items.filter(x => x.required_by_production).length, 14);
  for (const item of data.items) assert.equal(createHash("sha256").update(readFileSync(`public${item.source_download}`)).digest("hex"), item.wikitext_sha256);
});

test("template notices retain raw invocation and link to historic source", () => {
  const original = '<span class="wiki-template-gap" role="note"><strong>[Unresolved template: Wallet derivation paths]</strong> <code>{{Wallet derivation paths}}</code></span>';
  const result = renderArchivedTemplates(original, "/bisq-docs/");
  assert.equal(result.pending, 1);
  assert.match(result.content, /href="\/bisq-docs\/wiki-source\/archive-templates\/261\.wiki\.txt"/);
  assert.match(result.content, /inline rendering pending/);
  assert.match(result.content, /<code>{{Wallet derivation paths}}<\/code>/);
});

test("template namespace links require matching fragment-free source", () => {
  const title = "Template:MaxTradeSizeBisq1";
  const marker = `<span class="wiki-link-gap">limit <small>[unrecovered article: ${title}]</small></span>`;
  const target = templateDefinitionTarget(title);
  assert.ok(target);
  assert.match(renderRecoveredLinks(marker, "/bisq-docs/", undefined, "", `[[${title}|limit]]`).content, new RegExp(`href="/bisq-docs${target}"`));
  assert.match(renderRecoveredLinks(marker, "/", undefined, "", `[[${title}#unknown|limit]]`).content, /unresolved link/);
});
