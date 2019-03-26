/*
 * Copyright 2018 ICON Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import Request from './transport/jsonrpc/Request';
import Wallet from './Wallet';
import Builder from './builder';
import SignedTransaction from './SignedTransaction';
import * as Validator from './data/Validator';
import * as Formatter from './data/Formatter';
import { DataError } from './Exception';
import * as Util from './data/Util';
import Amount from './data/Amount';
import * as Converter from './data/Converter';
import HttpProvider from './transport/http/HttpProvider';
import * as Hexadecimal from './data/Hexadecimal';

/**
 * Class which provides APIs of ICON network.
 */
export default class IconService {
	/**
	 * Creates an instance of IconService.
	 * @param {HttpProvider} provider - The HttpProvider instance.
	 */
	constructor(provider) {
		this.provider = provider;
	}

	/**
	 * Get the total number of issued coins.
	 * @return {HttpCall} The HttpCall instance for icx_getTotalSupply JSON-RPC API request.
	 */
	getTotalSupply() {
		const requestId = Util.getCurrentTime();
		const request = new Request(requestId, 'icx_getTotalSupply', null);
		return this.provider.request(request, Converter.toBigNumber);
	}

	/**
	 * Get the balance of the address.
	 * @param {string} address - The EOA or SCORE address.
	 * @return {HttpCall} The HttpCall instance for icx_getBalance JSON-RPC API request.
	 */
	getBalance(address) {
		if (!Validator.isAddress(address)) {
			const error = new DataError(`[${address}] is not valid address.`);
			throw error.toString();
		} else {
			const requestId = Util.getCurrentTime();
			const params = { address };
			const request = new Request(requestId, 'icx_getBalance', params);
			return this.provider.request(request, Converter.toBigNumber);
		}
	}

	/**
	 * Get the block information.
	 * @param {string|BigNumber} value - The height or hash value of block.
	 * @return {HttpCall} The HttpCall instance for icx_getBlockByHeight,
	 * 	icx_getBlockByHash or icx_getLastBlock JSON-RPC API request.
	 */
	/* TODO: add description of number, hash and latest string */
	getBlock(value) {
		if (Validator.isBlockHash(value)) {
			return this.getBlockByHash(value);
		}
		if (Validator.isBlockNumber(value)) {
			return this.getBlockByHeight(value);
		}
		if (Validator.isPredefinedBlockValue(value)) {
			return this.getLastBlock();
		}

		const error = new DataError(`[${value}] is an unrecognized block reference.`);
		throw error.toString();
	}

	/**
	 * @description Get the block information.
	 * @param {BigNumber} value The value of block number
	 * @return {object} The Block object
	 */
	getBlockByHeight(value) {
		if (Validator.isBlockNumber(value)) {
			const requestId = Util.getCurrentTime();
			const params = { height: Converter.toHex(value) };
			const request = new Request(requestId, 'icx_getBlockByHeight', params);
			return this.provider.request(request, Formatter.toBlock);
		}

		const error = new DataError(`[${value}] is an unrecognized block height.`);
		throw error.toString();
	}

	/**
	 * @description Get the block information.
	 * @param {string} value The value of block hash
	 * @return {object} The Block object
	 */
	getBlockByHash(value) {
		if (Validator.isBlockHash(value)) {
			const requestId = Util.getCurrentTime();
			const params = { hash: value };
			const request = new Request(requestId, 'icx_getBlockByHash', params);
			return this.provider.request(request, Formatter.toBlock);
		}

		const error = new DataError(`[${value}] is an unrecognized block hash.`);
		throw error.toString();
	}

	/**
	 * @description Get the last block information.
	 * @return {object} The Block object
	 */
	getLastBlock() {
		const requestId = Util.getCurrentTime();
		const request = new Request(requestId, 'icx_getLastBlock', null);
		return this.provider.request(request, Formatter.toBlock);
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
			const requestId = Util.getCurrentTime();
			const params = { address };
			const request = new Request(requestId, 'icx_getScoreApi', params);
			return this.provider.request(request, Formatter.toScoreApiList);
		}
	}

	/**
	 * Get the transaction information.
	 * @param {string} hash - The transaction hash.
	 * @return {HttpCall} The HttpCall instance for icx_getTransactionByHash JSON-RPC API request.
	 */
	getTransaction(hash) {
		if (!Validator.isTransactionHash(hash)) {
			const error = new DataError(`[${hash}] is an unrecognized hash value.`);
			throw error.toString();
		} else {
			const requestId = Util.getCurrentTime();
			const params = { txHash: hash };
			const request = new Request(requestId, 'icx_getTransactionByHash', params);
			return this.provider.request(request, Formatter.toTransaction);
		}
	}

	/**
	 * Get the result of transaction by transaction hash.
	 * @param {string} hash - The transaction hash.
	 * @return {HttpCall} The HttpCall instance for icx_getTransactionResult JSON-RPC API request.
	 */
	getTransactionResult(hash) {
		if (!Validator.isTransactionHash(hash)) {
			const error = new DataError(`[${hash}] is an unrecognized hash value.`);
			throw error.toString();
		} else {
			const requestId = Util.getCurrentTime();
			const params = { txHash: hash };
			const request = new Request(requestId, 'icx_getTransactionResult', params);
			return this.provider.request(request, Formatter.toTransactionResult);
		}
	}

	/**
	 * Send a transaction that changes the states of address.
	 * @param {SignedTransaction} signedTransaction - Parameters including signature.
	 * @return {HttpCall} The HttpCall instance for icx_sendTransaction JSON-RPC API request.
	 */
	sendTransaction(signedTransaction) {
		if (!Validator.isSignedTransaction(signedTransaction)) {
			const error = new DataError('Transaction object is invalid.');
			throw error.toString();
		} else {
			const requestId = Util.getCurrentTime();
			const params = signedTransaction.getProperties();
			const request = new Request(requestId, 'icx_sendTransaction', params);
			return this.provider.request(request);
		}
	}

	/**
	 * Calls a SCORE API just for reading.
	 * @param {Call} call - The call instance exported by CallBuilder
	 * @return {HttpCall} The HttpCall instance for icx_call JSON-RPC API request.
	 */
	call(call) {
		if (!Validator.isCall(call)) {
			const error = new DataError('Call object is invalid.');
			throw error.toString();
		} else {
			const requestId = Util.getCurrentTime();
			const params = call;
			const request = new Request(requestId, 'icx_call', params);
			return this.provider.request(request);
		}
	}
}

IconService.IconAmount = Amount;
IconService.IconBuilder = Builder;
IconService.IconConverter = Converter;
IconService.IconWallet = Wallet;
IconService.IconUtil = Util;
IconService.SignedTransaction = SignedTransaction;
IconService.HttpProvider = HttpProvider;
IconService.IconHexadecimal = Hexadecimal;
IconService.IconValidator = Validator;
