---
title: "Running Bisq on Tails"
slug: "wiki/running-bisq-on-tails"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details><summary>On this page</summary><ul><li><a href="#overview">Overview</a></li><li><a href="#preparations">Preparations</a></li><li><a href="#configure-tails">Configure Tails</a></li><li><a href="#configure-the-persistent-folder">Configure the Persistent Folder</a></li><li><a href="#import-user-data-from-backup">Import user data from backup</a></li><li><a href="#download-bisq">Download Bisq</a></li><li><a href="#create-installation-script">Create installation script</a></li><li><a href="#run-bisq">Run Bisq</a></li><li><a href="#maintenance">Maintenance</a></li><li><a href="#backup-user-data">Backup user data</a></li><li><a href="#while-bisq-is-running">While Bisq is running</a></li><li><a href="#while-bisq-is-closed">While Bisq is closed</a></li><li><a href="#upgrade-bisq-to-the-latest-version">Upgrade Bisq to the latest version</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

<span class="wiki-legacy-anchor" id="Overview" aria-hidden="true">
</span>

## Overview {#overview}

Unlike most operating systems, <a href="https://tails.boum.org/about/" rel="noopener noreferrer"></a>

[Tails runs *entirely* in memory.](https://tails.boum.org/about/)

<a href="https://tails.boum.org/about/" rel="noopener noreferrer">
</a> When Tails shuts down, memory contents are deleted, restoring the OS to its original state. Only files saved to the <a href="https://tails.boum.org/doc/persistent_storage/" rel="noopener noreferrer">Persistent Storage</a> survive a reboot.<p></p>

Therefore, Bisq must be reinstalled (and configured) after every boot. More importantly, Bisq\'s [default data directory](../data-directory/) must be relocated to the **Persistent Storage** so that your wallet, keys, etc. are not lost every time Tails shuts down.

This is easy to automate with an installation script.

<span class="wiki-legacy-anchor" id="Preparations" aria-hidden="true">
</span>

## Preparations {#preparations}

<span class="wiki-legacy-anchor" id="Configure_Tails" aria-hidden="true">
</span>

### Configure Tails {#configure-tails}

On the Tails [Welcome Screen:](https://tails.boum.org/doc/first_steps/welcome_screen/)

- [Set up an administration password.](https://tails.boum.org/doc/first_steps/welcome_screen/administration_password/)
- [Create Persistent Storage.](https://tails.boum.org/doc/persistent_storage/create/)

Once Persistent Storage has been created, a settings window will open automatically. You can also open it from the desktop menu: <code class="wiki-source-code" id="source-code-1">Applications</code> > <code class="wiki-source-code" id="source-code-2">Tails</code> > <code class="wiki-source-code" id="source-code-3">Persistent Storage</code>.

- Enable the **Persistent Folder** in the above settings.

<span class="wiki-legacy-anchor" id="Configure_the_Persistent_Folder" aria-hidden="true">
</span>

### Configure the Persistent Folder {#configure-the-persistent-folder}

- Create a directory to store the Bisq installer (and installation script):

<dl>
<dt></dt>
<dd>
<code class="wiki-source-code" id="source-code-4">mkdir /home/amnesia/Persistent/bisq/</code>
</dd>
</dl>

- Create a **persistent data directory** for your Bisq user data:

<dl>
<dt></dt>
<dd>
<code class="wiki-source-code" id="source-code-5">mkdir /home/amnesia/Persistent/bisq/Bisq/</code>
</dd>
</dl>

<span class="wiki-legacy-anchor" id="Import_user_data_from_backup" aria-hidden="true">
</span>

#### Import user data from backup {#import-user-data-from-backup}

<aside class="wiki-admonition" role="note">

**Warning**

**WARNING:** Ensure that the [persistent data directory](../running-bisq-on-tails/#configure-the-persistent-folder) is EMPTY before importing. Do NOT mix user data from different sessions.

</aside>

If you wish to import user data from a previous Bisq installation or backup, copy it into the [persistent data directory](../running-bisq-on-tails/#configure-the-persistent-folder):

- <code class="wiki-source-code" id="source-code-6">cp -ra /\[backupdirectory\]/bisq_backup_version001/. /home/amnesia/Persistent/bisq/Bisq/</code>

**N.B.** The correct path to your <code class="wiki-source-code" id="source-code-7">btc_mainnet</code> directory should now be:

<dl>
<dt></dt>
<dd>
<code class="wiki-source-code" id="source-code-8">/home/amnesia/Persistent/bisq/Bisq/btc_mainnet</code>
</dd>
</dl>

<span class="wiki-legacy-anchor" id="Download_Bisq" aria-hidden="true">
</span>

### Download Bisq {#download-bisq}

- [Download](https://bisq.network/downloads/) and [verify](../downloading-and-installing/#verify-installer-file) the Debian (.deb) version of the Bisq installer.
- Move the installer file to the [Bisq installer directory](../running-bisq-on-tails/#configure-the-persistent-folder):

<dl>
<dt></dt>
<dd>
<code class="wiki-source-code" id="source-code-9">mv /path/to/[yourdownload.deb] /home/amnesia/Persistent/bisq/</code>
</dd>
</dl>

<span class="wiki-legacy-anchor" id="Create_installation_script" aria-hidden="true">
</span>

### Create installation script {#create-installation-script}

**NOTE:** The script below will install Bisq, configure Tor, and redirect user data to the [persistent data directory](../running-bisq-on-tails/#configure-the-persistent-folder) (by creating a \'symbolic link\'). Every step in the script is explained via \'echo\' commands.

- Create a new script file:

<dl>
<dt></dt>
<dd>
<code class="wiki-source-code" id="source-code-10">touch /home/amnesia/Persistent/bisq/install-bisq.sh</code>
</dd>
</dl>

- Make the file executable:

<dl>
<dt></dt>
<dd>
<code class="wiki-source-code" id="source-code-11">chmod +x /home/amnesia/Persistent/bisq/install-bisq.sh</code>
</dd>
</dl>

- Edit the file, and save the script below.
- On the second line, replace \[yourdownload.deb\] with the filename of the [Bisq installer you downloaded](../running-bisq-on-tails/#download-bisq).

<pre><code class="wiki-source-code" id="source-code-12">
#!/bin/bash
BisqInstaller=/home/amnesia/Persistent/bisq/[yourdownload.deb]
DataDirectory=/home/amnesia/Persistent/bisq/Bisq
&#10;echo "Install Bisq ..."
dpkg -i $BisqInstaller
echo "Change access rights of /var/run/tor/control.authcookie ..."
chmod o+r /var/run/tor/control.authcookie
echo "Create /etc/onion-grater.d/bisq.yml ..."
echo "---
- apparmor-profiles:
    - '/opt/bisq/bin/Bisq'
  users:
    - 'amnesia'
  commands:
    AUTHCHALLENGE:
      - 'SAFECOOKIE .*'
    SETEVENTS:
      - 'CIRC ORCONN INFO NOTICE WARN ERR HS_DESC HS_DESC_CONTENT'
    GETINFO:
      - pattern: 'status/bootstrap-phase'
        response:
          - pattern: '250-status/bootstrap-phase=*'
            replacement: '250-status/bootstrap-phase=NOTICE BOOTSTRAP PROGRESS=100 TAG=done SUMMARY="Done"'
      - 'net/listeners/socks'
    ADD_ONION:
      - pattern:     'NEW:(\S+) Port=9999,(\S+)'
        replacement: 'NEW:{} Port=9999,{client-address}:{}'
      - pattern:     '(\S+):(\S+) Port=9999,(\S+)'
        replacement: '{}:{} Port=9999,{client-address}:{}'
    DEL_ONION:
      - '.+'
    HSFETCH:
      - '.+'
  events:
    CIRC:
      suppress: true
    ORCONN:
      suppress: true
    INFO:
      suppress: true
    NOTICE:
      suppress: true
    WARN:
      suppress: true
    ERR:
      suppress: true
    HS_DESC:
      response:
        - pattern:     '650 HS_DESC CREATED (\S+) (\S+) (\S+) \S+ (.+)'
          replacement: '650 HS_DESC CREATED {} {} {} redacted {}'
        - pattern:     '650 HS_DESC UPLOAD (\S+) (\S+) .*'
          replacement: '650 HS_DESC UPLOAD {} {} redacted redacted'
        - pattern:     '650 HS_DESC UPLOADED (\S+) (\S+) .+'
          replacement: '650 HS_DESC UPLOADED {} {} redacted'
        - pattern:     '650 HS_DESC REQUESTED (\S+) NO_AUTH'
          replacement: '650 HS_DESC REQUESTED {} NO_AUTH'
        - pattern:     '650 HS_DESC REQUESTED (\S+) NO_AUTH \S+ \S+'
          replacement: '650 HS_DESC REQUESTED {} NO_AUTH redacted redacted'
        - pattern:     '650 HS_DESC RECEIVED (\S+) NO_AUTH \S+ \S+'
          replacement: '650 HS_DESC RECEIVED {} NO_AUTH redacted redacted'
        - pattern:     '.*'
          replacement: ''
    HS_DESC_CONTENT:
      suppress: true" &gt; /etc/onion-grater.d/bisq.yml
echo "Restart onion-grater service ..."
systemctl restart onion-grater.service
echo "Edit Bisq executable file ..."
sed -i 's+Exec=/opt/bisq/bin/Bisq+Exec=/opt/bisq/bin/Bisq --torControlPort 951 --torControlCookieFile=/var/run/tor/control.authcookie --torControlUseSafeCookieAuth+' /usr/share/applications/bisq-Bisq.desktop
echo "Redirect user data to Tails Persistent Storage ..."
ln -s $DataDirectory /home/amnesia/.local/share/Bisq
echo "Installation complete."
</code></pre>

<span class="wiki-legacy-anchor" id="Run_Bisq" aria-hidden="true">
</span>

## Run Bisq {#run-bisq}

**NOTE:** Your user data is safely stored in the [persistent data directory](../running-bisq-on-tails/#configure-the-persistent-folder). However, the Bisq application is \'uninstalled\' every time Tails shuts down.

To install Bisq:

- Connect to the Tor network, via the desktop menu:

<dl>
<dt></dt>
<dd>
<code class="wiki-source-code" id="source-code-13">Applications</code> &gt; <code class="wiki-source-code" id="source-code-14">Internet</code> &gt; <code class="wiki-source-code" id="source-code-15">Tor Connection</code>
</dd>
</dl>

- Run the [installation script](../running-bisq-on-tails/#create-installation-script):

<dl>
<dt></dt>
<dd>
<code class="wiki-source-code" id="source-code-16">sudo sh /home/amnesia/Persistent/bisq/install-bisq.sh</code>
</dd>
</dl>

Once Bisq has been installed, you can either start it from the desktop menu:

- <code class="wiki-source-code" id="source-code-17">Applications</code> > <code class="wiki-source-code" id="source-code-18">Internet</code> > <code class="wiki-source-code" id="source-code-19">Bisq</code>

Or via terminal:

- <code class="wiki-source-code" id="source-code-20">/opt/bisq/bin/Bisq -\-torControlPort 951 -\-torControlCookieFile=/var/run/tor/control.authcookie -\-torControlUseSafeCookieAuth</code>

<span class="wiki-legacy-anchor" id="Maintenance" aria-hidden="true">
</span>

## Maintenance {#maintenance}

<span class="wiki-legacy-anchor" id="Backup_user_data" aria-hidden="true">
</span>

### Backup user data {#backup-user-data}

<span class="wiki-legacy-anchor" id="While_Bisq_is_running" aria-hidden="true">
</span>

#### While Bisq is running {#while-bisq-is-running}

You can [backup while Bisq is running](../backing-up-application-data/#while-bisq-is-running), as normal.

<span class="wiki-legacy-anchor" id="While_Bisq_is_closed" aria-hidden="true">
</span>

#### While Bisq is closed {#while-bisq-is-closed}

You can also backup while Bisq is closed, by copying your user data to a backup location. However:

<aside class="wiki-admonition" role="note">

**Warning**

**REMEMBER:** Your user data is stored in the [persistent data directory](../running-bisq-on-tails/#configure-the-persistent-folder), and **NOT** Bisq\'s [default data directory](../data-directory/).

**WARNING:** Only backup data into an EMPTY directory. Do NOT mix user data from different sessions.

</aside>

To backup, first create a new (empty) directory for the backup, then copy the [persistent data directory](../running-bisq-on-tails/#configure-the-persistent-folder). For example:

- <code class="wiki-source-code" id="source-code-21">mkdir /\[backupdirectory\]/bisq_backup_version001</code>
- <code class="wiki-source-code" id="source-code-22">cp -ra /home/amnesia/Persistent/bisq/Bisq/. /\[backupdirectory\]/bisq_backup_version001</code>

<span class="wiki-legacy-anchor" id="Upgrade_Bisq_to_the_latest_version" aria-hidden="true">
</span>

### Upgrade Bisq to the latest version {#upgrade-bisq-to-the-latest-version}

<aside class="wiki-admonition" role="note">

**Warning**

**WARNING:** Do not downgrade Bisq. Installing an older version could cause irreversible damage to Bisq data.

**NOTE**: Before upgrading, it is recommended to [backup your user data](../running-bisq-on-tails/#backup-user-data).

</aside>

To upgrade Bisq:

- [Download Bisq](../running-bisq-on-tails/#download-bisq) to <code class="wiki-source-code" id="source-code-23">/home/amnesia/Persistent/bisq/</code>
- Update the <code class="wiki-source-code" id="source-code-24">BisqInstaller=</code> line of the [installation script](../running-bisq-on-tails/#create-installation-script) with the filename of the new version.

</div>
