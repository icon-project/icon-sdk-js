import assert from 'assert';
import IconService from '../build/icon-sdk-js.node.min';

const unitTests = [{
	name: 'LOOP',
	value: 0,
}, {
	name: 'GLOOP',
	value: 9,
}, {
	name: 'ICX',
	value: 18,
}];

const testValue = IconService.IconAmount.of(777, IconService.IconAmount.Unit.ICX);

describe('data/Amount', () => {
	describe('units', () => {
		unitTests.forEach((unit) => {
			it(`should be the right unit value - ${unit.name}: ${unit.value}`, () => {
				assert.strictEqual(IconService.IconAmount.Unit[unit.name], unit.value);
			});
		});
	});

	describe('getDigit()', () => {
		it('should be the right value', () => {
			assert.strictEqual(testValue.getDigit(), 18);
		});
	});

	describe('toString()', () => {
		it('should be the right value', () => {
			assert.strictEqual(testValue.toString(), '777');
		});
	});

	describe('toLoop()', () => {
		it('should be the right value', () => {
			assert.deepEqual(testValue.toLoop(), IconService.IconConverter.toBigNumber('777000000000000000000'));
		});
	});

	describe('convertUnit()', () => {
		it('should be the right value', () => {
			assert.deepEqual(testValue.convertUnit(IconService.IconAmount.Unit.LOOP), IconService.IconAmount.of('777000000000000000000', IconService.IconAmount.Unit.LOOP));
		});
	});
});
