import assert from 'assert';
import { IconConverter } from '..';

const tests = [
	{ value: 77, expected: '0x4d' },
	{ value: '77', expected: '0x3737' },
	{ value: 0x77, expected: '0x77' },
	{ value: '0x77', expected: '0x77' },
	{ value: IconConverter.toBigNumber(77), expected: '0x4d' },
	{ value: IconConverter.toBigNumber('77'), expected: '0x4d' },
	{ value: IconConverter.toBigNumber(0x77), expected: '0x77' },
	{ value: IconConverter.toBigNumber('0x77'), expected: '0x77' },
	{ value: 'Modern Family', expected: '0x4d6f6465726e2046616d696c79' },
];

describe('data/Converter', () => {
	describe('toHex()', () => {
		tests.forEach((test) => {
			it(`should turn ${test.value} to ${test.expected}`, () => {
				assert.strictEqual(IconConverter.toHex(test.value), test.expected);
			});
		});
	});
});
