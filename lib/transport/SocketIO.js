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

	setAdapter(adapter) {
		this.adapter = adapter;
	}

	createStream(room, socket, stream$) {
		// socket.on(':control/subscribe', () => {
		this.adapter.observe(
			stream$,
			function onNext(data) { socket.send({ key: room, data }); }
		).then(
			function onEnd() { socket.emit(':control/end', arguments); },
			function onError() { socket.emit(':control/error', arguments); }
		)
		// });
	}

	connect() {
		this.socketTransport.of('/streamr').on(
			'connection',
			socket => {
				const disconnect = new Promise(resolve => {
					socket.on('disconnect', resolve);
				});
				socket.on(
					'message',
					(route, cb) => {
						var routeStream$ = this.router(route);
						var room = uuid.v4();
						this.createStream(
							room,
							socket.join(room),
							this.adapter.until(this.adapter.share(routeStream$), this.adapter.fromPromise(disconnect))
						);
						cb(room);
					}
				);
			}
		);
	}
}
