const RpcConfig = require('./plugins/dashrpc/RpcConfig');
var RpcClient = require('@dashevo/dashd-rpc/promise');

var rpc = new RpcClient(RpcConfig);

/* RPC call example
https://github.com/dashevo/dashd-rpc/

rpc.getRawMemPool()
    .then(ret => {
        return Promise.all(ret.result.map(r => rpc.getRawTransaction(r)))
    })
    .then(rawTxs => {
        rawTxs.forEach(rawTx => {
            console.log(`RawTX: ${rawTx.result}`);
        })
    })
    .catch(err => {
        console.log(err)
	});
*/

var kyanRpcClient = {

//TODO: Using rpc.generateRPCMethods(constructor, apiCalls, rpc) function defined in @dashevo/dashd-rpc/lib/index.js (https://github.com/dashevo/dashd-rpc/lib/index.js), a new rpc call named 'generateNewAddressWithLabel' should be defined to be able to label the different kind of addresses. By default, @dashevo/dashd-rpc package only has 'generateNewAddress' function which does not take any parameters.

//TODO: Using rpc.generateRPCMethods(constructor, apiCalls, rpc) function defined in @dashevo/dashd-rpc/lib/index.js, a new rpc call named 'blsGenerate' should be defined to be able to generate the bls keys via rpc.


	/**
	 * Executes 'masternode outputs' rpc call and checks if the 'TxId & TxOutputId' is included in the results. Returns boolean.
	 * 
	 * @param (string) TxId: Collateral Transaction ID
	 * @param (int) TxOutputId: Collateral Transaction Output ID. Can be given null or empty **only** for a single collateral transaction. For multi collateral transactions, giving only the TxId is not enough to identify each discrete transaction hence checking the collateral. 
	 * 
	 * @returns boolean
	 */
	checkCollateralTransaction: (TxId, TxOutputId = 0) => {

		//TODO: Code that makes 'masternode outputs' rpc call and executes checks explained in the function description.

		return true;
	},
	
	/**
	 * Generates BLS key pair via 'bls generate' rpc call and returns the outputted JSON object.
	 * 
	 * @returns JSON Object
	 */
	generateBlsKeyPair = () => {

		//TODO: BLS keypair generation rpc call codes.

		// Return example
		return {
			secret: '<blsSecretKey>',
			public: '<blsPublicKey'
		}
	},
	
	/**
	 * Generates PubKeys/Addresses (ownerKeyAddr, votingKeyAddr, payoutAddress, feeSourceAddress) via 'getnewaddress [label]' rpc call. 
	 * Each key generation can be defined as a seperate function (generateOwnerKeyAddr, generateVotingKeyAddr, generatePayoutAddress, generateFeeSourceAddress). votingKeyAddr and payoutAddress can be given empty by the user and if these two addresses are given empty, this function uses ownerKeyAddr for both addresess. 
	 * ownerKeyAddr and feeSourceAddress are mandatory and unique and cannot be empty. 
	 * The balance of feeSourceAddress cannot be zero. At least 5 KYAN coin should be present in the address. 
	 * Returns a JSON object that has addresses in it.
	 * 
	 * @param (string) ownerKeyAddrLabel: Address label for Owner Key Address/Pubkey
	 * @param (string) votingKeyAddrLabel: Address label for Voting Key Address/Pubkey
	 * @param (string) payoutAddressLabel: Address label for Masternode Payout Key Address/Pubkey
	 * @param (string) feeSourceAddressLabel: Address label for the address that the transaction fees of the 'Special Transactions' created and made by 'protx' rpc call execution Key Address/Pubkey
	 * 
	 * @returns JSON Object
	 */
	generatePubKeys: (ownerKeyAddrLabel = '', votingKeyAddrLabel = '', payoutAddressLabel = '', feeSourceAddressLabel = '') => {

		//TODO: Keys generation rpc call codes.

		// Return example
		return {
			ownerKeyAddr: '<ownerKeyAddr>',
			votingKeyAddr: '<votingKeyAddr>',
			payoutAddress: '<payoutAddress>',
			feeSourceAddress: '<feeSourceAddress>'
		}
	},
	
	/**
	 * Executes 'protx register_prepare collateralHash collateralIndex ipAndPort ownerKeyAddr operatorPubKey votingKeyAddr operatorReward payoutAddress (feeSourceAddress)' rpc call and returns the result as JSON Object.
	 * 
	 * @param (string) collateralHash: The txid of the 200,000 KYAN collateral funding transaction
	 * @param (int) collateralIndex: The output index of the 200,000 KYAN funding transaction
	 * @param (string) ipAndPort: Masternode IP address and port, in the format x.x.x.x:yyyy
	 * @param (string) ownerKeyAddr: The new KYAN address generated above for the owner/voting address
	 * @param (string) operatorPubKey: The BLS public key generated above (or provided by your hosting service)
	 * @param (string) votingKeyAddr: The new KYAN address generated above, or the address of a delegate, used for proposal voting
	 * @param (int) operatorReward: The percentage of the block reward allocated to the operator as payment
	 * @param (string) payoutAddress: A new or existing KYAN address to receive the owner’s masternode rewards
	 * @param (string) feeSourceAddress: An (optional) address used to fund ProTx fee. payoutAddress will be used if not specified.
	 * 
	 * @returns JSON Object
	 */
	prepareProtxRegister: (collateralHash, collateralIndex, ipAndPort, ownerKeyAddr, operatorPubKey, votingKeyAddr, operatorReward, payoutAddress, feeSourceAddress = '') => {

		//TODO: 'protx register_prepare' rpc call codes. If 'feeSourceAddress' is given blank or null, use payoutAddress for it.

		// Return example
		return {
			"tx": "030001000175c9d23c2710798ef0788e6a4d609460586a20e91a15f2097f56fc6e007c4f8e0000000000feffffff01a1949800000000001976a91434b09363474b14d02739a327fe76e6ea12deecad88ac00000000d1010000000000e379580dcfea3eb6944bfbe1de5fa2317932e260acce4d9ff3ede5f4287a34160100000000000000000000000000ffff2d4ce6ef4e1fd47babdb9092489c82426623299dde76b9c72d9799f20ed1538e28259ff80044982372519a2e6e4cdedb01c96f8f22e755b2b3124fbeebdf6de3587189cf44b3c6e7670ed1935246865dce1accce6c8691c8466bd67ebf1200001976a914fef33f56f709ba6b08d073932f925afedaa3700488acfdb281e134504145b5f8c7bd7b47fd241f3b7ea1f97ebf382249f601a0187f5300",
			"collateralAddress": "yjSPYvgUiAQ9AFj5tKFA8thFLoLBUxQERb",
			"signMessage": "yjZVt49WsQd6XSrPVAUGXtJccxviH9ZQpN|0|yfgxFhqrdDG15ZWKJAN6dQvn6dZdgBPAip|yfRaZN8c3Erpqj9iKnmQ9QDBeUuRhWV3Mg|ad5f82257bd00a5a1cb5da1a44a6eb8899cf096d3748d68b8ea6d6b10046a28e"
		  }
	},

	/**
	 * Executes 'signmessage collateralAddress signMessage' rpc call and returns the result.
	 * 
	 * @param (string) collateralAddress: The address that the collateral transacion is made to.
	 * @param (string) signMessage: The signMessage field of the JSON object returned from 'prepareProtxRegister' function
	 * 
	 * @returns string
	 */
	signProRegTx: (collateralAddress, signMessage) => {

		//TODO: 'signmessage' rpc call codes.

		// Return example
		return 'II8JvEBMj6I3Ws8wqxh0bXVds6Ny+7h5HAQhqmd5r/0lWBCpsxMJHJT3KBcZ23oUZtsa6gjgISf+a8GzJg1BfEg=';
	},

	/**
	 * Submits and registers the masternode onto Kyanite blockchain.
	 * 
	 * @param (string) tx: The serialized transaction previously returned in the tx output field from the protx register_prepare command ('prepareProtxRegister' function)
	 * @param (string) sig: The message signed with the collateral key from the signmessage command ('signProRegTx' function)
	 * 
	 * @returns string
	 */
	submitAndRegisterProRegTx: (tx, sig) => {

		//TODO: 'protx register_submit' rpc call codes.

		// Return example
		return 'aba8c22f8992d78fd4ff0c94cb19a5c30e62e7587ee43d5285296a4e6e5af062';
	}
} 

export default kyanRpcClient;