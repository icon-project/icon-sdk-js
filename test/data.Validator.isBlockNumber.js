import assert from 'assert';
import { IconValidator, IconConverter } from '../build/icon-sdk-js.node.min';

const tests = [
	{ value: -777, is: false },
	{ value: 0, is: true },
	{ value: 0.777, is: false },
	{ value: 777, is: true },
	{ value: IconConverter.toBigNumber(777), is: true },
	{ value: 'latest', is: false },
	{ value: '0x4fa0e0dc138133f15620e36dbd0da3ab4678116b89205ebdd29ba41cd440bb13', is: false },
	{ value: 0x0561c95cbb8ccc012b171124d8d187f01012996c2b051a7420d51d256741a6b5, is: true },
	{ value: 0x0561c95cbb8ccc012b171124d8d187f01012996c2b051a7420d51d256741a6b569, is: false },
	{ value: 3.7935313790387894e+76, is: true },
	{ value: '0', is: true },
	{ value: IconConverter.toBigNumber(0), is: true },
	{ value: 0x3, is: true },
	{ value: '0x3', is: true },
	{ value: 0X3, is: true },
	{ value: '0X3', is: false },
];

describe('data/Validator', () => {
	describe('isBlockNumber()', () => {
		tests.forEach((test) => {
			it(`${test.value} is ${test.is}`, () => {
				assert.strictEqual(IconValidator.isBlockNumber(test.value), test.is);
			});
		});
	});
});
