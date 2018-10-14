import secp256k1 from 'secp256k1';
import {
	concatTypedArrays,
} from './Util';

export default function sign(data, privKey) {
	const signing = secp256k1.sign(data, privKey);
	const recovery = new Uint8Array(1);
	recovery[0] = signing.recovery;
	const signature = concatTypedArrays(signing.signature, recovery);
	return signature;
}
