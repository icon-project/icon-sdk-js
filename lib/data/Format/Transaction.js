import { addHxPrefix, add0xPrefix } from '../Hexadecimal';
import { toBigNumber, toNumber } from '../Converter';

export default class Transaction {
	constructor(data) {
		this.version = toBigNumber(data.version);
		this.from = addHxPrefix(data.from);
		this.to = addHxPrefix(data.to);
		this.value = toBigNumber(data.value);
		this.stepLimit = toBigNumber(data.stepLimit);
		this.timestamp = toNumber(data.timestamp);
		this.nid = toBigNumber(data.nid);
		this.nonce = toBigNumber(data.nonce);
		this.txHash = add0xPrefix(data.txHash);
		this.txIndex = toNumber(data.txIndex);
		this.blockHeight = toNumber(data.blockHeight);
		this.blockHash = add0xPrefix(data.blockHash);
		this.signature = data.signature;

		if (data.dataType) {
			this.dataType = data.dataType;
		}
		if (data.data) {
			this.data = data.data;
		}
	}
}
