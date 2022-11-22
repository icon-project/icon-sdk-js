import * as assert from 'assert';
import IconService from '../lib/index';

const testWallet1 = IconService.IconWallet.create();
const testWallet2 = IconService.IconWallet.create();

describe('Wallet', () => {
  describe('create()', () => {
    it('should be different', () => {
      assert.notEqual(testWallet1.getAddress(), testWallet2.getAddress());
    });
  });
});
