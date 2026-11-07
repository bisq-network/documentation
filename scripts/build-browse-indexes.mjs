import { readFile, mkdir, writeFile } from "node:fs/promises";

const articles = JSON.parse(await readFile("migration/articles.json", "utf8")).items;
const taxonomy = JSON.parse(await readFile("migration/taxonomy.json", "utf8")).items;
if (!Array.isArray(articles) || !Array.isArray(taxonomy) || articles.length !== 209 || taxonomy.length !== articles.length) throw new Error("Expected all 209 articles and taxonomy entries.");
const byTitle = new Map(taxonomy.map((item) => [item.title, item]));
const seenTitles = new Set();
const seenRoutes = new Set();
for (const article of articles) {
  if (!byTitle.has(article.title) || seenTitles.has(article.title) || !/^\/wiki\/[a-z0-9-]+\/$/.test(article.route) || seenRoutes.has(article.route)) throw new Error(`Invalid or duplicate article mapping: ${article.title}`);
  seenTitles.add(article.title); seenRoutes.add(article.route);
}
const sorted = [...articles].sort((a, b) => a.title.localeCompare(b.title, "en", { numeric: true, sensitivity: "base" }));
const escape = (s) => s.replace(/([\\\[\]])/g, "\\$1").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const link = (article) => `- [${escape(article.title)}](../..${article.route})`;
const groups = [
  { key: "bisq-2", title: "Bisq 2", intro: "A small set of historical pages explicitly about Bisq 2. Other related pages may appear in the complete index." },
  { key: "bisq-1", title: "Bisq 1", intro: "A small set of historical pages explicitly associated with Bisq 1. Other related pages may appear in the complete index." },
  { key: "dao", title: "DAO", intro: "Historical articles about the DAO, BSQ, governance, and related processes." },
  { key: "contributing", title: "Contributing", intro: "Historical articles about roles, teams, processes, and contributing." },
  { key: "payment-methods", title: "Payment methods", intro: "Historical payment-method and payment-account articles. Availability and rules may have changed." },
  { key: "troubleshooting", title: "Troubleshooting", intro: "Historical troubleshooting and dispute-related articles. Check current guidance before taking action." },
  { key: "reference", title: "Reference", intro: "Selected background, technical, and reference articles from the historical wiki." },
];
await mkdir("src/content/docs/browse", { recursive: true });
for (const group of groups) {
  const members = sorted.filter((article) => byTitle.get(article.title).topics.includes(group.key));
  const page = `---\ntitle: ${JSON.stringify(group.title)}\ndescription: ${JSON.stringify(group.intro)}\n---\n\n${group.intro}\n\n**${members.length} articles.** These are recovered historical wiki pages, not current guidance. See the [current guide drafts](../../) or [all articles](../all/).\n\n${members.map(link).join("\n")}\n`;
  await writeFile(`src/content/docs/browse/${group.key}.md`, page);
}
const letters = new Map();
for (const article of sorted) {
  const letter = article.title.charAt(0).toUpperCase();
  if (!letters.has(letter)) letters.set(letter, []);
  letters.get(letter).push(article);
}
const alphabet = [...letters].map(([letter, items]) => `## ${escape(letter)}\n\n${items.map(link).join("\n")}`).join("\n\n");
await writeFile("src/content/docs/browse/all.md", `---\ntitle: All recovered articles\ndescription: Alphabetical index of all 209 recovered wiki articles.\ntableOfContents:\n  minHeadingLevel: 2\n  maxHeadingLevel: 2\n---\n\nAll **${articles.length}** recovered wiki article titles are listed here. These historical imports have not received the source checks applied to the [current guide drafts](../../). Some may be outdated, incomplete, or affected by conversion gaps. The main site search covers current guides and core pages; use your browser’s find command to search these titles.\n\n${alphabet}\n`);
const choices = groups.map((group) => `- [${group.title}](${group.key}/) (${sorted.filter((article) => byTitle.get(article.title).topics.includes(group.key)).length})`).join("\n");
await writeFile("src/content/docs/browse/index.md", `---\ntitle: Browse the recovered wiki\ndescription: Browse historical wiki articles by subject, or see every title.\n---\n\nExplore **${articles.length} historical articles** recovered from the wiki snapshot. These imports are separate from the [current guide drafts](../): individual pages may be outdated, incomplete, or affected by conversion gaps. Topic groups are selective navigation aids and can overlap.\n\n## Browse by subject\n\n${choices}\n\n## Complete collection\n\n[View all ${articles.length} article titles](all/) in alphabetical order. The main site search covers current guides and core pages; use the alphabetical index and your browser’s find command to locate historical titles.\n`);
console.log(`Generated browse indexes for ${articles.length} articles and ${groups.length} topics.`);
