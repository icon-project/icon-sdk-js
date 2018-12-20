import assert from 'assert';
import IconService, { HttpProvider, IconValidator, IconConverter } from '../';

const iconService = new IconService(new HttpProvider('https://bicon.net.solidwallet.io/api/v3'));

const TestBlockNumber = '777';
const TestBlockHash = '0x53dea0706548bf48e5a6dc4a712c07a3ede20d2459dc83e058f44d8603c5aad4';
const TestLatestBlock = 'latest';

describe('IconService', () => {
	describe('getBlock()', () => {

		it('should return the right block', async () => {
			const block = await iconService.getBlock(IconConverter.toBigNumber(TestBlockNumber)).execute();
			assert.ok(!!block);
		});

		it('should return the right block', async () => {
			const block = await iconService.getBlock(TestBlockHash).execute();
			assert.ok(!!block);
		});

		it('should return the right block', async () => {
			const block = await iconService.getBlock(TestLatestBlock).execute();
			assert.ok(!!block);
		});
	});
});
