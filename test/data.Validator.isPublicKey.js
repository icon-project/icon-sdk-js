import assert from 'assert';
import { IconValidator } from '../build/icon-sdk-js.node.min';

const tests = [
	{ value: '0cab9063247807c9c02599a2b20e4bc444b6c12129cb6ab55a89f47b09d88e7034c58d10e1592c7b739e321b163a652e63c682fd0780f1e6f241639a8684b176', is: true },
];

describe('data/Validator', () => {
	describe('isPublicKey()', () => {
		tests.forEach((test) => {
			it(`${test.value} is ${test.is}`, () => {
				assert.strictEqual(IconValidator.isPublicKey(test.value), test.is);
			});
		});
	});
});
