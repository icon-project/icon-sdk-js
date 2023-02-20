export default class BTPNotification {
  readonly header: string;
  readonly proof: string;

  constructor(data) {
    this.header = data.header;
    this.proof = data.proof;
  }
}
