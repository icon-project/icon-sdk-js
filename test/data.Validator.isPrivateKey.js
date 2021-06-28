import assert from 'assert';
import IconService from '../build/icon-sdk-js.node.min';

const tests = [
  { value: '9fb6c4e6b20d1cfdb3e756503d886e0c0dba8c609ec524db7a7d1709458def43', is: true },
  { value: '38f792b95a5202ab431bfc799f7e1e5c74ec0b9ede5c6142ee7364f2c84d72f6', is: true },
  { value: '9fb6c4e6b20d1cfdb3e756503d886e0c0dba8c609ec524db7a7d1709458def43a', is: false },
  { value: '0x9fb6c4e6b20d1cfdb3e756503d886e0c0dba8c609ec524db7a7d1709458def43', is: false },
  { value: undefined, is: false },
];

describe('data/Validator', () => {
  describe('isPrivateKey()', () => {
    tests.forEach((test) => {
      it(`${test.value} is ${test.is}`, () => {
        assert.strictEqual(IconService.IconValidator.isPrivateKey(test.value), test.is);
      });
    });
  });
});
