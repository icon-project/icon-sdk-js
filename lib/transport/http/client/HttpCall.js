import RpcError from '../../../Error';

export default class HttpCall {
	constructor(httpCall, converter) {
		this.httpCall = httpCall;
		this.converter = converter || ((c) => c); // TODO
	}

	execute(callback) {
		const async = !!callback;
		if (!async) {
			const response = this.httpCall.execute();
			const { result, error } = response;
			if (result) {
				return this.converter(result);
			}
			return new RpcError(error);
		}
		this.httpCall.enqueue(callback);
		return true;
	}
}
