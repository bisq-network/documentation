import { defineRouteMiddleware } from "@astrojs/starlight/route-data";
import articles from "../migration/articles.json";
import additional from "../migration/additional-articles.json";
import { articleDescription } from "../scripts/lib/article-description.mjs";

type TocItem = { depth: number; slug: string; text: string; children: TocItem[] };
const originals = new Map([...articles.items, ...additional.items].map((article) => [`wiki/${article.slug}`, article]));

export const onRequest = defineRouteMiddleware(({ locals }) => {
  const route = locals.starlightRoute;
  const { entry } = route;
  const id = entry.id.replace(/\.(md|mdx)$/, "");
  // All originals remain searchable; directories and provenance would duplicate results.
  if (id.startsWith("browse/") || ["browse", "recovered-media", "recovery-status", "review", "categories/teams"].includes(id)) {
    entry.data.pagefind = false;
  }
  // The home page's heading (the title in src/content/docs/index.mdx stays as it is).
  // Pending confirmation of the wording by the design review.
  if (id === "" || id === "index") {
    entry.data.title = "What do you need help with?";
    // Starlight has already built the <title> and Open Graph title from the old one.
    for (const item of route.head) {
      // The site title is just "Documentation", so the home page's tab and link previews name Bisq.
      if (item.tag === "title") item.content = "What do you need help with? | Bisq documentation";
      if (item.tag === "meta" && item.attrs?.property === "og:title") item.attrs.content = "Bisq documentation: What do you need help with?";
    }
  }
  const article = originals.get(id);
  if (!article) return;
  // A description for search engines and link previews: the article's first sentence, at most
  // 155 characters, taken from the article at build time (scripts/lib/article-description.mjs).
  // Articles that already set one (the additional historical sources) keep theirs.
  if (!entry.data.description) {
    const description = articleDescription(entry.body ?? "");
    if (description) {
      entry.data.description = description;
      route.head.push({ tag: "meta", attrs: { name: "description", content: description } }, { tag: "meta", attrs: { property: "og:description", content: description } });
    }
  }
  // Every article gets a contents list, even without headings, so Starlight always reserves
  // the right rail and the reading column starts at the same place on every article.
  // src/components/TableOfContents.astro and MobileTableOfContents.astro list only headings.
  const items: TocItem[] = [{ depth: 2, slug: "_top", text: locals.t("tableOfContents.overview"), children: [] }];
  const parents: TocItem[] = [];
  for (const heading of article.headings) {
    const item: TocItem = { depth: heading.html_level, slug: heading.anchor, text: heading.text, children: [] };
    while (parents.length && parents[parents.length - 1].depth >= item.depth) parents.pop();
    (parents.at(-1)?.children ?? items).push(item);
    parents.push(item);
  }
  route.headings = article.headings.map((heading) => ({ depth: heading.html_level, slug: heading.anchor, text: heading.text }));
  route.toc = { minHeadingLevel: 2, maxHeadingLevel: 5, items };
});
