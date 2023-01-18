/*
 * Copyright 2022 ICON Foundation
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

import HttpRequest from "./HttpRequest";
import { NetworkError } from "../../../Exception";

export default class HttpClient {
  static newCall<T = any>(
    httpRequest: HttpRequest
  ): { execute(): Promise<T>; sendAsync(): Promise<T> } {
    return {
      execute(): Promise<T> {
        return this.sendAsync();
      },

      sendAsync<T>(): Promise<T> {
        const { url, body } = httpRequest;

        // eslint-disable-next-line no-async-promise-executor
        return new Promise<T>(async (resolve, reject) => {
          try {
            const response = await fetch(url, {
              method: "POST",
              body,
            });

            if (response.ok) {
              const result = await response.json();

              resolve(result);
            } else {
              const result = await response.json();

              reject(result);
            }
          } catch (e) {
            const error = new NetworkError(e.message);

            reject(error.toString());
          }
        });
      },
    };
  }
}
