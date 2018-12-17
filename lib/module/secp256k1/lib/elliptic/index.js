
const Buffer = require('safe-buffer').Buffer;
const createHash = require('create-hash');
const BN = require('bn.js');
const EC = require('elliptic').ec;

const messages = require('../messages.json');

const ec = new EC('secp256k1');
const ecparams = ec.curve;

// function loadCompressedPublicKey(first, xBuffer) {
// 	let x = new BN(xBuffer);

// 	// overflow
// 	if (x.cmp(ecparams.p) >= 0) return null;
// 	x = x.toRed(ecparams.red);

// 	// compute corresponding Y
// 	let y = x.redSqr().redIMul(x).redIAdd(ecparams.b).redSqrt();
// 	if ((first === 0x03) !== y.isOdd()) y = y.redNeg();

// 	return ec.keyPair({ pub: { x, y } });
// }

// function loadUncompressedPublicKey(first, xBuffer, yBuffer) {
// 	let x = new BN(xBuffer);
// 	let y = new BN(yBuffer);

// 	// overflow
// 	if (x.cmp(ecparams.p) >= 0 || y.cmp(ecparams.p) >= 0) return null;

// 	x = x.toRed(ecparams.red);
// 	y = y.toRed(ecparams.red);

// 	// is odd flag
// 	if ((first === 0x06 || first === 0x07) && y.isOdd() !== (first === 0x07)) return null;

// 	// x*x*x + b = y*y
// 	const x3 = x.redSqr().redIMul(x);
// 	if (!y.redSqr().redISub(x3.redIAdd(ecparams.b)).isZero()) return null;

// 	return ec.keyPair({ pub: { x, y } });
// }

// function loadPublicKey(publicKey) {
// 	const first = publicKey[0];
// 	switch (first) {
// 		case 0x02:
// 		case 0x03:
// 			if (publicKey.length !== 33) return null;
// 			return loadCompressedPublicKey(first, publicKey.slice(1, 33));
// 		case 0x04:
// 		case 0x06:
// 		case 0x07:
// 			if (publicKey.length !== 65) return null;
// 			return loadUncompressedPublicKey(first, publicKey.slice(1, 33), publicKey.slice(33, 65));
// 		default:
// 			return null;
// 	}
// }

function loadCompressedPublicKey(xBuffer) {
	let x = new BN(xBuffer);

	// overflow
	if (x.cmp(ecparams.p) >= 0) return null;
	x = x.toRed(ecparams.red);

	// compute corresponding Y
	let y = x.redSqr().redIMul(x).redIAdd(ecparams.b).redSqrt();

	return ec.keyPair({ pub: { x, y } });
}

function loadUncompressedPublicKey(xBuffer, yBuffer) {
	let x = new BN(xBuffer);
	let y = new BN(yBuffer);

	// overflow
	if (x.cmp(ecparams.p) >= 0 || y.cmp(ecparams.p) >= 0) return null;

	x = x.toRed(ecparams.red);
	y = y.toRed(ecparams.red);

	// x*x*x + b = y*y
	const x3 = x.redSqr().redIMul(x);
	if (!y.redSqr().redISub(x3.redIAdd(ecparams.b)).isZero()) return null;

	return ec.keyPair({ pub: { x, y } });
}

function loadPublicKey(publicKey) {
	if (publicKey.length === 32) {
		return loadCompressedPublicKey(publicKey);
	}
	else if (publicKey.length === 64) {
		return loadUncompressedPublicKey(publicKey.slice(0, 32), publicKey.slice(32, 64));
	}

	return null
}

exports.privateKeyVerify = function (privateKey) {
	const bn = new BN(privateKey);
	return bn.cmp(ecparams.n) < 0 && !bn.isZero();
};

exports.privateKeyExport = function (privateKey, compressed) {
	const d = new BN(privateKey);
	if (d.cmp(ecparams.n) >= 0 || d.isZero()) throw new Error(messages.EC_PRIVATE_KEY_EXPORT_DER_FAIL);

	return Buffer.from(ec.keyFromPrivate(privateKey).getPublic(compressed, true));
};

exports.privateKeyNegate = function (privateKey) {
	const bn = new BN(privateKey);
	return bn.isZero() ? Buffer.alloc(32) : ecparams.n.sub(bn).umod(ecparams.n).toArrayLike(Buffer, 'be', 32);
};

exports.privateKeyModInverse = function (privateKey) {
	const bn = new BN(privateKey);
	if (bn.cmp(ecparams.n) >= 0 || bn.isZero()) throw new Error(messages.EC_PRIVATE_KEY_RANGE_INVALID);

	return bn.invm(ecparams.n).toArrayLike(Buffer, 'be', 32);
};

exports.privateKeyTweakAdd = function (privateKey, tweak) {
	const bn = new BN(tweak);
	if (bn.cmp(ecparams.n) >= 0) throw new Error(messages.EC_PRIVATE_KEY_TWEAK_ADD_FAIL);

	bn.iadd(new BN(privateKey));
	if (bn.cmp(ecparams.n) >= 0) bn.isub(ecparams.n);
	if (bn.isZero()) throw new Error(messages.EC_PRIVATE_KEY_TWEAK_ADD_FAIL);

	return bn.toArrayLike(Buffer, 'be', 32);
};

exports.privateKeyTweakMul = function (privateKey, tweak) {
	let bn = new BN(tweak);
	if (bn.cmp(ecparams.n) >= 0 || bn.isZero()) throw new Error(messages.EC_PRIVATE_KEY_TWEAK_MUL_FAIL);

	bn.imul(new BN(privateKey));
	if (bn.cmp(ecparams.n)) bn = bn.umod(ecparams.n);

	return bn.toArrayLike(Buffer, 'be', 32);
};

exports.publicKeyCreate = function (privateKey, compressed) {
	const d = new BN(privateKey);
	if (d.cmp(ecparams.n) >= 0 || d.isZero()) throw new Error(messages.EC_PUBLIC_KEY_CREATE_FAIL);

	return Buffer.from(ec.keyFromPrivate(privateKey).getPublic(compressed, true));
};

exports.publicKeyConvert = function (publicKey, compressed) {
	const pair = loadPublicKey(publicKey);
	if (pair === null) throw new Error(messages.EC_PUBLIC_KEY_PARSE_FAIL);

	return Buffer.from(pair.getPublic(compressed, true));
};

exports.publicKeyVerify = function (publicKey) {
	return loadPublicKey(publicKey) !== null;
};

exports.publicKeyTweakAdd = function (publicKey, tweak, compressed) {
	const pair = loadPublicKey(publicKey);
	if (pair === null) throw new Error(messages.EC_PUBLIC_KEY_PARSE_FAIL);

	tweak = new BN(tweak);
	if (tweak.cmp(ecparams.n) >= 0) throw new Error(messages.EC_PUBLIC_KEY_TWEAK_ADD_FAIL);

	return Buffer.from(ecparams.g.mul(tweak).add(pair.pub).encode(true, compressed));
};

exports.publicKeyTweakMul = function (publicKey, tweak, compressed) {
	const pair = loadPublicKey(publicKey);
	if (pair === null) throw new Error(messages.EC_PUBLIC_KEY_PARSE_FAIL);

	tweak = new BN(tweak);
	if (tweak.cmp(ecparams.n) >= 0 || tweak.isZero()) throw new Error(messages.EC_PUBLIC_KEY_TWEAK_MUL_FAIL);

	return Buffer.from(pair.pub.mul(tweak).encode(true, compressed));
};

exports.publicKeyCombine = function (publicKeys, compressed) {
	const pairs = new Array(publicKeys.length);
	for (let i = 0; i < publicKeys.length; ++i) {
		pairs[i] = loadPublicKey(publicKeys[i]);
		if (pairs[i] === null) throw new Error(messages.EC_PUBLIC_KEY_PARSE_FAIL);
	}

	let point = pairs[0].pub;
	for (let j = 1; j < pairs.length; ++j) point = point.add(pairs[j].pub);
	if (point.isInfinity()) throw new Error(messages.EC_PUBLIC_KEY_COMBINE_FAIL);

	return Buffer.from(point.encode(true, compressed));
};

exports.signatureNormalize = function (signature) {
	const r = new BN(signature.slice(0, 32));
	const s = new BN(signature.slice(32, 64));
	if (r.cmp(ecparams.n) >= 0 || s.cmp(ecparams.n) >= 0) throw new Error(messages.ECDSA_SIGNATURE_PARSE_FAIL);

	const result = Buffer.from(signature);
	if (s.cmp(ec.nh) === 1) ecparams.n.sub(s).toArrayLike(Buffer, 'be', 32).copy(result, 32);

	return result;
};

exports.signatureExport = function (signature) {
	const r = signature.slice(0, 32);
	const s = signature.slice(32, 64);
	if (new BN(r).cmp(ecparams.n) >= 0 || new BN(s).cmp(ecparams.n) >= 0) throw new Error(messages.ECDSA_SIGNATURE_PARSE_FAIL);

	return { r, s };
};

exports.signatureImport = function (sigObj) {
	let r = new BN(sigObj.r);
	if (r.cmp(ecparams.n) >= 0) r = new BN(0);

	let s = new BN(sigObj.s);
	if (s.cmp(ecparams.n) >= 0) s = new BN(0);

	return Buffer.concat([
		r.toArrayLike(Buffer, 'be', 32),
		s.toArrayLike(Buffer, 'be', 32),
	]);
};

exports.sign = function (message, privateKey, noncefn, data) {
	if (typeof noncefn === 'function') {
		const getNonce = noncefn;
		noncefn = function (counter) {
			const nonce = getNonce(message, privateKey, null, data, counter);
			if (!Buffer.isBuffer(nonce) || nonce.length !== 32) throw new Error(messages.ECDSA_SIGN_FAIL);

			return new BN(nonce);
		};
	}

	const d = new BN(privateKey);
	if (d.cmp(ecparams.n) >= 0 || d.isZero()) throw new Error(messages.ECDSA_SIGN_FAIL);

	const result = ec.sign(message, privateKey, { canonical: true, k: noncefn, pers: data });
	return {
		signature: Buffer.concat([
			result.r.toArrayLike(Buffer, 'be', 32),
			result.s.toArrayLike(Buffer, 'be', 32),
		]),
		recovery: result.recoveryParam,
	};
};

exports.verify = function (message, signature, publicKey) {
	const sigObj = { r: signature.slice(0, 32), s: signature.slice(32, 64) };

	const sigr = new BN(sigObj.r);
	const sigs = new BN(sigObj.s);
	if (sigr.cmp(ecparams.n) >= 0 || sigs.cmp(ecparams.n) >= 0) throw new Error(messages.ECDSA_SIGNATURE_PARSE_FAIL);
	if (sigs.cmp(ec.nh) === 1 || sigr.isZero() || sigs.isZero()) return false;

	const pair = loadPublicKey(publicKey);
	if (pair === null) throw new Error(messages.EC_PUBLIC_KEY_PARSE_FAIL);

	return ec.verify(message, sigObj, { x: pair.pub.x, y: pair.pub.y });
};

exports.recover = function (message, signature, recovery, compressed) {
	const sigObj = { r: signature.slice(0, 32), s: signature.slice(32, 64) };

	const sigr = new BN(sigObj.r);
	const sigs = new BN(sigObj.s);
	if (sigr.cmp(ecparams.n) >= 0 || sigs.cmp(ecparams.n) >= 0) throw new Error(messages.ECDSA_SIGNATURE_PARSE_FAIL);

	try {
		if (sigr.isZero() || sigs.isZero()) throw new Error();

		const point = ec.recoverPubKey(message, sigObj, recovery);
		return Buffer.from(point.encode(true, compressed));
	} catch (err) {
		throw new Error(messages.ECDSA_RECOVER_FAIL);
	}
};

exports.ecdh = function (publicKey, privateKey) {
	const shared = exports.ecdhUnsafe(publicKey, privateKey, true);
	return createHash('sha256').update(shared).digest();
};

exports.ecdhUnsafe = function (publicKey, privateKey, compressed) {
	const pair = loadPublicKey(publicKey);
	if (pair === null) throw new Error(messages.EC_PUBLIC_KEY_PARSE_FAIL);

	const scalar = new BN(privateKey);
	if (scalar.cmp(ecparams.n) >= 0 || scalar.isZero()) throw new Error(messages.ECDH_FAIL);

	return Buffer.from(pair.pub.mul(scalar).encode(true, compressed));
};
