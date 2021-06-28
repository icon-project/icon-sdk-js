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

import { isArray } from "../Type";
import { ScoreError } from "../../Exception";
import { createPrivate } from "../Util";

export default class ScoreApiList {
  public private: any;

  constructor(list) {
    this.private = createPrivate();
    this.private(this).list = list;
    this.private(this).properties = {};

    if (isArray(list)) {
      list.forEach((item: any) => {
        this.private(this).properties[item.name] = item;
      });
    }
  }

  getList() {
    return this.private(this).list;
  }

  getMethod(name) {
    const method = this.private(this).properties[name];
    if (method) {
      return method;
    }

    const error = new ScoreError(`The method named '${name}' does not exist.`);
    throw error.toString();
  }
}
