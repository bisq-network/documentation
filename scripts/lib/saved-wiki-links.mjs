import { buildRecoveredAliasRoutes } from "./recovered-link-aliases.mjs";
import { buildLegacyRoutes, normalizeFragment } from "./legacy-routes.mjs";
import { loadEditedRouteAliases } from "./edited-route-aliases.mjs";

/**
 * Build the browser's versioned lookup from the existing legacy and edited-guide
 * aliases. Preserve ambiguous choices, add canonical article paths, and intern
 * repeated destinations to keep the static payload small. Duplicate paths fail
 * the build. Only titles, routes and section metadata leave the build process.
 */
export function buildSavedWikiLinks(articles, headingsByRoute = new Map()) {
    const legacy = buildLegacyRoutes(articles, headingsByRoute);
    const edited = loadEditedRouteAliases(articles);
    const pages = Object.create(null);
    const routes = Object.create(null);
    const records = [];
    const interned = new Map();
    const add = (path, entry) => {
        const record = {
            target: entry.target,
            fragments: entry.fragments,
            ...(entry.autoRedirect === false ? { autoRedirect: false } : {}),
            ...(entry.strictFragments ? { strictFragments: true } : {}),
            ...(entry.choices?.length ? { choices: entry.choices } : {}),
            ...(entry.fragmentChoices?.length ? { fragmentChoices: entry.fragmentChoices } : {}),
        };
        const key = JSON.stringify(record);
        if (!interned.has(key)) {
            interned.set(key, records.length);
            records.push(record);
        }
        if (Object.hasOwn(routes, path)) throw new Error(`Duplicate saved-link path: ${path}`);
        routes[path] = interned.get(key);
    };
    for (const entry of [...legacy, ...buildRecoveredAliasRoutes(articles, legacy), ...edited]) add(entry.path, entry);
    for (const article of articles) {
        const sections = Object.create(null);
        for (const heading of article.headings || []) sections[heading.anchor] = heading.text;
        pages[article.route] = { title: article.title, sections };
        const [alias] = buildLegacyRoutes([article], headingsByRoute);
        if (!alias) throw new Error(`Missing original alias: ${article.slug}`);
        // A canonical /wiki/ URL must stay on its own original, including the two SEPA pages.
        const fragments = Object.fromEntries(Object.entries(alias.fragments).map(([key, value]) => [
            key,
            value.startsWith(alias.targetPath) ? article.route + value.slice(alias.targetPath.length) : value,
        ]));
        for (const heading of article.headings || []) {
            fragments[heading.anchor] = `${article.route}#${heading.anchor}`;
        }
        for (const explicit of article.rendered_explicit_anchors || []) {
            const id = typeof explicit === "string" ? explicit : explicit.id;
            fragments[id] = `${article.route}#${id}`;
            fragments[normalizeFragment(id)] = `${article.route}#${id}`;
        }
        add(article.route.replace(/^\/+|\/+$/g, ""), { target: article.route, fragments });
    }
    // Thousands of legacy fragments share destinations. Store each URL once.
    const targets = [];
    const targetIndex = new Map();
    const reference = (target) => {
        if (!targetIndex.has(target)) {
            targetIndex.set(target, targets.length);
            targets.push(target);
        }
        return targetIndex.get(target);
    };
    const packed = records.map((record) => ({
        ...record,
        target: reference(record.target),
        fragments: Object.fromEntries(Object.entries(record.fragments).map(([key, target]) => [key, reference(target)])),
    }));
    return { version: 1, routes, records: packed, targets, pages };
}
