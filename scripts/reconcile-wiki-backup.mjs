#!/usr/bin/env node
// Compare a MediaWiki XML export from the full wiki backup with the restored snapshot.
//
//   node scripts/reconcile-wiki-backup.mjs --xml <export.xml> [--images <dir>] [--out <dir>]
//
// Reads only the export (and optionally the backup's images folder); writes
// report.json, REPORT.md and, for articles with newer revisions, a candidate
// converter input (newer-revisions.jsonl) to --out (default tmp/wiki-backup-intake).
// The output holds public wiki data only: titles, revision ids, timestamps and
// usernames. Anonymous editors are counted, never listed. Nothing in the
// repository is modified, and no network request is made.
import { createHash } from "node:crypto";
import { createReadStream, mkdirSync, readFileSync, readdirSync, realpathSync, statSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { readMediaWikiExport } from "./lib/mediawiki-export.mjs";

const read = (path) => JSON.parse(readFileSync(path, "utf8"));
const sha256 = (text) => createHash("sha256").update(text, "utf8").digest("hex");
// The snapshot downloader appended "<!-- BISQ VERSION: … -->" to every restored source.
// The wiki itself never stored it, so an unchanged page in the backup matches the
// snapshot text without that suffix, not the recorded file hash.
const INGEST_COMMENT = /<!-- BISQ VERSION: [^>]*? -->$/;
const key = (title) => title.replaceAll("_", " ").trim().replace(/^./, (c) => c.toUpperCase());

/** Collect the restored articles with their review context (notes, PRs, coverage status). */
export function loadSnapshot(root = ".") {
    const at = (path) => read(join(root, path));
    const articles = [
        ...at("migration/articles.json").items.map((item) => ({ ...item, origin: "snapshot" })),
        ...at("migration/additional-articles.json").items.map((item) => ({ ...item, origin: "additional" })),
    ];
    const notes = at("migration/source-review-notes.json").items;
    const coverage = new Map(at("review/proposal-coverage.json").items.map((item) => [item.slug, item]));
    const slugOf = (item) => item.slug || item.source_download?.match(/([^/]+)\.wiki\.txt$/)?.[1];
    return articles.map((item) => {
        const slug = slugOf(item);
        const proposal = coverage.get(slug);
        const source = readFileSync(join(root, "public/wiki-source", `${slug}.wiki.txt`), "utf8");
        return {
            title: item.title,
            slug,
            page_id: item.page_id,
            revision_id: item.revision_id,
            revision_timestamp: item.revision_timestamp,
            wikitext_sha256: item.wikitext_sha256,
            // Hashes a backup revision may match: the recorded file, and the file without the ingest comment.
            text_sha256s: [...new Set([item.wikitext_sha256, sha256(source.replace(INGEST_COMMENT, ""))])],
            template_gap_count: item.template_gap_count ?? 0,
            origin: item.origin,
            notes: notes.filter((note) => note.source_slugs.includes(slug)).map((note) => note.id),
            pull_requests: proposal?.pull_requests ?? [],
            proposal_status: proposal?.status ?? null,
        };
    });
}

/** Template names used in a wikitext source, excluding parser functions and magic words. */
export function templateNames(wikitext) {
    const names = new Set();
    for (const match of wikitext.matchAll(/\{\{\s*([^{}|#\n]+?)\s*(?:\||\}\})/g)) {
        const name = match[1].trim();
        if (!name || name.includes(":") && !/^Template:/i.test(name) || /^[A-Z]+$/.test(name)) continue;
        names.add(key(name.replace(/^Template:/i, "")));
    }
    return [...names].sort();
}

/** Summarize who edited after the restored revision: usernames, plus counts only. */
function editors(revisions) {
    const usernames = new Set();
    let anonymous = 0, hidden = 0;
    for (const { contributor } of revisions) {
        if (contributor.username) usernames.add(contributor.username);
        else if (contributor.anonymous) anonymous++;
        else hidden++;
    }
    return { usernames: [...usernames].sort(), anonymous, hidden };
}

const pageSummary = (page) => {
    const latest = page.revisions.at(-1);
    return { title: page.title, page_id: page.id, revision_id: latest?.id ?? null, timestamp: latest?.timestamp ?? null, bytes: latest?.bytes ?? null, revisions: page.revisions.length };
};

/**
 * Reconcile the export with the snapshot. Returns the report object; pages are
 * matched by page id first, then by title, so renamed pages are still found. A
 * page id match always wins: after a move, MediaWiki keeps the page id under the
 * new title and leaves a redirect with a new id at the old title.
 */
export async function reconcile({ xml, images, root = "." }) {
    const snapshot = loadSnapshot(root);
    const byId = new Map(snapshot.map((article) => [article.page_id, article]));
    const byTitle = new Map(snapshot.map((article) => [key(article.title), article]));
    const found = new Map();
    const newPages = [], redirects = [], templates = new Map(), files = [];
    let siteinfo = null, pageCount = 0, revisionCount = 0;
    const keepText = (page) => page.ns === 0 && (byId.has(page.id) || byTitle.has(key(page.title)));
    for await (const entry of readMediaWikiExport(xml, { keepText })) {
        if (entry.siteinfo) { siteinfo = entry.siteinfo; continue; }
        const page = entry.page;
        pageCount++;
        revisionCount += page.revisions.length;
        const latest = page.revisions.at(-1);
        if (page.ns === 10) templates.set(key(page.title.replace(/^[^:]+:/, "")), { title: page.title, revision_id: latest?.id ?? null, timestamp: latest?.timestamp ?? null });
        if (page.ns === 6) files.push(page.title.replace(/^[^:]+:/, ""));
        if (page.ns !== 0) continue;
        if (page.redirect) redirects.push({ title: page.title, target: page.redirect });
        const idMatch = byId.get(page.id);
        const article = idMatch || byTitle.get(key(page.title));
        if (page.redirect && !article) continue;
        if (!article) {
            newPages.push(pageSummary(page));
            continue;
        }
        const previous = found.get(article.slug);
        if (previous?.byId && !idMatch) {
            // Another page now holds this title; the article itself was matched by id.
            if (!page.redirect) newPages.push(pageSummary(page));
            continue;
        }
        if (previous && !previous.byId && idMatch && !previous.page.redirect) newPages.push(pageSummary(previous.page));
        found.set(article.slug, { page, latest, byId: !!idMatch });
    }
    if (!pageCount) throw new Error(`${xml} contains no pages.`);

    const articles = snapshot.map((article) => {
        const match = found.get(article.slug);
        if (!match) return { ...article, text_sha256s: undefined, status: "missing-from-backup" };
        const { page, latest } = match;
        const recorded = page.revisions.find((revision) => revision.id === article.revision_id);
        const after = page.revisions.filter((revision) => Number(revision.id) > Number(article.revision_id));
        const status = !latest ? "no-revisions"
            : page.redirect && latest.id !== article.revision_id ? "now-a-redirect"
            : latest.id === article.revision_id ? (article.text_sha256s.includes(latest.sha256) ? "unchanged" : "same-revision-text-differs")
            : Number(latest.id) > Number(article.revision_id) ? "newer-revision"
            : "backup-older";
        const history = editors(page.revisions);
        return {
            ...article,
            text_sha256s: undefined,
            status,
            backup_title: page.title === article.title ? undefined : page.title,
            redirect_target: page.redirect ?? undefined,
            recorded_revision_in_backup: !!recorded,
            recorded_revision_text_matches: recorded?.sha256 === undefined ? null : article.text_sha256s.includes(recorded.sha256),
            latest_revision_id: latest?.id ?? null,
            latest_timestamp: latest?.timestamp ?? null,
            revisions_after: after.length,
            editors_after: editors(after),
            full_history: { revisions: page.revisions.length, first_timestamp: page.revisions[0]?.timestamp ?? null, ...history },
            latest_text: status === "newer-revision" ? latest.text : undefined,
            latest_contributor: status === "newer-revision" ? latest.contributor : undefined,
        };
    });

    // Templates used by articles with recorded template gaps, and whether the backup has them.
    const templateGaps = articles.filter((article) => article.template_gap_count > 0).map((article) => {
        const source = readFileSync(join(root, "public/wiki-source", `${article.slug}.wiki.txt`), "utf8");
        const used = templateNames(source);
        return { slug: article.slug, title: article.title, gaps: article.template_gap_count, in_backup: used.filter((name) => templates.has(name)), not_in_backup: used.filter((name) => !templates.has(name)) };
    });

    // Redirects: does the backup agree with the redirects the site already serves?
    const titleRoutes = new Map(read(join(root, "migration/title-route-map.json")).items.map((item) => [key(item.title), item.route]));
    for (const item of read(join(root, "migration/additional-articles.json")).items) titleRoutes.set(key(item.title), item.route || `/wiki/${item.source_download.match(/([^/]+)\.wiki\.txt$/)[1]}/`);
    const served = new Map(read(join(root, "migration/archive-redirects-20261014.json")).items.map((item) => [key(item.source_title), item.target_title]));
    const redirectReport = redirects.map(({ title, target }) => {
        const [targetTitle] = target.split("#");
        const servedTarget = served.get(key(title));
        return {
            title, target,
            target_route: titleRoutes.get(key(targetTitle)) ?? null,
            served_target: servedTarget ?? null,
            agrees: servedTarget === undefined ? null : key(servedTarget) === key(targetTitle),
        };
    });

    const imageReport = images ? await compareImages(images, root) : null;
    const count = (status) => articles.filter((article) => article.status === status).length;
    return {
        schema_version: 1,
        generated_from: { export_file_sha256: await hashFile(xml), siteinfo, pages: pageCount, revisions: revisionCount, file_pages: files.length, template_pages: templates.size },
        summary: {
            restored_articles: articles.length,
            unchanged: count("unchanged"),
            newer_revision: count("newer-revision"),
            same_revision_text_differs: count("same-revision-text-differs"),
            now_a_redirect: count("now-a-redirect"),
            backup_older: count("backup-older"),
            missing_from_backup: count("missing-from-backup"),
            new_pages: newPages.length,
            redirects: redirectReport.length,
            redirect_disagreements: redirectReport.filter((item) => item.agrees === false).length,
            redirects_not_served: redirectReport.filter((item) => item.agrees === null).length,
            newer_with_open_proposals: articles.filter((article) => article.status === "newer-revision" && (article.pull_requests.length || article.notes.length)).length,
        },
        articles,
        new_pages: newPages.sort((a, b) => a.title.localeCompare(b.title)),
        template_gaps: templateGaps,
        redirects: redirectReport.sort((a, b) => a.title.localeCompare(b.title)),
        images: imageReport,
    };
}

async function hashFile(path) {
    const hash = createHash("sha256");
    for await (const chunk of createReadStream(path)) hash.update(chunk);
    return hash.digest("hex");
}

/** Compare a MediaWiki images/ folder with the recovered media by filename and hash. */
async function compareImages(dir, root) {
    const mapping = read(join(root, "public/media/wiki/mapping.json")).files;
    const recovered = new Map(mapping.map((item) => [item.filename, item]));
    const backup = new Map();
    const walk = (path) => {
        for (const name of readdirSync(path)) {
            const full = join(path, name);
            if (["thumb", "archive", "deleted", "temp", "lockdir"].includes(name)) continue;
            if (statSync(full).isDirectory()) walk(full);
            else if (!name.startsWith(".")) backup.set(name, full);
        }
    };
    walk(resolve(dir));
    const differs = [], missing = [];
    for (const [filename, item] of recovered) {
        const file = backup.get(filename) ?? backup.get(filename.replaceAll(" ", "_"));
        if (!file) { missing.push(filename); continue; }
        const sha256 = await hashFile(file);
        if (sha256 !== item.sha256) differs.push({ filename, recovered_status: item.status, backup_bytes: statSync(file).size });
    }
    return { backup_files: backup.size, recovered_files: recovered.size, identical: recovered.size - differs.length - missing.length, differs, missing_from_backup: missing };
}

/** Render the human summary support staff and maintainers read first. */
export function renderMarkdown(report) {
    const s = report.summary;
    const lines = [];
    const table = (head, rows) => {
        if (!rows.length) { lines.push("None.", ""); return; }
        lines.push(`| ${head.join(" | ")} |`, `| ${head.map(() => "---").join(" | ")} |`);
        for (const row of rows) lines.push(`| ${row.map((cell) => String(cell ?? "").replaceAll("|", "\\|")).join(" | ")} |`);
        lines.push("");
    };
    const prs = (article) => article.pull_requests.map((url) => `#${url.split("/").at(-1)}`).join(", ");
    lines.push("# Wiki backup intake report", "");
    lines.push(`Export: ${report.generated_from.siteinfo?.sitename ?? "unknown site"}, ${report.generated_from.pages} pages, ${report.generated_from.revisions} revisions (sha256 ${report.generated_from.export_file_sha256.slice(0, 12)}…).`, "");
    lines.push("| Restored articles | Unchanged | Newer revision | Same revision, text differs | Missing | New pages | Redirect disagreements |", "| --- | --- | --- | --- | --- | --- | --- |");
    lines.push(`| ${s.restored_articles} | ${s.unchanged} | ${s.newer_revision} | ${s.same_revision_text_differs} | ${s.missing_from_backup} | ${s.new_pages} | ${s.redirect_disagreements} |`, "");
    lines.push("## 1. Source updates first", "", "These articles changed after the restored revision. Update the source in its own pull request before reviewing wording; re-check the listed notes and proposals against the newer text.", "");
    table(["Article", "Restored rev", "Latest rev", "Latest edit", "Edits after", "Notes", "Open proposals"],
        report.articles.filter((a) => a.status === "newer-revision").map((a) => [a.origin === "additional" ? `${a.title} (additional article: update by hand, not in newer-revisions.jsonl)` : a.title, a.revision_id, a.latest_revision_id, a.latest_timestamp, a.revisions_after, a.notes.join(", "), prs(a)]));
    lines.push("## 2. Needs a closer look", "");
    table(["Article", "Status", "Detail"], report.articles.filter((a) => !["unchanged", "newer-revision"].includes(a.status)).map((a) => [a.title, a.status,
        a.status === "same-revision-text-differs" ? "Revision id matches but text hash differs; check export normalization before changing anything" : a.status === "missing-from-backup" ? "Not found by page id or title" : a.status === "now-a-redirect" ? `Now redirects to ${a.redirect_target}; restored revision ${a.revision_id} is ${a.recorded_revision_in_backup ? "in" : "not in"} the history` : `Backup latest ${a.latest_revision_id}`]));
    lines.push("## 3. Pages in the backup that are not restored", "", "Candidates for new articles. Decide per page; do not import in bulk.", "");
    table(["Title", "Page id", "Latest rev", "Latest edit", "Bytes", "Revisions"], report.new_pages.map((p) => [p.title, p.page_id, p.revision_id, p.timestamp, p.bytes, p.revisions]));
    lines.push("## 4. Template gaps", "");
    table(["Article", "Gaps", "Templates in backup", "Templates not in backup"], report.template_gaps.map((t) => [t.title, t.gaps, t.in_backup.join(", "), t.not_in_backup.join(", ")]));
    lines.push("## 5. Redirects", "", "Only disagreements and redirects the site does not serve yet are listed.", "");
    table(["Old title", "Backup target", "Site target", "Target route"], report.redirects.filter((r) => r.agrees !== true).map((r) => [r.title, r.target, r.served_target ?? "not served", r.target_route ?? "no restored article"]));
    if (report.images) {
        lines.push("## 6. Images", "", `${report.images.identical} of ${report.images.recovered_files} recovered files are identical in the backup; ${report.images.differs.length} differ; ${report.images.missing_from_backup.length} are missing.`, "");
        table(["File", "Recovered as", "Backup bytes"], report.images.differs.map((d) => [d.filename, d.recovered_status, d.backup_bytes]));
    }
    lines.push("## Attribution", "", "Distinct named editors over each article's full history are in report.json (full_history.usernames). Anonymous and hidden editors are counted only.", "");
    return lines.join("\n");
}

async function main() {
    const { values } = parseArgs({ options: { xml: { type: "string" }, images: { type: "string" }, out: { type: "string", default: "tmp/wiki-backup-intake" } } });
    if (!values.xml) {
        console.error("Usage: node scripts/reconcile-wiki-backup.mjs --xml <export.xml> [--images <dir>] [--out <dir>]");
        process.exit(2);
    }
    const report = await reconcile({ xml: values.xml, images: values.images });
    mkdirSync(values.out, { recursive: true });
    // The converter handles only the 209 snapshot articles; the three additional articles
    // are listed in REPORT.md and updated by hand.
    const newer = report.articles.filter((article) => article.status === "newer-revision" && article.origin === "snapshot");
    // Candidate converter rows for newer revisions, in the field names the converter reads.
    writeFileSync(join(values.out, "newer-revisions.jsonl"), newer.map((article) => JSON.stringify({
        title: article.title, page_id: article.page_id, revision_id: article.latest_revision_id, revision_timestamp: article.latest_timestamp,
        available_attribution: article.latest_contributor?.username ? { username: article.latest_contributor.username, id: article.latest_contributor.id } : null,
        wikitext: article.latest_text,
    })).join("\n") + (newer.length ? "\n" : ""));
    for (const article of report.articles) { delete article.latest_text; delete article.latest_contributor; }
    writeFileSync(join(values.out, "report.json"), JSON.stringify(report, null, 2) + "\n");
    writeFileSync(join(values.out, "REPORT.md"), renderMarkdown(report));
    const s = report.summary;
    console.log(`Reconciled ${s.restored_articles} articles: ${s.unchanged} unchanged, ${s.newer_revision} newer, ${s.same_revision_text_differs} text differs, ${s.missing_from_backup} missing; ${s.new_pages} new pages; ${s.redirect_disagreements} redirect disagreements. Wrote ${values.out}/REPORT.md`);
}

if (process.argv[1] && realpathSync(resolve(process.argv[1])) === fileURLToPath(import.meta.url)) await main();
