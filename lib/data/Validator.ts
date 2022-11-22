/*
 * Copyright 2021 ICON Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable no-global-assign */

import BigNumber from "bignumber.js";
import { isHex, isArray } from "./Type";
import { hasProperties } from "./Util";
import { toBigNumber } from "./Converter";

const secp256k1 = require("secp256k1");

/**
 * Check if input value is a private key.
 * @param {any} privKey - the input value.
 * @return {boolean} returns true if the input value is a private key.
 */
export function isPrivateKey(privKey) {
  if (!privKey) {
    return false;
  }

  if (typeof privKey === "string") {
    return /^[0-9a-f]{64}$/g.test(privKey) && /\S/g.test(privKey);
  }

  return secp256k1.privateKeyVerify(Buffer.from(privKey, "hex"));
}

/**
 * Check if input value is a EOA address.
 * @param {any} address - the input value.
 * @return {boolean} returns true if the input value is a EOA address.
 */
export function isEoaAddress(address) {
  return /^(hx)[0-9a-f]{40}$/g.test(address) && /\S/g.test(address);
}

/**
 * Check if input value is a SCORE address.
 * @param {any} address - the input value.
 * @return {boolean} returns true if the input value is a SCORE address.
 */
export function isScoreAddress(address) {
  return /^(cx)[0-9a-f]{40}$/g.test(address) && /\S/g.test(address);
}

/**
 * Check if input value is a EOA or SCORE address.
 * @param {any} address - the input value.
 * @return {boolean} returns true if the input value is a EOA or SCORE address.
 */
export function isAddress(address) {
  return isEoaAddress(address) || isScoreAddress(address);
}

/**
 * Check if input value has upper case letter.
 * @param {any} value - the input value.
 * @return {boolean} returns true if the input value has upper case letter.
 */
export function hasUppercase(value) {
  return /[A-Z]/g.test(value);
}

/**
 * Check if input value has blank.
 * @param {any} value - the input value.
 * @return {boolean} returns true if the input value has blank.
 */
export function hasBlank(value) {
  return /\s/g.test(value);
}

/**
 * Check if input value is a block number.
 * @param {any} value - the input value.
 * @return {boolean} returns true if the input value is a block number.
 */
export function isNonNegative(value: string | BigNumber | number): boolean {
  try {
    if (hasUppercase(value.toString()) || hasBlank(value)) {
      return false;
    }

    const number = toBigNumber(value);
    const min = toBigNumber(0);
    const max = toBigNumber(2 ** 256);

    return (
      number.isInteger() &&
      number.isGreaterThanOrEqualTo(min) &&
      number.isLessThan(max)
    );
  } catch (e) {
    return false;
  }
}

/**
 * Check if input value is 'latest'.
 * @param {any} value - the input value.
 * @return {boolean} returns true if the input value is 'latest'.
 */
export function isPredefinedBlockValue(value) {
  return value === "latest";
}

/**
 * Check if input value is hash.
 * @param {any} hash - the input value.
 * @return {boolean} returns true if the input value is transaction hash.
 */
export function isValidHash(hash) {
  return /^(0x)[0-9a-f]{64}$/g.test(hash) && /\S/g.test(hash);
}

/**
 * Check if input value is 'call' object.
 * @param {Call|object} call - the input value.
 * @return {boolean} returns true if the input value is 'call' object.
 */
export function isCall(call) {
  return (
    hasProperties(call, ["to", "data", "dataType"]) &&
    hasProperties(call.data, ["method"]) &&
    isScoreAddress(call.to) &&
    call.dataType === "call"
  );
}

/**
 * Check if an input transaction object has a data properties properly.
 * @param {IcxTransaction|CallTransaction|DeployTransaction|MessageTransaction|object} transaction
 * @return {boolean} returns true if the input transaction object has a data properties properly.
 */
export function checkDataInTransaction(transaction) {
  switch (transaction.dataType) {
    case "call": {
      return (
        Object.prototype.hasOwnProperty.call(transaction, "data") &&
        hasProperties(transaction.data, ["method"])
      );
    }
    case "deploy": {
      return (
        Object.prototype.hasOwnProperty.call(transaction, "data") &&
        hasProperties(transaction.data, ["contentType", "content"]) &&
        isHex(transaction.data.content)
      );
    }
    case "message": {
      return (
        Object.prototype.hasOwnProperty.call(transaction, "data") &&
        isHex(transaction.data)
      );
    }
    case "base": {
      return (
        Object.prototype.hasOwnProperty.call(transaction, "data") &&
        hasProperties(transaction.data, ["result"])
      );
    }
    case "deposit": {
      return (
        Object.prototype.hasOwnProperty.call(transaction, "data") &&
        hasProperties(transaction.data, ["action"])
      );
    }
    default: {
      return true;
    }
  }
}

/**
 * Check if an input transaction object is a signed transaction object.
 * @param {SignedTransaction|object} signedTransaction - the transaction object.
 * @return {boolean} returns true if an input transaction object is a signed transaction object.
 */
export function isSignedTransaction(signedTransaction) {
  const transaction = signedTransaction.getProperties();
  if (
    !hasProperties(transaction, ["stepLimit", "signature"]) ||
    !isHex(transaction.stepLimit)
  ) {
    return false;
  }

  return checkTxData(transaction);
}

/**
 * Check if an input transaction object is valid.
 * @param {object} txData - the transaction object.
 * @return {boolean} returns true if an input transaction object is a signed transaction object.
 */
export function checkTxData(txData) {
  if (
    !hasProperties(txData, ["to", "from", "nid", "version", "timestamp"]) ||
    !isAddress(txData.to) ||
    !isAddress(txData.from) ||
    !isHex(txData.nid) ||
    !isHex(txData.version) ||
    !isHex(txData.timestamp)
  ) {
    return false;
  }

  if (
    Object.prototype.hasOwnProperty.call(txData, "value") &&
    !isHex(txData.value)
  ) {
    return false;
  }

  if (
    Object.prototype.hasOwnProperty.call(txData, "nonce") &&
    !isHex(txData.nonce)
  ) {
    return false;
  }

  return checkDataInTransaction(txData);
}

/**
 * Check if an input object is a block object.
 * @param {Block|object} block - the block object.
 * @return {boolean} returns true if an input object is a block object.
 */
export function isBlock(block) {
  return hasProperties(block, [
    "height",
    ["block_hash", "blockHash"],
    ["merkle_tree_root_hash", "merkleTreeRootHash"],
    ["prev_block_hash", "prevBlockHash"],
    ["peer_id", "peerId"],
    ["confirmed_transaction_list", "confirmedTransactionList"],
    "signature",
    ["time_stamp", "timestamp", "timeStamp"],
    "version",
  ]);
}

export function isScoreApi(api) {
  return hasProperties(api, ["type", "name"]);
}

/**
 * Check if an input object is a ScoreApiList object.
 * @param {object} scoreApiList - the input object.
 * @return {boolean} returns true if an input object is a ScoreApiList object.
 */
export function isScoreApiList(scoreApiList) {
  if (!isArray(scoreApiList)) {
    return false;
  }

  return scoreApiList.every((api) => isScoreApi(api));
}

/**
 * Check if an input object is a transaction result object.
 * @param {object} transaction - the input object.
 * @return {boolean} returns true if an input object is a transaction result object.
 */
export function isTransactionResult(transaction) {
  return hasProperties(transaction, [
    "status",
    "to",
    "txHash",
    "txIndex",
    "blockHeight",
    "blockHash",
    "cumulativeStepUsed",
    "stepUsed",
    "stepPrice",
  ]);
}
