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
import utf8 from 'utf8';
import { add0xPrefix } from './Hexadecimal';
import {
	isString, isBigNumber, isHex, isInteger,
} from './Type';
import { DataError } from '../Exception';

/**
 * Convert UTF-8 text to hex string.
 * @param {string} value - the UTF-8 string only.
 * @return {string} the hex string.
 */
export function fromUtf8(value) {
	if (!isString(value)) {
		const error = new DataError('Invalid string');
		throw error.toString();
	}

	const bytes = [];
	let convertedText = '';

	for (let i = 0; i < value.length; i += 1) {
		const originBytes = unescape(encodeURIComponent(value[i]));
		for (let j = 0; j < originBytes.length; j += 1) {
			bytes.push(originBytes[j].charCodeAt(0));
		}
	}

	const textToHexFormat = '%x';
	for (let i = 0; i < bytes.length; i += 1) {
		const byte = bytes[i];
		let hexByte = byte.toString(16);
		if (hexByte.length === 1) {
			hexByte = `0${hexByte}`;
		}
		let char = textToHexFormat;
		char = char.replace(/%x/g, hexByte);
		convertedText += char;
	}

	return add0xPrefix(convertedText);
}

/**
 * Convert hex string to UTF-8 text.
 * @param {String} value the hex string only.
 * @returns {String} the UTF-8 string.
 */
export function toUtf8(value) {
	if (!isHex(value)) {
		const error = new DataError('Invalid hex string');
		throw error.toString();
	}

	let str = '';
	let i = 0; const
		l = value.length;
	if (value.substring(0, 2) === '0x') {
		i = 2;
	}
	for (; i < l; i += 2) {
		const code = parseInt(value.substr(i, 2), 16);
		if (code === 0) break;
		str += String.fromCharCode(code);
	}

	return utf8.decode(str);
}

/**
 * Convert string or BigNumber value to number.
 * @param {string|BigNumber} value - the value.
 * @return {number} the value converted to number.
 */
export function toNumber(value) {
	if (isBigNumber(value)) {
		return value.toNumber();
	}
	return (new BigNumber(value)).toNumber();
}

/**
 * Convert string or number value to BigNumber.
 * @param {string|number} value - the value.
 * @return {BigNumber} the value converted to BigNumber.
 */
export function toBigNumber(value) {
	if (isBigNumber(value)) {
		return value;
	}
	return new BigNumber(value);
}

/**
 * Convert string, number or BigNumber value to hex string strictly.
 * @param {string|number|BigNumber} value - the value that represents the number.
 * @return {string} the value converted to hex string.
 */
export function toHexNumber(value) {
	return add0xPrefix(toBigNumber(value).toString(16));
}

/**
 * Convert string, number or BigNumber value to hex string.
 * @param {string|number|BigNumber} value - the value.
 * @return {string} the value converted to hex string.
 */
export function toHex(value) {
	if (!value) {
		return '0x0';
	}

	if (isHex(value)) {
		return value;
	}

	if (isString(value)) {
		return fromUtf8(value);
	}

	if (isInteger(value)) {
		return toHexNumber(value);
	}

	if (isBigNumber(value) && value.isInteger()) {
		return toHexNumber(value);
	}

	const error = new DataError('Invalid value');
	throw error.toString();
}

/**
 * Convert transaction object to raw transaction object.
 * @param {object} transaction - the transaction object.
 * @return {object} the raw transaction object.
 */
export function toRawTransaction(transaction) {
	const {
		to,
		from,
		stepLimit,
		nid,
		version,
		timestamp,
		dataType,
		data,
		value,
		nonce,
	} = transaction;

	const rawTransaction = {
		to,
		from,
		stepLimit: toHexNumber(stepLimit),
		nid: toHexNumber(nid),
		version: toHexNumber(version),
		timestamp: toHexNumber(timestamp),
	};

	if (value) {
		rawTransaction.value = toHexNumber(value);
	}

	if (nonce) {
		rawTransaction.nonce = toHexNumber(nonce);
	}

	if (dataType) {
		rawTransaction.dataType = dataType;
	}

	if (['call', 'deploy', 'message'].indexOf(dataType) !== -1 && data) {
		rawTransaction.data = data;
	}

	return rawTransaction;
}
