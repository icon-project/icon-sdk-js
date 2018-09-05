import { 
    Transaction, 
    TransactionBuilder 
} from './Transaction';

class DeployTransaction extends Transaction {
    constructor(to, from, value, stepLimit, nid, nonce, version, timestamp, contentType, content, params) {
        super(to, from, value, stepLimit, nid, nonce, version, timestamp);
        this.dataType = "deploy";
        this.contentType = contentType;
        this.content = content;
        this.params = params;
    }
}

export class DeployTransactionBuilder extends TransactionBuilder {
    constructor(to, from, value, stepLimit, nid, nonce, version, timestamp) {
        super(to, from, value, stepLimit, nid, nonce, version, timestamp);
    }

    contentType(contentType) {
        this._contentType = contentType;
        return this;
    }

    content(content) {
        this._content = content;
        return this;
    }

    params(params) {
        this._params = params;
        return this;
    }

    build() {
        return new DeployTransaction(
            this._to, 
            this._from, 
            this._value, 
            this._stepLimit, 
            this._nid, 
            this._nonce, 
            this._version, 
            this._timestamp, 
            this._contentType,
            this._content,            
            this._params,            
        );
    }
}