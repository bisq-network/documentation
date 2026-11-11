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

## Compare a wiki backup

To see what a full wiki backup changes, run one command on it, in whatever form it arrived: a folder, an archive (`.tar`, `.tar.gz`, `.tar.bz2`, `.zip`, or `.7z` with 7-Zip installed) or a MediaWiki XML export (plain, `.gz` or `.bz2`).

```sh
npm run compare-backup -- ~/Downloads/bisq-wiki-backup.tar.gz --open
```

It finds the XML export and the `images/` folder, unpacks archives into a temporary folder outside the repository and removes it afterwards, then writes `report.html` to `tmp/wiki-backup-intake/` (ignored by git), with `REPORT.md`, `report.json` and `newer-revisions.jsonl`. The report shows each article the backup changed, word by word; the gaps in our articles the backup can fill; the articles and images we do not have; and redirects and templates. It holds public wiki data only: anonymous editors are counted, never listed. A database dump is never opened; if the backup has nothing else, the command explains how to export the pages, for example with `sh scripts/sql-dump-to-xml.sh` and Docker. If the backup holds several different XML exports, the command lists them and asks you to choose one with `--xml <name>`; `--images <name>` picks between images folders. Unpacking stops at 20 GB; raise that with `--max-unpacked 40G` only for a backup that really is larger. Never commit the report or any part of the backup. [INTAKE.md](INTAKE.md) describes how to act on the results.

## Wording-only review batches

Keep initial proposals small and article-by-article, retaining titles, structure, facts and procedural order. Open documentation PRs as **ready for review**, so CodeRabbit (CRAI) can review them automatically. Keep the PR against the restored baseline so reviewers see the actual wording diff. The earlier AI edition can inform the comparison, but is not a replacement to apply wholesale.

The restoration fidelity gate intentionally rejects changes to article wording unless a reviewed receipt covers them (see [Accepted editorial changes](#accepted-editorial-changes)). On a pull request this shows as two checks: `check` stays green while the edit keeps everything a receipt would still require, and `receipts` fails, listing each article awaiting a receipt, until a reviewer adds the receipt and approves. That `receipts` failure is expected while the wording is under review. Do not refresh the original hashes to hide the difference.

When imported HTML has an entire article on one source line, separate a formatting-only change from its wording proposal first. Teams uses one paragraph or list item per line by decoding existing `&#10;` newline entities. `migration/source-formatting.json` records this reversible change; the fidelity check reconstructs and verifies the exact original bytes before checking author content. This does not permit arbitrary whitespace changes or edits to the preserved original hash receipts.

The restored articles are Markdown. Each was converted from the restored HTML, which stays in `migration/restored-articles/` and never changes. `migration/markdown-format.json` records each conversion by hash, and the fidelity check confirms on every run that the Markdown renders to the same page as that HTML (see [Markdown conversion](#markdown-conversion)). After that, any change to the Markdown, even one the page does not show, is a wording change that needs a receipt.

## Accepted editorial changes

A wording change to a restored article can merge only with a receipt that a documentation reviewer approved. A receipt is a file in `migration/accepted-edits/`, named `<slug>.pr-<number>.json`; it records the exact text the change replaced. `migration/accepted-edits.json` lists the reviewers (suddenwhipvapor and pazza83) and how many must approve (one). The author's own approval never counts, so a change by one reviewer is approved by the other, and a change by anyone else by either of them.

### In the browser

1. **Edit.** Open the article's file in `src/content/docs/wiki/` on GitHub and click the pencil (**Edit this file**). Change only the wording. The article is Markdown: keep headings with their `{#id}`, links, figures and the HTML parts as they are. Click **Commit changes…**, choose **Create a new branch for this commit and start a pull request**, and keep GitHub's suggested branch name (`<login>-patch-<n>`). Fill in the template and add the `wording-proposal` label.
2. **Checks.** `check` turns green. `receipts` turns red and lists the article as awaiting a receipt, which is expected. GitHub asks the reviewers for a review (`.github/CODEOWNERS`).
3. **Review.** The reviewer reads **Files changed** and comments, or proposes wording with **Add a suggestion**. The author applies it with **Commit suggestion** or edits again.
4. **Add the receipt.** When the wording is final, the reviewer who will approve opens **Details** next to the `receipts` check, then the run's **Summary**, and clicks **Add receipt, approved by** their login. GitHub's new-file page opens on the pull request's branch with the receipt filled in. Check the one-line summary: it is shown on the article page and must describe the change, not call it verified or official. Then commit.
5. **Approve.** The same reviewer clicks **Review changes**, then **Approve**. `receipts` runs again and turns green.
6. **Merge and publish.** A maintainer merges with a merge commit and runs the **Build and deploy documentation** workflow.

If the wording changes after the receipt was added, the receipt no longer matches and `check` fails. Delete the receipt file on the branch (in **Files changed**, its **⋯** menu, **Delete file**), wait for the checks, and add a fresh receipt from the new link.

### In a local checkout

Run `node scripts/record-accepted-edit.mjs <slug> --pr <PR URL> --author <login> --summary "<one line>"`, optionally with `--approver <login>`. It writes the receipt file; run it again after each wording change to refresh the recorded changes. Related note IDs from `migration/source-review-notes.json` and evidence links can be added to the file. The reviewer named in the receipt then approves the pull request.

### What a receipt allows

The fidelity check puts the recorded text back, confirms the result is byte for byte the converted Markdown (or the restored HTML, or the previous accepted edit), and checks that file as before. It then compares the edited file with that base on the page readers get: rendered with the site's own Markdown pipeline (`scripts/lib/render-markdown.mjs`), given the page's link, section, template, media and heading replacements (`scripts/lib/article-page.mjs`, the same code `src/components/SourceHistory.astro` runs), and parsed as part of a whole page. Markdown adds markup without any HTML tag in the source (`![image](…)`, `## heading`, links, autolinks, footnotes, `:::` asides, code blocks, tables), so the check looks at the rendered elements.

- Unchanged: the front matter, title and contents list (byte for byte in the source), the page around the article, the article container, headings, existing IDs and legacy anchors, and each figure as a whole: its link, caption and images. An image's alt text may change only if `changed_image_alt_text` lists the figure.
- Added or removed elements may only be plain `a`, `strong`, `em`, `b`, `i`, `code`, `br`, `p`, `ul`, `ol` and `li` (new IDs allowed; links only to http(s), relative or same-page targets, with `rel`; inline code may carry the `dir="auto"` the site adds to Markdown inline code).
- The edit may not add a comment, leave an element open that would reach past the article, or add a `<html>`, `<head>`, `<body>` or `<frameset>` tag or a `</main>`, `</body>`, `</html>` or `</head>` tag: a browser applies those to the page itself.
- Code blocks, tables and recovery gap markers ("[section not recovered: …]", unrecovered links and templates) need their own decision: they change only when the receipt lists each in `changed_locked_content` (`source-code-3` for a code block by its code's ID, otherwise `pre-1`, `table-2` or `gap-4`, numbered in page order).
- Characters a reader does not see (zero-width spaces and joiners, bidirectional controls, soft hyphens and other format characters, variation selectors, blank fillers) may appear in the text an edit changes, written out or as a character reference, only when the receipt lists each in `added_invisible_characters`, as `U+200B`. This goes by position, so moving one or swapping one for another needs the listing too.
- In Last resort restore the text around each recovery safeguard must stay as restored.

An article that is still HTML is also checked tag by tag in its source, as before: there the edit may not add a blank line either. For an edit awaiting a receipt, both checks name what its receipt must list, and the drafted receipt lists it. A later edit to the article, or a receipt made against a different version, fails. Several receipts for one article must form one chain, each based on the file the previous one accepted. Receipts do not exempt `public/wiki-source/`, the AI-edited snapshots, the recovery safeguards or the template, section and link repair checks. After the build, `npm run build` also requires each built article page to show exactly the checked article, with its IDs unique on the page, and fails on page files other than the known ones in `src/pages/` (`scripts/check-rendered-articles.mjs`).

An edited article shows "Edited after restoration" with a link to the PR, and its "Source and history" section lists each accepted change. The original wikitext stays linked there.

### Checks on a pull request

`npm run build`, locally and in the deployment workflow, fails on any wording change that no receipt covers, so nothing published can contain one. On a pull request the check workflow reports such a change separately:

- **`check`** runs the fidelity gate with `--awaiting-receipt-base`, comparing each changed article with the pull request's base (the first parent of its merge commit). A change without a receipt counts as *awaiting a receipt*, not as a failure, only if the base file is exactly the article's converted Markdown (or the restored HTML of an article not converted yet, or its last accepted edit), passes every original check, and the change keeps everything a receipt would still require (as listed above). An alt-text-only change to a figure's image also counts as awaiting: both checks name the figure, and its receipt must list it in `changed_image_alt_text`. Everything else is checked as without the flag: `public/wiki-source/`, the restoration and receipt records, the AI-edited snapshots, the recovery safeguards, and the template, section and link repair checks. Anything else fails `check`.
- **`check`** also fails when the pull request changes a preserved restoration material compared with its base: `migration/restoration-fidelity.json`, `migration/additional-articles.json`, `migration/restored-articles/`, `migration/markdown-format.json`, `public/wiki-source/`, `public/media/` or `review/ai-edited/`. These never change in a pull request, so refreshing an original's hashes cannot hide an edit. Accepted wording goes through a receipt in `migration/accepted-edits/`; a deliberate new intake needs its own pull request that also changes this guard (`scripts/lib/immutable-materials.mjs`).
- **`receipts`** fails while any article awaits a receipt and lists each one, which is expected for a wording proposal until a reviewer adds the receipt and approves. Its run summary drafts each missing receipt, with an **Add receipt** link for every reviewer who may approve it. It fails on any other fidelity finding too, so it never passes where the strict gate would fail. It then compares the recorded approvals with the pull request's reviews (see below).

The additional historical articles in `migration/additional-articles.json` are not covered by receipts; any change to them fails `check`. A change that also records new line-break formatting for the same article (`migration/source-formatting.json`) fails `check` as well: propose the formatting-only change on its own first. Likewise, a change that rewords an article and also records its Markdown conversion fails `check`: convert on its own first.

### Markdown conversion

The restored articles were converted from HTML to Markdown without changing the page. Three files hold the conversion:

- `migration/restored-articles/<slug>.md` is the restored HTML article as it was before the conversion (with its recorded line-break formatting). Every article's chain starts there, and the original checks run on it. It never changes.
- `migration/markdown-format.json` lists, per article, the HTML file the Markdown replaced (the restored article, or its last accepted HTML edit) and the Markdown file, by SHA-256. It is a preserved restoration material: a pull request that changed it could present an edited article as a fresh conversion.
- `scripts/lib/render-markdown.mjs` renders Markdown exactly as the site build does, with the Markdown rules in `src/markdown/wiki-markdown.mjs`. It uses Astro internals, so it runs only on the package versions in its `verifiedWith`, and `npm run build` compares it with the build for every article (`scripts/check-rendered-articles.mjs`).

On every run the fidelity check rebuilds the HTML (applying any accepted HTML edits to the preserved original), renders both files as the article, gives both the page's replacements and requires the same page. Both pages are parsed with the processor's HTML5 parser, and only these differences are allowed, each one something the page does not show (`normalizeFormat` in `scripts/lib/rendered-html.mjs`):

- attribute order;
- whitespace outside `pre`, `code`, `kbd`, `samp` and `textarea`: a run of spaces, tabs or line breaks counts as one space, and a space where a line starts or ends (at the edge of a block element, after `<br>`, also inside a link or empty anchor span at that edge) does not count;
- `dir="auto"` that Starlight adds to Markdown inline code, unless the code holds right-to-left text.

Text, elements, other attributes and comments must be identical, including the link the site adds to every heading, and the front matter byte for byte. The HTML file must also render as itself, apart from that heading link in the exact form the site renders for the heading's ID and text, so a broken renderer cannot make both pages match. A doubled space would pass this comparison, but once the conversion is recorded the Markdown is pinned by its hash: any later change to it is a wording change.

All 209 articles were converted in one pull request, which added the record. A further conversion (say, of an article put back to HTML) is its own pull request: convert the article, run `node scripts/record-markdown-format.mjs <slug>`, which checks the conversion and writes its record, and change the guard in `scripts/lib/immutable-materials.mjs` in the same pull request, so reviewers see that the record changes. It changes no wording and needs no receipt; wording changes in the same pull request fail `check`. An article without a record stays HTML and is checked as before.

### Approval rule

`migration/accepted-edits.json` lists the `reviewers` and sets `required_approvals`. The offline gate only counts the logins a receipt records. The `receipts` check compares them with GitHub, for each receipt the pull request adds or changes; such a receipt must name that pull request. Every recorded login must:

- be one of the reviewers listed in the base's `migration/accepted-edits.json`, so a pull request cannot add its own reviewer;
- have approved the pull request at its current head commit (an approval from before the last push, one followed by a change request, or a dismissed one does not count);
- be neither the pull request author nor the receipt author;
- have write access to the repository. This comes from the review's `authorCanPushToRepository` field in GitHub's GraphQL API. The REST collaborator-permission endpoint needs push access itself, which a fork pull request's token does not have.

At least `required_approvals` distinct approvers must pass, using the base's value if the pull request lowers it. Receipts from earlier pull requests that stay unchanged are not checked again, and outside a pull request the comparison is skipped. Like every pull request check, the job runs the pull request's own copy of the workflow and scripts, so `main` should also require the reviewers' approval through GitHub itself: a ruleset rule that requires one approval from a team of the reviewers for changes to `src/content/docs/wiki/**` and `migration/**`. Changing the reviewers or `required_approvals` needs the maintainers' agreement.
