import assert from 'assert';
import IconService, { HttpProvider } from '../build/icon-sdk-js.node.min';

const iconService = new IconService(new HttpProvider('https://ctz.solidwallet.io/api/v3'));

describe('IconService', () => {
	describe('getLastBlock()', () => {
		it('should return the right block', async () => {
			const block = await iconService.getLastBlock().execute();
			assert.ok(!!block);
		});
	});
});
