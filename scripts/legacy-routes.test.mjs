import test from "node:test";
import assert from "node:assert/strict";
import { buildLegacyRoutes, normalizeFragment, resolveLegacyDestination } from "./lib/legacy-routes.mjs";

const article = {
  title: "Finding your mediator", slug: "finding-your-mediator", original_url: "https://bisq.wiki/Finding_your_mediator", route: "/wiki/finding-your-mediator/", target: "/bisq-1/finding-your-mediator/#find-the-assigned-mediator",
  headings: [
    { text: "In Bisq 1", legacy_id: "In_Bisq_1", anchor: "in-bisq-1" },
    { text: "Old contact details", legacy_id: "Old_contact_details", anchor: "old-contact-details" },
  ],
  fragment_map: { Old_contact_details: "known-mediator-names" },
};
const headings = new Map([["/bisq-1/finding-your-mediator/", [{ text: "In Bisq 1", slug: "in-bisq-1" }]]]);

test("retains exact MediaWiki case and underscores plus the earlier preview path", () => {
  assert.deepEqual(buildLegacyRoutes([article], headings).map((r) => r.path), ["Finding_your_mediator", "wiki/finding-your-mediator"]);
});

test("saved section links resolve under root and GitHub Pages bases", () => {
  const route = buildLegacyRoutes([article], headings)[0];
  assert.equal(resolveLegacyDestination(route, "#In_Bisq_1"), "/bisq-1/finding-your-mediator/#in-bisq-1");
  assert.equal(resolveLegacyDestination({ ...route, base: "/bisq-docs/" }, "#Old_contact_details"), "/bisq-docs/bisq-1/finding-your-mediator/#known-mediator-names");
  assert.equal(resolveLegacyDestination(route, "#unavailable-section"), article.target);
});

test("handles nested and Unicode titles without case-folding distinct routes", () => {
  const records = [
    { ...article, title: "Payment methods/es", original_url: "https://bisq.wiki/Payment_methods%2Fes", route: "/wiki/payment-methods-es/" },
    { ...article, title: "SEPA", original_url: "https://bisq.wiki/SEPA", route: "/wiki/sepa-p551/" },
    { ...article, title: "Sepa", original_url: "https://bisq.wiki/Sepa", route: "/wiki/sepa-p550/" },
  ];
  const paths = buildLegacyRoutes(records).map((r) => r.path);
  assert.ok(paths.includes("Payment_methods/es") && paths.includes("SEPA") && paths.includes("Sepa"));
  assert.equal(normalizeFragment("M.C3.A9todos_de_pago"), normalizeFragment("M%C3%A9todos_de_pago"));
});

test("fallback handles a malformed fragment and refuses off-site redirect destinations", () => {
  assert.equal(resolveLegacyDestination({ target: "/guide/", fragments: {} }, "#%broken"), "/guide/");
  assert.equal(resolveLegacyDestination({ target: "/guide/", fragments: {} }, "#constructor"), "/guide/");
  assert.equal(resolveLegacyDestination({ target: "https://example.com", fragments: {} }), null);
  assert.equal(resolveLegacyDestination({ target: "//example.com", fragments: {} }), null);
  assert.throws(() => buildLegacyRoutes([article, article]), /Duplicate legacy path/);
});

test("case-only aliases share all anchors on case-insensitive development filesystems", () => {
  const upper = { ...article, title: "SEPA", original_url: "https://bisq.wiki/SEPA", route: "/wiki/sepa-p551/", target: "/payment-methods/sepa/#requirements" };
  const lower = { ...upper, title: "Sepa", original_url: "https://bisq.wiki/Sepa", route: "/wiki/sepa-p550/", target: "/payment-methods/sepa/", headings: [], fragment_map: {} };
  const aliases = buildLegacyRoutes([upper, lower]).filter((entry) => entry.path.toLowerCase() === "sepa");
  assert.equal(aliases.length, 2);
  assert.equal(aliases[0].target, aliases[1].target);
  assert.deepEqual(aliases[0].anchors, aliases[1].anchors);
});
