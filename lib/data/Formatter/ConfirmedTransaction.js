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

import { addHxPrefix, add0xPrefix } from '../Hexadecimal';
import { toBigNumber, toNumber } from '../Converter';

export default class ConfirmedTransaction {
	constructor(data) {
		this.from = addHxPrefix(data.from);
		this.to = addHxPrefix(data.to);
		this.timestamp = toNumber(data.timestamp);
		this.signature = data.signature;

		const numFields = ['value', 'fee', 'nid', 'stepLimit', 'nonce'];
		numFields.map((numField) => {
			const value = data[numField];
			if (value) {
				this[numField] = toBigNumber(value);
			}
			return true;
		});

		if (data.version && toBigNumber(data.version).gte(3)) {
			this.version = toBigNumber(data.version);
		} else {
			this.version = toBigNumber(2);
		}

		this.txHash = data.tx_hash ? add0xPrefix(data.tx_hash) : add0xPrefix(data.txHash);

		if (data.dataType) {
			this.dataType = data.dataType;
		}
		if (data.data) {
			this.data = data.data;
		}
	}
}
