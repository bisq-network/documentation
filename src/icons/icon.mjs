// Renders the site's icons. Every icon comes from Lucide (./lucide.mjs), drawn on Lucide's 24×24
// grid with round ends and joins, so dots (the one in "!" and "i") always show.
//
// One line weight at every size: the stroke is scaled so it is about 1.6 CSS px wide whether the
// icon is drawn at 14 or 22 px, the way a hand-tuned icon font keeps small icons from looking thin
// and large ones from looking heavy.
export const RENDERED_STROKE = 1.6;

/** The stroke width, in 24-unit icon space, that draws a RENDERED_STROKE line at this size (CSS px). */
export function strokeFor(size) {
  return Number(((RENDERED_STROKE * 24) / size).toFixed(2));
}

const escapeAttribute = (value) => String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");

/**
 * An inline SVG for an icon body from ./lucide.mjs. Decorative unless `label` is given, in which
 * case it is an image with that accessible name.
 */
export function icon(body, { size = 20, label, className } = {}) {
  const name = label ? `role="img" aria-label="${escapeAttribute(label)}"` : 'aria-hidden="true" focusable="false"';
  const classes = className ? ` class="${escapeAttribute(className)}"` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg"${classes} width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeFor(size)}" stroke-linecap="round" stroke-linejoin="round" ${name}>${body}</svg>`;
}

/** The icons custom.css draws as masks: --bd-icon-<name>: [export in ./lucide.mjs, size in CSS px]. */
export const CSS_ICONS = {
  warning: ["triangleAlert", 18],
  info: ["info", 18],
  "chevron-right": ["chevronRight", 16],
  "chevron-down": ["chevronDown", 16],
  search: ["search", 16],
  x: ["x", 16],
  "file-text": ["fileText", 16],
  link: ["link", 16],
  unlink: ["unlink", 14],
  "arrow-left": ["arrowLeft", 20],
  "arrow-right": ["arrowRight", 20],
};

/**
 * A CSS `url(...)` for an icon used as a mask (the icon takes the element's background colour).
 * `size` is the size the mask is drawn at, in CSS px, so the line weight matches icon().
 * custom.css keeps these as --bd-icon-* properties; scripts/icons.test.mjs checks they match.
 */
export function maskUrl(body, size) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='${strokeFor(size)}' stroke-linecap='round' stroke-linejoin='round'>${body.replaceAll('"', "'")}</svg>`;
  return `url("data:image/svg+xml,${svg.replace(/[<>#%{}|^`]/g, (character) => encodeURIComponent(character))}")`;
}
