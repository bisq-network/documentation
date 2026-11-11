#!/usr/bin/env node
// Compare a MediaWiki XML export from the full wiki backup with the restored snapshot.
//
//   node scripts/reconcile-wiki-backup.mjs --xml <export.xml> [--images <dir>] [--out <dir>]
//
// Reads only the export (and optionally the backup's images folder); writes
// report.html, report.json, REPORT.md and, for articles with newer revisions, a
// candidate converter input (newer-revisions.jsonl) to --out (default
// tmp/wiki-backup-intake). `npm run compare-backup` finds the export and images in
// any backup layout and calls this. The output holds public wiki data only:
// titles, text, revision ids, timestamps and usernames. Anonymous editors are
// counted, never listed. Nothing in the repository is modified, and no network
// request is made.
import { createHash } from "node:crypto";
import { createReadStream, mkdirSync, readFileSync, readdirSync, realpathSync, statSync, writeFileSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { renderHtml } from "./lib/backup-report-html.mjs";
import { decodeXml, readMediaWikiExport } from "./lib/mediawiki-export.mjs";

const read = (path) => JSON.parse(readFileSync(path, "utf8"));
const sha256 = (text) => createHash("sha256").update(text, "utf8").digest("hex");
// The snapshot downloader appended "<!-- BISQ VERSION: … -->" to every restored source.
// The wiki itself never stored it, so an unchanged page in the backup matches the
// snapshot text without that suffix, not the recorded file hash.
const INGEST_COMMENT = /<!-- BISQ VERSION: [^>]*? -->$/;
const key = (title) => title.replaceAll("_", " ").trim().replace(/^./, (c) => c.toUpperCase());
// Namespaces whose latest text the report can show: articles, project, templates, help, categories.
const TEXT_NAMESPACES = new Set([0, 4, 10, 12, 14]);
const NAMESPACE_ALIASES = { file: 6, image: 6, media: 6, category: 14, template: 10, help: 12, project: 4, user: 2, mediawiki: 8 };
// Gap statuses where the backup supplies what the marker lacks.
const FILLABLE = new Set(["in-backup", "restored-via-redirect"]);
const fileKey = (name) => key(name).replaceAll(" ", "_");
const sourceText = (root, slug) => readFileSync(join(root, "public/wiki-source", `${slug}.wiki.txt`), "utf8").replace(INGEST_COMMENT, "");

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

const editorOf = (contributor) => contributor?.username ?? (contributor?.anonymous ? "anonymous" : "hidden");

const pageSummary = (page) => {
    const latest = page.revisions.at(-1);
    return { title: page.title, page_id: page.id, revision_id: latest?.id ?? null, timestamp: latest?.timestamp ?? null, bytes: latest?.bytes ?? null, revisions: page.revisions.length, last_editor: latest ? editorOf(latest.contributor) : null };
};

/** Normalise a section name or link fragment as MediaWiki anchors compare. */
function sectionKey(value) {
    let text = decodeXml(String(value));
    try { text = decodeURIComponent(text); } catch { /* keep as written */ }
    // Legacy anchors encode bytes as .XX (".C3.A9" for "é", ".2C" for ","); runs that
    // would decode to letters, digits or control characters ("v1.9.10") are kept.
    text = text.replace(/(?:\.[0-9A-F]{2})+/g, (run) => {
        const bytes = run.slice(1).split(".").map((hex) => parseInt(hex, 16));
        if (bytes.some((byte) => byte < 0x21 || /[0-9A-Za-z]/.test(String.fromCharCode(byte)))) return run;
        const decoded = Buffer.from(bytes).toString("utf8");
        return decoded.includes("\uFFFD") ? run : decoded;
    });
    return text.replaceAll("_", " ").replace(/\s+/g, " ").trim();
}

/** Headings and explicit anchors in wikitext, with the line each starts on. */
export function sectionAnchors(wikitext) {
    const anchors = [];
    wikitext.split("\n").forEach((line, index) => {
        const heading = /^(={1,6})\s*(.+?)\s*\1\s*$/.exec(line);
        if (heading) {
            const text = heading[2]
                .replace(/\[\[(?:[^\]|]*\|)?([^\]]*)\]\]/g, "$1")
                .replace(/'{2,}/g, "")
                .replace(/<[^>]*>/g, "")
                .replace(/\{\{[^}]*\}\}/g, "");
            anchors.push({ name: sectionKey(text), line: index });
        }
        for (const match of line.matchAll(/\{\{\s*[Aa]nchors?\s*\|([^}]*)\}\}/g)) {
            for (const name of match[1].split("|")) anchors.push({ name: sectionKey(name), line: index });
        }
        for (const match of line.matchAll(/\sid\s*=\s*["']([^"']+)["']/g)) anchors.push({ name: sectionKey(match[1]), line: index });
    });
    return anchors;
}

/**
 * Gap markers in the rendered articles: links to articles the snapshot did not
 * contain, sections missing from a restored article, images and templates.
 */
export function readGapMarkers(root = ".") {
    const dir = join(root, "src/content/docs/wiki");
    const plain = (html) => decodeXml(html.replace(/<[^>]*>/g, "")).replace(/\s+/g, " ").trim();
    const markers = [];
    for (const file of readdirSync(dir).filter((name) => name.endsWith(".md")).sort()) {
        const slug = file.slice(0, -3);
        const body = readFileSync(join(dir, file), "utf8");
        for (const match of body.matchAll(/\[(unrecovered article|section not recovered): ([^\]]*)\]/g)) {
            const before = body.slice(Math.max(0, match.index - 800), match.index);
            if (match[1] === "unrecovered article") {
                const open = before.lastIndexOf('<span class="wiki-link-gap">');
                markers.push({ slug, kind: "article", target: decodeXml(match[2]).trim(), label: open >= 0 ? plain(before.slice(open)) : "" });
            } else {
                const link = /<a href="\.\.\/([^/"#]+)\/[^"]*">((?:(?!<a\s)[\s\S])*?)<\/a>\s*<small class="wiki-link-gap">$/.exec(before);
                markers.push({ slug, kind: "section", target_slug: link?.[1] ?? null, target: decodeXml(match[2]).trim(), label: link ? plain(link[2]) : "" });
            }
        }
        for (const match of body.matchAll(/Image not recovered: ([^<]*)<\/strong>/g)) markers.push({ slug, kind: "image", target: decodeXml(match[1]).trim(), label: "" });
        for (const match of body.matchAll(/\[Unresolved template: ([^\]]*)\]/g)) markers.push({ slug, kind: "template", target: decodeXml(match[1]).trim(), label: "" });
    }
    return markers;
}

/** Internal links in each restored source: normalised target title → linking slugs. */
function outgoingLinks(snapshot, root) {
    const links = new Map();
    for (const article of snapshot) {
        for (const match of sourceText(root, article.slug).matchAll(/\[\[([^[\]|{}]+)(?:\|[^[\]]*)?\]\]/g)) {
            const target = match[1].split("#")[0].replace(/^:/, "").trim();
            if (!target) continue;
            if (!links.has(key(target))) links.set(key(target), new Set());
            links.get(key(target)).add(article.slug);
        }
    }
    return links;
}

/**
 * Reconcile the export with the snapshot. Returns the report object; pages are
 * matched by page id first, then by title, so renamed pages are still found. A
 * page id match always wins: after a move, MediaWiki keeps the page id under the
 * new title and leaves a redirect with a new id at the old title.
 *
 * Articles that differ carry snapshot_text and latest_text, and report.page_texts
 * holds the backup text of gap targets and new pages, for the HTML report. Use
 * publicReport() to drop them (and local file paths) before writing report.json.
 */
export async function reconcile({ xml, images, root = "." }) {
    const snapshot = loadSnapshot(root);
    const byId = new Map(snapshot.map((article) => [article.page_id, article]));
    const byTitle = new Map(snapshot.map((article) => [key(article.title), article]));
    const bySlug = new Map(snapshot.map((article) => [article.slug, article]));
    const found = new Map();
    const newPages = [], redirects = [], templates = new Map(), files = [];
    // Every page by namespace and title, for gap lookups; latest text kept for TEXT_NAMESPACES.
    const pages = new Map(), prefixes = new Map(Object.entries(NAMESPACE_ALIASES));
    let siteinfo = null, pageCount = 0, revisionCount = 0;
    const keepText = (page) => TEXT_NAMESPACES.has(page.ns);
    for await (const entry of readMediaWikiExport(xml, { keepText })) {
        if (entry.siteinfo) { siteinfo = entry.siteinfo; continue; }
        const page = entry.page;
        pageCount++;
        revisionCount += page.revisions.length;
        const latest = page.revisions.at(-1);
        const prefix = page.ns !== 0 && page.title.includes(":") ? page.title.slice(0, page.title.indexOf(":")) : "";
        if (prefix) prefixes.set(prefix.toLowerCase(), page.ns);
        pages.set(`${page.ns}:${key(page.title.slice(prefix ? prefix.length + 1 : 0))}`, { ...pageSummary(page), ns: page.ns, redirect: page.redirect, text: latest?.text });
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
        const differs = !["unchanged", "no-revisions"].includes(status) && typeof latest?.text === "string";
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
            latest_editor: latest ? editorOf(latest.contributor) : null,
            revisions_after: after.length,
            editors_after: editors(after),
            full_history: { revisions: page.revisions.length, first_timestamp: page.revisions[0]?.timestamp ?? null, ...history },
            snapshot_text: differs ? sourceText(root, article.slug) : undefined,
            latest_text: differs ? latest.text : undefined,
            latest_contributor: status === "newer-revision" ? latest.contributor : undefined,
        };
    });

    // Backup texts the HTML report shows, referenced by id from gaps and new pages.
    const pageTexts = {};
    const textRef = (entry) => {
        if (typeof entry?.text !== "string") return null;
        entry.ref ??= `p${Object.keys(pageTexts).length + 1}`;
        pageTexts[entry.ref] ??= { title: entry.title, revision_id: entry.revision_id, timestamp: entry.timestamp, last_editor: entry.last_editor, text: entry.text, anchors: sectionAnchors(entry.text) };
        return entry.ref;
    };
    const lookup = (title) => {
        let clean = title.replace(/^:/, "").replaceAll("_", " ").trim();
        let ns = 0;
        const colon = clean.indexOf(":");
        if (colon > 0 && prefixes.has(clean.slice(0, colon).toLowerCase().trim())) {
            ns = prefixes.get(clean.slice(0, colon).toLowerCase().trim());
            clean = clean.slice(colon + 1).trim();
        }
        const exact = pages.get(`${ns}:${key(clean)}`);
        if (exact) return { entry: exact, casefold: false };
        const folded = `${ns}:${key(clean)}`.toLowerCase();
        for (const [name, entry] of pages) if (name.toLowerCase() === folded) return { entry, casefold: true };
        return null;
    };

    const imageReport = images ? await compareImages(images, root) : null;
    const backupImages = imageReport?.files ?? null;

    // Gaps: what each marker points to, and whether the backup has it.
    const resolveImage = (name) => {
        const file = backupImages?.get(fileKey(name));
        if (file) return { status: "in-backup", detail: `Image file in the backup (${file.bytes} bytes)`, image: file.name };
        const page = lookup(`File:${name}`);
        if (page) return { status: "file-page-only", detail: backupImages ? "The backup has the file's description page, but its images folder lacks the file" : "The backup has the file's description page; no images folder was provided" };
        return { status: "not-in-backup" };
    };
    // Backup titles of restored articles, and of those whose backup text is the one we restored.
    const restoredByBackupTitle = new Map([...found].map(([slug, match]) => [key(match.page.title), bySlug.get(slug)]));
    const unchangedTitles = new Set(articles.filter((article) => article.status === "unchanged").map((article) => key(found.get(article.slug).page.title)));
    const resolveTitle = (target) => {
        const file = /^(?:images\/[0-9a-f]\/[0-9a-f]{2}\/|(?:file|image|media):)(.+)$/i.exec(target.replace(/^:/, "").trim())?.[1];
        if (file) return resolveImage(file);
        const hit = lookup(target);
        if (!hit) return { status: "not-in-backup" };
        let { entry } = hit;
        const via = [];
        for (let hops = 0; entry.redirect && hops < 3; hops++) {
            const redirectTitle = key(entry.redirect.split("#")[0]);
            const restored = byTitle.get(redirectTitle) ?? restoredByBackupTitle.get(redirectTitle);
            if (restored) return { status: "restored-via-redirect", detail: `The backup redirects ${entry.title} to ${restored.title}, which is restored: the link can point there`, restored_slug: restored.slug };
            via.push(entry.title);
            const next = lookup(entry.redirect.split("#")[0]);
            if (!next) return { status: "not-in-backup", detail: `${entry.title} redirects to ${entry.redirect}, which the backup lacks` };
            entry = next.entry;
        }
        const restored = entry.ns === 0 ? restoredByBackupTitle.get(key(entry.title)) ?? byTitle.get(key(entry.title)) : null;
        if (restored) return { status: "already-restored", detail: `${restored.title} is restored already; the link can point to it`, restored_slug: restored.slug };
        return {
            status: "in-backup",
            backup_title: entry.title, revision_id: entry.revision_id, timestamp: entry.timestamp, bytes: entry.bytes,
            detail: [via.length ? `via redirect ${via.join(" → ")}` : "", hit.casefold ? "title differs in capitalisation" : ""].filter(Boolean).join("; ") || undefined,
            text_ref: textRef(entry),
        };
    };
    const headingIndex = new Map();
    for (const entry of pages.values()) {
        if (entry.ns !== 0 || entry.redirect || typeof entry.text !== "string") continue;
        for (const anchor of sectionAnchors(entry.text)) {
            const name = anchor.name.toLowerCase();
            if (!headingIndex.has(name)) headingIndex.set(name, []);
            headingIndex.get(name).push({ entry, line: anchor.line });
        }
    }
    const resolveSection = (slug, target) => {
        const fragment = sectionKey(target);
        const article = slug ? bySlug.get(slug) : null;
        const match = article ? found.get(article.slug) : null;
        if (match) {
            const entry = pages.get(`0:${key(match.page.title)}`);
            const anchors = typeof entry?.text === "string" ? sectionAnchors(entry.text) : [];
            const hit = anchors.find((anchor) => anchor.name === fragment) ?? anchors.find((anchor) => anchor.name.toLowerCase() === fragment.toLowerCase());
            if (hit && unchangedTitles.has(key(entry.title))) return { status: "already-restored", detail: `Our restored ${article.title} has this section too; the marker comes from the conversion, not from missing text` };
            if (hit) return { status: "in-backup", backup_title: entry.title, revision_id: entry.revision_id, timestamp: entry.timestamp, text_ref: textRef(entry), line: hit.line, detail: hit.name === fragment ? undefined : "section name differs in capitalisation" };
        }
        // A section of that name in a page the backup adds or changed: a hint, not a fill.
        const elsewhere = (headingIndex.get(fragment.toLowerCase()) ?? []).filter(({ entry }) => !unchangedTitles.has(key(entry.title)) && (!match || key(entry.title) !== key(match.page.title)));
        if (elsewhere.length) {
            const { entry, line } = elsewhere[0];
            return { status: "elsewhere-in-backup", backup_title: entry.title, revision_id: entry.revision_id, timestamp: entry.timestamp, text_ref: textRef(entry), line, detail: `Found in ${elsewhere.map(({ entry: other }) => other.title).join(", ")}, not in ${article?.title ?? "the linked article"}` };
        }
        if (article && !match) return { status: "not-in-backup", detail: `${article.title} itself is not in the backup` };
        return { status: "not-in-backup" };
    };
    const groups = new Map();
    for (const marker of readGapMarkers(root)) {
        const id = [marker.kind, marker.kind === "section" ? sectionKey(marker.target) : key(marker.target), marker.target_slug ?? ""].join("\u0000");
        if (!groups.has(id)) groups.set(id, { kind: marker.kind, target: marker.target, target_slug: marker.target_slug ?? undefined, labels: new Set(), occurrences: new Map(), markers: 0 });
        const group = groups.get(id);
        group.markers++;
        if (marker.label) group.labels.add(marker.label);
        group.occurrences.set(marker.slug, (group.occurrences.get(marker.slug) ?? 0) + 1);
    }
    const gaps = [...groups.values()].map((group) => {
        const resolution = group.kind === "article" ? resolveTitle(group.target)
            : group.kind === "section" ? resolveSection(group.target_slug, group.target)
            : group.kind === "image" ? resolveImage(group.target)
            : resolveTitle(`Template:${group.target}`);
        return {
            kind: group.kind,
            target: group.target,
            target_slug: group.target_slug,
            target_title: group.target_slug ? bySlug.get(group.target_slug)?.title : undefined,
            labels: [...group.labels].slice(0, 5),
            markers: group.markers,
            articles: [...group.occurrences].map(([slug, count]) => ({ slug, title: bySlug.get(slug)?.title ?? slug, count })),
            ...resolution,
            fillable: FILLABLE.has(resolution.status),
        };
    }).sort((a, b) => b.markers - a.markers || a.target.localeCompare(b.target));

    // New pages, flagging those our articles link to (directly or through a backup redirect).
    const links = outgoingLinks(snapshot, root);
    const redirectsTo = new Map();
    for (const { title, target } of redirects) {
        const to = key(target.split("#")[0]);
        if (!redirectsTo.has(to)) redirectsTo.set(to, []);
        redirectsTo.get(to).push(key(title));
    }
    const newPageList = newPages.map((page) => {
        const linking = new Set([key(page.title), ...(redirectsTo.get(key(page.title)) ?? [])].flatMap((name) => [...(links.get(name) ?? [])]));
        return {
            ...page,
            linked_from: [...linking].sort().map((slug) => ({ slug, title: bySlug.get(slug)?.title ?? slug })),
            text_ref: textRef(pages.get(`0:${key(page.title)}`)),
        };
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

    // Templates kept from the October 2026 archive, against the backup's latest revision.
    const archivedTemplates = read(join(root, "migration/archive-templates-20261014.json")).items.map((item) => {
        const current = templates.get(key(item.title.replace(/^Template:/i, "")));
        return {
            title: item.title,
            archived_revision: item.latest_revision_id,
            backup_revision: current?.revision_id ?? null,
            status: !current ? "missing-from-backup" : current.revision_id === item.latest_revision_id ? "same" : Number(current.revision_id) > Number(item.latest_revision_id) ? "newer-in-backup" : "older-in-backup",
        };
    });

    // Templates used by articles with recorded template gaps, and whether the backup has them.
    const templateGaps = articles.filter((article) => article.template_gap_count > 0).map((article) => {
        const source = readFileSync(join(root, "public/wiki-source", `${article.slug}.wiki.txt`), "utf8");
        const used = templateNames(source);
        return { slug: article.slug, title: article.title, gaps: article.template_gap_count, in_backup: used.filter((name) => templates.has(name)), not_in_backup: used.filter((name) => !templates.has(name)) };
    });

    const count = (status) => articles.filter((article) => article.status === status).length;
    const fillable = (gap) => gap.fillable;
    if (imageReport) delete imageReport.files;
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
            new_pages_linked: newPageList.filter((page) => page.linked_from.length).length,
            gap_markers: gaps.reduce((sum, gap) => sum + gap.markers, 0),
            gap_targets: gaps.length,
            gap_targets_in_backup: gaps.filter(fillable).length,
            gap_markers_in_backup: gaps.filter(fillable).reduce((sum, gap) => sum + gap.markers, 0),
            redirects: redirectReport.length,
            redirect_disagreements: redirectReport.filter((item) => item.agrees === false).length,
            redirects_not_served: redirectReport.filter((item) => item.agrees === null).length,
            newer_with_open_proposals: articles.filter((article) => article.status === "newer-revision" && (article.pull_requests.length || article.notes.length)).length,
        },
        articles,
        gaps,
        new_pages: newPageList.sort((a, b) => a.title.localeCompare(b.title)),
        template_gaps: templateGaps,
        archived_templates: archivedTemplates,
        redirects: redirectReport.sort((a, b) => a.title.localeCompare(b.title)),
        images: imageReport,
        page_texts: pageTexts,
    };
}

async function hashFile(path) {
    const hash = createHash("sha256");
    for await (const chunk of createReadStream(path)) hash.update(chunk);
    return hash.digest("hex");
}

/**
 * Compare a MediaWiki images/ folder with the recovered media by filename and
 * hash. In MediaWiki's hashed layout (images/a/ab/File.png) only those files
 * count; thumbnails, old versions and deleted files are skipped.
 */
async function compareImages(dir, root) {
    const mapping = read(join(root, "public/media/wiki/mapping.json")).files;
    const recovered = new Map(mapping.map((item) => [item.filename, item]));
    const all = [];
    const walk = (path, depth) => {
        for (const name of readdirSync(path)) {
            const full = join(path, name);
            if (["thumb", "archive", "deleted", "temp", "lockdir", "transcoded"].includes(name)) continue;
            const stat = statSync(full);
            if (stat.isDirectory()) walk(full, [...depth, name]);
            else if (!name.startsWith(".")) all.push({ name, path: full, bytes: stat.size, hashed: depth.length === 2 && /^[0-9a-f]$/.test(depth[0]) && /^[0-9a-f]{2}$/.test(depth[1]) });
        }
    };
    walk(resolve(dir), []);
    const uploads = all.some((file) => file.hashed) ? all.filter((file) => file.hashed) : all;
    const backup = new Map(uploads.map((file) => [fileKey(file.name), file]));
    const differs = [], missing = [], matched = new Set();
    for (const [filename, item] of recovered) {
        const file = backup.get(fileKey(filename));
        if (!file) { missing.push(filename); continue; }
        matched.add(fileKey(filename));
        const sha256 = await hashFile(file.path);
        if (sha256 !== item.sha256) differs.push({ filename, recovered_status: item.status, backup_bytes: file.bytes, recovered_bytes: statSync(join(root, "public", item.file)).size, backup_file: file.path, recovered_file: join(root, "public", item.file) });
    }
    const added = uploads.filter((file) => !matched.has(fileKey(file.name))).map((file) => ({ filename: file.name, bytes: file.bytes, backup_file: file.path }))
        .sort((a, b) => a.filename.localeCompare(b.filename));
    return {
        backup_files: backup.size, recovered_files: recovered.size, identical: recovered.size - differs.length - missing.length,
        differs, missing_from_backup: missing, new_in_backup: added, files: backup,
    };
}

/** The report without texts and local file paths, as written to report.json. */
export function publicReport(report) {
    const { page_texts: _texts, ...rest } = report;
    const copy = structuredClone(rest);
    for (const article of copy.articles) { delete article.snapshot_text; delete article.latest_text; delete article.latest_contributor; }
    for (const gap of copy.gaps ?? []) delete gap.text_ref;
    for (const page of copy.new_pages) delete page.text_ref;
    if (copy.images) {
        for (const item of [...copy.images.differs, ...copy.images.new_in_backup]) { delete item.backup_file; delete item.recovered_file; }
    }
    return copy;
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
    table(["Title", "Page id", "Latest rev", "Latest edit", "Bytes", "Revisions", "Linked from"], report.new_pages.map((p) => [p.title, p.page_id, p.revision_id, p.timestamp, p.bytes, p.revisions, (p.linked_from ?? []).map((a) => a.title).join(", ")]));
    if (report.gaps) {
        lines.push("## 4. Gaps the backup can fill", "", `${s.gap_markers_in_backup} of ${s.gap_markers} gap markers in the restored articles point to something the backup has (${s.gap_targets_in_backup} of ${s.gap_targets} distinct targets).`, "");
        table(["Missing", "Kind", "Markers", "In articles", "In the backup"], report.gaps.filter((g) => g.fillable).map((g) => [g.kind === "section" ? `${g.target_title ?? "?"} § ${g.target}` : g.target, g.kind, g.markers, g.articles.map((a) => a.title).join(", "), [g.status, g.backup_title, g.detail].filter(Boolean).join(": ")]));
    }
    lines.push("## 5. Template gaps", "");
    table(["Article", "Gaps", "Templates in backup", "Templates not in backup"], report.template_gaps.map((t) => [t.title, t.gaps, t.in_backup.join(", "), t.not_in_backup.join(", ")]));
    lines.push("## 6. Redirects", "", "Only disagreements and redirects the site does not serve yet are listed.", "");
    table(["Old title", "Backup target", "Site target", "Target route"], report.redirects.filter((r) => r.agrees !== true).map((r) => [r.title, r.target, r.served_target ?? "not served", r.target_route ?? "no restored article"]));
    if (report.images) {
        lines.push("## 7. Images", "", `${report.images.identical} of ${report.images.recovered_files} recovered files are identical in the backup; ${report.images.differs.length} differ; ${report.images.missing_from_backup.length} are missing; the backup has ${report.images.new_in_backup?.length ?? 0} other files.`, "");
        table(["File", "Recovered as", "Backup bytes"], report.images.differs.map((d) => [d.filename, d.recovered_status, d.backup_bytes]));
    }
    lines.push("## Attribution", "", "Distinct named editors over each article's full history are in report.json (full_history.usernames). Anonymous and hidden editors are counted only.", "");
    return lines.join("\n");
}

/**
 * Write report.html, report.json, REPORT.md and newer-revisions.jsonl to `out`.
 * `source` describes where the export and images came from, for the report header.
 */
export function writeReports(report, out, { root = ".", source = null } = {}) {
    mkdirSync(out, { recursive: true });
    // The converter handles only the 209 snapshot articles; the three additional articles
    // are listed in REPORT.md and updated by hand.
    const newer = report.articles.filter((article) => article.status === "newer-revision" && article.origin === "snapshot");
    // Candidate converter rows for newer revisions, in the field names the converter reads.
    writeFileSync(join(out, "newer-revisions.jsonl"), newer.map((article) => JSON.stringify({
        title: article.title, page_id: article.page_id, revision_id: article.latest_revision_id, revision_timestamp: article.latest_timestamp,
        available_attribution: article.latest_contributor?.username ? { username: article.latest_contributor.username, id: article.latest_contributor.id } : null,
        wikitext: article.latest_text,
    })).join("\n") + (newer.length ? "\n" : ""));
    if (source) report.source = source;
    writeFileSync(join(out, "report.html"), renderHtml(report, { root }));
    const published = publicReport(report);
    writeFileSync(join(out, "report.json"), JSON.stringify(published, null, 2) + "\n");
    writeFileSync(join(out, "REPORT.md"), renderMarkdown(published));
    return { html: join(out, "report.html"), markdown: join(out, "REPORT.md"), json: join(out, "report.json") };
}

/** Refuse an output folder inside the repository unless it is under tmp/ (ignored by git). */
export function checkOutputFolder(out, root) {
    const full = resolve(out), base = resolve(root);
    const inside = (path, dir) => path === dir || path.startsWith(dir + "/");
    if (inside(full, base) && !inside(full, join(base, "tmp"))) {
        throw new Error(`Write the report outside the repository or under tmp/ (ignored by git), not to ${relative(base, full) || "."}.`);
    }
}

async function main() {
    const { values } = parseArgs({ options: { xml: { type: "string" }, images: { type: "string" }, out: { type: "string", default: "tmp/wiki-backup-intake" } } });
    if (!values.xml) {
        console.error("Usage: node scripts/reconcile-wiki-backup.mjs --xml <export.xml> [--images <dir>] [--out <dir>]");
        console.error("To compare a whole backup (folder or archive), use: npm run compare-backup -- <backup>");
        process.exit(2);
    }
    checkOutputFolder(values.out, ".");
    const report = await reconcile({ xml: values.xml, images: values.images });
    writeReports(report, values.out);
    const s = report.summary;
    console.log(`Reconciled ${s.restored_articles} articles: ${s.unchanged} unchanged, ${s.newer_revision} newer, ${s.same_revision_text_differs} text differs, ${s.missing_from_backup} missing; ${s.new_pages} new pages; ${s.redirect_disagreements} redirect disagreements. Wrote ${values.out}/report.html and REPORT.md`);
}

if (process.argv[1] && realpathSync(resolve(process.argv[1])) === fileURLToPath(import.meta.url)) await main();
