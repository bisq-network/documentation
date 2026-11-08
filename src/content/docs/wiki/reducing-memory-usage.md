---
title: "Reducing memory usage"
slug: "wiki/reducing-memory-usage"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#persistent-setting-and-windows-work-around">Persistent setting and Windows work-around</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en"><p>Bisq is known to be a resource-hungry application, so some users may want to <strong>reduce memory usage</strong>.</p>
<span class="wiki-template-gap" role="note"><strong>[Unresolved template: Run_with_Java_options]</strong> <code>{{Run_with_Java_options|&lt;nowiki&gt;-XX:MaxRAM=4g&lt;/nowiki&gt;|Reduce Bisq's memory usage by setting a ceiling of 4GB}}</code></span>
<span class="wiki-legacy-anchor" id="Persistent_setting_and_Windows_work-around" aria-hidden="true"></span><h2 id="persistent-setting-and-windows-work-around"> Persistent setting and Windows work-around </h2>
<p>If you'd rather not specify the RAM parameter every time you start Bisq, you can specify it in <code class="wiki-source-code" id="source-code-2">Bisq.cfg</code> so it automatically takes effect every time.</p>
<p>First, make sure Bisq is closed.</p>
<p>Your <code class="wiki-source-code" id="source-code-3">Bisq.cfg</code> file is in the directory with your Bisq binary (this is different from your <a href="../data-directory/">data directory location</a>). See <a href="../running-from-the-command-line/">locations for each OS here</a>.</p>
<p>Navigate to the directory with your Bisq binary. Using Windows as an example, this would be <code class="wiki-source-code" id="source-code-4">$home\AppData\Roaming\Bisq\</code>.</p>
<p><code class="wiki-source-code" id="source-code-5">Bisq.cfg</code> should be in the <code class="wiki-source-code" id="source-code-6">app</code> directory.</p>
<p>Open that file in a text editor. Look for the <code class="wiki-source-code" id="source-code-7">[JavaOptions]</code> section, and a line in that section that look something like <code class="wiki-source-code" id="source-code-8">java-options=-XX:MaxRAM=8g</code>. Change it to <code class="wiki-source-code" id="source-code-9">java-options=-XX:MaxRAM=4g</code>, or add it if it's not already there.</p>
<p><code>[JavaOptions]</code><br>
<code>java-options=-XX:MaxRAM=4g</code></p>
<p>You can also try disabling the hardware graphics acceleration by adding the following line at the end of the <code class="wiki-source-code" id="source-code-10">Bisq.cfg</code></p>
<p><code>[JVMOptions]</code><br>
<code>-Dprism.order=sw</code></p>
<p>Save the file, close it, and then open Bisq.</p>
</div>
