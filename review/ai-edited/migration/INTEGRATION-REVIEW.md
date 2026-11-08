# Wiki integration review

The 209 recovered wiki topics now have destinations in 98 subject guides. The separate historical reading section is retired; original text and available revision metadata remain downloadable from each guide. This is a contributor-review edition; maintainer approval remains pending.

## Coverage

| Section | Guides |
| --- | ---: |
| Start here | 1 |
| Bisq 1 | 27 |
| Bisq 2 | 12 |
| Payment methods | 41 |
| DAO and BSQ | 6 |
| Contributing | 8 |
| Reference | 3 |

All 209 sources have one disposition in the three `migration/integration-*.json` files: 143 merged, 41 rewritten, 23 retained as reference, and two retired roles whose former purpose remains explained. Source-check labels are 31 checked, 140 qualified and 38 historical-only. A qualified record identifies both what was checked and what remains uncertain; these are not 209 claims of full current verification.

The guides use 99 recovered image files. The other 21 redundant or obsolete illustrations remain in the catalogue, with individual reasons in `migration/media-disposition.json`. All 120 image files, all 209 wikitext exports and their revision metadata are unchanged. Three additional inventoried images remain missing.

## Corrections and consolidation

Current references are pinned to Bisq 1 v1.10.11 and Bisq 2 v2.1.15, with topic-specific official provider and role sources where available. Corrections include Monero auto-confirm defaults, Bisq Easy reputation score and star rules, DAO consensus versus proposal thresholds, the offer price-comparison rule, the actual Tor identity and delayed-payout export paths, and local signing in exceptional payout recovery. Removed duplicate setup instructions now link to shared guides. Stale provider, role, implementation and screenshot claims are identified instead of presented as current facts.

Search covers all subject guides, including `suddenwhipvapor` and `luis3672`. Both names resolve to the mediator guide and individual name sections. The current application mapping and dated public reports do not establish live availability or assignment to a particular trade.

## Compatibility and validation

- All 209 exported MediaWiki title paths and 209 earlier `/wiki/` preview paths have static compatibility pages. Known headings are mapped to their relevant guide or section; unknown fragments fall back to the topic. Without JavaScript, continuation and saved-section links remain available.
- Root and `/bisq-docs/` builds passed coverage, internal-link/fragment, search-scope, original-text and media-hash checks. Pagefind indexes the homepage plus 98 subject guides. Alias and provenance pages do not compete with them in search.
- Five focused route tests passed, including encoded titles/fragments, malformed fragments, base paths and case-only aliases. `SEPA` and `Sepa` produce equivalent aliases: the local case-insensitive filesystem stores one physical file, while Linux can emit both.
- Browser checks covered both exact mediator queries, search-to-section navigation, slashless old links, saved installer fragments, the earlier preview path, encoded `Payment_methods%2Fes`, both SEPA spellings, source-history expansion, and desktop/mobile layout.
- The first mobile review found compressed contact tables; mediator and refund-agent entries now stack vertically. The mediator guide has no horizontal page overflow at 390px.

## Remaining review

Current provider access/fees, role ownership, changing governance parameters, historical-only reference, content/media reuse terms and complete authorship need maintainer review. No funded trade, wallet restore, exceptional payout, burn/bond, DAO action or production infrastructure procedure was executed. Unknown former redirects or deleted pages outside the recovered inventory may require additional mappings.

Deployment is tracked separately in the [Pages workflow history](https://github.com/hiciefte/bisq-docs/actions/workflows/pages.yml). Check the successful run's revision when reviewing the live preview. Publishing the preview does not change DNS or establish official adoption.
