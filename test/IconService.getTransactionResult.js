import assert from 'assert';
import IconService, { HttpProvider, IconValidator } from '../build/icon-sdk-js.node.min';

const iconService = new IconService(new HttpProvider('https://ctz.solidwallet.io/api/v3'));

const tests = [
	'0x375540830d475a73b704cf8dee9fa9eba2798f9d2af1fa55a85482e48daefd3b',
	'0xeddae5923502311d2f9bd23c13099dce5ad9ac43e019fd48631aa6d96cf97d9d',
	'0x382ae8b24388f41dbfda149c1be4337ae841dab626870ce42a49b20d478b61c3',
];

describe('IconService', () => {
	describe('getTransactionResult()', () => {
		tests.forEach((test) => {
			it('should return the right transaction', async () => {
				try {
					const transaction = await iconService.getTransactionResult(test).execute();
					assert.ok(IconValidator.isTransactionResult(transaction));
				} catch (e) {
					console.log(e);
					assert.ok(false);
				}
			});
		});
	});
});
