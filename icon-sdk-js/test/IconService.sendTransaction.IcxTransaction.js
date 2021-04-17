import assert from 'assert';
import IconService from '../build/icon-sdk-js.node.min';

const { IcxTransactionBuilder } = IconService.IconBuilder;
const iconService = new IconService(new IconService.HttpProvider('https://bicon.net.solidwallet.io/api/v3'));
const wallet = IconService.IconWallet.loadPrivateKey('38f792b95a5202ab431bfc799f7e1e5c74ec0b9ede5c6142ee7364f2c84d72f6');

const from = 'hx902ecb51c109183ace539f247b4ea1347fbf23b5';
const to = 'hxd008c05cbc0e689f04a5bb729a66b42377a9a497';
const value = IconService.IconAmount.of(1, IconService.IconAmount.Unit.ICX).toLoop();
const stepLimit = IconService.IconConverter.toBigNumber(100000);
const nid = IconService.IconConverter.toBigNumber(3);
const nonce = IconService.IconConverter.toBigNumber(1);
const version = IconService.IconConverter.toBigNumber(3);
const timestamp = (new Date()).getTime() * 1000;
const transaction = new IcxTransactionBuilder()
	.from(from)
	.to(to)
	.value(value)
	.stepLimit(stepLimit)
	.nid(nid)
	.nonce(nonce)
	.version(version)
	.timestamp(timestamp)
	.build();

describe('IconService', () => {
	describe('sendTransaction() - IcxTransaction', () => {
		it('should return the tx hash', async () => {
			const txHash = await iconService.sendTransaction(new IconService.SignedTransaction(transaction, wallet)).execute();
			assert.ok(IconService.IconValidator.isTransactionHash(txHash));
		});
	});
});
