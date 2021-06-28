import assert from 'assert';
import IconService from '../build/icon-sdk-js.node.min';

const tests = [{
  value: {
    status: '0x1',
    to: 'cx4d6f646441a3f9c9b91019c9b98e3c342cceb114',
    txHash: '0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238',
    txIndex: '0x1',
    blockHeight: '0x1234',
    blockHash: '0xc71303ef8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238',
    cumulativeStepUsed: '0x1234',
    stepUsed: '0x1234',
    stepPrice: '0x5678',
    scoreAddress: 'cxb0776ee37f5b45bfaea8cff1d8232fbb6122ec32',
    eventLogs: [
      {
        scoreAddress: 'cx4d6f646441a3f9c9b91019c9b98e3c342cceb114',
        indexed: [
          'Transfer(Address,Address,int)',
          'hx4873b94352c8c1f3b2f09aaeccea31ce9e90bd31',
          'hx0000000000000000000000000000000000000000',
          '0x8ac7230489e80000',
        ],
        data: [],
      },
    ],
    logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000002000000000021000000000000000000000000000000000000000000000000003000000000031400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000',
  },
  is: true,
}, {
  value: {
    status: '0x0',
    failure: {
      code: '0x7d00',
      message: 'Out of balance',
    },
    to: 'cx4d6f646441a3f9c9b91019c9b98e3c342cceb114',
    txHash: '0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238',
    txIndex: '0x1',
    blockHeight: '0x1234',
    blockHash: '0xc71303ef8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238',
    cumulativeStepUsed: '0x1234',
    stepUsed: '0x1234',
    stepPrice: '0x5678',
  },
  is: true,
}];

describe('data/Validator', () => {
  describe('isTransactionResult()', () => {
    tests.forEach((test) => {
      it(`${JSON.stringify(test.value)} is ${test.is}`, () => {
        assert.strictEqual(IconService.IconValidator.isTransactionResult(test.value), test.is);
      });
    });
  });
});
