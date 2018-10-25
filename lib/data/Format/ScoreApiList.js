import { isArray } from '../Type';
import { ScoreError } from '../../Exception';

export default class ScoreApiList {
	constructor(list) {
		this.properties = {};
		if (isArray(list)) {
			list.forEach((item) => {
				this.properties[item.name] = item;
			});
		}
	}

	getMethod(name) {
		const method = this.properties[name];
		if (method) {
			return method;
		}

		const error = new ScoreError(`The method named '${name}' does not exist.`);
		throw error.toString();
	}
}
