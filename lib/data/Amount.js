import { isBigNumber, isHex } from './Type';
import { add0xPrefix } from './Hexadecimal';
import { toBigNumber } from './Converter';

const UnitMap = {
	loop: '1',
	gloop: '1000000000',
	icx: '1000000000000000000',
};

function getUnitValue(unit) {
	let unitValue = UnitMap[(unit || 'icx').toLowerCase()];
	unitValue = unitValue || '1000000000000000000';
	return toBigNumber(unitValue);
}

function convertValue(number, converted) {
	if (isBigNumber(number)) {
		return converted;
	}
	if (isHex(number)) {
		return add0xPrefix(converted.toString(16));
	}
	return converted.toString(10);
}

export function toLoop(number, unit) {
	const converted = toBigNumber(number).times(getUnitValue(unit));
	return convertValue(number, converted);
}

export function fromLoop(number, unit) {
	const converted = toBigNumber(number).dividedBy(getUnitValue(unit));
	return convertValue(number, converted);
}
