import { mkdir, readFile, writeFile } from "node:fs/promises";
import { collectGuides, sections } from "./lib/documentation.mjs";

const articles = collectGuides();
const escape = (s) => s.replace(/([\\\[\]])/g, "\\$1").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const frontmatter = (title, description) => `---\ntitle: ${JSON.stringify(title)}\ndescription: ${JSON.stringify(description)}\n---\n\n`;
const link = (item) => `- [${escape(item.title)}](../..${item.route})`;
const topicList = (section) => section.subgroups
  ? section.subgroups.map((subgroup) => `## ${subgroup.label}\n\n${subgroup.articles.map(link).join("\n")}`).join("\n\n")
  : section.articles.map(link).join("\n");
await mkdir("src/content/docs/browse", { recursive: true });
for (const section of sections) {
  await writeFile(`src/content/docs/browse/${section.directory}.md`, frontmatter(section.label, section.intro) + `${section.intro}. **${section.count} articles.** Article wording is preserved from the recovered wiki snapshot; added source-check notes are labeled separately.\n\n${topicList(section)}\n\n[Browse all articles](../all/)\n`);
}
const groups = sections.map((section) => `- [${section.label}](${section.directory}/) (${section.count}): ${section.intro}`);
await writeFile("src/content/docs/browse/index.md", frontmatter("Browse the documentation", "Browse the original Bisq Wiki articles by topic or title.") + `The **209 recovered articles** are the main documentation. Original titles, wording, and procedures are preserved. Search by topic or name, or use the [complete title index](all/).\n\n## Browse by subject\n\n${groups.join("\n")}\n\n## Saved wiki links\n\nExported wiki paths such as \`/Finding_your_mediator\` and \`/Last_resort_restore\` open the corresponding original articles. Links to the previous edited guides lead to the relevant originals or a list of their source articles.\n\n## Editorial review\n\nProposed wording changes are reviewed separately. See [review status](../review/) for the comparison material and remaining recovery gaps.\n`);
await writeFile("src/content/docs/browse/all.md", frontmatter("All articles", "All 209 recovered Bisq Wiki articles with their original titles.") + `## Original wiki articles\n\n${articles.map(link).join("\n")}\n\n<span id="former-wiki-titles"></span><span id="guides-and-reference"></span>\n\nAll former wiki titles appear above. Article bodies retain the original wording; source-check notes and conversion gaps are labeled separately.\n`);
// Keep the previous browse addresses useful without making them primary groups.
for (const [oldDirectory, directory] of [["payment-methods", "payments"], ["contributing", "contribute"]]) {
  const section = sections.find((item) => item.directory === directory);
  await writeFile(`src/content/docs/browse/${oldDirectory}.md`, frontmatter(section.label, section.intro) + `This topic is now listed under [${section.label}](../${directory}/).\n\n${topicList(section)}\n\n[Browse all articles](../all/)\n`);
}
const taxonomy = JSON.parse(await readFile("migration/taxonomy.json", "utf8")).items;
for (const product of ["bisq-1", "bisq-2"]) {
  const titles = new Set(taxonomy.filter((item) => item.topics.includes(product)).map((item) => item.title));
  const label = product === "bisq-1" ? "Bisq 1" : "Bisq 2";
  await writeFile(`src/content/docs/browse/${product}.md`, frontmatter(label, `Original wiki articles with ${label} migration grouping.`) + `This saved browse address lists articles with ${label} migration grouping. Grouping can refer to historical material; it does not certify current product applicability. Use the [task-based directory](../) to browse by what you need to do.\n\n${articles.filter((article) => titles.has(article.title)).map(link).join("\n")}\n\n[Browse all articles](../all/)\n`);
}
console.log(`Generated ten task groups for ${articles.length} original articles, with four compatibility indexes.`);
