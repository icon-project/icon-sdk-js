import BigNumber from "bignumber.js";
import { Converter } from "../index";
import EventLog from "./EventLog";

export default class BlockNotification {
  readonly hash: string;
  readonly height: BigNumber;
  readonly indexes: BigNumber[][];
  readonly events: BigNumber[][][];
  readonly logs: EventLog[][][];

  constructor(data) {
    this.hash = data.hash;
    this.height = Converter.toBigNumber(data.height);
    if (data.indexes) {
      this.indexes = [];
      for (let i = 0; i < data.indexes.length; i++) {
        this.indexes[i] = [];
        for (let j = 0; j < data.indexes[i].length; j++)
          this.indexes[i][j] = Converter.toBigNumber(data.indexes[i][j]);
      }
    }
    if (data.events) {
      this.events = [];
      for (let i = 0; i < data.events.length; i++) {
        this.events[i] = [];
        for (let j = 0; j < data.events[i].length; j++) {
          this.events[i][j] = [];
          for (let k = 0; k < data.events[i][j].length; k++)
            this.events[i][j][k] = Converter.toBigNumber(data.events[i][j][k]);
        }
      }
    }
    if (data.logs) {
      this.logs = [];
      for (let i = 0; i < data.logs.length; i++) {
        this.logs[i] = [];
        for (let j = 0; j < data.logs[i].length; j++) {
          this.logs[i][j] = [];
          for (let k = 0; k < data.logs[i][j].length; k++) {
            this.logs[i][j][k] = data.logs[i][j][k];
          }
        }
      }
    }
  }
}
