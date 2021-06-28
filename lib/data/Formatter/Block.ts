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

import ConfirmedTransaction from "./ConfirmedTransaction";
import { add0xPrefix, addHxPrefix } from "../Hexadecimal";
import { toNumber } from "../Converter";
import { hasProperties, isGenesisBlock } from "../Util";
import { FormatError } from "../../Exception";
import { checkDataInTransaction } from "../Validator";
import { Hash } from "../../types/hash";

/**
 * @description Convert confirmed transaction list in block data into the right format.
 */
function toConfirmedTransaction(
  data: ConfirmedTransaction
): ConfirmedTransaction {
  if (
    !hasProperties(data, [["txHash", "tx_hash"]]) ||
    !checkDataInTransaction(data)
  ) {
    const error = new FormatError("Confirmed transaction object is invalid.");
    throw error.toString();
  }

  return new ConfirmedTransaction(data);
}

export default class Block {
  height: number;
  blockHash: string;
  merkleTreeRootHash: string;
  prevBlockHash: string;
  peerId: string;
  confirmedTransactionList: ConfirmedTransaction[];
  signature: string;
  timeStamp: Hash;
  version: Hash;

  constructor(data) {
    this.height = toNumber(data.height);
    this.blockHash = add0xPrefix(data.block_hash);
    this.merkleTreeRootHash = add0xPrefix(data.merkle_tree_root_hash);
    this.prevBlockHash = add0xPrefix(data.prev_block_hash);
    this.peerId = addHxPrefix(data.peer_id);
    this.confirmedTransactionList = (
      data.confirmed_transaction_list || []
    ).map((transaction: ConfirmedTransaction) =>
      isGenesisBlock(data.height)
        ? transaction
        : toConfirmedTransaction(transaction)
    );
    this.signature = data.signature;
    this.timeStamp = toNumber(data.time_stamp);
    this.version = data.version;
  }

  getTransactions() {
    return this.confirmedTransactionList;
  }
}
