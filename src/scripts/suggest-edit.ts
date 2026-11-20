// "Suggest an edit" (src/components/SuggestEdit.astro) and the "Suggest a fix" button next to text
// selected in an article. The menu is a popover: it opens, closes on Escape or a click elsewhere and
// returns focus without script; this script places it under its button and points "Describe the fix"
// at the issue form with the section and the selected text. Addresses: ./suggest-edit-links.mjs.
import { reportUrl } from "./suggest-edit-links.mjs";

const roots = document.querySelectorAll<HTMLElement>("[data-suggest-edit]");
const article = document.querySelector<HTMLElement>(".wiki-recovered-article");

if (roots.length && article) {
  const page = roots[0].dataset.page || location.origin + location.pathname;
  const headings = article.querySelectorAll<HTMLElement>("h2[id], h3[id], h4[id], h5[id], h6[id]");

  /** The text selected in the article, with the ID of the section it starts in. */
  const selected = () => {
    const selection = getSelection();
    if (!selection?.rangeCount || selection.isCollapsed) return;
    const range = selection.getRangeAt(0);
    const text = selection.toString().trim();
    if (!text || !article.contains(range.commonAncestorContainer)) return;
    let section = "";
    for (const heading of headings) if (heading.compareDocumentPosition(range.startContainer) & Node.DOCUMENT_POSITION_FOLLOWING) section = heading.id;
    return { text, section, range };
  };
  type Selected = ReturnType<typeof selected>;
  const formFor = (pick: Selected) => {
    // Without a selection, the section the contents list marks as the one being read.
    const current = document.querySelector<HTMLAnchorElement>(':is(starlight-toc, mobile-starlight-toc) a[aria-current="true"]');
    const id = current ? decodeURIComponent(current.hash.slice(1)) : "";
    const section = pick ? pick.section : article.contains(document.getElementById(id)) ? id : "";
    return reportUrl({ page, section, quote: pick?.text });
  };

  for (const root of roots) {
    const trigger = root.querySelector<HTMLButtonElement>("[popovertarget]")!;
    const menu = root.querySelector<HTMLElement>("[popover]")!;
    const describe = menu.querySelector<HTMLAnchorElement>("[data-suggest-describe]")!;
    // A click on the button can clear the selection before the menu opens.
    let held: Selected;
    trigger.addEventListener("pointerdown", () => { held = selected(); });
    menu.addEventListener("beforetoggle", (event) => {
      if ((event as ToggleEvent).newState === "open") {
        describe.href = formFor(selected() ?? held);
        // Under the button, inside the window, lined up with the button's nearer edge; it scrolls
        // with the page.
        const box = trigger.getBoundingClientRect();
        const width = document.documentElement.clientWidth;
        const left = box.left + box.width / 2 < width / 2;
        const edge = Math.max(16, left ? box.left : width - box.right);
        Object.assign(menu.style, { top: `${box.bottom + scrollY + 4}px`, left: left ? `${edge}px` : "auto", right: left ? "auto" : `${edge}px`, maxWidth: `${width - edge - 16}px` });
      }
      held = undefined;
    });
    menu.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
      const links = [...menu.querySelectorAll("a")];
      const next = links.indexOf(document.activeElement as HTMLAnchorElement) + (event.key === "ArrowDown" ? 1 : -1);
      links.at(next % links.length)?.focus();
      event.preventDefault();
    });
    // A turned phone or a narrower window moves the button.
    let width = innerWidth;
    addEventListener("resize", () => { if (innerWidth !== width) menu.hidePopover?.(); width = innerWidth; });
  }

  // "Suggest a fix" next to the selection. Not after a touch selection, where the phone's own
  // selection menu sits in the same place: there the Suggest an edit button takes the selection.
  let bubble: HTMLAnchorElement | undefined;
  let pointer = "";
  let pressed = false;
  let back: HTMLElement | undefined;
  const hide = () => { if (bubble) bubble.hidden = true; };
  const show = () => {
    const pick = selected();
    if (!pick || pointer === "touch") return hide();
    if (!bubble) {
      bubble = document.createElement("a");
      bubble.className = "suggest-fix";
      bubble.textContent = "Suggest a fix";
      // Pressing it must not clear the selection first.
      bubble.addEventListener("mousedown", (event) => event.preventDefault());
      bubble.addEventListener("keydown", (event) => {
        if (event.key !== "Escape" && event.key !== "Tab") return;
        event.preventDefault();
        hide();
        back && back !== document.body ? back.focus() : bubble!.blur();
      });
      document.body.append(bubble);
    }
    bubble.href = formFor(pick);
    bubble.hidden = false;
    const rects = [...pick.range.getClientRects()].filter((rect) => rect.width);
    const first = rects[0] ?? pick.range.getBoundingClientRect();
    const last = rects.at(-1) ?? first;
    const top = (document.querySelector("header")?.getBoundingClientRect().bottom ?? 0) + 8;
    const { offsetWidth: width, offsetHeight: height } = bubble;
    const y = first.top - height - 8 >= top ? first.top - height - 8 : Math.min(last.bottom + 8, innerHeight - height - 8);
    const x = Math.min(Math.max(8, first.left + first.width / 2 - width / 2), innerWidth - width - 8);
    Object.assign(bubble.style, { top: `${Math.max(top, y)}px`, left: `${x}px` });
  };
  // After a press in the article, once the mouse is up; a press anywhere else only hides it.
  let inArticle = false;
  addEventListener("pointerdown", (event) => {
    pointer = event.pointerType;
    if (event.target === bubble) return;
    pressed = true;
    inArticle = article.contains(event.target as Node);
    hide();
  });
  const release = () => { if (pressed) { pressed = false; if (inArticle) setTimeout(show); } };
  addEventListener("pointerup", release);
  addEventListener("pointercancel", release);
  document.addEventListener("selectionchange", () => { if (!pressed) show(); });
  addEventListener("scroll", hide, { passive: true });
  addEventListener("keydown", (event) => {
    pointer = "";
    if (event.key === "Escape") hide();
    // From the reading position, Tab goes to the button first; Tab or Escape there comes back.
    if (event.key === "Tab" && !event.shiftKey && bubble && !bubble.hidden && document.activeElement !== bubble) {
      back = document.activeElement as HTMLElement;
      event.preventDefault();
      bubble.focus();
    }
  });
}
