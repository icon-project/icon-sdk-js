import BigNumber from "bignumber.js";
import { Converter } from "../index";

export default class EventNotification {
  readonly hash: string;
  readonly height: BigNumber;
  readonly index: BigNumber;
  readonly events: BigNumber[];
  readonly logs: object[];

  constructor(data) {
    this.hash = data.hash;
    this.height = Converter.toBigNumber(data.height);
    this.index = Converter.toBigNumber(data.index);
    this.events = [];
    this.logs = [];
    if (data.events) {
      for (let i = 0; i < data.events.length; i++)
        this.events[i] = Converter.toBigNumber(data.events[i]);
    }
    if (data.logs) {
      for (let i = 0; i < data.logs.length; i++) this.logs[i] = data.logs[i];
    }
  }
}
