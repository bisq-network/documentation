---
title: "Arbitration"
slug: "wiki/arbitration"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#process">Process</a></li><li><a href="#process-in-detail">Process, In Detail</a></li><li><a href="#pre-v1-2-trade-protocol">Pre v1.2 Trade Protocol</a></li><li><a href="#post-1-2-trade-protocol">Post 1.2 Trade Protocol</a></li><li><a href="#time-locked-delayed-payout-payout-transaction">Time-Locked Delayed Payout Payout Transaction</a></li><li><a href="#avoiding-fraud">Avoiding Fraud</a></li><li><a href="#donation-address-owners-burningmen">Donation Address Owners (burningmen)</a></li><li><a href="#why-we-cannot-merge-the-arbitrator-and-burningman-roles">Why We Cannot Merge the Arbitrator and BurningMan Roles</a></li><li><a href="#faq">FAQ</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

**Arbitration** refers to the last stage of the dispute resolution process—it\'s what takes place in case trader chat and [mediation](../mediation/) fail to resolve a dispute.

<p>This page first covers the arbitration process itself, in a practical sense, so that users can be made aware of what to expect when trading. Then it covers the process in more detail, including its motivations, how all the components work together, and how the process is expected to develop in the future.</p>
<span class="wiki-template-gap" role="note"><strong>[Unresolved template: ArbitrationCompensationTable]</strong> <code>{{ArbitrationCompensationTable}}</code></span>

<span class="wiki-legacy-anchor" id="Process" aria-hidden="true">
</span>

## Process {#process}

Bisq\'s arbitration process is a thoroughly decentralized approach to handling disputes between 2 strangers on the internet: one in which no user needs to trust a third party with authority over their funds, but one in which a user can still expect a satisfactory outcome if they have followed the Bisq [trading rules](../trading-rules/).

Arbitration is only available when:

- one or both traders reject a [mediator’s](../mediation/) suggested payout
- the time-locked delayed payout transaction is published

A *time-locked delayed payout transaction* is signed (but not published) at the beginning of the trade process. Its purpose is to allow time for traders and mediators to work out a payout using the funds in the 2-of-2 multisig escrow, and to eliminate the [possibility of fraud](../arbitration/#avoiding-fraud) in case they can\'t.

Requesting arbitration publishes this time-locked transaction, sending all funds in the multisig escrow (i.e., those of both trading peers) to the Bisq \"donation addresses\" (which are owned by the [Burning Men](../burning-men/), Bisq contributors who burn BSQ in advance). This transaction can only be published 10 days after the deposit transaction is confirmed (for altcoin trades) and 20 days after the deposit transaction is confirmed (for fiat trades), which means arbitration is only available after this time has passed.

[Burning Men](../burning-men/) burn BSQ after estimating how many BTC from trading fees and delayed payouts will be during a cycle, and a filter controlled by the DAO distributes the BTC in proportion to how many BSQ have been burned. This keeps BSQ supply balanced, allowing for a corresponding amount of new BSQ to be issued to account for the BTC payouts made to traders as part of arbitration. As a result, BSQ supply is largely unaffected.

This dynamic essentially enables a sort of mutually assured destruction to drive dispute resolution on Bisq without trusted third parties.

**In plain language, here\'s how the process works for traders:**

1. If you’re dissatisfied with the mediator’s suggestion and think you are entitled to a better outcome, request arbitration when it\'s available (doing so publishes the time-locked transaction and sends funds to the donation addresses owned by the BurningMen).
2. Collaborate with an arbitrator to clarify the details of your case.
3. If the arbitrator agrees you are owed BTC, they will pay it to you.
4. The arbitrator will then request reimbursement from the Bisq DAO so they are not out of pocket.

Takeaway: if you are owed BTC after a dispute, you\'ll get it from an arbitrator who will refund you with their own funds. The arbitrator then requests reimbursement from the Bisq DAO usually once per DAO cycle and asks for the BSQ amount as a reimbursement for the BTC they have refunded Bisq traders. .

<span class="wiki-legacy-anchor" id="Process,_In_Detail" aria-hidden="true">
</span>

## Process, In Detail {#process-in-detail}

To better understand arbitration, we need to first understand the new trade protocol, and how it improves upon the old trade protocol.

<span class="wiki-legacy-anchor" id="Pre_v1.2_Trade_Protocol" aria-hidden="true">
</span>

### Pre v1.2 Trade Protocol {#pre-v1-2-trade-protocol}

The previous model with 2-of-3 multisig deposit transactions (where an arbitrator was the 3rd key holder, and makes the payout to one of the traders in dispute cases) carried a significant risk: if the arbitrator was malicious (or was hacked), he could have taken all offers with a sockpuppet trader and made the payouts right back to his own sockpuppet.

This risk made it impossible to scale dispute resolution and find more arbitrators—we were limited to filling the role with a tiny number of Bisq contributors who could be 100% trusted to not be malicious and who had a good enough background in computer security to make getting hacked highly unlikely.

This element was the single most problematic element in Bisq’s old trade protocol, but since there weren’t any better solutions, we used it for as long as we had to.

<span class="wiki-legacy-anchor" id="Post_1.2_Trade_Protocol" aria-hidden="true">
</span>

### Post 1.2 Trade Protocol {#post-1-2-trade-protocol}

The new trade protocol, launched in [Bisq v1.2](https://github.com/bisq-network/bisq/releases/tag/v1.2.0), eliminates the risks described above to a large extent by separating functions and involving the DAO. It significantly improves censorship-resistance, security, and scalability of dispute resolution on Bisq.

<figure class="wiki-source-image" id="source-image-1"><a href="../../media/wiki/4371f5c907f59bf17f133e9503a393f51ab06d189d34c0a4cf599f3570658a9b.png"><img alt="Dispute resolution for trade protocol (v1.2+)." decoding="async" height="992" loading="lazy" src="../../media/wiki/4371f5c907f59bf17f133e9503a393f51ab06d189d34c0a4cf599f3570658a9b.png" width="1253"></a><figcaption>Dispute resolution for trade protocol (v1.2+).<br><small>Historical full-size recovered source. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>

The basic change is that it uses a 2-of-2 multisig in the deposit transaction with only the traders’ keys.

On the happy path, the traders each sign the payout tx once the fiat or altcoin is transferred.

If anything goes wrong, there are 3 stages to resolve the issue:

1. The traders can have a direct chat where they can try to find a solution to their problem.
2. If that does not succeed either trader can open a mediation ticket and request help from a mediator. Mediators play a role similar to that of arbitrators in the old model, except they don’t have a 3rd key. They only can make a *suggestion* for the payout distribution, which either trader is free to accept or reject. If both traders accept, they create and sign the payout tx and the trade is completed. If either trader rejects, the dispute goes to stage 3. This escalation can only take place after a certain time period has passed. For altcoins, this period is 10 days, and for fiat it’s 20 days.
3. An arbitrator will investigate the case, just like a mediator would, and decide how a payout should be distributed. The arbitrator role currently has 2 parts: supreme mediator and refund agent (this is where the term *refund agent* comes from, but *arbitrator* is a better term for the role, as we will soon see). The supreme mediator part of the role is similar in function to that of a regular mediator (i.e., investigate a dispute). The refund agent reimburses traders BTC for disputed trades without requiring them to undergo the complex and time-consuming process of making a reimbursement request in the DAO. The ultimate goal, however, is to make such extreme dispute cases so *rare* that requiring users to request reimbursement from the DAO on their own becomes feasible (e.g., by reducing bugs, UX improvements, increasing security deposits, etc). But we’re not there yet, so for now, an arbitrator simply decides on a payout *and* funds this payout from their own pocket, and later makes a reimbursement request to the DAO to be reimbursed for their reimbursement to the user. To avoid [potential fraud](../arbitration/#avoiding-fraud), and to keep the DAO from losing money in each arbitration case, we use the <a href="../arbitration/">donation address</a> <small class="wiki-link-gap">[section not recovered: Donation Address]</small> to receive the funds from the trade via the time-locked delayed payout payout tx.

<span class="wiki-legacy-anchor" id="Time-Locked_Delayed_Payout_Payout_Transaction" aria-hidden="true">
</span>

### Time-Locked Delayed Payout Payout Transaction {#time-locked-delayed-payout-payout-transaction}

Since [v1.9.8](https://github.com/bisq-network/bisq/releases/tag/v1.9.8), traders create a time-locked delayed payout payout tx where all the locked up funds (trade amount + both [security deposits](../security-deposit/)) are sent to Bisq donation address owners, also known as burningmen. These addresses are defined in the DAO. The burningmen are Bisq contributors who burn their BSQ in order to get a portion of time-locked delayed payouts and trading fees paid in BTC. From v1.2 to v1.9.8, this address was controlled by a single burningman who exchanged BTC for BSQ to burn them afterwards. That supposed a risk for the DAO as, although the burningman had to place a BSQ bond, the amount of the bond was lower than the amount of expected BTC to collect. Distributing the role into multiple burningman and requiring them to burn BSQ in advance, this risk has significantly decreased.

If a trade is not completed in 10 days (for altcoins) or 20 days (for fiat), either of the 2 traders have a chance (after mediation) to publish the time-locked payout tx where all deposit funds are sent to the donation address, requiring the aggrieved trader to request arbitration so they can receive a payout. With the preliminary solution we use now, the trader gets a payout from an arbitrator directly, **but the eventual goal is that the arbitrator makes a suggestion which the DAO uses as a basis for voting on the reimbursement request made by the trader(s)**.

<span class="wiki-legacy-anchor" id="Avoiding_Fraud" aria-hidden="true">
</span>

### Avoiding Fraud {#avoiding-fraud}

The time-locked delayed payout payout tx is essential to avoid fraud. A trader could make a self-trade and then claim that his “peer” has not paid. Without the time-locked payout tx, he could go through the dispute process, make a reimbursement request, and receive BSQ for the equivalent “lost” funds in BTC. After that he could make the payout to himself from the trade, since he controls both “traders”—thereby scamming the DAO with the trade amount.

To avoid this fraud, we require that locked up funds in the 2-of-2 multisig deposit tx are spent before opening an arbitration ticket. Thus it is not possible for a trader to defraud the DAO in the way described above.

<span class="wiki-legacy-anchor" id="Donation_Address_Owners_(burningmen)" aria-hidden="true">
</span>

### Donation Address Owners (burningmen) {#donation-address-owners-burningmen}

Burningmen are current and past contributors who earned BSQ by contributing to Bisq who opt to to burn their BSQ to get BTC from time-locked delayed payout transactions and trading fees paid in BTC. A DAO filter distributes the BTC in proportion to their relative amount of BSQ burned. The amount of BSQ to be burned is limited for each contributor, to prevent that a single burningman could create self trades and take advantage from being refunded at arbitration and receiving BTC from the DAO filter as well. In order to keep this system safe, it is required that refund agent does not reimburse a security deposit from deposit transaction. The amount of BSQ to be burned (burn target) is estimated from accumulated reimbursement requests, trade fees paid in BTC and burned BSQ from burningmen in the last 12 months. The BSQ burned and BTC sent to burningmen should balance over time. Each one of the burningmen, according to their prefferences, could try to \"charge\" a discount rate for the risk assumed advancing their BSQ to the DAO by burning less than the burning target, or they could try to \"pay\" to avoid selling big volumes of BSQ to a low liquid market by overburning (up to 100.000 BSQ over the burning target). They could also under or overestimate the amount of BTC to be received over the next year, which is the period that burned amounts decay linearly: the burn target is an estimation with data from the past. DAO contributors have another way to turn BSQ into BTC while contributing to remove the legacy burningman, which was a central point of failure for the Bisq DAO and created distorsion as a big BSQ buyer. Some burningmen will require to buy BSQ to be burned eventually. The impact for the market will be reduced as there will be multiple interested parties.

Let’s walk through a simplified example:

- Two traders enter into a 1 BTC trade.
- Each trader locks 0.15 BTC as a security deposit.
- In total, 1.3 BTC is locked in the 2-of-2 multisig deposit transaction (ignoring mining fees).
- Assume the BSQ/BTC exchange rate is 0.0001 BTC per BSQ for simplicity.

After the required time passes and mediation is unsuccessful, one trader opens an arbitration case. At that point, the pre-signed and time-locked delayed payout transaction becomes valid and broadcasts the full 1.3 BTC to donation addresses controlled by the burningmen.

The arbitrator investigates the dispute and determines that one trader should receive a payout of 1.15 BTC. Since the locked funds have already been redirected to the burningmen, the arbitrator pre-finances the reimbursement from their own wallet and sends 1.15 BTC directly to the winning trader.

Now assume there is only this single delayed payout event during the DAO cycle:

- Burningmen collectively burned 12,000 BSQ.
- They receive the 1.3 BTC according to their proportional burn shares.
- The arbitrator later submits a reimbursement request for 11,500 BSQ, corresponding to the 1.15 BTC payout they pre-financed.
- Once approved by the DAO, 11,500 BSQ is issued to the arbitrator.

In this example:

- The 0.15 BTC losing trader’s security deposit effectively subsidizes the system and offsets the reimbursement cost.
- Burningmen collectively retain a net gain of 0.1 BTC.
- The remaining value corresponds to a reduction in BSQ supply through the burn mechanism.

The arbitrator must then either burn or sell the reimbursed BSQ in order to recover BTC liquidity for future reimbursements and to reduce exchange-rate risk. Because arbitrators pre-finance payouts using their own funds, arbitration is intentionally designed to be rare and used only as a last resort.

<span class="wiki-legacy-anchor" id="Why_We_Cannot_Merge_the_Arbitrator_and_BurningMan_Roles" aria-hidden="true">
</span>

### Why We Cannot Merge the Arbitrator and BurningMan Roles {#why-we-cannot-merge-the-arbitrator-and-burningman-roles}

The separation of these roles is essential to keep the system flexible, censorship-resistant, and scalable.

**Keep in mind that the current dual role of arbitrators (i.e., supreme mediator and refund agent) is not the ultimate goal**. The refund agent part of the role should be delegated to traders once the trade process is improved to a level where such cases rarely happen. How to keep the burden for traders low, and how to compensate them for this extra work—these items are still up for discussion (e.g. the trader could get a slight bonus if he does the reimbursement himself). A preferred option is to keep trader-submitted reimbursement requests optional and still offer arbitrator-funded reimbursements for a fee. The role could even be split, such that a market of refund agents develops where each agent offers their pre-financing services at different prices. But before getting into any of these discussions, we need to reduce bugs and improve UX.

The role of the burningman has been distributed between different contributors and a part of their earnings come directly as BTC, but it could also disappear when we have very few dispute cases, and once trade fees in BTC do not add up to a large amount. We could use the donation address to support critical infrastructure we use like Tor. Or we could use it to fund Bisq projects like the mobile wallet. There are many possibilities for how we could use these funds—but if we merged the burningman role with the arbitrator role, we would lose this flexibility.

The risks of the 2 roles are very different. An arbitrator does not present any severe risk to the DAO, actually, he *takes on* a lot of risk. A single burningman, on the other hand, is a trusted role and there is an open problem that a malicious burningman could make many trades, go to the arbitrator, get payouts, and then run away with the funds he received from the donation address. The high bond is a partial protection, but ultimately, this is a trusted role and only highly trusted Bisq contributors can take it on. This problem has been mitigated by distributing the role between different contributors with a cap on how much BTC they can get. So scalability is a small issue with the distributed burningmen, but we cannot say the same about the arbitrator. With more traders, there will be more cases, and we might need more arbitrators. Furthermore, with more regional expansion, we will need arbitrators with particular language skills. When arbitrators and burningmen are not combined into one role, we can add arbitrators to support this growth without posing high risk to the Bisq network. If we merged both roles, we would not be able to do this. There is a risk arbitrators expose to the DAO: they could fake their reporting, but this is likely solvable (traders can provide evidence).

Another important aspect is that arbitrator reimbursement is not automated. DAO stakeholders have ultimate power. Sure, they would probably lose an arbitrator if they don’t reimburse him fairly, and it might be hard to find new arbitrators after unfair behaviour from DAO stakeholders. But it is highly important that stakeholders be able to exercise absolute power.

<span class="wiki-legacy-anchor" id="FAQ" aria-hidden="true">
</span>

### FAQ {#faq}

**What are the conditions that lead to a payout, for example, a dispute between Bob and Alice that is not resolved by normal mediation and gets escalated to arbitration?**

After the time-lock period (10 days for altcoins and 20 days for fiat), and after mediation is completed, either trader can open an arbitration ticket. Doing so publishes the time-locked delayed payout transaction.

**How are Bob and Alice\'s BTC funds paid out to the Bisq donation addresses?**

The time-locked payout transaction is created and signed in the take-offer process and stored by both traders. The trade protocol requires this transaction to be in place before a trade is started.

**How is the arbitrator responsible for deciding what the payout distribution should be? Are facts and circumstances of the case taken into account? And how is this similar to legacy arbitration?**

In terms of determining what a payout should be, an arbitrator\'s role is the same as that of a mediator. They\'ll ask you for any additional information they need to determine the facts and circumstances of the case. The only practical difference between arbitration and legacy arbitration is that arbitrators use their own funds to pay trader(s) instead of funds from the trading escrow.

**How, upon deciding a payout, does an arbitrator pay the BTC to Bob and Alice?**

Arbitrators need to have enough BTC to cover potential payouts (up to 0.5 BTC per trade) — it\'s a requirement for anyone seeking to hold the role. An arbitration case can only be closed once an arbitrator makes a payout. Then, at the end of the DAO cycle, they\'ll get reimbursed with BSQ (which they can then sell for BTC).

**Are there any trades the arbitrator will not pay out?**

Arbitrators will only reimburse trades in which the multisig deposit has been sent to the Bisq donation addresses. For trades requiring large reimbursements (above 0.5 BTC) they should be aware the arbitrators will only [partially reimburse traders up to 0.5 BTC](https://github.com/bisq-network/proposals/issues/296). Should a trader require a reimbursement over 0.5 BTC they can make a reimbursement request directly to the DAO on the [support repository](https://github.com/bisq-network/support).

**How does the arbitrator issue a reimbursement request for an amount of BSQ equivalent to the amount of BTC paid out-of-pocket to settle disputes?**

This process is a work in progress. Currently we try to reduce volatility and exposure risk by converting pre-financed BTC to BSQ as fast as possible. Once it is BSQ there is no longer any volatility risk, and the arbitrator simply sums up all pre-financed BSQ and requests reimbursement. The public result of an arbitrator\'s work is a reimbursement request to the Bisq DAO.

**How does the DAO issue this BSQ to reimburse arbitrators?**

A reimbursement request is technically the same as a compensation request. DAO stakeholders vote on an arbitrator\'s request. The arbitrator needs to provide solid reporting to make their request transparent to the DAO. Currently there is some trust involved, since it cannot be proven that the arbitrator is not adding fake cases. This may be solvable by collecting data from traders, but this requires more thought.

**Doesn\'t this dispute resolution mechanism incentivize Bisq to have more trades go to arbitration, since disputed BTC funds are sent to the burningmen, and thereby benefit BSQ holders and themselves?**

It\'s the traders who open arbitration, the DAO can\'t start arbitration, although it could generate bugs and be unresponsive at mediation. In this case, traders will be fully reimbursed (which will generate a loss for the DAO, as arbitrator charges for every arbitration case) if they have done enough reporting the issue and trying to get [support](../user-support/) through Matrix or Github. Bugs and requiring arbitration is a bad user experience, so the DAO is also incentivized to keep arbitration and mediation cases at the minimum.

\'\'\'How does an arbitrator spends their newly-issued BSQ?

The arbitrator sells BSQ for BTC from the market and burns BSQ as soon as reimbursement request is paid.

**How does the burningman burn the BSQ they earn or buy?**

Burning is done inside the Bisq software on <code class="wiki-source-code" id="source-code-1">DAO / Burning / Burningmen</code>.

**Why not simply combine the burningman and arbitrator roles?**

<a href="../arbitration/">See longer explanation above</a> <small class="wiki-link-gap">[section not recovered: Why We Cannot Merge These Roles]</small>. In short: to stay flexible, to be able to implement the target vision (reimbursement done by traders themselves), to avoid legal risks, to keep the arbitrator role scalable, and to address the trust/security issue with the current burningman model.

</div>
