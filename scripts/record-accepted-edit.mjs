// Print a receipt for migration/accepted-edits.json describing how one edited
// article differs from the version on the base branch. Reviewers still fill
// in the summary, approvals, notes and evidence; the fidelity check verifies
// every recorded change and hash, so a wrong receipt fails rather than passes.
//
//   node scripts/record-accepted-edit.mjs <slug> --pr <pull request URL> --author <login> [--base origin/main]
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { describeEdit } from "./lib/accepted-edits.mjs";

const [slug, ...rest] = process.argv.slice(2);
const option = (name, fallback) => {
  const index = rest.indexOf(`--${name}`);
  return index >= 0 && rest[index + 1] ? rest[index + 1] : fallback;
};
if (!/^[a-z0-9-]+$/.test(slug ?? "") || !option("pr") || !option("author")) {
  console.error("Usage: node scripts/record-accepted-edit.mjs <slug> --pr <pull request URL> --author <login> [--base origin/main]");
  process.exit(2);
}
const path = `src/content/docs/wiki/${slug}.md`;
const base = execFileSync("git", ["show", `${option("base", "origin/main")}:${path}`], { encoding: "utf8", maxBuffer: 1 << 26 });
const accepted = readFileSync(path, "utf8");
const hash = (value) => createHash("sha256").update(value).digest("hex");
if (base === accepted) {
  console.error(`${path} is identical on the base branch; nothing to record.`);
  process.exit(1);
}
console.log(JSON.stringify({
  slug,
  pull_request: option("pr"),
  summary: "One line: what changed and why.",
  author: option("author"),
  based_on_file_sha256: hash(base),
  accepted_file_sha256: hash(accepted),
  accepted_on: new Date().toISOString().slice(0, 10),
  approvals: [],
  note_ids: [],
  evidence: [],
  changed_image_alt_text: [],
  changes: describeEdit(base, accepted),
}, null, 2));
