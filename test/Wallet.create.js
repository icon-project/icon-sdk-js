import assert from 'assert';
import { IconWallet } from '../build/icon-sdk-js.node.min';

const testWallet1 = IconWallet.create();
const testWallet2 = IconWallet.create();

describe('Wallet', function () {    
    describe('create()', function () {
        it(`should be different`, function () {
            assert.notEqual(testWallet1.getAddress(), testWallet2.getAddress())
        });
    });
});
