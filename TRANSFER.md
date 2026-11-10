# Move the repository to bisq-network/documentation

This checklist moves `hiciefte/bisq-docs` to `bisq-network/documentation`.
The name `bisq-docs` is not available there: `bisq-network/bisq-docs` holds
the earlier AsciiDoc documentation (archived), and `bisq-network/docs`
redirects to it.

After the move the site is built for `https://bisq-network.github.io/documentation/`.
Nothing in the build has to be edited for that: `pages.yml` and `check.yml`
derive the origin and base path from the repository owner and name, and the
header link reads `GITHUB_REPOSITORY`.

What GitHub moves and what it does not, from
[Transferring a repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/transferring-a-repository):

| Moves with the repository | Needs checking or redoing |
| --- | --- |
| Git history, branches, tags | GitHub Pages: the old Pages URL is **not** redirected |
| Issues, pull requests, wiki, stars, watchers | Pages source setting and the `github-pages` environment (not covered by the docs page) |
| Webhooks, secrets, deploy keys | GitHub Apps such as CodeRabbit must be installed for the organization |
| Links to the old repository (web, clone, fetch, push) redirect | Issue assignees who are not organization members are cleared |

## Who can do the move

GitHub requires all of these:

- The person moving needs admin access to `hiciefte/bisq-docs`. For a personal
  repository that is its owner, `hiciefte`.
- They need permission to create repositories in `bisq-network`.
- To give the repository a new name during the transfer, they must be an
  **owner** of `bisq-network`.

As of 10 November 2026, `hiciefte` is a member of `bisq-network`, not an owner,
and the organization does not let members create repositories. So a
bisq-network owner has to act before the move. The simplest option is that an
owner makes `hiciefte` an organization owner for the move and removes the role
afterwards. That one change allows both the transfer and the rename in a single
step. Allowing members to create repositories is not enough for the rename.

## Before the move

- [ ] A bisq-network owner confirms `bisq-network/documentation` is free, including private repositories.
- [ ] A bisq-network owner gives the mover the access described above, and the mover checks it: the
      Transfer dialog lists `bisq-network` under *Select one of my organizations* and shows a *Repository name* field.
- [ ] Organization policy allows GitHub Actions and GitHub Pages for public repositories.
- [ ] Decide whether CodeRabbit (or another reviewer app) is installed for the new repository.
- [ ] Merge `chore/prepare-bisq-network-documentation`. It derives the location from the build environment and lets saved links from `hiciefte.github.io/bisq-docs` resolve after the move.
- [ ] Check the current settings. On 10 November 2026 the repository had no Actions variables, no rulesets and no
      branch protection; the only setting to carry over is the `github-pages` environment, which allows deployments
      from `main` only.
- [ ] Announce a short freeze; nobody pushes during the move.

## The move

Do not rename the repository on its own first. A rename takes
`hiciefte.github.io/bisq-docs` offline at once, and if the transfer is then
refused, the preview stays down.

With owner access: Settings → General → Danger Zone → Transfer → *Select one of
my organizations* → `bisq-network`, and type `documentation` in the *Repository
name* field.

Never create a repository or fork named `hiciefte/bisq-docs` afterwards. GitHub
deletes the redirects for good when the old name is reused.

## After the move

- [ ] Settings → Pages → Source: **GitHub Actions**.
- [ ] Settings → Environments → `github-pages`: deployments allowed from `main` only.
- [ ] Settings → Secrets and variables → Actions: `DOCS_SITE` and `DOCS_BASE` are **not** set, unless a custom domain is chosen.
- [ ] Actions → *Build and deploy documentation* → Run workflow on `main`.
- [ ] Check `https://bisq-network.github.io/documentation/`: home page, search, *Last resort restore* with its images, an old wiki-title path (`/documentation/Last_resort_restore`), and the saved-link box with a `https://hiciefte.github.io/bisq-docs/...` link.
- [ ] Publish the redirect stub from `transfer/hiciefte.github.io/` (see its README) and test an old preview link with a `#section`.
- [ ] Merge the link-update branch `chore/point-links-to-bisq-network` (README, PUBLISHING, CONTRIBUTING, the review page, package name, proposal index), then run *Build and deploy documentation* again so the live review page links to the new repository.
- [ ] Open pull requests still list and run `check.yml`. Spot-check one.
- [ ] If `hiciefte` was made an organization owner for the move, remove that role.
- [ ] Update local clones: `git remote set-url origin https://github.com/bisq-network/documentation.git`.

## Later decisions

- **Custom domain.** If maintainers point a bisq.network subdomain at the site, set `DOCS_SITE` to that origin and `DOCS_BASE` to `/`, add `https://bisq-network.github.io` with base `/documentation` to `src/lib/previous-sites.mjs`, and change the target in the redirect stub.
- **Content licence.** The wiki configuration declares no content licence. Settle attribution and licensing before presenting the site as the official documentation.
- **The old AsciiDoc repository.** `bisq-network/bisq-docs` is already archived. Whether its README should point to the new site is the maintainers' decision.
