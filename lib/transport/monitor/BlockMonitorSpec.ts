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
import EventFilter from "./EventFilter";
import BlockNotification from "../../data/Formatter/BlockNotification";
import { Converter } from "../../data";

export default class BlockMonitorSpec implements MonitorSpec {
  readonly height: BigNumber;
  readonly eventFilters?: EventFilter[];
  readonly logs?: boolean;

  constructor(height: BigNumber, eventFilters?: EventFilter[], logs?: boolean) {
    this.height = height;
    this.eventFilters = eventFilters;
    this.logs = logs;
  }

  getPath(): string {
    return "block";
  }

  getParam(): object {
    const height = Converter.toHex(this.height);
    const params = { height };
    if (this.logs) params["logs"] = "0x1";
    if (!this.eventFilters || this.eventFilters.length === 0) {
      return params;
    }
    return {
      ...params,
      eventFilters: this.eventFilters.map((v) => v.toObject()),
    };
  }

  getConverter(): (data) => BlockNotification {
    return (data) => new BlockNotification(data);
  }
}
