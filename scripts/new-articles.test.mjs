import test from "node:test";
import assert from "node:assert/strict";
import { frontmatterTitle, verifyNewArticles } from "./lib/new-articles.mjs";
import { collectGuides, newArticles, sections } from "./lib/documentation.mjs";

const recoveredSlugs = new Set(["zelle", "sepa"]);
const files = new Map([["src/content/docs/wiki/a-guide.md", '---\ntitle: "A guide"\n---\n\nText.\n']]);
const options = { recoveredSlugs, sections, read: (path) => files.get(path), exists: (path) => files.has(path) };
const item = { slug: "a-guide", title: "A guide", directory: "trade", added: "2026-11-18" };
const verify = (items) => verifyNewArticles(items, options);

test("a listed new article gets its file and route", () => {
  assert.deepEqual(verify([item]), [{ ...item, file: "src/content/docs/wiki/a-guide.md", route: "/wiki/a-guide/" }]);
});

test("new articles are checked against their files and the sidebar", () => {
  assert.throws(() => verify([item, item]), /listed twice/);
  assert.throws(() => verify([{ ...item, slug: "zelle" }]), /slug of a recovered article/);
  assert.throws(() => verify([{ ...item, slug: "A_Guide" }]), /lower-case words joined by hyphens/);
  assert.throws(() => verify([{ ...item, slug: "../a-guide" }]), /lower-case words joined by hyphens/);
  assert.throws(() => verify([{ ...item, slug: "missing" }]), /is missing/);
  assert.throws(() => verify([{ ...item, title: "Another title" }]), /differs from the front matter/);
  assert.throws(() => verify([{ ...item, directory: "nowhere" }]), /unknown sidebar section/);
  assert.throws(() => verify([{ ...item, directory: "payments" }]), /has subgroups/);
  assert.throws(() => verify([{ ...item, added: "18 Nov 2026" }]), /added must be a date/);
  assert.throws(() => verify([{ ...item, extra: true }]), /use exactly slug, title, directory and added/);
});

test("front matter titles are read plain or quoted", () => {
  assert.equal(frontmatterTitle("---\ntitle: Plain title\n---\n"), "Plain title");
  assert.equal(frontmatterTitle('---\ntitle: "Quoted \\"title\\""\n---\n'), 'Quoted "title"');
  assert.equal(frontmatterTitle("No front matter"), undefined);
});

test("the listed new articles appear once in the sidebar", () => {
  for (const article of newArticles) {
    const guides = collectGuides().filter((guide) => guide.slug === article.slug);
    assert.equal(guides.length, 1);
    assert.equal(guides[0].directory, article.directory);
    assert.equal(sections.find((section) => section.directory === article.directory).articles.filter((entry) => entry.route === article.route).length, 1);
  }
});
