import assert from "node:assert/strict";
import { test } from "node:test";
import { beforeYouStartFor, beforeYouStartProblems, noteSentences } from "./lib/before-you-start.mjs";

const notes = { items: [
  { id: "seed", source_slugs: ["restore", "backup"], status: "verified-against-pinned-source", body: "First warning here. Second warning, with a clause. Third; no restore was performed." },
  { id: "open", source_slugs: ["restore"], status: "needs-maintainer-review", body: "Maintainers still need to check this." },
] };
const slugs = new Set(["restore", "backup", "other"]);
const entry = (fields) => ({ entries: [{ article: "restore", note: "seed", sentences: ["First warning here."], status: "proposed", ...fields }] });

test("an entry whose sentences are exact parts of the note passes", () => {
  assert.deepEqual(beforeYouStartProblems(entry({}), notes, slugs), []);
  assert.deepEqual(beforeYouStartProblems(entry({ sentences: ["Second warning, with a clause.", "Third; no restore was performed."] }), notes, slugs), []);
});

test("only whole sentences of the note, word for word, pass", () => {
  assert.match(beforeYouStartProblems(entry({ sentences: ["Second warning."] }), notes, slugs)[0], /not a whole sentence/);
  // A change of case or punctuation counts.
  assert.match(beforeYouStartProblems(entry({ sentences: ["first warning here."] }), notes, slugs)[0], /not a whole sentence/);
  // A cut that drops a negation is refused even though it is part of the text.
  assert.match(beforeYouStartProblems(entry({ sentences: ["restore was performed."] }), notes, slugs)[0], /not a whole sentence/);
  assert.match(beforeYouStartProblems(entry({ sentences: ["Second warning, with a clause"] }), notes, slugs)[0], /not a whole sentence/);
});

test("a check that still needs maintainer review cannot become a callout", () => {
  assert.match(beforeYouStartProblems(entry({ note: "open", sentences: ["Maintainers still need to check this."] }), notes, slugs).join(), /needs maintainer review/);
});

test("note sentences split at sentence ends, not inside version numbers", () => {
  assert.deepEqual(noteSentences("Bisq 1 v1.10.11 warns. Its UI warns, and more. \u201cQuoted\u201d one."), ["Bisq 1 v1.10.11 warns.", "Its UI warns, and more.", "\u201cQuoted\u201d one."]);
});

test("limits: at most three sentences, a listed article, a known note, one entry per article", () => {
  assert.match(beforeYouStartProblems(entry({ sentences: ["First warning here.", "Second warning, with a clause.", "Third; no restore was performed.", "Fourth."] }), notes, slugs)[0], /between 1 and 3/);
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
