import BigNumber from 'bignumber.js'
import { isObject } from "util";
import { add0xPrefix } from './Hexadecimal'
import { isString, isByte, isNumeric, isBigNumber } from './Type'

export function concatTypedArrays(a, b) {
    var c = new (a.constructor)(a.length + b.length);
    c.set(a, 0);
    c.set(b, a.length);
    return c;
}

export function hasProperties(object, propertySet) {
    if (!isObject(object)) {
        return false
    }

    propertySet.forEach(property => {
        if (object.hasOwnProperty(property)) {
            return false
        }
    })

    return true
}

export function convertToHex(value) {
    if (isNumeric(value)) {
        return add0xPrefix(value.toString(16))
    }

    if (isString(value)) {
        let bytes = [];
        let convertedText = '';

        for (let i = 0; i < value.length; i++) {
            let originBytes = unescape(encodeURIComponent(value[i]));
            for (let j = 0; j < originBytes.length; j++) {
                bytes.push(originBytes[j].charCodeAt(0));
            }
        }

        const textToHexFormat = '%x'
        for (var i = 0; i < bytes.length; i++) {
            let byte = bytes[i];
            let hexByte = byte.toString(16);
            if (hexByte.length === 1) {
                hexByte = '0' + hexByte;
            }
            let char = textToHexFormat;
            char = char.replace(/%x/g, hexByte);
            convertedText += char;
        }

        return add0xPrefix(convertedText);
    }

    if (isByte(value)) {
        const encoded = value.reduce(function (output, elem) { (output + ('0' + elem.toString(16)).slice(-2)) }, '')
        return add0xPrefix(encoded);
    }

    return value
}

export function convertParamsValueToHex(params) {
    const converted = {}

    Object.keys(params).forEach(
        key => {
            converted[key] = convertToHex(params[key])
        }
    )

    return converted
}