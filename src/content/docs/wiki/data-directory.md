---
title: "Data directory"
slug: "wiki/data-directory"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#data-directory-structure">Data directory structure</a></li><li><a href="#default-locations">Default locations</a></li><li><a href="#opening-directory-from-bisq">Opening Directory from Bisq</a></li><li><a href="#see-also">See also</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

The **data directory** is where all of Bisq\'s application data files (including wallet, account details, trade history, and settings) are stored locally on your computer.

It is crucial that you [back up this directory](../backing-up-application-data/) regularly to prevent data loss.

<aside class="wiki-admonition" role="note">

**Note**

**Version Context:** The directory structure described below is primarily based on Bisq v1. The location and general purpose remain similar in [Bisq 2](../bisq-2/), although specific file organization within subdirectories like \`db/\` or \`keys/\` might differ due to features like multiple [identities](../identity/).

</aside>

<span class="wiki-legacy-anchor" id="Data_directory_structure" aria-hidden="true">
</span>

## Data directory structure {#data-directory-structure}

Notable items typically found within the main Bisq data directory:

- \`bisq.log\` - The main log file containing recent application activity, often helpful for debugging. Be cautious sharing it publicly as it may contain private information.
- \`bisq.properties\` - A configuration file where the full list of [command-line options](https://github.com/bisq-network/bisq/blob/master/common/src/main/java/bisq/common/config/Config.java#L57) can be permanently set (one per line in \`\<option>=\<value>\` format, e.g., \`dumpStatistics=true\`), avoiding the need to specify them each time Bisq is launched.
- \`btc_mainnet/\` - The primary subdirectory containing most network-specific operational data.
  - \`keys/\` - Stores cryptographic keys used for signing P2P network messages and for [signing and aging](../account-limits/) payment accounts (in Bisq v1).
  - \`db/\` - Contains various user data (e.g., closed trades, DAO state) and network data. **It is strongly discouraged to manually edit any files in this directory.**
  - \`tor/\` - Holds state data for the built-in <span class="wiki-link-gap">Tor <small>[unrecovered article: Tor]</small></span> connection. The \`hiddenservice/\` folder within this directory contains the keys determining your Bisq [onion address](../changing-your-onion-address/).
  - \`wallet/\` - Contains your BTC and [BSQ](../bsq/) wallet files (\`bisq_BTC.wallet\`, \`bisq_BSQ.wallet\`), rolling backups, and the SPV chain file (\`[bisq.spvchain](../resyncing-spv-file/)\`).

<span class="wiki-legacy-anchor" id="Default_locations" aria-hidden="true">
</span>

## Default locations {#default-locations}

<p>The default location of the main Bisq data directory varies by operating system. The exact path can usually be found easily from within the application itself (see below), but the standard defaults are listed by the template:</p>&#10;<span class="wiki-template-gap" role="note"><strong>[Unresolved template: Default_data_directory_locations]</strong> <code>{{Default_data_directory_locations}}</code></span>

<span class="wiki-legacy-anchor" id="Opening_Directory_from_Bisq" aria-hidden="true">
</span>

### Opening Directory from Bisq {#opening-directory-from-bisq}

The easiest way to find and open your specific data directory is directly through the Bisq application:

1. Go to the \`Account\` tab.
2. Select the \`Backup\` sub-tab.
3. Click the button labeled **\`OPEN DIRECTORY\`**.

<figure class="wiki-source-image" id="source-image-1"><a href="../../media/wiki/fae5ef7e526b9c28081cfb4c30b9df56f1c75b39f5edbaf3512aec689ecacfc5.png"><img alt="Clicking the 'OPEN DIRECTORY' button on the Account &gt; Backup screen." decoding="async" height="2590" loading="lazy" src="../../media/wiki/fae5ef7e526b9c28081cfb4c30b9df56f1c75b39f5edbaf3512aec689ecacfc5.png" width="4320"></a><figcaption>Clicking the 'OPEN DIRECTORY' button on the Account &gt; Backup screen.<br><small>Historical full-size recovered source. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>&#10;<div>&#10;</div>

This will open your system\'s file explorer directly to the Bisq data directory, bypassing the need to manually navigate hidden folders or different paths depending on your OS.

<span class="wiki-legacy-anchor" id="See_also" aria-hidden="true">
</span>

## See also {#see-also}

- [Backing up application data](../backing-up-application-data/)
- [Restoring application data](../restoring-application-data/)
- [Switching to a new data directory](../switching-to-a-new-data-directory/)
- [Running from the command line](../running-from-the-command-line/)

</div>
