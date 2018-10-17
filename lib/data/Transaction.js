import { addHxPrefix, add0xPrefix } from './Hexadecimal';
import { toBigNumber, toDecimal } from './Util';

export default class Transaction {
	constructor(data) {
		this.version = data.status;
		this.from = addHxPrefix(data.from);
		this.to = addHxPrefix(data.to);
		this.value = toBigNumber(data.value);
		this.stepLimit = toBigNumber(data.stepLimit);
		this.timestamp = toBigNumber(data.timestamp);
		this.nid = toDecimal(data.nid);
		this.nonce = toDecimal(data.nonce);
		this.txHash = add0xPrefix(data.txHash);
		this.txIndex = toDecimal(data.txIndex);
		this.blockHeight = toDecimal(data.blockHeight);
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
