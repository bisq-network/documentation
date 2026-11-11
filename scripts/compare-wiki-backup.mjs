#!/usr/bin/env node
// Compare a full wiki backup with the restored articles, in one step:
//
//   npm run compare-backup -- <backup> [<another part of the backup> …] [--out <folder>] [--open]
//
// <backup> is whatever the backup is: a folder, an archive (.tar, .tar.gz, .tar.bz2,
// .tar.xz, .zip, or .7z with 7-Zip installed) or a bare MediaWiki XML export
// (plain, .gz, .bz2 or .xz). The XML export and the images folder are found
// inside it; archives are unpacked into a temporary folder outside the repository
// that is removed afterwards. A database dump is never opened: if the backup has
// only one, the command explains how to get an XML export from it.
//
// Writes report.html (open it in a browser), REPORT.md, report.json and
// newer-revisions.jsonl to tmp/wiki-backup-intake (ignored by git) or --out.
import { spawn } from "node:child_process";
import { mkdtempSync, realpathSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { BackupError, openBackup } from "./lib/backup-input.mjs";
import { checkOutputFolder, reconcile, writeReports } from "./reconcile-wiki-backup.mjs";

const root = fileURLToPath(new URL("..", import.meta.url));
const usage = `Usage: npm run compare-backup -- <backup folder, archive or XML export> [more backup parts] [--out <folder>] [--open]

Examples:
  npm run compare-backup -- ~/Downloads/bisq-wiki-backup.tar.gz
  npm run compare-backup -- ~/Downloads/bisq-wiki-backup/            (a folder)
  npm run compare-backup -- bisq-wiki-full.xml.bz2 webroot.tar.gz    (export and images apart)`;

// Temporary folders in use, removed on exit even when the command is interrupted.
const workFolders = new Set();

export async function compareBackup(inputs, { out, cwd = process.cwd(), log = console.log } = {}) {
    const output = resolve(cwd, out ?? resolve(root, "tmp/wiki-backup-intake"));
    checkOutputFolder(output, root);
    log(`Reading the backup: ${inputs.join(", ")}`);
    const work = mkdtempSync(join(tmpdir(), "bisq-wiki-compare-"));
    workFolders.add(work);
    try {
        const backup = await openBackup(inputs.map((input) => resolve(cwd, input)), { workRoot: work });
        log(`  XML export: ${backup.xmlDisplay} (${(backup.xmlBytes / 1024 / 1024).toFixed(1)} MB)`);
        log(backup.images ? `  Images:     ${backup.imagesDisplay} (${backup.imageFiles} files)` : "  Images:     none found, images are not compared");
        for (const note of backup.notes) log(`  Note: ${note}`);
        log("Comparing with the restored articles…");
        const report = await reconcile({ xml: backup.xml, images: backup.images ?? undefined, root });
        const files = writeReports(report, output, {
            root,
            source: {
                inputs: inputs.map((input) => basename(resolve(cwd, input))),
                xml: backup.xmlDisplay, xml_bytes: backup.xmlBytes,
                images: backup.imagesDisplay, other_xml: backup.otherXml, sql: backup.sql, notes: backup.notes,
            },
        });
        const s = report.summary;
        log(`Done. ${s.unchanged} of ${s.restored_articles} articles unchanged, ${s.newer_revision} edited later, ${s.restored_articles - s.unchanged - s.newer_revision} to look at; ${s.gap_markers_in_backup} of ${s.gap_markers} gaps fillable; ${s.new_pages} articles only in the backup.`);
        log(`Report: ${files.html}`);
        return { report, files };
    } finally {
        rmSync(work, { recursive: true, force: true });
        workFolders.delete(work);
    }
}

async function main() {
    let parsed;
    try {
        parsed = parseArgs({ allowPositionals: true, options: { out: { type: "string" }, open: { type: "boolean", default: false }, help: { type: "boolean", short: "h", default: false } } });
    } catch (error) {
        console.error(`${error.message}\n\n${usage}`);
        process.exit(2);
    }
    const { values, positionals } = parsed;
    if (values.help || !positionals.length) {
        (values.help ? console.log : console.error)(usage);
        process.exit(values.help ? 0 : 2);
    }
    // npm runs scripts from the repository root; resolve paths from where the command was typed.
    const cwd = process.env.INIT_CWD || process.cwd();
    try {
        const { files } = await compareBackup(positionals, { out: values.out, cwd });
        if (values.open) {
            const opener = process.platform === "darwin" ? "open" : process.platform === "win32" ? "explorer" : "xdg-open";
            spawn(opener, [files.html], { stdio: "ignore", detached: true }).on("error", () => console.log(`Open ${files.html} in a browser.`)).unref();
        } else console.log("Open it in a browser, or add --open next time.");
    } catch (error) {
        if (error instanceof BackupError && error.code === "SQL_ONLY") {
            console.error(`\n${error.message}`);
            process.exit(3);
        }
        console.error(`\n${error.message}`);
        process.exit(1);
    }
}

if (process.argv[1] && realpathSync(resolve(process.argv[1])) === fileURLToPath(import.meta.url)) {
    for (const signal of ["SIGINT", "SIGTERM"]) {
        process.once(signal, () => {
            for (const work of workFolders) rmSync(work, { recursive: true, force: true });
            process.exit(130);
        });
    }
    await main();
}
