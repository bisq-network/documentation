import { appendFileSync, existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { acceptedEditsPath } from "./lib/accepted-edits.mjs";
import { githubGraphql, oneLine, runApprovalCheck } from "./lib/receipt-approvals.mjs";

// The receipts job: compare the approvals recorded in receipt items that this
// pull request adds or changes with the pull request's actual approving reviews
// (see scripts/lib/receipt-approvals.mjs). Network access is limited to this
// script; the fidelity gate and npm test stay offline.
//
//   node scripts/check-receipt-approvals.mjs --base <dir>
//
// <dir> holds the base's migration/accepted-edits.json. GitHub Actions provides
// GITHUB_EVENT_PATH, GITHUB_REPOSITORY and, from the workflow, GITHUB_TOKEN.
// Outside a pull request event the check is skipped with a notice.
try {
  const event = process.env.GITHUB_EVENT_PATH ? JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, "utf8")) : {};
  const repository = process.env.GITHUB_REPOSITORY ?? "bisq-network/documentation";
  const data = JSON.parse(readFileSync(acceptedEditsPath, "utf8"));
  let baseData = null;
  if (event.pull_request) {
    const index = process.argv.indexOf("--base");
    const base = index >= 0 ? process.argv[index + 1] : undefined;
    if (!base || base.startsWith("--")) throw new Error("--base needs the directory holding the base's receipts file");
    const basePath = resolve(base, acceptedEditsPath);
    if (!existsSync(basePath)) throw new Error(`the base receipts file ${basePath} is missing, so changed receipt items cannot be told apart`);
    baseData = JSON.parse(readFileSync(basePath, "utf8"));
    if (!process.env.GITHUB_TOKEN) throw new Error("GITHUB_TOKEN is not set");
  }
  const graphql = githubGraphql({ token: process.env.GITHUB_TOKEN, url: process.env.GITHUB_GRAPHQL_URL });
  const result = await runApprovalCheck({ event, repository, data, baseData, graphql });
  console.log(result.lines.join("\n"));
  if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, `### Receipt approvals\n\n${result.summary.join("\n")}\n`);
  if (result.status === "failed") process.exitCode = 1;
} catch (error) {
  console.error(`Receipt approvals check FAILED: ${oneLine(error.message)}`);
  process.exitCode = 1;
}
