/* eslint-disable */

import { IconService, BTPNetworkInfo, BTPNetworkTypeInfo, HttpProvider} from 'icon-sdk-js';
import MockData from '../../mockData/index.js';

let btpExample;

class BTPExample {
  private iconService: IconService;
  constructor() {
    // HttpProvider is used to communicate with http.
    const provider: HttpProvider = new HttpProvider(MockData.NODE_URL);

    // Create IconService instance
    this.iconService = new IconService(provider);

    this.addListener();
  }

  addListener() {
    // getNetworkInfo
    document.getElementById('Q01-2').addEventListener('click', async () => {
      await this.getBTPNetworkInfo();
    });

    // getNetworkTypeInfo
    document.getElementById('Q02-2').addEventListener('click', async () => {
      await this.getBTPNetworkTypeInfo();
    });

    // get Messages
    document.getElementById('Q03-3').addEventListener('click', async () => {
      await this.getBTPMessages();
    });

    // get Header
    document.getElementById('Q04-3').addEventListener('click', async () => {
      await this.getBTPHeader();
    });

    // get proof
    document.getElementById('Q05-3').addEventListener('click', async () => {
      await this.getBTPProof();
    });

    // get source information
    document.getElementById('Q06').addEventListener('click', async () => {
      await this.getBTPSourceInformation();
    });

    // get basic network info
    document.getElementById('Q07').addEventListener('click', async () => {
      await this.getNetworkInfo();
    });
  }

  async getBTPNetworkInfo() {
    const id = (<HTMLInputElement>document.getElementById("Q01")).value;
    const networkInfo: BTPNetworkInfo = await this.iconService.getBTPNetworkInfo(id).execute();
    document.getElementById("Q01-3").innerHTML = `networkTypeID : ${networkInfo.networkTypeID}`
    document.getElementById("Q01-4").innerHTML = `networkID : ${networkInfo.networkID}`
    document.getElementById("Q01-5").innerHTML = `networkTypeName : ${networkInfo.networkTypeName}`
    document.getElementById("Q01-6").innerHTML = `networkName : ${networkInfo.networkName}`
    document.getElementById("Q01-7").innerHTML = `startHeight : ${networkInfo.startHeight}`
    document.getElementById("Q01-8").innerHTML = `open : ${networkInfo.open}`
    document.getElementById("Q01-9").innerHTML = `owner : ${networkInfo.owner}`
    document.getElementById("Q01-10").innerHTML = `prevNSHash : ${networkInfo.prevNSHash}`
    document.getElementById("Q01-11").innerHTML = `lastNSHash : ${networkInfo.lastNSHash}`
    document.getElementById("Q01-12").innerHTML = `nextMessageSN : ${networkInfo.nextMessageSN}`
    document.getElementById("Q01-13").innerHTML = `nextProofContextChanged : ${networkInfo.nextProofContextChanged}`
  }

  async getBTPNetworkTypeInfo() {
    const id = (<HTMLInputElement>document.getElementById("Q02")).value;
    const networkTypeInfo: BTPNetworkTypeInfo = await this.iconService.getBTPNetworkTypeInfo(id).execute();
    document.getElementById("Q02-3").innerHTML = `networkTypeID : ${networkTypeInfo.networkTypeID}`
    document.getElementById("Q02-4").innerHTML = `networkTypeName : ${networkTypeInfo.networkTypeName}`
    document.getElementById("Q02-5").innerHTML = `nextProofContext : ${networkTypeInfo.nextProofContext}`
    document.getElementById("Q02-6").innerHTML = `openNetworkIDs : ${networkTypeInfo.openNetworkIDs}`
  }

  async getBTPMessages() {
    const id = (<HTMLInputElement>document.getElementById("Q03")).value;
    const height = (<HTMLInputElement>document.getElementById("Q03-2")).value;
    const messages = await this.iconService.getBTPMessages(id, height).execute();
    document.getElementById("Q03-4").innerHTML = `messages : ${messages}`
  }

  async getBTPHeader() {
    const id = (<HTMLInputElement>document.getElementById("Q04")).value;
    const height = (<HTMLInputElement>document.getElementById("Q04-2")).value;
    const header = await this.iconService.getBTPHeader(id, height).execute();
    document.getElementById("Q04-4").innerHTML = `header : ${header}`
  }

  async getBTPProof() {
    const id = (<HTMLInputElement>document.getElementById("Q05")).value;
    const height = (<HTMLInputElement>document.getElementById("Q05-2")).value;
    const proof = await this.iconService.getBTPProof(id, height).execute();
    document.getElementById("Q05-4").innerHTML = `proof : ${proof}`
  }

  async getBTPSourceInformation() {
    const info = await this.iconService.getBTPSourceInformation().execute();
    document.getElementById("Q06-1").innerHTML = `srcNetworkUID : ${info.srcNetworkUID}`
    document.getElementById("Q06-2").innerHTML = `networkTypeIDs : ${info.networkTypeIDs}`
  }

  async getNetworkInfo() {
    const info = await this.iconService.getNetworkInfo().execute();
    document.getElementById("Q07-1").innerHTML = `platform : ${info.platform}`
    document.getElementById("Q07-2").innerHTML = `nid : ${info.nid}`
    document.getElementById("Q07-3").innerHTML = `channel : ${info.channel}`
    document.getElementById("Q07-4").innerHTML = `earliest : ${info.earliest}`
    document.getElementById("Q07-5").innerHTML = `latest : ${info.latest}`
    document.getElementById("Q07-6").innerHTML = `stepPrice : ${info.stepPrice}`
  }
}

if (document.getElementById('Q01')) {
  btpExample = new BTPExample();
}

export default BTPExample;
