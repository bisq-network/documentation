# Review and improve the documentation

This repository is a personal community review preview. Changes here do not represent official Bisq approval.

Start with a guide you know well. Open an issue or a focused pull request identifying the page, the affected Bisq version, the problem and the source that supports your correction. Keep current product instructions separate from historical material.

## Editing a guide

1. Read its sources and check the relevant supported release. Prefer official release notes and immutable application-source links for facts that can change.
2. Preserve prerequisites, warnings, payment order, product boundaries and recovery limits. A shorter paragraph is useful only if those details survive.
3. Link to the existing guide for shared explanations. Keep a critical warning next to the action it affects even if it also appears elsewhere.
4. Explain any contradiction between sources. Do not invent missing fees, limits, keys, template values or UI behavior.
5. Update the guide's checked date and source context. Tell reviewers whether you read source code, exercised the application, or both.
6. Run `npm ci` and `npm run build`. Check the affected page on a desktop and a narrow screen, including its images and links.

Source-checked does not mean tested with real funds. Never perform a funded trade, wallet restore or irreversible operation merely to validate a wording change.

## Integrated sources and images

All 209 recovered wiki titles are assigned to main documentation guides in `migration/integration-*.json`. Preserve the useful detail, source-check notes and source-to-section mapping when consolidating a guide. The exact original source and available revision attribution remain in `public/wiki-source/`; do not edit those exports to make them match the new prose.

When changing a heading or destination, update the integration mapping and any explicit fragment mappings. Test old title paths as well as the new guide URL. Search indexes canonical subject guides; compatibility and provenance pages are excluded to avoid duplicate results.

Use an image only when it explains the surrounding step. Preserve its source record and identify historical interfaces or thumbnails. Never include wallet secrets, payment details, private trade chats or another person's personal information in a screenshot.

Full source authorship and content/media reuse terms remain unresolved. Do not assign a blanket licence to imported material or assume that the application's software licence covers wiki prose and images. See `CONTENT-SOURCES.md`.

## Checks for a GitHub Pages path

The normal local build uses `/`. Check the intended hosted path too:

```sh
DOCS_SITE=https://hiciefte.github.io DOCS_BASE=/bisq-docs/ npm run build
```

The deployment workflow is manual. Building or contributing a pull request does not publish the site.
