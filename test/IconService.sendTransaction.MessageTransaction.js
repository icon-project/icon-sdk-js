import assert from 'assert';
import IconService, {
	HttpProvider, SignedTransaction, IconValidator, IconWallet, IconBuilder, IconConverter, IconAmount,
} from '../build/icon-sdk-js.node.min';

const { MessageTransactionBuilder } = IconBuilder;
const iconService = new IconService(new HttpProvider('https://bicon.net.solidwallet.io/api/v3'));
const wallet = IconWallet.loadPrivateKey('38f792b95a5202ab431bfc799f7e1e5c74ec0b9ede5c6142ee7364f2c84d72f6');

const tests = [
	new MessageTransactionBuilder()
		.from('hx902ecb51c109183ace539f247b4ea1347fbf23b5')
		.to('hxd008c05cbc0e689f04a5bb729a66b42377a9a497')
		.stepLimit(IconConverter.toBigNumber(200000))
		.nid(IconConverter.toBigNumber(3))
		.nonce(IconConverter.toBigNumber(1))
		.version(IconConverter.toBigNumber(3))
		.timestamp((new Date()).getTime() * 1000)
		.data(IconConverter.toHex('Aqua Man'))
		.build(),
	new MessageTransactionBuilder()
		.from('hx902ecb51c109183ace539f247b4ea1347fbf23b5')
		.to('hxd008c05cbc0e689f04a5bb729a66b42377a9a497')
		.stepLimit(IconConverter.toBigNumber(200000))
		.nid(IconConverter.toBigNumber(3))
		.nonce(IconConverter.toBigNumber(1))
		.version(IconConverter.toBigNumber(3))
		.timestamp((new Date()).getTime() * 1000)
		.data(IconConverter.toHex('0x009aaa11'))
		.build(),
	new MessageTransactionBuilder()
		.from('hx902ecb51c109183ace539f247b4ea1347fbf23b5')
		.to('hxd008c05cbc0e689f04a5bb729a66b42377a9a497')
		.stepLimit(IconConverter.toBigNumber(200000))
		.nid(IconConverter.toBigNumber(3))
		.nonce(IconConverter.toBigNumber(1))
		.version(IconConverter.toBigNumber(3))
		.timestamp((new Date()).getTime() * 1000)
		.data('0x01')
		.build(),
];

describe('IconService', () => {
	describe('sendTransaction() - MessageTransaction', () => {
		tests.forEach((test) => {
			it('should return the tx hash', async () => {
				try {
					const txHash = await iconService.sendTransaction(new SignedTransaction(test, wallet)).execute();
					assert.ok(IconValidator.isTransactionHash(txHash));
				} catch (e) {
					console.log(e);
					assert.ok(false);
				}
			});
		});
	});
});
