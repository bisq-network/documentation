---
title: "Payment account age witness"
slug: "wiki/payment-account-age-witness"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details><summary>On this page</summary><ul><li><a href="#problem">Problem</a></li><li><a href="#overview">Overview</a></li><li><a href="#accountagewitness">AccountAgeWitness</a></li><li><a href="#accountagewitness-data-object">AccountAgeWitness data object</a></li><li><a href="#accountagewitness-propagation">AccountAgeWitness propagation</a></li><li><a href="#offer">Offer</a></li><li><a href="#verification">Verification</a></li><li><a href="#attempts-to-game-the-system">Attempts to game the system</a></li><li><a href="#broadcasting-a-back-dated-accountagewitness-object">Broadcasting a back-dated AccountAgeWitness object</a></li><li><a href="#hijacking-a-foreign-accountagewitness">Hijacking a foreign AccountAgeWitness</a></li><li><a href="#changing-a-foreign-accountagewitness">Changing a foreign AccountAgeWitness</a></li><li><a href="#using-an-older-version-of-bisq">Using an older version of Bisq</a></li><li><a href="#user-interface">User interface</a></li><li><a href="#salt-management">Salt management</a></li><li><a href="#update-and-migration-process">Update and migration process</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en"><p><strong>Payment account age witness</strong> is a mechanism to protect against bank fraud when doing fiat transactions with strangers on the internet.</p>
<p>Payment account aging worked well for about 2 years until it was significantly improved in v1.5 with <a href="../account-limits/#account-signing">account signing</a>.</p>
<p><em>This article is adapted from <a href="https://github.com/bisq-network/bisq-docs/blob/master/payment-account-age-witness.adoc" rel="noopener noreferrer">a document</a> originally hosted on the old documentation website (<a href="https://docs.bisq.network" rel="noopener noreferrer">https://docs.bisq.network</a>). It was written by Manfred Karrer and originally published on 14 September 2017.</em></p>
<span class="wiki-legacy-anchor" id="Problem" aria-hidden="true"></span><h2 id="problem"> Problem </h2>
<p>Because bank transfers can be canceled and bitcoin transactions cannot be canceled, buying bitcoin with a stolen bank account is an attractive proposition for criminals. If a criminal does manage to buy bitcoin with Bisq using a stolen bank account, the rightful owner of the stolen bank account will probably discover the fraud and immediately cancel the payment (i.e., initiate a chargeback). Unfortunately, the bitcoin seller will have already unlocked their deposit and will lose the fiat payment they received.</p>
<p>Payment account aging seeks to make it less practical for a criminal to cash out a stolen bank account in this way.</p>
<p>The account aging protection mechanism described in this article assumes the following:</p>
<ul>
<li>a criminal will want to withdraw funds from a stolen account as quickly as possible</li>
<li>a criminal would prefer to do a few large transactions instead of many small transactions (because with each transaction, risk of the fraud being discovered goes higher)</li>
</ul>
<p>With trade size limits in Bisq, there already is some protection against this fraud scheme, but it would be even better to increase security even more by adding a verification scheme for the age of the payment account within Bisq.</p>
<p>To protect user privacy we use a hashing scheme. Only the other trading peer (who gets the other peer's payment account data anyway, so they can make the payment) can verify that the hash provided in the offer matches the peer's payment account hash.</p>
<span class="wiki-legacy-anchor" id="Overview" aria-hidden="true"></span><h2 id="overview"> Overview </h2>
<p>The initial idea for this scheme was already discussed on the Bisq forum (<a href="https://forum.bisq.io/t/new-requirement-for-payment-accounts-with-chargeback-risk/2376/65" rel="noopener noreferrer">one</a>, <a href="https://forum.bisq.io/t/payment-account-age-based-trade-amount-limits/2948" rel="noopener noreferrer">two</a>).</p>
<p>This mechanism is only relevant for fiat payment accounts, because with altcoins, there is no chargeback risk.</p>
<p>We posit that a 60-day-old payment account should be safe (it seems highly unlikely that a stolen bank account will not get discovered for such a long time). <strong>This is the core premise of account aging</strong>: from the time a user sets up a payment account in Bisq, until 60 days later, Bisq limits the size of trades handled by that payment account.</p>
<p>Cheating this mechanism would be difficult because a scammer cannot know a stolen account's information before stealing the account.</p>
<p>Consequently, we use following trade limits:</p>
<ul>
<li>Account age is 0-30 days: 25% of the payment method's maximum (e.g. 0.125 BTC if maximum is 0.5 BTC)</li>
<li>Account age is 30-60 days: 50% of the payment method's maximum (e.g. 0.25 BTC if maximum is 0.5 BTC)</li>
<li>Account age is 60+ days: 100% of the payment method's maximum (e.g. 0.50 BTC if maximum is 0.50 BTC)</li>
</ul>
<p><em>Please note that the numbers above are for illustration purposes only; trade size limits will fluctuate based on BTC market price. See <a href="../payment-methods/">trade limits</a> for a listing of payment methods and their maximum allowed trade sizes.</em></p>
<span class="wiki-legacy-anchor" id="AccountAgeWitness" aria-hidden="true"></span><h2 id="accountagewitness"> AccountAgeWitness </h2>
<p>When a user sets up a fiat payment account (e.g. SEPA, Zelle, etc​) in Bisq, he publishes an AccountAgeWitness data object to the P2P network.</p>
<span class="wiki-legacy-anchor" id="AccountAgeWitness_data_object" aria-hidden="true"></span><h3 id="accountagewitness-data-object"> AccountAgeWitness data object </h3>
<p>The AccountAgeWitness object contains a hash and the date of publishing.</p>
<p><code>// Ripemd160(Sha256(ageWitnessInputData, salt and pubKey)) - 20 bytes</code><br>
<code>private final byte[] hash;</code><br>
<code>// 8 bytes</code><br>
<code>private final long date;</code></p>
<p>The hash is created with Sha256 and wrapped into a Ripemd160 hash to get a 20 byte hash instead of 32 bytes as it would be with Sha256. Input for the hash is a concatenation of the ageWitnessInputData (e.g. IBAN), a 256 bit salt and the pubKey. The ageWitnessInputData is the smallest set of uniquely identifying payment account data (e.g. concatenated IBAN and BIC). We don’t use the complete payment account data because we don’t want to break an existing ageWitness by minor changes like changing the holder name (e.g. adding middle name). The public key is used in the verification process to check the signature which will get passed in the trade process. That will assure that the AccountAgeWitness data cannot be used by anyone else (see: <a href="../payment-account-age-witness/#hijacking-a-foreign-accountagewitness">Hijacking a foreign AccountAgeWitness</a>). The application wide 1024 bit DSA signing key is used. Signature algorithm is "SHA256withDSA".</p>
<p>The salt value will be locally persisted with the payment account object.</p>
<p>The date must not be older or newer than 1 day compared to a receiving peer’s local date. If the date is outside of that tolerance range the AccountAgeWitness object will get ignored and not further broadcasted. With that check we protect against back-dating attempts (see: <a href="../payment-account-age-witness/#broadcasting-a-back-dated-accountagewitness-object">Broadcasting a back-dated AccountAgeWitness object</a>). We allow a rather large tolerance because computer clocks might be out of sync and the relevant periods are rather long (30 or 60 days), so the max. gain from an abuse of that tolerance window of 1 day is negligible.</p>
<p>This AccountAgeWitness data structure results in 28 bytes per item but as we use Protobuffer there is some overhead added which results in 33 bytes per data item. If we store 1 000 000 AccountAgeWitness objects we would have about 33 MB of data. The data are locally persisted and with every release we ship the latest state in a resource file. That helps that new users don’t need to retrieve all data from the P2P network. We also use a diff when requesting so we only request the missing data from the seed node at startup.</p>
<p>If the data would become too large, we can consider a time-to-live (TTL) mechanism where AccountAgeWitness objects need to get triggered with a refresh message to stay active. That way outdated objects which have not received any TTL signal since a long period (e.g. 6 months) would get pruned.</p>
<p><code>// class AccountAgeWitnessService</code><br>
<code>public AccountAgeWitness getMyWitness(PaymentAccountPayload paymentAccountPayload) {</code><br>
<code>    byte[] accountInputDataWithSalt = Utilities.concatenateByteArrays(paymentAccountPayload.getAgeWitnessInputData(),</code><br>
<code>    paymentAccountPayload.getSalt());</code><br>
<code>    byte[] hash = Hash.getSha256Ripemd160hash(Utilities.concatenateByteArrays(accountInputDataWithSalt,</code><br>
<code>        keyRing.getPubKeyRing().getSignaturePubKeyBytes()));</code><br>
<code>    long date = new Date().getTime();</code><br>
<code>    return new AccountAgeWitness(hash, date);</code><br>
<code>}</code><br>
<br>
<code>// getAgeWitnessInputData at example class SepaAccount</code><br>
<code>public byte[] getAgeWitnessInputData() {</code><br>
<code>       // We don't add holderName because we don't want to break age validation if the user recreates an account with</code><br>
<code>       // slight changes in holder name (e.g. add or remove middle name)</code><br>
<code>       return super.getAgeWitnessInputData(ArrayUtils.addAll(iban.getBytes(Charset.forName("UTF-8")),</code><br>
<code>       bic.getBytes(Charset.forName("UTF-8"))));</code><br>
<code>   }</code><br>
<br>
<code>// CountryBasedPaymentAccountPayload super class</code><br>
<code>@Override</code><br>
<code>protected byte[] getAgeWitnessInputData(byte[] data) {</code><br>
<code>    return super.getAgeWitnessInputData(ArrayUtils.addAll(countryCode.getBytes(Charset.forName("UTF-8")), data));</code><br>
<code>}</code><br>
<br>
<code>// PaymentAccountPayload base class</code><br>
<code>protected byte[] getAgeWitnessInputData(byte[] data) {</code><br>
<code>    return ArrayUtils.addAll(paymentMethodId.getBytes(Charset.forName("UTF-8")), data);</code><br>
<code>}</code><br>
<br>
<code>// Getting salt from CryptoUtils, called from PaymentAccountPayload constructor with size 32</code><br>
<code>public static byte[] getRandomBytes(int size) {</code><br>
<code>      byte[] bytes = new byte[size];</code><br>
<code>      new SecureRandom().nextBytes(bytes);</code><br>
<code>      return bytes;</code><br>
<code>}</code></p>
<span class="wiki-legacy-anchor" id="AccountAgeWitness_propagation" aria-hidden="true"></span><h3 id="accountagewitness-propagation"> AccountAgeWitness propagation </h3>
<p>The user will publish the AccountAgeWitness data when setting up the payment account and re-publish at each startup to ensure higher redundancy. Peers who have the data already will not broadcast it further.</p>
<p>The AccountAgeWitness data will be distributed in the P2P network and stored locally at each user. At each new release we will ship the actual data set as resource file (e.g. <code class="wiki-source-code" id="source-code-1">PersistableNetworkPayload_BTC_MAINNET</code>) with the application binary to avoid that new users need to download the complete data set.</p>
<p>When a node receives an AccountAgeWitness object it verifies that the tradeDate is not older or newer than 1 day compared with the local time of the node, otherwise it will reject the object. The date check is only done when receiving the data via the P2P network broadcasting, otherwise we could not fill up our initial map received form the seed node with the past distributed AccountAgeWitness objects.</p>
<p>NOTE: There is no date check for the data we receive from seed nodes. This is in the current state not an issue because the seed nodes are bonded with BSQ against abuse but in future improvements we would like to distribute more functions from the seed node to ordinary nodes and then there is a security issue with that.</p>
<aside class="wiki-admonition" role="note"><p><strong>Note</strong></p><p>There is no date check for the data we receive from seed nodes. This is currently not an issue because seed nodes are <a href="../introduction-to-the-dao/#ensure-honesty-in-high-trust-roles">bonded with BSQ</a> against abuse but in future improvements we would like to distribute more functions from the seed node to ordinary nodes and then there is a security issue with that.</p>
</aside>
<span class="wiki-legacy-anchor" id="Offer" aria-hidden="true"></span><h3 id="offer"> Offer </h3>
<p>The offer maker will add the hash used in the AccountAgeWitness object to his offer. With that hash all users can look up if they have an AccountAgeWitness matching the hash and if so they can evaluate the account age. The account age will be visually displayed in the offerbook. At that stage nobody can verify if the hash is matching the real payment account data. But this is not a problem because the verification will be done once someone takes the offer. A fraudulent offer would cause a failure in the take offer process.</p>
<span class="wiki-legacy-anchor" id="Verification" aria-hidden="true"></span><h3 id="verification"> Verification </h3>
<p>When a trader takes an offer both users are exchanging in the trade process the signature of data defined by the other peer (for taker we use the offer ID, for maker we use the takers preparedDepositTx - we use that data like a nonce for the signature), the pubKey, the salt and the peer’s local date. With that data the other peer can verify that the other trader is the owner of the AccountAgeWitness data (as the pubKey is part of the hash and the signature gets verified with pubKey and predefined input data) and that the hash is matching the account data used for the trade. As the date of both users will differ at least slightly we exchange the peer’s local date and use that for calculating the age and trade limit. The date needs to be inside a 1 day tolerance otherwise the trade fails. That way we avoid problems with corner cases when the age just enters the next level for one peer but the verifying peer might get another result because of time differences. Any violation of those rules would lead to a failed trade.</p>
<p>Verification steps:</p>
<ol>
<li>Check if witness date is after release date for that feature (v0.6 or newer)</li>
<li>Check if peer’s date is within 1-day tolerance window</li>
<li>Verify if witness hash matches hash created from the data delivered by peer (ageWitnessInputData, salt, pubKey)</li>
<li>Check if peer’s trade limit calculated with its account age is not lower than the trade amount.</li>
<li>Verify if signature of the predefined input data (offer ID or preparedDepositTx) is correct using the peer’s pubKey.</li>
</ol>
<p>By using offer ID and preparedDepositTx for the nonce, we avoid the need for a challenge protocol. We have chosen data which are defined by the other peer so they cannot be manipulated.</p>
<span class="wiki-legacy-anchor" id="Attempts_to_game_the_system" aria-hidden="true"></span><h2 id="attempts-to-game-the-system"> Attempts to game the system </h2>
<span class="wiki-legacy-anchor" id="Broadcasting_a_back-dated_AccountAgeWitness_object" aria-hidden="true"></span><h3 id="broadcasting-a-back-dated-accountagewitness-object"> Broadcasting a back-dated AccountAgeWitness object </h3>
<p>We need to be sure that the date of the trade in the AccountAgeWitness object cannot be back-dated by a malicious trader. To achieve that, any node will ignore AccountAgeWitness objects which are older or newer than 1 day.</p>
<span class="wiki-legacy-anchor" id="Hijacking_a_foreign_AccountAgeWitness" aria-hidden="true"></span><h3 id="hijacking-a-foreign-accountagewitness"> Hijacking a foreign AccountAgeWitness </h3>
<p>A more advanced fraud approach would be an attempt of hijacking someone else’s AccountAgeWitness and payment account to gain the benefit of an already aged account.</p>
<p>A malicious trader could make a trade with someone who has already an old account and takes the account data of that trader to use it for an own account. That fake account can only be used for buying BTC because for selling he would not receive the Fiat money but the user from where he has "stolen" the data. Because he has traded with the peer he has received all the relevant data for the verification like the salt and the pubKey. To protect against such a hijacking attempt we use the peer’s signature to verify ownership of the AccountAgeWitness data. Without the private key the fraudster cannot create a correct signature matching the pubKey and input data. The public key is used for the hash in the AccountAgeWitness so he cannot alter that. The signed data is defined by the other peer and different for each trade so he has no chance to use data where he knows already the signature.</p>
<span class="wiki-legacy-anchor" id="Changing_a_foreign_AccountAgeWitness" aria-hidden="true"></span><h3 id="changing-a-foreign-accountagewitness"> Changing a foreign AccountAgeWitness </h3>
<p>The AccountAgeWitness data are appended in a data structure which is only protected by checking if the date in the AccountAgeWitness object is not older or newer than 1 day compared to the current date of the local node. Once data is stored there it cannot be altered. It uses the AccountAgeWitness hash as key in a hash map. There is no way to change an already broadcasted AccountAgeWitness object.</p>
<p>One sophisticated attack could be to alter the date in an AccountAgeWitness to a far future date thus occupying the map entry by the hash and preventing the originator of the data to get propagated his real account age. To prevent that we check that the date is also not <strong>newer</strong> than 1 day. So worst an attacker could do is to fake ones AccountAgeWitness date by 1 day to past or future. That will not have any effects as we use a 1 day tolerance window at the verification.</p>
<span class="wiki-legacy-anchor" id="Using_an_older_version_of_Bisq" aria-hidden="true"></span><h3 id="using-an-older-version-of-bisq"> Using an older version of Bisq </h3>
<p>Account aging was implemented in Bisq 0.6, so a user may try to use an older version of Bisq to get around the account aging mechanism. To avoid this, the network will stop supporting offers made with Bisq programs before v0.6 on February 15 2018. There will be a fade-in period for the feature so users have a chance to get their accounts aged to &gt;2 months without hitting trade limits. Offers using payment accounts without an account age witness will be rejected after February, 15, 2018.</p>
<span class="wiki-legacy-anchor" id="User_interface" aria-hidden="true"></span><h2 id="user-interface"> User interface </h2>
<p>From a user perspective the changes are visible in the create offer screen, take offer screen, the offerbook and the payment account. The trade amount limits are reflected and feedback will be provided if the user tries to take an offer with a higher amount as his account age permits. The user icon in the offerbook will contain a colored ring around the icon representing the account age. The tooltip and the peer info box (opens when clicking the icon) will add textual information about the account age. Offers with a min. trade amount exceeding the users account age based limit are greyed out and on click the user gets a popup displayed with information why he cannot take that offer. The create offer and take offer screens have the trade amount input validators adjusted to reflect the trade limit. In the payment account screen the user can see the age, the limit and the salt.</p>
<span class="wiki-legacy-anchor" id="Salt_management" aria-hidden="true"></span><h3 id="salt-management"> Salt management </h3>
<p>If the user changes his payment account or start over with a new application we need to support that he can re-use the salt he used with a certain bank account. We added an extra field in the payment account setup screen where the user can add a past salt (by default the app generates a random salt).</p>
<span class="wiki-legacy-anchor" id="Update_and_migration_process" aria-hidden="true"></span><h2 id="update-and-migration-process"> Update and migration process </h2>
<p>We don’t want to disrupt the trade experience for existing traders by reducing the trade amount limit to the lowest level when we publish that update. Also existing offers would get rendered invalid.</p>
<p>To fade in that feature we use a date-based approach.</p>
<ul>
<li>Before December, 15, 2017 (about 1.5 months after release) we don’t apply the lower limit based on the account age.</li>
<li>After that date and before January, 15, 2018 we only apply a factor of 0.75 to those which are less then 30 days old. Accounts which are 30-60 days old are not affected (no reduction).</li>
<li>After that date and before February, 15, 2018 we apply a factor of 0.75 to the default limit for accounts which are 30-60 days old and 0.5 to those which are less then 30 days old.</li>
<li>After February, 15, 2018 we apply the target factor of 0.5 to the default limit for accounts which are 30-60 days old and 0.25 to those which are less than 30 days old.</li>
</ul>
<p>Offers which do not contain the accountAgeWitness hash (i.e. those created before v0.6) will become invalid after February 2018. This is important because we need to make it very difficult (ideally, impossible) to circumvent the account age verification scheme.</p>
<p>The trade amount limit is part of the OfferPayload, so it is flexible with changes in updates and the value at offer creation time will be taken for both traders even if the hard coded value in the application would have been changed in an update and one of the traders have not updated yet. The reduction factors and the time schedule is not part of the offer and cannot be changed in future updates without breaking backward compatibility. We consider that risk acceptable and choose not to add that data to the offer to not overload the offer with details.</p>
</div>
