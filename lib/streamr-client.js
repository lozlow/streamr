class Client {
	transport(transport) {
		this.transport = transport;
		this.transport.connect();
	}
	req(url) {
		return this.transport.req(url);
	}
}

Client.transport = {
	SocketIO: require('./client/transport/SocketIO')
};

module.exports = Client;
