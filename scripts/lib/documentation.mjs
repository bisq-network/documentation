import { readFileSync } from "node:fs";
import { additionalArticles } from "./additional-articles.mjs";

const navigation = JSON.parse(readFileSync("migration/nav-groups.json", "utf8"));
const expectedGroupCounts = [10, 29, 45, 22, 14, 13, 13, 20, 34, 9];

// The approved handoff lists are authoritative; no product classification is inferred.
export const sections = navigation.groups.map((group, index) => {
  const articles = group.subgroups
    ? group.subgroups.flatMap((subgroup) => subgroup.articles)
    : group.articles;
  if (group.count !== expectedGroupCounts[index] || articles.length !== group.count) {
    throw new Error(`Unexpected navigation count for ${group.id}.`);
  }
  return { ...group, directory: group.id, intro: group.blurb, articles };
});
if (sections.length !== expectedGroupCounts.length) throw new Error("Expected ten navigation groups.");

// Keep the approved original groups intact, then add the separately preserved
// historical sources to the appropriate existing task group.
for (const article of additionalArticles) {
  const section = sections.find((group) => group.directory === article.directory);
  if (!section || section.subgroups) throw new Error(`Invalid additional article placement: ${article.title}`);
  if (sections.some((group) => group.articles.some((item) => item.title === article.title || item.route === article.route))) throw new Error(`Duplicate additional article: ${article.title}`);
  section.articles.push({ title: article.title, route: article.route });
  section.count += 1;
}


const placementByTitle = new Map();
for (const section of sections) {
  const subgroups = section.subgroups || [{ articles: section.articles }];
  let navigationOrder = 0;
  for (const subgroup of subgroups) {
    for (const article of subgroup.articles) {
      if (placementByTitle.has(article.title)) throw new Error(`Duplicate navigation title: ${article.title}`);
      placementByTitle.set(article.title, {
        route: article.route,
        directory: section.directory,
        subgroup: subgroup.label,
        navigationOrder: navigationOrder++,
      });
    }
  }
}
if (placementByTitle.size !== 209 + additionalArticles.length) throw new Error("Expected all original and additional navigation titles exactly once.");

/** Load original and separately verified additional article metadata. */
export function loadIntegration() {
  const articles = JSON.parse(readFileSync("migration/articles.json", "utf8")).items;
  if (articles.length !== 209 || new Set(articles.map((a) => a.slug)).size !== 209) throw new Error("Expected all 209 original wiki articles.");
  return [...articles, ...additionalArticles].map((article) => {
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

/**
 * Join preserved article metadata to the approved task navigation, then sort by
 * title. Reject missing placements or changed routes instead of silently hiding
 * an article. Navigation order is retained separately for sidebar rendering.
 */
export function collectGuides() {
  const articles = loadIntegration();
  const guides = articles.map((article) => {
    const placement = placementByTitle.get(article.title);
    if (!placement || placement.route !== article.route) {
      throw new Error(`Navigation title or route differs from source metadata: ${article.title}`);
    }
    return {
      title: article.title,
      route: article.route,
      directory: placement.directory,
      topics: [placement.directory],
      subgroup: placement.subgroup,
      navigationOrder: placement.navigationOrder,
      file: `src/content/docs/wiki/${article.slug}.md`,
      slug: article.slug,
    };
  });
  return guides.sort((a, b) => a.title.localeCompare(b.title, "en", { numeric: true, sensitivity: "base" }));
}
