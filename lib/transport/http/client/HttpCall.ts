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

import Response from "../../jsonrpc/Response";
import { RpcError } from "../../../Exception";
import { HttpCallInterface } from "./HttpClient";

export default class HttpCall<T> {
  httpCall: HttpCallInterface<T>;

  converter?: (result) => T;

  constructor(httpCall: HttpCallInterface<T>, converter?: (result) => T) {
    this.httpCall = httpCall;
    this.converter = converter;
  }

  execute() {
    return this.callAsync();
  }

  private async callAsync(): Promise<T> {
    try {
      const response = await this.httpCall.execute();

      return new Response<T>(response, this.converter).result;
    } catch (e) {
      if (typeof e.error === "object") {
        const rpcError = new RpcError(e.error.message);
        throw rpcError.toString();
      } else {
        throw e;
      }
    }
  }
}
