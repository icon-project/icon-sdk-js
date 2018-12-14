import assert from 'assert';
import { IconConverter } from '../';

const tests = [
    { value: 7, expected: '0x7' },
    { value: 0x10, expected: '0x10' },
    { value: 'Modern Family', expected: '0x4d6f6465726e2046616d696c79' },
    { value: IconConverter.toBigNumber(100), expected: '0x64' },
]

describe('data/Converter', function () {
    describe('toHex()', function () {
        tests.forEach(function (test) {
            it('should turn ' + test.value + ' to ' + test.expected, function () {
                assert.strictEqual(IconConverter.toHex(test.value), test.expected);
            });
        })
    });
});