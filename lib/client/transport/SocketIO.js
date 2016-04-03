var most = require('most');

class SocketIO {
	constructor(io) {
		this.io = io;
		this.streams = {};
	}

	connect() {
		this.socket = this.io.connect('/streamr');
		this.connection$ = most.fromPromise(
			new Promise(resolve => {
				this.socket.on('connect', () => resolve(this.socket));
				this.jumbo$ = most.create((add, end, error) => {
					this.socket.on('message', add);
					this.socket.on('disconnect', end);
					this.socket.on('error', error);
				});
			})
		);
	}

	req(url) {
		return this.connection$.skip(1).continueWith(
			() => most.fromPromise(
				new Promise(
					resolve => {
						this.socket.send(
							url,
							key => {
								resolve(this.streams[key] = this.jumbo$.filter(ev => ev.key === key).map(ev => ev.data));
							}
						);
					}
				)
			)
		).join();
	}
}

module.exports = SocketIO;
