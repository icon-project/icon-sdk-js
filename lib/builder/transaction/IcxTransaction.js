export class IcxTransaction {
    constructor(to, from, value, stepLimit, nid, nonce, version, timestamp) {
        this.to = to;
        this.from = from;
        this.value = value;
        this.stepLimit = stepLimit;
        this.nid = nid;
        this.nonce = nonce;
        this.version = version;
        this.timestamp = timestamp;
    }
}

export class IcxTransactionBuilder {
    constructor() {
        this._to = undefined;
        this._from = undefined;
        this._value = undefined;
        this._stepLimit = undefined;
        this._nid = undefined;
        this._nonce = undefined;
        this._version = undefined;
        this._timestamp = undefined;
    }

    to(to) {
        this._to = to;
        return this;
    }

    from(from) {
        this._from = from;
        return this;
    }

    value(value) {
        this._value = value;
        return this;
    }

    stepLimit(stepLimit) {
        this._stepLimit = stepLimit;
        return this;
    }

    nid(nid) {
        this._nid = nid;
        return this;
    }

    nonce(nonce) {
        this._nonce = nonce;
        return this;
    }

    version(version) {
        this._version = version;
        return this;
    }

    timestamp(timestamp) {
        this._timestamp = timestamp;
        return this;
    }

    build() {
        return new IcxTransaction(
            this._to, 
            this._from, 
            this._value, 
            this._stepLimit, 
            this._nid, 
            this._nonce, 
            this._version, 
            this._timestamp, 
        );
    }
}