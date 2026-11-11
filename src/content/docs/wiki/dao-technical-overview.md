---
title: "DAO technical overview"
slug: "wiki/dao-technical-overview"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details><summary>On this page</summary><ul><li><a href="#bsq-token">BSQ token</a></li><li><a href="#infrastructure">Infrastructure</a></li><li><a href="#nodes">Nodes</a></li><li><a href="#full-nodes">Full nodes</a></li><li><a href="#lite-nodes">Lite nodes</a></li><li><a href="#seed-nodes">Seed nodes</a></li><li><a href="#external-dao-monitor">External DAO monitor</a></li><li><a href="#bsq-block-explorer">BSQ block explorer</a></li><li><a href="#bsq-integration-in-bisq">BSQ integration in Bisq</a></li><li><a href="#wallet">Wallet</a></li><li><a href="#application-internal-dao-monitor">Application internal DAO monitor</a></li><li><a href="#snapshots">Snapshots</a></li><li><a href="#snapshots-shipped-in-releases">Snapshots shipped in releases</a></li><li><a href="#blockchain-related-data">Blockchain-related data</a></li><li><a href="#genesis-tx">Genesis tx</a></li><li><a href="#transfer-bsq-tx">Transfer BSQ tx</a></li><li><a href="#trade-fee-tx">Trade fee tx</a></li><li><a href="#proposal-tx">Proposal tx</a></li><li><a href="#compensation-request-tx-reimbursement-request-tx">Compensation request tx/Reimbursement request tx</a></li><li><a href="#blind-vote-tx">Blind vote tx</a></li><li><a href="#vote-reveal-tx">Vote reveal tx</a></li><li><a href="#lockup-tx">Lockup tx</a></li><li><a href="#unlock-tx">Unlock tx</a></li><li><a href="#asset-listing-fee-tx">Asset listing fee tx</a></li><li><a href="#proof-of-burn-tx">Proof of burn tx</a></li><li><a href="#p2p-network-payloads">P2P network payloads</a></li><li><a href="#temporary-proposal-payload">Temporary proposal payload</a></li><li><a href="#proposal-payload">Proposal payload</a></li><li><a href="#blind-vote-payload">Blind vote payload</a></li><li><a href="#governance">Governance</a></li><li><a href="#phases">Phases</a></li><li><a href="#proposal-phase">Proposal phase</a></li><li><a href="#blind-vote-phase">Blind Vote phase</a></li><li><a href="#vote-reveal-phase">Vote reveal phase</a></li><li><a href="#vote-result-phase">Vote result phase</a></li><li><a href="#dao-parameters">DAO Parameters</a></li><li><a href="#bonded-roles">Bonded roles</a></li><li><a href="#bonded-reputation">Bonded reputation</a></li><li><a href="#asset-listing-fee">Asset listing fee</a></li><li><a href="#proof-of-burn">Proof of burn</a></li><li><a href="#disclaimer">Disclaimer</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en"><p>In this <strong>technical overview</strong>, you will see:</p>
<ul>
<li>what BSQ tokens actually are, how they’re created, and how they’re destroyed</li>
<li>the various functions of the Bisq DAO and how BSQ enables them</li>
</ul>
<p>Several example transactions are included so you can explicitly see the processes.</p>
<span class="wiki-legacy-anchor" id="BSQ_token" aria-hidden="true"></span><h2 id="bsq-token"> BSQ token </h2>
<p>BSQ is a colored coin based on Bitcoin. One BSQ is represented by 100 bitcoin satoshis.</p>
<p>The colored coin concept does not require OpReturn data but uses the transaction graph to determine if a tx output originates in either the genesis tx or an issuance transaction.</p>
<p>BSQ inherits all the transaction rules from Bitcoin and adds some additional rules. Even though BSQ transactions do not require <code class="wiki-source-code" id="source-code-1">OP_RETURN</code>, it will be used for certain specialized transactions (voting, compensation requests, etc). Aside from the ancestry to the genesis or an issuance transaction, there is another important rule: the outputs are parsed in a way that the first outputs are interpreted as BSQ as long there is sufficient BSQ value available from the inputs. So the order of BSQ and BTC outputs is essential! For inputs the order is irrelevant. Any violation of those rules would make BSQ invalid. There are many more details which are not currently covered in this document.</p>
<p>We use the Bisq P2P network as a carrier for content-rich data like that of proposals or voting. The blockchain is used for timestamping that data. Both the P2P network data and the tx are linked together and are used for creating network consensus.</p>
<p>BSQ is a result of blockchain-related data and P2P network data.</p>
<span class="wiki-legacy-anchor" id="Infrastructure" aria-hidden="true"></span><h2 id="infrastructure"> Infrastructure </h2>
<p>The Bisq DAO is based on Bitcoin blockchain data as well as on data from the Bisq P2P network. Each Bisq application verifies the rules of the DAO. The degree of trust to data delivered from other nodes can be determined by the user. Running a full DAO node requires running bitcoind with RPC enabled. The DAO state can be rebuilt from the genesis transaction. The only remaining trusted entity are then the seed nodes which deliver past P2P network data. As seed node operators are bonded, risk for abuse is very limited. There are (at the moment) 8 seed nodes and all need to be in consensus on P2P network data. The user can see the consensus in the application (Network Monitor tab).</p>
<span class="wiki-legacy-anchor" id="Nodes" aria-hidden="true"></span><h3 id="nodes"> Nodes </h3>
<p>A user can decide to run the application as lite node or full node. By default it runs as lite node as that does not require any additional setup.</p>
<span class="wiki-legacy-anchor" id="Full_nodes" aria-hidden="true"></span><h4 id="full-nodes"> Full nodes </h4>
<p>A fully-validating BSQ node requires a Bitcoin Core node to verify blockchain data. RPC is used for communication. Setup details are in <a href="https://github.com/bisq-network/bisq/blob/master/docs/dao-setup.md" rel="noopener noreferrer">source code documentation</a>.</p>
<p>Full nodes receive a notification from Bitcoin Core at each new block, scan the block for BSQ transactions and broadcast those to the Bisq P2P network. Every transaction with any BSQ input or output (issuance) is considered a BSQ transaction. The full node also listens to network messages from lite nodes which request BSQ blocks from a certain block height. The full node sends back the list of all blocks since the requested height. The bandwidth requirements for this will depend on the number of BSQ transactions, but rough estimations suggest that there will be no considerable issues. Bisq seed nodes are used as full nodes since those are the first nodes to which a user gets connected and we can use the existing connection to transmit the additional data early in the startup process.</p>
<span class="wiki-legacy-anchor" id="Lite_nodes" aria-hidden="true"></span><h4 id="lite-nodes"> Lite nodes </h4>
<p>Most users will likely operate in lite node mode. They have to trust the seed node operators that they are not all colluding and holding data back. If at least one operator is honest the lite node can detect a conflict and would re-validate each block from the last snapshot or even from the genesis block. The UI will notify the user about conflicting data from seed nodes.</p>
<p>At startup, a lite node requests the missing BSQ blocks from the seed node and then validates those blocks to achieve a local state of valid and unspent BSQ outputs. In case of chain splits it can be that one of the seed nodes is on another chain and conflicting blocks get propagated. This would trigger a re-validation of all blocks from the latest snapshot for the lite node. The last received block would be considered the current state but the user will see a message saying there are conflicts (and that it is recommended to wait for more than one confirmation before considering a BSQ transaction as valid). Only after all full nodes (seed nodes) have the same state again will the lite node exit the "warning" state. If the user waits for a sufficiently high number of confirmations (4-6) he will not risk that his validation was based on an orphaned chain and that he could become victim of a double spend.</p>
<span class="wiki-legacy-anchor" id="Seed_nodes" aria-hidden="true"></span><h3 id="seed-nodes"> Seed nodes </h3>
<p>Seed nodes act as providers for P2P network data and filtered blocks from the Bitcoin blockchain for lite nodes. When a node starts, it requests all P2P network data from several seed nodes.</p>
<span class="wiki-legacy-anchor" id="External_DAO_monitor" aria-hidden="true"></span><h3 id="external-dao-monitor"> External DAO monitor </h3>
<p>Monitoring of DAO-related data and infrastructure will be added to <a href="https://monitor.bisq.network/" rel="noopener noreferrer">Bisq monitoring</a>. This should help us spot any potential consensus or network conflict early.</p>
<p>This is not deployed at the moment, but will be integrated soon.</p>
<span class="wiki-legacy-anchor" id="BSQ_block_explorer" aria-hidden="true"></span><h3 id="bsq-block-explorer"> BSQ block explorer </h3>
<p><a href="https://explorer.bisq.network/" rel="noopener noreferrer">BSQ block explorers</a> show all BSQ transactions with some metadata (transaction type, etc). It gives also some statistical data about the network. It is a very basic version at the moment, but we are working on a more sophisticated version. Any BSQ transaction can be looked up in a normal Bitcoin block explorer as well, but of course those explorers will not show any DAO-related context. If looking up a BSQ address on a normal Bitcoin block explorer, a user needs to remove the <code class="wiki-source-code" id="source-code-2">B</code> prefix so the address is considered a valid BTC address.</p>
<span class="wiki-legacy-anchor" id="BSQ_integration_in_Bisq" aria-hidden="true"></span><h2 id="bsq-integration-in-bisq"> BSQ integration in Bisq </h2>
<p>The Bisq DAO and BSQ are fully integrated into the Bisq UI. It comes with a BSQ wallet and UI for creating proposals, participating in voting, and taking part in other DAO functions.</p>
<span class="wiki-legacy-anchor" id="Wallet" aria-hidden="true"></span><h3 id="wallet"> Wallet </h3>
<p>The Bisq application provides an integrated BSQ wallet with basic features for receiving and sending BSQ, as well as a transaction history screen. The wallet is based on <a href="https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki" rel="noopener noreferrer">BIP 44</a> and uses <a href="https://github.com/satoshilabs/slips/blob/master/slip-0044.md" rel="noopener noreferrer">registered coin type 142</a>. This provides extra protection against the risk of accidentally using the BSQ wallet as a BTC wallet (e.g., when restoring from seed words). To avoid users from needing to backup 2 different sets of seed words, we use the same seed for both the BSQ and the BTC wallets, even though they are stored in different files. To further avoid mixing BSQ with normal Bitcoin, we use a "B" as address prefix for BSQ addresses in the user interface. Internally that prefix does not exist, as a BSQ address is a normal BTC address, and BSQ transactions are normal BTC transactions.</p>
<p>BSQ token transactions and balances are represented inside the application but there is also a web-based <a href="https://explorer.bisq.network/" rel="noopener noreferrer">BSQ block explorer</a>.</p>
<p>A BSQ transaction is valid only after a blockchain confirmation. However, for better usability, we allow users to spend their own change outputs. This involves no risk, as a user would render all follow-up transactions invalid if he tries to double-spend. Unconfirmed BSQ received from others is not spendable.</p>
<span class="wiki-legacy-anchor" id="Application_internal_DAO_monitor" aria-hidden="true"></span><h3 id="application-internal-dao-monitor"> Application internal DAO monitor </h3>
<p>Inside the application we maintain a hash chain of states and P2P network data. The overall DAO state gets hashed at each new block which contains the previous hash, thus forming a chain of hashes. If the last hash is correct, all the previous must be correct as well. Each node receives the last 10 hashes from seed nodes and compares it with its local hash. If there is any conflict, it shows a warning and requests to rebuild the DAO state. At each new block, each peer broadcasts its local hash to its neighbors. That way, the node also receives hashes from normal peers.</p>
<p>Similar to DAO states, we also maintain a hash chain for proposal data and blind vote data. These hashes are created only once per voting cycle at an appropriate block height (i.e., when it is expected that the whole network has received all data).</p>
<p>There are valid cases when consensus could be temporarily broken. In case of a chain split, nodes can have different DAO states, as the Bitcoin block hash is part of the data, and if 2 nodes are on a different chain they will have different block hashes.</p>
<p>In case some P2P network data was not distributed well in the network, there may be temporary conflicts of the relevant hash chains. An application restart should usually resolve such issues. If not, rebuilding the DAO state forces all P2P network data to be reloaded.</p>
<span class="wiki-legacy-anchor" id="Snapshots" aria-hidden="true"></span><h3 id="snapshots"> Snapshots </h3>
<p>To avoid reevaluating all history at each startup, we use a snapshot mechanism.</p>
<p>Every 20 blocks a snapshot mechanism is triggered. The current state is cloned and kept in memory, and if a previous clone exists, it is persisted. At the next snapshot trigger event, the last clone is persisted and a new clone is cached. In this way, the snapshot is always at least 20 blocks old.</p>
<p>The lite node requests the blocks since the latest snapshot only, so that will usually be 20-40 blocks (maximum). The only exception to this is on first startup after a new install, when a lite node only has the snapshot shipped with the binary—in this case, requested blocks might consume a bit more bandwidth.</p>
<p>If we maintain a monthly release schedule, there can be about 4500 blocks in a month, but even with that we expect not more than 1-5 MB of bandwidth to receive the initial blockchain data.</p>
<span class="wiki-legacy-anchor" id="Snapshots_shipped_in_releases" aria-hidden="true"></span><h3 id="snapshots-shipped-in-releases"> Snapshots shipped in releases </h3>
<p>Each application release is updated with a recent snapshot version of the DAO state. This data will be used for new users who have not created their own snapshot yet. This saves new users from needing to download all historical data and rebuilding DAO state from genesis.</p>
<p>The user still can rebuild from genesis if he does not want to trust that developers have shipped a correct snapshot. Any discrepancy would be easily detected.</p>
<span class="wiki-legacy-anchor" id="Blockchain-related_data" aria-hidden="true"></span><h2 id="blockchain-related-data"> Blockchain-related data </h2>
<p>One part of the DAO is based on Bitcoin blockchain data. We only use the blockchain for timestamping. Transactions do not carry content-rich data—this data is stored on the Bisq P2P network.</p>
<p>List of possible BSQ transaction types:</p>
<ul>
<li>Genesis tx</li>
<li>Transfer BSQ tx</li>
<li>Trade fee tx</li>
<li>Proposal tx</li>
<li>Compensation request tx</li>
<li>Reimbursement request tx</li>
<li>Blind vote tx</li>
<li>Vote reveal tx</li>
<li>Lockup tx</li>
<li>Unlock tx</li>
<li>Asset listing fee tx</li>
<li>Proof of burn tx</li>
</ul>
<p>In addition, a transaction can be unverified, invalid or irregular.</p>
<p>Unverified is the default state for all unconfirmed BSQ transactions. Validation is done once a tx is confirmed.</p>
<p>Invalid transactions are transactions which have violated validation rules. BSQ are destroyed in such transactions.</p>
<p>Irregular transactions are transactions which are invalid with their intended use but have not destroyed their BSQ. An example is a proposal tx which got confirmed too late (not in proposal phase) and therefore is invalid as a proposal tx, but the BSQ is still valid to be spent.</p>
<span class="wiki-legacy-anchor" id="Genesis_tx" aria-hidden="true"></span><h3 id="genesis-tx"> Genesis tx </h3>
<p>BTC from the donation address was used to fund the input for the genesis tx. The genesis tx issued 3,657,480 BSQ, which is equivalent to 3.65748 BTC. The amount of 3,657,480 BSQ is the sum of the 2,500,000 BSQ which was distributed as symbolic <a href="https://blockstream.info/testnet/tx/2f194230e23459a9211322c4b1c182cf3f367086e8059aca2f8f44e20dac527a" rel="noopener noreferrer">testnet BSQ</a> to past contributors back in July 2017 and 1,157,480 BSQ contributors have earned since starting <a href="https://docs.bisq.network/dao/phase-zero.html" rel="noopener noreferrer">Phase Zero</a> in October 2017.</p>
<p>The outputs are the BSQ addresses of all contributors who have contributed to Bisq before we start the DAO on mainnet. All outputs are by definition valid BSQ. The genesis tx is funded with the exact amount, including the miner fee, so there is no change output.</p>
<span class="wiki-legacy-anchor" id="Transfer_BSQ_tx" aria-hidden="true"></span><h3 id="transfer-bsq-tx"> Transfer BSQ tx </h3>
<p>Sending BSQ to another address is a simple transaction without OpReturn. It requires a BSQ input for the transferred BSQ as well as a BTC input to cover the miner fee. The outputs are the receiver's BSQ address, an optional BSQ change output, and an optional BTC change output.</p>
<p>A transaction to send 10 BSQ could look like this:</p>
<ul>
<li>Input 1: 30.00 BSQ (BSQ sender)</li>
<li>Input 2: 0.01 BTC (required BTC for mining fee)</li>
<li>Output 1: 10.00 BSQ (BSQ receiver)</li>
<li>Output 1: 20.00 BSQ (BSQ change output back to sender)</li>
<li>Output 2: 0.0095 BTC (BTC change output)</li>
<li>Mining fee: 0.0005</li>
</ul>
<span class="wiki-legacy-anchor" id="Trade_fee_tx" aria-hidden="true"></span><h3 id="trade-fee-tx"> Trade fee tx </h3>
<p>We invalidate a small amount of BSQ for the trade fee payment. Since the burned amount is used as miner fee and not as a regular tx output, we are not restricted by the dust limit of 546 satoshis, and can spend fees as little as 0.01 BSQ (equivalent to 1 BTC satoshi). The fee is the difference of the BSQ input and the BSQ output.</p>
<p>A BSQ trade fee payment tx could look like this (for a fee with 0.5 BSQ):</p>
<ul>
<li>Input 1: 10.00 BSQ</li>
<li>Input 2: 0.1 BTC</li>
<li>Output 1: 9.50 BSQ</li>
<li>Output 2: 0.09950050 BTC change output</li>
<li>Mining fee: 0.0005 (0.00049950 BTC + 0.00000050 BTC or 0.50 BSQ)</li>
</ul>
<p>In this case, we only used 9.50 BSQ of the 10.00 BSQ from the input. Since the second output is spending more than the remaining 0.50 BSQ, it is an invalid BSQ output so we consider it a BTC output. The remaining 0.50 BSQ which was not used in the first output will be used for the mining fee, thus reducing the mining fee which is paid from the BTC input (input 2).</p>
<span class="wiki-legacy-anchor" id="Proposal_tx" aria-hidden="true"></span><h3 id="proposal-tx"> Proposal tx </h3>
<p>A proposal transaction contains an OpReturn output which indicates the type and carries the hash of the proposal payload data.</p>
<ul>
<li>Inputs [1-n]: BSQ inputs for BSQ fee</li>
<li>Inputs [1-n]: BTC inputs for miner fee</li>
<li>Output [1]: Mandatory BSQ output (BSQ input - fee)</li>
<li>Outputs [0-1]: BTC change output</li>
<li>Output [1]: <code class="wiki-source-code" id="source-code-3">OP_RETURN</code> with OpReturnData and amount 0</li>
<li>Mining fee: BTC mining fee + burned BSQ fee</li>
</ul>
<p>OpReturn data:</p>
<ul>
<li>1 byte for tx type: 0x10</li>
<li>1 byte for version: 0x01</li>
<li>20 bytes for hash of proposal payload</li>
</ul>
<p>The hash is created from the bytes of the proposal payload with tx ID set to null using protobuffer serialization. It is first hashed with Sha256 and then with Ripemd160 to get a 20 byte hash.</p>
<p>Example with a 2 BSQ fee:</p>
<ul>
<li>Input 1: 10.00 BSQ</li>
<li>Input 2: 0.1 BTC</li>
<li>Output 1: 8 BSQ</li>
<li>Output 2: 0.09950200 BTC change output</li>
<li>Output 3: OpReturn data</li>
<li>Mining fee: 0.0005 (0.00049800 BTC + 0.00000200 BTC or 2 BSQ)</li>
</ul>
<span class="wiki-legacy-anchor" id="Compensation_request_tx/Reimbursement_request_tx" aria-hidden="true"></span><h3 id="compensation-request-tx-reimbursement-request-tx"> Compensation request tx/Reimbursement request tx </h3>
<p>Compensation request tx and reimbursement request txs are technically the same and inherit the properties of a proposal tx but have some additional requirements. They add a BTC output which will be interpreted as a BSQ output at the vote result phase in case the request is accepted by voting.</p>
<ul>
<li>Inputs [1-n]: BSQ inputs for BSQ fee</li>
<li>Inputs [1-n]: BTC inputs BSQ issuance and miner fee</li>
<li>Output [1]: Mandatory BSQ output (BSQ input - fee)</li>
<li>Outputs [1]: Issuance candidate output; before voted ok it is BTC afterwards newly issued BSQ</li>
<li>Outputs [0-1]: BTC change output</li>
<li>Outputs [1]: <code class="wiki-source-code" id="source-code-4">OP_RETURN</code> with OpReturnData and amount 0</li>
<li>Mining fee: BTC mining fee + burned BSQ fee</li>
</ul>
<p>OpReturn data:</p>
<ul>
<li>1 byte for tx type: Compensation request tx: 0x11 / Reimbursement request: 0x12</li>
<li>1 byte for version: 0x01</li>
<li>20 bytes for hash of request payload</li>
</ul>
<p>Example with a 2 BSQ fee and requested issuance amount of 5000 BSQ:</p>
<ul>
<li>Input 1: 10.00 BSQ</li>
<li>Input 2: 0.1 BTC</li>
<li>Output 1: 8 BSQ</li>
<li>Output 2: 0.00500000 BTC (5000 BSQ after positive voting)</li>
<li>Output 3: 0.09950200 BTC change output</li>
<li>Output 4: OpReturn data</li>
<li>Mining fee: 0.0005 (0.00049800 BTC + 0.00000200 BTC or 2 BSQ)</li>
</ul>
<span class="wiki-legacy-anchor" id="Blind_vote_tx" aria-hidden="true"></span><h3 id="blind-vote-tx"> Blind vote tx </h3>
<p>The blind vote tx contains the hash of the blind vote payload and uses the vote stake as input. The stake is blocked from spending during this phase and is only unlocked by the vote reveal tx. If another transaction spends the stake, the blind vote becomes invalid. The blind vote requires a fee in BSQ.</p>
<ul>
<li>Inputs [1-n]: BSQ inputs for BSQ fee + stake</li>
<li>Inputs [1-n]: BTC inputs for miner fee</li>
<li>Output [1]: Mandatory BSQ output of stake</li>
<li>Output [0-1] Optional BSQ change output</li>
<li>Outputs [0-1]: BTC change output</li>
<li>Output [1]: <code class="wiki-source-code" id="source-code-5">OP_RETURN</code> with OpReturnData and amount 0</li>
<li>Mining fee: BTC mining fee + burned BSQ fee</li>
</ul>
<p>OpReturn data:</p>
<ul>
<li>1 byte for tx type: 0x13</li>
<li>1 byte for version: 0x01</li>
<li>20 bytes for hash of encrypted votes</li>
</ul>
<p>To create the encrypted votes we use following data:</p>
<ul>
<li>Secret key: 128 bit AES key.</li>
<li>List of a tuple of proposal Tx IDs + vote, sorted by tx ID. Only valid proposals of current cycle are included.</li>
</ul>
<p>We use protobuffer serialisation for the bytes which will be encrypted with the secret key.</p>
<p>Example with a 2 BSQ fee and 7000 BSQ vote stake:</p>
<ul>
<li>Input 1: 8000.00 BSQ</li>
<li>Input 2: 0.1 BTC</li>
<li>Output 1: 7000 BSQ / 0.00700000 BTC</li>
<li>Output 2: 998 BSQ change output</li>
<li>Output 3: 0.09950200 BTC change output</li>
<li>Output 4: OpReturn data</li>
<li>Mining fee: 0.0005 (0.00049800 BTC + 0.00000200 BTC or 2 BSQ)</li>
</ul>
<span class="wiki-legacy-anchor" id="Vote_reveal_tx" aria-hidden="true"></span><h3 id="vote-reveal-tx"> Vote reveal tx </h3>
<p>The vote reveal tx consumes the stake output from the blind vote tx as the only BSQ input. It does not require a BSQ fee.</p>
<p>In the OpReturn data we add the secret key for decrypting our blind vote and a hash of the blind vote list to ensure consensus of the P2P network data used in voting. This hash will be used in the vote result phase to determine a majority in case different users get a different list of blind votes, which would lead to different vote results, and therefore cause consensus failures.</p>
<ul>
<li>Input [1]: BSQ input -&gt; stake output of blind vote tx</li>
<li>Inputs [1-n]: BTC inputs for miner fee</li>
<li>Output [1]: BSQ output (unlocked stake)</li>
<li>Outputs [0-1]: BTC change output</li>
<li>Output [1]: <code class="wiki-source-code" id="source-code-6">OP_RETURN</code> with OpReturnData and amount 0</li>
<li>Mining fee: BTC mining fee</li>
</ul>
<p>OpReturn data:</p>
<ul>
<li>1 byte for tx type: 0x14</li>
<li>1 byte for version: 0x01</li>
<li>20 bytes for hash of blind vote list</li>
<li>16 bytes secretKey</li>
</ul>
<p>The hash of the blind vote list is made using all blind vote payload data received in the cycle and sorted by blind vote tx ID. The secretKey is the encoded byte representation of the secret key.</p>
<p>Example with 7000 BSQ stake:</p>
<ul>
<li>Input 1: 7000 BSQ</li>
<li>Input 2: 0.1 BTC</li>
<li>Output 1: 7000 BSQ</li>
<li>Output 2: 0.09950000 BTC</li>
<li>Output 3: OpReturn data</li>
<li>Mining fee: 0.0005 BTC</li>
</ul>
<span class="wiki-legacy-anchor" id="Lockup_tx" aria-hidden="true"></span><h3 id="lockup-tx"> Lockup tx </h3>
<p>The lock tx can be use for locking up funds for a bonded role or for bonded reputation: a certain amount of BSQ is locked for a defined lock time (in blocks). Only an unlock tx can unlock locked funds. Once the unlock tx is confirmed, the lock time will be used to determine when the funds can be used in a normal transaction again. While funds are locked, they cannot be moved, or they are invalidated. While funds are locked, or are in an unlocking state, funds can be confiscated by voting.</p>
<ul>
<li>Inputs [1-n]: BSQ inputs</li>
<li>Inputs [1-n]: BTC inputs for miner fee</li>
<li>Output [1]: Locked up BSQ</li>
<li>Outputs [0-1]: BSQ change output</li>
<li>Outputs [0-1]: BTC change output</li>
<li>Output [1]: <code class="wiki-source-code" id="source-code-7">OP_RETURN</code> with OpReturnData and amount 0</li>
<li>Mining fee: BTC mining fee</li>
</ul>
<p>OpReturn data:</p>
<ul>
<li>1 byte for tx type: 0x15</li>
<li>1 byte for version: 0x01</li>
<li>1 byte for lockup reason (bonded role 0x01, reputation 0x02)</li>
<li>2 bytes for lock time (see: bisq.common.util.Utilities.integerToByteArray for encoding)</li>
<li>20 bytes for hash</li>
</ul>
<p>The hash in case of a bonded role is created from immutable data of the bonded role. Currently we use hashCode but that should be changed to a cryptographic hash. The hash for a reputation is derived from a salt. The salt is by default a random string as hex or can be any string defined by the user.</p>
<p>Example with locking up 4000 BSQ:</p>
<ul>
<li>Input 1: 6000 BSQ</li>
<li>Input 2: 0.1 BTC</li>
<li>Output 1: 4000 BSQ lockup</li>
<li>Output 1: 2000 BSQ change output</li>
<li>Output 2: 0.09950000 BTC</li>
<li>Output 3: OpReturn data</li>
<li>Mining fee: 0.0005 BTC</li>
</ul>
<span class="wiki-legacy-anchor" id="Unlock_tx" aria-hidden="true"></span><h3 id="unlock-tx"> Unlock tx </h3>
<p>The unlock tx takes the lockup tx output and use the lock time encoded in the OpReturn to determine the unlock time. The BSQ output cannot be used in another tx until the lock time is over. During that time it is in the unlocking state. Afterwards it is in the unlocked state and can be spent like any normal BSQ output.</p>
<ul>
<li>Input [1]: BSQ input from lockup tx lockup output (output index 0)</li>
<li>Inputs [1-n]: BTC inputs for miner fee</li>
<li>Output [1]: BSQ unlock output</li>
<li>Outputs [0-1]: BTC change output</li>
<li>Mining fee: BTC mining fee</li>
</ul>
<p>Example with unlocking 4000 BSQ:</p>
<ul>
<li>Input 1: 4000 BSQ (from lockup tx output)</li>
<li>Input 2: 0.1 BTC</li>
<li>Output 1: 4000 BSQ unlocking/unlocked state</li>
<li>Output 2: 0.09950000 BTC</li>
<li>Mining fee: 0.0005 BTC</li>
</ul>
<span class="wiki-legacy-anchor" id="Asset_listing_fee_tx" aria-hidden="true"></span><h3 id="asset-listing-fee-tx"> Asset listing fee tx </h3>
<p>The asset listing fee tx is used for paying listing fees for an asset. The ticker symbol of the asset is specified in the OpReturn data to bind the tx to a specific asset. If the BSQ fee is more than the required mining fee, we do not use a BTC input, and add the remaining BTC to the BTC output.</p>
<ul>
<li>Inputs [1-n]: BSQ inputs for listing fee</li>
<li>Inputs [0-n]: BTC inputs for miner fee</li>
<li>Output [0-1]: BSQ change output (BSQ input - fee)</li>
<li>Outputs [0-1]: BTC change output</li>
<li>Output [1]: <code class="wiki-source-code" id="source-code-8">OP_RETURN</code> with OpReturnData and amount 0</li>
<li>Mining fee: BTC mining fee + burned BSQ fee</li>
</ul>
<p>OpReturn data:</p>
<ul>
<li>1 byte for tx type: 0x16</li>
<li>1 byte for version: 0x01</li>
<li>20 bytes for hash of ticker symbol</li>
</ul>
<p>We take the bytes of the ticker symbol as UTF-8 string and hash it with Sha256 and then with Ripemd160.</p>
<p>Example with a BSQ fee of 20 BSQ:</p>
<ul>
<li>Input 1: 100.00 BSQ</li>
<li>Input 2: 0.1 BTC</li>
<li>Output 1: 80 BSQ</li>
<li>Output 2: 0.0997 BTC</li>
<li>Output 3: OpReturn data</li>
<li>Mining fee: 0.0005 (0.0003 BTC + 0.00020000 BTC or 20 BSQ)</li>
</ul>
<span class="wiki-legacy-anchor" id="Proof_of_burn_tx" aria-hidden="true"></span><h3 id="proof-of-burn-tx"> Proof of burn tx </h3>
<p>A user can put the hash of an arbitrary string (pre-image) into a proof of burn tx and burn a specified amount of BSQ. He can later use the pre-image to prove to any party that he has created that hash. He can also sign any challenge message and the challenger can verify that he is the key holder of the first input used in that tx.</p>
<ul>
<li>Inputs [1-n]: BSQ inputs for burned amount</li>
<li>Inputs [0-n]: BTC inputs for miner fee</li>
<li>Output [0-1]: BSQ change output (BSQ input - burned amount)</li>
<li>Outputs [0-1]: BTC change output</li>
<li>Output [1]: <code class="wiki-source-code" id="source-code-9">OP_RETURN</code> with OpReturnData and amount 0</li>
<li>Mining fee: BTC mining fee + burned BSQ fee</li>
</ul>
<p>OpReturn data:</p>
<ul>
<li>1 byte for tx type: 0x16</li>
<li>1 byte for version: 0x01</li>
<li>20 bytes for hash of pre image</li>
</ul>
<p>We take the bytes of the pre-image as UTF-8 string and hash it with Sha256 and then with Ripemd160.</p>
<p>Example with 20 BSQ burned:</p>
<ul>
<li>Input 1: 100.00 BSQ</li>
<li>Input 2: 0.1 BTC</li>
<li>Output 1: 80 BSQ</li>
<li>Output 2: 0.0997 BTC</li>
<li>Output 3: OpReturn data</li>
<li>Mining fee: 0.0005 (0.0003 BTC + 0.00020000 BTC or 20 BSQ)</li>
</ul>
<span class="wiki-legacy-anchor" id="P2P_network_payloads" aria-hidden="true"></span><h2 id="p2p-network-payloads"> P2P network payloads </h2>
<p>Proposals and blind vote data are published over the Bisq P2P network. They must be published in the correct phase and cycle, otherwise they are considered invalid. Each node listens for these messages and persists the data locally. At startup, each node receives missing data from seed nodes. The corresponding tx ID is part of the data and is used to map the data to the transaction. The hash of the P2P network data is part of the OpReturn data in the transactions. In this way, we can verify that the mapping of a tx to the data is correct in both directions.</p>
<span class="wiki-legacy-anchor" id="Temporary_proposal_payload" aria-hidden="true"></span><h3 id="temporary-proposal-payload"> Temporary proposal payload </h3>
<p>During the proposal phase the user can add and remove proposals. For removing we use the public key which was added when publishing a proposal and verify with a signature if the remove attempt is coming from the same owner. This is the same model as we use in other P2P network data like offer payloads. The data has a time to live of 60 days, and after that, it is removed from local storage.</p>
<span class="wiki-legacy-anchor" id="Proposal_payload" aria-hidden="true"></span><h3 id="proposal-payload"> Proposal payload </h3>
<p>There are several different types of proposals:</p>
<ul>
<li>Compensation request</li>
<li>Reimbursement requests</li>
<li>Proposal for changing a parameter</li>
<li>Proposal for a bonded role</li>
<li>Proposal for confiscating a bond</li>
<li>Generic proposal</li>
<li>Proposal for removing an asset</li>
</ul>
<p>The proposal contains the tx ID of the proposal transaction. When creating the transaction we add the 20-byte hash of the proposal data to the OpReturn data of the proposal tx. As the tx ID would be part of the proposal data and cannot be known before the tx is created, we leave it empty and set it afterwards. That way we get a mapping in both directions and can verify later that a proposal payload has a valid tx and that the tx data matches the proposal data.</p>
<p>During the break after the proposal phase, all nodes publish their proposal payload, which uses proposals from the temporary proposal payload. This data is now immutable and will be used for voting.</p>
<span class="wiki-legacy-anchor" id="Blind_vote_payload" aria-hidden="true"></span><h3 id="blind-vote-payload"> Blind vote payload </h3>
<p>Blind vote data are published when the user makes his blind vote tx and are managed in the same way as proposal payloads (append-only data).</p>
<span class="wiki-legacy-anchor" id="Governance" aria-hidden="true"></span><h2 id="governance"> Governance </h2>
<p>Governances takes place in regularly-occurring voting cycles. A cycle consists of 4 distinct phases.</p>
<span class="wiki-legacy-anchor" id="Phases" aria-hidden="true"></span><h3 id="phases"> Phases </h3>
<p>Phases are defined by block height. Each phase is separated with a break to avoid issues with reorgs.</p>
<p>Here are the phases and the initial duration values (they can be changed by voting):</p>
<ul>
<li>Proposal phase (compensation requests, etc): 3600 blocks, about 25 days</li>
<li>Break: 150 blocks</li>
<li>Blind vote phase (approve/decline proposals): 450 blocks, about 3 days</li>
<li>Break: 10 blocks</li>
<li>Vote reveal phase: 450 blocks, about 3 days</li>
<li>Break: 10 blocks</li>
<li>Result phase: 10 blocks</li>
</ul>
<p>The full cycle will last 4680 blocks which is about one month if one block takes an average of 10 minutes.</p>
<span class="wiki-legacy-anchor" id="Proposal_phase" aria-hidden="true"></span><h4 id="proposal-phase"> Proposal phase </h4>
<p>Any BSQ stakeholder can publish a temporary proposal payload during the proposal phase, as well as remove their own proposals.</p>
<span class="wiki-legacy-anchor" id="Blind_Vote_phase" aria-hidden="true"></span><h4 id="blind-vote-phase"> Blind Vote phase </h4>
<p>A BSQ stakeholder can vote on any proposal with 3 options: accept, decline or ignore. Not voting on a proposal is the same as ignoring it.</p>
<p>The user defines how much _stake_ they want to put into their vote. The higher the stake, the higher the vote weight compared to other voters. In addition to the stake, _merit_ is added if the user has earned BSQ in previous cycles through accepted compensation requests. The merit value of each issuance ages linearly over time: it reaches 0 after 100 000 blocks (about 2 years). Aged accumulated merit is automatically added to the stake, and the sum of both is the vote weight.</p>
<p>When creating the blind vote tx, the user also publishes the blind vote payload. We use the same linking of tx ID and payload hash to map them together.</p>
<span class="wiki-legacy-anchor" id="Vote_reveal_phase" aria-hidden="true"></span><h4 id="vote-reveal-phase"> Vote reveal phase </h4>
<p>Upon entering the vote reveal phase, each voter automatically publishes their vote reveal tx. There is no fee required for this transaction beside the miner fee. No P2P network data is published.</p>
<span class="wiki-legacy-anchor" id="Vote_result_phase" aria-hidden="true"></span><h4 id="vote-result-phase"> Vote result phase </h4>
<p>In the vote result phase, all nodes calculate the vote result on all proposals and apply the result to the overall BSQ state.</p>
<p>This process uses the hash of the blind vote list from the vote reveal tx to determine the winning majority, in case users had different P2P network payloads of blind votes. The majority is calculated by stake (not merit) of the voters. Only if at least 80% of the network has the same hash is the cycle is valid, otherwise, all proposals and requests are considered rejected.</p>
<p>A proposal is considered accepted if the required quorum and threshold are reached. Quorum is the minimum amount of accumulated vote weight in BSQ which is required. Threshold is the relationship of accepted votes to total votes. Each proposal type has different quorum and threshold parameters which can be changed by voting, but threshold can never be below 50.01%.</p>
<p>In case a proposal's data is not available, it is rejected. In case there are 2 accepted change parameter proposals for changing the same parameter to 2 different values, we reject both as it shows there is a social consensus issue in the DAO.</p>
<span class="wiki-legacy-anchor" id="DAO_Parameters" aria-hidden="true"></span><h3 id="dao-parameters"> DAO Parameters </h3>
<p>There are many different parameters which can be changed by voting. Trading fees, voting parameters (threshold and quorum), durations of the phases, and many more.</p>
<p>See the <a href="https://github.com/bisq-network/bisq/blob/3854907c14357680038661c8153095a157efbc5d/core/src/main/java/bisq/core/dao/governance/param/Param.java" rel="noopener noreferrer">Param class</a> for a complete list.</p>
<span class="wiki-legacy-anchor" id="Bonded_roles" aria-hidden="true"></span><h3 id="bonded-roles"> Bonded roles </h3>
<p>All roles in the Bisq DAO which can potentially create severe damage are handled as bonded roles. To become a role owner one need to make a request for a bonded role, and once accepted by voting, the person needs to lock up the defined bond. The role only is only considered active when the bond is locked up.</p>
<p>The required amount for the bond is defined in <a href="https://github.com/bisq-network/bisq/blob/497e202420940372fa1a344f64d375eac710d299/core/src/main/java/bisq/core/dao/state/model/governance/BondedRoleType.java" rel="noopener noreferrer">BondedRoleType enum</a>.</p>
<p>In severe cases, BSQ stakeholders can make a proposal to confiscate a bond. This will require a very high threshold in voting and is considered an exceptional case which hopefully never happens.</p>
<p>After a bond is revoked/unlocked, the underlying BSQ can be spent only after a timelock of 15840 blocks (about 110 days), during which the bond can still be confiscated as a security measure.</p>
<p>Most bonded roles are connected to environments which cannot interact with the Bisq DAO directly. For example, the Github Admin role cannot be revoked by confiscating the role owner as the Bisq DAO has no power over GitHub. The only exceptions are mediators and arbitrators, since people can be verified as valid bonded role owners before they are used for dispute resolution. This is not implemented yet and will be part of the new trade protocol update in the next few months.</p>
<span class="wiki-legacy-anchor" id="Bonded_reputation" aria-hidden="true"></span><h3 id="bonded-reputation"> Bonded reputation </h3>
<p>Similar to bonded roles, a user can lock up a bond to prove reputation. There is no concrete use case for this in Bisq at the moment, but we might use it in the future for new forms of trade protocols which are based on bonded reputation.</p>
<span class="wiki-legacy-anchor" id="Asset_listing_fee" aria-hidden="true"></span><h3 id="asset-listing-fee"> Asset listing fee </h3>
<p>Assets added to Bisq need to gain enough traders to reach a minimum trade volume over a certain time period. These parameters are DAO parameters and can be changed by voting. If an asset does not satisfy these parameters, such as trading volume thresholds, it will be removed from the list of assets when creating an altcoin payment account or selecting the preferred currencies in the software preferences.</p>
<p>Anyone can pay a fee in BSQ to gain access to a trial period where requirements to reach trade volume thresholds are lifted. Usually the coin issuers do this, but it can be done by anyone interested in trading a particular asset. The fee is initially 1 BSQ per day for a trial period, with a minimum of 30 days. The fee can be changed by voting.</p>
<p>If an asset gets removed by a <code class="wiki-source-code" id="source-code-10">Remove Asset Proposal</code>, it can no longer be reactivated by the listing fee. Listing fees already paid are lost in this case.</p>
<span class="wiki-legacy-anchor" id="Proof_of_burn" aria-hidden="true"></span><h3 id="proof-of-burn"> Proof of burn </h3>
<p>This advanced feature does not have a concrete use at the moment, but might be used in the future. Burning BSQ can be used as a form of reputation. If one is willing to burn some money, and can use that proof for other activities (e.g. securing a trade), they might be interested that this form of reputation by burning BSQ will not become pointless in case he was publicly proven as scammer. The user can prove that he was the originator of the transaction by providing the pre-image to a hash, which gets added to the OpReturn data and he can sign any challenge message to prove he had funded the transaction. We use the EC key from the first input for the signature.</p>
<span class="wiki-legacy-anchor" id="Disclaimer" aria-hidden="true"></span><h2 id="disclaimer"> Disclaimer </h2>
<p>This document does not cover all details and cannot be used as basis for implementation of BSQ features or for creating self-crafted transactions. The source code is the only real specification. It is NOT recommended to create custom BSQ transactions, as tiny mistakes can lead to destroyed BSQ. Bisq developers will not be concerned with transactions which might be valid with the current rule set but which have not been created by the Bisq application. In the future, updated rules might become more strict and might break such externally-created transactions. Requirements for backward compatibility will only consider use cases and tx structures created by the Bisq application.</p>
<p>Please note that currently it is not recommended to send BSQ to a hardware wallet. Handling the miner fee might cause invalidation of the BSQ funds or cause losses if precious BSQ is used to pay the miner fee. We will publish some instructions how to do this in a safe way soon.</p>
</div>
