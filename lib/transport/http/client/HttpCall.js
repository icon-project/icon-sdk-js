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

import Response from '../../jsonrpc/Response';
import { RpcError } from '../../../Exception';

export default class HttpCall {
	constructor(httpCall, converter) {
		this.httpCall = httpCall;
		this.converter = converter;
	}

	execute(async) {
		if (async) {
			return this.callAsync();
		}

		return this.call();
	}

	call() {
		try {
			const response = this.httpCall.execute(false);
			return (new Response(response, this.converter)).result;
		} catch (error) {
			const rpcError = new RpcError(error.message);
			throw rpcError.toString();
		}
	}

	async callAsync() {
		try {
			const response = await this.httpCall.execute(true);
			return (new Response(response.data, this.converter)).result;
		} catch (error) {
			const errorData = error.response.data;
			const rpcError = new RpcError(errorData.error.message);
			throw rpcError.toString();
		}
	}
}
