/* eslint-disable */

import IconService from 'icon-sdk-js';
const { IconConverter, HttpProvider } = IconService;
import MockData from '../../mockData/index.js';

let syncBlockExample;
let intervalFlag = false;

const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));
const intervalGetLatestBlock = async (self, interval) => {
  while (intervalFlag) {
    await Promise.all([self.getLatestBlock(), sleep(interval)])
  }
}

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
    document.getElementById('S01').addEventListener('click', async () => {
            document.getElementById('S01').disabled = true;
            intervalFlag = true;
            await intervalGetLatestBlock(self, 5000);
        });

        document.getElementById('S02').addEventListener('click', () => {
            document.getElementById('S01').disabled = false;
            this.prevHeight = null;
            intervalFlag = false;
        });
    }

    async getLatestBlock() {
        // Check the recent blocks
        console.log(this)
        const block = await this.iconService.getLastBlock().execute();
        const nextHeight = block.height;
        document.getElementById('S03-1').innerHTML = nextHeight;
        console.log(this.prevHeight, nextHeight)
        if (this.prevHeight === null || nextHeight - this.prevHeight > 0) {
            if (this.prevHeight === null) this.prevHeight = nextHeight - 1;
            // Print transaction list of block.
            var blockArr = [];
            for (let a = this.prevHeight + 1; a - nextHeight < 0; a += 1) {
                blockArr.push(a);
            }
            Promise.all(
                blockArr.map(async (block) => {
                    var nextBlock = await this.iconService.getBlockByHeight(IconConverter.toBigNumber(a)).execute();
                    await this.syncBlock(nextBlock);
                })
            );
            await this.syncBlock(block);
        } else {
            // There is no block creation
            console.log(`Synced block height: ${this.prevHeight}`);
        }
    }

    async syncBlock(block) {
        // the transaction list of blocks
        console.log(block)
        const txList = block.getTransactions();

        Promise.all(
            txList.map(async transaction => {
                const txResult = await this.iconService.getTransactionResult(transaction.txHash).execute();

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
                        const toAddr = params["_to"];

                        const tokenName = await this.getTokenName(transaction.to);
                        const symbol = await this.getTokenSymbol(transaction.to);

                        document.getElementById("S03-2").innerHTML += `<li>${block.height} - [${tokenName} - ${symbol}] status: ${txResult.status === 1 ? 'success' : 'failure'}  |  amount: ${value}</li>`;
                    }
                }
            })
        )

        this.prevHeight = block.height;
    }

    async getTokenName(to) {
        const { Builder } = this.iconService;
        const { CallBuilder } = Builder;
        const tokenAddress = to; // token address
        const callBuilder = new CallBuilder();
        const call = callBuilder
            .to(tokenAddress)
            .method("name")
            .build();
        const result = await this.iconService.call(call).execute();
        return result;
    }

    async getTokenSymbol(to) {
        const { Builder } = this.iconService;
        const { CallBuilder } = Builder;
        const tokenAddress = to; // token address
        const callBuilder = new CallBuilder();
        const call = callBuilder
            .to(tokenAddress)
            .method("symbol")
            .build();
        const result = await this.iconService.call(call).execute();
        return result;
    }
}

if (document.getElementById('S01')) {
  syncBlockExample = new SyncBlockExample();
}

export default SyncBlockExample;
