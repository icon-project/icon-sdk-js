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

import HttpClient from './client/HttpClient';
import HttpRequest from './client/HttpRequest';
import HttpCall from './client/HttpCall';

/**
 * Class representing HTTP-based provider
 */
export default class HttpProvider {
	/**
	 * Creates an instance of HttpProvider.
	 * @param {string} url - The url of http provider.
	 */
	constructor(url) {
		this.url = url;
	}

	request(request, converter) {
		const body = JSON.stringify(request, (key, value) => {
			if (value) {
				return value;
			}

			return undefined;
		});
		const httpRequest = new HttpRequest(this.url, body);
		return new HttpCall(HttpClient.newCall(httpRequest), converter);
	}
}
