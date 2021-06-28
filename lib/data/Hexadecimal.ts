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

function addPrefix(checkers, prefix, str) {
  for (let i = 0; i < checkers.length; i += 1) {
    if (checkers[i](str)) {
      return str;
    }
  }

  return prefix + str;
}

function removePrefix(checkFunc, str) {
  if (checkFunc(str)) {
    return str.substr(2);
  }

  return str;
}

/**
 * Check whether string starts with '0x' prefix.
 * @param {string} str - the string.
 * @return {boolean} returns true if string starts with '0x' prefix.
 */
export function is0xPrefix(str: string): boolean {
  return /^(0x)/i.test(str);
}

/**
 * Check whether string starts with 'hx' prefix.
 * @param {string} str - the string.
 * @return {boolean} returns true if string starts with 'hx' prefix.
 */
export function isHxPrefix(str: string): boolean {
  return /^(hx)/i.test(str);
}

/**
 * Check whether string starts with 'cx' prefix.
 * @param {string} str - the string.
 * @return {boolean} returns true if string starts with 'cx' prefix.
 */
export function isCxPrefix(str: string): boolean {
  return /^(cx)/i.test(str);
}

/**
 * Add '0x' prefix to string.
 * @param {string} str - the string.
 * @return {string} the string with '0x' prefix.
 */
export function add0xPrefix(str: string): string {
  return addPrefix([is0xPrefix], "0x", str);
}

/**
 * Add 'hx' prefix to string.
 * @param {string} str - the string.
 * @return {string} the string with 'hx' prefix.
 */
export function addHxPrefix(str: string): string {
  return addPrefix([isHxPrefix, isCxPrefix], "hx", str);
}

/**
 * Add 'cx' prefix to string.
 * @param {string} str - the string.
 * @return {string} the string with 'cx' prefix.
 */
export function addCxPrefix(str: string): string {
  return addPrefix([isHxPrefix, isCxPrefix], "cx", str);
}

/**
 * remove '0x' prefix from string.
 * @param {string} str - the string.
 * @return {string} the string without '0x' prefix.
 */
export function remove0xPrefix(str: string): string {
  return removePrefix(is0xPrefix, str);
}

/**
 * remove 'hx' prefix from string.
 * @param {string} str - the string.
 * @return {string} the string without 'hx' prefix.
 */
export function removeHxPrefix(str: string): string {
  return removePrefix(isHxPrefix, str);
}

/**
 * remove 'cx' prefix from string.
 * @param {string} str - the string.
 * @return {string} the string without 'cx' prefix.
 */
export function removeCxPrefix(str: string): string {
  return removePrefix(isCxPrefix, str);
}
