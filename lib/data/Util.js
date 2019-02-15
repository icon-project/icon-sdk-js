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

/* eslint no-use-before-define: ["error", { "functions": false }] */
/* eslint-disable no-global-assign */

import { sha3_256 as sha3256 } from 'js-sha3';
import secp256k1 from '../module/secp256k1';
import { isObject, isArray, isString } from './Type';

if (typeof window === 'undefined') {
	({ Buffer } = global);
}

export function getCurrentTime() {
	const date = new Date();
	return date.getTime();
}

export function concatTypedArrays(a, b) {
	const c = new (a.constructor)(a.length + b.length);
	c.set(a, 0);
	c.set(b, a.length);
	return c;
}

export function hasProperties(obj, propertySet) {
	if (!isObject(obj)) {
		return false;
	}

	let result = true;
	propertySet.forEach((property) => {
		if (isArray(property)) {
			result = result && property.some(item => Object.prototype.hasOwnProperty.call(obj, item));
		} else if (isString(property)) {
			result = result && Object.prototype.hasOwnProperty.call(obj, property);
		}
	});

	return result;
}

export function createPrivate() {
	const weakMap = new WeakMap();
	const internal = (key) => {
		if (!weakMap.has(key)) {
			weakMap.set(key, {});
		}
		return weakMap.get(key);
	};
	return internal;
}

export function makeTxHash(rawTrasaction) {
	const phraseToSign = generateHashKey(rawTrasaction);
	return sha3256.update(phraseToSign).hex();
}

export function serialize(trasaction) {
	const phraseToSign = generateHashKey(trasaction);
	const hashcode = sha3256.update(phraseToSign).hex();
	return hashcode;
}

export function generateHashKey(obj) {
	let resultStrReplaced = '';
	const resultStr = objTraverse(obj);
	resultStrReplaced = resultStr.substring(1).slice(0, -1);
	const result = `icx_sendTransaction.${resultStrReplaced}`;
	return result;
}

export function arrTraverse(arr) {
	let result = '';

	result += '[';
	for (let j = 0; j < arr.length; j += 1) {
		const value = arr[j];

		switch (true) {
			case (value === null): {
				result += String.raw`\0`;
				break;
			}
			case (typeof value === 'string'): {
				result += escapeString(value);
				break;
			}
			case (Array.isArray(value)): {
				result += arrTraverse(value);
				break;
			}
			case (typeof value === 'object'): {
				result += objTraverse(value);
				break;
			}
			default:
				break;
		}
		result += '.';
	}
	result = result.slice(0, -1);
	result += ']';
	return result;
}

export function objTraverse(obj) {
	let result = '';
	result += '{';
	const keys = Object.keys(obj);
	keys.sort();
	if (keys.length > 0) {
		for (let i = 0; i < keys.length; i += 1) {
			const key = keys[i];
			const value = obj[key];
			switch (true) {
				case (value === null): {
					result += `${key}.`;
					result += String.raw`\0`;
					break;
				}
				case (typeof value === 'string'): {
					result += `${key}.`;
					result += escapeString(value);
					break;
				}
				case (Array.isArray(value)): {
					result += `${key}.`;
					result += arrTraverse(value);
					break;
				}
				case (typeof value === 'object'): {
					result += `${key}.`;
					result += objTraverse(value);
					break;
				}
				default:
					break;
			}
			result += '.';
		}
		result = result.slice(0, -1);
		result += '}';
	} else {
		result += '}';
	}
	return result;
}

export function escapeString(value) {
	let newString = String.raw`${value}`;
	newString = newString.split('\\').join('\\\\');
	newString = newString.split('.').join('\\.');
	newString = newString.split('{').join('\\{');
	newString = newString.split('}').join('\\}');
	newString = newString.split('[').join('\\[');
	newString = newString.split(']').join('\\]');
	return newString;
}

export function sign(data, privKey) {
	const signing = secp256k1.sign(Buffer.from(data, 'hex'), privKey);
	const recovery = new Uint8Array(1);
	recovery[0] = signing.recovery;
	const signature = concatTypedArrays(signing.signature, recovery);
	return signature;
}
