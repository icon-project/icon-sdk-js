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

enum state {
  init = 0,
  connect,
  start,
}

export default class Monitor<T> {
  private ws: WebSocket;
  private readonly url: string;
  private request: MonitorSpec;
  private state = state.init;
  private readonly converter: (data: any) => T;

  constructor(url: string, request: MonitorSpec, converter: (data: any) => T) {
    this.url = url;
    this.request = request;
    this.converter = converter;
  }

  start(onEvent: (data: T) => void) {
    this.ws = new WebSocket(`${this.url}/${this.request.getPath()}`);
    this.ws.onopen = () => {
      this.ws.send(JSON.stringify(this.request.getParam()));
      this.state = state.connect;
    };
    this.ws.onmessage = (event) => {
      if (this.state === state.connect) {
        this.state = state.start;
      } else if (this.state === state.start) {
        const data = this.converter(JSON.parse(event.data));
        onEvent(data);
      }
    };
    this.ws.onclose = (event) => {
      this.ws.close(event.code);
    };
  }

  close() {
    this.ws.close(1000);
  }
}
