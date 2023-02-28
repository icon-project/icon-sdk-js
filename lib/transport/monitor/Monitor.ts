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
    onerror: (error) => void
  ) {
    this.url = url;
    this.spec = spec;
    this.ws = new WebSocket(`${this.url}/${this.spec.getPath()}`);
    this.ws.onopen = () => {
      this.ws.send(JSON.stringify(this.spec.getParam()));
      this.state = State.CONNECT;
    };
    this.ws.onmessage = (event) => {
      if (this.state === State.CONNECT) {
        this.state = State.START;
      } else if (this.state === State.START) {
        const converter = spec.getConverter();
        const data: T = converter(JSON.parse(event.data));
        ondata(data);
      }
    };
    this.ws.onclose = (event) => {
      this.ws.close(event.code);
    };
    this.ws.onerror = onerror;
  }

  close() {
    this.ws.close(1000);
  }
}
