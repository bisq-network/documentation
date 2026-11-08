import archive from "../../migration/archive-redirects-20261014.json" with { type: "json" };

/** Normalize wiki titles using MediaWiki first-letter case and equivalent spaces. */
export function normalizeWikiTitle(title) {
  const text = title.replaceAll("_", " ").trim().replace(/\s+/g, " ");
  return text ? text[0].toUpperCase() + text.slice(1) : text;
}

/** Resolve a recorded fragment only when it identifies one exact target anchor. */
function exactFragment(article, fragment) {
  if (!fragment) return "";
  let decoded = fragment;
  try { decoded = decodeURIComponent(decoded.replace(/\.([a-f\d]{2})/gi, "%$1")); } catch { return null; }
  const candidate = decoded.replaceAll(" ", "_");
  const matches = new Set();
  for (const h of article.headings || []) {
    if ([h.anchor, h.legacy_id, h.explicit_source_id].includes(candidate)) matches.add(h.anchor);
  }
  for (const entry of article.rendered_explicit_anchors || []) {
    const id = typeof entry === "string" ? entry : entry.id;
    if (id === candidate) matches.add(id);
  }
  return matches.size === 1 ? [...matches][0] : null;
}

/** Resolve preserved redirect chains, rejecting ambiguity and cycles. */
export function resolveArchivedRedirects(articles, records = archive.items) {
  const canonical = new Map();
  for (const article of articles) {
    const key = normalizeWikiTitle(article.title);
    if (canonical.has(key)) throw new Error(`Ambiguous current wiki title: ${key}`);
    canonical.set(key, article);
  }
  const redirects = new Map();
  for (const entry of records) {
    const preservedTail = articles.find((article) => article.source_has_substantive_redirect_tail && normalizeWikiTitle(article.title) === normalizeWikiTitle(entry.source_title) && article.wikitext_sha256 === entry.wikitext_sha256);
    if ((!entry.is_pure_redirect || entry.has_substantive_trailing_body) && !preservedTail) continue;
    const key = normalizeWikiTitle(entry.source_title);
    if (redirects.has(key)) throw new Error(`Ambiguous archive redirect: ${key}`);
    redirects.set(key, entry);
  }
  const resolved = [];
  const unresolved = [];
  for (const entry of redirects.values()) {
    const seen = new Set();
    const chain = [];
    let current = entry;
    let fragment = "";
    while (current) {
      const key = normalizeWikiTitle(current.source_title);
      if (seen.has(key)) throw new Error(`Archived redirect cycle: ${[...seen, key].join(" → ")}`);
      seen.add(key); chain.push(current.source_title);
      if (current.target_fragment) {
        if (fragment && fragment !== current.target_fragment) { current = null; break; }
        fragment = current.target_fragment;
      }
      const target = normalizeWikiTitle(current.target_title);
      const article = canonical.get(target);
      if (article) {
        const anchor = exactFragment(article, fragment);
        if (anchor === null) { current = null; break; }
        resolved.push({ name: entry.source_title, target: article.route + (anchor ? `#${anchor}` : ""), evidence: `Archived redirect from ${archive.capture_date}: ${chain.join(" → ")} → ${article.title}`, archive: entry, chain });
        current = null; break;
      }
      current = redirects.get(target);
    }
    if (!resolved.some((item) => item.archive === entry)) unresolved.push(entry.source_title);
  }
  return { resolved, unresolved };
}
