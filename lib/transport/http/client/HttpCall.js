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

		try {
			const response = this.httpCall.execute(false);
			return new Response(response, this.converter);
		} catch (error) {
			const errorBody = JSON.parse(error.body);
			const rpcError = new RpcError(errorBody.error.message);
			throw rpcError.toString();
		}
	}

	async callAsync() {
		try {
			const response = await this.httpCall.execute(true);
			return new Response(response.data, this.converter);
		} catch (error) {
			const errorData = error.response.data;
			const rpcError = new RpcError(errorData.error.message);
			throw rpcError.toString();
		}
	}
}
