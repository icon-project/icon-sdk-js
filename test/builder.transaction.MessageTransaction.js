import assert from 'assert';
import { IconConverter, IconBuilder } from '../build/icon-sdk-js.node.min';

const { MessageTransactionBuilder } = IconBuilder;

const tests = [{
	input: (new MessageTransactionBuilder()
		.from('hx46293d558d3bd489c3715e7e3648de0e35086bfd')
		.to('hx87a90bfe8ed49e1a25184ce77fa0d9c4b0484d6a')
		.stepLimit(IconConverter.toBigNumber(100000))
		.nid(IconConverter.toBigNumber(3))
		.nonce(IconConverter.toBigNumber(1))
		.version(IconConverter.toBigNumber(3))
		.timestamp(1544596599371000)
		.data(IconConverter.fromUtf8('Aqua Man'))
		.build()
	),
	result: {
		from: 'hx46293d558d3bd489c3715e7e3648de0e35086bfd',
		to: 'hx87a90bfe8ed49e1a25184ce77fa0d9c4b0484d6a',
		stepLimit: IconConverter.toBigNumber(100000),
		nid: IconConverter.toBigNumber(3),
		nonce: IconConverter.toBigNumber(1),
		version: IconConverter.toBigNumber(3),
		timestamp: 1544596599371000,
		dataType: 'message',
		data: IconConverter.fromUtf8('Aqua Man'),
	},
}];

describe('builder/transaction', () => {
	describe('MessageTransaction', () => {
		tests.forEach((test) => {
			it('should return the right MessageTransaction object', () => {
				assert.deepEqual(test.input, test.result);
			});
		});
	});
});
