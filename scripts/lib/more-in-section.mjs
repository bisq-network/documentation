// "More in <section>" at the end of an article (src/components/Pagination.astro): up to four other
// articles from the article's sidebar section, its neighbours in sidebar order. It replaces
// Starlight's previous and next cards, whose neighbours run across sections.
import { readFileSync } from "node:fs";
import { collectGuides, sections } from "./documentation.mjs";

const navigation = JSON.parse(readFileSync("src/data/navigation.json", "utf8"));
const slugOf = (route) => route.replace(/^\/wiki\/|\/$/g, "");

/**
 * The page that stands for a slug in the sidebar (astro.config.mjs): language versions after the
 * first leave the sidebar, and near-duplicate pages are listed once, as their first page.
 */
export function sidebarRepresentative(slug, { languageVersions, folded } = navigation) {
  const language = languageVersions.find((group) => group.pages.slice(1).some((page) => page.slug === slug));
  if (language) return language.pages[0].slug;
  const fold = folded.find((group) => group.slugs.slice(1).includes(slug));
  return fold ? fold.slugs[0] : slug;
}

/**
 * Up to `limit` items around items[index], in their order, without items[index] itself: the
 * window is centred on it and moves inwards at either end of the list.
 */
export function neighbours(items, index, limit = 4) {
  if (!Number.isInteger(index) || index < 0 || index >= items.length) return [];
  const size = Math.min(limit + 1, items.length);
  const start = Math.min(Math.max(index - Math.floor(limit / 2), 0), items.length - size);
  return items.slice(start, start + size).filter((_, position) => start + position !== index);
}

/**
 * The sidebar section of an article and up to `limit` other articles from it, or undefined for a
 * slug that is not an article in the navigation. A page the sidebar leaves out (a language version,
 * the second of two near-duplicates) is placed right after the page that stands for it, so that
 * page is one of its neighbours.
 * sectionList: the section list (scripts/lib/documentation.mjs); guides: collectGuides().
 */
export function moreInSectionFrom(slug, { sectionList, guides, nav = navigation, limit = 4 }) {
  const guide = guides.find((item) => item.slug === slug);
  const section = guide && sectionList.find((item) => item.directory === guide.directory);
  if (!section) return undefined;
  const listed = section.articles.filter((article) => sidebarRepresentative(slugOf(article.route), nav) === slugOf(article.route));
  const order = listed.map((article) => slugOf(article.route));
  if (!order.includes(slug)) {
    const at = order.indexOf(sidebarRepresentative(slug, nav));
    if (at === -1) return undefined;
    order.splice(at + 1, 0, slug);
  }
  const titles = new Map(section.articles.map((article) => [slugOf(article.route), article]));
  const articles = neighbours(order, order.indexOf(slug), limit).map((item) => ({ title: titles.get(item).title, route: titles.get(item).route }));
  return { section: { label: section.label, directory: section.directory, count: section.count }, articles };
}

const cache = new Map();
let guides;
/** moreInSectionFrom() for the site's own navigation, computed once per article for the build. */
export function moreInSection(slug) {
  if (!cache.has(slug)) {
    guides ??= collectGuides();
    cache.set(slug, moreInSectionFrom(slug, { sectionList: sections, guides }));
  }
  return cache.get(slug);
}
