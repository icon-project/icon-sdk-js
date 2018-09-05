import {
    convertParamsValueToHex
} from '../../data/Converter';

export class Call {
    constructor(to, from, data) {
        this.to = to;
        this.dataType = "call";
        this.data = data;

        if (from) {
            this.from = from;
        }
    }
}

export class CallBuilder {
    constructor() {
        this._to = undefined;
        this._from = undefined;
        this._data = {};
    }

    to(to) {
        this._to = to;
        return this;
    }

    from(from) {
        this._from = from;
        return this;
    }

    method(method) {
        this._data["method"] = method
        return this;
    }

    params(params) {
        this._data["params"] = params
        return this;
    }

    build() {
        return new Call(
            this._to, 
            this._from, 
            this._data,
        );
    }
}