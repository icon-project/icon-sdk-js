import assert from 'assert';
import { IconConverter } from '../';

const tests = [{ 
    value: {
        from: 'hx46293d558d3bd489c3715e7e3648de0e35086bfd',
        to: 'hx87a90bfe8ed49e1a25184ce77fa0d9c4b0484d6a',
        value: IconConverter.toBigNumber(7),
        stepLimit: IconConverter.toBigNumber(100000),
        nid: IconConverter.toBigNumber(3),
        nonce: IconConverter.toBigNumber(1),
        version: IconConverter.toBigNumber(3),
        timestamp: 1544596599371000
    }, 
    expected: {
        from: 'hx46293d558d3bd489c3715e7e3648de0e35086bfd',
        to: 'hx87a90bfe8ed49e1a25184ce77fa0d9c4b0484d6a',
        value: '0x7',
        stepLimit: '0x186a0',
        nid: '0x3',
        nonce: '0x1',
        version: '0x3',
        timestamp: '0x57ccd6ba074f8'
    }
}]

describe('data/Converter', function () {
    describe('toRawTransaction()', function () {
        tests.forEach(function (test) {
            it('should turn ' + JSON.stringify(test.value) + ' to ' + JSON.stringify(test.expected), function () {
                assert.deepEqual(IconConverter.toRawTransaction(test.value), test.expected);
            });
        })
    });
});