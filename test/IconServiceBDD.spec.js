// /* global describe, it, beforeEach */

// import chai from 'chai';
// import BigNumber from 'bignumber.js';

// import IconService from '../index';
// import Mock from './mock';

// let iconService;
// let wallet;
// let fromAddress;
// let toAddress;
// let scoreAddress;

// chai.expect();
// const { expect } = chai;

// describe('Given an instance of IconService', () => {
// 	beforeEach(() => {
// 		iconService = new IconService(new IconService.providers.HttpProvider(Mock.EULJIRO_NODE));
// 		const { Wallet } = iconService;
// 		wallet = Wallet.loadPrivateKey(Mock.PRIVATE_KEY_A);
// 		// fromAddress = Mock.WALLET_ADDRESS_A;
// 		// toAddress = Mock.WALLET_ADDRESS_B;
// 		scoreAddress = Mock.SCORE_ADDRESS_A;
// 	});

// 	describe('IconService - ', () => {
// 		it('getBalance() should work', () => {
// 			const balance = iconService.getBalance(wallet.getAddress()).execute();
// 			expect(balance).to.eql(new BigNumber(Mock.WALLET_BALANCE_A));
// 		});

// 		it('getTotalSupply() should work', () => {
// 			const totalSupply = iconService.getTotalSupply().execute();
// 			expect(totalSupply).to.eql(new BigNumber(Mock.TOTAL_SUPPLY));
// 		});

// 		it('getBlockByHeight() should work', () => {
// 			const block = iconService.getBlock(new BigNumber(Mock.BLOCK_NUM)).execute();
// 			const { blockHash } = block;
// 			expect(blockHash).to.equal(Mock.BLOCK_HASH);
// 		});

// 		it('getBlockByHash() should work', () => {
// 			const block = iconService.getBlock(Mock.BLOCK_HASH).execute();
// 			const { blockHash } = block;
// 			expect(blockHash).to.equal(Mock.BLOCK_HASH);
// 		});

// 		it('getLastBlock() should work', () => {
// 			const block = iconService.getBlock('latest').execute();
// 			const { blockHash } = block;
// 			expect(blockHash).to.equal(Mock.LAST_BLOCK_HASH);
// 		});

// 		it('getScoreApi() should work', () => {
// 			const scoreApiList = iconService.getScoreApi(scoreAddress).execute();
// 			const balanceOfApi = scoreApiList.filter(api => api.name === 'balanceOf');
// 			expect(balanceOfApi).to.have.lengthOf(1);
// 		});

// 		it('getTransactionByHash() should work', () => {
// 			const tx = iconService.getTransactionByHash(Mock.txHash);
// 			expect(tx).to.equal(Mock.tx);
// 		});

// 		it('getTransactionResult() should work', () => {
// 			const txResult = iconService.getTransactionResult(Mock.txHash);
// 			expect(txResult).to.equal(Mock.tx);
// 		});
// 	});
// });
