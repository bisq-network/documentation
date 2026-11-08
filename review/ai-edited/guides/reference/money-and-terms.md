---
title: Bitcoin, money and terminology
description: Units and context for common terms in Bisq discussions.
---

*Reference checked 7 November 2026 · Maintainer review pending.*

## Bitcoin units

One bitcoin equals **100,000,000 satoshis**; one satoshi is 0.00000001 BTC. A bit is commonly used for 100 satoshis, or 0.000001 BTC. Millisatoshis are thousandths of a satoshi used in some off-chain accounting, not a separately spendable on-chain Bitcoin output. The recovered page also proposed many less-common unit names and symbols; they are proposals, not universal conventions. The historical proposal also listed names such as nick (0.1 BTC), cent (0.01 BTC), hal (0.001 BTC), den (0.0001 BTC), mil (0.00001 BTC), ten (10 satoshis) and sub-satoshi names. These are not universal conventions. Write units explicitly to avoid confusion.

The source's proposed names are retained here for interpretation of that historical page, not as a recommendation or standard:

| Proposed name | BTC | Satoshis |
| --- | ---: | ---: |
| Nakamoto | 1,000,000 | 100,000,000,000,000 |
| Fin | 100,000 | 10,000,000,000,000 |
| wei | 10,000 | 1,000,000,000,000 |
| thou | 1,000 | 100,000,000,000 |
| Cot | 100 | 10,000,000,000 |
| dex | 10 | 1,000,000,000 |
| nick | 0.1 | 10,000,000 |
| cent | 0.01 | 1,000,000 |
| hal | 0.001 | 100,000 |
| den | 0.0001 | 10,000 |
| mil | 0.00001 | 1,000 |
| bit | 0.000001 | 100 |
| ten | 0.0000001 | 10 |
| satoshi | 0.00000001 | 1 |
| shi | 0.000000001 | 0.1 |
| back | 0.0000000001 | 0.01 |
| millisat | 0.00000000001 | 0.001 |
| nak | 0.000000000001 | 0.0001 |

Amounts below one satoshi are not on-chain output units. The same word, such as “wei,” can mean something different in another system.

## Fiat

Fiat currency is money issued by a government, such as euros or US dollars. In a Bisq trade, the non-bitcoin payment is made through the agreed payment method outside the Bisq application. Bank and payment-provider rules, reversibility, fees and privacy differ; do not assume all methods have the same risk.

## CBDC

A central bank digital currency is a digital form of central-bank money. Designs and legal frameworks differ. The recovered page discussed potential programmability, privacy, exclusion and surveillance risks, but its country-by-country status and user counts are a dated snapshot and contained errors. The old list covered projects including e-CNY, e-Naira and the digital euro, but its figures are not a current tracker. Evaluate concrete system designs and current primary sources rather than assuming every CBDC has identical capabilities or protections.

## Ubiquitous law enforcement

The recovered glossary used this term to describe a concern that pervasive connected systems could enable monitoring or enforcement at scale. That is a political and technical risk framing, not evidence that every digital-payment system has those properties. Privacy, oversight and control depend on actual design and governance.

## FOSS

Free and open-source software makes source code available under licenses that permit specified uses, study, modification and distribution. The exact obligations depend on the license. Bisq publishes its code openly; consult each repository's license for its terms.

## Bitcoin holidays

The recovered page listed community observances such as 3 January (genesis block/Proof of Keys), 22 May (Bitcoin Pizza Day), and 31 October (the 2008 white paper). It also listed 5 April (a date associated with Satoshi Nakamoto), 15 August (the 1971 end of US dollar gold convertibility), 23 December (the 1913 Federal Reserve Act), and halvings at 210,000-block intervals. These are historical or community observances, not trading schedules. The source recorded halvings at blocks 210,000, 420,000, 630,000 and 840,000, reducing the block reward from 50 to 25, 12.5, 6.25 and 3.125 BTC respectively. Calendar dates for future block-height events are estimates.

## Glossary

A **core use case** is an action needed to trade or manage funds. A **critical bug** is a problem that prevents a core use case, repeatedly drives users to support, or threatens funds or privacy. See [critical-bug triage](../../contribute/workflow/#critical-bugs) for how to report one safely.

## Sources and review

The [Bitcoin vocabulary](https://bitcoin.org/en/vocabulary), [Bitcoin white paper](https://bitcoin.org/bitcoin.pdf), [BIS CBDC system-design report](https://www.bis.org/publications/central-bank-digital-currencies-system-design), [Bisq source repository](https://github.com/bisq-network/bisq), and [Bisq pricenode repository](https://github.com/bisq-network/bisq-pricenode) were checked 7 November 2026 for technical context. Historical wiki pages supplied the terms and observance list. Country-specific CBDC status, political claims and proposed nonstandard unit names were not independently verified. Maintainer review is pending.
