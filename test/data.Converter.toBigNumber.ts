import * as assert from 'assert';
import {BigNumber} from "../lib";
import IconService from '../lib';

const tests = [
  { value: '0.00008', expected: new BigNumber(0.00008) },
  { value: 0.00007, expected: new BigNumber(0.00007) },
  { value: '-6', expected: new BigNumber(-6) },
  { value: -5, expected: new BigNumber(-5) },
  { value: 10, expected: new BigNumber(10) },
  { value: '10', expected: new BigNumber(10) },
  { value: 0x10, expected: new BigNumber(16) },
  { value: '0x10', expected: new BigNumber(16) },
  { value: IconService.IconConverter.toBigNumber(7), expected: new BigNumber(7) },
];

describe('data/Converter', () => {
  describe('toBigNumber()', () => {
    tests.forEach((test) => {
      it(`should turn ${test.value} to ${test.expected}`, () => {
        assert.deepEqual(IconService.IconConverter.toBigNumber(test.value), test.expected);
      });
    });
  });
});
