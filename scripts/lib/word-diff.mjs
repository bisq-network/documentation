// Word-level comparison of two texts for the backup report. Lines are compared
// first; each changed block is then compared word by word, so a one-word edit in
// a long paragraph shows as that word, not as a replaced paragraph. No dependency.

/**
 * Myers' shortest edit script between two arrays. Returns runs [type, items]
 * with type "=", "-" (only in a) or "+" (only in b); within a changed run the
 * removals come first. Returns null when more than maxCost edits are needed, so
 * the caller can show a plain replacement instead.
 */
export function diffSequences(a, b, { maxCost = 2000 } = {}) {
    let start = 0;
    while (start < a.length && start < b.length && a[start] === b[start]) start++;
    let endA = a.length, endB = b.length;
    while (endA > start && endB > start && a[endA - 1] === b[endB - 1]) { endA--; endB--; }
    const x0 = a.slice(start, endA), y0 = b.slice(start, endB);
    const n = x0.length, m = y0.length;
    const steps = [];
    if (n + m > 0) {
        // v[offset + k] is the furthest x reached on diagonal k = x - y. The trace keeps
        // the part of v each step wrote, [-d, d], so memory grows with the edit count only.
        const offset = n + m + 1;
        const v = new Int32Array(2 * offset + 1);
        const trace = [];
        let found = -1;
        for (let d = 0; d <= Math.min(n + m, maxCost) && found < 0; d++) {
            for (let k = -d; k <= d; k += 2) {
                let x = k === -d || (k !== d && v[offset + k - 1] < v[offset + k + 1]) ? v[offset + k + 1] : v[offset + k - 1] + 1;
                let y = x - k;
                while (x < n && y < m && x0[x] === y0[y]) { x++; y++; }
                v[offset + k] = x;
                if (x >= n && y >= m) { found = d; break; }
            }
            trace.push(v.slice(offset - d, offset + d + 1));
        }
        if (found < 0) return null;
        let x = n, y = m;
        for (let d = found; d > 0; d--) {
            const at = (k) => trace[d - 1][k + d - 1];
            const k = x - y;
            const prevK = k === -d || (k !== d && at(k - 1) < at(k + 1)) ? k + 1 : k - 1;
            const prevX = at(prevK), prevY = prevX - prevK;
            while (x > prevX && y > prevY) { x--; y--; steps.push(["=", x0[x]]); }
            if (x === prevX) steps.push(["+", y0[--y]]);
            else steps.push(["-", x0[--x]]);
        }
        while (x > 0 && y > 0) { x--; y--; steps.push(["=", x0[x]]); }
        steps.reverse();
    }
    const runs = [];
    let del = [], ins = [];
    const flush = () => {
        if (del.length) runs.push(["-", del]);
        if (ins.length) runs.push(["+", ins]);
        del = []; ins = [];
    };
    const equal = (item) => {
        flush();
        if (runs.at(-1)?.[0] === "=") runs.at(-1)[1].push(item);
        else runs.push(["=", [item]]);
    };
    for (let i = 0; i < start; i++) equal(a[i]);
    for (const [type, item] of steps) {
        if (type === "-") del.push(item);
        else if (type === "+") ins.push(item);
        else equal(item);
    }
    flush();
    for (let i = endA; i < a.length; i++) equal(a[i]);
    return runs;
}

const TOKEN = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]|[\p{L}\p{M}\p{N}_]+(?:['’-][\p{L}\p{M}\p{N}_]+)*|\n|[^\S\n]+|[^\s\p{L}\p{M}\p{N}_]/gu;

/** Split text into words (with inner apostrophes and hyphens), single punctuation marks, runs of spaces and line breaks. */
export const tokenize = (text) => text.match(TOKEN) ?? [];

/**
 * Compare two runs of text word by word. Returns parts [type, text] with type
 * "=", "-" or "+". A lone space between two changes is folded into them, so a
 * rewritten phrase reads as one removal and one addition.
 */
export function diffWords(before, after, { maxCost = 2000, maxTokens = 50000 } = {}) {
    const a = tokenize(before), b = tokenize(after);
    // Very large blocks are shown as a plain replacement, so a huge page cannot stall the report.
    const runs = a.length + b.length > maxTokens ? null : diffSequences(a, b, { maxCost });
    if (!runs) return [...(before ? [["-", before]] : []), ...(after ? [["+", after]] : [])];
    const parts = runs.map(([type, items]) => [type, items.join("")]);
    const result = [];
    let del = "", ins = "";
    const flush = () => {
        if (del) result.push(["-", del]);
        if (ins) result.push(["+", ins]);
        del = ins = "";
    };
    parts.forEach(([type, text], index) => {
        const changedAround = index > 0 && index < parts.length - 1;
        if (type === "-") del += text;
        else if (type === "+") ins += text;
        else if (changedAround && /^[^\S\n]{1,2}$/.test(text)) { del += text; ins += text; }
        else { flush(); result.push(["=", text]); }
    });
    flush();
    return result;
}

const countWords = (text) => tokenize(text).filter((token) => /[\p{L}\p{N}]/u.test(token)).length;

/**
 * Compare two texts for display, keeping unchanged lines only as context around
 * changes. Returns { blocks, added, removed }: blocks are
 * { type: "context", lines }, { type: "skip", lines: <count> } or
 * { type: "change", parts }, and added/removed count words.
 */
export function diffTexts(before, after, { context = 2 } = {}) {
    const a = before.split("\n"), b = after.split("\n");
    const runs = (a.length + b.length <= 100000 && diffSequences(a, b, { maxCost: 4000 })) || [["-", a], ["+", b]];
    const raw = [];
    for (let i = 0; i < runs.length; i++) {
        const [type, lines] = runs[i];
        if (type === "=") { raw.push({ type: "equal", lines }); continue; }
        const removed = type === "-" ? lines : [];
        const added = type === "+" ? lines : runs[i + 1]?.[0] === "+" ? runs[++i][1] : [];
        raw.push({ type: "change", parts: diffWords(removed.join("\n"), added.join("\n")) });
    }
    const blocks = [];
    let added = 0, removed = 0;
    raw.forEach((block, index) => {
        if (block.type === "change") {
            for (const [type, text] of block.parts) {
                if (type === "+") added += countWords(text);
                if (type === "-") removed += countWords(text);
            }
            blocks.push(block);
            return;
        }
        const { lines } = block;
        const head = index > 0 ? context : 0;
        const tail = index < raw.length - 1 ? context : 0;
        if (lines.length <= head + tail + 1) { blocks.push({ type: "context", lines }); return; }
        if (head) blocks.push({ type: "context", lines: lines.slice(0, head) });
        blocks.push({ type: "skip", lines: lines.length - head - tail });
        if (tail) blocks.push({ type: "context", lines: lines.slice(lines.length - tail) });
    });
    return { blocks, added, removed };
}
