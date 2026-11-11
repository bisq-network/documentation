// Record restored articles converted from HTML to Markdown in
// migration/markdown-format.json, after checking that each renders to the same page
// as the HTML it replaced (scripts/lib/markdown-format.mjs). The fidelity gate checks
// this again on every run; the record only says which Markdown file was verified.
//
//   node scripts/record-markdown-format.mjs [<slug>...]
//
// Without slugs it records every article whose file is no longer the HTML its chain
// ends with (the restored original plus any accepted HTML edits) and that has no
// record yet. Slugs given explicitly are recorded again. A conversion is its own pull
// request: it changes no wording, so it needs no receipt (CONTRIBUTING.md).
import { readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { applyAcceptedEdit, loadAcceptedEdits } from "./lib/accepted-edits.mjs";
import { articlePath, formatDifference, markdownFormatPath, markdownFormatText, parseMarkdownFormat, preservedArticlePath } from "./lib/markdown-format.mjs";

const hash = (value) => createHash("sha256").update(value).digest("hex");
const manifest = JSON.parse(readFileSync("migration/restoration-fidelity.json", "utf8")).items;
const slugs = new Set(manifest.map((item) => item.slug));
const requested = process.argv.slice(2);
for (const slug of requested) {
  if (!slugs.has(slug)) {
    console.error(`${slug} is not one of the 209 restored articles.`);
    process.exit(2);
  }
}
const records = parseMarkdownFormat(JSON.parse(readFileSync(markdownFormatPath, "utf8")), slugs);
const receipts = loadAcceptedEdits().bySlug;
const problems = [];
let recorded = 0;
for (const { slug } of manifest) {
  if (requested.length ? !requested.includes(slug) : records.has(slug)) continue;
  // The HTML the chain ends with: the preserved original plus its accepted HTML edits.
  let html = readFileSync(preservedArticlePath(slug), "utf8");
  for (;;) {
    const next = (receipts.get(slug) ?? []).find((receipt) => receipt.based_on_file_sha256 === hash(html));
    if (!next) break;
    html = applyAcceptedEdit(html, next);
  }
  const markdown = readFileSync(articlePath(slug), "utf8");
  if (markdown === html) {
    if (requested.length) problems.push(`${slug}: ${articlePath(slug)} is still the HTML; nothing to record`);
    continue;
  }
  const difference = await formatDifference({ slug, html, markdown });
  if (difference) {
    problems.push(`${slug}: ${difference}`);
    continue;
  }
  records.set(slug, { slug, html_file_sha256: hash(html), markdown_file_sha256: hash(markdown) });
  recorded += 1;
}
writeFileSync(markdownFormatPath, markdownFormatText([...records.values()]));
console.log(`Recorded ${recorded} Markdown conversion${recorded === 1 ? "" : "s"} in ${markdownFormatPath} (${records.size} in all).`);
if (problems.length) {
  console.error(`Not recorded (${problems.length}):\n${problems.map((problem) => `- ${problem}`).join("\n")}`);
  process.exitCode = 1;
}
