---
title: Documentation and translation
\ndescription: Write maintainable guidance and coordinate language work.
---

*Source checked 7 November 2026 · Maintainer review pending.*

## Wiki style guidelines

Organize a page around a concept, a procedure or a reference, and link to the maintained explanation instead of duplicating it. Use descriptive headings and stable anchors, spell out ambiguous abbreviations, mark UI labels and commands as code, and place warnings near the action they qualify. State the applicable product and version. Explain what a reader should see and how to verify it. Keep screenshots consistent and caption them with their version; a historic image is evidence of an older interface, not proof of the current one. Avoid promotional links without a reason.

The former MediaWiki guide used `__TOC__`, `{{...}}` transclusion and wiki-specific admonition and image templates. This site uses Markdown and its own components; copy the principle, not that syntax blindly. Link to the [raw historical style guide](../../wiki-source/wiki-style-guidelines.wiki.txt) for its original examples and formatting conventions.

## Templates as macros

The former wiki used templates as reusable macros and transclusion to avoid duplicated text. A template invocation can carry arguments and can also refer to another template; an unavailable definition is a gap, not text that may be invented. The recovered macro list included `MinTradeSizeToBeSigned`, `MaxTradeSizeUnsigned`, `MaxTradeSizeBisq1`, `MaxTradeSizeAltcoin` and `MaxBisqEasyTrade`, intended to reuse changing signing and trade limits. Their definitions were not present in the source capture, so their values must not be inferred. When migrating or editing, identify the original definition and its parameters, retain the source link, and replace it only with reviewed equivalent content. Consult [MediaWiki's template documentation](https://www.mediawiki.org/wiki/Help:Templates) for the historical mechanism.

## Translation

Bisq has used [Transifex](https://explore.transifex.com/bisq/) for localization and GitHub for source-language changes. Check the active project, repository instructions and maintainers before translating or submitting generated files: the recovered list of projects, priority languages, review budget and per-word rate is historical and must not be treated as a current promise. Preserve placeholders, formatting and meaning, and flag ambiguous source text instead of guessing. Agree any compensated scope in advance; compensation remains subject to review and DAO voting.

## Wiki Operator

The historical operator role maintained MediaWiki hosting, DNS, plugins and backups. Those old hosting instructions do not authorize changes to this site's repository, domain or deployment. See [roles](../roles/#wiki-operator) and the current issue for role status.

## Sources and review

Sources checked 7 November 2026: [Bisq translation projects](https://explore.transifex.com/bisq/), [MediaWiki templates](https://www.mediawiki.org/wiki/Help:Templates), [wiki operator role](https://github.com/bisq-network/roles/issues/92), and the [current participation policy](https://bisq.network/blog/open-source-development-in-the-age-of-ai/). Historical style and translation guidance supplied the older workflow and rate examples; current project assignments and compensation terms were not verified. Maintainer review is pending.
