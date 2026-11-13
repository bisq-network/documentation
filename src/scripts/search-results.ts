// What the site adds to Starlight's search once the search interface exists: a label for the
// input, a notice when no result contains a query word, announced result counts, and a copy-link
// button per section result. src/scripts/pagefind-ui-on-open.ts loads this with the interface.
export function enhanceSearchResults(search: HTMLElement) {
  const addLabel = () => {
    const input = search.querySelector<HTMLInputElement>(".pagefind-ui__search-input");
    const form = input?.closest("form");
    if (!input || !form) return false;
    if (document.getElementById("docs-search-label")) return true;
    input.id = "docs-search-query";
    const label = document.createElement("label");
    label.id = "docs-search-label";
    label.htmlFor = input.id;
    label.className = "docs-search-label";
    label.textContent = "Search documentation";
    form.before(label);
    return true;
  };
  if (!addLabel()) {
    const observer = new MutationObserver(() => { if (addLabel()) observer.disconnect(); });
    observer.observe(search, { childList: true, subtree: true });
  }

  // Pagefind's default UI also returns partial-word matches (for qzxvplk it marks the letter "q").
  // Say so when no result contains a query word, announce result counts, and add a copy-link button
  // to each section result. Everything is derived from the rendered results, so nothing is re-indexed.
  const browseUrl = `${import.meta.env.BASE_URL.replace(/\/$/, "")}/browse/all/`;
  let announcer: HTMLElement | null = null;
  let lastAnnouncement = "";
  let announcedFor = "";
  const announce = (text: string) => {
    if (text === lastAnnouncement) return;
    lastAnnouncement = text;
    if (!announcer) {
      announcer = document.createElement("div");
      announcer.className = "docs-search-status sr-only";
      announcer.setAttribute("role", "status");
      announcer.setAttribute("aria-live", "polite");
      search.querySelector(".pagefind-ui")?.append(announcer);
    }
    announcer.textContent = text;
  };
  // Compare words without case or accents ("metodos" matches a highlighted "métodos"), and split the
  // query on anything that is not a letter or digit, so quotes and hyphens do not count as part of a word.
  const fold = (text: string) => text.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();
  const wordsOf = (text: string) => text.split(/[^\p{L}\p{M}\p{N}]+/u).filter(Boolean);
  const sharesWord = (mark: string, term: string) => {
    let n = 0;
    while (n < mark.length && n < term.length && mark[n] === term[n]) n++;
    return mark.includes(term) || n >= Math.max(3, Math.ceil(term.length * 0.6));
  };
  const clearNotice = (area?: HTMLElement | null) => {
    search.querySelector("[data-docs-search-notice]")?.remove();
    area?.removeAttribute("data-no-exact");
  };
  const refresh = () => {
    const area = search.querySelector<HTMLElement>(".pagefind-ui__results-area");
    const message = area?.querySelector<HTMLElement>(".pagefind-ui__message");
    if (!area || !message) { clearNotice(area); return; }
    const found = /^(No|\d+) results? for (.+)$/.exec(message.textContent?.trim() || "");
    if (!found) { clearNotice(area); return; }
    const query = found[2];
    const terms = wordsOf(query).map((word) => ({ word, key: fold(word) })).filter(({ key }) => key.length > 1);
    const marks = [...area.querySelectorAll("mark")].map((mark) => fold(mark.textContent || ""));
    const missing = terms.filter(({ key }) => !marks.some((mark) => sharesWord(mark, key)));
    for (const result of area.querySelectorAll<HTMLElement>(".pagefind-ui__result-nested")) {
      if (result.querySelector(".docs-search-copy")) continue;
      const link = result.querySelector<HTMLAnchorElement>("a");
      if (!link) continue;
      // One icon button per section result; it shows on hover and focus, and always on touch screens.
      const button = document.createElement("button");
      button.type = "button";
      button.className = "docs-search-copy";
      button.title = "Copy link";
      button.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"></path><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"></path></svg>';
      const name = `Copy link to section: ${link.textContent?.trim()}`;
      button.setAttribute("aria-label", name);
      button.addEventListener("click", async () => {
        lastAnnouncement = "";
        try { await navigator.clipboard.writeText(new URL(link.getAttribute("href") || "", location.href).href.replace(/#_top$/, "")); announce("Link copied"); button.dataset.state = "copied"; }
        catch { announce("Could not copy the link"); button.dataset.state = "failed"; }
        setTimeout(() => { delete button.dataset.state; }, 1500);
      });
      result.append(button);
    }
    const fresh = `${message.textContent}` !== announcedFor;
    announcedFor = `${message.textContent}`;
    if (!terms.length || !missing.length) { clearNotice(area); if (fresh) announce(message.textContent?.trim() || ""); return; }
    const all = missing.length === terms.length;
    const none = found[1] === "No";
    const heading = `No exact match for \u201c${all ? query : missing.map(({ word }) => word).join(" ")}\u201d.`;
    const kind = none ? "none" : all ? "all" : "some";
    area.toggleAttribute("data-no-exact", all);
    // Keep an existing notice that already says the same thing, so a link in it keeps keyboard focus
    // when unrelated parts of the dialog change (for example a Copy link label reverting).
    const existing = search.querySelector<HTMLElement>("[data-docs-search-notice]");
    if (existing?.dataset.docsSearchNotice === `${kind}\n${heading}` && existing.nextElementSibling === message) return;
    existing?.remove();
    const notice = document.createElement("div");
    notice.dataset.docsSearchNotice = `${kind}\n${heading}`;
    notice.className = "docs-search-notice";
    const title = document.createElement("strong");
    title.textContent = heading;
    const detail = document.createElement("p");
    detail.append(none
      ? "Search found no articles. Check the spelling or try fewer words, or "
      : all
        ? "Search found only fragments of the word, so the results below are probably not relevant. Check the spelling or try fewer words, or "
        // Pagefind searches "bisq-easy" as "bisq" only, so suggest spaces rather than a spelling check.
        : /[\p{L}\p{N}][^\p{L}\p{M}\p{N}\s]+[\p{L}\p{N}]/u.test(query)
          ? "The results below match only part of what you typed. Try separating the words with spaces, or "
          : "The results below match the other words in your search. Check the spelling of the missing word, or ");
    const browse = document.createElement("a");
    browse.href = browseUrl;
    browse.textContent = "browse all article titles";
    detail.append(browse, ".");
    notice.append(title, detail);
    message.before(notice);
    if (fresh) announce(`${heading} ${kind === "all" ? "Results shown are partial-word matches only." : ""}`.trim());
  };
  // Ignore mutations made by this script (notice, copy buttons, status text) so they do not trigger a refresh.
  const isOwn = (node: Node) => !!(node instanceof Element ? node : node.parentElement)?.closest(".docs-search-copy, [data-docs-search-notice], .docs-search-status");
  const ownRecord = (record: MutationRecord) => isOwn(record.target)
    || (record.type === "childList" && [...record.addedNodes, ...record.removedNodes].every(isOwn));
  let pending = 0;
  const watcher = new MutationObserver((records) => {
    if (records.every(ownRecord)) return;
    clearTimeout(pending);
    pending = window.setTimeout(() => { refresh(); watcher.takeRecords(); }, 120);
  });
  watcher.observe(search, { childList: true, subtree: true, characterData: true });
}
