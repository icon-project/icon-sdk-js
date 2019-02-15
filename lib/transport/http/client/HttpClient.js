/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable prefer-destructuring */

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

import { NetworkError } from '../../../Exception';

const { XMLHttpRequest } = require('../../../module/node.js');

export default class HttpRequest {
	static newCall(httpRequest) {
		return {

			execute() {
				return this.sendAsync();
			},

			sendAsync() {
				const { url, body } = httpRequest;
				return new Promise((resolve, reject) => {
					const req = new XMLHttpRequest();
					req.open('POST', url, true);
					req.onload = () => {
						if (req.status === 200) {
							resolve(JSON.parse(req.responseText));
						} else {
							reject(JSON.parse(req.responseText));
						}
					};
					req.onerror = () => {
						const error = new NetworkError(req.responseText);
						reject(error.toString());
					};
					req.send(body);
				});
			},
		};
	}
}
