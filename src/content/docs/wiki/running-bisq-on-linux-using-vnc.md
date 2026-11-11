---
title: "Running Bisq on Linux using VNC"
slug: "wiki/running-bisq-on-linux-using-vnc"
tableOfContents: false
---

<div class="wiki-recovered-article" lang="en">

Install Debian 10 Linux with bare minimal packages, then run:

<pre><code class="wiki-source-code" id="source-code-1">&#10;apt-get update&#10;apt-get install -y sudo psmisc tightvncserver awesome autocutsel&#10;wget https://raw.githubusercontent.com/bisq-network/bisq/master/seednode/install_seednode_debian.sh&#10;sed -i -e 's/#BITCOIN_INSTALL=false/BITCOIN_INSTALL=false/' install_seednode_debian.sh&#10;chmod 700 install_seednode_debian.sh&#10;./install_seednode_debian.sh&#10;systemctl disable bisq&#10;</code></pre>

Then open <code class="wiki-source-code" id="source-code-2">/bisq/.vnc/xstartup</code> in a text editor and use this as an example startup script:

<pre><code class="wiki-source-code" id="source-code-3">&#10;#!/bin/bash&#10;&#10;xrdb $HOME/.Xresources&#10;xsetroot -solid black&#10;autocutsel -fork&#10;&#10;#export GDK_SCALE=2&#10;&#10;awesome &amp;&#10;&#10;sleep 2&#10;&#10;export JAVA_OPTS="-Xms4096M -Xmx4096M"&#10;&#10;name=bisqvnc&#10;&#10;/bisq/bisq/bisq-desktop \&#10;	--appName=${name} \&#10;	--appDataDir=${name} \&#10;	--maxConnections=16 \&#10;	--useTorForBtc=false \&#10;	--ignoreLocalBtcNode=true \&#10;	--btcNodes=103.99.170.210,103.99.170.220&#10;</code></pre>

Next open <code class="wiki-source-code" id="source-code-4">/etc/systemd/system/vncserver@.service</code> in a text editor and use this as an example:

<pre><code class="wiki-source-code" id="source-code-5">&#10;[Unit]&#10;Description=Start TightVNC server at startup&#10;After=syslog.target network.target&#10;&#10;[Service]&#10;Type=forking&#10;User=bisq&#10;Group=bisq&#10;WorkingDirectory=/bisq&#10;&#10;PIDFile=/bisq/.vnc/%H:%i.pid&#10;ExecStartPre=-/usr/bin/vncserver -kill :%i &gt; /dev/null 2&gt;&amp;1&#10;ExecStart=/usr/bin/vncserver -localhost -nolisten tcp -depth 16 -geometry 1440x900 :%i&#10;ExecStop=/usr/bin/vncserver -kill :%i&#10;ExecStartPre=/bin/sleep %i&#10;&#10;[Install]&#10;WantedBy=multi-user.target&#10;</code></pre>

After you have the 2 files in place:

<pre><code class="wiki-source-code" id="source-code-6">&#10;chmod 700 /bisq/.vnc/xstartup&#10;systemctl daemon-reload&#10;systemctl enable vncserver@1&#10;sed -i -e 's/awful.layout.suit.floating/-- awful.layout.suit.floating/' /etc/xdg/awesome/rc.lua&#10;su - bisq&#10;vncpasswd # set a 8 character password for the VNC server&#10;</code></pre>

Reboot and Bisq should start within a virtual X session inside a VNC server session. SSH to the server using VNC port forwarding:

<pre><code class="wiki-source-code" id="source-code-7">&#10;ssh user@1.2.3.4 -L 5901:127.0.0.1:5901&#10;</code></pre>

Then on your home PC, start a VNC session like this:

<pre><code class="wiki-source-code" id="source-code-8">&#10;vncviewer -depth 16 -encodings tight -compresslevel 9 -quality 4 127.0.0.1:1&#10;</code></pre>

Use the 8 character password you set earlier to authenticate, and then you should see Bisq inside X windows over VNC.

</div>
