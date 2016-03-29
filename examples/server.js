var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var most = require('most');
var streamr = require('../lib/streamr');

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

var streamrServer = streamr.app({ compat: streamr.compat.most });
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
		return most.just(['Cricket', 'Tennis', 'Squash']);
	}
);

server.on('listen', console.log.bind(console, 'listening'));

server.listen(8001);
