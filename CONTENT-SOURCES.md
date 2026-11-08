# Content sources and attribution

The main documentation consists of 209 recovered Bisq wiki articles. The snapshot completed on 18 October 2026 at 01:01:19 UTC; its newest exported revision is 15 October 2026 at 15:23:28 UTC. It contains one revision per article, not the complete MediaWiki database or revision history. A faithful restoration is not evidence that the instructions remain current.

`public/wiki-source/` preserves the source wikitext and available revision metadata, and `migration/articles.json` indexes the acquisition. Available last-editor attribution is not the complete author list. Full authorship history and the wiki's content licence have not been recovered. Do not assume that the application's software licence covers wiki prose and images.

The separate `review/ai-edited/` collection preserves 98 earlier AI-edited guides and their source-check records; `review/comparison-index.json` supports human comparison. Those guides are not the canonical site articles or indexed main search content. Their source checks do not replace maintainer review or establish that actions were tested in the application.

## Media and branding

`public/media/wiki/mapping.json` maps recovered wiki filenames to unchanged SHA-256-addressed assets. Of 123 inventoried filenames, 120 have recovered assets: 97 full-size files and 23 thumbnails or partial recoveries. The restored articles use those assets in 130 inline occurrences. Three files remain missing. Acquisition evidence is retained in `recovery-evidence/`; the catalogue describes provenance and inferred filename mappings. A historical image may not match current software, and individual reuse terms remain unresolved.

The Bisq logo and visual reference sources are recorded in `design-reference/PROVENANCE.md`. The locally hosted IBM Plex Sans font retains its supplied OFL licence. These assets retain their own terms; this repository does not claim new ownership of them.
