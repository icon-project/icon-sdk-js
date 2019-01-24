import assert from 'assert';
import IconService, { HttpProvider, SignedTransaction, IconValidator, IconWallet, IconBuilder, IconConverter, IconAmount } from '../build/icon-sdk-js.node.min';
const { CallTransactionBuilder } = IconBuilder;
const iconService = new IconService(new HttpProvider('https://bicon.net.solidwallet.io/api/v3'));
const wallet = IconWallet.loadPrivateKey('38f792b95a5202ab431bfc799f7e1e5c74ec0b9ede5c6142ee7364f2c84d72f6')

const tests = [
	new CallTransactionBuilder()
		.from('hx902ecb51c109183ace539f247b4ea1347fbf23b5')
		.to('cx3502b4dadbfcd654d26d53d8463f2929c2c3948d')
		.stepLimit(IconConverter.toBigNumber(2000000))
		.nid(IconConverter.toBigNumber(3))
		.nonce(IconConverter.toBigNumber(1))
		.version(IconConverter.toBigNumber(3))
		.timestamp((new Date()).getTime() * 1000)
		.method('transfer')
		.params({
			_to: 'hxd008c05cbc0e689f04a5bb729a66b42377a9a497',
			_value: IconConverter.toHex(IconAmount.of(1, IconAmount.Unit.ICX).toLoop()),
		})
		.build(),
	new CallTransactionBuilder()
		.from('hx902ecb51c109183ace539f247b4ea1347fbf23b5')
		.to('cxb787980518b717a7f986500576c6a24c0294ed64')
		.stepLimit(IconConverter.toBigNumber(2000000))
		.nid(IconConverter.toBigNumber(3))
		.nonce(IconConverter.toBigNumber(1))
		.version(IconConverter.toBigNumber(3))
		.timestamp((new Date()).getTime() * 1000)
		.method('vote')
		.params({
			_from: 'hx0ac12c49979287e3e81550a1e5b5759c78c7325a',
			_to: 'hx72f7f531dcd26c6f34f691ec54c0ea9a255d2508',
			_formatted_json: '[{ "type": "int", "value": "0x4" }, { "type": "int", "value": "0x3" }, { "type": "int", "value": "0x3" }, { "type": "int", "value": "0x4" }, { "type": "int", "value": "0x4" }, { "type": "int", "value": "0x4" }, { "type": "int", "value": "0x4" }, { "type": "int", "value": "0x4" }, { "type": "int", "value": "0x4" }, { "type": "int", "value": "0x4" }, { "type": "int", "value": "0x3" }, { "type": "int", "value": "0x4" }, { "type": "int", "value": "0x4" }, { "type": "int", "value": "0x3" }, { "type": "bool", "value": "0x1" }]',
			_message: "The Drug King"
		})
		.build()
]

describe('IconService', () => {
	describe('sendTransaction() - CallTransaction', () => {
		tests.forEach(test => {
			it('should return the tx hash', async () => {
				const txHash = await iconService.sendTransaction(new SignedTransaction(test, wallet)).execute();
				assert.ok(IconValidator.isTransactionHash(txHash));
			});
		})
	});
});
