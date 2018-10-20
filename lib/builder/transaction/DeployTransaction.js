import {
	IcxTransaction,
	IcxTransactionBuilder,
} from './IcxTransaction';
import { createPrivate } from '../../data/Util';

// TODO optional 인 것들 체크
class DeployTransaction extends IcxTransaction {
	constructor(
		to, from, value, stepLimit, nid, nonce,
		version, timestamp, contentType, content, params,
	) {
		super(to, from, value, stepLimit, nid, nonce, version, timestamp);
		this.dataType = 'deploy';
		this.data = { contentType, content, params };
	}
}

export default class DeployTransactionBuilder extends IcxTransactionBuilder {
	constructor(to, from, value, stepLimit, nid, nonce, version, timestamp) {
		super(to, from, value, stepLimit, nid, nonce, version, timestamp);
		this.private = createPrivate();
		this.private(this).contentType = undefined;
		this.private(this).content = undefined;
		this.private(this).params = undefined;
	}

	contentType(contentType) {
		this.private(this).contentType = contentType;
		return this;
	}

	content(content) {
		this.private(this).content = content;
		return this;
	}

	params(params) {
		this.private(this).params = params;
		return this;
	}

	build() {
		return new DeployTransaction(
			this.private(this).to,
			this.private(this).from,
			this.private(this).value,
			this.private(this).stepLimit,
			this.private(this).nid,
			this.private(this).nonce,
			this.private(this).version,
			this.private(this).timestamp,

			this.private(this).contentType,
			this.private(this).content,
			this.private(this).params,
		);
	}
}
