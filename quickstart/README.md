---
title: "How to interact with ICON network using icon-sdk-js"
excerpt: ""
---

This is an example project of ICON SDK JavaScript. This document provides you with information on how to interact with ICON network using `icon-sdk-js`.


## Intended Audience

This example document is focused on serving the following groups.

- Web Developer using JavaScript as main language
- Web Developer who wants to make dApp using ICON Network

This document is focused on how to use `icon-sdk-js` properly. If you would like to know about details of `icon-sdk-js` API, see official `icon-sdk-js` API Reference document.

## Purpose

In this project, the examples are implemented as below.

| Example       | Description |
| ------------- | ----------- |
| [WalletExample](#walletexample) | An example of creating and loading a wallet. |
| [IcxTransactionExample](#icxtransactionexample) | An example of transferring ICX and confirming the result. |
| [DeployAndTransferTokenExample](#deployandtransfertokenexample) | An example of deploying IRC token and transferring deployed token. |
| [SyncBlockExample](#syncblockexample) | An example of checking block confirmation and printing the ICX and token transfer information. |

## Get Started

### Install Dependency

Please go to `quickstart` directory and install dependency to use `icon-sdk-js`.

npm
```
npm install   // install dependencies for executing the quickstart project (including icon-sdk-js package)
```

### Run example file
Run example file.
```
npm start   // open http://localhost:3000/ in browser
```

If you want to rebuild icon-sdk-js library and run quickstart project, go to icon-sdk-js root directory and run `npm run quickstart:rebuild` command.
```
npm run quickstart:rebuild   // open http://localhost:3000/ in browser
```

### Set Node URL

If you want to use custom ICON node url, change the value of `NODE_URL` variable in `./mockData/index.js`. Default value of `NODE_URL` is `https://bicon.net.solidwallet.io/api/v3`

*For more information on the testnet, see [the documentation](https://github.com/icon-project/icon-project.github.io/blob/master/docs/icon_network.md) for the ICON network.*

```javascript
const NODE_URL = 'https://bicon.net.solidwallet.io/api/v3'; 
```


### Generate IconService

Generate `IconService` to communicate with the nodes.

`IconService` allows you to send transaction, check the result and block information, etc.

`HttpProvider` is set as default to communicate with http.

```javascript
// HttpProvider is used to communicate with http.
const provider = new HttpProvider(MockData.NODE_URL);
// Create IconService instance
const iconService = new IconService(provider);
```

## WalletExample

This example shows how to create a new `Wallet` and load wallet with privateKey or Keystore file.


### Create Wallet

Create new EOA by calling `create` function. After creation, the address and private Key can be looked up.

```javascript
const wallet = IconWallet.create(); //Wallet Creation
console.log("Address: " + wallet.getAddress()); // Address Check
console.log("PrivateKey: " + wallet.getPrivateKey()); // PrivateKey Check

// Output
Address: hx4d37a7013c14bedeedbe131c72e97ab337aea159
PrivateKey: 00e1d6541bfd8be7d88be0d24516556a34ab477788022fa07b4a6c1d862c4de516
```

### Load Wallet

You can call existing EOA by calling `loadKeystore` and `loadPrivateKey` function.

After creation, address and private Key can be looked up.

```javascript
// Load Wallet with private key
const walletLoadedByPrivateKey = IconWallet.loadPrivateKey('38f792b95a5202ab431bfc799f7e1e5c74ec0b9ede5c6142ee7364f2c84d72f6');
console.log(walletLoadedByPrivateKey.getAddress());
// Output: hx902ecb51c109183ace539f247b4ea1347fbf23b5
console.log(walletLoadedByPrivateKey.getPrivateKey());
// Output: 38f792b95a5202ab431bfc799f7e1e5c74ec0b9ede5c6142ee7364f2c84d72f6);

// Get keystore object from wallet
const keystoreFile = walletLoadedByPrivateKey.store('qwer1234!');
// Load wallet with keystore file
const walletLoadedByKeyStore = IconWallet.loadKeystore(keystoreFile, 'qwer1234!');
console.log(walletLoadedByKeyStore.getAddress());
// Output: hx902ecb51c109183ace539f247b4ea1347fbf23b5
console.log(walletLoadedByKeyStore.getPrivateKey());
// Output: 38f792b95a5202ab431bfc799f7e1e5c74ec0b9ede5c6142ee7364f2c84d72f6);
```

### Store Wallet

After `Wallet` object creation, Keystore file can be stored by calling `store` function.

After calling `store`, Keystore json object can be looked up with the returned value.

```javascript
const privateKey = '38f792b95a5202ab431bfc799f7e1e5c74ec0b9ede5c6142ee7364f2c84d72f6'
const wallet = IconWallet.loadPrivateKey(privateKey);
console.log(wallet.store('qwer1234!'));
// Output: 
// {
// 	"version": 3,
// 	"id": "e00e113c-1e45-47e4-b732-10f3d1903d75",
// 	"address": "hx7d3d4c743bb82b927ea8a0551a3b9288e722ac84",
// 	"crypto": {
// 		"ciphertext": "d5df37230528bbfc0015e93c61e60041a31fb63266f61ffec60a31f474d4d7d0",
// 		"cipherparams": {
// 			"iv": "feaf0cc19678e4b78369904a99ba411e"
// 		},
// 		"cipher": "aes-128-ctr",
// 		"kdf": "scrypt",
// 		"kdfparams": {
// 			"dklen": 32,
// 			"salt": "e2e3666919161044f7b369d6ad4296380d4a13b9b5e844301c64a502ea3da240",
// 			"n": 16384,
// 			"r": 8,
// 			"p": 1
// 		},
// 		"mac": "43789e78de4744d06c14cf966b9609fadbcd815b5380caf3f778797f9824d9d7"
// 	}
// }
```

## IcxTransactionExample

This example shows how to transfer ICX and check the result.

*For the Wallet and IconService creation, please refer to the information above.*

### ICX Transfer

In this example, you can create Wallet with `MockData.PRIVATE_KEY_1` and transfer 1 ICX to `MockData.WALLET_ADDRESS_2`.

```javascript
const wallet = IconWallet.loadPrivateKey(MockData.PRIVATE_KEY_1);
const walletAddress = wallet.getAddress();
// 1 ICX -> 1000000000000000000 conversion
const value = IconAmount.of(1, IconAmount.Unit.ICX).toLoop();
console.log(value);
// Output: BigNumber {s: 1, e: 18, c: Array(1)}
```

You can get a step cost for transfering icx as follows.

```javascript
async getDefaultStepCost() {
    const { CallBuilder } = IconBuilder;
    // Get governance score api list
    const governanceApi = await this.iconService.getScoreApi(MockData.GOVERNANCE_ADDRESS).execute();
    console.log(governanceApi)
    const methodName = 'getStepCosts';
    // Check input and output parameters of api if you need
    const getStepCostsApi = governanceApi.getMethod(methodName);
    const getStepCostsApiInputs = getStepCostsApi.inputs.length > 0 ? JSON.stringify(getStepCostsApi.inputs) : 'none';
    const getStepCostsApiOutputs = getStepCostsApi.outputs.length > 0 ? JSON.stringify(getStepCostsApi.outputs) : 'none';
    console.log(`[getStepCosts]\n inputs: ${getStepCostsApiInputs} \n outputs: ${getStepCostsApiOutputs}`);

    // Get step costs by iconService.call
    const callBuilder = new CallBuilder();
    const call = callBuilder
        .to(MockData.GOVERNANCE_ADDRESS)
        .method(methodName)
        .build();
    const stepCosts = await this.iconService.call(call).execute();
    return stepCosts.default
}
```

Generate transaction using the values above.

```javascript
// networkId of node 1:mainnet, 2~:etc
const networkId = new BigNumber("3"); // input node’s networkld
const version = new BigNumber("3"); // version

// Recommended icx transfer step limit :
// use 'default' step cost in the response of getStepCosts API
const stepLimit = await this.getDefaultStepCost(); // Please refer to the above description.

// Timestamp is used to prevent the identical transactions. Only current time is required (Standard unit : us)
// If the timestamp is considerably different from the current time, the transaction will be rejected.
const timestamp = (new Date()).getTime() * 1000;

//Enter transaction information
const icxTransactionBuilder = new IcxTransactionBuilder();
const transaction = icxTransactionBuilder
      .nid(networkId)
      .from(walletAddress)
      .to(MockData.WALLET_ADDRESS_2)
      .value(value)
      .version(version)
      .stepLimit(stepLimit)
      .timestamp(timestamp)
      .build();
```
Generate SignedTransaction to add signature of the transaction.

```javascript
// Create signature of the transaction
const signedTransaction = new SignedTransaction(transaction, wallet);
// Read params to transfer to nodes
console.log(signedTransaction.getProperties());
// Output: 
// {
//     from: "hx902ecb51c109183ace539f247b4ea1347fbf23b5",
//     nid: "0x3",
//     nonce: "0x1",
//     signature: "OE/yJbKn+3kXiC/5x1mvOCpdbTiCAvdlZDgSH31//alTe4kTEVRCETXsQx+Jkbfwa6Qel1PUddoowdkQJDLPrgE=",
//     stepLimit: "0x186a0",
//     timestamp: "0x578ed370a3780",
//     to: "hxd008c05cbc0e689f04a5bb729a66b42377a9a497",
//     value: "0xde0b6b3a7640000",
//     version: "0x3",
// }
```

After calling sendTransaction from `IconService`, you can send transaction and check the transaction’s hash value. ICX transfer is now sent.

```javascript
// Send transaction
const txHash = await iconService.sendTransaction(signedTransaction).execute();
// Print transaction hash
console.log(txHash);
// Output
// 0x69c07ff23e2eafb068ec026f1a116082f0d869b3964531e43088f6638bcfe0f7
```

### Check the Transaction Result

After transaction is sent, the result can be looked up with the returned hash value.

In this example, you can check your transaction result every 2 seconds because of the block confirmation time.
Checking the result is as follows:

```javascript
// Check the result with the transaction hash
const transactionResult = await iconService.getTransactionResult(txHash).execute();
console.log("transaction status(1:success, 0:failure): "+transactionResult.status);
// Output
// transaction status(1:success, 0:failure): 1
```

You can check the following information using the TransactionResult.

- status : 1 (success), 0 (failure)
- to : transaction’s receiving address
- failure : Only exists if status is 0(failure). code(str), message(str) property included
- txHash : transaction hash
- txIndex : transaction index in a block
- blockHeight : Block height of the transaction
- blockHash : Block hash of the transaction
- cumulativeStepUsed : Accumulated amount of consumed step’s until the transaction is executed in block
- stepUsed : Consumed step amount to send the transaction
- stepPrice : Consumed step price to send the transaction
- scoreAddress : SCORE address if the transaction generated SCORE (optional)
- eventLogs :  Occurred EventLog’s list during execution of the transaction.
- logsBloom : Indexed Data’s Bloom Filter value from the occurred Eventlog’s Data

### Check the Balance

In this example, you can check the ICX balance by looking up the transaction before and after the transaction.

ICX balance can be confirmed by calling getBalance function from `IconService`

```javascript
// create or load wallet
const wallet = IconWallet.loadPrivateKey(MockData.PRIVATE_KEY_2);
// Check the wallet balance
const balance = await iconService.getBalance(wallet.getAddress()).execute();
console.log(balance);

// Output: 
// 100432143214321432143
```

## DeployAndTransferTokenExample

This example shows how to deploy IRC token and transfer deployed token.

*For the Wallet and IconService generation, please refer to the information above.*

### Token Deploy

You need the SCORE Project to deploy token.

In this example, you will use ‘test.zi’ from the ‘resources’ folder.

*test.zi : SampleToken SCORE Project Zip file.

Generate wallet using `MockData.PRIVATE_KEY_1`, then read the binary data from ‘test.zi’

```javascript
const { Wallet } = this.iconService;
this.wallet = IconWallet.loadPrivateKey(MockData.PRIVATE_KEY_1);

this.content = '';
// Read test.zi from ‘resources’ folder.
```

Enter the basic information of the token you want to deploy.

```javascript
const initialSupply = IconConverter.toBigNumber("100000000000");
const decimals = IconConverter.toBigNumber("18");
const tokenName = "StandardToken";
const tokenSymbol = "ST";
```

You can get the maximum step limit value as follows.

```javascript
// Get apis that provides Governance SCORE
// GOVERNANCE_ADDRESS : cx0000000000000000000000000000000000000001
async getMaxStepLimit() {
    const { CallBuilder } = IconBuilder;
    
    const governanceApi = await this.iconService.getScoreApi(MockData.GOVERNANCE_ADDRESS).execute();
    // "getMaxStepLimit" : the maximum step limit value that any SCORE execution should be bounded by.
    const methodName = 'getMaxStepLimit';
    // Check input and output parameters of api if you need
    const getMaxStepLimitApi = governanceApi.getMethod(methodName);

    const params = {};
    params[getMaxStepLimitApi.inputs[0].name] = 'invoke';

    // Get max step limit by iconService.call
    const callBuilder = new CallBuilder();
    const call = callBuilder
        .to(MockData.GOVERNANCE_ADDRESS)
        .method(methodName)
        .params(params)
        .build();
    const maxStepLimit = await this.iconService.call(call).execute();
    return IconConverter.toBigNumber(maxStepLimit)
}
```

Generate transaction with the given values above.

```javascript
async buildDeployTransaction() {
    const { DeployTransactionBuilder } = IconBuilder;

    const initialSupply = IconConverter.toBigNumber("100000000000");
    const decimals = IconConverter.toBigNumber("18");
    const tokenName = "StandardToken";
    const tokenSymbol = "ST";
    const contentType = "application/zip";
    // Enter token information
    // key name ("initialSupply", "decimals", "name", "symbol")
    // You must enter the given values. Otherwise, your transaction will be rejected.
    const params = {
        initialSupply: IconConverter.toHex(initialSupply),
        decimals: IconConverter.toHex(decimals),
        name: tokenName,
        symbol: tokenSymbol
    }
    const installScore = MockData.SCORE_INSTALL_ADDRESS;
    const stepLimit = await this.getMaxStepLimit();
    const walletAddress = this.wallet.getAddress();
    // networkId of node 1:mainnet, 2~:etc
    const networkId = IconConverter.toBigNumber(3);
    const version = IconConverter.toBigNumber(3);
    // Timestamp is used to prevent the identical transactions. Only current time is required (Standard unit : us)
    // If the timestamp is considerably different from the current time, the transaction will be rejected.
    const timestamp = (new Date()).getTime() * 1000;

    //Enter transaction information
    const deployTransactionBuilder = new DeployTransactionBuilder();
    const transaction = deployTransactionBuilder
        .nid(networkId)
        .from(walletAddress)
        .to(installScore)
        .stepLimit(stepLimit)
        .timestamp(timestamp)
        .contentType(contentType)
        .content(`0x${this.content}`)
        .params(params)
        .version(version)
        .build();        
    return transaction; 
}
```

Generate SignedTransaction to add signature to the transaction.

```javascript
// Create signature of the transaction
const signedTransaction = new SignedTransaction(transaction, this.wallet);
// Read params to transfer to nodes
const signedTransactionProperties = JSON.stringify(signedTransaction.getProperties()).split(",").join(", \n");
```

You can check the transaction hash value by calling sendTransaction from ‘IconService`. Deployment is now completed.

```javascript
this.deployTxHash = await this.iconService.sendTransaction(signedTransaction).execute();
```

After transaction is sent, the result can be looked up with the returned hash value.
You can also check the ST Token score address that you deployed.

Checking the result is as follows:

```javascript
// Check the result with the transaction hash
const transactionResult = await iconService.getTransactionResult(this.deployTxHash).execute();

console.log("transaction status(1:success, 0:failure): "+transactionResult.status);
console.log("Your score address: " + transactionResult.scoreAddress);

// Output
// transaction status(1:success, 0:failure): 1
// Your score address: cx19584dcfacd0d7cc5e0562a53959069213d7adca
```

*For the 'TransactionResult', please refer to the `IcxTransactionExample`.*

### Token Transfer

You can send the ST token that you deployed right before.

You can generate Wallet using `MockData.PRIVATE_KEY_1` just like in the case of `IcxTransactionExample`, then send 1 ST Token to `MockData.WALLET_ADDRESS_2`

You need token address to send your token.

```javascript
const wallet = IconWallet.loadPrivateKey(MockData.PRIVATE_KEY_1);
const toAddress = MockData.WALLET_ADDRESS_2;
const tokenAddress = this.scoreAddress; //ST Token Address that you deployed
const tokenDecimals = 18; // token decimal
// 1 ICX -> 1000000000000000000 conversion
const value = IconAmount.of(1, IconAmount.Unit.ICX).toLoop();
```

You can get a step cost to send token as follows.

```javascript
async getDefaultStepCost() {
    const { CallBuilder } = IconBuilder;
    
    // Get apis that provides Governance SCORE
    // GOVERNANCE_ADDRESS : cx0000000000000000000000000000000000000001
    const governanceApi = await this.iconService.getScoreApi(MockData.GOVERNANCE_ADDRESS).execute();
    console.log(governanceApi)
    const methodName = 'getStepCosts';

    // Get step costs by iconService.call
    const callBuilder = new CallBuilder();
    const call = callBuilder
        .to(MockData.GOVERNANCE_ADDRESS)
        .method(methodName)
        .build();
    const stepCosts = await this.iconService.call(call).execute();
    // For sending token, it is about twice the default value.
    return IconConverter.toBigNumber(stepCosts.default).times(2)
}
```

Generate Transaction with the given parameters above. You have to add receiving address and value to param object to send token.

```javascript
async buildTokenTransaction() {
    const { CallTransactionBuilder } = IconBuilder;

    const walletAddress = this.wallet.getAddress();
    // You can use "governance score apis" to get step costs.
    const value = IconAmount.of(1, IconAmount.Unit.ICX).toLoop();
    const stepLimit = await this.getDefaultStepCost();
    // networkId of node 1:mainnet, 2~:etc
    const networkId = IconConverter.toBigNumber(3);
    const version = IconConverter.toBigNumber(3);
    // Timestamp is used to prevent the identical transactions. Only current time is required (Standard unit : us)
    // If the timestamp is considerably different from the current time, the transaction will be rejected.
    const timestamp = (new Date()).getTime() * 1000;
    // SCORE name that send transaction is “transfer”.
    const methodName = "transfer";
    // Enter receiving address and the token value.
    // You must enter the given key name("_to", "_value"). Otherwise, the transaction will be rejected.
    const params = {
        _to: MockData.WALLET_ADDRESS_2,
        _value: IconConverter.toHex(value)
    }
    
    //Enter transaction information
    const tokenTransactionBuilder = new CallTransactionBuilder();
    const transaction = tokenTransactionBuilder
        .nid(networkId)
        .from(walletAddress)
        .to(this.scoreAddress)
        .stepLimit(stepLimit)
        .timestamp(timestamp)
        .method(methodName)
        .params(params)
        .version(version)
        .build();        
    return transaction;
}
```

Generate SignedTransaction to add signature to your transaction.

```javascript
// Generate transaction signature.
const signedTokenTransfer = new SignedTransaction(transaction, wallet);
// Read params to send to nodes.
console.log(signedTokenTransfer.getProperties());
```

 Call sendTransaction from ‘IconService’ to check the transaction hash. Token transaction is now sent.

```javascript
// Send transaction
this.transactionTxHash = await iconService.sendTransaction(signedTokenTransfer).execute();
// Print transaction hash
console.log(this.transactionTxHash);
// Output
// 0x6b17886de346655d96373f2e0de494cb8d7f36ce9086cb15a57d3dcf24523c8f
```

### Check the Result

You can check the result with the returned hash value of your transaction.

In this example, you can check your transaction result in every 2 seconds because of the block confirmation time.
Checking the result is as follows:

```javascript
// Check the result with the transaction hash
const transactionResult = await iconService.getTransactionResult(this.transactionTxHash).execute();
console.log("transaction status(1:success, 0:failure): "+transactionResult.status);
// Output
// transaction status(1:success, 0:failure):1
```

*For the TransactionResult, please refer to the `IcxTransactionExample`.*

### Check the Token Balance

In this example, you can check the token balance before and after the transaction.

You can check the token balance by calling ‘balanceOf’ from the token SCORE.

```javascript
const { CallBuilder } = IconBuilder;
const tokenAddress = this.scoreAddress;
// Method name to check the balance
const methodName = "balanceOf";
// You must enter the given key name (“_owner”).
const params = {
    _owner: address
}
const callBuilder = new CallBuilder();
const call = callBuilder
    .to(tokenAddress)
    .method(methodName)
    .params(params)
    .build();
// Check the wallet balance
const balance = await this.iconService.call(call).execute();
```

## SyncBlockExample

This example shows how to read block information and print the transaction result for every block creation.

*Please refer to above for Wallet and IconService creation.*

### Read Block Information

In this example, 'getLastBlock' is called periodically in order to check the new blocks,

by updating the transaction information for every block creation.

```javascript
// Check the recent blocks
const block = await iconService.getLastBlock().execute();
console.log(block.height);
// Output
// 237845
```

If a new block has been created, get the transaction list.

```javascript
const txList = block.getTransactions();
```

You can check the following information using the ConfirmedTransaction:

- version : json rpc server version
- to : Receiving address of transaction
- value: The amount of ICX coins to transfer to the address. If omitted, the value is assumed to be 0
- timestamp: timestamp of the transmitting transaction (unit: microseconds)
- nid : network ID
- signature: digital signature data of the transaction
- txHash : transaction hash
- dataType: A value indicating the type of the data item (call, deploy, message)
- data: Various types of data are included according to dataType.

### Transaction Output

```javascript
async syncBlock(block) {
    // the transaction list of blocks
    console.log(block)
    const txList = block.getTransactions();

    Promise.all(
        txList.map(async transaction => {
            const txResult = await this.iconService.getTransactionResult(transaction.txHash).execute();

            // Print icx transaction
            if ((transaction.value !== undefined) && transaction.value > 0) {
                document.getElementById("S03-2").innerHTML += `<li>${block.height} - [ICX] status: ${txResult.status === 1 ? 'success' : 'failure'}  |  amount: ${transaction.value}</li>`
            }

            // Print token transaction
            if (transaction.dataType !== undefined &&
                transaction.dataType === "call") {
                const method = transaction.data.method;

                if (method !== null && method === "transfer") {
                    const params = transaction.data.params;
                    const value = IconConverter.toBigNumber(params["_value"]); // value
                    const toAddr = params["_to"];

                    const tokenName = await this.getTokenName(transaction.to);
                    const symbol = await this.getTokenSymbol(transaction.to);
                    
                    document.getElementById("S03-2").innerHTML += `<li>${block.height} - [${tokenName} - ${symbol}] status: ${txResult.status === 1 ? 'success' : 'failure'}  |  amount: ${value}</li>`;
                }
            }
        })
    )
    
    this.prevHeight = block.height;
}

```

### Check the Token Name & Symbol

You can check the token SCORE by calling the `name` and `symbol` functions.

```javascript
async getTokenName(to) {
    const { CallBuilder } = IconBuilder;
    const tokenAddress = to; // token address
    const callBuilder = new CallBuilder();
    const call = callBuilder
        .to(tokenAddress)
        .method("name")
        .build();
    const result = await this.iconService.call(call).execute();
    return result;
}
```
```javascript
async getTokenSymbol(to) {
    const { CallBuilder } = IconBuilder;
    const tokenAddress = to; // token address
    const callBuilder = new CallBuilder();
    const call = callBuilder
        .to(tokenAddress)
        .method("symbol")
        .build();
    const result = await this.iconService.call(call).execute();
    return result;
}
```

## References

- [ICON JSON-RPC API v3](https://icondev.readme.io/docs/json-rpc-specification) 
- [IRC2 Specification](https://github.com/icon-project/IIPs/blob/master/IIPS/iip-2.md)