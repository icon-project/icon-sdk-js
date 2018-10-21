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
	return (new BigNumber(value)).toNumber();
}

export function toBigNumber(value) {
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
