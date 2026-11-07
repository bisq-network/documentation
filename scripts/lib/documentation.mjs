import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

export const sections = [
  { directory: "start", label: "Start here", intro: "Choose the right Bisq app and learn the basics." },
  { directory: "bisq-2", label: "Bisq 2", intro: "Bisq Easy trading, reputation, identity, backup, and help." },
  { directory: "bisq-1", label: "Bisq 1", intro: "Multisig trades, accounts, wallet recovery, and troubleshooting." },
  { directory: "payment-methods", label: "Payment methods", intro: "Method-specific account setup, payment requirements, risks, and availability." },
  { directory: "support", label: "Support", intro: "Find assistance and resolve trade problems." },
  { directory: "troubleshooting", label: "Troubleshooting", intro: "Diagnose application, network, and wallet problems." },
  { directory: "dao", label: "DAO and BSQ", intro: "Understand BSQ, proposals, voting, compensation, and DAO operation." },
  { directory: "contribute", label: "Contributing", intro: "Project participation, contributor roles, infrastructure, and documentation." },
  { directory: "reference", label: "Reference", intro: "Background concepts, technical details, and version-specific reference." },
];

const priority = ["choose-bisq", "install-and-verify", "first-trade", "payment-accounts", "bisq-easy-safety", "backup-and-recovery", "dispute-help", "finding-your-mediator", "get-help", "overview", "getting-started"];

export function collectGuides(root = "src/content/docs") {
  const guides = [];
  function walk(directory, relative) {
    let entries;
    try { entries = readdirSync(directory, { withFileTypes: true }); }
    catch (error) { if (error.code === "ENOENT") return; throw error; }
    for (const entry of entries) {
      const path = join(directory, entry.name);
      const id = `${relative}/${entry.name}`;
      if (entry.isDirectory()) walk(path, id);
      else if (/\.mdx?$/.test(entry.name)) {
        const source = readFileSync(path, "utf8");
        const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
        const value = frontmatter?.[1].match(/^title:\s*(.+)$/m)?.[1].trim();
        if (!value) throw new Error(`Missing title: ${path}`);
        let title = value;
        if (value.startsWith('"')) title = JSON.parse(value);
        else if (value.startsWith("'")) title = value.slice(1, -1).replaceAll("''", "'");
        const slug = id.replace(/\.mdx?$/, "").replace(/\/index$/, "");
        guides.push({ title, route: `/${slug}/`, directory: relative.split("/")[0], file: path });
      }
    }
  }
  for (const section of sections) walk(join(root, section.directory), section.directory);
  return guides.sort((a, b) => {
    const rank = (item) => {
      const slug = item.route.split("/").filter(Boolean).at(-1);
      if (slug === item.directory) return -1;
      const n = priority.indexOf(slug);
      return n < 0 ? priority.length : n;
    };
    return rank(a) - rank(b) || a.title.localeCompare(b.title, "en");
  });
}

export function loadIntegration() {
  const items = ["bisq1", "payments-bisq2", "governance"].flatMap((lane) => JSON.parse(readFileSync(`migration/integration-${lane}.json`, "utf8")).items);
  const articles = JSON.parse(readFileSync("migration/articles.json", "utf8")).items;
  if (items.length !== articles.length || items.length !== 209) throw new Error("Every recovered article needs one reviewed disposition.");
  const bySlug = new Map(items.map((item) => [item.source_slug, item]));
  if (bySlug.size !== items.length) throw new Error("Duplicate migration disposition.");
  return articles.map((article) => {
    const item = bySlug.get(article.slug);
    if (!item || item.title !== article.title || !/^\/(?:[a-z0-9-]+\/)*(?:#[^\s]*)?$/.test(item.target)) throw new Error(`Invalid destination for ${article.title}`);
    if (!item.retained_details?.length || !item.fact_check?.sources?.length) throw new Error(`Missing coverage or source evidence for ${article.title}`);
    return { ...article, ...item };
  });
}
