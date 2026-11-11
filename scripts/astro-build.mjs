// Run `astro build` and fail when Astro reports that one page replaced another.
//
// Astro only warns when two routes produce the same page ("conflicts with higher
// priority route") or when a file in public/ takes the place of a page ("Skipping …
// because a file with the same name exists in the public folder"), and builds the
// winner. Either way a page could take over an article or an old wiki address
// without touching the article, so both warnings stop the build here.
// scripts/check-rendered-articles.mjs checks the same routes from the build's output.
//
//   node scripts/astro-build.mjs [astro build options]
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const fatalWarnings = [/conflicts with higher priority route/, /because a file with the same name exists in the public folder/];

const runAsScript = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (runAsScript) {
  const astro = resolve(dirname(createRequire(resolve("package.json")).resolve("astro/package.json")), "bin/astro.mjs");
  const child = spawn(process.execPath, [astro, "build", ...process.argv.slice(2)], { env: { ...process.env, ASTRO_TELEMETRY_DISABLED: "1" }, stdio: ["inherit", "pipe", "pipe"] });
  const found = [];
  const watch = (stream, out) => {
    let pending = "";
    stream.on("data", (chunk) => {
      out.write(chunk);
      pending += chunk.toString();
      const lines = pending.split("\n");
      pending = lines.pop();
      for (const line of lines) if (fatalWarnings.some((pattern) => pattern.test(line))) found.push(line.trim());
    });
    stream.on("end", () => { if (pending && fatalWarnings.some((pattern) => pattern.test(pending))) found.push(pending.trim()); });
  };
  watch(child.stdout, process.stdout);
  watch(child.stderr, process.stderr);
  child.on("close", (code) => {
    if (found.length) {
      console.error(`Build FAILED: a page took the place of another page, which could replace an article or an old wiki address:\n${found.map((line) => `- ${line}`).join("\n")}`);
      process.exitCode = 1;
    } else {
      process.exitCode = code ?? 1;
    }
  });
}
