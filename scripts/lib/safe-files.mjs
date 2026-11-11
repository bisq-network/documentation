// File helpers for reading an untrusted backup. Links are never followed, only
// regular files are opened (a FIFO or device would block or never end), and
// strings from the backup are cleaned before they reach a terminal.
import { createHash } from "node:crypto";
import { closeSync, constants, createReadStream, fstatSync, lstatSync, openSync, readFileSync, readdirSync, realpathSync } from "node:fs";
import { basename, dirname, join, resolve, sep } from "node:path";

// O_NONBLOCK keeps open() from waiting on a FIFO; fstat then rejects it.
const FLAGS = constants.O_RDONLY | (constants.O_NOFOLLOW ?? 0) | (constants.O_NONBLOCK ?? 0);

/** Open a regular file without following a link; returns { fd, size } or null. */
export function openRegularFile(path) {
    let fd;
    try {
        fd = openSync(path, FLAGS);
    } catch {
        return null;
    }
    const stat = fstatSync(fd);
    if (!stat.isFile()) {
        closeSync(fd);
        return null;
    }
    return { fd, size: stat.size };
}

/** Read a regular file of at most maxBytes; null for anything else. */
export function readRegularFile(path, maxBytes = Infinity) {
    const file = openRegularFile(path);
    if (!file) return null;
    try {
        return file.size > maxBytes ? null : readFileSync(file.fd);
    } finally {
        closeSync(file.fd);
    }
}

/** SHA-256 of a regular file, or null when the path is not one. */
export async function hashRegularFile(path) {
    const file = openRegularFile(path);
    if (!file) return null;
    const hash = createHash("sha256");
    for await (const chunk of createReadStream(path, { fd: file.fd, autoClose: true })) hash.update(chunk);
    return hash.digest("hex");
}

/**
 * Regular files under root, without following links and skipping the named
 * folders. Each file's real path must stay under the real root.
 */
export function listRegularFiles(root, { skip = new Set() } = {}) {
    const base = realpathSync(root);
    const files = [];
    const walk = (dir, segments) => {
        for (const entry of readdirSync(dir, { withFileTypes: true })) {
            const path = join(dir, entry.name);
            if (entry.isDirectory()) {
                if (!skip.has(entry.name.toLowerCase())) walk(path, [...segments, entry.name]);
            } else if (entry.isFile()) {
                let real;
                try { real = realpathSync(path); } catch { continue; }
                if (real.startsWith(base + sep)) files.push({ name: entry.name, path: real, bytes: lstatSync(real).size, segments: [...segments, entry.name] });
            }
        }
    };
    walk(base, []);
    return files;
}

// C0 and C1 control characters, and the bidirectional overrides that can reorder
// what a terminal shows.
const CONTROL = /[\u0000-\u001f\u007f-\u009f‎‏‪-‮⁦-⁩]/g;

/** Remove control characters from a string taken from the backup. */
export const clean = (value) => String(value ?? "").replace(CONTROL, "");

/**
 * Real, case-folded form of a path that may not exist yet: the nearest existing
 * ancestor is resolved (following links), and the rest is appended.
 */
export function realPathOf(path) {
    // lstat, so a dangling link counts as existing and realpath then refuses it.
    const exists = (candidate) => { try { lstatSync(candidate); return true; } catch { return false; } };
    let existing = resolve(path);
    const rest = [];
    while (!exists(existing) && dirname(existing) !== existing) {
        rest.unshift(basename(existing));
        existing = dirname(existing);
    }
    return join(realpathSync(existing), ...rest).toLowerCase();
}

/** True when path is root or inside it, after resolving links and ignoring case. */
export function isInsidePath(path, root) {
    const full = realPathOf(path), base = realPathOf(root);
    return full === base || full.startsWith(base + sep);
}
