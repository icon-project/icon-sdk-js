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
import { addHxPrefix, add0xPrefix } from "../Hexadecimal";
import { toBigNumber, toNumber } from "../Converter";

const assignParams = (
  _this: unknown,
  params: string[],
  data: any,
  // eslint-disable-next-line no-unused-vars
  converter: (source: any) => any = (value) => value
) => {
  const convertedParams = {};

  params.map((param) => {
    const value = data[param];

    if (value) {
      convertedParams[param] = converter(value);
    }

    return true;
  });

  Object.assign(_this, convertedParams);
};

export default class ConfirmedTransaction {
  timestamp: number;
  value: BigNumber;
  fee: BigNumber;
  nid: BigNumber;
  stepLimit: BigNumber;
  nonce: BigNumber;
  from: string;
  to: string;
  signature: string;
  dataType: string;
  data: unknown;
  version: BigNumber;
  txHash: string;

  constructor(data) {
    assignParams(this, ["timestamp"], data, toNumber);
    assignParams(
      this,
      ["value", "fee", "nid", "stepLimit", "nonce"],
      data,
      toBigNumber
    );
    assignParams(this, ["from", "to"], data, addHxPrefix);
    assignParams(this, ["signature", "dataType", "data"], data);
    this.version =
      data.version && toBigNumber(data.version).gte(3)
        ? toBigNumber(data.version)
        : toBigNumber(2);
    this.txHash = data.tx_hash
      ? add0xPrefix(data.tx_hash)
      : add0xPrefix(data.txHash);
  }
}
