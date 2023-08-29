/* eslint-disable */

import {
  IconService,
  HttpProvider,
  BlockMonitorSpec,
  BlockNotification,
  Monitor,
  EventMonitorSpec,
  EventNotification,
  EventFilter,
  Converter,
  BigNumber,
} from 'icon-sdk-js';
import MockData from '../../mockData/index.js';

let monitorExample;
let eventMonitorExample;

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
    const spec = new BlockMonitorSpec(Converter.toBigNumber(height + 1),
      [new EventFilter("ICXIssued(int,int,int,int)", "cx0000000000000000000000000000000000000000")], true);
    const onevent = (data: BlockNotification) => {
      document.getElementById("M01-3").innerHTML = JSON.stringify(data);
    }
    const onerror = (error) => {
      console.log(error);
    }
    this.monitor = this.iconService.monitorBlock(spec, onevent, onerror);
  }
}

function getInputValue(e: string): string {
  const element = <HTMLInputElement>document.getElementById(e);
  return element.value;
}

class EventMonitorExample {
  private monitor: Monitor<EventNotification>;
  private iconService: IconService;

  constructor() {
    this.addListener();
  }

  onEvent(ev: EventNotification) {
    document.getElementById('M02-log').innerText = JSON.stringify(ev);
  }

  onError(err) {
    document.getElementById('M02-log').innerText = String(err);
  }

  onProgress(height: BigNumber) {
    document.getElementById('M02-progress').innerText = height.toString();
  }

  async start() {
    if (this.monitor !== undefined) {
      return;
    }
    const url = getInputValue('M02-url');
    const addr = getInputValue('M02-addr');
    const event = getInputValue('M02-event');
    const provider: HttpProvider = new HttpProvider(url);
    this.iconService = new IconService(provider);
    const block = await this.iconService.getLastBlock().execute();
    const spec = new EventMonitorSpec(
      Converter.toBigNumber(block.height+1),
      new EventFilter(event,addr),
      true,
      10
    );
    this.monitor = this.iconService.monitorEvent(spec, this.onEvent, this.onError, this.onProgress);
  }

  stop() {
    this.monitor.close();
    this.monitor = undefined;
  }

  addListener() {
    document.getElementById('M02-start').addEventListener('click', async ()=>{
      await this.start();
    });
    document.getElementById('M02-stop').addEventListener('click', ()=>{
      this.stop();
    });
  }
}

if (document.getElementById('M01-1')) {
  monitorExample = new MonitorExample();
  eventMonitorExample = new EventMonitorExample();
}

export default MonitorExample;
