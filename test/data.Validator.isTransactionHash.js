import assert from 'assert';
import { IconValidator } from '../';

const tests = [
	{ value: '0x0561c95cbb8ccc012b171124d8d187f01012996c2b051a7420d51d256741a6b5', is: true },
	{ value: '0561c95cbb8ccc012b171124d8d187f01012996c2b051a7420d51d256741a6b5', is: false },
];

describe('data/Validator', () => {
	describe('isTransactionHash()', () => {
		tests.forEach((test) => {
			it(`${test.value} is ${test.is}`, () => {
				assert.strictEqual(IconValidator.isTransactionHash(test.value), test.is);
			});
		});
	});
});
