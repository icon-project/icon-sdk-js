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

import { IcxTransaction, IcxTransactionBuilder } from './IcxTransaction';
import { createPrivate } from '../../data/Util';

/**
 * @description Subclass 'CallTransaction',
 * making a transaction object for calling a method in SCORE.
 */
export class CallTransaction extends IcxTransaction {
	constructor(to, from, value, stepLimit, nid, nonce, version, timestamp, method, params) {
		super(to, from, value, stepLimit, nid, nonce, version, timestamp);
		this.dataType = 'call';
		this.data = { method, params };
	}
}

/**
 * @description Builder for 'CallTransaction' object.
 */
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
