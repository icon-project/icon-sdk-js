/* eslint-disable */
import IconService, { IconAmount, IconConverter, IconHttpProvider } from '../../icon-sdk.min';
import MockData from '../../mockData/index.js';

let tokenTransactionExample;

class TokenTransactionExample {
	constructor() {
		// HttpProvider is used to communicate with http.
		this.provider = new IconHttpProvider(MockData.NODE_URL);
		
		// Create IconService instance
        this.iconService = new IconService(this.provider);
        
        // Load wallet
        const { Wallet } = this.iconService;
        this.wallet = Wallet.loadPrivateKey(MockData.PRIVATE_KEY_1);
        this.txHash = '';

        this.addListener();
        this.getTokenBalance(MockData.WALLET_ADDRESS_1);
        this.getTokenBalance(MockData.WALLET_ADDRESS_2);
    }

    addListener() {
        // 1. Send ICX Transaction
		document.getElementById('T01').addEventListener('click', () => {
            document.getElementById('T03-2').innerHTML = '';
			this.sendTransaction();
        });
        
        // 2. Check Wallet Balance
		document.getElementById('T02').addEventListener('click', () => {
			this.getTokenBalance(MockData.WALLET_ADDRESS_1);
            this.getTokenBalance(MockData.WALLET_ADDRESS_2);
        });

        // 3. Check TX Status
		document.getElementById('T03').addEventListener('click', () => {
			this.checkTxStatus();
        });
    }

    sendTransaction() {
        const { SignedTransaction } = this.iconService;
        // Build raw transaction object
        const transaction = this.buildTokenTransaction();
        // Create signature of the transaction
        const signedTransaction = new SignedTransaction(transaction, this.wallet);
        // Read params to transfer to nodes
        const signedTransactionProperties = JSON.stringify(signedTransaction.getProperties()).split(",").join(", \n")
        document.getElementById('T01-1').innerHTML = `<b>Signed Transaction</b>: ${signedTransactionProperties}`;
        // Send transaction
        this.txHash = this.iconService.sendTransaction(signedTransaction).execute();
        document.getElementById('T03-1').innerHTML = this.txHash;
        // Print transaction hash
        document.getElementById('T01-2').innerHTML = `<b>Transfer Request Complete.</b> Tx hash is ${this.txHash}`;
    }

    buildTokenTransaction() {
        const { Builder } = this.iconService;
        const { CallTransactionBuilder } = Builder;

        const walletAddress = this.wallet.getAddress();
        // You can use "governance score apis" to get step costs.
        const value = IconAmount.of(1, IconAmount.Unit.ICX).toLoop();
        const stepLimit = this.getDefaultStepCost();
        // networkId of node 1:mainnet, 2~:etc
        const networkId = IconConverter.toBigNumber(2);
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
            .to(MockData.TOKEN_ADDRESS)
            .stepLimit(stepLimit)
            .timestamp(timestamp)
            .method(methodName)
            .params(params)
            .version(version)
            .build();        
        return transaction;
    }

    getDefaultStepCost() {
        const { Builder } = this.iconService;
        const { CallBuilder } = Builder;
        
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
        // For sending token, it is about twice the default value.
        return IconConverter.toBigNumber(stepCosts.default).times(2)
    }

    getTokenBalance(address) {
        const { Builder } = this.iconService;
        const { CallBuilder } = Builder;
        const tokenAddress = MockData.TOKEN_ADDRESS;
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
        const balance = this.iconService.call(call).execute();
        const htmlId = address === MockData.WALLET_ADDRESS_1 ? 'T02-1' : 'T02-2';
        document.getElementById(htmlId).innerHTML = `<b>${IconAmount.of(balance, IconAmount.Unit.LOOP).convertUnit(IconAmount.Unit.ICX)}</b>`;
    }

    checkTxStatus() {
        if (!this.txHash) {
            document.getElementById('T03-1').innerHTML = 'Make transaction first.';
        }
        const transactionResult = this.iconService.getTransactionResult(this.txHash).execute();
        const status = transactionResult.status === 1 ? 'success' : 'failure';
        document.getElementById('T03-2').innerHTML = `<b>tx status</b>: ${status}`;
    }
}

if (document.getElementById('T01')) {
	tokenTransactionExample = new TokenTransactionExample();
}

export default TokenTransactionExample;