# Review and improve the documentation

This is a community preview, not official Bisq approval. The main articles reproduce a recovered October 2026 wiki snapshot; their age and preservation do not establish current accuracy.

For a focused correction, identify the article, affected product and version, the wording to change, and a supporting source or reproducible observation. Prefer immutable links to official application source, release notes or other primary material. Explain whether you inspected code, exercised the application, or both. Human review remains necessary, especially for payments, recovery and dispute instructions. Never perform a funded trade or irreversible operation merely to validate wording.

The original source and available revision metadata remain in `public/wiki-source/`; preserve them when editing a main article. The 98 prior AI-edited guides and their comparison index under `review/` are available as review material, not live main documentation. Avoid treating an AI rewrite as an authoritative source.

Preserve prerequisites and warnings, identify old interfaces in images, and do not include secrets, payment details or private trade conversations in public material. When changing a route or heading, check the corresponding wiki-title and earlier-guide compatibility links, including saved sections. Content and media reuse terms and full authorship remain unresolved; see [CONTENT-SOURCES.md](CONTENT-SOURCES.md).

Run `npm ci`, `npm test`, and `npm run build`; check affected pages, images and links at desktop and narrow widths. Also check the project base path:

```sh
DOCS_SITE=https://bisq-network.github.io DOCS_BASE=/documentation/ npm run build
```

The deployment workflow is manual. Building or submitting a pull request does not publish the site.

## Wording-only review batches

Keep initial proposals small and article-by-article, retaining titles, structure, facts and procedural order. Open documentation PRs as **ready for review**, so CodeRabbit (CRAI) can review them automatically. Keep the PR against the restored baseline so reviewers see the actual wording diff. The earlier AI edition can inform the comparison, but is not a replacement to apply wholesale.

The restoration fidelity gate intentionally rejects changes to article wording unless a reviewed receipt covers them (see [Accepted editorial changes](#accepted-editorial-changes)). An editorial PR therefore shows this expected failure while reviewers assess the proposal. Do not refresh the original hashes to hide the difference.

When imported HTML has an entire article on one source line, separate a formatting-only change from its wording proposal first. Teams uses one paragraph or list item per line by decoding existing `&#10;` newline entities. `migration/source-formatting.json` records this reversible change; the fidelity check reconstructs and verifies the exact original bytes before checking author content. For the additional historical articles, the reconstructed bytes are checked against their own receipts in `migration/additional-articles.json`. This does not permit arbitrary whitespace changes or edits to the preserved original hash receipts.

## Accepted editorial changes

A wording change to a restored article can merge only with a receipt in `migration/accepted-edits.json`. Add it after reviewers have approved the wording:

1. Rebase the PR on `main`, so it changes the current article.
2. For each changed article, run `node scripts/record-accepted-edit.mjs <slug> --pr <PR URL> --author <login>` and append the printed item to `items`.
3. Fill in a one-line summary, the approvals (GitHub login as plain text without `@`, plus role), related note IDs from `migration/source-review-notes.json`, and evidence links.
4. Reviewers approve again after the receipt commit, so their approval covers the receipt.

The receipt records the exact text it replaced. The fidelity check puts that text back, confirms the result is byte for byte the restored original (or the previous accepted edit), and runs every original check on it. It then compares the edited file with that base: front matter, title, contents list, article container, headings, existing IDs, legacy anchors and images must be unchanged. An image's alt text may change only if `changed_image_alt_text` lists the figure. Added or removed markup may only be plain `a`, `strong`, `em`, `b`, `i`, `code`, `br`, `p`, `ul`, `ol` and `li` (new IDs allowed; links only to http(s), relative or same-page targets), and the edit may not add a comment or a blank line. In Last resort restore the text around each recovery safeguard must stay as restored. Changes to code blocks, tables or "section not recovered" markers need their own decision. A later edit to the article, or a receipt made against a different version, fails. Receipts do not exempt `public/wiki-source/`, the AI-edited snapshots, the recovery safeguards or the template, section and link repair checks.

An edited article shows "Edited after restoration" with a link to the PR, and its "Source and history" section lists each accepted change. The original wikitext stays linked there.

### Approval rule (for maintainers to decide)

`required_approvals` in `migration/accepted-edits.json` sets how many distinct approvals each receipt needs; the login recorded as author never counts. The check runs offline and only counts what the receipt says: anyone can type two logins into a receipt. Recorded approvals mean something only once branch protection on `main` requires the same reviews from people with write access, so set that up before the first receipt merges. Options:

- **A. One maintainer** (`required_approvals: 1`). Fastest; one person can accept a change.
- **B. Two people, at least one maintainer** (`2`, the value in this proposal). The role mix is a review convention; the check does not enforce roles.
- **C. As B, plus subject review:** for payment, dispute, recovery and wallet articles, one approval comes from someone who handles support in that area.

For any option: require that number of approving reviews on `main`, include administrators, dismiss stale approvals when new commits are pushed, make the check workflow required, and add a CODEOWNERS entry for `migration/accepted-edits.json` with "require review from code owners". A later CI step could compare the recorded logins with the pull request's actual approving reviews; it needs the GitHub API and is not part of the offline gate.
