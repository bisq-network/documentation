// The search dialog's "Recently read" list, the page-not-found search words, and the old-link pages
// (src/lib/recently-read.mjs, src/lib/not-found.mjs, src/lib/legacy-page.mjs).
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import { recentPages, RECENT_STORED } from "../src/lib/recently-read.mjs";
import { searchWordsFromAddress } from "../src/lib/not-found.mjs";
import { earlierGuide, guideSections, legacyHeadScript, readableId, themeTokenCss, titleSections, TOKENS } from "../src/lib/legacy-page.mjs";
import { buildPublicLegacyRoutes, resolveLegacyDestination } from "./lib/legacy-routes.mjs";
import { buildRecoveredAliasRoutes } from "./lib/recovered-link-aliases.mjs";
import { loadEditedRouteAliases } from "./lib/edited-route-aliases.mjs";
import { loadIntegration } from "./lib/documentation.mjs";

test("recently read keeps only articles under the site, newest first, without the page being read", () => {
  const stored = JSON.stringify([
    { path: "/documentation/wiki/arbitration/", title: "Arbitration" },
    { path: "/documentation/wiki/zelle/", title: "  Zelle\n" },
    { path: "/documentation/wiki/arbitration/", title: "Arbitration again" },
    { path: "https://example.com/wiki/evil/", title: "Elsewhere" },
    { path: "//example.com/wiki/evil/", title: "Elsewhere" },
    { path: "/documentation/wiki/../browse/", title: "Not an article" },
    { path: "/documentation/wiki/bisq-easy/", title: 42 },
    { path: "/documentation/wiki/bisq-easy/", title: "" },
    null,
    { path: "/documentation/wiki/bisq-easy/", title: "Bisq Easy" },
    { path: "/documentation/wiki/wallet/", title: "Wallet" },
  ]);
  assert.deepEqual(recentPages(stored, { base: "/documentation/", current: "/documentation/wiki/zelle/" }), [
    { path: "/documentation/wiki/arbitration/", title: "Arbitration" },
    { path: "/documentation/wiki/bisq-easy/", title: "Bisq Easy" },
    { path: "/documentation/wiki/wallet/", title: "Wallet" },
  ]);
  assert.deepEqual(recentPages(stored, { base: "", current: "/" }), [], "paths under another base are not articles of this site");
  assert.deepEqual(recentPages(JSON.stringify([{ path: "/wiki/zelle/", title: "Zelle" }]), { base: "/" }), [{ path: "/wiki/zelle/", title: "Zelle" }]);
  for (const broken of [null, "", "not json", "{}", '"text"', "[1,2]"]) assert.deepEqual(recentPages(broken, { base: "/" }), []);
  assert.equal(RECENT_STORED, 4, "three to show plus the page being read");
});

test("page not found searches for the words in the address", () => {
  const words = (path, search, base) => searchWordsFromAddress(path, search, { base });
  assert.equal(words("/Arbitraton/", ""), "Arbitraton");
  assert.equal(words("/documentation/Arbitraton/", "", "/documentation/"), "Arbitraton");
  assert.equal(words("/wiki/last-resort-restre/", ""), "last resort restre");
  assert.equal(words("/index.php", "?title=Trading_rules&action=edit"), "Trading rules");
  assert.equal(words("/M%C3%A9todos_de_pago/", ""), "Métodos de pago");
  assert.equal(words("/bad%E0%A4%A/", ""), "bad%E0%A4%A", "a malformed escape stays readable");
  assert.equal(words("/Category:Teams/old.html", ""), "Category:Teams old");
  assert.equal(words("/", ""), "");
  assert.equal(words("/a/b/c/d/e/f/g/h/", ""), "a b c d e f");
  assert.ok(words(`/${"x".repeat(200)}/`, "").length <= 80);
});

test("the old-link page's head script redirects exactly like resolveLegacyDestination", () => {
  const articles = loadIntegration();
  const originals = buildPublicLegacyRoutes(articles);
  const routes = [...originals, ...buildRecoveredAliasRoutes(articles, originals), ...loadEditedRouteAliases(articles)];
  const script = new vm.Script(legacyHeadScript());
  let checked = 0;
  for (const route of routes) {
    const config = { base: "/documentation", target: route.target, fragments: route.fragments, autoRedirect: route.autoRedirect ?? true, strictFragments: route.strictFragments ?? false };
    const hashes = ["", "#not-a-known-section", ...Object.keys(route.fragments).slice(0, 6).map((id) => `#${encodeURIComponent(id)}`)];
    for (const hash of hashes) {
      let replaced = null;
      const root = { dataset: {} };
      const context = {
        document: { documentElement: root, getElementById: (id) => (id === "legacy-destination" ? { textContent: JSON.stringify(config) } : null), addEventListener() {} },
        location: { hash, replace: (url) => { replaced = url; } },
        localStorage: { getItem: () => "light" },
        matchMedia: () => ({ matches: false }),
        setTimeout: () => 0,
        decodeURIComponent, JSON, Object,
      };
      script.runInNewContext(context);
      assert.equal(replaced, resolveLegacyDestination(config, hash), `${route.path}${hash}`);
      assert.equal(root.dataset.theme, "light");
      assert.equal("redirecting" in root.dataset, replaced !== null);
      checked++;
    }
  }
  assert.ok(checked > 1500, `checked ${checked} addresses`);
});

test("the old-link page's head script applies the theme without storage", () => {
  for (const [stored, light, expected] of [[null, true, "light"], [null, false, "dark"], ["", true, "light"], ["dark", true, "dark"], ["light", false, "light"]]) {
    const root = { dataset: {} };
    vm.runInNewContext(legacyHeadScript(), {
      document: { documentElement: root, getElementById: () => null, addEventListener() {} },
      location: { hash: "", replace() { throw new Error("no redirect without a destination"); } },
      localStorage: { getItem: () => { if (stored === null) throw new Error("blocked"); return stored; } },
      matchMedia: () => ({ matches: light }),
      setTimeout: () => 0,
      JSON, Object, decodeURIComponent,
    });
    assert.equal(root.dataset.theme, expected);
  }
});

test("old-link pages take the site's colours from custom.css", () => {
  const page = readFileSync("src/pages/[...legacy].astro", "utf8");
  const used = new Set([...page.matchAll(/var\(--([a-z0-9-]+)\)/g)].map((match) => match[1]));
  assert.deepEqual([...used].filter((name) => !TOKENS.includes(name)), [], "every token the page uses is copied from custom.css");
  const css = themeTokenCss(readFileSync("src/styles/custom.css", "utf8"));
  assert.match(css, /^:root \{ color-scheme: dark; .*--sl-color-bg: oklch\(0\.175 /m);
  assert.match(css, /^:root\[data-theme="light"\] \{ color-scheme: light; .*--sl-color-bg: oklch\(0\.992 /m);
  assert.match(css, /prefers-color-scheme: light\) \{ :root:not\(\[data-theme\]\)/);
  assert.match(css, /--sl-font: "IBM Plex Sans"/);
  assert.throws(() => themeTokenCss(":root { --sl-color-bg: red; }\n:root[data-theme=\"light\"] { }"), /no --/);
});

test("an old title lists each saved section once, named by its heading", () => {
  const headings = new Map([["/wiki/arbitration/", [{ depth: 2, slug: "process", text: "Process" }, { depth: 2, slug: "avoiding-fraud", text: "Avoiding Fraud" }]]]);
  const sections = titleSections({
    target: "/wiki/arbitration/",
    anchors: ["Process", "process", "Avoiding_Fraud", "avoiding-fraud", "Installation", "Known_issues", "Don.27t_panic"],
    fragments: { Process: "/wiki/arbitration/#process", process: "/wiki/arbitration/#process", Avoiding_Fraud: "/wiki/arbitration/#avoiding-fraud", "avoiding-fraud": "/wiki/arbitration/#avoiding-fraud" },
  }, headings);
  assert.deepEqual(sections, [
    { ids: ["Process", "process"], href: "/wiki/arbitration/#process", label: "Process" },
    { ids: ["Avoiding_Fraud", "avoiding-fraud"], href: "/wiki/arbitration/#avoiding-fraud", label: "Avoiding Fraud" },
    { ids: ["Installation"], href: "/wiki/arbitration/", label: "Installation" },
    { ids: ["Known_issues"], href: "/wiki/arbitration/", label: "Known issues" },
    { ids: ["Don.27t_panic"], href: "/wiki/arbitration/", label: "Don't panic" },
  ]);
  assert.equal(readableId("where-to-go-next"), "Where to go next");
  assert.equal(readableId("Process,_In_Detail"), "Process, In Detail");
  assert.equal(readableId("source-image-3"), "Image 3");

  // On every real old title, no section shows twice and every saved ID is still on the page.
  const routes = buildPublicLegacyRoutes(loadIntegration());
  for (const route of routes) {
    const listed = titleSections(route);
    assert.deepEqual(listed.flatMap((section) => section.ids).sort(), [...route.anchors].sort(), route.path);
  }
  const arbitration = titleSections(routes.find((route) => route.path === "Arbitration"));
  assert.ok(arbitration.length < routes.find((route) => route.path === "Arbitration").anchors.length);
});

test("earlier guides show their own title and headings", () => {
  const faq = earlierGuide("bisq-1/faq");
  assert.equal(faq.title, "Bisq 1 questions and symptom guide");
  assert.ok(faq.headings.includes("Where to go next"));
  assert.equal(earlierGuide("dao/bsq").title, "BSQ and BSQ swaps");
  assert.equal(earlierGuide("bisq-2").title, "Bisq 2: start here");
  assert.equal(earlierGuide("no/such-guide").title, "Such guide");
  const sections = guideSections([
    { id: "where-to-go-next", targets: [{ title: "Bisq 1", target: "/wiki/bisq-1/" }] },
    { id: "Where_to_go_next", targets: [{ title: "Bisq 1", target: "/wiki/bisq-1/" }, { title: "FAQ", target: "/wiki/frequently-asked-questions/" }] },
    { id: "unlisted-part", targets: [] },
  ], faq.headings);
  assert.deepEqual(sections, [
    { ids: ["where-to-go-next", "Where_to_go_next"], label: "Where to go next", targets: [{ title: "Bisq 1", target: "/wiki/bisq-1/" }, { title: "FAQ", target: "/wiki/frequently-asked-questions/" }] },
    { ids: ["unlisted-part"], label: "Unlisted part", targets: [] },
  ]);
  for (const guide of loadEditedRouteAliases(loadIntegration())) {
    const { title } = earlierGuide(guide.path);
    assert.doesNotMatch(title, /^Earlier guide|^[a-z0-9-]+$/, guide.path);
  }
});
