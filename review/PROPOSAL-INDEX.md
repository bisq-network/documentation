# Documentation review index

The comparison covered **209 restored original articles** and **98 retained AI-edited guides**. The proposed edits preserve the originals as the review baseline. Reading and comparing material does not verify every historical claim, establish current applicability, or replace human review. Each pull request should be assessed against its affected article, source evidence and stated risks.

The queue comprises **73 focused review groups**, containing **182 proposed edits** across **94 original articles**. [PR #1](https://github.com/bisq-network/documentation/pull/1) covers two additional original articles. Of the remaining originals, 31 have no identified beneficial change, 18 prior rewrites were rejected as lossy, and 64 have unresolved questions. These are article dispositions; proposed articles may still contain unresolved claims.

All 73 new PRs were created **open and ready for review** on 8 November 2026, targeting `main`. Each changes one to three articles; the largest diff has 26 added/deleted source lines. Check GitHub for their current state. None was merged or deployed. Related articles sometimes have separate PRs, so consider the wider topic when approving a correction.

CodeRabbit currently reports an exhausted free-review allowance: see its notices on [PR #2](https://github.com/bisq-network/documentation/pull/2#issuecomment-6718694189) and [PR #74](https://github.com/bisq-network/documentation/pull/74#issuecomment-6718717772). Those sampled PRs had no review submissions when checked. A green CodeRabbit status is therefore not evidence of a completed review. Support can review now; automated review needs available capacity.

Validation passed for every individual proposed branch and for the combined local review build: Astro compilation, article/search scope, all 307 compatibility routes, links/fragments and all 120 media assets. The original-wording publication gate deliberately rejects editorial branches until human acceptance is recorded through a separately reviewed mechanism. Original receipts were not refreshed to approve edits.

The [formatting baseline](https://github.com/bisq-network/documentation/commit/ba3316c1ea379d6e7ab68f080fdcbf095ede3709) only changes source line breaks. All 94 affected articles retain identical rendered elements, attributes and text, and reconstruct their original bytes exactly. All 539 preserved source/metadata/media files and 106 AI-snapshot files remain unchanged.

See [proposal coverage](proposal-coverage.json) for the complete article and guide dispositions. Comparison coverage is complete; unresolved factual questions are not claimed as resolved.

## Review queue

### Bisq 1

| Review group | Scope | Pull request |
| --- | --- | --- |
| Correct deposit values and funding estimates | Funding your wallet, Security deposit | [#2](https://github.com/bisq-network/documentation/pull/2) |
| Distinguish clone maker fees from trade deposits | Cloning an offer | [#3](https://github.com/bisq-network/documentation/pull/3) |
| Correct the unsigned-account limit and scope | Taking an offer | [#4](https://github.com/bisq-network/documentation/pull/4) |
| Correct BSQ swap receipt and confirmation advice | How to buy BSQ on Bisq, How to sell BSQ on Bisq | [#5](https://github.com/bisq-network/documentation/pull/5) |
| Keep manual-payout keys local | Manual payout | [#6](https://github.com/bisq-network/documentation/pull/6) |
| Explain entries omitted by application backup | Backing up application data | [#7](https://github.com/bisq-network/documentation/pull/7) |
| Add current seed-restore safeguards | Restoring your wallet from seed | [#8](https://github.com/bisq-network/documentation/pull/8) |
| Use seed words in the seed-restore screen | Emergency wallet | [#9](https://github.com/bisq-network/documentation/pull/9) |
| Clarify what wallet encryption protects | Encrypting your wallet | [#10](https://github.com/bisq-network/documentation/pull/10) |
| Correct the onion-identity backup directory | Restoring application data | [#11](https://github.com/bisq-network/documentation/pull/11) |
| Correct Bisq instance and payout export paths | Dumping delayed payout transactions, Command line options | [#12](https://github.com/bisq-network/documentation/pull/12) |
| Preserve external Tor configuration during cache reset | Troubleshooting network issues | [#13](https://github.com/bisq-network/documentation/pull/13) |
| Mark the Tails Tor-control script as version-bound | Running Bisq on Tails | [#14](https://github.com/bisq-network/documentation/pull/14) |
| Use the matching script type and watch key | Watch keys | [#15](https://github.com/bisq-network/documentation/pull/15) |
| Distinguish external funding from avoiding the wallet | Wallet, Frequently asked questions | [#16](https://github.com/bisq-network/documentation/pull/16) |
| Calculate CPFP from the combined transaction package | Deposit transaction pending in mempool and CPFP | [#17](https://github.com/bisq-network/documentation/pull/17) |
| Explain the scope of Java MaxRAM | Reducing memory usage | [#18](https://github.com/bisq-network/documentation/pull/18) |
| Use the accepted reimbursement deadline trigger | Failed Trades - Reimbursement of Trade Fees and Miner Fees, Fee Reimbursement Agent | [#19](https://github.com/bisq-network/documentation/pull/19) |
| Distinguish arbitration decisions from guaranteed refunds | Arbitration | [#20](https://github.com/bisq-network/documentation/pull/20) |
| Qualify direct refunds in dispute and role guidance | Dispute Resolution in Bisq 1, Arbitrator | [#21](https://github.com/bisq-network/documentation/pull/21) |
| Separate agent identity mappings from availability | Finding your mediator, Finding your arbitrator | [#22](https://github.com/bisq-network/documentation/pull/22) |
| Require a valid signature without assigning ultimate trust | Downloading and installing | [#23](https://github.com/bisq-network/documentation/pull/23) |
| Explain Bitcoin node configuration accurately | Connecting to your own Bitcoin node | [#24](https://github.com/bisq-network/documentation/pull/24) |
| Check actual EUR receipt before releasing bitcoin | How to create an offer to sell BTC with EUR | [#25](https://github.com/bisq-network/documentation/pull/25) |
| Distinguish Bisq 1 alerts from mobile trading | Mobile notifications | [#26](https://github.com/bisq-network/documentation/pull/26) |
| Fix the macOS backup path and flag rotation risks | Automatic backup script | [#27](https://github.com/bisq-network/documentation/pull/27) |
| Require authenticated encrypted access to the wallet desktop | Remote control via web browser using xpra | [#28](https://github.com/bisq-network/documentation/pull/28) |

### Bisq 2 and payment methods

| Review group | Scope | Pull request |
| --- | --- | --- |
| Correct XMR defaults and proof-command syntax | Trading Monero | [#46](https://github.com/bisq-network/documentation/pull/46) |
| Distinguish reputation stars from rank (Reputation) | Reputation | [#47](https://github.com/bisq-network/documentation/pull/47) |
| Distinguish reputation stars from rank (Reputation2) | Reputation2 | [#48](https://github.com/bisq-network/documentation/pull/48) |
| Correct reputation weights and trade coverage | Reputation2, Bisq Easy | [#49](https://github.com/bisq-network/documentation/pull/49) |
| Clarify Bisq Easy payment and response rules | Bisq Easy | [#50](https://github.com/bisq-network/documentation/pull/50) |
| Clarify Easy mediation powers and recovery | Dispute Resolution in Bisq 2 | [#51](https://github.com/bisq-network/documentation/pull/51) |
| Qualify standard Wallet and MuSig availability | Bisq 2 Wallet, Trade Protocols, MuSig-tradelimits | [#52](https://github.com/bisq-network/documentation/pull/52) |
| Preserve active chats when deleting a profile | Identity | [#53](https://github.com/bisq-network/documentation/pull/53) |
| Clarify automatic backup product and limits | Automatic backup | [#54](https://github.com/bisq-network/documentation/pull/54) |
| Separate payment-account backup from wallet seed | Set up a Revolut payment account, Set up a SEPA payment account | [#55](https://github.com/bisq-network/documentation/pull/55) |
| Correct Zelle limits and dispute shortcut | Zelle | [#56](https://github.com/bisq-network/documentation/pull/56) |
| Fix half-limit arithmetic in signing examples | Account limits | [#57](https://github.com/bisq-network/documentation/pull/57) |
| Label the original aging schedule as design history | Payment account age witness | [#58](https://github.com/bisq-network/documentation/pull/58) |
| Scope historical payment-method BTC tables | Payment methods, Payment methods/en, Payment methods/es | [#59](https://github.com/bisq-network/documentation/pull/59) |
| Identify unavailable and unfinished payment guides | CelPay, Verse, Skrill | [#60](https://github.com/bisq-network/documentation/pull/60) |
| Distinguish Paytm wallet restrictions from UPI | PayTM | [#61](https://github.com/bisq-network/documentation/pull/61) |
| Replace unfinished client trade-period placeholders | NEFT, RTGS, Tikkie | [#62](https://github.com/bisq-network/documentation/pull/62) |
| Correct Pix, Paxum and Bizum transfer limits | Pix, Paxum, Bizum | [#63](https://github.com/bisq-network/documentation/pull/63) |
| Clarify payment-provider signup and client scope | Paysera, Satispay, Strike | [#64](https://github.com/bisq-network/documentation/pull/64) |
| Update USPS fees and money-order form guidance | US Postal Money Order | [#65](https://github.com/bisq-network/documentation/pull/65) |
| Correct the Australian gift-card currency code | Amazon eGift card | [#66](https://github.com/bisq-network/documentation/pull/66) |
| Correct Indian bank-transfer limit distinctions | IMPS, NEFT, RTGS | [#67](https://github.com/bisq-network/documentation/pull/67) |
| Clarify Bisq 2 detached-signature verification | Bisq 2 | [#68](https://github.com/bisq-network/documentation/pull/68) |
| Protect mobile pairing credentials and backend backups | Bisq 2 mobile applications | [#69](https://github.com/bisq-network/documentation/pull/69) |
| Separate role approval, lockup and registration | Bisq 2 Roles | [#70](https://github.com/bisq-network/documentation/pull/70) |
| Clarify when the delayed payout is published | Cash by mail | [#71](https://github.com/bisq-network/documentation/pull/71) |
| Clarify availability for an Instant offer | Altcoins Instant | [#72](https://github.com/bisq-network/documentation/pull/72) |
| Correct the no-copyright premise in Bisqpro | Bisqpro | [#73](https://github.com/bisq-network/documentation/pull/73) |
| Clarify the first-year burn and bond boost | Reputation2 | [#74](https://github.com/bisq-network/documentation/pull/74) |

### DAO, contributing and reference

| Review group | Scope | Pull request |
| --- | --- | --- |
| Correct Tor Browser privacy assumptions | Contributor privacy and opsec | [#29](https://github.com/bisq-network/documentation/pull/29) |
| Clarify current contributor review and compensation limits | Contributor checklist | [#30](https://github.com/bisq-network/documentation/pull/30) |
| Flag the pricenode installer Java mismatch | How to run pricenode | [#31](https://github.com/bisq-network/documentation/pull/31) |
| Clarify sub-satoshi units in the historical table | Bitcoin units | [#32](https://github.com/bisq-network/documentation/pull/32) |
| Correct CBDC names and qualify dated figures | CBDC | [#33](https://github.com/bisq-network/documentation/pull/33) |
| Repair two restored source-reference links | How to run seednode, Phase zero | [#34](https://github.com/bisq-network/documentation/pull/34) |
| Repair two restored section links | Ops Team, Support Agent | [#35](https://github.com/bisq-network/documentation/pull/35) |
| Correct the remittance example’s offer directions | How to do remittance on Bisq | [#36](https://github.com/bisq-network/documentation/pull/36) |
| Qualify the market-making example return | How to be a market maker on Bisq | [#37](https://github.com/bisq-network/documentation/pull/37) |
| Correct the BSQ swap buyer funding example | BSQ swaps | [#38](https://github.com/bisq-network/documentation/pull/38) |
| Correct support-data privacy guidance | Support Agent | [#39](https://github.com/bisq-network/documentation/pull/39) |
| Clarify price aggregation and offer tolerance | Bisq Price Indices | [#40](https://github.com/bisq-network/documentation/pull/40) |
| Clarify support backup and file-change guidance | Support Agent Knowledge Base | [#41](https://github.com/bisq-network/documentation/pull/41) |
| Restore two DAO section links | Proposals, Project management | [#42](https://github.com/bisq-network/documentation/pull/42) |
| Use Bisq 1 for the Bisq 1 trade example | Introduction | [#43](https://github.com/bisq-network/documentation/pull/43) |
| Clarify DAO fee defaults and issuance units | Making a compensation request, Participating in a DAO voting cycle | [#44](https://github.com/bisq-network/documentation/pull/44) |
| Correct the Burning Men burn asset | Burning Men | [#45](https://github.com/bisq-network/documentation/pull/45) |

## Deferred and rejected comparisons

The following records explain why an original was retained without a proposed replacement. “Unresolved” means a targeted claim, policy, procedure or current applicability still needs evidence; “rejected” means the prior rewrite omitted useful original detail. The reasons reflect the comparison records and are not findings that the old instructions are safe or current.

| Original article | Disposition | Reason |
| --- | --- | --- |
| [Bisq 1](https://bisq-network.github.io/documentation/wiki/bisq-1/) | Rejected: lossy rewrite | Reject replacing the navigation portal and contributor/community/stats links with the AI FAQ. Missing MainPage templates remain an explicit recovery gap, not invented new introductory prose. |
| [Changing your onion address](https://bisq-network.github.io/documentation/wiki/changing-your-onion-address/) | Unresolved | AI recommended removing open offers despite original explicitly allowing them; fresh OpenOfferManager re-publication behavior has not been traced, so do not impose that fee-losing change. Preserve no-open-trades/disputes condition, hiddenservice backup and all steps. |
| [Create a new wallet for your data directory](https://bisq-network.github.io/documentation/wiki/create-a-new-wallet-for-your-data-directory/) | Rejected: lossy rewrite | Reject short wallet-replacement summary. Keep original close/rename/restart sequence, no-active-trades prerequisite, BSQ-before-BTC transfer order and rollback directories. |
| [How do I send fiat to Bisq](https://bisq-network.github.io/documentation/wiki/how-do-i-send-fiat-to-bisq/) | Unresolved | Retain direct-to-peer payment explanation. AI suggests qualifying card funding at named payment providers, but their current provider rules were not freshly verified; do not convert examples into endorsement or claim they are prohibited. |
| [How to buy BTC on Bisq with CAD](https://bisq-network.github.io/documentation/wiki/how-to-buy-btc-on-bisq-with-cad/) | Rejected: lossy rewrite | Reject replacement by general offers guide: preserve CAD selection, every numbered review/funding/payment step and original contextual images. No source-supported change to this exact sequence identified. |
| [How to buy BTC on Bisq with EUR](https://bisq-network.github.io/documentation/wiki/how-to-buy-btc-on-bisq-with-eur/) | Rejected: lossy rewrite | Reject EUR walkthrough consolidation. Preserve all numbered steps, payment account links and screenshots; current payment-order check supports the original order. |
| [How to create an offer to buy BTC with EUR](https://bisq-network.github.io/documentation/wiki/how-to-create-an-offer-to-buy-btc-with-eur/) | Rejected: lossy rewrite | Keep all ten maker steps, stay-online condition and EUR-specific account links. AI consolidated prose loses the independently usable checklist without a verified correction. |
| [Import Bisq wallet as watch only wallet in Sparrow](https://bisq-network.github.io/documentation/wiki/import-bisq-wallet-as-watch-only-wallet-in-sparrow/) | Unresolved | AI limits disabling Validate derivations and suggests revalidation, but current Sparrow import behavior has not been freshly tested or traced. Preserve exact script-type/path/UI procedure; do not guess an alternative derivation or declare a tested fix. |
| [Installing your own Bitcoin node](https://bisq-network.github.io/documentation/wiki/installing-your-own-bitcoin-node/) | Unresolved | AI removes fixed disk/time/hardware estimates and substitutes general setup. Current Bitcoin release/version hardware sizing and the particular Bisq deployment have not been exercised; preserve the complete command/configuration guide, flag dated estimates for a separate tested update. |
| [Last resort restore](https://bisq-network.github.io/documentation/wiki/last-resort-restore/) | Rejected: lossy rewrite | REJECT ENTIRE AI REPLACEMENT. It drops eligibility (no usable backup, backup cannot start or too old), fresh-instance launch test, shutdown sequence, modification-time/same-day file selection, complete db/keys/wallet/hiddenservice paths, overwrite/copy rules, rollback and final SPV resync. All original author text and images remain untouched; generic contact-support is not an adequate substitute. |
| [Matrix bisq.chat](https://bisq-network.github.io/documentation/wiki/matrix-bisq-chat/) | Unresolved | AI prefers the official bisq.chat entry over old aliases, but current homeserver/room signup flow has not been verified end-to-end. Preserve four useful screenshots and navigation; do not remove working aliases based only on age. |
| [Mediator](https://bisq-network.github.io/documentation/wiki/mediator/) | Unresolved | AI replaces role requirements/response times with generic discretion. Current bonded-role governance and operational duty wording need maintainer review; code identity mapping does not establish role-service policy. |
| [Paying trading fees with BSQ](https://bisq-network.github.io/documentation/wiki/paying-trading-fees-with-bsq/) | Unresolved | 25%/50% discount conflict is real, but current DAO fee parameters and BSQ/BTC valuation were not independently measured. Do not replace historical percentage with another unverified number or erase the original fee-currency steps. |
| [Resyncing SPV file](https://bisq-network.github.io/documentation/wiki/resyncing-spv-file/) | Rejected: lossy rewrite | Reject condensed resync guide in place of original diagnostic and recovery steps. Preserve backups, shutdown/restart order, exact file paths and warnings; current-source review does not justify broad reset instructions. |
| [Running Bisq in China](https://bisq-network.github.io/documentation/wiki/running-bisq-in-china/) | Unresolved | v1.10.11 Tor library change is verified, but this guide covers both Bisq1 JAR torrc and Bisq2 proxy configuration. No tested current proxy recipe or proof every old JAR step fails; preserve it and defer targeted compatibility update rather than replace it with bridge-only advice. |
| [Running Bisq on Linux using VNC](https://bisq-network.github.io/documentation/wiki/running-bisq-on-linux-using-vnc/) | Unresolved | AI flags old hardcoded peers, seednode installer and eight-character password guidance. A replacement systemd/VNC/SSH workflow is not freshly tested; preserve localhost binding, SSH tunnel and full setup. Do not silently strip commands or imply secure current deployment. |
| [Switching to a new data directory](https://bisq-network.github.io/documentation/wiki/switching-to-a-new-data-directory/) | Rejected: lossy rewrite | Keep full data migration, identity separation, no-active-state precautions and funds movement steps; reject the AI summary that makes this a routine generic reset. |
| [Table of penalties](https://bisq-network.github.io/documentation/wiki/table-of-penalties/) | Unresolved | AI labels schedule historical, but whether every percentage/max/noncumulative/5% incentive rule remains current is policy, not demonstrated by app source. Preserve the complete table and exceptions; do not replace percentages or imply newly ratified entitlement. |
| [Trade payout address reuse issue](https://bisq-network.github.io/documentation/wiki/trade-payout-address-reuse-issue/) | Unresolved | AI describes current incidence as unknown, correctly, but neither a fresh reproducer nor immutable fix evidence was acquired. Preserve exact symptom, seller path, mediator contact and recovery alternatives as documented rather than rewriting a delicate diagnostic. |
| [Trading BSQ](https://bisq-network.github.io/documentation/wiki/trading-bsq/) | Unresolved | Preserve pre/post-v1.8.0 swap distinction, earlier payment-account steps and screenshots. AI discount caveat is valid uncertainty but current DAO fee amounts are not independently established; no new percentage or broad deletion proposed. |
| [Trading costs](https://bisq-network.github.io/documentation/wiki/trading-costs/) | Unresolved | AI discards fee tables and pricing examples. Dynamic fee parameter values/discount require a current DAO state check not completed here; retain original numbers as source content, with unresolved update recorded rather than silently deleting them. |
| [Trading fees](https://bisq-network.github.io/documentation/wiki/trading-fees/) | Unresolved | Same DAO fee-rate/valuation uncertainty as Trading costs; preserve BTC/BSQ maker/taker table, minimums and examples until a precise dated replacement is verified. |
| [Troubleshooting wallet issues](https://bisq-network.github.io/documentation/wiki/troubleshooting-wallet-issues/) | Rejected: lossy rewrite | Reject compressed recovery decision tree replacing the detailed original. Preserve rollback, backup-file choices, SPV/manual/seed escalation and all technical conditions; no broad repair commands are proposed. |
| [Updating BSQ trading fees](https://bisq-network.github.io/documentation/wiki/updating-bsq-trading-fees/) | Unresolved | Keep 30-day weighted price calculation, proposal transaction sequence, deadlines and policy band. AI explicitly lacked fresh policy ratification; changes to 40–60% band/50% target or three-day timing require DAO proposal review, not generic replacement. |
| [BSQ](https://bisq-network.github.io/documentation/wiki/bsq/) | Unresolved | Read complete source, rendering and AI guide; contradictory same-file versus separate-file wallet statements need source verification. |
| [Bisq Maintainer](https://bisq-network.github.io/documentation/wiki/bisq-maintainer/) | Unresolved | Original and rendered article plus mapped AI guide read; historical role or process claims need more primary-source checking before a proposal. |
| [Bitcoin holidays](https://bisq-network.github.io/documentation/wiki/bitcoin-holidays/) | Unresolved | Read full source, rendering and guide; no independently verified narrow correction has yet been selected. |
| [Community Manager](https://bisq-network.github.io/documentation/wiki/community-manager/) | Unresolved | Original, rendering and mapped AI guide read; current role or process details require further primary-source verification before a narrow edit. |
| [Compensation](https://bisq-network.github.io/documentation/wiki/compensation/) | Unresolved | Original, rendering and mapped AI guide read; current role or process details require further primary-source verification before a narrow edit. |
| [Compensation Maintainer](https://bisq-network.github.io/documentation/wiki/compensation-maintainer/) | Unresolved | Original, rendering and mapped guide read; historical operation or process claims need further verification. |
| [Critical bugs](https://bisq-network.github.io/documentation/wiki/critical-bugs/) | Unresolved | Read source, rendering and mapped AI guide; historical process claims still need a narrow source-checked disposition. |
| [DAO technical overview](https://bisq-network.github.io/documentation/wiki/dao-technical-overview/) | Rejected: lossy rewrite | Read full original source and rendered article text and AI guide; prior summary omits detailed transaction examples, payload layouts, monitoring, snapshots, and warnings. Preserve original; modern implementation claims need separate source review. |
| [DAO user reference](https://bisq-network.github.io/documentation/wiki/dao-user-reference/) | Rejected: lossy rewrite | Read full source, rendering and guide; the AI summary omits genesis distribution details, phase walkthrough and historical vote examples. Preserve original; protocol and security claims remain subject to independent review. |
| [Decentralized autonomous organization](https://bisq-network.github.io/documentation/wiki/decentralized-autonomous-organization/) | Unresolved | Original, rendering and mapped guide read; historical operation or process claims need further verification. |
| [Dev Team](https://bisq-network.github.io/documentation/wiki/dev-team/) | Unresolved | Original and rendered article plus mapped AI guide read; historical role or process claims need more primary-source checking before a proposal. |
| [Development process](https://bisq-network.github.io/documentation/wiki/development-process/) | Unresolved | Original and rendered article plus mapped AI guide read; historical role or process claims need more primary-source checking before a proposal. |
| [Donation Address Owner](https://bisq-network.github.io/documentation/wiki/donation-address-owner/) | Unresolved | Read original, rendering and mapped guide; specific funding or historical role claims require further primary-source verification. |
| [Events calendar](https://bisq-network.github.io/documentation/wiki/events-calendar/) | Unresolved | Original and rendered article plus mapped AI guide read; historical role or process claims need more primary-source checking before a proposal. |
| [Fiat](https://bisq-network.github.io/documentation/wiki/fiat/) | Unresolved | Read full source, rendering and guide; no independently verified narrow correction has yet been selected. |
| [Glossary](https://bisq-network.github.io/documentation/wiki/glossary/) | Unresolved | Read full source, rendering and guide; no independently verified narrow correction has yet been selected. |
| [Growth Team](https://bisq-network.github.io/documentation/wiki/growth-team/) | Unresolved | Read original, rendering and mapped guide; specific funding or historical role claims require further primary-source verification. |
| [How to do arbitrage on Bisq](https://bisq-network.github.io/documentation/wiki/how-to-do-arbitrage-on-bisq/) | Rejected: lossy rewrite | The AI summary drops the original detailed cross-currency and payment-method examples, step sequences, warnings and capital/settlement discussion. Keep the original; individual risk wording remains available for review. |
| [Howto](https://bisq-network.github.io/documentation/wiki/howto/) | Unresolved | Original, rendering and mapped guide read; current status or other narrow edits remain to be checked. |
| [Introduction to the DAO](https://bisq-network.github.io/documentation/wiki/introduction-to-the-dao/) | Rejected: lossy rewrite | Original and AI guide compared: AI summary omits original token issuance example, governance discussion, bonding rationale, and diagram context; preserve these and review individual claims separately. |
| [Main Page](https://bisq-network.github.io/documentation/wiki/main-page/) | Unresolved | Original, rendering and mapped guide read; current status or other narrow edits remain to be checked. |
| [Making a reimbursement request](https://bisq-network.github.io/documentation/wiki/making-a-reimbursement-request/) | Unresolved | Read source, rendering and AI guide; sensitive dispute and reimbursement conditions need current primary-source review. |
| [Mempool Explorer Operator](https://bisq-network.github.io/documentation/wiki/mempool-explorer-operator/) | Unresolved | Original and rendered article plus mapped AI guide read; historical role or process claims need more primary-source checking before a proposal. |
| [Monero Explorer Operator](https://bisq-network.github.io/documentation/wiki/monero-explorer-operator/) | Unresolved | Original and rendered article plus mapped AI guide read; historical role or process claims need more primary-source checking before a proposal. |
| [Payment Method Maintainer](https://bisq-network.github.io/documentation/wiki/payment-method-maintainer/) | Unresolved | Original, rendering and mapped guide read; current status or other narrow edits remain to be checked. |
| [Pricenode](https://bisq-network.github.io/documentation/wiki/pricenode/) | Unresolved | Original and rendered article plus mapped AI guide read; historical role or process claims need more primary-source checking before a proposal. |
| [Pricenode Operator](https://bisq-network.github.io/documentation/wiki/pricenode-operator/) | Unresolved | Original, rendering and mapped AI guide read; current role or process details require further primary-source verification before a narrow edit. |
| [Proposals Maintainer](https://bisq-network.github.io/documentation/wiki/proposals-maintainer/) | Unresolved | Original and rendered article plus mapped AI guide read; historical role or process claims need more primary-source checking before a proposal. |
| [Roles](https://bisq-network.github.io/documentation/wiki/roles/) | Unresolved | Read complete source, rendering and AI guide; rights, role ownership and bonding assumptions require current primary-source checks. |
| [Roles Maintainer](https://bisq-network.github.io/documentation/wiki/roles-maintainer/) | Unresolved | Original and rendered article plus mapped AI guide read; historical role or process claims need more primary-source checking before a proposal. |
| [Security Team](https://bisq-network.github.io/documentation/wiki/security-team/) | Unresolved | Original, rendering and mapped guide read; current status or other narrow edits remain to be checked. |
| [Security Team Lead](https://bisq-network.github.io/documentation/wiki/security-team-lead/) | Unresolved | Original and rendered article plus mapped AI guide read; historical role or process claims need more primary-source checking before a proposal. |
| [Stakeholder](https://bisq-network.github.io/documentation/wiki/stakeholder/) | Unresolved | Read source, rendering and mapped AI guide; historical process claims still need a narrow source-checked disposition. |
| [Standup](https://bisq-network.github.io/documentation/wiki/standup/) | Unresolved | Original and rendered article plus mapped AI guide read; historical role or process claims need more primary-source checking before a proposal. |
| [Support Team](https://bisq-network.github.io/documentation/wiki/support-team/) | Unresolved | Original, rendering and mapped AI guide read; current role or process details require further primary-source verification before a narrow edit. |
| [Support Team Lead](https://bisq-network.github.io/documentation/wiki/support-team-lead/) | Unresolved | Original and rendered article plus mapped AI guide read; historical role or process claims need more primary-source checking before a proposal. |
| [Templates as macros](https://bisq-network.github.io/documentation/wiki/templates-as-macros/) | Unresolved | Original, rendering and mapped AI guide read; current role or process details require further primary-source verification before a narrow edit. |
| [Translation](https://bisq-network.github.io/documentation/wiki/translation/) | Unresolved | Read source, rendering and mapped guide; present workflow and compensation claims need primary-source confirmation. |
| [Ubiquitous law enforcement](https://bisq-network.github.io/documentation/wiki/ubiquitous-law-enforcement/) | Unresolved | Read full source, rendering and guide; no independently verified narrow correction has yet been selected. |
| [Wiki Operator](https://bisq-network.github.io/documentation/wiki/wiki-operator/) | Unresolved | Original and rendered article plus mapped AI guide read; historical role or process claims need more primary-source checking before a proposal. |
| [Wiki style guidelines](https://bisq-network.github.io/documentation/wiki/wiki-style-guidelines/) | Unresolved | Read source, rendering and mapped guide; present workflow and compensation claims need primary-source confirmation. |
| [YouTube Admin](https://bisq-network.github.io/documentation/wiki/youtube-admin/) | Unresolved | Original and rendered article plus mapped AI guide read; historical role or process claims need more primary-source checking before a proposal. |
| [ACH Transfer](https://bisq-network.github.io/documentation/wiki/ach-transfer/) | Rejected: lossy rewrite | The original already gives the essential third-party ACH/micro-deposit warning, bank compatibility, routing/name checks and buyer/seller/dispute steps. The AI guide mainly compresses these into a generic reference. Retain the original detailed workflow; no additional verified substantive correction identified. |
| [Altcoins](https://bisq-network.github.io/documentation/wiki/altcoins/) | Unresolved | Preserve the complete original supported-market discussion, new-asset-hold link and coin-proof links. The AI guide qualifies the old indefinite hold and supported-asset wording, but current admission policy was not independently established; do not silently replace it or merge away the article. |
| [Capitual](https://bisq-network.github.io/documentation/wiki/capitual/) | Unresolved | Read the complete CapCode generation/locked-balance/redemption and currency-route instructions, old fee table and AI qualifiers. Current provider access/CapCode operation was not verified from a usable official source; do not delete the historical workflow or invent replacement fees/support. |
| [Domestic Wire Transfer](https://bisq-network.github.io/documentation/wiki/domestic-wire-transfer/) | Rejected: lossy rewrite | The original already identifies US/USD,three-day client window,bank sending/receiving fees and full buy/sell evidence process. The AI guide removes concrete steps and quotes while mainly adding generic checks. No verified specific fee correction identified. |
| [Face-to-face (payment method)](https://bisq-network.github.io/documentation/wiki/face-to-face-payment-method/) | Rejected: lossy rewrite | The original contains account fields,visible offer terms,public-meeting/cash-validation advice,both-client completion and dispute limitations. Reject shortening that removes these operational details. The AI caveats about possible outcomes do not establish a new specific policy correction. |
| [Faster Payments System SBP](https://bisq-network.github.io/documentation/wiki/faster-payments-system-sbp/) | Unresolved | Retain Russian RUB/phone/bank selection,member-institution setup and original fee/limit descriptions. The AI correctly distinguishes UK FPS but that is already explicit in the original; newer provider thresholds require current official evidence and were not invented. |
| [Issues with fiat payments](https://bisq-network.github.io/documentation/wiki/issues-with-fiat-payments/) | Rejected: lossy rewrite | Read every bank-intervention outcome and the distinct Bisq1 post-payout versus Easy no-deposit scenarios. The original already explains those limits and private evidence. Reject the AI summary as a replacement because it condenses case distinctions; no additional narrow correction was established. |
| [Monese](https://bisq-network.github.io/documentation/wiki/monese/) | Unresolved | Retain currency/eligibility/RON-document and internal-transfer details. The AI mainly qualifies old country/fee claims, but current provider-specific terms were not independently verified here; do not substitute generic warnings for that content. |
| [Nequi](https://bisq-network.github.io/documentation/wiki/nequi/) | Unresolved | Original COP/account-tier/tax and fee figures were compared with the AI qualifiers. A current official replacement for these specific figures was not established; no invented Bancolombia/KYC/tax advice or deletion of the method workflow. |
| [Revolut](https://bisq-network.github.io/documentation/wiki/revolut/) | Unresolved | Original already explains internal-transfer scope,Revtag setup,matching payer,signing timeline and troubleshooting,with image. AI removes detailed steps and scopes fixed limits; runtime-limit context is handled elsewhere. The current provider Revtag formatting/privacy behavior and categorical bank-rail ban were not independently verified, so no new replacement claim is published. |
| [SEPA Instant](https://bisq-network.github.io/documentation/wiki/sepa-instant/) | Unresolved | Retain the complete instant-bank capability/fallback evidence,one-day client period and ordinary-SEPA distinction. The AI rejects a source-specific no-penalty promise, but current mediation policy for that exact fallback was not independently established; do not replace it with an invented penalty rule. |
| [SWIFT](https://bisq-network.github.io/documentation/wiki/swift/) | Unresolved | Original currency,intermediary,fee options and SHA requirement compared in full. Current Bisq UI independently still requires SHA. AI omits the fixed wrong-currency penalty and qualifies DO NOT CONVERT; exact current penalty/exception policy was not proven here, so preserve and mark unresolved rather than claim a correction. |
| [Sepa](https://bisq-network.github.io/documentation/wiki/sepa-p550/) | Rejected: lossy rewrite | This six-word article is already a simple link to SEPA. Keep its title/route/link; the AI merger does not supply a wording correction. |
| [Trading GRIN](https://bisq-network.github.io/documentation/wiki/trading-grin/) | Unresolved | Retain slatepack direction,full txs/export_proof/verify_proof procedure,proof fields,atomic-unit example and dispute-agent checks. The AI qualifies exclusive-wallet and chain-verification claims, but those proposed corrections were not traced to current upstream wallet implementation; no speculative rewrite or endpoint replacement. |
| [Trading L-BTC](https://bisq-network.github.io/documentation/wiki/trading-l-btc/) | Unresolved | Retain receiver blinding-key requirement,Elements import/rescan verification sequence,peg comparison and all commands. The AI qualifies Green-wallet exclusivity/current peg timing; a full current wallet-capability/peg-policy check was not completed, so no unsupported replacement or procedure deletion. |
| [Wise](https://bisq-network.github.io/documentation/wiki/wise/) | Unresolved | Original email-discovery,per-currency primary/balance setup and buyer-name check were read against the AI guide. Exact current provider UI/funding route was not independently verified; do not remove those steps or add an unproven universal payer rule. |

The restored source snapshot dates from 18 October 2026. The retained AI edition is comparison material, not an approved replacement for the source articles.
