# Publish the community preview

The intended public preview is [bisq-network.github.io/documentation](https://bisq-network.github.io/documentation/) from [bisq-network/documentation](https://github.com/bisq-network/documentation). GitHub Actions builds `main`; check the workflow result and live pages to establish what is deployed.

Before publication, review the exact changes, source preservation checks, licensing and attribution status, and the community-preview notice. The restored snapshot is not a certification of current instructions. Review the checked-in source and the [contributor guidance](CONTRIBUTING.md); publishing a restoration does not establish official Bisq endorsement.

## Publish source updates

Changes reach `main` only through pull requests: `main` accepts no direct push, and a pull request merges only with green `check` and `receipts` checks, as a merge commit, and, when it changes an article or `migration/`, with a documentation reviewer's approval. [CONTRIBUTING.md](CONTRIBUTING.md#how-a-change-reaches-the-site) describes each step. Merging makes the change public in the repository but does not deploy it.

## Deploy the website

1. In **Settings → Pages**, select **GitHub Actions** as the publishing source.
2. Open **Actions → Build and deploy documentation → Run workflow** and run it on `main` when authorized. The `github-pages` environment accepts deployments from `main` only.
3. Check the build and deployment results. Verify the live homepage, search, restored article and image, an old wiki-title link, and a multi-source guide compatibility page.

The workflow derives the Pages origin and `/documentation/` base from the repository. Set `DOCS_SITE` and `DOCS_BASE` only when intentionally changing the destination. No custom domain or new hosting account is needed for this path.

References: [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages), [manual workflow execution](https://docs.github.com/en/actions/how-tos/manage-workflow-runs/manually-run-a-workflow).
