import { execFileSync } from "node:child_process";
import { annotation, oneLine } from "./lib/actions-output.mjs";
import { immutableChanges, immutableMaterialsMessage, nulSeparated } from "./lib/immutable-materials.mjs";

// The check job, on pull requests: fail when the pull request changes a preserved
// restoration material (see scripts/lib/immutable-materials.mjs) compared with its
// base. Renames count as a removal plus an addition, so moving a file is caught.
//
//   node scripts/check-immutable-materials.mjs [<base> [<head>]]   (default HEAD^1 HEAD)
const [base = "HEAD^1", head = "HEAD"] = process.argv.slice(2);
try {
  const paths = nulSeparated(execFileSync("git", ["diff", "--name-only", "--no-renames", "-z", base, head, "--"], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 }));
  const changed = immutableChanges(paths).map(oneLine);
  if (changed.length) {
    const [first, ...rest] = immutableMaterialsMessage(changed);
    console.log(annotation("error", { title: "Preserved restoration materials changed" }, first));
    console.log(rest.join("\n"));
    process.exitCode = 1;
  } else {
    console.log(`No preserved restoration material changed (${paths.length} changed file${paths.length === 1 ? "" : "s"} compared with the base).`);
  }
} catch (error) {
  console.error(`Immutable materials check FAILED: ${oneLine(error.message)}`);
  process.exitCode = 1;
}
