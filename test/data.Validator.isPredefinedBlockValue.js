import assert from 'assert';
import IconService from '../build/icon-sdk-js.node.min';

const tests = [
  { value: 'latest', is: true },
  { value: 'first', is: false },
  { value: IconService.IconConverter.toBigNumber(21987), is: false },
];

describe('data/Validator', () => {
  describe('isPredefinedBlockValue()', () => {
    tests.forEach((test) => {
      it(`${test.value} is ${test.is}`, () => {
        assert.strictEqual(IconService.IconValidator.isPredefinedBlockValue(test.value), test.is);
      });
    });
  });
});
