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

import BigNumber from "bignumber.js";
import { IcxTransaction } from "./builder/transaction/IcxTransaction";
import { MessageTransaction } from "./builder/transaction/MessageTransaction";
import { CallTransaction } from "./builder/transaction/CallTransaction";
import { DeployTransaction } from "./builder/transaction/DeployTransaction";
import { DepositTransaction } from "./builder/transaction/DepositTransaction";
import Wallet from "./Wallet";
import { toRawTransaction } from "./data/Converter";
import { createPrivate, serialize } from "./data/Util";

function makeSignature(transaction: SignedTransaction, wallet: Wallet): string {
  const rawTransaction = toRawTransaction(transaction);
  return wallet.sign(serialize(rawTransaction) as any);
}

function createProperties(
  transaction: SignedTransaction,
  wallet: Wallet
): SignedTransaction {
  const rawTransaction = toRawTransaction(transaction);

  rawTransaction.signature = makeSignature(transaction, wallet);

  return rawTransaction;
}

/**
 * Class representing the signed transaction object.
 */
export default class SignedTransaction {
  private private: any;
  to: string;
  from: string;
  value: string;
  stepLimit: BigNumber;
  nid: BigNumber;
  nonce: string;
  version: BigNumber;
  timestamp: number;
  signature: string;
  dataType: string;
  data: any;

  /**
   * Creates an instance of SignedTransaction.
   *  transaction - The transaction instance.
   * @param transaction
   * @param {Wallet} wallet - The wallet instance.
   */
  constructor(
    transaction:
      | IcxTransaction
      | MessageTransaction
      | CallTransaction
      | DeployTransaction
      | DepositTransaction,
    wallet: Wallet
  ) {
    this.private = createPrivate();
    this.private(this).transaction = transaction;
    this.private(this).wallet = wallet;
  }

  /**
   * Get raw transaction object of this.transaction.
   * @return {object} The raw transaction object.
   */
  getRawTransaction(): SignedTransaction {
    return toRawTransaction(this.private(this).transaction);
  }

  /**
   * Get signature string.
   * @return {string} The signature string.
   */
  getSignature(): string {
    return makeSignature(
      this.private(this).transaction,
      this.private(this).wallet
    );
  }

  /**
   * Get properties of signed transaction object
   *
   * @return {object} The signed transaction object.
   */
  getProperties(): SignedTransaction {
    return createProperties(
      this.private(this).transaction,
      this.private(this).wallet
    );
  }
}
