// Render article Markdown exactly as the site build does, without building.
//
// Loads astro.config.mjs and runs the integrations' config-setup hooks (Starlight,
// Expressive Code and src/markdown/wiki-markdown.mjs register their Markdown plugins
// there), then uses the configured processor's renderer: the same call Astro's content
// layer makes for every .md entry (its rendered.html). The result is the article HTML
// before src/components/SourceHistory.astro post-processes it.
//
// The fidelity gate checks wording on this output (scripts/check-source-fidelity.mjs),
// so it must be exactly what the build renders. It uses Astro's internal modules
// (dist/core/...), which are not a public API. Two safeguards:
// - verifiedWith pins the package versions it was checked with; any other installed
//   version stops the gate until someone checks it again and updates the pin;
// - scripts/check-rendered-articles.mjs compares it with the build's own rendered HTML
//   for every article after each `astro build` (npm run build, the check job and the
//   deployment workflow).
//
//   const render = await createSiteMarkdownRenderer();
//   const { html } = await render(fileText, "src/content/docs/wiki/<slug>.md");
//
// The path decides which plugins run (Starlight's and the wiki rules apply only to
// src/content/docs/ and src/content/docs/wiki/), so a preserved copy of an article is
// rendered under the article's own path.
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

/** The packages whose internals the renderer and the HTML parser rely on, at the versions checked against a build. */
export const verifiedWith = {
  astro: "7.4.7",
  "@astrojs/starlight": "0.42.10",
  "@astrojs/markdown-satteri": "0.4.7",
  satteri: "0.11.7",
};

/**
 * The directory of package name as require (a require function) would find it,
 * following Node's node_modules lookup. Some packages export neither package.json
 * nor a main entry, so their directory is looked up rather than resolved.
 */
function packageDir(require, name) {
  for (const modules of require.resolve.paths(name) ?? []) {
    const dir = resolve(modules, name);
    if (existsSync(resolve(dir, "package.json"))) return dir;
  }
  throw new Error(`cannot find the package ${name}`);
}

/** Where the site's packages are: astro, Starlight, Astro's Markdown processor and its Sätteri. */
function sitePackages(root) {
  const astro = packageDir(createRequire(resolve(root, "package.json")), "astro");
  const starlight = packageDir(createRequire(resolve(root, "package.json")), "@astrojs/starlight");
  const processor = packageDir(createRequire(resolve(astro, "package.json")), "@astrojs/markdown-satteri");
  const satteri = packageDir(createRequire(resolve(processor, "package.json")), "satteri");
  return { astro, "@astrojs/starlight": starlight, "@astrojs/markdown-satteri": processor, satteri };
}

/** Installed versions of the packages in verifiedWith, resolved as the site resolves them. */
export function installedVersions(root = process.cwd()) {
  return Object.fromEntries(Object.entries(sitePackages(root)).map(([name, dir]) => [name, JSON.parse(readFileSync(resolve(dir, "package.json"), "utf8")).version]));
}

/** Throw unless the installed packages are the ones verified (verifiedWith by default). */
export function assertVerifiedVersions(root = process.cwd(), expected = verifiedWith) {
  const installed = installedVersions(root);
  const changed = Object.entries(expected).filter(([name, version]) => installed[name] !== version);
  if (changed.length) {
    throw new Error(`the offline Markdown renderer was checked with ${changed.map(([name, version]) => `${name} ${version}`).join(", ")}, but ${changed.map(([name]) => `${name} ${installed[name]}`).join(", ")} is installed. It uses Astro internals: run npm run build (scripts/check-rendered-articles.mjs compares it with the build), then update verifiedWith in scripts/lib/render-markdown.mjs`);
  }
  return installed;
}

/** The Sätteri module of the configured Markdown processor (its htmlToHast parses rendered output). */
export async function loadSatteri(root = process.cwd()) {
  const dir = sitePackages(root).satteri;
  return import(pathToFileURL(createRequire(resolve(dir, "package.json")).resolve("satteri")).href);
}

/** Astro's own front-matter parser (text -> { frontmatter, content }), as the content layer reads .md files. */
export async function loadFrontmatterParser(root = process.cwd()) {
  const astroDir = sitePackages(root).astro;
  const helpers = createRequire(resolve(astroDir, "package.json")).resolve("@astrojs/internal-helpers/frontmatter");
  return (await import(pathToFileURL(helpers).href)).parseFrontmatter;
}

export async function createSiteMarkdownRenderer(root = process.cwd()) {
  assertVerifiedVersions(root);
  const astroDir = sitePackages(root).astro;
  const load = (path) => import(pathToFileURL(resolve(astroDir, path)).href);
  const { resolveConfig } = await load("dist/core/config/config.js");
  const { createSettings } = await load("dist/core/config/settings.js");
  const { runHookConfigSetup, runHookConfigDone } = await load("dist/integrations/hooks.js");
  const { loadOrCreateNodeLogger } = await load("dist/core/logger/load.js");
  const helpers = createRequire(resolve(astroDir, "package.json")).resolve("@astrojs/internal-helpers/frontmatter");
  const { parseFrontmatter } = await import(pathToFileURL(helpers).href);
  process.env.ASTRO_TELEMETRY_DISABLED = "1";
  const inline = { root, logLevel: "error" };
  const { astroConfig } = await resolveConfig(inline, "sync");
  const logger = await loadOrCreateNodeLogger(astroConfig, inline);
  let settings = await createSettings(astroConfig, inline.logLevel, root);
  settings = await runHookConfigSetup({ command: "sync", settings, logger });
  await runHookConfigDone({ settings, logger });
  const { markdown, image } = settings.config;
  const renderer = await markdown.processor.createRenderer({
    image,
    syntaxHighlight: markdown.syntaxHighlight,
    shikiConfig: markdown.shikiConfig,
    gfm: markdown.gfm,
    smartypants: markdown.smartypants,
  });
  return async (text, filePath) => {
    const { frontmatter, content } = parseFrontmatter(text);
    const result = await renderer.render(content, { frontmatter, fileURL: pathToFileURL(resolve(root, filePath)) });
    return { html: result.code, metadata: result.metadata };
  };
}

const renderers = new Map();
const renders = new Map();

/**
 * The rendered HTML of an article's text, as the build renders the file at filePath.
 * One renderer per root, and results cached by path and content, so the gate's
 * repeated checks render each text once.
 */
export async function renderArticle(text, filePath, root = process.cwd()) {
  if (!renderers.has(root)) renderers.set(root, createSiteMarkdownRenderer(root));
  const render = await renderers.get(root);
  const key = `${root}\0${filePath}\0${createHash("sha256").update(text).digest("hex")}`;
  if (!renders.has(key)) renders.set(key, render(text, filePath).then((result) => result.html));
  return renders.get(key);
}
