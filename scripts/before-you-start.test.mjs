import assert from "node:assert/strict";
import { test } from "node:test";
import { beforeYouStartFor, beforeYouStartProblems } from "./lib/before-you-start.mjs";

const notes = { items: [{ id: "seed", source_slugs: ["restore", "backup"], body: "First warning here. Second warning, with a clause. Third." }] };
const slugs = new Set(["restore", "backup", "other"]);
const entry = (fields) => ({ entries: [{ article: "restore", note: "seed", sentences: ["First warning here."], status: "proposed", ...fields }] });

test("an entry whose sentences are exact parts of the note passes", () => {
  assert.deepEqual(beforeYouStartProblems(entry({}), notes, slugs), []);
  assert.deepEqual(beforeYouStartProblems(entry({ sentences: ["Second warning, with a clause.", "Third."] }), notes, slugs), []);
});

test("a sentence that is not in the note fails", () => {
  assert.match(beforeYouStartProblems(entry({ sentences: ["Second warning."] }), notes, slugs)[0], /not an exact part/);
  // A change of case or punctuation counts.
  assert.match(beforeYouStartProblems(entry({ sentences: ["first warning here."] }), notes, slugs)[0], /not an exact part/);
});

test("limits: at most three sentences, a listed article, a known note, one entry per article", () => {
  assert.match(beforeYouStartProblems(entry({ sentences: ["First", "Second", "Third", "here"] }), notes, slugs)[0], /between 1 and 3/);
  assert.match(beforeYouStartProblems(entry({ sentences: [] }), notes, slugs)[0], /between 1 and 3/);
  assert.match(beforeYouStartProblems(entry({ article: "other" }), notes, slugs)[0], /does not list this article/);
  assert.match(beforeYouStartProblems(entry({ article: "missing" }), notes, slugs).join(), /not an article slug/);
  assert.match(beforeYouStartProblems(entry({ note: "nope" }), notes, slugs)[0], /not a migration check id/);
  assert.match(beforeYouStartProblems(entry({ status: "maybe" }), notes, slugs)[0], /status/);
  assert.match(beforeYouStartProblems(entry({ extra: 1 }), notes, slugs)[0], /unknown fields extra/);
  const twice = { entries: [...entry({}).entries, ...entry({}).entries] };
  assert.match(beforeYouStartProblems(twice, notes, slugs).join(), /already has an entry/);
});

test("the repository's entries pass and the seeded entry loads", () => {
  const callout = beforeYouStartFor("restoring-your-wallet-from-seed");
  assert.equal(callout.note.id, "seed-restore-preconditions");
  assert.equal(callout.sentences.length, 2);
  assert.equal(beforeYouStartFor("teams"), undefined);
});
