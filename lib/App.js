'use strict';

var switchPath = require('switch-path').default;
var Transport = require('./transport/Transport');

function makeHandler(route, handler) {
	return function $handler(/* queryParams */) {
		var args = Array.prototype.slice.call(arguments);
		var argNames = route.match(/\/?:([a-zA-Z0-9-]+)\/?/g);
		var queryParams;
		if (argNames) {
			queryParams = argNames.map(
				argName => argName.replace(/\/:/g, '')
			).reduce(
				(accum, argName, idx) => Object.assign(accum, { [argName]: args[idx] }),
				{}
			);
		}
		return handler({ query: queryParams });
	};
}

class App {
	constructor(opts) {
		this.opts = opts;
		this.routes = {};
	}

	transport(transport) {
		if (!transport instanceof Transport) {
			throw Error('Given transport does not inherit from Transport');
		}
		this.transport = transport;
		this.transport.setRouter(this.router.bind(this));
		this.transport.connect();
	}

	use(route, handler) {
		this.routes = Object.assign({}, this.routes, { [route]: makeHandler(route, handler) });
	}

	router(route) {
		var stream$ = switchPath(route, this.routes).value;
		if (typeof stream$ === 'function') {
			stream$ = stream$();
		}
		var clazz = this.opts.compat;
		return new clazz(stream$);
	}
}

module.exports = App;
