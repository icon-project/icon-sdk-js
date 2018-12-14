import assert from 'assert';
import { IconAmount, IconConverter } from '../'

const units = [{
    name: 'LOOP',
    value: '0',
}, {
    name: 'ICX',
    value: '18',
}]

const testValue = IconAmount.of(7, IconAmount.Unit.ICX)

describe('data/Amount', function () {
    describe('units', function () {
        units.forEach(function (unit) {
            it(`should be the right unit value - ${unit.name}: ${unit.value}`, function () {
                assert.equal(IconAmount.Unit[unit.name], unit.value)
            });
        })
    });

    describe('getDigit()', function () {
        it(`should be the right value`, function () {
            assert.equal(testValue.getDigit(), 18)
        });
    })

    describe('toString()', function () {
        it(`should be the right value`, function () {
            assert.equal(testValue.toString(), '7')
        });
    })

    describe('toLoop()', function () {
        it(`should be the right value`, function () {
            assert.deepEqual(testValue.toLoop(), IconConverter.toBigNumber(7000000000000000000))
        });
    })

    describe('convertUnit()', function () {
        it(`should be the right value`, function () {
            assert.deepEqual(testValue.convertUnit(IconAmount.Unit.LOOP), IconAmount.of(7000000000000000000, IconAmount.Unit.LOOP))
        });
    })});