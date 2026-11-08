import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { templateDefinitionTarget } from "./archived-templates.mjs";
import scopedLinkRepairs from "../../migration/scoped-link-repairs-20261108.json" with { type: "json" };
import mediaSupplement from "../../recovery-evidence/supplemental-media.json" with { type: "json" };
import articlesData from "../../migration/articles.json" with { type: "json" };
import { normalizeWikiTitle, resolveArchivedRedirects } from "./archived-redirects.mjs";
import disputeEvidence from "../../migration/recovered-dispute-alias-evidence.json" with { type: "json" };

// Each entry identifies a recovered wiki target, not a change to article text.
// Sources record why the old target refers to this particular original article.
export const recoveredAliases = [
  { name: "rading rules", target: "/wiki/trading-rules/", evidence: "Account limits calls this link trading rules, the title of the recovered article." },
  { name: "TransferWise", target: "/wiki/wise/", evidence: "The original How do I send fiat to Bisq article says Wise was formerly TransferWise." },
  { name: "ACH", target: "/wiki/ach-transfer/", evidence: "Domestic Wire Transfer calls ACH the other US bank transfer method; the recovered ACH Transfer article documents that method." },
  { name: "Delete and resync SPV file", target: "/wiki/resyncing-spv-file/", evidence: "Troubleshooting cites resync to fix an incorrect balance; Resyncing SPV file describes the same operation." },
  { name: "Reduce JVM MAXRam", target: "/wiki/reducing-memory-usage/", evidence: "Troubleshooting links a JVM RAM cap; Reducing memory usage documents that setting." },
  { name: "DAO", target: "/wiki/decentralized-autonomous-organization/", evidence: "Teams and Trading fees use DAO for Bisq governance, as defined by the recovered decentralized autonomous organization article." },
  { name: "Altcoins Instant this article", target: "/wiki/altcoins-instant/", evidence: "Paying trading fees with BSQ uses a malformed title when linking to the instant altcoin payment account." },
  { name: "Burning Ben", target: "/wiki/burning-men/", evidence: "Contributor privacy and opsec uses this singular name under Burning Men considerations." },
  { name: "Create a payment account", target: "/wiki/creating-a-payment-account/", evidence: "Three payment-method articles link the account-creation procedure documented by Creating a payment account." },
  { name: "update BSQ trading fees", target: "/wiki/updating-bsq-trading-fees/", evidence: "Trading fees links its update process, documented in Updating BSQ trading fees." },
  { name: "Bisq 2 mobile", target: "/wiki/bisq-2-mobile-applications/", evidence: "Bisq 2 links from its mobile-version context to the mobile application subject; an archived page marks the title as a redirect." },
  { name: "role", target: "/wiki/roles/", evidence: "Support Team Lead describes its subject as a role; the recovered Roles article describes contributor roles." },
  { name: "Role", target: "/wiki/roles/", evidence: "Security Team Lead describes its subject as a role; the recovered Roles article describes contributor roles." },
];

// Paths and one-based line numbers refer to unchanged public/wiki-source files.
export const aliasSourceEvidence = {
  "rading rules": ["account-limits:176", "trading-rules:1"],
  "TransferWise": ["how-do-i-send-fiat-to-bisq:12", "wise:1"],
  "ACH": ["domestic-wire-transfer:3", "payment-methods:29", "ach-transfer:1"],
  "role": ["support-team-lead:1", "bitcointalk-moderator:6", "roles:1"],
  "Role": ["security-team-lead:1", "roles:1"],
  "Altcoins Instant this article": ["paying-trading-fees-with-bsq:28", "altcoins-instant:1"],
  "Burning Ben": ["contributor-privacy-and-opsec:64", "burning-men:1"],
  "Create a payment account": ["us-postal-money-order:27", "revolut:41", "taking-an-offer:2", "creating-a-payment-account:1"],
  "update BSQ trading fees": ["trading-fees:7", "updating-bsq-trading-fees:1"],
  "Bisq 2 mobile": ["bisq-2:1", "bisq-2-mobile-applications:1"],
  "Delete and resync SPV file": ["troubleshooting:13", "resyncing-spv-file:1"],
  "Reduce JVM MAXRam": ["troubleshooting:17", "reducing-memory-usage:5"],
  "DAO": ["teams:3", "trading-fees:1", "decentralized-autonomous-organization:1"],
};

/** Combine contextual repairs with authoritative archived redirect destinations. */
export function allRecoveredAliases(articles = articlesData.items) {
  const aliases = new Map(recoveredAliases.map((item) => [normalizeWikiTitle(item.name), item]));
  // A recorded redirect takes precedence over a topic-based repair.
  for (const item of resolveArchivedRedirects(articles).resolved) aliases.set(normalizeWikiTitle(item.name), item);
  return [...aliases.values()];
}

const escapeHtml = (value) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("'", "&#x27;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

/** Validate repair evidence, source lines and exact destination fragments. */
export function validateRecoveredAliases(aliases = recoveredAliases) {
  const names = new Set();
  for (const alias of aliases) {
    if (!alias.name || names.has(alias.name) || !alias.evidence || !/^\/wiki\/[a-z0-9-]+\/(?:#[a-zA-Z0-9_.:%-]+)?$/.test(alias.target)) throw new Error(`Invalid recovered alias: ${alias.name}`);
    names.add(alias.name);
    if (!aliasSourceEvidence[alias.name]?.length) throw new Error(`Missing alias evidence: ${alias.name}`);
    for (const reference of aliasSourceEvidence[alias.name]) {
      const parsed = reference.match(/^([a-z0-9-]+):(\d+)$/);
      if (!parsed) throw new Error(`Invalid source reference: ${reference}`);
      const sourceLines = readFileSync(resolve(process.cwd(), `public/wiki-source/${parsed[1]}.wiki.txt`), "utf8").split("\n");
      if (!sourceLines[Number(parsed[2]) - 1]) throw new Error(`Missing source line: ${reference}`);
    }
    const [route, fragment] = alias.target.split("#");
    const slug = route.slice("/wiki/".length, -1);
    const content = readFileSync(resolve(process.cwd(), `src/content/docs/wiki/${slug}.md`), "utf8");
    if (fragment && !content.includes(`id="${fragment}"`)) throw new Error(`Missing exact alias fragment: ${alias.name} ${fragment}`);
  }
  const scopedSlugs = new Set();
  for (const item of disputeEvidence.items) {
    if (!/^[a-z0-9-]+$/.test(item.slug) || scopedSlugs.has(item.slug) || item.target !== "/wiki/dispute-resolution-in-bisq-1/" || !item.reason || !item.source_lines?.length) throw new Error(`Invalid scoped evidence: ${item.slug}`);
    scopedSlugs.add(item.slug);
    const lines = readFileSync(resolve(process.cwd(), `public/wiki-source/${item.slug}.wiki.txt`), "utf8").split("\n");
    if (item.source_lines.some((line) => !Number.isInteger(line) || line < 1 || line > lines.length) || !item.source_lines.some((line) => /\[\[[Dd]ispute[ _]resolution/.test(lines[line - 1]))) throw new Error(`Invalid source lines: ${item.slug}`);
  }
  readFileSync(resolve(process.cwd(), "src/content/docs/wiki/dispute-resolution-in-bisq-1.md"), "utf8");
}

/** Restore supported links only when their source targets have no lost fragments. */
export function renderRecoveredLinks(html, base = "/", aliases = allRecoveredAliases(), sourceSlug = "", sourceText) {
  if (sourceText === undefined) {
    if (!/^[a-z0-9-]+$/.test(sourceSlug)) throw new Error(`Invalid source slug: ${sourceSlug}`);
    sourceText = readFileSync(resolve(process.cwd(), `public/wiki-source/${sourceSlug}.wiki.txt`), "utf8");
  }
  // The old converter omitted fragments from marker labels. Never infer one: all
  // occurrences of this title in the actual source must be fragment-free.
  const originalTargets = new Map();
  for (const match of sourceText.matchAll(/\[\[([^\]|]+)(?:\|[^\]]*)?\]\]/g)) {
    let target = match[1].trim().replaceAll("_", " ");
    try { target = decodeURIComponent(target); } catch { /* Keep undecodable source literal. */ }
    const [rawTitle, ...fragment] = target.split("#");
    const title = normalizeWikiTitle(rawTitle);
    if (!originalTargets.has(title)) originalTargets.set(title, []);
    originalTargets.get(title).push(fragment.length > 0);
  }
  const lookup = new Map(aliases.map((entry) => [escapeHtml(normalizeWikiTitle(entry.name)), entry]));
  const prefix = base.replace(/\/$/, "");
  let resolved = 0;
  let unresolved = 0;
  const content = html.replace(/<span class="wiki-link-gap">([\s\S]*?) <small>\[unrecovered article: ([\s\S]*?)\]<\/small><\/span>/g, (match, label, target) => {
    const scoped = /^(?:dispute resolution|Dispute resolution)$/.test(target) && disputeEvidence.items.find((item) => item.slug === sourceSlug);
    const resource = mediaSupplement.linked_resources?.find((item) => normalizeWikiTitle(item.source_target) === normalizeWikiTitle(target));
    const template = templateDefinitionTarget(target);
    const reviewed = scopedLinkRepairs.items.find((item) => item.source_slug === sourceSlug && item.original_title === target);
    const alias = lookup.get(normalizeWikiTitle(target)) || scoped || (resource && { target: resource.asset_path }) || (template && { target: template }) || reviewed;
    const originals = originalTargets.get(normalizeWikiTitle(target));
    if (!alias || !originals?.length || originals.some(Boolean)) { unresolved++; return `<span class="wiki-link-gap">${label} <small>[unresolved link: ${target}]</small></span>`; }
    resolved++;
    const external = alias.target.startsWith("https://");
    return `<a href="${escapeHtml(external ? alias.target : prefix + alias.target)}"${external ? ' rel="noopener noreferrer"' : ""}>${label}</a>`;
  });
  return { content, resolved, unresolved };
}

/** Build safe legacy routes for reviewed aliases without conflicting destinations. */
export function buildRecoveredAliasRoutes(articles, legacyRoutes, aliases = allRecoveredAliases(articles)) {
  const occupied = new Map(legacyRoutes.map((route) => [route.path.toLowerCase(), route]));
  const result = [];
  for (const alias of aliases) {
    const [targetPath, targetFragment] = alias.target.split("#");
    const article = articles.find((item) => item.route === targetPath);
    if (!article) throw new Error(`Alias destination missing: ${alias.name}`);
    const original = legacyRoutes.find((entry) => entry.targetPath === targetPath);
    if (!original) throw new Error(`Alias original route missing: ${alias.name}`);
    const path = alias.name.replaceAll(" ", "_");
    if (!path || path.includes("/") || path === "." || path === "..") throw new Error(`Unsafe alias path: ${path}`);
    const collision = occupied.get(path.toLowerCase());
    if (collision && collision.target !== alias.target) throw new Error(`Conflicting alias path: ${path}`);
    if (collision?.path === path) continue;
    const entry = { ...original, path, target: alias.target, targetFragment: targetFragment || "", strictFragments: true };
    result.push(entry);
    occupied.set(path.toLowerCase(), entry);
  }
  return result;
}
