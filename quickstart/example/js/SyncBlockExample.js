/* eslint-disable */

import IconService, { IconConverter, HttpProvider } from 'icon-sdk-js';
import MockData from '../../mockData/index.js';

let syncBlockExample;

class SyncBlockExample {
	constructor() {
		// HttpProvider is used to communicate with http.
		this.provider = new HttpProvider(MockData.NODE_URL);
		
		// Create IconService instance
        this.iconService = new IconService(this.provider);
        this.timer;
        this.prevHeight = null;
        this.addListener();
    }

    addListener() {
        // 1. Sync Block
        const self = this;
		document.getElementById('S01').addEventListener('click', () => {
            document.getElementById('S01').disabled = true;
            self.getLatestBlock();
            self.timer = setInterval(() => { 
                self.getLatestBlock();
            }, 5000);
        });

        document.getElementById('S02').addEventListener('click', () => {
            document.getElementById('S01').disabled = false;
            this.prevHeight = null;
            clearInterval(self.timer);
        });
    }

    getLatestBlock() {
        // Check the recent blocks
        const block = this.iconService.getBlock('latest').execute();
        const nextHeight = block.height;
        document.getElementById('S03-1').innerHTML = nextHeight;
        console.log(this.prevHeight, nextHeight)
        if (this.prevHeight === null || nextHeight - this.prevHeight > 0) {
            if (this.prevHeight === null) this.prevHeight = nextHeight - 1;
            // Print transaction list of block.
            for (let a = this.prevHeight + 1; a - nextHeight < 0; a += 1) {
                this.syncBlock(this.iconService.getBlock(IconConverter.toBigNumber(a)).execute());
            }
            this.syncBlock(block);
        } else {
            // There is no block creation
            console.log(`Synced block height: ${this.prevHeight}`);
        }
    }

    syncBlock(block) {
            // the transaction list of blocks
            console.log(block)
            const txList = block.getTransactions();
            for (let transaction of txList) {
                const txResult = this.iconService.getTransactionResult(transaction.txHash).execute();
    
                // Print icx transaction
                if ((transaction.value !== undefined) && transaction.value > 0) {
                    document.getElementById("S03-2").innerHTML += `<li>${block.height} - [ICX] status: ${txResult.status === 1 ? 'success' : 'failure'}  |  amount: ${transaction.value}</li>`
                }

                // Print token transaction
                if (transaction.dataType !== undefined &&
                    transaction.dataType === "call") {
                    const method = transaction.data.method;
    
                    if (method !== null && method === "transfer") {
                        const params = transaction.data.params;
                        const value = IconConverter.toBigNumber(params["_value"]); // value
                        const toAddr = params["_to"]

                        const tokenName = this.getTokenName(transaction.to);
                        const symbol = this.getTokenSymbol(transaction.to);
                        
                        document.getElementById("S03-2").innerHTML += `<li>${block.height} - [${tokenName} - ${symbol}] status: ${txResult.status === 1 ? 'success' : 'failure'}  |  amount: ${value}</li>`;
                    }
                }
            }
            this.prevHeight = block.height;
    }

    getTokenName(to) {
        const { Builder } = this.iconService;
        const { CallBuilder } = Builder;
        const tokenAddress = to; // token address
        const callBuilder = new CallBuilder();
        const call = callBuilder
            .to(tokenAddress)
            .method("name")
            .build();
        const result = this.iconService.call(call).execute();
        return result;
    }

    getTokenSymbol(to) {
        const { Builder } = this.iconService;
        const { CallBuilder } = Builder;
        const tokenAddress = to; // token address
        const callBuilder = new CallBuilder();
        const call = callBuilder
            .to(tokenAddress)
            .method("symbol")
            .build();
        const result = this.iconService.call(call).execute();
        return result;
    }
}

if (document.getElementById('S01')) {
	syncBlockExample = new SyncBlockExample();
}

export default SyncBlockExample;
