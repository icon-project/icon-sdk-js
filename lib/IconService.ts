/*
 * Copyright 2021 ICON Foundation
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

import BigNumber from "bignumber.js";
import Request from "./transport/jsonrpc/Request";
import Wallet from "./Wallet";
import Builder from "./builder";
import SignedTransaction from "./SignedTransaction";
import * as Validator from "./data/Validator";
import * as Formatter from "./data/Formatter";
import { DataError } from "./Exception";
import * as Util from "./data/Util";
import Amount from "./data/Amount";
import * as Converter from "./data/Converter";
import HttpProvider from "./transport/http/HttpProvider";
import * as Hexadecimal from "./data/Hexadecimal";
import HttpCall from "./transport/http/client/HttpCall";
import Block from "./data/Formatter/Block";
import ScoreApiList from "./data/Formatter/ScoreApiList";
import Transaction from "./data/Formatter/Transaction";
import TransactionResult from "./data/Formatter/TransactionResult";
import { IcxTransaction, MessageTransaction } from "./builder";
import { DepositTransaction, DeployTransaction } from "./builder";
import { Call, CallTransaction } from "./builder";
import { Hash } from "./types/hash";
import BTPNetworkInfo from "./data/Formatter/BTPNetworkInfo";
import BTPNetworkTypeInfo from "./data/Formatter/BTPNetworkTypeInfo";
import BTPSourceInformation from "./data/Formatter/BTPSourceInformation";
import Monitor from "./transport/monitor/Monitor";
import BlockNotification from "./data/Formatter/BlockNotification";
import EventNotification from "./data/Formatter/EventNotification";
import BTPNotification from "./data/Formatter/BTPNotification";
import BlockMonitorSpec from "./transport/monitor/BlockMonitorSpec";
import EventMonitorSpec from "./transport/monitor/EventMonitorSpec";
import BTPMonitorSpec from "./transport/monitor/BTPMonitorSpec";
import ScoreStatus from "./data/Formatter/ScoreStatus";
import NetworkInfo from "./data/Formatter/NetworkInfo";

/**
 * Class which provides APIs of ICON network.
 */
export default class IconService {
  public static IconAmount = Amount;

  public static IconBuilder = Builder;

  public static IconConverter = Converter;

  public static IconWallet = Wallet;

  public static IconUtil = Util;

  public static SignedTransaction = SignedTransaction;

  public static HttpProvider = HttpProvider;

  public static IconHexadecimal = Hexadecimal;

  public static IconValidator = Validator;

  private provider: HttpProvider;
  /**
   * Creates an instance of IconService.
   * @param {HttpProvider} provider - The HttpProvider instance.
   */

  constructor(provider: HttpProvider) {
    this.provider = provider;
  }

  /**
   * Get the total number of issued coins.
   * @param {Hash} [height] - block Height.
   * @return {HttpCall} The HttpCall instance for icx_getTotalSupply JSON-RPC API request.
   */
  getTotalSupply(height?: Hash): HttpCall<BigNumber> {
    let params;
    if (height === undefined) {
      params = null;
    } else {
      params = { height };
    }
    const requestId = Util.getCurrentTime();
    const request = new Request(requestId, "icx_getTotalSupply", params);

    return this.provider.request<BigNumber>(request, Converter.toBigNumber);
  }

  /**
   * Get the balance of the address.
   * @param {string} address - The EOA or SCORE address.
   * @param {Hash} [height] - block Height.
   * @return {HttpCall} The HttpCall instance for icx_getBalance JSON-RPC API request.
   */
  getBalance(address: string, height?: Hash): HttpCall<BigNumber> {
    let params;
    if (height === undefined) {
      params = { address };
    } else {
      params = { address, height: Converter.toHex(height) };
    }
    if (!Validator.isAddress(address)) {
      const error = new DataError(`[${address}] is not valid address.`);
      throw error.toString();
    } else {
      const requestId = Util.getCurrentTime();
      const request = new Request(requestId, "icx_getBalance", params);

      return this.provider.request<BigNumber>(request, Converter.toBigNumber);
    }
  }

  /**
   * @description Get the block information.
   * @param {BigNumber} value The value of block number
   * @return {object} The HttpCall instance for icx_getBlockByHeight JSON-RPC API request.
   */
  getBlockByHeight(value: BigNumber): HttpCall<Block> {
    if (Validator.isNonNegative(value)) {
      const requestId = Util.getCurrentTime();
      const params = { height: Converter.toHex(value) };
      const request = new Request(requestId, "icx_getBlockByHeight", params);

      return this.provider.request(request, Formatter.toBlock);
    }

    const error = new DataError(`[${value}] is an unrecognized block height.`);
    throw error.toString();
  }

  /**
   * @description Get the block information.
   * @param {string} value The value of block hash
   * @return {object} The HttpCall instance for icx_getBlockByHash JSON-RPC API request.
   */
  getBlockByHash(value: string): HttpCall<Block> {
    if (Validator.isValidHash(value)) {
      const requestId = Util.getCurrentTime();
      const params = { hash: value };
      const request = new Request(requestId, "icx_getBlockByHash", params);

      return this.provider.request(request, Formatter.toBlock);
    }

    const error = new DataError(`[${value}] is an unrecognized block hash.`);
    throw error.toString();
  }

  /**
   * @description Get the last block information.
   * @return {object} The HttpCall instance for icx_getLastBlock JSON-RPC API request.
   */
  getLastBlock(): HttpCall<Block> {
    const requestId = Util.getCurrentTime();
    const request = new Request(requestId, "icx_getLastBlock", null);

    return this.provider.request(request, Formatter.toBlock);
  }

  /**
   * @description Get the SCORE API list.
   * @param {string} address SCORE address
   * @param {Hash} [height] block Height
   * @return {array} The HttpCall instance for icx_getScoreApi JSON-RPC API request.
   */
  getScoreApi(address: string, height?: Hash): HttpCall<ScoreApiList> {
    let params;
    if (height === undefined) {
      params = { address };
    } else {
      params = { address, height: Converter.toHex(height) };
    }
    if (!Validator.isScoreAddress(address)) {
      const error = new DataError(`[${address}] is not a valid SCORE address.`);
      throw error.toString();
    } else {
      const requestId = Util.getCurrentTime();
      const request = new Request(requestId, "icx_getScoreApi", params);

      return this.provider.request(request, Formatter.toScoreApiList);
    }
  }

  /**
   * @description Get the SCORE status
   * @param {string} address SCORE address
   * @param {Hash} [height] block Height
   * @return {object} The HttpCall instance for icx_getScoreStatus JSON-RPC API request.
   */
  getScoreStatus(address: string, height?: Hash): HttpCall<ScoreStatus> {
    let params;
    if (height === undefined) {
      params = { address };
    } else {
      params = { address, height: Converter.toHex(height) };
    }
    if (!Validator.isScoreAddress(address)) {
      const error = new DataError(`[${address}] is not a valid SCORE address.`);
      throw error.toString();
    } else {
      const requestId = Util.getCurrentTime();
      const request = new Request(requestId, "icx_getScoreStatus", params);

      return this.provider.request(request, (data) => new ScoreStatus(data));
    }
  }

  /**
   * Get the transaction information.
   * @param {string} hash - The transaction hash.
   * @return {HttpCall} The HttpCall instance for icx_getTransactionByHash JSON-RPC API request.
   */
  getTransaction(hash: string): HttpCall<Transaction> {
    if (!Validator.isValidHash(hash)) {
      const error = new DataError(`[${hash}] is an unrecognized hash value.`);
      throw error.toString();
    } else {
      const requestId = Util.getCurrentTime();
      const params = { txHash: hash };
      const request = new Request(
        requestId,
        "icx_getTransactionByHash",
        params
      );

      return this.provider.request(request, Formatter.toTransaction);
    }
  }

  /**
   * Get the result of transaction by transaction hash.
   * @param {string} hash - The transaction hash.
   * @return {HttpCall} The HttpCall instance for icx_getTransactionResult JSON-RPC API request.
   */
  getTransactionResult(hash: string): HttpCall<TransactionResult> {
    if (!Validator.isValidHash(hash)) {
      const error = new DataError(`[${hash}] is an unrecognized hash value.`);
      throw error.toString();
    } else {
      const requestId = Util.getCurrentTime();
      const params = { txHash: hash };
      const request = new Request(
        requestId,
        "icx_getTransactionResult",
        params
      );

      return this.provider.request(request, Formatter.toTransactionResult);
    }
  }

  /**
   * Send a transaction that changes the states of address.
   * @param {SignedTransaction} signedTransaction - Parameters including signature.
   * @return {HttpCall} The HttpCall instance for icx_sendTransaction JSON-RPC API request.
   */
  sendTransaction(signedTransaction: SignedTransaction): HttpCall<string> {
    if (!Validator.isSignedTransaction(signedTransaction)) {
      const error = new DataError("Transaction object is invalid.");
      throw error.toString();
    } else {
      const requestId = Util.getCurrentTime();
      const params = signedTransaction.getProperties();
      const request = new Request(requestId, "icx_sendTransaction", params);

      return this.provider.request(request);
    }
  }

  /**
   * Returns an estimated step of how much step is necessary to allow the transaction to complete.
   * @param {SignedTransaction} transaction - Parameters
   * @return {HttpCall} The HttpCall instance for debug_estimateStep JSON-RPC API request.
   */
  estimateStep(
    transaction:
      | IcxTransaction
      | MessageTransaction
      | DepositTransaction
      | DeployTransaction
      | CallTransaction
  ): HttpCall<BigNumber> {
    const rawTx = Converter.toRawTransaction(transaction);
    if (!Validator.checkTxData(rawTx)) {
      const error = new DataError("Transaction object is invalid.");
      throw error.toString();
    } else {
      const requestId = Util.getCurrentTime();
      const request = new Request(requestId, "debug_estimateStep", rawTx);

      return this.provider.request(request, Converter.toBigNumber);
    }
  }

  /**
   * Calls a SCORE API just for reading.
   * @param {Call} call - The call instance exported by CallBuilder
   * @return {HttpCall} The HttpCall instance for icx_call JSON-RPC API request.
   */
  // eslint-disable-next-line
  call(call: Call): HttpCall<any> {
    if (!Validator.isCall(call)) {
      const error = new DataError("Call object is invalid.");
      throw error.toString();
    } else {
      const requestId = Util.getCurrentTime();
      const request = new Request(requestId, "icx_call", call);

      return this.provider.request(request);
    }
  }

  /**
   * sends a transaction like `icx_sendTransaction`, then it will wait for the
   result of it for specified time.  If the timeout isn't set by user, it uses
   `defaultWaitTimeout` of icon node.
   * @param {SignedTransaction} signedTransaction - Parameters including signature.
   * @return {HttpCall} The HttpCall instance for icx_sendTransactionAndWait JSON-RPC API request.
   */
  sendTransactionAndWait(
    signedTransaction: SignedTransaction
  ): HttpCall<string> {
    if (!Validator.isSignedTransaction(signedTransaction)) {
      const error = new DataError("Transaction object is invalid.");
      throw error.toString();
    }
    const requestId = Util.getCurrentTime();
    const params = signedTransaction.getProperties();
    const request = new Request(
      requestId,
      "icx_sendTransactionAndWait",
      params
    );
    return this.provider.request(request);
  }

  /**
   * It will wait for the result of the transaction for specified time.
   * If the timeout isn't set by user, it uses `defaultWaitTimeout` of icon node.
   * @param {string} hash - The transaction hash.
   * @return {HttpCall} The HttpCall instance for icx_waitTransactionResult JSON-RPC API request.
   */
  waitTransactionResult(hash: string): HttpCall<TransactionResult> {
    if (!Validator.isValidHash(hash)) {
      const error = new DataError(`[${hash}] is an unrecognized hash value.`);
      throw error.toString();
    }
    const requestId = Util.getCurrentTime();
    const params = { txHash: hash };
    const request = new Request(requestId, "icx_waitTransactionResult", params);
    return this.provider.request(request, Formatter.toTransactionResult);
  }

  /**
   * Get data by hash.
   It can be used to retrieve data based on the hash algorithm (SHA3-256).
   Following data can be retrieved by a hash.

   * BlockHeader with the hash of the block
   * Validators with BlockHeader.NextValidatorsHash
   * Votes with BlockHeader.VotesHash
   * etc…
   * @param {string} hash - The hash value of the data to retrieve
   * @return {HttpCall} The HttpCall instance for icx_getDataByHash JSON-RPC API request.
   */
  getDataByHash(hash: string): HttpCall<string> {
    if (!Validator.isValidHash(hash)) {
      const error = new DataError(`[${hash}] is an unrecognized hash value.`);
      throw error.toString();
    }
    const requestId = Util.getCurrentTime();
    const params = { hash };
    const request = new Request(requestId, "icx_getDataByHash", params);
    return this.provider.request(request);
  }

  /**
   * Get block header for specified height.
   * @param {BigNumber | string} height - The height of the block.
   * @return {HttpCall} The HttpCall instance for icx_getBlockHeaderByHeight JSON-RPC API request.
   */
  getBlockHeaderByHeight(height: string | BigNumber): HttpCall<string> {
    if (!Validator.isNonNegative(height)) {
      const error = new DataError(
        `[${height}] is an unrecognized block height`
      );
      throw error.toString();
    }
    const requestId = Util.getCurrentTime();
    const params = { height: Converter.toHex(height) };
    const request = new Request(
      requestId,
      "icx_getBlockHeaderByHeight",
      params
    );
    return this.provider.request(request);
  }

  /**
   * Get votes for the block specified by height.
   * @param {BigNumber} height - The height of the block.
   * @return {HttpCall} The HttpCall instance for icx_getVotesByHeight JSON-RPC API request.
   */
  getVotesByHeight(height: string | BigNumber): HttpCall<string> {
    if (!Validator.isNonNegative(height)) {
      const error = new DataError(
        `[${height}] is an unrecognized block height`
      );
      throw error.toString();
    }
    const requestId = Util.getCurrentTime();
    const params = { height: Converter.toHex(height) };
    const request = new Request(requestId, "icx_getVotesByHeight", params);
    return this.provider.request(request);
  }

  /**
   * Get proof for the receipt
   * @param {string} hash - The hash value of the block including the result
   * @param {string} index - Index of the receipt in the block
   * @return {HttpCall} The HttpCall instance for icx_getProofForResult JSON-RPC API request.
   */
  getProofForResult(
    hash: string,
    index: string | BigNumber
  ): HttpCall<string[]> {
    if (!Validator.isValidHash(hash)) {
      const error = new DataError(`[${hash}] is an unrecognized hash value.`);
      throw error.toString();
    }
    if (!Validator.isNonNegative(index)) {
      const error = new DataError(`index must be non-negative number`);
      throw error.toString();
    }
    const requestId = Util.getCurrentTime();
    const params = { hash, index: Converter.toHex(index) };
    const request = new Request(requestId, "icx_getProofForResult", params);
    return this.provider.request(request);
  }

  /**
   * Get proof for the receipt and the events in it
   * @param {string} hash - The hash value of the block including the result
   * @param index - Index of the receipt in the block
   * @param events - List of indexes of the events in the receipt
   * @return {HttpCall} The HttpCall instance for icx_getProofForEvents JSON-RPC API request.
   */
  getProofForEvents(
    hash: string,
    index: string | BigNumber,
    events: Array<string | BigNumber>
  ): HttpCall<string[][]> {
    if (!Validator.isValidHash(hash)) {
      const error = new DataError(`[${hash}] is an unrecognized hash value.`);
      throw error.toString();
    }
    if (!Validator.isNonNegative(index)) {
      const error = new DataError(`index must be none-negative number`);
      throw error.toString();
    }
    if (!events.every(Validator.isNonNegative)) {
      const error = new DataError(
        `All event index must be none-negative number`
      );
      throw error.toString();
    }
    const requestId = Util.getCurrentTime();
    const params = {
      hash,
      index: Converter.toHex(index),
      events: events.map(Converter.toHex),
    };
    const request = new Request(requestId, "icx_getProofForEvents", params);
    return this.provider.request(request);
  }

  /**
   * Get BTP network information.
   * @param id - network id
   * @param height - Main block height
   * @return {HttpCall} The HttpCall instance for btp_getNetworkInfo JSON-RPC API request.
   */
  getBTPNetworkInfo(
    id: string | BigNumber,
    height?: string | BigNumber
  ): HttpCall<BTPNetworkInfo> {
    let params;
    if (height === undefined) params = { id };
    else params = { id, height };

    const requestId = Util.getCurrentTime();
    const request = new Request(requestId, "btp_getNetworkInfo", params);

    return this.provider.request(request, (data) => new BTPNetworkInfo(data));
  }

  /**
   * Get BTP network type information.
   * @param id - Network type id
   * @param height - Main block height
   * @return {HttpCall} The HttpCall instance for btp_getNetworkTypeInfo JSON-RPC API request.
   */
  getBTPNetworkTypeInfo(
    id: string | BigNumber,
    height?: string | BigNumber
  ): HttpCall<BTPNetworkTypeInfo> {
    let params;
    if (height === undefined) params = { id };
    else params = { id, height };

    const requestId = Util.getCurrentTime();
    const request = new Request(requestId, "btp_getNetworkTypeInfo", params);

    return this.provider.request(
      request,
      (data) => new BTPNetworkTypeInfo(data)
    );
  }

  /**
   * Get BTP messages
   * @param networkID - BTP network ID
   * @param height - Main block height
   * @return {HttpCall} The HttpCall instance for btp_getMessages JSON-RPC API request.
   */
  getBTPMessages(
    networkID: string | BigNumber,
    height: string | BigNumber
  ): HttpCall<Array<string>> {
    const params = { networkID, height };
    const requestId = Util.getCurrentTime();
    const request = new Request(requestId, "btp_getMessages", params);
    return this.provider.request<Array<string>>(request);
  }

  /**
   * Get BTP block header
   * @param networkID - Network id
   * @param height - Main block height
   * @return {HttpCall} The HttpCall instance for btp_getHeader JSON-RPC API request.
   */
  getBTPHeader(
    networkID: string | BigNumber,
    height: string | BigNumber
  ): HttpCall<string> {
    const params = { networkID, height };
    const requestId = Util.getCurrentTime();
    const request = new Request(requestId, "btp_getHeader", params);
    return this.provider.request<string>(request);
  }

  /**
   * Get BTP block proof
   * @param networkID - Network id
   * @param height - Main block height
   * @return {HttpCall} The HttpCall instance for btp_getProof JSON-RPC API request.
   */
  getBTPProof(
    networkID: string | BigNumber,
    height: string | BigNumber
  ): HttpCall<string> {
    const params = { networkID, height };
    const requestId = Util.getCurrentTime();
    const request = new Request(requestId, "btp_getProof", params);
    return this.provider.request<string>(request);
  }

  /**
   * Get source network information
   * @return {HttpCall} The HttpCall instance for btp_getSourceInformation JSON-RPC API request.
   */
  getBTPSourceInformation(): HttpCall<BTPSourceInformation> {
    const requestId = Util.getCurrentTime();
    const request = new Request(requestId, "btp_getSourceInformation", null);
    return this.provider.request(
      request,
      (data) => new BTPSourceInformation(data)
    );
  }

  /***
   * Get basic network Information.
   */
  getNetworkInfo(): HttpCall<NetworkInfo> {
    const requestId = Util.getCurrentTime();
    const request = new Request(requestId, "icx_getNetworkInfo", null);
    return this.provider.request(request, (data) => new NetworkInfo(data));
  }

  /**
   * Get the transaction trace.
   * @param {string} hash - The transaction hash.
   * @return {HttpCall} The HttpCall instance for debug_getTrace JSON-RPC API request.
   */
  getTrace(hash: string): HttpCall<object> {
    if (!Validator.isValidHash(hash)) {
      const error = new DataError(`[${hash}] is an unrecognized hash value.`);
      throw error.toString();
    } else {
      const requestId = Util.getCurrentTime();
      const params = { txHash: hash };
      const request = new Request(requestId, "debug_getTrace", params);
      return this.provider.request(request);
    }
  }

  /***
   * Get monitor for block.
   * @param monitorSpec
   * @param ondata - Callback to be called when Monitor successfully got messages
   * @param onerror - Callback to be called when a network error or os error occurs
   * @return {Monitor<BlockNotification>} The Monitor instance for `block` websocket API
   */
  monitorBlock(
    monitorSpec: BlockMonitorSpec,
    ondata: (notification: BlockNotification) => void,
    onerror: (error) => void
  ): Monitor<BlockNotification> {
    return this.provider.monitor(monitorSpec, ondata, onerror);
  }

  /***
   * Get monitor for event
   * @param monitorSpec
   * @param ondata - Callback to be called when Monitor successfully got messages
   * @param onerror - Callback to be called when a network error or os error occurs
   * @param onprogress - Callback to be called when the block is processed
   * @return {Monitor<EventNotification>} The Monitor instance for `event` websocket API
   */
  monitorEvent(
    monitorSpec: EventMonitorSpec,
    ondata: (notification: EventNotification) => void,
    onerror: (error) => void,
    onprogress?: (height: BigNumber) => void
  ): Monitor<EventNotification> {
    return this.provider.monitor(monitorSpec, ondata, onerror, onprogress);
  }

  /***
   * Get monitor for btp
   * @param monitorSpec
   * @param ondata - Callback to be called when Monitor successfully got messages
   * @param onerror - Callback to be called when a network error or os error occurs
   * @param onprogress - Callback to be called when the block is processed
   * @return {Monitor<BTPNotification>} The Monitor instance for `btp` websocket API
   */
  monitorBTP(
    monitorSpec: BTPMonitorSpec,
    ondata: (notification: BTPNotification) => void,
    onerror: (error) => void,
    onprogress?: (height: BigNumber) => void
  ): Monitor<BTPNotification> {
    return this.provider.monitor(monitorSpec, ondata, onerror, onprogress);
  }
}
