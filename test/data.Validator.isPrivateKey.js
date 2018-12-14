import assert from 'assert';
import { IconValidator } from '../';

const tests = [
    { value: '9fb6c4e6b20d1cfdb3e756503d886e0c0dba8c609ec524db7a7d1709458def43', is: true },
]

describe('data/Validator', function () {
    describe('isPrivateKey()', function () {
        tests.forEach(function (test) {
            it(`${test.value} is ${test.is}`, function () {
                assert.strictEqual(IconValidator.isPrivateKey(test.value), test.is);
            });
        })
    });
});

