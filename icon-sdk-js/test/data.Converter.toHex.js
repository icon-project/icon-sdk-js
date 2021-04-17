import assert from 'assert';
import IconService from '../build/icon-sdk-js.node.min';

const tests = [
  { value: 77, expected: '0x4d' },
  { value: '77', expected: '0x3737' },
  { value: 0x77, expected: '0x77' },
  { value: '0x77', expected: '0x77' },
  { value: IconService.IconConverter.toBigNumber(77), expected: '0x4d' },
  { value: IconService.IconConverter.toBigNumber('77'), expected: '0x4d' },
  { value: IconService.IconConverter.toBigNumber(0x77), expected: '0x77' },
  { value: IconService.IconConverter.toBigNumber('0x77'), expected: '0x77' },
  { value: 'Modern Family', expected: '0x4d6f6465726e2046616d696c79' },
  { value: '0.1', expected: '0x302e31' },
  { value: '0x0', expected: '0x0' },
  { value: '', expected: '0x0' },
  { value: null, expected: '0x0' },
  { value: undefined, expected: '0x0' },
];

describe('data/Converter', () => {
  describe('toHex()', () => {
    tests.forEach((test) => {
      it(`should turn ${test.value} to ${test.expected}`, () => {
        assert.strictEqual(IconService.IconConverter.toHex(test.value), test.expected);
      });
    });
  });
});
