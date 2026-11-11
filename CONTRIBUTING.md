# Contributing to the Bisq documentation

This site reproduces the Bisq wiki as it was recovered in October 2026. It is a community preview, not official Bisq approval, and an article's age and preservation do not establish that it is still accurate. Corrections are welcome: anyone can report a problem or propose new wording, a documentation reviewer accepts each wording change, and a maintainer publishes it.

## How a change reaches the site

1. **Propose.** Someone [reports a problem](#report-a-problem) in an issue, or [edits an article](#edit-an-article-in-the-browser) on GitHub and opens a pull request.
2. **Check.** GitHub runs two checks on the pull request. `check` confirms that the change keeps everything a wording change must keep; `receipts` stays red until a reviewer accepts the change.
3. **Review.** A documentation reviewer reads the change and settles the final wording with its author.
4. **Accept.** The reviewer [adds a receipt and approves](#review-and-accept-a-change). Both checks turn green.
5. **Merge.** A maintainer [merges](#merge-and-publish) the pull request.
6. **Publish.** A maintainer runs the deployment. Merging alone publishes nothing. GitHub lets a wording change reach `main` only with both checks green and a reviewer's approval, and the deployment builds only `main`. That build fails on any wording change that has no receipt.

| Who | Does what |
| --- | --- |
| Anyone with a GitHub account | Reports problems and proposes wording changes. |
| Documentation reviewers: [suddenwhipvapor](https://github.com/suddenwhipvapor) and [pazza83](https://github.com/pazza83) (team `documentation-reviewers`) | Review and accept wording changes to the articles. Nobody accepts their own change, so a change by one reviewer is accepted by the other. |
| Maintainers (the repository's administrators) | Label proposals, start the checks for first-time contributors, merge and publish. |

## Propose a change

### Report a problem

If you would rather not edit an article yourself, use the [Review an article](https://github.com/bisq-network/documentation/issues/new?template=article-review.yml) issue form. Link the section (the link button next to each heading gives its address), say which product and version you checked, quote the current sentence and suggest your wording. A reviewer or maintainer can turn the report into a pull request.

### Edit an article in the browser

1. **Open the article's file.** An article's address on the site ends in `/wiki/<name>/`, and its file is `src/content/docs/wiki/<name>.md`. This address opens the file in GitHub's editor: `https://github.com/bisq-network/documentation/edit/main/src/content/docs/wiki/<name>.md`, for example [the Wallet article](https://github.com/bisq-network/documentation/edit/main/src/content/docs/wiki/wallet.md). On the file's page, the pencil (**Edit this file**) does the same. If you cannot write to the repository, GitHub first offers to fork it: accept.
   This works for every article except the three additional historical ones (Emergency Multisig payout tool, Bitcointalk Moderator, 在中国运行Bisq), which receipts do not cover. For those, use the issue form.
2. **Change only the wording.** Text, links, bold and italic, paragraphs and list items can change. Leave the rest as it is: the lines between the two `---` at the top, the "On this page" list, each heading with its `{#id}`, the `<span class="wiki-legacy-anchor" …>` lines and the HTML of figures. The restored text writes apostrophes as `\'`; leave those, and type a plain `'` in new text. Tables, code blocks, image descriptions and captions can change as well, but the reviewer accepts each of them explicitly. A new section, image or article is more than a wording change: open an issue about it first. **Preview** shows the result.
3. **Propose it.** Click **Commit changes…**. Reviewers and maintainers see "You can't commit to main because it is a protected branch": keep **Create a new branch for this commit and start a pull request** with GitHub's branch name (`<login>-patch-<n>`). Everyone else commits to their fork. Click **Propose changes**.
4. **Open the pull request.** On the next page, click **Create pull request** and fill in the template:
   - **Title:** describe the change plainly, for example "Wallet: link the seed backup article". The title becomes the summary line the article page shows once the change is accepted. A title with "verified", "official", "approved", "endorsed", "certified" or "guaranteed" is shown as "Wording change; see the pull request." instead.
   - **Description:** why the change is needed, the product and version, and the source you checked (release notes, the application's code or screens).
   - **Label:** `wording-proposal`, under **Labels** in the sidebar. Only reviewers and maintainers can set labels; a maintainer adds it for everyone else. CodeRabbit skips labelled pull requests and leaves the wording to the reviewers.

   Then click **Create pull request**.

Keep one article, or a few closely related ones, per pull request.

### After you open the pull request

- On your first pull request to this repository, the checks start once a maintainer approves them.
- `check` should turn green. If it fails, open **Details**: the log names what changed besides the wording. Fix it with another edit (in **Files changed**, the file's **⋯** menu, **Edit file**), or ask in the pull request.
- `receipts` turns red and lists the article as awaiting a receipt. That is expected until a reviewer accepts the change.
- GitHub asks both documentation reviewers for a review.
- Every further commit runs both checks again.

### What makes a good proposal

For a focused correction, identify the article, affected product and version, the wording to change, and a supporting source or reproducible observation. Prefer immutable links to official application source, release notes or other primary material. Explain whether you inspected code, exercised the application, or both. Human review remains necessary, especially for payments, recovery and dispute instructions. Never perform a funded trade or irreversible operation merely to validate wording.

The original source and available revision metadata remain in `public/wiki-source/`; preserve them when editing a main article. The 98 prior AI-edited guides and their comparison index under `review/` are available as review material, not live main documentation. Avoid treating an AI rewrite as an authoritative source.

Preserve prerequisites and warnings, identify old interfaces in images, and do not include secrets, payment details or private trade conversations in public material. When changing a route or heading, check the corresponding wiki-title and earlier-guide compatibility links, including saved sections. Content and media reuse terms and full authorship remain unresolved; see [CONTENT-SOURCES.md](CONTENT-SOURCES.md).

### Change the site or tooling

Changes outside the articles (layout, scripts, workflows, these guides) are ordinary pull requests without the label: CodeRabbit reviews them, a maintainer reviews and merges them, and they need no receipt. A change under `migration/` also needs a documentation reviewer's approval. Like every pull request they must pass `check` and `receipts`; [run the checks locally](#run-the-checks-locally) first.

## Accepted editorial changes

A wording change to a restored article can merge only with a receipt that a documentation reviewer approved. A receipt is a file in `migration/accepted-edits/`, named `<slug>.pr-<number>.json`; it records the exact text the change replaced. `migration/accepted-edits.json` lists the reviewers (suddenwhipvapor and pazza83) and how many must approve (one). The author's own approval never counts, so a change by one reviewer is approved by the other, and a change by anyone else by either of them. Receipts let the site show readers which text changed after restoration and who accepted it, and they make the build refuse any wording change nobody accepted.

### Review and accept a change

For the documentation reviewers. GitHub asks for your review on every pull request that changes an article.

1. **Read** the change in **Files changed**. For a Markdown file, **Display the rich diff** in the file's header shows the rendered text. Check the change against the source its author cites.
2. **Discuss.** Comment on a line, or propose exact wording with **Add a suggestion** in the comment box. The author applies it with **Commit suggestion** or edits again.
3. **Add the receipt** once the wording is final. Open **Details** next to the `receipts` check, then the run's **Summary**, and click **Add receipt, approved by** your login. GitHub's new-file page opens on the pull request's branch with the receipt filled in. Check its `summary` line: it is shown on the article page and must describe the change, not call it verified or official. Click **Commit changes…** and commit to the branch.
4. **Approve.** Click **Review changes**, choose **Approve** and submit. `receipts` runs again and turns green. Approve only after committing the receipt: any later commit dismisses the approval.

If a change should not be made, say why and submit the review with **Request changes**; a maintainer closes the pull request.

### Merge and publish

For the maintainers.

1. **Merge** once `check` and `receipts` are green and a documentation reviewer has approved. GitHub enforces all three and allows only merge commits.
2. **Merge changes to the same article one at a time.** GitHub does not run the checks again when `main` moves. If another pull request that changes the same article has merged since this one's checks ran, merging this one as well would break the build on `main`, because both receipts start from the same text. Bring the branch up to date first (merge `main` into it): `check` then fails on the outdated receipt, and the reviewer deletes it, adds a fresh one and approves again.
3. **Publish** with **Actions → Build and deploy documentation → Run workflow** on `main`; the `github-pages` environment accepts no other branch. The workflow tests and builds the site again before it deploys. One run publishes everything merged so far.
4. **Check the live article.** It shows the new wording, and its "Source and history" section lists the accepted change under "Edited after restoration", with the date, summary and pull request.

[PUBLISHING.md](PUBLISHING.md) has the deployment checklist.

### If something goes wrong

- **The wording changed after the receipt was added.** The receipt no longer matches, and `check` fails. Delete the receipt file on the branch (in **Files changed**, its **⋯** menu, **Delete file**), wait for the checks, add a fresh receipt from the new link and approve again.
- **The receipt link offers to fork instead of committing.** The pull request's branch is in a fork you cannot commit to. Comment that the wording is final and that you will approve; the author opens the same link from the run's **Summary** and commits the receipt, then you approve.
- **"Too long for a link" instead of a link.** Create the file the **Summary** names on the pull request's branch, with the receipt text printed in the job log.
- **`receipts` is still red after approving.** The job log names the rule that failed. Usually the approval came before the last commit (approve again), or the receipt names a reviewer other than the one who approved.
- **`check` fails.** Its log names what changed besides the wording. Undo that part, or ask a maintainer whether it needs its own pull request.

### In a local checkout

Run `node scripts/record-accepted-edit.mjs <slug> --pr <PR URL> --author <login> --summary "<one line>"`, optionally with `--approver <login>`. It writes the receipt file; run it again after each wording change to refresh the recorded changes. Related note IDs from `migration/source-review-notes.json` and evidence links can be added to the file. The reviewer named in the receipt then approves the pull request.

### What a receipt allows

The fidelity check puts the recorded text back, confirms the result is byte for byte the converted Markdown (or the restored HTML, or the previous accepted edit), and checks that file as before. It then compares the edited file with that base on the page readers get: rendered with the site's own Markdown pipeline (`scripts/lib/render-markdown.mjs`), given the page's link, section, template, media and heading replacements (`scripts/lib/article-page.mjs`, the same code `src/components/SourceHistory.astro` runs), and parsed as part of a whole page. Markdown adds markup without any HTML tag in the source (`![image](…)`, `## heading`, links, autolinks, footnotes, `:::` asides, code blocks, tables), so the check looks at the rendered elements.

- Unchanged: the front matter, title and contents list (byte for byte in the source), the page around the article, the article container, headings, existing IDs and legacy anchors, and each figure as a whole: its ID, the link that opens it, its images and its caption element. An image's alt text may change only if `changed_image_alt_text` lists the figure, and a caption's text only if `changed_figure_captions` lists the figure; inside a caption the same rules as for article text apply (only the markup below may be added or removed, and invisible characters only as listed).
- Added or removed elements may only be plain `a`, `strong`, `em`, `b`, `i`, `code`, `br`, `p`, `ul`, `ol` and `li` (new IDs allowed; links only to http(s), relative or same-page targets, with `rel`; inline code may carry the `dir="auto"` the site adds to Markdown inline code).
- The edit may not add a comment, leave an element open that would reach past the article, or add a `<html>`, `<head>`, `<body>` or `<frameset>` tag or a `</main>`, `</body>`, `</html>` or `</head>` tag: a browser applies those to the page itself. No article may contain `<noscript>` or `<template>`, which browsers show differently than the check sees them.
- Code blocks, tables and recovery gap markers ("[section not recovered: …]", unrecovered links and templates) need their own decision: they change only when the receipt lists each in `changed_locked_content`. A code block is named by its code's ID (`source-code-3`); anything else by its kind, the ID of the heading it follows (`top` before the first) and its number there (`table:#limits:1`, `gap:top:2`). Each is compared together with its section, its place among these parts and the text right around it, so moving or swapping one counts as changing it.
- Characters a reader does not see or cannot tell apart (default-ignorable code points such as zero-width spaces and joiners, bidirectional controls, soft hyphens, variation selectors and fillers; other format characters; control characters other than tab and line breaks; unassigned, private-use and surrogate code points) may appear in what an edit changes only when the receipt lists each in `added_invisible_characters`, as `U+200B`. This goes by position in the page's decoded text and in the changed source, so moving one, swapping one for another or writing one as a character reference needs the listing too. A change may not end inside a character reference that the text after it completes.
- In Last resort restore the text around each recovery safeguard must stay as restored.

An article that is still HTML is also checked tag by tag in its source, as before: there the edit may not add a blank line either. For an edit awaiting a receipt, both checks name what its receipt must list, and the drafted receipt lists it. A later edit to the article, or a receipt made against a different version, fails. Several receipts for one article must form one chain, each based on the file the previous one accepted. Receipts do not exempt `public/wiki-source/`, the AI-edited snapshots, the recovery safeguards or the template, section and link repair checks. `node scripts/record-accepted-edit.mjs` fills in those lists from the check's findings.

After the build, `npm run build` requires each built article page to show exactly the checked article, with its IDs unique on the page and the same scripts, styles and redirects around it as every other article page (`scripts/check-rendered-articles.mjs`). Nothing else may take an article's place or an old wiki address: the build fails when Astro reports that one page replaced another (`scripts/astro-build.mjs`), on page files other than the known ones in `src/pages/`, on entries in `public/` other than `favicon.ico`, `fonts/`, `media/` and `wiki-source/` or on any file there of a type its folder does not hold (fonts and their licence in `fonts/`, images and the media index in `media/`, text and JSON in `wiki-source/`; never HTML, XHTML or SVG), and on a docs entry that is published at another route than its path gives it, sets a front-matter field other than `title`, `description`, `tableOfContents`, `prev`, `next` and a `slug` that repeats its route, or is MDX other than the two known pages. These build checks also cover pull requests that change no article, which need no documentation reviewer.

An edited article shows "Edited after restoration" with a link to the PR, and its "Source and history" section lists each accepted change. The original wikitext stays linked there.

### Checks on a pull request

`npm run build`, locally and in the deployment workflow, fails on any wording change that no receipt covers, so nothing published can contain one. On a pull request the check workflow reports such a change separately:

- **`check`** runs the fidelity gate with `--awaiting-receipt-base`, comparing each changed article with the pull request's base (the first parent of its merge commit). A change without a receipt counts as *awaiting a receipt*, not as a failure, only if the base file is exactly the article's converted Markdown (or the restored HTML of an article not converted yet, or its last accepted edit), passes every original check, and the change keeps everything a receipt would still require (as listed above). An alt-text-only change to a figure's image, or a change to a figure's caption text, also counts as awaiting: both checks name the figure, and its receipt must list it in `changed_image_alt_text` or `changed_figure_captions`. Everything else is checked as without the flag: `public/wiki-source/`, the restoration and receipt records, the AI-edited snapshots, the recovery safeguards, and the template, section and link repair checks. Anything else fails `check`.
- **`check`** also fails when the pull request changes a preserved restoration material compared with its base: `migration/restoration-fidelity.json`, `migration/additional-articles.json`, `migration/restored-articles/`, `migration/markdown-format.json`, every other record under `migration/` that article pages are built from (template renderings and definitions, section and link repairs, alias evidence, articles, navigation, routes, the recovered category, source formatting), `recovery-evidence/`, the two MDX pages `src/content/docs/index.mdx` and `src/content/docs/browse/all.mdx` (they run code when the site is built), `public/wiki-source/`, `public/media/` or `review/ai-edited/`. These never change in a pull request, so refreshing an original's hashes cannot hide an edit, and no record can change what a page shows without a receipt. Accepted wording goes through a receipt in `migration/accepted-edits/`. A deliberate new intake, or a correction to one of these records, needs its own pull request that also changes this guard (`scripts/lib/immutable-materials.mjs`), so reviewers see the record change.
- **`check`** lets `migration/source-review-notes.json`, whose notes article pages show, only gain notes: existing notes stay byte for byte, note IDs are unique, a new note has an ID of its own, and for every article a new note is shown on (`source_slugs`) the pull request adds or changes a receipt for that article that cites the note (`note_ids`), so a documentation reviewer approves it with each article. Every other file under `migration/` is a preserved material, except the receipt settings and receipts.
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

### Limits

The fidelity check guards article wording and what article pages show from the records above. It does not review code: anything under `src/` (components, the Markdown rules, styles, page scripts) and `scripts/` can change any page, and the pages that are not restored articles (the home page, browse pages, review and recovery pages) are outside the check. By the maintainers' decision, GitHub requires a documentation reviewer's approval only for changes to `src/content/docs/wiki/**` and `migration/**`; other changes rely on the maintainers' review and on the build checks above.

### Approval rule

`migration/accepted-edits.json` lists the `reviewers` and sets `required_approvals`. The offline gate only counts the logins a receipt records. The `receipts` check compares them with GitHub, for each receipt the pull request adds or changes; such a receipt must name that pull request. Every recorded login must:

- be one of the reviewers listed in the base's `migration/accepted-edits.json`, so a pull request cannot add its own reviewer;
- have approved the pull request at its current head commit (an approval from before the last push, one followed by a change request, or a dismissed one does not count);
- be neither the pull request author nor the receipt author;
- have write access to the repository. This comes from the review's `authorCanPushToRepository` field in GitHub's GraphQL API. The REST collaborator-permission endpoint needs push access itself, which a fork pull request's token does not have.

At least `required_approvals` distinct approvers must pass, using the base's value if the pull request lowers it. Receipts from earlier pull requests that stay unchanged are not checked again, and outside a pull request the comparison is skipped. Like every pull request check, the job runs the pull request's own copy of the workflow and scripts, so `main` should also require the reviewers' approval through GitHub itself: a ruleset rule that requires one approval from a team of the reviewers for changes to `src/content/docs/wiki/**` and `migration/**`. Changing the reviewers or `required_approvals` needs the maintainers' agreement.

## Run the checks locally

For anything beyond a single wording edit, run `npm ci`, `npm test`, and `npm run build`; check affected pages, images and links at desktop and narrow widths. Also check the project base path:

```sh
DOCS_SITE=https://bisq-network.github.io DOCS_BASE=/documentation/ npm run build
```

`npm run build` fails on a wording change until its receipt is added; on a pull request, `check` and `receipts` report it as awaiting a receipt instead. The deployment workflow is manual. Building or submitting a pull request does not publish the site.

## Compare a wiki backup

To see what a full wiki backup changes, run one command on it, in whatever form it arrived: a folder, an archive (`.tar`, `.tar.gz`, `.tar.bz2`, `.zip`, or `.7z` with 7-Zip installed) or a MediaWiki XML export (plain, `.gz` or `.bz2`).

```sh
npm run compare-backup -- ~/Downloads/bisq-wiki-backup.tar.gz --open
```

It finds the XML export and the `images/` folder, unpacks archives into a temporary folder outside the repository and removes it afterwards, then writes `report.html` to `tmp/wiki-backup-intake/` (ignored by git), with `REPORT.md`, `report.json` and `newer-revisions.jsonl`. The report shows each article the backup changed, word by word; the gaps in our articles the backup can fill; the articles and images we do not have; and redirects and templates. It holds public wiki data only: anonymous editors are counted, never listed. A database dump is never opened; if the backup has nothing else, the command explains how to export the pages, for example with `sh scripts/sql-dump-to-xml.sh` and Docker. If the backup holds several different XML exports, the command lists them and asks you to choose one with `--xml <name>`; `--images <name>` picks between images folders. Unpacking stops at 20 GB; raise that with `--max-unpacked 40G` only for a backup that really is larger. Never commit the report or any part of the backup. [INTAKE.md](INTAKE.md) describes how to act on the results.

## Wording-only review batches

Keep initial proposals small and article-by-article, retaining titles, structure, facts and procedural order. Open them as **ready for review** with the `wording-proposal` label: the documentation reviewers review the wording, and CodeRabbit skips labelled pull requests. Keep the PR against the restored baseline so reviewers see the actual wording diff. The earlier AI edition can inform the comparison, but is not a replacement to apply wholesale.

The restoration fidelity gate intentionally rejects changes to article wording unless a reviewed receipt covers them (see [Accepted editorial changes](#accepted-editorial-changes)). On a pull request this shows as two checks: `check` stays green while the edit keeps everything a receipt would still require, and `receipts` fails, listing each article awaiting a receipt, until a reviewer adds the receipt and approves. That `receipts` failure is expected while the wording is under review. Do not refresh the original hashes to hide the difference.

When imported HTML has an entire article on one source line, separate a formatting-only change from its wording proposal first. Teams uses one paragraph or list item per line by decoding existing `&#10;` newline entities. `migration/source-formatting.json` records this reversible change; the fidelity check reconstructs and verifies the exact original bytes before checking author content. This does not permit arbitrary whitespace changes or edits to the preserved original hash receipts.

The restored articles are Markdown. Each was converted from the restored HTML, which stays in `migration/restored-articles/` and never changes. `migration/markdown-format.json` records each conversion by hash, and the fidelity check confirms on every run that the Markdown renders to the same page as that HTML (see [Markdown conversion](#markdown-conversion)). After that, any change to the Markdown, even one the page does not show, is a wording change that needs a receipt.
