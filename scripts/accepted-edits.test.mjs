import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { acceptedEditsPath, describeEdit, undoAcceptedEdit } from "./lib/accepted-edits.mjs";
import { awaitingLine, verify } from "./check-source-fidelity.mjs";

// All edits below exist only in memory; verify() reads them through overrides.
const hash = (value) => createHash("sha256").update(value).digest("hex");
const path = "src/content/docs/wiki/trading-monero.md";
const restorePath = "src/content/docs/wiki/last-resort-restore.md";
// The restored text of the two sample articles, checked against the manifest
// below, so these tests also run on a branch that proposes wording for them.
const restoredFiles = new Map([path, restorePath].map((file) => [file, readFileSync(`scripts/fixtures/restored/${file.split("/").pop()}`, "utf8")]));
const sampleSlugs = new Set(["trading-monero", "last-resort-restore"]);
const original = restoredFiles.get(path);
const restore = restoredFiles.get(restorePath);
const committed = JSON.parse(readFileSync(acceptedEditsPath, "utf8"));
// Articles this branch changes without a receipt (a wording proposal under review).
// The tests ignore their findings; the check and receipts jobs judge them.
// If verify() cannot run at all (say, an additional article drifted), each test reports that error itself.
const branchPending = await verify().then((result) => result.unreceipted.map((item) => item.path).filter((file) => !restoredFiles.has(file)), () => []);
const baseFrom = (files) => async (file) => (files.has(file) ? Buffer.from(files.get(file)) : undefined);
const withBase = { readBase: baseFrom(restoredFiles) };
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

/** Verify with the sample articles restored, the given files and receipts, and committed receipts for other articles. */
async function run(files, items, required = 2, options = {}) {
  const receipts = JSON.stringify({ ...committed, required_approvals: required, items: [...committed.items.filter((item) => !sampleSlugs.has(item.slug)), ...items] });
  const result = await verify(new Map([...restoredFiles, ...Object.entries(files), [acceptedEditsPath, receipts]]), options);
  const ours = (file) => !branchPending.includes(file);
  return { ...result, failures: result.failures.filter((failure) => ours(failure.slice(0, failure.indexOf(":")))), awaiting: result.awaiting.filter((item) => ours(item.path)) };
}

/** The single expected finding, so unrelated noise also fails the test. */
function onlyFinding(result, pattern) {
  assert.equal(result.failures.length, 1, result.failures.join("\n"));
  assert.match(result.failures[0], pattern);
}

test("the sample articles are the restored originals", () => {
  const manifest = JSON.parse(readFileSync("migration/restoration-fidelity.json", "utf8")).items;
  const formatting = JSON.parse(readFileSync("migration/source-formatting.json", "utf8")).items;
  for (const [file, text] of restoredFiles) {
    const slug = file.split("/").pop().replace(/\.md$/, "");
    const baseline = formatting.find((record) => record.slug === slug)?.formatted_file_sha256 ?? manifest.find((item) => item.slug === slug).restored_file_sha256;
    assert.equal(hash(text), baseline, `scripts/fixtures/restored/${slug}.md is not the restored ${slug}.md`);
  }
});

// On a wording branch the strict gate also lists each article changed without a
// receipt; that is the only finding it may add. Whether such an edit is otherwise
// acceptable is decided by the gate in the check job, against the base articles.
test("the committed receipts file and articles pass, apart from wording that awaits a receipt", async () => {
  const result = await verify();
  const pending = new Set(result.unreceipted.map((item) => item.path));
  assert.deepEqual(result.failures.filter((failure) => !pending.has(failure.slice(0, failure.indexOf(":")))), []);
  assert.deepEqual(result.awaiting, []);
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

test("with its base, an edit a receipt could accept awaits a receipt instead of failing", async () => {
  const result = await run({ [path]: reworded }, [], 2, withBase);
  assert.deepEqual(result.failures, []);
  assert.deepEqual(result.awaiting.map(({ slug, path: file }) => [slug, file]), [["trading-monero", path]]);
  assert.deepEqual(result.unreceipted.map((item) => item.slug).filter((slug) => sampleSlugs.has(slug)), ["trading-monero"]);
  // An edit after an accepted edit compares with the accepted file.
  const later = reworded.replace("0.125 BTC", "0.126 BTC");
  const accepted = { readBase: baseFrom(new Map([[path, reworded]])) };
  assert.deepEqual((await run({ [path]: later }, [receipt(original, reworded)], 2, accepted)).awaiting.map((item) => item.slug), ["trading-monero"]);
  onlyFinding(await run({ [path]: later }, [receipt(original, reworded)], 2, withBase), /changed after its accepted edit \(PR #46\) .* its base file is sha256 .*, not the last accepted edit/);
  // Without the right base file there is nothing to compare with, so it fails.
  onlyFinding(await run({ [path]: reworded }, [], 2, { readBase: baseFrom(new Map()) }), /Trading Monero changed since restoration .*cannot be checked as awaiting a receipt: there is no base file/);
  onlyFinding(await run({ [path]: reworded }, [], 2, { readBase: baseFrom(new Map([[path, reworded]])) }), /its base file is sha256 .*, not the restored article/);
});

test("without a receipt, everything else a receipt would require still fails", async () => {
  // The figure link and the image both point to the other asset.
  const relinked = original.replace('<a href="../../media/wiki/4cf4058b304d93bc429a0e4aa49656339f02fb3f5d8604a7ba0deff1485d5db6.png"', '<a href="../../media/wiki/b97e0b293eaaa15e84b399dbe9a4a279010caccbd25ab133c323b0a21aef4d08.png"');
  const swapped = original.replaceAll("4cf4058b304d93bc429a0e4aa49656339f02fb3f5d8604a7ba0deff1485d5db6", "b97e0b293eaaa15e84b399dbe9a4a279010caccbd25ab133c323b0a21aef4d08");
  for (const [edited, pattern] of [
    [original.replace('<h3 id="settings"> Settings </h3>', '<h3 id="preferences"> Settings </h3>'), /The edit awaiting a receipt changes heading 8/],
    [original.replace('<h3 id="settings"> Settings </h3>', '<h3 id="settings"> Preferences </h3>'), /The edit awaiting a receipt changes heading 8/],
    [original.replace('<span class="wiki-legacy-anchor" id="Settings" aria-hidden="true"></span>', ""), /The edit awaiting a receipt removes anchor #Settings/],
    [swapped, /The edit awaiting a receipt changes the figure source-image-2 or the link that opens it/],
    [original.replace('src="../../media/wiki/4cf4058b304d93bc429a0e4aa49656339f02fb3f5d8604a7ba0deff1485d5db6.png"', 'src="../../media/wiki/b97e0b293eaaa15e84b399dbe9a4a279010caccbd25ab133c323b0a21aef4d08.png"'), /The edit awaiting a receipt changes the image source-image-2; only alt text may change/],
    [relinked, /The edit awaiting a receipt changes the figure source-image-2 or the link that opens it/],
    [original.replace('<img alt="XMR auto confirm" decoding="async" height="318"', '<img alt="Historical XMR auto-confirm settings" decoding="async" height="300"'), /The edit awaiting a receipt changes the image source-image-1; only alt text may change/],
    [original.replace('title: "Trading Monero"', 'title: "Trading XMR"'), /The edit awaiting a receipt changes text outside the article body/],
    [original.replace("(default: 1 BTC)", '(default: 1 BTC) <span hidden>hidden</span>'), /The edit awaiting a receipt adds or removes <\/?span/],
    [original.replace("(default: 1 BTC)", '(default: 1 BTC) <a href="javascript:alert(1)">x</a>'), /adds or removes <a href="javascript:/],
    [original.replace("(default: 1 BTC)", "(default: 1 BTC)<!-- hidden -->"), /adds or removes an HTML comment/],
  ]) {
    assert.notEqual(edited, original);
    onlyFinding(await run({ [path]: edited }, [], 2, withBase), pattern);
  }
  for (const edited of [
    restore.replace("btc_mainnet/tor/hiddenservice", "btc_mainnet/tor"),
    restore.replace("Start Bisq again: it should start", "Do not Start Bisq again: it should start"),
  ]) {
    onlyFinding(await run({ [restorePath]: edited }, [], 2, withBase), /last-resort-restore\.md: (?:lost recovery safeguard|The edit awaiting a receipt changes the text around the recovery safeguard)/);
  }
});

test("without a receipt, an alt-text-only change awaits a receipt that lists the figure", async () => {
  const alt = original.replace('<img alt="XMR auto confirm"', '<img alt="Historical XMR auto-confirm settings"')
    .replace('alt="The XMR seller can choose to enter this information, or not."', 'alt="The XMR seller may enter this information."');
  const result = await run({ [path]: alt }, [], 2, withBase);
  assert.deepEqual(result.failures, []);
  assert.deepEqual(result.awaiting.map(({ slug, changedImageAltText }) => [slug, changedImageAltText]), [["trading-monero", ["source-image-1", "source-image-2"]]]);
  assert.equal(awaitingLine(result.awaiting[0]), "trading-monero: alt text of source-image-1, source-image-2 changed; its receipt must list them in changed_image_alt_text");
  assert.equal(awaitingLine({ slug: "reputation", changedImageAltText: ["source-image-4"] }), "reputation: alt text of source-image-4 changed; its receipt must list it in changed_image_alt_text");
  assert.equal(awaitingLine((await run({ [path]: reworded }, [], 2, withBase)).awaiting[0]), "trading-monero");
  // The strict gate still fails it, and so does a receipt that does not list the figure.
  onlyFinding(await run({ [path]: alt }, []), /Trading Monero changed since restoration/);
  onlyFinding(await run({ [path]: alt }, [receipt(original, alt, { changed_image_alt_text: ["source-image-1"] })]), /PR #46 changes the image source-image-2; only alt text may change/);
});

test("without a receipt, raw sources, restoration hashes and snapshots stay exact", async () => {
  const rawPath = "public/wiki-source/trading-monero.wiki.txt";
  onlyFinding(await run({ [rawPath]: `${readFileSync(rawPath, "utf8")}\nchanged` }, [], 2, withBase), /^public\/wiki-source\/trading-monero\.wiki\.txt: immutable raw wikitext drift/);
  // Refreshing the restored hashes to the edited file does not make it an original.
  const formatting = JSON.parse(readFileSync("migration/source-formatting.json", "utf8"));
  const rehashed = { ...formatting, items: formatting.items.map((record) => (record.slug === "trading-monero" ? { ...record, formatted_file_sha256: hash(reworded) } : record)) };
  onlyFinding(await run({ [path]: reworded, "migration/source-formatting.json": JSON.stringify(rehashed) }, [], 2, withBase), /trading-monero\.md: (?:recorded line break moved|source formatting no longer reconstructs the original bytes)/);
  const manifest = JSON.parse(readFileSync("migration/restoration-fidelity.json", "utf8"));
  const restoreEdit = restore.replace("(presumably the last day your Bisq was operational)", "(probably the last day your Bisq was operational)");
  const refreshed = { ...manifest, items: manifest.items.map((item) => (item.slug === "last-resort-restore" ? { ...item, restored_file_sha256: hash(restoreEdit) } : item)) };
  onlyFinding(await run({ [restorePath]: restoreEdit, "migration/restoration-fidelity.json": JSON.stringify(refreshed) }, [], 2, withBase), /last-resort-restore\.md: original author body drift/);
  const snapshot = JSON.parse(readFileSync("review/ai-edited/snapshot.json", "utf8"));
  const guide = `review/ai-edited/${Object.keys(snapshot.files).find((file) => file.startsWith("guides/"))}`;
  onlyFinding(await run({ [guide]: "changed immutable AI draft" }, [], 2, withBase), /immutable AI-review snapshot drift/);
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
  const relinked = original.replace('<a href="../../media/wiki/4cf4058b304d93bc429a0e4aa49656339f02fb3f5d8604a7ba0deff1485d5db6.png"', '<a href="../../media/wiki/b97e0b293eaaa15e84b399dbe9a4a279010caccbd25ab133c323b0a21aef4d08.png"');
  assert.notEqual(relinked, original);
  onlyFinding(await run({ [path]: relinked }, [receipt(original, relinked, { changed_image_alt_text: [] })]), /PR #46 changes the figure source-image-2 or the link that opens it/);
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

test("an accepted edit cannot add, hide or run content through markup", async () => {
  const inject = (markup) => original.replace("(default: 1 BTC)", `(default: 1 BTC)${markup}`);
  for (const [markup, pattern] of [
    [' <IMG SRC="https://example.org/x.png">', /adds or removes <IMG SRC=/],
    [" <span hidden>hidden</span>", /adds or removes <\/?span/],
    ["<style>img { display: none }</style>", /adds or removes <\/?style>/],
    ["<script>alert(1)</script>", /adds or removes <\/?script>/],
    [' <strong style="display: none">x</strong>', /adds or removes <strong style=/],
    [' <a href="javascript:alert(1)">x</a>', /adds or removes <a href="javascript:/],
    [" <s>struck</s>", /adds or removes <\/?s>/],
    ["<!-- hidden -->", /adds or removes an HTML comment/],
    ["\n\n## Injected heading\n\n", /adds or removes a blank line/],
  ]) {
    const edited = inject(markup);
    onlyFinding(await run({ [path]: edited }, [receipt(original, edited)]), pattern);
  }
  const plain = inject(' <strong>Note:</strong> see <a href="https://github.com/bisq-network/bisq" rel="noopener">the source</a>.');
  assert.deepEqual((await run({ [path]: plain }, [receipt(original, plain)])).failures, []);
});

test("a receipt names a pull request of this repository, a real date and no endorsement", async () => {
  for (const [fields, pattern] of [
    [{ pull_request: "https://github.com/someone/fork/pull/1" }, /pull request URL of this repository/],
    [{ summary: "Verified by Bisq support." }, /not call it verified, official or approved/],
    [{ accepted_on: "2026-02-31" }, /accepted_on must be a real YYYY-MM-DD date/],
  ]) {
    const result = await run({ [path]: reworded }, [receipt(original, reworded, fields)]);
    assert.ok(result.failures.some((failure) => pattern.test(failure)), result.failures.join("\n"));
  }
});

test("an accepted edit may not change the words around a recovery safeguard", async () => {
  for (const edited of [
    restore.replace("Start Bisq again: it should start", "Do not Start Bisq again: it should start"),
    restore.replace("after deleting the fresh one you created", "after deleting the fresh one you created (not reversible in practice)"),
  ]) {
    assert.notEqual(edited, restore);
    const item = { ...receipt(restore, edited), slug: "last-resort-restore", note_ids: [] };
    onlyFinding(await run({ [restorePath]: edited }, [item]), /changes the text around the recovery safeguard/);
  }
});
