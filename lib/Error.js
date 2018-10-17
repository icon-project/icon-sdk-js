export default class RpcError {
	constructor(error) {
		this.code = error.code;
		this.message = error.message;
	}

	toString() {
		return `${this.message} (${this.code})`;
	}
}
