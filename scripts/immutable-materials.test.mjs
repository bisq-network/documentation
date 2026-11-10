import test from "node:test";
import assert from "node:assert/strict";
import { immutableChanges, immutableMaterialsMessage, nulSeparated } from "./lib/immutable-materials.mjs";

test("changes to preserved restoration materials are found", () => {
  const protectedPaths = [
    "migration/restoration-fidelity.json",
    "migration/additional-articles.json",
    "public/wiki-source/foss.wiki.txt",
    "public/wiki-source/foss.json",
    "public/media/wiki/4cf4058b304d93bc429a0e4aa49656339f02fb3f5d8604a7ba0deff1485d5db6.png",
    "review/ai-edited/snapshot.json",
    "review/ai-edited/guides/some-guide.md",
    "public/media",
  ];
  assert.deepEqual(immutableChanges(protectedPaths), protectedPaths);
});

test("wording proposals, receipts, formatting records and look-alike paths are not immutable materials", () => {
  assert.deepEqual(immutableChanges([
    "src/content/docs/wiki/foss.md",
    "migration/accepted-edits.json",
    "migration/source-formatting.json",
    "migration/source-review-notes.json",
    "migration/restoration-fidelity.json.orig",
    "public/media-extra/x.png",
    "public/wiki-sources/x.txt",
    "review/ai-edited-notes.md",
    "review/PROPOSAL-INDEX.md",
    "scripts/lib/immutable-materials.mjs",
  ]), []);
});

test("git's NUL-separated output keeps unusual file names whole", () => {
  assert.deepEqual(nulSeparated("public/media/a\nb.png\0src/x.md\0"), ["public/media/a\nb.png", "src/x.md"]);
  assert.deepEqual(immutableChanges(nulSeparated("public/media/a\nb.png\0src/x.md\0")), ["public/media/a\nb.png"]);
  assert.deepEqual(nulSeparated(""), []);
});

test("the message names each path and the way forward", () => {
  const lines = immutableMaterialsMessage(["migration/restoration-fidelity.json"]);
  assert.match(lines[0], /changes a preserved restoration material\. These never change in a pull request:/);
  assert.equal(lines[1], "- migration/restoration-fidelity.json");
  assert.match(lines.join("\n"), /migration\/accepted-edits\.json/);
  assert.match(lines.join("\n"), /its own pull request that also changes this guard/);
  assert.match(immutableMaterialsMessage(["a", "b"])[0], /changes 2 preserved restoration materials/);
});
