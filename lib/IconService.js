import Request from './transport/jsonrpc/Request';
import HttpProvider from './transport/http/HttpProvider';
import Wallet from './Wallet';
import Builder from './builder';
import SignedTransaction from './SignedTransaction';
import * as Validator from './data/Validator';
import * as Converter from './data/Converter';
import * as Format from './data/Format';
import { DataError } from './Exception';
import { getCurrentTime } from './data/Util';

/**
 * @description IconService which provides APIs of ICON network.
 */
export default class IconService {
	constructor(provider) {
		this.provider = provider;
		this.Wallet = Wallet;
		this.Builder = Builder;
		this.SignedTransaction = SignedTransaction;
	}

	/**
	 * @description Get the total number of issued coins.
	 * @return {BigNumber} The total number of issued coins
	 */
	getTotalSupply() {
		const requestId = getCurrentTime();
		const request = new Request(requestId, 'icx_getTotalSupply', null);
		return this.provider.request(request, Converter.toBigNumber);
	}

	/**
	 * @description Get the balance of the address.
	 * @param {string} address EOA or SCORE address
	 * @return {BigNumber} The number of ICX coins
	 */
	getBalance(address) {
		if (!Validator.isAddress(address)) {
			const error = new DataError(`[${address}] is not valid address.`);
			throw error.toString();
		} else {
			const requestId = getCurrentTime();
			const params = { address };
			const request = new Request(requestId, 'icx_getBalance', params);
			return this.provider.request(request, Converter.toBigNumber);
		}
	}

	/**
	 * @description Get the block information.
	 * @param {BigNumber|String} value The value of block
	 * @return {object} The Block object
	 */
	getBlock(value) {
		if (Validator.isBlockNumber(value)) {
			const requestId = getCurrentTime();
			const params = { height: value };
			const request = new Request(requestId, 'icx_getBlockByHeight', params);
			return this.provider.request(request, Format.toBlock);
		}
		if (Validator.isBlockHash(value)) {
			const requestId = getCurrentTime();
			const params = { hash: value };
			const request = new Request(requestId, 'icx_getBlockByHash', params);
			return this.provider.request(request, Format.toBlock);
		}
		if (Validator.isPredefinedBlockValue(value)) {
			const requestId = getCurrentTime();
			const request = new Request(requestId, 'icx_getLastBlock', null);
			return this.provider.request(request, Format.toBlock);
		}

		const error = new DataError(`[${value}] is an unrecognized block reference.`);
		throw error.toString();
	}

	/**
	 * @description Get the SCORE API list.
	 * @param {string} address SCORE address
	 * @return {array} The list of SCORE API
	 */
	getScoreApi(address) {
		if (!Validator.isScoreAddress(address)) {
			const error = new DataError(`[${address}] is not a valid SCORE address.`);
			throw error.toString();
		} else {
			const requestId = getCurrentTime();
			const params = { address };
			const request = new Request(requestId, 'icx_getScoreApi', params);
			return this.provider.request(request, Format.toScoreApiList);
		}
	}

	/**
	 * @description Get the transaction informaion.
	 * @param {string} hash The transaction hash
	 * @return {object} The transaction object
	 */
	getTransaction(hash) {
		if (!Validator.isSignedTransactionHash(hash)) {
			const error = new DataError(`[${hash}] is an unrecognized hash value.`);
			throw error.toString();
		} else {
			const requestId = getCurrentTime();
			const params = { txHash: hash };
			const request = new Request(requestId, 'icx_getTransactionByHash', params);
			return this.provider.request(request, Format.toTransaction);
		}
	}

	/**
	 * @description Get the result of transaction by transaction hash.
	 * @param {string} hash The transaction hash
	 * @return {object} The transaction result object
	 */
	getTransactionResult(hash) {
		if (!Validator.isSignedTransactionHash(hash)) {
			const error = new DataError(`[${hash}] is an unrecognized hash value.`);
			throw error.toString();
		} else {
			const requestId = getCurrentTime();
			const params = { txHash: hash };
			const request = new Request(requestId, 'icx_getTransactionResult', params);
			return this.provider.request(request, Format.toTransactionResult);
		}
	}

	/**
	 * @description Send a transaction that changes the states of account.
	 * @param {object} signedTransaction Parameters including signature
	 * @return {object} The request object can execute a request
	 */
	sendTransaction(signedTransaction) {
		if (!Validator.isSignedTransaction(signedTransaction)) {
			const error = new DataError('Transaction object is invalid.');
			throw error.toString();
		} else {
			const requestId = getCurrentTime();
			const params = signedTransaction;
			const request = new Request(requestId, 'icx_sendTransaction', params);
			return this.provider.request(request);
		}
	}

	/**
	 * @description Calls a SCORE API just for reading.
	 * @param {object} call The instance of call
	 * @return The request object can execute a request
	 */
	call(call) {
		if (!Validator.isCall(call)) {
			const error = new DataError('Call object is invalid.');
			throw error.toString();
		} else {
			const requestId = getCurrentTime();
			const params = call;
			const request = new Request(requestId, 'icx_call', params);
			return this.provider.request(request);
		}
	}
}

IconService.providers = {
	HttpProvider,
};
