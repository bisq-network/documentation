import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { normalizeFragment } from "./legacy-routes.mjs";

const fallback = {
  "/bisq-1/first-trade/": ["taking-an-offer", "creating-a-payment-account", "bisq-1"],
  "/bisq-2/bisq-easy-safety/": ["bisq-easy", "reputation"],
  "/bisq-2/first-trade/": ["bisq-easy"],
  "/bisq-2/install-and-verify/": ["bisq-2", "downloading-and-installing"],
  "/contribute/getting-started/": ["contributor-checklist"],
  "/start/choose-bisq/": ["main-page", "bisq-1", "bisq-2"],
};

// Historical guide sections with a source that was not the mapped section title.
const special = {
  "/bisq-1/finding-your-mediator/": {
    luis3672: "/wiki/finding-your-mediator/#matrix-and-onion-addresses",
    suddenwhipvapor: "/wiki/finding-your-mediator/#matrix-and-onion-addresses",
  },
  "/bisq-1/restoring-data/": {
    "last-resort-reconstruction": "/wiki/last-resort-restore/",
  },
};

export function buildEditedRouteAliases(articles, rows, guidePaths) {
  const bySlug = new Map(articles.map((article) => [article.source_slug || article.slug, article]));
  return guidePaths.map((guidePath) => {
    const relevant = rows.filter((row) => row.target.split("#")[0] === guidePath);
    const slugs = [...new Set(relevant.map((row) => row.source_slug).concat(fallback[guidePath] || []))];
    if (!slugs.length) throw new Error(`No original sources for edited guide ${guidePath}`);
    const choices = slugs.map((slug) => {
      const article = bySlug.get(slug);
      if (!article) throw new Error(`Unknown original ${slug} for ${guidePath}`);
      return { title: article.title, target: article.route };
    });
    const grouped = new Map();
    for (const row of relevant) {
      const fragment = row.target.split("#")[1];
      if (!fragment) continue;
      const article = bySlug.get(row.source_slug);
      const key = normalizeFragment(fragment);
      if (!grouped.has(key)) grouped.set(key, { names: new Set(), targets: new Set() });
      grouped.get(key).names.add(fragment);
      grouped.get(key).targets.add(article.route);
    }
    const fragments = Object.create(null);
    const fragmentChoices = [];
    for (const [key, group] of grouped) {
      const destinations = [...group.targets];
      for (const name of group.names) {
        fragmentChoices.push({ id: name, targets: choices.filter((choice) => destinations.includes(choice.target)) });
        if (destinations.length === 1) fragments[name] = destinations[0];
      }
      if (destinations.length === 1) fragments[key] = destinations[0];
    }
    for (const [name, destination] of Object.entries(special[guidePath] || {})) {
      fragments[name] = destination;
      fragments[normalizeFragment(name)] = destination;
      const original = choices.find((choice) => destination.startsWith(choice.target));
      const replacement = { id: name, targets: [{ title: original?.title || "Original article", target: destination }] };
      const index = fragmentChoices.findIndex((item) => item.id === name);
      if (index === -1) fragmentChoices.push(replacement);
      else fragmentChoices[index] = replacement;
    }
    const autoRedirect = choices.length === 1;
    return {
      path: guidePath.replace(/^\/+|\/+$/g, ""), title: `Earlier guide: ${guidePath.split("/").filter(Boolean).at(-1).replaceAll("-", " ")}`,
      target: autoRedirect ? choices[0].target : "/browse/", targetPath: autoRedirect ? choices[0].target : "/browse/",
      targetFragment: "", fragments, anchors: fragmentChoices.map((item) => item.id), mappings: [],
      choices, fragmentChoices, autoRedirect,
    };
  });
}

export function loadEditedRouteAliases(articles) {
  const root = "review/ai-edited";
  const rows = readdirSync(join(root, "migration")).filter((name) => /^integration-.*\.json$/.test(name))
    .flatMap((name) => JSON.parse(readFileSync(join(root, "migration", name), "utf8")).items);
  const guidePaths = [];
  function walk(dir, prefix = "") {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const relative = `${prefix}${entry.name}`;
      if (entry.isDirectory()) walk(join(dir, entry.name), `${relative}/`);
      else if (/\.md$/.test(entry.name)) guidePaths.push(`/${relative.replace(/(?:^|\/)index\.md$/, "").replace(/\.md$/, "").replace(/\/$/, "")}/`);
    }
  }
  walk(join(root, "guides"));
  return buildEditedRouteAliases(articles, rows, guidePaths);
}
