import assert from 'assert';
import IconService from '../build/icon-sdk-js.node.min';

const tests = [
  { value: 'Game of Thrones', expected: '0x47616d65206f66205468726f6e6573' },
  { value: '하이퍼커넥트 더 월드', expected: '0xed9598ec9db4ed8dbcecbba4eb84a5ed8ab820eb8d9420ec9b94eb939c' },
];

describe('data/Converter', () => {
  describe('fromUtf8()', () => {
    tests.forEach((test) => {
      it(`should turn ${test.value} to ${test.expected}`, () => {
        assert.strictEqual(IconService.IconConverter.fromUtf8(test.value), test.expected);
      });
    });
  });
});
