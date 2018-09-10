import { addHxPrefix, add0xPrefix } from "./Hexadecimal";
import { toDecimal, toBigNumber } from "../formatter/Converter";

export default class TransactionResult {
    constructor(data) {
        this.status = data["status"]
        this.to = addHxPrefix(data["to"])
        this.txHash = add0xPrefix(data["txHash"])
        this.txIndex = toDecimal(data["txIndex"])
        this.blockHeight = toDecimal(data["blockHeight"])
        this.blockHash = add0xPrefix(data["blockHash"])
        this.cumulativeStepUsed = toBigNumber(data["cumulativeStepUsed"])
        this.stepUsed = toBigNumber(data["stepUsed"])
        this.stepPrice = toBigNumber(data["stepPrice"])

        // TODO Success
        if (data["scoreAddress"]) {
            this.scoreAddress = data["scoreAddress"]
        }
        if (data["eventLogs"]) {
            this.eventLogs = data["eventLogs"]
        }
        if (data["logsBloom"]) {
            this.logsBloom = data["logsBloom"]
        }

        // TODO Fail
        if (data["failure"]) {
            this.failure = data["failure"]
        }
    }
}