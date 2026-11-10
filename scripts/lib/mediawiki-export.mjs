import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";

// Reader for MediaWiki XML exports (Special:Export or maintenance/dumpBackup.php,
// export schema 0.10/0.11, current or full history). It streams page by page, so a
// full-history export does not have to fit in memory, and needs no XML dependency.
// Only the fields the intake report needs are kept. Anonymous editors' IP addresses
// are never returned: an anonymous revision is reported as { anonymous: true }.

const ENTITIES = { lt: "<", gt: ">", amp: "&", quot: '"', apos: "'" };

/** Decode the XML entities MediaWiki writes into titles, comments and text. */
export function decodeXml(value) {
    return value.replace(/&(#x[\da-f]+|#\d+|lt|gt|amp|quot|apos);/gi, (whole, entity) => {
        if (entity[0] !== "#") return ENTITIES[entity.toLowerCase()] ?? whole;
        const hex = entity[1].toLowerCase() === "x";
        return String.fromCodePoint(parseInt(entity.slice(hex ? 2 : 1), hex ? 16 : 10));
    });
}

const field = (block, name) => {
    const match = new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`).exec(block);
    return match ? decodeXml(match[1]) : null;
};

/** Parse one <revision> block; keep the text only when asked to. */
function parseRevision(block, keepText) {
    const contributor = /<contributor(?:\s[^>]*)?>([\s\S]*?)<\/contributor>|<contributor\s+deleted="deleted"\s*\/>/.exec(block);
    const inner = contributor?.[1] ?? "";
    const username = field(inner, "username");
    const textMatch = /<text\b([^>]*?)(?:\/>|>([\s\S]*?)<\/text>)/.exec(block);
    const deleted = !!textMatch && /deleted="deleted"/.test(textMatch[1]);
    const text = textMatch?.[2] !== undefined ? decodeXml(textMatch[2]) : deleted ? null : "";
    return {
        id: field(block, "id"),
        parentid: field(block, "parentid"),
        timestamp: field(block, "timestamp"),
        contributor: username !== null
            ? { username, id: field(inner, "id") }
            : contributor ? { anonymous: inner.includes("<ip>"), hidden: !inner.includes("<ip>") } : { hidden: true },
        minor: /<minor\s*\/>/.test(block),
        bytes: text === null ? null : Buffer.byteLength(text, "utf8"),
        sha256: text === null ? null : createHash("sha256").update(text, "utf8").digest("hex"),
        ...(keepText ? { text } : {}),
    };
}

/** Parse one <page> block into title, namespace, id, redirect target and revisions. */
export function parsePage(block, { keepText = () => false } = {}) {
    const head = block.slice(0, block.search(/<revision>|<upload>|$/));
    const title = field(head, "title");
    const redirect = /<redirect\s+title="([^"]*)"\s*\/>/.exec(head);
    const revisions = [];
    for (const match of block.matchAll(/<revision>([\s\S]*?)<\/revision>/g)) revisions.push(match[1]);
    const page = {
        title,
        ns: Number(field(head, "ns") ?? 0),
        id: field(head, "id"),
        redirect: redirect ? decodeXml(redirect[1]) : null,
    };
    const parsed = revisions.map((revision) => parseRevision(revision, false));
    // Revisions are usually in order, but sort by id so "latest" never depends on it.
    const order = parsed.map((revision, index) => ({ revision, index }))
        .sort((a, b) => Number(a.revision.id) - Number(b.revision.id));
    const sorted = order.map(({ revision }) => revision);
    const latest = order.at(-1);
    if (latest && keepText(page)) sorted[sorted.length - 1] = parseRevision(revisions[latest.index], true);
    return { ...page, revisions: sorted };
}

/** Read <siteinfo> and every <page> of an export file, one page at a time. */
export async function* readMediaWikiExport(path, options = {}) {
    let buffer = "";
    let siteinfoDone = false;
    for await (const chunk of createReadStream(path, { encoding: "utf8", highWaterMark: 1 << 20 })) {
        buffer += chunk;
        if (!siteinfoDone) {
            const end = buffer.indexOf("</siteinfo>");
            if (end >= 0) {
                const block = buffer.slice(buffer.indexOf("<siteinfo>"), end);
                yield { siteinfo: { sitename: field(block, "sitename"), base: field(block, "base"), generator: field(block, "generator") } };
                siteinfoDone = true;
            } else if (buffer.includes("<page>")) siteinfoDone = true;
        }
        let start;
        while ((start = buffer.indexOf("<page>")) >= 0) {
            const end = buffer.indexOf("</page>", start);
            if (end < 0) break;
            yield { page: parsePage(buffer.slice(start + 6, end), options) };
            buffer = buffer.slice(end + 7);
        }
        if (!buffer.includes("<page>") && buffer.length > 1 << 16) buffer = buffer.slice(-16);
    }
}
