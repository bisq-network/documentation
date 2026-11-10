import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

// Receipts for human-approved wording changes to restored articles. Each
// receipt records the exact text it replaced, so the fidelity gate can rebuild
// the preserved original from the edited file and keep checking it byte for
// byte. See CONTRIBUTING.md ("Accepted editorial changes").
export const acceptedEditsPath = "migration/accepted-edits.json";

const hash = (value) => createHash("sha256").update(value).digest("hex");
const sha256 = /^[a-f0-9]{64}$/;
const githubLogin = /^[A-Za-z0-9](?:[A-Za-z0-9]|-(?=[A-Za-z0-9])){0,38}$/;
const pullRequestUrl = /^https:\/\/github\.com\/[\w.-]+\/[\w.-]+\/pull\/[1-9]\d*$/;
const figureId = /^source-image-\d+$/;

/** "PR #46" for messages and page labels. */
export const pullRequestLabel = (url) => `PR #${url.split("/").pop()}`;

function itemProblems(item, { slugs, notes }) {
  const problems = [];
  const need = (condition, message) => { if (!condition) problems.push(message); };
  need(slugs.has(item.slug), "slug is not one of the 209 restored articles");
  need(pullRequestUrl.test(item.pull_request ?? ""), "pull_request must be a GitHub pull request URL");
  need(typeof item.summary === "string" && /^[^\n]{1,200}$/.test(item.summary.trim()), "summary must be one line of at most 200 characters");
  need(sha256.test(item.based_on_file_sha256 ?? ""), "based_on_file_sha256 must be a SHA-256 hex digest");
  need(sha256.test(item.accepted_file_sha256 ?? ""), "accepted_file_sha256 must be a SHA-256 hex digest");
  need(item.based_on_file_sha256 !== item.accepted_file_sha256, "based_on and accepted file hashes are equal; nothing was edited");
  need(/^\d{4}-\d{2}-\d{2}$/.test(item.accepted_on ?? "") && !Number.isNaN(Date.parse(item.accepted_on)), "accepted_on must be a YYYY-MM-DD date");
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

/**
 * Validate the receipts file. Returns the required approval count, valid
 * receipts grouped per article in file order, and one problem string per
 * invalid receipt. An invalid receipt is never used.
 */
export function parseAcceptedEdits(data, { slugs, notes }) {
  if (data?.schema_version !== 1) throw new Error("unsupported accepted-edits schema (expected schema_version 1)");
  const required = data.required_approvals;
  if (!Number.isSafeInteger(required) || required < 1) throw new Error("required_approvals must be a whole number of at least 1");
  if (!Array.isArray(data.items)) throw new Error("items must be a list");
  const noteMap = new Map(notes.map((note) => [note.id, note]));
  const bySlug = new Map();
  const problems = [];
  const seen = new Set();
  data.items.forEach((item, index) => {
    const label = `receipt ${index + 1} (${item?.slug ?? "no slug"}, ${item?.pull_request ? pullRequestLabel(item.pull_request) : "no pull request"})`;
    const found = itemProblems(item ?? {}, { slugs, notes: noteMap });
    const key = `${item?.slug}\0${item?.pull_request}`;
    if (seen.has(key)) found.push("duplicate receipt for the same article and pull request");
    seen.add(key);
    const approvals = Array.isArray(item?.approvals) ? item.approvals.length : 0;
    if (approvals < required) found.push(`${approvals} recorded approval${approvals === 1 ? "" : "s"}; required_approvals is ${required}`);
    if (found.length) { problems.push(`${label}: ${found.join("; ")}`); return; }
    bySlug.set(item.slug, [...(bySlug.get(item.slug) ?? []), item]);
  });
  return { required, bySlug, problems };
}

/** Read and validate the committed receipts (used by the site to label edited articles). */
export function loadAcceptedEdits(read = (path) => readFileSync(path, "utf8")) {
  const articles = JSON.parse(read("migration/articles.json")).items;
  const notes = JSON.parse(read("migration/source-review-notes.json")).items;
  return parseAcceptedEdits(JSON.parse(read(acceptedEditsPath)), { slugs: new Set(articles.map((article) => article.slug)), notes });
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
