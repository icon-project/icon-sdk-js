import assert from 'assert';
import IconService from '../build/icon-sdk-js.node.min';

const tests = [
  '14d922b2350a876877571d1cf5db835a575be1cb',
  '0x14d922b2350a876877571d1cf5db835a575be1cb',
  'hx14d922b2350a876877571d1cf5db835a575be1cb',
  'cx14d922b2350a876877571d1cf5db835a575be1cb',
];

describe('data/Hexadecimal', () => {
  describe('is0xPrefix()', () => {
    const expected = [false, true, false, false];
    tests.forEach((test, index) => {
      it(`${test} is ${expected[index]}`, () => {
        assert.strictEqual(IconService.IconHexadecimal.is0xPrefix(test), expected[index]);
      });
    });
  });

  describe('isHxPrefix()', () => {
    const expected = [false, false, true, false];
    tests.forEach((test, index) => {
      it(`${test} is ${expected[index]}`, () => {
        assert.strictEqual(IconService.IconHexadecimal.isHxPrefix(test), expected[index]);
      });
    });
  });

  describe('isCxPrefix()', () => {
    const expected = [false, false, false, true];
    tests.forEach((test, index) => {
      it(`${test} is ${expected[index]}`, () => {
        assert.strictEqual(IconService.IconHexadecimal.isCxPrefix(test), expected[index]);
      });
    });
  });

  describe('add0xPrefix', () => {
    it('should return the right value', () => {
      assert.strictEqual(IconService.IconHexadecimal.add0xPrefix(tests[0]), tests[1]);
    });
  });

  describe('addHxPrefix', () => {
    it('should return the right value', () => {
      assert.strictEqual(IconService.IconHexadecimal.addHxPrefix(tests[0]), tests[2]);
    });
  });

  describe('addCxPrefix', () => {
    it('should return the right value', () => {
      assert.strictEqual(IconService.IconHexadecimal.addCxPrefix(tests[0]), tests[3]);
    });
  });

  describe('removePrefix', () => {
    it('should return the right value', () => {
      assert.strictEqual(IconService.IconHexadecimal.remove0xPrefix(tests[1]), tests[0]);
    });
  });

  describe('removeHxPrefix', () => {
    it('should return the right value', () => {
      assert.strictEqual(IconService.IconHexadecimal.removeHxPrefix(tests[2]), tests[0]);
    });
  });

  describe('removeCxPrefix', () => {
    it('should return the right value', () => {
      assert.strictEqual(IconService.IconHexadecimal.removeCxPrefix(tests[3]), tests[0]);
    });
  });
});
