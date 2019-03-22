import assert from 'assert';
import IconService, { HttpProvider } from '../build/icon-sdk-js.node.min';
import * as Type from '../lib/data/Type';
const iconService = new IconService(new HttpProvider('https://bicon.net.solidwallet.io/api/v3'));

const tests = [
	'hx902ecb51c109183ace539f247b4ea1347fbf23b5',
	'cxb25fe7b33016638b80fed733a4b1112cc8dbd27b'
];

describe('IconService', () => {
	describe('getBalance()', () => {
		tests.forEach(test => {
			it('should return the BigNumber', async () => {
				const balance = await iconService.getBalance(test).execute();
				assert.ok(Type.isBigNumber(balance));
			});	
		})
	});
});
