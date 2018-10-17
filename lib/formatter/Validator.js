import { isObject } from 'util';
import { isString } from '../data/Type';
import { hasProperties, toDecimal } from '../data/Util';
import { is0xPrefix } from '../data/Hexadecimal';

export function isEoaAddress(address) {
	if (!isString(address)) {
		return false;
	}

	return /^(hx)[0-9a-f]{40}$/i.test(address);
}

export function isScoreAddress(address) {
	if (!isString(address)) {
		return false;
	}

	return /^(cx)[0-9a-f]{40}$/i.test(address);
}

export function isAddress(address) {
	if (!isString(address)) {
		return false;
	}

	if (isEoaAddress(address) || isScoreAddress(address)) {
		return true;
	}

	return false;
}

export function isBlockNumber(param) {
	try {
		let number = param;
		number = number || 0;
		number = toDecimal(number);
		return number >= 0 && number < 2 ** 256;
	} catch (e) {
		return false;
	}
}

export function isBlockHash(hash) {
	if (!isString(hash)) {
		return false;
	}

	return /^(0x)[0-9a-f]{64}$/i.test(hash);
}

export function isPredefinedBlockValue(value) {
	return value === 'latest';
}

export function isTransactionHash(hash) {
	if (!isString(hash)) {
		return false;
	}

	return /^(0x)[0-9a-f]{64}$/i.test(hash);
}

export function isCall(call) {
	if (!isObject(call)) {
		return false;
	}

	const ParamsProperties = ['to', 'data', 'dataType'];
	const DataProperties = ['method'];
	return hasProperties(call, ParamsProperties)
        && hasProperties(call.data, DataProperties)
        && isScoreAddress(call.to)
        && call.dataType === 'call';
}

export function isTransaction(transaction) {
	if (!isObject(transaction)) {
		return false;
	}

	const DefaultProperties = ['to', 'from', 'stepLimit', 'nid', 'nonce', 'timestamp'];
	if (!hasProperties(transaction, DefaultProperties)
        || !isAddress(transaction.to)
        || !isAddress(transaction.from)
        || !is0xPrefix(transaction.stepLimit)
        || !is0xPrefix(transaction.nid)
        || !is0xPrefix(transaction.nonce)
        || !is0xPrefix(transaction.timestamp)) {
		return false;
	}

	switch (transaction.dataType) {
		case 'call': {
			return Object.prototype.hasOwnProperty.call(transaction, 'data')
                && hasProperties(transaction.data, ['method']);
		}
		case 'deploy': {
			return Object.prototype.hasOwnProperty.call(transaction, 'data')
                && hasProperties(transaction.data, ['contentType', 'content'])
                && is0xPrefix(transaction.data.content);
		}
		case 'message': {
			return Object.prototype.hasOwnProperty.call(transaction, 'data')
                && is0xPrefix(transaction.data);
		}
		default: {
			return Object.prototype.hasOwnProperty.call(transaction, 'value')
                && is0xPrefix(transaction.value);
		}
	}
}

export default {
	isAddress,
	isEoaAddress,
	isScoreAddress,
	isBlockNumber,
	isBlockHash,
	isPredefinedBlockValue,
	isTransactionHash,
	isCall,
	isTransaction,
};
