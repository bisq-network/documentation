// Starlight's search component imports @pagefind/default-ui as soon as the page is idle and builds
// the search interface straight away: 26.6 KB of script (gzipped) on every page, before anyone
// searches. astro.config.mjs points that one import here instead. This stand-in keeps the options
// and loads the real interface only when a reader shows they want to search: opening the dialog,
// Ctrl K or ⌘ K, or focus or the pointer on a search control. Starlight's markup, styles and
// dialog behaviour stay as they are.
type Options = { element?: string; [key: string]: unknown };
type RealUI = new (options: Options) => unknown;

// Product and topic filters show as a row of chips (styled in src/styles/custom.css), so their
// groups start open.
const extra = { openFilters: ["product", "topic"] };
const waiting: Options[] = [];
let loading: Promise<RealUI> | undefined;

/** Build the real interface; once its input exists, focus it if the dialog is already open. */
function build(Real: RealUI, options: Options) {
  new Real({ ...options, ...extra });
  const container = options.element ? document.querySelector(options.element) : null;
  if (!container) return;
  const focus = () => {
    const input = container.querySelector<HTMLInputElement>("input");
    if (!input) return false;
    if (container.closest("dialog")?.open && !container.contains(document.activeElement)) input.focus();
    return true;
  };
  if (focus()) return;
  const observer = new MutationObserver(() => { if (focus()) observer.disconnect(); });
  observer.observe(container, { childList: true, subtree: true });
}

function load() {
  loading ??= Promise.all([import("@pagefind/default-ui/npm_dist/mjs/ui-core.mjs"), import("./search-results")]).then(([{ PagefindUI }, { enhanceSearchResults }]) => {
    for (const type of triggers) document.removeEventListener(type, onIntent, true);
    document.querySelectorAll<HTMLElement>("site-search").forEach(enhanceSearchResults);
    for (const options of waiting.splice(0)) build(PagefindUI, options);
    return PagefindUI;
  }, (error) => {
    // For example a tab opened before a new deployment asks for a file that no longer exists:
    // forget the attempt, so the next try starts again instead of failing silently forever.
    loading = undefined;
    console.error("Search could not load", error);
    throw error;
  });
  return loading;
}

const triggers = ["focusin", "pointerover", "click", "keydown"] as const;
function onIntent(event: Event) {
  if (event instanceof KeyboardEvent) {
    if (!((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k")) return;
  } else if (!(event.target instanceof Element) || !event.target.closest("site-search, [data-docs-search]")) {
    return;
  }
  void load().catch(() => {});
}
for (const type of triggers) document.addEventListener(type, onIntent, { capture: true, passive: true });

export class PagefindUI {
  constructor(options: Options) {
    if (loading) { void loading.then((Real) => build(Real, options), () => { waiting.push(options); }); return; }
    waiting.push(options);
    // Someone opened the dialog before this file arrived: no further trigger may come, so load now.
    const element = options.element ? document.querySelector(options.element) : null;
    if (element?.closest("dialog")?.open) void load().catch(() => {});
  }
}
