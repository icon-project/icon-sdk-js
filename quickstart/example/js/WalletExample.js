/* eslint-disable */

import IconService from 'icon-sdk-js';
import MockData from '../../mockData/index.js';

let walletExample;

class WalletExample {
  constructor() {
    // 1. Create Wallet
    document.getElementById('W01').addEventListener('click', () => {
      const wallet = IconService.IconWallet.create(); //Wallet Creation
      const address = wallet.getAddress(); // Get Address
      const privateKey = wallet.getPrivateKey(); // Get Private Key

      document.getElementById('W01-1').innerHTML = `Address: ${address}`;
      document.getElementById('W01-2').innerHTML = `Private Key: ${privateKey}`;
    });

    // 2. Store Wallet
    document.getElementById('W02').addEventListener('click', () => {
      const privateKey = MockData.PRIVATE_KEY_1;
      const wallet = IconService.IconWallet.loadPrivateKey(privateKey);
      const keystore = wallet.store(MockData.PASSWORD);

      document.getElementById('W02-1').innerHTML = `Keystore object: ${JSON.stringify(keystore)}`;
      document.getElementById('W02-2').innerHTML = `Successfully stored. Wallet loaded by private key (${MockData.PRIVATE_KEY_1}) is encrypted by password "${MockData.PASSWORD}"`;
    });

    // 3. Load Wallet By Keystore File
    document.getElementById('W03').addEventListener('click', () => {
      const walletLoadedByKeystoreFile = IconService.IconWallet.loadKeystore(MockData.KEYSTORE_FILE, MockData.PASSWORD);

      document.getElementById('W03-1').innerHTML = `Address: ${walletLoadedByKeystoreFile.getAddress()}`;
      document.getElementById('W03-2').innerHTML = `Successfully loaded.`;
    });

    // 4. Load Wallet By Private Key
    document.getElementById('W04').addEventListener('click', () => {
      const walletLoadedByPrivateKey = IconService.IconWallet.loadPrivateKey(MockData.PRIVATE_KEY_1);

      document.getElementById('W04-1').innerHTML = `Address: ${walletLoadedByPrivateKey.getAddress()}`;
      document.getElementById('W04-2').innerHTML = `Successfully loaded.`;
    });
  }
}

if (document.getElementById('W01')) {
  walletExample = new WalletExample();
}

export default walletExample;
