import {
    add0xPrefix
} from './Hexadecimal'
import {
    isInteger,
    isString,
    isBytes
} from './Type'

export function convertToHex(value, type) {
    switch (type) {
        case "int": {
            if (!isInteger(value)) {
                throw new Error("Data's type should be integer.")
            }

            return add0xPrefix(value.toString(16));
        }

        case "str": {
            if (!isString(value)) {
                throw new Error("Data's type should be string.")
            }

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

        case "bytes": {
            if (!isBytes(value)) {
                throw new Error("check data")
            }

            const encoded = value.reduce(function (output, elem) { (output + ('0' + elem.toString(16)).slice(-2)) }, '')
            return add0xPrefix(encoded);
        }

        default: {
            return value
        }
    }
}

export function convertParamsValueToHex(params) {
    const converted = {}
    
    Object.keys(params).forEach(
        key => {
            const value = params[key]
            if (isInteger(value)) {
                converted[key] = convertToHex(value, "int")
            }
            else if (isString(value)) {
                converted[key] = convertToHex(value, "str")
            }
            else if (isBytes(value)) {
                converted[key] = convertToHex(value, "bytes")
            }
        }
    )
    
    return converted
}