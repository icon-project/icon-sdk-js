import { add0xPrefix, addHxPrefix } from '../Hexadecimal';
import { toNumber } from '../Converter';
import ConfirmedTransaction from './ConfirmedTransaction';

export default class Block {
	constructor(data) {
		this.height = toNumber(data.height);
		this.blockHash = add0xPrefix(data.block_hash);
		this.merkleTreeRootHash = add0xPrefix(data.merkle_tree_root_hash);
		this.prevBlockHash = add0xPrefix(data.prev_block_hash);
		this.peerId = addHxPrefix(data.peer_id);
		this.confirmedTransactionList = (data.confirmed_transaction_list || []).map(
			transaction => new ConfirmedTransaction(transaction),
		);
		this.signature = data.signature;
		this.timeStamp = toNumber(data.time_stamp);
		this.version = toNumber(data.version);
	}

	getTransactions() {
		return this.confirmedTransactionList;
	}
}
