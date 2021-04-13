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
 * Subclass making a transaction object for depositing to SCORE.
 * @extends {IcxTransaction}
 */
class DepositTransaction extends IcxTransaction {
	constructor(
		to, from, value, stepLimit, nid, nonce,
		version, timestamp, action, id,
	) {
		super(to, from, value, stepLimit, nid, nonce, version, timestamp);
		this.dataType = 'deposit';
		this.data = { action };
		if (id) {
			this.data.id = id;
		}
	}
}

/**
 * Builder for 'DepositTransaction' object.
 * @extends {IcxTransactionBuilder}
 */
export default class DepositTransactionBuilder extends IcxTransactionBuilder {
	/**
	 * Creates an instance of DepositTransactionBuilder.
	 */
	constructor(to, from, value, stepLimit, nid, nonce, version, timestamp) {
		super(to, from, value, stepLimit, nid, nonce, version, timestamp);
		this.private = createPrivate();
		this.private(this).action = undefined;
		this.private(this).id = undefined;
	}

	/**
	 * Set 'action' property
	 * @param {string} action - add | withdraw
	 * @return {DepositTransactionBuilder} this.
	 */
	action(action) {
		this.private(this).action = action;
		return this;
	}

	/**
	 * Set 'id' property
	 * @param {string} id - Identifier of deposit to withdraw
	 * @return {DepositTransactionBuilder} this.
	 */
	id(id) {
		this.private(this).id = id;
		return this;
	}

	/**
	 * Build 'DepositTransaction' object
	 * @return {DepositTransaction} 'DepositTransaction'
	 * instance exported by 'DepositTransactionBuilder'
	 */
	build() {
		return new DepositTransaction(
			this.private(this).to,
			this.private(this).from,
			this.private(this).value,
			this.private(this).stepLimit,
			this.private(this).nid,
			this.private(this).nonce,
			this.private(this).version,
			this.private(this).timestamp,

			this.private(this).action,
			this.private(this).id,
		);
	}
}
