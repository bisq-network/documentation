import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { test } from "node:test";
import { collectGuides, sections } from "./lib/documentation.mjs";
import { moreInSection, moreInSectionFrom, neighbours, sidebarRepresentative } from "./lib/more-in-section.mjs";

const letters = [..."abcdefghij"];

test("neighbours are a window around the item, without it, in list order", () => {
  assert.deepEqual(neighbours(letters, 5), ["d", "e", "g", "h"]);
  assert.deepEqual(neighbours(letters, 0), ["b", "c", "d", "e"]);
  assert.deepEqual(neighbours(letters, 1), ["a", "c", "d", "e"]);
  assert.deepEqual(neighbours(letters, 9), ["f", "g", "h", "i"]);
  assert.deepEqual(neighbours(letters, 8), ["f", "g", "h", "j"]);
  assert.deepEqual(neighbours(["a", "b", "c"], 1), ["a", "c"]);
  assert.deepEqual(neighbours(["a"], 0), []);
  assert.deepEqual(neighbours(letters, -1), []);
  assert.deepEqual(neighbours(letters, 10), []);
});

const nav = {
  languageVersions: [{ pages: [{ slug: "methods" }, { slug: "methods-en" }, { slug: "methods-es" }] }],
  folded: [{ slugs: ["sepa-a", "sepa-b"] }],
};
const article = (slug) => ({ title: slug.toUpperCase(), route: `/wiki/${slug}/` });
const fixture = {
  sectionList: [
    { label: "Payments", directory: "payments", count: 8, articles: ["limits", "methods", "methods-en", "methods-es", "ach", "sepa-a", "sepa-b", "zelle"].map(article) },
    { label: "Other", directory: "other", count: 2, articles: ["one", "two"].map(article) },
  ],
  guides: [
    ...["limits", "methods", "methods-en", "methods-es", "ach", "sepa-a", "sepa-b", "zelle"].map((slug) => ({ slug, directory: "payments" })),
    ...["one", "two"].map((slug) => ({ slug, directory: "other" })),
  ],
  nav,
};
const slugs = (result) => result.articles.map((item) => item.route.slice(6, -1));

test("pages the sidebar leaves out stand for the page it lists", () => {
  assert.equal(sidebarRepresentative("methods-es", nav), "methods");
  assert.equal(sidebarRepresentative("sepa-b", nav), "sepa-a");
  assert.equal(sidebarRepresentative("sepa-a", nav), "sepa-a");
  assert.equal(sidebarRepresentative("zelle", nav), "zelle");
});

test("More in lists other articles of the same section as the sidebar shows them", () => {
  const result = moreInSectionFrom("ach", fixture);
  assert.deepEqual(result.section, { label: "Payments", directory: "payments", count: 8 });
  // Language versions and the second SEPA page are not in the sidebar, so not among the neighbours.
  assert.deepEqual(slugs(result), ["limits", "methods", "sepa-a", "zelle"]);
  assert.deepEqual(result.articles[0], { title: "LIMITS", route: "/wiki/limits/" });
  assert.deepEqual(slugs(moreInSectionFrom("zelle", fixture)), ["limits", "methods", "ach", "sepa-a"]);
  assert.deepEqual(slugs(moreInSectionFrom("one", fixture)), ["two"]);
});

test("a page the sidebar leaves out gets the neighbours of the page that stands for it", () => {
  assert.deepEqual(slugs(moreInSectionFrom("methods-es", fixture)), ["limits", "methods", "ach", "sepa-a"]);
  assert.deepEqual(slugs(moreInSectionFrom("sepa-b", fixture)), ["methods", "ach", "sepa-a", "zelle"]);
  assert.equal(moreInSectionFrom("missing", fixture), undefined);
});

test("every article ends with four other articles from its own section", () => {
  const guides = collectGuides();
  for (const guide of guides) {
    const result = moreInSection(guide.slug);
    assert.ok(result, `${guide.slug} has a More in list`);
    const section = sections.find((item) => item.directory === guide.directory);
    assert.equal(result.section.label, section.label);
    assert.equal(result.articles.length, 4, `${guide.slug} lists four articles`);
    assert.ok(!result.articles.some((item) => item.route === guide.route), `${guide.slug} does not list itself`);
    const routes = section.articles.map((item) => item.route);
    for (const item of result.articles) assert.ok(routes.includes(item.route), `${item.route} is in ${section.label}`);
    const positions = result.articles.map((item) => routes.indexOf(item.route));
    assert.deepEqual(positions, [...positions].sort((a, b) => a - b), `${guide.slug}: sidebar order`);
  }
  // Arbitration comes first in Disputes and support, so its four neighbours all follow it.
  assert.deepEqual(moreInSection("arbitration").articles.map((item) => item.title), ["Arbitrator", "Dispute Resolution in Bisq 1", "Dispute Resolution in Bisq 2", "Failed Trades - Reimbursement of Trade Fees and Miner Fees"]);
  assert.equal(moreInSection("not-an-article"), undefined);
});

test("browse lists have no empty contents rail, and the earlier payments address does not link to its twin", () => {
  const dir = "src/content/docs/browse";
  const lists = [...sections.map((section) => section.directory), "payment-methods", "contributing", "bisq-1", "bisq-2"];
  assert.equal(lists.length, 14);
  for (const name of lists) {
    const page = readFileSync(`${dir}/${name}.md`, "utf8");
    assert.match(page, /^---\n(?:.*\n)*?tableOfContents: false\n(?:.*\n)*?---\n/, `${name}.md turns the contents list off`);
    assert.doesNotMatch(page.split("---\n").slice(2).join("---\n"), /^#{1,6} /m, `${name}.md has no sections a contents list would show`);
  }
  // The index keeps its contents list: it has sections.
  assert.doesNotMatch(readFileSync(`${dir}/index.md`, "utf8"), /tableOfContents/);
  const earlier = readFileSync(`${dir}/payment-methods.md`, "utf8");
  assert.doesNotMatch(earlier, /\]\(\.\.\/payments\/\)/, "no link to /browse/payments/ from its own copy");
  assert.equal(earlier.split("---\n").slice(2).join("---\n"), readFileSync(`${dir}/payments.md`, "utf8").split("---\n").slice(2).join("---\n"));
  assert.ok(readdirSync(dir).includes("all.mdx"));
});
