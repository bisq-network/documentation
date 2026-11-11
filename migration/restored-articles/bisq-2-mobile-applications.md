---
title: "Bisq 2 mobile applications"
slug: "wiki/bisq-2-mobile-applications"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#bisq-easy-mobile">Bisq Easy Mobile</a></li><li><a href="#bisq-connect">Bisq Connect</a></li><li><a href="#notes">Notes</a></li><li><a href="#future-development">Future Development</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en"><p>The mobile ecosystem of Bisq 2 allows access to the <a href="../bisq-easy/">Bisq Easy</a> protocol from a smartphone, via two applications:</p>
<ul>
<li>Bisq Easy Mobile (Android only)</li>
<li>Bisq Connect (Android and iOS)</li>
</ul>
<span class="wiki-legacy-anchor" id="Bisq_Easy_Mobile" aria-hidden="true"></span><h2 id="bisq-easy-mobile"> Bisq Easy Mobile </h2>
<p>Bisq Easy Mobile is a full Bisq Easy node running on your Android device. It features the complete p2p network stack and connects with its own onion address.</p>
<p>It provides the same privacy and security as the Bisq 2 desktop application.</p>
<p>It is primarily suited for buyers who:</p>
<ul>
<li>want to buy their first sats</li>
<li>prefer not to use a desktop computer</li>
</ul>
<p>Pros:</p>
<ul>
<li>Runs a full Bisq Easy node</li>
<li>Does not require a separate device</li>
</ul>
<p>Cons:</p>
<ul>
<li>Available for Android only</li>
<li>Higher battery, bandwidth, and resource usage</li>
<li>App may lose connectivity when moved to background, and reconnection can take time</li>
<li>No synchronization or interoperability with a desktop instance</li>
<li>Users must manually manage backups</li>
</ul>
<span class="wiki-legacy-anchor" id="Bisq_Connect" aria-hidden="true"></span><h2 id="bisq-connect"> Bisq Connect </h2>
<p>Bisq Connect is a lightweight companion app that allows you to remotely access and control a Bisq 2 node running elsewhere.</p>
<p>It is available for both Android and iOS (via TestFlight).</p>
<p>Instead of running a node locally, the app connects to a backend node, which can be:</p>
<ul>
<li>your own Bisq 2 desktop application</li>
<li>a Bisq 2 node running on a headless machine or VPS</li>
<li>a node operated by a trusted third party</li>
</ul>
<p>The mobile app acts as a remote interface, allowing you to monitor and manage your node from your phone.</p>
<p>Features:</p>
<ul>
<li>Pairing via QR code</li>
<li>Real-time market data</li>
<li>Push notifications</li>
<li>Private P2P messaging</li>
<li>Built-in Tor support</li>
<li>Open-source and auditable</li>
</ul>
<p>Pros:</p>
<ul>
<li>Available on both Android and iOS</li>
<li>Low resource and battery usage</li>
<li>Seamless access to the same data across devices when self-hosted</li>
<li>No need for mobile backups (data is stored on the backend node)</li>
<li>Mobile app can be closed without affecting node operation</li>
</ul>
<p>Cons:</p>
<ul>
<li>Requires a running backend node</li>
<li>Using a third-party node requires trust in the operator, as all data is hosted on that node</li>
</ul>
<span class="wiki-legacy-anchor" id="Notes" aria-hidden="true"></span><h2 id="notes"> Notes </h2>
<p>On iOS, Bisq Connect is currently distributed via Apple TestFlight and requires iOS 16.0 or higher.</p>
<p>TestFlight builds expire after 90 days, but updates are released regularly.</p>
<span class="wiki-legacy-anchor" id="Future_Development" aria-hidden="true"></span><h2 id="future-development"> Future Development </h2>
<p>Bisq Easy Mobile will not support the upcoming MuSig protocol.</p>
<p>Bisq Connect is the likely platform for supporting new protocols, depending on development priorities and user demand.</p>
</div>
