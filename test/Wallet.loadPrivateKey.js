import assert from 'assert';
import { IconWallet } from '..';

const testPrivateKey = '38f792b95a5202ab431bfc799f7e1e5c74ec0b9ede5c6142ee7364f2c84d72f6';
const testWallet = IconWallet.loadPrivateKey(testPrivateKey);
const expectedAddress = 'hx902ecb51c109183ace539f247b4ea1347fbf23b5';

describe('Wallet', () => {
	describe('loadPrivateKey()', () => {
		it('should be same', () => {
			assert.strictEqual(testWallet.getAddress(), expectedAddress);
		});
	});
});
