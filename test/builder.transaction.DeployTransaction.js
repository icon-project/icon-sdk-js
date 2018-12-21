import assert from 'assert';
import { IconConverter, IconBuilder } from '../build/icon-sdk-js.node.min';
import DeployContent from './mock/DeployContent.json'
const { DeployTransactionBuilder } = IconBuilder;

const tests = [{
	input: (new DeployTransactionBuilder()
		.from('hx46293d558d3bd489c3715e7e3648de0e35086bfd')
		.to('cx0000000000000000000000000000000000000000')
		.stepLimit(IconConverter.toBigNumber(2500000))
		.nid(IconConverter.toBigNumber(3))
		.nonce(IconConverter.toBigNumber(1))
		.version(IconConverter.toBigNumber(3))
		.timestamp(1544596599371000)
		.contentType('application/zip')
		.content(DeployContent.install)
		.params({
			initialSupply: IconConverter.toHex('100000000000'),
			decimals: IconConverter.toHex(18),
			name: 'StandardToken',
			symbol: 'ST',
		})
		.build()
	),
	result: {
		from: 'hx46293d558d3bd489c3715e7e3648de0e35086bfd',
		to: 'cx0000000000000000000000000000000000000000',
		stepLimit: IconConverter.toBigNumber(2500000),
		nid: IconConverter.toBigNumber(3),
		nonce: IconConverter.toBigNumber(1),
		version: IconConverter.toBigNumber(3),
		timestamp: 1544596599371000,
		dataType: 'deploy',
		data: {
			contentType: 'application/zip',
			content: DeployContent.install,
			params: {
				initialSupply: IconConverter.toHex('100000000000'),
				decimals: IconConverter.toHex(18),
				name: 'StandardToken',
				symbol: 'ST',
			},
		},
	},
}];

describe('builder/transaction', () => {
	describe('DeployTransaction', () => {
		tests.forEach((test) => {
			it('should return the right DeployTransaction object', () => {
				assert.deepEqual(test.input, test.result);
			});
		});
	});
});
