// The preserved restoration materials that the fidelity gate is checked against.
// They never change in a pull request: an edited article plus refreshed hashes
// in the restoration manifest would otherwise pass every offline check. The
// check job compares each pull request with its base (scripts/check-immutable-materials.mjs).
// A deliberate new intake or correction needs its own pull request that also changes
// this list.
// - migration/restored-articles/ holds the restored HTML articles as they were before
//   their conversion to Markdown; every article's chain starts there.
// - migration/markdown-format.json records which Markdown each article was converted
//   to. Changing it would let a pull request present an edited article as a fresh
//   conversion, which needs no receipt.
// - The records the published page builds on: what the page puts into an article
//   (template renderings and definitions, section and link repairs, alias evidence,
//   recovered media), what it shows about it (titles, original links, recovery notes,
//   navigation, routes, the recovered category) and the source formatting the preserved
//   originals depend on. Changing one would change pages without a receipt.
export const immutableMaterials = [
  "migration/restoration-fidelity.json",
  "migration/additional-articles.json",
  "migration/restored-articles/",
  "migration/markdown-format.json",
  "migration/archive-redirects-20261014.json",
  "migration/archive-templates-20261014.json",
  "migration/articles.json",
  "migration/nav-groups.json",
  "migration/recovered-category-teams-20261014.json",
  "migration/recovered-dispute-alias-evidence.json",
  "migration/scoped-link-repairs-20261108.json",
  "migration/section-repairs-20261108.json",
  "migration/source-formatting.json",
  "migration/taxonomy.json",
  "migration/template-renderings-20261014.json",
  "migration/title-route-map.json",
  "recovery-evidence/",
  "public/wiki-source/",
  "public/media/",
  "review/ai-edited/",
];

// The records under migration/ that may change, each with its own check: the receipt
// settings and receipts (the receipts job checks their approvals), and the migration
// notes shown on article pages, which may only gain notes (sourceReviewNoteChanges).
// Every file under migration/ is one or the other (scripts/immutable-materials.test.mjs).
export const sourceReviewNotesPath = "migration/source-review-notes.json";
export const changeableMigrationRecords = ["migration/accepted-edits.json", "migration/accepted-edits/", sourceReviewNotesPath];

const touches = (entry, path) => (entry.endsWith("/") ? path.startsWith(entry) || path === entry.slice(0, -1) : path === entry);

/**
 * Paths (repository-relative, as git prints them) that touch an immutable material.
 * inBase(entry) tells whether the base has the material at all: a material the base
 * does not have yet is being added (the pull request that adds it to the list), so
 * its paths do not count. Without inBase every material counts as present.
 */
export function immutableChanges(paths, inBase = () => true) {
  const present = new Map(immutableMaterials.map((entry) => [entry, inBase(entry)]));
  return paths.filter((path) => immutableMaterials.some((entry) => present.get(entry) && touches(entry, path)));
}

/**
 * Problems with a change to the migration notes (migration/source-review-notes.json),
 * which article pages show. Existing notes stay byte for byte and in order; new notes
 * are added at the end, and each new note is cited by a receipt this pull request adds
 * or changes (its note_ids), so a documentation reviewer approves it with the receipt.
 * base and head are the file's text (base undefined when it is new); receipts are the
 * receipt items the pull request adds or changes.
 */
export function sourceReviewNoteChanges(base, head, receipts) {
  if (base === undefined || base === head) return [];
  let before;
  let after;
  try { [before, after] = [JSON.parse(base), JSON.parse(head)]; } catch { return [`${sourceReviewNotesPath} is not valid JSON`]; }
  const { items: oldItems = [], ...oldRest } = before;
  const { items: newItems = [], ...newRest } = after ?? {};
  if (JSON.stringify(oldRest) !== JSON.stringify(newRest)) return [`${sourceReviewNotesPath} changes more than its notes`];
  const problems = [];
  oldItems.forEach((note, index) => {
    if (JSON.stringify(newItems[index]) !== JSON.stringify(note)) problems.push(`${sourceReviewNotesPath} changes or removes the existing note ${JSON.stringify(note.id)}; existing notes never change`);
  });
  const cited = new Set(receipts.flatMap((item) => (Array.isArray(item?.note_ids) ? item.note_ids : [])));
  for (const note of newItems.slice(oldItems.length)) {
    if (!cited.has(note?.id)) problems.push(`${sourceReviewNotesPath} adds the note ${JSON.stringify(note?.id)}, which no receipt in this pull request cites; a new note is shown on article pages, so it is added with the receipt that cites it`);
  }
  return problems;
}

/** Split `git diff --name-only -z` output into paths. */
export const nulSeparated = (output) => output.split("\0").filter(Boolean);

/** The failure message for changed immutable materials. */
export function immutableMaterialsMessage(changed) {
  return [
    `This pull request changes ${changed.length === 1 ? "a preserved restoration material" : `${changed.length} preserved restoration materials`}. These never change in a pull request:`,
    ...changed.map((path) => `- ${path}`),
    "These are the originals the fidelity gate checks against and the records article pages are built from: the restoration manifest, the additional-article records, the restored articles as they were before their Markdown conversion and the record of that conversion, the template, repair, alias, media, route, navigation and article records, raw wiki sources, media and the AI-edited snapshots.",
    "Accepted wording goes through a receipt in migration/accepted-edits/ (CONTRIBUTING.md#accepted-editorial-changes).",
    "A deliberate new intake needs its own pull request that also changes this guard (scripts/lib/immutable-materials.mjs).",
  ];
}
