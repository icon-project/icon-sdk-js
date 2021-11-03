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

import { IcxTransaction, IcxTransactionBuilder } from "./IcxTransaction";
import { createPrivate } from "../../data/Util";
import { Hash } from "../../types/hash";

/**
 * SubClass for making the transaction object for calling a method in SCORE.
 * @extends {IcxTransaction}
 */
export class CallTransaction extends IcxTransaction {
  dataType: "call";
  to: string;
  from: string;
  value: Hash;
  stepLimit: Hash;
  nid: Hash;
  nonce: Hash;
  version: Hash;
  timestamp: number;
  signature: string;
  method: string;
  params: any;
  data: any;

  constructor(
    to,
    from,
    value,
    stepLimit,
    nid,
    nonce,
    version,
    timestamp,
    method,
    params
  ) {
    super(to, from, value, stepLimit, nid, nonce, version, timestamp);
    this.dataType = "call";
    this.data = { method };

    if (params) {
      this.data.params = params;
    }
  }
}

/**
 * Builder for 'CallTransaction' object.
 * @extends {IcxTransactionBuilder}
 */
export class CallTransactionBuilder extends IcxTransactionBuilder {
  public private: any;

  /**
   * Creates an instance of CallTransactionBuilder.
   */
  constructor() {
    super();
    this.private = createPrivate();
    this.private(this).method = undefined;
    this.private(this).params = undefined;
  }

  /**
   * Set 'method' property
   * @param {string} method - The method name of SCORE API
   * @return {CallTransactionBuilder} this.
   */
  method(method: string): CallTransactionBuilder {
    this.private(this).method = method;

    return this;
  }

  /**
   * Set 'params' property
   * @param {object} params - The input params for method
   * @return {CallTransactionBuilder} this.
   */
  params(params: any): CallTransactionBuilder {
    this.private(this).params = params;

    return this;
  }

  /**
   * Build 'CallTransaction' object
   * @return {CallTransaction} 'CallTransaction' instance exported by 'CallTransactionBuilder'.
   */
  build(): CallTransaction {
    return new CallTransaction(
      this.private(this).to,
      this.private(this).from,
      this.private(this).value,
      this.private(this).stepLimit,
      this.private(this).nid,
      this.private(this).nonce,
      this.private(this).version,
      this.private(this).timestamp,

      this.private(this).method,
      this.private(this).params
    );
  }
}
