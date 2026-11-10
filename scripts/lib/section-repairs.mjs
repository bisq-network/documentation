import repairs from "../../migration/section-repairs-20261108.json" with { type: "json" };

/** Repair only individually reviewed source links; all other gaps remain visible. */
export function renderSectionRepairs(html, slug) {
  const relevant = repairs.items.filter((item) => item.source_slug === slug);
  const seen = new Set();

  const content = html.replace(/<a href="\.\.\/([a-z0-9-]+)\/">((?:(?!<\/a>)[\s\S])*?)<\/a>\s*<small class="wiki-link-gap">\[section not recovered: ([^<]+)\]<\/small>/g, (original, target, label, fragment) => {
    const item = relevant.find((entry) => entry.target_slug === target && entry.original_fragment === fragment && entry.link_label_html === label);
    if (!item) return original;
    if (seen.has(item)) throw new Error(`Duplicate section repair: ${slug} ${fragment}`);
    seen.add(item);
    return `<a href="../${target}/#${item.target_fragment}">${label}</a>`;
  });
  if (seen.size !== relevant.length) throw new Error(`Section repair source changed: ${slug}`);
  return { content, restored: seen.size, unresolved: (content.match(/<small class="wiki-link-gap">\[section not recovered:/g) || []).length };
}
