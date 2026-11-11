import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { renderArticle } from "./lib/render-markdown.mjs";
import { renderSectionRepairs } from "./lib/section-repairs.mjs";

// The site repairs links on the rendered article (src/components/SourceHistory.astro).
test("reviewed source link preserves its label and adds the exact target section", async () => {
  const path = "src/content/docs/wiki/cash-by-mail.md";
  const input = await renderArticle(readFileSync(path, "utf8"), path);
  const result = renderSectionRepairs(input, "cash-by-mail");
  assert.equal(result.restored, 1);
  assert.match(result.content, /href="\.\.\/arbitration\/#time-locked-delayed-payout-payout-transaction"/);
  assert.doesNotMatch(result.content, /section not recovered: Time-Locked Payout Transaction/);
});

test("a different source or unreviewed target never gains a guessed fragment", () => {
  const raw = '<a href="../arbitration/">Bisq \'donation\' address</a> <small class="wiki-link-gap">[section not recovered: Time-Locked Payout Transaction]</small>';
  assert.equal(renderSectionRepairs(raw, "some-other-page").content, raw);
  const unrelated = '<a href="../glossary/">Delivered</a> <small class="wiki-link-gap">[section not recovered: Delivered]</small>';
  const result = renderSectionRepairs(unrelated, "critical-bugs");
  assert.equal(result.content, unrelated);
  assert.equal(result.unresolved, 1);
});
