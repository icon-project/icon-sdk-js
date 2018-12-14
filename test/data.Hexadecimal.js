import assert from 'assert';
import { IconHexadecimal } from '../';

const tests = [
    '14d922b2350a876877571d1cf5db835a575be1cb',
    '0x14d922b2350a876877571d1cf5db835a575be1cb',
    'hx14d922b2350a876877571d1cf5db835a575be1cb',
    'cx14d922b2350a876877571d1cf5db835a575be1cb'
]

describe('data/Hexadecimal', function () {
    describe('is0xPrefix()', function () {
        const expected = [false, true, false, false]
        tests.forEach(function (test, index) {
            it(`${test} is ${expected[index]}`, function () {
                assert.strictEqual(IconHexadecimal.is0xPrefix(test), expected[index]);
            });
        })
    });

    describe('isHxPrefix()', function () {
        const expected = [false, false, true, false]
        tests.forEach(function (test, index) {
            it(`${test} is ${expected[index]}`, function () {
                assert.strictEqual(IconHexadecimal.isHxPrefix(test), expected[index]);
            });
        })
    });

    describe('isCxPrefix()', function () {
        const expected = [false, false, false, true]
        tests.forEach(function (test, index) {
            it(`${test} is ${expected[index]}`, function () {
                assert.strictEqual(IconHexadecimal.isCxPrefix(test), expected[index]);
            });
        })
    });

    describe('add0xPrefix', function() {
        it ('should return the right value', function() {
            assert.strictEqual(IconHexadecimal.add0xPrefix(tests[0]), tests[1])
        })
    })

    describe('addHxPrefix', function() {
        it ('should return the right value', function() {
            assert.strictEqual(IconHexadecimal.addHxPrefix(tests[0]), tests[2])
        })
    })

    describe('addCxPrefix', function() {
        it ('should return the right value', function() {
            assert.strictEqual(IconHexadecimal.addCxPrefix(tests[0]), tests[3])
        })
    })

    describe('removePrefix', function() {
        it ('should return the right value', function() {
            assert.strictEqual(IconHexadecimal.remove0xPrefix(tests[1]), tests[0])
        })
    })

    describe('removeHxPrefix', function() {
        it ('should return the right value', function() {
            assert.strictEqual(IconHexadecimal.removeHxPrefix(tests[2]), tests[0])
        })
    })

    describe('removeCxPrefix', function() {
        it ('should return the right value', function() {
            assert.strictEqual(IconHexadecimal.removeCxPrefix(tests[3]), tests[0])
        })
    })
});
