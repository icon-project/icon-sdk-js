/*
 * Copyright 2018 ICON Foundation
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

import BigNumber from 'bignumber.js';

export function isString(value) {
	return typeof value === 'string' || value instanceof String;
}

export function isByte(value) {
	return !!value && value.byteLength !== undefined;
}

export function isObject(obj) {
	return typeof obj === 'object';
}

export function isArray(obj) {
	return Array.isArray(obj);
}

export function isBigNumber(value) {
	return BigNumber.isBigNumber(value);
}

export function isHex(value) {
	return /^(0x)[0-9a-f]+$/g.test(value);
}

export function isFunction(value) {
	return typeof value === 'function';
}

export function isInteger(value) {
	return Number.isInteger(value);
}
