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

import ScoreInfo from "./ScoreInfo";
import DepositInfo from "./DepositInfo";

export default class ScoreStatus {
  owner?: string;
  current?: ScoreInfo;
  next?: ScoreInfo;
  depositInfo?: object;
  disabled?: boolean;
  blocked?: boolean;
  useSystemDeposit?: boolean;
  constructor(data) {
    if (data.owner) this.owner = data.owner;
    if (data.current) this.current = new ScoreInfo(data.current);
    if (data.next) this.next = new ScoreInfo(data.next);
    if (data.depositInfo) this.depositInfo = new DepositInfo(data.depositInfo);
    if (data.disabled && data.disabled === "0x1") this.disabled = true;
    if (data.blocked && data.blocked === "0x1") this.blocked = true;
    if (data.useSystemDeposit && data.useSystemDeposit === "0x1")
      this.useSystemDeposit = true;
  }
}
