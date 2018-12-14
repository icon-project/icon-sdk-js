import assert from 'assert';
import { IconConverter, IconBuilder } from '../';
const { CallTransactionBuilder } = IconBuilder

describe('builder/transaction', function () {
    describe('CallTransaction', function () {
        const from = 'hx46293d558d3bd489c3715e7e3648de0e35086bfd'
        const to = 'cx87a90bfe8ed49e1a25184ce77fa0d9c4b0484d6a'
        const value = IconConverter.toBigNumber(7)
        const stepLimit = IconConverter.toBigNumber(100000)
        const nid = IconConverter.toBigNumber(3)
        const nonce = IconConverter.toBigNumber(1)
        const version = IconConverter.toBigNumber(3)
        const timestamp = 1544596599371000
        const method = 'burn'
        const params = {
            account: 'hx16293d558d3bd489c3715e7e3648de0e35086bfd',
            amount: IconConverter.toHex(3)
        }

        const builder = new CallTransactionBuilder()
        const transaction = builder
            .from(from)
            .to(to)
            .value(value)
            .stepLimit(stepLimit)
            .nid(nid)
            .nonce(nonce)
            .version(version)
            .timestamp(timestamp)
            .method(method)
            .params(params)
            .build();

        it('should return the right object', function () {
            assert.deepEqual(transaction, {
                from,
                to,
                value,
                stepLimit,
                nid,
                nonce,
                version,
                timestamp,
                dataType: 'call',
                data: { method, params }
            })
        });
    });
});
