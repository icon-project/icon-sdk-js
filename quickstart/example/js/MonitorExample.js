/* eslint-disable */

import IconService from 'icon-sdk-js';
const { HttpProvider } = IconService;
import MockData from '../../mockData/index.js';

let monitorExample;

class MonitorExample {
  monitor;
  constructor() {
    this.provider = new HttpProvider(MockData.NODE_URL + "/icon_dex");
    this.iconService = new IconService(this.provider);
    this.addListener();
  }

  addListener() {
    document.getElementById('M01-1').addEventListener('click', async () => {
      await this.startMonitorBlock();
    });

    document.getElementById('M01-2').addEventListener('click', async () => {
      await this.monitor.close();
    });
  }

  async startMonitorBlock() {
    const block = await this.iconService.getLastBlock().execute();
    const height = block.height;
    const onevent = (data) => {
      document.getElementById("M01-3").innerHTML = `block height : ${data.height}, block hash : ${data.hash}`;
    }
    this.monitor = this.iconService.monitorBlock(IconService.IconConverter.toHex(height + 1));
    this.monitor.start(onevent);
  }
}

if (document.getElementById('M01-1')) {
  monitorExample = new MonitorExample();
}

export default MonitorExample;
