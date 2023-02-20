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
import { Converter } from "../../data/index";

export default class EventMonitorSpec implements MonitorSpec {
  readonly height: string | BigNumber;
  readonly eventFilter: EventFilter;
  readonly logs: boolean;

  constructor(
    height: string | BigNumber,
    eventFilter?: EventFilter,
    logs?: boolean
  ) {
    this.height = height;
    this.eventFilter = eventFilter;
    this.logs = logs;
  }

  getPath(): string {
    return "event";
  }

  getParam(): object {
    const ret = {
      height: Converter.toHex(this.height),
    };
    if (this.eventFilter) ret["eventFilter"] = this.eventFilter.toObject();
    if (this.logs) ret["logs"] = "0x1";
    return ret;
  }
}
