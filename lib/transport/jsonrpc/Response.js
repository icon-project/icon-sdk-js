export default class Response {
	constructor(response, converter) {
		const { id, result, error } = response;
		this.jsonrpc = '2.0';
		this.id = id;

		if (result) {
			this.result = typeof converter === 'function' ? converter(result) : result;
		}

		if (error) {
			this.error = error;
		}
	}
}
