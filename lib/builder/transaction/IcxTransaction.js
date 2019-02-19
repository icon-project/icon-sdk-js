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
 * Super class representing a transaction object for sending transaction.
 */
export class IcxTransaction {
	constructor(to, from, value, stepLimit, nid, nonce, version, timestamp) {
		this.to = to;
		this.from = from;
		this.stepLimit = stepLimit;
		this.nid = nid;
		this.version = version;
		this.timestamp = timestamp;

		if (value) {
			this.value = value;
		}
		if (nonce) {
			this.nonce = nonce;
		}
	}
}

/**
 * Builder for 'IcxTransaction' object.
 */
export class IcxTransactionBuilder {
	/**
	 * Creates an instance of IcxTransactionBuilder.
	 */
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

	/**
	 * Set 'to' property
	 * @param {string} to - The EOA or SCORE address.
	 * @return {IcxTransactionBuilder} this.
	 */
	to(to) {
		this.private(this).to = to;
		return this;
	}

	/**
	 * Set 'from' property
	 * @param {string} from - The EOA address.
	 * @return {IcxTransactionBuilder} this.
	 */
	from(from) {
		this.private(this).from = from;
		return this;
	}

	/**
	 * Set 'value' property
	 * @param {string|BigNumber|number} value - The sending amount of ICX in loop unit.
	 * @return {IcxTransactionBuilder} this.
	 */
	value(value) {
		this.private(this).value = value;
		return this;
	}

	/**
	 * Set 'stepLimit' property
	 * @param {string|BigNumber|number} stepLimit - The step limit.
	 * @return {IcxTransactionBuilder} this.
	 */
	stepLimit(stepLimit) {
		this.private(this).stepLimit = stepLimit;
		return this;
	}

	/**
	 * Set 'nid' property
	 * @param {string|BigNumber|number} nid - The nid (network ID)
	 * @return {IcxTransactionBuilder} this.
	 */
	nid(nid) {
		this.private(this).nid = nid;
		return this;
	}

	/**
	 * Set 'nonce' property
	 * @param {string|BigNumber|number} nonce - The nonce.
	 * @return {IcxTransactionBuilder} this.
	 */
	nonce(nonce) {
		this.private(this).nonce = nonce;
		return this;
	}

	/**
	 * Set 'version' property
	 * @param {string|BigNumber|number} version - The network version.
	 * @return {IcxTransactionBuilder} this.
	 */
	version(version) {
		this.private(this).version = version;
		return this;
	}

	/**
	 * Set 'timestamp' property
	 * @param {string|BigNumber|number} timestamp - The timestamp.
	 * @return {IcxTransactionBuilder} this.
	 */
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
