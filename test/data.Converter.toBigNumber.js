import assert from 'assert';
import { IconConverter } from '../';
import BigNumber from 'bignumber.js';

const tests = [
    { value: 5, expected: new BigNumber(5) },
    { value: '6', expected: new BigNumber(6) },
    { value: IconConverter.toBigNumber(7), expected: new BigNumber(7) },
    { value: '0x10', expected: new BigNumber(16) },
]

describe('data/Converter', function () {
    describe('toBigNumber()', function () {
        tests.forEach(function (test) {
            it('should turn ' + test.value + ' to ' + test.expected, function () {
                assert.deepEqual(IconConverter.toBigNumber(test.value), test.expected);
            });
        })
    });
});