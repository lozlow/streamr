var streamr = require('streamr');
var socket = io.connect('http://localhost');
var client = streamr.client();

streamr.transport(new streamr.transport.SocketIO(socket));

var space$ = streamr.req('/spaces/list');
space$.observe(console.log.bind(console));
