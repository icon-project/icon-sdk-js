import assert from 'assert';
import { IconValidator } from '../';

const tests = [{ 
    value: { 
        to: 'cxb2c9ebf66cae9dc46dd2c79a192ca2213035d159', 
        dataType: 'call',
        data: {
            method: 'symbol'
        }
    }, 
    is: true
}, {
    value: { 
        to: 'hxb2c9ebf66cae9dc46dd2c79a192ca2213035d159', 
        dataType: 'call',
        data: {
            method: 'symbol'
        }
    }, 
    is: false
}, {
    value: { 
        to: 'cxb2c9ebf66cae9dc46dd2c79a192ca2213035d159', 
        data: {
            method: 'symbol'
        }
    }, 
    is: false
}, {
    value: { 
        to: 'cxb2c9ebf66cae9dc46dd2c79a192ca2213035d159', 
        dataType: 'call',
    }, 
    is: false

}]

describe('data/Validator', function () {
    describe('isCall()', function () {
        tests.forEach(function (test) {
            it(`${JSON.stringify(test.value)} is ${test.is}`, function () {
                assert.strictEqual(IconValidator.isCall(test.value), test.is);
            });
        })
    });
});

