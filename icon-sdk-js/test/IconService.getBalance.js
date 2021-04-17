import assert from 'assert';
import IconService, { Type } from '../build/icon-sdk-js.node.min';

const iconService = new IconService(new IconService.HttpProvider('https://bicon.net.solidwallet.io/api/v3'));

const tests = [
	'hx902ecb51c109183ace539f247b4ea1347fbf23b5',
	'cxb25fe7b33016638b80fed733a4b1112cc8dbd27b',
];

describe('IconService', () => {
	describe('getBalance()', () => {
		tests.forEach((test) => {
			it('should return the BigNumber', async () => {
				const balance = await iconService.getBalance(test).execute();
				assert.ok(Type.isBigNumber(balance));
			});
		});
	});
});
