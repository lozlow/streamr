module.exports = {
	compat: {
		most: require('./compat/most')
	},
	transport: {
		SocketIO: require('./transport/SocketIO')
	},
	app: function(opts) {
		var App = require('./App');
		return new App(opts);
	},
	client: require('./client')
};
