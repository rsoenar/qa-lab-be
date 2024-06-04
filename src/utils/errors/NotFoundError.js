class NotFoundError extends Error {
	constructor(message) {
		super();
		this.status = 'fail';
		this.statusCode = 404;
		this.message = message;
	}
}

module.exports = NotFoundError;
