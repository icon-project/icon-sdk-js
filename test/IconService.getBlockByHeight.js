import assert from 'assert';
import IconService, { HttpProvider, IconConverter } from '../build/icon-sdk-js.node.min';
const providers = [
    'https://bicon.net.solidwallet.io/api/v3',
    'https://test-ctz.solidwallet.io/api/v3',
    'https://ctz.solidwallet.io/api/v3'
]
const tests = [
    10,
    777,
    IconConverter.toBigNumber("777")
]

describe('IconService', () => {
    describe('getBlockByHeight()', () => {
        providers.forEach(provider => {
            const iconService = new IconService(new HttpProvider(provider));
            tests.forEach(test => {
                it('should return the right block', async () => {
                    const block = await iconService.getBlockByHeight(test).execute();
                    assert.ok(!!block);
                });
            });
        })
    });
});
