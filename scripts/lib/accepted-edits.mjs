import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

// Receipts for human-approved wording changes to restored articles. Each
// receipt records the exact text it replaced, so the fidelity gate can rebuild
// the preserved original from the edited file and keep checking it byte for
// byte. See CONTRIBUTING.md ("Accepted editorial changes").
//
// migration/accepted-edits.json holds the settings: how many approvals a receipt
// needs and who may give them. Each receipt is its own file in
// migration/accepted-edits/, named <slug>.pr-<number>.json, so pull requests
// that add receipts for different articles never conflict.
export const acceptedEditsPath = "migration/accepted-edits.json";
export const receiptsDir = "migration/accepted-edits";

const hash = (value) => createHash("sha256").update(value).digest("hex");
const sha256 = /^[a-f0-9]{64}$/;
const githubLogin = /^[A-Za-z0-9](?:[A-Za-z0-9]|-(?=[A-Za-z0-9])){0,38}$/;
// Pull requests of this repository, before and after the planned move.
const pullRequestUrl = /^https:\/\/github\.com\/(?:hiciefte\/bisq-docs|bisq-network\/documentation)\/pull\/[1-9]\d*$/;
// The summary is shown on the article; it must not read like an endorsement.
const endorsement = /\b(?:verified|official|approved|endorsed|certified|guaranteed)\b/i;
const calendarDate = (value) => /^\d{4}-\d{2}-\d{2}$/.test(value) && new Date(`${value}T00:00:00Z`).toISOString().slice(0, 10) === value;
const figureId = /^source-image-\d+$/;

/** "PR #46" for messages and page labels. */
export const pullRequestLabel = (url) => `PR #${url.split("/").pop()}`;

/** Where the receipt for this article and pull request lives. */
export const receiptPath = (item) => `${receiptsDir}/${item?.slug}.pr-${String(item?.pull_request ?? "").split("/").pop()}.json`;

function itemProblems(item, { slugs, notes }) {
  const problems = [];
  const need = (condition, message) => { if (!condition) problems.push(message); };
  need(slugs.has(item.slug), "slug is not one of the 209 restored articles");
  need(pullRequestUrl.test(item.pull_request ?? ""), "pull_request must be a pull request URL of this repository");
  need(typeof item.summary === "string" && /^[^\n]{1,200}$/.test(item.summary.trim()), "summary must be one line of at most 200 characters");
  need(!endorsement.test(item.summary ?? ""), "summary must describe the change, not call it verified, official or approved");
  need(sha256.test(item.based_on_file_sha256 ?? ""), "based_on_file_sha256 must be a SHA-256 hex digest");
  need(sha256.test(item.accepted_file_sha256 ?? ""), "accepted_file_sha256 must be a SHA-256 hex digest");
  need(item.based_on_file_sha256 !== item.accepted_file_sha256, "based_on and accepted file hashes are equal; nothing was edited");
  need(typeof item.accepted_on === "string" && calendarDate(item.accepted_on), "accepted_on must be a real YYYY-MM-DD date");
  need(githubLogin.test(item.author ?? ""), "author must be a plain GitHub login (no @)");
  const approvals = Array.isArray(item.approvals) ? item.approvals : [];
  need(Array.isArray(item.approvals), "approvals must be a list");
  for (const approval of approvals) {
    need(githubLogin.test(approval?.login ?? ""), `approval login ${JSON.stringify(approval?.login)} must be a plain GitHub login (no @)`);
    need(typeof approval?.role === "string" && approval.role.trim().length > 0, `approval by ${approval?.login} has no role`);
  }
  const logins = approvals.map((approval) => String(approval?.login).toLowerCase());
  need(new Set(logins).size === logins.length, "the same login approves twice");
  need(!logins.includes(String(item.author).toLowerCase()), "the pull request author cannot count as an approval");
  need(Array.isArray(item.note_ids), "note_ids must be a list (it may be empty)");
  for (const id of Array.isArray(item.note_ids) ? item.note_ids : []) {
    need(notes.get(id)?.source_slugs.includes(item.slug), `note ${JSON.stringify(id)} is not a migration/source-review-notes.json note for this article`);
  }
  need(Array.isArray(item.evidence) && item.evidence.every((url) => /^https:\/\/\S+$/.test(url)), "evidence must be a list of https links");
  const images = item.changed_image_alt_text ?? [];
  need(Array.isArray(images) && images.every((id) => figureId.test(id)), "changed_image_alt_text must list figure ids such as source-image-1");
  const changes = Array.isArray(item.changes) ? item.changes : [];
  need(changes.length > 0, "changes must list the replaced text");
  for (const change of changes) {
    need(Number.isSafeInteger(change?.line) && change.line > 0 && Number.isSafeInteger(change?.column) && change.column > 0, "each change needs a positive line and column");
    need(typeof change?.original === "string" && typeof change?.accepted === "string" && change.original !== change.accepted, "each change needs different original and accepted text");
  }
  return problems;
}

/** The reviewers listed in the settings: [{ login, role }]. Throws when the list is unusable. */
export function parseReviewers(reviewers) {
  if (!Array.isArray(reviewers) || !reviewers.length) throw new Error("reviewers must list at least one { login, role }");
  for (const reviewer of reviewers) {
    if (!githubLogin.test(reviewer?.login ?? "")) throw new Error(`reviewer login ${JSON.stringify(reviewer?.login)} must be a plain GitHub login (no @)`);
    if (typeof reviewer?.role !== "string" || !reviewer.role.trim()) throw new Error(`reviewer ${reviewer.login} has no role`);
  }
  const logins = reviewers.map((reviewer) => reviewer.login.toLowerCase());
  if (new Set(logins).size !== logins.length) throw new Error("a reviewer is listed twice");
  return reviewers;
}

/**
 * Order one article's receipts so each is based on the file the previous one
 * accepted. When they do not form one chain, fall back to date and pull
 * request order; the fidelity gate then reports the receipt that does not fit.
 */
function chained(items) {
  const accepted = new Set(items.map((item) => item.accepted_file_sha256));
  const starts = items.filter((item) => !accepted.has(item.based_on_file_sha256));
  if (starts.length === 1) {
    const order = [starts[0]];
    for (;;) {
      const next = items.filter((item) => item.based_on_file_sha256 === order.at(-1).accepted_file_sha256);
      if (next.length !== 1 || order.includes(next[0])) break;
      order.push(next[0]);
    }
    if (order.length === items.length) return order;
  }
  const number = (item) => Number(item.pull_request.split("/").pop());
  return [...items].sort((a, b) => a.accepted_on.localeCompare(b.accepted_on) || number(a) - number(b));
}

/**
 * Validate the settings and receipt files ([{ path, text }]). Returns the
 * required approval count, the reviewers, valid receipts grouped per article in
 * chain order (oldest first), and one problem string per invalid receipt file.
 * An invalid receipt is never used. Settings problems throw.
 */
export function parseAcceptedEdits(settings, files, { slugs, notes }) {
  if (settings?.schema_version !== 2) throw new Error("unsupported accepted-edits settings (expected schema_version 2)");
  if ("items" in settings) throw new Error(`receipts are files in ${receiptsDir}/, one per article and pull request, not items in the settings`);
  const required = settings.required_approvals;
  if (!Number.isSafeInteger(required) || required < 1) throw new Error("required_approvals must be a whole number of at least 1");
  const reviewers = parseReviewers(settings.reviewers);
  const noteMap = new Map(notes.map((note) => [note.id, note]));
  const valid = [];
  const problems = [];
  for (const { path, text } of [...files].sort((a, b) => a.path.localeCompare(b.path))) {
    let item;
    try { item = JSON.parse(text); } catch { problems.push(`${path}: is not valid JSON`); continue; }
    if (!item || typeof item !== "object" || Array.isArray(item)) { problems.push(`${path}: must hold one receipt object`); continue; }
    const found = itemProblems(item, { slugs, notes: noteMap });
    if (path !== receiptPath(item)) found.push(`the file name must be ${receiptPath(item).slice(receiptsDir.length + 1)}: the article slug and the pull request number`);
    const approvals = Array.isArray(item.approvals) ? item.approvals.length : 0;
    if (approvals < required) found.push(`${approvals} recorded approval${approvals === 1 ? "" : "s"}; required_approvals is ${required}`);
    if (found.length) { problems.push(`${path}: ${found.join("; ")}`); continue; }
    valid.push(item);
  }
  const bySlug = new Map();
  for (const item of valid) bySlug.set(item.slug, [...(bySlug.get(item.slug) ?? []), item]);
  for (const [slug, items] of bySlug) bySlug.set(slug, chained(items));
  return { required, reviewers, bySlug, problems };
}

/** Repository-relative paths of the receipt files below root, sorted. */
export function receiptFilesIn(root = ".") {
  const dir = resolve(root, receiptsDir);
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true }).filter((entry) => entry.isFile()).map((entry) => `${receiptsDir}/${entry.name}`).sort();
}

/** The settings and receipt files of the checkout at root: { settings, files: [{ path, text }] }. */
export function readAcceptedEdits(root = ".") {
  return {
    settings: JSON.parse(readFileSync(resolve(root, acceptedEditsPath), "utf8")),
    files: receiptFilesIn(root).map((path) => ({ path, text: readFileSync(resolve(root, path), "utf8") })),
  };
}

/** Read and validate the committed receipts (used by the site to label edited articles). */
export function loadAcceptedEdits(root = ".") {
  const read = (path) => readFileSync(resolve(root, path), "utf8");
  const articles = JSON.parse(read("migration/articles.json")).items;
  const notes = JSON.parse(read("migration/source-review-notes.json")).items;
  const { settings, files } = readAcceptedEdits(root);
  return parseAcceptedEdits(settings, files, { slugs: new Set(articles.map((article) => article.slug)), notes });
}

const endorsementFree = (summary) => {
  const line = String(summary ?? "").replace(/\s+/g, " ").trim().slice(0, 200);
  return line && !endorsement.test(line) ? line : "Wording change; see the pull request.";
};

/**
 * A receipt for the edit from base to accepted text. Used by
 * scripts/record-accepted-edit.mjs and by the receipts job's "Add receipt"
 * links; the gate never trusts it and verifies every recorded change.
 */
export function draftReceipt({ slug, pullRequest, author, summary, base, accepted, approvals = [], acceptedOn = new Date().toISOString().slice(0, 10), noteIds = [], evidence = [], changedImageAltText = [] }) {
  return {
    slug,
    pull_request: pullRequest,
    summary: endorsementFree(summary),
    author,
    based_on_file_sha256: hash(base),
    accepted_file_sha256: hash(accepted),
    accepted_on: acceptedOn,
    approvals,
    note_ids: noteIds,
    evidence,
    changed_image_alt_text: changedImageAltText,
    changes: describeEdit(base, accepted),
  };
}

/** A receipt file's text. */
export const receiptText = (item) => `${JSON.stringify(item, null, 2)}\n`;

/**
 * GitHub's new-file page on the pull request's branch, prefilled with the
 * receipt. Undefined when the link would be longer than browsers and GitHub
 * reliably accept; the receipt is then printed for copying instead.
 */
export function addReceiptLink({ server = "https://github.com", repository, branch, item, maxLength = 8000 }) {
  // Also encode the characters encodeURIComponent keeps, so the URL cannot end a
  // Markdown link early in the job summary.
  const encode = (value) => encodeURIComponent(value).replace(/[!'()*]/g, (character) => `%${character.charCodeAt(0).toString(16).toUpperCase()}`);
  const ref = String(branch).split("/").map(encode).join("/");
  const url = `${server}/${repository}/new/${ref}?filename=${encode(receiptPath(item))}&value=${encode(receiptText(item))}`;
  return url.length <= maxLength ? url : undefined;
}

/**
 * Draft receipts for the articles a pull request changes without one: per
 * article, one draft for each listed reviewer who may approve it (everyone but
 * the pull request author), each with its "Add receipt" link. event is the
 * workflow event; readBase and readHead return an article's base and proposed
 * text by repository-relative path.
 */
export function receiptDrafts({ event, repository, server = "https://github.com", reviewers, awaiting, readBase, readHead, acceptedOn }) {
  const pr = event?.pull_request;
  if (!pr) return [];
  const author = String(pr.user?.login ?? "");
  const eligible = reviewers.filter((reviewer) => reviewer.login.toLowerCase() !== author.toLowerCase());
  return awaiting.map((article) => {
    const base = readBase(article.path);
    const accepted = readHead(article.path);
    return {
      slug: article.slug,
      drafts: eligible.map((reviewer) => {
        const item = draftReceipt({
          slug: article.slug,
          pullRequest: `https://github.com/${repository}/pull/${pr.number}`,
          author,
          summary: pr.title,
          base,
          accepted,
          approvals: [{ login: reviewer.login, role: reviewer.role }],
          acceptedOn,
          changedImageAltText: article.changedImageAltText ?? [],
        });
        const url = pr.head?.ref ? addReceiptLink({ server, repository: pr.head.repo?.full_name ?? repository, branch: pr.head.ref, item }) : undefined;
        return { reviewer: reviewer.login, item, url };
      }),
    };
  });
}

/**
 * Undo one receipt: check the file is exactly what was accepted, put every
 * recorded original text back, and check the result is exactly the file the
 * edit was based on. Line and column (1-based, JavaScript string units) refer
 * to the accepted file. Throws a message naming the pull request on mismatch.
 */
export function undoAcceptedEdit(text, receipt) {
  const pr = pullRequestLabel(receipt.pull_request);
  const actual = hash(text);
  if (actual !== receipt.accepted_file_sha256) {
    throw new Error(`file changed after its accepted edit: it is sha256 ${actual.slice(0, 12)}…, but ${pr} accepted ${receipt.accepted_file_sha256.slice(0, 12)}…. A further change needs its own reviewed receipt.`);
  }
  const lineStarts = [0];
  for (let index = text.indexOf("\n"); index >= 0; index = text.indexOf("\n", index + 1)) lineStarts.push(index + 1);
  const located = receipt.changes.map((change, index) => {
    const lineEnd = change.line < lineStarts.length ? lineStarts[change.line] - 1 : text.length;
    const start = lineStarts[change.line - 1] + change.column - 1;
    if (change.line > lineStarts.length || start > lineEnd) throw new Error(`${pr} change ${index + 1} points outside the file (line ${change.line}, column ${change.column})`);
    if (text.slice(start, start + change.accepted.length) !== change.accepted) throw new Error(`${pr} change ${index + 1} does not match the file at line ${change.line}, column ${change.column}`);
    return { ...change, start };
  });
  located.forEach((change, index) => {
    if (index && change.start < located[index - 1].start + located[index - 1].accepted.length) throw new Error(`${pr} changes must be in file order and must not overlap`);
  });
  let restored = text;
  for (const change of [...located].reverse()) restored = restored.slice(0, change.start) + change.original + restored.slice(change.start + change.accepted.length);
  const base = hash(restored);
  if (base !== receipt.based_on_file_sha256) {
    throw new Error(`${pr} recorded changes do not rebuild the file it was based on (got sha256 ${base.slice(0, 12)}…, expected ${receipt.based_on_file_sha256.slice(0, 12)}…)`);
  }
  return restored;
}

const tokens = (value) => value.match(/<[^>]*>|&[#\w]+;|\w+|\s+|[^\w\s<&]+|[<&]/g) ?? [];
const lines = (value) => value.match(/[^\n]*\n|[^\n]+$/g) ?? [];

/** Differing ranges between two token lists, as offsets into their joined text. */
function differingRanges(x, y) {
  let prefix = 0;
  while (prefix < x.length && prefix < y.length && x[prefix] === y[prefix]) prefix += 1;
  let suffix = 0;
  while (suffix < x.length - prefix && suffix < y.length - prefix && x[x.length - 1 - suffix] === y[y.length - 1 - suffix]) suffix += 1;
  const a = x.slice(prefix, x.length - suffix);
  const b = y.slice(prefix, y.length - suffix);
  let aOffset = x.slice(0, prefix).join("").length;
  let bOffset = y.slice(0, prefix).join("").length;
  if (a.length * b.length > 4_000_000) return [{ aStart: aOffset, aEnd: aOffset + a.join("").length, bStart: bOffset, bEnd: bOffset + b.join("").length }];
  // Longest common subsequence over the differing middle part.
  const width = b.length + 1;
  const table = new Uint32Array((a.length + 1) * width);
  for (let i = a.length - 1; i >= 0; i -= 1) {
    for (let j = b.length - 1; j >= 0; j -= 1) {
      table[i * width + j] = a[i] === b[j] ? table[(i + 1) * width + j + 1] + 1 : Math.max(table[(i + 1) * width + j], table[i * width + j + 1]);
    }
  }
  const ranges = [];
  let open = null;
  for (let i = 0, j = 0; i < a.length || j < b.length;) {
    if (i < a.length && j < b.length && a[i] === b[j]) {
      open = null; aOffset += a[i].length; bOffset += b[j].length; i += 1; j += 1;
      continue;
    }
    if (!open) { open = { aStart: aOffset, aEnd: aOffset, bStart: bOffset, bEnd: bOffset }; ranges.push(open); }
    if (j < b.length && (i === a.length || table[i * width + j + 1] >= table[(i + 1) * width + j])) { bOffset += b[j].length; open.bEnd = bOffset; j += 1; }
    else { aOffset += a[i].length; open.aEnd = aOffset; i += 1; }
  }
  return ranges;
}

/**
 * Describe the edit from base to accepted text as receipt changes: changed
 * lines first, then changed words within them. Used by
 * scripts/record-accepted-edit.mjs; the gate never trusts it and instead
 * verifies the recorded changes exactly with undoAcceptedEdit.
 */
export function describeEdit(base, accepted) {
  const ranges = [];
  for (const block of differingRanges(lines(base), lines(accepted))) {
    for (const range of differingRanges(tokens(base.slice(block.aStart, block.aEnd)), tokens(accepted.slice(block.bStart, block.bEnd)))) {
      ranges.push({ aStart: block.aStart + range.aStart, aEnd: block.aStart + range.aEnd, bStart: block.bStart + range.bStart, bEnd: block.bStart + range.bEnd });
    }
  }
  // Widen each range to whole words for readable receipts, then merge ranges
  // that touch or are separated by a single space.
  const merged = [];
  for (const range of ranges) {
    while (range.aStart > 0 && range.bStart > 0 && !/[\s>]/.test(base[range.aStart - 1]) && base[range.aStart - 1] === accepted[range.bStart - 1]) { range.aStart -= 1; range.bStart -= 1; }
    while (range.aEnd < base.length && range.bEnd < accepted.length && !/[\s<]/.test(base[range.aEnd]) && base[range.aEnd] === accepted[range.bEnd]) { range.aEnd += 1; range.bEnd += 1; }
    const last = merged.at(-1);
    if (last && range.aStart <= last.aEnd + 1 && /^ ?$/.test(base.slice(last.aEnd, range.aStart))) {
      last.aEnd = Math.max(last.aEnd, range.aEnd);
      last.bEnd = Math.max(last.bEnd, range.bEnd);
    } else merged.push(range);
  }
  return merged.map(({ aStart, aEnd, bStart, bEnd }) => {
    const before = accepted.slice(0, bStart);
    return { line: before.split("\n").length, column: bStart - before.lastIndexOf("\n"), original: base.slice(aStart, aEnd), accepted: accepted.slice(bStart, bEnd) };
  });
}

let committed;
/** Accepted edits for one article, oldest first (for labelling the page). */
export function acceptedEditsFor(slug) {
  committed ??= loadAcceptedEdits();
  return committed.bySlug.get(slug) ?? [];
}
