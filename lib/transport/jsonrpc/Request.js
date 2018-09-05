export default class Request {
    constructor(id, method, params) {
        this.jsonrpc = '2.0'
        this.id = id
        this.method = method
        this.params = params
    }
}