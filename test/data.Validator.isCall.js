import assert from 'assert';
import IconService from '../build/icon-sdk-js.node.min';

const tests = [{
  value: {
    to: 'cxb2c9ebf66cae9dc46dd2c79a192ca2213035d159',
    dataType: 'call',
    data: {
      method: 'symbol',
    },
  },
  is: true,
}, {
  value: {
    to: 'hxb2c9ebf66cae9dc46dd2c79a192ca2213035d159',
    dataType: 'call',
    data: {
      method: 'symbol',
    },
  },
  is: false,
}, {
  value: {
    to: 'cxb2c9ebf66cae9dc46dd2c79a192ca2213035d159',
    data: {
      method: 'symbol',
    },
  },
  is: false,
}, {
  value: {
    to: 'cxb2c9ebf66cae9dc46dd2c79a192ca2213035d159',
    dataType: 'call',
  },
  is: false,
}];

describe('data/Validator', () => {
  describe('isCall()', () => {
    tests.forEach((test) => {
      it(`${JSON.stringify(test.value)} is ${test.is}`, () => {
        assert.strictEqual(IconService.IconValidator.isCall(test.value), test.is);
      });
    });
  });
});
