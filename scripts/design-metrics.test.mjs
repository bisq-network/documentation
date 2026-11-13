import assert from "node:assert/strict";
import { test } from "node:test";
import { cumulativeLayoutShift, groupValues, kilobytes, overBudget, readBudget, servedPath, spread } from "./lib/design-metrics.mjs";

test("layout shift is the largest session window", () => {
  assert.equal(cumulativeLayoutShift([]), 0);
  // Two shifts 500 ms apart share a window; one 2 s later starts a new one.
  assert.equal(cumulativeLayoutShift([{ value: 0.05, time: 100 }, { value: 0.03, time: 600 }, { value: 0.06, time: 2600 }]), 0.08);
  // A window closes after 5 s even when shifts keep coming.
  const steady = Array.from({ length: 12 }, (_, index) => ({ value: 0.01, time: index * 900 }));
  assert.equal(cumulativeLayoutShift(steady), 0.06);
});

test("values group by count, with examples", () => {
  const groups = groupValues([{ x: 324, slug: "a" }, { x: 438, slug: "b" }, { x: 324, slug: "c" }], (item) => item.x, (item) => item.slug);
  assert.deepEqual(groups, [{ value: 324, count: 2, examples: ["a", "c"] }, { value: 438, count: 1, examples: ["b"] }]);
});

test("spread ignores missing values", () => {
  assert.deepEqual(spread([3, null, 8, 3]), { min: 3, max: 8, distinct: 2 });
  assert.deepEqual(spread([]), { min: null, max: null, distinct: 0 });
});

test("a metric above its ceiling, or missing, is over budget", () => {
  const budget = { _about: "notes are ignored", axeViolations: 0, homeLayoutShift: 0.02, unresolvedLinkMarkers: 67 };
  assert.deepEqual(overBudget({ axeViolations: 0, homeLayoutShift: 0.077, unresolvedLinkMarkers: 67 }, budget), [{ metric: "homeLayoutShift", value: 0.077, ceiling: 0.02 }]);
  assert.deepEqual(overBudget({ axeViolations: 0, homeLayoutShift: 0.01 }, budget), [{ metric: "unresolvedLinkMarkers", value: null, ceiling: 67 }]);
});

test("kilobytes keep one decimal", () => {
  assert.equal(kilobytes(27238), 26.6);
});

test("the server serves only files inside its root", async () => {
  const { join, sep } = await import("node:path");
  const root = join(sep, "repo", "dist");
  assert.equal(servedPath(root, "wiki/teams/"), join(root, "wiki", "teams"));
  assert.equal(servedPath(root, ""), root);
  // Encoded dots that stay inside the root are fine.
  assert.equal(servedPath(root, "wiki/%2e%2e/index.html"), join(root, "index.html"));
  // A sibling folder that shares the root's name as a prefix, plain or encoded.
  assert.equal(servedPath(root, "../dist-private/token.txt"), null);
  assert.equal(servedPath(root, "..%2fdist-private%2ftoken.txt"), null);
  assert.equal(servedPath(root, "%2e%2e/%2e%2e/etc/passwd"), null);
  assert.equal(servedPath(root, "a%00b"), null);
  assert.equal(servedPath(root, "%E0%A4%A"), null);
  // A name that only starts with two dots stays inside.
  assert.equal(servedPath(root, "..notes.txt"), join(root, "..notes.txt"));
});

test("a missing or malformed budget fails instead of passing everything", async () => {
  const { mkdtempSync, writeFileSync } = await import("node:fs");
  const { tmpdir } = await import("node:os");
  const { join } = await import("node:path");
  const dir = mkdtempSync(join(tmpdir(), "design-budget-"));
  assert.throws(() => readBudget(join(dir, "missing.json")), /missing/);
  writeFileSync(join(dir, "list.json"), "[1, 2]");
  assert.throws(() => readBudget(join(dir, "list.json")), /not a JSON object/);
  writeFileSync(join(dir, "ok.json"), '{ "axeViolations": 0 }');
  assert.deepEqual(readBudget(join(dir, "ok.json")), { axeViolations: 0 });
});
