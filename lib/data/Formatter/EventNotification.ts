import BigNumber from "bignumber.js";
import { Converter } from "../index";

export default class EventNotification {
  readonly hash: string;
  readonly height: BigNumber;
  readonly index: BigNumber;
  readonly events: BigNumber[];

  constructor(data) {
    this.hash = data.hash;
    this.height = Converter.toBigNumber(data.height);
    this.index = Converter.toBigNumber(data.index);
    if (data.events) {
      this.events = [];
      for (let i = 0; i < data.events; i++)
        this.events[i] = Converter.toBigNumber(data.events[i]);
    }
  }
}
