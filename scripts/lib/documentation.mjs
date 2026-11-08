import { readFileSync } from "node:fs";

export const sections = [
  { directory: "bisq-2", label: "Bisq 2", intro: "Original articles about Bisq 2 and Bisq Easy." },
  { directory: "bisq-1", label: "Bisq 1", intro: "Original articles about Bisq 1 trading, accounts, and operation." },
  { directory: "payment-methods", label: "Payment methods", intro: "Payment methods, account limits, and signing." },
  { directory: "troubleshooting", label: "Troubleshooting", intro: "Recovery procedures, troubleshooting, and support." },
  { directory: "dao", label: "DAO and BSQ", intro: "BSQ, governance, proposals, and DAO operation." },
  { directory: "contribute", label: "Contributing", intro: "Contributor roles, teams, and project processes." },
  { directory: "reference", label: "Reference", intro: "Additional articles and technical background." },
];

export function loadIntegration() {
  const articles = JSON.parse(readFileSync("migration/articles.json", "utf8")).items;
  if (articles.length !== 209 || new Set(articles.map((a) => a.slug)).size !== 209) throw new Error("Expected all 209 original wiki articles.");
  return articles.map((article) => {
    if (article.route !== `/wiki/${article.slug}/`) throw new Error(`Unexpected original route: ${article.title}`);
    const fragment_map = {};
    for (const heading of article.headings || []) {
      for (const id of [heading.legacy_id, heading.anchor, heading.explicit_source_id].filter(Boolean)) fragment_map[id] = heading.anchor;
    }
    const rendered = article.explicit_anchors?.length ? readFileSync(`src/content/docs/wiki/${article.slug}.md`, "utf8") : "";
    const rendered_explicit_anchors = (article.explicit_anchors || []).filter((value) => {
      const id = typeof value === "string" ? value : value.id;
      const escaped = id.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
      return rendered.includes(`id="${escaped}"`);
    });
    return { ...article, source_slug: article.slug, target: article.route, fragment_map, rendered_explicit_anchors };
  });
}

export function collectGuides() {
  const taxonomy = new Map(JSON.parse(readFileSync("migration/taxonomy.json", "utf8")).items.map((item) => [item.title, item.topics]));
  const priority = ["payment-methods", "troubleshooting", "dao", "contribute", "bisq-2", "bisq-1", "reference"];
  return loadIntegration().map((article) => {
    const topics = (taxonomy.get(article.title) || []).map((topic) => topic === "contributing" ? "contribute" : topic).filter((topic) => sections.some((s) => s.directory === topic));
    if (!topics.length) topics.push("reference");
    return { title: article.title, route: article.route, directory: priority.find((topic) => topics.includes(topic)), topics, file: `src/content/docs/wiki/${article.slug}.md`, slug: article.slug };
  }).sort((a, b) => a.title.localeCompare(b.title, "en", { numeric: true, sensitivity: "base" }));
}
