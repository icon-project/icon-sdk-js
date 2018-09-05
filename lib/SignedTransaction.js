import { serialize } from './data/Serializer'
import {
    convertToHex,
    convertParamsValueToHex
} from './data/Converter';

export default class SignedTransaction {
    constructor(transaction, wallet) {
        this.transaction = transaction;
        this.wallet = wallet;
    }

    toRawTransaction() {
        const {
            transaction,
            wallet
        } = this

        const {
            to,
            from,
            value,
            stepLimit,
            nid,
            nonce,
            version,
            timestamp,
        } = transaction;

        const rawTransaction = {
            "to": to,
            "from": from ? from : wallet.getAddress(),
            "value": convertToHex(value, "int"),
            "stepLimit": convertToHex(stepLimit, "int"),
            "nid": convertToHex(nid, "int"),
            "nonce": convertToHex(nonce, "int"),
            "version": convertToHex(version, "int"),
            "timestamp": convertToHex(timestamp, "int"),
        };

        if (transaction.dataType) {
            rawTransaction["dataType"] = transaction.dataType;
        }

        if (transaction.data && ["call", "deploy", "message"].indexOf(transaction.dataType) !== -1) {
            rawTransaction["data"] = this.generateData(transaction)
        }

        return rawTransaction;
    }

    getSignedTransaction() {
        const rawTransaction = this.toRawTransaction(this.transaction, this.wallet);
        const signature = this.wallet.sign(serialize(rawTransaction));
        rawTransaction["signature"] = signature;
        return rawTransaction;
    }

    generateData() {
        const { transaction } = this
        const { dataType } = transaction;

        let data = {};

        if (transaction.params) {
            data["params"] = convertParamsValueToHex(transaction.params);
        }

        switch (dataType) {
            case "call": {
                data["method"] = transaction.method;
                break;
            }
            case "deploy": {
                data["contentType"] = transaction.contentType;
                data["content"] = convertToHex(transaction.content, "bytes");
                break;
            }
            case "message": {
                data = convertToHex(transaction.data, "str")
                break;
            }
            default:
        }

        return data;
    }
}
