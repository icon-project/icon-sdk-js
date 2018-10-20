import RpcError from '../../Error';

export default class Response {
	constructor(response, converter) {
		const { id, result, error } = response;
		this.jsonrpc = '2.0';
		this.id = id;
		this.result = typeof converter === 'function' ? converter(result) : result;

		if (error) {
			this.error = new RpcError(error);
		}
	}
}
