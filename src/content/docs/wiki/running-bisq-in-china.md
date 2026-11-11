---
title: "Running Bisq in China"
slug: "wiki/running-bisq-in-china"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#requirements">Requirements</a></li><li><a href="#steps-for-bisq1">Steps for Bisq1</a></li><li><a href="#steps-for-bisq2">Steps for Bisq2</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

The [Great Firewall of China](https://en.wikipedia.org/wiki/Great_Firewall) (GFW) makes it difficult to run Bisq from within mainland China.

This article outlines a workaround.

<span class="wiki-legacy-anchor" id="Requirements" aria-hidden="true">
</span>

## Requirements {#requirements}

You will need a working solution to access the internet already available to you, for example a VPN or a local proxy, and know its IP and port number; Bisq will be made to use that proxy to reach the Tor entry nodes.

Alternatively to the following, also look into the SSTap software bundle, which users report to have successfully implemented to connect to Bisq.

<span class="wiki-legacy-anchor" id="Steps_for_Bisq1" aria-hidden="true">
</span>

## Steps for Bisq1 {#steps-for-bisq1}

You will edit the <code class="wiki-source-code" id="source-code-1">torrc</code> default settings that Bisq uses to connect to Tor, and to this extent you will modify a file inside the main <code class="wiki-source-code" id="source-code-2">jar</code> file of the application, <code class="wiki-source-code" id="source-code-3">desktop-\'\'version-number\'\'-all.jar</code> Depending on your operating system, this is where it should be locatedː

- Windowsː <code class="wiki-source-code" id="source-code-4">Cː\\Users\\\<yourusername>\\AppData\\Local\\Bisq\\app\\</code>
- Linuxː <code class="wiki-source-code" id="source-code-5">/opt/bisq/lib/app/</code>
- MacOSː <code class="wiki-source-code" id="source-code-6">$Home/Applications/Bisq.app/Contents/app/</code>

A <code class="wiki-source-code" id="source-code-7">jar</code> file is actually a zipped archive, that you can open with 7zip (a mac user reported WinZip working as well); inside the root of this archive, there is a file named <code class="wiki-source-code" id="source-code-8">torrc</code> that you have to open in a text editor; its contents will be likeː

`ControlPort auto`\
`CookieAuthentication 1`\
`DisableNetwork 1`\
`AvoidDiskWrites 1`\
`RunAsDaemon 1`\
`SOCKSPort auto`

Addː

`Socks5Proxy YourProxyIP:port`

on a new line, then save the file and make sure your archiving application updates the archive, then start Bisq.

<span class="wiki-legacy-anchor" id="Steps_for_Bisq2" aria-hidden="true">
</span>

## Steps for Bisq2 {#steps-for-bisq2}

As above, pending the existence of a working solution to access the internet, this is how you can set a custom SOCKS5 proxy.

Edit the <code class="wiki-source-code" id="source-code-9">bisq.conf</code> file in the root of the Bisq2 data directory (same path as Bisq1 data directory, but ending with \"2\") adding what follows:

`application {`\
`  network {`\
`    configByTransportType.tor {`\
`      torrcOverrides {`\
`        Socks5Proxy="ProxyIP:port"`\
`      }`\
`   }`\
`}`

</div>
