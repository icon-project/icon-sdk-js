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

function convertValue(number, calculated) {
	if (isBigNumber(number)) {
		return calculated;
	}
	if (isHex(number)) {
		return add0xPrefix(calculated.toString(16));
	}
	return calculated.toNumber();
}

export function toLoop(number, unit) {
	const calculated = toBigNumber(number).times(getUnitValue(unit));
	return convertValue(number, calculated);
}

export function fromLoop(number, unit) {
	const calculated = toBigNumber(number).dividedBy(getUnitValue(unit));
	return convertValue(number, calculated);
}
