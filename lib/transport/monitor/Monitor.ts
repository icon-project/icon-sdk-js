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
import { RpcError } from "../../Exception";
import BigNumber from "bignumber.js";
import { Converter } from "../../data/index";

enum State {
  INIT = 0,
  CONNECT,
  START,
}

export default class Monitor<T> {
  private ws: WebSocket;
  private readonly url: string;
  private spec: MonitorSpec;
  private state = State.INIT;

  constructor(
    url: string,
    spec: MonitorSpec,
    ondata: (data: T) => void,
    onerror: (error) => void,
    onprogress?: (height: BigNumber) => void
  ) {
    this.url = url;
    this.spec = spec;
    this.ws = new WebSocket(`${this.url}/${this.spec.getPath()}`);
    this.ws.onopen = () => {
      this.ws.send(JSON.stringify(this.spec.getParam()));
      this.state = State.CONNECT;
    };
    this.ws.onmessage = (event) => {
      try {
        if (this.state === State.CONNECT) {
          const res = JSON.parse(event.data);
          if (res.code != 0) {
            throw new RpcError(res.message).toString();
          } else {
            this.state = State.START;
          }
        } else if (this.state === State.START) {
          const obj = JSON.parse(event.data);
          if (obj.progress !== undefined) {
            if (onprogress !== undefined) {
              onprogress(Converter.toBigNumber(obj.progress));
            }
          } else {
            const converter = spec.getConverter();
            const data: T = converter(obj);
            ondata(data);
          }
        }
      } catch (e) {
        this.ws.onerror(e);
      }
    };
    this.ws.onerror = onerror;
  }

  close() {
    this.ws.close(1000);
  }
}
