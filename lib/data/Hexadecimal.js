function addPrefix(checkFunc, prefix, str) {
	if (checkFunc(str)) {
		return str;
	}
	return prefix + str;
}

function removePrefix(checkFunc, str) {
	if (checkFunc(str)) {
		return str.substr(2);
	}
	return str;
}

export function is0xPrefix(str) {
	return /^(0x)/i.test(str);
}

export function isHxPrefix(str) {
	return /^(hx)/i.test(str);
}

export function isCxPrefix(str) {
	return /^(cx)/i.test(str);
}

export function add0xPrefix(str) {
	return addPrefix(is0xPrefix, '0x', str);
}

export function addHxPrefix(str) {
	return addPrefix(isHxPrefix, 'hx', str);
}

export function addCxPrefix(str) {
	return addPrefix(isCxPrefix, 'cx', str);
}

export function remove0xPrefix(str) {
	return removePrefix(is0xPrefix, str);
}

export function removeHxPrefix(str) {
	return removePrefix(isHxPrefix, str);
}

export function removeCxPrefix(str) {
	return removePrefix(isCxPrefix, str);
}
