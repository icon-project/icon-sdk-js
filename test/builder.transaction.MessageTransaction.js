import assert from 'assert';
import { IconConverter, IconBuilder } from '../';
const { MessageTransactionBuilder } = IconBuilder

describe('builder/transaction', function () {
    describe('MessageTransaction', function () {
        const from = 'hx46293d558d3bd489c3715e7e3648de0e35086bfd'
        const to = 'hx87a90bfe8ed49e1a25184ce77fa0d9c4b0484d6a'
        const stepLimit = IconConverter.toBigNumber(100000)
        const nid = IconConverter.toBigNumber(3)
        const nonce = IconConverter.toBigNumber(1)
        const version = IconConverter.toBigNumber(3)
        const timestamp = 1544596599371000
        const data = IconConverter.toHex('Aqua Man')

        const builder = new MessageTransactionBuilder()
        const transaction = builder
            .from(from)
            .to(to)
            .stepLimit(stepLimit)
            .nid(nid)
            .nonce(nonce)
            .version(version)
            .timestamp(timestamp)
            .data(data)
            .build();

        it('should return the right object', function () {
            assert.deepEqual(transaction, {
                from,
                to,
                stepLimit,
                nid,
                nonce,
                version,
                timestamp,
                dataType: 'message',
                data,
            })
        });
    });
});