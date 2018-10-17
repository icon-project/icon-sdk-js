/* eslint-disable */

import secp256k1 from 'secp256k1';
// import scryptjs from 'scrypt.js';
import crypto, { randomBytes } from 'crypto';
import uuidv4 from 'uuid/v4';
import { sha3_256 as sha3256, keccak256 } from 'js-sha3';
import signer from './data/Signer';
import { addHxPrefix } from './data/Hexadecimal';
import { isValidPrivateKey, isValidPublicKey } from './data/Util';

function assert(val, msg) {
	if (!val) {
		throw new Error(msg || 'Assertion failed');
	}
}

export default class Wallet {
	constructor(privKey, pubKey) {
		if (privKey && pubKey) {
			throw new Error('Cannot supply both a private and a public key to the constructor');
		}

		if (privKey && !isValidPrivateKey(privKey)) {
			throw new Error('Invalid private key');
		}

		if (pubKey && !isValidPublicKey(pubKey)) {
			throw new Error('Invalid public key');
		}

		this._privKey = privKey;
		this._pubKey = pubKey;
	}

	static create() {
		let privKey;

		do {
			privKey = randomBytes(32);
		} while (!secp256k1.privateKeyVerify(privKey));

		return new Wallet(privKey);
	}

	static loadPrivateKey(privKey) {
		const pkBuffer = new Buffer(privKey, 'hex');
		if (!secp256k1.privateKeyVerify(pkBuffer)) {
			throw new Error('invalid private key');
		}

		return new Wallet(new Buffer(pkBuffer, 'hex'));
	}

	static loadKeystore(keystore, password, nonStrict) {
		if (typeof password !== 'string') {
		    throw new Error('password is not string');
		}

		const json = (typeof keystore === 'object') ? keystore : JSON.parse(nonStrict ? keystore.toLowerCase() : keystore);

		if (json.version !== 3) {
		    throw new Error('Not a V3 wallet');
		}

		let derivedKey;
		let kdfparams;
		if (json.crypto.kdf === 'scrypt') {
		    kdfparams = json.crypto.kdfparams;

		    derivedKey = scryptjs(Buffer.from(password), Buffer.from(kdfparams.salt, 'hex'), kdfparams.n, kdfparams.r, kdfparams.p, kdfparams.dklen);
		} else if (json.crypto.kdf === 'pbkdf2') {
		    kdfparams = json.crypto.kdfparams;

		    if (kdfparams.prf !== 'hmac-sha256') {
		        throw new Error('Unsupported parameters to PBKDF2');
		    }

		    derivedKey = crypto.pbkdf2Sync(Buffer.from(password), Buffer.from(kdfparams.salt, 'hex'), kdfparams.c, kdfparams.dklen, 'sha256');
		} else {
		    throw new Error('Unsupported key derivation scheme');
		}

		const ciphertext = Buffer.from(json.crypto.ciphertext, 'hex');

		const mac = keccak256(Buffer.concat([derivedKey.slice(16, 32), ciphertext]));
		if (mac.toString('hex') !== json.crypto.mac) {
		    throw new Error('Key derivation failed - possibly wrong passphrase');
		}

		const decipher = crypto.createDecipheriv(json.crypto.cipher, derivedKey.slice(0, 16), Buffer.from(json.crypto.cipherparams.iv, 'hex'));
		const seed = Buffer.concat([decipher.update(ciphertext), decipher.final()]);

		return new Wallet(seed);
	}

	store(password, opts) {
		if (!this._privKey) {
		    throw new Error('This is a public key only wallet');
		}

		opts = opts || {};
		const salt = opts.salt || crypto.randomBytes(32);
		const iv = opts.iv || crypto.randomBytes(16);

		let derivedKey;
		const kdf = opts.kdf || 'scrypt';
		const kdfparams = {
		    dklen: opts.dklen || 32,
		    salt: salt.toString('hex'),
		};

		if (kdf === 'scrypt') {
		    kdfparams.n = opts.n || 16384;
		    kdfparams.r = opts.r || 8;
		    kdfparams.p = opts.p || 1;
		    derivedKey = scryptjs(Buffer.from(password), salt, kdfparams.n, kdfparams.r, kdfparams.p, kdfparams.dklen);
		} else if (kdf === 'pbkdf2') {
		    kdfparams.c = opts.c || 16384;
		    kdfparams.prf = 'hmac-sha256';
		    derivedKey = crypto.pbkdf2Sync(Buffer.from(password), salt, kdfparams.c, kdfparams.dklen, 'sha256');
		} else {
		    throw new Error('Unsupported kdf');
		}

		const cipher = crypto.createCipheriv(opts.cipher || 'aes-128-ctr', derivedKey.slice(0, 16), iv);
		if (!cipher) {
		    throw new Error('Unsupported cipher');
		}

		const ciphertext = Buffer.concat([cipher.update(this.privKey), cipher.final()]);

		const mac = keccak256(Buffer.concat([derivedKey.slice(16, 32), Buffer.from(ciphertext, 'hex')]));

		return {
		    version: 3,
		    id: uuidv4({ random: opts.uuid || crypto.randomBytes(16) }),
		    address: this.getAddress(),
		    crypto: {
		        ciphertext: ciphertext.toString('hex'),
		        cipherparams: {
		            iv: iv.toString('hex'),
		        },
		        cipher: opts.cipher || 'aes-128-ctr',
		        kdf,
		        kdfparams,
		        mac: mac.toString('hex'),
		    },
		};
	}

	sign(data) {
		const signature = signer(data, this.privKey);
		const b64encoded = btoa(String.fromCharCode.apply(null, signature));
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

Object.defineProperty(Wallet.prototype, 'privKey', {
	get: function get() {
		if (!this._privKey) {
			throw new Error('This is a public key only wallet');
		}
		return this._privKey;
	},
});

Object.defineProperty(Wallet.prototype, 'pubKey', {
	get: function get() {
		if (!this._pubKey) {
			return secp256k1.publicKeyCreate(this.privKey, false).slice(1);
		}
		return this._pubKey;
	},
});

Object.defineProperty(Wallet.prototype, 'address', {
	get: function get() {
		return addHxPrefix(sha3256(this.pubKey).slice(-40));
	},
});
