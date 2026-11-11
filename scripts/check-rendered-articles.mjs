// After `astro build`: the fidelity gate checks wording on the HTML that
// scripts/lib/render-markdown.mjs renders offline (it uses Astro internals). Compare
// it with the HTML the build itself rendered for every wiki article, read from the
// build's content store, so the gate never checks anything else than what the site
// publishes. Part of npm run build (and so of the check job and the deployment).
//
//   node scripts/check-rendered-articles.mjs
//
// The build keeps rendered HTML in node_modules/.astro between builds; if a Markdown
// setting changed without the article changing, that copy is stale, and this check
// fails until node_modules/.astro is removed and the site is built again.
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { createRequire } from "node:module";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { renderArticle } from "./lib/render-markdown.mjs";

const storePath = "node_modules/.astro/data-store.json";
try {
  if (!existsSync(storePath)) throw new Error(`${storePath} is missing; run astro build first`);
  // The content store is written with devalue, as Astro reads it.
  const require = createRequire(resolve("node_modules/astro/package.json"));
  const { unflatten } = await import(pathToFileURL(require.resolve("devalue")).href);
  const docs = unflatten(JSON.parse(readFileSync(storePath, "utf8"))).get("docs");
  if (!(docs instanceof Map)) throw new Error(`${storePath} has no docs collection`);
  const files = readdirSync("src/content/docs/wiki").filter((name) => name.endsWith(".md")).sort();
  const differ = [];
  for (const name of files) {
    const path = `src/content/docs/wiki/${name}`;
    const entry = docs.get(`wiki/${name.replace(/\.md$/, "")}`);
    if (typeof entry?.rendered?.html !== "string") {
      differ.push(`${path}: not in the build's content store`);
      continue;
    }
    if (entry.filePath !== path) differ.push(`${path}: the build rendered ${entry.filePath} for this route`);
    else if (await renderArticle(readFileSync(path, "utf8"), path) !== entry.rendered.html) differ.push(`${path}: the offline render differs from the build's`);
  }
  if (differ.length) {
    console.error(`Rendered articles FAILED: the fidelity gate's offline renderer (scripts/lib/render-markdown.mjs) does not match the build for ${differ.length} article${differ.length === 1 ? "" : "s"}. If a Markdown setting changed, remove node_modules/.astro and build again; otherwise the renderer needs fixing (Astro internals may have changed).\n${differ.map((line) => `- ${line}`).join("\n")}`);
    process.exitCode = 1;
  } else {
    console.log(`Rendered articles: the offline renderer matches the build for all ${files.length} wiki articles.`);
  }
} catch (error) {
  console.error(`Rendered articles FAILED: ${error.message}`);
  process.exitCode = 1;
}
