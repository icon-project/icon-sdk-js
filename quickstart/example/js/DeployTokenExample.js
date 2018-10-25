/* eslint-disable */

/* eslint-disable */
import IconService, { IconAmount, IconConverter, IconHttpProvider } from '../../icon-sdk.min';
import MockData from '../../mockData/index.js';

let deployTokenExample;

class DeployTokenExample {
	constructor() {
		// HttpProvider is used to communicate with http.
		this.provider = new IconHttpProvider(MockData.NODE_URL);
		
		// Create IconService instance
        this.iconService = new IconService(this.provider);
        
        // Load wallet
        const { Wallet } = this.iconService;
        this.wallet = Wallet.loadPrivateKey(MockData.PRIVATE_KEY_1);
        
        this.txHash = '';
        this.content = '';

        this.addListener();
    }

    addListener() {
        // 1. Upload Score File
		document.getElementById('D01').addEventListener('click', () => {
			this.readFile();
        });

        // 2. Check TX Status
		document.getElementById('D02').addEventListener('click', () => {
			this.checkTxStatus();
        });
    }

    readFile() {
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
            fr.onload = receivedBinary;
            fr.readAsBinaryString(file);
        
            function receivedBinary () {
                self.content = showResult(fr);
                self.deployScore();
            }

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

    deployScore() {
        const { SignedTransaction } = this.iconService;
        // Build raw transaction object
        const transaction = this.buildDeployTransaction();
        // Create signature of the transaction
        const signedTransaction = new SignedTransaction(transaction, this.wallet);
        // Read params to transfer to nodes
        const signedTransactionProperties = JSON.stringify(signedTransaction.getProperties()).split(",").join(", \n")
        document.getElementById('D01-2').innerHTML = `<b>Signed Transaction</b>: ${signedTransactionProperties}`;
        // Send transaction
        this.txHash = this.iconService.sendTransaction(signedTransaction).execute();
        document.getElementById('D02-1').innerHTML = this.txHash;
        // Print transaction hash
        document.getElementById('D01-3').innerHTML = `<b>Transfer Request Complete.</b> Tx hash is ${this.txHash}`;
    }

    buildDeployTransaction() {
        const { Builder } = this.iconService;
        const { DeployTransactionBuilder } = Builder;

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
        const stepLimit = this.getMaxStepLimit();
        const walletAddress = this.wallet.getAddress();
        // networkId of node 1:mainnet, 2~:etc
        const networkId = IconConverter.toBigNumber(2);
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

    getMaxStepLimit() {
        const { Builder } = this.iconService;
        const { CallBuilder } = Builder;
        
        const governanceApi = this.iconService.getScoreApi(MockData.GOVERNANCE_ADDRESS).execute();
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
        const maxStepLimit = this.iconService.call(call).execute();
        return IconConverter.toBigNumber(maxStepLimit)
    }

    checkTxStatus() {
        if (!this.txHash) {
            document.getElementById('D02-1').innerHTML = 'Make transaction first.';
        }
        const transactionResult = this.iconService.getTransactionResult(this.txHash).execute();
        const status = transactionResult.status === 1 ? 'success' : 'failure';
        document.getElementById('D02-2').innerHTML = `<b>tx status</b>: ${status}`;
    }
}

if (document.getElementById('D01')) {
	deployTokenExample = new DeployTokenExample();
}

export default DeployTokenExample;
