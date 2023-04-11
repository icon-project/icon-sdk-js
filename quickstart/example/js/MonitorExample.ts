/* eslint-disable */

import { IconService, HttpProvider, BlockMonitorSpec, BlockNotification, Monitor } from 'icon-sdk-js';
import MockData from '../../mockData/index.js';

let monitorExample;

class MonitorExample {
  private monitor: Monitor<BlockNotification>;
  private iconService: IconService;
  constructor() {
    const provider: HttpProvider = new HttpProvider(MockData.NODE_URL + "/icon_dex");
    this.iconService = new IconService(provider);
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
    const spec = new BlockMonitorSpec(IconService.IconConverter.toBigNumber(height + 1));
    const onevent = (data: BlockNotification) => {
      document.getElementById("M01-3").innerHTML = `block height : ${data.height}, block hash : ${data.hash}`;
    }
    const onerror = (error) => {
      console.log(error);
    }
    this.monitor = this.iconService.monitorBlock(spec, onevent, onerror);
  }
}

if (document.getElementById('M01-1')) {
  monitorExample = new MonitorExample();
}

export default MonitorExample;
