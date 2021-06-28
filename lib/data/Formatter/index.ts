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

import Block from "./Block";
import Transaction from "./Transaction";
import TransactionResult from "./TransactionResult";
import ScoreApiList from "./ScoreApiList";
import { hasProperties } from "../Util";
import { FormatError } from "../../Exception";
import { checkDataInTransaction, isScoreApiList } from "../Validator";

/**
 * @description Convert block data into the right format.
 */
export function toBlock(data: Block): Block {
  if (
    !hasProperties(data, [
      "height",
      "block_hash",
      "merkle_tree_root_hash",
      "prev_block_hash",
      "peer_id",
      "confirmed_transaction_list",
      "signature",
      "time_stamp",
      "version",
    ])
  ) {
    const error = new FormatError("Block object is invalid.");
    throw error.toString();
  }

  return new Block(data);
}

/**
 * @description Convert transaction data into the right format.
 */
export function toTransaction(data: Transaction): Transaction {
  if (
    !hasProperties(data, [
      ["txHash", "tx_hash"],
      "txIndex",
      "blockHeight",
      "blockHash",
    ]) ||
    !checkDataInTransaction(data)
  ) {
    const error = new FormatError("Transaction object is invalid.");
    throw error.toString();
  }

  return new Transaction(data);
}

function checkStatusInTransaction(data: TransactionResult): boolean {
  if (data.status === "0x1" && !hasProperties(data, ["eventLogs"])) {
    return false;
  }

  if (data.status === "0x0" && !hasProperties(data, ["failure"])) {
    return false;
  }

  return true;
}

/**
 * @description Convert transaction result data into the right format.
 */
export function toTransactionResult(data) {
  if (
    !hasProperties(data, [
      "status",
      "to",
      "txHash",
      "txIndex",
      "blockHeight",
      "blockHash",
      "cumulativeStepUsed",
      "stepUsed",
      "stepPrice",
    ]) ||
    !checkStatusInTransaction(data)
  ) {
    const error = new FormatError("Transaction result object is invalid.");
    throw error.toString();
  }

  return new TransactionResult(data);
}

/**
 * @description Convert SCORE API list into the right format.
 */
export function toScoreApiList(data) {
  if (!isScoreApiList(data)) {
    const error = new FormatError("SCORE API list is invalid.");
    throw error.toString();
  }

  return new ScoreApiList(data);
}

export default {
  toBlock,
  toTransaction,
  toTransactionResult,
  toScoreApiList,
};
