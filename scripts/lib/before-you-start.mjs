// Before you start callouts: src/data/before-you-start.json names, per article, up to three
// sentences from one migration check (migration/source-review-notes.json). Each sentence
// must be an exact part of the note's text, so a callout never says more than the check
// did; anything else fails the build (src/components/SourceHistory.astro loads this).
import { readFileSync } from "node:fs";

export const maxSentences = 3;
const statuses = ["proposed", "accepted"];

/**
 * Problems with the entries, given the notes ({ items }) and the article slugs.
 * An entry is { article, note, sentences, status }.
 */
export function beforeYouStartProblems(data, notes, slugs) {
  const problems = [];
  if (!data || !Array.isArray(data.entries)) return ["src/data/before-you-start.json must hold an entries list"];
  const byId = new Map(notes.items.map((note) => [note.id, note]));
  const seen = new Set();
  data.entries.forEach((entry, index) => {
    const name = `entry ${index + 1} (${entry?.article ?? "no article"})`;
    const known = new Set(["article", "note", "sentences", "status"]);
    const extra = Object.keys(entry ?? {}).filter((key) => !known.has(key));
    if (extra.length) problems.push(`${name}: unknown fields ${extra.join(", ")}`);
    if (!slugs.has(entry?.article)) problems.push(`${name}: ${JSON.stringify(entry?.article)} is not an article slug`);
    if (seen.has(entry?.article)) problems.push(`${name}: the article already has an entry; one callout per article`);
    seen.add(entry?.article);
    if (!statuses.includes(entry?.status)) problems.push(`${name}: status must be one of ${statuses.join(", ")}`);
    const note = byId.get(entry?.note);
    if (!note) { problems.push(`${name}: ${JSON.stringify(entry?.note)} is not a migration check id`); return; }
    if (!note.source_slugs.includes(entry.article)) problems.push(`${name}: the check ${note.id} does not list this article`);
    const sentences = entry.sentences;
    if (!Array.isArray(sentences) || sentences.length < 1 || sentences.length > maxSentences) {
      problems.push(`${name}: between 1 and ${maxSentences} sentences`);
      return;
    }
    sentences.forEach((sentence, number) => {
      if (typeof sentence !== "string" || !sentence.trim()) problems.push(`${name}: sentence ${number + 1} is empty`);
      else if (!note.body.includes(sentence)) problems.push(`${name}: sentence ${number + 1} is not an exact part of the text of ${note.id}: ${JSON.stringify(sentence)}`);
    });
    if (new Set(sentences).size !== sentences.length) problems.push(`${name}: a sentence is listed twice`);
  });
  return problems;
}

let cache;
/** The callout for an article slug ({ note, sentences, status }), or undefined. Throws on any problem. */
export function beforeYouStartFor(slug) {
  if (!cache) {
    const data = JSON.parse(readFileSync("src/data/before-you-start.json", "utf8"));
    const notes = JSON.parse(readFileSync("migration/source-review-notes.json", "utf8"));
    const slugs = new Set([
      ...JSON.parse(readFileSync("migration/articles.json", "utf8")).items,
      ...JSON.parse(readFileSync("migration/additional-articles.json", "utf8")).items,
    ].map((article) => article.slug));
    const problems = beforeYouStartProblems(data, notes, slugs);
    if (problems.length) throw new Error(`Before you start callouts (src/data/before-you-start.json):\n${problems.map((problem) => `- ${problem}`).join("\n")}`);
    const byId = new Map(notes.items.map((note) => [note.id, note]));
    cache = new Map(data.entries.map((entry) => [entry.article, { note: byId.get(entry.note), sentences: entry.sentences, status: entry.status }]));
  }
  return cache.get(slug);
}
