/* eslint-disable */

import IconService from 'icon-sdk-js';
import MockData from '../../mockData/index.js';

const { IconAmount, IconConverter, HttpProvider, IconWallet, IconBuilder, SignedTransaction } = IconService;

let icxTransactionExample;

class IcxTransactionExample {
  constructor() {
    // HttpProvider is used to communicate with http.
    this.provider = new HttpProvider(MockData.NODE_URL);
    this.debugProvider = new HttpProvider(MockData.DEBUG_URL);

    // Create IconService instance
    this.iconService = new IconService(this.provider);
    this.debugService = new IconService(this.debugProvider);

    // Load wallet
    this.wallet = IconWallet.loadPrivateKey(MockData.PRIVATE_KEY_1);
    this.txHash = '';

    this.addListener();
    (async () => {
        try {
          await this.getWalletBalance();
        } catch(e) {
          console.log(e);
        }
    })();
  }

    addListener() {
        // 1. Send ICX Transaction
    document.getElementById('I01').addEventListener('click', async () => {
            document.getElementById('I03-2').innerHTML = '';
      await this.sendTransaction();
        });

        // 2. Check Wallet Balance
    document.getElementById('I02').addEventListener('click', async () => {
      await this.getWalletBalance();
        });

        // 3. Check TX Status
    document.getElementById('I03').addEventListener('click', async () => {
      await this.checkTxStatus();
        });

        // 4. estimate step
    document.getElementById('I04').addEventListener('click', async () => {
      await this.estimateStep();
    });

    }

    async sendTransaction() {
        // Build raw transaction object
        const transaction = await this.buildICXTransaction();
        // Create signature of the transaction
        const signedTransaction = new SignedTransaction(transaction, this.wallet);
        // Read params to transfer to nodes
        const signedTransactionProperties = JSON.stringify(signedTransaction.getProperties()).split(",").join(", \n")
        document.getElementById('I01-1').innerHTML = `<b>Signed Transaction</b>: ${signedTransactionProperties}`;
        // Send transaction
        this.txHash = await this.iconService.sendTransaction(signedTransaction).execute();
        console.log(this.txHash)
        document.getElementById('I03-1').innerHTML = this.txHash;
        // Print transaction hash
        document.getElementById('I01-2').innerHTML = `<b>Transfer Request Complete.</b> Tx hash is ${this.txHash}`;
    }

    async buildICXTransaction() {
      const { IcxTransactionBuilder } = IconBuilder;

      const walletAddress = this.wallet.getAddress();
      // 1 ICX -> 1000000000000000000 conversion
      const value = IconAmount.of(1, IconAmount.Unit.ICX).toLoop();
      // You can use "governance score apis" to get step costs.
      const stepLimit = await this.getDefaultStepCost();
      // networkId of node 1:mainnet, 2~:etc
      const networkId = IconConverter.toBigNumber(3);
      const version = IconConverter.toBigNumber(3);
      // Timestamp is used to prevent the identical transactions. Only current time is required (Standard unit : us)
      // If the timestamp is considerably different from the current time, the transaction will be rejected.
      const timestamp = (new Date()).getTime() * 1000;

      //Enter transaction information
      const icxTransactionBuilder = new IcxTransactionBuilder();
      return icxTransactionBuilder
          .nid(networkId)
          .from(walletAddress)
          .to(MockData.WALLET_ADDRESS_2)
          .value(value)
          .stepLimit(stepLimit)
          .timestamp(timestamp)
          .version(version)
          .build();
    }

  async estimateStep() {
    // Build transaction object
    const transaction = this.buildEstimationRequest();
    const transactionProperties = JSON.stringify(IconConverter.toRawTransaction(transaction)).split(",").join(", \n")
    document.getElementById('I04-1').innerHTML = `<b>Transaction</b>: ${transactionProperties}`;
    // query step
    this.estimatedStep = await this.debugService.estimateStep(transaction).execute();
    console.log(this.estimatedStep);
    // // Print estimated step
    document.getElementById('I04-2').innerHTML = `<b> estimated step is ${this.estimatedStep}</b>`;
  }

  buildEstimationRequest() {
    const { IcxTransactionBuilder } = IconBuilder;

    const walletAddress = this.wallet.getAddress();
    // 1 ICX -> 1000000000000000000 conversion
    const value = IconAmount.of(1, IconAmount.Unit.ICX).toLoop();
    const networkId = IconConverter.toBigNumber(3);
    const version = IconConverter.toBigNumber(3);
    const timestamp = (new Date()).getTime() * 1000;

    //Enter transaction information
    const icxTransactionBuilder = new IcxTransactionBuilder();
    return icxTransactionBuilder
      .nid(networkId)
      .from(walletAddress)
      .to(MockData.WALLET_ADDRESS_2)
      .value(value)
      .timestamp(timestamp)
      .version(version)
      .build();
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
        return stepCosts.default
    }

    async getWalletBalance() {
        const balanceA = await this.iconService.getBalance(MockData.WALLET_ADDRESS_1).execute();
        const balanceB = await this.iconService.getBalance(MockData.WALLET_ADDRESS_2).execute();
        document.getElementById('I02-1').innerHTML = `<b>${IconAmount.of(balanceA, IconAmount.Unit.LOOP).convertUnit(IconAmount.Unit.ICX)}`;
        document.getElementById('I02-2').innerHTML = `<b>${IconAmount.of(balanceB, IconAmount.Unit.LOOP).convertUnit(IconAmount.Unit.ICX)}`;
    }

    async checkTxStatus() {
        if (!this.txHash) {
            document.getElementById('I03-1').innerHTML = 'Make transaction first.';
        }
        const transactionResult = await this.iconService.getTransactionResult(this.txHash).execute();
        const status = transactionResult.status === 1 ? 'success' : 'failure';
        document.getElementById('I03-2').innerHTML = `<b>tx status</b>: ${status}`;
    }
}

if (document.getElementById('I01')) {
  icxTransactionExample = new IcxTransactionExample();
}

export default icxTransactionExample;
