# Changelog

### Version 1.5.3 - December 23, 2023

#### Changes
- Upgrade dependencies to fix vulnerabilities
- Update token deployment example

### Version 1.5.2 - August 30, 2023

#### Changes
- Polyfill websocket for nodejs
- Fix the monitor notification handling

### Version 1.5.1 - July 25, 2023([NPM](https://www.npmjs.com/package/icon-sdk-js), [CDN](https://cdn.jsdelivr.net/npm/icon-sdk-js@1.5.1))

#### Changes
- Fix validation failure on base tx

### Version 1.5.0 - July 17, 2023([NPM](https://www.npmjs.com/package/icon-sdk-js), [CDN](https://cdn.jsdelivr.net/npm/icon-sdk-js@1.5.0))

#### Changes
- add icx_getNetworkInfo
- upgrade some indirect packages in yarn.lock

### Version 1.4.5 - June 7, 2023([NPM](https://www.npmjs.com/package/icon-sdk-js), [CDN](https://cdn.jsdelivr.net/npm/icon-sdk-js@1.4.5))

#### Changes
- fix Wallet.store

### Version 1.4.4 - May 31, 2023([NPM](https://www.npmjs.com/package/icon-sdk-js), [CDN](https://cdn.jsdelivr.net/npm/icon-sdk-js@1.4.4))

#### Changes
- Fix getBalance, getScoreApi, getScoreStatus(convert height to hex)
- fix generics

### Version 1.4.3 - May 25, 2023([NPM](https://www.npmjs.com/package/icon-sdk-js), [CDN](https://cdn.jsdelivr.net/npm/icon-sdk-js@1.4.3))

#### Changes
- Revert IconService.call()'s return type to `HttpCall<any>`

### Version 1.4.2 - May 24, 2023([NPM](https://www.npmjs.com/package/icon-sdk-js), [CDN](https://cdn.jsdelivr.net/npm/icon-sdk-js@1.4.2))

#### Changes
- Fix lint warnings, add description for getPublicKey()

### Version 1.4.1 - May 2, 2023([NPM](https://www.npmjs.com/package/icon-sdk-js), [CDN](https://cdn.jsdelivr.net/npm/icon-sdk-js@1.4.1))

#### Changes
- Feature progress report 

### Version 1.4.0 - April 11, 2023([NPM](https://www.npmjs.com/package/icon-sdk-js), [CDN](https://cdn.jsdelivr.net/npm/icon-sdk-js@1.4.0))

#### Changes
- Add Monitor APIs
- export modules on root
- fix `toRawTransaction()`

### Version 1.3.0 - Jan 19, 2023 ([NPM](https://www.npmjs.com/package/icon-sdk-js), [CDN](https://cdn.jsdelivr.net/npm/icon-sdk-js@1.3.0))

#### Changes
- Add btp extension APIs
- Update dependencies

### Version 1.2.11 - Dec 09, 2022 ([NPM](https://www.npmjs.com/package/icon-sdk-js), [CDN](https://cdn.jsdelivr.net/npm/icon-sdk-js@1.2.11))

#### Changes
- fix serializing transaction function(objTraverse)

### Version 1.2.7 - Oct 26, 2022 ([NPM](https://www.npmjs.com/package/icon-sdk-js), [CDN](https://cdn.jsdelivr.net/npm/icon-sdk-js@1.2.7))

#### Changes
- Upgrade node version


### Version 1.2.6 - Sep 20, 2022 ([NPM](https://www.npmjs.com/package/icon-sdk-js), [CDN](https://cdn.jsdelivr.net/npm/icon-sdk-js@1.2.6))

#### Changes
- Add icx_getScoreStatus API

### Version 1.2.5 - Aug 17, 2022 ([NPM](https://www.npmjs.com/package/icon-sdk-js), [CDN](https://cdn.jsdelivr.net/npm/icon-sdk-js@1.2.5))

#### Changes
- Fix HttpClient
  - make request body to object.

### Version 1.2.4 - Aug 16, 2022 ([NPM](https://www.npmjs.com/package/icon-sdk-js), [CDN](https://cdn.jsdelivr.net/npm/icon-sdk-js@1.2.4))

#### Changes
- Replace XHR with fetch

### Version 1.2.1 - May 12, 2022 ([NPM](https://www.npmjs.com/package/icon-sdk-js), [CDN](https://cdn.jsdelivr.net/npm/icon-sdk-js@1.2.1))

#### Changes
- Fix "height" as optional

### Version 1.2.0 - May 12, 2022 ([NPM](https://www.npmjs.com/package/icon-sdk-js), [CDN](https://cdn.jsdelivr.net/npm/icon-sdk-js@1.2.0))

#### Changes
- Add "height" to query APIs
- add badges to readme

### Version 1.1.3 - November 10, 2021 ([NPM](https://www.npmjs.com/package/icon-sdk-js), [CDN](https://cdn.jsdelivr.net/npm/icon-sdk-js@1.1.3))

#### Changes
- Add newly added APIs on ICON2

### Version 1.1.2 - November 3, 2021 ([NPM](https://www.npmjs.com/package/icon-sdk-js), [CDN](https://cdn.jsdelivr.net/npm/icon-sdk-js@1.1.2))

#### Changes
- update base transaction validation function

### Version 1.1.1 - November 1, 2021 ([NPM](https://www.npmjs.com/package/icon-sdk-js), [CDN](https://cdn.jsdelivr.net/npm/icon-sdk-js@1.1.1))

#### Changes
- add debug_getTrace

### Version 1.1.0 - July 1, 2021 ([NPM](https://www.npmjs.com/package/icon-sdk-js), [CDN](https://cdn.jsdelivr.net/npm/icon-sdk-js@1.1.0))

#### Changes
- add npmignore

### Version 1.0.0 - June 29, 2021 ([NPM](https://www.npmjs.com/package/icon-sdk-js), [CDN](https://cdn.jsdelivr.net/gh/icon-project/icon-sdk-js@1.0.0/build/icon-sdk-js.web.min.js))

#### Changes
- Adopt typescript, this version has been deprecated due to built files not included

### Version 0.0.19 - April 15, 2021 ([NPM](https://www.npmjs.com/package/icon-sdk-js), [CDN](https://cdn.jsdelivr.net/gh/icon-project/icon-sdk-js@0.0.19/build/icon-sdk-js.web.min.js))

#### Changes
- Add DepositTransactionBuilder

### Version 0.0.18 - November 21, 2019 ([NPM](https://www.npmjs.com/package/icon-sdk-js), [CDN](https://cdn.jsdelivr.net/gh/icon-project/icon-sdk-js@0.0.18/build/icon-sdk-js.web.min.js))

#### Changes
  - Support JSON-RPC v3 specification (Block, Transaction, TransactionResult)
  - Delete Validator.isTransaction()

### Version 0.0.17 - November 15, 2019 ([NPM](https://www.npmjs.com/package/icon-sdk-js), [CDN](https://cdn.jsdelivr.net/gh/icon-project/icon-sdk-js@0.0.17/build/icon-sdk-js.web.min.js))

#### Changes
  - Fix getBlockByHeight bug returning undefined txHash
  - Fix transaction signing for transactions with empty arrays

### Version 0.0.16 - April 3, 2019 ([NPM](https://www.npmjs.com/package/icon-sdk-js), [CDN](https://cdn.jsdelivr.net/gh/icon-project/icon-sdk-js@0.0.16/build/icon-sdk-js.web.min.js))

#### Changes
  - Handle exception in case of the number that is not an integer in toHex()
  - Accept string only in fromUtf8() and hex string only in toUtf8()
  - Add test cases for message transaction
  
### Version 0.0.15 - April 2, 2019 ([NPM](https://www.npmjs.com/package/icon-sdk-js), [CDN](https://cdn.jsdelivr.net/gh/icon-project/icon-sdk-js@0.0.15/build/icon-sdk-js.web.min.js))

#### Changes
  - Fix bug that getTransaction() always returns the format error

### Version 0.0.14 - March 26, 2019 ([NPM](https://www.npmjs.com/package/icon-sdk-js), [CDN](https://cdn.jsdelivr.net/gh/icon-project/icon-sdk-js@0.0.14/build/icon-sdk-js.web.min.js))

#### Changes
  - Elaborate block checking functions

### Version 0.0.13 - March 22, 2019 ([NPM](https://www.npmjs.com/package/icon-sdk-js), [CDN](https://cdn.jsdelivr.net/gh/icon-project/icon-sdk-js@0.0.13/build/icon-sdk-js.web.min.js))

#### Changes
  - Allow only lower case letter in address and various hex value
  - Add toHexNumber() in IconConverter
  - Refactor formatter for block and validator for signed transaction
  - Add test cases

### Version 0.0.12 - March 12, 2019 ([NPM](https://www.npmjs.com/package/icon-sdk-js), [CDN](https://cdn.jsdelivr.net/gh/icon-project/icon-sdk-js@0.0.12/build/icon-sdk-js.web.min.js))

#### Changes
  - Fix 'coinType' field in the 'Wallet.store' method

### Version 0.0.11 - March 5, 2019 ([NPM](https://www.npmjs.com/package/icon-sdk-js), [CDN](https://cdn.jsdelivr.net/gh/icon-project/icon-sdk-js@0.0.11/build/icon-sdk-js.web.min.js))

#### Changes
  - Add unit of GLOOP to IconAmount
  - Add function of toUtf8() in IconConverter

### Version 0.0.10 - February 15, 2019 ([NPM](https://www.npmjs.com/package/icon-sdk-js), [CDN](https://cdn.jsdelivr.net/gh/icon-project/icon-sdk-js@0.0.10/build/icon-sdk-js.web.min.js))

#### Changes
  - Add exception type for network error
  - Support for searching v2 block

### Version 0.0.9 - February 11, 2019 ([NPM](https://www.npmjs.com/package/icon-sdk-js), [CDN](https://cdn.jsdelivr.net/gh/icon-project/icon-sdk-js@0.0.9/build/icon-sdk-js.web.min.js))

#### Changes
  - Add functions of getBlockByHeight(), getBlockHash() and getLastBlock() in IconService
  - Add test cases related to getting block data
  - Modify `npm run build` and `npm run test` script in package.json

### Version 0.0.8 - January 15, 2019 ([NPM](https://www.npmjs.com/package/icon-sdk-js), [CDN](https://cdn.jsdelivr.net/gh/icon-project/icon-sdk-js@0.0.8/build/icon-sdk-js.web.min.js))

#### Changes
  - Fix module name issue

### Version 0.0.7 - December 21, 2018 ([NPM](https://www.npmjs.com/package/icon-sdk-js), [CDN](https://cdn.jsdelivr.net/gh/icon-project/icon-sdk-js@0.0.7/build/icon-sdk-js.web.min.js))

#### Changes
  - Fix build issue
  - Update icon-sdk-js import path in unit test code

### Version 0.0.6 - December 20, 2018 ([NPM](https://www.npmjs.com/package/icon-sdk-js), [CDN](https://cdn.jsdelivr.net/gh/icon-project/icon-sdk-js@0.0.6/build/icon-sdk-js.web.min.js))

#### API Changes
  - Support Node and React-Native environment
  - Seperate build file (icon-sdk-js.node.min, icon-sdk-js.web.min)
  - Remove synchronous call function
  - Fix string escaping bug in Util.serialize()
  - Update unit test code

### Version 0.0.5 - November 21, 2018 ([NPM](https://www.npmjs.com/package/icon-sdk-js), [CDN](https://cdn.jsdelivr.net/gh/icon-project/icon-sdk-js@0.0.5/build/icon-sdk-js.min.js))

#### API Changes
  - Add coinType property in IconWallet.store() output

### Version 0.0.4 - November 13, 2018 ([NPM](https://www.npmjs.com/package/icon-sdk-js), [CDN](https://cdn.jsdelivr.net/gh/icon-project/icon-sdk-js@0.0.4/build/icon-sdk-js.min.js))

#### API Changes
  - Add function of makeTxHash(rawTransaction) in data/Util
  - Add IconService.IconUtil property
  - Modify `npm run quickstart:rebuild` script to fix destination path when build file is copied to node_modules in quickstart
