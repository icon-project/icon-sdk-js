---
title: "ICON SDK for JavaScript"
excerpt: ""
---

# ICON SDK for JavaScript

ICON supports SDK for 3rd party or user services development. You can integrate ICON SDK for your project and utilize ICON’s functionality.

---

## Table of Contents
1. [Installation](#installation)
2. [Quick Start Guide](#quick-start-guide)
    * [Get Started](#get-started)
    * [WalletExample](#walletexample)
    * [IcxTransactionExample](#icxtransactionexample)
    * [DeployAndTransferTokenExample](#deployandtransafertokenexample)
    * [SyncBlockExample](#syncblockexample)
    * [Reference](#reference)
3. [API Specification](#api-specification)
    * [IconService.IconWallet][IconWallet]
    * [IconService.IconBuilder][IconBuilder]
    * [IconService.IconBuilder.IcxTransactionBuilder][IcxTransactionBuilder]
    * [IconService.IconBuilder.MessageTransactionBuilder][MessageTransactionBuilder]
    * [IconService.IconBuilder.DeployTransactionBuilder][DeployTransactionBuilder]
    * [IconService.IconBuilder.CallTransactionBuilder][CallTransactionBuilder]
    * [IconService.IconBuilder.CallBuilder][CallBuilder]
    * [IconService.SignedTransaction][SignedTransaction]
    * [IconService.HttpProvider][HttpProvider]
    * [IconService.IconAmount][IconAmount]
    * [IconService.IconConverter][IconConverter]
    * [IconService.IconHexadecimal][IconHexadecimal]
    * [IconService.IconValidator][IconValidator]

---

## Installation

### Usage in Node.js

Install `icon-sdk-js` module using `npm`.

```bash
npm install --save icon-sdk-js
```

Import `icon-sdk-js` module.

```javascript
const IconService = require('icon-sdk-js');
```

### Usage in browser

Install `icon-sdk-js` module using `npm`,

```bash
npm install --save icon-sdk-js
```

or using CDN.

```html
<script src="https://cdn.jsdelivr.net/gh/icon-project/icon-sdk-js@latest/build/icon-sdk-js.web.min.js"></script>
```

Then, import `icon-sdk-js` module.

```javascript
import IconService from 'icon-sdk-js';
```

### Usage in react-native environment

Install `icon-sdk-js` module using `npm`,

```bash
npm install --save icon-sdk-js
```

Then, import `icon-sdk-js/build/icon-sdk-js.web.min.js` module.
```javascript
import IconService from 'icon-sdk-js/build/icon-sdk-js.web.min.js';
```

---

## Quick Start Guide

This is an example project of Icon SDK JavaScript.

In this project, the examples are implemented as below.

| Example       | Description |
| ------------- | ----------- |
| WalletExample | An example of creating and loading a wallet. |
| IcxTransactionExample | An example of transferring ICX and confirming the result. |
| DeployAndTransferTokenExample | An example of deploying IRC token and transferring deployed token. |
| SyncBlockExample | An example of checking block confirmation and printing the ICX and token transfer information. |

### Get Started

#### Install Dependency

Please go to `quickstart` directory and install dependency to use `icon-sdk-js`.

npm
```
npm install   // install dependencies for executing the quickstart project (including icon-sdk-js package)
```

#### Run example file
Run example file.
```
npm start   // open http://localhost:3000/ in browser
```

If you want to rebuild icon-sdk-js library and run quickstart project, go to icon-sdk-js root directory and run `npm run quickstart:rebuild` command.
```
npm run quickstart:rebuild   // open http://localhost:3000/ in browser
```

#### Set Node URL

If you want to use custom ICON node url, change the value of `NODE_URL` variable in `./mockData/index.js`. Default value of `NODE_URL` is `https://bicon.net.solidwallet.io/api/v3`

*For more information on the testnet, see [the documentation](https://github.com/icon-project/icon-project.github.io/blob/master/docs/icon_network.md) for the ICON network.*

```javascript
const NODE_URL = 'https://bicon.net.solidwallet.io/api/v3'; 
```


#### IconService

Generate `IconService` to communicate with the nodes.

`IconService` allows you to send transaction, check the result and block information, etc.

`HttpProvider` is set as default to communicate with http.

```javascript
// HttpProvider is used to communicate with http.
const provider = new HttpProvider(MockData.NODE_URL);
// Create IconService instance
const iconService = new IconService(provider);
```

### WalletExample

This example shows how to create a new `Wallet` and load wallet with privateKey or Keystore file.


#### Create Wallet

Create new EOA by calling `create` function. After creation, the address and private Key can be looked up.

```javascript
const wallet = IconWallet.create(); //Wallet Creation
console.log("Address: " + wallet.getAddress()); // Address Check
console.log("PrivateKey: " + wallet.getPrivateKey()); // PrivateKey Check

// Output
Address: hx4d37a7013c14bedeedbe131c72e97ab337aea159
PrivateKey: 00e1d6541bfd8be7d88be0d24516556a34ab477788022fa07b4a6c1d862c4de516
```

#### Load Wallet

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

#### Store Wallet

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

### IcxTransactionExample

This example shows how to transfer ICX and check the result.

*For the Wallet and IconService creation, please refer to the information above.*

#### ICX Transfer

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

#### Check the Transaction Result

After transaction is sent, the result can be looked up with the returned hash value.

In this example, you can check your transaction result in every 2 seconds because of the block confirmation time.
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

#### Check the Balance

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

### DeployAndTransferTokenExample

This example shows how to deploy IRC token and transfer deployed token.

*For the Wallet and IconService generation, please refer to the information above.*

#### Token Deploy

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

#### Token Transfer

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

#### Check the Result

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

#### Check the Token Balance

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

### SyncBlockExample

This example shows how to read block information and print the transaction result for every block creation.

*Please refer to above for Wallet and IconService creation.*

#### Read Block Information

In this example, 'getLastBlock' is called periodically in order to check the new blocks,

by updating the transaction information for every block creation.

```javascript
// Check the recent blocks
const block = await iconService.getBlock('latest').execute();
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

#### Transaction Output

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

#### Check the Token Name & Symbol

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

### References

- [ICON JSON-RPC API v3](https://icondev.readme.io/docs/json-rpc-specification) 
- [IRC2 Specification](https://github.com/icon-project/IIPs/blob/master/IIPS/iip-2.md)

---

## API Specification

### IconService

`IconService` is a class which provides APIs to communicate with ICON nodes. It enables you to easily use ICON JSON-RPC APIs (version 3). All instance methods of `IconService` returns a `HttpCall` instance. To execute the request and get the result value, you need to run `execute()` function of `HttpCall` instance. All requests will be executed **asynchronously**. Synchronous request is not available.

Also, `IconService` is a module container of `icon-sdk-js`. Details of modules are as below:

| Module       | Description |
| ------------- | ----------- |
| [IconWallet] | Class which provides EOA functions. |
| [IconBuilder] | Builder class for transaction object. |
| [SignedTransaction] | Class representing the signed transaction object. |
| [HttpProvider] | Class representing HTTP-based provider |
| [IconAmount] | Class which provides unit conversion functions. |
| [IconConverter] | Util module contains conversion functions. |
| [IconHexadecimal] | Util module contains hex-prefix functions. |
| [IconValidator] | Util module contains validator functions. |

#### Constructor

Creates an instance of IconService.

```javascript
new IconService(provider: HttpProvider)
```
##### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| provider | `HttpProvider` | The [HttpProvider] instance. |

##### Example
```javascript
const httpProvider = new HttpProvider('https://ctz.solidwallet.io/api/v3');
const iconService = new IconService(httpProvider);
```

#### getTotalSupply()

Get the total number of issued coins.

```javascript
.getTotalSupply() => HttpCall // .execute() => BigNumber
```

##### Parameters

None

##### Returns

`HttpCall` - The HttpCall instance for `icx_getTotalSupply` JSON-RPC API request. If `execute()` successfully, it returns a `BigNumber` value of total issued coins.

##### Example
```javascript
/* Returns the total number of issued coins. */
const totalSupply = await iconService.getTotalSupply().execute();
```


#### getBalance()

Get the balance of the address.

```javascript
.getBalance(address: string) => HttpCall // .execute() => BigNumber
```

##### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| address | `string` | An EOA address. |

##### Returns
`HttpCall` - The HttpCall instance for `icx_getBalance` JSON-RPC API request. If `execute()` successfully, it returns a `BigNumber` value of ICX balance.

##### Example
```javascript
/* Returns the balance of a EOA address */
const balance = await iconService.getBalance('hx9d8a8376e7db9f00478feb9a46f44f0d051aab57').execute();
```

#### getBlock()

Get the block information.

```javascript
.getBlock(value: string|BigNumber) => HttpCall // .execute() => object
```

##### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| value | `string|BigNumber` | The height or hash value of block.

Depending on the type of input value, there are different ways to get block information.

1. Get block by height - Put integer value of a block height. It will delegate to [icx_getBlockByHeight] RPC method.

2. Get block by hash - Put block hash value. It will delegate to [icx_getBlockByHash] RPC method.

3. Get latest block - Put the string `'latest'`. It will delegate to [icx_getLastBlock] RPC method.

##### Returns
`HttpCall` - The HttpCall instance for `icx_getBlockByHeight`, `icx_getBlockByHash` or `icx_getLastBlock` JSON-RPC API request. If `execute()` successfully, it returns a block `object`. For details of returned block object, see _Example_ section of [icx_getLastBlock].


##### Example
```javascript
// Returns block information by block height
const block1 = await iconService.getBlock(1000).execute();

// Returns block information by block hash
const block2 = await iconService.getBlock("0xdb310dd653b2573fd673ccc7489477a0b697333f77b3cb34a940db67b994fd95").execute();

// Returns latest block information
const block2 = await iconService.getBlock("latest").execute(); 
```

#### getScoreApi()

Get the SCORE API list.

```javascript
.getScoreApi(address: string) => HttpCall // .execute() => array
```

##### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| address | `string` | A SCORE address. |

##### Returns
`HttpCall` - The HttpCall instance for `icx_getScoreApi` JSON-RPC API request. If `execute()` successfully, it returns a `ScoreApiList` instance, the API list of SCORE address. 

`ScoreApiList` provides two instance methods, `getList()` and `getMethod()`.

* getList() - Returns `array` of API list.

* getMethod(*method: `string`*) - Returns `object` of method information.


##### Example
```javascript
// Returns the SCORE API list
const apiList = await iconService.getScoreApi('cx0000000000000000000000000000000000000001').execute();

// [ { type: 'function', name: 'acceptScore', inputs: [ [Object] ] outputs: [] }, ··· { type: 'eventlog', name: 'UpdateServiceConfigLog', inputs: [ [Object] ] }]
console.log(apiList.getList());

// { type: 'function', name: 'getStepCosts', inputs: [], outputs: [ { type: 'dict' } ], readonly: '0x1' }
console.log(apiList.getMethod('getStepCosts'));
```

#### getTransaction()

Get the transaction information.

```javascript
.getTransaction(hash: string) => HttpCall // .execute() => object
```

##### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| hash | `string` | The transaction hash. |

##### Returns
`HttpCall` - The HttpCall instance for `icx_getTransactionByHash` JSON-RPC API request. If `execute()` successfully, it returns a transaction `object`. For details of returned object, see [here][icx_getTransactionByHash].

##### Example
```javascript
// Returns the transaction object.
const txObject = await iconService.getTransaction('0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238').execute();
```

#### getTransactionResult()

Get the result of transaction by transaction hash.

```javascript
.getTransactionResult(hash: string) => HttpCall // .execute() => object
```

##### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| hash | `string` | The transaction hash. |

##### Returns
`HttpCall` - The HttpCall instance for `icx_getTransactionResult` JSON-RPC API request. If `execute()` successfully, it returns a transaction result `object`. For details of returned object, see [here][icx_getTransactionResult].

##### Example
```javascript
// Returns the transaction result object.
const txObject = await iconService.getTransactionResult('0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238').execute();
```

#### sendTransaction()

Send a transaction that changes the states of address.

```javascript
.sendTransaction(signedTransaction: SignedTransaction) => HttpCall // .execute() => string
```

##### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| signedTransaction | `SignedTransaction` | The instance of [SignedTransaction] class. |

##### Returns
`HttpCall` - The HttpCall instance for `icx_sendTransaction` JSON-RPC API request. If `execute()` successfully, it returns a `string` value of transaction hash.

##### Example
```javascript
// Returns the tx hash of transaction.
const txHash = await iconService.sendTransaction(signedTransaction).execute();
```

#### call()

Calls external function of SCORE.

```javascript
.call(call: Call) => HttpCall // .execute() => any
```

##### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| call | `Call` | The instance of Call class builded by [CallBuilder]. |

##### Returns
`HttpCall` - The HttpCall instance for `icx_call` JSON-RPC API request. If `execute()` successfully, it returns a `any` type of value returned by the executed SCORE function.

##### Example
```javascript
// Returns the value returned by the executed SCORE function.
const result = await iconService.call(call).execute();
```

### IconService.IconWallet (Wallet)

`IconWallet` is a class which provides EOA functions. It enables you to create, load, and store `Wallet` object.

#### Constructor

Creates an instance of `Wallet` class. To create wallet, please use `create()` static function instead of instantiating this class directly.

```javascript
new Wallet(privKey: string, pubKey: string)
```
##### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| privKey | `string` | A private key. |
| pubKey | `string` | A public key. |

#### static create()

Creates an instance of `Wallet` class.

```javascript
IconWallet.create() => Wallet
```
##### Parameters

None

##### Returns
`Wallet` - A Wallet instance. It contains a public key and a private key randomly generated by `create()` function.

##### Example
```javascript
// Creates an instance of Wallet.
const wallet = IconWallet.create();
```

#### static loadPrivateKey()

Import existing wallet using private key.

```javascript
IconWallet.loadPrivateKey(privKey: string) => Wallet
```
##### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| privKey | `string` | A private key. |

##### Returns
`Wallet` - A Wallet instance.

##### Example
```javascript
// Load wallet object
const wallet = IconWallet.loadPrivateKey('2ab···e4c');
```

#### static loadKeystore()

Import existing wallet using keystore object.

```javascript
IconWallet.loadKeystore(keystore: object|string, password: string, nonStrict?: boolean) => Wallet
```
##### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| keystore | `object|string` | The keystore object (or stringified object.) |
| password | `string` | The password of keystore object. |
| nonStrict (optional) | `boolean` | Set whether checking keystore file case-insensitive or not. _(affects when `keystore` param is string.)_ |

##### Returns
`Wallet` - A Wallet instance.

##### Example
```javascript
const testKeystore = { "version": 3, "id": "41fc1ddb-4faf-4c88-b494-8fe82a4bab63", "address": "hxd008c05cbc0e689f04a5bb729a66b42377a9a497", "crypto": { "ciphertext": "c4046f5a735403a963110d24f39120a102ad7bc462bf2a14ae334ba4a8c485f6", "cipherparams": { "iv": "441b5a5de3dd33de6f7838b6075702d2" }, "cipher": "aes-128-ctr", "kdf": "scrypt", "kdfparams": { "dklen": 32, "salt": "39d45ffead82d554e35a55efcc7a1f64afe73e9a8ab6b750d959f904e32294ba", "n": 16384, "r": 8, "p": 1 }, "mac": "9bca1f2e8750efb27b7357e1a6a727c596cb812f7a4c45792494a8b0890774d7" }, "coinType": "icx" }
const testPassword = 'qwer1234!'

// Load wallet object
const wallet = IconWallet.loadKeystore(testKeystore, testPassword)
```

#### store()

Get keystore object of an instance of a `Wallet` class.

```javascript
.store(password: string, opts?: object) => object
```
##### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| password | `string` | The new password for encryption. |
| opts (optional) | `object` | The custom options for encryption. |

##### Returns
`object` - A keystore object.

##### Example
```javascript
const wallet = IconWallet.create()
// Get keystore object of an instance of a `Wallet` class.
const keystore = wallet.store("qwer1234!")
```

#### sign()

Generate signature string by signing transaction object.

```javascript
.sign(data: Buffer) => string
```
##### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| data | `Buffer` | The serialized transaction object. |

##### Returns
`string` - A signature string.

##### Example
```javascript
const wallet = IconWallet.create()
// Get keystore object of an instance of a `Wallet` class.
const signature = wallet.sign('ba4···f64')
```

#### getPrivateKey()

Get private key of `Wallet` instance.

```javascript
.getPrivateKey() => string
```
##### Parameters

None

##### Returns
`string` - A private key.

##### Example
```javascript
const wallet = IconWallet.create()
// Get private key of `Wallet` instance.
const pk = wallet.getPrivateKey()
```

#### getPublicKey()

Get public key of `Wallet` instance.

```javascript
.getPublicKey() => string
```
##### Parameters

None

##### Returns
`string` - A public key.

##### Example
```javascript
const wallet = IconWallet.create()
// Get public key of `Wallet` instance.
const pk = wallet.getPublicKey()
```

#### getAddress()

Get address of `Wallet` instance.

```javascript
.getAddress() => string
```
##### Parameters

None

##### Returns
`string` - A EOA address.

##### Example
```javascript
const wallet = IconWallet.create()
// Get address of `Wallet` instance.
const pk = wallet.getAddress()
```

### IconService.IconBuilder

`IconBuilder` is a object contains builder class for transaction object. Builder class enables you to make transaction object easily. There are 5 types of builder class as follow:

| Module       | Description |
| ------------- | ----------- |
| [IcxTransactionBuilder] | Builder class for `IcxTransaction` instance, which is for sending ICX.  |
| [MessageTransactionBuilder] | Builder class for `MessageTransaction` instance, which is for sending message data. Extends `IcxTransactionBuilder` class. |
| [DeployTransactionBuilder] | Builder class for `DeployTransaction` instance, which is for deploying SCORE. Extends `IcxTransactionBuilder` class.  |
| [CallTransactionBuilder] | Builder class for `CallTransaction` instance, which is for invoking a *state-transition* function of SCORE. Extends `IcxTransactionBuilder` class. |
| [CallBuilder] | Builder class for `Call` instance, which is for invoking a *read-only* function of SCORE. |

### IconService.IconBuilder.IcxTransactionBuilder

Builder class for `IcxTransaction` instance. `IcxTransaction` is a object representing a transaction object used for sending ICX. The parameter details are as follows:

| Parameter       | Description |
| ------------- | ----------- |
| `to` | An EOA address to receive coins, or SCORE address to execute the transaction. |
| `from` | An EOA address that created the transaction |
| `value` (optional) | Amount of ICX coins in loop to transfer. When ommitted, assumes 0. (1 icx = 1 ^ 18 loop) |
| `stepLimit` | Maximum step allowance that can be used by the transaction. |
| `nid` | Network ID ("0x1" for Mainnet, "0x2" for Testnet, etc) |
| `nonce` | An arbitrary number used to prevent transaction hash collision. |
| `version` | Protocol version ("0x3" for V3) |
| `timestamp` | Transaction creation time. timestamp is in microsecond. |

#### Constructor

Creates an instance of `IcxTransactionBuilder` class.

```javascript
new IcxTransactionBuilder()
```
##### Parameters

None

#### to()

Setter method of 'to' property.

```javascript
.to(to: string) => IcxTransactionBuilder
```
##### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| to | `string` | The EOA or SCORE address. |

##### Returns
`IcxTransactionBuilder` - Returns an instance of itself

##### Example
```javascript
// Set `to` property.
const txObj = new IcxTransactionBuilder()
    .to('hx87a90bfe8ed49e1a25184ce77fa0d9c4b0484d6a')
```

#### from()

Setter method of 'from' property.

```javascript
.from(from: string) => IcxTransactionBuilder
```
##### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| from | `string` | An EOA address. |

##### Returns
`IcxTransactionBuilder` - Returns an instance of itself

##### Example
```javascript
// Set `from` property.
const txObj = new IcxTransactionBuilder()
    .from('hx46293d558d3bd489c3715e7e3648de0e35086bfd')
```

#### value()

Setter method of 'value' property.

```javascript
.value(value: string|BigNumber|number) => IcxTransactionBuilder
```
##### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| value | `string|BigNumber|number` | The sending amount of ICX in loop unit. |

##### Returns
`IcxTransactionBuilder` - Returns an instance of itself

##### Example
```javascript
// Set `value` property.
const txObj = new IcxTransactionBuilder()
    .value(IconAmount.of(1, IconAmount.Unit.ICX).toLoop())
```

#### stepLimit()

Setter method of 'stepLimit' property.

```javascript
.stepLimit(stepLimit: string|BigNumber|number) => IcxTransactionBuilder
```
##### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| stepLimit | `string|BigNumber|number` | The amount of step limit. |

##### Returns
`IcxTransactionBuilder` - Returns an instance of itself

##### Example
```javascript
// Set `value` property.
const txObj = new IcxTransactionBuilder()
    .stepLimit(IconConverter.toBigNumber(100000))
```

#### nid()

Setter method of 'nid' property.

```javascript
.nid(nid: string|BigNumber|number) => IcxTransactionBuilder
```
##### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| nid | `string|BigNumber|number` | A network ID. |

##### Returns
`IcxTransactionBuilder` - Returns an instance of itself

##### Example
```javascript
// Set `nid` property.
const txObj = new IcxTransactionBuilder()
    .nid(IconConverter.toBigNumber(1))
```

#### nonce()

Setter method of 'nonce' property.

```javascript
.nonce(nonce: string|BigNumber|number) => IcxTransactionBuilder
```
##### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| nonce | `string|BigNumber|number` | A nonce value. |

##### Returns
`IcxTransactionBuilder` - Returns an instance of itself

##### Example
```javascript
// Set `nonce` property.
const txObj = new IcxTransactionBuilder()
    .nonce(IconConverter.toBigNumber(1))
```

#### version()

Setter method of 'version' property.

```javascript
.version(version: string|BigNumber|number) => IcxTransactionBuilder
```
##### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| version | `string|BigNumber|number` | A version value. |

##### Returns
`IcxTransactionBuilder` - Returns an instance of itself

##### Example
```javascript
// Set `version` property.
const txObj = new IcxTransactionBuilder()
    .version(IconConverter.toBigNumber(3))
```

#### timestamp()

Setter method of 'timestamp' property.

```javascript
.timestamp(version: string|BigNumber|number) => IcxTransactionBuilder
```
##### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| timestamp | `string|BigNumber|number` | A timestamp value. (microsecond) |

##### Returns
`IcxTransactionBuilder` - Returns an instance of itself

##### Example
```javascript
// Set `timestamp` property.
const txObj = new IcxTransactionBuilder()
    .timestamp(1544596599371000)
```

#### build()

Returns an `IcxTransaction` instance which contains parameter you set.

```javascript
.build() => IcxTransaction
```
##### Parameters

None

##### Returns
`IcxTransaction` - Returns an `IcxTransaction` instance.

##### Example
```javascript
// Build `IcxTransaction` instance.
const txObj = new IcxTransactionBuilder()
    .from('hx46293d558d3bd489c3715e7e3648de0e35086bfd')
    .to('hx87a90bfe8ed49e1a25184ce77fa0d9c4b0484d6a')
    .value(IconAmount.of(7, IconAmount.Unit.ICX).toLoop())
    .stepLimit(IconConverter.toBigNumber(100000))
    .nid(IconConverter.toBigNumber(3))
    .nonce(IconConverter.toBigNumber(1))
    .version(IconConverter.toBigNumber(3))
    .timestamp(1544596599371000)
    .build()
```

### IconService.IconBuilder.MessageTransactionBuilder

Builder class for `MessageTransaction` instance. `MessageTransaction` is a object representing a transaction object used for sending message data. It extends `IcxTransaction` class, so instance parameters and methods of builder class are mostly identical to `IcxTransaction` class, except for the following:

| Parameter       | Description |
| ------------- | ----------- |
| `data` | A message data. Data type of the data should be **lowercase hex string prefixed with '0x'.** |
| `dataType` | Data type of `data`. Fixed string `message` is in value. |

For details of extended parameters and methods, see [IcxTransactionBuilder] section.

#### Constructor

Creates an instance of `MessageTransactionBuilder` class.

```javascript
new MessageTransactionBuilder()
```
##### Parameters

None

#### data()

Setter method of 'data' property.

```javascript
.data(data: string) => MessageTransactionBuilder
```
##### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| data | `string` | The data (hex string) to send. |

##### Returns
`MessageTransactionBuilder` - Returns an instance of itself

##### Example
```javascript
// Set `data` property.
const txObj = new MessageTransactionBuilder()
		.data(IconConverter.fromUtf8('Hello'))
```

#### build()

Returns an `MessageTransaction` instance which contains parameter you set.

```javascript
.build() => MessageTransaction
```
##### Parameters

None

##### Returns
`MessageTransaction` - Returns an `MessageTransaction` instance.

##### Example
```javascript
// Build `MessageTransaction` instance.
const txObj = new MessageTransactionBuilder()
    .from('hx46293d558d3bd489c3715e7e3648de0e35086bfd')
    .to('hx87a90bfe8ed49e1a25184ce77fa0d9c4b0484d6a')
    .stepLimit(IconConverter.toBigNumber(100000))
    .nid(IconConverter.toBigNumber(3))
    .nonce(IconConverter.toBigNumber(1))
    .version(IconConverter.toBigNumber(3))
    .timestamp(1544596599371000)
    .data(IconConverter.fromUtf8('Hello'))
    .build()
```

### IconService.IconBuilder.DeployTransactionBuilder

Builder class for `DeployTransaction` instance. `DeployTransaction` is a object representing a transaction object used for deploying SCORE. It extends `IcxTransaction` class, so instance parameters and methods of builder class are mostly identical to `IcxTransaction` class, except for the following:

| Parameter       | Description |
| ------------- | ----------- |
| `data` | A deploy object data. It contains 3 parameters: 1) `contentType` - Mime-type of the content. 2) `content` - Compressed SCORE data. 3) `params` (optional) - Function parameters delivered to on_install() or on_update() |
| `dataType` | Data type of `data`. Fixed string `deploy` is in value. |

For details of extended parameters and methods, see [IcxTransactionBuilder] section.

#### Constructor

Creates an instance of `DeployTransactionBuilder` class.

```javascript
new DeployTransactionBuilder()
```
##### Parameters

None

#### contentType()

Setter method of 'contentType' property in 'data'.

```javascript
.contentType(contentType: string) => DeployTransactionBuilder
```
##### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| contentType | `string` | The content type of content |

##### Returns
`DeployTransactionBuilder` - Returns an instance of itself

##### Example
```javascript
// Set `contentType` property.
const txObj = new DeployTransactionBuilder()
    .contentType('application/zip')
```

#### content()

Setter method of 'content' property in 'data'.

```javascript
.content(content: string) => DeployTransactionBuilder
```
##### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| content | `string` | The content to deploy. |

##### Returns
`DeployTransactionBuilder` - Returns an instance of itself

##### Example
```javascript
// Set `content` property.
const txObj = new DeployTransactionBuilder()
    .content('0x504b03040a0000000000d3a68e4d000000000000000...')
```

#### params()

Setter method of 'params' property in 'data'.

```javascript
.params(params: object) => DeployTransactionBuilder
```
##### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| params | `object` | Function parameters delivered to on_install() or on_update(). |

##### Returns
`DeployTransactionBuilder` - Returns an instance of itself

##### Example
```javascript
// Set `params` property.
const txObj = new DeployTransactionBuilder()
    .params({
        initialSupply: IconConverter.toHex('100000000000'),
        decimals: IconConverter.toHex(18),
        name: 'StandardToken',
        symbol: 'ST',
	})
```

#### build()

Returns an `DeployTransaction` instance which contains parameter you set.

```javascript
.build() => DeployTransaction
```
##### Parameters

None

##### Returns
`DeployTransaction` - Returns an `DeployTransaction` instance.

##### Example
```javascript
// Build `DeployTransaction` instance.
const txObj = new DeployTransactionBuilder()
		.from('hx46293d558d3bd489c3715e7e3648de0e35086bfd')
		.to('cx0000000000000000000000000000000000000000')
		.stepLimit(IconConverter.toBigNumber(2500000))
		.nid(IconConverter.toBigNumber(3))
		.nonce(IconConverter.toBigNumber(1))
		.version(IconConverter.toBigNumber(3))
		.timestamp(1544596599371000)
		.contentType('application/zip')
		.content('0x504b03040a0000000000d3a68e4d000000000000000...')
		.params({
			initialSupply: IconConverter.toHex('100000000000'),
			decimals: IconConverter.toHex(18),
			name: 'StandardToken',
			symbol: 'ST',
		})
		.build()
```


### IconService.IconBuilder.CallTransactionBuilder

Builder class for `CallTransaction` instance. `CallTransaction` is a object representing a transaction object used for invoking a *state-transition* function of SCORE. It extends `IcxTransaction` class, so instance parameters and methods are mostly identical to `IcxTransaction` class, except for the following:

| Parameter       | Description |
| ------------- | ----------- |
| `data` | A object data for calling method. It contains 2 parameters: 1) `method` - The method name of SCORE API. 2) `params` (optional) - The input params for method |
| `dataType` | Data type of `data`. Fixed string `call` is in value. |

For details of extended parameters and methods, see [IcxTransactionBuilder] section.

#### Constructor

Creates an instance of `CallTransactionBuilder` class.

```javascript
new CallTransactionBuilder()
```
##### Parameters

None



#### method()

Setter method of 'method' property in 'data'.

```javascript
.method(method: string) => CallTransactionBuilder
```
##### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| method | `string` | The method name of SCORE API. |

##### Returns
`CallTransactionBuilder` - Returns an instance of itself

##### Example
```javascript
// Set `method` property.
const txObj = new CallTransactionBuilder()
		.method('transfer')
```


#### params()

Setter method of 'params' property in 'data'.

```javascript
.params(params: object) => CallTransactionBuilder
```
##### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| params | `object` | The input params for method. |

##### Returns
`CallTransactionBuilder` - Returns an instance of itself

##### Example
```javascript
// Set `params` property.
const txObj = new CallTransactionBuilder()
    .params({
        _to: 'hxd008c05cbc0e689f04a5bb729a66b42377a9a497',
        _value: IconConverter.toHex(IconAmount.of(1, IconAmount.Unit.ICX).toLoop()),
    })
```


#### build()

Returns an `CallTransaction` instance which contains parameter you set.

```javascript
.build() => CallTransaction
```
##### Parameters

None

##### Returns
`CallTransaction` - Returns an `CallTransaction` instance.

##### Example
```javascript
// Build `CallTransaction` instance.
const txObj = new CallTransactionBuilder()
		.from('hx902ecb51c109183ace539f247b4ea1347fbf23b5')
		.to('cx3502b4dadbfcd654d26d53d8463f2929c2c3948d')
		.stepLimit(IconConverter.toBigNumber('2000000'))
		.nid(IconConverter.toBigNumber('3'))
		.nonce(IconConverter.toBigNumber('1'))
		.version(IconConverter.toBigNumber('3'))
		.timestamp((new Date()).getTime() * 1000)
		.method('transfer')
		.params({
			_to: 'hxd008c05cbc0e689f04a5bb729a66b42377a9a497',
			_value: IconConverter.toHex(IconAmount.of(1, IconAmount.Unit.ICX).toLoop()),
		})
		.build()
```


### IconService.IconBuilder.CallBuilder

Builder class for `Call` instance. `Call` is a object representing a transaction object used for invoking a *read-only* function of SCORE. The parameter details are as follows:

| Parameter       | Description |
| ------------- | ----------- |
| `to` | A SCORE address to execute the call. |
| `data` | A object data for calling method. It contains 2 parameters: 1) `method` - The method name of SCORE API. 2) `params` (optional) - The input params for method |
| `dataType` | Data type of `data`. Fixed string `call` is in value. |

#### Constructor

Creates an instance of `CallBuilder` class.

```javascript
new CallBuilder()
```
##### Parameters

None

#### to()

Setter method of 'to' property.

```javascript
.to(to: string) => CallBuilder
```
##### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| to | `string` | SCORE address. |

##### Returns
`CallBuilder` - Returns an instance of itself

##### Example
```javascript
// Set `to` property.
const txObj = new CallBuilder()
    .to('cxc248ee72f58f7ec0e9a382379d67399f45b596c7')
```


#### method()

Setter method of 'method' property in 'data'.

```javascript
.method(method: string) => CallBuilder
```
##### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| method | `string` | The method name of SCORE API. |

##### Returns
`CallBuilder` - Returns an instance of itself

##### Example
```javascript
// Set `method` property.
const txObj = new CallBuilder()
		.method('balanceOf')
```


#### params()

Setter method of 'params' property in 'data'.

```javascript
.params(params: object) => CallBuilder
```
##### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| params | `object` | The input params for method. |

##### Returns
`CallBuilder` - Returns an instance of itself

##### Example
```javascript
// Set `params` property.
const txObj = new CallBuilder()
    .params({ 
        _owner: 'hx87a90bfe8ed49e1a25184ce77fa0d9c4b0484d6a' 
    })
```


#### build()

Returns an `Call` instance which contains parameter you set.

```javascript
.build() => Call
```
##### Parameters

None

##### Returns
`Call` - Returns an `Call` instance.

##### Example
```javascript
// Build `Call` instance.
const txObj = new CallBuilder()
    .to('cxc248ee72f58f7ec0e9a382379d67399f45b596c7')
    .method('balanceOf')
    .params({ _owner: 'hx87a90bfe8ed49e1a25184ce77fa0d9c4b0484d6a' })
    .build()
```


### IconService.SignedTransaction

`SignedTransaction` is a class for signing transaction object. It enables you to make signature, and signed transaction object by calling instance methods. Also, by passing `SignedTransaction` instance to [sendTransaction()], it will automatically generate transaction object including signature, and send to ICON node.

#### Constructor

Creates an instance of `SignedTransaction` class.

```javascript
new SignedTransaction(transaction: IcxTransaction|MessageTransaction|CallTransaction|DeployTransaction, wallet: Wallet)
```

##### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| transaction | `IcxTransaction|MessageTransaction|CallTransaction|DeployTransaction` | A transaction object. |
| wallet | `Wallet` | wallet instance used for signing. |

#### getSignature()

Get signature string.

```javascript
.getSignature() => string
```

##### Parameters

None

##### Returns

`string` - The signature string.

##### Example
```javascript
/* Returns the signature */
const signature = new SignedTransaction(icxTransaction, wallet).getSignature() 
// 'YV3eNgVjLFwXS65Bk...+lC90KgRBh7FtwE='
```

#### getProperties()

Get raw signed transaction object.

```javascript
.getProperties() => object
```

##### Parameters

None

##### Returns

`object` - The raw signed transaction object.

##### Example
```javascript
/* Returns the raw signed transaction object */
const signature = new SignedTransaction(icxTransaction, wallet).getProperties()
// {
// 	to: 'hx87a90bfe8ed49e1a25184ce77fa0d9c4b0484d6a',
// 	from: 'hx46293d558d3bd489c3715e7e3648de0e35086bfd',
// 	stepLimit: '0x186a0',
// 	nid: '0x3',
// 	version: '0x3',
// 	timestamp: '0x57ccd6ba074f8',
// 	value: '0x7',
// 	nonce: '0x1',
// 	signature: 'YV3eNgVjLFwXS65Bk...+lC90KgRBh7FtwE=',
// };
```


#### getRawTransaction()

Get raw transaction object of `transaction` property.

```javascript
.getRawTransaction() => object
```

##### Parameters

None

##### Returns

`object` - The raw transaction object of `transaction` property.

##### Example
```javascript
/* Returns the signed transaction object */
const signature = new SignedTransaction(icxTransaction, wallet).getRawTransaction()
// {
// 	to: 'hx87a90bfe8ed49e1a25184ce77fa0d9c4b0484d6a',
// 	from: 'hx46293d558d3bd489c3715e7e3648de0e35086bfd',
// 	stepLimit: '0x186a0',
// 	nid: '0x3',
// 	version: '0x3',
// 	timestamp: '0x57ccd6ba074f8',
// 	value: '0x7',
// 	nonce: '0x1'
// };
```


### IconService.HttpProvider

`HttpProvider` is a class representing HTTP-based provider. It is commonly used for setting provider url of `IconService` instance. For details of network and node url, see [ICON Networks] document.


#### Constructor

Creates an instance of `HttpProvider` class.

```javascript
new HttpProvider(url: string)
```

##### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| url | `string` | ICON node url |


### IconService.IconAmount

`IconAmount` is a class representing BigNumber value and unit data. It also provides unit conversion static functions. It enables you to manage different type of numeric data easily.

(`IconAmount` contains static class property called `Unit`, which has constant `number` value of different type of unit digit. `IconAmount.Unit.LOOP` is `0`, and `IconAmount.Unit.ICX` is `18`.)

#### Constructor

Creates an instance of `IconAmount` class.

```javascript
new IconAmount(value: string|BigNumber|number, digit: string|BigNumber|number)
```

##### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| value | `string|BigNumber|number` | the value of amount. |
| digit | `string|BigNumber|number` | the digit of unit. |

> Note: According to official document of [BigNumber.js](https://mikemcl.github.io/bignumber.js/#bignumber), it is recommended to create BigNumbers from `string` values rather than `number` values to avoid a potential loss of precision.

#### static of()

Creates an instance of `IconAmount` class.

```javascript
IconAmount.of(value: string|BigNumber|number, digit: string|BigNumber|number) => IconAmount

```
##### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| value | `string|BigNumber|number` | the value of amount. |
| digit | `string|BigNumber|number` | the digit of unit. |

> Note: According to official document of [BigNumber.js](https://mikemcl.github.io/bignumber.js/#bignumber), it is recommended to create BigNumbers from `string` values rather than `number` values to avoid a potential loss of precision.

##### Returns
`IconAmount` - IconAmount instance.

##### Example
```javascript
// Returns IconAmount instance
const iconAmount = IconAmount.of('2', IconAmount.Unit.ICX);
```


#### toString()

Converts value property into string

```javascript
.toString() => string

```
##### Parameters

None

##### Returns
`string` - The stringified value property of IconAmount instance.

##### Example
```javascript
// Returns stringified value property
const value = IconAmount.of('2', IconAmount.Unit.ICX).toString();
```


#### getDigit()

Get digit property.

```javascript
.getDigit() => number

```
##### Parameters

None

##### Returns
`number` - The digit property of IconAmount instance.

##### Example
```javascript
// Returns digit property
const digit = IconAmount.of('2', IconAmount.Unit.ICX).getDigit();
```


#### toLoop()

Get value property converted into loop unit.

```javascript
.toLoop() => BigNumber

```
##### Parameters

None

##### Returns
`BigNumber` - The value property converted into loop unit.

##### Example
```javascript
// Returns value property converted into loop unit.
const value = IconAmount.of('2', IconAmount.Unit.ICX).toLoop();
```


#### convertUnit()

Converts value property into custom digit

```javascript
.convertUnit(digit: string|BigNumber|number) => IconAmount

```
##### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| digit | `string|BigNumber|number` | the digit of unit. |

##### Returns
`IconAmount` - The IconAmount instance converted into custom digit.

##### Example
```javascript
// Returns IconAmount instance converted into custom digit.
const value = IconAmount.of('2', IconAmount.Unit.ICX).convertUnit(IconAmount.Unit.LOOP);
```


### IconService.IconConverter

### IconService.IconHexadecimal

### IconService.IconValidator

### Error cases













<!-- 
Link: 
-->

[icx_getBlockByHeight]: https://icondev.readme.io/docs/json-rpc-specification#section-icx_getblockbyheight

[icx_getBlockByHash]: https://icondev.readme.io/docs/json-rpc-specification#section-icx_getblockbyhash

[icx_getLastBlock]: https://icondev.readme.io/docs/json-rpc-specification#section-icx_getlastblock

[icx_getScoreApi]: https://icondev.readme.io/docs/json-rpc-specification#section-icx_getscoreapi

[icx_getTransactionByHash]: https://icondev.readme.io/docs/json-rpc-specification#section-icx_gettransactionbyhash

[icx_getTransactionResult]: https://icondev.readme.io/docs/json-rpc-specification#section-icx_gettransactionresult

[ICON Networks]: https://icondev.readme.io/docs/icon-networks

[sendTransaction()]: #sendtransaction()
[IconWallet]: #iconservice.iconwallet-(wallet)
[IconBuilder]: #iconservice.iconbuilder
[IcxTransactionBuilder]: #iconservice.iconbuilder.icxtransactionbuilder
[MessageTransactionBuilder]: #iconservice.iconbuilder.messagetransactionbuilder
[DeployTransactionBuilder]: #iconservice.iconbuilder.deploytransactionbuilder
[CallTransactionBuilder]: #iconservice.iconbuilder.calltransactionbuilder
[CallBuilder]: #iconservice.iconbuilder.callbuilder
[SignedTransaction]: #iconservice.signedtransaction
[HttpProvider]: #iconservice.httpprovider
[IconAmount]: #iconservice.iconamount
[IconConverter]: #iconservice.iconconverter
[IconHexadecimal]: #iconservice.iconhexadecimal
[IconValidator]: #iconservice.iconvalidator


