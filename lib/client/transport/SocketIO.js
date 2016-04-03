var most = require('most');

class SocketIO {
	constructor(io) {
		this.io = io;
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
		return this.connection$.continueWith(
			() => most.fromPromise(
				new Promise(
					resolve => {
						this.socket.send(
							url,
							key => {
								resolve(this.jumbo$.filter(ev => ev.key === key).map(ev => ev.data));
							}
						);
					}
				)
			)
		).skip(1).join();
	}
}

module.exports = SocketIO;
