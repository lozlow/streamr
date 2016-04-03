'use strict';

function throwNotImplemented(method) {
	throw new Error('Not implemented ' + method);
}

module.exports = class Transport {
	connect() { throwNotImplemented('connect'); }
	setRouter() { throwNotImplemented('setRouter'); }
	setAdapter(adapter) { throwNotImplemented('setAdapter'); }
};
