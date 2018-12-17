import assert from 'assert';
import IconService, { HttpProvider } from '..';
import * as Type from '../lib/data/Type';

describe('IconService', () => {
	describe('getTotalSupply()', () => {
		const iconService = new IconService(new HttpProvider('https://bicon.net.solidwallet.io/api/v3'));
		it('The value of total supply is BigNumber.', async () => {
			const totalSupply = await iconService.getTotalSupply().execute();
			assert.ok(Type.isBigNumber(totalSupply));
		});
	});
});
