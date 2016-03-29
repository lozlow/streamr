'use strict';

var Stream = require('./Stream');

class most extends Stream {
	constructor(stream$) {
		super();
		this.stream$ = stream$;
	}
}

module.exports = most;
