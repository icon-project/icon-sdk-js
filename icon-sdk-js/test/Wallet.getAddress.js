import assert from 'assert';
import IconService from '../build/icon-sdk-js.node.min';

const tests = [{
  privateKey: '38f792b95a5202ab431bfc799f7e1e5c74ec0b9ede5c6142ee7364f2c84d72f6',
  expectedAddress: 'hx902ecb51c109183ace539f247b4ea1347fbf23b5',
}, {
  privateKey: '7271bcada70fda2890708655a249856222daa6a1df581478c9660b2012957245',
  expectedAddress: 'hx7d3d4c743bb82b927ea8a0551a3b9288e722ac84',
}];

describe('Wallet', () => {
  describe('getAddress()', () => {
    tests.forEach((test) => {
      const wallet = IconService.IconWallet.loadPrivateKey(test.privateKey);
      it('should be same', () => {
        assert.strictEqual(wallet.getAddress(), test.expectedAddress);
      });
    });
  });
});
