import { mkdir, writeFile } from "node:fs/promises";
import { collectGuides, sections } from "./lib/documentation.mjs";

const articles = collectGuides();
const escape = (s) => s.replace(/([\\\[\]])/g, "\\$1").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const frontmatter = (title, description) => `---\ntitle: ${JSON.stringify(title)}\ndescription: ${JSON.stringify(description)}\n---\n\n`;
const link = (item) => `- [${escape(item.title)}](../..${item.route})`;
await mkdir("src/content/docs/browse", { recursive: true });
for (const section of sections) {
  const pageName = section.directory === "contribute" ? "contributing" : section.directory;
  const members = articles.filter((article) => article.topics.includes(section.directory));
  await writeFile(`src/content/docs/browse/${pageName}.md`, frontmatter(section.label, section.intro) + `${section.intro} Article wording is preserved from the recovered wiki snapshot; added source-check notes are labeled separately.\n\n${members.map(link).join("\n")}\n\n[Browse all articles](../all/)\n`);
}
const groups = sections.map((section) => `- [${section.label}](${section.directory === "contribute" ? "contributing" : section.directory}/) — ${section.intro}`);
await writeFile("src/content/docs/browse/index.md", frontmatter("Browse the documentation", "Browse the original Bisq Wiki articles by topic or title.") + `The **209 recovered articles** are the main documentation. Original titles, wording, and procedures are preserved. Search by topic or name, or use the [complete title index](all/).\n\n## Browse by subject\n\n${groups.join("\n")}\n\n## Saved wiki links\n\nExported wiki paths such as \`/Finding_your_mediator\` and \`/Last_resort_restore\` open the corresponding original articles. Links to the previous edited guides lead to the relevant originals or a list of their source articles.\n\n## Editorial review\n\nProposed wording changes are reviewed separately. See [review status](../review/) for the comparison material and remaining recovery gaps.\n`);
await writeFile("src/content/docs/browse/all.md", frontmatter("All articles", "All 209 recovered Bisq Wiki articles with their original titles.") + `## Original wiki articles\n\n${articles.map(link).join("\n")}\n\n<span id="former-wiki-titles"></span><span id="guides-and-reference"></span>\n\nAll former wiki titles appear above. Article bodies retain the original wording; source-check notes and conversion gaps are labeled separately.\n`);
const startSlugs = new Set(["getting-started", "bisq-2", "bisq-easy", "downloading-and-installing", "buying-bitcoin", "backing-up-application-data"]);
await writeFile("src/content/docs/browse/start.md", frontmatter("Getting started", "Original wiki introductions and installation guides.") + articles.filter((a) => startSlugs.has(a.slug)).map(link).join("\n") + "\n");
console.log(`Generated topic indexes for ${articles.length} original articles.`);
