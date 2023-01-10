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

export default class BTPNetworkInfo {
  startHeight: BigNumber;

  networkTypeID: BigNumber;

  networkTypeName: string;

  networkID: BigNumber;

  networkName: string;

  open: BigNumber;

  nextMessageSN: BigNumber;

  nextProofContextChanged: BigNumber;

  prevNSHash: string;

  lastNSHash: string;

  constructor(data) {
    this.startHeight = data.startHeight;
    this.networkTypeID = data.networkTypeID;
    this.networkTypeName = data.networkTypeName;
    this.networkID = data.networkID;
    this.networkName = data.networkName;
    this.open = data.open;
    this.nextMessageSN = data.nextMessageSN;
    this.nextProofContextChanged = data.nextProofContextChanged;
    this.prevNSHash = data.prevNSHash;
    this.lastNSHash = data.lastNSHash;
  }
}
