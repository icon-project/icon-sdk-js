import assert from 'assert';
import { IconValidator } from '../build/icon-sdk-js.node.min';

const tests = [
	{ value: 'hx14d922b2350a876877571d1cf5db835a575be1cb', is: true },
	{ value: 'hx14D922B2350A876877571D1CF5DB835A575bE1CB', is: true },
	{ value: 'cx14d922b2350a876877571d1cf5db835a575be1cb', is: true },
	{ value: '0x14d922b2350a876877571d1cf5db835a575be1cb', is: false },
	{ value: 'hx14d922b2350a876877571d1cf5db835a575be1zb', is: false },
	{ value: 'hX14d922b2350a876877571d1cf5db835a575be1cb', is: false },
	{ value: 'Hx14d922b2350a876877571d1cf5db835a575be1cb', is: false },
];

describe('data/Validator', () => {
	describe('isAddress()', () => {
		tests.forEach((test) => {
			it(`${test.value} is ${test.is}`, () => {
				assert.strictEqual(IconValidator.isAddress(test.value), test.is);
			});
		});
	});
});
