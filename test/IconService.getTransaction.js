import assert from 'assert';
import IconService, { HttpProvider, IconValidator } from '../build/icon-sdk-js.node.min';
const iconService = new IconService(new HttpProvider('https://bicon.net.solidwallet.io/api/v3'));

const tests = [
	'0x260d117d3b695bd10b132b43ac54341b3c19bdcc6671ebaa8beaf982a79051c8',
	'0x17c7d8761ccf30915ee18a1c2389552a5c601815552eb23af649403e3e464497'
]

describe('IconService', () => {
	describe('getTransaction()', () => {
		tests.forEach((test) => {
			it('should return the right transaction', async () => {
				const transaction = await iconService.getTransaction(test).execute();
				console.log(transaction)
				assert.ok(IconValidator.isTransaction(transaction));
			});
		});
	});
});
