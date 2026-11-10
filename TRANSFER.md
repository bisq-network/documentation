# Move the repository to bisq-network/documentation

This checklist moves `hiciefte/bisq-docs` to `bisq-network/documentation`.
The name `bisq-docs` is not available there: `bisq-network/bisq-docs` holds
the earlier AsciiDoc documentation, and `bisq-network/docs` redirects to it.

After the move the site is built for `https://bisq-network.github.io/documentation/`.
Nothing in the build has to be edited for that: `pages.yml` and `check.yml`
derive the origin and base path from the repository owner and name, and the
header link reads `GITHUB_REPOSITORY`.

What GitHub moves and what it does not, from
[Transferring a repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/transferring-a-repository):

| Moves with the repository | Needs checking or redoing |
| --- | --- |
| Git history, branches, tags | GitHub Pages: the old Pages URL is **not** redirected |
| Issues, pull requests, wiki, stars, watchers | Pages source setting, `github-pages` environment rules |
| Webhooks, secrets, deploy keys | Actions variables, rulesets and branch protection (not covered by the docs page) |
| Links to the old repository (web, clone, fetch, push) redirect | GitHub Apps such as CodeRabbit must be installed for the organization |
| | Issue assignees who are not organization members are cleared |

## Before the move

- [ ] A bisq-network owner confirms `bisq-network/documentation` is free, including private repositories.
- [ ] The person doing the move either is a bisq-network owner, or has permission to create repositories there.
- [ ] Organization policy allows GitHub Actions and GitHub Pages for public repositories.
- [ ] Decide whether CodeRabbit (or another reviewer app) is installed for the new repository.
- [ ] Merge `chore/prepare-bisq-network-documentation`. It derives the location from the build environment and lets saved links from `hiciefte.github.io/bisq-docs` resolve after the move.
- [ ] Note the current settings, to recreate them afterwards: Actions variables (`DOCS_SITE`, `DOCS_BASE` if set), the `github-pages` environment, rulesets or branch protection, and the Pages source.
- [ ] Announce a short freeze; nobody pushes during the move.

## The move

Pick one path.

**If the person moving is a bisq-network owner:** Settings → General → Danger Zone →
Transfer → *Select one of my organizations* → `bisq-network`, and type
`documentation` in the optional *Repository name* field.

**Otherwise:** first rename the repository to `documentation` (Settings → General →
Repository name), then transfer it right away with *Specify an organization or
username* → `bisq-network`. The preview at `hiciefte.github.io/bisq-docs` stops
working at the rename, so do both steps together.

Never create a repository or fork named `hiciefte/bisq-docs` afterwards. GitHub
deletes the redirects for good when the old name is reused.

## After the move

- [ ] Settings → Pages → Source: **GitHub Actions**.
- [ ] Recreate the noted variables, environment rules and branch protection. Leave `DOCS_SITE` and `DOCS_BASE` unset unless a custom domain is chosen.
- [ ] Actions → *Build and deploy documentation* → Run workflow on `main`.
- [ ] Check `https://bisq-network.github.io/documentation/`: home page, search, *Last resort restore* with its images, an old wiki-title path (`/documentation/Last_resort_restore`), and the saved-link box with a `https://hiciefte.github.io/bisq-docs/...` link.
- [ ] Publish the redirect stub from `transfer/hiciefte.github.io/` (see its README) and test an old preview link with a `#section`.
- [ ] Merge the link-update branch `chore/point-links-to-bisq-network` (README, PUBLISHING, CONTRIBUTING, the review page, package name, proposal index).
- [ ] Open pull requests still list and run `check.yml`. Spot-check one.
- [ ] Update local clones: `git remote set-url origin https://github.com/bisq-network/documentation.git`.

## Later decisions

- **Custom domain.** If maintainers point a bisq.network subdomain at the site, set `DOCS_SITE` to that origin and `DOCS_BASE` to `/`, add `https://bisq-network.github.io` with base `/documentation` to `src/lib/previous-sites.mjs`, and change the target in the redirect stub.
- **Content licence.** The wiki configuration declares no content licence. Settle attribution and licensing before presenting the site as the official documentation.
- **The old AsciiDoc repository.** Whether `bisq-network/bisq-docs` is archived or linked to the new site is the maintainers' decision.
