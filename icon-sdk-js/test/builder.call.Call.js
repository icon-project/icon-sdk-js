import assert from 'assert';
import IconService from '../build/icon-sdk-js.node.min';

const { CallBuilder } = IconService.IconBuilder;

const tests = [{
  input: (new CallBuilder()
    .from('hx46293d558d3bd489c3715e7e3648de0e35086bfd')
    .to('cxc248ee72f58f7ec0e9a382379d67399f45b596c7')
    .from('hx46293d558d3bd489c3715e7e3648de0e35086bfd')
    .method('totalSupply')
    .build()
  ),
  result: {
    from: 'hx46293d558d3bd489c3715e7e3648de0e35086bfd',
    to: 'cxc248ee72f58f7ec0e9a382379d67399f45b596c7',
    dataType: 'call',
    data: {
      method: 'totalSupply',
    },
  },
}, {
  input: (new CallBuilder()
    .from('hx46293d558d3bd489c3715e7e3648de0e35086bfd')
    .to('cxc248ee72f58f7ec0e9a382379d67399f45b596c7')
    .method('balanceOf')
    .params({ _owner: 'hx87a90bfe8ed49e1a25184ce77fa0d9c4b0484d6a' })
    .build()
  ),
  result: {
    from: 'hx46293d558d3bd489c3715e7e3648de0e35086bfd',
    to: 'cxc248ee72f58f7ec0e9a382379d67399f45b596c7',
    dataType: 'call',
    data: {
      method: 'balanceOf',
      params: {
        _owner: 'hx87a90bfe8ed49e1a25184ce77fa0d9c4b0484d6a',
      },
    },
  },
}];

describe('builder/call', () => {
  describe('Call', () => {
    tests.forEach((test) => {
      it('should return the right Call object', () => {
        assert.deepEqual(test.input, test.result);
      });
    });
  });
});
