import test from "node:test";
import assert from "node:assert/strict";
import { addTableRowSummaries } from "./lib/table-search-rows.mjs";

const table = '<table>\n<thead><tr><th>Name</th><th><a href="x">Matrix</a></th></tr></thead>\n<tbody><tr><td>luis3672</td><td><a href="y">@luis3672:matrix.org</a></td></tr>\n<tr><td>a &amp; b</td><td></td></tr><tr><td></td><td></td></tr></tbody></table>';

test("each body row becomes a hidden line that names its columns", () => {
  const out = addTableRowSummaries(`<p>before</p>${table}<p>after</p>`);
  assert.match(out, /<table data-pagefind-ignore>/);
  assert.match(out, /<div class="table-search-rows" hidden><p>Name: luis3672 · Matrix: @luis3672:matrix\.org<\/p><p>Name: a &amp; b<\/p><\/div>/);
  assert.ok(out.startsWith("<p>before</p>") && out.endsWith("<p>after</p>"));
});

test("a table without a header row keeps plain cell text", () => {
  const out = addTableRowSummaries("<table><tr><td>one</td><td>two</td></tr></table>");
  assert.match(out, /<p>one · two<\/p>/);
});

test("tables with spans, empty tables and already ignored tables are unchanged", () => {
  for (const raw of [
    '<table><tr><th colspan="2">A</th></tr><tr><td>x</td><td>y</td></tr></table>',
    "<table><tr><td></td></tr></table>",
    "<table data-pagefind-ignore><tr><td>x</td></tr></table>",
  ]) assert.equal(addTableRowSummaries(raw), raw);
});
