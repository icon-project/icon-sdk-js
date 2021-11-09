import assert from 'assert';
import IconService from '../build/icon-sdk-js.node.min';

const tests = [
  { value: '0x0561c95cbb8ccc012b171124d8d187f01012996c2b051a7420d51d256741a6b5', is: true },
  { value: '0561c95cbb8ccc012b171124d8d187f01012996c2b051a7420d51d256741a6b5', is: false },
  { value: 'latest', is: false },
  { value: 777, is: false },
  { value: '0x53Dea0706548bf48e5a6dc4a712c07a3ede20d2459dc83e058f44d8603c5aad4', is: false },
  { value: '0X53dea0706548bf48e5a6dc4a712c07a3ede20d2459dc83e058f44d8603c5aad4', is: false },
  { value: ' 0x0561c95cbb8ccc012b171124d8d187f01012996c2b051a7420d51d256741a6b5', is: false },
  { value: '0x0561c95cbb8 cc012b171124d8d187f01012996c2b051a7420d51d256741a6b5', is: false },
  { value: '0x0561c95cbb88cc012b171124d8d187f01012996c2b051a7420d51d256741a6b ', is: false },
  { value: ' ', is: false },
];

describe('data/Validator', () => {
  describe('isBlockHash()', () => {
    tests.forEach((test) => {
      it(`${test.value} is ${test.is}`, () => {
        assert.strictEqual(IconService.IconValidator.isValidHash(test.value), test.is);
      });
    });
  });
});
