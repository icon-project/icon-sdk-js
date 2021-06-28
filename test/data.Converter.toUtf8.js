import assert from 'assert';
import IconService from '../build/icon-sdk-js.node.min';

const tests = [
  { value: '0x47616d65206f66205468726f6e6573', expected: 'Game of Thrones' },
  { value: '0xed9598ec9db4ed8dbcecbba4eb84a5ed8ab820eb8d9420ec9b94eb939c', expected: '하이퍼커넥트 더 월드' },
];

describe('data/Converter', () => {
  describe('toUtf8()', () => {
    tests.forEach((test) => {
      it(`should turn ${test.value} to ${test.expected}`, () => {
        assert.strictEqual(IconService.IconConverter.toUtf8(test.value), test.expected);
      });
    });
  });
});
