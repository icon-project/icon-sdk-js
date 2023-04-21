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
import EventNotification from "../../data/Formatter/EventNotification";

export default class EventMonitorSpec implements MonitorSpec {
  readonly height: BigNumber;
  readonly eventFilters: EventFilter[];
  readonly logs: boolean;
  readonly progressInterval: number;

  constructor(
    height: BigNumber,
    eventFilter: EventFilter | EventFilter[],
    logs?: boolean,
    progressInterval?: number
  ) {
    this.height = height;
    if (eventFilter instanceof EventFilter) {
      this.eventFilters = [eventFilter];
    } else {
      this.eventFilters = eventFilter;
    }
    this.logs = logs;
    this.progressInterval = progressInterval;
  }

  getPath(): string {
    return "event";
  }

  getParam(): object {
    let ret = {};
    if (this.eventFilters.length == 1) {
      ret = Object.assign(ret, this.eventFilters[0].toObject());
    } else {
      ret["eventFilters"] = this.eventFilters.map((v) => v.toObject());
    }
    if (this.logs) ret["logs"] = "0x1";
    ret["height"] = Converter.toHex(this.height);
    if (this.progressInterval > 0)
      ret["progressInterval"] = Converter.toHex(this.progressInterval);
    return ret;
  }

  getConverter(): (data) => EventNotification {
    return (data) => new EventNotification(data);
  }
}
