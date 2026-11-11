---
title: "How to run pricenode"
slug: "wiki/how-to-run-pricenode"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#overview">Overview</a></li><li><a href="#prerequisites">Prerequisites</a></li><li><a href="#setup-and-installation">Setup and Installation</a></li><li><a href="#method-1-installation-script-recommended-for-debian-ubuntu">Method 1: Installation Script (Recommended for Debian/Ubuntu)</a></li><li><a href="#method-2-build-from-source">Method 2: Build from Source</a></li><li><a href="#running-and-managing">Running and Managing</a></li><li><a href="#testing">Testing</a></li><li><a href="#becoming-a-default-operator">Becoming a Default Operator</a></li><li><a href="#monitoring">Monitoring</a></li><li><a href="#compensation">Compensation</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en"><p>A <strong>Bisq Pricenode</strong> is a service that provides essential market data to Bisq clients. It fetches cryptocurrency exchange rates (e.g., BTC/USD, BTC/EUR) and Bitcoin network mining fee estimations from various external providers and relays this aggregated data to Bisq users upon request.</p>
<p>Pricenodes run as <span class="wiki-link-gap">Tor <small>[unrecovered article: Tor]</small></span> hidden services. This allows Bisq clients to retrieve price and fee data without revealing their IP address or connecting outside the Tor network, thus preserving user privacy.</p>
<p>While anyone with the technical capability can run a pricenode for personal use (e.g., configuring their client via <a href="../command-line-options/">command-line arguments</a>), the Bisq application by default connects to a list of nodes run by established, <a href="../introduction-to-the-dao/">DAO</a>-approved contributors who meet certain reliability standards and are <strong>required to be bonded</strong>.</p>
<aside class="wiki-admonition" role="note"><p><strong>Note</strong></p><p><strong>Note:</strong> In the <a href="../bisq-2-roles/">Bisq 2 Roles</a> framework, this function may be referred to as the <strong>Market Price Node</strong>.</p>
</aside>
<p>The primary source for the pricenode software and technical details is the <a href="https://github.com/bisq-network/bisq-pricenode" rel="noopener noreferrer">official GitHub repository</a>. This guide summarizes the key steps based on that repository.</p>
<span class="wiki-legacy-anchor" id="Overview" aria-hidden="true"></span><h2 id="overview"> Overview </h2>
<p>The pricenode software runs a simple HTTP service, typically listening on `localhost:8080`, with key endpoints including:</p>
<ul>
<li>`<code class="wiki-source-code" id="source-code-1">/getAllMarketPrices</code>`: Returns current BTC exchange rates against various fiat currencies and altcoins.</li>
<li>`<code class="wiki-source-code" id="source-code-2">/getFees</code>`: Returns current estimates for Bitcoin transaction fees (in satoshis/vByte) for different confirmation targets.</li>
<li>`<code class="wiki-source-code" id="source-code-3">/getParams</code>`, `<code class="wiki-source-code" id="source-code-4">/info</code>`: Provide metadata and status information about the node.</li>
</ul>
<span class="wiki-legacy-anchor" id="Prerequisites" aria-hidden="true"></span><h2 id="prerequisites"> Prerequisites </h2>
<p>Running a pricenode requires a stable environment, typically a server or VPS:</p>
<ul>
<li><strong>Operating System:</strong> Linux (Debian/Ubuntu preferred, as automated scripts are available).</li>
<li><strong>Java:</strong> A compatible Java Runtime Environment (JRE) is needed to run the application. (Check the GitHub repository for current version requirements).</li>
<li><strong>Tor:</strong> The `tor` binary must be installed and operational for running as a hidden service.</li>
<li><strong>System Resources:</strong> While not extremely resource-intensive, reliable uptime, sufficient RAM (e.g., 1GB+), disk space (~10GB), and network bandwidth (~1TB/month might be a starting point) are needed. Official requirements may be specified on the <a href="../pricenode-operator/">Pricenode Operator</a> role page.</li>
</ul>
<span class="wiki-legacy-anchor" id="Setup_and_Installation" aria-hidden="true"></span><h2 id="setup-and-installation"> Setup and Installation </h2>
<p>The recommended method for Debian-based systems like Ubuntu is the automated install script. Advanced users or those on other systems can build from source.</p>
<span class="wiki-legacy-anchor" id="Method_1:_Installation_Script_(Recommended_for_Debian/Ubuntu)" aria-hidden="true"></span><h3 id="method-1-installation-script-recommended-for-debian-ubuntu"> Method 1: Installation Script (Recommended for Debian/Ubuntu) </h3>
<p>This script automates the installation of dependencies, building the software, configuring the Tor hidden service, and setting up the pricenode to run as a system service.</p>
<ol>
<li>Ensure `curl` and `sudo` are available: `sudo apt update &amp;&amp; sudo apt install curl`</li>
<li>Run the installer script:</li>
</ol>
<p><code>curl -s <code class="wiki-source-code" id="source-code-5">https://raw.githubusercontent.com/bisq-network/bisq-pricenode/main/scripts/install_pricenode_debian.sh</code> | sudo bash</code></p>
<ol>
<li>Follow any prompts from the script.</li>
<li>**Important:** At the end of the script, it should output your node's unique **Tor `.onion` address**. Record this address carefully, especially if you plan to use the node yourself or apply to become a default operator. You will also need to <a href="../backing-up-application-data/#export-tor-state">back up the hidden service's private key</a> (`/var/lib/tor/hidden_service/private_key` or similar, depending on Tor setup).</li>
</ol>
<span class="wiki-legacy-anchor" id="Method_2:_Build_from_Source" aria-hidden="true"></span><h3 id="method-2-build-from-source"> Method 2: Build from Source </h3>
<p>This method requires manual setup of dependencies and Tor configuration.</p>
<ol>
<li>Install Git and a compatible JDK. (Check the GitHub repository for current version requirements).</li>
<li>Clone the repository (including submodules):</li>
</ol>
<p><code>git clone --recursive <code class="wiki-source-code" id="source-code-6">https://github.com/bisq-network/bisq-pricenode.git</code></code><br>
<code>cd bisq-pricenode</code></p>
<ol>
<li>Build the application using Gradle:</li>
</ol>
<p><code>./gradlew clean build</code></p>
<ol>
<li>Manually configure <span class="wiki-link-gap">Tor <small>[unrecovered article: Tor]</small></span> to create a hidden service that points to the pricenode's listening port (default 8080). Consult the official Tor documentation for setting up onion services.</li>
<li>Determine how to run the built Java application persistently (e.g., using `screen`, `tmux`, or creating your own `systemd` service).</li>
</ol>
<span class="wiki-legacy-anchor" id="Running_and_Managing" aria-hidden="true"></span><h2 id="running-and-managing"> Running and Managing </h2>
<p>If you used the installation script (Method 1), the pricenode should be running as a `systemd` service named `bisq-pricenode`. You can manage it with standard commands:</p>
<ul>
<li>Check Status: `<code class="wiki-source-code" id="source-code-7">sudo systemctl status bisq-pricenode</code>`</li>
<li>Stop Service: `<code class="wiki-source-code" id="source-code-8">sudo systemctl stop bisq-pricenode</code>`</li>
<li>Start Service: `<code class="wiki-source-code" id="source-code-9">sudo systemctl start bisq-pricenode</code>`</li>
<li>Restart Service: `<code class="wiki-source-code" id="source-code-10">sudo systemctl restart bisq-pricenode</code>`</li>
<li>View Logs (live): `<code class="wiki-source-code" id="source-code-11">journalctl -u bisq-pricenode -f</code>`</li>
</ul>
<p>If you built from source (Method 2), you are responsible for starting, stopping, and managing the Java process using your chosen method (e.g., `screen`, `tmux`, manual execution).</p>
<span class="wiki-legacy-anchor" id="Testing" aria-hidden="true"></span><h2 id="testing"> Testing </h2>
<p>You can test if your node is running correctly by querying its endpoints using `curl` or a similar tool.</p>
<ul>
<li><strong>Locally (if installed via script):</strong></li>
</ul>
<p>Check if the node is responding on the default local port:</p>
<p><code>curl <code class="wiki-source-code" id="source-code-12">http://localhost:8080/getAllMarketPrices</code></code><br>
<code>curl <code class="wiki-source-code" id="source-code-13">http://localhost:8080/getFees</code></code></p>
<ul>
<li><strong>Over Tor (replace with your node's address):</strong></li>
</ul>
<p>Use `torsocks` (or configure Tor as a system proxy) to query your node's `.onion` address (replace `YOUR_ONION_ADDRESS.onion` with the actual address):</p>
<p><code>torsocks curl <code class="wiki-source-code" id="source-code-14">http://YOUR_ONION_ADDRESS.onion/getAllMarketPrices</code></code><br>
<code>torsocks curl <code class="wiki-source-code" id="source-code-15">http://YOUR_ONION_ADDRESS.onion/getFees</code></code></p>
<p>Successful queries should return JSON formatted data containing price and fee information.</p>
<span class="wiki-legacy-anchor" id="Becoming_a_Default_Operator" aria-hidden="true"></span><h2 id="becoming-a-default-operator"> Becoming a Default Operator </h2>
<p>Running a pricenode doesn't automatically make it used by other Bisq clients. To become one of the default nodes hardcoded in the Bisq software, you generally need to:</p>
<ol>
<li>Apply for the <a href="../pricenode-operator/">Pricenode Operator</a> role.</li>
<li>Gain <a href="../introduction-to-the-dao/">DAO</a> approval through voting.</li>
<li>Set up the required <a href="../introduction-to-the-dao/">BSQ</a> bond (currently <strong>10,000 BSQ</strong>).</li>
<li>Meet reliability and uptime standards.</li>
<li>Set up mandatory <a href="../how-to-run-pricenode/#monitoring">monitoring</a> systems.</li>
</ol>
<p>Contact current maintainers or check the `#pricenode` channel on Matrix/Discord for details on the current application process.</p>
<span class="wiki-legacy-anchor" id="Monitoring" aria-hidden="true"></span><h2 id="monitoring"> Monitoring </h2>
<p>Operators whose nodes are included in the default list within Bisq releases are required to set up monitoring using `collectd` and provide network size data. This involves running additional setup scripts found in the GitHub repository's README (<a href="https://github.com/bisq-network/bisq-pricenode#monitoring" rel="noopener noreferrer">see Monitoring section</a>) and coordinating with the Bisq monitoring team.</p>
<span class="wiki-legacy-anchor" id="Compensation" aria-hidden="true"></span><h2 id="compensation"> Compensation </h2>
<p>Approved <a href="../pricenode-operator/">Pricenode Operators</a> who maintain reliable nodes included in the default list can request compensation from the Bisq DAO for their service and hosting costs.</p>
<ul>
<li>The current compensation rate is <strong>130 USD per DAO cycle</strong> (paid in <a href="../bsq/">BSQ</a>).</li>
<li>The significant initial effort for setting up the node, Tor, monitoring, and the bonding process may also be justifiable for a one-time setup <a href="../making-a-compensation-request/">compensation request</a>.</li>
</ul>
</div>
