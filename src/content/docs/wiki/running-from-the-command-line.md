---
title: "Running from the command line"
slug: "wiki/running-from-the-command-line"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#why-run-from-command-line">Why Run from Command Line?</a></li><li><a href="#how-to-run">How to Run</a></li><li><a href="#alternative-persistent-options">Alternative: Persistent Options</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en"><p>You can <strong>run Bisq from the command line</strong> (also known as the terminal or console) to launch the application with specific temporary settings or for debugging purposes. This is done by navigating to the Bisq application directory and executing the program with specific arguments appended.</p>
<p>There are many options you can specify – <a href="https://github.com/bisq-network/bisq/blob/master/common/src/main/java/bisq/common/config/Config.java#L57" rel="noopener noreferrer">see the source code for a full list</a>.</p>
<span class="wiki-legacy-anchor" id="Why_Run_from_Command_Line?" aria-hidden="true"></span><h2 id="why-run-from-command-line"> Why Run from Command Line? </h2>
<ul>
<li><strong>Temporary Settings:</strong> Apply a specific command-line option for a single session without permanently changing configuration files (e.g., connecting to a specific Bitcoin node just once).</li>
<li><strong>Troubleshooting:</strong> Launching from the command line allows you to see log output directly in the terminal window, which can be helpful for diagnosing startup issues or other problems.</li>
<li><strong>Multiple Instances:</strong> Using options like `--appName` allows running multiple, separate instances of Bisq simultaneously (e.g., for testing or separating identities before Bisq 2's built-in feature).</li>
</ul>
<span class="wiki-legacy-anchor" id="How_to_Run" aria-hidden="true"></span><h2 id="how-to-run"> How to Run </h2>
<p>The template below shows the typical commands for launching Bisq from the command line on different operating systems. Replace `<code class="wiki-source-code" id="source-code-1">[OPTIONS]</code>` with any specific command-line options you wish to use for that session.</p>
<span class="wiki-template-gap" role="note"><strong>[Unresolved template: Run_with_command_line_options]</strong> <code>{{Run_with_command_line_options|&lt;nowiki&gt;[OPTIONS]&lt;/nowiki&gt;}}</code></span>
<span class="wiki-legacy-anchor" id="Alternative:_Persistent_Options" aria-hidden="true"></span><h2 id="alternative-persistent-options"> Alternative: Persistent Options </h2>
<p>Using command-line arguments applies settings only for the session launched that way. If you want to set options <strong>persistently</strong> (so they apply every time you start Bisq normally), it's usually better to edit the `bisq.properties` file located in your <a href="../data-directory/">Data directory</a>.</p>
<p>See the <a href="../data-directory/">Data directory</a> page for more information on locating this file and its structure.</p>
</div>
