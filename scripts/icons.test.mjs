import test from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import * as lucide from "../src/icons/lucide.mjs";
import { CSS_ICONS, icon, maskUrl, strokeFor } from "../src/icons/icon.mjs";

const css = readFileSync("src/styles/custom.css", "utf8");
const files = (dir) => readdirSync(dir).flatMap((name) => {
  const path = join(dir, name);
  return statSync(path).isDirectory() ? files(path) : [path];
});

test("icons keep one line weight and round ends, so dots show", () => {
  assert.equal(strokeFor(24), 1.6);
  assert.equal(strokeFor(16), 2.4);
  const svg = icon(lucide.triangleAlert, { size: 18 });
  assert.match(svg, /stroke-linecap="round"/);
  assert.match(svg, /stroke-linejoin="round"/);
  assert.match(svg, /aria-hidden="true"/);
  assert.match(lucide.triangleAlert, /M12 17h\.01/, "the warning icon has its dot");
  assert.match(lucide.info, /M12 8h\.01/, "the info icon has its dot");
  assert.match(icon(lucide.link, { size: 16, label: 'Copy "link"' }), /role="img" aria-label="Copy &quot;link&quot;"/);
});

test("the CSS icon masks are the generated ones", () => {
  for (const [name, [exportName, size]] of Object.entries(CSS_ICONS)) {
    assert.ok(lucide[exportName], `${exportName} is in src/icons/lucide.mjs`);
    const declared = css.match(new RegExp(`--bd-icon-${name}: (url\\("[^"]+"\\));`))?.[1];
    assert.equal(declared, maskUrl(lucide[exportName], size), `--bd-icon-${name} in custom.css`);
    assert.match(declared, /stroke-linecap='round'/);
  }
  const declaredNames = [...css.matchAll(/--bd-icon-([a-z-]+):/g)].map((match) => match[1]).sort();
  assert.deepEqual(declaredNames, Object.keys(CSS_ICONS).sort());
});

test("every icon comes from the icon set", () => {
  // Components, page scripts and pages draw icons with Icon.astro or icon(); no hand-drawn SVG.
  // custom.css draws masks only from the --bd-icon-* properties.
  for (const file of [...files("src/components"), ...files("src/scripts"), ...files("src/pages")]) {
    assert.doesNotMatch(readFileSync(file, "utf8"), /<svg[\s>]/, `${file} draws its own SVG`);
  }
  const dataUris = [...css.matchAll(/url\("data:image\/svg\+xml/g)].length;
  assert.equal(dataUris, Object.keys(CSS_ICONS).length, "custom.css has data-URI SVGs outside the --bd-icon-* properties");
});
