var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var most = require('most');
var streamr = require('../lib/streamr');
var webpack = require('webpack');

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/build.js', function(req, res) {
	webpack(require('./config')).run((err, stats) => {
		console.log(arguments);
		console.log(stats.toString());
		res.sendFile(__dirname + '/build.js');
	});
});

var streamrServer = streamr.app({ compat: new streamr.compat.most(most) });
streamrServer.transport(new streamr.transport.SocketIO(io));

streamrServer.use(
	'/spaces/list',
	function(req) {
		return most.just(['Cricket', 'Tennis', 'Squash']);
	}
);

streamrServer.use(
	'/space/:id',
	function(req) {
		return most.periodic(1000, 'b').take(5);
	}
);

server.on('listen', console.log.bind(console, 'listening'));

server.listen(8001);
