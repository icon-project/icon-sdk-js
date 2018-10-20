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
		this.private(this).data = undefined;
	}

	data(data) {
		this.private(this).data = data;
		return this;
	}

	build() {
		return new MessageTransaction(
			this.private(this).to,
			this.private(this).from,
			this.private(this).value,
			this.private(this).stepLimit,
			this.private(this).nid,
			this.private(this).nonce,
			this.private(this).version,
			this.private(this).timestamp,

			this.private(this).data,
		);
	}
}
