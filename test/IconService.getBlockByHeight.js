import assert from 'assert';
import IconService, { HttpProvider, IconConverter } from '../build/icon-sdk-js.node.min';

const providers = [
	'https://bicon.net.solidwallet.io/api/v3',
	'https://test-ctz.solidwallet.io/api/v3',
	'https://ctz.solidwallet.io/api/v3',
];

const tests = [
	10,
	777,
	IconConverter.toBigNumber('777'),
];

describe('IconService', () => {
	describe('getBlockByHeight()', () => {
		providers.forEach((provider) => {
			const iconService = new IconService(new HttpProvider(provider));
			tests.forEach((test) => {
				it('should return the right block', async () => {
					const block = await iconService.getBlockByHeight(test).execute();
					assert.ok(!!block);
				});
			});
		});
	});
});

const mainnetTests = [
	...tests,
	9217169,
	10000000,
];

describe('IconService', () => {
	describe('getBlockByHeight() on Mainnet', () => {
		const iconService = new IconService(new HttpProvider(providers[2]));
		mainnetTests.forEach((test) => {
			it('should return the right block', async () => {
				const block = await iconService.getBlockByHeight(test).execute();
				console.log(JSON.stringify(block, null, 2));
				assert.ok(!!block);
			});
		});
	});
});
