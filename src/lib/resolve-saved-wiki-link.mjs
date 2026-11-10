import { normalizeFragment, resolveLegacyDestination } from "../../scripts/lib/legacy-routes.mjs";

/** Decode a URL component while retaining malformed escape sequences for lookup. */
function decode(value) {
    try { return decodeURIComponent(value); } catch { return value; }
}

/**
 * Normalize a pasted wiki address or same-site path without making a request.
 * Accept only HTTP(S) wiki hosts, the configured local/canonical origins and
 * listed previous sites (origin plus base path, e.g. an earlier preview host);
 * reject credentials, control characters and unsupported schemes. Return null
 * for invalid input, otherwise a lookup path, fragment and search suggestion.
 */
export function parseSavedWikiLink(value, { base = "", origin, siteOrigin = origin, previousSites = [] }) {
    const input = value.trim();
    if (!input || input.length > 4096 || /[\\\u0000-\u001f\u007f]/.test(input)) return null;
    const isWikiHost = /^(?:www\.)?bisq\.wiki(?:\/|$)/i.test(input);
    // A previous site's address pasted without its scheme, e.g. "hiciefte.github.io/bisq-docs/...".
    const isPreviousHost = previousSites.some((site) => {
        const host = new URL(site.origin).host;
        return input.toLowerCase() === host || input.toLowerCase().startsWith(host + "/");
    });
    const hasScheme = !/^Category:/i.test(input) && /^[a-z][a-z\d+.-]*:/i.test(input);
    if (input.startsWith("//") || (hasScheme && !/^https?:\/\//i.test(input))) return null;
    let url;
    try {
        url = new URL(isWikiHost || isPreviousHost ? `https://${input}` : input.startsWith("/") || hasScheme ? input : `/${input}`, origin);
    } catch { return null; }
    const wiki = ["bisq.wiki", "www.bisq.wiki"].includes(url.hostname.toLowerCase());
    if (!["http:", "https:"].includes(url.protocol) || url.username || url.password) return null;
    let path = decode(url.pathname);
    const within = (prefix) => !prefix || path === prefix || path.startsWith(prefix + "/");
    const current = base.replace(/\/$/, "");
    if (!wiki) {
        const sameSite = [origin, siteOrigin].includes(url.origin);
        // Previous sites were served over HTTPS; also accept the http:// form of the same address.
        const secureOrigin = url.protocol === "http:" ? `https://${url.host}` : url.origin;
        // On this site, a path under a previous base path (e.g. "/bisq-docs/wiki/...") is an earlier preview path.
        const previousBases = previousSites
            .filter((site) => sameSite || site.origin === secureOrigin)
            .map((site) => site.base.replace(/\/$/, ""));
        const prefix = sameSite && current && within(current)
            ? current
            : previousBases.find(within) ?? (sameSite ? current : undefined);
        if (prefix === undefined) return null;
        if (prefix && within(prefix)) path = path.slice(prefix.length);
    }
    path = path.replace(/\/index\.html?$/i, "/");
    if (/^\/index\.php$/i.test(path)) {
        const title = url.searchParams.get("title");
        if (!title) return null;
        path = "/" + title;
    }
    path = path.replace(/^\/+|\/+$/g, "").replaceAll(" ", "_");
    if (!path || path.split("/").some((part) => part === "." || part === "..")) return null;
    return { path, hash: url.hash, search: path.split("/").at(-1).replaceAll("_", " ").replaceAll("-", " ") };
}

/**
 * Resolve a pasted address using the packed static map and the legacy resolver.
 * Exact paths win; case-insensitive lookup is accepted only for one destination.
 * Return a match, ambiguous source choices, an invalid input or a missing page,
 * explicitly reporting lost fragments instead of claiming an exact match.
 */
export function resolveSavedWikiLink(value, map, options) {
    const parsed = parseSavedWikiLink(value, options);
    if (!parsed) return { kind: "invalid" };
    let key = parsed.path;
    if (!Object.hasOwn(map.routes, key)) {
        const matches = Object.keys(map.routes).filter((path) => path.toLowerCase() === key.toLowerCase());
        const unique = new Set(matches.map((path) => map.routes[path]));
        if (unique.size !== 1) return { kind: "miss", search: parsed.search };
        key = matches[0];
    }
    const packed = map.records[map.routes[key]];
    const record = {
        ...packed,
        target: map.targets[packed.target],
        fragments: Object.fromEntries(Object.entries(packed.fragments).map(([name, index]) => [name, map.targets[index]])),
    };
    const decoded = decode(parsed.hash.replace(/^#/, ""));
    const normalized = normalizeFragment(parsed.hash);
    const matchedFragment = !!parsed.hash && (Object.hasOwn(record.fragments, decoded) || Object.hasOwn(record.fragments, normalized));
    const target = resolveLegacyDestination(record, parsed.hash);
    if (!target) {
        const matching = record.fragmentChoices?.find((section) => section.id === decoded)
            || record.fragmentChoices?.find((section) => normalizeFragment(section.id) === normalized);
        return {
            kind: "choices",
            choices: matching?.targets || record.choices || [],
            sectionMissing: !!parsed.hash && !matching,
        };
    }
    const split = target.indexOf("#");
    const path = split < 0 ? target : target.slice(0, split);
    const anchor = split < 0 ? "" : target.slice(split + 1);
    const page = map.pages[path];
    if (!page) return { kind: "miss", search: parsed.search };
    return {
        kind: "match",
        target,
        title: page.title,
        section: anchor ? page.sections[anchor] || anchor.replaceAll("_", " ").replaceAll("-", " ") : "",
        sectionMissing: !!parsed.hash && !matchedFragment,
        sectionAtArticle: matchedFragment && !anchor,
    };
}
