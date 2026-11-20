// Pure helpers for the article repairs in ./wiki-residue.ts, in plain JavaScript so the node tests
// (scripts/article-repairs.test.mjs) load them on every supported Node.js version without type stripping.

// A line that reads as code: starts like a comment, prompt, path or block, or holds code punctuation
// or a shell comment.
const CODE_LINE = /^[#/$[{}]|[{}=|<>]|;$|--\S|\s#\s/;
// A plain word, with the punctuation prose puts around words.
const WORD = /^[("'“*]?[A-Za-z][a-z'’-]*[.,;:!?)"'”]*$/;

/**
 * True when the text reads as sentences: mostly plain words, no line that looks like code, and at
 * least `sentences` sentence ends (commands such as "sudo apt update" have none).
 */
/** @param {string} text @returns {boolean} */
export function looksLikeProse(text, sentences = 1) {
  const lines = text.replace(/\u00a0/g, " ").split("\n").map((line) => line.trim()).filter(Boolean);
  if (lines.some((line) => CODE_LINE.test(line))) return false;
  const tokens = lines.join(" ").split(/\s+/);
  const words = tokens.filter((token) => WORD.test(token)).length;
  const ends = tokens.filter((token) => /[.!?]["'”)]*$/.test(token)).length;
  return words >= 6 && words >= 0.6 * tokens.length && ends >= sentences;
}

/**
 * Offsets where a long URL, path or token (20 or more characters without a space) may wrap: after
 * "/", "=", "&" or "(", and before ".", "?", "#", "-", "_", "~" or "%" that follows a letter or digit.
 * Never at a token's first or last character, so a URL's closing full stop stays with it.
 */
/** @param {string} text @returns {number[]} */
export function breakPoints(text) {
  /** @type {number[]} */
  const points = [];
  for (const match of text.matchAll(/\S{20,}/g)) {
    const token = match[0];
    for (let index = 1; index < token.length - 1; index++) {
      const before = token[index - 1];
      const after = /[/=&(]/.test(before) ? !/[/=&(]/.test(token[index]) : /[.?#_~%-]/.test(token[index]) && /\w/.test(before);
      if (after) points.push(match.index + index);
    }
  }
  return points;
}

/** True when every item of a numbered list already starts with its own number ("1. ", "2. "…). */
/** @param {string[]} items @returns {boolean} */
export function ownNumbers(items, start = 1) {
  return items.length > 0 && items.every((text, index) => new RegExp(`^${start + index}[.)]\\s`).test(text.trim()));
}

/**
 * Average lightness (0 to 1) of RGBA pixels; transparent pixels count as dark, since the page shows
 * through them. Light screenshots of the wiki score 0.7 and more, dark interfaces below 0.5.
 */
/** @param {ArrayLike<number>} data @returns {number} */
export function lightness(data) {
  let sum = 0;
  for (let at = 0; at < data.length; at += 4) sum += (0.2126 * data[at] + 0.7152 * data[at + 1] + 0.0722 * data[at + 2]) * data[at + 3];
  return data.length ? sum / (data.length / 4) / 255 / 255 : 0;
}
