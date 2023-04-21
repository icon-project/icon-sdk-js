export default class EventFilter {
  readonly event: string;
  readonly addr: string;
  readonly indexed: string[];
  readonly data: string[];

  constructor(
    event: string,
    addr?: string,
    indexed?: string[],
    data?: string[]
  ) {
    this.event = event;
    this.addr = addr;
    this.indexed = indexed;
    this.data = data;
  }

  toObject(): object {
    const obj = {
      event: this.event,
      addr: this.addr,
      indexed: this.indexed,
      data: this.data,
    };
    Object.keys(obj).forEach((key) => {
      if (obj[key] === undefined || obj[key] === null) delete obj[key];
    });
    return obj;
  }
}
