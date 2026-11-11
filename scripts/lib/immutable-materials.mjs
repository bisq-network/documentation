// The preserved restoration materials that the fidelity gate is checked against.
// They never change in a pull request: an edited article plus refreshed hashes
// in the restoration manifest would otherwise pass every offline check. The
// check job compares each pull request with its base (scripts/check-immutable-materials.mjs).
// A deliberate new intake needs its own pull request that also changes this list.
// migration/restored-articles/ holds the restored HTML articles as they were before
// their conversion to Markdown; every article's chain starts there.
// migration/markdown-format.json records which Markdown each article was converted
// to. Changing it would let a pull request present an edited article as a fresh
// conversion, which needs no receipt; a further conversion needs its own pull request
// that also changes this list.
export const immutableMaterials = [
  "migration/restoration-fidelity.json",
  "migration/additional-articles.json",
  "migration/restored-articles/",
  "migration/markdown-format.json",
  "public/wiki-source/",
  "public/media/",
  "review/ai-edited/",
];

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

/** Split `git diff --name-only -z` output into paths. */
export const nulSeparated = (output) => output.split("\0").filter(Boolean);

/** The failure message for changed immutable materials. */
export function immutableMaterialsMessage(changed) {
  return [
    `This pull request changes ${changed.length === 1 ? "a preserved restoration material" : `${changed.length} preserved restoration materials`}. These never change in a pull request:`,
    ...changed.map((path) => `- ${path}`),
    "These are the originals the fidelity gate checks against: the restoration manifest, the additional-article records, the restored articles as they were before their Markdown conversion and the record of that conversion, raw wiki sources, media and the AI-edited snapshots.",
    "Accepted wording goes through a receipt in migration/accepted-edits/ (CONTRIBUTING.md#accepted-editorial-changes).",
    "A deliberate new intake needs its own pull request that also changes this guard (scripts/lib/immutable-materials.mjs).",
  ];
}
