import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { decodeXml, parsePage } from "./lib/mediawiki-export.mjs";
import { reconcile, renderMarkdown, templateNames } from "./reconcile-wiki-backup.mjs";

const escape = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
const source = (slug) => readFileSync(`public/wiki-source/${slug}.wiki.txt`, "utf8");
const revision = (id, timestamp, text, contributor = "<username>Editor</username><id>7</id>") =>
  `<revision><id>${id}</id><timestamp>${timestamp}</timestamp><contributor>${contributor}</contributor><model>wikitext</model><format>text/x-wiki</format><text bytes="${Buffer.byteLength(text)}" xml:space="preserve">${escape(text)}</text><sha1>x</sha1></revision>`;
const page = (title, id, revisions, ns = 0, redirect = "") =>
  `<page><title>${escape(title)}</title><ns>${ns}</ns><id>${id}</id>${redirect ? `<redirect title="${escape(redirect)}" />` : ""}${revisions.join("")}</page>`;

// A small export built from real restored sources: one unchanged article, one with
// newer edits (one by an anonymous IP), a new page, a template and two redirects.
function fixture() {
  const articles = JSON.parse(readFileSync("migration/articles.json", "utf8")).items;
  const ach = articles.find((item) => item.slug === "ach-transfer");
  const restore = articles.find((item) => item.slug === "last-resort-restore");
  const sstap = JSON.parse(readFileSync("migration/additional-articles.json", "utf8")).items.find((item) => item.slug === "running-bisq-in-china-sstap");
  const pages = [
    page(ach.title, ach.page_id, [revision(ach.revision_id, ach.revision_timestamp, source("ach-transfer"))]),
    page(restore.title, restore.page_id, [
      revision(restore.revision_id, restore.revision_timestamp, source("last-resort-restore")),
      revision(String(Number(restore.revision_id) + 900), "2026-11-01T10:00:00Z", source("last-resort-restore") + "\nAdded line.", "<ip>192.0.2.44</ip>"),
      revision(String(Number(restore.revision_id) + 901), "2026-11-02T10:00:00Z", source("last-resort-restore") + "\nAdded line, edited."),
    ]),
    page("Brand new page", "99001", [revision("99002", "2026-11-03T10:00:00Z", "Hello")]),
    page("Template:Note", "99003", [revision("99004", "2020-01-01T00:00:00Z", "note")], 10),
    page("ACH", "635", [revision("3833", "2025-01-09T03:14:39Z", "#REDIRECT [[ACH Transfer]]")], 0, "ACH Transfer"),
    page("Old name", "99005", [revision("99006", "2026-01-01T00:00:00Z", "#REDIRECT [[Wise]]")], 0, "Wise"),
    page(sstap.title, sstap.page_id, [
      revision(sstap.revision_id, sstap.revision_timestamp, source("running-bisq-in-china-sstap")),
      revision(String(Number(sstap.revision_id) + 1), "2024-01-01T00:00:00Z", "#REDIRECT [[Running Bisq in China]]"),
    ], 0, "Running Bisq in China"),
  ];
  const xml = `<mediawiki xmlns="http://www.mediawiki.org/xml/export-0.11/" version="0.11"><siteinfo><sitename>Bisq Wiki</sitename><base>https://bisq.wiki/Main_Page</base><generator>MediaWiki 1.34.4</generator></siteinfo>${pages.join("\n")}</mediawiki>`;
  const dir = mkdtempSync(join(tmpdir(), "intake-"));
  writeFileSync(join(dir, "export.xml"), xml);
  return join(dir, "export.xml");
}

test("export reader decodes text and never returns IP addresses", () => {
  assert.equal(decodeXml("a &lt;b&gt; &amp;amp; &#039; &#x41;"), "a <b> &amp; ' A");
  const parsed = parsePage(`<title>T</title><ns>0</ns><id>1</id>${revision("5", "2026-01-01T00:00:00Z", "x", "<ip>192.0.2.1</ip>")}`);
  assert.deepEqual(parsed.revisions[0].contributor, { anonymous: true, hidden: false });
  assert.doesNotMatch(JSON.stringify(parsed), /192\.0\.2/);
});

test("backup export is reconciled against the restored snapshot", async () => {
  const report = await reconcile({ xml: fixture() });
  const bySlug = new Map(report.articles.map((article) => [article.slug, article]));
  assert.equal(bySlug.get("ach-transfer").status, "unchanged");
  const restore = bySlug.get("last-resort-restore");
  assert.equal(restore.status, "newer-revision");
  assert.equal(restore.revisions_after, 2);
  assert.deepEqual(restore.editors_after, { usernames: ["Editor"], anonymous: 1, hidden: 0 });
  assert.equal(restore.recorded_revision_text_matches, true);
  assert.match(restore.latest_text, /Added line, edited\.$/);
  assert.equal(bySlug.get("wise").status, "missing-from-backup");
  assert.equal(report.summary.restored_articles, 212);
  assert.deepEqual(report.new_pages.map((item) => item.title), ["Brand new page"]);
  const sstap = bySlug.get("running-bisq-in-china-sstap");
  assert.equal(sstap.status, "now-a-redirect");
  assert.equal(sstap.recorded_revision_text_matches, true);
  assert.deepEqual(report.redirects.map((item) => [item.title, item.agrees]), [["ACH", true], ["Old name", null], ["在中国运行Bisq (Running Bisq in China)", true]]);
  assert.doesNotMatch(JSON.stringify(report), /192\.0\.2/);
  const markdown = renderMarkdown(report);
  assert.match(markdown, /\| Last resort restore \|/);
  assert.match(markdown, /Brand new page/);
});

test("template names skip parser functions and magic words", () => {
  assert.deepEqual(templateNames("{{note|x}} {{#if:a|b}} {{PAGENAME}} {{DISPLAYTITLE:x}} {{Template:warning}} {{ main page }}"), ["Main page", "Note", "Warning"]);
});
