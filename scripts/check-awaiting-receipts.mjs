import { appendFileSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { altTextNote, awaitingLine, baseReader, verify } from "./check-source-fidelity.mjs";
import { parseReviewers, readAcceptedEdits, receiptDrafts, receiptPath, receiptText } from "./lib/accepted-edits.mjs";
import { annotation, oneLine } from "./lib/actions-output.mjs";

// The receipts job: fails while any restored article has a wording change that no
// accepted-edit receipt covers yet, and lists each one. That is expected for a
// wording proposal until a reviewer accepts it. The check job decides whether such
// an edit is otherwise acceptable; any other source-fidelity finding fails here
// too, so this job never passes where the default (strict) gate would fail.
//
// On a pull request it also drafts each missing receipt and links to GitHub's
// new-file page on the pull request's branch with the receipt filled in, one
// link per reviewer who may approve, so a reviewer can add it from the browser.
//
//   node scripts/check-awaiting-receipts.mjs [--base <dir>]
//
// <dir> holds the pull request's base files (see .github/workflows/check.yml).
// Without it, an unreceipted edit cannot be compared with its base and is listed
// as a plain finding.
const index = process.argv.indexOf("--base");
const base = index >= 0 ? process.argv[index + 1] : undefined;
if (index >= 0 && (!base || base.startsWith("--"))) throw new Error("--base needs the directory holding the pull request's base files");

const server = process.env.GITHUB_SERVER_URL ?? "https://github.com";
const repository = process.env.GITHUB_REPOSITORY ?? "bisq-network/documentation";
const guide = `${server}/${repository}/blob/main/CONTRIBUTING.md#accepted-editorial-changes`;
const plural = (count, noun) => `${count} ${noun}${count === 1 ? "" : "s"}`;

let result;
try {
  result = await verify(new Map(), base === undefined ? {} : { readBase: baseReader(base) });
} catch (error) {
  // For example an edited additional historical article: no receipt can cover it.
  result = { awaiting: [], failures: [error.message] };
}
const lines = [];
const summary = ["### Accepted-edit receipts", ""];
if (result.awaiting.length) {
  lines.push(`Awaiting an accepted-edit receipt: ${plural(result.awaiting.length, "article")}.`);
  lines.push("This is expected for a wording proposal until a reviewer accepts it. When the wording is final, the reviewer adds the");
  lines.push(`receipt and approves, as described in CONTRIBUTING.md#accepted-editorial-changes (${guide}); this check then passes.`);
  for (const item of result.awaiting) {
    const figures = altTextNote(item) ? ` The ${altTextNote(item)}.` : "";
    lines.push(`- ${awaitingLine(item)}`);
    lines.push(annotation("warning", { file: item.path, title: "Awaiting an accepted-edit receipt" }, `Wording changed without an accepted-edit receipt. Expected for a wording proposal until a reviewer accepts it; see CONTRIBUTING.md#accepted-editorial-changes.${figures}`));
  }
  summary.push(`**Awaiting a receipt (${result.awaiting.length}).** Expected for a wording proposal until a reviewer accepts it; see [Accepted editorial changes](${guide}).`, "");
  summary.push(...result.awaiting.map((item) => `- \`${item.slug}\`${altTextNote(item) ? `: ${altTextNote(item)}` : ""}`), "");
  addReceiptInstructions();
}
if (result.failures.length) {
  // The check job prints these findings in full.
  lines.push(`Source fidelity has ${plural(result.failures.length, "other finding")}; the check job lists them:`);
  lines.push(...result.failures.map((failure) => `- ${oneLine(failure)}`));
  summary.push(`**${plural(result.failures.length, "other source-fidelity finding")}.** These are not a missing receipt; the \`check\` job lists them.`, "");
}
if (!result.awaiting.length && !result.failures.length) {
  lines.push("No article is awaiting an accepted-edit receipt.");
  summary.push("No article is awaiting an accepted-edit receipt.", "");
}
console.log(lines.join("\n"));
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${summary.join("\n")}\n`);
if (result.awaiting.length || result.failures.length) process.exitCode = 1;

/** On a pull request, add the "Add receipt" links to the log and the job summary. */
function addReceiptInstructions() {
  const event = process.env.GITHUB_EVENT_PATH ? JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, "utf8")) : {};
  if (!event.pull_request || base === undefined) return;
  // The reviewers from the base decide (scripts/lib/receipt-approvals.mjs); the
  // pull request's own list is only a fallback for links, never for approval.
  let reviewers = [];
  for (const root of [base, "."]) {
    try { reviewers = parseReviewers(readAcceptedEdits(root).settings.reviewers); break; } catch { /* try the next */ }
  }
  let drafts;
  try {
    drafts = receiptDrafts({
      event,
      repository,
      server,
      reviewers,
      awaiting: result.awaiting,
      readBase: (path) => readFileSync(resolve(base, path), "utf8"),
      readHead: (path) => readFileSync(path, "utf8"),
    });
  } catch (error) {
    lines.push(`Could not draft the receipts: ${oneLine(error.message)}`);
    return;
  }
  summary.push(
    "**Add the receipt when the wording is final.** The reviewer who will approve opens their link: GitHub's new-file page on this pull request's branch, with the receipt filled in. Check the one-line summary (it is shown on the article page), commit the file to the branch, then approve the pull request.",
    "",
  );
  for (const { slug, drafts: options } of drafts) {
    if (!options.length) {
      summary.push(`- \`${slug}\`: no listed reviewer other than the author can approve this.`);
      continue;
    }
    const links = options.map(({ reviewer, url, item }) => (url ? `[Add receipt, approved by ${reviewer}](${url})` : `${reviewer}: too long for a link; create \`${receiptPath(item)}\` with the text printed in the job log`));
    summary.push(`- \`${slug}\`: ${links.join(" · ")}`);
    for (const { reviewer, url, item } of options) {
      if (url) lines.push(`Add the receipt for ${slug}, approved by ${reviewer}: ${url}`);
      else lines.push(`Receipt for ${slug}, approved by ${reviewer}; create ${receiptPath(item)} with:`, receiptText(item));
    }
  }
  summary.push("", "If the link cannot commit to this branch (for example a fork that does not allow edits), the pull request's author can use it.", "");
}
