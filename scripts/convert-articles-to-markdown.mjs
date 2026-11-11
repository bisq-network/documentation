// Convert restored wiki articles from the converter's HTML to Markdown.
//
// Run from the repository root (it renders with the site's own Markdown pipeline):
//   node scripts/convert-articles-to-markdown.mjs [--in=DIR] [--out=DIR] [--report=FILE] (--all | <slug>...)
//
// --in   article files to read (default src/content/docs/wiki)
// --out  where to write the converted files (default: --in, in place)
// --all  every article in --in whose body is still HTML, except the additional historical
//        articles (migration/additional-articles.json), whose receipts cover their HTML
// Already converted articles are reported and left alone. The command fails if an article
// cannot be converted so that it renders like its HTML; nothing is written for that article.
//
// Newer wiki revisions: render them with scripts/migrate-wiki.py (see INTAKE.md), then
//   node scripts/convert-articles-to-markdown.mjs --in=<out>/site/src/content/docs/wiki --out=<dir> --all
// and review `git diff --no-index src/content/docs/wiki/<slug>.md <dir>/<slug>.md`.

import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { createArticleConverter } from "./lib/markdown-conversion.mjs";
import { createSiteMarkdownRenderer } from "./lib/render-markdown.mjs";

const args = process.argv.slice(2);
const option = (name) => args.find((arg) => arg.startsWith(`--${name}=`))?.slice(name.length + 3);
const inDir = option("in") ?? "src/content/docs/wiki";
const outDir = option("out") ?? inDir;
const reportPath = option("report");
const additional = new Set(JSON.parse(readFileSync("migration/additional-articles.json", "utf8")).items.map((item) => item.slug));
let slugs = args.filter((arg) => !arg.startsWith("--"));
if (args.includes("--all")) {
  slugs = readdirSync(inDir).filter((file) => file.endsWith(".md")).map((file) => file.slice(0, -3)).filter((slug) => !additional.has(slug)).sort();
}
if (!slugs.length) {
  console.error("Usage: node scripts/convert-articles-to-markdown.mjs [--in=DIR] [--out=DIR] [--report=FILE] (--all | <slug>...)");
  process.exit(2);
}
for (const slug of slugs) {
  if (!/^[a-z0-9-]+$/.test(slug)) throw new Error(`invalid article slug: ${slug}`);
  if (additional.has(slug)) throw new Error(`${slug} is an additional historical article; its receipts cover the HTML, so it stays HTML`);
}

const convert = createArticleConverter({ render: await createSiteMarkdownRenderer() });
mkdirSync(outDir, { recursive: true });
const report = [];
let failed = 0;
for (const slug of slugs) {
  const text = readFileSync(`${inDir}/${slug}.md`, "utf8");
  try {
    const result = await convert(text, slug);
    report.push({ slug, ok: result.ok, ...result.stats });
    if (!result.ok) {
      failed++;
      console.error(`${slug}: not converted, the Markdown would not render like the HTML`);
      continue;
    }
    writeFileSync(`${outDir}/${slug}.md`, result.text);
    console.log(`${slug}: ${result.stats.markdown} of ${result.stats.blocks} blocks in Markdown`);
  } catch (error) {
    if (/already Markdown/.test(error.message)) { console.log(`${slug}: already Markdown, unchanged`); continue; }
    failed++;
    report.push({ slug, error: error.message });
    console.error(`${slug}: ${error.message}`);
  }
}
if (reportPath) writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
if (failed) {
  console.error(`${failed} article(s) not converted`);
  process.exitCode = 1;
}
