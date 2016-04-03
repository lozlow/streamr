var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: path.resolve(__dirname + '/client.js'),
	output: {
		filename: path.resolve(__dirname + '/build.js')
	}
};
