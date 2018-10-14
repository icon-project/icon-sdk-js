import secp256k1 from 'secp256k1';
import { randomBytes } from 'crypto';
import { sha3_256 as sha3256 } from 'js-sha3';
import sign from './data/Signer';
import { addHxPrefix } from './data/Hexadecimal';

export default class Wallet {
	constructor(privKey) {
		this.privKey = privKey;
		this.pubKey = secp256k1.publicKeyCreate(this.privKey, false).slice(1);
		this.address = addHxPrefix(sha3256(this.pubKey).slice(-40));
	}

	static create() {
		let privKey;

		do {
			privKey = randomBytes(32);
		} while (!secp256k1.privateKeyVerify(privKey));

		return new Wallet(privKey);
	}

	static loadPrivateKey(privKey) {
		const pkBuffer = Buffer.from(privKey, 'hex');
		if (!secp256k1.privateKeyVerify(pkBuffer)) {
			throw new Error('invalid private key');
		}

		return new Wallet(Buffer.from(pkBuffer, 'hex'));
	}

	static loadKeystore() {

	}

	// store() {

	// }

	sign(data) {
		const signature = sign(data, this.privKey);
		const b64encoded = Buffer.from(String.fromCharCode.apply(null, signature), 'base64');
		return b64encoded;
	}

	getPrivateKey() {
		return this.privKey.toString('hex');
	}

	getPublicKey() {
		return this.pubKey.toString('hex');
	}

	getAddress() {
		return this.address;
	}
}
