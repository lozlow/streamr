/* global io */

var streamr = require('../lib/streamr-client');
var client = new streamr();
client.transport(new streamr.transport.SocketIO(io));
client.req('/spaces/list').observe(console.log.bind(console)).then(console.log.bind(console, 'finished!'));
client.req('/space/cricket').observe(console.log.bind(console));
