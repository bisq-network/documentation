/*
 * Recovery markers inside the article, made readable after the page loads. The server HTML, which
 * the fidelity gate checks, stays as it is; without scripts the markers show as before.
 * - A lost link ("label [unresolved link: Target]") reads as its words with a dotted underline and a
 *   small button that says the original link could not be restored and names its target.
 * - Where a page has an Also in switch, the wiki's unsupported <languages/> marker is hidden.
 * - A table column whose every value links to the same historical source gets one marked note.
 * - Source links whose visible text ("2026 source") is missing from their accessible name get it.
 */
export function enhanceResidue(article: HTMLElement) {
  let lost = 0;
  article.querySelectorAll<HTMLElement>("span.wiki-link-gap").forEach((gap) => {
    const marker = gap.querySelector<HTMLElement>(":scope > small");
    const match = /^\[unresolved link: (.+)\]$/.exec(marker?.textContent?.trim() ?? "");
    if (!marker || !match) return;
    lost += 1;
    marker.hidden = true;
    gap.classList.add("lost-link");
    const tip = document.createElement("span");
    tip.id = `docs-lost-link-${lost}`;
    tip.className = "lost-link-tip";
    tip.hidden = true;
    tip.textContent = `The original wiki link here could not be restored. It pointed to “${match[1]}”.`;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "lost-link-button";
    button.setAttribute("aria-label", "The original wiki link here could not be restored");
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-controls", tip.id);
    button.title = "The original wiki link here could not be restored";
    button.innerHTML = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 15l-1.5 1.5a3.5 3.5 0 0 1-5-5L4 10M15 9l1.5-1.5a3.5 3.5 0 0 1 5 5L20 14M8 4v2M4 8h2M16 20v-2M20 16h-2"></path></svg>';
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
    const wrap = table.closest(".table-wrap") ?? table;
    const after = wrap.nextElementSibling?.classList.contains("table-hint") ? wrap.nextElementSibling : wrap;
    after.after(paragraph);
  });

  article.querySelectorAll<HTMLAnchorElement>(".wiki-template-expanded > sup > a[aria-label]").forEach((link) => {
    const visible = link.textContent?.trim() ?? "";
    const label = link.getAttribute("aria-label") ?? "";
    if (visible && !label.toLowerCase().includes(visible.toLowerCase())) link.setAttribute("aria-label", `${visible}: ${label}`);
  });
}
