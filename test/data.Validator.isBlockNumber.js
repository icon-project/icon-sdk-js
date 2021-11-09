import assert from 'assert';
import IconService from '../build/icon-sdk-js.node.min';

const tests = [
  { value: -777, is: false },
  { value: 0, is: true },
  { value: 0.777, is: false },
  { value: 777, is: true },
  { value: IconService.IconConverter.toBigNumber(777), is: true },
  { value: 'latest', is: false },
  { value: '0x53dea0706548bf48e5a6dc4a712c07a3ede20d2459dc83e058f44d8603c5aad4', is: true },
  { value: 0x0561c95cbb8ccc012b171124d8d187f01012996c2b051a7420d51d256741a6b5, is: true },
  { value: 0x0561c95cbb8ccc012b171124d8d187f01012996c2b051a7420d51d256741a6b569, is: false },
  { value: 3.7935313790387894e+76, is: true },
  { value: '0', is: true },
  { value: IconService.IconConverter.toBigNumber(0), is: true },
  { value: 0x3, is: true },
  { value: '0x3', is: true },
  { value: 0X3, is: true },
  { value: '0X3', is: false },
];

describe('data/Validator', () => {
  describe('isBlockNumber()', () => {
    tests.forEach((test) => {
      it(`${test.value} is ${test.is}`, () => {
        assert.strictEqual(IconService.IconValidator.isNonNegative(test.value), test.is);
      });
    });
  });
});
