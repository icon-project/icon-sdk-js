import * as assert from 'assert';
import IconService from '../lib/index';
import {IcxTransaction} from "../lib/builder/transaction/IcxTransaction";

const wallet = IconService.IconWallet.loadPrivateKey('38f792b95a5202ab431bfc799f7e1e5c74ec0b9ede5c6142ee7364f2c84d72f6');

const tests = [{
  value: new IconService.SignedTransaction(
    new IcxTransaction(
      'hxd008c05cbc0e689f04a5bb729a66b42377a9a497',
      'hx902ecb51c109183ace539f247b4ea1347fbf23b5',
      '0xde0b6b3a7640000',
      '0x186a0',
      '0x3',
      '0x3',
      '0x3',
      '0x57cde1eb6c258'
    )
    , wallet),
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
