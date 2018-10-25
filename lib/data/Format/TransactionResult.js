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

import { addHxPrefix, add0xPrefix, addCxPrefix } from '../Hexadecimal';
import { toNumber, toBigNumber } from '../Converter';

export default class TransactionResult {
	constructor(data) {
		this.status = toNumber(data.status);
		this.to = addHxPrefix(data.to);
		this.txHash = add0xPrefix(data.txHash);
		this.txIndex = toNumber(data.txIndex);
		this.blockHeight = toNumber(data.blockHeight);
		this.blockHash = add0xPrefix(data.blockHash);
		this.cumulativeStepUsed = toBigNumber(data.cumulativeStepUsed);
		this.stepUsed = toBigNumber(data.stepUsed);
		this.stepPrice = toBigNumber(data.stepPrice);

		if (data.scoreAddress) {
			this.scoreAddress = addCxPrefix(data.scoreAddress);
		}

		if (data.eventLogs) {
			this.eventLogs = data.eventLogs;
		}

		if (data.logsBloom) {
			this.logsBloom = data.logsBloom;
		}

		if (data.failure) {
			this.failure = data.failure;
		}
	}
}
