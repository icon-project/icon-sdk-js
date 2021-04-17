import assert from 'assert';
import IconService from '../build/icon-sdk-js.node.min';

const {
	SignedTransaction, IconWallet, IconBuilder, IconConverter,
} = IconService;
const { IcxTransactionBuilder } = IconBuilder;

const from = 'hx46293d558d3bd489c3715e7e3648de0e35086bfd';
const to = 'hx87a90bfe8ed49e1a25184ce77fa0d9c4b0484d6a';
const value = IconConverter.toBigNumber(7);
const stepLimit = IconConverter.toBigNumber(100000);
const nid = IconConverter.toBigNumber(3);
const nonce = IconConverter.toBigNumber(1);
const version = IconConverter.toBigNumber(3);
const timestamp = 1544596599371000;
const icxTransactionBuilder = new IcxTransactionBuilder();
const testTransaction = icxTransactionBuilder
	.from(from)
	.to(to)
	.value(value)
	.stepLimit(stepLimit)
	.nid(nid)
	.nonce(nonce)
	.version(version)
	.timestamp(timestamp)
	.build();

const testWallet = IconWallet.loadPrivateKey('38f792b95a5202ab431bfc799f7e1e5c74ec0b9ede5c6142ee7364f2c84d72f6');

const signedTransaction = new SignedTransaction(testTransaction, testWallet);

const expectedRawTransaction = {
	to: 'hx87a90bfe8ed49e1a25184ce77fa0d9c4b0484d6a',
	from: 'hx46293d558d3bd489c3715e7e3648de0e35086bfd',
	stepLimit: '0x186a0',
	nid: '0x3',
	version: '0x3',
	timestamp: '0x57ccd6ba074f8',
	value: '0x7',
	nonce: '0x1',
};

const expectedSignature = 'YV3eNgVjLFwXS65BkyEGG6R3RSIJxe/s6JeMxD4iBdhRCRYPFtjODshPK71tqpMSV/DakSiL+lC90KgRBh7FtwE=';

const expectedProperties = {
	to: 'hx87a90bfe8ed49e1a25184ce77fa0d9c4b0484d6a',
	from: 'hx46293d558d3bd489c3715e7e3648de0e35086bfd',
	stepLimit: '0x186a0',
	nid: '0x3',
	version: '0x3',
	timestamp: '0x57ccd6ba074f8',
	value: '0x7',
	nonce: '0x1',
	signature: 'YV3eNgVjLFwXS65BkyEGG6R3RSIJxe/s6JeMxD4iBdhRCRYPFtjODshPK71tqpMSV/DakSiL+lC90KgRBh7FtwE=',
};

describe('SignedTransaction', () => {
	describe('getRawTransaction()', () => {
		it('should be the right value', () => {
			assert.deepEqual(signedTransaction.getRawTransaction(), expectedRawTransaction);
		});
	});

	describe('getSignature()', () => {
		it('should be the right value', () => {
			assert.deepEqual(signedTransaction.getSignature(), expectedSignature);
		});
	});

	describe('getProperties()', () => {
		it('should be the right value', () => {
			assert.deepEqual(signedTransaction.getProperties(), expectedProperties);
		});
	});
});
