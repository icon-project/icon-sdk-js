export function isLastBlockValue(value) {
    return value === 'latest';
}

export function isAddress(address) {
    return /^(hx)|(cx)[0-9a-f]{40}$/i.test(address);
}

export function isEoaAddress(address) {
    return /^(hx)[0-9a-f]{40}$/i.test(address);
}

export function isContractAddress(address) {
    return /^(cx)[0-9a-f]{40}$/i.test(address);
}

export function isTransactionHash(hash) {
    return /^(0x)[0-9a-f]{64}$/i.test(hash);
}