import assert from 'assert';
import IconService, { HttpProvider, IconConverter } from '../build/icon-sdk-js.node.min';

const iconService = new IconService(new HttpProvider('https://bicon.net.solidwallet.io/api/v3'));

const tests = [777, IconConverter.toBigNumber("777")]

describe('IconService', () => {
    describe('getBlockByHeight()', () => {
        tests.forEach((test) => {
            it('should return the right block', async () => {
                const block = await iconService.getBlockByHeight(test).execute();
                assert.ok(!!block);
            });
        });
    });
});
