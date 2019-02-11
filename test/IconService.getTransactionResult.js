import assert from 'assert';
import IconService, { HttpProvider, IconValidator } from '../build/icon-sdk-js.node.min';
const iconService = new IconService(new HttpProvider('https://bicon.net.solidwallet.io/api/v3'));

const tests = [
	'0x260d117d3b695bd10b132b43ac54341b3c19bdcc6671ebaa8beaf982a79051c8',
]

describe('IconService', () => {
	describe('getTransactionResult()', () => {
		tests.forEach((test) => {
			it('should return the right transaction', async () => {
				const transaction = await iconService.getTransactionResult(test).execute();
				assert.ok(IconValidator.isTransactionResult(transaction));
			});
		});
	});
});
