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

/* eslint no-use-before-define: ["error", { "functions": false }] */
/* eslint-disable no-global-assign */

import { sha3_256 as sha3256 } from "js-sha3";
import { isArray, isString } from "./Type";

const secp256k1 = require("secp256k1");

export function getCurrentTime(): number {
  const date = new Date();

  return date.getTime();
}

export function concatTypedArrays(a, b) {
  const c = new a.constructor(a.length + b.length);

  c.set(a, 0);
  c.set(b, a.length);

  return c;
}

export function isGenesisBlock(height: number): boolean {
  return height === 0;
}

export function hasProperties(obj, propertySet): boolean {
  if (typeof obj !== "object") {
    return false;
  }

  let result = true;
  propertySet.forEach((property) => {
    if (isArray(property)) {
      result =
        result &&
        property.some((item) =>
          Object.prototype.hasOwnProperty.call(obj, item)
        );
    } else if (isString(property)) {
      result = result && Object.prototype.hasOwnProperty.call(obj, property);
    }
  });

  return result;
}

export function createPrivate() {
  const weakMap = new WeakMap();
  return (key) => {
    if (!weakMap.has(key)) {
      weakMap.set(key, {});
    }

    return weakMap.get(key);
  };
}

export function makeTxHash(rawTrasaction) {
  const phraseToSign = generateHashKey(rawTrasaction);

  return sha3256.update(phraseToSign).hex();
}

export function serialize(trasaction) {
  const phraseToSign = generateHashKey(trasaction);
  return sha3256.update(phraseToSign).hex();
}

export function generateHashKey(obj) {
  const resultStr = objTraverse(obj);
  const resultStrReplaced: string = resultStr.substring(1).slice(0, -1);
  return `icx_sendTransaction.${resultStrReplaced}`;
}

export function arrTraverse(arr) {
  let result = "";

  result += "[";
  for (let j = 0; j < arr.length; j += 1) {
    const value = arr[j];
    if (value === undefined) continue;
    switch (true) {
      case value === null: {
        result += String.raw`\0`;
        break;
      }
      case typeof value === "string": {
        result += escapeString(value);
        break;
      }
      case Array.isArray(value): {
        result += arrTraverse(value);
        break;
      }
      case typeof value === "object": {
        result += objTraverse(value);
        break;
      }
      default:
        break;
    }
    result += ".";
  }

  if (result.endsWith(".")) {
    result = result.slice(0, -1);
  }

  result += "]";

  return result;
}

export function objTraverse(obj) {
  let result = "";
  result += "{";

  const keys = Object.keys(obj);
  keys.sort();

  if (keys.length > 0) {
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const value = obj[key];
      if (value === undefined) continue;
      switch (true) {
        case value === null: {
          result += `${key}.`;
          result += String.raw`\0`;
          break;
        }
        case typeof value === "string": {
          result += `${key}.`;
          result += escapeString(value);
          break;
        }
        case Array.isArray(value): {
          result += `${key}.`;
          result += arrTraverse(value);
          break;
        }
        case typeof value === "object": {
          result += `${key}.`;
          result += objTraverse(value);
          break;
        }
        default:
          break;
      }
      result += ".";
    }
    result = result.slice(0, -1);
    result += "}";
  } else {
    result += "}";
  }

  return result;
}

export function escapeString(value) {
  let newString = String.raw`${value}`;
  newString = newString.split("\\").join("\\\\");
  newString = newString.split(".").join("\\.");
  newString = newString.split("{").join("\\{");
  newString = newString.split("}").join("\\}");
  newString = newString.split("[").join("\\[");
  newString = newString.split("]").join("\\]");

  return newString;
}

export function sign(data, privKey) {
  const signing = (secp256k1 as any).ecdsaSign(
    Buffer.from(data, "hex"),
    privKey
  );
  const recovery = new Uint8Array(1);
  recovery[0] = signing.recid;
  return concatTypedArrays(signing.signature, recovery);
}
