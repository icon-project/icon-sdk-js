import Request from './transport/jsonrpc/Request';
import HttpProvider from './transport/http/HttpProvider';
import Wallet from './Wallet';
import Builder from './builder/Builder';
import SignedTransaction from './SignedTransaction';
import { is0xPrefix } from './data/Hexadecimal';
import {
    isLastBlockValue,
    isAddress,
    isContractAddress,
    isTransactionHash,
} from './data/Validation';

export default class IconService {
    constructor(provider) {
        this.provider = provider;
        this.wallet = Wallet;
        this.Builder = Builder;
        this.SignedTransaction = SignedTransaction;
    }

    getTotalSupply() {
        const requestId = (new Date()).getTime();
        const request = new Request(requestId, "icx_getTotalSupply", null);
        return this.provider.request(request);
    }

    getBalance(address) {
        if (!isAddress(address)) {
            throw new Error('invalid address')
        }

        const requestId = (new Date()).getTime();
        const params = { "address": address };
        const request = new Request(requestId, "icx_getBalance", params);
        return this.provider.request(request);
    }

    getBlock(value) {
        if (isNumeric(value)) {
            const requestId = (new Date()).getTime();
            const params = { "height": value };
            const request = new Request(requestId, "icx_getBlockByHeight", params);
            return this.provider.request(request);
        }
        else if (is0xPrefix(value)) {
            const requestId = (new Date()).getTime();
            const params = { "hash": value };
            const request = new Request(requestId, "icx_getBlockByHash", params);
            return this.provider.request(request);
        }
        else if (isLastBlockValue(value)) {
            const requestId = (new Date()).getTime();
            const request = new Request(requestId, "icx_getLastBlock", null);
            return this.provider.request(request);
        }
        else {
            throw new Error('invalid value')
        }
    }

    getScoreApi(address) {
        if (!isContractAddress(address)) {
            throw new Error('invalid contract address')
        }
        else {
            const requestId = (new Date()).getTime();
            const params = { "address": address };
            const request = new Request(requestId, "icx_getScoreApi", params);        
            return this.provider.request(request);
        }
    }

    getTransaction(hash) {
        if (!isTransactionHash(hash)) {
            throw new Error('invalid tx hash')
        }
        else {
            const requestId = (new Date()).getTime();
            const params = { "txHash": hash };
            const request = new Request(requestId, "icx_getTransactionByHash", params);            
            return this.provider.request(request);
        }
    }

    getTransactionResult(hash) {
        if (!isTransactionHash(hash)) {
            throw new Error('invalid tx hash')
        }
        else {
            const requestId = (new Date()).getTime();
            const params = { "txHash": hash };
            const request = new Request(requestId, "icx_getTransactionResult", params);
            return this.provider.request(request);
        }
    }

    call(call) {
        const requestId = (new Date()).getTime();
        const params = call;
        const request = new Request(requestId, "icx_call", params);
        return this.provider.request(request);
    }

    sendTransaction(signedTransaction) {
        const requestId = (new Date()).getTime();
        const params = signedTransaction;
        const request = new Request(requestId, "icx_sendTransaction", params);
        return this.provider.request(request);
    }
}

IconService.providers = {
    HttpProvider: HttpProvider
}