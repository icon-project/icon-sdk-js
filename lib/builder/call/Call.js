import { createPrivate } from '../../data/Util';

export class Call {
	constructor(to, from, data) {
		this.to = to;
		this.dataType = 'call';
		this.data = data;
		if (from) {
			this.from = from;
		}
	}
}

export class CallBuilder {
	constructor() {
		this.private = createPrivate();
		this.private(this).to = undefined;
		this.private(this).from = undefined;
		this.private(this).data = {};
	}

	to(to) {
		this.private(this).to = to;
		return this;
	}

	from(from) {
		this.private(this).from = from;
		return this;
	}

	method(method) {
		this.private(this).data.method = method;
		return this;
	}

	params(params) {
		this.private(this).data.params = params;
		return this;
	}

	build() {
		return new Call(
			this.private(this).to,
			this.private(this).from,
			this.private(this).data,
		);
	}
}
