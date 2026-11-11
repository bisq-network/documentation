// Find the MediaWiki XML export and the images folder in a wiki backup, whatever
// shape it arrives in: a folder, a bare export (plain, .gz, .bz2 or .xz), or an
// archive (.tar with any of those compressions, .zip, or .7z when a 7-Zip command
// is installed). Archives and compressed files are unpacked into a new temporary
// folder outside the repository, which the caller removes with cleanup().
//
// The backup is untrusted input. Only what the comparison needs is unpacked: XML
// files, the images/ tree (without thumbnails, old versions and deleted files) and
// archives nested inside. Database dumps, LocalSettings.php and everything else are
// noted by name only and never read. Archive members with an absolute path, a ".."
// segment, or a link type are skipped, and every output path is checked to stay
// inside the extraction folder, so an archive cannot write anywhere else. Unpacking
// stops at a byte limit (maxBytes), and ZIP entries may not overlap, so a small
// archive cannot fill the disk. Names from the backup are cleaned of control
// characters before they are shown.
import { spawn, spawnSync } from "node:child_process";
import { closeSync, createReadStream, fstatSync, mkdirSync, mkdtempSync, openSync, readSync, readdirSync, rmSync, statSync, writeFileSync, writeSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, dirname, join, resolve, sep } from "node:path";
import { createGunzip, createInflateRaw, crc32 } from "node:zlib";
import { clean, hashRegularFile } from "./safe-files.mjs";

export class BackupError extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
    }
}

const XML_NAME = /\.xml(?:\.(?:gz|bz2|xz))?$/i;
const ARCHIVE_NAME = /\.(?:tar|tgz|tbz2?|txz|zip|7z|tar\.(?:gz|bz2|xz))$/i;
const SQL_NAME = /\.(?:sql|mysql)(?:\.(?:gz|bz2|xz|zst|7z|zip))?$/i;
const DATABASE_NAME = /\.(?:sqlite3?|sqlite\.(?:gz|bz2|xz))$/i;
// MediaWiki keeps derived and private files beside the uploads: thumbnails, old
// versions (archive/), deleted files and lock files. Only current uploads are compared.
const SKIP_IMAGE_DIRS = new Set(["thumb", "temp", "deleted", "lockdir", "archive", "transcoded"]);
const MAX_ARCHIVE_DEPTH = 3;
/** Default limit on everything unpacked from one backup: 20 GB. */
export const DEFAULT_MAX_BYTES = 20 * 1024 ** 3;

/** Parse a size such as "500M", "20G" or "1048576" into bytes. */
export function parseSize(text) {
    const match = /^\s*(\d+(?:\.\d+)?)\s*([kmgt]?)b?\s*$/i.exec(String(text));
    if (!match) throw new BackupError("USAGE", `Not a size: ${clean(text)}. Use a number of bytes or, for example, 500M or 40G.`);
    const power = { "": 0, k: 1, m: 2, g: 3, t: 4 }[match[2].toLowerCase()];
    return Math.floor(Number(match[1]) * 1024 ** power);
}

const sizeText = (bytes) => bytes >= 1024 ** 3 ? `${(bytes / 1024 ** 3).toFixed(1)} GB` : `${Math.max(1, Math.round(bytes / 1024 ** 2))} MB`;

/** What a member of the backup is used for, judged by its path only. */
function memberKind(segments) {
    const name = segments.at(-1);
    if (SQL_NAME.test(name)) return "sql";
    if (DATABASE_NAME.test(name)) return "database";
    if (name === "LocalSettings.php") return "settings";
    const images = segments.findIndex((segment) => segment.toLowerCase() === "images");
    if (images >= 0 && images < segments.length - 1) {
        return SKIP_IMAGE_DIRS.has(segments[images + 1].toLowerCase()) || name.startsWith(".") ? null : "image";
    }
    if (XML_NAME.test(name)) return "xml";
    if (ARCHIVE_NAME.test(name) || /\.xml\.7z$/i.test(name)) return "archive";
    return null;
}

/** Split an archive member path into safe segments, or null for an unsafe path. */
export function safeSegments(name) {
    const clean = String(name).replaceAll("\\", "/");
    if (clean.startsWith("/") || /^[a-z]:/i.test(clean) || clean.includes("\0")) return null;
    const segments = clean.split("/").filter((segment) => segment && segment !== ".");
    if (!segments.length || segments.includes("..")) return null;
    return segments;
}

function outputPath(dest, segments) {
    const path = resolve(dest, ...segments);
    if (!path.startsWith(resolve(dest) + sep)) return null;
    return path;
}

function readHead(path, bytes = 4096) {
    const fd = openSync(path, "r");
    try {
        const buffer = Buffer.alloc(bytes);
        return buffer.subarray(0, readSync(fd, buffer, 0, bytes, 0));
    } finally {
        closeSync(fd);
    }
}

/**
 * Identify a file. A database dump's name (.sql, .sql.gz, …) decides first, so a
 * dump is never opened as XML; otherwise the first bytes decide.
 */
export function sniff(head, name = "") {
    if (SQL_NAME.test(name) || DATABASE_NAME.test(name)) return "sql";
    const starts = (...bytes) => bytes.every((byte, index) => head[index] === byte);
    if (starts(0x1f, 0x8b)) return "gzip";
    if (starts(0x42, 0x5a, 0x68)) return "bzip2";
    if (starts(0xfd, 0x37, 0x7a, 0x58, 0x5a, 0x00)) return "xz";
    if (starts(0x37, 0x7a, 0xbc, 0xaf, 0x27, 0x1c)) return "7z";
    if (starts(0x50, 0x4b, 0x03, 0x04) || starts(0x50, 0x4b, 0x05, 0x06)) return "zip";
    if (starts(0x28, 0xb5, 0x2f, 0xfd)) return "zstd";
    if (head.length >= 262 && head.subarray(257, 262).toString("latin1") === "ustar") return "tar";
    if (head.subarray(0, 16).toString("latin1") === "SQLite format 3\0") return "database";
    const text = head.toString("utf8").replace(/^\uFEFF/, "");
    if (/<mediawiki[\s>]/.test(text)) return "xml";
    if (/^--\s*(?:MySQL|MariaDB|PostgreSQL) (?:dump|database dump)/m.test(text)) return "sql";
    return "unknown";
}

/** Decompressed bytes of a .gz, .bz2 or .xz file, as an async iterable of Buffers. */
async function* decompress(path, format) {
    if (format === "gzip") {
        const source = createReadStream(path);
        const gunzip = createGunzip();
        source.on("error", (error) => gunzip.destroy(error));
        try {
            for await (const chunk of source.pipe(gunzip)) yield chunk;
        } catch (error) {
            throw new BackupError("DAMAGED", `${basename(path)} could not be decompressed (${error.message}). The file may be incomplete; download it again.`);
        } finally {
            source.destroy();
        }
        return;
    }
    const tool = format === "bzip2" ? "bzip2" : "xz";
    if (!hasTool(tool)) throw new BackupError("TOOL_MISSING", `${basename(path)} is ${tool}-compressed, but the ${tool} command is not installed. Install ${tool}, or decompress the file yourself and pass the result.`);
    const child = spawn(tool, ["-dc", path], { stdio: ["ignore", "pipe", "pipe"] });
    let stderr = "";
    child.stderr.setEncoding("utf8").on("data", (text) => { stderr += text; });
    const exited = new Promise((done, fail) => {
        child.on("error", fail);
        child.on("close", (code, signal) => done({ code, signal }));
    });
    try {
        for await (const chunk of child.stdout) yield chunk;
        const { code, signal } = await exited;
        if (code !== 0) throw new BackupError("DAMAGED", `${basename(path)} could not be decompressed: ${stderr.trim() || `${tool} stopped (${code ?? signal})`}. The file may be incomplete; download it again.`);
    } finally {
        if (child.exitCode === null && child.signalCode === null) child.kill();
    }
}

async function* fileChunks(path) {
    yield* createReadStream(path, { highWaterMark: 1 << 20 });
}

async function peek(chunks, bytes = 4096) {
    const parts = [];
    let length = 0;
    for await (const chunk of chunks) {
        parts.push(chunk);
        length += chunk.length;
        if (length >= bytes) break;
    }
    return Buffer.concat(parts).subarray(0, bytes);
}

async function writeChunks(chunks, path, context, display) {
    const fd = openSync(path, "wx");
    try {
        for await (const chunk of chunks) {
            context.charge(chunk.length, display);
            writeSync(fd, chunk);
        }
    } finally {
        closeSync(fd);
    }
}

const toolCache = new Map();
export function hasTool(name) {
    if (!toolCache.has(name)) toolCache.set(name, spawnSync(name, ["--help"], { stdio: "ignore" }).error === undefined);
    return toolCache.get(name);
}

/** Reads exact byte counts from an async iterable of Buffers. */
class ByteReader {
    constructor(chunks) {
        this.iterator = chunks[Symbol.asyncIterator]();
        this.buffer = Buffer.alloc(0);
        this.ended = false;
    }

    async fill(bytes) {
        while (this.buffer.length < bytes && !this.ended) {
            const next = await this.iterator.next();
            if (next.done) this.ended = true;
            else this.buffer = this.buffer.length ? Buffer.concat([this.buffer, next.value]) : next.value;
        }
    }

    async read(bytes) {
        await this.fill(bytes);
        if (this.buffer.length < bytes) return null;
        const out = this.buffer.subarray(0, bytes);
        this.buffer = this.buffer.subarray(bytes);
        return out;
    }

    /** Pass the next `bytes` bytes to onChunk (or drop them) without holding them all. */
    async pass(bytes, onChunk) {
        while (bytes > 0) {
            if (!this.buffer.length) await this.fill(1);
            if (!this.buffer.length) return false;
            const take = Math.min(bytes, this.buffer.length);
            onChunk?.(this.buffer.subarray(0, take));
            this.buffer = this.buffer.subarray(take);
            bytes -= take;
        }
        return true;
    }

    async close() {
        await this.iterator.return?.();
    }
}

const cString = (buffer) => {
    const end = buffer.indexOf(0);
    return buffer.subarray(0, end < 0 ? buffer.length : end).toString("utf8");
};

function tarNumber(buffer) {
    if (buffer[0] & 0x80) {
        // GNU base-256 encoding for sizes of 8 GiB and more.
        let value = 0;
        for (let i = 1; i < buffer.length; i++) value = value * 256 + buffer[i];
        return value;
    }
    const text = cString(buffer).trim();
    return text ? parseInt(text, 8) : 0;
}

function tarChecksumOk(header) {
    let sum = 0;
    for (let i = 0; i < 512; i++) sum += i >= 148 && i < 156 ? 32 : header[i];
    return sum === tarNumber(header.subarray(148, 156));
}

function paxRecords(data) {
    const records = {};
    let at = 0;
    while (at < data.length) {
        const space = data.indexOf(0x20, at);
        if (space < 0) break;
        const length = parseInt(data.subarray(at, space).toString("latin1"), 10);
        if (!length) break;
        const record = data.subarray(space + 1, at + length - 1).toString("utf8");
        const equals = record.indexOf("=");
        if (equals > 0) records[record.slice(0, equals)] = record.slice(equals + 1);
        at += length;
    }
    return records;
}

/** Extract the wanted members of a tar stream; links and unsafe paths are skipped. */
async function extractTar(chunks, dest, context, display) {
    const reader = new ByteReader(chunks);
    let longName = null, pax = {};
    let members = 0;
    try {
        for (;;) {
            const header = await reader.read(512);
            if (!header) throw new BackupError("DAMAGED", `${display} ends without the tar end-of-archive marker: the archive is incomplete.`);
            if (header.every((byte) => byte === 0)) break;
            if (!tarChecksumOk(header)) throw new BackupError("DAMAGED", `${display} is not a readable tar archive (damaged header after ${members} members).`);
            const type = header[156] ? String.fromCharCode(header[156]) : "0";
            const size = pax.size !== undefined ? Number(pax.size) : tarNumber(header.subarray(124, 136));
            const padding = (512 - (size % 512)) % 512;
            if (type === "x" || type === "g" || type === "L" || type === "K") {
                if (size > 1 << 20) throw new BackupError("DAMAGED", `${display} has an oversized tar extension header.`);
                const data = await reader.read(size + padding);
                if (!data) throw new BackupError("DAMAGED", `${display} ends in a tar extension header: the archive is incomplete.`);
                if (type === "x") pax = paxRecords(data.subarray(0, size));
                if (type === "L") longName = cString(data.subarray(0, size));
                continue;
            }
            const prefix = header.subarray(257, 262).toString("latin1") === "ustar" ? cString(header.subarray(345, 500)) : "";
            const name = pax.path ?? longName ?? (prefix ? `${prefix}/${cString(header.subarray(0, 100))}` : cString(header.subarray(0, 100)));
            longName = null;
            pax = {};
            members++;
            let fd = null;
            if ((type === "0" || type === "7") && !name.endsWith("/")) fd = context.claim(name, dest, display);
            else if (type === "1" || type === "2") context.links++;
            try {
                const complete = await reader.pass(size, fd === null ? undefined : (chunk) => {
                    context.charge(chunk.length, display);
                    writeSync(fd, chunk);
                });
                if (!complete || !(await reader.pass(padding))) throw new BackupError("DAMAGED", `${display} ends in the middle of ${clean(name)}: the archive is incomplete.`);
            } finally {
                if (fd !== null) closeSync(fd);
            }
        }
    } finally {
        await reader.close();
    }
    if (!members) throw new BackupError("DAMAGED", `${display} is an empty or unreadable tar archive.`);
}

function findEndOfCentralDirectory(fd, size) {
    const length = Math.min(size, 65557);
    const tail = Buffer.alloc(length);
    readSync(fd, tail, 0, length, size - length);
    for (let i = length - 22; i >= 0; i--) {
        if (tail.readUInt32LE(i) !== 0x06054b50) continue;
        let entries = tail.readUInt16LE(i + 10), cdSize = tail.readUInt32LE(i + 12), cdOffset = tail.readUInt32LE(i + 16);
        if (entries === 0xffff || cdSize === 0xffffffff || cdOffset === 0xffffffff) {
            // ZIP64: the locator just before the record points to the 64-bit end record.
            const locator = Buffer.alloc(20);
            readSync(fd, locator, 0, 20, size - length + i - 20);
            if (locator.readUInt32LE(0) !== 0x07064b50) throw new BackupError("DAMAGED", "damaged ZIP64 archive");
            const record = Buffer.alloc(56);
            readSync(fd, record, 0, 56, Number(locator.readBigUInt64LE(8)));
            entries = Number(record.readBigUInt64LE(32));
            cdSize = Number(record.readBigUInt64LE(40));
            cdOffset = Number(record.readBigUInt64LE(48));
        }
        return { entries, cdSize, cdOffset };
    }
    return null;
}

/** Read a ZIP central directory and check it before anything is unpacked. */
function readZipDirectory(fd, size, display) {
    const end = findEndOfCentralDirectory(fd, size);
    if (!end) throw new BackupError("DAMAGED", `${display} is not a readable ZIP archive (no central directory). It may be incomplete.`);
    if (end.cdOffset + end.cdSize > size || end.entries * 46 > end.cdSize) throw new BackupError("DAMAGED", `${display} has a damaged ZIP directory.`);
    const cd = Buffer.alloc(end.cdSize);
    readSync(fd, cd, 0, end.cdSize, end.cdOffset);
    const entries = [];
    let at = 0;
    for (let n = 0; n < end.entries; n++) {
        if (at + 46 > cd.length || cd.readUInt32LE(at) !== 0x02014b50) throw new BackupError("DAMAGED", `${display} has a damaged ZIP directory.`);
        const madeBy = cd.readUInt16LE(at + 4) >> 8, flags = cd.readUInt16LE(at + 8), method = cd.readUInt16LE(at + 10);
        const crc = cd.readUInt32LE(at + 16);
        let compressed = cd.readUInt32LE(at + 20), uncompressed = cd.readUInt32LE(at + 24);
        const nameLength = cd.readUInt16LE(at + 28), extraLength = cd.readUInt16LE(at + 30), commentLength = cd.readUInt16LE(at + 32);
        const attributes = cd.readUInt32LE(at + 38);
        let offset = cd.readUInt32LE(at + 42);
        const name = cd.subarray(at + 46, at + 46 + nameLength).toString(flags & 0x800 ? "utf8" : "latin1");
        const extra = cd.subarray(at + 46 + nameLength, at + 46 + nameLength + extraLength);
        at += 46 + nameLength + extraLength + commentLength;
        for (let e = 0; e + 4 <= extra.length;) {
            const id = extra.readUInt16LE(e), length = extra.readUInt16LE(e + 2);
            if (id === 0x0001) {
                let z = e + 4;
                if (uncompressed === 0xffffffff) { uncompressed = Number(extra.readBigUInt64LE(z)); z += 8; }
                if (compressed === 0xffffffff) { compressed = Number(extra.readBigUInt64LE(z)); z += 8; }
                if (offset === 0xffffffff) offset = Number(extra.readBigUInt64LE(z));
            }
            e += 4 + length;
        }
        // Where the entry's data really is, from its local header.
        const local = Buffer.alloc(30);
        if (offset + 30 > end.cdOffset || readSync(fd, local, 0, 30, offset) !== 30 || local.readUInt32LE(0) !== 0x04034b50) throw new BackupError("DAMAGED", `${display} › ${clean(name)}: damaged ZIP entry.`);
        const start = offset + 30 + local.readUInt16LE(26) + local.readUInt16LE(28);
        if (start + compressed > end.cdOffset) throw new BackupError("DAMAGED", `${display} › ${clean(name)}: damaged ZIP entry.`);
        entries.push({ name, madeBy, flags, method, crc, compressed, uncompressed, attributes, offset, start });
    }
    // Entries that share data unpack the same bytes many times (a "zip bomb").
    const ordered = [...entries].sort((a, b) => a.offset - b.offset);
    for (let i = 1; i < ordered.length; i++) {
        if (ordered[i].offset < ordered[i - 1].start + ordered[i - 1].compressed) throw new BackupError("DAMAGED", `${display} has ZIP entries that overlap, which a real backup never has. Refusing to unpack it.`);
    }
    return entries;
}

/** Extract the wanted members of a ZIP file; links, encrypted and unsafe members are skipped. */
async function extractZip(path, dest, context, display) {
    const fd = openSync(path, "r");
    try {
        const entries = readZipDirectory(fd, fstatSync(fd).size, display);
        for (const { name, madeBy, flags, method, crc, compressed, uncompressed, attributes, start } of entries) {
            if (name.endsWith("/")) continue;
            if (madeBy === 3 && ((attributes >>> 16) & 0o170000) === 0o120000) { context.links++; continue; }
            if (flags & 1) { context.note(`${display} › ${clean(name)}: encrypted, skipped.`); continue; }
            if (method !== 0 && method !== 8) {
                if (context.accept(name, display)) context.note(`${display} › ${clean(name)}: not extracted, its ZIP compression method (${method}) is not supported. Extract the archive yourself and pass the folder.`);
                continue;
            }
            const target = context.claim(name, dest, display);
            if (target === null) continue;
            try {
                let checksum = 0, written = 0;
                if (compressed > 0) {
                    const source = createReadStream(path, { start, end: start + compressed - 1 });
                    const data = method === 8 ? source.pipe(createInflateRaw()) : source;
                    if (data !== source) source.on("error", (error) => data.destroy(error));
                    try {
                        for await (const chunk of data) {
                            written += chunk.length;
                            // Stop as soon as an entry grows past the size it declares.
                            if (written > uncompressed) throw new BackupError("DAMAGED", `${display} › ${clean(name)} unpacks to more than the ${uncompressed} bytes it declares. Refusing to continue.`);
                            context.charge(chunk.length, display);
                            checksum = crc32(chunk, checksum);
                            writeSync(target, chunk);
                        }
                    } finally {
                        source.destroy();
                    }
                }
                if (checksum !== crc || written !== uncompressed) throw new BackupError("DAMAGED", `${display} › ${clean(name)} is damaged (checksum mismatch).`);
            } finally {
                closeSync(target);
            }
        }
    } finally {
        closeSync(fd);
    }
}

function sevenZipTool() {
    return ["7zz", "7z", "7za"].find((name) => spawnSync(name, ["i"], { stdio: "ignore" }).error === undefined) ?? null;
}

/** Extract the wanted members of a 7z archive with the installed 7-Zip command. */
async function extract7z(path, dest, context, display) {
    const tool = sevenZipTool();
    if (!tool) throw new BackupError("TOOL_MISSING", `${display} is a 7z archive, but no 7-Zip command (7zz, 7z or 7za) is installed. Install 7-Zip, or extract the archive yourself and pass the folder.`);
    const list = spawnSync(tool, ["l", "-slt", "-sccUTF-8", path], { encoding: "utf8", maxBuffer: 1 << 30 });
    if (list.status !== 0) throw new BackupError("DAMAGED", `${display} could not be listed by ${tool}: ${(list.stderr || list.stdout).trim().split("\n").at(-1)}`);
    const body = list.stdout.split(/^-{10}$/m)[1] ?? "";
    const wanted = [];
    let declared = 0;
    for (const block of body.split(/\n\s*\n/)) {
        const fields = Object.fromEntries([...block.matchAll(/^([^=\n]+?) = (.*)$/gm)].map((match) => [match[1], match[2]]));
        if (!fields.Path || /^D/.test(fields.Attributes ?? "") || fields.Folder === "+") continue;
        if (/\sl[rwxsStT-]{9}/.test(fields.Attributes ?? "")) { context.links++; continue; }
        const segments = context.accept(fields.Path, display);
        if (segments) { wanted.push(fields.Path); declared += Number(fields.Size) || 0; }
    }
    if (!wanted.length) return;
    context.ensure(declared, display);
    const listFile = join(context.workDir, `7z-members-${++context.counter}.txt`);
    writeFileSync(listFile, wanted.join("\n") + "\n");
    const run = spawnSync(tool, ["x", "-y", "-spd", "-scsUTF-8", `-o${dest}`, path, `@${listFile}`], { encoding: "utf8", maxBuffer: 1 << 26 });
    if (run.status !== 0) throw new BackupError("DAMAGED", `${display} could not be extracted by ${tool}: ${(run.stderr || run.stdout).trim().split("\n").at(-1)}`);
    removeLinks(dest);
    context.charge(sizeOf(dest), display);
}

/** Bytes of the regular files in a folder. */
function sizeOf(dir) {
    let total = 0;
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const path = join(dir, entry.name);
        if (entry.isDirectory()) total += sizeOf(path);
        else if (entry.isFile()) total += statSync(path).size;
    }
    return total;
}

/** Delete any symbolic link inside an extraction folder. */
function removeLinks(dir) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const path = join(dir, entry.name);
        if (entry.isSymbolicLink()) rmSync(path);
        else if (entry.isDirectory()) removeLinks(path);
    }
}

/** Count current uploads in MediaWiki's hashed layout (images/a/ab/File.png). */
function hashedUploads(dir) {
    let count = 0;
    const list = (path) => { try { return readdirSync(path, { withFileTypes: true }); } catch { return []; } };
    for (const a of list(dir)) {
        if (!a.isDirectory() || !/^[0-9a-f]$/.test(a.name)) continue;
        for (const b of list(join(dir, a.name))) {
            if (b.isDirectory() && /^[0-9a-f]{2}$/.test(b.name)) count += list(join(dir, a.name, b.name)).filter((file) => file.isFile()).length;
        }
    }
    return count;
}

function countFiles(dir) {
    let count = 0;
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        if (entry.isFile()) count++;
        else if (entry.isDirectory() && !SKIP_IMAGE_DIRS.has(entry.name.toLowerCase())) count += countFiles(join(dir, entry.name));
    }
    return count;
}

const joinDisplay = (base, segments) => [base, segments.join("/")].filter(Boolean).map(clean).join(" › ");

function newContext(workDir, maxBytes) {
    const context = {
        workDir, counter: 0, links: 0, unpacked: 0,
        xml: [], images: [], sql: [], settings: [], notes: [], unsafe: [], ignored: [], pending: [],
        note(text) { context.notes.push(clean(text)); },
        /** Check that `bytes` more would stay within the limit. */
        ensure(bytes, display) {
            if (context.unpacked + bytes > maxBytes) {
                throw new BackupError("TOO_LARGE", `Unpacking ${display} would pass the limit of ${sizeText(maxBytes)} for one backup. If the backup really is that large, raise the limit, for example with --max-unpacked ${Math.ceil((context.unpacked + bytes) / 1024 ** 3) * 2}G.`);
            }
        },
        /** Count `bytes` just unpacked against the limit. */
        charge(bytes, display) {
            context.ensure(bytes, display);
            context.unpacked += bytes;
        },
        /** Decide whether an archive member is unpacked; returns its safe segments or null. */
        accept(name, display) {
            const segments = safeSegments(name);
            if (!segments) { context.unsafe.push(`${display} › ${clean(name)}`); return null; }
            const kind = memberKind(segments);
            if (kind === "sql" || kind === "database") context.sql.push(joinDisplay(display, segments));
            if (kind === "settings") context.settings.push(joinDisplay(display, segments));
            return kind === "xml" || kind === "archive" || kind === "image" ? segments : null;
        },
        /** Open the output file for a wanted member, or return null to skip it. */
        claim(name, dest, display) {
            const segments = context.accept(name, display);
            if (!segments) return null;
            const path = outputPath(dest, segments);
            if (!path) { context.unsafe.push(`${display} › ${clean(name)}`); return null; }
            try {
                mkdirSync(dirname(path), { recursive: true });
                return openSync(path, "w");
            } catch (error) {
                context.note(`${display} › ${clean(name)}: not extracted (${error.code ?? error.message}).`);
                return null;
            }
        },
    };
    return context;
}

/** Walk a folder (never following links) and queue what the comparison needs. */
function scanFolder(root, display, context, depth) {
    const stack = [[root, []]];
    while (stack.length) {
        const [dir, relative] = stack.pop();
        let entries;
        try { entries = readdirSync(dir, { withFileTypes: true }); } catch { continue; }
        for (const entry of entries) {
            const segments = [...relative, entry.name];
            const path = join(dir, entry.name);
            if (entry.isSymbolicLink()) { context.links++; continue; }
            if (entry.isDirectory()) {
                if (entry.name.toLowerCase() === "images") context.images.push({ path, display: joinDisplay(display, segments) || entry.name });
                else if (![".git", "node_modules"].includes(entry.name)) stack.push([path, segments]);
                continue;
            }
            if (!entry.isFile()) continue;
            const kind = memberKind(segments);
            if (kind === "sql" || kind === "database") context.sql.push(joinDisplay(display, segments));
            else if (kind === "settings") context.settings.push(joinDisplay(display, segments));
            else if (kind === "xml" || kind === "archive") context.pending.push({ path, display: joinDisplay(display, segments), depth });
        }
    }
}

async function unpackInto(context, display, depth, extract) {
    if (depth >= MAX_ARCHIVE_DEPTH) { context.note(`${display}: archive nested too deeply, not opened.`); return; }
    const dest = join(context.workDir, `unpacked-${++context.counter}`);
    mkdirSync(dest);
    await extract(dest);
    scanFolder(dest, display, context, depth + 1);
}

const innerName = (name) => name.replace(/\.(?:gz|bz2|xz)$/i, "").replace(/\.tgz$/i, ".tar").replace(/\.tbz2?$/i, ".tar").replace(/\.txz$/i, ".tar");

/** Identify one file and record, decompress or unpack it. */
async function handleFile(path, display, context, depth) {
    const format = sniff(readHead(path), basename(path));
    if (format === "xml") { context.xml.push({ path, display, bytes: statSync(path).size }); return; }
    if (format === "sql" || format === "database") { context.sql.push(display); return; }
    if (format === "tar") return unpackInto(context, display, depth, (dest) => extractTar(fileChunks(path), dest, context, display));
    if (format === "zip") return unpackInto(context, display, depth, (dest) => extractZip(path, dest, context, display));
    if (format === "7z") return unpackInto(context, display, depth, (dest) => extract7z(path, dest, context, display));
    if (format === "zstd") { context.note(`${display}: zstd compression is not supported; decompress it first (zstd -d) and pass the result.`); return; }
    if (format === "gzip" || format === "bzip2" || format === "xz") {
        const inner = innerName(basename(path));
        if (SQL_NAME.test(inner) || DATABASE_NAME.test(inner)) { context.sql.push(display); return; }
        const innerFormat = sniff(await peek(decompress(path, format)), inner);
        if (innerFormat === "tar") return unpackInto(context, display, depth, (dest) => extractTar(decompress(path, format), dest, context, display));
        if (innerFormat === "xml") {
            const out = join(context.workDir, `export-${++context.counter}.xml`);
            await writeChunks(decompress(path, format), out, context, display);
            context.xml.push({ path: out, display, bytes: statSync(out).size });
            return;
        }
        if (innerFormat === "sql" || innerFormat === "database") { context.sql.push(display); return; }
    }
    context.ignored.push(display);
}

function sqlOnlyMessage(sql, settings) {
    return [
        `The backup holds a database dump (${sql.join(", ")}) but no XML export of the wiki pages.`,
        "This comparison never opens a database dump: besides the pages it holds user accounts, email addresses and password hashes.",
        "",
        "To get the XML export, either:",
        "  1. ask the wiki operator to run, on the wiki server:",
        "       php -d display_errors=stderr maintenance/dumpBackup.php --full --quiet > bisq-wiki-full.xml",
        "  2. or, on a private machine with Docker, restore the dump into a throwaway MediaWiki 1.34 and export it there:",
        "       sh scripts/sql-dump-to-xml.sh <dump.sql | dump.sql.gz | dump.sql.bz2> <folder outside the repository>",
        "     The script removes its containers afterwards. It needs the wiki's database name if the dump holds several",
        `     databases; that is $wgDBname in the wiki's LocalSettings.php${settings.length ? ` (the backup has one: ${settings[0]})` : ""}.`,
        "",
        "Then run the comparison on the XML export, together with the images folder if you have it:",
        "  npm run compare-backup -- <folder with bisq-wiki-full.xml and images/>",
    ].join("\n");
}

const megabytes = (bytes) => `${(bytes / 1024 / 1024).toFixed(1)} MB`;

/** The one item whose display name is `wanted` or ends with it as a path. */
function pick(items, wanted) {
    const name = String(wanted).replaceAll("\\", "/").replace(/^\/+/, "");
    const matches = items.filter((item) => item.display === name || item.display.endsWith(` › ${name}`) || item.display.endsWith(`/${name}`));
    return matches.length === 1 ? matches[0] : null;
}

/**
 * Locate the XML export and images folder in a backup. `inputs` is one path or
 * several (for example an XML export made from a database dump, plus the web-root
 * archive that holds images/). Options: workRoot (where to unpack), maxBytes
 * (limit on everything unpacked), xml and images (which export or images folder
 * to use when the backup has several, by the name the error message lists).
 * Returns { xml, xmlDisplay, xmlBytes, images, imagesDisplay, imageFiles,
 * otherImages, sql, notes, cleanup }. Throws BackupError: SQL_ONLY when only a
 * database dump is present, NO_EXPORT when no MediaWiki export is found,
 * CHOOSE_EXPORT when there are several different exports and none was chosen,
 * NOT_FOUND, TOO_LARGE, DAMAGED, TOOL_MISSING or UNSUPPORTED otherwise.
 */
export async function openBackup(inputs, { workRoot = tmpdir(), maxBytes = DEFAULT_MAX_BYTES, xml: wantedXml, images: wantedImages } = {}) {
    const paths = [inputs].flat().map((input) => resolve(input));
    const stats = paths.map((path, index) => {
        try { return statSync(path); } catch { throw new BackupError("NOT_FOUND", `${clean([inputs].flat()[index])} does not exist.`); }
    });
    const workDir = mkdtempSync(join(workRoot, "bisq-wiki-backup-"));
    const cleanup = () => rmSync(workDir, { recursive: true, force: true });
    try {
        const context = newContext(workDir, maxBytes);
        paths.forEach((path, index) => {
            const display = clean(basename(path));
            // A folder given on its own may be the images folder itself.
            if (stats[index].isDirectory() && (basename(path).toLowerCase() === "images" || hashedUploads(path))) context.images.push({ path, display });
            else if (stats[index].isDirectory()) scanFolder(path, paths.length > 1 ? display : "", context, 0);
            else context.pending.push({ path, display, depth: 0 });
        });
        while (context.pending.length) {
            const { path, display, depth } = context.pending.shift();
            await handleFile(path, display, context, depth);
        }
        if (context.unsafe.length) context.note(`Skipped ${context.unsafe.length} archive member(s) with an unsafe path: ${context.unsafe.slice(0, 5).join(", ")}${context.unsafe.length > 5 ? ", …" : ""}`);
        if (context.links) context.note(`Ignored ${context.links} symbolic or hard link(s).`);
        if (!context.xml.length) {
            if (context.sql.length) throw new BackupError("SQL_ONLY", sqlOnlyMessage(context.sql, context.settings));
            throw new BackupError("NO_EXPORT", [
                `No MediaWiki XML export was found in ${[inputs].flat().map(clean).join(", ")}.`,
                "Looked for .xml files (plain, .gz, .bz2 or .xz), also inside .tar, .tar.gz, .tar.bz2, .tar.xz, .zip and .7z archives.",
                ...(context.ignored.length ? [`Not recognised: ${context.ignored.slice(0, 10).join(", ")}`] : []),
                ...context.notes,
            ].join("\n"));
        }

        // Several exports: identical copies count once; different ones must be chosen.
        const exports = [];
        const seen = new Set();
        for (const item of context.xml.sort((a, b) => b.bytes - a.bytes)) {
            const hash = context.xml.length > 1 ? await hashRegularFile(item.path) : "only";
            if (seen.has(hash)) continue;
            seen.add(hash);
            exports.push(item);
        }
        let xml = exports[0];
        if (wantedXml !== undefined) {
            xml = pick(exports, wantedXml);
            if (!xml) throw new BackupError("CHOOSE_EXPORT", `No single XML export matches ${clean(wantedXml)}. The backup holds:\n${exports.map((item) => `  ${item.display} (${megabytes(item.bytes)})`).join("\n")}`);
        } else if (exports.length > 1) {
            throw new BackupError("CHOOSE_EXPORT", [
                `The backup holds ${exports.length} different XML exports:`,
                ...exports.map((item) => `  ${item.display} (${megabytes(item.bytes)})`),
                "Comparing the wrong one would give a misleading report, so choose one. The full-history export (dumpBackup.php --full) is usually the largest. Run the command again with, for example:",
                `  --xml "${exports[0].display.split(" › ").at(-1)}"`,
            ].join("\n"));
        }

        // Images: MediaWiki's hashed layout wins; any other upload folder is named, not silently dropped.
        const candidates = context.images
            .map((dir) => ({ ...dir, hashed: hashedUploads(dir.path) }))
            .map((dir) => ({ ...dir, files: dir.hashed || countFiles(dir.path) }))
            .filter((dir) => dir.files > 0)
            .sort((a, b) => b.hashed - a.hashed || b.files - a.files);
        let images = candidates[0] ?? null;
        if (wantedImages !== undefined) {
            images = pick(candidates, wantedImages);
            if (!images) throw new BackupError("CHOOSE_IMAGES", `No single images folder matches ${clean(wantedImages)}. The backup holds:\n${candidates.map((dir) => `  ${dir.display} (${dir.files} files)`).join("\n") || "  none"}`);
        }
        const otherImages = candidates.filter((dir) => dir !== images && (dir.hashed || !images?.hashed));
        if (otherImages.length) {
            context.note(`Other images folders were found and not compared: ${otherImages.map((dir) => `${dir.display} (${dir.files} files)`).join(", ")}. To compare one of them instead, add --images "${otherImages[0].display.split(" › ").at(-1)}".`);
        }
        return {
            xml: xml.path,
            xmlDisplay: xml.display,
            xmlBytes: xml.bytes,
            images: images?.path ?? null,
            imagesDisplay: images?.display ?? null,
            imageFiles: images?.files ?? 0,
            otherImages: otherImages.map((dir) => dir.display),
            sql: context.sql,
            notes: context.notes,
            cleanup,
        };
    } catch (error) {
        cleanup();
        throw error;
    }
}
