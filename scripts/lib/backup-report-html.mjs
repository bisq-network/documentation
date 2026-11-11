// One self-contained HTML page for the backup comparison, written for readers
// who do not read JSON or diffs every day. Everything in the backup is untrusted:
// every value is escaped, the page loads nothing from outside (a Content Security
// Policy allows only its own inline style and script, by hash, and data: images),
// and previews of changed images are embedded as data: URLs.
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { extname } from "node:path";
import { diffTexts } from "./word-diff.mjs";

const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const plural = (count, one, many = `${one}s`) => `${count.toLocaleString("en")} ${count === 1 ? one : many}`;
const DATE = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
const date = (timestamp) => {
    const parsed = timestamp ? new Date(timestamp) : null;
    return parsed && !Number.isNaN(parsed.getTime()) ? DATE.format(parsed) : "unknown date";
};
const size = (bytes) => bytes == null ? "unknown size"
    : bytes < 1024 ? `${bytes} bytes`
    : bytes < 1024 * 1024 ? `${(bytes / 1024).toFixed(1)} KB`
    : `${(bytes / 1024 / 1024).toFixed(1)} MB`;
// Two sizes that round to the same text are shown in bytes, so a difference stays visible.
const sizes = (before, after) => size(before) === size(after) && before !== after
    ? `${before.toLocaleString("en")} → ${after.toLocaleString("en")} bytes`
    : `${size(before)} → ${size(after)}`;
const list = (items) => items.length <= 1 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items.at(-1)}`;

const ARTICLE_STATUS = {
    "unchanged": ["Same as our snapshot", "same", "The backup's latest revision is the one we restored, with the same text."],
    "newer-revision": ["Changed in the backup", "changed", "The backup has edits made after the revision we restored."],
    "same-revision-text-differs": ["Same revision, different text", "warn", "The revision number matches ours but the text does not. Check how the export was made before changing anything: the snapshot itself may be in question."],
    "now-a-redirect": ["Now a redirect", "warn", "The page now only forwards readers to another page."],
    "backup-older": ["Older in the backup", "warn", "The backup's latest revision is older than the one we restored: the backup may predate the snapshot."],
    "missing-from-backup": ["Missing from the backup", "missing", "Neither the page id nor the title is in the backup."],
    "no-revisions": ["No revisions in the backup", "missing", "The page is in the backup without any revision."],
};
const GAP_STATUS = {
    "in-backup": ["In the backup", "same"],
    "restored-via-redirect": ["Redirects to a restored article", "same"],
    "elsewhere-in-backup": ["Only in another page", "warn"],
    "file-page-only": ["Description page only", "warn"],
    "already-restored": ["Already restored", "missing"],
    "not-in-backup": ["Not in the backup", "missing"],
};
const GAP_KIND = { article: "Article", section: "Section", image: "Image", template: "Template" };
const GAP_KIND_LINKS = { article: "Links to missing articles", section: "Links to missing sections", image: "Missing images", template: "Missing templates" };

const badge = (label, tone) => `<span class="badge ${tone}">${esc(label)}</span>`;
const textLink = (ref, line, label = "Read it") => ref ? `<a href="#text-${esc(ref)}${line != null ? `-L${Number(line)}` : ""}">${esc(label)}</a>` : "";

function editorsLine({ usernames = [], anonymous = 0, hidden = 0 }) {
    const parts = [];
    if (usernames.length) parts.push(esc(list(usernames)));
    if (anonymous) parts.push(plural(anonymous, "anonymous edit"));
    if (hidden) parts.push(plural(hidden, "edit", "edits") + " with a hidden author");
    return parts.length ? parts.join("; ") : "nobody";
}

/** Render one word-level diff: removed text struck through, added text underlined. */
function renderDiff(before, after) {
    const { blocks, added, removed } = diffTexts(before, after);
    const part = ([type, text]) => {
        if (type === "=") return esc(text);
        const tag = type === "+" ? "ins" : "del";
        const blank = !text.trim();
        return `<${tag}${blank ? ' class="blank"' : ""}>${esc(blank ? text.replace(/\n/g, "↵\n").replace(/^[^\S\n]+$/, "·") : text)}</${tag}>`;
    };
    const html = blocks.map((block) => block.type === "skip"
        ? `<div class="skip">${plural(block.lines, "unchanged line")}</div>`
        : block.type === "context" ? `<div class="ctx">${esc(block.lines.join("\n"))}</div>`
        : `<div class="chg">${block.parts.map(part).join("")}</div>`).join("");
    return { html: `<div class="diff">${html}</div>`, added, removed };
}

function imageData(path, budget) {
    const types = { ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".gif": "image/gif", ".webp": "image/webp", ".svg": "image/svg+xml" };
    const type = types[extname(path).toLowerCase()];
    if (!type) return null;
    try {
        const data = readFileSync(path);
        if (data.length > 3 * 1024 * 1024 || data.length > budget.left) return null;
        budget.left -= data.length;
        return `data:${type};base64,${data.toString("base64")}`;
    } catch {
        return null;
    }
}

/** A table that becomes a list of cards on narrow screens (labels from data-label). */
function table(head, rows, { className = "" } = {}) {
    if (!rows.length) return `<p class="none">None.</p>`;
    return `<div class="table-wrap"><table class="${className}"><thead><tr>${head.map((cell) => `<th scope="col">${esc(cell)}</th>`).join("")}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((cell, index) => `<td data-label="${esc(head[index])}">${cell}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
}

function statusBar(segments, total) {
    let x = 0;
    const rects = segments.filter(([count]) => count > 0).map(([count, tone, label]) => {
        const width = total ? (count / total) * 100 : 0;
        const rect = `<rect x="${x.toFixed(3)}" y="0" width="${width.toFixed(3)}" height="10" class="fill-${tone}"><title>${esc(label)}: ${count}</title></rect>`;
        x += width;
        return rect;
    });
    return `<svg class="bar" viewBox="0 0 100 10" preserveAspectRatio="none" role="img" aria-label="${esc(segments.filter(([count]) => count).map(([count, , label]) => `${label}: ${count}`).join(", "))}">${rects.join("")}</svg>`;
}

const STYLE = `
:root{color-scheme:light dark;--bg:#f6f5f1;--panel:#fff;--ink:#1d1f23;--muted:#5d636b;--line:#dcdad3;--accent:#1f6f5c;
--same:#2f7d4f;--same-bg:#e3f2e8;--changed:#9a5b00;--changed-bg:#fbefd9;--warn:#a3401b;--warn-bg:#fbe5dc;--missing:#6b6f76;--missing-bg:#ebeae6;
--del:#a8261f;--del-bg:#fbe1de;--ins:#1d6b3a;--ins-bg:#d9f0e0;--mark:#fff2b3}
@media (prefers-color-scheme:dark){:root{--bg:#15171a;--panel:#1d2024;--ink:#e8e6e1;--muted:#a3a8ae;--line:#33373d;--accent:#62c2a5;
--same:#7fd39f;--same-bg:#183526;--changed:#f0b860;--changed-bg:#3a2c12;--warn:#f39a78;--warn-bg:#3d2117;--missing:#b4b8be;--missing-bg:#2a2d31;
--del:#ff9d94;--del-bg:#4a1f1c;--ins:#8de0a8;--ins-bg:#173a24;--mark:#4b4220}}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.55 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
a{color:var(--accent)}
.page{max-width:1080px;margin:0 auto;padding:32px 24px 64px}
.kicker{margin:0 0 4px;color:var(--muted);font-size:.85rem;letter-spacing:.04em;text-transform:uppercase}
h1{font-size:2rem;line-height:1.2;margin:0 0 12px}
h2{font-size:1.4rem;margin:0 0 6px}
h3{font-size:1.1rem;margin:0}
.lede{font-size:1.1rem;max-width:62ch;margin:0 0 20px}
.facts{display:grid;grid-template-columns:max-content 1fr;gap:4px 16px;margin:0;font-size:.9rem;color:var(--muted)}
.facts dt{font-weight:600;color:var(--ink)}
.facts dd{margin:0;overflow-wrap:anywhere}
nav.toc{position:sticky;top:0;z-index:2;background:var(--bg);border-bottom:1px solid var(--line);margin:24px -24px 0;padding:8px 24px;display:flex;gap:6px 18px;flex-wrap:wrap;font-size:.9rem}
nav.toc a{text-decoration:none;white-space:nowrap}
nav.toc .count{color:var(--muted)}
section{padding-top:36px;scroll-margin-top:48px}
.intro{color:var(--muted);max-width:70ch;margin:0 0 16px}
.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(290px,1fr));gap:12px}
.card{background:var(--panel);border:1px solid var(--line);border-radius:10px;padding:16px}
.card .big{font-size:1.9rem;font-weight:700;line-height:1.1;margin-bottom:8px}
.card .big small{display:block;font-size:.9rem;font-weight:500;color:var(--muted);margin-top:2px}
.card .label{color:var(--muted);font-size:.9rem;margin-bottom:8px}
.card ul{list-style:none;margin:10px 0 0;padding:0;font-size:.92rem}
.card li{display:flex;justify-content:space-between;gap:8px;padding:2px 0}
.card li.zero{color:var(--muted)}
.card li b{font-variant-numeric:tabular-nums}
.bar{display:block;width:100%;height:10px;border-radius:5px;overflow:hidden;background:var(--missing-bg)}
.fill-same{fill:var(--same)}.fill-changed{fill:var(--changed)}.fill-warn{fill:var(--warn)}.fill-missing{fill:var(--missing)}
.badge{display:inline-block;font-size:.78rem;font-weight:600;padding:2px 8px;border-radius:999px;white-space:nowrap;vertical-align:middle}
.badge.same{color:var(--same);background:var(--same-bg)}.badge.changed{color:var(--changed);background:var(--changed-bg)}
.badge.warn{color:var(--warn);background:var(--warn-bg)}.badge.missing{color:var(--missing);background:var(--missing-bg)}
.legend{display:flex;gap:16px;flex-wrap:wrap;font-size:.9rem;margin:0 0 12px}
article.item{background:var(--panel);border:1px solid var(--line);border-radius:10px;padding:16px 18px;margin:0 0 14px;scroll-margin-top:56px}
article.item header{display:flex;gap:8px 12px;align-items:center;flex-wrap:wrap}
.explain{margin:6px 0 10px;color:var(--muted)}
dl.meta{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:8px 20px;margin:0 0 12px;font-size:.92rem}
dl.meta dt{color:var(--muted);font-size:.85rem}dl.meta dd{margin:0;overflow-wrap:anywhere}
details>summary{cursor:pointer;font-weight:600;color:var(--accent);padding:4px 0}
.diff{font:13.5px/1.6 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;white-space:pre-wrap;overflow-wrap:anywhere;background:var(--bg);border:1px solid var(--line);border-radius:8px;padding:10px 12px;margin-top:6px;max-height:70vh;overflow:auto}
.diff .ctx{color:var(--muted)}
.diff .chg{padding:2px 0}
.diff .skip{color:var(--muted);font-style:italic;text-align:center;border-block:1px dashed var(--line);margin:6px 0;padding:2px 0;font-family:system-ui,sans-serif;font-size:.85rem}
del,ins{text-decoration-thickness:1px;border-radius:3px;padding:0 1px}
del{color:var(--del);background:var(--del-bg);text-decoration:line-through}
ins{color:var(--ins);background:var(--ins-bg);text-decoration:underline}
del.blank,ins.blank{text-decoration:none;opacity:.8}
.table-wrap{overflow-x:auto;background:var(--panel);border:1px solid var(--line);border-radius:10px}
table{border-collapse:collapse;width:100%;font-size:.92rem}
th,td{text-align:left;vertical-align:top;padding:8px 12px;border-bottom:1px solid var(--line)}
th{font-size:.8rem;text-transform:uppercase;letter-spacing:.03em;color:var(--muted);background:var(--panel)}
tr:last-child td{border-bottom:0}
td small,.muted{color:var(--muted)}
.nowrap,td:last-child>a{white-space:nowrap}
.none{color:var(--muted);font-style:italic}
details.rest{margin-top:12px}
.previews{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:6px}
.previews figure{margin:0}.previews img{max-width:100%;height:auto;border:1px solid var(--line);border-radius:6px;background:#fff}
.previews figcaption{font-size:.8rem;color:var(--muted)}
.texts details{background:var(--panel);border:1px solid var(--line);border-radius:10px;padding:8px 14px;margin:0 0 8px;scroll-margin-top:56px}
.texts pre{font:13px/1.55 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;white-space:pre-wrap;overflow-wrap:anywhere;margin:8px 0;max-height:70vh;overflow:auto}
.texts .ln{display:block;scroll-margin-top:64px}
:target,.texts .ln:target{background:var(--mark);outline:2px solid var(--mark);border-radius:4px}
button.toggle{font:inherit;font-size:.9rem;border:1px solid var(--line);background:var(--panel);color:var(--ink);border-radius:6px;padding:4px 10px;cursor:pointer}
.section-head{display:flex;justify-content:space-between;align-items:baseline;gap:12px;flex-wrap:wrap}
footer{margin-top:48px;padding-top:16px;border-top:1px solid var(--line);color:var(--muted);font-size:.88rem}
@media (max-width:640px){
.page{padding:20px 16px 48px}h1{font-size:1.55rem}nav.toc{margin:20px -16px 0;padding:8px 16px;overflow-x:auto;flex-wrap:nowrap}
.facts,dl.meta{grid-template-columns:1fr}.facts dd{margin-bottom:6px}
.table-wrap{background:none;border:0;overflow:visible}
table,thead,tbody,tr,td{display:block}thead{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}
tr{background:var(--panel);border:1px solid var(--line);border-radius:10px;margin:0 0 10px;padding:6px 0}
td{border:0;padding:4px 14px}td::before{content:attr(data-label);display:block;font-size:.75rem;text-transform:uppercase;letter-spacing:.03em;color:var(--muted)}
.previews{grid-template-columns:1fr}article.item{padding:14px}}
`;

const SCRIPT = `(() => {
  const reveal = (id) => {
    const target = id && document.getElementById(id);
    if (!target) return;
    for (let node = target; node; node = node.parentElement) if (node.tagName === "DETAILS") node.open = true;
  };
  const fromHash = () => { try { return decodeURIComponent(location.hash.slice(1)); } catch { return ""; } };
  document.addEventListener("click", (event) => {
    const link = event.target.closest && event.target.closest('a[href^="#"]');
    if (link) reveal(link.getAttribute("href").slice(1));
  });
  addEventListener("hashchange", () => reveal(fromHash()));
  reveal(fromHash());
  if (location.hash) document.getElementById(fromHash())?.scrollIntoView();
  for (const button of document.querySelectorAll("button[data-toggle]")) {
    button.hidden = false;
    button.addEventListener("click", () => {
      const all = [...button.closest("section").querySelectorAll("details.diff-wrap")];
      const open = all.some((item) => !item.open);
      for (const item of all) item.open = open;
      button.textContent = open ? "Collapse all changes" : "Expand all changes";
    });
  }
})();`;

const hash = (text) => `'sha256-${createHash("sha256").update(text, "utf8").digest("base64")}'`;

/** Render the comparison report as one HTML document. */
export function renderHtml(report, { root = ".", generatedAt = new Date() } = {}) {
    const s = report.summary;
    const source = report.source ?? {};
    const from = report.generated_from;
    const articles = report.articles;
    const differing = articles.filter((article) => article.status !== "unchanged");
    const gaps = report.gaps ?? [];
    const texts = report.page_texts ?? {};
    const images = report.images;
    const budget = { left: 40 * 1024 * 1024 };

    // Verdict
    const verdict = [];
    const changed = s.newer_revision + s.same_revision_text_differs + s.now_a_redirect + s.backup_older;
    if (!changed && !s.missing_from_backup) verdict.push(`Every one of the ${s.restored_articles} restored articles is the same in the backup.`);
    else {
        if (s.newer_revision) verdict.push(`${plural(s.newer_revision, "article was", "articles were")} edited after our snapshot.`);
        const other = changed - s.newer_revision + s.missing_from_backup;
        if (other) verdict.push(`${plural(other, "article needs", "articles need")} a closer look (see below).`);
        verdict.push(`${s.unchanged} of ${s.restored_articles} are unchanged.`);
    }
    if (s.gap_markers) verdict.push(s.gap_markers_in_backup ? `The backup can fill ${s.gap_markers_in_backup} of the ${s.gap_markers} gaps marked in our articles.` : `It fills none of the ${s.gap_markers} gaps marked in our articles.`);
    if (s.new_pages) verdict.push(`It has ${plural(s.new_pages, "article")} we do not have${s.new_pages_linked ? `, ${s.new_pages_linked} of them linked from ours` : ""}.`);
    if (images) {
        const imageChanges = images.differs.length + images.missing_from_backup.length;
        verdict.push(imageChanges ? `${plural(images.differs.length, "image differs", "images differ")} and ${plural(images.missing_from_backup.length, "is", "are")} missing.` : `All ${images.recovered_files} recovered images are identical.`);
    }

    const facts = [
        ["Backup", esc((source.inputs ?? []).join(", ") || "not recorded")],
        ["XML export", `${esc(source.xml ?? "")}${source.xml ? " · " : ""}${esc(from.siteinfo?.sitename ?? "unknown site")}${from.siteinfo?.generator ? `, ${esc(from.siteinfo.generator)}` : ""} · ${plural(from.pages, "page")}, ${plural(from.revisions, "revision")}${source.xml_bytes ? ` · ${size(source.xml_bytes)}` : ""}`],
        ["Images", images ? `${esc(source.images ?? "folder")} · ${plural(images.backup_files, "file")}` : "No images folder found in the backup, so images were not compared."],
        ...(source.other_xml?.length ? [["Other XML files", `${esc(source.other_xml.join(", "))} <small>(the largest export was used)</small>`]] : []),
        ...(source.sql?.length ? [["Database dumps", `${esc(source.sql.join(", "))} <small>(not opened)</small>`]] : []),
        ...(source.notes?.length ? [["Notes", source.notes.map(esc).join("<br>")]] : []),
        ["Compared with", `${s.restored_articles} restored articles: the 18 Oct 2026 snapshot and ${articles.filter((article) => article.origin === "additional").length} additional historical articles`],
        ["Export checksum", `<small>sha256 ${esc(from.export_file_sha256)}</small>`],
        ["Generated", esc(generatedAt.toISOString().replace("T", " ").slice(0, 16) + " UTC")],
    ];

    // Summary cards
    const statusRows = Object.entries(ARTICLE_STATUS).map(([status, [label, tone]]) => [articles.filter((article) => article.status === status).length, tone, label, status]);
    const cardList = (rows) => `<ul>${rows.map(([count, label, href, total]) => `<li class="${count ? "" : "zero"}"><span>${href && count ? `<a href="${href}">${esc(label)}</a>` : esc(label)}</span><b>${count}${total != null ? ` <small class="muted">of ${total}</small>` : ""}</b></li>`).join("")}</ul>`;
    const fillable = gaps.filter((gap) => gap.fillable);
    const cards = [
        `<div class="card"><div class="label">Restored articles</div><div class="big">${s.unchanged}<small>of ${s.restored_articles} unchanged</small></div>${statusBar(statusRows, s.restored_articles)}${cardList(statusRows.map(([count, , label, status]) => [count, label, status === "unchanged" ? null : "#articles"]))}</div>`,
        `<div class="card"><div class="label">Gaps in our articles</div><div class="big">${s.gap_markers_in_backup ?? 0}<small>of ${s.gap_markers ?? 0} fillable from the backup</small></div>${statusBar([[s.gap_markers_in_backup ?? 0, "same", "Fillable"], [(s.gap_markers ?? 0) - (s.gap_markers_in_backup ?? 0), "missing", "Not in the backup"]], s.gap_markers ?? 0)}${cardList(Object.entries(GAP_KIND_LINKS).map(([kind, label]) => {
            const markers = (items) => items.filter((gap) => gap.kind === kind).reduce((sum, gap) => sum + gap.markers, 0);
            return [markers(fillable), label, "#gaps", markers(gaps)];
        }))}</div>`,
        `<div class="card"><div class="label">Articles only in the backup</div><div class="big">${s.new_pages}<small>${s.new_pages === 1 ? "page" : "pages"} we do not have</small></div>${cardList([[s.new_pages_linked ?? 0, "Linked from our articles", "#new-pages"], [s.new_pages - (s.new_pages_linked ?? 0), "Not linked", "#new-pages"]])}</div>`,
        images
            ? `<div class="card"><div class="label">Images</div><div class="big">${images.identical}<small>of ${images.recovered_files} identical</small></div>${statusBar([[images.identical, "same", "Identical"], [images.differs.length, "changed", "Different"], [images.missing_from_backup.length, "missing", "Missing"]], images.recovered_files)}${cardList([[images.differs.length, "Different in the backup", "#images"], [images.missing_from_backup.length, "Missing from the backup", "#images"], [images.new_in_backup.length, "Only in the backup", "#images"]])}</div>`
            : `<div class="card"><div class="label">Images</div><div class="big">—</div><p class="muted">No images folder in the backup.</p></div>`,
        `<div class="card"><div class="label">Redirects and templates</div><div class="big">${s.redirects}<small>${s.redirects === 1 ? "redirect" : "redirects"} in the backup</small></div>${cardList([[s.redirects - s.redirect_disagreements - s.redirects_not_served, "Redirects that agree with the site", null], [s.redirect_disagreements, "Redirects that disagree", "#redirects"], [s.redirects_not_served, "Redirects the site lacks", "#redirects"], [(report.archived_templates ?? []).filter((item) => item.status === "newer-in-backup").length, "Archived templates newer in the backup", "#redirects"]])}</div>`,
    ];

    // Articles that differ
    const articleCards = differing.map((article, index) => {
        const [label, tone, explain] = ARTICLE_STATUS[article.status] ?? [article.status, "warn", ""];
        const meta = [["Our snapshot", `revision ${esc(article.revision_id)} · ${date(article.revision_timestamp)}`]];
        if (article.latest_revision_id) meta.push(["Backup, latest", `revision ${esc(article.latest_revision_id)} · ${date(article.latest_timestamp)}${article.latest_editor ? ` · by ${esc(article.latest_editor === "anonymous" ? "an anonymous editor" : article.latest_editor === "hidden" ? "a hidden author" : article.latest_editor)}` : ""}`]);
        if (article.backup_title) meta.push(["Title in the backup", esc(article.backup_title)]);
        if (article.redirect_target) meta.push(["Redirects to", esc(article.redirect_target)]);
        if (article.revisions_after) meta.push(["Edited since by", `${editorsLine(article.editors_after)} <small>(${plural(article.revisions_after, "edit")})</small>`]);
        if (article.full_history) meta.push(["Whole history", `${plural(article.full_history.revisions, "revision")} since ${date(article.full_history.first_timestamp)}, by ${editorsLine(article.full_history)}`]);
        if (article.status === "now-a-redirect" || article.status === "backup-older") meta.push(["Our revision in the backup", article.recorded_revision_in_backup ? (article.recorded_revision_text_matches ? "present, same text" : "present, different text") : "not present"]);
        const prs = article.pull_requests.filter((url) => /^https:\/\//.test(url)).map((url) => `<a href="${esc(url)}">#${esc(url.split("/").at(-1))}</a>`);
        if (article.notes.length || prs.length) meta.push(["Open review work", [article.notes.length ? `notes ${esc(article.notes.join(", "))}` : "", prs.length ? `wording proposals ${prs.join(", ")}` : ""].filter(Boolean).join(" · ")]);
        if (article.origin === "additional") meta.push(["Note", "Additional historical article: update it by hand, it is not in newer-revisions.jsonl."]);
        let diff = "";
        if (typeof article.latest_text === "string" && typeof article.snapshot_text === "string") {
            const rendered = renderDiff(article.snapshot_text, article.latest_text);
            meta.push(["Size of the change", `${plural(rendered.added, "word")} added, ${plural(rendered.removed, "word")} removed`]);
            const open = article.status !== "now-a-redirect" && rendered.html.length < 60000;
            diff = `<details class="diff-wrap"${open ? " open" : ""}><summary>Word-by-word changes, our snapshot → backup</summary>${rendered.html}</details>`;
        }
        return `<article class="item" id="article-${index + 1}"><header><h3>${esc(article.title)}</h3>${badge(label, tone)}</header><p class="explain">${esc(explain)}</p><dl class="meta">${meta.map(([term, value]) => `<div><dt>${esc(term)}</dt><dd>${value}</dd></div>`).join("")}</dl>${diff}</article>`;
    });

    // Gaps
    const gapOrder = (gap) => gap.fillable ? 0 : gap.status === "not-in-backup" ? 2 : 1;
    const sortedGaps = [...gaps].sort((a, b) => gapOrder(a) - gapOrder(b) || b.markers - a.markers);
    const gapRows = sortedGaps.map((gap) => {
        const [label, tone] = GAP_STATUS[gap.status] ?? [gap.status, "warn"];
        const what = gap.kind === "section" ? `<b>${esc(gap.target)}</b><br><small>section of ${esc(gap.target_title ?? "an unknown article")}</small>` : `<b>${esc(gap.target)}</b>`;
        const labels = gap.labels?.length && gap.labels.some((text) => text !== gap.target) ? `<br><small>linked as “${esc(gap.labels.join("”, “"))}”</small>` : "";
        const names = gap.articles.map((item) => `${esc(item.title)}${item.count > 1 ? ` <small>×${item.count}</small>` : ""}`);
        const where = names.length > 4 ? `${names.slice(0, 3).join(", ")} <details><summary>${names.length - 3} more</summary>${names.slice(3).join(", ")}</details>` : names.join(", ");
        const found = [badge(label, tone), gap.backup_title ? `<br>${esc(gap.backup_title)}${gap.revision_id ? ` <small>rev ${esc(gap.revision_id)}, ${date(gap.timestamp)}</small>` : ""}` : "", gap.detail ? `<br><small>${esc(gap.detail)}</small>` : ""].join("");
        return [`${what}${labels}`, esc(GAP_KIND[gap.kind] ?? gap.kind), `${where} <small>(${plural(gap.markers, "marker")})</small>`, found, textLink(gap.text_ref, gap.line)];
    });

    const gapHead = ["Missing", "Kind", "Marked in", "In the backup?", "Text"];
    const gapTables = () => {
        if (!gaps.length) return `<p class="none">No gap markers found in the articles.</p>`;
        const shown = gapRows.filter((row, index) => sortedGaps[index].status !== "not-in-backup");
        const rest = gapRows.filter((row, index) => sortedGaps[index].status === "not-in-backup");
        const restMarkers = sortedGaps.filter((gap) => gap.status === "not-in-backup").reduce((sum, gap) => sum + gap.markers, 0);
        return [
            shown.length ? table(gapHead, shown) : `<p class="none">The backup fills none of them.</p>`,
            rest.length ? `<details class="rest"><summary>${plural(rest.length, "missing item")} the backup does not have either (${plural(restMarkers, "marker")})</summary>${table(gapHead.slice(0, 4), rest.map((row) => row.slice(0, 4)))}</details>` : "",
        ].join("");
    };

    // New pages
    const newRows = [...report.new_pages].sort((a, b) => b.linked_from.length - a.linked_from.length || a.title.localeCompare(b.title)).map((page) => [
        `<b>${esc(page.title)}</b>${page.linked_from.length ? `<br>${badge("Linked from our articles", "changed")}` : ""}`,
        `<span class="nowrap">${esc(size(page.bytes))}</span>`,
        `<span class="nowrap">${date(page.timestamp)}</span>${page.last_editor ? `<br><small>${esc(page.last_editor === "anonymous" ? "anonymous editor" : page.last_editor)}</small>` : ""}`,
        String(page.revisions),
        page.linked_from.length ? esc(page.linked_from.map((item) => item.title).join(", ")) : `<small>not linked</small>`,
        textLink(page.text_ref),
    ]);

    // Images
    let imageSection = `<p class="none">The backup has no images folder, so images were not compared.</p>`;
    if (images) {
        const changedRows = images.differs.map((item) => {
            const ours = item.recovered_file ? imageData(item.recovered_file, budget) : null;
            const theirs = item.backup_file ? imageData(item.backup_file, budget) : null;
            const previews = ours || theirs ? `<div class="previews">${ours ? `<figure><img src="${ours}" alt="Our recovered ${esc(item.filename)}" loading="lazy"><figcaption>Ours (${esc(size(item.recovered_bytes))})</figcaption></figure>` : ""}${theirs ? `<figure><img src="${theirs}" alt="Backup ${esc(item.filename)}" loading="lazy"><figcaption>Backup (${esc(size(item.backup_bytes))})</figcaption></figure>` : ""}</div>` : "";
            return [`<b>${esc(item.filename)}</b>${previews}`, esc(item.recovered_status === "partial" ? "partial (incomplete download)" : item.recovered_status), sizes(item.recovered_bytes, item.backup_bytes)];
        });
        const imageGaps = new Set(gaps.filter((gap) => gap.kind === "image" && gap.status === "in-backup").map((gap) => gap.image));
        const newList = images.new_in_backup.map((item) => `<li>${esc(item.filename)} <small>${esc(size(item.bytes))}${imageGaps.has(item.filename) ? " · fills an image gap" : ""}</small></li>`);
        imageSection = [
            `<p class="intro">${images.identical} of ${images.recovered_files} recovered images are byte-for-byte identical in the backup. Images we recovered only partly are marked; a different file in the backup may be the complete original.</p>`,
            `<h3>Different in the backup (${images.differs.length})</h3>`, table(["File", "Recovered as", "Size, ours → backup"], changedRows),
            `<h3>Missing from the backup (${images.missing_from_backup.length})</h3>`,
            images.missing_from_backup.length ? `<p>${esc(images.missing_from_backup.join(", "))}</p>` : `<p class="none">None.</p>`,
            `<h3>Only in the backup (${images.new_in_backup.length})</h3>`,
            newList.length ? `<details${newList.length <= 20 ? " open" : ""}><summary>${plural(newList.length, "file")}</summary><ul>${newList.join("")}</ul></details>` : `<p class="none">None.</p>`,
        ].join("");
    }

    // Redirects and templates
    const redirectRows = report.redirects.filter((item) => item.agrees !== true).map((item) => [esc(item.title), esc(item.target), item.served_target ? esc(item.served_target) : "<small>not served</small>", item.target_route ? esc(item.target_route) : "<small>no restored article</small>"]);
    const templateRows = (report.archived_templates ?? []).filter((item) => item.status !== "same").map((item) => [esc(item.title), esc(item.archived_revision), item.backup_revision ? esc(item.backup_revision) : "<small>missing</small>", esc(item.status.replaceAll("-", " "))]);
    const templateGapRows = (report.template_gaps ?? []).filter((item) => item.in_backup.length).map((item) => [esc(item.title), String(item.gaps), esc(item.in_backup.join(", "))]);

    // Texts from the backup
    const textBlocks = Object.entries(texts).map(([ref, page]) => {
        const anchorLines = new Set(page.anchors.map((anchor) => anchor.line));
        const lines = page.text.split("\n").map((line, index) => anchorLines.has(index) ? `<span class="ln" id="text-${esc(ref)}-L${index}">${esc(line)}</span>` : `${esc(line)}\n`).join("");
        return `<details id="text-${esc(ref)}"><summary>${esc(page.title)} <small class="muted">revision ${esc(page.revision_id)} · ${date(page.timestamp)} · ${esc(page.last_editor === "anonymous" ? "anonymous editor" : page.last_editor ?? "")}</small></summary><pre>${lines}</pre></details>`;
    });

    const nav = [
        ["summary", "Summary", null],
        ["articles", "Articles that differ", differing.length],
        ["gaps", "Gaps", fillable.length],
        ["new-pages", "Only in the backup", report.new_pages.length],
        ["images", "Images", images ? images.differs.length + images.missing_from_backup.length : null],
        ["redirects", "Redirects and templates", redirectRows.length + templateRows.length],
        ["texts", "Backup texts", textBlocks.length],
    ];
    const body = `<div class="page">
<header>
<p class="kicker">Bisq documentation · wiki backup comparison</p>
<h1>How the wiki backup compares with the restored articles</h1>
<p class="lede">${esc(verdict.join(" "))}</p>
<dl class="facts">${facts.map(([term, value]) => `<dt>${esc(term)}</dt><dd>${value}</dd>`).join("")}</dl>
</header>
<nav class="toc" aria-label="Sections">${nav.map(([id, label, count]) => `<a href="#${id}">${esc(label)}${count != null ? ` <span class="count">${count}</span>` : ""}</a>`).join("")}</nav>
<main>
<section id="summary"><h2>Summary</h2><div class="cards">${cards.join("")}</div></section>
<section id="articles"><div class="section-head"><h2>Articles that differ (${differing.length})</h2>${differing.length ? `<button type="button" class="toggle" data-toggle hidden>Expand all changes</button>` : ""}</div>
<p class="intro">Each article below is compared with the backup's latest revision, word by word, on the wiki source text. Unchanged stretches are folded away.</p>
<p class="legend"><span><del>struck through</del> only in our snapshot</span><span><ins>underlined</ins> only in the backup</span></p>
${articleCards.join("\n") || `<p class="none">None: every restored article is identical in the backup.</p>`}</section>
<section id="gaps"><h2>Gaps the backup can fill</h2>
<p class="intro">Our articles mark what the snapshot lacked: links to articles it did not contain, sections missing from a linked article, images and templates. Each row is one missing item with every article that marks it. ${esc(s.gap_markers_in_backup ?? 0)} of ${esc(s.gap_markers ?? 0)} markers can be filled from the backup.</p>
${gapTables()}</section>
<section id="new-pages"><h2>Articles only in the backup (${report.new_pages.length})</h2>
<p class="intro">Main-namespace pages the restored site does not have; redirects, talk and user pages are left out. Those our articles link to come first. Decide per page; do not import them in bulk.</p>
${table(["Title", "Size", "Last edit", "Revisions", "Linked from", "Text"], newRows)}</section>
<section id="images"><h2>Images</h2>${imageSection}</section>
<section id="redirects"><h2>Redirects and templates</h2>
<p class="intro">${plural(report.redirects.length, "redirect")} in the backup: ${s.redirects - s.redirect_disagreements - s.redirects_not_served} agree with the redirects the site serves, ${s.redirect_disagreements} point elsewhere, ${s.redirects_not_served} are not served yet. The backup has ${plural(from.template_pages, "template")}.</p>
<h3>Redirects that disagree or are not served</h3>${table(["Old title", "Backup target", "Site target", "Target page"], redirectRows)}
<h3>Archived templates that differ from the backup</h3>${table(["Template", "Archived revision", "Backup revision", "Status"], templateRows)}
<h3>Template gaps the backup can fill</h3>${table(["Article", "Gaps", "Templates in the backup"], templateGapRows)}</section>
<section id="texts" class="texts"><h2>Backup texts</h2><p class="intro">Wiki source of the backup pages linked above, latest revision. Headings are highlighted when a link points to them.</p>${textBlocks.join("\n") || `<p class="none">None.</p>`}</section>
</main>
<footer><p>This report holds public wiki data only: titles, page text, revision numbers, dates and usernames. Anonymous editors are counted, never listed, and IP addresses are never read into it. It was made on this computer from the backup, which it does not contain and never uploads. Keep it out of the repository.</p></footer>
</div>`;
    const csp = `default-src 'none'; img-src data:; style-src ${hash(STYLE)}; script-src ${hash(SCRIPT)}; base-uri 'none'; form-action 'none'`;
    return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Security-Policy" content="${csp}">
<meta name="referrer" content="no-referrer">
<meta name="robots" content="noindex">
<title>Wiki backup comparison</title>
<style>${STYLE}</style>
</head>
<body>
${body}
<script>${SCRIPT}</script>
</body>
</html>
`;
}
