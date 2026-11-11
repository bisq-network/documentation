import test from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { changeableMigrationRecords, immutableChanges, immutableMaterials, immutableMaterialsMessage, nulSeparated, sourceReviewNoteChanges } from "./lib/immutable-materials.mjs";

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
    "migration/restored-articles/foss.md",
    "migration/restored-articles",
    "migration/markdown-format.json",
    // Records the published page builds on (review findings on PR #188).
    "migration/template-renderings-20261014.json",
    "migration/archive-templates-20261014.json",
    "migration/section-repairs-20261108.json",
    "migration/scoped-link-repairs-20261108.json",
    "migration/recovered-dispute-alias-evidence.json",
    "migration/articles.json",
    "recovery-evidence/supplemental-media.json",
    "recovery-evidence/template-media.json",
    // Review round 3: the MDX pages run code at build time.
    "src/content/docs/index.mdx",
    "src/content/docs/browse/all.mdx",
  ];
  assert.deepEqual(immutableChanges(protectedPaths), protectedPaths);
});

test("a material the base does not have yet may be added; once there, it never changes", () => {
  const added = ["migration/restored-articles/foss.md", "migration/restored-articles/teams.md", "migration/markdown-format.json", "public/wiki-source/foss.wiki.txt"];
  const newMaterials = (entry) => !["migration/restored-articles/", "migration/markdown-format.json"].includes(entry);
  assert.deepEqual(immutableChanges(added, newMaterials), ["public/wiki-source/foss.wiki.txt"]);
  assert.deepEqual(immutableChanges(added, () => true), added);
});

test("wording proposals, receipts, formatting records and look-alike paths are not immutable materials", () => {
  assert.deepEqual(immutableChanges([
    "src/content/docs/wiki/foss.md",
    "migration/accepted-edits.json",
    "migration/accepted-edits/foss.pr-1.json",
    "migration/source-review-notes.json",
    "migration/markdown-format.json.orig",
    "migration/restored-articles-notes.md",
    "migration/source-review-notes.json",
    "migration/restoration-fidelity.json.orig",
    "public/media-extra/x.png",
    "public/wiki-sources/x.txt",
    "review/ai-edited-notes.md",
    "review/PROPOSAL-INDEX.md",
    "scripts/lib/immutable-materials.mjs",
  ]), []);
});

test("every file under migration/ is either preserved or has its own check", () => {
  const files = readdirSync("migration", { withFileTypes: true }).map((entry) => `migration/${entry.name}${entry.isDirectory() ? "/" : ""}`);
  for (const file of files) {
    const known = [...immutableMaterials, ...changeableMigrationRecords].includes(file);
    assert.ok(known, `${file} is neither a preserved material nor a record with its own check (scripts/lib/immutable-materials.mjs)`);
  }
  for (const file of changeableMigrationRecords) assert.deepEqual(immutableChanges([file.replace(/\/$/, "/x.json")]), [], file);
});

test("migration notes may only gain notes, each cited by a receipt in the same pull request", () => {
  const base = readFileSync("migration/source-review-notes.json", "utf8");
  const notes = JSON.parse(base);
  const [first] = notes.items;
  const added = { ...first, id: "new-note", body: "A new migration note." };
  const withNote = JSON.stringify({ ...notes, items: [...notes.items, added] }, null, 2);
  const citing = first.source_slugs.map((slug) => ({ slug, note_ids: ["new-note"] }));
  assert.deepEqual(sourceReviewNoteChanges(base, base, []), []);
  assert.deepEqual(sourceReviewNoteChanges(base, withNote, citing), []);
  assert.match(sourceReviewNoteChanges(base, withNote, [])[0], /adds the note "new-note", shown on .* without a receipt in this pull request for that article that cites it/);
  // The confirmed attack: a sentence changed in a note shown on /wiki/manual-payout/.
  const reworded = base.replace("Sending a seed or private key to the mediator is not part of that workflow.", "Send your seed words to the mediator so they can sign for you.");
  assert.notEqual(reworded, base);
  assert.match(sourceReviewNoteChanges(base, reworded, citing)[0], /changes or removes the existing note "manual-payout-local-signing"|changes or removes the existing note/);
  // Review round 3 (notes-dup): a receipt for Teams cites an existing note ID while the pull
  // request appends a note with that ID, shown on wallet pages.
  const existing = notes.items.find((note) => note.id === "local-signing-not-private-key-collection") ?? first;
  const impostor = { ...existing, source_slugs: ["teams", "mediation", "wallet"], body: "Send your seed words to the mediator in the trade chat." };
  const duplicated = JSON.stringify({ ...notes, items: [...notes.items, impostor] });
  const problems = sourceReviewNoteChanges(base, duplicated, [{ slug: "teams", note_ids: [existing.id] }]);
  assert.ok(problems.some((problem) => /has more than one note with the ID/.test(problem)), problems.join("\n"));
  assert.ok(problems.some((problem) => /adds a note with the existing ID/.test(problem)), problems.join("\n"));
  // A new note is cited by a receipt for every article it is shown on.
  const spread = JSON.stringify({ ...notes, items: [...notes.items, { ...added, source_slugs: ["teams", "wallet"] }] });
  assert.match(sourceReviewNoteChanges(base, spread, [{ slug: "teams", note_ids: ["new-note"] }]).join("\n"), /shown on wallet without a receipt in this pull request for that article that cites it/);
  assert.deepEqual(sourceReviewNoteChanges(base, spread, [{ slug: "teams", note_ids: ["new-note"] }, { slug: "wallet", note_ids: ["new-note"] }]), []);
  const removed = JSON.stringify({ ...notes, items: notes.items.slice(1) });
  assert.match(sourceReviewNoteChanges(base, removed, [])[0], /changes or removes the existing note/);
  const inserted = JSON.stringify({ ...notes, items: [added, ...notes.items] });
  assert.match(sourceReviewNoteChanges(base, inserted, citing)[0], /changes or removes the existing note/);
  assert.match(sourceReviewNoteChanges(base, JSON.stringify({ ...notes, schema_version: 9 }), [])[0], /changes more than its notes/);
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
  assert.match(lines.join("\n"), /a receipt in migration\/accepted-edits\//);
  assert.match(lines.join("\n"), /its own pull request that also changes this guard/);
  assert.match(immutableMaterialsMessage(["a", "b"])[0], /changes 2 preserved restoration materials/);
});
