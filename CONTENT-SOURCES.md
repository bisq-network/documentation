# Content sources and attribution

The main documentation consists of 209 recovered Bisq wiki articles. The snapshot completed on 18 October 2026 at 01:01:19 UTC; its newest exported revision is 15 October 2026 at 15:23:28 UTC. It contains one revision per article. On 20 November 2026 the articles were compared with the wiki operator's full database backup of 19 October 2026 (583 pages, 3,806 revisions): every one of the 209 is identical to its latest revision there. The backup is kept privately, because it also holds user accounts; `src/data/backup-check.json` records the result per article.

`public/wiki-source/` preserves the source wikitext and available revision metadata, and `migration/articles.json` indexes the acquisition. Available last-editor attribution is not the complete author list. The full backup holds each article's complete editor list, which is not published yet, and the wiki's content licence has not been recovered. Do not assume that the application's software licence covers wiki prose and images.

The separate `review/ai-edited/` collection preserves 98 earlier AI-edited guides and their source-check records; `review/comparison-index.json` supports human comparison. Those guides are not the canonical site articles or indexed main search content. Their source checks do not replace maintainer review or establish that actions were tested in the application.

## Media and branding

`public/media/wiki/mapping.json` preserves the initial recovery mapping. A checksum-verified [14 October 2026 WikiTeam archive](https://archive.org/details/wiki-bisq.wiki-20261014) supplied full-size files for 23 partial and three missing entries, plus the separately linked Arrow screenshot. All 123 inventoried filenames now have full-size historical files, with 133 inline occurrences. Supplemental mappings and hashes are recorded in `recovery-evidence/supplemental-media.json`; the catalogue retains earlier provenance. These files need not match the 18 October snapshot, and reuse terms remain unresolved.

The Bisq logo and visual reference sources are recorded in `design-reference/PROVENANCE.md`. The locally hosted IBM Plex Sans font retains its supplied OFL licence. These assets retain their own terms; this repository does not claim new ownership of them.
