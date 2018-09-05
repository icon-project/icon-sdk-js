export default class HttpRequest {
    constructor(url, body) {
        this.xhr = new XMLHttpRequest();
        this.url = url;
        this.body = body;
    }
}