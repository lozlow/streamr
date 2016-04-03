var most = require('most');

class SocketIO {
	constructor(io) {
		this.io = io;
		this.streams = {};
	}
	connect() {
		var socket = this.io.connect('/streamr');
		this.connection = new Promise((resolve, reject) => {
			socket.on('connect', () => resolve(socket));
			this.jumbo$ = most.create((add, end, error) => {
				socket.on('message', add);
				socket.on('disconnect', end);
			});
		});
	}
	req(url) {
		return this.connection.then(
			socket => {
				return new Promise((resolve, reject) => {
					socket.send(url, (key) => {
						resolve(this.streams[key] = this.jumbo$.filter(ev => ev.key === key).map(ev => ev.data));
					});
				});
			}
		);
	}
}

module.exports = SocketIO;
