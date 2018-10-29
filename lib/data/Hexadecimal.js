/*
 * Copyright 2018 ICON Foundation
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

function addPrefix(checkers, prefix, str) {
	for (let i = 0; i < checkers.length; i += 1) {
		if (checkers[i](str)) {
			return str;
		}
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
	return addPrefix([is0xPrefix], '0x', str);
}

export function addHxPrefix(str) {
	return addPrefix([isHxPrefix, isCxPrefix], 'hx', str);
}

export function addCxPrefix(str) {
	return addPrefix([isHxPrefix, isCxPrefix], 'cx', str);
}

export function remove0xPrefix(str) {
	return removePrefix([is0xPrefix], str);
}

export function removeHxPrefix(str) {
	return removePrefix([isHxPrefix], str);
}

export function removeCxPrefix(str) {
	return removePrefix([isCxPrefix], str);
}
