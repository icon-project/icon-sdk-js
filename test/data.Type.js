import assert from 'assert';
import { IconConverter } from '../'
import * as Type from '../lib/data/Type'
import BigNumber from 'bignumber.js'

const tests = [
    'End Game',
    function () { },
    [8, 7, 0, 9],
    'cx14d922b2350a876877571d1cf5db835a575be1cb',
    IconConverter.toBigNumber(42),
    '0x0864',
    { a: 0 },
    new ArrayBuffer(10),
    new BigNumber(86)
]

describe('data/Type', function () {
    describe('isString()', function () {
        const expected = [true, false, false, true, false, true, false, false, false]
        tests.forEach(function (test, index) {
            it(`Test value is ${expected[index]}`, function () {
                assert.strictEqual(Type.isString(test), expected[index]);
            });
        })
    });

    describe('isByte()', function () {
        const expected = [false, false, false, false, false, false, false, true, false]
        tests.forEach(function (test, index) {
            it(`Test value is ${expected[index]}`, function () {
                assert.strictEqual(Type.isByte(test), expected[index]);
            });
        })
    });

    describe('isObject()', function () {
        const expected = [false, false, true, false, true, false, true, true, true]
        tests.forEach(function (test, index) {
            it(`Test value is ${expected[index]}`, function () {
                assert.strictEqual(Type.isObject(test), expected[index]);
            });
        })
    });

    describe('isArray()', function () {
        const expected = [false, false, true, false, false, false, false, false, false]
        tests.forEach(function (test, index) {
            it(`Test value is ${expected[index]}`, function () {
                assert.strictEqual(Type.isArray(test), expected[index]);
            });
        })
    });

    describe('isBigNumber()', function () {
        const expected = [false, false, false, false, true, false, false, false, true]
        tests.forEach(function (test, index) {
            it(`Test value is ${expected[index]}`, function () {
                assert.strictEqual(Type.isBigNumber(test), expected[index]);
            });
        })
    });

    describe('isHex()', function () {
        const expected = [false, false, false, false, false, true, false, false, false]
        tests.forEach(function (test, index) {
            it(`Test value is ${expected[index]}`, function () {
                assert.strictEqual(Type.isHex(test), expected[index]);
            });
        })
    });

    describe('isFunction()', function () {
        const expected = [false, true, false, false, false, false, false, false, false]
        tests.forEach(function (test, index) {
            it(`Test value is ${expected[index]}`, function () {
                assert.strictEqual(Type.isFunction(test), expected[index]);
            });
        })
    });
});
