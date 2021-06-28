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

import { Exception } from "../../Exception";

export default class Response<T> {
  result: T;
  error: Exception;

  constructor(
    response: { result: string; error: Exception },
    // eslint-disable-next-line no-unused-vars
    converter?: (result: string) => T
  ) {
    const { result, error } = response;

    if (result) {
      this.result =
        typeof converter === "function"
          ? converter(result as string)
          : ((result as unknown) as T);
    }

    if (error) {
      this.error = error;
    }
  }
}
