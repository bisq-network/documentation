/** Open native Starlight search and fill its lazily created Pagefind input. */
async function openDocsSearch(query: string) {
  const trigger = document.querySelector<HTMLButtonElement>("site-search [data-open-modal]");
  if (!trigger) return;
  trigger.click();
  /** Return false until the input exists; otherwise apply the query and focus it. */
  const fill = () => {
    const input = document.querySelector<HTMLInputElement>(".pagefind-ui__search-input");
    if (!input) return false;
    input.value = query;
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.focus();
    return true;
  };
  if (fill()) return;
  const observer = new MutationObserver(() => { if (fill()) observer.disconnect(); });
  observer.observe(document.querySelector("site-search")!, { childList: true, subtree: true });
  setTimeout(() => observer.disconnect(), 5000);
}

document.querySelectorAll<HTMLElement>("[data-search-controls], [data-docs-search]").forEach((element) => {
  element.hidden = false;
});
document.addEventListener("click", (event) => {
  const button = (event.target as Element).closest<HTMLElement>("[data-docs-search]");
  if (button) { event.preventDefault(); event.stopPropagation(); void openDocsSearch(button.dataset.docsSearch ?? ""); }
});

const directory = document.querySelector<HTMLElement>("[data-article-directory]");
if (directory) {
  const normalize = (text: string) => text.normalize("NFKD").replace(/\p{M}/gu, "").toLowerCase();
  const input = directory.querySelector<HTMLInputElement>("#docs-title-filter")!;
  const topicButtons = [...directory.querySelectorAll<HTMLButtonElement>("[data-topic-filter]")];
  const productButtons = [...directory.querySelectorAll<HTMLButtonElement>("[data-product-filter]")];
  const items = [...directory.querySelectorAll<HTMLElement>("[data-directory-item]")].map((element) => ({ element, title: normalize(element.dataset.title ?? ""), topic: element.dataset.topic, products: JSON.parse(element.dataset.products || "[]") as string[] }));
  const params = new URLSearchParams(location.search);
  let topic = topicButtons.some((button) => button.dataset.topicFilter === params.get("topic")) ? params.get("topic")! : "all";
  let product = productButtons.some((button) => button.dataset.productFilter === params.get("product")) ? params.get("product")! : "all";
  input.value = params.get("q") ?? "";
  directory.querySelector<HTMLElement>(".directory-tools")!.hidden = false;
  /** Match an explicit label, all products, or articles with no stated product. */
  const productMatches = (products: string[], filter: string) => filter === "all" || (filter === "none" ? products.length === 0 : products.includes(filter));
  /**
   * Apply the title, topic and product filters together. Keep visible groups,
   * facet counts, the live result status and URL query parameters in sync.
   */
  const update = () => {
    const query = normalize(input.value.trim());
    const matchingTitles = items.filter((item) => item.title.includes(query));
    for (const item of items) item.element.hidden = !(item.title.includes(query) && (topic === "all" || item.topic === topic) && productMatches(item.products, product));
    const count = items.filter((item) => !item.element.hidden).length;
    directory.querySelector("[data-directory-count]")!.textContent = count === items.length ? "All articles" : `${count} ${count === 1 ? "article" : "articles"} found`;
    const empty = directory.querySelector<HTMLElement>(".directory-empty")!;
    empty.hidden = count > 0;
    empty.querySelector<HTMLElement>("[data-docs-search]")!.dataset.docsSearch = input.value.trim();
    for (const button of topicButtons) {
      const value = button.dataset.topicFilter!;
      button.setAttribute("aria-pressed", String(value === topic));
      button.querySelector("[data-filter-count]")!.textContent = value === "all" ? "" : String(matchingTitles.filter((item) => item.topic === value && productMatches(item.products, product)).length);
    }
    for (const button of productButtons) {
      const value = button.dataset.productFilter!;
      button.setAttribute("aria-pressed", String(value === product));
      button.querySelector("[data-filter-count]")!.textContent = value === "all" ? "" : String(matchingTitles.filter((item) => (topic === "all" || item.topic === topic) && productMatches(item.products, value)).length);
    }
    directory.querySelectorAll<HTMLElement>("[data-directory-subgroup], [data-directory-group]").forEach((group) => {
      const visible = [...group.querySelectorAll<HTMLElement>("[data-directory-item]")].filter((element) => !element.hidden).length;
      group.hidden = visible === 0;
      const count = group.querySelector("[data-group-count]");
      if (count) count.textContent = String(visible);
    });
    const url = new URL(location.href);
    for (const [key, value] of [["q", input.value], ["topic", topic === "all" ? "" : topic], ["product", product === "all" ? "" : product]]) {
      if (value) url.searchParams.set(key, value); else url.searchParams.delete(key);
    }
    history.replaceState(history.state, "", url);
  };
  input.addEventListener("input", update);
  topicButtons.forEach((button) => button.addEventListener("click", () => { topic = button.dataset.topicFilter!; update(); }));
  productButtons.forEach((button) => button.addEventListener("click", () => { product = button.dataset.productFilter!; update(); }));
  directory.querySelector("[data-directory-reset]")?.addEventListener("click", () => { input.value = ""; topic = "all"; product = "all"; update(); input.focus(); });
  update();
}
