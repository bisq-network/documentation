// Pure helpers for scripts/design-check.mjs: they take what the browser measured and
// turn it into the numbers the report shows and the budget compares.

/**
 * Cumulative layout shift as browsers report it: shifts without recent input,
 * grouped into session windows (a gap under 1 s, a window under 5 s); the score is
 * the largest window. entries: [{ value, time }] with time in milliseconds.
 */
export function cumulativeLayoutShift(entries) {
  let best = 0;
  let current = 0;
  let first = -Infinity;
  let last = -Infinity;
  for (const { value, time } of [...entries].sort((a, b) => a.time - b.time)) {
    if (time - last < 1000 && time - first < 5000) current += value;
    else { current = value; first = time; }
    last = time;
    best = Math.max(best, current);
  }
  return Math.round(best * 1000) / 1000;
}

/** Group values (such as column x per article) as [{ value, count, examples }], most common first. */
export function groupValues(items, key, example) {
  const groups = new Map();
  for (const item of items) {
    const value = key(item);
    const group = groups.get(value) ?? { value, count: 0, examples: [] };
    group.count++;
    if (group.examples.length < 3) group.examples.push(example(item));
    groups.set(value, group);
  }
  return [...groups.values()].sort((a, b) => b.count - a.count || (a.value > b.value ? 1 : -1));
}

/** The spread of a list of numbers: { min, max, distinct }. */
export function spread(values) {
  const numbers = values.filter((value) => typeof value === "number");
  return numbers.length ? { min: Math.min(...numbers), max: Math.max(...numbers), distinct: new Set(numbers).size } : { min: null, max: null, distinct: 0 };
}

/**
 * Compare measured metrics with a budget: every budget entry is a ceiling, and a
 * metric above its ceiling is a failure. Returns [{ metric, value, ceiling }].
 */
export function overBudget(metrics, budget) {
  return Object.entries(budget)
    .filter(([metric]) => !metric.startsWith("_"))
    .filter(([metric, ceiling]) => typeof metrics[metric] !== "number" || metrics[metric] > ceiling)
    .map(([metric, ceiling]) => ({ metric, value: metrics[metric] ?? null, ceiling }));
}

/** Kilobytes with one decimal, as the report prints them. */
export const kilobytes = (bytes) => Math.round(bytes / 102.4) / 10;
