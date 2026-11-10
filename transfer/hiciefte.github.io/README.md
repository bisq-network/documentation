# Redirect stub for the old preview address

GitHub does not redirect GitHub Pages after a repository transfer. Once
`hiciefte/bisq-docs` becomes `bisq-network/documentation`, links to
`https://hiciefte.github.io/bisq-docs/...` return 404.

These files keep those links working. Publish them from a **new** repository
named `hiciefte/hiciefte.github.io` (the user site), never from a new
`hiciefte/bisq-docs`: creating a repository at the old name permanently
removes GitHub's redirects for git remotes, issues and pull requests.

- `404.html` sends any `/bisq-docs/...` path to the same path under
  `https://bisq-network.github.io/documentation/`, keeping the query and
  the `#section`. Without JavaScript, and for any other path on the user
  site, it shows a short "has moved" notice with a link to the new site.
- The target origin is fixed in the script, so the page cannot be used as
  an open redirect.

Steps (only after the transfer and the first deployment at the new address):

1. Create the public repository `hiciefte/hiciefte.github.io`.
2. Copy `404.html` into its root and commit.
3. In **Settings → Pages**, deploy from the default branch, root folder.
4. Open `https://hiciefte.github.io/bisq-docs/wiki/last-resort-restore/#import-raw-data-from-backup`
   and confirm it lands on the same section at the new address.

If the documentation later moves to a custom domain, change `target` in
`404.html` to that origin.
