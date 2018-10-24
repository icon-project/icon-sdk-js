import Block from './Block';
import Transaction from './Transaction';
import TransactionResult from './TransactionResult';
import ScoreApiList from './ScoreApiList';
import { hasProperties } from '../Util';
import { FormatError } from '../../Exception';
import { checkDataInTransaction } from '../Validator';
import { isArray } from '../Type';

/**
 * @description Convert block data into the right format.
 */
export function toBlock(data) {
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
		const error = new FormatError('Block object is invalid.');
		throw error.toString();
	}

	return new Block(data);
}

/**
 * @description Convert transaction data into the right format.
 */
export function toTransaction(data) {
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
	]) || !checkDataInTransaction(data)) {
		const error = new FormatError('Transaction object is invalid.');
		throw error.toString();
	}

	return new Transaction(data);
}

function checkStatusInTransaction(data) {
	if (data.status === '0x1' && !hasProperties(data, ['eventLogs', 'logsBloom'])) {
		return false;
	}

	if (data.status === '0x0' && !hasProperties(data, ['failure'])) {
		return false;
	}

	return true;
}

/**
 * @description Convert transaction result data into the right format.
 */
export function toTransactionResult(data) {
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
	]) || !checkStatusInTransaction(data)) {
		const error = new FormatError('Transaction result object is invalid.');
		throw error.toString();
	}

	return new TransactionResult(data);
}

export function toScoreApiList(data) {
	console.log(data)
	if (!isArray(data)) {
		const error = new FormatError('SCORE API list is invalid.');
		throw error.toString();
	}

	return new ScoreApiList(data)
}

export default {
	toBlock,
	toTransaction,
	toTransactionResult,
	toScoreApiList,
};