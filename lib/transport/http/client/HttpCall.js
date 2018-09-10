import { RpcError } from '../../../Error' 

export default class HttpCall {
    constructor(httpCall, converter) {
        this.httpCall = httpCall;
        this.converter = converter || function(c) {return c}; // TODO
    }

    execute(callback) {
        const async = !!callback;
        if (!async) {
            const response = this.httpCall.execute();
            const result = response["result"];
            if (result) {
                return this.converter(result);
            }
            else {
                const error = response["error"];
                return new RpcError(error)
            }
        }
        else {
            this.httpCall.enqueue(callback);
        }
    }
}