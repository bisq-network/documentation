// What the HTML of an archived template rendering may contain
// (migration/template-renderings-20261014.json): the page puts it into articles
// (scripts/lib/archived-templates.mjs), so it may use only the elements and attributes
// that historical templates need, link only to http(s), relative or same-page targets
// and show images only from the recovered media. scripts/check-template-renderings.mjs
// checks every rendering.
import { attributeValue, elementsOf, startTag } from "./rendered-html.mjs";

const templateElements = {
  a: ["href", "rel"], aside: ["class", "role"], br: [], code: ["class", "id"], em: [], figcaption: [], figure: ["class", "id"],
  h2: ["id"], h3: ["id"], h4: ["id"], img: ["alt", "decoding", "height", "loading", "src", "width"], li: [], ol: [], p: [], small: [], span: [], strong: [], ul: [],
};

/** Why a parsed rendering ({ nodes, selfContained, problem }) is not plain template HTML, or undefined. */
export function templateHtmlProblem(tree) {
  if (!tree.selfContained) return tree.problem;
  for (const element of elementsOf(tree.nodes)) {
    const allowed = templateElements[element.tag];
    if (!allowed || element.attrs.some(([name, value]) => !allowed.includes(name) || value === null)) return `it has ${startTag(element)}`;
    if (element.tag === "a" && !/^(?:https?:\/\/|\.\.\/|#)/.test(attributeValue(element, "href") ?? "")) return `it links to ${attributeValue(element, "href")}`;
    if (element.tag === "img" && !/^\.\.\/\.\.\/media\/wiki\/[a-f0-9]{64}\.(?:png|jpe?g|gif)$/.test(attributeValue(element, "src") ?? "")) return `it shows the image ${attributeValue(element, "src")}`;
  }
  return undefined;
}
