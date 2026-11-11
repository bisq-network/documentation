---
title: "Running Bisq on Qubes"
slug: "wiki/running-bisq-on-qubes"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details><summary>On this page</summary><ul><li><a href="#how-to-setup">How to setup</a></li><li><a href="#in-dom0">In dom0</a></li><li><a href="#create-qube">Create qube</a></li><li><a href="#in-dedicated-qube">In dedicated qube</a></li><li><a href="#create-binding-dirs">Create binding dirs</a></li><li><a href="#configure-binding-dirs">Configure binding dirs</a></li><li><a href="#install-bisq">Install Bisq</a></li><li><a href="#download-debian-package">Download Debian package</a></li><li><a href="#verify-pgp-signature">Verify PGP signature</a></li><li><a href="#install-package">Install package</a></li><li><a href="#how-to-run">How to run</a></li><li><a href="#from-dedicated-qube">From dedicated qube</a></li><li><a href="#from-dom0">From dom0</a></li><li><a href="#further-reading">Further reading</a></li><li><a href="#references">References</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en"><p>This guide shows <strong>how to run Bisq in a dedicated qube in QubesOS</strong>. The steps were tested using QubesOS 4.0.3 and a Bisq qube based on the <code class="wiki-source-code" id="source-code-1">debian-10</code> template.</p>
<span class="wiki-legacy-anchor" id="How_to_setup" aria-hidden="true"></span><h2 id="how-to-setup"> How to setup </h2>
<span class="wiki-legacy-anchor" id="In_dom0" aria-hidden="true"></span><h3 id="in-dom0"> In dom0 </h3>
<p>Execute the following steps in dom0.</p>
<span class="wiki-legacy-anchor" id="Create_qube" aria-hidden="true"></span><h4 id="create-qube"> Create qube </h4>
<p>Create a new dedicated qube called <code class="wiki-source-code" id="source-code-2">bisq-vm</code> based on the <code class="wiki-source-code" id="source-code-3">debian-10</code> template.</p>
<ul>
<li>Q Menu &gt; Create Qubes VM &gt; Qube based on a template</li>
<li>Template: choose <code class="wiki-source-code" id="source-code-4">debian-10</code></li>
<li>Check "Launch settings after creation"</li>
<li>Press OK</li>
</ul>
<p>Within a few seconds, the qube is created and the Qube Settings popup opens. Adjust it as follows:</p>
<ul>
<li>Basic &gt; Disk Storage
<ul>
<li>Set "Private Storage max size" to at least <code class="wiki-source-code" id="source-code-5">5000 MiB</code> [1]</li>
</ul></li>
<li>Advanced &gt; Memory / CPU
<ul>
<li>Set "Initial memory" to <code class="wiki-source-code" id="source-code-6">6000 MB</code> [2]</li>
<li>Set "vCPUs no." to <code class="wiki-source-code" id="source-code-7">4</code></li>
<li>Uncheck "Include in memory balancing" [3]</li>
</ul></li>
<li>Press OK</li>
</ul>
<span class="wiki-legacy-anchor" id="In_dedicated_qube" aria-hidden="true"></span><h3 id="in-dedicated-qube"> In dedicated qube </h3>
<p>Execute the following steps in the <code class="wiki-source-code" id="source-code-8">bisq-vm</code> qube.</p>
<span class="wiki-legacy-anchor" id="Create_binding_dirs" aria-hidden="true"></span><h4 id="create-binding-dirs"> Create binding dirs </h4>
<p>Create the binding dirs needed for the Bisq installation:</p>
<pre><code class="wiki-source-code" id="source-code-9">
sudo mkdir -p /rw/bind-dirs/opt/bisq
sudo mkdir -p /rw/bind-dirs/usr/share/desktop-directories
</code></pre>
<p>Restart the qube to apply the binding dir settings.</p>
<span class="wiki-legacy-anchor" id="Configure_binding_dirs" aria-hidden="true"></span><h4 id="configure-binding-dirs"> Configure binding dirs </h4>
<p>Setup the binding dirs mapping for the system folders needed for the Bisq installation:</p>
<pre><code class="wiki-source-code" id="source-code-10">
sudo mkdir -p /rw/config/qubes-bind-dirs.d
</code></pre>
<p>Specify which system folders are mapped to binding dirs. To do that, create the configuration file:</p>
<pre><code class="wiki-source-code" id="source-code-11">
sudo nano /rw/config/qubes-bind-dirs.d/50_user.conf
</code></pre>
<p>and populate it with the following lines [5] :</p>
<pre><code class="wiki-source-code" id="source-code-12">
binds+=( '/opt/bisq' )
binds+=( '/usr/share/desktop-directories' )
</code></pre>
<span class="wiki-legacy-anchor" id="Install_Bisq" aria-hidden="true"></span><h4 id="install-bisq"> Install Bisq </h4>
<span class="wiki-legacy-anchor" id="Download_Debian_package" aria-hidden="true"></span><h4 id="download-debian-package"> Download Debian package </h4>
<p>Go to the <a href="https://bisq.network/downloads" rel="noopener noreferrer">Bisq Downloads</a> page and download the Debian package and the corresponding PGP signature.</p>
<span class="wiki-legacy-anchor" id="Verify_PGP_signature" aria-hidden="true"></span><h5 id="verify-pgp-signature"> Verify PGP signature </h5>
<p>Check that the downloaded package matches the signature [4]. Assuming the files were downloaded in the Downloads folder:</p>
<pre><code class="wiki-source-code" id="source-code-13">
# Go to the folder where you downloaded the .deb package and the PGP signature
cd Downloads
&#10;# Import the signing key of Alejandro Garcia (alejandrogarcia83)
curl https://bisq.network/pubkey/E222AA02.asc | gpg --import
&#10;# Verify the signature of the downloaded binary
gpg --digest-algo SHA256 --verify Bisq-*.asc
</code></pre>
<span class="wiki-legacy-anchor" id="Install_package" aria-hidden="true"></span><h5 id="install-package"> Install package </h5>
<pre><code class="wiki-source-code" id="source-code-14">
sudo dpkg -i Bisq-*.deb
</code></pre>
<p>Once this command finishes, Bisq is installed and ready to run.</p>
<span class="wiki-legacy-anchor" id="How_to_run" aria-hidden="true"></span><h2 id="how-to-run"> How to run </h2>
<span class="wiki-legacy-anchor" id="From_dedicated_qube" aria-hidden="true"></span><h3 id="from-dedicated-qube"> From dedicated qube </h3>
<p>Bisq can be started by running <code class="wiki-source-code" id="source-code-15">/opt/bisq/bin/Bisq</code> in the <code class="wiki-source-code" id="source-code-16">bisq-vm</code> qube.</p>
<span class="wiki-legacy-anchor" id="From_dom0" aria-hidden="true"></span><h3 id="from-dom0"> From dom0 </h3>
<p>To start Bisq directly from dom0, a keyboard shortcut can be defined:</p>
<ul>
<li>Q Menu &gt; System Tools &gt; Keyboard &gt; Application Shortcuts</li>
<li>Add a shortcut where the command has the format <code class="wiki-source-code" id="source-code-17">qvm-run -q -a &lt;qube-name&gt; &lt;command&gt;</code>
<ul>
<li>For example, in our case: <code class="wiki-source-code" id="source-code-18">qvm-run -q -a bisq-vm /opt/bisq/bin/Bisq</code></li>
</ul></li>
<li>Assign a system-wide key combination for starting Bisq
<ul>
<li>For example <code class="wiki-source-code" id="source-code-19">Ctrl+Alt+B</code></li>
</ul></li>
<li>Press OK</li>
</ul>
<p>Now pressing the key combination anywhere in QubesOS will automatically start the Bisq application.</p>
<span class="wiki-legacy-anchor" id="Further_reading" aria-hidden="true"></span><h2 id="further-reading"> Further reading </h2>
<ul>
<li>See <a href="https://www.qubes-os.org/doc/bind-dirs" rel="noopener noreferrer">Qubes tutorial</a> for what binding dirs are and how they work</li>
<li>See <a href="https://www.qubes-os.org/doc/qmemman/" rel="noopener noreferrer">Qubes documentation</a> for how memory balancing works</li>
<li>See <a href="https://www.whonix.org/wiki/Bisq" rel="noopener noreferrer">https://www.whonix.org/wiki/Bisq</a> for a similar setup guide for a <a href="https://www.whonix.org" rel="noopener noreferrer">Whonix</a> Qube</li>
</ul>
<span class="wiki-legacy-anchor" id="References" aria-hidden="true"></span><h2 id="references"> References </h2>
<p>[1] Assuming you only use this Qube for Bisq, this amount of storage will be used for all Bisq files (downloaded installer, installation folder, your local Bisq settings and profile, your Bisq wallet, Bisq logs, etc). Therefore it is important to have enough disk space available, because if Bisq runs out of storage space, this may lead to data corruption and loss of funds. For reference: A fresh Qube containing only a fully sync-ed new installation of Bisq 1.3.6, with no trades / accounts / balances, uses about 1GB of space.</p>
<p>[2] Bisq needs 4 GB, the rest is for other OS processes.</p>
<p>[3] This will ensure that the RAM allocated to this qube is not shared with other Qubes.</p>
<p>[4] For more details, see Verifications section on the <a href="https://github.com/bisq-network/bisq/releases/" rel="noopener noreferrer">Bisq GitHub releases page</a></p>
<p>[5] The <code class="wiki-source-code" id="source-code-20">/usr/share/desktop-directories</code> is not really used, but is required during installation. See <a href="https://github.com/bisq-network/bisq/issues/848" rel="noopener noreferrer">Issue 848</a></p>
</div>
