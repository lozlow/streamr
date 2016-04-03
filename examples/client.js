/* global io */

var streamr = require('../lib/streamr-client');
var client = new streamr();
client.transport(new streamr.transport.SocketIO(io));
client.req('/spaces/list').then(stream$ => {
	stream$.observe(console.log.bind(console));
});
client.req('/space/cricket').then(stream$ => {
	stream$.observe(console.log.bind(console));
});

// client.req('/spaces/list').observe(console.log.bind(console));
