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

import { toRawTransaction } from './data/Converter';
import { serialize, createPrivate } from './data/Util';

function makeSignature(transaction, wallet) {
	const rawTransaction = toRawTransaction(transaction);
	const signature = wallet.sign(serialize(rawTransaction));
	return signature;
}

function createProperties(transaction, wallet) {
	const rawTransaction = toRawTransaction(transaction);
	rawTransaction.signature = makeSignature(transaction, wallet);
	return rawTransaction;
}

/**
 * Class representing the signed transaction object.
 */
export default class SignedTransaction {
	/**
	 * Creates an instance of SignedTransaction.
	 * @param {IcxTransaction|MessageTransaction|CallTransaction|DeployTransaction}
	 * 	transaction - The transaction instance.
	 * @param {Wallet} wallet - The wallet instance.
	 */
	constructor(transaction, wallet) {
		this.private = createPrivate();
		this.private(this).transaction = transaction;
		this.private(this).wallet = wallet;
	}

	/**
	 * Get raw transaction object of this.transaction.
	 * @return {object} The raw transaction object.
	 */
	getRawTransaction() {
		return toRawTransaction(this.private(this).transaction);
	}

	/**
	 * Get signature string.
	 * @return {string} The signature string.
	 */
	getSignature() {
		return makeSignature(this.private(this).transaction, this.private(this).wallet);
	}

	/**
	 * Get properties of signed transaction object
	 * @return {object} The signed transaction object.
	 */
	getProperties() {
		return createProperties(this.private(this).transaction, this.private(this).wallet);
	}
}
