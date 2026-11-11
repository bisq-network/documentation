import { verifyAdditionalArticles } from "./lib/additional-articles.mjs";
import { acceptedEditsPath, applyAcceptedEdit, parseAcceptedEdits, pullRequestLabel, receiptFilesIn, receiptsDir, undoAcceptedEdit } from "./lib/accepted-edits.mjs";
import { articlePath, formatDifference, markdownFormatPath, parseMarkdownFormat, preservedArticlePath, preservedArticlesDir } from "./lib/markdown-format.mjs";
import { renderArticle } from "./lib/render-markdown.mjs";
import { attributeValue, classes, commentsOf, elementsOf, htmlParser, serialize, splitRenderedArticle, startTag, textContent } from "./lib/rendered-html.mjs";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import { dirname, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

// This checks the source restoration, not whether historical advice is current.
// Its trusted baselines are the committed manifests and the preserved restored
// articles in migration/restored-articles/; no external scratch files, network
// requests, Git checkout or build are required (the installed packages are, to
// render Markdown exactly as the site does: scripts/lib/render-markdown.mjs).
//
// Each article is a chain from its preserved restored original, every link checked:
// - accepted edits: a human-approved wording change is accepted only through a
//   receipt in migration/accepted-edits/, whose recorded original text must rebuild
//   the file it was based on exactly;
// - at most one Markdown conversion (migration/markdown-format.json): the Markdown
//   must render to the same page as the HTML it replaced (scripts/lib/markdown-format.mjs).
// The original is then checked as before, and every edit is compared with the file
// it changed on the rendered page (checkAcceptedStructure).
//
// By default a wording change without a receipt fails. Only the pull request
// check passes --awaiting-receipt-base <dir>, a copy of the pull request's base
// articles: an unreceipted edit then counts as awaiting a receipt, not as a
// failure, if its base file in <dir> is exactly the end of its chain (the
// restored article, its Markdown conversion or its last accepted edit), passes
// every check above, and the edit keeps everything a receipt would still require
// (see checkAcceptedStructure). The receipts job fails while any article awaits a
// receipt.
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = "migration/restoration-fidelity.json";
const snapshotPath = "review/ai-edited/snapshot.json";
const formattingPath = "migration/source-formatting.json";
const hash = (value) => createHash("sha256").update(value).digest("hex");
const short = (digest) => `${digest.slice(0, 12)}…`;
const escapeHtml = (value) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;")
  .replaceAll("'", "&#x27;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const decodeHtml = (value) => value.replace(/&(#x[\da-f]+|#\d+|amp|lt|gt|quot|apos);/gi, (whole, entity) => {
  if (entity.startsWith("#")) {
    const hexadecimal = entity[1].toLowerCase() === "x";
    return String.fromCodePoint(parseInt(entity.slice(hexadecimal ? 2 : 1), hexadecimal ? 16 : 10));
  }
  return { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'" }[entity.toLowerCase()] ?? whole;
});
const authorText = (body) => decodeHtml(body.replace(/<[^>]*>/g, ""));

function articleBody(text) {
  const marker = '<div class="wiki-recovered-article"';
  const start = text.indexOf(marker);
  assert(start >= 0, "missing original article container");
  assert.equal(text.indexOf(marker, start + marker.length), -1, "duplicate article container");
  let depth = 0;
  for (const match of text.slice(start).matchAll(/<\/?div\b[^>]*>/g)) {
    depth += match[0].startsWith("</") ? -1 : 1;
    if (depth === 0) return text.slice(start, start + match.index + match[0].length);
  }
  throw new Error("unclosed original article container");
}

function restoreRecordedFormatting(text, record) {
  if (!record) return text;
  assert.equal(hash(text), record.formatted_file_sha256, "formatted source file drift");
  const offsets = record.decoded_newline_offsets;
  assert(Array.isArray(offsets), "missing exact formatting offsets");
  assert.equal(offsets.length, record.decoded_newline_entities, "recorded line-break count changed");
  assert.deepEqual(offsets, [...new Set(offsets)].sort((a, b) => a - b), "formatting offsets must be unique and ordered");
  let restored = text;
  for (const offset of [...offsets].reverse()) {
    assert(Number.isSafeInteger(offset) && offset >= 0 && offset < text.length, "invalid formatting offset");
    assert.equal(restored[offset], "\n", "recorded line break moved");
    restored = restored.slice(0, offset) + "&#10;" + restored.slice(offset + 1);
  }
  assert.equal(hash(restored), record.original_file_sha256, "source formatting no longer reconstructs the original bytes");
  return restored;
}

function normalizeRecordedAnchors(body, anchors) {
  let normalized = body;
  for (const anchor of anchors) {
    const exact = `<span class="wiki-legacy-anchor" id="${escapeHtml(anchor.legacy_id)}" aria-hidden="true"></span>`;
    assert.equal(anchor.exact_added_span, exact, "anchor record must describe an empty metadata span");
    const position = normalized.indexOf(exact);
    assert(position >= 0, `missing recorded legacy anchor ${anchor.legacy_id}`);
    assert.equal(normalized.indexOf(exact, position + exact.length), -1, `duplicate legacy anchor ${anchor.legacy_id}`);
    const following = normalized.slice(position + exact.length);
    const heading = following.match(/^<h[2-6]\b[^>]*\bid="([^"]+)"[^>]*>/);
    assert.equal(decodeHtml(heading?.[1] ?? ""), anchor.stable_id, `legacy anchor ${anchor.legacy_id} moved away from its heading`);
    normalized = normalized.slice(0, position) + following;
  }
  // No generic tag removal, whitespace normalization or entity decoding here.
  return normalized;
}

/** Split a source file into its article body and everything around it. */
function splitArticle(text) {
  const body = articleBody(text);
  const start = text.indexOf(body);
  return { body, outside: `${text.slice(0, start)}\0${text.slice(start + body.length)}` };
}
const idsOf = (body) => [...body.matchAll(/\bid="([^"]+)"/g)].map((match) => decodeHtml(match[1]));
const clip = (value) => (value.length > 90 ? `${value.slice(0, 90)}…` : value);

// What an accepted wording edit may add or remove: lowercase inline markup,
// paragraphs and list items, new IDs, and links to http(s), relative or same-page
// targets. Anything else (other elements, attributes such as hidden, style or on*)
// could add, hide or run content and needs its own policy.
const editableTags = new Set(["a", "strong", "em", "b", "i", "code", "br", "p", "ul", "ol", "li"]);
const editableList = "plain a, strong, em, b, i, code, br, p, ul, ol and li markup";
const linkTarget = /^(?:https?:\/\/|\.\.\/|#)/;

// The source-level rules of an HTML article, compared tag by tag with its base
// (checkSourceStructure). They apply while both files are HTML, a single raw HTML
// block; the rendered checks in checkAcceptedStructure apply to every edit.
// An empty span that only carries an ID (a moved or legacy anchor) cannot hold content.
const anchorPlaceholder = /<span(?:\s+(?:id="[^"<>]*"|class="wiki-legacy-anchor"|aria-hidden="true"))+\s*><\/span>/g;
const tagsOf = (body) => body.replace(anchorPlaceholder, "").match(/<\/?[A-Za-z][^>]*>/g) ?? [];
function changedTags(before, after) {
  const counts = new Map();
  for (const tag of tagsOf(before)) counts.set(tag, (counts.get(tag) ?? 0) - 1);
  for (const tag of tagsOf(after)) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  return [...counts].filter(([, count]) => count !== 0).map(([tag]) => tag);
}
function editableTag(tag) {
  const match = /^<(\/?)([a-z]+)((?:\s+[a-z]+="[^"<>]*")*)\s*\/?>$/.exec(tag);
  if (!match || !editableTags.has(match[2])) return false;
  const attributes = [...match[3].matchAll(/\s+([a-z]+)="([^"]*)"/g)].map(([, name, value]) => ({ name, value }));
  const names = attributes.map(({ name }) => name);
  if (new Set(names).size !== names.length) return false;
  if (match[1]) return names.length === 0;
  // New IDs are allowed (duplicates are rejected above); links also take href and rel.
  if (match[2] !== "a") return names.every((name) => name === "id");
  if (!names.length) return true; // a bare <a> links nowhere
  return names.includes("href") && names.every((name) => ["href", "rel", "id"].includes(name))
    && attributes.every(({ name, value }) => name !== "href" || linkTarget.test(value));
}
const occurrences = (body, pattern) => body.match(pattern)?.length ?? 0;

/**
 * The same rule for an element of the rendered page (attributes unescaped). Inline
 * code may also carry dir="auto": Starlight adds it to Markdown inline code.
 */
function editableElement(element) {
  if (!editableTags.has(element.tag) || element.attrs.some(([, value]) => value === null)) return false;
  const names = element.attrs.map(([name]) => name);
  if (element.tag === "code") return names.every((name) => name === "id" || (name === "dir" && attributeValue(element, "dir") === "auto"));
  if (element.tag !== "a") return names.every((name) => name === "id");
  if (!names.length) return true; // a bare <a> links nowhere
  return names.includes("href") && names.every((name) => ["href", "rel", "id"].includes(name)) && linkTarget.test(attributeValue(element, "href"));
}
// An empty span that only carries an ID (a moved or legacy anchor) cannot hold content;
// in Markdown it may hold the line break that keeps it an HTML block.
const anchorSpan = (element) => element.tag === "span" && attributeValue(element, "id") !== undefined
  && element.attrs.every(([name]) => name === "id" || (name === "class" && attributeValue(element, "class") === "wiki-legacy-anchor") || (name === "aria-hidden" && attributeValue(element, "aria-hidden") === "true"))
  && element.children.every((child) => child.type === "text" && !/[^\t\n\f\r ]/.test(child.value));
const headingTag = /^h[1-6]$/;

// Stands in for the receipt of an edit that has none yet. Its alt-text changes
// are reported instead, because the receipt will have to list those figures.
const awaitingLabel = "The edit awaiting a receipt";
const noReceipt = { changed_image_alt_text: [] };
const figureId = /^source-image-\d+$/;
const containerMarker = '<div class="wiki-recovered-article"';

/** The source up to and including the article container's start tag: front matter, title and contents list. */
function sourcePrefix(text) {
  const start = text.indexOf(containerMarker);
  assert(start >= 0, "missing original article container");
  assert.equal(text.indexOf(containerMarker, start + containerMarker.length), -1, "duplicate article container");
  const end = text.indexOf(">", start);
  assert(end >= 0, "unclosed article container tag");
  return text.slice(0, end + 1);
}

/** The rendered article of a file's text, as the site renders the article at path. */
async function renderedArticle(text, path, pr) {
  let html;
  try { html = await renderArticle(text, path, root); } catch (error) { throw new Error(`${pr} does not render: ${error.message}`); }
  const tree = (await htmlParser(root))(html);
  assert(tree.selfContained, `${pr} leaves an element open, closes one it did not open, or carries formatting past the article, changing the page around it`);
  return splitRenderedArticle(tree.nodes);
}

/**
 * The source-level checks of an edit while base and edit are both HTML: today's
 * rules, compared tag by tag in the source. Rendered checks follow in
 * checkAcceptedStructure.
 */
function checkSourceStructure(base, edited, item, receipt, pr) {
  const before = splitArticle(base);
  const after = splitArticle(edited);
  assert(before.outside === after.outside, `${pr} changes text outside the article body (front matter, title, contents list or wrapper)`);
  assert(after.body.match(/^<div\b[^>]*>/)[0] === before.body.match(/^<div\b[^>]*>/)[0], `${pr} changes the article container`);
  const headings = (body) => [...body.matchAll(/<h([2-6])\b[^>]*>[\s\S]*?<\/h\1>/g)].map((match) => match[0]);
  const [oldHeadings, newHeadings] = [headings(before.body), headings(after.body)];
  const changed = [...oldHeadings, ...newHeadings].findIndex((_, index) => oldHeadings[index] !== newHeadings[index]);
  assert(changed < 0, `${pr} changes heading ${changed + 1} (${clip(oldHeadings[changed] ?? "none")} became ${clip(newHeadings[changed] ?? "nothing")}); heading level, id and text must stay as restored`);
  const ids = idsOf(after.body);
  assert.equal(ids.length, new Set(ids).size, `${pr} creates duplicate IDs in the article`);
  const lost = idsOf(before.body).filter((id) => !ids.includes(id));
  assert(!lost.length, `${pr} removes anchor #${lost[0]}${lost.length > 1 ? ` and ${lost.length - 1} more` : ""}; section URLs and saved links would break`);
  normalizeRecordedAnchors(after.body, item.added_legacy_anchors);
  // A figure is compared together with the link that opens it, so the link cannot be pointed elsewhere.
  const media = (body) => [...body.matchAll(/<figure\b[^>]*>(?:<a\b[^>]*>)?|<img\b[^>]*>/g)].map((match) => match[0]);
  const [oldMedia, newMedia] = [media(before.body), media(after.body)];
  assert.equal(newMedia.length, oldMedia.length, `${pr} adds or removes images or figures`);
  const listed = new Set(receipt.changed_image_alt_text ?? []);
  const altChanged = new Set();
  let figure = "";
  oldMedia.forEach((tag, index) => {
    if (tag.startsWith("<figure")) figure = tag.match(/\bid="([^"]+)"/)?.[1] ?? "";
    if (tag === newMedia[index]) return;
    const withoutAlt = (value) => value.replace(/\salt="[^"]*"/, "");
    const altOnly = tag.startsWith("<img") && withoutAlt(tag) === withoutAlt(newMedia[index]);
    const unchanged = `only alt text may change, and only for figures listed in changed_image_alt_text`;
    assert(altOnly, tag.startsWith("<img") ? `${pr} changes the image ${figure || `#${index + 1}`}; ${unchanged}`
      : `${pr} changes the figure ${figure || `#${index + 1}`} or the link that opens it; figures and their links stay as restored`);
    if (receipt === noReceipt) {
      // Reported with the awaiting article; the receipt must then list the figure.
      assert(figureId.test(figure), `${pr} changes the alt text of image #${index + 1}, which has no figure id a receipt could list`);
    } else {
      assert(listed.has(figure), `${pr} changes the image ${figure || `#${index + 1}`}; ${unchanged}`);
    }
    altChanged.add(figure);
  });
  const unused = [...listed].filter((id) => !altChanged.has(id));
  assert(!unused.length, `${pr} lists an alt-text change for ${unused.join(", ")}, but that image is unchanged`);
  // Headings, IDs and images are checked above; <img> tags whose alt text changed are not markup changes here.
  const markup = changedTags(before.body, after.body).find((tag) => !/^<img\s/.test(tag) && !editableTag(tag));
  assert(!markup, `${pr} adds or removes ${clip(markup ?? "")}; an accepted edit may change only text and ${editableList}`);
  assert.equal(occurrences(after.body, /\n[ \t]*\n/g), occurrences(before.body, /\n[ \t]*\n/g), `${pr} adds or removes a blank line, which ends the article's HTML block`);
  assert.equal(occurrences(after.body, /<[!?]/g), occurrences(before.body, /<[!?]/g), `${pr} adds or removes an HTML comment or declaration`);
  if (item.slug === "last-resort-restore") {
    checkRestoreSafeguards(after.body);
    checkRestoreSafeguardContext(authorText(before.body), authorText(after.body), pr);
  }
  return [...altChanged];
}

/**
 * An accepted edit may change article wording only. Compare the edited file with
 * the exact file it was based on, on the page the site renders from each (the
 * Markdown is rendered with the site's own pipeline, scripts/lib/render-markdown.mjs):
 * the front matter, title and contents list (in the source, byte for byte), the
 * page around the article, the container, headings, existing IDs, recorded legacy
 * anchors and images stay as they were. An image's alt text may change only when the
 * receipt lists that figure in changed_image_alt_text. Markdown adds markup without
 * any source tag (![image](…), ## heading, links, autolinks, raw HTML, directives,
 * footnotes), so everything is decided on the rendered elements. While base and edit
 * are both HTML (format "html"), today's source-level rules apply as well.
 */
async function checkAcceptedStructure(base, edited, item, receipt, pr, format) {
  assert(sourcePrefix(base) === sourcePrefix(edited), `${pr} changes text outside the article body (front matter, title, contents list or wrapper)`);
  if (format === "html") checkSourceStructure(base, edited, item, receipt, pr);
  const path = articlePath(item.slug);
  const before = await renderedArticle(base, path, `the file ${pr} is based on`);
  const after = await renderedArticle(edited, path, pr);
  assert(before.outside === after.outside, `${pr} changes the page outside the article body (contents list or wrapper)`);
  assert(startTag(after.container) === startTag(before.container), `${pr} changes the article container`);
  const [oldElements, newElements] = [elementsOf(before.body), elementsOf(after.body)];
  const headings = (elements) => elements.filter((element) => headingTag.test(element.tag)).map((element) => serialize([element]));
  const [oldHeadings, newHeadings] = [headings(oldElements), headings(newElements)];
  const changed = [...oldHeadings, ...newHeadings].findIndex((_, index) => oldHeadings[index] !== newHeadings[index]);
  assert(changed < 0, `${pr} changes heading ${changed + 1} (${clip(oldHeadings[changed] ?? "none")} became ${clip(newHeadings[changed] ?? "nothing")}); heading level, id and text must stay as restored`);
  const idList = (elements) => elements.map((element) => attributeValue(element, "id")).filter((id) => id !== undefined);
  const ids = idList(newElements);
  assert.equal(ids.length, new Set(ids).size, `${pr} creates duplicate IDs in the article`);
  const lost = idList(oldElements).filter((id) => !ids.includes(id));
  assert(!lost.length, `${pr} removes anchor #${lost[0]}${lost.length > 1 ? ` and ${lost.length - 1} more` : ""}; section URLs and saved links would break`);
  checkRenderedAnchors(after.body, item.added_legacy_anchors);
  // A figure is compared together with the link that opens it, so the link cannot be pointed elsewhere.
  const media = (elements) => elements.filter((element) => element.tag === "figure" || element.tag === "img").map((element) => {
    if (element.tag === "img") return { tag: startTag(element), image: element };
    const first = element.children[0];
    return { tag: `${startTag(element)}${first?.type === "element" && first.tag === "a" ? startTag(first) : ""}`, figure: attributeValue(element, "id") ?? "" };
  });
  const [oldMedia, newMedia] = [media(oldElements), media(newElements)];
  assert.equal(newMedia.length, oldMedia.length, `${pr} adds or removes images or figures`);
  const listed = new Set(receipt.changed_image_alt_text ?? []);
  const altChanged = new Set();
  let figure = "";
  oldMedia.forEach((entry, index) => {
    if (!entry.image) figure = entry.figure;
    const next = newMedia[index];
    if (entry.tag === next.tag) return;
    const withoutAlt = (image) => startTag({ ...image, attrs: image.attrs.filter(([name]) => name !== "alt") });
    const altOnly = entry.image && next.image && withoutAlt(entry.image) === withoutAlt(next.image);
    const unchanged = `only alt text may change, and only for figures listed in changed_image_alt_text`;
    assert(altOnly, entry.image ? `${pr} changes the image ${figure || `#${index + 1}`}; ${unchanged}`
      : `${pr} changes the figure ${figure || `#${index + 1}`} or the link that opens it; figures and their links stay as restored`);
    if (receipt === noReceipt) {
      // Reported with the awaiting article; the receipt must then list the figure.
      assert(figureId.test(figure), `${pr} changes the alt text of image #${index + 1}, which has no figure id a receipt could list`);
    } else {
      assert(listed.has(figure), `${pr} changes the image ${figure || `#${index + 1}`}; ${unchanged}`);
    }
    altChanged.add(figure);
  });
  const unused = [...listed].filter((id) => !altChanged.has(id));
  assert(!unused.length, `${pr} lists an alt-text change for ${unused.join(", ")}, but that image is unchanged`);
  // Every element the edit adds or removes (by its start tag) must be editable.
  // Headings, IDs and images are checked above; images whose alt text changed are not markup changes here.
  const counts = new Map();
  const count = (elements, step) => elements.filter((element) => element.tag !== "img" && !anchorSpan(element)).forEach((element) => {
    const tag = startTag(element);
    counts.set(tag, { element, count: (counts.get(tag)?.count ?? 0) + step });
  });
  count(oldElements, -1);
  count(newElements, 1);
  const markup = [...counts.values()].find(({ element, count: difference }) => difference !== 0 && !editableElement(element));
  assert(!markup, `${pr} adds or removes ${clip(markup ? startTag(markup.element) : "")}; an accepted edit may change only text and ${editableList}`);
  assert.equal(commentsOf(after.body).length, commentsOf(before.body).length, `${pr} adds or removes an HTML comment or declaration`);
  if (item.slug === "last-resort-restore") {
    checkRestoreSafeguards(restoreFacts(after.body));
    checkRestoreSafeguardContext(restoreFacts(before.body).text, restoreFacts(after.body).text, pr);
  }
  return [...altChanged];
}

/**
 * Each recorded legacy anchor is still an empty span (whitespace aside) right before
 * its heading on the rendered page: exactly once, with only its class, id and
 * aria-hidden, and the heading with its stable ID as the next element (or first in
 * the next element, Starlight's heading-link wrapper).
 */
function checkRenderedAnchors(body, anchors) {
  const siblings = new Map();
  const index = (nodes) => nodes.forEach((node, position) => {
    if (node.type !== "element") return;
    siblings.set(node, nodes.slice(position + 1));
    index(node.children);
  });
  index(body);
  const elements = elementsOf(body);
  for (const anchor of anchors) {
    const matches = elements.filter((element) => attributeValue(element, "id") === anchor.legacy_id);
    assert(matches.length, `missing recorded legacy anchor ${anchor.legacy_id}`);
    assert.equal(matches.length, 1, `duplicate legacy anchor ${anchor.legacy_id}`);
    const [span] = matches;
    assert(span.tag === "span" && span.attrs.length === 3 && classes(span).join(" ") === "wiki-legacy-anchor" && attributeValue(span, "aria-hidden") === "true" && anchorSpan(span),
      `legacy anchor ${anchor.legacy_id} must stay an empty metadata span`);
    let next = siblings.get(span).find((node) => node.type !== "text" || /[^\t\n\f\r ]/.test(node.value));
    // A Markdown heading may sit in Starlight's heading-link wrapper.
    if (next?.type === "element" && next.tag === "div" && classes(next)[0] === "sl-heading-wrapper") next = next.children[0];
    assert(next?.type === "element" && /^h[2-6]$/.test(next.tag) && attributeValue(next, "id") === anchor.stable_id, `legacy anchor ${anchor.legacy_id} moved away from its heading`);
  }
}

// An accepted edit may not touch the words around a recovery safeguard either, so
// "Do not" or "(not reversible)" cannot be added next to an intact phrase.
function checkRestoreSafeguardContext(before, after, pr) {
  for (const phrase of restoreSafeguards) {
    const at = before.indexOf(phrase);
    const context = before.slice(Math.max(0, at - 60), at + phrase.length + 60);
    assert(after.includes(context), `${pr} changes the text around the recovery safeguard "${clip(phrase)}"`);
  }
}

const restoreSafeguards = [
  "your Bisq instance won't start, and you don't have backups, or your backups do not start as well, or are too old to be useful",
  "hacky-workaround-last-resort-attempt",
  "Bisq is closed (terminate orphan existing processes if any)",
  "Start Bisq again: it should start into a 100% new instance",
  "Close Bisq again: we are going to use the freshly created Data Directory",
  'sort files by "last modified" descending',
  "all of them in the same day (presumably the last day your Bisq was operational)",
  "btc_mainnet/db", "btc_mainnet/keys", "btc_mainnet/wallet", "btc_mainnet/tor/hiddenservice",
  "folder of your fresh data directory, overwriting the existing ones",
  "this is a reversible step as you can simply restore the existing old folder after deleting the fresh one you created",
  "If anything is off with the wallet balances shown by Bisq after this restore, you can try a SPV resync (or more)",
];
const restoreOrder = [
  "your Bisq instance won't start", "Bisq is closed",
  "Start Bisq again: it should start into a 100% new instance", "Close Bisq again:",
  'sort files by "last modified" descending', "Copy all the above files",
  "Then, delete from the fresh data directory", "this is a reversible step",
];
const databaseNames = [
  "BsqSwapTrades", "DisputeList", "RefundDisputeList", "SequenceNumberMap", "MyVoteList",
  "OpenOffers", "MyBlindVoteList", "ClosedTrades", "MediationDisputeList", "MyProposalList",
  "MailboxMessageList", "AccountAgeWitnessStore", "PendingTrades", "MyProofOfBurnList",
  "PreferencesPayload", "UserPayload", "AddressEntryList", "FailedTrades", "MyReputationList",
  "TempProposalStore", "NavigationPath", "UnconfirmedBsqChangeOutputList", "IgnoredMailboxMap",
  "PeerList", "RemovedPayloadsMap", "TradeStatistics3Store", "SignedWitnessStore",
];

/**
 * What the recovery safeguards are checked on: the article's text and the word lists
 * of its code blocks. From the HTML source of a restored article (a string), or from
 * rendered nodes.
 */
function restoreFacts(body) {
  if (typeof body === "string") {
    return {
      text: authorText(body),
      lists: [...body.matchAll(/<pre><code\b[^>]*>([\s\S]*?)<\/code><\/pre>/g)].map((match) => decodeHtml(match[1]).split(/\s+/).filter(Boolean)),
    };
  }
  const code = elementsOf(body).filter((element) => element.tag === "pre" && element.children.length === 1 && element.children[0].type === "element" && element.children[0].tag === "code");
  return { text: body.map(textContent).join(""), lists: code.map((pre) => textContent(pre).split(/\s+/).filter(Boolean)) };
}

function checkRestoreSafeguards(body) {
  const { text, lists } = typeof body === "string" ? restoreFacts(body) : body;
  for (const phrase of restoreSafeguards) assert(text.includes(phrase), `lost recovery safeguard: ${phrase}`);
  let previous = -1;
  for (const phrase of restoreOrder) {
    const position = text.indexOf(phrase);
    assert(position > previous, `recovery procedure reordered or missing: ${phrase}`);
    previous = position;
  }
  assert(lists.some((list) => JSON.stringify(list) === JSON.stringify(databaseNames)), "the ordered 27-file database list changed");
}

/**
 * An article's steps from its restored baseline, in chain order: accepted edits
 * ({ receipt }) and at most one Markdown conversion ({ conversion }), each from one
 * file hash to the next. Steps that do not continue the chain follow in their given
 * order, so the caller reports the first one that does not fit.
 */
function chainSteps(baseline, receipts, conversion) {
  const steps = [
    ...receipts.map((receipt) => ({ receipt, from: receipt.based_on_file_sha256, to: receipt.accepted_file_sha256 })),
    ...(conversion ? [{ conversion, from: conversion.html_file_sha256, to: conversion.markdown_file_sha256 }] : []),
  ];
  const order = [];
  for (let at = baseline; ;) {
    const next = steps.filter((step) => !order.includes(step) && step.from === at);
    // When a receipt and the conversion start from the same file, the conversion (a
    // record of the whole article) comes first and the receipt is reported as not fitting.
    const conversionStep = next.find((step) => step.conversion);
    if (next.length !== 1 && !(next.length === 2 && conversionStep)) break;
    order.push(conversionStep ?? next[0]);
    at = order.at(-1).to;
  }
  return [...order, ...steps.filter((step) => !order.includes(step))];
}

async function filesBelow(directory) {
  const files = [];
  for (const entry of await readdir(resolve(root, directory), { withFileTypes: true })) {
    const path = `${directory}/${entry.name}`;
    if (entry.isDirectory()) files.push(...await filesBelow(path));
    else files.push(path);
  }
  return files.sort();
}

/** Read base files below dir for verify({ readBase }); a missing file is undefined. */
export function baseReader(dir) {
  return async (path) => {
    try {
      return await readFile(resolve(dir, path));
    } catch (error) {
      if (error.code === "ENOENT") return undefined;
      throw error;
    }
  };
}

/**
 * Check the restored articles. Without options, any article no receipt covers
 * fails. With readBase (path -> base file bytes or undefined), such an article
 * is listed in `awaiting` instead when it passes everything a receipt would
 * still require; changedImageAltText names the figures its receipt must list.
 * `unreceipted` lists every article file no receipt covers, in either mode.
 */
export async function verify(overrides = new Map(), { readBase } = {}) {
  const failures = [];
  const awaiting = [];
  const unreceipted = [];
  const check = async (path, operation) => {
    try { await operation(); } catch (error) { failures.push(`${path}: ${error.message}`); }
  };
  const read = async (path) => {
    const local = relative(root, resolve(root, path));
    assert(local !== ".." && !local.startsWith(`..${sep}`), "path escapes repository");
    return overrides.has(path) ? Buffer.from(overrides.get(path)) : readFile(resolve(root, path));
  };
  const manifest = JSON.parse((await read(manifestPath)).toString());
  const snapshot = JSON.parse((await read(snapshotPath)).toString());
  const formatting = JSON.parse((await read(formattingPath)).toString());
  assert.equal(formatting.schema_version, 1, "unsupported source-formatting schema");
  const formattingBySlug = new Map(formatting.items.map((item) => [item.slug, item]));
  assert.equal(formattingBySlug.size, formatting.items.length, "duplicate source-formatting record");
  for (const record of formatting.items) {
    const original = manifest.items.find((item) => item.slug === record.slug);
    assert(original, "source-formatting record has no original article");
    assert.equal(record.original_file_sha256, original.restored_file_sha256, "source-formatting baseline differs from the preserved original");
    assert(Number.isSafeInteger(record.decoded_newline_entities) && record.decoded_newline_entities > 0, "invalid source-formatting line count");
  }
  assert.equal(manifest.schema_version, 1, "unsupported fidelity manifest schema");
  assert.equal(manifest.count, 209, "manifest must account for 209 source articles");
  assert.equal(manifest.items.length, 209, "manifest article count mismatch");
  assert.equal(new Set(manifest.items.map((item) => item.slug)).size, 209, "duplicate source slug");
  let accepted = { bySlug: new Map(), problems: [] };
  await check(acceptedEditsPath, async () => {
    const notes = JSON.parse((await read("migration/source-review-notes.json")).toString()).items;
    const settings = JSON.parse((await read(acceptedEditsPath)).toString());
    // Receipt files on disk, plus or minus those given in overrides (null removes one).
    const paths = new Set(receiptFilesIn(root));
    for (const [path, value] of overrides) if (path.startsWith(`${receiptsDir}/`)) (value === null ? paths.delete(path) : paths.add(path));
    const files = await Promise.all([...paths].sort().map(async (path) => ({ path, text: (await read(path)).toString() })));
    accepted = parseAcceptedEdits(settings, files, { slugs: new Set(manifest.items.map((item) => item.slug)), notes });
  });
  failures.push(...accepted.problems);
  const slugs = new Set(manifest.items.map((item) => item.slug));
  let conversions = new Map();
  await check(markdownFormatPath, async () => {
    conversions = parseMarkdownFormat(JSON.parse((await read(markdownFormatPath)).toString()), slugs);
  });
  const additions = verifyAdditionalArticles();
  const expectedFiles = [...manifest.items.map((item) => articlePath(item.slug)), ...additions.map((item) => item.file)].sort();
  await check("src/content/docs/wiki", async () => assert.deepEqual(await filesBelow("src/content/docs/wiki"), expectedFiles, "missing or unexpected source article files"));
  const preservedFiles = manifest.items.map((item) => preservedArticlePath(item.slug)).sort();
  await check(preservedArticlesDir, async () => assert.deepEqual(await filesBelow(preservedArticlesDir), preservedFiles, "missing or unexpected preserved restored articles"));
  const images = new Set();
  let imageOccurrences = 0;
  let anchorCount = 0;
  let counted = 0;
  let acceptedCount = 0;
  let convertedCount = 0;
  let restoreBody;
  for (const item of manifest.items) {
    const path = articlePath(item.slug);
    await check(path, async () => {
      assert(/^[a-z0-9-]+$/.test(item.slug), "invalid source slug");
      const record = formattingBySlug.get(item.slug);
      const baseline = record?.formatted_file_sha256 ?? item.restored_file_sha256;
      // The preserved restored article starts the chain; it never changes.
      const preservedPath = preservedArticlePath(item.slug);
      const preserved = (await read(preservedPath)).toString();
      assert(hash(preserved) === baseline, `${preservedPath} is not the restored article (sha256 ${short(hash(preserved))}, restored ${short(baseline)}); the preserved original never changes`);
      const conversion = conversions.get(item.slug);
      const steps = chainSteps(baseline, accepted.bySlug.get(item.slug) ?? [], conversion);
      const last = steps.at(-1);
      const file = (await read(path)).toString();
      // The file the newest step produced (an accepted edit or the Markdown conversion), or the restored baseline.
      const covered = last ? last.to : baseline;
      const uncovered = hash(file) !== covered && !(last && hash(file) === baseline);
      if (uncovered) unreceipted.push({ slug: item.slug, title: item.title, path });
      const since = !last ? "since restoration" : last.receipt ? `after its accepted edit (${pullRequestLabel(last.receipt.pull_request)})` : "since its Markdown conversion";
      let current = file;
      let proposed;
      if (uncovered && readBase) {
        // Check the base file exactly as the article itself would be checked, then the edit against it.
        const base = await readBase(path);
        const why = !base ? "there is no base file to compare it with"
          : hash(base) === covered ? ""
          : record && !last && hash(base) === item.restored_file_sha256
            ? `its base file has no line-break formatting yet, but this change also records it in ${formattingPath}; propose the formatting-only change on its own first (see CONTRIBUTING.md)`
          : conversion && !last.receipt && hash(base) === conversion.html_file_sha256
            ? `its base file is the HTML before its Markdown conversion, but this change also converts it (${markdownFormatPath}); propose the conversion on its own first (see CONTRIBUTING.md)`
          : `its base file is sha256 ${short(hash(base))}, not the ${!last ? "restored article" : last.receipt ? "last accepted edit" : "Markdown conversion"} ${short(covered)}`;
        assert(!why, `${item.title} changed ${since} and no receipt in ${receiptsDir}/ covers it. It cannot be checked as awaiting a receipt: ${why}.`);
        [current, proposed] = [base.toString(), file];
      }
      if (!last) {
        assert(hash(current) === baseline, `${item.title} changed since restoration (sha256 ${short(hash(current))}, restored ${short(baseline)}) and no receipt in ${receiptsDir}/ covers it. A wording change needs human approval and a receipt (see CONTRIBUTING.md); do not refresh the original hashes.`);
      } else if (hash(current) === baseline) {
        throw new Error(last.receipt
          ? `${item.title} is unchanged since restoration, but ${pullRequestLabel(last.receipt.pull_request)} has a receipt for it; apply the accepted edit or remove the receipt`
          : `${item.title} is the restored HTML, but ${markdownFormatPath} records its Markdown conversion; apply the conversion or remove its record`);
      }
      steps.reduce((expected, step, index) => {
        const previous = steps[index - 1];
        const producer = !previous ? `the restored baseline of this article${record ? " (original plus recorded line-break formatting)" : ""} is`
          : previous.receipt ? `the earlier accepted edit (${pullRequestLabel(previous.receipt.pull_request)}) produced`
          : `its Markdown conversion (${markdownFormatPath}) produced`;
        assert(step.from === expected, step.receipt
          ? `${pullRequestLabel(step.receipt.pull_request)} receipt is based on sha256 ${short(step.from)}, but ${producer} ${short(expected)}; record the receipt against the current article`
          : `its Markdown conversion in ${markdownFormatPath} is based on sha256 ${short(step.from)}, but ${producer} ${short(expected)}; record the conversion against the HTML it replaced`);
        return step.to;
      }, baseline);
      if (last && !last.receipt) {
        assert(hash(current) === covered, `${item.title} changed since its Markdown conversion (sha256 ${short(hash(current))}, converted ${short(covered)}) and no receipt in ${receiptsDir}/ covers it. A wording change needs human approval and a receipt (see CONTRIBUTING.md); do not refresh the hashes in ${markdownFormatPath}.`);
      }
      // Undo the accepted edits newest first, down to the Markdown conversion or the
      // restored baseline; each must rebuild exactly the file it was based on.
      const split = steps.findIndex((step) => step.conversion);
      const markdownEdits = [];
      let unedited = current;
      for (const step of steps.slice(split + 1).reverse()) {
        const base = undoAcceptedEdit(unedited, step.receipt);
        markdownEdits.unshift([base, unedited, step.receipt, split < 0 ? "html" : "markdown"]);
        unedited = base;
      }
      const htmlEdits = [];
      if (split >= 0) {
        // unedited is the converted Markdown. Rebuild the HTML it replaced from the
        // preserved original through the accepted HTML edits, then compare the pages.
        let html = preserved;
        for (const step of steps.slice(0, split)) {
          const next = applyAcceptedEdit(html, step.receipt);
          assert(undoAcceptedEdit(next, step.receipt) === html, `${pullRequestLabel(step.receipt.pull_request)} recorded changes do not undo exactly`);
          htmlEdits.push([html, next, step.receipt, "html"]);
          html = next;
        }
        const difference = await formatDifference({ slug: item.slug, html, markdown: unedited, root });
        assert(!difference, `its Markdown conversion (${markdownFormatPath}) does not render as the HTML it replaced: ${difference}`);
        unedited = preserved;
        convertedCount += 1;
      }
      const text = restoreRecordedFormatting(unedited, record);
      const front = text.match(/^---\n([\s\S]*?)\n---/);
      assert(front, "missing frontmatter");
      const title = front[1].match(/^title: (.+)$/m);
      assert(title, "missing original title");
      assert.equal(JSON.parse(title[1]), item.title, "original article title changed");
      assert(front[1].includes(`slug: "wiki/${item.slug}"`), "canonical source route changed");
      assert(/^tableOfContents: false$/m.test(front[1]), "duplicate automatic TOC enabled");
      const body = articleBody(text);
      const normalized = normalizeRecordedAnchors(body, item.added_legacy_anchors);
      assert.equal(hash(normalized), item.original_article_body_sha256, "original author body drift (only listed empty anchors may be removed)");
      assert.equal(hash(normalized), item.restored_article_body_without_recorded_anchor_spans_sha256, "normalized restored body hash mismatch");
      assert.equal(hash(body), item.restored_article_body_sha256, "restored article body hash mismatch");
      assert.equal(hash(text), item.restored_file_sha256, "whole restored source file drift");
      const ids = [...body.matchAll(/\bid="([^"]+)"/g)].map((match) => decodeHtml(match[1]));
      assert.equal(ids.length, new Set(ids).size, "duplicate article IDs");
      const tags = [...body.matchAll(/<img\b[^>]*>/g)];
      assert.equal(tags.length, item.image_occurrences, "contextual image count changed");
      for (const tag of tags) images.add(tag[0].match(/\bsrc="([^"]+)"/)?.[1]);
      imageOccurrences += tags.length;
      anchorCount += item.added_legacy_anchors.length;
      if (item.slug === "last-resort-restore") {
        checkRestoreSafeguards(body);
        restoreBody = body;
      }
      counted += 1;
      for (const [base, edited, receipt, format] of [...htmlEdits, ...markdownEdits]) {
        await checkAcceptedStructure(base, edited, item, receipt, pullRequestLabel(receipt.pull_request), format);
      }
      acceptedCount += htmlEdits.length + markdownEdits.length;
      if (proposed !== undefined) {
        const changedImageAltText = await checkAcceptedStructure(current, proposed, item, noReceipt, awaitingLabel, conversion ? "markdown" : "html");
        awaiting.push({ slug: item.slug, title: item.title, path, changedImageAltText });
      }
    });
    const rawPath = `public/wiki-source/${item.slug}.wiki.txt`;
    await check(rawPath, async () => assert.equal(hash(await read(rawPath)), item.raw_wikitext_sha256, "immutable raw wikitext drift"));
    const metadataPath = `public/wiki-source/${item.slug}.json`;
    await check(metadataPath, async () => {
      const metadata = JSON.parse((await read(metadataPath)).toString());
      assert.equal(metadata.title, item.title, "original title differs from source metadata");
      assert.equal(metadata.wikitext_sha256, item.raw_wikitext_sha256, "source metadata hash differs");
      assert.equal(metadata.revision_id, item.source_revision_id, "original revision differs");
      assert.equal(metadata.revision_timestamp, item.source_revision_timestamp, "original revision date differs");
    });
  }
  await check(manifestPath, async () => {
    // Totals are meaningful only when every article was read; failed articles are reported above.
    if (counted === manifest.items.length) {
      assert.equal(imageOccurrences, 130, "expected 130 contextual image occurrences");
      assert.equal(images.size, 120, "expected 120 unique contextual images");
      assert.equal(imageOccurrences, manifest.image_occurrences_preserved);
      assert.equal(images.size, manifest.unique_contextual_image_urls_preserved);
    }
    const records = [...manifest.items].sort((a, b) => `${a.slug}.md` < `${b.slug}.md` ? -1 : `${a.slug}.md` > `${b.slug}.md` ? 1 : 0)
      .map((item) => `${item.slug}.md\0${item.original_whole_source_sha256}\n`).join("");
    assert.equal(hash(records), manifest.whole_rendered_snapshot_sha256, "whole original snapshot hash records changed");
    for (const item of manifest.items) {
      for (const commit of ["6c8bed6", "13d4b61"]) assert.equal(item.git_baseline_sha256[commit], item.original_whole_source_sha256, `${item.slug}: baseline receipts disagree`);
    }
    assert.deepEqual(manifest.last_resort_restore_regressions.map((entry) => entry.exact_retained_text), restoreSafeguards, "recovery regression requirements changed");
    assert.deepEqual(manifest.last_resort_restore_procedure_order.exact_markers, restoreOrder, "recovery order requirements changed");
  });
  const snapshots = Object.entries(snapshot.files);
  await check(snapshotPath, async () => {
    const guides = snapshots.filter(([path]) => path.startsWith("guides/"));
    assert.equal(guides.length, 98, "expected exactly 98 immutable AI-edited guide snapshots");
    assert.deepEqual(await filesBelow("review/ai-edited/guides"), guides.map(([path]) => `review/ai-edited/${path}`).sort(), "missing or unexpected AI guide snapshots");
  });
  for (const [path, expected] of snapshots) {
    const local = `review/ai-edited/${path}`;
    await check(local, async () => assert.equal(hash(await read(local)), expected, "immutable AI-review snapshot drift"));
  }
  return { failures, awaiting, unreceipted, anchorCount, acceptedCount, acceptedArticles: accepted.bySlug.size, convertedCount, snapshotFiles: snapshots.length, restoreBody };
}

/** For an awaiting article whose alt text changed: which figures its receipt must list ("" if none). */
export function altTextNote(item) {
  const figures = item.changedImageAltText ?? [];
  if (!figures.length) return "";
  return `alt text of ${figures.join(", ")} changed; its receipt must list ${figures.length === 1 ? "it" : "them"} in changed_image_alt_text`;
}

/** One awaiting article for messages: its slug, plus any alt-text note. */
export const awaitingLine = (item) => (altTextNote(item) ? `${item.slug}: ${altTextNote(item)}` : item.slug);

/** The value of --awaiting-receipt-base, or undefined when the flag is absent. */
export function awaitingReceiptBase(argv) {
  const index = argv.indexOf("--awaiting-receipt-base");
  if (index < 0) return undefined;
  const dir = argv[index + 1];
  if (!dir || dir.startsWith("--")) throw new Error("--awaiting-receipt-base needs the directory holding the pull request's base files");
  return dir;
}

const runAsScript = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (runAsScript) await main();

async function main() {
  try {
    const base = awaitingReceiptBase(process.argv);
    const result = await verify(new Map(), base === undefined ? {} : { readBase: baseReader(base) });
    const plural = (count, noun) => `${count} ${noun}${count === 1 ? "" : "s"}`;
    const awaiting = result.awaiting.length
      ? `\nAwaiting an accepted-edit receipt (${plural(result.awaiting.length, "article")}; not a failure here, the receipts job reports them until reviewers accept the wording):\n${result.awaiting.map((item) => `- ${awaitingLine(item)}`).join("\n")}`
      : "";
    if (result.failures.length) {
      console.error(`Source fidelity FAILED (${result.failures.length} finding${result.failures.length === 1 ? "" : "s"}):\n${result.failures.map((failure) => `- ${failure}`).join("\n")}${awaiting}`);
      process.exitCode = 1;
    } else {
      const edits = result.acceptedCount ? ` (${plural(result.acceptedArticles, "article")} with ${plural(result.acceptedCount, "accepted edit")}; originals rebuilt exactly)` : "";
      const proposals = result.awaiting.length ? ` (${result.awaiting.length} awaiting a receipt, checked against their base files)` : "";
      const converted = result.convertedCount ? ` (${result.convertedCount} converted to Markdown, each rendering as the HTML it replaced)` : "";
      console.log(`Source fidelity passed: 209 original bodies/titles/raw sources${converted}${edits}${proposals}, ${result.anchorCount} explicit anchor additions, 130 image occurrences/120 assets, 98 AI guides (${result.snapshotFiles} snapshot files), 14 recovery safeguards, ordered 27-file list and 8-step order.${awaiting}`);
      if (process.argv.includes("--self-test")) {
        const path = "src/content/docs/wiki/last-resort-restore.md";
        const text = await readFile(resolve(root, path), "utf8");
        const rawPath = "public/wiki-source/last-resort-restore.wiki.txt";
        const snapshot = JSON.parse(await readFile(resolve(root, snapshotPath), "utf8"));
        const guidePath = `review/ai-edited/${Object.keys(snapshot.files).find((file) => file.startsWith("guides/"))}`;
        const teamsPath = "src/content/docs/wiki/teams.md";
        const teams = await readFile(resolve(root, teamsPath), "utf8");
        const preservedPath = preservedArticlePath("last-resort-restore");
        const preserved = await readFile(resolve(root, preservedPath), "utf8");
        const mutations = [
          [path, text.replace('title: "Last resort restore"', 'title: "Different title"')],
          [path, text.replace("100% new instance", "90% new instance")],
          [path, text.replace('<div class="wiki-recovered-article" lang="en">', '<div class="wiki-recovered-article" lang="en"><span>unlisted content</span>')],
          [rawPath, `${await readFile(resolve(root, rawPath), "utf8")}\nchanged`],
          [guidePath, "changed immutable AI draft"],
          [teamsPath, teams.replace("is responsable", "is responsible")],
          [teamsPath, teams.replace("Bisq is a", "Bisq  is a")],
          [preservedPath, preserved.replace("100% new instance", "90% new instance"), path],
        ];
        for (const [file, content, reportedAt = file] of mutations) {
          assert.notEqual(content, await readFile(resolve(root, file), "utf8"), `negative test did not change ${file}`);
          const mutated = await verify(new Map([[file, content]]));
          assert(mutated.failures.some((failure) => failure.startsWith(`${reportedAt}:`)), `negative test did not catch drift at ${file}`);
        }
        assert.throws(() => checkRestoreSafeguards(result.restoreBody.replace("btc_mainnet/tor/hiddenservice", "hiddenservice")), /lost recovery safeguard/);
        assert.throws(() => checkRestoreSafeguards(result.restoreBody.replace("Copy all the above files", "Copy selected files")), /procedure reordered or missing/);
        console.log("Ten negative regression checks passed; test mutations were in memory only.");
      }
    }
  } catch (error) {
    console.error(`Source fidelity FAILED: ${error.message}`);
    process.exitCode = 1;
  }
}
