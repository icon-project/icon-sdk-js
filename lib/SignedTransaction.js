import { toHex } from './data/Converter';
import { serialize } from './data/Util';

export default class SignedTransaction {
	constructor(transaction, wallet) {
		this.transaction = transaction;
		this.wallet = wallet;
		this.properties = this.createProperties();
	}

	// public
	getProperties() {
		return this.properties;
	}

	// private
	createProperties() {
		const rawTransaction = this.toRawTransaction(this.transaction, this.wallet);
		const signature = this.wallet.sign(serialize(rawTransaction));
		rawTransaction.signature = signature;
		return rawTransaction;
	}

	// private
	toRawTransaction() {
		const {
			to,
			from,
			stepLimit,
			nid,
			timestamp,
			dataType,
			data,
		} = this.transaction;

		let {
			value,
			nonce,
			version,
		} = this.transaction;

		value = value || 0;
		nonce = nonce || 1;
		version = version || 3;

		const rawTransaction = {
			to,
			from: from || this.wallet.getAddress(),
			value: toHex(value), // TODO
			stepLimit: toHex(stepLimit), // TODO
			nid: toHex(nid),
			nonce: toHex(nonce),
			version: toHex(version),
			timestamp: toHex(timestamp),
		};

		if (dataType) {
			rawTransaction.dataType = dataType;
		}

		if (['call', 'deploy', 'message'].indexOf(dataType) !== -1 && data) {
			rawTransaction.data = data;
		}

		return rawTransaction;
	}
}
