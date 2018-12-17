import assert from 'assert';
import IconService, { HttpProvider, IconValidator } from '..';

const TestScoreAddress = 'cx0000000000000000000000000000000000000001';

describe('IconService', () => {
	describe('getScoreApi()', () => {
		const iconService = new IconService(new HttpProvider('https://bicon.net.solidwallet.io/api/v3'));
		it('should return the right score api list', async () => {
			const scoreApiList = await iconService.getScoreApi(TestScoreAddress).execute();
			assert.ok(IconValidator.isScoreApiList(scoreApiList));
		});
	});
});
