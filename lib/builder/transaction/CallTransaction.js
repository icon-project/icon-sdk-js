import {
	IcxTransaction,
	IcxTransactionBuilder,
} from './IcxTransaction';
import { createPrivate } from '../../data/Util';

export class CallTransaction extends IcxTransaction {
	constructor(to, from, value, stepLimit, nid, nonce, version, timestamp, method, params) {
		super(to, from, value, stepLimit, nid, nonce, version, timestamp);
		this.dataType = 'call';
		this.method = method;
		this.params = params;
	}
}

export class CallTransactionBuilder extends IcxTransactionBuilder {
	constructor(to, from, value, stepLimit, nid, nonce, version, timestamp) {
		super(to, from, value, stepLimit, nid, nonce, version, timestamp);
		this.private = createPrivate();
		this.private(this).method = undefined;
		this.private(this).params = undefined;
	}

	method(method) {
		this.private(this).method = method;
		return this;
	}

	params(params) {
		this.private(this).params = params;
		return this;
	}

	build() {
		return new CallTransaction(
			this.to,
			this.from,
			this.value,
			this.stepLimit,
			this.nid,
			this.nonce,
			this.version,
			this.timestamp,
			this.private(this).method,
			this.private(this).params,
		);
	}
}
