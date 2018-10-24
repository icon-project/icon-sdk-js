import { isArray } from "../Type";
import { createPrivate } from "../Util";

export default class ScoreApiList {
    constructor(list) {
        this.private = createPrivate()
        this.private(this).properties = {}
        if (isArray(list)) {
            list.forEach(item => {
                this.private(this).properties[item.name] = item
            })
        }
    }

    getMethod(name) {
        return this.private(this).properties[name]
    }
}