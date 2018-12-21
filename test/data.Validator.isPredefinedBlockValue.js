import assert from 'assert';
import { IconValidator, IconConverter } from '../build/icon-sdk-js.node.min';

const tests = [
	{ value: 'latest', is: true },
	{ value: 'first', is: false },
	{ value: IconConverter.toBigNumber(21987), is: false },
];

describe('data/Validator', () => {
	describe('isPredefinedBlockValue()', () => {
		tests.forEach((test) => {
			it(`${test.value} is ${test.is}`, () => {
				assert.strictEqual(IconValidator.isPredefinedBlockValue(test.value), test.is);
			});
		});
	});
});
