import { RECENT_KEY, recentPages } from "../lib/recently-read.mjs";
// What the site adds to Starlight's search once the search interface exists: a label for the input;
// before typing, the home page's suggestions and the articles this browser read last; a message when
// nothing matches; a notice when no result contains a query word; announced result counts; and a
// copy-link button per section result. src/scripts/pagefind-ui-on-open.ts loads this with the
// interface, and src/styles/search.css styles it.
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

  const container = search.querySelector(".search-container");
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const element = <K extends keyof HTMLElementTagNameMap>(tag: K, text = "", className = "") => {
    const node = document.createElement(tag);
    if (text) node.textContent = text;
    if (className) node.className = className;
    return node;
  };
  // The live region exists before the first message, so screen readers announce that one too.
  const announcer = element("div", "", "docs-search-status sr-only");
  announcer.setAttribute("role", "status");
  announcer.setAttribute("aria-live", "polite");
  container?.append(announcer);
  let lastAnnouncement = "";
  let announcedFor = "";
  const announce = (text: string) => {
    if (text === lastAnnouncement) return;
    lastAnnouncement = text;
    announcer.textContent = text;
  };

  /** Search as if the query had been typed, keeping the focus in the field to refine it. */
  const searchFor = (query: string) => {
    const input = search.querySelector<HTMLInputElement>(".pagefind-ui__search-input");
    if (!input) return;
    input.value = query;
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.focus();
  };
  /** The home page's "Try" suggestions, from the template in src/components/Search.astro. */
  const suggestions = () => {
    const template = document.getElementById("docs-search-try");
    const row = template instanceof HTMLTemplateElement ? template.content.firstElementChild?.cloneNode(true) : null;
    return row instanceof HTMLElement ? row : null;
  };

  // Before typing: the suggestions and "Recently read". search.css shows this only while the field is
  // empty, so typing replaces it with results and clearing the field brings it back.
  const start = element("div", "", "docs-search-start");
  const tryRow = suggestions();
  if (tryRow) start.append(tryRow);
  let stored: string | null = null;
  try { stored = localStorage.getItem(RECENT_KEY); } catch { /* No storage: no list. */ }
  const recent = recentPages(stored, { base, current: location.pathname });
  if (recent.length) {
    const section = element("section", "", "docs-search-recent");
    section.setAttribute("aria-labelledby", "docs-search-recent-title");
    const title = element("h2", "Recently read");
    title.id = "docs-search-recent-title";
    const clear = element("button", "Clear");
    clear.type = "button";
    clear.dataset.recentClear = "";
    clear.setAttribute("aria-label", "Clear recently read");
    const head = element("div", "", "docs-search-recent-head");
    head.append(title, clear);
    const list = element("ul", "", "home-task-list");
    for (const page of recent) {
      const link = element("a");
      link.href = page.path;
      link.append(element("span", page.title));
      const item = element("li");
      item.append(link);
      list.append(item);
    }
    section.append(head, list);
    start.append(section);
  }
  announcer.before(start);

  search.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    const suggestion = target?.closest<HTMLElement>("[data-search-try]");
    if (suggestion) { searchFor(suggestion.dataset.searchTry ?? ""); return; }
    if (target?.closest("[data-recent-clear]")) {
      try { localStorage.removeItem(RECENT_KEY); } catch { /* Nothing stored that could be removed. */ }
      start.querySelector(".docs-search-recent")?.remove();
      search.querySelector<HTMLInputElement>(".pagefind-ui__search-input")?.focus();
      announce("Recently read list cleared");
    }
  });

  // Pagefind's default UI also returns partial-word matches (for qzxvplk it marks the letter "q").
  // Say so when no result contains a query word, announce result counts, and add a copy-link button
  // to each section result. Everything is derived from the rendered results, so nothing is re-indexed.
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
  /**
   * Show a notice right before Pagefind's message. An existing notice that already says the same
   * thing stays, so a link in it keeps keyboard focus when unrelated parts of the dialog change
   * (for example a Copy link label reverting).
   */
  const place = (key: string, message: HTMLElement, build: () => HTMLElement) => {
    const existing = search.querySelector<HTMLElement>("[data-docs-search-notice]");
    if (existing?.dataset.docsSearchNotice === key && existing.nextElementSibling === message) return;
    existing?.remove();
    const notice = build();
    notice.dataset.docsSearchNotice = key;
    message.before(notice);
  };
  const browseLink = () => {
    const browse = element("a", "browse all article titles");
    browse.href = `${base}/browse/all/`;
    return browse;
  };
  const refresh = () => {
    const area = search.querySelector<HTMLElement>(".pagefind-ui__results-area");
    const message = area?.querySelector<HTMLElement>(".pagefind-ui__message");
    if (!area || !message) { clearNotice(area); return; }
    const found = /^(No|\d+) results? for (.+)$/.exec(message.textContent?.trim() || "");
    if (!found) { clearNotice(area); return; }
    const query = found[2];
    const fresh = `${message.textContent}` !== announcedFor;
    announcedFor = `${message.textContent}`;

    // Nothing found: name the query, suggest what to change, and offer the suggestions. No filters
    // show (pagefind-ui-on-open.ts leaves out values without results, search.css empty groups).
    if (found[1] === "No") {
      area.toggleAttribute("data-no-exact", true);
      place(`none\n${query}`, message, () => {
        const empty = element("div", "", "docs-search-empty");
        empty.append(element("h2", `No results for “${query}”`), element("p", "Try fewer or different words, or check the spelling."));
        const tryRow = suggestions();
        if (tryRow) empty.append(tryRow);
        const browse = element("p");
        browse.append("Or ", browseLink(), ".");
        empty.append(browse);
        return empty;
      });
      if (fresh) announce(`No results for “${query}”. Try fewer or different words.`);
      return;
    }

    const terms = wordsOf(query).map((word) => ({ word, key: fold(word) })).filter(({ key }) => key.length > 1);
    const marks = [...area.querySelectorAll("mark")].map((mark) => fold(mark.textContent || ""));
    const missing = terms.filter(({ key }) => !marks.some((mark) => sharesWord(mark, key)));
    for (const result of area.querySelectorAll<HTMLElement>(".pagefind-ui__result-nested")) {
      if (result.querySelector(".docs-search-copy")) continue;
      const link = result.querySelector<HTMLAnchorElement>("a");
      if (!link) continue;
      // One icon button per section result; it shows on hover and focus, and always on touch screens.
      // search.css draws the link icon from the site's set (--bd-icon-link), so no icon code loads here.
      const button = element("button", "", "docs-search-copy");
      button.type = "button";
      button.title = "Copy link";
      button.setAttribute("aria-label", `Copy link to section: ${link.textContent?.trim()}`);
      button.addEventListener("click", async () => {
        lastAnnouncement = "";
        try { await navigator.clipboard.writeText(new URL(link.getAttribute("href") || "", location.href).href.replace(/#_top$/, "")); announce("Link copied"); button.dataset.state = "copied"; }
        catch { announce("Could not copy the link"); button.dataset.state = "failed"; }
        setTimeout(() => { delete button.dataset.state; }, 1500);
      });
      result.append(button);
    }
    if (!terms.length || !missing.length) { clearNotice(area); if (fresh) announce(message.textContent?.trim() || ""); return; }
    const all = missing.length === terms.length;
    const heading = `No exact match for “${all ? query : missing.map(({ word }) => word).join(" ")}”.`;
    area.toggleAttribute("data-no-exact", all);
    place(`${all ? "all" : "some"}\n${heading}`, message, () => {
      const notice = element("div", "", "docs-search-notice");
      const detail = element("p");
      detail.append(all
        ? "Search found only fragments of the word, so the results below are probably not relevant. Check the spelling or try fewer words, or "
        // Pagefind searches "bisq-easy" as "bisq" only, so suggest spaces rather than a spelling check.
        : /[\p{L}\p{N}][^\p{L}\p{M}\p{N}\s]+[\p{L}\p{N}]/u.test(query)
          ? "The results below match only part of what you typed. Try separating the words with spaces, or "
          : "The results below match the other words in your search. Check the spelling of the missing word, or ", browseLink(), ".");
      notice.append(element("strong", heading), detail);
      return notice;
    });
    if (fresh) announce(`${heading} ${all ? "Results shown are partial-word matches only." : ""}`.trim());
  };
  // Ignore mutations made by this script (notices, copy buttons, status text, the panel before typing)
  // so they do not trigger a refresh.
  const isOwn = (node: Node) => !!(node instanceof Element ? node : node.parentElement)?.closest(".docs-search-copy, [data-docs-search-notice], .docs-search-status, .docs-search-start");
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
