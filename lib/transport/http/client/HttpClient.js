import request from 'sync-request';
import requestAsync from 'axios';

export default class HttpRequest {
	static newCall(httpRequest) {
		return {
			execute(async) {
				if (async) {
					return this.sendAsync();
				}

				return this.send();
			},

			send() {
				const { url, body } = httpRequest;
				const response = request('POST', url, {
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
					body,
				});
				return JSON.parse(response.getBody());
			},

			sendAsync() {
				const { url, body } = httpRequest;
				return requestAsync.post(url, body);
			},
		};
	}
}
