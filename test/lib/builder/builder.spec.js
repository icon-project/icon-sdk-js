/* global describe, it, before */

import chai from 'chai';
import Builder from '../../../lib/builder/Builder';

chai.expect();
const { expect } = chai;

let builder;

describe('Given an instance of CallBuilder', () => {
	before(() => {
		builder = new Builder.CallBuilder();
	});
	describe('CallBuilder', () => {
		it('should have \'to\'', () => {
			expect(builder).to.have.property('to');
		});
	});
});
