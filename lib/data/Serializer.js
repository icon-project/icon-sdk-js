/* eslint-disable no-use-before-define */
import {
	sha3_256 as sha3256,
} from 'js-sha3';

export function serialize(trasaction) {
    const phraseToSign = generateHashKey(trasaction);
    const hashcode = sha3_256.update(phraseToSign).hex();
    const serialized = new Buffer(hashcode, "hex");
    return serialized;
}

function generateHashKey(obj) {
	let resultStrReplaced = '';
	const resultStr = objTraverse(obj);

	resultStrReplaced = resultStr.substring(1).slice(0, -1);
	const result = `icx_sendTransaction.${resultStrReplaced}`;

	return result;
}

// TODO: Update objTraverse!
function objTraverse(obj) {
    console.log(obj)
    let result = "";
    result += '{';
    let keys;
    keys = Object.keys(obj);
    keys.sort();
    if (keys.length > 0) {
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i]
            const value = obj[key];
            switch (true) {
                case (value === null): {
                    result += `${key}.`;
                    result += String.raw`\0`;
                    break;
                }
                case (typeof value === 'string'): {
                    result += `${key}.`
                    result += escapeString(value)
                    break;
                }
                case (Array.isArray(value)): {
                    result += `${key}.`
                    result += arrTraverse(value)
                    break;
                }
                case (typeof value === 'object'): {
                    result += `${key}.`
                    result += objTraverse(value);
                    break;
                }
                default:
                    break;
            }
            result += '.'
        }
        result = result.slice(0, -1);
        result += '}';
    } else {
        result += '}';
    }
    return result;
}

function arrTraverse(arr) {
	let result = '';

	result += '[';
	for (let j = 0; j < arr.length; j += 1) {
		const value = arr[j];

		switch (true) {
			case (value === null):
			{
				result += String.raw`\0`;
				break;
			}
			case (typeof value === 'string'):
			{
				result += escapeString(value);
				break;
			}
			case (Array.isArray(value)):
			{
				result += arrTraverse(value);
				break;
			}
			case (typeof value === 'object'):
			{
				result += objTraverse(value);
				break;
			}
			default:
				break;
		}
		result += '.';
	}
	result = result.slice(0, -1);
	result += ']';
	return result;
}

function escapeString(value) {
	let newString = String.raw`${value}`;

	newString = newString.replace('\\', '\\\\');
	newString = newString.replace('.', '\\.');
	newString = newString.replace('{', '\\{');
	newString = newString.replace('}', '\\}');
	newString = newString.replace('[', '\\[');
	newString = newString.replace(']', '\\]');
	return newString;
}
