---
title: "Fix Arch release"
slug: "wiki/fix-arch-release"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#method-1-edit-the-cloned-repository">Method 1: edit the cloned repository</a></li><li><a href="#method-2-run-the-binaries-downloaded-from-the-official-website">Method 2: run the binaries downloaded from the official website</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

The Arch User Repository (AUR) can from time to time become outdated, containing a version of Bisq that will not be able to trade on the p2p network.

At the time of writing, AUR contains 1.8.0, but current version is 1.8.2; the following instructions should get you a working setup.

<span class="wiki-legacy-anchor" id="Method_1:_edit_the_cloned_repository" aria-hidden="true">
</span>

## Method 1: edit the cloned repository {#method-1-edit-the-cloned-repository}

This method has been user-tested and reported for migration from 1.8.0 to 1.8.2.

<p>Clone the AUR package for bisq curent version 1.8.0 and change to download directory<br>&#10;<code class="wiki-source-code" id="source-code-1">git clone https://aur.archlinux.org/bisq.git</code><br>&#10;<code class="wiki-source-code" id="source-code-2">cd bisq</code><br>&#10;Edit the PKGBUILD file changing the version, and updating the sha256 checksum for the bisq-1.8.2.tar.gz file</p>

<code class="wiki-source-code" id="source-code-3">nano PKGBUILD</code>\
or\
<code class="wiki-source-code" id="source-code-4">vi PKGBUILD</code>\
and then change\
<code class="wiki-source-code" id="source-code-5">pkgver=1.8.0</code>\
to\
<code class="wiki-source-code" id="source-code-6">pkgver=1.8.2</code>

and

<code class="wiki-source-code" id="source-code-7">sha256sums=(\'ca636152863a9cc587d8d2b00476abd6fab854ae0b3513950d001f23cb0a1a53\'</code>\
to\
<code class="wiki-source-code" id="source-code-8">sha256sums=(\'d69bab29875eed312811cb34a84ac7920acac74f9a86eb637e56e92e5fcbcbbb\'</code>\
then build and install bisq:\
<code class="wiki-source-code" id="source-code-9">makepkg -si</code>

<span class="wiki-legacy-anchor" id="Method_2:_run_the_binaries_downloaded_from_the_official_website" aria-hidden="true">
</span>

## Method 2: run the binaries downloaded from the official website {#method-2-run-the-binaries-downloaded-from-the-official-website}

The following method will work with any future version of Bisq.

Download the deb package from [https://bisq.network/downloads/](https://bisq.network/downloads/), open it using archive manager, and extract to disk the file data.tar.xz inside of it, then run <code class="wiki-source-code" id="source-code-10">opt/bisq/bin/Bisq</code> under the directory you extracted it to.

</div>
