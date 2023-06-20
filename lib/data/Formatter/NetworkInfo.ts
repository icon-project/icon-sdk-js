/*
 * Copyright 2023 ICON Foundation
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
import { toBigNumber } from "../Converter";

export default class NetworkInfo {
  platform: string;
  nid: BigNumber;
  channel: string;
  earliest: BigNumber;
  latest: BigNumber;
  stepPrice: BigNumber;

  constructor(data) {
    this.platform = data.platform;
    this.nid = toBigNumber(data.nid);
    this.channel = data.channel;
    this.earliest = toBigNumber(data.earliest);
    this.latest = toBigNumber(data.latest);
    this.stepPrice = toBigNumber(data.stepPrice);
  }
}
