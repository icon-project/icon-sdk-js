/*
 * Copyright 2018 ICON Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import secp256k1 from 'secp256k1';
import { isHex, isBigNumber } from './Type';
import { hasProperties } from './Util';
import { toNumber } from './Converter';

export function isPrivateKey(privKey) {
	return secp256k1.privateKeyVerify(Buffer.from(privKey, 'hex'));
}

export function isPublicKey(pubKey) {
	return secp256k1.privateKeyVerify(Buffer.from(pubKey, 'hex'));
}

export function isEoaAddress(address) {
	return /^(hx)[0-9a-f]{40}$/i.test(address);
}

export function isScoreAddress(address) {
	return /^(cx)[0-9a-f]{40}$/i.test(address);
}

export function isAddress(address) {
	if (isEoaAddress(address) || isScoreAddress(address)) {
		return true;
	}

	return false;
}

export function isBlockNumber(value) {
	try {
		if (isBigNumber(value)) {
			const number = toNumber(value);
			return number >= 0 && number < 2 ** 256;
		}
		throw new Error('not block number');
	} catch (e) {
		return false;
	}
}

export function isBlockHash(value) {
	return /^(0x)[0-9a-f]{64}$/i.test(value);
}

export function isPredefinedBlockValue(value) {
	return value === 'latest';
}

export function isSignedTransactionHash(hash) {
	return /^(0x)[0-9a-f]{64}$/i.test(hash);
}

export function isCall(call) {
	return hasProperties(call, ['to', 'data', 'dataType'])
        && hasProperties(call.data, ['method'])
        && isScoreAddress(call.to)
        && call.dataType === 'call';
}

export function checkDataInTransaction(transaction) {
	switch (transaction.dataType) {
		case 'call': {
			return Object.prototype.hasOwnProperty.call(transaction, 'data')
                && hasProperties(transaction.data, ['method']);
		}
		case 'deploy': {
			return Object.prototype.hasOwnProperty.call(transaction, 'data')
                && hasProperties(transaction.data, ['contentType', 'content'])
                && isHex(transaction.data.content);
		}
		case 'message': {
			return Object.prototype.hasOwnProperty.call(transaction, 'data')
                && isHex(transaction.data);
		}
		default: {
			return Object.prototype.hasOwnProperty.call(transaction, 'value')
                && isHex(transaction.value);
		}
	}
}

export function isSignedTransaction(signedTransaction) {
	const transaction = signedTransaction.getProperties();
	if (!hasProperties(transaction, ['to', 'from', 'stepLimit', 'nid', 'version', 'timestamp', 'signature'])
        || !isAddress(transaction.to)
        || !isAddress(transaction.from)
        || !isHex(transaction.stepLimit)
        || !isHex(transaction.nid)
        || !isHex(transaction.version)
        || !isHex(transaction.timestamp)) {
		return false;
	}

	if (!checkDataInTransaction(transaction)) {
		return false;
	}

	return true;
}
