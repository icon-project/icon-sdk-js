import { 
    IcxTransaction, 
    IcxTransactionBuilder 
} from './IcxTransaction';

export class CallTransaction extends IcxTransaction {
    constructor(to, from, value, stepLimit, nid, nonce, version, timestamp, method, params) {
        super(to, from, value, stepLimit, nid, nonce, version, timestamp);
        this.dataType = "call";
        this.method = method;
        this.params = params;
    }
}

export class CallTransactionBuilder extends IcxTransactionBuilder {
    constructor(to, from, value, stepLimit, nid, nonce, version, timestamp) {
        super(to, from, value, stepLimit, nid, nonce, version, timestamp);
    }

    method(method) {
        this._method = method;
        return this;
    }

    params(params) {
        this._params = params;
        return this;
    }

    build() {
        return new CallTransaction(
            this._to, 
            this._from, 
            this._value, 
            this._stepLimit, 
            this._nid, 
            this._nonce, 
            this._version, 
            this._timestamp, 
            this._method,
            this._params            
        );
    }
}