
const assert = require('./assert');
const der = require('./der');
const messages = require('./messages.json');

function initCompressedValue(value, defaultValue) {
	if (value === undefined) return defaultValue;

	assert.isBoolean(value, messages.COMPRESSED_TYPE_INVALID);
	return value;
}

module.exports = function (secp256k1) {
	return {
		privateKeyVerify(privateKey) {
			assert.isBuffer(privateKey, messages.EC_PRIVATE_KEY_TYPE_INVALID);
			return privateKey.length === 32 && secp256k1.privateKeyVerify(privateKey);
		},

		privateKeyExport(privateKey, compressed) {
			assert.isBuffer(privateKey, messages.EC_PRIVATE_KEY_TYPE_INVALID);
			assert.isBufferLength(privateKey, 32, messages.EC_PRIVATE_KEY_LENGTH_INVALID);

			compressed = initCompressedValue(compressed, true);
			const publicKey = secp256k1.privateKeyExport(privateKey, compressed);

			return der.privateKeyExport(privateKey, publicKey, compressed);
		},

		privateKeyImport(privateKey) {
			assert.isBuffer(privateKey, messages.EC_PRIVATE_KEY_TYPE_INVALID);

			privateKey = der.privateKeyImport(privateKey);
			if (privateKey && privateKey.length === 32 && secp256k1.privateKeyVerify(privateKey)) return privateKey;

			throw new Error(messages.EC_PRIVATE_KEY_IMPORT_DER_FAIL);
		},

		privateKeyNegate(privateKey) {
			assert.isBuffer(privateKey, messages.EC_PRIVATE_KEY_TYPE_INVALID);
			assert.isBufferLength(privateKey, 32, messages.EC_PRIVATE_KEY_LENGTH_INVALID);

			return secp256k1.privateKeyNegate(privateKey);
		},

		privateKeyModInverse(privateKey) {
			assert.isBuffer(privateKey, messages.EC_PRIVATE_KEY_TYPE_INVALID);
			assert.isBufferLength(privateKey, 32, messages.EC_PRIVATE_KEY_LENGTH_INVALID);

			return secp256k1.privateKeyModInverse(privateKey);
		},

		privateKeyTweakAdd(privateKey, tweak) {
			assert.isBuffer(privateKey, messages.EC_PRIVATE_KEY_TYPE_INVALID);
			assert.isBufferLength(privateKey, 32, messages.EC_PRIVATE_KEY_LENGTH_INVALID);

			assert.isBuffer(tweak, messages.TWEAK_TYPE_INVALID);
			assert.isBufferLength(tweak, 32, messages.TWEAK_LENGTH_INVALID);

			return secp256k1.privateKeyTweakAdd(privateKey, tweak);
		},

		privateKeyTweakMul(privateKey, tweak) {
			assert.isBuffer(privateKey, messages.EC_PRIVATE_KEY_TYPE_INVALID);
			assert.isBufferLength(privateKey, 32, messages.EC_PRIVATE_KEY_LENGTH_INVALID);

			assert.isBuffer(tweak, messages.TWEAK_TYPE_INVALID);
			assert.isBufferLength(tweak, 32, messages.TWEAK_LENGTH_INVALID);

			return secp256k1.privateKeyTweakMul(privateKey, tweak);
		},

		publicKeyCreate(privateKey, compressed) {
			assert.isBuffer(privateKey, messages.EC_PRIVATE_KEY_TYPE_INVALID);
			assert.isBufferLength(privateKey, 32, messages.EC_PRIVATE_KEY_LENGTH_INVALID);

			compressed = initCompressedValue(compressed, true);

			return secp256k1.publicKeyCreate(privateKey, compressed);
		},

		publicKeyConvert(publicKey, compressed) {
			assert.isBuffer(publicKey, messages.EC_PUBLIC_KEY_TYPE_INVALID);
			assert.isBufferLength2(publicKey, 33, 65, messages.EC_PUBLIC_KEY_LENGTH_INVALID);

			compressed = initCompressedValue(compressed, true);

			return secp256k1.publicKeyConvert(publicKey, compressed);
		},

		publicKeyVerify(publicKey) {
			assert.isBuffer(publicKey, messages.EC_PUBLIC_KEY_TYPE_INVALID);
			return secp256k1.publicKeyVerify(publicKey);
		},

		publicKeyTweakAdd(publicKey, tweak, compressed) {
			assert.isBuffer(publicKey, messages.EC_PUBLIC_KEY_TYPE_INVALID);
			assert.isBufferLength2(publicKey, 33, 65, messages.EC_PUBLIC_KEY_LENGTH_INVALID);

			assert.isBuffer(tweak, messages.TWEAK_TYPE_INVALID);
			assert.isBufferLength(tweak, 32, messages.TWEAK_LENGTH_INVALID);

			compressed = initCompressedValue(compressed, true);

			return secp256k1.publicKeyTweakAdd(publicKey, tweak, compressed);
		},

		publicKeyTweakMul(publicKey, tweak, compressed) {
			assert.isBuffer(publicKey, messages.EC_PUBLIC_KEY_TYPE_INVALID);
			assert.isBufferLength2(publicKey, 33, 65, messages.EC_PUBLIC_KEY_LENGTH_INVALID);

			assert.isBuffer(tweak, messages.TWEAK_TYPE_INVALID);
			assert.isBufferLength(tweak, 32, messages.TWEAK_LENGTH_INVALID);

			compressed = initCompressedValue(compressed, true);

			return secp256k1.publicKeyTweakMul(publicKey, tweak, compressed);
		},

		publicKeyCombine(publicKeys, compressed) {
			assert.isArray(publicKeys, messages.EC_PUBLIC_KEYS_TYPE_INVALID);
			assert.isLengthGTZero(publicKeys, messages.EC_PUBLIC_KEYS_LENGTH_INVALID);
			for (let i = 0; i < publicKeys.length; ++i) {
				assert.isBuffer(publicKeys[i], messages.EC_PUBLIC_KEY_TYPE_INVALID);
				assert.isBufferLength2(publicKeys[i], 33, 65, messages.EC_PUBLIC_KEY_LENGTH_INVALID);
			}

			compressed = initCompressedValue(compressed, true);

			return secp256k1.publicKeyCombine(publicKeys, compressed);
		},

		signatureNormalize(signature) {
			assert.isBuffer(signature, messages.ECDSA_SIGNATURE_TYPE_INVALID);
			assert.isBufferLength(signature, 64, messages.ECDSA_SIGNATURE_LENGTH_INVALID);

			return secp256k1.signatureNormalize(signature);
		},

		signatureExport(signature) {
			assert.isBuffer(signature, messages.ECDSA_SIGNATURE_TYPE_INVALID);
			assert.isBufferLength(signature, 64, messages.ECDSA_SIGNATURE_LENGTH_INVALID);

			const sigObj = secp256k1.signatureExport(signature);
			return der.signatureExport(sigObj);
		},

		signatureImport(sig) {
			assert.isBuffer(sig, messages.ECDSA_SIGNATURE_TYPE_INVALID);
			assert.isLengthGTZero(sig, messages.ECDSA_SIGNATURE_LENGTH_INVALID);

			const sigObj = der.signatureImport(sig);
			if (sigObj) return secp256k1.signatureImport(sigObj);

			throw new Error(messages.ECDSA_SIGNATURE_PARSE_DER_FAIL);
		},

		signatureImportLax(sig) {
			assert.isBuffer(sig, messages.ECDSA_SIGNATURE_TYPE_INVALID);
			assert.isLengthGTZero(sig, messages.ECDSA_SIGNATURE_LENGTH_INVALID);

			const sigObj = der.signatureImportLax(sig);
			if (sigObj) return secp256k1.signatureImport(sigObj);

			throw new Error(messages.ECDSA_SIGNATURE_PARSE_DER_FAIL);
		},

		sign(message, privateKey, options) {
			assert.isBuffer(message, messages.MSG32_TYPE_INVALID);
			assert.isBufferLength(message, 32, messages.MSG32_LENGTH_INVALID);

			assert.isBuffer(privateKey, messages.EC_PRIVATE_KEY_TYPE_INVALID);
			assert.isBufferLength(privateKey, 32, messages.EC_PRIVATE_KEY_LENGTH_INVALID);

			let data = null;
			let noncefn = null;
			if (options !== undefined) {
				assert.isObject(options, messages.OPTIONS_TYPE_INVALID);

				if (options.data !== undefined) {
					assert.isBuffer(options.data, messages.OPTIONS_DATA_TYPE_INVALID);
					assert.isBufferLength(options.data, 32, messages.OPTIONS_DATA_LENGTH_INVALID);
					data = options.data;
				}

				if (options.noncefn !== undefined) {
					assert.isFunction(options.noncefn, messages.OPTIONS_NONCEFN_TYPE_INVALID);
					noncefn = options.noncefn;
				}
			}

			return secp256k1.sign(message, privateKey, noncefn, data);
		},

		verify(message, signature, publicKey) {
			assert.isBuffer(message, messages.MSG32_TYPE_INVALID);
			assert.isBufferLength(message, 32, messages.MSG32_LENGTH_INVALID);

			assert.isBuffer(signature, messages.ECDSA_SIGNATURE_TYPE_INVALID);
			assert.isBufferLength(signature, 64, messages.ECDSA_SIGNATURE_LENGTH_INVALID);

			assert.isBuffer(publicKey, messages.EC_PUBLIC_KEY_TYPE_INVALID);
			assert.isBufferLength2(publicKey, 33, 65, messages.EC_PUBLIC_KEY_LENGTH_INVALID);

			return secp256k1.verify(message, signature, publicKey);
		},

		recover(message, signature, recovery, compressed) {
			assert.isBuffer(message, messages.MSG32_TYPE_INVALID);
			assert.isBufferLength(message, 32, messages.MSG32_LENGTH_INVALID);

			assert.isBuffer(signature, messages.ECDSA_SIGNATURE_TYPE_INVALID);
			assert.isBufferLength(signature, 64, messages.ECDSA_SIGNATURE_LENGTH_INVALID);

			assert.isNumber(recovery, messages.RECOVERY_ID_TYPE_INVALID);
			assert.isNumberInInterval(recovery, -1, 4, messages.RECOVERY_ID_VALUE_INVALID);

			compressed = initCompressedValue(compressed, true);

			return secp256k1.recover(message, signature, recovery, compressed);
		},

		ecdh(publicKey, privateKey) {
			assert.isBuffer(publicKey, messages.EC_PUBLIC_KEY_TYPE_INVALID);
			assert.isBufferLength2(publicKey, 33, 65, messages.EC_PUBLIC_KEY_LENGTH_INVALID);

			assert.isBuffer(privateKey, messages.EC_PRIVATE_KEY_TYPE_INVALID);
			assert.isBufferLength(privateKey, 32, messages.EC_PRIVATE_KEY_LENGTH_INVALID);

			return secp256k1.ecdh(publicKey, privateKey);
		},

		ecdhUnsafe(publicKey, privateKey, compressed) {
			assert.isBuffer(publicKey, messages.EC_PUBLIC_KEY_TYPE_INVALID);
			assert.isBufferLength2(publicKey, 33, 65, messages.EC_PUBLIC_KEY_LENGTH_INVALID);

			assert.isBuffer(privateKey, messages.EC_PRIVATE_KEY_TYPE_INVALID);
			assert.isBufferLength(privateKey, 32, messages.EC_PRIVATE_KEY_LENGTH_INVALID);

			compressed = initCompressedValue(compressed, true);

			return secp256k1.ecdhUnsafe(publicKey, privateKey, compressed);
		},
	};
};
