import {
	IcxTransaction,
	IcxTransactionBuilder,
} from './IcxTransaction';
import { createPrivate } from '../../data/Util';


class MessageTransaction extends IcxTransaction {
	constructor(to, from, value, stepLimit, nid, nonce, version, timestamp, data) {
		super(to, from, value, stepLimit, nid, nonce, version, timestamp);
		this.dataType = 'message';
		this.data = data;
	}
}

export default class MessageTransactionBuilder extends IcxTransactionBuilder {
	constructor(to, from, value, stepLimit, nid, nonce, version, timestamp) {
		super(to, from, value, stepLimit, nid, nonce, version, timestamp);
		this.private = createPrivate();
		this.private(this).data = {};
	}

	data(data) {
		this.private(this).data = data;
		return this;
	}

	build() {
		return new MessageTransaction(
			this.to,
			this.from,
			this.value,
			this.stepLimit,
			this.nid,
			this.nonce,
			this.version,
			this.timestamp,
			this.private(this).data,
		);
	}
}
