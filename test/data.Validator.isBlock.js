import assert from 'assert';
import { IconValidator } from '..';

const tests = [{
	value: {
		height: 777,
		blockHash: '0x53dea0706548bf48e5a6dc4a712c07a3ede20d2459dc83e058f44d8603c5aad4',
		merkleTreeRootHash: '0x6f3c2e50e4644d0a593bf46f85711f45d60b63838e4fc46993292aad81d7a3fb',
		prevBlockHash: '0xf5c9c973fbad10ea4717b7a1f1d5b5dbcb7646e3fca0325f1908593b9d99d73b',
		peerId: 'hxf64fc9c20c4a5b8c59e999405fbc941a96bc2c00',
		confirmedTransactionList: [],
		signature: 'jtWrEyUwSZrSvYDwi8cEFCuaXeVVcOdqlref3+pgBdVYu6Z9xhWMa7Hvaz7dntpyEX+GzJ5aXmOOa2A7qvdxCQA=',
		timeStamp: 1538022678794933,
		version: '0.1a',
	},
	is: true,
}];

describe('data/Validator', () => {
	describe('isBlock()', () => {
		tests.forEach((test) => {
			it(`${test.value} is ${test.is}`, () => {
				assert.deepEqual(IconValidator.isBlock(test.value), test.is);
			});
		});
	});
});
