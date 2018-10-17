import BigNumber from 'bignumber.js';

export function isBigNumber(value) {
	return BigNumber.isBigNumber(value);
}

export function isNumeric(num) {
	return /^[+-]?[0-9]+(.[0-9]+)?$/g.test(num);
}

export function isString(value) {
	return typeof value === 'string' || value instanceof String;
}

export function isByte(value) {
	return !!value && value.byteLength !== undefined;
}

export function isObject(obj) {
	return typeof obj === 'object';
}
