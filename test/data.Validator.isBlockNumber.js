import assert from 'assert';
import { IconValidator, IconConverter } from '../';

const tests = [
    { value: 20137, is: false },
    { value: IconConverter.toBigNumber(20137), is: true },
    { value: IconConverter.toBigNumber(-3), is: false },
]

describe('data/Validator', function () {
    describe('isBlockNumber()', function () {
        tests.forEach(function (test) {
            it(`${test.value} is ${test.is}`, function () {
                assert.strictEqual(IconValidator.isBlockNumber(test.value), test.is);
            });
        })
    });
});

