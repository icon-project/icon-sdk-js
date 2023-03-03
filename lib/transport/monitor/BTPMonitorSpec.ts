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
import MonitorSpec from "./MonitorSpec";
import BigNumber from "bignumber.js";
import { Converter } from "../../data/index";
import BTPNotification from "../../data/Formatter/BTPNotification";

export default class BTPMonitorSpec implements MonitorSpec {
  readonly height: BigNumber;
  readonly networkID: BigNumber;
  readonly proofFlag: boolean;

  constructor(height: BigNumber, networkID: BigNumber, proofFlag: boolean) {
    this.height = height;
    this.networkID = networkID;
    this.proofFlag = proofFlag;
  }

  getPath(): string {
    return "btp";
  }

  getParam(): object {
    const flag = this.proofFlag ? "0x1" : "0x0";
    return {
      height: Converter.toHex(this.height),
      networkID: Converter.toHex(this.networkID),
      proofFlag: flag,
    };
  }

  getConverter(): (data) => BTPNotification {
    return (data) => new BTPNotification(data);
  }
}
