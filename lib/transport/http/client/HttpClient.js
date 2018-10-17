export default class HttpClient {
	static newCall(httpRequest) {
		return {
			execute() {
				return this.send(httpRequest);
			},

			enqueue(callback) {
				this.sendAsync(httpRequest, callback);
			},

			prepare(req, async) {
				const { xhr: request, url } = req;
				request.open('POST', url, async);
				request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				// TODO 확인 필요
				// request.setRequestHeader('Content-Type', 'application/json');
				// request.withCredentials = true
				return request;
			},

			send(req) {
				const request = this.prepare(req, false);
				const { body } = req;
				request.send(body);
				const response = JSON.parse(request.responseText);
				return response;
			},

			sendAsync(req, callback) {
				const request = this.prepare(req, true);
				request.onreadystatechange = () => {
					if (request.readyState === 4) {
						const response = JSON.parse(request.responseText);
						const error = null;
						callback(error, response);
					}
				};
				const { body } = req;
				request.send(body);
			},
		};
	}
}
