# Publish the community preview

The intended public preview is [bisq-network.github.io/documentation](https://bisq-network.github.io/documentation/) from [bisq-network/documentation](https://github.com/bisq-network/documentation). GitHub Actions builds a selected revision; check the workflow result and live pages to establish what is deployed.

Before publication, review the exact changes, source preservation checks, licensing and attribution status, and the community-preview notice. The restored snapshot is not a certification of current instructions. Review the checked-in source and the [contributor guidance](CONTRIBUTING.md); publishing a restoration does not establish official Bisq endorsement.

## Publish source updates

Inspect the commit and remote, then push the authorized revision:

```sh
git status
git remote -v
git show --stat --oneline HEAD
git push -u origin main
```

The push makes repository contents public. The workflow does not deploy automatically on push.

## Deploy the website

1. In **Settings → Pages**, select **GitHub Actions** as the publishing source.
2. Open **Actions → Build and deploy documentation → Run workflow**, choose the intended revision, and run it when authorized.
3. Check the build and deployment results. Verify the live homepage, search, restored article and image, an old wiki-title link, and a multi-source guide compatibility page.

The workflow derives the Pages origin and `/documentation/` base from the repository. Set `DOCS_SITE` and `DOCS_BASE` only when intentionally changing the destination. No custom domain or new hosting account is needed for this path.

References: [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages), [manual workflow execution](https://docs.github.com/en/actions/how-tos/manage-workflow-runs/manually-run-a-workflow).
