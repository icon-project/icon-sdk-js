import ConfirmedTransaction from './ConfirmedTransaction';
import { add0xPrefix, addHxPrefix } from '../Hexadecimal';
import { toNumber } from '../Converter';
import { hasProperties } from '../Util';
import { FormatError } from '../../Exception';
import { checkDataInTransaction } from '../Validator';

/**
 * @description Convert confirmed transaction list in block data into the right format.
 */
function toConfirmedTransaction(data) {
	if (!hasProperties(data, [
		'version',
		'from',
		'to',
		'value',
		'stepLimit',
		'timestamp',
		'nid',
		'nonce',
		'txHash',
		'signature',
	]) || !checkDataInTransaction(data)) {
		const error = new FormatError('Confirmed transaction object is invalid.');
		throw error.toString();
	}

	return new ConfirmedTransaction(data);
}

export default class Block {
	constructor(data) {
		this.height = toNumber(data.height);
		this.blockHash = add0xPrefix(data.block_hash);
		this.merkleTreeRootHash = add0xPrefix(data.merkle_tree_root_hash);
		this.prevBlockHash = add0xPrefix(data.prev_block_hash);
		this.peerId = addHxPrefix(data.peer_id);
		this.confirmedTransactionList = (data.confirmed_transaction_list || []).map(
			transaction => toConfirmedTransaction(transaction),
		);
		this.signature = data.signature;
		this.timeStamp = toNumber(data.time_stamp);
		this.version = toNumber(data.version);
	}

	getTransactions() {
		return this.confirmedTransactionList;
	}
}
