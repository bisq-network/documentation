---
title: "Reducing memory usage"
slug: "wiki/reducing-memory-usage"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#persistent-setting-and-windows-work-around">Persistent setting and Windows work-around</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

<p>Bisq is known to be a resource-hungry application, so some users may want to <strong>reduce memory usage</strong>.</p>
<span class="wiki-template-gap" role="note"><strong>[Unresolved template: Run_with_Java_options]</strong> <code>{{Run_with_Java_options|&lt;nowiki&gt;-XX:MaxRAM=4g&lt;/nowiki&gt;|Reduce Bisq's memory usage by setting a ceiling of 4GB}}</code></span>

<span class="wiki-legacy-anchor" id="Persistent_setting_and_Windows_work-around" aria-hidden="true">
</span>

## Persistent setting and Windows work-around {#persistent-setting-and-windows-work-around}

If you\'d rather not specify the RAM parameter every time you start Bisq, you can specify it in <code class="wiki-source-code" id="source-code-2">Bisq.cfg</code> so it automatically takes effect every time.

First, make sure Bisq is closed.

Your <code class="wiki-source-code" id="source-code-3">Bisq.cfg</code> file is in the directory with your Bisq binary (this is different from your [data directory location](../data-directory/)). See [locations for each OS here](../running-from-the-command-line/).

Navigate to the directory with your Bisq binary. Using Windows as an example, this would be <code class="wiki-source-code" id="source-code-4">$home\\AppData\\Roaming\\Bisq\\</code>.

<code class="wiki-source-code" id="source-code-5">Bisq.cfg</code> should be in the <code class="wiki-source-code" id="source-code-6">app</code> directory.

Open that file in a text editor. Look for the <code class="wiki-source-code" id="source-code-7">\[JavaOptions\]</code> section, and a line in that section that look something like <code class="wiki-source-code" id="source-code-8">java-options=-XX:MaxRAM=8g</code>. Change it to <code class="wiki-source-code" id="source-code-9">java-options=-XX:MaxRAM=4g</code>, or add it if it\'s not already there.

`[JavaOptions]`\
`java-options=-XX:MaxRAM=4g`

You can also try disabling the hardware graphics acceleration by adding the following line at the end of the <code class="wiki-source-code" id="source-code-10">Bisq.cfg</code>

`[JVMOptions]`\
`-Dprism.order=sw`

Save the file, close it, and then open Bisq.

</div>
