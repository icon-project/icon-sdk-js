import assert from 'assert';
import BigNumber from 'bignumber.js';
import IconService, { Type } from '../build/icon-sdk-js.node.min';

const tests = [
  'End Game',
  () => {},
  [8, 7, 0, 9],
  'cx14d922b2350a876877571d1cf5db835a575be1cb',
  IconService.IconConverter.toBigNumber(42),
  '0x0864',
  { a: 0 },
  new ArrayBuffer(10),
  new BigNumber(86),
];

describe('data/Type', () => {
  describe('isString()', () => {
    const expected = [
      true,
      false,
      false,
      true,
      false,
      true,
      false,
      false,
      false,
    ];
    tests.forEach((test, index) => {
      it(`${test} is ${expected[index]}`, () => {
        assert.strictEqual(Type.isString(test), expected[index]);
      });
    });
  });

  describe('isByte()', () => {
    const expected = [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
    ];
    tests.forEach((test, index) => {
      it(`${test} is ${expected[index]}`, () => {
        assert.strictEqual(Type.isByte(test), expected[index]);
      });
    });
  });

  describe('isObject()', () => {
    const expected = [false, false, true, false, true, false, true, true, true];
    tests.forEach((test, index) => {
      it(`${test} is ${expected[index]}`, () => {
        assert.strictEqual(Type.isObject(test), expected[index]);
      });
    });
  });

  describe('isArray()', () => {
    const expected = [
      false,
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
    ];
    tests.forEach((test, index) => {
      it(`${test} is ${expected[index]}`, () => {
        assert.strictEqual(Type.isArray(test), expected[index]);
      });
    });
  });

  describe('isBigNumber()', () => {
    const expected = [
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      true,
    ];
    tests.forEach((test, index) => {
      it(`${test} is ${expected[index]}`, () => {
        assert.strictEqual(Type.isBigNumber(test), expected[index]);
      });
    });
  });

  describe('isHex()', () => {
    const expected = [
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
    ];
    tests.forEach((test, index) => {
      it(`${test} is ${expected[index]}`, () => {
        assert.strictEqual(Type.isHex(test), expected[index]);
      });
    });
  });

  describe('isFunction()', () => {
    const expected = [
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ];
    tests.forEach((test, index) => {
      it(`${test} is ${expected[index]}`, () => {
        assert.strictEqual(Type.isFunction(test), expected[index]);
      });
    });
  });
});
