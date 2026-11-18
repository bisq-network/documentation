import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

// Articles written for this site after the wiki recovery (src/data/new-articles.json). They are
// listed apart from the recovered articles: they have no source in the old wiki, so the source
// checks, receipts and old addresses do not apply. A documentation reviewer approves each change.
export const newArticlesManifest = JSON.parse(readFileSync("src/data/new-articles.json", "utf8"));

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const datePattern = /^\d{4}-\d{2}-\d{2}$/;

/** The title in a Markdown file's front matter, as a plain or JSON-quoted YAML string. */
export function frontmatterTitle(text) {
  const block = /^---\n([\s\S]*?)\n---(?:\n|$)/.exec(text)?.[1];
  const value = block?.match(/^title:[ \t]*(.+?)[ \t]*$/m)?.[1];
  if (value === undefined) return undefined;
  return value.startsWith('"') ? JSON.parse(value) : value;
}

/**
 * Check the list of new articles and return each with its file and route.
 * recoveredSlugs are the recovered and additional articles; sections the sidebar sections.
 */
export function verifyNewArticles(items, { recoveredSlugs, sections, read = (path) => readFileSync(path, "utf8"), exists = existsSync }) {
  assert(Array.isArray(items), "src/data/new-articles.json needs an items list");
  const seen = new Set();
  return items.map((item) => {
    const { slug, title, directory, added } = item;
    assert.deepEqual(Object.keys(item).sort(), ["added", "directory", "slug", "title"], `new article ${slug}: use exactly slug, title, directory and added`);
    assert(typeof slug === "string" && slugPattern.test(slug), `new article slug ${JSON.stringify(slug)}: use lower-case words joined by hyphens`);
    assert(!seen.has(slug), `new article ${slug} is listed twice`);
    seen.add(slug);
    assert(!recoveredSlugs.has(slug), `new article ${slug} has the slug of a recovered article`);
    assert(typeof title === "string" && title.trim() === title && title.length > 0, `new article ${slug}: the title must be a non-empty string`);
    const section = sections.find((group) => group.directory === directory);
    assert(section, `new article ${slug}: unknown sidebar section ${JSON.stringify(directory)}`);
    assert(!section.subgroups, `new article ${slug}: section ${directory} has subgroups, which new articles do not support yet`);
    assert(typeof added === "string" && datePattern.test(added) && !Number.isNaN(Date.parse(`${added}T00:00:00Z`)), `new article ${slug}: added must be a date (YYYY-MM-DD)`);
    const file = `src/content/docs/wiki/${slug}.md`;
    assert(exists(file), `new article ${slug}: ${file} is missing`);
    assert.equal(frontmatterTitle(read(file)), title, `new article ${slug}: the title differs from the front matter of ${file}`);
    return { slug, title, directory, added, file, route: `/wiki/${slug}/` };
  });
}
