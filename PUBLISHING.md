# Publish the contributor preview

The public repository [hiciefte/bisq-docs](https://github.com/hiciefte/bisq-docs) publishes the community review preview at **[hiciefte.github.io/bisq-docs](https://hiciefte.github.io/bisq-docs/)**. GitHub Actions builds the site from the selected revision; check the workflow result before sharing an update.

## Publish source updates

From this checkout, inspect the commit and remote, then publish the source:

```sh
git status
git remote -v
git show --stat --oneline HEAD
git push -u origin main
```

This push makes the repository contents public. The workflow does not deploy automatically on push.

## Deploy the website

1. In the repository's **Settings → Pages**, select **GitHub Actions** as the publishing source.
2. Open **Actions → Build and deploy documentation → Run workflow**, choose `main`, and run it when ready to publish.
3. Review the build and deployment results. The website address is `https://hiciefte.github.io/bisq-docs/`.
4. Verify the homepage, search, a guide and its image at that live address. Local path checks do not establish successful public deployment.

The workflow derives the Pages origin and `/bisq-docs/` base from the repository. No custom domain or new hosting account is needed for this path. Set `DOCS_SITE` and `DOCS_BASE` only if you deliberately change the destination.

Keep the community-preview notice and the [review status](src/content/docs/review.md) accurate. Check [content sources and attribution](CONTENT-SOURCES.md) before treating the recovered archive as a cleared official publication.

References: [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages), [manual workflow execution](https://docs.github.com/en/actions/how-tos/manage-workflow-runs/manually-run-a-workflow).
