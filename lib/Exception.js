const ExceptionCode = {
	0: 'DATA ERROR',
	1: 'FORMAT ERROR',
	2: 'WALLET ERROR',
};

export class Exception {
	constructor(code, message) {
		this.code = code;
		this.message = message;
	}

	toString() {
		return `${this.code}: ${this.message}`;
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
