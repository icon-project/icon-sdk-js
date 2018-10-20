import { addHxPrefix, add0xPrefix, addCxPrefix } from '../Hexadecimal';
import { toNumber, toBigNumber } from '../Converter';

export default class TransactionResult {
	constructor(data) {
		this.status = data.status;
		this.to = addHxPrefix(data.to);
		this.txHash = add0xPrefix(data.txHash);
		this.txIndex = toNumber(data.txIndex);
		this.blockHeight = toNumber(data.blockHeight);
		this.blockHash = add0xPrefix(data.blockHash);
		this.cumulativeStepUsed = toBigNumber(data.cumulativeStepUsed);
		this.stepUsed = toBigNumber(data.stepUsed);
		this.stepPrice = toBigNumber(data.stepPrice);

		// TODO Success
		if (data.scoreAddress) {
			this.scoreAddress = addCxPrefix(data.scoreAddress);
		}
		if (data.eventLogs) {
			this.eventLogs = data.eventLogs;
		}
		if (data.logsBloom) {
			this.logsBloom = data.logsBloom;
		}

		// TODO Fail
		if (data.failure) {
			this.failure = data.failure;
		}
	}
}
