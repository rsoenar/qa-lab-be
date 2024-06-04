function handleMongooseConnection(connection) {
	connection.on('error', (err) => {
		log(err);
	});
	connection.on('disconnected', (err) => {
		log(err);
	});
}

module.exports = {
	handleMongooseConnection,
};
