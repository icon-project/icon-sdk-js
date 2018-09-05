import HttpClient from './client/HttpClient'
import HttpRequest from './client/HttpRequest'
import HttpCall from './client/HttpCall'

export default class HttpProvider {
    constructor(url) {
        this.url = url;
    }

    request(request) {
        const body = JSON.stringify(request, function (key, value) { if (!!value) { return value } })
        const httpRequest = new HttpRequest(this.url, body)
        return new HttpCall(HttpClient.newCall(httpRequest));
    }
}