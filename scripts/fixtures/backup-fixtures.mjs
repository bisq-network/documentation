// Builders for synthetic wiki backups, shared by the backup comparison tests.
// Everything is made from the restored snapshot itself, so every case is known.
import { createHash } from "node:crypto";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { crc32 } from "node:zlib";

export const escape = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
export const stored = (slug) => readFileSync(`public/wiki-source/${slug}.wiki.txt`, "utf8").replace(/<!-- BISQ VERSION: [^>]*? -->$/, "");
export const restored = [
  ...JSON.parse(readFileSync("migration/articles.json", "utf8")).items,
  ...JSON.parse(readFileSync("migration/additional-articles.json", "utf8")).items,
];
export const bySlug = new Map(restored.map((item) => [item.slug, item]));
export const named = (name, id = "7") => `<username>${escape(name)}</username><id>${id}</id>`;
export const revision = (id, timestamp, text, contributor = named("Editor A")) =>
  `<revision><id>${id}</id><timestamp>${timestamp}</timestamp><contributor>${contributor}</contributor><model>wikitext</model><format>text/x-wiki</format><text bytes="${Buffer.byteLength(text)}" xml:space="preserve">${escape(text)}</text><sha1>x</sha1></revision>`;
export const page = (title, id, revisions, { ns = 0, redirect = "" } = {}) =>
  `<page><title>${escape(title)}</title><ns>${ns}</ns><id>${id}</id>${redirect ? `<redirect title="${escape(redirect)}" />` : ""}${revisions.join("")}</page>`;
export const wrap = (pages) => `<mediawiki xmlns="http://www.mediawiki.org/xml/export-0.11/" version="0.11"><siteinfo><sitename>Bisq Wiki</sitename><base>https://bisq.wiki/Main_Page</base><generator>MediaWiki 1.34.4</generator></siteinfo>\n${pages.join("\n")}\n</mediawiki>\n`;
export const original = (item) => page(item.title, item.page_id, [revision(item.revision_id, item.revision_timestamp, stored(item.slug))]);
/** (a) Every restored article at its recorded revision, as the wiki stored it, plus extra pages. */
export const roundTrip = (extra = []) => wrap([...restored.map(original), ...extra]);

/** Where MediaWiki stores an upload: images/<a>/<ab>/<File_name>, from the MD5 of the name. */
export const hashedPath = (images, name) => {
  const file = name.replaceAll(" ", "_");
  const md5 = createHash("md5").update(file).digest("hex");
  return join(images, md5[0], md5.slice(0, 2), file);
};
export const put = (path, data) => { mkdirSync(dirname(path), { recursive: true }); writeFileSync(path, data); };
export const mkdirFor = (path) => { mkdirSync(dirname(path), { recursive: true }); return path; };

/** A temporary folder per call, removed by cleanupScratch(). */
const scratchDirs = [];
export const scratch = () => {
  const dir = mkdtempSync(join(tmpdir(), "compare-backup-test-"));
  scratchDirs.push(dir);
  return dir;
};
export const cleanupScratch = () => { for (const dir of scratchDirs.splice(0)) rmSync(dir, { recursive: true, force: true }); };

// Minimal archive writers, so unsafe members can be tested without relying on tools.
export function tarArchive(entries) {
  const blocks = [];
  for (const [name, data = Buffer.alloc(0), type = "0", link = ""] of entries) {
    const header = Buffer.alloc(512);
    header.write(name, 0, 100);
    header.write("0000644\0", 100);
    header.write("0000000\0", 108);
    header.write("0000000\0", 116);
    header.write(`${data.length.toString(8).padStart(11, "0")}\0`, 124);
    header.write("00000000000\0", 136);
    header.fill(" ", 148, 156);
    header.write(type, 156);
    header.write(link, 157, 100);
    header.write("ustar\0", 257);
    header.write("00", 263);
    let sum = 0;
    for (const byte of header) sum += byte;
    header.write(`${sum.toString(8).padStart(6, "0")}\0 `, 148);
    blocks.push(header, data, Buffer.alloc((512 - (data.length % 512)) % 512));
  }
  return Buffer.concat([...blocks, Buffer.alloc(1024)]);
}

export function zipArchive(entries) {
  const locals = [], centrals = [];
  let offset = 0;
  for (const [name, data, mode = 0o100644] of entries) {
    const file = Buffer.from(name), crc = crc32(data);
    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0); local.writeUInt16LE(20, 4); local.writeUInt16LE(0x800, 6);
    local.writeUInt32LE(crc, 14); local.writeUInt32LE(data.length, 18); local.writeUInt32LE(data.length, 22); local.writeUInt16LE(file.length, 26);
    const central = Buffer.alloc(46);
    central.writeUInt32LE(0x02014b50, 0); central.writeUInt16LE((3 << 8) | 20, 4); central.writeUInt16LE(20, 6); central.writeUInt16LE(0x800, 8);
    central.writeUInt32LE(crc, 16); central.writeUInt32LE(data.length, 20); central.writeUInt32LE(data.length, 24); central.writeUInt16LE(file.length, 28);
    central.writeUInt32LE((mode << 16) >>> 0, 38); central.writeUInt32LE(offset, 42);
    locals.push(local, file, data);
    centrals.push(central, file);
    offset += 30 + file.length + data.length;
  }
  const directory = Buffer.concat(centrals), end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0); end.writeUInt16LE(entries.length, 8); end.writeUInt16LE(entries.length, 10);
  end.writeUInt32LE(directory.length, 12); end.writeUInt32LE(offset, 16);
  return Buffer.concat([...locals, directory, end]);
}
