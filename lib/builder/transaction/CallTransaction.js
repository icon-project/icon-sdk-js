import { IcxTransaction, IcxTransactionBuilder } from './IcxTransaction';
import { createPrivate } from '../../data/Util';

export class CallTransaction extends IcxTransaction {
	constructor(to, from, value, stepLimit, nid, nonce, version, timestamp, method, params) {
		super(to, from, value, stepLimit, nid, nonce, version, timestamp);
		this.dataType = 'call';
		this.data = { method, params };
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
			this.private(this).to,
			this.private(this).from,
			this.private(this).value,
			this.private(this).stepLimit,
			this.private(this).nid,
			this.private(this).nonce,
			this.private(this).version,
			this.private(this).timestamp,

			this.private(this).method,
			this.private(this).params,
		);
	}
}
