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
		this.version = toBigNumber(data.version);
		this.from = addHxPrefix(data.from);
		this.to = addHxPrefix(data.to);
		this.value = toBigNumber(data.value);
		this.stepLimit = toBigNumber(data.stepLimit);
		this.timestamp = toNumber(data.timestamp);
		this.nid = toBigNumber(data.nid);
		this.nonce = toBigNumber(data.nonce);
		this.txHash = add0xPrefix(data.txHash);
		this.signature = data.signature;

		if (data.dataType) {
			this.dataType = data.dataType;
		}
		if (data.data) {
			this.data = data.data;
		}
	}
}
