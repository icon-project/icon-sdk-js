import assert from 'assert';
import IconService, { HttpProvider, IconBuilder } from '../build/icon-sdk-js.node.min';
import * as Type from '../lib/data/Type'
const iconService = new IconService(new HttpProvider('https://bicon.net.solidwallet.io/api/v3'));
const { CallBuilder } = IconBuilder;

const GovernanceAddress = 'cx0000000000000000000000000000000000000001';

describe('IconService/call', () => {
    describe('getScoreApi()', () => {
        it('should return the right score api list', async () => {
            const scoreApiList = await iconService.getScoreApi(GovernanceAddress).execute();
            const api = scoreApiList.getMethod('getStepCosts')
            const call = new CallBuilder()
                .to(GovernanceAddress)
                .method(api.name)
                .build();

            const stepCosts = await iconService.call(call).execute();
            assert.ok(Type.isObject(stepCosts));
        });
    });
});
