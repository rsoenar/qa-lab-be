import { log } from '../utils/log';
function handleMongooseConnection(connection) {
	connection.on('error', (err) => {
		console.log(err);
		log(err);
	});
	connection.on('disconnected', (err) => {
		console.log(err);
		log(err);
	});
}

module.exports = {
	handleMongooseConnection,
};
