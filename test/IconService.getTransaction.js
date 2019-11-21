import assert from 'assert';
import IconService, { HttpProvider } from '../build/icon-sdk-js.node.min';

const tests = [{
	iconService: new IconService(new HttpProvider('https://ctz.solidwallet.io/api/v3')),
	txList: [
		'0x880835fccd7268c5175ed2a899ed354aea251fe8fffddde572fd8336e07eb0f6',
		'0x900d548fa56055d64905632383d33b596c78bc1706454e4f9b6c105cdc2c9b28',
		'0x5ab6012c05c7d5ea13688c4d7aaf81b7abb0aa736b574867a16d7178280e5b14',
		'0x375540830d475a73b704cf8dee9fa9eba2798f9d2af1fa55a85482e48daefd3b',
	],
}, {
	iconService: new IconService(new HttpProvider('https://bicon.net.solidwallet.io/api/v3')),
	txList: [
		'0x260d117d3b695bd10b132b43ac54341b3c19bdcc6671ebaa8beaf982a79051c8',
		'0x17c7d8761ccf30915ee18a1c2389552a5c601815552eb23af649403e3e464497',
	],
}];

describe('IconService', () => {
	describe('getTransaction()', () => {
		tests.forEach((test) => {
			test.txList.forEach((tx) => {
				it('should return the right transaction', async () => {
					try {
						const transaction = await test.iconService.getTransaction(tx).execute();
						assert.ok(!!transaction);
					} catch (e) {
						console.log(e);
						assert.ok(false);
					}
				});
			});
		});
	});
});
