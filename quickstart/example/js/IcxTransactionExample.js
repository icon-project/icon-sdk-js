/* eslint-disable */

import IconService, { IconAmount, IconConverter, HttpProvider, IconWallet, IconBuilder, SignedTransaction } from 'icon-sdk-js';
import MockData from '../../mockData/index.js';

let icxTransactionExample;

class IcxTransactionExample {
	constructor() {

		// HttpProvider is used to communicate with http.
		this.provider = new HttpProvider(MockData.NODE_URL);
		
		// Create IconService instance
        this.iconService = new IconService(this.provider);
        
        // Load wallet
        this.wallet = IconWallet.loadPrivateKey(MockData.PRIVATE_KEY_1);
        this.txHash = '';

        this.addListener();
        this.getWalletBalance();
    }

    addListener() {
        // 1. Send ICX Transaction
		document.getElementById('I01').addEventListener('click', () => {
            document.getElementById('I03-2').innerHTML = '';
			this.sendTransaction();
        });
        
        // 2. Check Wallet Balance
		document.getElementById('I02').addEventListener('click', () => {
			this.getWalletBalance();
        });

        // 3. Check TX Status
		document.getElementById('I03').addEventListener('click', () => {
			this.checkTxStatus();
        });
    }

    sendTransaction() {
        // Build raw transaction object
        const transaction = this.buildICXTransaction();
        // Create signature of the transaction
        const signedTransaction = new SignedTransaction(transaction, this.wallet);
        // Read params to transfer to nodes
        const signedTransactionProperties = JSON.stringify(signedTransaction.getProperties()).split(",").join(", \n")
        document.getElementById('I01-1').innerHTML = `<b>Signed Transaction</b>: ${signedTransactionProperties}`;
        // Send transaction
        this.txHash = this.iconService.sendTransaction(signedTransaction).execute();
        console.log(this.txHash)
        document.getElementById('I03-1').innerHTML = this.txHash;
        // Print transaction hash
        document.getElementById('I01-2').innerHTML = `<b>Transfer Request Complete.</b> Tx hash is ${this.txHash}`;
    }

    buildICXTransaction() {
        const { IcxTransactionBuilder } = IconBuilder;

        const walletAddress = this.wallet.getAddress();
        // 1 ICX -> 1000000000000000000 conversion
        const value = IconAmount.of(1, IconAmount.Unit.ICX).toLoop();
        // You can use "governance score apis" to get step costs.
        const stepLimit = this.getDefaultStepCost();
        // networkId of node 1:mainnet, 2~:etc
        const networkId = IconConverter.toBigNumber(3);
        const version = IconConverter.toBigNumber(3);
        // Timestamp is used to prevent the identical transactions. Only current time is required (Standard unit : us)
        // If the timestamp is considerably different from the current time, the transaction will be rejected.
        const timestamp = (new Date()).getTime() * 1000;
        
        //Enter transaction information
        const icxTransactionBuilder = new IcxTransactionBuilder();
        const transaction = icxTransactionBuilder
            .nid(networkId)
            .from(walletAddress)
            .to(MockData.WALLET_ADDRESS_2)
            .value(value)
            .stepLimit(stepLimit)
            .timestamp(timestamp)
            .version(version)
            .build();        
        return transaction;
    }

    getDefaultStepCost() {
        const { CallBuilder } = IconBuilder;
        
        // Get governance score api list
        const governanceApi = this.iconService.getScoreApi(MockData.GOVERNANCE_ADDRESS).execute();
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
        const stepCosts = this.iconService.call(call).execute();
        return stepCosts.default
    }

    getWalletBalance() {
        const balanceA = this.iconService.getBalance(MockData.WALLET_ADDRESS_1).execute();
        const balanceB = this.iconService.getBalance(MockData.WALLET_ADDRESS_2).execute();
        document.getElementById('I02-1').innerHTML = `<b>${IconAmount.of(balanceA, IconAmount.Unit.LOOP).convertUnit(IconAmount.Unit.ICX)}`;
        document.getElementById('I02-2').innerHTML = `<b>${IconAmount.of(balanceB, IconAmount.Unit.LOOP).convertUnit(IconAmount.Unit.ICX)}`;
    }

    checkTxStatus() {
        if (!this.txHash) {
            document.getElementById('I03-1').innerHTML = 'Make transaction first.';
        }
        const transactionResult = this.iconService.getTransactionResult(this.txHash).execute();
        const status = transactionResult.status === 1 ? 'success' : 'failure';
        document.getElementById('I03-2').innerHTML = `<b>tx status</b>: ${status}`;
    }
}

if (document.getElementById('I01')) {
	icxTransactionExample = new IcxTransactionExample();
}

export default icxTransactionExample;