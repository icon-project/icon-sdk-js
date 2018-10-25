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

import { toHex } from './data/Converter';
import { serialize, createPrivate } from './data/Util';

function toRawTransaction(transaction, wallet) {
	const {
		to,
		from,
		stepLimit,
		nid,
		version,
		timestamp,
		dataType,
		data,
		value,
		nonce,
	} = transaction;

	const rawTransaction = {
		to,
		from: from || wallet.getAddress(),
		stepLimit: toHex(stepLimit),
		nid: toHex(nid),
		version: toHex(version),
		timestamp: toHex(timestamp),
	};

	if (value) {
		rawTransaction.value = toHex(value);
	}

	if (nonce) {
		rawTransaction.nonce = toHex(nonce);
	}

	if (dataType) {
		rawTransaction.dataType = dataType;
	}

	if (['call', 'deploy', 'message'].indexOf(dataType) !== -1 && data) {
		rawTransaction.data = data;
	}

	return rawTransaction;
}

function makeSignature(transaction, wallet) {
	const rawTransaction = toRawTransaction(transaction, wallet);
	const signature = wallet.sign(serialize(rawTransaction));
	return signature;
}

function createProperties(transaction, wallet) {
	const rawTransaction = toRawTransaction(transaction, wallet);
	rawTransaction.signature = makeSignature(transaction, wallet);
	return rawTransaction;
}

export default class SignedTransaction {
	constructor(transaction, wallet) {
		this.private = createPrivate();
		this.private(this).transaction = transaction;
		this.private(this).wallet = wallet;
		this.private(this).properties = createProperties(transaction, wallet);
	}

	getSignature() {
		return makeSignature(this.private(this).transaction, this.private(this).wallet);
	}

	getProperties() {
		return this.private(this).properties;
	}
}
