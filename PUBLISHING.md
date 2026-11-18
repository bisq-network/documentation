# Publish the community preview

The public preview is published at [bisq.wiki](https://bisq.wiki/) from [bisq-network/documentation](https://github.com/bisq-network/documentation). GitHub Actions builds `main`; check the workflow result and live pages to establish what is deployed.

Before publication, review the exact changes, source preservation checks, licensing and attribution status, and the community-preview notice. The restored snapshot is not a certification of current instructions. Review the checked-in source and the [contributor guidance](CONTRIBUTING.md); publishing a restoration does not establish official Bisq endorsement.

## Publish source updates

Changes reach `main` only through pull requests: `main` accepts no direct push, and a pull request merges only with green `check` and `receipts` checks, as a merge commit, and, when it changes an article or `migration/`, with a documentation reviewer's approval. [CONTRIBUTING.md](CONTRIBUTING.md#how-a-change-reaches-the-site) describes each step. Merging makes the change public in the repository but does not deploy it.

## Deploy the website

1. In **Settings → Pages**, select **GitHub Actions** as the publishing source.
2. Open **Actions → Build and deploy documentation → Run workflow** and run it on `main` when authorized. The `github-pages` environment accepts deployments from `main` only.
3. Check the build and deployment results. Verify the live homepage, search, restored article and image, an old wiki-title link, and a multi-source guide compatibility page.

## Site address

The site is served at `https://bisq.wiki/`, the original wiki's domain, so saved wiki links such as `bisq.wiki/Last_resort_restore#Import_raw_data_from_backup` reach their article and section. Three settings make this work, and they change together:

- The repository variables `DOCS_SITE=https://bisq.wiki` and `DOCS_BASE=/` (**Settings → Secrets and variables → Actions → Variables**). Both workflows read them; without them they build for `https://bisq-network.github.io` at `/documentation/`.
- The custom domain `bisq.wiki` under **Settings → Pages**, with **Enforce HTTPS**. The domain is verified for the bisq-network organization, so no other account can claim it. GitHub redirects `bisq-network.github.io/documentation/` links to the same path on bisq.wiki.
- The domain's DNS, held outside this repository, points `bisq.wiki` at GitHub Pages.

Set the custom domain only while the DNS points at GitHub Pages; otherwise GitHub sends visitors to an address that does not answer. After changing any of these, run the deployment workflow and check old wiki links on the live site.

References: [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages), [manual workflow execution](https://docs.github.com/en/actions/how-tos/manage-workflow-runs/manually-run-a-workflow).
