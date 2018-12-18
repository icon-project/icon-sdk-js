import assert from 'assert';
import IconService, { HttpProvider, IconValidator } from '..';

const TestTransactionHash = '0x260d117d3b695bd10b132b43ac54341b3c19bdcc6671ebaa8beaf982a79051c8';

describe('IconService', () => {
	describe('getTransactionResult()', () => {
		const iconService = new IconService(new HttpProvider('https://bicon.net.solidwallet.io/api/v3'));
		it('should return the right transaction', async () => {
			const transaction = await iconService.getTransactionResult(TestTransactionHash).execute();
			assert.ok(IconValidator.isTransactionResult(transaction));
		});
	});
});
