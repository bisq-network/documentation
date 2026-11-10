# Review and improve the documentation

This is a community preview, not official Bisq approval. The main articles reproduce a recovered October 2026 wiki snapshot; their age and preservation do not establish current accuracy.

For a focused correction, identify the article, affected product and version, the wording to change, and a supporting source or reproducible observation. Prefer immutable links to official application source, release notes or other primary material. Explain whether you inspected code, exercised the application, or both. Human review remains necessary, especially for payments, recovery and dispute instructions. Never perform a funded trade or irreversible operation merely to validate wording.

The original source and available revision metadata remain in `public/wiki-source/`; preserve them when editing a main article. The 98 prior AI-edited guides and their comparison index under `review/` are available as review material, not live main documentation. Avoid treating an AI rewrite as an authoritative source.

Preserve prerequisites and warnings, identify old interfaces in images, and do not include secrets, payment details or private trade conversations in public material. When changing a route or heading, check the corresponding wiki-title and earlier-guide compatibility links, including saved sections. Content and media reuse terms and full authorship remain unresolved; see [CONTENT-SOURCES.md](CONTENT-SOURCES.md).

Run `npm ci`, `npm test`, and `npm run build`; check affected pages, images and links at desktop and narrow widths. Also check the project base path:

```sh
DOCS_SITE=https://hiciefte.github.io DOCS_BASE=/bisq-docs/ npm run build
```

The deployment workflow is manual. Building or submitting a pull request does not publish the site.

## Wording-only review batches

Keep initial proposals small and article-by-article, retaining titles, structure, facts and procedural order. Open documentation PRs as **ready for review**, so CodeRabbit (CRAI) can review them automatically. Keep the PR against the restored baseline so reviewers see the actual wording diff. The earlier AI edition can inform the comparison, but is not a replacement to apply wholesale.

The restoration fidelity gate intentionally rejects changes to article wording. An editorial PR can therefore show this expected failure while reviewers assess the proposal. Do not refresh the original hashes to hide the difference. Human approval and a separately reviewed policy for accepted editorial changes are required before such a PR can be merged and published.

When imported HTML has an entire article on one source line, separate a formatting-only change from its wording proposal first. Teams uses one paragraph or list item per line by decoding existing `&#10;` newline entities. `migration/source-formatting.json` records this reversible change; the fidelity check reconstructs and verifies the exact original bytes before checking author content. For the additional historical articles, the reconstructed bytes are checked against their own receipts in `migration/additional-articles.json`. This does not permit arbitrary whitespace changes or edits to the preserved original hash receipts.
