/* global XMLHttpRequest */

// TODO : axios 로 바꿔야함
export default class HttpRequest {
	constructor(url, body) {
		this.xhr = new XMLHttpRequest();
		this.url = url;
		this.body = body;
	}
}
