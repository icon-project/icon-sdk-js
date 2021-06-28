/*
 * Copyright 2021 ICON Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import BigNumber from "bignumber.js";
import { toBigNumber, toNumber } from "./Converter";
import { isBigNumber, isHex } from "./Type";
import { add0xPrefix } from "./Hexadecimal";
import { Hash } from "../types/hash";

function getTenDigit(digit) {
  return new BigNumber(10).exponentiatedBy(digit);
}

/**
 * Class which provides unit conversion functions.
 */
export default class IconAmount {
  /**
   * IconAmount class property which contains unit digit constants
   */
  static Unit = {
    LOOP: 0,
    GLOOP: 9,
    ICX: 18,
  };

  /**
   * TODO: test static toLoop, fromLoop
   */

  /**
   * IconAmount static method which converts the unit of number into loop
   * @param {string|BigNumber|number} number - the value of amount.
   * @param {string|BigNumber|number} unit - the digit of unit.
   * @return {string|BigNumber|number} the value converted into loop
   */
  static toLoop = toLoop;

  /**
   * IconAmount static method which converts the unit of number into ICX
   * @param {string|BigNumber|number} number - the value of amount.
   * @param {string|BigNumber|number} unit - the digit of unit.
   * @return {string|BigNumber|number} the value converted into ICX
   */
  static fromLoop = fromLoop;

  value: BigNumber;

  digit: number;

  /**
   * Creates an instance of IconAmount.
   * @param {string|BigNumber|number} value - the value of amount.
   * @param {string|BigNumber|number} digit - the digit of unit.
   */
  /**
   * Note: According to official document of BigNumber.js,
   * it is recommended to create BigNumbers from String values rather than Number values
   * to avoid a potential loss of precision.
   */
  constructor(value, digit) {
    this.value = toBigNumber(value);
    this.digit = toNumber(digit);
  }

  /**
   * Creates an instance of IconAmount.
   * @static
   * @param {string|BigNumber|number} value - the value of amount.
   * @param {string|BigNumber|number} digit - the digit of unit.
   * @return {IconAmount} the IconAmount instance.
   */
  static of(value, digit) {
    return new IconAmount(toBigNumber(value), digit);
  }

  /**
   * Get digit property.
   * @return {number} the digit property of IconAmount instance.
   */
  getDigit() {
    return this.digit;
  }

  /**
   * Convert value property into string
   * @return {string} the stringified value property of IconAmount instance
   */
  toString() {
    return this.value.toString();
  }

  /**
   * Convert the unit of value property into loop
   * @return {BigNumber} the value property converted into loop
   */
  toLoop() {
    return this.value.times(getTenDigit(this.digit));
  }

  /**
   * Convert the unit of value property into custom digit
   * @param {string|BigNumber|number} digit - the digit of unit.
   * @return {IconAmount} the IconAmount instance converted into custom digit
   */
  convertUnit(digit) {
    // TODO: check toLoop
    // original source
    // const loop = this.toLoop(this.value);
    const loop = this.toLoop();

    return IconAmount.of(loop.dividedBy(getTenDigit(digit)), digit);
  }
}

const UnitMap = {
  loop: "1",
  gloop: "1000000000",
  icx: "1000000000000000000",
};

function getUnitValue(unit: string): BigNumber {
  let unitValue = UnitMap[(unit || "icx").toLowerCase()];
  unitValue = unitValue || "1000000000000000000";

  return toBigNumber(unitValue);
}

function convertValue(number: Hash, calculated: BigNumber): Hash {
  if (isBigNumber(number)) {
    return calculated;
  }

  if (isHex(number.toString())) {
    return add0xPrefix(calculated.toString(16));
  }

  return calculated.toNumber();
}

function toLoop(number: Hash, unit: string): Hash {
  const calculated = toBigNumber(number).times(getUnitValue(unit));

  return convertValue(number, calculated);
}

function fromLoop(number: Hash, unit: string): Hash {
  const calculated = toBigNumber(number).dividedBy(getUnitValue(unit));

  return convertValue(number, calculated);
}
