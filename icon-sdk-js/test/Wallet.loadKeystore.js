import assert from 'assert';
import IconService from '../build/icon-sdk-js.node.min';

const tests = [{
  keystore: {
    version: 3,
    id: '2fa947c7-92d3-4c01-896a-a96396221233',
    address: 'hx902ecb51c109183ace539f247b4ea1347fbf23b5',
    crypto: {
      ciphertext: '4fe98ce7ed98accc27389aac53bbd5031c43f42dd4cbe1f4e45c7f3c0608ee28',
      cipherparams: { iv: 'fa8562176b411d5c1370eec9f69a348f' },
      cipher: 'aes-128-ctr',
      kdf: 'scrypt',
      kdfparams: {
        dklen: 32, salt: '9091d98b319f3cee97cf5b8bd1ef12e687c7aa12971777e277091302cbaecaab', n: 16384, r: 8, p: 1,
      },
      mac: '8249910036b787a4bae39659646f37404bd5fb1da7e08c5ddda6d1924bef3b86',
    },
    coinType: 'icx',
  },
  password: 'qwer1234!',
  address: 'hx902ecb51c109183ace539f247b4ea1347fbf23b5',
  privateKey: '38f792b95a5202ab431bfc799f7e1e5c74ec0b9ede5c6142ee7364f2c84d72f6',
  publicKey: 'f87740e3dce5b834b61b6d02f0c3c28dd02ba203cf57fd004eaeb92468d693de76772963c00d255f8371420f3e172444d106847b03b92fc5706a9531f2cf522e',
}];

describe('Wallet', () => {
  describe('loadKeystore()', () => {
    tests.forEach((test) => {
      const wallet = IconService.IconWallet.loadKeystore(test.keystore, test.password);

      it('should be same', () => {
        assert.strictEqual(wallet.getAddress(), test.address);
      });

      it('should be same', () => {
        assert.strictEqual(wallet.getPublicKey(), test.publicKey);
      });

      it('should be same', () => {
        assert.strictEqual(wallet.getPrivateKey(), test.privateKey);
      });
    });
  });
});
