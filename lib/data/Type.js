export function isInteger(value) {
    return Number.isInteger(value);
}

export function isNumeric(str) {
    return /^\d+$/.test(str);
}

export function isString(value) {
    return typeof value === 'string' || value instanceof String;
}

export function isBytes(value) {
    return !!value && value.byteLength !== undefined;
}