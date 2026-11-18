---
title: "How to run pricenode"
slug: "wiki/how-to-run-pricenode"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#overview">Overview</a></li><li><a href="#prerequisites">Prerequisites</a></li><li><a href="#setup-and-installation">Setup and Installation</a></li><li><a href="#method-1-installation-script-recommended-for-debian-ubuntu">Method 1: Installation Script (Recommended for Debian/Ubuntu)</a></li><li><a href="#method-2-build-from-source">Method 2: Build from Source</a></li><li><a href="#running-and-managing">Running and Managing</a></li><li><a href="#testing">Testing</a></li><li><a href="#becoming-a-default-operator">Becoming a Default Operator</a></li><li><a href="#monitoring">Monitoring</a></li><li><a href="#compensation">Compensation</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

A **Bisq Pricenode** is a service that provides essential market data to Bisq clients. It fetches cryptocurrency exchange rates (e.g., BTC/USD, BTC/EUR) and Bitcoin network mining fee estimations from various external providers and relays this aggregated data to Bisq users upon request.

Pricenodes run as <span class="wiki-link-gap">Tor <small>[unrecovered article: Tor]</small></span> hidden services. This allows Bisq clients to retrieve price and fee data without revealing their IP address or connecting outside the Tor network, thus preserving user privacy.

While anyone with the technical capability can run a pricenode for personal use (e.g., configuring their client via [command-line arguments](../command-line-options/)), the Bisq application by default connects to a list of nodes run by established, [DAO](../introduction-to-the-dao/)-approved contributors who meet certain reliability standards and are **required to be bonded**.

<aside class="wiki-admonition" role="note">

**Note**

**Note:** In the [Bisq 2 Roles](../bisq-2-roles/) framework, this function may be referred to as the **Market Price Node**.

</aside>

The primary source for the pricenode software and technical details is the [official GitHub repository](https://github.com/bisq-network/bisq-pricenode). This guide summarizes the key steps based on that repository.

<span class="wiki-legacy-anchor" id="Overview" aria-hidden="true">
</span>

## Overview {#overview}

The pricenode software runs a simple HTTP service, typically listening on \`localhost:8080\`, with key endpoints including:

- \`<code class="wiki-source-code" id="source-code-1">/getAllMarketPrices</code>\`: Returns current BTC exchange rates against various fiat currencies and altcoins.
- \`<code class="wiki-source-code" id="source-code-2">/getFees</code>\`: Returns current estimates for Bitcoin transaction fees (in satoshis/vByte) for different confirmation targets.
- \`<code class="wiki-source-code" id="source-code-3">/getParams</code>\`, \`<code class="wiki-source-code" id="source-code-4">/info</code>\`: Provide metadata and status information about the node.

<span class="wiki-legacy-anchor" id="Prerequisites" aria-hidden="true">
</span>

## Prerequisites {#prerequisites}

Running a pricenode requires a stable environment, typically a server or VPS:

- **Operating System:** Linux (Debian/Ubuntu preferred, as automated scripts are available).
- **Java:** A compatible Java Runtime Environment (JRE) is needed to run the application. (Check the GitHub repository for current version requirements).
- **Tor:** The \`tor\` binary must be installed and operational for running as a hidden service.
- **System Resources:** While not extremely resource-intensive, reliable uptime, sufficient RAM (e.g., 1GB+), disk space (\~10GB), and network bandwidth (\~1TB/month might be a starting point) are needed. Official requirements may be specified on the [Pricenode Operator](../pricenode-operator/) role page.

<span class="wiki-legacy-anchor" id="Setup_and_Installation" aria-hidden="true">
</span>

## Setup and Installation {#setup-and-installation}

The recommended method for Debian-based systems like Ubuntu is the automated install script. Advanced users or those on other systems can build from source.

<span class="wiki-legacy-anchor" id="Method_1:_Installation_Script_(Recommended_for_Debian/Ubuntu)" aria-hidden="true">
</span>

### Method 1: Installation Script (Recommended for Debian/Ubuntu) {#method-1-installation-script-recommended-for-debian-ubuntu}

This script automates the installation of dependencies, building the software, configuring the Tor hidden service, and setting up the pricenode to run as a system service. Before running it, review the exact script and its system changes. At upstream commit c1576ab976b2403b7858c84e6396962ad84ba467, the installer installs OpenJDK 11 while the Gradle build specifies Java 21; resolve this discrepancy with maintainers before deployment.

1. Ensure \`curl\` and \`sudo\` are available: \`sudo apt update && sudo apt install curl\`
2. Run the installer script:

<p><code>curl -s <code class="wiki-source-code" id="source-code-5">https://raw.githubusercontent.com/bisq-network/bisq-pricenode/main/scripts/install_pricenode_debian.sh</code> | sudo bash</code></p>

1. Follow any prompts from the script.
2. \*\*Important:\*\* At the end of the script, it should output your node\'s unique \*\*Tor \`.onion\` address\*\*. Record this address carefully, especially if you plan to use the node yourself or apply to become a default operator. You will also need to [back up the hidden service\'s private key](../backing-up-application-data/#export-tor-state) (\`/var/lib/tor/hidden_service/private_key\` or similar, depending on Tor setup).

<span class="wiki-legacy-anchor" id="Method_2:_Build_from_Source" aria-hidden="true">
</span>

### Method 2: Build from Source {#method-2-build-from-source}

This method requires manual setup of dependencies and Tor configuration.

1. Install Git and a compatible JDK. (Check the GitHub repository for current version requirements).
2. Clone the repository (including submodules):

<p><code>git clone --recursive <code class="wiki-source-code" id="source-code-6">https://github.com/bisq-network/bisq-pricenode.git</code></code><br>
<code>cd bisq-pricenode</code></p>

1. Build the application using Gradle:

`./gradlew clean build`

1. Manually configure <span class="wiki-link-gap">Tor <small>[unrecovered article: Tor]</small></span> to create a hidden service that points to the pricenode\'s listening port (default 8080). Consult the official Tor documentation for setting up onion services.
2. Determine how to run the built Java application persistently (e.g., using \`screen\`, \`tmux\`, or creating your own \`systemd\` service).

<span class="wiki-legacy-anchor" id="Running_and_Managing" aria-hidden="true">
</span>

## Running and Managing {#running-and-managing}

If you used the installation script (Method 1), the pricenode should be running as a \`systemd\` service named \`bisq-pricenode\`. You can manage it with standard commands:

- Check Status: \`<code class="wiki-source-code" id="source-code-7">sudo systemctl status bisq-pricenode</code>\`
- Stop Service: \`<code class="wiki-source-code" id="source-code-8">sudo systemctl stop bisq-pricenode</code>\`
- Start Service: \`<code class="wiki-source-code" id="source-code-9">sudo systemctl start bisq-pricenode</code>\`
- Restart Service: \`<code class="wiki-source-code" id="source-code-10">sudo systemctl restart bisq-pricenode</code>\`
- View Logs (live): \`<code class="wiki-source-code" id="source-code-11">journalctl -u bisq-pricenode -f</code>\`

If you built from source (Method 2), you are responsible for starting, stopping, and managing the Java process using your chosen method (e.g., \`screen\`, \`tmux\`, manual execution).

<span class="wiki-legacy-anchor" id="Testing" aria-hidden="true">
</span>

## Testing {#testing}

You can test if your node is running correctly by querying its endpoints using \`curl\` or a similar tool.

- **Locally (if installed via script):**

Check if the node is responding on the default local port:

<p><code>curl <code class="wiki-source-code" id="source-code-12">http://localhost:8080/getAllMarketPrices</code></code><br>
<code>curl <code class="wiki-source-code" id="source-code-13">http://localhost:8080/getFees</code></code></p>

- **Over Tor (replace with your node\'s address):**

Use \`torsocks\` (or configure Tor as a system proxy) to query your node\'s \`.onion\` address (replace \`YOUR_ONION_ADDRESS.onion\` with the actual address):

<code>torsocks curl <code class="wiki-source-code" id="source-code-14">http://YOUR_ONION_ADDRESS.onion/getAllMarketPrices</code></code>\
<code>torsocks curl <code class="wiki-source-code" id="source-code-15">http://YOUR_ONION_ADDRESS.onion/getFees</code></code>

Successful queries should return JSON formatted data containing price and fee information.

<span class="wiki-legacy-anchor" id="Becoming_a_Default_Operator" aria-hidden="true">
</span>

## Becoming a Default Operator {#becoming-a-default-operator}

Running a pricenode doesn\'t automatically make it used by other Bisq clients. To become one of the default nodes hardcoded in the Bisq software, you generally need to:

1. Apply for the [Pricenode Operator](../pricenode-operator/) role.
2. Gain [DAO](../introduction-to-the-dao/) approval through voting.
3. Set up the required [BSQ](../introduction-to-the-dao/) bond (currently **10,000 BSQ**).
4. Meet reliability and uptime standards.
5. Set up mandatory [monitoring](../how-to-run-pricenode/#monitoring) systems.

Contact current maintainers or check the \`#pricenode\` channel on Matrix/Discord for details on the current application process.

<span class="wiki-legacy-anchor" id="Monitoring" aria-hidden="true">
</span>

## Monitoring {#monitoring}

Operators whose nodes are included in the default list within Bisq releases are required to set up monitoring using \`collectd\` and provide network size data. This involves running additional setup scripts found in the GitHub repository\'s README ([see Monitoring section](https://github.com/bisq-network/bisq-pricenode#monitoring)) and coordinating with the Bisq monitoring team.

<span class="wiki-legacy-anchor" id="Compensation" aria-hidden="true">
</span>

## Compensation {#compensation}

Approved [Pricenode Operators](../pricenode-operator/) who maintain reliable nodes included in the default list can request compensation from the Bisq DAO for their service and hosting costs.

- The current compensation rate is **130 USD per DAO cycle** (paid in [BSQ](../bsq/)).
- The significant initial effort for setting up the node, Tor, monitoring, and the bonding process may also be justifiable for a one-time setup [compensation request](../making-a-compensation-request/).

</div>
