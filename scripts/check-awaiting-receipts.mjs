import { appendFileSync } from "node:fs";
import { altTextNote, awaitingLine, baseReader, verify } from "./check-source-fidelity.mjs";
import { annotation, oneLine } from "./lib/actions-output.mjs";

// The receipts job: fails while any restored article has a wording change that no
// accepted-edit receipt covers yet, and lists each one. That is expected for a
// wording proposal until reviewers accept it. The check job decides whether such
// an edit is otherwise acceptable; any other source-fidelity finding fails here
// too, so this job never passes where the default (strict) gate would fail.
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
  lines.push("This is expected for a wording proposal until reviewers accept it. After they approve, record a receipt for each article");
  lines.push(`as described in CONTRIBUTING.md#accepted-editorial-changes (${guide}); this check then passes.`);
  for (const item of result.awaiting) {
    const figures = altTextNote(item) ? ` The ${altTextNote(item)}.` : "";
    lines.push(`- ${awaitingLine(item)}`);
    lines.push(annotation("warning", { file: item.path, title: "Awaiting an accepted-edit receipt" }, `Wording changed without an accepted-edit receipt. Expected for a wording proposal until reviewers accept it; see CONTRIBUTING.md#accepted-editorial-changes.${figures}`));
  }
  summary.push(`**Awaiting a receipt (${result.awaiting.length}).** Expected for a wording proposal until reviewers accept it; see [Accepted editorial changes](${guide}).`, "");
  summary.push(...result.awaiting.map((item) => `- \`${item.slug}\`${altTextNote(item) ? `: ${altTextNote(item)}` : ""}`), "");
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
