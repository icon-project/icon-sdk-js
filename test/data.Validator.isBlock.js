import assert from 'assert';
import IconService from '../build/icon-sdk-js.node.min';

const tests = [{
  value: {
    version: '0.1a',
    prev_block_hash: '48757af881f76c858890fb41934bee228ad50a71707154a482826c39b8560d4b',
    merkle_tree_root_hash: 'fabc1884932cf52f657475b6d62adcbce5661754ff1a9d50f13f0c49c7d48c0c',
    time_stamp: 1516498781094429,
    confirmed_transaction_list: [
      {
        version: '0x3',
        from: 'hxbe258ceb872e08851f1f59694dac2558708ece11',
        to: 'cxb0776ee37f5b45bfaea8cff1d8232fbb6122ec32',
        value: '0xde0b6b3a7640000',
        stepLimit: '0x12345',
        timestamp: '0x563a6cf330136',
        nid: '0x3',
        nonce: '0x1',
        signature: 'VAia7YZ2Ji6igKWzjR2YsGa2m53nKPrfK7uXYW78QLE+ATehAVZPC40szvAiA6NEU5gCYB4c4qaQzqDh2ugcHgA=',
        txHash: '0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238',
        dataType: 'call',
        data: {
          method: 'transfer',
          params: {
            to: 'hxab2d8215eab14bc6bdd8bfb2c8151257032ecd8b',
            value: '0x1',
          },
        },
      },
    ],
    block_hash: '1fcf7c34dc875681761bdaa5d75d770e78e8166b5c4f06c226c53300cbe85f57',
    height: 3,
    peer_id: 'e07212ee-fe4b-11e7-8c7b-acbc32865d5f',
    signature: 'MEQCICT8mTIL6pRwMWsJjSBHcl4QYiSgG8+0H3U32+05mO9HAiBOhIfBdHNm71WpAZYwJWwQbPVVXFJ8clXGKT3ScDWcvw==',
  },
  is: true,
}];

describe('data/Validator', () => {
  describe('isBlock()', () => {
    tests.forEach((test) => {
      it(`${JSON.stringify(test.value)} is ${test.is}`, () => {
        assert.strictEqual(IconService.IconValidator.isBlock(test.value), test.is);
      });
    });
  });
});
