import { defineRouteMiddleware } from "@astrojs/starlight/route-data";
import articles from "../migration/articles.json";

type TocItem = { depth: number; slug: string; text: string; children: TocItem[] };
const originals = new Map(articles.items.map((article) => [`wiki/${article.slug}`, article]));

export const onRequest = defineRouteMiddleware(({ locals }) => {
  const route = locals.starlightRoute;
  const { entry } = route;
  const id = entry.id.replace(/\.(md|mdx)$/, "");
  // All originals remain searchable; directories and provenance would duplicate results.
  if (id.startsWith("browse/") || ["browse", "recovered-media", "recovery-status", "review"].includes(id)) {
    entry.data.pagefind = false;
  }
  const article = originals.get(id);
  if (!article?.headings.length) return;
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
