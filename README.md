---
title: "ICON SDK for JavaScript"
excerpt: ""
---

ICON supports JavaScript SDK for 3rd party or user services development. You can integrate ICON JavaScript SDK into your project and utilize ICON’s functionality. This document provides you with an information of installation and API specification.

## Table of Contents
* [Installation](#installation)
* [API Specification - Introduction](#api-specification---introduction)
* [IconService][IconService]
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
* [Error cases][Error cases]
* [References][References]

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

## API Specification - Introduction

`IconService` is a root class of `icon-sdk-js`, which provides APIs to communicate with ICON nodes and contains different type of modules. Details of modules are as below:

| Module       | Description |
| ------------- | ----------- |
| [IconService] | Class which provides APIs to communicate with ICON nodes |
| [IconService.IconWallet] | Class which provides EOA functions. |
| [IconService.IconBuilder] | Builder class for transaction object. |
| [IconService.SignedTransaction] | Class representing the signed transaction object. |
| [IconService.HttpProvider] | Class representing HTTP-based provider |
| [IconService.IconAmount] | Class which provides unit conversion functions. |
| [IconService.IconConverter] | Util module contains conversion functions. |
| [IconService.IconHexadecimal] | Util module contains hex-prefix functions. |
| [IconService.IconValidator] | Util module contains validator functions. |

## IconService

`IconService` is a class which provides APIs to communicate with ICON nodes. It enables you to easily use ICON JSON-RPC APIs (version 3). All instance methods of `IconService` returns a `HttpCall` instance. To execute the request and get the result value, you need to run `execute()` function of `HttpCall` instance. All requests will be executed **asynchronously**. Synchronous request is not available.

### Constructor

Creates an instance of IconService.

```javascript
new IconService(provider: HttpProvider)
```
#### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| provider | `HttpProvider` | [HttpProvider] instance. |

#### Example
```javascript
const httpProvider = new HttpProvider('https://ctz.solidwallet.io/api/v3');
const iconService = new IconService(httpProvider);
```

### getTotalSupply()

Get the total number of issued coins.

```javascript
.getTotalSupply() => HttpCall // .execute() => BigNumber
```

#### Parameters

None

#### Returns

`HttpCall` - The HttpCall instance for `icx_getTotalSupply` JSON-RPC API request. If `execute()` successfully, it returns a `BigNumber` value of total issued coins.

#### Example
```javascript
/* Returns the total number of issued coins. */
const totalSupply = await iconService.getTotalSupply().execute();
```


### getBalance()

Get the balance of the address.

```javascript
.getBalance(address: string) => HttpCall // .execute() => BigNumber
```

#### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| address | `string` | an EOA address. |

#### Returns
`HttpCall` - The HttpCall instance for `icx_getBalance` JSON-RPC API request. If `execute()` successfully, it returns a `BigNumber` value of ICX balance.

#### Example
```javascript
/* Returns the balance of a EOA address */
const balance = await iconService.getBalance('hx9d8a8376e7db9f00478feb9a46f44f0d051aab57').execute();
```

### getBlock()

Get the block information. 
> Since this API is an old version, we recommend to use [getBlockByHeight()], [getBlockByHash()], [getLastBlock()] API.

```javascript
.getBlock(value: string|number|BigNumber) => HttpCall // .execute() => object
```

#### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| value | `string`, `number`, `BigNumber` | the height or hash value of block.

Depending on the type of input value, there are different ways to get block information.

1. Get block by height - Put integer value of a block height. It will delegate to [icx_getBlockByHeight] RPC method.

2. Get block by hash - Put block hash value. It will delegate to [icx_getBlockByHash] RPC method.

3. Get latest block - Put the string `'latest'`. It will delegate to [icx_getLastBlock] RPC method.

#### Returns
`HttpCall` - The HttpCall instance for `icx_getBlockByHeight`, `icx_getBlockByHash` or `icx_getLastBlock` JSON-RPC API request. If `execute()` successfully, it returns a block `object`. For details of returned block object, see _Example_ section of [icx_getLastBlock].


#### Example
```javascript
// Returns block information by block height
const block1 = await iconService.getBlock(1000).execute();

// Returns block information by block hash
const block2 = await iconService.getBlock("0xdb310dd653b2573fd673ccc7489477a0b697333f77b3cb34a940db67b994fd95").execute();

// Returns latest block information
const block2 = await iconService.getBlock("latest").execute(); 
```

### getBlockByHeight()

Get the block information by block height. 

```javascript
.getBlockByHeight(value: number|BigNumber) => HttpCall // .execute() => object
```

#### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| value | `number`, `BigNumber` | the height value of block.

#### Returns
`HttpCall` - The HttpCall instance for `icx_getBlockByHeight` JSON-RPC API request. If `execute()` successfully, it returns a block `object`.

#### Example
```javascript
// Returns block information
const block = await iconService.getBlockByHeight(1000).execute();
```

### getBlockByHash()

Get the block information by block hash. 

```javascript
.getBlockByHash(value: string) => HttpCall // .execute() => object
```

#### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| value | `string` | a block hash.

#### Returns
`HttpCall` - The HttpCall instance for `icx_getBlockByHash` JSON-RPC API request. If `execute()` successfully, it returns a block `object`.

#### Example
```javascript
// Returns block information
const block = await iconService.getBlockByHash('0xdb310dd653b2573fd673ccc7489477a0b697333f77b3cb34a940db67b994fd95').execute();
```

### getLastBlock()

Get the latest block information. 

```javascript
.getLastBlock() => HttpCall // .execute() => object
```

#### Parameters

None

#### Returns
`HttpCall` - The HttpCall instance for `icx_getLastBlock` JSON-RPC API request. If `execute()` successfully, it returns a block `object`.

#### Example
```javascript
// Returns block information
const block = await iconService.getLastBlock().execute();
```


### getScoreApi()

Get the SCORE API list.

```javascript
.getScoreApi(address: string) => HttpCall // .execute() => array
```

#### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| address | `string` | a SCORE address. |

#### Returns
`HttpCall` - The HttpCall instance for `icx_getScoreApi` JSON-RPC API request. If `execute()` successfully, it returns a `ScoreApiList` instance, the API list of SCORE address. 

`ScoreApiList` provides two instance methods, `getList()` and `getMethod()`.

* getList() - Returns `array` of API list.

* getMethod(*method: `string`*) - Returns `object` of method information.


#### Example
```javascript
// Returns the SCORE API list
const apiList = await iconService.getScoreApi('cx0000000000000000000000000000000000000001').execute();

// [ { type: 'function', name: 'acceptScore', inputs: [ [Object] ] outputs: [] }, ··· { type: 'eventlog', name: 'UpdateServiceConfigLog', inputs: [ [Object] ] }]
console.log(apiList.getList());

// { type: 'function', name: 'getStepCosts', inputs: [], outputs: [ { type: 'dict' } ], readonly: '0x1' }
console.log(apiList.getMethod('getStepCosts'));
```

### getTransaction()

Get the transaction information.

```javascript
.getTransaction(hash: string) => HttpCall // .execute() => object
```

#### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| hash | `string` | a transaction hash. |

#### Returns
`HttpCall` - The HttpCall instance for `icx_getTransactionByHash` JSON-RPC API request. If `execute()` successfully, it returns a transaction `object`. For details of returned object, see [here][icx_getTransactionByHash].

#### Example
```javascript
// Returns the transaction object.
const txObject = await iconService.getTransaction('0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238').execute();
```

### getTransactionResult()

Get the result of transaction by transaction hash.

```javascript
.getTransactionResult(hash: string) => HttpCall // .execute() => object
```

#### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| hash | `string` | a transaction hash. |

#### Returns
`HttpCall` - The HttpCall instance for `icx_getTransactionResult` JSON-RPC API request. If `execute()` successfully, it returns a transaction result `object`. For details of returned object, see [here][icx_getTransactionResult].

#### Example
```javascript
// Returns the transaction result object.
const txObject = await iconService.getTransactionResult('0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238').execute();
```

### sendTransaction()

Send a transaction that changes the states of address.

```javascript
.sendTransaction(signedTransaction: SignedTransaction) => HttpCall // .execute() => string
```

#### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| signedTransaction | `SignedTransaction` | an instance of [SignedTransaction] class. |

#### Returns
`HttpCall` - The HttpCall instance for `icx_sendTransaction` JSON-RPC API request. If `execute()` successfully, it returns a `string` value of transaction hash.

#### Example
```javascript
// Returns the tx hash of transaction.
const txHash = await iconService.sendTransaction(signedTransaction).execute();
```

### call()

Calls external function of SCORE.

```javascript
.call(call: Call) => HttpCall // .execute() => any
```

#### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| call | `Call` | an instance of Call class builded by [CallBuilder]. |

#### Returns
`HttpCall` - The HttpCall instance for `icx_call` JSON-RPC API request. If `execute()` successfully, it returns a `any` type of value returned by the executed SCORE function.

#### Example
```javascript
// Returns the value returned by the executed SCORE function.
const result = await iconService.call(call).execute();
```

## IconService.IconWallet (Wallet)

`IconWallet` is a class which provides EOA functions. It enables you to create, load, and store `Wallet` object.

### Constructor

Creates an instance of `Wallet` class. To create wallet, please use `create()` static function instead of instantiating this class directly.

```javascript
new Wallet(privKey: string, pubKey: string)
```
#### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| privKey | `string` | a private key. |
| pubKey | `string` | a public key. |

### static create()

Creates an instance of `Wallet` class.

```javascript
IconWallet.create() => Wallet
```
#### Parameters

None

#### Returns
`Wallet` - Wallet instance. It contains a public key and a private key randomly generated by `create()` function.

#### Example
```javascript
// Creates an instance of Wallet.
const wallet = IconWallet.create();
```

### static loadPrivateKey()

Import existing wallet using private key.

```javascript
IconWallet.loadPrivateKey(privKey: string) => Wallet
```
#### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| privKey | `string` | a private key. |

#### Returns
`Wallet` - a Wallet instance.

#### Example
```javascript
// Load wallet object
const wallet = IconWallet.loadPrivateKey('2ab···e4c');
```

### static loadKeystore()

Import existing wallet using keystore object.

```javascript
IconWallet.loadKeystore(keystore: object|string, password: string, nonStrict?: boolean) => Wallet
```
#### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| keystore | `object`, `string` | the keystore object (or stringified object.) |
| password | `string` | the password of keystore object. |
| nonStrict (optional) | `boolean` | set whether checking keystore file case-insensitive or not. _(affects when `keystore` param is string.)_ |

#### Returns
`Wallet` - a Wallet instance.

#### Example
```javascript
const testKeystore = { "version": 3, "id": "41fc1ddb-4faf-4c88-b494-8fe82a4bab63", "address": "hxd008c05cbc0e689f04a5bb729a66b42377a9a497", "crypto": { "ciphertext": "c4046f5a735403a963110d24f39120a102ad7bc462bf2a14ae334ba4a8c485f6", "cipherparams": { "iv": "441b5a5de3dd33de6f7838b6075702d2" }, "cipher": "aes-128-ctr", "kdf": "scrypt", "kdfparams": { "dklen": 32, "salt": "39d45ffead82d554e35a55efcc7a1f64afe73e9a8ab6b750d959f904e32294ba", "n": 16384, "r": 8, "p": 1 }, "mac": "9bca1f2e8750efb27b7357e1a6a727c596cb812f7a4c45792494a8b0890774d7" }, "coinType": "icx" }
const testPassword = 'qwer1234!'

// Load wallet object
const wallet = IconWallet.loadKeystore(testKeystore, testPassword)
```

### store()

Get keystore object of an instance of a `Wallet` class.

```javascript
.store(password: string, opts?: object) => object
```
#### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| password | `string` | a new password for encryption. |
| opts (optional) | `object` | the custom options for encryption. |

#### Returns
`object` - a keystore object.

#### Example
```javascript
const wallet = IconWallet.create()
// Get keystore object of an instance of a `Wallet` class.
const keystore = wallet.store("qwer1234!")
```

### sign()

Generate signature string by signing transaction object.

```javascript
.sign(data: Buffer) => string
```
#### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| data | `Buffer` | the serialized transaction object. |

#### Returns
`string` - a signature string.

#### Example
```javascript
const wallet = IconWallet.create()
// Get keystore object of an instance of a `Wallet` class.
const signature = wallet.sign('ba4···f64')
```

### getPrivateKey()

Get a private key of `Wallet` instance.

```javascript
.getPrivateKey() => string
```
#### Parameters

None

#### Returns
`string` - a private key.

#### Example
```javascript
const wallet = IconWallet.create()
// Get private key of `Wallet` instance.
const pk = wallet.getPrivateKey()
```

### getPublicKey()

Get a public key of `Wallet` instance.

```javascript
.getPublicKey() => string
```
#### Parameters

None

#### Returns
`string` - a public key.

#### Example
```javascript
const wallet = IconWallet.create()
// Get public key of `Wallet` instance.
const pk = wallet.getPublicKey()
```

### getAddress()

Get an address of `Wallet` instance.

```javascript
.getAddress() => string
```
#### Parameters

None

#### Returns
`string` - an EOA address.

#### Example
```javascript
const wallet = IconWallet.create()
// Get address of `Wallet` instance.
const pk = wallet.getAddress()
```

## IconService.IconBuilder

`IconBuilder` is an object containing builder class for transaction object. Builder class enables you to make transaction object easily. There are 5 types of builder class as follows:

| Module       | Description |
| ------------- | ----------- |
| [IcxTransactionBuilder] | Builder class for `IcxTransaction` instance, which is for sending ICX.  |
| [MessageTransactionBuilder] | Builder class for `MessageTransaction` instance, which is for sending message data. Extends `IcxTransactionBuilder` class. |
| [DeployTransactionBuilder] | Builder class for `DeployTransaction` instance, which is for deploying SCORE. Extends `IcxTransactionBuilder` class.  |
| [CallTransactionBuilder] | Builder class for `CallTransaction` instance, which is for invoking a *state-transition* function of SCORE. Extends `IcxTransactionBuilder` class. |
| [CallBuilder] | Builder class for `Call` instance, which is for invoking a *read-only* function of SCORE. |

## IconService.IconBuilder.IcxTransactionBuilder

Builder class for `IcxTransaction` instance. `IcxTransaction` is an object representing a transaction object used for sending ICX. The parameter details are as follows:

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

### Constructor

Creates an instance of `IcxTransactionBuilder` class.

```javascript
new IcxTransactionBuilder()
```
#### Parameters

None

### to()

Setter method of 'to' property.

```javascript
.to(to: string) => IcxTransactionBuilder
```
#### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| to | `string` | an EOA or SCORE address. |

#### Returns
`IcxTransactionBuilder` - Returns an instance of itself

#### Example
```javascript
// Set `to` property.
const txObj = new IcxTransactionBuilder()
    .to('hx87a90bfe8ed49e1a25184ce77fa0d9c4b0484d6a')
```

### from()

Setter method of 'from' property.

```javascript
.from(from: string) => IcxTransactionBuilder
```
#### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| from | `string` | an EOA address. |

#### Returns
`IcxTransactionBuilder` - Returns an instance of itself

#### Example
```javascript
// Set `from` property.
const txObj = new IcxTransactionBuilder()
    .from('hx46293d558d3bd489c3715e7e3648de0e35086bfd')
```

### value()

Setter method of 'value' property.

```javascript
.value(value: string|BigNumber|number) => IcxTransactionBuilder
```
#### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| value | `string`, `BigNumber`, `number` | the sending amount of ICX in loop unit. |

#### Returns
`IcxTransactionBuilder` - Returns an instance of itself

#### Example
```javascript
// Set `value` property.
const txObj = new IcxTransactionBuilder()
    .value(IconAmount.of(1, IconAmount.Unit.ICX).toLoop())
```

### stepLimit()

Setter method of 'stepLimit' property.

```javascript
.stepLimit(stepLimit: string|BigNumber|number) => IcxTransactionBuilder
```
#### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| stepLimit | `string`, `BigNumber`, `number` | the amount of step limit. |

#### Returns
`IcxTransactionBuilder` - Returns an instance of itself

#### Example
```javascript
// Set `value` property.
const txObj = new IcxTransactionBuilder()
    .stepLimit(IconConverter.toBigNumber(100000))
```

### nid()

Setter method of 'nid' property.

```javascript
.nid(nid: string|BigNumber|number) => IcxTransactionBuilder
```
#### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| nid | `string`, `BigNumber`, `number` | a network ID. |

#### Returns
`IcxTransactionBuilder` - Returns an instance of itself

#### Example
```javascript
// Set `nid` property.
const txObj = new IcxTransactionBuilder()
    .nid(IconConverter.toBigNumber(1))
```

### nonce()

Setter method of 'nonce' property.

```javascript
.nonce(nonce: string|BigNumber|number) => IcxTransactionBuilder
```
#### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| nonce | `string`, `BigNumber`, `number` | a nonce value. |

#### Returns
`IcxTransactionBuilder` - Returns an instance of itself

#### Example
```javascript
// Set `nonce` property.
const txObj = new IcxTransactionBuilder()
    .nonce(IconConverter.toBigNumber(1))
```

### version()

Setter method of 'version' property.

```javascript
.version(version: string|BigNumber|number) => IcxTransactionBuilder
```
#### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| version | `string`, `BigNumber`, `number` | the version value. |

#### Returns
`IcxTransactionBuilder` - Returns an instance of itself

#### Example
```javascript
// Set `version` property.
const txObj = new IcxTransactionBuilder()
    .version(IconConverter.toBigNumber(3))
```

### timestamp()

Setter method of 'timestamp' property.

```javascript
.timestamp(version: string|BigNumber|number) => IcxTransactionBuilder
```
#### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| timestamp | `string`, `BigNumber`, `number` | timestamp value. (microsecond) |

#### Returns
`IcxTransactionBuilder` - Returns an instance of itself

#### Example
```javascript
// Set `timestamp` property.
const txObj = new IcxTransactionBuilder()
    .timestamp(1544596599371000)
```

### build()

Returns an `IcxTransaction` instance which contains parameter you set.

```javascript
.build() => IcxTransaction
```
#### Parameters

None

#### Returns
`IcxTransaction` - Returns an `IcxTransaction` instance.

#### Example
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

## IconService.IconBuilder.MessageTransactionBuilder

Builder class for `MessageTransaction` instance. `MessageTransaction` is an object representing a transaction object used for sending message data. It extends `IcxTransaction` class, so instance parameters and methods of builder class are mostly identical to `IcxTransaction` class, except for the following:

| Parameter       | Description |
| ------------- | ----------- |
| `data` | A message data. Data type of the data should be **lowercase hex string prefixed with '0x'.** |
| `dataType` | Data type of `data`. Fixed string `message` is in value. |

For details of extended parameters and methods, see [IcxTransactionBuilder] section.

### Constructor

Creates an instance of `MessageTransactionBuilder` class.

```javascript
new MessageTransactionBuilder()
```
#### Parameters

None

### data()

Setter method of 'data' property.

```javascript
.data(data: string) => MessageTransactionBuilder
```
#### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| data | `string` | the data (hex string) to send. |

#### Returns
`MessageTransactionBuilder` - Returns an instance of itself

#### Example
```javascript
// Set `data` property.
const txObj = new MessageTransactionBuilder()
    .data(IconConverter.fromUtf8('Hello'))
```

### build()

Returns an `MessageTransaction` instance which contains parameter you set.

```javascript
.build() => MessageTransaction
```
#### Parameters

None

#### Returns
`MessageTransaction` - Returns an `MessageTransaction` instance.

#### Example
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

## IconService.IconBuilder.DeployTransactionBuilder

Builder class for `DeployTransaction` instance. `DeployTransaction` is an object representing a transaction object used for deploying SCORE. It extends `IcxTransaction` class, so instance parameters and methods of builder class are mostly identical to `IcxTransaction` class, except for the following:

| Parameter       | Description |
| ------------- | ----------- |
| `data` | A deploy object data. It contains 3 parameters: 1) `contentType` - Mime-type of the content. 2) `content` - Compressed SCORE data. 3) `params` (optional) - Function parameters delivered to on_install() or on_update() |
| `dataType` | Data type of `data`. Fixed string `deploy` is in value. |

For details of extended parameters and methods, see [IcxTransactionBuilder] section.

### Constructor

Creates an instance of `DeployTransactionBuilder` class.

```javascript
new DeployTransactionBuilder()
```
#### Parameters

None

### contentType()

Setter method of 'contentType' property in 'data'.

```javascript
.contentType(contentType: string) => DeployTransactionBuilder
```
#### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| contentType | `string` | the content type of content |

#### Returns
`DeployTransactionBuilder` - Returns an instance of itself

#### Example
```javascript
// Set `contentType` property.
const txObj = new DeployTransactionBuilder()
    .contentType('application/zip')
```

### content()

Setter method of 'content' property in 'data'.

```javascript
.content(content: string) => DeployTransactionBuilder
```
#### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| content | `string` | the content to deploy. |

#### Returns
`DeployTransactionBuilder` - Returns an instance of itself

#### Example
```javascript
// Set `content` property.
const txObj = new DeployTransactionBuilder()
    .content('0x504b03040a0000000000d3a68e4d000000000000000...')
```

### params()

Setter method of 'params' property in 'data'.

```javascript
.params(params: object) => DeployTransactionBuilder
```
#### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| params | `object` | Function parameters delivered to on_install() or on_update(). |

#### Returns
`DeployTransactionBuilder` - Returns an instance of itself

#### Example
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

### build()

Returns an `DeployTransaction` instance which contains parameter you set.

```javascript
.build() => DeployTransaction
```
#### Parameters

None

#### Returns
`DeployTransaction` - Returns an `DeployTransaction` instance.

#### Example
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


## IconService.IconBuilder.CallTransactionBuilder

Builder class for `CallTransaction` instance. `CallTransaction` is an object representing a transaction object used for invoking a *state-transition* function of SCORE. It extends `IcxTransaction` class, so instance parameters and methods are mostly identical to `IcxTransaction` class, except for the following:

| Parameter       | Description |
| ------------- | ----------- |
| `data` | An object data for calling method. It contains 2 parameters: 1) `method` - The method name of SCORE API. 2) `params` (optional) - The input params for method |
| `dataType` | Data type of `data`. Fixed string `call` is in value. |

For details of extended parameters and methods, see [IcxTransactionBuilder] section.

### Constructor

Creates an instance of `CallTransactionBuilder` class.

```javascript
new CallTransactionBuilder()
```
#### Parameters

None



### method()

Setter method of 'method' property in 'data'.

```javascript
.method(method: string) => CallTransactionBuilder
```
#### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| method | `string` | the method name of SCORE API. |

#### Returns
`CallTransactionBuilder` - Returns an instance of itself

#### Example
```javascript
// Set `method` property.
const txObj = new CallTransactionBuilder()
    .method('transfer')
```


### params()

Setter method of 'params' property in 'data'.

```javascript
.params(params: object) => CallTransactionBuilder
```
#### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| params | `object` | the input params for method. |

#### Returns
`CallTransactionBuilder` - Returns an instance of itself

#### Example
```javascript
// Set `params` property.
const txObj = new CallTransactionBuilder()
    .params({
        _to: 'hxd008c05cbc0e689f04a5bb729a66b42377a9a497',
        _value: IconConverter.toHex(IconAmount.of(1, IconAmount.Unit.ICX).toLoop()),
    })
```


### build()

Returns an `CallTransaction` instance which contains parameter you set.

```javascript
.build() => CallTransaction
```
#### Parameters

None

#### Returns
`CallTransaction` - Returns an `CallTransaction` instance.

#### Example
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


## IconService.IconBuilder.CallBuilder

Builder class for `Call` instance. `Call` is an object representing a transaction object used for invoking a *read-only* function of SCORE. The parameter details are as follows:

| Parameter       | Description |
| ------------- | ----------- |
| `to` | a SCORE address to execute the call. |
| `data` | an object data for calling method. It contains 2 parameters: 1) `method` - The method name of SCORE API. 2) `params` (optional) - The input params for method |
| `dataType` | Data type of `data`. Fixed string `call` is in value. |

### Constructor

Creates an instance of `CallBuilder` class.

```javascript
new CallBuilder()
```
#### Parameters

None

### to()

Setter method of 'to' property.

```javascript
.to(to: string) => CallBuilder
```
#### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| to | `string` | a SCORE address. |

#### Returns
`CallBuilder` - Returns an instance of itself

#### Example
```javascript
// Set `to` property.
const txObj = new CallBuilder()
    .to('cxc248ee72f58f7ec0e9a382379d67399f45b596c7')
```


### method()

Setter method of 'method' property in 'data'.

```javascript
.method(method: string) => CallBuilder
```
#### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| method | `string` | the method name of SCORE API. |

#### Returns
`CallBuilder` - Returns an instance of itself

#### Example
```javascript
// Set `method` property.
const txObj = new CallBuilder()
    .method('balanceOf')
```


### params()

Setter method of 'params' property in 'data'.

```javascript
.params(params: object) => CallBuilder
```
#### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| params | `object` | the input params for method. |

#### Returns
`CallBuilder` - Returns an instance of itself

#### Example
```javascript
// Set `params` property.
const txObj = new CallBuilder()
    .params({ 
        _owner: 'hx87a90bfe8ed49e1a25184ce77fa0d9c4b0484d6a' 
    })
```


### build()

Returns an `Call` instance which contains parameter you set.

```javascript
.build() => Call
```
#### Parameters

None

#### Returns
`Call` - Returns an `Call` instance.

#### Example
```javascript
// Build `Call` instance.
const txObj = new CallBuilder()
    .to('cxc248ee72f58f7ec0e9a382379d67399f45b596c7')
    .method('balanceOf')
    .params({ _owner: 'hx87a90bfe8ed49e1a25184ce77fa0d9c4b0484d6a' })
    .build()
```


## IconService.SignedTransaction

`SignedTransaction` is a class for signing transaction object. It enables you to make signature, and signed transaction object by calling instance methods. Also, by passing `SignedTransaction` instance to [sendTransaction()], it will automatically generate transaction object including signature, and send to ICON node.

### Constructor

Creates an instance of `SignedTransaction` class.

```javascript
new SignedTransaction(transaction: IcxTransaction|MessageTransaction|CallTransaction|DeployTransaction, wallet: Wallet)
```

#### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| transaction | `IcxTransaction`, `MessageTransaction`, `CallTransaction`, `DeployTransaction` | a transaction object. |
| wallet | `Wallet` | wallet instance used for signing. |

### getSignature()

Get a signature string.

```javascript
.getSignature() => string
```

#### Parameters

None

#### Returns

`string` - a signature string.

#### Example
```javascript
/* Returns the signature */
const signature = new SignedTransaction(icxTransaction, wallet).getSignature() 
// 'YV3eNgVjLFwXS65Bk...+lC90KgRBh7FtwE='
```

### getProperties()

Get a raw signed transaction object.

```javascript
.getProperties() => object
```

#### Parameters

None

#### Returns

`object` - the raw signed transaction object.

#### Example
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


### getRawTransaction()

Get a raw transaction object of `transaction` property.

```javascript
.getRawTransaction() => object
```

#### Parameters

None

#### Returns

`object` - the raw transaction object of `transaction` property.

#### Example
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


## IconService.HttpProvider

`HttpProvider` is a class representing HTTP-based provider. It is commonly used for setting provider url of `IconService` instance. For details of network and node url, see [ICON Networks] document.


### Constructor

Creates an instance of `HttpProvider` class.

```javascript
new HttpProvider(url: string)
```

#### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| url | `string` | ICON node url |


## IconService.IconAmount

`IconAmount` is a class representing BigNumber value and unit data. It also provides unit conversion static functions. It enables you to manage different types of numeric data easily.

(`IconAmount` contains static class property called `Unit`, which has constant `number` value of different types of unit digit. `IconAmount.Unit.LOOP` is `0`, and `IconAmount.Unit.ICX` is `18`.)

### Constructor

Creates an instance of `IconAmount` class.

```javascript
new IconAmount(value: string|BigNumber|number, digit: string|BigNumber|number)
```

#### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| value | `string`, `BigNumber`, `number` | the value of amount. |
| digit | `string`, `BigNumber`, `number` | the digit of unit. |

> Note: According to official document of [BigNumber.js](https://mikemcl.github.io/bignumber.js/#bignumber), it is recommended to create BigNumbers from `string` values rather than `number` values to avoid a potential loss of precision.

### static of()

Creates an instance of `IconAmount` class.

```javascript
IconAmount.of(value: string|BigNumber|number, digit: string|BigNumber|number) => IconAmount
```
#### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| value | `string`, `BigNumber`, `number` | the value of amount. |
| digit | `string`, `BigNumber`, `number` | the digit of unit. |

> Note: According to official document of [BigNumber.js](https://mikemcl.github.io/bignumber.js/#bignumber), it is recommended to create BigNumbers from `string` values rather than `number` values to avoid a potential loss of precision.

#### Returns
`IconAmount` - IconAmount instance.

#### Example
```javascript
// Returns IconAmount instance
const iconAmount = IconAmount.of('2', IconAmount.Unit.ICX);
```


### toString()

Converts value property into string

```javascript
.toString() => string
```
#### Parameters

None

#### Returns
`string` - The stringified value property of IconAmount instance.

#### Example
```javascript
// Returns stringified value property
const value = IconAmount.of('2', IconAmount.Unit.ICX).toString();
```


### getDigit()

Get digit property.

```javascript
.getDigit() => number
```
#### Parameters

None

#### Returns
`number` - The digit property of IconAmount instance.

#### Example
```javascript
// Returns digit property
const digit = IconAmount.of('2', IconAmount.Unit.ICX).getDigit();
```


### toLoop()

Get value property converted into loop unit.

```javascript
.toLoop() => BigNumber
```
#### Parameters

None

#### Returns
`BigNumber` - The value property converted into loop unit.

#### Example
```javascript
// Returns value property converted into loop unit.
const value = IconAmount.of('2', IconAmount.Unit.ICX).toLoop();
```


### convertUnit()

Converts value property into custom digit

```javascript
.convertUnit(digit: string|BigNumber|number) => IconAmount
```
#### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| digit | `string`, `BigNumber`, `number` | the digit of unit. |

#### Returns
`IconAmount` - The IconAmount instance converted into custom digit.

#### Example
```javascript
// Returns IconAmount instance converted into custom digit.
const value = IconAmount.of('2', IconAmount.Unit.ICX).convertUnit(IconAmount.Unit.LOOP);
```

## IconService.IconConverter

`IconConverter` is a utility module which contains conversion functions.

### static fromUtf8()

Converts UTF-8 text to hex string with '0x' prefix.

```javascript
IconConverter.fromUtf8(value: string) => string
```
#### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| value | `string` | an UTF-8 text string. |

#### Returns
`string` - a hex string with '0x' prefix

#### Example
```javascript
// Returns hex string
const value = IconConverter.fromUtf8('hello')
```


### static toNumber()

Converts string, hex string or BigNumber value to number.

```javascript
IconConverter.toNumber(value: string|BigNumber) => number
```
#### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| value | `string`, `BigNumber` | a string, hex string or BigNumber type value |

#### Returns
`number` - a value converted to number type.

#### Example
```javascript
// Returns number value
const value = IconConverter.toNumber('123')
```

### static toBigNumber()

Converts string, hex string or number value to BigNumber.

```javascript
IconConverter.toBigNumber(value: string|number) => BigNumber

```
#### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| value | `string`, `number` | a string, hex string or number type value |

#### Returns
`BigNumber` - a value converted to BigNumber type.

#### Example
```javascript
// Returns BigNumber value
const value = IconConverter.toBigNumber('123')
```

### static toHex()

Converts string, number or BigNumber value to hex string.

```javascript
IconConverter.toHex(value: string|number|BigNumber) => string

```
#### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| value | `string`, `number`, `BigNumber` | a string, number or BigNumber type value |

#### Returns
`string` - a value converted to hex string with '0x' prefix.

#### Example
```javascript
// Returns hex string
const value = IconConverter.toHex('123')
```

### static toRawTransaction()

Converts transaction object to raw transaction object.

```javascript
IconConverter.toRawTransaction(transaction: IcxTransaction|MessageTransaction|CallTransaction|DeployTransaction) => object

```
#### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| transaction | `IcxTransaction`, `MessageTransaction`, `CallTransaction`, `DeployTransaction` | a transaction object |

#### Returns
`object` - a raw transaction object.

#### Example
```javascript
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
// Returns raw transaction object
const rawTxObj = IconConverter.toRawTransaction(txObj)
```


## IconService.IconHexadecimal

`IconHexadecimal` is a utility module which contains functions related to hex prefix.

### static is0xPrefix()

Check whether string starts with '0x' prefix.

```javascript
IconHexadecimal.is0xPrefix(str: string) => boolean
```
#### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| str | `string` | a string |

#### Returns
`boolean` - returns true if string starts with '0x' prefix.

#### Example
```javascript
// Returns true if string starts with '0x' prefix
const value = IconHexadecimal.is0xPrefix('0x61')
```

### static isHxPrefix()

Check whether string starts with 'hx' prefix.

```javascript
IconHexadecimal.isHxPrefix(str: string) => boolean
```
#### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| str | `string` | a string |

#### Returns
`boolean` - returns true if string starts with 'hx' prefix.

#### Example
```javascript
// Returns true if string starts with 'hx' prefix
const value = IconHexadecimal.isHxPrefix('hx902ecb51c109183ace539f247b4ea1347fbf23b5')
```

### static isCxPrefix()

Check whether string starts with 'cx' prefix.

```javascript
IconHexadecimal.isCxPrefix(str: string) => boolean
```
#### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| str | `string` | a string |

#### Returns
`boolean` - returns true if string starts with 'cx' prefix.

#### Example
```javascript
// Returns true if string starts with 'cx' prefix
const value = IconHexadecimal.isCxPrefix('cxc248ee72f58f7ec0e9a382379d67399f45b596c7')
```

### static add0xPrefix()

Add '0x' prefix to string.

```javascript
IconHexadecimal.add0xPrefix(str: string) => string
```
#### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| str | `string` | a string |

#### Returns
`string` - a string with '0x' prefix.

#### Example
```javascript
// Returns a string with '0x' prefix.
const value = IconHexadecimal.add0xPrefix('1234')
```

### static addHxPrefix()

Add 'hx' prefix to string.

```javascript
IconHexadecimal.addHxPrefix(str: string) => string
```
#### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| str | `string` | a string |

#### Returns
`string` - a string with 'hx' prefix.

#### Example
```javascript
// Returns a string with 'hx' prefix.
const value = IconHexadecimal.addHxPrefix('902ecb51c109183ace539f247b4ea1347fbf23b5')
```

### static addCxPrefix()

Add 'cx' prefix to string.

```javascript
IconHexadecimal.addCxPrefix(str: string) => string
```
#### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| str | `string` | a string |

#### Returns
`string` - a string with 'cx' prefix.

#### Example
```javascript
// Returns a string with 'cx' prefix.
const value = IconHexadecimal.addCxPrefix('c248ee72f58f7ec0e9a382379d67399f45b596c7')
```

### static remove0xPrefix()

Remove '0x' prefix from string.

```javascript
IconHexadecimal.remove0xPrefix(str: string) => string
```
#### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| str | `string` | a string |

#### Returns
`string` - a string without '0x' prefix.

#### Example
```javascript
// Returns a string without '0x' prefix.
const value = IconHexadecimal.remove0xPrefix('0x61')
```

### static removeHxPrefix()

Remove 'hx' prefix from string.

```javascript
IconHexadecimal.removeHxPrefix(str: string) => string
```
#### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| str | `string` | a string |

#### Returns
`string` - a string without 'hx' prefix.

#### Example
```javascript
// Returns a string without 'hx' prefix.
const value = IconHexadecimal.removeHxPrefix('hx902ecb51c109183ace539f247b4ea1347fbf23b5')
```

### static removeCxPrefix()

Remove 'cx' prefix from string.

```javascript
IconHexadecimal.removeCxPrefix(str: string) => string
```
#### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| str | `string` | a string |

#### Returns
`string` - a string without 'cx' prefix.

#### Example
```javascript
// Returns a string without 'cx' prefix.
const value = IconHexadecimal.removeCxPrefix('cxc248ee72f58f7ec0e9a382379d67399f45b596c7')
```

## IconService.IconValidator

`IconValidator` is a utility module which contains validation functions.

### static isPrivateKey()

Check if input value is a private key type string.

```javascript
IconValidator.isPrivateKey(privKey: any) => boolean
```
#### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| privKey | `any` | an input value |

#### Returns
`boolean` - Returns true if the input value is a private key type string.

#### Example
```javascript
// Returns true if the input value is a private key type string.
const isPrivateKey = IconValidator.isPrivateKey('7abca1...20a9f1')
```

### static isPublicKey()

Check if input value is a public key type string.

```javascript
IconValidator.isPublicKey(pubKey: any) => boolean
```
#### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| public | `any` | an input value |

#### Returns
`boolean` - Returns true if the input value is a public key type string.

#### Example
```javascript
// Returns true if the input value is a public key type string.
const isPublicKey = IconValidator.isPublicKey('7abca1...20a9f1')
```

### static isEoaAddress()

Check if input value is a EOA address type string.

```javascript
IconValidator.isEoaAddress(address: any) => boolean
```
#### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| address | `any` | an input value |

#### Returns
`boolean` - Returns true if the input value is a EOA address type string.

#### Example
```javascript
// Returns true if the input value is a EOA address type string.
const isEoaAddress = IconValidator.isEoaAddress('hxca12a...209f1')
```

### static isScoreAddress()

Check if input value is a SCORE address type string.

```javascript
IconValidator.isScoreAddress(address: any) => boolean
```
#### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| address | `any` | a input value |

#### Returns
`boolean` - Returns true if the input value is a SCORE address type string.

#### Example
```javascript
// Returns true if the input value is a SCORE address type string.
const isScoreAddress = IconValidator.isScoreAddress('cx1b32a...99f01')
```

### static isAddress()

Check if input value is a EOA or SCORE address type string.

```javascript
IconValidator.isAddress(address: any) => boolean
```
#### Parameters

| Parameter       | Type | Description |
| ------------- | ----------- | ----------- |
| address | `any` | an input value |

#### Returns
`boolean` - Returns true if the input value is a EOA or SCORE address type string.

#### Example
```javascript
// Returns true if the input value is a EOA or SCORE address type string.
const isAddress = IconValidator.isAddress('cx1b32a...99f01')
```

## Error cases

There are 6 types of error cases. Details are as below:

| Error code       | Description |
| ------------- | ----------- |
| `DATA ERROR` | Exception class related to data type. |
| `FORMAT ERROR` | Exception class related to data format. |
| `WALLET ERROR` | Exception class related to wallet errors.   |
| `RPC ERROR` | Exception class related to network errors. |
| `SCORE ERROR` | Exception class related to SCORE call error. |
| `NETWORK ERROR` | Exception class related to network errors. |

## References

- [ICON JSON-RPC API v3](https://icondev.readme.io/docs/json-rpc-specification) 
- [IRC2 Specification](https://github.com/icon-project/IIPs/blob/master/IIPS/iip-2.md)


<!-- 
Link: 
-->

[getBlockByHeight()]: #getblockbyheight
[getBlockByHash()]: #getblockbyhash
[getLastBlock()]: #getlastblock
[sendTransaction()]: #sendtransaction

[icx_getBlockByHeight]: https://icondev.readme.io/docs/json-rpc-specification#section-icx_getblockbyheight
[icx_getBlockByHash]: https://icondev.readme.io/docs/json-rpc-specification#section-icx_getblockbyhash
[icx_getLastBlock]: https://icondev.readme.io/docs/json-rpc-specification#section-icx_getlastblock
[icx_getScoreApi]: https://icondev.readme.io/docs/json-rpc-specification#section-icx_getscoreapi
[icx_getTransactionByHash]: https://icondev.readme.io/docs/json-rpc-specification#section-icx_gettransactionbyhash
[icx_getTransactionResult]: https://icondev.readme.io/docs/json-rpc-specification#section-icx_gettransactionresult
[ICON Networks]: https://icondev.readme.io/docs/icon-networks

[IconService]: #iconservice
[IconService.IconWallet]: #iconserviceiconwallet-wallet
[IconWallet]: #iconserviceiconwallet-wallet
[IconService.IconBuilder]: #iconserviceiconbuilder
[IconBuilder]: #iconserviceiconbuilder
[IcxTransactionBuilder]: #iconserviceiconbuildericxtransactionbuilder
[MessageTransactionBuilder]: #iconserviceiconbuildermessagetransactionbuilder
[DeployTransactionBuilder]: #iconserviceiconbuilderdeploytransactionbuilder
[CallTransactionBuilder]: #iconserviceiconbuildercalltransactionbuilder
[CallBuilder]: #iconserviceiconbuildercallbuilder
[IconService.SignedTransaction]: #iconservicesignedtransaction
[SignedTransaction]: #iconservicesignedtransaction
[IconService.HttpProvider]: #iconservicehttpprovider
[HttpProvider]: #iconservicehttpprovider
[IconService.IconAmount]: #iconserviceiconamount
[IconAmount]: #iconserviceiconamount
[IconService.IconConverter]: #iconserviceiconconverter
[IconConverter]: #iconserviceiconconverter
[IconService.IconHexadecimal]: #iconserviceiconhexadecimal
[IconHexadecimal]: #iconserviceiconhexadecimal
[IconService.IconValidator]: #iconserviceiconvalidator
[IconValidator]: #iconserviceiconvalidator
[Error Cases]: #error-cases
[References]: #references
