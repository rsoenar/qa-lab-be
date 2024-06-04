import log4js from 'log4js';

log4js.configure({
	appenders: {
		backend: { type: 'file', filename: 'server.log' },
	},
	categories: {
		default: { appenders: ['backend'], level: 'debug' },
	},
	pm2: true,
});

const fileLogger = log4js.getLogger('backend');

function log(message) {
	console.log(message);
	fileLogger.debug(message);
}

module.exports = { log };
