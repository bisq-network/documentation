// After `astro build`: tie what the site publishes to what the fidelity gate checked.
//
// - The gate renders articles offline with scripts/lib/render-markdown.mjs (it uses
//   Astro internals). Compare that with the HTML the build itself rendered for every
//   wiki article, read from the build's content store.
// - Each built article page must show exactly that render after the page's string
//   replacements (scripts/lib/article-page.mjs), and its article's IDs must be unique
//   on the page. A page file under src/pages/ or a file in public/ cannot replace an
//   article unnoticed: only known page files may exist, and the built page is compared.
//
// Part of npm run build (and so of the check job and the deployment).
//
//   node scripts/check-rendered-articles.mjs
//
// The build keeps rendered HTML in node_modules/.astro between builds; if a Markdown
// setting changed without the article changing, that copy is stale, and this check
// fails until node_modules/.astro is removed and the site is built again.
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { createRequire } from "node:module";
import { join, relative, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { articlePageContent } from "./lib/article-page.mjs";
import { builtArticleProblems, pageFileProblems } from "./lib/built-pages.mjs";
import { renderArticle } from "./lib/render-markdown.mjs";
import { documentParser, htmlParser } from "./lib/rendered-html.mjs";

const storePath = "node_modules/.astro/data-store.json";
const dist = resolve(process.env.DOCS_DIST || "dist");
// The base path the build used (import.meta.env.BASE_URL), as astro.config.mjs sets it.
const base = process.env.DOCS_BASE || "/";
const filesBelow = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((entry) => (entry.isDirectory() ? filesBelow(join(dir, entry.name)) : [join(dir, entry.name)]));
try {
  if (!existsSync(storePath)) throw new Error(`${storePath} is missing; run astro build first`);
  // The content store is written with devalue, as Astro reads it.
  const require = createRequire(resolve("node_modules/astro/package.json"));
  const { unflatten } = await import(pathToFileURL(require.resolve("devalue")).href);
  const docs = unflatten(JSON.parse(readFileSync(storePath, "utf8"))).get("docs");
  if (!(docs instanceof Map)) throw new Error(`${storePath} has no docs collection`);
  const [parse, parseDocument] = [await htmlParser(), await documentParser()];
  const differ = pageFileProblems(filesBelow("src/pages").map((file) => relative("src/pages", file)).sort());
  if (existsSync("public/wiki")) differ.push("public/wiki/ exists; a file there could replace a published article");
  const files = readdirSync("src/content/docs/wiki").filter((name) => name.endsWith(".md")).sort();
  for (const name of files) {
    const path = `src/content/docs/wiki/${name}`;
    const id = `wiki/${name.replace(/\.md$/, "")}`;
    const entry = docs.get(id);
    if (typeof entry?.rendered?.html !== "string") {
      differ.push(`${path}: not in the build's content store`);
      continue;
    }
    const rendered = await renderArticle(readFileSync(path, "utf8"), path);
    if (entry.filePath !== path) differ.push(`${path}: the build rendered ${entry.filePath} for this route`);
    else if (rendered !== entry.rendered.html) differ.push(`${path}: the offline render differs from the build's`);
    const pageFile = join(dist, id, "index.html");
    if (!existsSync(pageFile)) {
      differ.push(`${path}: the built page ${relative(".", pageFile)} is missing`);
      continue;
    }
    const expected = parse(articlePageContent(rendered, id, base).content);
    const problems = expected.selfContained ? builtArticleProblems(parseDocument(readFileSync(pageFile, "utf8")), expected.nodes) : [expected.problem];
    differ.push(...problems.map((problem) => `${relative(".", pageFile)}: ${problem}`));
  }
  if (differ.length) {
    console.error(`Rendered articles FAILED (${differ.length}): the site does not publish the articles as the fidelity gate checked them. If a Markdown setting changed, remove node_modules/.astro and build again; otherwise the renderer (scripts/lib/render-markdown.mjs, Astro internals) or the page needs fixing.\n${differ.map((line) => `- ${line}`).join("\n")}`);
    process.exitCode = 1;
  } else {
    console.log(`Rendered articles: the offline renderer matches the build, and each built page shows the checked article with unique IDs, for all ${files.length} wiki articles.`);
  }
} catch (error) {
  console.error(`Rendered articles FAILED: ${error.message}`);
  process.exitCode = 1;
}
