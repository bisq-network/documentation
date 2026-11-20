// Build-time helpers for the old-link pages (src/pages/[...legacy].astro): old wiki titles such as
// /Arbitration/ that send the reader on to the article, and the earlier edited guides such as
// /bisq-1/faq/ that offer the original articles instead. Those pages stand alone (no Starlight
// layout), so this module also gives them the site's colours and the redirect that runs in <head>.
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { normalizeFragment, resolveLegacyDestination } from "../../scripts/lib/legacy-routes.mjs";

/**
 * The script that runs first in <head>, before anything is painted: it applies the reader's theme as
 * the site does (the stored "starlight-theme", else the system's), then resolves the address and its
 * #fragment with resolveLegacyDestination() from scripts/lib/legacy-routes.mjs (the same code, inlined)
 * and replaces the page with the destination. While it leaves, the page stays blank in the reader's
 * theme; if the destination has not opened after 3 seconds the page shows itself.
 */
export function legacyHeadScript() {
  return `(() => {
const root = document.documentElement;
let stored = null;
try { stored = localStorage.getItem("starlight-theme"); } catch {}
root.dataset.theme = stored === "light" || stored === "dark" ? stored : matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
${normalizeFragment.toString()}
${resolveLegacyDestination.toString()}
let next = null;
try { next = resolveLegacyDestination(JSON.parse(document.getElementById("legacy-destination").textContent), location.hash); } catch {}
if (!next) return;
root.dataset.redirecting = "";
setTimeout(() => { delete root.dataset.redirecting; }, 3000);
document.addEventListener("DOMContentLoaded", () => document.getElementById("continue-to-guide")?.setAttribute("href", next));
location.replace(next);
})();`;
}

/** The colour, type and spacing tokens these pages use, as custom.css defines them. */
export const TOKENS = [
  "sl-color-bg", "sl-color-bg-sidebar", "bd-raised", "sl-color-text", "sl-color-gray-2", "sl-color-gray-3",
  "sl-color-text-accent", "sl-color-accent", "sl-color-accent-low", "bd-accent-hover", "bd-on-accent",
  "sl-color-hairline-light", "sl-color-hairline", "bd-control-line",
  "sl-font", "bd-fs-xs", "bd-fs-sm", "bd-fs-ui", "bd-fs-body", "bd-fs-h1", "bd-lh-sm", "bd-lh-body", "bd-lh-h1",
  "bd-space-1", "bd-space-2", "bd-space-3", "bd-space-4", "bd-space-5", "bd-space-6", "bd-space-7", "bd-space-8",
  "bd-radius-sm", "bd-radius-md", "bd-radius-lg", "bd-dur-fast", "bd-ease-standard",
];

/** The declarations of the first `selector { … }` rule in `css`. */
function ruleBody(css, selector) {
  const start = css.indexOf(`${selector} {`);
  if (start === -1) throw new Error(`custom.css has no ${selector} rule`);
  return css.slice(start + selector.length + 2, css.indexOf("}", start));
}

/**
 * The site's design tokens (dark by default, light under data-theme="light" and, without scripts,
 * for a light system), copied from custom.css when the site is built, so these pages keep the
 * site's palette when it changes.
 */
export function themeTokenCss(siteCss) {
  const pick = (body) => TOKENS.flatMap((name) => {
    const value = body.match(new RegExp(`--${name}:\\s*([^;]+);`))?.[1]?.trim();
    return value ? [`--${name}: ${value};`] : [];
  }).join(" ");
  const dark = pick(ruleBody(siteCss, ":root"));
  const light = pick(ruleBody(siteCss, ':root[data-theme="light"]'));
  for (const name of TOKENS) if (!dark.includes(`--${name}:`)) throw new Error(`custom.css :root has no --${name}`);
  return [
    `:root { color-scheme: dark; ${dark} }`,
    `:root[data-theme="light"] { color-scheme: light; ${light} }`,
    `@media (prefers-color-scheme: light) { :root:not([data-theme]) { color-scheme: light; ${light} } }`,
  ].join("\n");
}

/** An old section ID as words: Process,_In_Detail → "Process, In Detail"; where-to-go-next → "Where to go next". */
export function readableId(id) {
  let text = id;
  // MediaWiki wrote some characters in IDs as .XX (Don.27t for Don't).
  try { text = decodeURIComponent(text.replace(/\.([0-9A-F]{2})/g, "%$1")); } catch { /* keep as written */ }
  // The site's own figure IDs (source-image-3) from the earlier preview.
  const figure = /^source-image-(\d+)$/.exec(text);
  if (figure) return `Image ${figure[1]}`;
  if (/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(text)) {
    text = text.replaceAll("-", " ");
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
  return text.replaceAll("_", " ").trim();
}

/** Of several IDs for one section, the one as the wiki wrote it (capitals or underscores) rather than a slug. */
const preferredId = (ids) => ids.find((id) => /[A-Z_]/.test(id)) ?? ids[0];

/**
 * The saved sections of an old wiki title, each listed once. The wiki's ID (Avoiding_Fraud) and the
 * slug (avoiding-fraud) of one section lead to the same place, so they form one entry, named by the
 * heading it leads to; every ID stays on the entry so a saved #fragment still finds it without scripts.
 */
export function titleSections({ anchors = [], fragments = {}, target }, headingsByRoute = new Map()) {
  const groups = new Map();
  for (const id of anchors) {
    const href = fragments[id] || target;
    const [path, fragment] = href.split("#");
    const heading = fragment ? headingsByRoute.get(path)?.find((item) => item.slug === fragment) : undefined;
    // Sections without a heading of their own (they lead to the top of the article) stay apart by name.
    const key = heading ? href : `${href}\n${normalizeFragment(id)}`;
    if (!groups.has(key)) groups.set(key, { ids: [], href, heading: heading?.text?.trim() });
    groups.get(key).ids.push(id);
  }
  return [...groups.values()].map(({ ids, href, heading }) => ({ ids, href, label: heading || readableId(preferredId(ids)) }));
}

/** Front matter title and section headings of an earlier edited guide, kept under review/ai-edited/guides/. */
export function earlierGuide(path, root = "review/ai-edited/guides") {
  const file = [join(root, `${path}.md`), join(root, path, "index.md")].find((candidate) => existsSync(candidate));
  const fallback = readableId(path.split("/").filter(Boolean).at(-1) ?? path);
  if (!file) return { title: fallback, headings: [] };
  const text = readFileSync(file, "utf8");
  const raw = text.match(/^---\n[\s\S]*?^title:\s*(.+?)\s*$/m)?.[1];
  let title = raw ?? fallback;
  if (/^".*"$/.test(title)) { try { title = JSON.parse(title); } catch { title = title.slice(1, -1); } }
  else if (/^'.*'$/.test(title)) title = title.slice(1, -1).replaceAll("''", "'");
  const headings = [];
  let fenced = false;
  for (const line of text.split("\n")) {
    if (/^\s*(```|~~~)/.test(line)) fenced = !fenced;
    const match = !fenced && line.match(/^#{2,6}\s+(.+?)\s*#*\s*$/);
    if (match) headings.push(match[1].replace(/\s*\{#[^}]*\}$/, "").replace(/\[([^\]]*)\]\([^)]*\)/g, "$1").replace(/[*`]/g, "").trim());
  }
  return { title: title.trim() || fallback, headings };
}

/**
 * The saved sections of an earlier guide, each listed once with the original articles it now
 * corresponds to, named by the guide's own heading where one matches.
 */
export function guideSections(fragmentChoices = [], headings = []) {
  const named = new Map(headings.map((text) => [normalizeFragment(text), text]));
  const groups = new Map();
  for (const { id, targets } of fragmentChoices) {
    const key = normalizeFragment(id);
    if (!groups.has(key)) groups.set(key, { ids: [], targets: [] });
    const group = groups.get(key);
    group.ids.push(id);
    for (const choice of targets) if (!group.targets.some((item) => item.target === choice.target)) group.targets.push(choice);
  }
  return [...groups.entries()].map(([key, { ids, targets }]) => ({ ids, targets, label: named.get(key) || readableId(preferredId(ids)) }));
}
