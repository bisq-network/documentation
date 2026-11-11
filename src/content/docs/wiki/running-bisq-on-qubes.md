---
title: "Running Bisq on Qubes"
slug: "wiki/running-bisq-on-qubes"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details><summary>On this page</summary><ul><li><a href="#how-to-setup">How to setup</a></li><li><a href="#in-dom0">In dom0</a></li><li><a href="#create-qube">Create qube</a></li><li><a href="#in-dedicated-qube">In dedicated qube</a></li><li><a href="#create-binding-dirs">Create binding dirs</a></li><li><a href="#configure-binding-dirs">Configure binding dirs</a></li><li><a href="#install-bisq">Install Bisq</a></li><li><a href="#download-debian-package">Download Debian package</a></li><li><a href="#verify-pgp-signature">Verify PGP signature</a></li><li><a href="#install-package">Install package</a></li><li><a href="#how-to-run">How to run</a></li><li><a href="#from-dedicated-qube">From dedicated qube</a></li><li><a href="#from-dom0">From dom0</a></li><li><a href="#further-reading">Further reading</a></li><li><a href="#references">References</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

This guide shows **how to run Bisq in a dedicated qube in QubesOS**. The steps were tested using QubesOS 4.0.3 and a Bisq qube based on the <code class="wiki-source-code" id="source-code-1">debian-10</code> template.

<span class="wiki-legacy-anchor" id="How_to_setup" aria-hidden="true">
</span>

## How to setup {#how-to-setup}

<span class="wiki-legacy-anchor" id="In_dom0" aria-hidden="true">
</span>

### In dom0 {#in-dom0}

Execute the following steps in dom0.

<span class="wiki-legacy-anchor" id="Create_qube" aria-hidden="true">
</span>

#### Create qube {#create-qube}

Create a new dedicated qube called <code class="wiki-source-code" id="source-code-2">bisq-vm</code> based on the <code class="wiki-source-code" id="source-code-3">debian-10</code> template.

- Q Menu > Create Qubes VM > Qube based on a template
- Template: choose <code class="wiki-source-code" id="source-code-4">debian-10</code>
- Check \"Launch settings after creation\"
- Press OK

Within a few seconds, the qube is created and the Qube Settings popup opens. Adjust it as follows:

- Basic > Disk Storage
  - Set \"Private Storage max size\" to at least <code class="wiki-source-code" id="source-code-5">5000 MiB</code> \[1\]
- Advanced > Memory / CPU
  - Set \"Initial memory\" to <code class="wiki-source-code" id="source-code-6">6000 MB</code> \[2\]
  - Set \"vCPUs no.\" to <code class="wiki-source-code" id="source-code-7">4</code>
  - Uncheck \"Include in memory balancing\" \[3\]
- Press OK

<span class="wiki-legacy-anchor" id="In_dedicated_qube" aria-hidden="true">
</span>

### In dedicated qube {#in-dedicated-qube}

Execute the following steps in the <code class="wiki-source-code" id="source-code-8">bisq-vm</code> qube.

<span class="wiki-legacy-anchor" id="Create_binding_dirs" aria-hidden="true">
</span>

#### Create binding dirs {#create-binding-dirs}

Create the binding dirs needed for the Bisq installation:

<pre><code class="wiki-source-code" id="source-code-9">&#10;sudo mkdir -p /rw/bind-dirs/opt/bisq&#10;sudo mkdir -p /rw/bind-dirs/usr/share/desktop-directories&#10;</code></pre>

Restart the qube to apply the binding dir settings.

<span class="wiki-legacy-anchor" id="Configure_binding_dirs" aria-hidden="true">
</span>

#### Configure binding dirs {#configure-binding-dirs}

Setup the binding dirs mapping for the system folders needed for the Bisq installation:

<pre><code class="wiki-source-code" id="source-code-10">&#10;sudo mkdir -p /rw/config/qubes-bind-dirs.d&#10;</code></pre>

Specify which system folders are mapped to binding dirs. To do that, create the configuration file:

<pre><code class="wiki-source-code" id="source-code-11">&#10;sudo nano /rw/config/qubes-bind-dirs.d/50_user.conf&#10;</code></pre>

and populate it with the following lines \[5\] :

<pre><code class="wiki-source-code" id="source-code-12">&#10;binds+=( '/opt/bisq' )&#10;binds+=( '/usr/share/desktop-directories' )&#10;</code></pre>

<span class="wiki-legacy-anchor" id="Install_Bisq" aria-hidden="true">
</span>

#### Install Bisq {#install-bisq}

<span class="wiki-legacy-anchor" id="Download_Debian_package" aria-hidden="true">
</span>

#### Download Debian package {#download-debian-package}

Go to the [Bisq Downloads](https://bisq.network/downloads) page and download the Debian package and the corresponding PGP signature.

<span class="wiki-legacy-anchor" id="Verify_PGP_signature" aria-hidden="true">
</span>

##### Verify PGP signature {#verify-pgp-signature}

Check that the downloaded package matches the signature \[4\]. Assuming the files were downloaded in the Downloads folder:

<pre><code class="wiki-source-code" id="source-code-13">&#10;# Go to the folder where you downloaded the .deb package and the PGP signature&#10;cd Downloads&#10;&#10;# Import the signing key of Alejandro Garcia (alejandrogarcia83)&#10;curl https://bisq.network/pubkey/E222AA02.asc | gpg --import&#10;&#10;# Verify the signature of the downloaded binary&#10;gpg --digest-algo SHA256 --verify Bisq-*.asc&#10;</code></pre>

<span class="wiki-legacy-anchor" id="Install_package" aria-hidden="true">
</span>

##### Install package {#install-package}

<pre><code class="wiki-source-code" id="source-code-14">&#10;sudo dpkg -i Bisq-*.deb&#10;</code></pre>

Once this command finishes, Bisq is installed and ready to run.

<span class="wiki-legacy-anchor" id="How_to_run" aria-hidden="true">
</span>

## How to run {#how-to-run}

<span class="wiki-legacy-anchor" id="From_dedicated_qube" aria-hidden="true">
</span>

### From dedicated qube {#from-dedicated-qube}

Bisq can be started by running <code class="wiki-source-code" id="source-code-15">/opt/bisq/bin/Bisq</code> in the <code class="wiki-source-code" id="source-code-16">bisq-vm</code> qube.

<span class="wiki-legacy-anchor" id="From_dom0" aria-hidden="true">
</span>

### From dom0 {#from-dom0}

To start Bisq directly from dom0, a keyboard shortcut can be defined:

- Q Menu > System Tools > Keyboard > Application Shortcuts
- Add a shortcut where the command has the format <code class="wiki-source-code" id="source-code-17">qvm-run -q -a \<qube-name> \<command></code>
  - For example, in our case: <code class="wiki-source-code" id="source-code-18">qvm-run -q -a bisq-vm /opt/bisq/bin/Bisq</code>
- Assign a system-wide key combination for starting Bisq
  - For example <code class="wiki-source-code" id="source-code-19">Ctrl+Alt+B</code>
- Press OK

Now pressing the key combination anywhere in QubesOS will automatically start the Bisq application.

<span class="wiki-legacy-anchor" id="Further_reading" aria-hidden="true">
</span>

## Further reading {#further-reading}

- See [Qubes tutorial](https://www.qubes-os.org/doc/bind-dirs) for what binding dirs are and how they work
- See [Qubes documentation](https://www.qubes-os.org/doc/qmemman/) for how memory balancing works
- See [https://www.whonix.org/wiki/Bisq](https://www.whonix.org/wiki/Bisq) for a similar setup guide for a [Whonix](https://www.whonix.org) Qube

<span class="wiki-legacy-anchor" id="References" aria-hidden="true">
</span>

## References {#references}

\[1\] Assuming you only use this Qube for Bisq, this amount of storage will be used for all Bisq files (downloaded installer, installation folder, your local Bisq settings and profile, your Bisq wallet, Bisq logs, etc). Therefore it is important to have enough disk space available, because if Bisq runs out of storage space, this may lead to data corruption and loss of funds. For reference: A fresh Qube containing only a fully sync-ed new installation of Bisq 1.3.6, with no trades / accounts / balances, uses about 1GB of space.

\[2\] Bisq needs 4 GB, the rest is for other OS processes.

\[3\] This will ensure that the RAM allocated to this qube is not shared with other Qubes.

\[4\] For more details, see Verifications section on the [Bisq GitHub releases page](https://github.com/bisq-network/bisq/releases/)

\[5\] The <code class="wiki-source-code" id="source-code-20">/usr/share/desktop-directories</code> is not really used, but is required during installation. See [Issue 848](https://github.com/bisq-network/bisq/issues/848)

</div>
