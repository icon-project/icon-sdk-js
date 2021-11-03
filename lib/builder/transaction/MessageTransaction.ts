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
 * Subclass for making a transaction object for sending a message.
 * @extends {IcxTransaction}
 */
export class MessageTransaction extends IcxTransaction {
  dataType: "message";
  to: string;
  from: string;
  value: Hash;
  stepLimit: Hash;
  nid: Hash;
  nonce: Hash;
  version: Hash;
  timestamp: Hash;
  data: string;

  constructor(
    to,
    from,
    value,
    stepLimit,
    nid,
    nonce,
    version,
    timestamp,
    data
  ) {
    super(to, from, value, stepLimit, nid, nonce, version, timestamp);
    this.dataType = "message";

    if (data) {
      this.data = data;
    }
  }
}

/**
 * Builder for 'MessageTransaction' object.
 * @extends {IcxTransactionBuilder}
 */
export default class MessageTransactionBuilder extends IcxTransactionBuilder {
  public private: any;

  /**
   * Creates an instance of MessageTransactionBuilder.
   */
  constructor() {
    super();

    this.private = createPrivate();
    this.private(this).data = undefined;
  }

  /**
   * Set 'data' property
   * @param {string} data - The data to send.
   * @return {MessageTransactionBuilder} this.
   */
  data(data: string): MessageTransactionBuilder {
    this.private(this).data = data;

    return this;
  }

  /**
   * Build 'MessageTransaction' object
   * @return {MessageTransaction} 'MessageTransaction' instance
   */
  build(): MessageTransaction {
    return new MessageTransaction(
      this.private(this).to,
      this.private(this).from,
      this.private(this).value,
      this.private(this).stepLimit,
      this.private(this).nid,
      this.private(this).nonce,
      this.private(this).version,
      this.private(this).timestamp,

      this.private(this).data
    );
  }
}
