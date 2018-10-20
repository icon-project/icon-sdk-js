import Block from './Block';
import Transaction from './Transaction';
import TransactionResult from './TransactionResult';
import { isObject } from '../Type';
import { hasProperties } from '../Util';

export function toBlock(data) {
	if (!isObject(data)) {
		throw new Error('toBlock');
	}

	if (!hasProperties(data, [
		'height',
		'block_hash',
		'merkle_tree_root_hash',
		'prev_block_hash',
		'peer_id',
		'confirmed_transaction_list',
		'signature',
		'time_stamp',
		'version',
	])) {
		throw new Error('toBlock hasProperties');
	}

	return new Block(data);
}

export function toTransaction(data) {
	if (!isObject(data)) {
		throw new Error('toTransaction');
	}

	if (!hasProperties(data, [
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
	])) {
		throw new Error('toTransaction hasProperties');
	}

	// TODO dataType, data 체크

	return new Transaction(data);
}

export function toTransactionResult(data) {
	if (!isObject(data)) {
		throw new Error('toTransactionResult');
	}

	if (!hasProperties(data, [
		'status',
		'to',
		'txHash',
		'txIndex',
		'blockHeight',
		'blockHash',
		'cumulativeStepUsed',
		'stepUsed',
		'stepPrice',
	])) {
		throw new Error('toTransactionResult hasProperties');
	}

	// const SuccessProperties = ['scoreAddress', 'eventLogs', 'logsBloom'];
	if (data.status === '0x1' && !hasProperties(data, ['eventLogs', 'logsBloom'])) {
		throw new Error('toTransaction SuccessProperties');
	} else if (data.status === '0x0' && !hasProperties(data, ['failure'])) {
		throw new Error('toTransaction FailureProperties');
	}

	return new TransactionResult(data);
}

export default {
	toBlock,
	toTransaction,
	toTransactionResult,
};
