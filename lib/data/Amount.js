import BigNumber from 'bignumber.js';
import { toBigNumber, toNumber } from './Converter';
import { isBigNumber, isHex } from './Type';
import { add0xPrefix } from './Hexadecimal';

function getTenDigit(digit) {
	return (new BigNumber(10)).exponentiatedBy(digit);
}

export default class IconAmount {
	constructor(value, digit) {
		this.value = toBigNumber(value);
		this.digit = toNumber(digit);
	}

	getDigit() {
		return this.digit;
	}

	toString() {
		return this.value.toString();
	}

	toLoop() {
		return this.value.times(getTenDigit(this.digit));
	}

	convertUnit(digit) {
		const loop = this.toLoop(this.value);
		return IconAmount.of(loop.dividedBy(getTenDigit(digit)), digit);
	}

	static of(loop, digit) {
		return new IconAmount(toBigNumber(loop), digit);
	}
}

IconAmount.Unit = {
	LOOP: 0,
	ICX: 18,
};

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

function toLoop(number, unit) {
	const calculated = toBigNumber(number).times(getUnitValue(unit));
	return convertValue(number, calculated);
}

function fromLoop(number, unit) {
	const calculated = toBigNumber(number).dividedBy(getUnitValue(unit));
	return convertValue(number, calculated);
}

IconAmount.toLoop = toLoop;
IconAmount.fromLoop = fromLoop;
