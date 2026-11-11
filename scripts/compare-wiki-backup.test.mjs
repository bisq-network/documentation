import test, { after } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { gzipSync } from "node:zlib";
import { compareBackup } from "./compare-wiki-backup.mjs";
import { BackupError, hasTool, openBackup, safeSegments } from "./lib/backup-input.mjs";
import { renderHtml } from "./lib/backup-report-html.mjs";
import { diffSequences, diffTexts, diffWords } from "./lib/word-diff.mjs";
import { publicReport, readGapMarkers, reconcile } from "./reconcile-wiki-backup.mjs";
import { bySlug, cleanupScratch, hashedPath, mkdirFor, named, original, page, put, restored, revision, roundTrip, scratch, stored, tarArchive, wrap, zipArchive } from "./fixtures/backup-fixtures.mjs";

// Synthetic backups built from the restored snapshot itself, so every case is
// known: an exact round trip, newer revisions, pages that fill gap markers,
// pages we do not have, and an images folder with a changed and a new file.

after(cleanupScratch);

const NEW_TEXT = "'''Dispute resolution''' covers mediation and arbitration.\n\n== Mediation ==\nA mediator suggests a payout.";
const ESCAPE_TITLE = 'Brand new <script>alert("x")</script> page';
const ESCAPE_TEXT = "Hello <img src=x onerror=alert(1)> </pre><script>alert(2)</script> world";

/** (b)–(e): newer revisions, gap fills, new pages, a redirect, a template and a file page. */
function changedExport() {
  const ach = bySlug.get("ach-transfer"), arbitration = bySlug.get("arbitration");
  const achNewer = stored("ach-transfer").replace("low-value payments", "small, low-cost payments") + "\nACH transfers are reversible for a few days.";
  const pages = restored.filter((item) => !["ach-transfer", "arbitration"].includes(item.slug)).map(original);
  pages.push(
    // (b) newer revisions: one anonymous edit (never reported by IP), then a named one.
    page(ach.title, ach.page_id, [
      revision(ach.revision_id, ach.revision_timestamp, stored("ach-transfer")),
      revision("90001", "2026-11-01T10:00:00Z", stored("ach-transfer") + "\nDraft.", "<ip>192.0.2.44</ip>"),
      revision("90002", "2026-11-02T10:00:00Z", achNewer, named("Editor B", "8")),
    ]),
    // (c) a newer Arbitration with the section other articles link to.
    page(arbitration.title, arbitration.page_id, [
      revision(arbitration.revision_id, arbitration.revision_timestamp, stored("arbitration")),
      revision("90003", "2026-11-03T10:00:00Z", stored("arbitration").replace("=== Avoiding Fraud ===", "=== Time-Locked Payout Transaction ===\nThe delayed payout transaction is signed when the trade starts.\n\n=== Avoiding Fraud ===")),
    ]),
    // (c, d) pages we do not have, two of them linked from our articles through gap markers.
    page("Dispute resolution", "90100", [revision("90101", "2026-10-30T10:00:00Z", NEW_TEXT)]),
    page("Tor", "90102", [revision("90103", "2026-10-29T10:00:00Z", "'''Tor''' is an anonymity network.", "<ip>192.0.2.45</ip>")]),
    page(ESCAPE_TITLE, "90104", [revision("90105", "2026-10-28T10:00:00Z", ESCAPE_TEXT)]),
    page("ACH", "635", [revision("3833", "2025-01-09T03:14:39Z", "#REDIRECT [[ACH Transfer]]")], { redirect: "ACH Transfer" }),
    page("Template:MaxTradeSizeBisq1", "90106", [revision("90107", "2026-01-01T00:00:00Z", "0.25 BTC")], { ns: 10 }),
    page("File:Emergency Wallet.png", "90108", [revision("90109", "2020-01-01T00:00:00Z", "Emergency wallet screenshot")], { ns: 6 }),
    page("Talk:ACH Transfer", "90110", [revision("90111", "2026-01-01T00:00:00Z", "Discussion")], { ns: 1 }),
    page("User:Editor A", "90112", [revision("90113", "2026-01-01T00:00:00Z", "About me")], { ns: 2 }),
  );
  return wrap(pages);
}

const mapping = JSON.parse(readFileSync("public/media/wiki/mapping.json", "utf8")).files;

/**
 * (e) An images/ folder in MediaWiki's layout: the recovered files except one
 * missing and one changed, plus a new file and the file behind an image gap.
 * With few, only the changed and new files and two identical ones.
 */
function writeImages(images, { few = false } = {}) {
  const [missing, changed, ...rest] = mapping;
  for (const item of few ? rest.slice(0, 2) : rest) copyFileSync(join("public", item.file), mkdirFor(hashedPath(images, item.filename)));
  put(hashedPath(images, changed.filename), Buffer.concat([readFileSync(join("public", changed.file)), Buffer.from("changed")]));
  copyFileSync(join("public", rest[0].file), mkdirFor(hashedPath(images, "Emergency Wallet.png")));
  put(hashedPath(images, "Brand-new.png"), "not really a png");
  put(join(images, "thumb", "a", "ab", "X.png", "120px-X.png"), "thumbnail");
  put(join(images, "README"), "MediaWiki images folder");
  return { missing: missing.filename, changed: changed.filename };
}

/** A backup folder: bisq-wiki-full.xml and images/. */
function backupFolder(xml, { images = true, few = false } = {}) {
  const dir = join(scratch(), "backup");
  put(join(dir, "bisq-wiki-full.xml"), xml);
  const expected = images ? writeImages(join(dir, "images"), { few }) : null;
  return { dir, expected };
}

const run = (command, args, cwd) => {
  const result = spawnSync(command, args, { cwd, encoding: "utf8" });
  assert.equal(result.status, 0, `${command} ${args.join(" ")}: ${result.stderr}`);
};

test("word diff finds the changed words and rebuilds both texts", () => {
  const before = "Bisq is a peer-to-peer exchange.\nTrades use a 2-of-2 multisig escrow.\nKeep your seed safe.";
  const after = "Bisq is a decentralized exchange.\nTrades use a 2-of-2 multisig escrow.\nKeep your seed words safe and offline.";
  const parts = diffWords(before, after);
  assert.equal(parts.filter(([type]) => type !== "+").map(([, text]) => text).join(""), before);
  assert.equal(parts.filter(([type]) => type !== "-").map(([, text]) => text).join(""), after);
  assert.deepEqual(parts.filter(([type]) => type !== "=").slice(0, 2), [["-", "peer-to-peer"], ["+", "decentralized"]]);
  const { blocks, added, removed } = diffTexts(before, after);
  assert.equal(blocks.filter((block) => block.type === "change").length, 2);
  assert.deepEqual([added, removed], [4, 1]);
  for (let round = 0; round < 50; round++) {
    const random = () => Array.from({ length: Math.floor(Math.random() * 30) }, () => "abcde"[Math.floor(Math.random() * 5)]);
    const a = random(), b = random();
    const runs = diffSequences(a, b);
    assert.deepEqual(runs.filter(([type]) => type !== "+").flatMap(([, items]) => items), a);
    assert.deepEqual(runs.filter(([type]) => type !== "-").flatMap(([, items]) => items), b);
  }
  assert.equal(diffSequences([..."abcdefgh"], [..."hgfedcba"], { maxCost: 3 }), null);
});

test("gap markers are read from the restored articles", () => {
  const markers = readGapMarkers();
  const kinds = Object.groupBy(markers, (marker) => marker.kind);
  assert.ok(kinds.article.length >= 100 && kinds.section.length >= 9 && kinds.image.length >= 3 && kinds.template.length >= 50);
  const section = kinds.section.find((marker) => marker.target === "Time-Locked Payout Transaction");
  assert.equal(section.target_slug, "arbitration");
  assert.ok(kinds.article.some((marker) => marker.target === "dispute resolution" && marker.label === "dispute resolution"));
});

test("(a) an exact round trip leaves every article unchanged and fills nothing", async () => {
  const dir = scratch();
  writeFileSync(join(dir, "export.xml"), roundTrip());
  const report = await reconcile({ xml: join(dir, "export.xml") });
  assert.equal(report.summary.restored_articles, 212);
  assert.equal(report.summary.unchanged, 212);
  assert.deepEqual(report.articles.filter((article) => article.status !== "unchanged"), []);
  assert.equal(report.summary.new_pages, 0);
  assert.equal(report.summary.gap_markers_in_backup, 0);
  assert.ok(report.summary.gap_markers > 200);
  const html = renderHtml(report);
  assert.match(html, /Every one of the 212 restored articles is the same in the backup\./);
});

test("(b–e) newer revisions, gap fills, new pages and images are reported", async () => {
  const { dir, expected } = backupFolder(changedExport());
  const out = join(scratch(), "out");
  const { report, files } = await compareBackup([dir], { out, log: () => {} });
  const s = report.summary;
  assert.equal(s.unchanged, 210);
  assert.equal(s.newer_revision, 2);
  const ach = report.articles.find((article) => article.slug === "ach-transfer");
  assert.equal(ach.status, "newer-revision");
  assert.deepEqual(ach.editors_after, { usernames: ["Editor B"], anonymous: 1, hidden: 0 });

  // (c) gaps: an article, a section, a redirect to a restored article, a template and an image.
  const gap = (kind, target) => report.gaps.find((item) => item.kind === kind && item.target.toLowerCase() === target.toLowerCase());
  assert.equal(gap("article", "dispute resolution").status, "in-backup");
  assert.ok(gap("article", "dispute resolution").markers >= 25);
  assert.equal(gap("article", "Tor").status, "in-backup");
  assert.equal(gap("article", "ACH").status, "restored-via-redirect");
  const section = gap("section", "Time-Locked Payout Transaction");
  assert.equal(section.status, "in-backup");
  assert.equal(section.backup_title, "Arbitration");
  assert.equal(gap("template", "MaxTradeSizeBisq1").status, "in-backup");
  assert.equal(gap("image", "Emergency Wallet.png").status, "in-backup");
  assert.equal(gap("article", "rading rules").status, "not-in-backup");
  assert.ok(s.gap_markers_in_backup > 40 && s.gap_markers_in_backup < s.gap_markers);

  // (d) pages we do not have: articles only, linked ones flagged.
  assert.deepEqual(report.new_pages.map((item) => item.title).sort(), [ESCAPE_TITLE, "Dispute resolution", "Tor"].sort());
  assert.equal(s.new_pages_linked, 2);
  assert.ok(report.new_pages.find((item) => item.title === "Tor").linked_from.length >= 3);

  // (e) images: one changed, one missing, two new; thumbnails and README ignored.
  assert.deepEqual(report.images.differs.map((item) => item.filename), [expected.changed]);
  assert.deepEqual(report.images.missing_from_backup, [expected.missing]);
  assert.deepEqual(report.images.new_in_backup.map((item) => item.filename), ["Brand-new.png", "Emergency_Wallet.png"]);
  assert.equal(report.images.identical, mapping.length - 2);

  // Outputs: the HTML report and the files the intake runbook uses.
  for (const name of ["report.html", "report.json", "REPORT.md", "newer-revisions.jsonl"]) assert.ok(existsSync(join(out, name)), name);
  const html = readFileSync(files.html, "utf8");
  assert.match(html, /<del>low-value<\/del><ins>small, low-cost<\/ins> payments/);
  assert.match(html, /Editor B; 1 anonymous edit/);
  assert.match(html, /id="text-p\d+-L\d+"/);
  assert.match(html, /<img src="data:image\/[a-z+]+;base64,/);
  assert.equal(readFileSync(join(out, "newer-revisions.jsonl"), "utf8").trim().split("\n").length, 2);
  const json = readFileSync(join(out, "report.json"), "utf8");
  assert.doesNotMatch(json, /"(?:latest_text|snapshot_text|page_texts|backup_file|recovered_file)"/);
  assert.doesNotMatch(json, new RegExp(tmpdir().replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  for (const text of [html, json, readFileSync(join(out, "REPORT.md"), "utf8")]) assert.doesNotMatch(text, /192\.0\.2\./);
});

test("backup text is escaped and the page loads nothing from outside", async () => {
  const dir = scratch();
  writeFileSync(join(dir, "export.xml"), changedExport());
  const report = await reconcile({ xml: join(dir, "export.xml") });
  const html = renderHtml(report);
  assert.doesNotMatch(html, /<script>alert/);
  assert.doesNotMatch(html, /<img src=x/);
  assert.match(html, /Brand new &lt;script&gt;alert\(&quot;x&quot;\)&lt;\/script&gt; page/);
  assert.match(html, /&lt;\/pre&gt;&lt;script&gt;alert\(2\)/);
  assert.match(html, /http-equiv="Content-Security-Policy" content="default-src 'none'; img-src data:;/);
  assert.doesNotMatch(html, /\s(?:src|href)="(?!#|data:|https:\/\/github\.com\/)/);
  assert.equal(JSON.stringify(publicReport(report)).includes(ESCAPE_TEXT), false);
});

test("(f) compressed exports and archives give the same comparison as the folder", async (t) => {
  const xml = changedExport();
  const { dir } = backupFolder(xml, { few: true });
  const base = await compareBackup([dir], { out: join(scratch(), "out"), log: () => {} });
  const summary = (report) => ({ ...report.summary, images: report.images && { ...report.images, differs: report.images.differs.map((item) => item.filename), new_in_backup: report.images.new_in_backup.map((item) => item.filename) } });
  const formats = {
    "bisq-wiki-full.xml.gz": (out) => writeFileSync(out, gzipSync(xml)),
    "bisq-wiki-full.xml.bz2": hasTool("bzip2") ? (out) => { run("bzip2", ["-k", "bisq-wiki-full.xml"], dir); copyFileSync(join(dir, "bisq-wiki-full.xml.bz2"), out); } : null,
    "backup.tar.gz": (out) => run("tar", ["-czf", out, "bisq-wiki-full.xml", "images"], dir),
    "backup.zip": hasTool("zip") ? (out) => run("zip", ["-qr", out, "bisq-wiki-full.xml", "images"], dir) : null,
    "backup.7z": ["7zz", "7z", "7za"].some((tool) => spawnSync(tool, ["i"], { stdio: "ignore" }).error === undefined)
      ? (out) => run(["7zz", "7z", "7za"].find((tool) => spawnSync(tool, ["i"], { stdio: "ignore" }).error === undefined), ["a", "-mx=1", out, "bisq-wiki-full.xml", "images"], dir) : null,
  };
  for (const [name, make] of Object.entries(formats)) {
    await t.test(name, { skip: make ? false : "tool not installed" }, async () => {
      const archive = join(scratch(), name);
      make(archive);
      const { report } = await compareBackup([archive], { out: join(scratch(), "out"), log: () => {} });
      const hasImages = !name.includes(".xml.");
      assert.deepEqual(report.articles.map((article) => article.status), base.report.articles.map((article) => article.status));
      if (hasImages) assert.deepEqual(summary(report), summary(base.report));
      else assert.equal(report.images, null);
      assert.equal(report.source.xml, name.includes(".xml.") ? name : `${name} › bisq-wiki-full.xml`);
      if (hasImages) assert.equal(report.source.images, `${name} › images`);
    });
  }
  // An export and an images folder given separately are combined.
  const bare = join(scratch(), "bisq-wiki-full.xml.gz");
  writeFileSync(bare, gzipSync(xml));
  const both = await compareBackup([bare, join(dir, "images")], { out: join(scratch(), "out"), log: () => {} });
  assert.deepEqual(summary(both.report), summary(base.report));
});

test("(g) a backup with only a database dump explains how to get the XML export", async () => {
  const dir = join(scratch(), "backup");
  put(join(dir, "bisq-wiki-backup.sql"), "-- MariaDB dump 10.19\nCREATE TABLE user (user_email tinyblob);\n");
  put(join(dir, "LocalSettings.php"), "<?php $wgDBpassword = 'secret';");
  await assert.rejects(openBackup(dir), (error) => {
    assert.ok(error instanceof BackupError);
    assert.equal(error.code, "SQL_ONLY");
    assert.match(error.message, /bisq-wiki-backup\.sql/);
    assert.match(error.message, /dumpBackup\.php --full/);
    assert.match(error.message, /sh scripts\/sql-dump-to-xml\.sh/);
    assert.match(error.message, /LocalSettings\.php \(the backup has one: LocalSettings\.php\)/);
    assert.doesNotMatch(error.message, /secret|user_email/);
    return true;
  });
  const archive = join(scratch(), "db.sql.bz2");
  writeFileSync(archive, "BZh91AY&SY not a real stream");
  await assert.rejects(openBackup(archive), { code: "SQL_ONLY" });
  const cli = spawnSync(process.execPath, ["scripts/compare-wiki-backup.mjs", dir, "--out", join(scratch(), "out")], { encoding: "utf8" });
  assert.equal(cli.status, 3);
  assert.match(cli.stderr, /no XML export of the wiki pages/);
  const empty = scratch();
  writeFileSync(join(empty, "notes.txt"), "nothing here");
  await assert.rejects(openBackup(empty), { code: "NO_EXPORT" });
});

test("archive members cannot write outside the extraction folder", async () => {
  assert.equal(safeSegments("../evil.xml"), null);
  assert.equal(safeSegments("/etc/evil.xml"), null);
  assert.equal(safeSegments("a/../../evil.xml"), null);
  assert.equal(safeSegments("C:\\evil.xml"), null);
  assert.deepEqual(safeSegments("./w/images/a/ab/X.png"), ["w", "images", "a", "ab", "X.png"]);
  const xml = Buffer.from(roundTrip());
  const sentinel = `escape-${process.pid}-${Date.now()}`;
  const work = scratch();
  const members = [
    [`../${sentinel}.xml`, xml],
    [`/tmp/${sentinel}.xml`, xml],
    ["images", Buffer.alloc(0), "2", "/tmp"],
    [`images/${sentinel}.png`, Buffer.from("x")],
    ["w/LocalSettings.php", Buffer.from("<?php $wgDBpassword = 'secret';")],
    ["dump/bisq-wiki-full.xml", xml],
  ];
  const tar = join(scratch(), "evil.tar");
  writeFileSync(tar, tarArchive(members));
  const zip = join(scratch(), "evil.zip");
  writeFileSync(zip, zipArchive(members.map(([name, data, type]) => [name, data, type === "2" ? 0o120777 : 0o100644])));
  for (const archive of [tar, zip]) {
    const backup = await openBackup(archive, { workRoot: work });
    try {
      assert.equal(backup.xmlDisplay, `${archive.split("/").at(-1)} › dump/bisq-wiki-full.xml`);
      assert.match(backup.notes.join("\n"), /Skipped 2 archive member\(s\) with an unsafe path/);
      assert.match(backup.notes.join("\n"), /Ignored 1 symbolic or hard link/);
      const extracted = readdirSync(work, { recursive: true }).map(String);
      assert.ok(!extracted.some((name) => name.includes("LocalSettings")), "LocalSettings.php is never unpacked");
      assert.ok(!extracted.some((name) => name.endsWith(`${sentinel}.xml`)), "unsafe members are not unpacked");
    } finally {
      backup.cleanup();
    }
    for (const dir of [resolve(work, ".."), resolve(work, "../.."), "/tmp", tmpdir()]) assert.ok(!existsSync(join(dir, `${sentinel}.xml`)) && !existsSync(join(dir, `${sentinel}.png`)));
  }
  assert.deepEqual(readdirSync(work), [], "cleanup removes the extraction folder");
});

test("damaged archives and output inside the repository are refused", async () => {
  const tar = join(scratch(), "broken.tar.gz");
  writeFileSync(tar, gzipSync(tarArchive([["dump/bisq-wiki-full.xml", Buffer.from(roundTrip())]])).subarray(0, 2000));
  await assert.rejects(openBackup(tar), { code: "DAMAGED" });
  const cut = join(scratch(), "cut.tar");
  writeFileSync(cut, tarArchive([["dump/bisq-wiki-full.xml", Buffer.from(roundTrip())]]).subarray(0, 512 * 4));
  await assert.rejects(openBackup(cut), { code: "DAMAGED" });
  const { dir } = backupFolder(roundTrip(), { images: false });
  await assert.rejects(compareBackup([dir], { out: "public/report", log: () => {} }), /outside the repository or under tmp/);
});
