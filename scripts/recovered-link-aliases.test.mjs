import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolveArchivedRedirects } from "./lib/archived-redirects.mjs";
import { buildRecoveredAliasRoutes, recoveredAliases, renderRecoveredLinks, validateRecoveredAliases } from "./lib/recovered-link-aliases.mjs";
import { buildPublicLegacyRoutes, resolveLegacyDestination } from "./lib/legacy-routes.mjs";
import { loadIntegration } from "./lib/documentation.mjs";

const marker = (label, target) => `<span class="wiki-link-gap">${label} <small>[unrecovered article: ${target}]</small></span>`;

test("reviewed links preserve labels and work at root and project bases", () => {
  for (const [base, prefix] of [["/", ""], ["/bisq-docs/", "/bisq-docs"]]) {
    const result = renderRecoveredLinks(`${marker("Wise", "TransferWise")} and ${marker("the unknown", "Not reviewed")}`, base, undefined, "", "[[TransferWise|Wise]] [[Not reviewed|the unknown]]");
    assert.equal(result.content, `<a href="${prefix}/wiki/wise/">Wise</a> and <span class="wiki-link-gap">the unknown <small>[unresolved link: Not reviewed]</small></span>`);
    assert.equal(result.resolved, 1); assert.equal(result.unresolved, 1);
  }
});

test("archived dispute redirect resolves using recorded destination", () => {
  const html = marker("dispute resolution", "dispute resolution");
  assert.match(renderRecoveredLinks(html, "/bisq-docs/", undefined, "verse").content, /href="\/bisq-docs\/wiki\/dispute-resolution-in-bisq-1\/"/);
  assert.match(renderRecoveredLinks(html, "/", undefined, "bisq-2", "[[dispute resolution]]").content, /dispute-resolution-in-bisq-1/);
});

test("fragment-bearing or absent original targets remain unresolved", () => {
  const html = marker("Wise", "TransferWise");
  assert.match(renderRecoveredLinks(html, "/", undefined, "", "[[TransferWise#Specific_section|Wise]]").content, /unresolved link/);
  assert.match(renderRecoveredLinks(html, "/", undefined, "", "[[TransferWise]] [[TransferWise#Specific_section]]").content, /unresolved link/);
  assert.match(renderRecoveredLinks(html, "/", undefined, "", "").content, /unresolved link/);
});

test("target article and any exact fragment must exist", () => {
  validateRecoveredAliases();
  assert.throws(() => validateRecoveredAliases([{ name: "TransferWise", target: "/wiki/wise/#not-a-section", evidence: "test" }]), /Missing exact alias fragment/);
  assert.throws(() => validateRecoveredAliases([{ name: "TransferWise", target: "/wiki/nonexistent/", evidence: "test" }]));
});

test("legacy alias preserves known original fragments and base", () => {
  const articles = loadIntegration();
  const originals = buildPublicLegacyRoutes(articles);
  const aliases = buildRecoveredAliasRoutes(articles, originals);
  const wise = aliases.find((entry) => entry.path === "TransferWise");
  assert.equal(resolveLegacyDestination({ ...wise, base: "/bisq-docs/" }), "/bisq-docs/wiki/wise/");
  assert.equal(resolveLegacyDestination({ ...wise, base: "/bisq-docs/" }, "#Setting_up_a_Wise_Account"), "/bisq-docs/wiki/wise/#setting-up-a-wise-account");
  assert.equal(resolveLegacyDestination(wise, "#not-a-known-section"), null);
});

test("rendering does not modify the stored original article", () => {
  const path = new URL("../src/content/docs/wiki/how-do-i-send-fiat-to-bisq.md", import.meta.url);
  const before = readFileSync(path, "utf8");
  assert.match(before, /\[unrecovered article: TransferWise\]/);
  assert.match(renderRecoveredLinks(before, "/", undefined, "how-do-i-send-fiat-to-bisq").content, /href="\/wiki\/wise\/"/);
  assert.equal(readFileSync(path, "utf8"), before);
  assert.ok(recoveredAliases.every((alias) => alias.evidence));
});

test("archive redirect chains follow exact first-letter case and reject cycles", () => {
  const articles = [{ title: "Final", route: "/wiki/final/", headings: [{ anchor: "section", legacy_id: "Section" }] }];
  const make = (source_title, target_title, target_fragment = null) => ({ source_title, target_title, target_fragment, is_pure_redirect: true, has_substantive_trailing_body: false });
  const records = [make("First", "Second"), make("Second", "Final", "Section")];
  const result = resolveArchivedRedirects(articles, records);
  assert.equal(result.resolved.find(x => x.name === "First").target, "/wiki/final/#section");
  assert.deepEqual(resolveArchivedRedirects(articles, [make("First", "fINAL")]).unresolved, ["First"]);
  assert.throws(() => resolveArchivedRedirects(articles, [make("First", "Second"), make("Second", "First")]), /redirect cycle/);
  assert.deepEqual(resolveArchivedRedirects(articles, [make("First", "Final", "absent")]).unresolved, ["First"]);
});

test("substantive redirect tails keep their article routes and archived title redirects", () => {
  const articles = loadIntegration();
  const legacy = buildPublicLegacyRoutes(articles);
  const aliases = buildRecoveredAliasRoutes(articles, legacy);
  const bitcointalk = aliases.find((entry) => entry.path === "Bitcointalk_Moderator");
  const china = aliases.find((entry) => entry.path === "在中国运行Bisq_(Running_Bisq_in_China)");
  assert.equal(bitcointalk?.target, "/wiki/community-manager/");
  assert.equal(china?.target, "/wiki/running-bisq-in-china/");
  assert.ok(articles.some((article) => article.route === "/wiki/bitcointalk-moderator/"));
  assert.ok(articles.some((article) => article.route === "/wiki/running-bisq-in-china-sstap/"));
});

test("historical Bitcointalk role link resolves to the recovered role definition", () => {
  const html = '<span class="wiki-link-gap">role <small>[unrecovered article: role]</small></span>';
  const source = readFileSync("public/wiki-source/bitcointalk-moderator.wiki.txt", "utf8");
  assert.match(renderRecoveredLinks(html, "/bisq-docs/", undefined, "bitcointalk-moderator", source).content, /href="\/bisq-docs\/wiki\/roles\/"/);
});

test("scoped corrections preserve labels and never affect a different source", () => {
  const marker = '<span class="wiki-link-gap">Satispay app <small>[unrecovered article: satispay.com/it-it/privati/]</small></span>';
  const source = readFileSync("public/wiki-source/satispay.wiki.txt", "utf8");
  assert.match(renderRecoveredLinks(marker, "/bisq-docs/", undefined, "satispay", source).content, /href="https:\/\/satispay\.com\/it-it\/privati\/" rel="noopener noreferrer">Satispay app/);
  assert.match(renderRecoveredLinks(marker, "/bisq-docs/", undefined, "wrong-page", source).content, /unresolved link/);
  const xmr = '<span class="wiki-link-gap">XMR <small>[unrecovered article: XMR]</small></span>';
  assert.match(renderRecoveredLinks(xmr, "/", undefined, "payment-methods-en", "[[XMR]]").content, /href="\/wiki\/trading-monero\/"/);
});
