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

import Request from "../jsonrpc/Request";
import HttpClient from "./client/HttpClient";
import HttpRequest from "./client/HttpRequest";
import HttpCall from "./client/HttpCall";

/**
 * Class representing HTTP-based provider
 */
export default class HttpProvider {
  private url: string;

  /**
   * Creates an instance of HttpProvider.
   * @param {string} url - The url of http provider.
   */
  constructor(url: string) {
    this.url = url;
  }

  request<T = unknown>(
    request: Request,
    // eslint-disable-next-line no-unused-vars
    converter?: (result: string | T) => T
  ): HttpCall<T> {
    const body = JSON.stringify(request, (_: string, value) => {
      if (value != null) {
        return value;
      }

      return undefined;
    });
    const httpRequest = new HttpRequest(this.url, body);

    return new HttpCall<T>(HttpClient.newCall(httpRequest) as any, converter);
  }
}
