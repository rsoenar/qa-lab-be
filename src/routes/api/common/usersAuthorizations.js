import { Router } from 'express';

import UserAuthorization from '../../../models/common/UserAuthorization';
import { log } from '../../../utils/log';

const router = Router();

export default (io) => {
	router.route('/:authorizationId').patch((req, res) => {
		const { params, body } = req;

		UserAuthorization.updateOne({ _id: params?.authorizationId }, body)
			.then((result) => {
				if (result?.nModified === 1) {
					io.sockets.emit('users_authorizations_updated');
				}

				return res.status(200).json({
					success: true,
					message: null,
					data: null,
				});
			})
			.catch((err) => {
				log(err);
				res.status(500).json(err);
			});
	});

	return router;
};
