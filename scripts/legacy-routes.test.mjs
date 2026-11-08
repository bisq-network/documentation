import test from "node:test";
import assert from "node:assert/strict";
import { buildLegacyRoutes, normalizeFragment, resolveLegacyDestination } from "./lib/legacy-routes.mjs";
import { buildEditedRouteAliases, loadEditedRouteAliases } from "./lib/edited-route-aliases.mjs";
import { loadIntegration } from "./lib/documentation.mjs";

const article = {
  title: "Bisq 2", slug: "bisq-2", original_url: "https://bisq.wiki/Bisq_2", route: "/wiki/bisq-2/", target: "/wiki/bisq-2/",
  headings: [{ text: "Installation", legacy_id: "Installation", anchor: "installation" }],
  fragment_map: { Installation: "installation" },
};

test("MediaWiki alias preserves original fragment without shadowing canonical route", () => {
  const routes = buildLegacyRoutes([article]);
  assert.deepEqual(routes.map((r) => r.path), ["Bisq_2"]);
  assert.equal(resolveLegacyDestination(routes[0], "#Installation"), "/wiki/bisq-2/#installation");
  assert.equal(resolveLegacyDestination({ ...routes[0], base: "/bisq-docs/" }, "#Installation"), "/bisq-docs/wiki/bisq-2/#installation");
});

test("case-colliding SEPA title aliases both go to the primary original", () => {
  const records = [
    { ...article, title: "SEPA", original_url: "https://bisq.wiki/SEPA", route: "/wiki/sepa-p551/", target: "/wiki/sepa-p551/", headings: [], fragment_map: {} },
    { ...article, title: "Sepa", original_url: "https://bisq.wiki/Sepa", route: "/wiki/sepa-p550/", target: "/wiki/sepa-p550/", headings: [], fragment_map: {} },
  ];
  const routes = buildLegacyRoutes(records);
  assert.deepEqual(routes.map((r) => r.path), ["SEPA", "Sepa"]);
  assert.ok(routes.every((r) => r.target === "/wiki/sepa-p551/"));
  assert.equal(normalizeFragment("M.C3.A9todos_de_pago"), normalizeFragment("M%C3%A9todos_de_pago"));
});

test("original HTML IDs survive legacy redirects, including Unicode and heading-name collisions", () => {
  const source = loadIntegration().find((item) => item.slug === "downloading-and-installing");
  const route = buildLegacyRoutes([source]).find((item) => item.path === "Downloading_and_installing");
  for (const id of source.explicit_anchors) {
    assert.equal(resolveLegacyDestination(route, `#${encodeURIComponent(id)}`), `/wiki/downloading-and-installing/#${id}`);
  }
  assert.equal(resolveLegacyDestination({ ...route, base: "/bisq-docs/" }, "#import-alejandro-garc%C3%ADas-key"), "/bisq-docs/wiki/downloading-and-installing/#import-alejandro-garcías-key");
  assert.equal(resolveLegacyDestination(route, "#windows"), "/wiki/downloading-and-installing/#windows");
  assert.equal(resolveLegacyDestination(route, "#Windows"), "/wiki/downloading-and-installing/#windows-2");
});

test("merged guides show sources unless a fragment uniquely identifies one", () => {
  const sources = [{ title: "First", slug: "first", route: "/wiki/first/" }, { title: "Second", slug: "second", route: "/wiki/second/" }];
  const rows = [
    { source_slug: "first", target: "/guide/#one" },
    { source_slug: "first", target: "/guide/#shared" },
    { source_slug: "second", target: "/guide/#shared" },
  ];
  const [route] = buildEditedRouteAliases(sources, rows, ["/guide/"]);
  assert.equal(route.choices.length, 2);
  assert.equal(resolveLegacyDestination(route), null);
  assert.equal(resolveLegacyDestination(route, "#shared"), null);
  assert.equal(resolveLegacyDestination(route, "#unknown"), null);
  assert.equal(resolveLegacyDestination({ ...route, base: "/bisq-docs/" }, "#one"), "/bisq-docs/wiki/first/");
});

test("actual archived guides are covered and special bookmarks retain their meaning", () => {
  const aliases = loadEditedRouteAliases(loadIntegration());
  assert.equal(aliases.length, 98);
  const mediator = aliases.find((a) => a.path === "bisq-1/finding-your-mediator");
  const restore = aliases.find((a) => a.path === "bisq-1/restoring-data");
  assert.equal(resolveLegacyDestination(mediator, "#luis3672"), "/wiki/finding-your-mediator/#matrix-and-onion-addresses");
  assert.equal(resolveLegacyDestination(restore, "#last-resort-reconstruction"), "/wiki/last-resort-restore/");
});

test("malformed fragments and unsafe destinations cannot redirect off-site", () => {
  assert.equal(resolveLegacyDestination({ target: "/guide/", fragments: {} }, "#%broken"), "/guide/");
  assert.equal(resolveLegacyDestination({ target: "//example.com", fragments: {} }), null);
  assert.throws(() => buildLegacyRoutes([article, article]), /Duplicate legacy path/);
});

test("unrendered layout-template anchors fall back to the original article", () => {
  const source = loadIntegration().find((item) => item.slug === "bisq-1");
  const route = buildLegacyRoutes([source]).find((item) => item.path === "Bisq_1");
  assert.ok(source.explicit_anchors.includes("mp-left"));
  assert.equal(resolveLegacyDestination(route, "#mp-left"), "/wiki/bisq-1/");
});
