import assert from 'assert';
import { IconValidator, IconConverter } from '../';

const tests = [
    { value: 'latest', is: true },
    { value: 'first', is: false },
    { value: IconConverter.toBigNumber(21987), is: false },
]

describe('data/Validator', function () {
    describe('isBlockHash()', function () {
        tests.forEach(function (test) {
            it(`${test.value} is ${test.is}`, function () {
                assert.strictEqual(IconValidator.isPredefinedBlockValue(test.value), test.is);
            });
        })
    });
});

