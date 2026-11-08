---
title: "Running Bisq on Tails"
slug: "wiki/running-bisq-on-tails"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details><summary>On this page</summary><ul><li><a href="#overview">Overview</a></li><li><a href="#preparations">Preparations</a></li><li><a href="#configure-tails">Configure Tails</a></li><li><a href="#configure-the-persistent-folder">Configure the Persistent Folder</a></li><li><a href="#import-user-data-from-backup">Import user data from backup</a></li><li><a href="#download-bisq">Download Bisq</a></li><li><a href="#create-installation-script">Create installation script</a></li><li><a href="#run-bisq">Run Bisq</a></li><li><a href="#maintenance">Maintenance</a></li><li><a href="#backup-user-data">Backup user data</a></li><li><a href="#while-bisq-is-running">While Bisq is running</a></li><li><a href="#while-bisq-is-closed">While Bisq is closed</a></li><li><a href="#upgrade-bisq-to-the-latest-version">Upgrade Bisq to the latest version</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en"><span class="wiki-legacy-anchor" id="Overview" aria-hidden="true"></span><h2 id="overview"> Overview </h2>
<p>Unlike most operating systems, <a href="https://tails.boum.org/about/" rel="noopener noreferrer"></a></p><p><a href="https://tails.boum.org/about/" rel="noopener noreferrer">Tails runs <em>entirely</em> in memory.</a></p>
<p><strong>Version compatibility:</strong> the script below predates Bisq 1 v1.10.11. That release rejects its <code>torControlPort</code>, <code>torControlCookieFile</code> and <code>torControlUseSafeCookieAuth</code> options outside special Whonix handling; do not run the script unchanged on v1.10.11. A current Tails port must review the external-Tor configuration and cookie-permission changes while retaining persistent wallet data.</p><a href="https://tails.boum.org/about/" rel="noopener noreferrer">
</a> When Tails shuts down, memory contents are deleted, restoring the OS to its original state. Only files saved to the <a href="https://tails.boum.org/doc/persistent_storage/" rel="noopener noreferrer">Persistent Storage</a> survive a reboot.<p></p>
<p>Therefore, Bisq must be reinstalled (and configured) after every boot. More importantly, Bisq's <a href="../data-directory/">default data directory</a> must be relocated to the <strong>Persistent Storage</strong> so that your wallet, keys, etc. are not lost every time Tails shuts down.</p>
<p>This is easy to automate with an installation script.</p>
<span class="wiki-legacy-anchor" id="Preparations" aria-hidden="true"></span><h2 id="preparations"> Preparations </h2>
<span class="wiki-legacy-anchor" id="Configure_Tails" aria-hidden="true"></span><h3 id="configure-tails"> Configure Tails </h3>
<p>On the Tails <a href="https://tails.boum.org/doc/first_steps/welcome_screen/" rel="noopener noreferrer">Welcome Screen:</a></p>
<ul>
<li><a href="https://tails.boum.org/doc/first_steps/welcome_screen/administration_password/" rel="noopener noreferrer">Set up an administration password.</a></li>
<li><a href="https://tails.boum.org/doc/persistent_storage/create/" rel="noopener noreferrer">Create Persistent Storage.</a></li>
</ul>
<p>Once Persistent Storage has been created, a settings window will open automatically. You can also open it from the desktop menu: <code class="wiki-source-code" id="source-code-1">Applications</code> &gt; <code class="wiki-source-code" id="source-code-2">Tails</code> &gt; <code class="wiki-source-code" id="source-code-3">Persistent Storage</code>.</p>
<ul>
<li>Enable the <strong>Persistent Folder</strong> in the above settings.</li>
</ul>
<span class="wiki-legacy-anchor" id="Configure_the_Persistent_Folder" aria-hidden="true"></span><h3 id="configure-the-persistent-folder"> Configure the Persistent Folder </h3>
<ul>
<li>Create a directory to store the Bisq installer (and installation script):</li>
</ul>
<dl>
<dt></dt>
<dd>
<code class="wiki-source-code" id="source-code-4">mkdir /home/amnesia/Persistent/bisq/</code>
</dd>
</dl>
<ul>
<li>Create a <strong>persistent data directory</strong> for your Bisq user data:</li>
</ul>
<dl>
<dt></dt>
<dd>
<code class="wiki-source-code" id="source-code-5">mkdir /home/amnesia/Persistent/bisq/Bisq/</code>
</dd>
</dl>
<span class="wiki-legacy-anchor" id="Import_user_data_from_backup" aria-hidden="true"></span><h4 id="import-user-data-from-backup"> Import user data from backup </h4>
<aside class="wiki-admonition" role="note"><p><strong>Warning</strong></p><p><strong>WARNING:</strong> Ensure that the <a href="../running-bisq-on-tails/#configure-the-persistent-folder">persistent data directory</a> is EMPTY before importing. Do NOT mix user data from different sessions.</p>
</aside>
<p>If you wish to import user data from a previous Bisq installation or backup, copy it into the <a href="../running-bisq-on-tails/#configure-the-persistent-folder">persistent data directory</a>:</p>
<ul>
<li><code class="wiki-source-code" id="source-code-6">cp -ra /[backupdirectory]/bisq_backup_version001/. /home/amnesia/Persistent/bisq/Bisq/</code></li>
</ul>
<p><strong>N.B.</strong> The correct path to your <code class="wiki-source-code" id="source-code-7">btc_mainnet</code> directory should now be:</p>
<dl>
<dt></dt>
<dd>
<code class="wiki-source-code" id="source-code-8">/home/amnesia/Persistent/bisq/Bisq/btc_mainnet</code>
</dd>
</dl>
<span class="wiki-legacy-anchor" id="Download_Bisq" aria-hidden="true"></span><h3 id="download-bisq"> Download Bisq </h3>
<ul>
<li><a href="https://bisq.network/downloads/" rel="noopener noreferrer">Download</a> and <a href="../downloading-and-installing/#verify-installer-file">verify</a> the Debian (.deb) version of the Bisq installer.</li>
<li>Move the installer file to the <a href="../running-bisq-on-tails/#configure-the-persistent-folder">Bisq installer directory</a>:</li>
</ul>
<dl>
<dt></dt>
<dd>
<code class="wiki-source-code" id="source-code-9">mv /path/to/[yourdownload.deb] /home/amnesia/Persistent/bisq/</code>
</dd>
</dl>
<span class="wiki-legacy-anchor" id="Create_installation_script" aria-hidden="true"></span><h3 id="create-installation-script"> Create installation script </h3>
<p><strong>NOTE:</strong> The script below will install Bisq, configure Tor, and redirect user data to the <a href="../running-bisq-on-tails/#configure-the-persistent-folder">persistent data directory</a> (by creating a 'symbolic link'). Every step in the script is explained via 'echo' commands.</p>
<ul>
<li>Create a new script file:</li>
</ul>
<dl>
<dt></dt>
<dd>
<code class="wiki-source-code" id="source-code-10">touch /home/amnesia/Persistent/bisq/install-bisq.sh</code>
</dd>
</dl>
<ul>
<li>Make the file executable:</li>
</ul>
<dl>
<dt></dt>
<dd>
<code class="wiki-source-code" id="source-code-11">chmod +x /home/amnesia/Persistent/bisq/install-bisq.sh</code>
</dd>
</dl>
<ul>
<li>Edit the file, and save the script below.</li>
<li>On the second line, replace [yourdownload.deb] with the filename of the <a href="../running-bisq-on-tails/#download-bisq">Bisq installer you downloaded</a>.</li>
</ul>
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
<span class="wiki-legacy-anchor" id="Run_Bisq" aria-hidden="true"></span><h2 id="run-bisq"> Run Bisq </h2>
<p><strong>NOTE:</strong> Your user data is safely stored in the <a href="../running-bisq-on-tails/#configure-the-persistent-folder">persistent data directory</a>. However, the Bisq application is 'uninstalled' every time Tails shuts down.</p>
<p>To install Bisq:</p>
<ul>
<li>Connect to the Tor network, via the desktop menu:</li>
</ul>
<dl>
<dt></dt>
<dd>
<code class="wiki-source-code" id="source-code-13">Applications</code> &gt; <code class="wiki-source-code" id="source-code-14">Internet</code> &gt; <code class="wiki-source-code" id="source-code-15">Tor Connection</code>
</dd>
</dl>
<ul>
<li>Run the <a href="../running-bisq-on-tails/#create-installation-script">installation script</a>:</li>
</ul>
<dl>
<dt></dt>
<dd>
<code class="wiki-source-code" id="source-code-16">sudo sh /home/amnesia/Persistent/bisq/install-bisq.sh</code>
</dd>
</dl>
<p>Once Bisq has been installed, you can either start it from the desktop menu:</p>
<ul>
<li><code class="wiki-source-code" id="source-code-17">Applications</code> &gt; <code class="wiki-source-code" id="source-code-18">Internet</code> &gt; <code class="wiki-source-code" id="source-code-19">Bisq</code></li>
</ul>
<p>Or via terminal:</p>
<ul>
<li><code class="wiki-source-code" id="source-code-20">/opt/bisq/bin/Bisq --torControlPort 951 --torControlCookieFile=/var/run/tor/control.authcookie --torControlUseSafeCookieAuth</code></li>
</ul>
<span class="wiki-legacy-anchor" id="Maintenance" aria-hidden="true"></span><h2 id="maintenance"> Maintenance </h2>
<span class="wiki-legacy-anchor" id="Backup_user_data" aria-hidden="true"></span><h3 id="backup-user-data"> Backup user data </h3>
<span class="wiki-legacy-anchor" id="While_Bisq_is_running" aria-hidden="true"></span><h4 id="while-bisq-is-running"> While Bisq is running </h4>
<p>You can <a href="../backing-up-application-data/#while-bisq-is-running">backup while Bisq is running</a>, as normal.</p>
<span class="wiki-legacy-anchor" id="While_Bisq_is_closed" aria-hidden="true"></span><h4 id="while-bisq-is-closed"> While Bisq is closed </h4>
<p>You can also backup while Bisq is closed, by copying your user data to a backup location. However:</p>
<aside class="wiki-admonition" role="note"><p><strong>Warning</strong></p><p><strong>REMEMBER:</strong> Your user data is stored in the <a href="../running-bisq-on-tails/#configure-the-persistent-folder">persistent data directory</a>, and <strong>NOT</strong> Bisq's <a href="../data-directory/">default data directory</a>.</p>
<p><strong>WARNING:</strong> Only backup data into an EMPTY directory. Do NOT mix user data from different sessions.</p>
</aside>
<p>To backup, first create a new (empty) directory for the backup, then copy the <a href="../running-bisq-on-tails/#configure-the-persistent-folder">persistent data directory</a>. For example:</p>
<ul>
<li><code class="wiki-source-code" id="source-code-21">mkdir /[backupdirectory]/bisq_backup_version001</code></li>
<li><code class="wiki-source-code" id="source-code-22">cp -ra /home/amnesia/Persistent/bisq/Bisq/. /[backupdirectory]/bisq_backup_version001</code></li>
</ul>
<span class="wiki-legacy-anchor" id="Upgrade_Bisq_to_the_latest_version" aria-hidden="true"></span><h3 id="upgrade-bisq-to-the-latest-version"> Upgrade Bisq to the latest version </h3>
<aside class="wiki-admonition" role="note"><p><strong>Warning</strong></p><p><strong>WARNING:</strong> Do not downgrade Bisq. Installing an older version could cause irreversible damage to Bisq data.</p>
<p><strong>NOTE</strong>: Before upgrading, it is recommended to <a href="../running-bisq-on-tails/#backup-user-data">backup your user data</a>.</p>
</aside>
<p>To upgrade Bisq:</p>
<ul>
<li><a href="../running-bisq-on-tails/#download-bisq">Download Bisq</a> to <code class="wiki-source-code" id="source-code-23">/home/amnesia/Persistent/bisq/</code></li>
<li>Update the <code class="wiki-source-code" id="source-code-24">BisqInstaller=</code> line of the <a href="../running-bisq-on-tails/#create-installation-script">installation script</a> with the filename of the new version.</li>
</ul>
</div>
