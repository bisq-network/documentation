// "Recently read" in the search dialog: the articles this browser opened last. Each article page
// adds itself to a short list in the browser's own storage (src/components/Search.astro); nothing
// is sent anywhere. The search dialog reads the list back with recentPages().

/** The localStorage key for the list. */
export const RECENT_KEY = "bisq-docs-recently-read";

/** How many articles the list keeps: three to show, plus the page being read. */
export const RECENT_STORED = 4;

const escapeRegExp = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * The articles to show under "Recently read", newest first: at most `limit`, never the page being
 * read (`current`). The stored text comes from this browser, but it is checked like any input: only
 * entries whose path is an article under the site's `base` and whose title is text are kept, so a
 * changed or damaged list can neither link elsewhere nor break the dialog.
 */
export function recentPages(stored, { base = "", current = "", limit = 3 } = {}) {
  let list;
  try { list = JSON.parse(stored || "[]"); } catch { return []; }
  if (!Array.isArray(list)) return [];
  const article = new RegExp(`^${escapeRegExp(base.replace(/\/$/, ""))}/wiki/[a-z0-9-]+/$`);
  const seen = new Set([current]);
  const pages = [];
  for (const item of list) {
    if (!item || typeof item.path !== "string" || typeof item.title !== "string") continue;
    const title = item.title.replace(/\s+/g, " ").trim().slice(0, 200);
    if (!title || !article.test(item.path) || seen.has(item.path)) continue;
    seen.add(item.path);
    pages.push({ path: item.path, title });
    if (pages.length === limit) break;
  }
  return pages;
}
