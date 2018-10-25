/*
 * Copyright 2018 ICON Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { createPrivate } from '../../data/Util';

/**
 * @description Super class 'IcxTransaction' for sending transaction.
 */
export class IcxTransaction {
	constructor(to, from, value, stepLimit, nid, nonce, version, timestamp) {
		this.to = to;
		this.from = from;
		this.value = value;
		this.stepLimit = stepLimit;
		this.nid = nid;
		this.nonce = nonce;
		this.version = version;
		this.timestamp = timestamp;
	}
}

/**
 * @description Builder for 'IcxTransaction' object.
 */
export class IcxTransactionBuilder {
	constructor() {
		this.private = createPrivate();
		this.private(this).to = undefined;
		this.private(this).from = undefined;
		this.private(this).value = undefined;
		this.private(this).stepLimit = undefined;
		this.private(this).nid = undefined;
		this.private(this).nonce = undefined;
		this.private(this).version = undefined;
		this.private(this).timestamp = undefined;
	}

	to(to) {
		this.private(this).to = to;
		return this;
	}

	from(from) {
		this.private(this).from = from;
		return this;
	}

	value(value) {
		this.private(this).value = value;
		return this;
	}

	stepLimit(stepLimit) {
		this.private(this).stepLimit = stepLimit;
		return this;
	}

	nid(nid) {
		this.private(this).nid = nid;
		return this;
	}

	nonce(nonce) {
		this.private(this).nonce = nonce;
		return this;
	}

	version(version) {
		this.private(this).version = version;
		return this;
	}

	timestamp(timestamp) {
		this.private(this).timestamp = timestamp;
		return this;
	}

	build() {
		return new IcxTransaction(
			this.private(this).to,
			this.private(this).from,
			this.private(this).value,
			this.private(this).stepLimit,
			this.private(this).nid,
			this.private(this).nonce,
			this.private(this).version,
			this.private(this).timestamp,
		);
	}
}
