import { createHash } from "node:crypto";
import { copyFile, mkdir, readFile, realpath, unlink, writeFile } from "node:fs/promises";
import { basename, dirname, resolve, sep } from "node:path";

// Input is either the recovery inventory or the reviewed recovery manifest.
const input = process.argv[2];
if (!input) throw new Error("Usage: node scripts/integrate-media.mjs <inventory-or-manifest.json>");
const manifestPath = resolve(input);
const recoveryRoot = await realpath(dirname(manifestPath));
const data = JSON.parse(await readFile(manifestPath, "utf8"));
if (!Array.isArray(data.items) || !data.items.length || (data.count != null && data.count !== data.items.length)) throw new Error("Invalid or incomplete inventory count.");
const isInventory = basename(manifestPath) === "inventory.json";
const supported = new Set(["original", "partial", "replacement-unknown", "missing"]);
const clean = (v) => String(v ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("\n", " ");
const url = (v) => { try { const u = new URL(v); return ["https:", "http:"].includes(u.protocol) ? clean(u.href) : null; } catch { return null; } };
const labels = { original: "Full-size historical source file", partial: "Partial recovery", "replacement-unknown": "Replacement or identity uncertain", missing: "Not recovered", pending: "Recovery in progress" };
const seen = new Set();
const sections = [];
const mappings = [];
await mkdir("public/media/wiki", { recursive: true });
let previous = [];
try { previous = JSON.parse(await readFile("public/media/wiki/mapping.json", "utf8")).files || []; }
catch (error) { if (error.code !== "ENOENT") throw error; }
const ordered = [...data.items].sort((a, b) => String(a.filename ?? a.wiki_filename).localeCompare(String(b.filename ?? b.wiki_filename), "en", { numeric: true, sensitivity: "base" }));
for (const raw of ordered) {
  const item = isInventory ? {
    filename: raw.wiki_filename, status: "pending", source_pages: raw.source_pages.map((p) => p.title),
    provenance: "Inventory entry. Recovery is in progress.", guide_routes: [],
  } : raw;
  if (typeof item.filename !== "string" || !item.filename || seen.has(item.filename)) throw new Error(`Missing or duplicate filename: ${item.filename}`);
  seen.add(item.filename);
  if (!isInventory && !supported.has(item.status)) throw new Error(`Invalid status for ${item.filename}`);
  let asset = null;
  if (item.local_path) {
    if (item.status === "missing") throw new Error(`Missing item has a file: ${item.filename}`);
    const file = await realpath(resolve(recoveryRoot, item.local_path));
    if (!file.startsWith(recoveryRoot + sep)) throw new Error(`File outside recovery root: ${item.filename}`);
    const bytes = await readFile(file);
    const hash = createHash("sha256").update(bytes).digest("hex");
    if (!item.sha256 || hash !== item.sha256.toLowerCase()) throw new Error(`SHA-256 mismatch or missing for ${item.filename}`);
    // Derive the served type from bytes: archived thumbnails can differ from the wiki filename.
    let ext;
    if (bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) ext = ".png";
    else if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) ext = ".jpg";
    else if (["GIF87a", "GIF89a"].includes(bytes.subarray(0, 6).toString("ascii"))) ext = ".gif";
    else if (bytes.subarray(0, 4).toString("ascii") === "RIFF" && bytes.subarray(8, 12).toString("ascii") === "WEBP") ext = ".webp";
    else throw new Error(`Unrecognized raster image bytes: ${item.filename}`);
    asset = `${hash}${ext}`;
    await copyFile(file, `public/media/wiki/${asset}`);
    mappings.push({ filename: item.filename, file: `media/wiki/${asset}`, sha256: hash, status: item.status });
  } else if (!["missing", "pending"].includes(item.status)) throw new Error(`Recovered item has no file: ${item.filename}`);
  const pages = Array.isArray(item.source_pages) && item.source_pages.length ? item.source_pages.map(clean).join(", ") : "Not recorded";
  const size = item.width && item.height ? `${Number(item.width)} × ${Number(item.height)} pixels` : "Unknown";
  const origin = url(item.source_url);
  const ts = String(item.capture_timestamp || "");
  const capture = /^\d{14}$/.test(ts) ? `${ts.slice(0, 4)}-${ts.slice(4, 6)}-${ts.slice(6, 8)} ${ts.slice(8, 10)}:${ts.slice(10, 12)}:${ts.slice(12, 14)} UTC` : (ts || "Not recorded");
  const image = asset ? `<a href="../media/wiki/${asset}"><img src="../media/wiki/${asset}" loading="lazy" alt="Historical image: ${clean(item.filename)}" /></a>\n\n[Open full image](../media/wiki/${asset})` : "No image file is available for this entry.";
  const itemLabel = item.source_kind === "original_source_attachment" ? "Historical source attachment; wiki filename inferred" : labels[item.status];
  const details = `<details><summary>Source and provenance</summary><p><strong>Provenance:</strong> ${clean(item.provenance || "Not recorded")}<br><strong>Source kind:</strong> ${clean(item.source_kind || "Not recorded")}<br><strong>Mapping confidence:</strong> ${clean(item.mapping_confidence || "Not recorded")}<br><strong>Source commit:</strong> ${clean(item.source_commit || "Not recorded")}<br><strong>Original availability:</strong> ${clean(item.origin_status || "Unknown")}<br><strong>SHA-256:</strong> <code>${clean(item.sha256 || "Not available")}</code><br><strong>Capture:</strong> ${clean(capture)}<br><strong>License status:</strong> ${clean(item.license_status || "Unknown")}<br><strong>Source:</strong> ${origin ? `<a href="${origin}">Source record</a>` : "Not recorded"}</p></details>`;
  sections.push({ status: item.status, text: `### ${clean(item.filename)}\n\n**${itemLabel}** · ${size}  \n**Source page(s):** ${pages}\n\n${image}\n\n${details}\n` });

}
const groups = ["original", "partial", "replacement-unknown", "missing", "pending"];
const groupNames = { original: "Full-size historical files", partial: "Partial recoveries", "replacement-unknown": "Identity uncertain", missing: "Not recovered", pending: "Recovery in progress" };
const summary = groups.filter((key) => sections.some((section) => section.status === key)).map((key) => `${sections.filter((section) => section.status === key).length} ${groupNames[key].toLowerCase()}`).join(" · ");
const heading = `---\ntitle: Recovered media catalogue\ndescription: Historical wiki images, their sources, and recovery status.\ntableOfContents:\n  minHeadingLevel: 2\n  maxHeadingLevel: 2\n---\n\nThis catalogue tracks **${data.items.length}** image references identified in the recovered wiki. ${isInventory ? "Recovery is in progress; the entries below are an inventory, not recovered images." : "Statuses and provenance describe the available recovery evidence."} Full-size historical source files are not necessarily the exact bytes present in the latest wiki snapshot. Historical screenshots can show obsolete software and are not current instructions. Open any available preview to inspect the full file. License status may be unknown.\n\n**${summary}**\n\n`;
const content = groups.filter((key) => sections.some((section) => section.status === key)).map((key) => `## ${groupNames[key]}\n\n${sections.filter((section) => section.status === key).map((section) => section.text).join("\n")}`).join("\n");
await writeFile("src/content/docs/recovered-media.md", heading + content);
const selected = new Set(mappings.map((entry) => entry.file));
for (const entry of previous) {
  if (/^media\/wiki\/[a-f0-9]{64}\.(?:png|jpg|gif|webp)$/.test(entry.file) && !selected.has(entry.file)) {
    await unlink(`public/${entry.file}`).catch((error) => { if (error.code !== "ENOENT") throw error; });
  }
}
await writeFile("public/media/wiki/mapping.json", JSON.stringify({ source: basename(manifestPath), files: mappings }, null, 2) + "\n");
console.log(`Processed ${data.items.length} entries, ${mappings.length} local files, guide bodies unchanged.`);
