import { verifyAdditionalArticles } from "./lib/additional-articles.mjs";
import { acceptedEditsPath, parseAcceptedEdits, pullRequestLabel, undoAcceptedEdit } from "./lib/accepted-edits.mjs";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import { dirname, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

// This checks the source restoration, not whether historical advice is current.
// Its trusted baselines are the committed manifests; no external scratch files,
// network requests, Git checkout, package installation, or build are required.
// A human-approved wording change is accepted only through a receipt in
// migration/accepted-edits.json: the receipt's recorded original text must
// rebuild the preserved original exactly, which is then checked as before.
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = "migration/restoration-fidelity.json";
const snapshotPath = "review/ai-edited/snapshot.json";
const formattingPath = "migration/source-formatting.json";
const hash = (value) => createHash("sha256").update(value).digest("hex");
const short = (digest) => `${digest.slice(0, 12)}…`;
const escapeHtml = (value) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;")
  .replaceAll("'", "&#x27;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const decodeHtml = (value) => value.replace(/&(#x[\da-f]+|#\d+|amp|lt|gt|quot|apos);/gi, (whole, entity) => {
  if (entity.startsWith("#")) {
    const hexadecimal = entity[1].toLowerCase() === "x";
    return String.fromCodePoint(parseInt(entity.slice(hexadecimal ? 2 : 1), hexadecimal ? 16 : 10));
  }
  return { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'" }[entity.toLowerCase()] ?? whole;
});
const authorText = (body) => decodeHtml(body.replace(/<[^>]*>/g, ""));

function articleBody(text) {
  const marker = '<div class="wiki-recovered-article"';
  const start = text.indexOf(marker);
  assert(start >= 0, "missing original article container");
  assert.equal(text.indexOf(marker, start + marker.length), -1, "duplicate article container");
  let depth = 0;
  for (const match of text.slice(start).matchAll(/<\/?div\b[^>]*>/g)) {
    depth += match[0].startsWith("</") ? -1 : 1;
    if (depth === 0) return text.slice(start, start + match.index + match[0].length);
  }
  throw new Error("unclosed original article container");
}

function restoreRecordedFormatting(text, record) {
  if (!record) return text;
  assert.equal(hash(text), record.formatted_file_sha256, "formatted source file drift");
  const offsets = record.decoded_newline_offsets;
  assert(Array.isArray(offsets), "missing exact formatting offsets");
  assert.equal(offsets.length, record.decoded_newline_entities, "recorded line-break count changed");
  assert.deepEqual(offsets, [...new Set(offsets)].sort((a, b) => a - b), "formatting offsets must be unique and ordered");
  let restored = text;
  for (const offset of [...offsets].reverse()) {
    assert(Number.isSafeInteger(offset) && offset >= 0 && offset < text.length, "invalid formatting offset");
    assert.equal(restored[offset], "\n", "recorded line break moved");
    restored = restored.slice(0, offset) + "&#10;" + restored.slice(offset + 1);
  }
  assert.equal(hash(restored), record.original_file_sha256, "source formatting no longer reconstructs the original bytes");
  return restored;
}

function normalizeRecordedAnchors(body, anchors) {
  let normalized = body;
  for (const anchor of anchors) {
    const exact = `<span class="wiki-legacy-anchor" id="${escapeHtml(anchor.legacy_id)}" aria-hidden="true"></span>`;
    assert.equal(anchor.exact_added_span, exact, "anchor record must describe an empty metadata span");
    const position = normalized.indexOf(exact);
    assert(position >= 0, `missing recorded legacy anchor ${anchor.legacy_id}`);
    assert.equal(normalized.indexOf(exact, position + exact.length), -1, `duplicate legacy anchor ${anchor.legacy_id}`);
    const following = normalized.slice(position + exact.length);
    const heading = following.match(/^<h[2-6]\b[^>]*\bid="([^"]+)"[^>]*>/);
    assert.equal(decodeHtml(heading?.[1] ?? ""), anchor.stable_id, `legacy anchor ${anchor.legacy_id} moved away from its heading`);
    normalized = normalized.slice(0, position) + following;
  }
  // No generic tag removal, whitespace normalization or entity decoding here.
  return normalized;
}

/** Split a source file into its article body and everything around it. */
function splitArticle(text) {
  const body = articleBody(text);
  const start = text.indexOf(body);
  return { body, outside: `${text.slice(0, start)}\0${text.slice(start + body.length)}` };
}
const idsOf = (body) => [...body.matchAll(/\bid="([^"]+)"/g)].map((match) => decodeHtml(match[1]));
const clip = (value) => (value.length > 90 ? `${value.slice(0, 90)}…` : value);

/**
 * An accepted edit may change article wording only. Compare the edited file
 * with the exact file it was based on: everything outside the article body,
 * the container, headings, existing IDs, recorded legacy anchors and images
 * stay as they were. An image's alt text may change only when the receipt
 * lists that figure in changed_image_alt_text.
 */
function checkAcceptedStructure(base, edited, item, receipt) {
  const pr = pullRequestLabel(receipt.pull_request);
  const before = splitArticle(base);
  const after = splitArticle(edited);
  assert(before.outside === after.outside, `${pr} changes text outside the article body (front matter, title, contents list or wrapper)`);
  assert(after.body.match(/^<div\b[^>]*>/)[0] === before.body.match(/^<div\b[^>]*>/)[0], `${pr} changes the article container`);
  const headings = (body) => [...body.matchAll(/<h([2-6])\b[^>]*>[\s\S]*?<\/h\1>/g)].map((match) => match[0]);
  const [oldHeadings, newHeadings] = [headings(before.body), headings(after.body)];
  const changed = [...oldHeadings, ...newHeadings].findIndex((_, index) => oldHeadings[index] !== newHeadings[index]);
  assert(changed < 0, `${pr} changes heading ${changed + 1} (${clip(oldHeadings[changed] ?? "none")} became ${clip(newHeadings[changed] ?? "nothing")}); heading level, id and text must stay as restored`);
  const ids = idsOf(after.body);
  assert.equal(ids.length, new Set(ids).size, `${pr} creates duplicate IDs in the article`);
  const lost = idsOf(before.body).filter((id) => !ids.includes(id));
  assert(!lost.length, `${pr} removes anchor #${lost[0]}${lost.length > 1 ? ` and ${lost.length - 1} more` : ""}; section URLs and saved links would break`);
  normalizeRecordedAnchors(after.body, item.added_legacy_anchors);
  const media = (body) => [...body.matchAll(/<figure\b[^>]*>|<img\b[^>]*>/g)].map((match) => match[0]);
  const [oldMedia, newMedia] = [media(before.body), media(after.body)];
  assert.equal(newMedia.length, oldMedia.length, `${pr} adds or removes images or figures`);
  const listed = new Set(receipt.changed_image_alt_text ?? []);
  const altChanged = new Set();
  let figure = "";
  oldMedia.forEach((tag, index) => {
    if (tag.startsWith("<figure")) figure = tag.match(/\bid="([^"]+)"/)?.[1] ?? "";
    if (tag === newMedia[index]) return;
    const withoutAlt = (value) => value.replace(/\salt="[^"]*"/, "");
    assert(tag.startsWith("<img") && listed.has(figure) && withoutAlt(tag) === withoutAlt(newMedia[index]),
      `${pr} changes ${tag.startsWith("<img") ? "the image" : "the figure"} ${figure || `#${index + 1}`}; only alt text may change, and only for figures listed in changed_image_alt_text`);
    altChanged.add(figure);
  });
  const unused = [...listed].filter((id) => !altChanged.has(id));
  assert(!unused.length, `${pr} lists an alt-text change for ${unused.join(", ")}, but that image is unchanged`);
  if (item.slug === "last-resort-restore") checkRestoreSafeguards(after.body);
}

const restoreSafeguards = [
  "your Bisq instance won't start, and you don't have backups, or your backups do not start as well, or are too old to be useful",
  "hacky-workaround-last-resort-attempt",
  "Bisq is closed (terminate orphan existing processes if any)",
  "Start Bisq again: it should start into a 100% new instance",
  "Close Bisq again: we are going to use the freshly created Data Directory",
  'sort files by "last modified" descending',
  "all of them in the same day (presumably the last day your Bisq was operational)",
  "btc_mainnet/db", "btc_mainnet/keys", "btc_mainnet/wallet", "btc_mainnet/tor/hiddenservice",
  "folder of your fresh data directory, overwriting the existing ones",
  "this is a reversible step as you can simply restore the existing old folder after deleting the fresh one you created",
  "If anything is off with the wallet balances shown by Bisq after this restore, you can try a SPV resync (or more)",
];
const restoreOrder = [
  "your Bisq instance won't start", "Bisq is closed",
  "Start Bisq again: it should start into a 100% new instance", "Close Bisq again:",
  'sort files by "last modified" descending', "Copy all the above files",
  "Then, delete from the fresh data directory", "this is a reversible step",
];
const databaseNames = [
  "BsqSwapTrades", "DisputeList", "RefundDisputeList", "SequenceNumberMap", "MyVoteList",
  "OpenOffers", "MyBlindVoteList", "ClosedTrades", "MediationDisputeList", "MyProposalList",
  "MailboxMessageList", "AccountAgeWitnessStore", "PendingTrades", "MyProofOfBurnList",
  "PreferencesPayload", "UserPayload", "AddressEntryList", "FailedTrades", "MyReputationList",
  "TempProposalStore", "NavigationPath", "UnconfirmedBsqChangeOutputList", "IgnoredMailboxMap",
  "PeerList", "RemovedPayloadsMap", "TradeStatistics3Store", "SignedWitnessStore",
];

function checkRestoreSafeguards(body) {
  const text = authorText(body);
  for (const phrase of restoreSafeguards) assert(text.includes(phrase), `lost recovery safeguard: ${phrase}`);
  let previous = -1;
  for (const phrase of restoreOrder) {
    const position = text.indexOf(phrase);
    assert(position > previous, `recovery procedure reordered or missing: ${phrase}`);
    previous = position;
  }
  const lists = [...body.matchAll(/<pre><code\b[^>]*>([\s\S]*?)<\/code><\/pre>/g)]
    .map((match) => decodeHtml(match[1]).split(/\s+/).filter(Boolean));
  assert(lists.some((list) => JSON.stringify(list) === JSON.stringify(databaseNames)), "the ordered 27-file database list changed");
}

async function filesBelow(directory) {
  const files = [];
  for (const entry of await readdir(resolve(root, directory), { withFileTypes: true })) {
    const path = `${directory}/${entry.name}`;
    if (entry.isDirectory()) files.push(...await filesBelow(path));
    else files.push(path);
  }
  return files.sort();
}

export async function verify(overrides = new Map()) {
  const failures = [];
  const check = async (path, operation) => {
    try { await operation(); } catch (error) { failures.push(`${path}: ${error.message}`); }
  };
  const read = async (path) => {
    const local = relative(root, resolve(root, path));
    assert(local !== ".." && !local.startsWith(`..${sep}`), "path escapes repository");
    return overrides.has(path) ? Buffer.from(overrides.get(path)) : readFile(resolve(root, path));
  };
  const manifest = JSON.parse((await read(manifestPath)).toString());
  const snapshot = JSON.parse((await read(snapshotPath)).toString());
  const formatting = JSON.parse((await read(formattingPath)).toString());
  assert.equal(formatting.schema_version, 1, "unsupported source-formatting schema");
  const formattingBySlug = new Map(formatting.items.map((item) => [item.slug, item]));
  assert.equal(formattingBySlug.size, formatting.items.length, "duplicate source-formatting record");
  for (const record of formatting.items) {
    const original = manifest.items.find((item) => item.slug === record.slug);
    assert(original, "source-formatting record has no original article");
    assert.equal(record.original_file_sha256, original.restored_file_sha256, "source-formatting baseline differs from the preserved original");
    assert(Number.isSafeInteger(record.decoded_newline_entities) && record.decoded_newline_entities > 0, "invalid source-formatting line count");
  }
  assert.equal(manifest.schema_version, 1, "unsupported fidelity manifest schema");
  assert.equal(manifest.count, 209, "manifest must account for 209 source articles");
  assert.equal(manifest.items.length, 209, "manifest article count mismatch");
  assert.equal(new Set(manifest.items.map((item) => item.slug)).size, 209, "duplicate source slug");
  let accepted = { bySlug: new Map(), problems: [] };
  await check(acceptedEditsPath, async () => {
    const notes = JSON.parse((await read("migration/source-review-notes.json")).toString()).items;
    accepted = parseAcceptedEdits(JSON.parse((await read(acceptedEditsPath)).toString()), { slugs: new Set(manifest.items.map((item) => item.slug)), notes });
  });
  for (const problem of accepted.problems) failures.push(`${acceptedEditsPath}: ${problem}`);
  const additions = verifyAdditionalArticles();
  const expectedFiles = [...manifest.items.map((item) => `src/content/docs/wiki/${item.slug}.md`), ...additions.map((item) => item.file)].sort();
  await check("src/content/docs/wiki", async () => assert.deepEqual(await filesBelow("src/content/docs/wiki"), expectedFiles, "missing or unexpected source article files"));
  const images = new Set();
  let imageOccurrences = 0;
  let anchorCount = 0;
  let counted = 0;
  let acceptedCount = 0;
  let restoreBody;
  for (const item of manifest.items) {
    const path = `src/content/docs/wiki/${item.slug}.md`;
    await check(path, async () => {
      assert(/^[a-z0-9-]+$/.test(item.slug), "invalid source slug");
      const record = formattingBySlug.get(item.slug);
      const baseline = record?.formatted_file_sha256 ?? item.restored_file_sha256;
      const current = (await read(path)).toString();
      const receipts = accepted.bySlug.get(item.slug) ?? [];
      if (!receipts.length) {
        assert(hash(current) === baseline, `${item.title} changed since restoration (sha256 ${short(hash(current))}, restored ${short(baseline)}) and no receipt in ${acceptedEditsPath} covers it. A wording change needs human approval and a receipt (see CONTRIBUTING.md); do not refresh the original hashes.`);
      } else if (hash(current) === baseline) {
        throw new Error(`${item.title} is unchanged since restoration, but ${pullRequestLabel(receipts.at(-1).pull_request)} has a receipt for it; apply the accepted edit or remove the receipt`);
      }
      receipts.forEach((receipt, index) => {
        const expected = index ? receipts[index - 1].accepted_file_sha256 : baseline;
        assert(receipt.based_on_file_sha256 === expected, `${pullRequestLabel(receipt.pull_request)} receipt is based on sha256 ${short(receipt.based_on_file_sha256)}, but ${index ? `the earlier accepted edit (${pullRequestLabel(receipts[index - 1].pull_request)}) produced` : `the restored baseline of this article${record ? " (original plus recorded line-break formatting)" : ""} is`} ${short(expected)}; record the receipt against the current article`);
      });
      // Undo accepted edits newest first; each must rebuild exactly the file it was based on.
      const steps = [];
      let unedited = current;
      for (const receipt of [...receipts].reverse()) {
        const base = undoAcceptedEdit(unedited, receipt);
        steps.push([base, unedited, receipt]);
        unedited = base;
      }
      const text = restoreRecordedFormatting(unedited, record);
      const front = text.match(/^---\n([\s\S]*?)\n---/);
      assert(front, "missing frontmatter");
      const title = front[1].match(/^title: (.+)$/m);
      assert(title, "missing original title");
      assert.equal(JSON.parse(title[1]), item.title, "original article title changed");
      assert(front[1].includes(`slug: "wiki/${item.slug}"`), "canonical source route changed");
      assert(/^tableOfContents: false$/m.test(front[1]), "duplicate automatic TOC enabled");
      const body = articleBody(text);
      const normalized = normalizeRecordedAnchors(body, item.added_legacy_anchors);
      assert.equal(hash(normalized), item.original_article_body_sha256, "original author body drift (only listed empty anchors may be removed)");
      assert.equal(hash(normalized), item.restored_article_body_without_recorded_anchor_spans_sha256, "normalized restored body hash mismatch");
      assert.equal(hash(body), item.restored_article_body_sha256, "restored article body hash mismatch");
      assert.equal(hash(text), item.restored_file_sha256, "whole restored source file drift");
      const ids = [...body.matchAll(/\bid="([^"]+)"/g)].map((match) => decodeHtml(match[1]));
      assert.equal(ids.length, new Set(ids).size, "duplicate article IDs");
      const tags = [...body.matchAll(/<img\b[^>]*>/g)];
      assert.equal(tags.length, item.image_occurrences, "contextual image count changed");
      for (const tag of tags) images.add(tag[0].match(/\bsrc="([^"]+)"/)?.[1]);
      imageOccurrences += tags.length;
      anchorCount += item.added_legacy_anchors.length;
      if (item.slug === "last-resort-restore") {
        checkRestoreSafeguards(body);
        restoreBody = body;
      }
      counted += 1;
      for (const [base, edited, receipt] of steps) checkAcceptedStructure(base, edited, item, receipt);
      acceptedCount += steps.length;
    });
    const rawPath = `public/wiki-source/${item.slug}.wiki.txt`;
    await check(rawPath, async () => assert.equal(hash(await read(rawPath)), item.raw_wikitext_sha256, "immutable raw wikitext drift"));
    const metadataPath = `public/wiki-source/${item.slug}.json`;
    await check(metadataPath, async () => {
      const metadata = JSON.parse((await read(metadataPath)).toString());
      assert.equal(metadata.title, item.title, "original title differs from source metadata");
      assert.equal(metadata.wikitext_sha256, item.raw_wikitext_sha256, "source metadata hash differs");
      assert.equal(metadata.revision_id, item.source_revision_id, "original revision differs");
      assert.equal(metadata.revision_timestamp, item.source_revision_timestamp, "original revision date differs");
    });
  }
  await check(manifestPath, async () => {
    // Totals are meaningful only when every article was read; failed articles are reported above.
    if (counted === manifest.items.length) {
      assert.equal(imageOccurrences, 130, "expected 130 contextual image occurrences");
      assert.equal(images.size, 120, "expected 120 unique contextual images");
      assert.equal(imageOccurrences, manifest.image_occurrences_preserved);
      assert.equal(images.size, manifest.unique_contextual_image_urls_preserved);
    }
    const records = [...manifest.items].sort((a, b) => `${a.slug}.md` < `${b.slug}.md` ? -1 : `${a.slug}.md` > `${b.slug}.md` ? 1 : 0)
      .map((item) => `${item.slug}.md\0${item.original_whole_source_sha256}\n`).join("");
    assert.equal(hash(records), manifest.whole_rendered_snapshot_sha256, "whole original snapshot hash records changed");
    for (const item of manifest.items) {
      for (const commit of ["6c8bed6", "13d4b61"]) assert.equal(item.git_baseline_sha256[commit], item.original_whole_source_sha256, `${item.slug}: baseline receipts disagree`);
    }
    assert.deepEqual(manifest.last_resort_restore_regressions.map((entry) => entry.exact_retained_text), restoreSafeguards, "recovery regression requirements changed");
    assert.deepEqual(manifest.last_resort_restore_procedure_order.exact_markers, restoreOrder, "recovery order requirements changed");
  });
  const snapshots = Object.entries(snapshot.files);
  await check(snapshotPath, async () => {
    const guides = snapshots.filter(([path]) => path.startsWith("guides/"));
    assert.equal(guides.length, 98, "expected exactly 98 immutable AI-edited guide snapshots");
    assert.deepEqual(await filesBelow("review/ai-edited/guides"), guides.map(([path]) => `review/ai-edited/${path}`).sort(), "missing or unexpected AI guide snapshots");
  });
  for (const [path, expected] of snapshots) {
    const local = `review/ai-edited/${path}`;
    await check(local, async () => assert.equal(hash(await read(local)), expected, "immutable AI-review snapshot drift"));
  }
  return { failures, anchorCount, acceptedCount, acceptedArticles: accepted.bySlug.size, snapshotFiles: snapshots.length, restoreBody };
}

const runAsScript = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (runAsScript) await main();

async function main() {
  try {
    const result = await verify();
    if (result.failures.length) {
      console.error(`Source fidelity FAILED (${result.failures.length} finding${result.failures.length === 1 ? "" : "s"}):\n${result.failures.map((failure) => `- ${failure}`).join("\n")}`);
      process.exitCode = 1;
    } else {
      const plural = (count, noun) => `${count} ${noun}${count === 1 ? "" : "s"}`;
      const edits = result.acceptedCount ? ` (${plural(result.acceptedArticles, "article")} with ${plural(result.acceptedCount, "accepted edit")}; originals rebuilt exactly)` : "";
      console.log(`Source fidelity passed: 209 original bodies/titles/raw sources${edits}, ${result.anchorCount} explicit anchor additions, 130 image occurrences/120 assets, 98 AI guides (${result.snapshotFiles} snapshot files), 14 recovery safeguards, ordered 27-file list and 8-step order.`);
      if (process.argv.includes("--self-test")) {
        const path = "src/content/docs/wiki/last-resort-restore.md";
        const text = await readFile(resolve(root, path), "utf8");
        const rawPath = "public/wiki-source/last-resort-restore.wiki.txt";
        const snapshot = JSON.parse(await readFile(resolve(root, snapshotPath), "utf8"));
        const guidePath = `review/ai-edited/${Object.keys(snapshot.files).find((file) => file.startsWith("guides/"))}`;
        const teamsPath = "src/content/docs/wiki/teams.md";
        const teams = await readFile(resolve(root, teamsPath), "utf8");
        const mutations = [
          [path, text.replace('title: "Last resort restore"', 'title: "Different title"')],
          [path, text.replace("100% new instance", "90% new instance")],
          [path, text.replace('<div class="wiki-recovered-article" lang="en">', '<div class="wiki-recovered-article" lang="en"><span>unlisted content</span>')],
          [rawPath, `${await readFile(resolve(root, rawPath), "utf8")}\nchanged`],
          [guidePath, "changed immutable AI draft"],
          [teamsPath, teams.replace("is responsable", "is responsible")],
          [teamsPath, teams.replace("Bisq is a", "Bisq  is a")],
        ];
        for (const [file, content] of mutations) {
          const mutated = await verify(new Map([[file, content]]));
          assert(mutated.failures.some((failure) => failure.startsWith(`${file}:`)), `negative test did not catch drift at ${file}`);
        }
        assert.throws(() => checkRestoreSafeguards(result.restoreBody.replace("btc_mainnet/tor/hiddenservice", "hiddenservice")), /lost recovery safeguard/);
        assert.throws(() => checkRestoreSafeguards(result.restoreBody.replace("Copy all the above files", "Copy selected files")), /procedure reordered or missing/);
        console.log("Nine negative regression checks passed; test mutations were in memory only.");
      }
    }
  } catch (error) {
    console.error(`Source fidelity FAILED: ${error.message}`);
    process.exitCode = 1;
  }
}
