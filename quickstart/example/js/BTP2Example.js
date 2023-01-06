/* eslint-disable */

import IconService from 'icon-sdk-js';
const { HttpProvider } = IconService;
import MockData from '../../mockData/index.js';

let btpExample;

class BTPExample {
  constructor() {
    // HttpProvider is used to communicate with http.
    this.provider = new HttpProvider(MockData.NODE_URL);

    // Create IconService instance
    this.iconService = new IconService(this.provider);

    this.addListener();
  }

  addListener() {
    // getNetworkInfo
    document.getElementById('Q01-2').addEventListener('click', async () => {
      await this.getNetworkInfo();
    });

    // getNetworkTypeInfo
    document.getElementById('Q02-2').addEventListener('click', async () => {
      await this.getNetworkTypeInfo();
    });

    // get Messages
    document.getElementById('Q03-3').addEventListener('click', async () => {
      await this.getMessages();
    });

    // get Header
    document.getElementById('Q04-3').addEventListener('click', async () => {
      await this.getHeader();
    });

    // get proof
    document.getElementById('Q05-3').addEventListener('click', async () => {
      await this.getProof();
    });

    // get source information
    document.getElementById('Q06').addEventListener('click', async () => {
      await this.getSourceInformation();
    });
  }

  async getNetworkInfo() {
    const id = document.getElementById("Q01").innerHTML;
    const networkInfo = await this.iconService.btpGetNetworkInfo(id).execute();
    document.getElementById("Q01-3").innerHTML = `networkTypeID : ${networkInfo.networkTypeID}`
    document.getElementById("Q01-4").innerHTML = `networkID : ${networkInfo.networkID}`
    document.getElementById("Q01-5").innerHTML = `networkTypeName : ${networkInfo.networkTypeName}`
  }

  async getNetworkTypeInfo() {
    const id = document.getElementById("Q02").innerHTML;
    const networkTypeInfo = await this.iconService.btpGetNetworkTypeInfo(id).execute();
    document.getElementById("Q02-3").innerHTML = `networkTypeID : ${networkTypeInfo.networkTypeID}`
    document.getElementById("Q02-4").innerHTML = `networkTypeName : ${networkTypeInfo.networkTypeName}`
    document.getElementById("Q02-5").innerHTML = `nextProofContext : ${networkTypeInfo.nextProofContext}`
  }

  async getMessages() {
    const id = document.getElementById("Q03").innerHTML;
    const height = document.getElementById("Q03-2").innerHTML;
    const messages = await this.iconService.btpGetMessages(id, height).execute();
    document.getElementById("Q03-4").innerHTML = `messages : ${messages}`
  }

  async getHeader() {
    const id = document.getElementById("Q04").innerHTML;
    const height = document.getElementById("Q04-2").innerHTML;
    const header = await this.iconService.btpGetHeader(id, height).execute();
    document.getElementById("Q03-4").innerHTML = `header : ${header}`
  }

  async getProof() {
    const id = document.getElementById("Q05").innerHTML;
    const height = document.getElementById("Q05-2").innerHTML;
    const proof = await this.iconService.btpGetProof(id, height).execute();
    document.getElementById("Q03-4").innerHTML = `proof : ${proof}`
  }

  async getSourceInformation() {
    const info = await this.iconService.btpGetSourceInformation().execute();
    document.getElementById("Q06-1").innerHTML = `srcNetworkID : ${info.srcNetworkUID}`
    document.getElementById("Q06-2").innerHTML = `networkIDs : ${info.networkTypeIDs}`
  }

}

btpExample = new BTPExample();

export default BTPExample;
