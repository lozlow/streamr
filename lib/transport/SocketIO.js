'use strict';

var Transport = require('./Transport');
var uuid = require('node-uuid');

module.exports = class SocketIO extends Transport {
	constructor(socketTransport) {
		super();
		this.socketTransport = socketTransport;
	}

	setRouter(router) {
		this.router = router;
	}

	createStream(room, socket, stream$) {
		socket.on(':control/subscribe', () => {
			stream$.observe(
				function onNext() { socket.in(room).send(arguments); }
			).then(
				function onEnd() { socket.in(room).emit(':control/end', arguments); }
			).err(
				function onError() { socket.in(room).emit(':control/error', arguments); }
			)
		});
	}

	connect() {
		this.socketTransport.of('/streamr').on(
			'connection',
			socket => {
				socket.on(
					'message',
					(route, cb) => {
						var routeStream$ = this.router(route);
						var room = uuid.v4();
						this.createStream(room, socket.join(room), routeStream$);
						cb(room);
					}
				);
			}
		);
	}
}
