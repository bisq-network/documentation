import { enhanceResidue } from "./wiki-residue";

const article = document.querySelector<HTMLElement>(".wiki-recovered-article");

if (article) {
  const progress = document.createElement("div");
  progress.className = "reading-progress";
  progress.setAttribute("aria-hidden", "true");
  document.body.append(progress);
  let scheduled = false;
  /** Clamp reading progress to the article bounds, allowing for the fixed header. */
  const updateProgress = () => {
    const box = article.getBoundingClientRect();
    const header = document.querySelector("header")?.getBoundingClientRect().height ?? 0;
    const distance = Math.max(1, box.height - window.innerHeight + header);
    const fraction = Math.max(0, Math.min(1, (header - box.top) / distance));
    progress.style.transform = `scaleX(${fraction})`;
    scheduled = false;
  };
  /** Coalesce scroll, resize and article-size changes into one animation frame. */
  const requestProgress = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(updateProgress);
  };
  window.addEventListener("scroll", requestProgress, { passive: true });
  window.addEventListener("resize", requestProgress);
  new ResizeObserver(requestProgress).observe(article);
  requestProgress();
}

if (article) {
  const toast = document.createElement("div");
  toast.className = "link-toast";
  toast.setAttribute("role", "status");
  toast.setAttribute("aria-live", "polite");
  toast.hidden = true;
  document.body.append(toast);
  let toastTimeout: ReturnType<typeof setTimeout>;
  const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href ?? location.href;

  /**
   * Copy the canonical article URL. (Section links are Starlight's heading anchor links.)
   * Announce success briefly; on denial keep a selectable URL available until
   * dismissed, then return focus to the control that requested the copy.
   */
  const copyLink = async (title: string, trigger: HTMLButtonElement) => {
    const url = new URL(canonical);
    url.hash = "";
    clearTimeout(toastTimeout);
    toast.replaceChildren();
    toast.hidden = false;
    try {
      await navigator.clipboard.writeText(url.href);
      const message = document.createElement("strong");
      message.textContent = `Copied link to “${title}”`;
      const link = document.createElement("span");
      link.textContent = url.href;
      toast.append(message, link);
      toastTimeout = setTimeout(() => { toast.hidden = true; }, 3200);
    } catch {
      const label = document.createElement("label");
      label.textContent = `Copy link to “${title}”`;
      const input = document.createElement("input");
      input.readOnly = true;
      input.value = url.href;
      input.setAttribute("aria-label", `Link to ${title}`);
      label.append(input);
      const close = document.createElement("button");
      close.type = "button";
      close.textContent = "Close";
      close.addEventListener("click", () => {
        toast.hidden = true;
        trigger.focus();
      });
      toast.append(label, close);
      input.focus();
      input.select();
    }
  };

  document.querySelectorAll<HTMLButtonElement>("[data-copy-page]").forEach((button) => {
    button.hidden = false;
    button.addEventListener("click", () => { void copyLink(document.querySelector("h1")?.textContent ?? "article", button); });
  });
}

if (article) {
  article.querySelectorAll<HTMLTableElement>("table").forEach((table, index) => {
    const wrap = document.createElement("div");
    wrap.className = "table-wrap";
    wrap.setAttribute("role", "region");
    wrap.tabIndex = 0;
    const headers = [...table.querySelectorAll("th")].slice(0, 3).map((cell) => cell.textContent?.trim()).filter(Boolean);
    wrap.setAttribute("aria-label", `Table ${index + 1}${headers.length ? `: ${headers.join(", ")}` : ""}`);
    table.replaceWith(wrap);
    wrap.append(table);
    const hint = document.createElement("p");
    hint.className = "table-hint";
    hint.setAttribute("data-pagefind-ignore", "");
    hint.textContent = "Scroll the table sideways for more columns";
    hint.hidden = true;
    wrap.after(hint);
    const updateHint = () => { hint.hidden = wrap.scrollWidth <= wrap.clientWidth + 1; };
    new ResizeObserver(updateHint).observe(wrap);
    updateHint();
  });

  article.querySelectorAll<HTMLPreElement>("pre").forEach((pre) => {
    pre.tabIndex = 0;
    pre.setAttribute("aria-label", "Code block");
    if (pre.closest(".wiki-table-source")) return;
    const wrap = document.createElement("div");
    wrap.className = "code-block";
    const bar = document.createElement("div");
    bar.className = "code-bar";
    bar.setAttribute("data-pagefind-ignore", "");
    const label = document.createElement("span");
    label.textContent = "Code";
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Copy";
    button.setAttribute("aria-label", "Copy code");
    const status = document.createElement("span");
    status.className = "sr-only";
    status.setAttribute("role", "status");
    bar.append(label, status, button);
    pre.replaceWith(wrap);
    wrap.append(bar, pre);
    let timeout: ReturnType<typeof setTimeout>;
    button.addEventListener("click", async () => {
      clearTimeout(timeout);
      try {
        await navigator.clipboard.writeText(pre.textContent ?? "");
        button.textContent = "Copied";
        status.textContent = "Code copied";
      } catch {
        pre.focus();
        const range = document.createRange();
        range.selectNodeContents(pre);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
        status.textContent = "Code selected. Use your copy keyboard shortcut.";
        button.textContent = "Selected";
      }
      timeout = setTimeout(() => { button.textContent = "Copy"; status.textContent = ""; }, 1500);
    });
  });

  article.querySelectorAll<HTMLElement>(".wiki-admonition").forEach((note) => {
    const label = note.querySelector("p:first-child > strong")?.textContent ?? "";
    note.classList.add(/warning|caution|important/i.test(label) ? "adm-warning" : "adm-note");
  });

  type ImageRecord = { id: string; status?: string; width?: number; height?: number };
  const metadata: ImageRecord[] = JSON.parse(document.getElementById("article-media-data")?.textContent || "[]");
  let viewer: HTMLDialogElement | undefined;
  /**
   * Reuse a modal viewer for the linked recovered file, resetting zoom and its
   * historical recovery metadata on each open. Native dialog dismissal restores
   * focus to the original image link; modified clicks never call this helper.
   */
  const openImage = (link: HTMLAnchorElement, original: HTMLImageElement, figure: HTMLElement) => {
    if (!viewer) {
      viewer = document.createElement("dialog");
      viewer.className = "image-viewer";
      viewer.setAttribute("aria-labelledby", "docs-image-title");
      viewer.innerHTML = `<div class="image-viewer-bar"><strong id="docs-image-title"></strong><button type="button" class="docs-button" data-image-size>Actual size</button><button type="button" class="docs-button" data-image-close>Close</button></div><div class="image-viewer-stage fit" tabindex="0" role="region" aria-label="Image"><img alt="" /></div><div class="image-viewer-footer"><p data-image-status></p><a class="docs-button" data-image-original target="_blank" rel="noopener">Open original file</a></div>`;
      document.body.append(viewer);
      viewer.querySelector<HTMLButtonElement>("[data-image-close]")?.addEventListener("click", () => viewer?.close());
      viewer.querySelector<HTMLButtonElement>("[data-image-size]")?.addEventListener("click", (event) => {
        const fit = viewer!.querySelector(".image-viewer-stage")!.classList.toggle("fit");
        (event.currentTarget as HTMLButtonElement).textContent = fit ? "Actual size" : "Fit to window";
      });
      viewer.addEventListener("click", (event) => {
        if (event.target !== viewer) return;
        const bounds = viewer!.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) viewer?.close();
      });
    }
    const record = metadata.find((item) => item.id === figure.id);
    const image = viewer.querySelector<HTMLImageElement>("img")!;
    viewer.querySelector("#docs-image-title")!.textContent = original.alt || "Recovered image";
    image.alt = original.alt;
    image.src = link.href;
    viewer.querySelector<HTMLAnchorElement>("[data-image-original]")!.href = link.href;
    viewer.querySelector(".image-viewer-stage")!.classList.add("fit");
    viewer.querySelector("[data-image-size]")!.textContent = "Actual size";
    const status = record?.status === "original" ? "Full-size recovered file" : "Recovered thumbnail or partial file";
    /** Prefer recorded dimensions, falling back to the loaded file's natural size. */
    const showDimensions = () => {
      const width = record?.width || image.naturalWidth;
      const height = record?.height || image.naturalHeight;
      viewer!.querySelector("[data-image-status]")!.textContent = `${status}${width && height ? ` · ${width} × ${height} px` : ""} · Historical screenshot; current software may differ`;
    };
    image.onload = showDimensions;
    showDimensions();
    viewer.addEventListener("close", () => link.focus(), { once: true });
    viewer.showModal();
  };

  article.querySelectorAll<HTMLElement>("figure.wiki-source-image").forEach((figure) => {
    const link = figure.querySelector<HTMLAnchorElement>("a");
    const image = link?.querySelector<HTMLImageElement>("img");
    if (!link || !image) return;
    link.classList.add("image-zoom");
    link.setAttribute("aria-label", `Inspect image: ${image.alt || "figure"}`);
    link.addEventListener("click", (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
      event.preventDefault();
      openImage(link, image, figure);
    });
  });
}

// Recovery markers inside the article read as text (src/scripts/wiki-residue.ts).
if (article?.querySelector(".wiki-link-gap, .wiki-markup-gap, .wiki-template-expanded")) enhanceResidue(article);
