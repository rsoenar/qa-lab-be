import { Router } from 'express';

import Media from '../../../models/common/Media';
import { log } from '../../../utils/log';

const router = Router();

export default () => {
	router.route('/all').get((_req, res) => {
		Media.find()
			.populate('uploader')
			.then((medias) => {
				return res.status(200).json({
					success: medias?.length ? true : false,
					message: null,
					data: { medias },
				});
			})
			.catch((err) => {
				log(err);
				res.status(500).json(err);
			});
	});

	return router;
};
