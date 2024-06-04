import mongoose from 'mongoose';

import NotFoundError from './NotFoundError';

function handleError(err, res) {
	const { status, statusCode, message } = err;

	switch (err.constructor) {
		case mongoose.CastError || mongoose.DocumentNotFoundError:
			return res.status(404).json({
				status: 'fail',
				message: 'Data was not found',
			});

		default:
			res.status(statusCode ?? 500).json({
				status: status ?? 'error',
				message,
			});
	}
}

module.exports = {
	NotFoundError,
	handleError,
};
