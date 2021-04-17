import assert from 'assert';
import IconService from '../build/icon-sdk-js.node.min';

const tests = [{
  iconService: new IconService(new IconService.HttpProvider('https://ctz.solidwallet.io/api/v3')),
  blockList: [
    0,
    1,
    10,
    777,
    IconService.IconConverter.toBigNumber('777'),
    9217169,
    10000000,
    11280559,
  ],
}, {
  iconService: new IconService(new IconService.HttpProvider('https://bicon.net.solidwallet.io/api/v3')),
  blockList: [
    0,
    1,
    2,
    10,
    777,
    IconService.IconConverter.toBigNumber('777'),
  ],
}];

describe('IconService', () => {
  describe('getBlockByHeight()', () => {
    tests.forEach((test) => {
      test.blockList.forEach((block) => {
        it('should return the right block', async () => {
          try {
            const result = await test.iconService.getBlockByHeight(block).execute();
            assert.ok(!!result);
          } catch (e) {
            console.log(e);
            assert.ok(false);
          }
        });
      });
    });
  });
});
