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

import { createPrivate } from "../../data/Util";
import { Hash } from "../../types/hash";

/**
 * Class for calling the SCORE API.
 */
export class Call {
  to: Hash;
  from: Hash;
  dataType: "call";
  data: unknown;
  height?: Hash;

  constructor(to: Hash, from: Hash, data: unknown, height?: Hash) {
    this.to = to;
    this.dataType = "call";
    this.data = data;
    if (from) {
      this.from = from;
    }
    if (height) {
      this.height = height;
    }
  }
}

/**
 * Builder class for a 'Call' object.
 */
export class CallBuilder {
  private private: any;

  /**
   * Creates an instance of CallBuilder.
   */
  constructor() {
    this.private = createPrivate();
    this.private(this).to = undefined;
    this.private(this).from = undefined;
    this.private(this).height = undefined;
    this.private(this).data = {};
  }

  /**
   * Set 'to' property
   * @param {string} to - The SCORE address.
   * @return {CallBuilder} this.
   */
  to(to: string): CallBuilder {
    this.private(this).to = to;

    return this;
  }

  /**
   * Set 'from' property
   * @param {string} from - The EOA address.
   * @return {CallBuilder} this.
   */
  from(from: string): CallBuilder {
    this.private(this).from = from;

    return this;
  }

  /**
   * Set 'method' property
   * @param {string} method - The method name of SCORE API
   * @return {CallBuilder} this.
   */
  method(method: string): CallBuilder {
    this.private(this).data.method = method;

    return this;
  }

  /**
   * Set 'params' property
   * @param {object} params - The input params for method
   * @return {CallBuilder} this.
   */
  params(params: any): CallBuilder {
    if (params) {
      this.private(this).data.params = params;
    }

    return this;
  }

  /**
   *  Set 'height' property
   *  @param {Hash} [height] block height.
   *  @return {CallBuilder} this.
   */
  height(height: Hash): CallBuilder {
    this.private(this).height = height;

    return this;
  }

  /**
   * Build 'Call' object
   * @return {Call} 'Call' instance exported by 'CallBuilder'.
   */
  build(): Call {
    return new Call(
      this.private(this).to,
      this.private(this).from,
      this.private(this).data,
      this.private(this).height
    );
  }
}
