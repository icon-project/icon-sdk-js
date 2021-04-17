import assert from 'assert';
import IconService from '../build/icon-sdk-js.node.min';

const { MessageTransactionBuilder } = IconService.IconBuilder;
const iconService = new IconService(
	new IconService.HttpProvider('https://bicon.net.solidwallet.io/api/v3'),
);
const wallet = IconService.IconWallet.loadPrivateKey(
	'38f792b95a5202ab431bfc799f7e1e5c74ec0b9ede5c6142ee7364f2c84d72f6',
);

const tests = [
	new MessageTransactionBuilder()
		.from('hx902ecb51c109183ace539f247b4ea1347fbf23b5')
		.to('hxd008c05cbc0e689f04a5bb729a66b42377a9a497')
		.stepLimit(IconService.IconConverter.toBigNumber(200000))
		.nid(IconService.IconConverter.toBigNumber(3))
		.nonce(IconService.IconConverter.toBigNumber(1))
		.version(IconService.IconConverter.toBigNumber(3))
		.timestamp(new Date().getTime() * 1000)
		.data(IconService.IconConverter.toHex('Aqua Man'))
		.build(),
	new MessageTransactionBuilder()
		.from('hx902ecb51c109183ace539f247b4ea1347fbf23b5')
		.to('hxd008c05cbc0e689f04a5bb729a66b42377a9a497')
		.stepLimit(IconService.IconConverter.toBigNumber(200000))
		.nid(IconService.IconConverter.toBigNumber(3))
		.nonce(IconService.IconConverter.toBigNumber(1))
		.version(IconService.IconConverter.toBigNumber(3))
		.timestamp(new Date().getTime() * 1000)
		.data(IconService.IconConverter.toHex('0x009aaa11'))
		.build(),
	new MessageTransactionBuilder()
		.from('hx902ecb51c109183ace539f247b4ea1347fbf23b5')
		.to('hxd008c05cbc0e689f04a5bb729a66b42377a9a497')
		.stepLimit(IconService.IconConverter.toBigNumber(200000))
		.nid(IconService.IconConverter.toBigNumber(3))
		.nonce(IconService.IconConverter.toBigNumber(1))
		.version(IconService.IconConverter.toBigNumber(3))
		.timestamp(new Date().getTime() * 1000)
		.data('0x01')
		.build(),
];

describe('IconService', () => {
	describe('sendTransaction() - MessageTransaction', () => {
		tests.forEach((test) => {
			it('should return the tx hash', async () => {
				try {
					const txHash = await iconService
						.sendTransaction(new IconService.SignedTransaction(test, wallet))
						.execute();
					assert.ok(IconService.IconValidator.isTransactionHash(txHash));
				} catch (e) {
					console.log(e);
					assert.ok(false);
				}
			});
		});
	});
});
