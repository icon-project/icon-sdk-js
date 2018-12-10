
const Buffer = require('safe-buffer').Buffer;
const createHash = require('create-hash');
const HmacDRBG = require('drbg.js/hmac');
const messages = require('../messages.json');
const BN = require('./bn');
const ECPoint = require('./ecpoint');
const g = require('./ecpointg');

exports.privateKeyVerify = function (privateKey) {
	const bn = BN.fromBuffer(privateKey);
	return !(bn.isOverflow() || bn.isZero());
};

exports.privateKeyExport = function (privateKey, compressed) {
	const d = BN.fromBuffer(privateKey);
	if (d.isOverflow() || d.isZero()) throw new Error(messages.EC_PRIVATE_KEY_EXPORT_DER_FAIL);

	return g.mul(d).toPublicKey(compressed);
};

exports.privateKeyNegate = function (privateKey) {
	const bn = BN.fromBuffer(privateKey);
	if (bn.isZero()) return Buffer.alloc(32);

	if (bn.ucmp(BN.n) > 0) bn.isub(BN.n);
	return BN.n.sub(bn).toBuffer();
};

exports.privateKeyModInverse = function (privateKey) {
	const bn = BN.fromBuffer(privateKey);
	if (bn.isOverflow() || bn.isZero()) throw new Error(messages.EC_PRIVATE_KEY_RANGE_INVALID);

	return bn.uinvm().toBuffer();
};

exports.privateKeyTweakAdd = function (privateKey, tweak) {
	const bn = BN.fromBuffer(tweak);
	if (bn.isOverflow()) throw new Error(messages.EC_PRIVATE_KEY_TWEAK_ADD_FAIL);

	bn.iadd(BN.fromBuffer(privateKey));
	if (bn.isOverflow()) bn.isub(BN.n);
	if (bn.isZero()) throw new Error(messages.EC_PRIVATE_KEY_TWEAK_ADD_FAIL);

	return bn.toBuffer();
};

exports.privateKeyTweakMul = function (privateKey, tweak) {
	const bn = BN.fromBuffer(tweak);
	if (bn.isOverflow() || bn.isZero()) throw new Error(messages.EC_PRIVATE_KEY_TWEAK_MUL_FAIL);

	const d = BN.fromBuffer(privateKey);
	return bn.umul(d).ureduce().toBuffer();
};

exports.publicKeyCreate = function (privateKey, compressed) {
	const d = BN.fromBuffer(privateKey);
	if (d.isOverflow() || d.isZero()) throw new Error(messages.EC_PUBLIC_KEY_CREATE_FAIL);

	return g.mul(d).toPublicKey(compressed);
};

exports.publicKeyConvert = function (publicKey, compressed) {
	const point = ECPoint.fromPublicKey(publicKey);
	if (point === null) throw new Error(messages.EC_PUBLIC_KEY_PARSE_FAIL);

	return point.toPublicKey(compressed);
};

exports.publicKeyVerify = function (publicKey) {
	return ECPoint.fromPublicKey(publicKey) !== null;
};

exports.publicKeyTweakAdd = function (publicKey, tweak, compressed) {
	const point = ECPoint.fromPublicKey(publicKey);
	if (point === null) throw new Error(messages.EC_PUBLIC_KEY_PARSE_FAIL);

	tweak = BN.fromBuffer(tweak);
	if (tweak.isOverflow()) throw new Error(messages.EC_PUBLIC_KEY_TWEAK_ADD_FAIL);

	return g.mul(tweak).add(point).toPublicKey(compressed);
};

exports.publicKeyTweakMul = function (publicKey, tweak, compressed) {
	const point = ECPoint.fromPublicKey(publicKey);
	if (point === null) throw new Error(messages.EC_PUBLIC_KEY_PARSE_FAIL);

	tweak = BN.fromBuffer(tweak);
	if (tweak.isOverflow() || tweak.isZero()) throw new Error(messages.EC_PUBLIC_KEY_TWEAK_MUL_FAIL);

	return point.mul(tweak).toPublicKey(compressed);
};

exports.publicKeyCombine = function (publicKeys, compressed) {
	const points = new Array(publicKeys.length);
	for (let i = 0; i < publicKeys.length; ++i) {
		points[i] = ECPoint.fromPublicKey(publicKeys[i]);
		if (points[i] === null) throw new Error(messages.EC_PUBLIC_KEY_PARSE_FAIL);
	}

	let point = points[0];
	for (let j = 1; j < points.length; ++j) point = point.add(points[j]);
	if (point.inf) throw new Error(messages.EC_PUBLIC_KEY_COMBINE_FAIL);

	return point.toPublicKey(compressed);
};

exports.signatureNormalize = function (signature) {
	const r = BN.fromBuffer(signature.slice(0, 32));
	const s = BN.fromBuffer(signature.slice(32, 64));
	if (r.isOverflow() || s.isOverflow()) throw new Error(messages.ECDSA_SIGNATURE_PARSE_FAIL);

	const result = Buffer.from(signature);
	if (s.isHigh()) BN.n.sub(s).toBuffer().copy(result, 32);

	return result;
};

exports.signatureExport = function (signature) {
	const r = signature.slice(0, 32);
	const s = signature.slice(32, 64);
	if (BN.fromBuffer(r).isOverflow() || BN.fromBuffer(s).isOverflow()) throw new Error(messages.ECDSA_SIGNATURE_PARSE_FAIL);

	return { r, s };
};

exports.signatureImport = function (sigObj) {
	let r = BN.fromBuffer(sigObj.r);
	if (r.isOverflow()) r = BN.fromNumber(0);

	let s = BN.fromBuffer(sigObj.s);
	if (s.isOverflow()) s = BN.fromNumber(0);

	return Buffer.concat([r.toBuffer(), s.toBuffer()]);
};

exports.sign = function (message, privateKey, noncefn, data) {
	const d = BN.fromBuffer(privateKey);
	if (d.isOverflow() || d.isZero()) throw new Error(messages.ECDSA_SIGN_FAIL);

	if (noncefn === null) {
		const drbg = new HmacDRBG('sha256', privateKey, message, data);
		noncefn = function () { return drbg.generate(32); };
	}

	const bnMessage = BN.fromBuffer(message);
	for (let count = 0; ; ++count) {
		const nonce = noncefn(message, privateKey, null, data, count);
		if (!Buffer.isBuffer(nonce) || nonce.length !== 32) throw new Error(messages.ECDSA_SIGN_FAIL);

		const k = BN.fromBuffer(nonce);
		if (k.isOverflow() || k.isZero()) continue;

		const kp = g.mul(k);
		const r = kp.x.fireduce();
		if (r.isZero()) continue;

		let s = k.uinvm().umul(r.umul(d).ureduce().iadd(bnMessage).fireduce()).ureduce();
		if (s.isZero()) continue;

		let recovery = (kp.x.ucmp(r) !== 0 ? 2 : 0) | (kp.y.isOdd() ? 1 : 0);
		if (s.isHigh()) {
			s = BN.n.sub(s);
			recovery ^= 1;
		}

		return {
			signature: Buffer.concat([r.toBuffer(), s.toBuffer()]),
			recovery,
		};
	}
};

exports.verify = function (message, signature, publicKey) {
	const sigr = BN.fromBuffer(signature.slice(0, 32));
	const sigs = BN.fromBuffer(signature.slice(32, 64));
	if (sigr.isOverflow() || sigs.isOverflow()) throw new Error(messages.ECDSA_SIGNATURE_PARSE_FAIL);

	if (sigs.isHigh() || sigr.isZero() || sigs.isZero()) return false;

	const pub = ECPoint.fromPublicKey(publicKey);
	if (pub === null) throw new Error(messages.EC_PUBLIC_KEY_PARSE_FAIL);

	const sinv = sigs.uinvm();
	const u1 = sinv.umul(BN.fromBuffer(message)).ureduce();
	const u2 = sinv.umul(sigr).ureduce();
	const point = g.mulAdd(u1, pub, u2);
	if (point.inf) return false;

	// return ECPoint.fromECJPoint(point).x.fireduce().ucmp(sigr) === 0
	// Inversion-free
	const z2 = point.z.redSqr();
	if (sigr.redMul(z2).ucmp(point.x) === 0) return true;
	if (sigr.ucmp(BN.psn) >= 0) return false;

	return sigr.iadd(BN.psn).redMul(z2).ucmp(point.x) === 0;
};

exports.recover = function (message, signature, recovery, compressed) {
	const sigr = BN.fromBuffer(signature.slice(0, 32));
	const sigs = BN.fromBuffer(signature.slice(32, 64));
	if (sigr.isOverflow() || sigs.isOverflow()) throw new Error(messages.ECDSA_SIGNATURE_PARSE_FAIL);

	do {
		if (sigr.isZero() || sigs.isZero()) break;

		let kpx = sigr;
		if (recovery >> 1) {
			if (kpx.ucmp(BN.psn) >= 0) break;
			kpx = sigr.add(BN.n);
		}

		const kpPublicKey = Buffer.concat([Buffer.from([0x02 + (recovery & 0x01)]), kpx.toBuffer()]);
		const kp = ECPoint.fromPublicKey(kpPublicKey);
		if (kp === null) break;

		const rInv = sigr.uinvm();
		const s1 = BN.n.sub(BN.fromBuffer(message)).umul(rInv).ureduce();
		const s2 = sigs.umul(rInv).ureduce();
		const point = ECPoint.fromECJPoint(g.mulAdd(s1, kp, s2));
		return point.toPublicKey(compressed);
	} while (false);

	throw new Error(messages.ECDSA_RECOVER_FAIL);
};

exports.ecdh = function (publicKey, privateKey) {
	const shared = exports.ecdhUnsafe(publicKey, privateKey, true);
	return createHash('sha256').update(shared).digest();
};

exports.ecdhUnsafe = function (publicKey, privateKey, compressed) {
	const point = ECPoint.fromPublicKey(publicKey);
	if (point === null) throw new Error(messages.EC_PUBLIC_KEY_PARSE_FAIL);

	const scalar = BN.fromBuffer(privateKey);
	if (scalar.isOverflow() || scalar.isZero()) throw new Error(messages.ECDH_FAIL);

	return point.mul(scalar).toPublicKey(compressed);
};
