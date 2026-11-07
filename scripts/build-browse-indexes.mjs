import { mkdir, writeFile } from "node:fs/promises";
import { collectGuides, loadIntegration, sections } from "./lib/documentation.mjs";

const guides = collectGuides();
const migration = loadIntegration();
const escape = (s) => s.replace(/([\\\[\]])/g, "\\$1").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const frontmatter = (title, description) => `---\ntitle: ${JSON.stringify(title)}\ndescription: ${JSON.stringify(description)}\n---\n\n`;
const link = (item) => `- [${escape(item.title)}](../..${item.route})`;
await mkdir("src/content/docs/browse", { recursive: true });
const visible = sections.filter((section) => guides.some((guide) => guide.directory === section.directory));
for (const section of visible) {
  const pageName = section.directory === "contribute" ? "contributing" : section.directory;
  const members = guides.filter((guide) => guide.directory === section.directory);
  await writeFile(`src/content/docs/browse/${pageName}.md`, frontmatter(section.label, section.intro) + `${section.intro}\n\n${members.map(link).join("\n")}\n\n[Browse all documentation](../)\n`);
}
// Keep the original troubleshooting browse address useful after its guides
// have been organized under their respective applications.
const troubleshooting = guides.filter((guide) => /\/(?:[^/]*troubleshooting|network-and-nodes|performance|restoring-data|backup-and-recovery|dispute-help|get-help)\/$/.test(guide.route));
await writeFile("src/content/docs/browse/troubleshooting.md", frontmatter("Troubleshooting", "Resolve application, network, wallet, and trade problems.") + `Choose the guide for your Bisq application.\n\n${troubleshooting.map(link).join("\n")}\n\n[Browse all documentation](../)\n`);
const groups = visible.map((section) => {
  const key = section.directory === "contribute" ? "contributing" : section.directory;
  return `- [${section.label}](${key}/) — ${section.intro}`;
});
await writeFile("src/content/docs/browse/index.md", frontmatter("Browse the documentation", "Find Bisq user guides, payment methods, DAO documentation, and contributor reference.") + `Choose a subject, search for a name or topic, or use the [complete title index](all/).\n\n## Browse by subject\n\n${groups.join("\n")}\n\n## Find an old wiki link\n\nAll ${migration.length} recovered wiki titles map to their integrated guides. Saved paths such as \`/Finding_your_mediator\` still work on the new site. The [title index](all/#former-wiki-titles) shows where each topic now lives.\n`);
const sorted = [...guides].sort((a, b) => a.title.localeCompare(b.title, "en", { numeric: true, sensitivity: "base" }));
const oldTitles = [...migration].sort((a, b) => a.title.localeCompare(b.title, "en", { numeric: true, sensitivity: "base" }));
await writeFile("src/content/docs/browse/all.md", frontmatter("All documentation", "Alphabetical guide and former wiki title index.") + `## Guides and reference\n\n${sorted.map(link).join("\n")}\n\n## Former wiki titles\n\nThese links open the relevant integrated guide or section. The original article text remains available in each guide's source references.\n\n${oldTitles.map((item) => `- [${escape(item.title)}](../..${item.target})`).join("\n")}\n`);
console.log(`Generated indexes for ${guides.length} subject guides and ${migration.length} original wiki titles.`);
