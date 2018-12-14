import assert from 'assert';
import { IconConverter } from '../';

const tests = [
    { value: 5, expected: 5 },
    { value: IconConverter.toBigNumber(6), expected: 6 },
    { value: '7', expected: 7 },
    { value: '0x10', expected: 16 },
]

describe('data/Converter', function () {
    describe('toNumber()', function () {
        tests.forEach(function (test) {
            it('should turn ' + test.value + ' to ' + test.expected, function () {
                assert.strictEqual(IconConverter.toNumber(test.value), test.expected);
            });
        })
    });
});