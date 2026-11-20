import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { collectGuides, sections } from "./lib/documentation.mjs";

const articles = collectGuides();
const escape = (s) => s.replace(/([\\\[\]])/g, "\\$1").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const frontmatter = (title, description, extra = "") => `---\ntitle: ${JSON.stringify(title)}\ndescription: ${JSON.stringify(description)}\n${extra}---\n\n`;
const link = (item) => `- [${escape(item.title)}](../..${item.route})`;
// Topic and product lists have no sections, so they have no contents list: without one Starlight
// leaves out the right rail, which would otherwise stand empty beside the list.
const noContents = "tableOfContents: false\n";
/** Render approved article links, retaining subgroup headings where configured. */
const topicList = (section) => section.subgroups
  ? section.subgroups.map((subgroup) => `## ${subgroup.label}\n\n${subgroup.articles.map(link).join("\n")}`).join("\n\n")
  : section.articles.map(link).join("\n");
await mkdir("src/content/docs/browse", { recursive: true });
// Payment methods lists its articles in a hub instead (src/components/PaymentMethodsHub.astro,
// shown by src/components/SourceHistory.astro on this page and its old address).
const hubIntro = (section) => `${section.count} articles: what applies to every method first, then each method from A to Z.\n`;
for (const section of sections) {
  const body = section.directory === "payments" ? hubIntro(section) : `${section.intro}. **${section.count} articles.**\n\n${topicList(section)}\n\n[Browse all articles](../all/)\n`;
  await writeFile(`src/content/docs/browse/${section.directory}.md`, frontmatter(section.label, section.intro, noContents) + body);
}
const groups = sections.map((section) => `- [${section.label}](${section.directory}/) (${section.count}): ${section.intro}`);
await writeFile("src/content/docs/browse/index.md", frontmatter("Browse the documentation", "Browse the original Bisq Wiki articles by topic or title.") + `Find articles by topic or name, or use the [complete title index](all/).\n\n## Browse by subject\n\n${groups.join("\n")}\n\n## Saved wiki links\n\nExported wiki paths such as \`/Finding_your_mediator\` and \`/Last_resort_restore\` open the corresponding original articles. Links to the previous edited guides lead to the relevant originals or a list of their source articles.\n\n## Contribute\n\nSee [Help improve this documentation](../review/) to report a correction or propose a new article.\n`);
await rm("src/content/docs/browse/all.md", { force: true });
await writeFile("src/content/docs/browse/all.mdx", frontmatter("All articles", "Browse Bisq documentation by title, topic or product.", "tableOfContents: false\n") + `import ArticleDirectory from "../../../components/ArticleDirectory.astro";\n\n<ArticleDirectory />\n\n<span id="former-wiki-titles"></span><span id="guides-and-reference"></span>\n`);

// Keep the previous browse addresses useful without making them primary groups. The earlier
// payment methods address shows the same hub under the same title, so its lede does not send the
// reader to a page that looks like this one.
for (const [oldDirectory, directory] of [["payment-methods", "payments"], ["contributing", "contribute"]]) {
  const section = sections.find((item) => item.directory === directory);
  const body = directory === "payments" ? hubIntro(section) : `This topic is now listed under [${section.label}](../${directory}/).\n\n${topicList(section)}\n\n[Browse all articles](../all/)\n`;
  await writeFile(`src/content/docs/browse/${oldDirectory}.md`, frontmatter(section.label, section.intro, noContents) + body);
}
const taxonomy = JSON.parse(await readFile("migration/taxonomy.json", "utf8")).items;
for (const product of ["bisq-1", "bisq-2"]) {
  const titles = new Set(taxonomy.filter((item) => item.topics.includes(product)).map((item) => item.title));
  const label = product === "bisq-1" ? "Bisq 1" : "Bisq 2";
  await writeFile(`src/content/docs/browse/${product}.md`, frontmatter(label, `Original wiki articles with ${label} migration grouping.`, noContents) + `This saved browse address lists articles with ${label} migration grouping. Grouping can refer to historical material; it does not certify current product applicability. Use the [task-based directory](../) to browse by what you need to do.\n\n${articles.filter((article) => titles.has(article.title)).map(link).join("\n")}\n\n[Browse all articles](../all/)\n`);
}
console.log(`Generated ten task groups for ${articles.length} original articles, with four compatibility indexes.`);
