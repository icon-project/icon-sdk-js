import { isArray } from "../Type";

export default class ScoreApiList {
    constructor(list) {
        this.properties = {}
        if (isArray(list)) {
            list.forEach(item => {
                this.properties[item.name] = item
            })
        }
    }

    getMethod(name) {
        return this.properties[name]
    }
}