import { toHex } from './data/Converter';
import { serialize, createPrivate } from './data/Util';

function toRawTransaction(transaction, wallet) {
	const {
		to,
		from,
		stepLimit,
		nid,
		version,
		timestamp,
		dataType,
		data,
		value,
		nonce,
	} = transaction;

	const rawTransaction = {
		to,
		from: from || wallet.getAddress(),
		stepLimit: toHex(stepLimit),
		nid: toHex(nid),
		version: toHex(version),
		timestamp: toHex(timestamp),
	};

	if (value) {
		rawTransaction.value = toHex(value);
	}

	if (nonce) {
		rawTransaction.nonce = toHex(nonce);
	}

	if (dataType) {
		rawTransaction.dataType = dataType;
	}

	if (['call', 'deploy', 'message'].indexOf(dataType) !== -1 && data) {
		rawTransaction.data = data;
	}

	return rawTransaction;
}

function makeSignature(transaction, wallet) {
	const rawTransaction = toRawTransaction(transaction, wallet);
	const signature = wallet.sign(serialize(rawTransaction));
	return signature;
}

function createProperties(transaction, wallet) {
	const rawTransaction = toRawTransaction(transaction, wallet);
	rawTransaction.signature = makeSignature(transaction, wallet);
	return rawTransaction;
}

export default class SignedTransaction {
	constructor(transaction, wallet) {
		this.private = createPrivate();
		this.private(this).transaction = transaction;
		this.private(this).wallet = wallet;
		this.private(this).properties = createProperties(transaction, wallet);
	}

	getSignature() {
		return makeSignature(this.private(this).transaction, this.private(this).wallet);
	}

	getProperties() {
		return this.private(this).properties;
	}
}
