---
title: "Running Bisq on Linux using VNC"
slug: "wiki/running-bisq-on-linux-using-vnc"
tableOfContents: false
---

<div class="wiki-recovered-article" lang="en"><p>Install Debian 10 Linux with bare minimal packages, then run:</p>
<pre><code class="wiki-source-code" id="source-code-1">
apt-get update
apt-get install -y sudo psmisc tightvncserver awesome autocutsel
wget https://raw.githubusercontent.com/bisq-network/bisq/master/seednode/install_seednode_debian.sh
sed -i -e 's/#BITCOIN_INSTALL=false/BITCOIN_INSTALL=false/' install_seednode_debian.sh
chmod 700 install_seednode_debian.sh
./install_seednode_debian.sh
systemctl disable bisq
</code></pre>
<p>Then open <code class="wiki-source-code" id="source-code-2">/bisq/.vnc/xstartup</code> in a text editor and use this as an example startup script:</p>
<pre><code class="wiki-source-code" id="source-code-3">
#!/bin/bash
&#10;xrdb $HOME/.Xresources
xsetroot -solid black
autocutsel -fork
&#10;#export GDK_SCALE=2
&#10;awesome &amp;
&#10;sleep 2
&#10;export JAVA_OPTS="-Xms4096M -Xmx4096M"
&#10;name=bisqvnc
&#10;/bisq/bisq/bisq-desktop \
	--appName=${name} \
	--appDataDir=${name} \
	--maxConnections=16 \
	--useTorForBtc=false \
	--ignoreLocalBtcNode=true \
	--btcNodes=103.99.170.210,103.99.170.220
</code></pre>
<p>Next open <code class="wiki-source-code" id="source-code-4">/etc/systemd/system/vncserver@.service</code> in a text editor and use this as an example:</p>
<pre><code class="wiki-source-code" id="source-code-5">
[Unit]
Description=Start TightVNC server at startup
After=syslog.target network.target
&#10;[Service]
Type=forking
User=bisq
Group=bisq
WorkingDirectory=/bisq
&#10;PIDFile=/bisq/.vnc/%H:%i.pid
ExecStartPre=-/usr/bin/vncserver -kill :%i &gt; /dev/null 2&gt;&amp;1
ExecStart=/usr/bin/vncserver -localhost -nolisten tcp -depth 16 -geometry 1440x900 :%i
ExecStop=/usr/bin/vncserver -kill :%i
ExecStartPre=/bin/sleep %i
&#10;[Install]
WantedBy=multi-user.target
</code></pre>
<p>After you have the 2 files in place:</p>
<pre><code class="wiki-source-code" id="source-code-6">
chmod 700 /bisq/.vnc/xstartup
systemctl daemon-reload
systemctl enable vncserver@1
sed -i -e 's/awful.layout.suit.floating/-- awful.layout.suit.floating/' /etc/xdg/awesome/rc.lua
su - bisq
vncpasswd # set a 8 character password for the VNC server
</code></pre>
<p>Reboot and Bisq should start within a virtual X session inside a VNC server session. SSH to the server using VNC port forwarding:</p>
<pre><code class="wiki-source-code" id="source-code-7">
ssh user@1.2.3.4 -L 5901:127.0.0.1:5901
</code></pre>
<p>Then on your home PC, start a VNC session like this:</p>
<pre><code class="wiki-source-code" id="source-code-8">
vncviewer -depth 16 -encodings tight -compresslevel 9 -quality 4 127.0.0.1:1
</code></pre>
<p>Use the 8 character password you set earlier to authenticate, and then you should see Bisq inside X windows over VNC.</p>
</div>
