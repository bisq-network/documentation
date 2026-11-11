import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import data from "../migration/archive-templates-20261014.json" with { type: "json" };
import { renderArchivedTemplates, templateDefinitionTarget } from "./lib/archived-templates.mjs";
import { renderArticle } from "./lib/render-markdown.mjs";
import { renderRecoveredLinks } from "./lib/recovered-link-aliases.mjs";

test("all 18 archived definitions are available and hash-verified", () => {
  assert.equal(data.items.length, 18);
  assert.equal(data.items.filter(x => x.required_by_production).length, 14);
  for (const item of data.items) assert.equal(createHash("sha256").update(readFileSync(`public${item.source_download}`)).digest("hex"), item.wikitext_sha256);
});

// The site renders templates on the rendered article (src/components/SourceHistory.astro).
test("template source rendering retains historical text and provenance", async () => {
  const path = "src/content/docs/wiki/backing-up-your-wallet-seed.md";
  const original = await renderArticle(readFileSync(path, "utf8"), path);
  const result = renderArchivedTemplates(original, "/bisq-docs/", "backing-up-your-wallet-seed");
  assert.equal(result.restored, 2);
  assert.match(result.content, /href="\/bisq-docs\/wiki-source\/archive-templates\/261\.wiki\.txt"/);
  assert.match(result.content, /Historical template from the 14 October 2026 archive/);
  assert.match(result.content, /m\/44&#39;\/0&#39;\/1&#39;|m\/44'\/0'\/1'/);
});

test("template namespace links require matching fragment-free source", () => {
  const title = "Template:MaxTradeSizeBisq1";
  const marker = `<span class="wiki-link-gap">limit <small>[unrecovered article: ${title}]</small></span>`;
  const target = templateDefinitionTarget(title);
  assert.ok(target);
  assert.match(renderRecoveredLinks(marker, "/bisq-docs/", undefined, "", `[[${title}|limit]]`).content, new RegExp(`href="/bisq-docs${target}"`));
  assert.match(renderRecoveredLinks(marker, "/", undefined, "", `[[${title}#unknown|limit]]`).content, /unresolved link/);
});

test("historical scalar values come directly from archived definitions", async () => {
  const { default: rendered } = await import("../migration/template-renderings-20261014.json", { with: { type: "json" } });
  const scalars = rendered.items.filter((item) => item.scalar);
  assert.equal(scalars.length, 5);
  for (const item of scalars) {
    const definition = readFileSync(`public${item.source_download}`, "utf8").trim();
    assert.equal(item.html, definition);
  }
});

test("parameterized command rendering keeps ordinary spaces and literal options", async () => {
  const { default: rendered } = await import("../migration/template-renderings-20261014.json", { with: { type: "json" } });
  const item = rendered.items.find((entry) => entry.invocation.includes("--dumpDelayedPayoutTxs=true"));
  assert.match(item.html, /start Bisq\.exe --dumpDelayedPayoutTxs=true/);
  assert.match(item.html, /\/opt\/bisq\/bin\/Bisq --dumpDelayedPayoutTxs=true/);
  assert.doesNotMatch(item.html, /\u00a0|<code[^>]*>[^<]*<code/);
});
