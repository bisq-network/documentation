# Bisq documentation

A community preview of the restored Bisq wiki. The main site contains recovered articles covering Bisq 1, Bisq 2, payment methods, the DAO and contributing. The snapshot completed on 18 October 2026; its contents have not been certified as current. Maintainer review, complete attribution and content/media reuse terms remain open. See [review status](src/content/docs/review.md) and [source recovery](src/content/docs/recovery-status.md).

## Run locally

Use Node 22.12 or newer:

```sh
npm ci
npm run build
npm run preview
```

The static site is built in `dist/`. The ordinary build uses the checked-in articles and assets; it needs neither Python nor the original acquisition workspace. Search covers the restored main documentation. Browse by topic or title as an alternative.

## Sources and review

- `src/content/docs/wiki/` contains the restored articles at canonical `/wiki/<slug>/` routes. The preserved source text and available revision metadata are in `public/wiki-source/`; `migration/articles.json` indexes the acquisition. Acquisition-workspace paths in metadata are provenance, not active content locations.
- `review/ai-edited/` preserves 98 earlier AI-edited guides and their integration records for comparison. These guides are not served or indexed as main documentation. `review/comparison-index.json` connects the review material to the sources; see [review/README.md](review/README.md).
- All recovered wiki title paths and 98 earlier guide paths have compatibility pages. A page representing multiple originals offers a choice of sources. Keep section mappings and base-path behavior intact when changing routes.
- All 123 inventoried images have full-size historical files, appearing in 133 inline occurrences. The initial mapping remains preserved; 26 replacements and an additional linked image come from the 14 October 2026 archive and are documented in `recovery-evidence/` and the [media catalogue](src/content/docs/recovered-media.md). Old screenshots can differ from current software.

Run `npm test` and `npm run build` after changes. Source preservation checks do not establish that the recovered instructions are current. See [CONTRIBUTING.md](CONTRIBUTING.md) and [CONTENT-SOURCES.md](CONTENT-SOURCES.md) before proposing edits.

## GitHub Pages

The intended community preview is [bisq-network.github.io/documentation](https://bisq-network.github.io/documentation/); check the Actions deployment result for the actual published revision. The included workflow is manual and derives the Pages origin and project base from the repository. For a local project-path check:

```sh
DOCS_SITE=https://bisq-network.github.io DOCS_BASE=/documentation/ npm run build
```

See [PUBLISHING.md](PUBLISHING.md) for publishing steps. Custom domains, official adoption, attribution and reuse terms need separate decisions; no `CNAME` is included.
