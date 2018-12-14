import assert from 'assert';
import { IconBuilder } from '../';
const { CallBuilder } = IconBuilder

const tests = [{
    input: {
        from: 'hx46293d558d3bd489c3715e7e3648de0e35086bfd',
        to: 'cxc248ee72f58f7ec0e9a382379d67399f45b596c7',
        method: 'totalSupply',
    },
    result: {
        from: 'hx46293d558d3bd489c3715e7e3648de0e35086bfd',
        to: 'cxc248ee72f58f7ec0e9a382379d67399f45b596c7',
        dataType: 'call',
        data: {
            method: 'totalSupply',
        }
    },
}, {
    input: {
        from: 'hx46293d558d3bd489c3715e7e3648de0e35086bfd',
        to: 'cxc248ee72f58f7ec0e9a382379d67399f45b596c7',
        method: 'balanceOf',
        params: {
            _owner: 'hx87a90bfe8ed49e1a25184ce77fa0d9c4b0484d6a',
        }
    },
    result: {
        from: 'hx46293d558d3bd489c3715e7e3648de0e35086bfd',
        to: 'cxc248ee72f58f7ec0e9a382379d67399f45b596c7',
        dataType: 'call',
        data: {
            method: 'balanceOf',
            params: {
                _owner: 'hx87a90bfe8ed49e1a25184ce77fa0d9c4b0484d6a'
            }
        }
    }
}];

describe('builder/call', function () {
    describe('Call', function () {
        tests.forEach(function (test) {
            const callBuilder = new CallBuilder()
            const { input, result } = test
            const { from, to, method, params } = input
            const call = callBuilder
                .from(from)
                .to(to)
                .method(method)
                .params(params)
                .build();

            it('should return the right object', function () {
                assert.deepEqual(call, result)
            });
        });
    });
});