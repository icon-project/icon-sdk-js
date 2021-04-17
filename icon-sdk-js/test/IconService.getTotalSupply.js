import assert from 'assert';
import IconService, { Type } from '../build/icon-sdk-js.node.min';

describe('IconService', () => {
  describe('getTotalSupply()', () => {
    const iconService = new IconService(new IconService.HttpProvider('https://bicon.net.solidwallet.io/api/v3'));
    it('should be return the BigNumber', async () => {
      const totalSupply = await iconService.getTotalSupply().execute();
      assert.ok(Type.isBigNumber(totalSupply));
    });
  });
});
