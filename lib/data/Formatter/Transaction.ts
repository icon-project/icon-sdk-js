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
import { add0xPrefix } from "../Hexadecimal";
import { toNumber } from "../Converter";

export default class Transaction extends ConfirmedTransaction {
  txIndex: number;
  blockHeight: number;
  blockHash: string;

  constructor(data) {
    super(data);
    this.txIndex = toNumber(data.txIndex);
    this.blockHeight = toNumber(data.blockHeight);
    this.blockHash = add0xPrefix(data.blockHash);
  }
}
