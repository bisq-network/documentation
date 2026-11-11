// Regression tests for the security review of the backup comparison: each test
// reproduces one finding with a hostile or unusual backup and checks that it now
// fails safely.
import test, { after } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, symlinkSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { crc32, deflateRawSync, gzipSync } from "node:zlib";
import { compareBackup } from "./compare-wiki-backup.mjs";
import { BackupError, openBackup, parseSize } from "./lib/backup-input.mjs";
import { renderHtml } from "./lib/backup-report-html.mjs";
import { clean, readRegularFile } from "./lib/safe-files.mjs";
import { headingText, markdownText, reconcile, renderMarkdown, sectionAnchors } from "./reconcile-wiki-backup.mjs";
import { cleanupScratch, hashedPath, original, page, put, restored, revision, roundTrip, scratch, tarArchive, wrap } from "./fixtures/backup-fixtures.mjs";

after(cleanupScratch);

const mapping = JSON.parse(readFileSync("public/media/wiki/mapping.json", "utf8")).files;
const XML = Buffer.from('<mediawiki xmlns="http://www.mediawiki.org/xml/export-0.11/">\n</mediawiki>\n');
const exportFile = (xml) => {
  const path = join(scratch(), "export.xml");
  writeFileSync(path, xml);
  return path;
};
const hasMkfifo = spawnSync("mkfifo", ["--help"], { stdio: "ignore" }).error === undefined;

test("1. images behind links, and FIFOs, are never read or listed", { timeout: 60000 }, async () => {
  const base = scratch();
  const dir = join(base, "backup");
  put(join(dir, "bisq-wiki-full.xml"), roundTrip());
  const secret = join(base, "secret-outside.txt");
  writeFileSync(secret, "-----BEGIN OPENSSH PRIVATE KEY----- PRETEND SECRET -----END-----\n");
  const [linked, fifo] = mapping.filter((item) => item.filename.endsWith(".png"));
  mkdirSync(join(hashedPath(join(dir, "images"), linked.filename), ".."), { recursive: true });
  symlinkSync(secret, hashedPath(join(dir, "images"), linked.filename));
  mkdirSync(join(base, "private-dir"));
  writeFileSync(join(base, "private-dir", "tax-return-2026.pdf"), "x");
  symlinkSync(join(base, "private-dir"), join(dir, "images", "b"));
  mkdirSync(join(dir, "images", "c"));
  symlinkSync(join(base, "private-dir"), join(dir, "images", "c", "cd"));
  put(join(dir, "images", "a", "ab", "Real.png"), "real");
  if (hasMkfifo) {
    mkdirSync(join(hashedPath(join(dir, "images"), fifo.filename), ".."), { recursive: true });
    assert.equal(spawnSync("mkfifo", [hashedPath(join(dir, "images"), fifo.filename)]).status, 0);
  }
  const out = join(base, "out");
  const { report, files } = await compareBackup([dir], { out, log: () => {} });
  const html = readFileSync(files.html, "utf8");
  assert.equal(html.includes(readFileSync(secret).toString("base64")), false);
  assert.deepEqual(report.images.differs, []);
  assert.ok(report.images.missing_from_backup.includes(linked.filename));
  if (hasMkfifo) assert.ok(report.images.missing_from_backup.includes(fifo.filename));
  assert.deepEqual(report.images.new_in_backup.map((item) => item.filename), ["Real.png"]);
  assert.doesNotMatch(readFileSync(join(out, "report.json"), "utf8"), /tax-return/);
  // The embedding helper refuses links and FIFOs as well.
  assert.equal(readRegularFile(hashedPath(join(dir, "images"), linked.filename)), null);
  if (hasMkfifo) assert.equal(readRegularFile(hashedPath(join(dir, "images"), fifo.filename)), null);
});

test("2. articles without revisions keep the headline from saying everything is the same", async () => {
  const pages = restored.map((item, index) => index < 20 ? page(item.title, item.page_id, []) : original(item));
  const report = await reconcile({ xml: exportFile(wrap(pages)) });
  assert.equal(report.summary.no_revisions, 20);
  const lede = /<p class="lede">([^<]*)<\/p>/.exec(renderHtml(report))[1];
  assert.doesNotMatch(lede, /Every one/);
  assert.match(lede, /^20 articles need a closer look/);
  const markdown = renderMarkdown(report);
  assert.match(markdown, /\| No revisions \|/);
  assert.match(markdown, /\| 212 \| 192 \| 0 \| 0 \| 0 \| 0 \| 20 \| 0 \|/);
  assert.match(markdown, /The backup has the page but none of its revisions/);
});

test("3. redirect loops and long chains fill no gap", async () => {
  const redirect = (title, id, target) => page(title, id, [revision(String(Number(id) + 1), "2026-01-01T00:00:00Z", `#REDIRECT [[${target}]]`)], { redirect: target });
  const chain = (prefix, start, length, last) => Array.from({ length }, (_, i) => redirect(i ? `${prefix}${i}` : prefix, String(start + i * 2), i + 1 < length ? `${prefix}${i + 1}` : last));
  const report = await reconcile({
    xml: exportFile(roundTrip([
      redirect("Tor", "99001", "Tor network"), redirect("Tor network", "99003", "Tor"),
      ...chain("Dispute resolution", 99100, 5, "Nowhere"),
      ...chain("UBI", 99200, 7, "Basic income"),
      page("Basic income", "99300", [revision("99301", "2026-01-01T00:00:00Z", "Text")]),
    ])),
  });
  const gap = (target) => report.gaps.find((item) => item.kind === "article" && item.target.toLowerCase() === target.toLowerCase());
  assert.equal(gap("Tor").status, "redirect-unresolved");
  assert.match(gap("Tor").detail, /Redirect loop: Tor → Tor network → Tor/);
  assert.equal(gap("dispute resolution").status, "not-in-backup");
  assert.equal(gap("UBI").status, "redirect-unresolved");
  assert.match(gap("UBI").detail, /More than 5 redirects/);
  assert.equal(report.summary.gap_markers_in_backup, 0);
  assert.match(renderHtml(report), /Redirect leads nowhere/);
});

test("4. heading lines are parsed in linear time", () => {
  for (const line of ["=" + "\t".repeat(20000) + "x", "=" + " ".repeat(20000) + "x", "==" + "a ".repeat(20000)]) {
    const started = performance.now();
    sectionAnchors(line);
    assert.ok(performance.now() - started < 200, `${line.length} characters took too long`);
  }
  assert.deepEqual(["== A ==", "=== B ===   ", "==x=", "=", "== ==", "= a =b", "=" + "x".repeat(2000) + "="].map(headingText), ["A", "B", "=x", null, null, null, null]);
  assert.deepEqual(sectionAnchors("intro\n== Time-Locked Payout Transaction ==\ntext").map((anchor) => [anchor.name, anchor.line]), [["Time-Locked Payout Transaction", 1]]);
});

/** A ZIP whose 40 central entries all point at one 8 MB deflated entry (11 KB on disk). */
function overlappingZip() {
  const plain = Buffer.alloc(8 << 20), data = deflateRawSync(plain, { level: 9 }), crc = crc32(plain);
  const local = Buffer.alloc(30), name0 = Buffer.from("images/a/ab/k0.png");
  local.writeUInt32LE(0x04034b50, 0); local.writeUInt16LE(20, 4); local.writeUInt16LE(0x800, 6); local.writeUInt16LE(8, 8);
  local.writeUInt32LE(crc, 14); local.writeUInt32LE(data.length, 18); local.writeUInt32LE(plain.length, 22); local.writeUInt16LE(name0.length, 26);
  const locals = Buffer.concat([local, name0, data]);
  const centrals = Array.from({ length: 40 }, (_, i) => {
    const name = Buffer.from(`images/a/ab/k${i}.png`), central = Buffer.alloc(46);
    central.writeUInt32LE(0x02014b50, 0); central.writeUInt16LE((3 << 8) | 20, 4); central.writeUInt16LE(20, 6); central.writeUInt16LE(0x800, 8); central.writeUInt16LE(8, 10);
    central.writeUInt32LE(crc, 16); central.writeUInt32LE(data.length, 20); central.writeUInt32LE(plain.length, 24); central.writeUInt16LE(name.length, 28);
    central.writeUInt32LE((0o100644 << 16) >>> 0, 38);
    return Buffer.concat([central, name]);
  });
  const directory = Buffer.concat(centrals), end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0); end.writeUInt16LE(40, 8); end.writeUInt16LE(40, 10); end.writeUInt32LE(directory.length, 12); end.writeUInt32LE(locals.length, 16);
  return { zip: Buffer.concat([locals, directory, end]), data, plain };
}

/** A one-entry ZIP that declares `declared` bytes but inflates to `actual` bytes. */
function lyingZip(declared, actual) {
  const plain = Buffer.alloc(actual), data = deflateRawSync(plain), name = Buffer.from("dump/export.xml");
  const local = Buffer.alloc(30), central = Buffer.alloc(46), end = Buffer.alloc(22);
  local.writeUInt32LE(0x04034b50, 0); local.writeUInt16LE(20, 4); local.writeUInt16LE(0x800, 6); local.writeUInt16LE(8, 8);
  local.writeUInt32LE(crc32(plain), 14); local.writeUInt32LE(data.length, 18); local.writeUInt32LE(declared, 22); local.writeUInt16LE(name.length, 26);
  central.writeUInt32LE(0x02014b50, 0); central.writeUInt16LE((3 << 8) | 20, 4); central.writeUInt16LE(20, 6); central.writeUInt16LE(0x800, 8); central.writeUInt16LE(8, 10);
  central.writeUInt32LE(crc32(plain), 16); central.writeUInt32LE(data.length, 20); central.writeUInt32LE(declared, 24); central.writeUInt16LE(name.length, 28);
  central.writeUInt32LE((0o100644 << 16) >>> 0, 38);
  const directory = Buffer.concat([central, name]);
  end.writeUInt32LE(0x06054b50, 0); end.writeUInt16LE(1, 8); end.writeUInt16LE(1, 10); end.writeUInt32LE(directory.length, 12); end.writeUInt32LE(30 + name.length + data.length, 16);
  return Buffer.concat([local, name, data, directory, end]);
}

test("5. unpacking is limited, and ZIP entries may not overlap or grow", async () => {
  const file = (name, data) => { const path = join(scratch(), name); writeFileSync(path, data); return path; };
  const { zip } = overlappingZip();
  await assert.rejects(openBackup(file("overlap.zip", zip)), (error) => error.code === "DAMAGED" && /overlap/.test(error.message));
  await assert.rejects(openBackup(file("lying.zip", lyingZip(100, 4 << 20))), (error) => error.code === "DAMAGED" && /more than the 100 bytes it declares/.test(error.message));
  const truncatedDirectory = Buffer.from(zip);
  truncatedDirectory.writeUInt32LE(zip.length, zip.length - 6);
  await assert.rejects(openBackup(file("bad-directory.zip", truncatedDirectory)), { code: "DAMAGED" });
  const big = Buffer.concat([Buffer.from('<mediawiki xmlns="x">\n<!-- '), Buffer.alloc(3 << 20, 0x20), Buffer.from(" -->\n</mediawiki>\n")]);
  await assert.rejects(openBackup(file("big.xml.gz", gzipSync(big)), { maxBytes: 1 << 20 }), (error) => error.code === "TOO_LARGE" && /--max-unpacked/.test(error.message));
  await assert.rejects(openBackup(file("big.tar", tarArchive([["images/a/ab/X.png", Buffer.alloc(2 << 20)], ["dump/export.xml", XML]])), { maxBytes: 1 << 20 }), { code: "TOO_LARGE" });
  const backup = await openBackup(file("small.tar", tarArchive([["dump/export.xml", XML]])), { maxBytes: 1 << 20 });
  backup.cleanup();
  assert.deepEqual(["500M", "20G", "1048576", "1.5k"].map(parseSize), [500 * 1024 ** 2, 20 * 1024 ** 3, 1048576, 1536]);
  assert.throws(() => parseSize("lots"), BackupError);
});

test("6. several different exports must be chosen; extra images folders are named", async () => {
  const dir = join(scratch(), "backup");
  put(join(dir, "pages-current.xml"), roundTrip());
  put(join(dir, "history", "pages-full.xml"), roundTrip([page("Extra", "99500", [revision("99501", "2026-01-01T00:00:00Z", "x")])]));
  await assert.rejects(openBackup(dir), (error) => {
    assert.equal(error.code, "CHOOSE_EXPORT");
    assert.match(error.message, /2 different XML exports/);
    assert.match(error.message, /history\/pages-full\.xml/);
    assert.match(error.message, /pages-current\.xml/);
    assert.match(error.message, /--xml "history\/pages-full\.xml"/);
    return true;
  });
  const chosen = await openBackup(dir, { xml: "pages-current.xml" });
  assert.equal(chosen.xmlDisplay, "pages-current.xml");
  chosen.cleanup();
  await assert.rejects(openBackup(dir, { xml: "nothing.xml" }), { code: "CHOOSE_EXPORT" });
  // An identical copy (the same export, compressed beside it) is not a choice.
  const same = join(scratch(), "same");
  put(join(same, "bisq-wiki-full.xml"), roundTrip());
  put(join(same, "bisq-wiki-full.xml.gz"), gzipSync(roundTrip()));
  put(join(same, "w", "images", "a", "ab", "One.png"), "1");
  put(join(same, "w", "images", "a", "ab", "Two.png"), "2");
  put(join(same, "old", "images", "c", "cd", "Three.png"), "3");
  const backup = await openBackup(same);
  assert.equal(backup.imagesDisplay, "w/images");
  assert.deepEqual(backup.otherImages, ["old/images"]);
  assert.match(backup.notes.join("\n"), /Other images folders were found and not compared: old\/images \(1 files\)\. To compare one of them instead, add --images "old\/images"/);
  backup.cleanup();
  const other = await openBackup(same, { images: "old/images" });
  assert.equal(other.imagesDisplay, "old/images");
  other.cleanup();
});

test("7. the SQL helper refuses unsafe names, damaged dumps and outputs in the repository", () => {
  const dir = scratch();
  const helper = (...args) => spawnSync("sh", ["scripts/sql-dump-to-xml.sh", ...args], { encoding: "utf8" });
  const evil = join(dir, "evil.sql");
  writeFileSync(evil, '-- MariaDB dump 10.19\nCREATE DATABASE /*!32312 IF NOT EXISTS*/ `w";system("id");$x="\u001b[2J` /*!40100 DEFAULT CHARACTER SET binary */;\n');
  const refused = helper(evil, join(dir, "out"));
  assert.equal(refused.status, 2);
  assert.match(refused.stderr, /Not a usable database name/);
  assert.doesNotMatch(refused.stderr, /\u001b/);
  assert.equal(existsSync(join(dir, "out")), false);
  assert.equal(helper(evil, join(dir, "out"), "a\nb").status, 2);
  assert.equal(helper(evil, join(dir, "out"), "wiki", "mw'; --").status, 2);
  const broken = join(dir, "broken.sql.bz2");
  writeFileSync(broken, "BZh91AY&SY not a real stream");
  const damaged = helper(broken, join(dir, "out"));
  assert.equal(damaged.status, 1);
  assert.match(damaged.stderr, /damaged or incomplete/);
  const valid = join(dir, "valid.sql");
  writeFileSync(valid, "-- MariaDB dump 10.19\n");
  symlinkSync(join(process.cwd(), "public"), join(dir, "link-to-public"));
  // Another letter case names the same folder only on a case-insensitive file system (macOS).
  const otherCase = process.platform === "darwin" ? [join(process.cwd().toUpperCase(), "backup-xml")] : [];
  for (const out of ["public/backup-xml", join(dir, "link-to-public", "backup-xml"), ...otherCase]) {
    const result = helper(valid, out);
    assert.equal(result.status, 2, out);
    assert.match(result.stderr, /outside the repository/);
  }
  assert.equal(existsSync("public/backup-xml"), false);
});

test("8. the report folder cannot be put in the repository through a link or letter case", async () => {
  const dir = join(scratch(), "backup");
  put(join(dir, "bisq-wiki-full.xml"), roundTrip());
  const link = join(scratch(), "link-to-repo");
  symlinkSync(process.cwd(), link);
  for (const out of [join(link, "public", "report"), join(process.cwd().toUpperCase(), "PUBLIC", "report"), "Public/report"]) {
    await assert.rejects(compareBackup([dir], { out, log: () => {} }), /outside the repository or under tmp/, out);
  }
  assert.equal(existsSync("public/report"), false);
  assert.equal(existsSync("Public/report"), false);
});

test("9. control characters in archive names never reach the terminal", async () => {
  const archive = join(scratch(), "esc.tar");
  writeFileSync(archive, tarArchive([["../\u001b[8mx.xml", XML], ["dump/\u001b]0;pwned\u0007export.xml", XML]]));
  const backup = await openBackup(archive);
  const shown = JSON.stringify({ xml: backup.xmlDisplay, notes: backup.notes });
  backup.cleanup();
  assert.doesNotMatch(shown, /\\u001b|\\u0007/);
  assert.equal(clean("a\u001b[31mb\u0085c‮d\n"), "a[31mbcd");
  const cli = spawnSync(process.execPath, ["scripts/compare-wiki-backup.mjs", join(scratch(), "missing-\u001b[2J.xml"), "--out", join(scratch(), "out")], { encoding: "utf8" });
  assert.equal(cli.status, 1);
  assert.doesNotMatch(cli.stdout + cli.stderr, /\u001b/);
});

test("10. REPORT.md escapes Markdown and HTML in backup text", async () => {
  const title = "[x](javascript:alert(1)) <img src=x onerror=alert(1)> *b* | c";
  const report = await reconcile({ xml: exportFile(roundTrip([page(title, "99600", [revision("99601", "2026-01-01T00:00:00Z", "x")])])) });
  const markdown = renderMarkdown(report);
  assert.doesNotMatch(markdown, /<img|\]\(javascript/);
  assert.ok(markdown.includes("\\[x\\]\\(javascript:alert\\(1\\)\\) &lt;img src=x onerror=alert\\(1\\)&gt; \\*b\\* \\| c"));
  assert.equal(markdownText("a\nb_c"), "a b\\_c");
});

test("11. a failed run leaves no earlier report behind", async () => {
  const out = join(scratch(), "out");
  for (const name of ["report.html", "report.json", "REPORT.md", "newer-revisions.jsonl"]) put(join(out, name), "old");
  const dir = join(scratch(), "backup");
  put(join(dir, "wiki.sql"), "-- MariaDB dump 10.19\n");
  await assert.rejects(compareBackup([dir], { out, log: () => {} }), { code: "SQL_ONLY" });
  for (const name of ["report.html", "report.json", "REPORT.md", "newer-revisions.jsonl"]) assert.equal(existsSync(join(out, name)), false, name);
});

test("a .sql name decides before the content, and a long page is read across chunks", async () => {
  const dump = join(scratch(), "dump.sql");
  writeFileSync(dump, roundTrip());
  await assert.rejects(openBackup(dump), { code: "SQL_ONLY" });
  const text = "Long page. ".repeat(400000);
  const report = await reconcile({ xml: exportFile(roundTrip([page("Long page", "99700", [revision("99701", "2026-01-01T00:00:00Z", text)])])) });
  assert.equal(report.new_pages.find((item) => item.title === "Long page").bytes, Buffer.byteLength(text));
});
