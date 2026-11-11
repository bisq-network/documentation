import { execFileSync } from "node:child_process";
import { annotation, oneLine } from "./lib/actions-output.mjs";
import { receiptsDir } from "./lib/accepted-edits.mjs";
import { immutableChanges, immutableMaterialsMessage, nulSeparated, sourceReviewNoteChanges, sourceReviewNotesPath } from "./lib/immutable-materials.mjs";

// The check job, on pull requests: fail when the pull request changes a preserved
// restoration material (see scripts/lib/immutable-materials.mjs) compared with its
// base. Renames count as a removal plus an addition, so moving a file is caught.
// A material the base does not have yet (the pull request that introduces it and adds
// it to the list) does not count; from then on it never changes. The migration notes
// may only gain notes cited by a receipt the pull request adds or changes.
//
//   node scripts/check-immutable-materials.mjs [<base> [<head>]]   (default HEAD^1 HEAD)
const [base = "HEAD^1", head = "HEAD"] = process.argv.slice(2);
try {
  const git = (args) => execFileSync("git", args, { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  const paths = nulSeparated(git(["diff", "--name-only", "--no-renames", "-z", base, head, "--"]));
  // A material the base does not have at all is being introduced, not changed.
  const inBase = (entry) => nulSeparated(git(["ls-tree", "-r", "--name-only", "-z", base, "--", entry.replace(/\/$/, "")])).length > 0;
  const changed = immutableChanges(paths, inBase).map(oneLine);
  // The migration notes may only gain notes, each cited by a receipt this pull request adds or changes.
  const show = (ref, path) => { try { return git(["show", `${ref}:${path}`]); } catch { return undefined; } };
  const receipts = paths.filter((path) => path.startsWith(`${receiptsDir}/`)).map((path) => show(head, path)).filter((text) => text !== undefined)
    .map((text) => { try { return JSON.parse(text); } catch { return undefined; } });
  const notes = sourceReviewNoteChanges(show(base, sourceReviewNotesPath), show(head, sourceReviewNotesPath) ?? "", receipts);
  if (changed.length) {
    const [first, ...rest] = immutableMaterialsMessage(changed);
    console.log(annotation("error", { title: "Preserved restoration materials changed" }, first));
    console.log(rest.join("\n"));
    process.exitCode = 1;
  }
  if (notes.length) {
    console.log(annotation("error", { title: "Migration notes changed" }, notes[0]));
    console.log(notes.slice(1).join("\n"));
    process.exitCode = 1;
  }
  if (!changed.length && !notes.length) {
    console.log(`No preserved restoration material changed (${paths.length} changed file${paths.length === 1 ? "" : "s"} compared with the base).`);
  }
} catch (error) {
  console.error(`Immutable materials check FAILED: ${oneLine(error.message)}`);
  process.exitCode = 1;
}
