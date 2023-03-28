export default class EventFilter {
  readonly event: string;
  readonly addr: string;
  readonly indexed: string[];
  readonly data: string[];

  constructor(event, addr, indexed, data) {
    this.event = event;
    this.addr = addr;
    this.indexed = indexed;
    this.data = data;
  }

  toObject(): object {
    return {
      event: this.event,
      addr: this.addr,
      indexed: this.indexed,
      data: this.data,
    };
  }
}
