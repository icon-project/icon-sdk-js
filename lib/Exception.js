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

const ExceptionCode = {
	0: 'DATA ERROR',
	1: 'FORMAT ERROR',
	2: 'WALLET ERROR',
	3: 'RPC ERROR',
	4: 'SCORE ERROR',
};

export class Exception {
	constructor(code, message) {
		this.code = code;
		this.message = message;
	}

	toString() {
		return `[${this.code}] ${this.message}`;
	}
}

export class DataError extends Exception {
	constructor(message) {
		super(ExceptionCode[0], message);
	}
}

export class FormatError extends Exception {
	constructor(message) {
		super(ExceptionCode[1], message);
	}
}

export class WalletError extends Exception {
	constructor(message) {
		super(ExceptionCode[2], message);
	}
}

export class RpcError extends Exception {
	constructor(message) {
		super(ExceptionCode[3], message);
	}
}

export class ScoreError extends Exception {
	constructor(message) {
		super(ExceptionCode[4], message);
	}
}
