# Bisq documentation

A community documentation preview for Bisq 1, Bisq 2, payment methods, DAO participation, and contributors. The recovered wiki topics are integrated into the subject guides, with original source text and image provenance preserved for comparison. Human maintainer review remains pending; see [Review status](src/content/docs/review.md).

The [integration review](migration/INTEGRATION-REVIEW.md) summarizes coverage, source checks, compatibility and remaining questions.

## Run locally

Use Node 22.12 or newer, then run:

```sh
npm ci
npm run build
npm run preview
```

The build produces a static site in `dist/` and checks links, local assets, article coverage, headings, and selected legacy anchors. Search is built locally and covers all subject guides, including mediator names and technical reference. Topic indexes and the former-title index provide additional ways to browse.

The normal build uses the Markdown and assets already in this repository. It does not require Python or an acquisition workspace.

## Editing content

- Subject guides live in `src/content/docs/`, grouped by product and topic.
- `migration/integration-*.json` records every recovered title, its canonical destination, the detail retained or consolidated, and the source-check disposition. Keep these mappings aligned with guide headings.
- `migration/media-disposition.json` records which guides use each recovered image and why 21 redundant or obsolete illustrations remain only in the catalogue. Update it when changing image placement.
- `public/wiki-source/` preserves the exact original wikitext and revision metadata. `migration/articles.json` and `migration/title-route-map.json` remain the original acquisition inventory; their old `site/src/...` file paths are provenance, not active content locations.
- The source-history component links each guide to the source topics it incorporates. Raw source downloads and recovered media should not be rewritten during an editorial change.
- `scripts/build-browse-indexes.mjs` builds topic and title indexes from the guide files and the three integration maps. It runs as part of `npm run build`.
- `src/pages/[...legacy].astro` preserves exported MediaWiki title paths and earlier `/wiki/` preview routes, including saved fragments. Alias pages do not compete with canonical guides in search.

Run `npm test` for legacy-route behavior and `npm run build` for coverage, source/media hashes, internal links, fragments and search scope. Keep historical or unresolved facts qualified in the relevant subject guide instead of presenting them as current instructions.

The acquisition scripts remain reference tooling for the preserved snapshot; a normal build requires neither the original recovery workspace nor a new import. Do not rerun an old import over edited guides.

## Historical media

The [media catalogue](src/content/docs/recovered-media.md) lists all inventoried image references, including unavailable files. Recovered bytes are copied unchanged to `public/media/wiki/` under SHA-256-derived names; `public/media/wiki/mapping.json` maps wiki filenames to portable copies. A partial capture may be a thumbnail, and a full-size historical file is not proof of the exact bytes in the latest snapshot. The `recovery-evidence/` inventory and manifest retain acquisition-workspace relative paths for provenance.

The original `scripts/integrate-media.mjs` remains acquisition reference tooling. Any new recovery needs a reviewed update to the asset mapping, catalogue and media dispositions before building; do not replace the integrated guides with an old import. Historical screenshots are source material, not current UI instructions. Individual image licensing and publication rights remain unresolved.

## GitHub Pages

The contributor preview is published from [hiciefte/bisq-docs](https://github.com/hiciefte/bisq-docs) to **[hiciefte.github.io/bisq-docs](https://hiciefte.github.io/bisq-docs/)**. See the repository Actions page for the latest deployment result.

The included Pages workflow is **manual only**. It derives the GitHub Pages origin and project base path from repository context, including on a fork. Set repository variables `DOCS_SITE` and `DOCS_BASE` to override both values for an approved custom domain or different deployment layout. The workflow requires a configured GitHub Pages environment and must be reviewed before it is run. For a local project-path build, for example:

```sh
DOCS_SITE=https://hiciefte.github.io DOCS_BASE=/bisq-docs/ npm run build
```

A custom domain, DNS configuration, and promotion to official documentation require separate decisions; licensing and maintainer review remain open. No `CNAME` is included. Compatibility routes preserve all 209 exported wiki title paths and earlier preview paths. Check slashless paths and saved fragments at the final host.

See [publishing steps](PUBLISHING.md) for source updates and manual Pages deployment.
