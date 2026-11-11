---
title: "Running from the command line"
slug: "wiki/running-from-the-command-line"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#why-run-from-command-line">Why Run from Command Line?</a></li><li><a href="#how-to-run">How to Run</a></li><li><a href="#alternative-persistent-options">Alternative: Persistent Options</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

You can **run Bisq from the command line** (also known as the terminal or console) to launch the application with specific temporary settings or for debugging purposes. This is done by navigating to the Bisq application directory and executing the program with specific arguments appended.

There are many options you can specify – [see the source code for a full list](https://github.com/bisq-network/bisq/blob/master/common/src/main/java/bisq/common/config/Config.java#L57).

<span class="wiki-legacy-anchor" id="Why_Run_from_Command_Line?" aria-hidden="true">
</span>

## Why Run from Command Line? {#why-run-from-command-line}

- **Temporary Settings:** Apply a specific command-line option for a single session without permanently changing configuration files (e.g., connecting to a specific Bitcoin node just once).
- **Troubleshooting:** Launching from the command line allows you to see log output directly in the terminal window, which can be helpful for diagnosing startup issues or other problems.
- **Multiple Instances:** Using options like \`-\-appName\` allows running multiple, separate instances of Bisq simultaneously (e.g., for testing or separating identities before Bisq 2\'s built-in feature).

<span class="wiki-legacy-anchor" id="How_to_Run" aria-hidden="true">
</span>

## How to Run {#how-to-run}

<p>The template below shows the typical commands for launching Bisq from the command line on different operating systems. Replace `<code class="wiki-source-code" id="source-code-1">[OPTIONS]</code>` with any specific command-line options you wish to use for that session.</p>&#10;<span class="wiki-template-gap" role="note"><strong>[Unresolved template: Run_with_command_line_options]</strong> <code>{{Run_with_command_line_options|&lt;nowiki&gt;[OPTIONS]&lt;/nowiki&gt;}}</code></span>

<span class="wiki-legacy-anchor" id="Alternative:_Persistent_Options" aria-hidden="true">
</span>

## Alternative: Persistent Options {#alternative-persistent-options}

Using command-line arguments applies settings only for the session launched that way. If you want to set options **persistently** (so they apply every time you start Bisq normally), it\'s usually better to edit the \`bisq.properties\` file located in your [Data directory](../data-directory/).

See the [Data directory](../data-directory/) page for more information on locating this file and its structure.

</div>
