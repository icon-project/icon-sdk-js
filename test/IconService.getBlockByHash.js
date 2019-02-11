import assert from 'assert';
import IconService, { HttpProvider } from '../build/icon-sdk-js.node.min';

const iconService = new IconService(new HttpProvider('https://bicon.net.solidwallet.io/api/v3'));

const tests = ['0x53dea0706548bf48e5a6dc4a712c07a3ede20d2459dc83e058f44d8603c5aad4']

describe('IconService', () => {
	describe('getBlockByHash()', () => {
        tests.forEach((test) => {
            it('should return the right block', async () => {
                const block = await iconService.getBlockByHash(test).execute();
                assert.ok(!!block);
            });
        });
	});
});
