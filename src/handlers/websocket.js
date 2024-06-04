function handleWsConnection(ws) {
	ws.on('connection', (socket) => {
		const { id } = socket;

		log(`Client ${id} is connected.`);
		socket.on('disconnect', (reason) => {
			log(`Client ${id} is disconnected. Reason: ${reason}.`);
		});
	});
}

module.exports = {
	handleWsConnection,
};
