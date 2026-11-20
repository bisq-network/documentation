import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
// yaml comes with Astro and Starlight.
import { parse } from "yaml";
import {
  ENCODED_QUOTE_LIMIT, NEW_ARTICLE_FORM, QUOTE_LIMIT, REPORT_FORM, SUGGESTED_WORDING,
  articleFile, detailsFor, editUrl, quoteOf, reportUrl,
} from "../src/scripts/suggest-edit-links.mjs";

const form = (name) => parse(readFileSync(`.github/ISSUE_TEMPLATE/${name}`, "utf8"));
const params = (url) => Object.fromEntries(new URL(url).searchParams);

test("articles are the Markdown files in src/content/docs/wiki/, and each opens in GitHub's editor", () => {
  assert.deepEqual(articleFile("src/content/docs/wiki/wallet.md"), { path: "src/content/docs/wiki/wallet.md", slug: "wallet" });
  for (const other of ["src/content/docs/review.md", "src/content/docs/browse/all.mdx", "src/content/docs/wiki/nested/page.md", "src/content/docs/wiki/wallet.mdx", "/src/content/docs/wiki/wallet.md", undefined]) {
    assert.equal(articleFile(other), undefined, String(other));
  }
  assert.equal(editUrl("src/content/docs/wiki/wallet.md"), "https://github.com/bisq-network/documentation/edit/main/src/content/docs/wiki/wallet.md");
  const files = readdirSync("src/content/docs/wiki");
  assert.ok(files.length >= 212);
  for (const name of files) {
    const file = articleFile(`src/content/docs/wiki/${name}`);
    assert.ok(file, `src/content/docs/wiki/${name} is an article the button covers`);
    assert.ok(existsSync(new URL(editUrl(file.path)).pathname.replace("/bisq-network/documentation/edit/main/", "")));
  }
  // The additional historical articles get only the issue form; they are articles all the same.
  for (const item of JSON.parse(readFileSync("migration/additional-articles.json", "utf8")).items) {
    assert.equal(articleFile(`src/content/docs/wiki/${item.slug}.md`)?.slug, item.slug);
  }
});

test("the correction form opens with the page, its section and the selected text", () => {
  assert.equal(reportUrl(), REPORT_FORM);
  assert.deepEqual(params(reportUrl({ page: "https://bisq.wiki/wiki/arbitration/" })), { template: "article-review.yml", article: "https://bisq.wiki/wiki/arbitration/" });
  assert.equal(params(reportUrl({ page: "https://bisq.wiki/wiki/arbitration/", section: "process" })).article, "https://bisq.wiki/wiki/arbitration/#process");
  assert.equal(params(reportUrl({ page: "https://bisq.wiki/wiki/arbitration/#old", section: "" })).article, "https://bisq.wiki/wiki/arbitration/");
  assert.equal(params(reportUrl({ page: "https://bisq-network.github.io/documentation/wiki/a/", section: "要求" })).article, "https://bisq-network.github.io/documentation/wiki/a/#%E8%A6%81%E6%B1%82");
  const url = reportUrl({ page: "https://bisq.wiki/wiki/arbitration/", section: "process", quote: "  one or both traders\n\treject a mediator's   suggested payout " });
  assert.equal(params(url).details, "> one or both traders reject a mediator's suggested payout\n\nSuggested wording: ");
  assert.equal(detailsFor("x"), `> x\n\n${SUGGESTED_WORDING}`);
  assert.ok(url.startsWith(`${REPORT_FORM}&article=`));
  assert.doesNotMatch(url, /[\s<>"]/, "the address is fully encoded");
});

test("a quote is one line of about 1,000 characters at most and notifies nobody", () => {
  const words = Array.from({ length: 400 }, (_, index) => `word${index}`).join(" ");
  const quote = quoteOf(words);
  assert.ok(quote.length <= QUOTE_LIMIT, `${quote.length} characters`);
  assert.ok(quote.length > QUOTE_LIMIT * 0.8);
  assert.match(quote, /word\d+…$/, "cut after a whole word");
  // Characters outside the Basic Multilingual Plane are never split (that would make encodeURIComponent throw).
  const emoji = quoteOf("🙂".repeat(2000));
  assert.equal(Array.from(emoji).length, QUOTE_LIMIT);
  assert.doesNotThrow(() => reportUrl({ page: "https://bisq.wiki/wiki/a/", quote: "🙂".repeat(2000) }));
  // Text in other scripts stays short enough for an address.
  const chinese = params(reportUrl({ page: "https://bisq.wiki/wiki/a/", quote: "在中国运行".repeat(400) })).details;
  assert.ok(encodeURIComponent(chinese).length <= ENCODED_QUOTE_LIMIT + 100, `${encodeURIComponent(chinese).length} encoded characters`);
  assert.ok(chinese.length > 300);
  // Chat handles and issue numbers in an article are not GitHub mentions or references.
  assert.equal(quoteOf("Contact @pazza83 or @refund-agent2 (see #12)."), "Contact `@pazza83` or `@refund-agent2` (see `#12`).");
  assert.equal(quoteOf("@bisq-network/support"), "`@bisq-network`/support");
  assert.equal(quoteOf("mail support@bisq.network or see https://medium.com/@bisq and page#3"), "mail support@bisq.network or see https://medium.com/@bisq and page#3");
});

test("the issue forms take the prefilled fields and keep the public-issue warning first", () => {
  const review = form("article-review.yml");
  const field = (template, id) => template.body.find((item) => item.id === id);
  // GitHub fills text inputs and text areas from the query, not dropdowns.
  assert.equal(field(review, "article").type, "input");
  assert.equal(field(review, "details").type, "textarea");
  assert.equal(new URL(REPORT_FORM).searchParams.get("template"), "article-review.yml");
  assert.equal(new URL(NEW_ARTICLE_FORM).searchParams.get("template"), "new-article.yml");

  const proposal = form("new-article.yml");
  assert.equal(proposal.name, "Propose a new article");
  assert.equal(proposal.labels, undefined, "no labels");
  const warning = (template) => template.body[0].type === "markdown" && template.body[0].attributes.value.includes("**Issues are public and stay visible.** Never include wallet seeds, private keys,\npayment details or private trade conversations.");
  assert.ok(warning(review) && warning(proposal), "both forms start with the public-issue warning");
  assert.deepEqual(proposal.body.slice(1).map((item) => [item.type, item.id, Boolean(item.validations?.required)]), [
    ["input", "article-title", true],
    ["dropdown", "section", true],
    ["textarea", "audience", true],
    ["textarea", "outline", false],
    ["textarea", "sources", false],
  ]);
  const sections = JSON.parse(readFileSync("migration/nav-groups.json", "utf8")).groups.map((group) => group.label);
  assert.equal(sections.length, 10);
  assert.deepEqual(field(proposal, "section").attributes.options, sections, "the sidebar's sections, in order");
  // An id of "title" would collide with the issue title's own query parameter.
  assert.ok(proposal.body.every((item) => item.id !== "title"));
});

test("the contribute page links both forms and the guide, with allowed front matter only", () => {
  const page = readFileSync("src/content/docs/review.md", "utf8");
  const frontmatter = parse(/^---\n([\s\S]*?)\n---\n/.exec(page)[1]);
  assert.equal(frontmatter.title, "Help improve this documentation");
  assert.deepEqual(Object.keys(frontmatter).filter((key) => !["title", "description", "tableOfContents", "prev", "next", "slug"].includes(key)), []);
  for (const href of [REPORT_FORM, NEW_ARTICLE_FORM, "https://github.com/bisq-network/documentation/blob/main/CONTRIBUTING.md"]) {
    assert.ok(page.includes(`href="${href}"`), href);
  }
});
