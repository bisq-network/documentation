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
