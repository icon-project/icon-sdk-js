import assert from 'assert';
import IconService from '../build/icon-sdk-js.node.min';

const { CallTransactionBuilder } = IconService.IconBuilder;

const tests = [{
  input: (new CallTransactionBuilder()
    .from('hx46293d558d3bd489c3715e7e3648de0e35086bfd')
    .to('cx87a90bfe8ed49e1a25184ce77fa0d9c4b0484d6a')
    .stepLimit(IconService.IconConverter.toBigNumber(100000))
    .nid(IconService.IconConverter.toBigNumber(3))
    .nonce(IconService.IconConverter.toBigNumber(1))
    .version(IconService.IconConverter.toBigNumber(3))
    .timestamp(1544596599371000)
    .method('burn')
    .params({
      account: 'hx16293d558d3bd489c3715e7e3648de0e35086bfd',
      amount: IconService.IconAmount.of(7, IconService.IconAmount.Unit.ICX).toLoop(),
    })
    .build()
  ),
  result: {
    from: 'hx46293d558d3bd489c3715e7e3648de0e35086bfd',
    to: 'cx87a90bfe8ed49e1a25184ce77fa0d9c4b0484d6a',
    stepLimit: IconService.IconConverter.toBigNumber(100000),
    nid: IconService.IconConverter.toBigNumber(3),
    nonce: IconService.IconConverter.toBigNumber(1),
    version: IconService.IconConverter.toBigNumber(3),
    timestamp: 1544596599371000,
    dataType: 'call',
    data: {
      method: 'burn',
      params: {
        account: 'hx16293d558d3bd489c3715e7e3648de0e35086bfd',
        amount: IconService.IconAmount.of(7, IconService.IconAmount.Unit.ICX).toLoop(),
      },
    },
  },
}];

describe('builder/transaction', () => {
  describe('CallTransaction', () => {
    tests.forEach((test) => {
      it('should return the right CallTransaction object', () => {
        assert.deepEqual(test.input, test.result);
      });
    });
  });
});
