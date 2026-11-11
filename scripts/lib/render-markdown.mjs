// Render article Markdown exactly as the site build does, without building.
//
// Loads astro.config.mjs and runs the integrations' config-setup hooks (Starlight,
// Expressive Code and src/markdown/wiki-markdown.mjs register their Markdown plugins
// there), then uses the configured processor's renderer: the same call Astro's content
// layer makes for every .md entry (its rendered.html). The result is the article HTML
// before src/components/SourceHistory.astro post-processes it.
//
// This uses Astro's internal modules (dist/core/...), which are not a public API:
// re-check it whenever Astro is upgraded (the tests compare it with a real build).
//
//   const render = await createSiteMarkdownRenderer();
//   const { html } = await render(fileText, "src/content/docs/wiki/<slug>.md");
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";

export async function createSiteMarkdownRenderer(root = process.cwd()) {
  const require = createRequire(resolve(root, "package.json"));
  const astroDir = dirname(require.resolve("astro/package.json"));
  const load = (path) => import(pathToFileURL(resolve(astroDir, path)).href);
  const { resolveConfig } = await load("dist/core/config/config.js");
  const { createSettings } = await load("dist/core/config/settings.js");
  const { runHookConfigSetup, runHookConfigDone } = await load("dist/integrations/hooks.js");
  const { loadOrCreateNodeLogger } = await load("dist/core/logger/load.js");
  const { parseFrontmatter } = await import(pathToFileURL(require.resolve("@astrojs/internal-helpers/frontmatter")).href);
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
