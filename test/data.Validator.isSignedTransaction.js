import assert from 'assert';
import IconService from '../build/icon-sdk-js.node.min';

const wallet = IconService.IconWallet.loadPrivateKey('38f792b95a5202ab431bfc799f7e1e5c74ec0b9ede5c6142ee7364f2c84d72f6');

const tests = [{
	value: new IconService.SignedTransaction({
		to: 'hxd008c05cbc0e689f04a5bb729a66b42377a9a497',
		from: 'hx902ecb51c109183ace539f247b4ea1347fbf23b5',
		value: '0xde0b6b3a7640000',
		stepLimit: '0x186a0',
		nid: '0x3',
		version: '0x3',
		timestamp: '0x57cde1eb6c258',
	}, wallet),
	is: true,
}];

describe('data/Validator', () => {
	describe('isSignedTransaction()', () => {
		tests.forEach((test) => {
			it(`${JSON.stringify(test.value)} is ${test.is}`, () => {
				assert.strictEqual(IconService.IconValidator.isSignedTransaction(test.value), test.is);
			});
		});
	});
});
