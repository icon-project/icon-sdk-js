import HttpClient from './client/HttpClient'
import HttpRequest from './client/HttpRequest'
import HttpCall from './client/HttpCall'

/**
 * @description HttpProvider class transports as http jsonrpc
 */
export default class HttpProvider {
    constructor(url) {
        this.url = url;
    }

    /**
     * @description 
     * @param {object} request 
     * @param {function} converter
     * @return {HttpCall}
     */
    request(request, converter) {
        const body = JSON.stringify(request, function (key, value) { if (!!value) { return value } })
        const httpRequest = new HttpRequest(this.url, body)
        return new HttpCall(HttpClient.newCall(httpRequest), converter);
    }
}
