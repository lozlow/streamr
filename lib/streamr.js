var path = require('path');

console.log(path.resolve(__dirname + '/compat/most'));

module.exports = {
	compat: {
		most: require(path.resolve(__dirname + '/compat/most'))
	},
	transport: {
		SocketIO: require(path.resolve(__dirname + '/transport/SocketIO'))
	},
	app: function(opts) {
		var App = require(path.resolve(__dirname + '/App'));
		return new App(opts);
	}
};
