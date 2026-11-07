# Bisq documentation

A community documentation preview with current-guide drafts for Bisq 1 and Bisq 2, alongside a clearly marked historical wiki archive. The guides and archive are available for contributor review; the preview is not an approved official publication. See [Review status](src/content/docs/review.md) for scope, sources, and known gaps.

## Run locally

Use Node 22.12 or newer, then run:

```sh
npm ci
npm run build
npm run preview
```

The build produces a static site in `dist/` and checks links, local assets, article coverage, headings, and selected legacy anchors. Search is built locally. It covers current guides and core pages; the historical wiki can be browsed by subject or by its complete alphabetical title index.

The normal build uses the Markdown and assets already in this repository. It does not require Python or an acquisition workspace.

## Editing content

- Current guides live in `src/content/docs/bisq-1/` and `src/content/docs/bisq-2/`. DAO and contribution guides have their own directories.
- Historical source imports live in `src/content/docs/wiki/`; each includes provenance and a link to its local exact snapshot source. They have not received the same review as the guide drafts and may contain outdated instructions or conversion gaps.
- `migration/articles.json` and `migration/title-route-map.json` record the imported pages and routes. Their `file` values retain the acquisition workspace layout (`site/src/...`); in this standalone repository the files are under `src/content/docs/wiki/`. `migration/taxonomy.json` records selective, overlapping browse groups; downloader-generated version hints are not authoritative.
- `src/data/archive-guide-links.json` maps selected historical articles to relevant guide drafts without editing the imported source bodies. Run `node scripts/build-browse-indexes.mjs` after changing the article metadata or taxonomy.

Optional re-import requires the preserved snapshot and migration tools with their separately prepared Python environment. It is not required for a normal site build. Retain source and revision attribution, gap notices, and the distinction between historical material and current-guide drafts when editing.

## Historical media

The [media catalogue](src/content/docs/recovered-media.md) lists all inventoried image references, including unavailable files. Recovered bytes are copied unchanged to `public/media/wiki/` under SHA-256-derived names; `public/media/wiki/mapping.json` maps wiki filenames to portable copies. A partial capture may be a thumbnail, and a full-size historical file is not proof of the exact bytes in the latest snapshot. The `recovery-evidence/` inventory and manifest retain acquisition-workspace relative paths for provenance.

To refresh from an updated recovery manifest, run `node scripts/integrate-media.mjs <path-to-recovered-manifest.json>` and then `npm run build`. The script checks source location and SHA-256 before copying. Historical screenshots are source material, not current UI instructions. Individual image licensing and publication rights remain unresolved.

## GitHub Pages

The contributor preview is published from [hiciefte/bisq-docs](https://github.com/hiciefte/bisq-docs) to **[hiciefte.github.io/bisq-docs](https://hiciefte.github.io/bisq-docs/)**. See the repository Actions page for the latest deployment result.

The included Pages workflow is **manual only**. It derives the GitHub Pages origin and project base path from repository context, including on a fork. Set repository variables `DOCS_SITE` and `DOCS_BASE` to override both values for an approved custom domain or different deployment layout. The workflow requires a configured GitHub Pages environment and must be reviewed before it is run. For a local project-path build, for example:

```sh
DOCS_SITE=https://hiciefte.github.io DOCS_BASE=/bisq-docs/ npm run build
```

A custom domain, DNS configuration, and promotion to official documentation require separate decisions; licensing and maintainer review remain open. No `CNAME` is included. Exact-case compatibility pages preserve `/Bisq_2` and `/Downloading_and_installing` with selected anchors; verify slashless paths at the final host.

See [publishing steps](PUBLISHING.md) for source updates and manual Pages deployment.
