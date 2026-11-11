---
title: "Cloning an offer"
slug: "wiki/cloning-an-offer"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#what-is-this-difference-between-duplicating-and-offer-and-cloning-an-offer">What is this difference between duplicating and offer and cloning an offer?</a></li><li><a href="#what-are-the-advantages-of-cloning-an-offer">What are the advantages of cloning an offer?</a></li><li><a href="#what-are-the-disadvantages-of-cloning-an-offer">What are the disadvantages of cloning an offer?</a></li><li><a href="#what-offers-can-be-cloned">What offers can be cloned?</a></li><li><a href="#how-do-i-clone-an-offer">How do I clone an offer?</a></li><li><a href="#how-do-i-see-which-of-my-offers-are-cloned">How do I see which of my offers are cloned?</a></li><li><a href="#how-do-i-edit-a-cloned-offer">How do I edit a cloned offer?</a></li><li><a href="#how-many-times-can-i-clone-an-offer">How many times can I clone an offer?</a></li><li><a href="#what-happens-when-my-clone-offer-is-taken">What happens when my clone offer is taken?</a></li><li><a href="#is-there-a-way-to-create-the-same-cloned-offers-again-quickly">Is there a way to create the same cloned offers again quickly?</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en"><p><em>'Cloning an offer</em> is a feature added in Bisq v1.9.11.</p>
<p>Cloning an offer allows offer makers to use the same security deposit for multiple offers.</p>
<span class="wiki-legacy-anchor" id="What_is_this_difference_between_duplicating_and_offer_and_cloning_an_offer?" aria-hidden="true"></span><h2 id="what-is-this-difference-between-duplicating-and-offer-and-cloning-an-offer"> What is this difference between duplicating and offer and cloning an offer? </h2>
<p>Duplicating an offer creates a new transaction. Therefore, each duplicated offer has a cost in terns of a new mining and trade fee for the on-chain transaction.</p>
<p>Cloning an offer uses the original deposit transaction of the cloned offer to create a new offer that shares the original deposit transaction, therefore, no additional on chain transaction or fees are needed.</p>
<span class="wiki-legacy-anchor" id="What_are_the_advantages_of_cloning_an_offer?" aria-hidden="true"></span><h2 id="what-are-the-advantages-of-cloning-an-offer"> What are the advantages of cloning an offer? </h2>
<p>The advantages of cloning an offer are the ability to create more offers for different payment methods and/or different currencies increasing the likelihood that someone will take your offer.</p>
<p>For example if you are in the US and happy to accept payment by ACH, Strike, Wire, or Zelle, you could clone your offer to show all 4 of these payment methods without paying to create an additional offer. This will result in 4 offers been shown in the Bisq offer book and increase the chance that your offer is taken quickly.</p>
<span class="wiki-legacy-anchor" id="What_are_the_disadvantages_of_cloning_an_offer?" aria-hidden="true"></span><h2 id="what-are-the-disadvantages-of-cloning-an-offer"> What are the disadvantages of cloning an offer? </h2>
<p>The disadvantages of cloning an offer is that once your cloned offer is taken all associated clones (those that share the same deposit transaction fee) will disappear from the Bisq offer book.</p>
<span class="wiki-legacy-anchor" id="What_offers_can_be_cloned?" aria-hidden="true"></span><h2 id="what-offers-can-be-cloned"> What offers can be cloned? </h2>
<p>Any maker offer can be cloned, excluding BSQ swaps.</p>
<p>Clones MUST be for a different payment method and/or currency.</p>
<p>For example you cannot create 5 Zelle clones (as these would all be for USD and Zell)</p>
<p>You could however create 5 Revolut clones for USD, EUR, AUD, GBP, CAD (as these would be for the same payment method but importantly 5 different currencies).</p>
<p>You could also create multiple clones of the same currency offers provding you use different payment methods for example a EUR trade for; SEPA, SEPA Instant, TransferWise, Revolut.</p>
<span class="wiki-legacy-anchor" id="How_do_I_clone_an_offer?" aria-hidden="true"></span><h2 id="how-do-i-clone-an-offer"> How do I clone an offer? </h2>
<p>There are two ways to clone an offer:</p>
<ul>
<li>Right click the offer in 'Open Offer' and click clone offer.</li>
<li>Go to open offers and press the square clone icon on the right the offer.</li>
</ul>
<span class="wiki-legacy-anchor" id="How_do_I_see_which_of_my_offers_are_cloned?" aria-hidden="true"></span><h2 id="how-do-i-see-which-of-my-offers-are-cloned"> How do I see which of my offers are cloned? </h2>
<p>Cloned offers share the same maker fee. You can see what maker fees each of your offer have in 'Open Offers' under the 'Maker fee' column.</p>
<span class="wiki-legacy-anchor" id="How_do_I_edit_a_cloned_offer?" aria-hidden="true"></span><h2 id="how-do-i-edit-a-cloned-offer"> How do I edit a cloned offer? </h2>
<p>You can edit a cloned offer just like any other offer. click the pencil icon next to the offer in 'Open Offers'</p>
<p>NB: Cloned offers share the BTC same amount, and must have different payment methods and/or currencies used for them. You will see a warning message if you try and change anything that cannot be changed.</p>
<span class="wiki-legacy-anchor" id="How_many_times_can_I_clone_an_offer?" aria-hidden="true"></span><h2 id="how-many-times-can-i-clone-an-offer"> How many times can I clone an offer? </h2>
<p>You can clone an offer 10 times. You will get an error message if you try and clone an offer more than 10 times.</p>
<p>You can however have multiple offers and clone them each up to 10 times.</p>
<span class="wiki-legacy-anchor" id="What_happens_when_my_clone_offer_is_taken?" aria-hidden="true"></span><h2 id="what-happens-when-my-clone-offer-is-taken"> What happens when my clone offer is taken? </h2>
<p>When your cloned offer is taken you will see it in your 'Open Trades' the same as if any of your other offers were taken.</p>
<p>The clones of the offer sharing the same maker fee will then disappear from your 'Open Offers' and the Bisq offer book.</p>
<span class="wiki-legacy-anchor" id="Is_there_a_way_to_create_the_same_cloned_offers_again_quickly?" aria-hidden="true"></span><h2 id="is-there-a-way-to-create-the-same-cloned-offers-again-quickly"> Is there a way to create the same cloned offers again quickly? </h2>
<p>Not currently, for now you will need to re-add your cloned offers manually.</p>
</div>
