import assert from 'assert';
import IconService from '../build/icon-sdk-js.node.min';

const tests = [{
  privateKey: '38f792b95a5202ab431bfc799f7e1e5c74ec0b9ede5c6142ee7364f2c84d72f6',
  expectedPublicKey: 'f87740e3dce5b834b61b6d02f0c3c28dd02ba203cf57fd004eaeb92468d693de76772963c00d255f8371420f3e172444d106847b03b92fc5706a9531f2cf522e',
}, {
  privateKey: '7271bcada70fda2890708655a249856222daa6a1df581478c9660b2012957245',
  expectedPublicKey: '0f2c63cefc52198bc53be28967f0c69620a1f88c5f42fc7ff289f03036bc169a7ec88dbb7e9cd6af025cb519737fb477666b20f92e8fe2e7ff31795519dfe54f',
}];

describe('Wallet', () => {
  describe('getPublicKey()', () => {
    tests.forEach((test) => {
      const wallet = IconService.IconWallet.loadPrivateKey(test.privateKey);
      it('should be same', () => {
        assert.strictEqual(wallet.getPublicKey(), test.expectedPublicKey);
      });
    });
  });
});
