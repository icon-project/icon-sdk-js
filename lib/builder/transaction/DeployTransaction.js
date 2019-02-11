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

import { IcxTransaction, IcxTransactionBuilder } from './IcxTransaction';
import { createPrivate } from '../../data/Util';

/**
 * Subclass making a transaction object for deploying SCORE.
 * @extends {IcxTransaction}
 */
class DeployTransaction extends IcxTransaction {
	constructor(
		to, from, value, stepLimit, nid, nonce,
		version, timestamp, contentType, content, params,
	) {
		super(to, from, value, stepLimit, nid, nonce, version, timestamp);
		this.dataType = 'deploy';
		this.data = { contentType, content, params };
	}
}

/**
 * Builder for 'DeployTransaction' object.
 * @extends {IcxTransactionBuilder}
 */
export default class DeployTransactionBuilder extends IcxTransactionBuilder {
	/**
	 * Creates an instance of DeployTransactionBuilder.
	 */
	constructor(to, from, value, stepLimit, nid, nonce, version, timestamp) {
		super(to, from, value, stepLimit, nid, nonce, version, timestamp);
		this.private = createPrivate();
		this.private(this).contentType = undefined;
		this.private(this).content = undefined;
		this.private(this).params = undefined;
	}

	/**
	 * Set 'contentType' property
	 * @param {string} contentType - The content type of content
	 * @return {DeployTransactionBuilder} this.
	 */
	contentType(contentType) {
		this.private(this).contentType = contentType;
		return this;
	}

	/**
	 * Set 'content' property
	 * @param {string} content - The content to deploy.
	 * @return {DeployTransactionBuilder} this.
	 */
	content(content) {
		this.private(this).content = content;
		return this;
	}

	/**
	 * Set 'params' property
	 * @param {object} params - The input params for deploying content
	 * @return {DeployTransactionBuilder} this.
	 */
	params(params) {
		this.private(this).params = params;
		return this;
	}

	/**
	 * Build 'DeployTransaction' object
	 * @return {DeployTransaction} 'DeployTransaction' instance exported by 'DeployTransactionBuilder'
	 */
	build() {
		return new DeployTransaction(
			this.private(this).to,
			this.private(this).from,
			this.private(this).value,
			this.private(this).stepLimit,
			this.private(this).nid,
			this.private(this).nonce,
			this.private(this).version,
			this.private(this).timestamp,

			this.private(this).contentType,
			this.private(this).content,
			this.private(this).params,
		);
	}
}
