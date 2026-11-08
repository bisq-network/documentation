import supplement from "../../recovery-evidence/supplemental-media.json" with { type: "json" };

const escape = (text) => String(text).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const byFilename = new Map(supplement.items.map((item) => [item.canonical_filename, item]));

/** Replace recovery placeholders and thumbnails with verified historical files. */
export function renderSupplementalMedia(html, images, base = "/") {
  const prefix = base.replace(/\/$/, "");
  const effectiveImages = images.map((image) => {
    const found = byFilename.get(image.canonical_filename);
    if (!found) return image;
    const asset = `${prefix}${found.asset_path}`;
    const id = image.element_id;
    if (!/^source-image-\d+$/.test(id)) throw new Error(`Unexpected source image ID: ${id}`);
    const regex = new RegExp(`<figure class="(?:wiki-source-image|wiki-image-gap)" id="${id}">[\\s\\S]*?<\\/figure>`);
    let matched = false;
    html = html.replace(regex, (figure) => {
      matched = true;
      if (figure.includes('class="wiki-source-image"')) {
        const previous = `../../${image.asset_path}`;
        if (!figure.includes(previous)) throw new Error(`Prior image path missing: ${id}`);
        return figure.replaceAll(previous, asset)
          .replace(/(<img\b[^>]*\bheight=")[^"]+"/, `$1${found.height}"`)
          .replace(/(<img\b[^>]*\bwidth=")[^"]+"/, `$1${found.width}"`)
          .replace("Historical thumbnail; original resolution not recovered.", "Full-size historical file recovered from the 14 October 2026 archive.");
      }
      const caption = figure.match(/<figcaption>[\s\S]*?<\/figcaption>/)?.[0] || "";
      return `<figure class="wiki-source-image" id="${id}"><a href="${asset}"><img alt="${escape(image.wiki_filename)}" decoding="async" height="${found.height}" loading="lazy" src="${asset}" width="${found.width}"></a>${caption}<small>Full-size historical file recovered from the 14 October 2026 archive.</small></figure>`;
    });
    if (!matched) throw new Error(`Source image figure missing: ${id}`);
    return { ...image, status: "original", asset_path: found.asset_path.replace(/^\//, ""), sha256: found.sha256, width: found.width, height: found.height };
  });
  return { content: html, images: effectiveImages };
}
