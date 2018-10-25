const ExceptionCode = {
	0: 'DATA ERROR',
	1: 'FORMAT ERROR',
	2: 'WALLET ERROR',
	3: 'RPC ERROR',
	4: 'SCORE ERROR',
};

export class Exception {
	constructor(code, message) {
		this.code = code;
		this.message = message;
	}

	toString() {
		return `[${this.code}] ${this.message}`;
	}
}

export class DataError extends Exception {
	constructor(message) {
		super(ExceptionCode[0], message);
	}
}

export class FormatError extends Exception {
	constructor(message) {
		super(ExceptionCode[1], message);
	}
}

export class WalletError extends Exception {
	constructor(message) {
		super(ExceptionCode[2], message);
	}
}

export class RpcError extends Exception {
	constructor(message) {
		super(ExceptionCode[3], message);
	}
}

export class ScoreError extends Exception {
	constructor(message) {
		super(ExceptionCode[4], message);
	}
}
