# ICON SDK for JavaScript

ICON supports SDK for 3rd party or user services development. You can integrate ICON SDK for your project and utilize ICON’s functionality. Currently, ICON SDK works only in a browser environment. Node.js will be supported soon.


## Installation

### Node.js
```bash
npm install --save icon-sdk-js
```

### CDN

`icon-sdk-js` is available over a CDN.
```html
<script src="https://cdn.jsdelivr.net/gh/icon-project/icon-sdk-js@latest/build/icon-sdk-js.min.js"></script>
```


## Quick start

Quickstart is an example project of Icon SDK JavaScript.
Detail description is written in `readme` file in quickstart directory .


### Rebuild icon-sdk-js and Run quickstart

If you want to rebuild icon-sdk-js library and run quickstart project, run `npm run quickstart:rebuild` command at icon-sdk-js root directory.

```bash
npm run quickstart:rebuild   // open http://localhost:3000/ in browser
```

## IconService

APIs are called through `IconService`.

It can be initialized as follows.

```javascript
// Creates an instance of IconService using the HTTP provider.
const iconService = new IconService(new HttpProvider("https://url"));
```


## Queries

All queries are requested by a `Request` object.

Its requests are executed as **Synchronized** or **Asynchronized**.

Once the request has been executed, the request can not be executed again.

```javascript
// Synchronized request execution
const balance = request.execute(false)

// Asynchronized request execution
const balanceAsync = await reqeust.execute(true)
```

The querying APIs are as follows.

```javascript

// Gets the block by height
const request = iconService.getBlock(1000);

// by hash
const request = iconService.getBlock("0x0000...000");

// by predefined block value
const request = iconService.getBlock('latest');

// Gets a list of the SCORE API
const request = iconService.getScoreApi("cx0000...000");

// Gets the total supply of icx
const request = iconService.getTotalSupply();

// Gets the transaction by hash
const request = iconService.getTransaction("0x0000...000");

// Gets the result of the transaction by hash
const request = iconService.getTransactionResult("0x0000...000");

// Calls a SCORE API just for reading
const callBuilder = new CallBuilder()
const call = callBuilder
    .from(wallet.getAddress())
    .to(scoreAddress)
    .method("balanceOf")
    .params(params)
    .build();

const request = iconService.call(call);
```


## Sending transactions

Calling SCORE APIs to change states is requested as sending a transaction.

Before sending a transaction, the transaction should be signed. It can be done using a `Wallet` object.

**Loading wallets and storing the Keystore**

```javascript
import { Wallet } from 'icon-sdk-js'

// Generates a wallet.
const wallet = Wallet.create();

// Loads a wallet from the private key.
const wallet = Wallet.load("0x0000...000");
```

**Creating transactions**

```javascript

const transactionBuilder = new TransactionBuilder()

// sending icx
const transaction = transactionBuilder
    .nid(networkId)
    .from(wallet.getAddress())
    .to(scoreAddress)
    .value(new BigNumber("150000000"))
    .stepLimit(new BigNumber("1000000"))
    .nonce(new BigNumber("1000000"))
    .build();

// deploy
const transaction = transactionBuilder
    .nid(networkId)
    .from(wallet.getAddress())
    .to(scoreAddress)
    .stepLimit(new BigNumber("5000000"))
    .nonce(new BigNumber("1000000"))
    .deploy("application/zip", content)
    .params(params)
    .build();

// call
const transaction = transactionBuilder
    .nid(networkId)
    .from(wallet.getAddress())
    .to(scoreAddress)
    .value(new BigNumber("150000000"))
    .stepLimit(new BigNumber("1000000"))
    .nonce(new BigNumber("1000000"))
    .call("transfer")
    .params(params)
    .build();

// message
const transaction = transactionBuilder
    .nid(networkId)
    .from(wallet.getAddress())
    .to(scoreAddress)
    .value(new BigNumber("150000000"))
    .stepLimit(new BigNumber("1000000"))
    .nonce(new BigNumber("1000000"))
    .message(message)
    .build();
```

`SignedTransaction` object signs a transaction using the wallet.

And the request is executed as **Synchronized** or **Asynchronized** like a querying request.

Once the request has been executed, the request can not be executed again.

```javascript
const signedTransaction = new SignedTransaction(transaction, wallet);

const request = iconService.sendTransaction(signedTransaction);

// Synchronized request execution
const txHash = request.execute(false)

// Asynchronized request execution
const txHash = await reqeust.execute(true)
```