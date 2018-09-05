export default class HttpCall {
    constructor(httpCall) {
        this.httpCall = httpCall;
    }

    execute(callback) {
        const async = !!callback
        if (!async) {
            return this.httpCall.execute()
        }
        else {
            this.httpCall.enqueue(callback)
        }
    }
}