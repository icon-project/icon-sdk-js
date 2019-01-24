import assert from 'assert';
import { IconConverter, IconBuilder, IconAmount } from '../build/icon-sdk-js.node.min';

const { IcxTransactionBuilder } = IconBuilder;

const tests = [{
	input: (new IcxTransactionBuilder()
		.from('hx46293d558d3bd489c3715e7e3648de0e35086bfd')
		.to('hx87a90bfe8ed49e1a25184ce77fa0d9c4b0484d6a')
		.value(IconAmount.of(7, IconAmount.Unit.ICX).toLoop())
		.stepLimit(IconConverter.toBigNumber(100000))
		.nid(IconConverter.toBigNumber(3))
		.nonce(IconConverter.toBigNumber(1))
		.version(IconConverter.toBigNumber(3))
		.timestamp(1544596599371000)
		.build()
	),
	result: {
		from: 'hx46293d558d3bd489c3715e7e3648de0e35086bfd',
		to: 'hx87a90bfe8ed49e1a25184ce77fa0d9c4b0484d6a',
		value: IconAmount.of(7, IconAmount.Unit.ICX).toLoop(),
		stepLimit: IconConverter.toBigNumber(100000),
		nid: IconConverter.toBigNumber(3),
		nonce: IconConverter.toBigNumber(1),
		version: IconConverter.toBigNumber(3),
		timestamp: 1544596599371000,
	},
}];

describe('builder/transaction', () => {
	describe('IcxTransaction', () => {
		tests.forEach((test) => {
			it('should return the right IcxTransaction object', () => {
				assert.deepEqual(test.input, test.result);
			});
		});
	});
});
