'use strict';

var Stream = require('./Stream');

class most extends Stream {
	constructor(lib) {
		super();
		this.lib = lib;
	}

	observe(stream, cb) {
		return this.lib.observe(cb, stream);
	}

	share(stream) {
		return stream.multicast();
	}

	until(stream, endSignal) {
		return this.lib.until(endSignal, stream);
	}

	fromPromise(promise) {
		return this.lib.fromPromise(promise);
	}
}

module.exports = most;
