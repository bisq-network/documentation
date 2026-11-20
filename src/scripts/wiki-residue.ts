import { icon } from "../icons/icon.mjs";
import { unlink } from "../icons/lucide.mjs";
/*
 * Recovery markers and wiki residue inside the article, made readable after the page loads. The
 * server HTML, which the fidelity gate checks, stays as it is; without scripts the article shows as
 * before. Only how the text is laid out changes, never its words.
 * - A lost link ("label [unresolved link: Target]") reads as its words with a dotted underline and a
 *   small button that says the original link could not be restored and names its target; a link to a
 *   section that was not recovered ("[section not recovered: Name]") gets the same button.
 * - Where a page has an Also in switch, the wiki's unsupported <languages/> marker is hidden.
 * - A table column whose every value links to the same historical source gets one marked note.
 * - Source links whose visible text ("2026 source") is missing from their accessible name get it.
 * repairArticle() (run on every article) handles the layout residue: see its comments.
 */
export function enhanceResidue(article: HTMLElement) {
  let lost = 0;
  article.querySelectorAll<HTMLElement>(".wiki-link-gap").forEach((gap) => {
    const marker = gap.matches("small") ? gap : gap.querySelector<HTMLElement>(":scope > small");
    const text = marker?.textContent?.trim() ?? "";
    const link = /^\[unresolved link: (.+)\]$/.exec(text);
    const section = /^\[section not recovered: (.+)\]$/.exec(text);
    if (!marker || !(link || section)) return;
    lost += 1;
    marker.hidden = true;
    if (link) gap.classList.add("lost-link");
    const label = link ? "The original wiki link here could not be restored" : "The section this link pointed to could not be recovered";
    const tip = document.createElement("span");
    tip.id = `docs-lost-link-${lost}`;
    tip.className = "lost-link-tip";
    tip.hidden = true;
    tip.textContent = link ? `${label}. It pointed to “${link[1]}”.` : `The section “${section![1]}” that this link pointed to could not be recovered.`;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "lost-link-button";
    button.setAttribute("aria-label", label);
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-controls", tip.id);
    button.title = label;
    button.innerHTML = icon(unlink, { size: 14 });
    button.addEventListener("click", () => {
      tip.hidden = !tip.hidden;
      button.setAttribute("aria-expanded", String(!tip.hidden));
    });
    gap.after(button, tip);
  });

  if (document.querySelector(".language-switch")) {
    article.querySelectorAll<HTMLElement>(".wiki-markup-gap").forEach((gap) => {
      if (gap.textContent?.includes("[Unsupported MediaWiki markup: languages]")) gap.hidden = true;
    });
  }

  const marks = ["†", "‡", "§", "¶"];
  article.querySelectorAll<HTMLTableElement>("table").forEach((table) => {
    // Only plain grids: with merged cells, a cell's column is not its position in the row.
    if (table.querySelector("[rowspan]:not([rowspan='1']), [colspan]:not([colspan='1'])")) return;
    const body = [...table.rows].filter((row) => [...row.cells].some((cell) => cell.tagName === "TD"));
    const width = Math.max(0, ...body.map((row) => row.cells.length));
    const notes: HTMLElement[] = [];
    for (let index = 0; index < width; index++) {
      // Every value in the column must cite exactly one source, the same one; a column with an
      // uncited value keeps its links, so the note never claims more than the table shows.
      const links = body.map((row) => {
        const found = row.cells[index]?.querySelectorAll<HTMLAnchorElement>(".wiki-template-expanded > sup > a");
        return found?.length === 1 ? found[0] : undefined;
      });
      if (links.length < 2 || links.some((link) => !link) || notes.length >= marks.length) continue;
      const href = links[0]!.getAttribute("href");
      if (links.some((link) => link!.getAttribute("href") !== href)) continue;
      const header = [...table.rows].find((row) => row.cells[index]?.tagName === "TH")?.cells[index];
      if (!header) continue;
      const mark = marks[notes.length];
      links.forEach((link) => { link!.closest("sup")!.hidden = true; });
      const sup = document.createElement("sup");
      sup.className = "column-source-mark";
      sup.textContent = mark;
      sup.setAttribute("aria-hidden", "true");
      header.append(sup);
      const note = document.createElement("span");
      note.append(`${mark} Every value in the column “${header.textContent?.replace(mark, "").trim()}” links to the same `);
      const source = links[0]!.cloneNode(true) as HTMLAnchorElement;
      const name = source.getAttribute("aria-label");
      if (name && !name.toLowerCase().includes((source.textContent ?? "").trim().toLowerCase())) source.setAttribute("aria-label", `${source.textContent?.trim()}: ${name}`);
      note.append(source, ".");
      notes.push(note);
    }
    if (!notes.length) return;
    const paragraph = document.createElement("p");
    paragraph.className = "column-source-note";
    paragraph.setAttribute("data-pagefind-ignore", "");
    notes.forEach((note, index) => { if (index) paragraph.append(document.createElement("br")); paragraph.append(note); });
    // The scroll hint sits before the table (src/scripts/article-experience.ts), so the note follows it.
    (table.closest(".table-wrap") ?? table).after(paragraph);
  });

  article.querySelectorAll<HTMLAnchorElement>(".wiki-template-expanded > sup > a[aria-label]").forEach((link) => {
    const visible = link.textContent?.trim() ?? "";
    const label = link.getAttribute("aria-label") ?? "";
    if (visible && !label.toLowerCase().includes(visible.toLowerCase())) link.setAttribute("aria-label", `${visible}: ${label}`);
  });
}

// A line that reads as code: starts like a comment, prompt, path or block, or holds code punctuation
// or a shell comment.
const CODE_LINE = /^[#/$[{}]|[{}=|<>]|;$|--\S|\s#\s/;
// A plain word, with the punctuation prose puts around words.
const WORD = /^[("'“*]?[A-Za-z][a-z'’-]*[.,;:!?)"'”]*$/;

/**
 * True when the text reads as sentences: mostly plain words, no line that looks like code, and at
 * least `sentences` sentence ends (commands such as "sudo apt update" have none).
 */
export function looksLikeProse(text: string, sentences = 1): boolean {
  const lines = text.replace(/\u00a0/g, " ").split("\n").map((line) => line.trim()).filter(Boolean);
  if (lines.some((line) => CODE_LINE.test(line))) return false;
  const tokens = lines.join(" ").split(/\s+/);
  const words = tokens.filter((token) => WORD.test(token)).length;
  const ends = tokens.filter((token) => /[.!?]["'”)]*$/.test(token)).length;
  return words >= 6 && words >= 0.6 * tokens.length && ends >= sentences;
}

/**
 * Offsets where a long URL, path or token (20 or more characters without a space) may wrap: after
 * "/", "=", "&" or "(", and before ".", "?", "#", "-", "_", "~" or "%" that follows a letter or digit.
 * Never at a token's first or last character, so a URL's closing full stop stays with it.
 */
export function breakPoints(text: string): number[] {
  const points: number[] = [];
  for (const match of text.matchAll(/\S{20,}/g)) {
    const token = match[0];
    for (let index = 1; index < token.length - 1; index++) {
      const before = token[index - 1];
      const after = /[/=&(]/.test(before) ? !/[/=&(]/.test(token[index]) : /[.?#_~%-]/.test(token[index]) && /\w/.test(before);
      if (after) points.push(match.index! + index);
    }
  }
  return points;
}

/** True when every item of a numbered list already starts with its own number ("1. ", "2. "…). */
export function ownNumbers(items: string[], start = 1): boolean {
  return items.length > 0 && items.every((text, index) => new RegExp(`^${start + index}[.)]\\s`).test(text.trim()));
}

/**
 * Average lightness (0 to 1) of RGBA pixels; transparent pixels count as dark, since the page shows
 * through them. Light screenshots of the wiki score 0.7 and more, dark interfaces below 0.5.
 */
export function lightness(data: ArrayLike<number>): number {
  let sum = 0;
  for (let at = 0; at < data.length; at += 4) sum += (0.2126 * data[at] + 0.7152 * data[at + 1] + 0.0722 * data[at + 2]) * data[at + 3];
  return data.length ? sum / (data.length / 4) / 255 / 255 : 0;
}

const NBSP = /\u00a0/g;
/** No-break spaces become spaces in the element's text (outside nested code when `own` is set). */
function spaces(root: Element, own: boolean) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    if (!own || node.parentElement!.closest("code") === root) node.textContent = node.textContent!.replace(NBSP, " ");
  }
}
const isCode = (node: Node) => node.nodeName === "CODE";
const blank = (node: Node) => node.nodeType === Node.TEXT_NODE && !node.textContent!.trim();
// Code, a line break, or bold or italic around code only.
const codeOnly = (node: Node) => isCode(node) || node.nodeName === "BR"
  || (/^(STRONG|B|EM|I)$/.test(node.nodeName) && [...node.childNodes].every((child) => isCode(child) || blank(child)) && !!(node as Element).querySelector("code"));
// Something a reader sees: text, or an element with text or an image.
const shows = (node: Node) => node.nodeType === Node.TEXT_NODE ? !blank(node)
  : node.nodeName !== "BR" && (!!node.textContent!.trim() || node.nodeName === "IMG" || !!(node as Element).querySelector("img"));

/**
 * Layout residue from the wiki conversion, repaired after load:
 * - Paragraphs that hold only line breaks are hidden, and line breaks before the first or after the
 *   last visible content of a paragraph or list item.
 * - Preformatted wiki text, a paragraph of code and line breaks only, becomes one block of lines
 *   that wraps at spaces; when it is prose, or code wrapped around a heading's text, the code reads
 *   as the text around it. Their words were joined by no-break spaces, which become spaces.
 * - A numbered list whose items start with their own numbers shows no second number (a list whose
 *   items sit in links joins its sentence in src/styles/article.css).
 * - HTML comment text inside a link's text is hidden.
 * - Long URLs, paths and tokens in code and in links that show a URL may wrap after "/" and the like.
 */
export function repairArticle(article: HTMLElement) {
  article.querySelectorAll<HTMLElement>("p, li").forEach((block) => {
    if (block.tagName === "P" && !block.textContent!.trim() && [...block.children].every((child) => child.tagName === "BR")) {
      block.hidden = true;
      return;
    }
    const nodes = [...block.childNodes];
    for (const order of [nodes, [...nodes].reverse()]) {
      for (const node of order) {
        if (shows(node)) break;
        if (node.nodeName === "BR") (node as HTMLElement).hidden = true;
      }
    }
  });

  article.querySelectorAll("p").forEach((paragraph) => {
    const nodes = [...paragraph.childNodes].filter((node) => !blank(node));
    if (!nodes.some((node) => node.nodeName !== "BR") || !nodes.every(codeOnly)) return;
    const text = nodes.map((node) => node.nodeName === "BR" ? "\n" : node.textContent).join("");
    if (paragraph.closest("h1, h2, h3, h4, h5, h6") || looksLikeProse(text)) {
      paragraph.querySelectorAll(":scope > code, :scope > :not(code) > code").forEach((code) => {
        code.classList.add("wiki-pre-prose");
        spaces(code, true);
      });
    } else {
      paragraph.classList.add("wiki-pre-lines");
      spaces(paragraph, false);
    }
  });
  article.querySelectorAll("code").forEach((code) => {
    if (code.closest("pre, .wiki-pre-lines, .wiki-pre-prose") || (code.textContent!.match(NBSP) ?? []).length < 3 || !looksLikeProse(code.textContent!)) return;
    code.classList.add("wiki-pre-prose");
    spaces(code, true);
  });

  article.querySelectorAll<HTMLOListElement>("ol").forEach((list) => {
    if (ownNumbers([...list.children].map((item) => item.textContent!), list.start)) list.classList.add("wiki-own-numbers");
  });

  article.querySelectorAll("a").forEach((link) => {
    for (const node of [...link.childNodes]) {
      const comment = node.nodeType === Node.TEXT_NODE ? /<!--[\s\S]*?-->/.exec(node.textContent!) : null;
      if (!comment) continue;
      const text = (node as Text).splitText(comment.index);
      text.splitText(comment[0].length);
      const hidden = document.createElement("span");
      hidden.hidden = true;
      text.replaceWith(hidden);
      hidden.append(text);
    }
  });

  const long: Text[] = [];
  const walker = document.createTreeWalker(article, NodeFilter.SHOW_TEXT);
  for (let node = walker.nextNode() as Text | null; node; node = walker.nextNode() as Text | null) {
    const parent = node.parentElement!;
    if (node.data.length < 20 || parent.closest("pre, [hidden]")) continue;
    if (parent.closest("code") || /^(https?:|www\.)/.test(parent.closest("a")?.textContent?.trim() ?? "")) long.push(node);
  }
  long.forEach((node) => breakPoints(node.data).reverse().forEach((at) => node.splitText(at).before(document.createElement("wbr"))));
}
