'use strict';

function throwNotImplemented() {
	throw new Error('Not implemented', 'connect');
}

module.exports = class Transport {
	connect() { throwNotImplemented('connect'); }
	setRouter() { throwNotImplemented('setRouter'); }
};
