// Compatibility for exported MediaWiki titles and the earlier /wiki/ preview paths.
export function normalizeFragment(value) {
  let result = value.replace(/^#/, "");
  try { result = decodeURIComponent(result); } catch { /* Keep a malformed saved fragment readable. */ }
  try { result = decodeURIComponent(result.replace(/\.([a-f\d]{2})/gi, "%$1")); } catch { /* MediaWiki also used literal dots. */ }
  return result.normalize("NFKD").replace(/\p{M}/gu, "").replace(/[ _-]+/g, " ").replace(/[^\p{L}\p{N} ]/gu, "").trim().toLowerCase();
}

export function buildLegacyRoutes(articles, headingsByRoute = new Map()) {
  const routes = new Map();
  for (const article of articles) {
    const [targetPath, targetFragment = ""] = article.target.split("#");
    const headings = headingsByRoute.get(targetPath) || [];
    const byNormalized = new Map(headings.flatMap((heading) => [[normalizeFragment(heading.text), heading.slug], [normalizeFragment(heading.slug), heading.slug]]));
    const fragments = Object.create(null);
    const anchors = new Set();
    const mappings = [];
    const remember = (old, destination, kind) => {
      if (!old) return;
      anchors.add(old);
      fragments[old] = destination;
      fragments[normalizeFragment(old)] = destination;
      mappings.push({ old, destination, kind });
    };
    for (const heading of article.headings || []) {
      const explicit = article.fragment_map?.[heading.legacy_id] || article.fragment_map?.[heading.anchor];
      const matching = byNormalized.get(normalizeFragment(heading.text)) || byNormalized.get(normalizeFragment(heading.anchor));
      const destination = explicit ? (explicit.startsWith("/") ? explicit : `${targetPath}#${explicit.replace(/^#/, "")}`) : matching ? `${targetPath}#${matching}` : article.target;
      const kind = explicit ? "explicit" : matching ? "matching-heading" : "topic-section";
      for (const id of [heading.legacy_id, heading.anchor, heading.explicit_source_id]) remember(id, destination, kind);
    }
    for (const explicit of article.explicit_anchors || []) {
      const id = typeof explicit === "string" ? explicit : explicit.id;
      if (id && !anchors.has(id)) remember(id, article.target, "topic-section");
    }
    for (const image of article.image_occurrences || []) {
      if (image.element_id) remember(image.element_id, article.target, "topic-section");
    }
    for (const [old, target] of Object.entries(article.fragment_map || {})) remember(old, target.startsWith("/") ? target : `${targetPath}#${target.replace(/^#/, "")}`, "explicit");
    // Installation anchors existed in the first published preview, even where the export differed.
    const prior = article.title === "Bisq 2" ? ["Installation", "Known_issues_with_installation"] : article.title === "Downloading and installing" ? ["OS-specific_install_notes"] : [];
    for (const id of prior) if (!anchors.has(id)) remember(id, article.target, "topic-section");
    const originalPath = decodeURIComponent(new URL(article.original_url).pathname).replace(/^\/+|\/+$/g, "");
    const paths = new Set([originalPath, article.route.replace(/^\/+|\/+$/g, "")]);
    for (const path of paths) {
      if (!path || path.split("/").some((part) => part === "." || part === "..")) throw new Error(`Unsafe legacy path: ${path}`);
      if (routes.has(path)) throw new Error(`Duplicate legacy path: ${path}`);
      routes.set(path, { path, title: article.title, sourceSlug: article.source_slug || article.slug, target: article.target, targetPath, targetFragment, fragments, anchors: [...anchors], mappings });
    }
  }
  // SEPA/Sepa are distinct MediaWiki titles but collide on common macOS filesystems.
  // Emit identical alias content for case-only paths that lead to the same guide.
  const byCase = new Map();
  for (const route of routes.values()) {
    const key = route.path.toLowerCase();
    if (!byCase.has(key)) byCase.set(key, []);
    byCase.get(key).push(route);
  }
  for (const group of byCase.values()) {
    if (group.length < 2) continue;
    if (new Set(group.map((entry) => entry.targetPath)).size !== 1) throw new Error(`Case-only legacy paths have different destinations: ${group.map((entry) => entry.path).join(", ")}`);
    const primary = [...group].sort((a, b) => b.anchors.length - a.anchors.length)[0];
    const shared = { ...primary, anchors: [...new Set(group.flatMap((entry) => entry.anchors))], fragments: Object.assign({}, ...group.map((entry) => entry.fragments)), mappings: group.flatMap((entry) => entry.mappings) };
    for (const entry of group) routes.set(entry.path, { ...shared, path: entry.path });
  }
  return [...routes.values()];
}

export function resolveLegacyDestination({ base = "", target, fragments }, hash = "") {
  let decoded = hash.replace(/^#/, "");
  try { decoded = decodeURIComponent(decoded); } catch { /* Preserve malformed bookmarks for fallback. */ }
  const normalized = normalizeFragment(decoded);
  const destination = Object.hasOwn(fragments, decoded) ? fragments[decoded] : Object.hasOwn(fragments, normalized) ? fragments[normalized] : target;
  if (typeof destination !== "string" || !destination.startsWith("/") || destination.startsWith("//")) return null;
  return `${base.replace(/\/$/, "")}${destination}`;
}
