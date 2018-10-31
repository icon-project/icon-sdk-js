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
import { add0xPrefix } from './Hexadecimal';
import { isString, isBigNumber, isHex } from './Type';

export function fromUtf8(value) {
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

export function toNumber(value) {
	if (isBigNumber(value)) {
		return value.toNumber();
	}
	return (new BigNumber(value)).toNumber();
}

export function toBigNumber(value) {
	if (isBigNumber(value)) {
		return value;
	}
	return new BigNumber(value);
}

export function toHex(value) {
	if (isHex(value)) {
		return value;
	}

	if (isString(value)) {
		return fromUtf8(value);
	}

	if (isBigNumber(value)) {
		return add0xPrefix(value.toString(16));
	}

	return add0xPrefix(toBigNumber(value).toString(16));
}

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
		stepLimit: toHex(stepLimit),
		nid: toHex(nid),
		version: toHex(version),
		timestamp: toHex(timestamp),
	};

	if (value) {
		rawTransaction.value = toHex(value);
	}

	if (nonce) {
		rawTransaction.nonce = toHex(nonce);
	}

	if (dataType) {
		rawTransaction.dataType = dataType;
	}

	if (['call', 'deploy', 'message'].indexOf(dataType) !== -1 && data) {
		rawTransaction.data = data;
	}

	return rawTransaction;
}
