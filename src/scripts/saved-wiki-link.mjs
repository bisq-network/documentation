import { PREVIOUS_SITES } from "../lib/previous-sites.mjs";
import { resolveSavedWikiLink } from "../lib/resolve-saved-wiki-link.mjs";

let lookup;
/**
 * Lazily fetch and share the static lookup map between forms. The URL comes from
 * server-rendered configuration, never pasted input. Clear failed requests so
 * visitors can retry, and reject unexpected map versions before resolving links.
 */
function loadMap(url) {
    if (!lookup) {
        lookup = fetch(url, { credentials: "omit", referrerPolicy: "no-referrer" })
            .then((response) => {
                if (!response.ok) throw new Error("Lookup unavailable");
                return response.json();
            })
            .then((data) => {
                if (data.version !== 1 || !data.routes || !data.records || !data.targets || !data.pages) throw new Error("Unexpected lookup");
                return data;
            })
            .catch((error) => { lookup = undefined; throw error; });
    }
    return lookup;
}

/** Create an element with literal text so pasted input cannot become markup. */
function node(tag, text) {
    const element = document.createElement(tag);
    element.textContent = text;
    return element;
}

/**
 * Create a link only for a canonical article target within the site's base path.
 * Return null for unexpected destinations instead of rendering a navigable URL.
 */
function articleLink(target, label, base) {
    if (target !== "/categories/teams/" && !/^\/wiki\/[a-z0-9-]+\/(?:#[^\u0000-\u001f]*)?$/.test(target)) return null;
    const a = node("a", label);
    a.href = base + target;
    return a;
}

/**
 * Enhance each saved-link form once, retaining the directory fallback without JS.
 * Submit against the shared static map and render matches, choices or misses.
 * A generation counter prevents a late response from replacing newer input;
 * request failures leave the form available for another attempt.
 */
function initialize() {
    for (const form of document.querySelectorAll("[data-saved-wiki-link]")) {
        if (!(form instanceof HTMLFormElement) || form.dataset.ready) continue;
        const input = form.querySelector("input");
        const fieldset = form.querySelector("fieldset");
        const output = form.querySelector("[data-saved-link-result]");
        const button = form.querySelector('button[type="submit"]');
        if (!input || !fieldset || !output || !button) continue;
        const base = form.dataset.base || "";
        let generation = 0;
        input.addEventListener("input", () => {
            generation++;
            input.removeAttribute("aria-invalid");
            output.replaceChildren();
            delete output.dataset.state;
            button.disabled = false;
            button.textContent = "Find page";
        });
        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            const current = ++generation;
            button.disabled = true;
            button.textContent = "Finding…";
            output.textContent = "Finding the saved page…";
            delete output.dataset.state;
            input.removeAttribute("aria-invalid");
            try {
                const map = await loadMap(form.dataset.mapUrl);
                if (current !== generation || !form.isConnected) return;
                const result = resolveSavedWikiLink(input.value, map, {
                    base, origin: location.origin, siteOrigin: form.dataset.siteOrigin || location.origin, previousSites: PREVIOUS_SITES,
                });
                output.replaceChildren();
                if (result.kind === "invalid" || result.kind === "miss") {
                    output.dataset.state = "miss";
                    input.setAttribute("aria-invalid", "true");
                    output.append(node("p", result.kind === "invalid"
                        ? "Paste a bisq.wiki address, /Title#Section, or a path from this preview."
                        : "No restored page matches that link."));
                    if (result.search) output.append(node("p", `Try these words in site search: “${result.search}”.`));
                    input.focus();
                } else if (result.kind === "choices") {
                    output.append(node("p", "This earlier guide combined several original articles. Choose one:"));
                    if (result.sectionMissing) output.append(node("p", "The saved section was not found. These are the guide's original sources."));
                    const list = document.createElement("ul");
                    for (const choice of result.choices) {
                        const link = articleLink(choice.target, choice.title, base);
                        if (link) { const li = document.createElement("li"); li.append(link); list.append(li); }
                    }
                    output.append(list);
                } else {
                    const link = articleLink(result.target, "Open page", base);
                    if (!link) throw new Error("Unsafe lookup target");
                    output.append(node("strong", `Restored as ${result.title}${result.section ? " › " + result.section : ""}`));
                    if (result.sectionMissing) output.append(node("p", "The saved section was not found. This link opens the article instead."));
                    else if (result.sectionAtArticle) output.append(node("p", "The saved section maps to this original article."));
                    const url = node("span", new URL(base + result.target, form.dataset.siteOrigin || location.origin).href);
                    url.className = "saved-link-url";
                    output.append(url, link);
                }
            } catch {
                if (current === generation) {
                    output.dataset.state = "miss";
                    output.textContent = "Link lookup could not load. Try again, or browse the article titles below.";
                }
            } finally {
                if (current === generation) { button.disabled = false; button.textContent = "Find page"; }
            }
        });
        form.dataset.ready = "true";
        fieldset.disabled = false;
    }
}

initialize();
document.addEventListener("astro:page-load", initialize);
