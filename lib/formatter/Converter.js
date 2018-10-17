import BigNumber from 'bignumber.js';
import Block from '../data/Block';
import Transaction from '../data/Transaction';
import TransactionResult from "../data/TransactionResult"
import { isString, isObject, isBigNumber } from "../data/Type";
import { is0xPrefix } from "../data/Hexadecimal"
import { hasProperties } from "../data/Util"

export function toDecimal(data) {
    if (isString(data) && is0xPrefix(data)) {
        data = new BigNumber(data, 16)
    }

    return parseFloat(data, 10) // TODO NaN 체크
}

export function toBigNumber(data) {
    if (isString(data) && is0xPrefix(data)) {
        return new BigNumber(data, 16)
    }

    return new BigNumber(data, 10)    
}

export function toBlock(data) {
	if (!isObject(data)) {
		throw new Error('toBlock');
	}

	const BlockProperties = [
		'height',
		'block_hash',
		'merkle_tree_root_hash',
		'prev_block_hash',
		'peer_id',
		'confirmed_transaction_list',
		'signature',
		'time_stamp',
		'version',
	];

	if (!hasProperties(data, BlockProperties)) {
		throw new Error('toBlock hasProperties');
	}

	return new Block(data);
}

export function toTransaction(data) {
	if (!isObject(data)) {
		throw new Error('toTransaction');
	}

	const TransactionProperties = [
		'status',
		'from',
		'to',
		'value',
		'timestamp',
		'nid',
		'nonce',
		'txHash',
		'txIndex',
		'blockHeight',
		'blockHash',
		'signature',
	];

	if (!hasProperties(data, TransactionProperties)) {
		throw new Error('toTransaction hasProperties');
	}

	// TODO dataType, data 체크

	return new Transaction(data);
}

export function toTransactionResult(data) {
	if (!isObject(data)) {
		throw new Error('toTransactionResult');
	}

	const TransactionResultProperties = [
		'status',
		'to',
		'txHash',
		'txIndex',
		'blockHeight',
		'blockHash',
		'cumulativeStepUsed',
		'stepUsed',
		'stepPrice',
	];

	if (!hasProperties(data, TransactionResultProperties)) {
		throw new Error('toTransactionResult hasProperties');
	}

	const SuccessProperties = ['scoreAddress', 'eventLogs', 'logsBloom'];
	const FailureProperties = ['failure'];
	if (data.status === '0x1' && !hasProperties(data, SuccessProperties)) {
		throw new Error('toTransaction SuccessProperties');
	} else if (data.status === '0x0' && !hasProperties(data, FailureProperties)) {
		throw new Error('toTransaction FailureProperties');
	}

	return new TransactionResult(data);
}

export default {
	toDecimal,
	toBigNumber,
	toBlock,
	toTransaction,
	toTransactionResult,
};
