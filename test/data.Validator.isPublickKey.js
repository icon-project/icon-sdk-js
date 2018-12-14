import assert from 'assert';
import { IconValidator } from '../';

const tests = [
    // { value: '54ab60c9edd552a5d38666eeaa8aae522c549728a9dc2c2edfb58de21ad5168e48df32e5cd953a2b5a18e28b417953743f45c543d9daae02e80b561df5eae819', is: true },
]

describe('data/Validator', function () {
    describe('isPublicKey()', function () {
        tests.forEach(function (test) {
            it(`${test.value} is ${test.is}`, function () {
                assert.strictEqual(IconValidator.isPublicKey(test.value), test.is);
            });
        })
    });
});

