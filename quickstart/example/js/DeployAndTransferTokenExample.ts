/* eslint-disable */

import IconService from 'icon-sdk-js';
const { IconAmount, IconConverter, HttpProvider, IconWallet, IconBuilder, SignedTransaction } = IconService;
import MockData from '../../mockData/index.js';

let deployAndTransferTokenExample;

class DeployAndTransferTokenExample {
  constructor() {
    // HttpProvider is used to communicate with http.
    this.provider = new HttpProvider(MockData.NODE_URL);

    // Create IconService instance
        this.iconService = new IconService(this.provider);

        // Load wallet
        this.wallet = IconWallet.loadPrivateKey(MockData.PRIVATE_KEY_1);

        this.deployTxHash = '';
        this.transactionTxHash = '';
        this.content = '';

        this.scoreAddress = '';

        this.addListener();
    }

    addListener() {
        // 1. Upload Score File
    document.getElementById('D01').addEventListener('click', async () => {
      await this.readFile();
        });

        // 2. Check Score Deployment TX Status
    document.getElementById('D02').addEventListener('click', async () => {
      await this.checkDeployTxStatus();
        });

        // 3. Send ST Token
    document.getElementById('D03').addEventListener('click', async () => {
      await this.sendTransaction();
        });

        // 4. Check ST Token Balance
    document.getElementById('D04').addEventListener('click', async () => {
      await this.getTokenBalance(MockData.WALLET_ADDRESS_1);
            await this.getTokenBalance(MockData.WALLET_ADDRESS_2);
        });

        // 5. Check ST Token Transaction TX Status
    document.getElementById('D05').addEventListener('click', async () => {
      await this.checkTransactionTxStatus();
        });
    }

    async readFile() {
        let input, file, fr;
        const self = this;

        if (typeof window.FileReader !== 'function') {
            document.getElementById('D01-1').innerHTML = "The file API isn't supported on this browser yet.";
            return;
        }

        try {
            input = document.getElementById('fileinput');
            file = input.files[0];
            fr = new FileReader();
            fr.onload = async () => {
                self.content = showResult(fr);
                await self.deployScore();
            };
            fr.readAsBinaryString(file);

            function showResult (fr) {
                let markup, result, n, aByte, byteStr;
                markup = [];
                result = fr.result;
                for (n = 0; n < result.length; ++n) {
                    aByte = result.charCodeAt(n);
                    byteStr = aByte.toString(16);
                    if (byteStr.length < 2) {
                        byteStr = "0" + byteStr;
                    }
                    markup.push(byteStr);
                }
                return markup.join("");
            }
        } catch (e) {
            document.getElementById('D01-1').innerHTML = e.message;
        }
    }

    async deployScore() {
        // Build raw transaction object
        const transaction = await this.buildDeployTransaction();
        // Create signature of the transaction
        const signedTransaction = new SignedTransaction(transaction, this.wallet);
        // Read params to transfer to nodes
        const signedTransactionProperties = JSON.stringify(signedTransaction.getProperties()).split(",").join(", \n")
        document.getElementById('D01-2').innerHTML = `<b>Signed Transaction</b>: ${signedTransactionProperties}`;
        // Send transaction
        this.deployTxHash = await this.iconService.sendTransaction(signedTransaction).execute();
        document.getElementById('D02-1').innerHTML = this.deployTxHash;
        // Print transaction hash
        document.getElementById('D01-3').innerHTML = `<b>Transfer Request Complete.</b> Tx hash is ${this.deployTxHash}`;
    }

    async buildDeployTransaction() {
        const { DeployTransactionBuilder } = IconBuilder;

        const initialSupply = IconConverter.toBigNumber("100000000000");
        const decimals = IconConverter.toBigNumber("18");
        const tokenName = "StandardToken";
        const tokenSymbol = "ST";
        const contentType = "application/zip";
        // Enter token information
        // key name ("initialSupply", "decimals", "name", "symbol")
        // You must enter the given values. Otherwise, your transaction will be rejected.
        const params = {
            initialSupply: IconConverter.toHex(initialSupply),
            decimals: IconConverter.toHex(decimals),
            name: tokenName,
            symbol: tokenSymbol
        }
        const installScore = MockData.SCORE_INSTALL_ADDRESS;
        const stepLimit = await this.getMaxStepLimit();
        const walletAddress = this.wallet.getAddress();
        // networkId of node 1:mainnet, 2~:etc
        const networkId = IconConverter.toBigNumber(3);
        const version = IconConverter.toBigNumber(3);
        // Timestamp is used to prevent the identical transactions. Only current time is required (Standard unit : us)
        // If the timestamp is considerably different from the current time, the transaction will be rejected.
        const timestamp = (new Date()).getTime() * 1000;

        //Enter transaction information
        const deployTransactionBuilder = new DeployTransactionBuilder();
        const transaction = deployTransactionBuilder
            .nid(networkId)
            .from(walletAddress)
            .to(installScore)
            .stepLimit(stepLimit)
            .timestamp(timestamp)
            .contentType(contentType)
            .content(`0x${this.content}`)
            .params(params)
            .version(version)
            .build();
        return transaction;
    }

    async getMaxStepLimit() {
        const { CallBuilder } = IconBuilder;

        const governanceApi = await this.iconService.getScoreApi(MockData.GOVERNANCE_ADDRESS).execute();
        // "getMaxStepLimit" : the maximum step limit value that any SCORE execution should be bounded by.
        const methodName = 'getMaxStepLimit';
        // Check input and output parameters of api if you need
        const getMaxStepLimitApi = governanceApi.getMethod(methodName);
        const getMaxStepLimitApiInputs = getMaxStepLimitApi.inputs.length > 0 ? JSON.stringify(getMaxStepLimitApi.inputs) : 'none';
        const getMaxStepLimitApiOutputs = getMaxStepLimitApi.outputs.length > 0 ? JSON.stringify(getMaxStepLimitApi.outputs) : 'none';
        console.log(`[getMaxStepLimit]\n inputs: ${getMaxStepLimitApiInputs} \n outputs: ${getMaxStepLimitApiOutputs}`);

        const params = {};
        params[getMaxStepLimitApi.inputs[0].name] = 'invoke';

        // Get max step limit by iconService.call
        const callBuilder = new CallBuilder();
        const call = callBuilder
            .to(MockData.GOVERNANCE_ADDRESS)
            .method(methodName)
            .params(params)
            .build();
        const maxStepLimit = await this.iconService.call(call).execute();
        return IconConverter.toBigNumber(maxStepLimit)
    }

    async checkDeployTxStatus() {
        if (!this.deployTxHash) {
            document.getElementById('D02-1').innerHTML = 'Deploy ST Token first.';
        }
        const transactionResult = await this.iconService.getTransactionResult(this.deployTxHash).execute();
        const status = transactionResult.status === 1 ? 'success' : 'failure';
        this.scoreAddress = transactionResult.scoreAddress;
        document.getElementById('D02-2').innerHTML = `<b>tx status</b> : ${status}`;

        if (this.scoreAddress) {
            document.getElementById('D02-3').innerHTML = `<b>Your score address</b> : ${this.scoreAddress}`;
            this.getTokenBalance(MockData.WALLET_ADDRESS_1);
            this.getTokenBalance(MockData.WALLET_ADDRESS_2);
        }
    }

    async sendTransaction() {
        if (!this.scoreAddress) {
            document.getElementById('D03-1').innerHTML = 'Deploy ST Token and check deployment transaction first.';
            return;
        }

        // Build raw transaction object
        const transaction = await this.buildTokenTransaction();
        // Create signature of the transaction
        const signedTransaction = new SignedTransaction(transaction, this.wallet);
        // Read params to transfer to nodes
        const signedTransactionProperties = JSON.stringify(signedTransaction.getProperties()).split(",").join(", \n")
        document.getElementById('D03-1').innerHTML = `<b>Signed Transaction</b>: ${signedTransactionProperties}`;
        // Send transaction
        this.transactionTxHash = await this.iconService.sendTransaction(signedTransaction).execute();
        document.getElementById('D05-1').innerHTML = this.transactionTxHash;
        // Print transaction hash
        document.getElementById('D03-2').innerHTML = `<b>Transfer Request Complete.</b> Tx hash is ${this.transactionTxHash}`;
    }

    async buildTokenTransaction() {
        const { CallTransactionBuilder } = IconBuilder;

        const walletAddress = this.wallet.getAddress();
        // You can use "governance score apis" to get step costs.
        const value = IconAmount.of(1, IconAmount.Unit.ICX).toLoop();
        const stepLimit = await this.getDefaultStepCost();
        // networkId of node 1:mainnet, 2~:etc
        const networkId = IconConverter.toBigNumber(3);
        const version = IconConverter.toBigNumber(3);
        // Timestamp is used to prevent the identical transactions. Only current time is required (Standard unit : us)
        // If the timestamp is considerably different from the current time, the transaction will be rejected.
        const timestamp = (new Date()).getTime() * 1000;
        // SCORE name that send transaction is “transfer”.
        const methodName = "transfer";
        // Enter receiving address and the token value.
        // You must enter the given key name("_to", "_value"). Otherwise, the transaction will be rejected.
        const params = {
            _to: MockData.WALLET_ADDRESS_2,
            _value: IconConverter.toHex(value)
        }

        //Enter transaction information
        const tokenTransactionBuilder = new CallTransactionBuilder();
        const transaction = tokenTransactionBuilder
            .nid(networkId)
            .from(walletAddress)
            .to(this.scoreAddress)
            .stepLimit(stepLimit)
            .timestamp(timestamp)
            .method(methodName)
            .params(params)
            .version(version)
            .build();
        return transaction;
    }

    async getDefaultStepCost() {
        const { CallBuilder } = IconBuilder;

        // Get governance score api list
        const governanceApi = await this.iconService.getScoreApi(MockData.GOVERNANCE_ADDRESS).execute();
        console.log(governanceApi)
        const methodName = 'getStepCosts';
        // Check input and output parameters of api if you need
        const getStepCostsApi = governanceApi.getMethod(methodName);
        const getStepCostsApiInputs = getStepCostsApi.inputs.length > 0 ? JSON.stringify(getStepCostsApi.inputs) : 'none';
        const getStepCostsApiOutputs = getStepCostsApi.outputs.length > 0 ? JSON.stringify(getStepCostsApi.outputs) : 'none';
        console.log(`[getStepCosts]\n inputs: ${getStepCostsApiInputs} \n outputs: ${getStepCostsApiOutputs}`);

        // Get step costs by iconService.call
        const callBuilder = new CallBuilder();
        const call = callBuilder
            .to(MockData.GOVERNANCE_ADDRESS)
            .method(methodName)
            .build();
        const stepCosts = await this.iconService.call(call).execute();
        // For sending token, it is about twice the default value.
        return IconConverter.toBigNumber(stepCosts.default).times(2)
    }

    async getTokenBalance(address) {
        if (!this.scoreAddress) {
            document.getElementById('D04-1').innerHTML = 'Deploy ST Token and check deployment transaction first.';
        }

        const { CallBuilder } = IconBuilder;
        const tokenAddress = this.scoreAddress;
        // Method name to check the balance
        const methodName = "balanceOf";
        // You must enter the given key name (“_owner”).
        const params = {
            _owner: address
        }
        const callBuilder = new CallBuilder();
        const call = callBuilder
            .to(tokenAddress)
            .method(methodName)
            .params(params)
            .build();
        // Check the wallet balance
        const balance = await this.iconService.call(call).execute();
        const htmlId = address === MockData.WALLET_ADDRESS_1 ? 'D04-2' : 'D04-3';
        document.getElementById(htmlId).innerHTML = `<b>${IconAmount.of(balance, IconAmount.Unit.LOOP).convertUnit(IconAmount.Unit.ICX)}</b>`;
    }

    async checkTransactionTxStatus() {
        if (!this.transactionTxHash) {
            document.getElementById('D05-1').innerHTML = 'Make token transaction first.';
        }
        if (!this.scoreAddress) {
            document.getElementById('D05-1').innerHTML = 'Deploy ST Token and check deployment transaction first.';
        }

        const transactionResult = await this.iconService.getTransactionResult(this.transactionTxHash).execute();
        const status = transactionResult.status === 1 ? 'success' : 'failure';
        document.getElementById('D05-2').innerHTML = `<b>tx status</b>: ${status}`;
    }
}

if (document.getElementById('D01')) {
  deployAndTransferTokenExample = new DeployAndTransferTokenExample();
}

export default DeployAndTransferTokenExample;
