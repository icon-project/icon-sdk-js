import assert from 'assert';
import { IconConverter } from '..';

const tests = [
	{ value: 77, expected: 77 },
	{ value: IconConverter.toBigNumber(77), expected: 77 },
	{ value: '77', expected: 77 },
	{ value: '0x77', expected: 119 },
];

describe('data/Converter', () => {
	describe('toNumber()', () => {
		tests.forEach((test) => {
			it(`should turn ${test.value} to ${test.expected}`, () => {
				assert.strictEqual(IconConverter.toNumber(test.value), test.expected);
			});
		});
	});
});
