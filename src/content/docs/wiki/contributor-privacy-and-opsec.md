---
title: "Contributor privacy and opsec"
slug: "wiki/contributor-privacy-and-opsec"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#tenets">Tenets</a></li><li><a href="#steps-for-base-setup">Steps for base setup</a></li><li><a href="#tips">Tips</a></li><li><a href="#known-issues-and-warnings">Known issues and warnings</a></li><li><a href="#steps-for-accounts-setup">Steps for accounts setup</a></li><li><a href="#burning-men-considerations">Burning Men considerations</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

First of all: Bitcoin is good for you and the rest of the world, and dealing with Bitcoin is, in itself, perfectly fine and natural. This means that when you privately trade on Bisq, you are most probably doing nothing wrong, on the contrary you are furthering the ideals Bitcoin was created for, even if someone might try to convince you otherwise.

There are parties though that would rather have Bitcoin either disappear, or be turned into the ultimate mass-control tool (the latter being a very realistic scenario, given the peculiarities of the blockchain and its workings). This might, in turn, lead these parties to act in such a way that Bitcoin itself doesn\'t prosper, or projects around it disappear completely.

This is not an advanced privacy/anonymity guide, but is rather tailored to Bisq contributors and their selective need for pseudonymity, which should not impact too much on convenience unless they cover very sensitive roles (in which case they are already prepared on the matter of personal security, and do not really need this guide anyway).

Bisq contributors, as key elements for Bisq\'s well being, might be among targeted individuals, and for this, other than for best practices regarding privacy on the internet, it is advisable they act accordingly, first and foremost for their own safety, and then for Bisq\'s.

The aim of this guide is containerization, which means that a *contributor* will appear to an *adversary* (someone trying to understand who you really are, to do bad things to you) as a specific individual, traceable online as *contributor*, but hopefully (if you do things well enough) not linkable to their real identity, nor to other possible nyms *contributor* uses while participating in other projects. In other words, *adversary* will be able to tell if something on the internet has been said by *contributor*, but it should not make them any wiser about who *contributor* really is, where they live, or which other works they have done for other initiatives. We will be making Tor Browser work as a much more convenient, much less privacy hardened browser, that will still force you to connect through Tor to do whatever you need; in other words, we will use Tor Browser in a way that it is NOT intended to be used. An adversary may be able to fingerprint your browser and link activity to your identity. Tor Browser cannot guarantee anonymity, and weakening its protections may increase that risk.

Let\'s clear up some definitions:

- privacy is when someone knows who you are, but not what you do
- anonymity is when someone knows what you do, but not who you are
- pseudonymity is when someone knows \"who\" you are and what you do, but the \"who\" is an imaginary identity that exists only in its own reality, without any ties to your real or alternative identities

For more info:

- [https://github.com/BlockchainCommons/pseudonymity-guide](https://github.com/BlockchainCommons/pseudonymity-guide)
- [https://anonymousplanet.org/guide.html](https://anonymousplanet.org/guide.html)

<span class="wiki-legacy-anchor" id="Tenets" aria-hidden="true">
</span>

## Tenets {#tenets}

- I will have a Bisq nym, that will be the only one used for everything related to Bisq
- My Bisq nym will be its own person, it will not be similar to, know about the existence of, or participate in the same chats/groups/forums/activities as my real or alternative identities
- I will only use Tor for everything the Bisq nym does
- I will endure the slowness of Tor, and will NOT use my real connection nor my faster VPN to do Bisq stuff

<span class="wiki-legacy-anchor" id="Steps_for_base_setup" aria-hidden="true">
</span>

## Steps for base setup {#steps-for-base-setup}

- download Tor Browser for your OS
- have Tor Browser \"installed\" (actually it is just uncompressed in a folder with no ties to registry or system config) in a path that\'s unique to your Bisq nym
- run Tor Browser (ignore the error about restarting Tor if there is another Tor Browser open, as they will try to bind the same ports, returning an error, and close the popup) and open <code class="wiki-source-code" id="source-code-1">about:config</code> in the URL bar, say that you really want to access the options, then search for <code class="wiki-source-code" id="source-code-2">\_port</code>
- you want to edit <code class="wiki-source-code" id="source-code-3">network.proxy.socks_port</code> and <code class="wiki-source-code" id="source-code-4">extensions.torlauncher.control_port</code>, the standard values here are respectively 9150 and 9151 (standalone tor daemon is 9050 and 9051), so you can change them to 9250 and 9251, or increase them to 9350 and 9351 if you want several Tor Browser instances running at the same time (this will run a dedicated Tor circuit builder for your Bisq activity)
- keep Tor Browser’s letterboxing protection enabled; do not set \"privacy.resistFingerprinting.letterboxing\" to false, because it limits the identifying detail exposed by window dimensions
- close Tor Browser and restart it (right after this, it\'s a good time to enable the automatic connection, which means Tor Browser will build a Tor circuit right after you start it)
- go to geolocation.com in Tor Browser, verify the IP and location is different from your real ones (it will necessarily be, this is just to show you where you appear to be coming from, when using Tor) and from the one reported from any other Tor Browser you maybe already have on the system
- make sure the shield icon in top right is empty (clicking on it says \"standard\"); this will enable scripts, which are not \"safe\" for anonymity, but you want a bit of convenience to be able to use Matrix and other websites that require javascript, as long as all activity in this browser stays within your Bisq nym
- go to settings > privacy, and under \"history\" disable \"always use private browsing\", this will restart Tor Browser; after restart, return to same settings, disable cookie deletion after Tor Browser closes (so you can log back in to websites automatically), enable all logins&passwords saving, and under history enable what suits you (enable both \"remember\" for maximum convenience), then under Permissions, block requests to access camera and location. Even if you don\'t disable mic access, the microphone will still be unavailable during web calls, because of a compile-time setting of Tor Browser.

<span class="wiki-legacy-anchor" id="Tips" aria-hidden="true">
</span>

### Tips {#tips}

- sometimes Tor will become slow, really, unbearably torturing slow; stay strong, don\'t go clearnet; if all else fails, blame Tor with your correspondents, it will immediately excuse you for your unresponsiveness, and at the same time show you are very privacy-oriented and make you look really cool
- Tor Browser uses window-size protections to reduce fingerprinting; avoid weakening those protections when anonymity matters
- if a site does not load properly, consider “New Tor Circuit for this Site”; it reloads that site with a new circuit but does not clear private information or unlink activity. “New Identity” closes tabs and clears private information as well as using new circuits. Restarting Tor Browser is another option.

<span class="wiki-legacy-anchor" id="Known_issues_and_warnings" aria-hidden="true">
</span>

## Known issues and warnings {#known-issues-and-warnings}

- real anonymity does not exist, even if you could \"plug\" into the internet like rebels plugged into the Matrix, someone could still be able to trace the source of your \"signal\"; proper personal protection can be achieved based on one\'s dedication and skills, and always relative to one\'s threat model (a Bisq contributor shouldn\'t get the same attention that a whistleblower does, for example)
- it only takes one mistake, where you let a hint to your real identity slip through your pseudonym, and your whole nym is compromised, plus all of their past activity will be linked to you
- assume any online service will keep all the information about you that you allow it to obtain (browser/PC information via javascript, OS preferred language, obviously your IP, cookies.\..) and store them for the long term even after you think you deleted them
- assume that anything you do, say, or write, will be used against you, even if it was innocent and apparently inconsequential at the time
- in the above configuration, Tor Browser loses most of its specific privacy strengths, yet it\'s still very useful to have a portable, containerized browser that will only work through Tor, and builds its own Tor connection, distinct from any other Tor daemon you maybe have on your system (versus, for example, using several chromium instances tied to the same Tor proxy, which will all use the same entry and exit node, and which will be at risk of going on clearnet if for any reason the plugin you use to proxy through Tor doesn\'t do its job)
- this guide is only aimed at online protection, offering nothing in the compartment of offline security: anyone physically accessing your PC will be able to tell that you are, in fact, *contributor*, plus any other identity you might have used online, unless you also hardened your system with additional layers that will not be covered in this guide, at least for now (see Tails, Qubes, Whonix, or any other renowned tool for PC protection)

<span class="wiki-legacy-anchor" id="Steps_for_accounts_setup" aria-hidden="true">
</span>

## Steps for accounts setup {#steps-for-accounts-setup}

As a Bisq contributor, you will need at minimum a GitHub account, to be able to publish Compensation Requests. A GitHub account requires an email address, so you will need that one as well. Protonmail is one email provider that will let you register -as of now- without any KYC elements (no other email addresses nor phone numbers needed); riseup.net also offers no-kyc email, but you need an invite by another user; in case you know of similar services, please notify us and we will gladly add them in this guide. An account on matrix is also advised to access Bisq\'s space, you will register from [https://bisq.chat](https://bisq.chat) and use the same email to associate to that account, registering at [https://bisq.community](https://bisq.community) is needed to interact with the forum. An interesting customization can be to obtain an AI generated face to associate with your account, there are many services that let you get such a picture for free.

<span class="wiki-legacy-anchor" id="Burning_Men_considerations" aria-hidden="true">
</span>

## Burning Men considerations {#burning-men-considerations}

If a Bisq contributor wants to become act as one of the <span class="wiki-link-gap">Burning Ben <small>[unrecovered article: Burning Ben]</small></span> they will have additional privacy and opsec considerations.

- BSQ is inherently less private than bitcoin. BSQ can easily be traced back to a compensation request, DAO vote.
- Bitcoin accumulated from performing the role of a burning man also links it to a specific burning man address.

Both of the above points should be considered by contributors concerned about privacy and opsec.

</div>
