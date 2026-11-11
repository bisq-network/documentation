// Write or refresh the receipt for one edited article, for contributors working
// in a local checkout. In the browser, the receipts check on the pull request
// offers the same receipt as an "Add receipt" link instead.
//
// The receipt goes to migration/accepted-edits/<slug>.pr-<number>.json and
// describes how the article differs from the version on the base branch. Run it
// again after each wording change: it refreshes the hashes and recorded changes, lists
// what the fidelity gate requires the receipt to list (figures whose alt text changed,
// code blocks, tables and gap markers, invisible characters), and keeps the summary,
// approvals, notes and evidence already in the file. The
// fidelity check verifies every recorded change and hash, so a wrong receipt
// fails rather than passes.
//
//   node scripts/record-accepted-edit.mjs <slug> --pr <pull request URL> [--author <login>]
//     [--summary "<one line>"] [--approver <login>] [--base origin/main]
//
// A new receipt needs --author and --summary. Without --approver it names the
// one listed reviewer other than the author, when there is exactly one.
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { verify } from "./check-source-fidelity.mjs";
import { draftReceipt, parseReviewers, readAcceptedEdits, receiptPath, receiptText } from "./lib/accepted-edits.mjs";

const [slug, ...rest] = process.argv.slice(2);
const option = (name, fallback) => {
  const index = rest.indexOf(`--${name}`);
  return index >= 0 && rest[index + 1] ? rest[index + 1] : fallback;
};
const usage = "Usage: node scripts/record-accepted-edit.mjs <slug> --pr <pull request URL> [--author <login>] [--summary \"<one line>\"] [--approver <login>] [--base origin/main]";
if (!/^[a-z0-9-]+$/.test(slug ?? "") || !option("pr")) {
  console.error(usage);
  process.exit(2);
}
const path = `src/content/docs/wiki/${slug}.md`;
const base = execFileSync("git", ["show", `${option("base", "origin/main")}:${path}`], { encoding: "utf8", maxBuffer: 1 << 26 });
const target = receiptPath({ slug, pull_request: option("pr") });
const accepted = readFileSync(path, "utf8");
if (base === accepted) {
  console.error(`${path} is identical on the base branch; nothing to record.`);
  process.exit(1);
}

const previous = existsSync(target) ? JSON.parse(readFileSync(target, "utf8")) : undefined;
const author = option("author", previous?.author);
const summary = option("summary", previous?.summary);
if (!author || !summary) {
  console.error(`${target} does not exist yet, so --author and --summary are needed.\n${usage}`);
  process.exit(2);
}
// What the receipt must list (figures whose alt text changed, code blocks, tables and
// gap markers, invisible characters): the fidelity gate's findings for the edit as it
// awaits a receipt, with this receipt left out, exactly as the receipts job drafts it.
const baseRef = option("base", "origin/main");
const readBase = async (file) => {
  try { return Buffer.from(execFileSync("git", ["show", `${baseRef}:${file}`], { maxBuffer: 1 << 26 })); } catch { return undefined; }
};
const result = await verify(new Map([[target, null]]), { readBase });
const findings = result.awaiting.find((item) => item.slug === slug);
if (!findings) {
  const failures = result.failures.filter((failure) => failure.startsWith(`${path}:`));
  console.error(`${path} cannot get a receipt as it is:\n${(failures.length ? failures : ["it is not awaiting a receipt compared with the base"]).map((failure) => `- ${failure}`).join("\n")}`);
  process.exit(1);
}
const reviewers = parseReviewers(readAcceptedEdits(".").settings.reviewers);
const eligible = reviewers.filter((reviewer) => reviewer.login.toLowerCase() !== author.toLowerCase());
const approver = option("approver");
const approvals = approver
  ? [{ login: approver, role: reviewers.find((reviewer) => reviewer.login.toLowerCase() === approver.toLowerCase())?.role ?? "documentation reviewer" }]
  : previous?.approvals ?? (eligible.length === 1 ? [{ login: eligible[0].login, role: eligible[0].role }] : []);

const item = draftReceipt({
  slug,
  pullRequest: option("pr"),
  author,
  summary,
  base,
  accepted,
  approvals,
  noteIds: previous?.note_ids ?? [],
  evidence: previous?.evidence ?? [],
  changedImageAltText: findings.changedImageAltText ?? [],
  changedLockedContent: findings.changedLockedContent ?? [],
  addedInvisibleCharacters: findings.addedInvisibleCharacters ?? [],
});
mkdirSync(dirname(target), { recursive: true });
writeFileSync(target, receiptText(item));
console.log(`${previous ? "Refreshed" : "Wrote"} ${target} (${item.changes.length} recorded change${item.changes.length === 1 ? "" : "s"}).`);
if (!approvals.length) console.log(`Add the approving reviewer with --approver <login> (one of: ${eligible.map((reviewer) => reviewer.login).join(", ")}).`);
