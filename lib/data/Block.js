import { toDecimal } from '../formatter/Converter';
import { add0xPrefix } from './Hexadecimal';

export default class Block {
	constructor(data) {
		this.height = toDecimal(data.height);
		this.blockHash = add0xPrefix(data.block_hash);
		this.merkleTreeRootHash = add0xPrefix(data.merkle_tree_root_hash);
		this.prevBlockHash = add0xPrefix(data.prev_block_hash);
		this.peerId = data.peer_id;
		this.confirmedRransactionList = data.confirmed_transaction_list; // TODO 추가 처리
		this.signature = data.signature;
		this.timeStamp = toDecimal(data.time_stamp);
		this.version = toDecimal(data.version);
	}
}
