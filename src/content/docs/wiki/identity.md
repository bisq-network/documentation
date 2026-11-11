---
title: "Identity"
slug: "wiki/identity"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#what-are-identities-in-bisq-2">What are Identities in Bisq 2</a></li><li><a href="#what-trade-protocols-will-use-identities">What Trade Protocols will use Identities</a></li><li><a href="#building-reputation-for-your-identities">Building reputation for your Identities</a></li><li><a href="#benefits-of-identities">Benefits of Identities</a></li><li><a href="#negatives-of-identities">Negatives of Identities</a></li><li><a href="#how-many-identities-should-you-use">How many identities should you use</a></li><li><a href="#creating-an-identity">Creating an Identity</a></li><li><a href="#switching-between-identities">Switching between Identities</a></li><li><a href="#deleting-an-identity">Deleting an Identity</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

Bisq 2 users are able to manage multiple identities for their trades.

At Bisq 2 launch in March 2024, the identities

<span class="wiki-legacy-anchor" id="What_are_Identities_in_Bisq_2" aria-hidden="true">
</span>

## What are Identities in Bisq 2 {#what-are-identities-in-bisq-2}

Identities in Bisq 2 allow users to create multiple identifies that can be totally independent of each other. Each identity in Bisq 2 has it\'s own unique onion address (this allows for users to receive and broadcast information over the [Tor hidden service network](https://www.torproject.org/)). Each identity will have it\'s own:

- Username (chosen by the user)
- Avatar (chosen by the user)
- Onion address (chosen by the software)
- Profile ID (chosen by the software)

In [Bisq 1](../bisq-1/) to achieve multiple identities a user would have to have multiple Bisq instances. With Bisq 2 multiple identities can be created and used via just the one instance of Bisq 2. This allows for easy switching between profiles and having different types of trades, payment methods, protocols utilized by various profiles. This will give users greater control over their privacy

<span class="wiki-legacy-anchor" id="What_Trade_Protocols_will_use_Identities" aria-hidden="true">
</span>

## What Trade Protocols will use Identities {#what-trade-protocols-will-use-identities}

Currently it will just be [Bisq Easy](../bisq-easy/) as that is the only available protocol on Bisq 2.

<span class="wiki-legacy-anchor" id="Building_reputation_for_your_Identities" aria-hidden="true">
</span>

## Building reputation for your Identities {#building-reputation-for-your-identities}

Currently it will only be bitcoin sellers on Bisq Easy that will be interested in building up reputation specific to their identity/s. For more information see: [reputation](../reputation/).

<span class="wiki-legacy-anchor" id="Benefits_of_Identities" aria-hidden="true">
</span>

## Benefits of Identities {#benefits-of-identities}

The benefits of being able to have multiple identities means that a user has greater control over their privacy.

A user could have:

Profile 1: Used for buying bitcoin Profile 2: Used for selling bitcoin

OR

Profile 1: Used for buying bitcoin with a personal account Profile 2: Used for buying bitcoin with a business account Profile 3: Used for buying bitcoin with a spouses account

OR

Profile 1: Used for selling bitcoin for Euros Profile 2: Used for selling bitcoin for British Pounds Profile 3: Used for selling bitcoin for US Dollars

OR

Profile 1: Used for buying bitcoin on Bisq Easy Profile 2: Used for atomic swap protocols

Allowing the creation of different multiple identities gives users complete control over what information / data they want to assign to which profile. Before deleting a profile, preserve its application data and complete any open offers, trades, disputes and private conversations. The v2.1.15 identity service warns that deletion is unsafe with open private chats or messages.

<span class="wiki-legacy-anchor" id="Negatives_of_Identities" aria-hidden="true">
</span>

## Negatives of Identities {#negatives-of-identities}

[Reputation](../reputation/) built up overtime for bitcoin sellers on [Bisq Easy](../bisq-easy/) is specific to a specific identity. This means that bitcoin sellers on Bisq Easy will become invested in building up their identities reputation. This is positive for the protocol as a reputation built over time is what gives the protocol it\'s security mechanism, however for seller\'s it means that establishing a new identity will have to be done from scratch.

Although identities give the user a separate; username, avatar, onion address, an profile ID, it does not prevent a user from mistaken linking their identities by associating their fiat accounts with their separate identities. When creating a new identity the user should be aware of what fiat information they are happy to link to each identity.

<span class="wiki-legacy-anchor" id="How_many_identities_should_you_use" aria-hidden="true">
</span>

## How many identities should you use {#how-many-identities-should-you-use}

It is entirely up to the user of Bisq 2 to decide how many profiles they will need. It is expected most users will just create the one profile. However the option is there for users that want to create more for privacy or other reasons.

<span class="wiki-legacy-anchor" id="Creating_an_Identity" aria-hidden="true">
</span>

## Creating an Identity {#creating-an-identity}

Bisq 2 will prompt you to create an identity when you first run the software.

To create an additional identity click on \'User options\' > \'User profile\' > \'Create new profile\'

<span class="wiki-legacy-anchor" id="Switching_between_Identities" aria-hidden="true">
</span>

## Switching between Identities {#switching-between-identities}

It is easy to switch between identifies by clicking on the profile avatar on the top right of Bisq 2 and selecting the profile (identity) desired. When sending messages be sure to check the correct profile is selected.

<span class="wiki-legacy-anchor" id="Deleting_an_Identity" aria-hidden="true">
</span>

## Deleting an Identity {#deleting-an-identity}

You can delete an identity by selecting the identity you want to delete and then clicking on \'User options\' > \'User profile\' > \'delete profile\'

You cannot delete an identity if you only have one identity.

Be-aware that deleting an identity also deletes any associated reputation it has.

</div>
