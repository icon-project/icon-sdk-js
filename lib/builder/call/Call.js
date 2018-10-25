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
 * @description Class 'Call' for calling a SCORE API.
 */
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

/**
 * @description Builder for a 'Call' object.
 */
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
