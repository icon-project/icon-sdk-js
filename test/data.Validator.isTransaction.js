import assert from 'assert';
import { IconValidator } from '../';

const tests = [{
	value: {
        "version": "0x3",
        "from": "hxbe258ceb872e08851f1f59694dac2558708ece11",
        "to": "hx5bfdb090f43a808005ffc27c25b213145e80b7cd",
        "value": "0xde0b6b3a7640000",
        "stepLimit": "0x12345",
        "timestamp": "0x563a6cf330136",
        "nid": "0x3",
        "nonce": "0x1",
        "txHash": "0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238",
        "txIndex": "0x1",
        "blockHeight": "0x1234",
        "blockHash": "0xc71303ef8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238",
        "signature": "VAia7YZ2Ji6igKWzjR2YsGa2m53nKPrfK7uXYW78QLE+ATehAVZPC40szvAiA6NEU5gCYB4c4qaQzqDh2ugcHgA="
    },
	is: true,
}, {
    value: {
        "version": "0x3",
        "from": "hxbe258ceb872e08851f1f59694dac2558708ece11",
        "to": "cxb0776ee37f5b45bfaea8cff1d8232fbb6122ec32",
        "stepLimit": "0x12345",
        "timestamp": "0x563a6cf330136",
        "nid": "0x3",
        "nonce": "0x1",
        "txHash": "0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238",
        "txIndex": "0x1",
        "blockHeight": "0x1234",
        "blockHash": "0xc71303ef8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238",
        "signature": "VAia7YZ2Ji6igKWzjR2YsGa2m53nKPrfK7uXYW78QLE+ATehAVZPC40szvAiA6NEU5gCYB4c4qaQzqDh2ugcHgA=",
        "dataType": "call",
        "data": {
            "method": "transfer",
            "params": {
                "to": "hxab2d8215eab14bc6bdd8bfb2c8151257032ecd8b",
                "value": "0x1"
            }
        }
    },
    is: true,
}];

describe('data/Validator', () => {
	describe('isTransaction()', () => {
		tests.forEach((test) => {
			it(`${JSON.stringify(test.value)} is ${test.is}`, () => {
				assert.strictEqual(IconValidator.isTransaction(test.value), test.is);
			});
		});
	});
});
