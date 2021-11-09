import assert from 'assert';
import IconService from '../build/icon-sdk-js.node.min';

const tests = [
  { value: '0x0561c95cbb8ccc012b171124d8d187f01012996c2b051a7420d51d256741a6b5', is: true },
  { value: '0561c95cbb8ccc012b171124d8d187f01012996c2b051a7420d51d256741a6b5', is: false },
  { value: '0x260d117d3b695bd10b132b43ac54341b3c19bdcc6671ebaa8beaf982a79051C8', is: false },
  { value: '0X260d117d3b695bd10b132b43ac54341b3c19bdcc6671ebaa8beaf982a79051c8', is: false },
];

describe('data/Validator', () => {
  describe('isTransactionHash()', () => {
    tests.forEach((test) => {
      it(`${test.value} is ${test.is}`, () => {
        assert.strictEqual(IconService.IconValidator.isValidHash(test.value), test.is);
      });
    });
  });
});
