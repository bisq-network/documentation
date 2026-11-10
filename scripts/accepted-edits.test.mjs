import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { acceptedEditsPath, describeEdit, undoAcceptedEdit } from "./lib/accepted-edits.mjs";
import { verify } from "./check-source-fidelity.mjs";

// All edits below exist only in memory; verify() reads them through overrides.
const hash = (value) => createHash("sha256").update(value).digest("hex");
const path = "src/content/docs/wiki/trading-monero.md";
const original = readFileSync(path, "utf8");
const committed = JSON.parse(readFileSync(acceptedEditsPath, "utf8"));
const reworded = original
  .replace("&lt;TXKEY ADDRESS&gt;", "&lt;TXKEY&gt; &lt;ADDRESS&gt;")
  .replace("(default: 1 BTC)", "(Bisq 1 v1.10.11 default: 0.125 BTC)");

function receipt(base, edited, fields = {}) {
  return {
    slug: "trading-monero",
    pull_request: "https://github.com/hiciefte/bisq-docs/pull/46",
    summary: "Correct the XMR auto-confirm ceiling and the check_tx_key placeholders.",
    author: "contributor-a",
    based_on_file_sha256: hash(base),
    accepted_file_sha256: hash(edited),
    accepted_on: "2026-11-10",
    approvals: [{ login: "maintainer-a", role: "maintainer" }, { login: "reviewer-b", role: "support agent" }],
    note_ids: ["xmr-auto-confirm-defaults"],
    evidence: ["https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/user/AutoConfirmSettings.java#L49-L65"],
    changed_image_alt_text: [],
    changes: describeEdit(base, edited),
    ...fields,
  };
}

function run(files, items, required = 2) {
  const receipts = JSON.stringify({ ...committed, required_approvals: required, items });
  return verify(new Map([...Object.entries(files), [acceptedEditsPath, receipts]]));
}

/** The single expected finding, so unrelated noise also fails the test. */
function onlyFinding(result, pattern) {
  assert.equal(result.failures.length, 1, result.failures.join("\n"));
  assert.match(result.failures[0], pattern);
}

test("the committed receipts file and articles pass", async () => {
  assert.deepEqual((await verify()).failures, []);
});

test("an edit with a matching, approved receipt passes and the original is rebuilt", async () => {
  const result = await run({ [path]: reworded }, [receipt(original, reworded)]);
  assert.deepEqual(result.failures, []);
  assert.equal(result.acceptedCount, 1);
  assert.equal(undoAcceptedEdit(reworded, receipt(original, reworded)), original);
});

test("an edit without a receipt fails once, naming the article and the reason", async () => {
  onlyFinding(await run({ [path]: reworded }, []), /^src\/content\/docs\/wiki\/trading-monero\.md: Trading Monero changed since restoration .*no receipt in migration\/accepted-edits\.json covers it/);
});

test("any change after the receipt fails", async () => {
  const later = reworded.replace("0.125 BTC", "0.126 BTC");
  onlyFinding(await run({ [path]: later }, [receipt(original, reworded)]), /trading-monero\.md: file changed after its accepted edit: .*PR #46 accepted/);
});

test("a receipt for the wrong base fails", async () => {
  // A realistic mistake: the hash of the original before the recorded line-break formatting.
  const preFormatting = JSON.parse(readFileSync("migration/restoration-fidelity.json", "utf8")).items.find((item) => item.slug === "trading-monero").restored_file_sha256;
  onlyFinding(await run({ [path]: reworded }, [receipt(original, reworded, { based_on_file_sha256: preFormatting })]), /PR #46 receipt is based on sha256 .*, but the restored baseline of this article \(original plus recorded line-break formatting\) is/);
  const wrongText = receipt(original, reworded);
  wrongText.changes[0] = { ...wrongText.changes[0], original: "&lt;TXKEY ADRESS&gt;" };
  onlyFinding(await run({ [path]: reworded }, [wrongText]), /PR #46 recorded changes do not rebuild the file it was based on/);
});

test("too few approvals, self-approval or an @-mention invalidate the receipt", async () => {
  const one = receipt(original, reworded, { approvals: [{ login: "maintainer-a", role: "maintainer" }] });
  const result = await run({ [path]: reworded }, [one]);
  assert.equal(result.failures.length, 2, result.failures.join("\n"));
  assert.match(result.failures.join("\n"), /accepted-edits\.json: receipt 1 \(trading-monero, PR #46\): 1 recorded approval; required_approvals is 2/);
  assert.match(result.failures.join("\n"), /trading-monero\.md: Trading Monero changed since restoration/);
  assert.deepEqual((await run({ [path]: reworded }, [one], 1)).failures, []);
  const self = receipt(original, reworded, { approvals: [{ login: "Contributor-A", role: "author" }, { login: "maintainer-a", role: "maintainer" }] });
  assert.match((await run({ [path]: reworded }, [self])).failures.join("\n"), /the pull request author cannot count as an approval/);
  const mention = receipt(original, reworded, { approvals: [{ login: "@maintainer-a", role: "maintainer" }, { login: "reviewer-b", role: "support" }] });
  assert.match((await run({ [path]: reworded }, [mention])).failures.join("\n"), /must be a plain GitHub login \(no @\)/);
  assert.match((await run({}, [], 0)).failures.join("\n"), /required_approvals must be a whole number of at least 1/);
});

test("changing or removing an anchor fails even with a receipt", async () => {
  const renamed = original.replace('<h3 id="settings"> Settings </h3>', '<h3 id="preferences"> Settings </h3>');
  onlyFinding(await run({ [path]: renamed }, [receipt(original, renamed)]), /PR #46 changes heading 8 \(<h3 id="settings"> Settings <\/h3> became <h3 id="preferences"> Settings <\/h3>\)/);
  const unanchored = original.replace('<span class="wiki-legacy-anchor" id="Settings" aria-hidden="true"></span>', "");
  onlyFinding(await run({ [path]: unanchored }, [receipt(original, unanchored)]), /PR #46 removes anchor #Settings; section URLs and saved links would break/);
  const codeId = original.replace('<code class="wiki-source-code" id="source-code-6">', "<code>");
  onlyFinding(await run({ [path]: codeId }, [receipt(original, codeId)]), /removes anchor #source-code-6/);
});

test("image changes need an explicit alt-text record and never swap the asset", async () => {
  const alt = original.replace('<img alt="XMR auto confirm"', '<img alt="Historical XMR auto-confirm settings"');
  onlyFinding(await run({ [path]: alt }, [receipt(original, alt)]), /PR #46 changes the image source-image-1; only alt text may change/);
  assert.deepEqual((await run({ [path]: alt }, [receipt(original, alt, { changed_image_alt_text: ["source-image-1"] })])).failures, []);
  onlyFinding(await run({ [path]: reworded }, [receipt(original, reworded, { changed_image_alt_text: ["source-image-2"] })]), /lists an alt-text change for source-image-2, but that image is unchanged/);
  const resized = original.replace('height="318"', 'height="300"');
  onlyFinding(await run({ [path]: resized }, [receipt(original, resized, { changed_image_alt_text: ["source-image-1"] })]), /changes the image source-image-1/);
});

test("front matter, title and contents list stay outside an accepted edit", async () => {
  const retitled = original.replace('title: "Trading Monero"', 'title: "Trading XMR"');
  onlyFinding(await run({ [path]: retitled }, [receipt(original, retitled)]), /PR #46 changes text outside the article body/);
});

test("later receipts chain on the earlier accepted file", async () => {
  const second = reworded.replace("Number of required confirmations (default: 5)", "Number of required confirmations (Bisq 1 v1.10.11 default: 5)");
  const first = receipt(original, reworded);
  const next = receipt(reworded, second, { pull_request: "https://github.com/hiciefte/bisq-docs/pull/99" });
  assert.deepEqual((await run({ [path]: second }, [first, next])).failures, []);
  onlyFinding(await run({ [path]: second }, [next, first]), /PR #99 receipt is based on sha256 .*restored baseline of this article/);
  onlyFinding(await run({}, [first]), /Trading Monero is unchanged since restoration, but PR #46 has a receipt/);
});

test("the recovery safeguards still apply to an accepted edit", async () => {
  const restorePath = "src/content/docs/wiki/last-resort-restore.md";
  const restore = readFileSync(restorePath, "utf8");
  const weakened = restore.replace("btc_mainnet/tor/hiddenservice", "btc_mainnet/tor");
  const item = { ...receipt(restore, weakened), slug: "last-resort-restore", note_ids: [] };
  onlyFinding(await run({ [restorePath]: weakened }, [item]), /last-resort-restore\.md: lost recovery safeguard: btc_mainnet\/tor\/hiddenservice/);
});

test("describeEdit records readable whole-word changes that undo exactly", () => {
  const changes = describeEdit(original, reworded);
  assert.deepEqual(changes.map(({ original: before, accepted }) => [before, accepted]), [
    ["&lt;TXKEY ADDRESS&gt;", "&lt;TXKEY&gt; &lt;ADDRESS&gt;"],
    ["(default: 1", "(Bisq 1 v1.10.11 default: 0.125"],
  ]);
  const shifted = changes.map((change) => ({ ...change, column: change.column + 1 }));
  assert.throws(() => undoAcceptedEdit(reworded, { pull_request: "https://github.com/a/b/pull/1", accepted_file_sha256: hash(reworded), based_on_file_sha256: hash(original), changes: shifted }), /PR #1 change 1 does not match the file/);
});
