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
	return /^(0x)[0-9a-fA-F]+$/i.test(value);
}
