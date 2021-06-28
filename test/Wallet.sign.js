import assert from 'assert';
import IconService from '../build/icon-sdk-js.node.min';

const tests = [{
  wallet: IconService.IconWallet.loadPrivateKey('38f792b95a5202ab431bfc799f7e1e5c74ec0b9ede5c6142ee7364f2c84d72f6'),
  value: 'ba4da77c1dbf48071fbd3f9ee6d869580d177f01468e1e42bbb58733b9087f64',
  signature: '4RYSXFpcyLMg3g7ZBT3MnLQcRA3ma5CIpgQEGD8isqJPku/YnAIhJq7q8iy7+mvgni7CBX4otwuhfQLKRQ5RngE=',
}];

describe('Wallet', () => {
  describe('sign()', () => {
    tests.forEach((test) => {
      it('should return the right value', () => {
        assert.strictEqual(test.wallet.sign(test.value), test.signature);
      });
    });
  });
});
