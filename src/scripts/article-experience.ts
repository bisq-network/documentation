const article = document.querySelector<HTMLElement>(".wiki-recovered-article");

if (article) {
  const progress = document.createElement("div");
  progress.className = "reading-progress";
  progress.setAttribute("aria-hidden", "true");
  document.body.append(progress);
  let scheduled = false;
  const updateProgress = () => {
    const box = article.getBoundingClientRect();
    const header = document.querySelector("header")?.getBoundingClientRect().height ?? 0;
    const distance = Math.max(1, box.height - window.innerHeight + header);
    const fraction = Math.max(0, Math.min(1, (header - box.top) / distance));
    progress.style.transform = `scaleX(${fraction})`;
    scheduled = false;
  };
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

  const copyLink = async (heading: HTMLElement, title: string) => {
    const url = new URL(canonical);
    url.hash = heading.id;
    const local = new URL(location.href);
    local.hash = heading.id;
    history.replaceState(history.state, "", local);
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
        heading.querySelector<HTMLButtonElement>(".h-anchor")?.focus();
      });
      toast.append(label, close);
      input.focus();
      input.select();
    }
  };

  article.querySelectorAll<HTMLElement>("h2[id], h3[id], h4[id], h5[id]").forEach((heading) => {
    const title = heading.textContent?.trim() ?? "section";
    const button = document.createElement("button");
    button.type = "button";
    button.className = "h-anchor";
    button.setAttribute("aria-label", `Copy link to section: ${title}`);
    button.setAttribute("data-pagefind-ignore", "");
    button.textContent = "#";
    button.addEventListener("click", () => { void copyLink(heading, title); });
    heading.append(button);
  });
}
