export default class HttpClient {
    static newCall(httpRequest) {
        return {
            execute: function () {
                return this.send(httpRequest)
            },

            enqueue: function (callback) {
                this.sendAsync(httpRequest, callback)
            },

            prepare: function (httpRequest, async) {
                const { xhr: request, url } = httpRequest
                request.open('POST', url, async);
                request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                // TODO 확인 필요
                // request.setRequestHeader("Content-Type", "application/json");
                // request.withCredentials = true
                return request
            },

            send: function (httpRequest) {
                const request = this.prepare(httpRequest, false)
                const { body } = httpRequest
                request.send(body)
                const response = JSON.parse(request.responseText)
                return response
            },

            sendAsync: function (httpRequest, callback) {
                const request = this.prepare(httpRequest, true)
                request.onreadystatechange = function () {
                    if (request.readyState === 4) {
                        const response = JSON.parse(request.responseText)
                        let error = null;
                        callback(error, response);
                    }
                };
                const { body } = httpRequest;
                request.send(body)
            }
        }
    }
}