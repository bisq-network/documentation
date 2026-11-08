import archive from "../../migration/archive-templates-20261014.json" with { type: "json" };
import { normalizeWikiTitle } from "./archived-redirects.mjs";

const templates = new Map(archive.items.map((item) => [normalizeWikiTitle(item.template_normalized_name), item]));
const escape = (value) => String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

export function templateDefinitionTarget(title) {
  if (!title.startsWith("Template:")) return null;
  return templates.get(normalizeWikiTitle(title.slice("Template:".length)))?.source_download || null;
}

export function renderArchivedTemplates(html, base = "/") {
  let pending = 0;
  let unresolved = 0;
  const prefix = base.replace(/\/$/, "");
  const content = html.replace(/<span class="wiki-template-gap" role="note"><strong>\[Unresolved template: ([^<]+)\]<\/strong> ([\s\S]*?)<\/span>/g, (original, name, invocation) => {
    const item = templates.get(normalizeWikiTitle(name));
    if (!item) { unresolved++; return original; }
    pending++;
    return `<span class="wiki-template-gap" role="note"><strong>[Recovered template: <a href="${escape(prefix + item.source_download)}">${name}</a>; inline rendering pending]</strong> ${invocation}</span>`;
  });
  return { content, pending, unresolved };
}
