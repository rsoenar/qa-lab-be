import { Router } from 'express';
import { compare, hashSync } from 'bcryptjs';

import User from '../../../models/common/User';
import UserAuthorization from '../../../models/common/UserAuthorization';
import { createUserToken } from '../../../utils/auth';
import { log } from '../../../utils/log';

const router = Router();

export default (io) => {
	router.route('/all').get((_req, res) => {
		User.find()
			.populate('authorization')
			.lean()
			.then((results) => {
				let users;

				if (results.length) {
					users = results
						.map((user) => {
							user.id = String(user._id);

							if (user.authorization) {
								user.authorization.id = String(user.authorization?._id);

								delete user.authorization?._id;
								delete user.authorization?.__v;
							}

							const {
								_id,
								__v,
								username,
								password,
								newUser,
								gender,
								education,
								major,
								birthDate,
								creationDate,
								duty,
								location,
								...mappedUser
							} = user;

							return mappedUser;
						})
						.sort((a, b) => (a.nik > b.nik ? 1 : b.nik > a.nik ? -1 : 0));
				}

				return res.status(200).json({
					success: !!results?.length,
					message: null,
					data: { users },
				});
			})
			.catch((err) => {
				log(err);
				res.status(500).json(err);
			});
	});

	router.route('/register').post((req, res) => {
		const { nik, username, password } = req?.body;

		User.findOne({ nik })
			.lean()
			.then((result) => {
				if (result) {
					return res.status(200).json({
						success: false,
						message: 'NIK already registered. Contact the Administrator.',
						data: null,
					});
				}

				return new UserAuthorization({})
					.save()
					.then((result) =>
						new User({
							nik,
							username,
							password: hashSync(password, 10),
							authorization: result?._id,
						}).save()
					)
					.then((result) => {
						if (result) {
							io.sockets.emit('users_updated');
						}

						return res.status(201).json({
							success: !!result,
							message: null,
							data: null,
						});
					});
			})
			.catch((err) => {
				log(err);
				res.status(500).json(err);
			});
	});

	router.route('/login').post((req, res) => {
		const { username, password } = req?.body;

		User.findOne({ username })
			.populate('authorization')
			.then((result) => {
				if (!result) {
					return res.status(200).json({
						success: false,
						message: "User doesn't exists.",
						data: null,
					});
				}

				compare(password, result?.password).then((match) => {
					if (match) {
						const token = createUserToken(result);

						return res.status(200).json({
							success: !!token,
							message: null,
							data: { token: `Bearer ${token}` },
						});
					}

					return res.status(200).json({
						success: false,
						message: 'Password incorrect',
						data: null,
					});
				});
			})
			.catch((err) => {
				log(err);
				res.status(500).json(err);
			});
	});

	router.route('/refresh').post((req, res) => {
		const { id } = req?.body;

		User.findOne({ _id: id })
			.populate('authorization')
			.lean()
			.then((result) => {
				if (!result) {
					return res.status(200).json({
						success: false,
						message: "User ID doesn't exists.",
						data: null,
					});
				}

				const token = createUserToken(result);

				return res.status(200).json({
					success: !!token,
					message: null,
					data: { token: `Bearer ${token}` },
				});
			})
			.catch((err) => {
				log(err);
				res.status(500).json(err);
			});
	});

	router.route('/profile').patch((req, res) => {
		const { id, ...update } = req?.body;

		User.findOneAndUpdate({ _id: id }, update, { new: true })
			.populate('authorization')
			.then((result) => {
				if (!result) {
					return res.status(200).json({
						success: false,
						message: "User ID doesn't exists.",
						data: null,
					});
				}

				const token = createUserToken(result);

				io.sockets.emit('users_updated');

				return res.status(200).json({
					success: !!token,
					message: null,
					data: { token: `Bearer ${token}` },
				});
			})
			.catch((err) => {
				log(err);
				res.status(500).json(err);
			});
	});

	router.route('/password').patch((req, res) => {
		const { id, password } = req?.body;

		User.findOneAndUpdate(
			{ _id: id },
			{ password: hashSync(password, 10) },
			{ new: true }
		)
			.populate('authorization')
			.then((result) => {
				const token = createUserToken(result);

				if (!result) {
					return res.status(200).json({
						success: false,
						message: "User ID doesn't exists.",
						data: null,
					});
				}

				return res.status(200).json({
					success: !!token,
					message: null,
					data: { token: `Bearer ${token}` },
				});
			})
			.catch((err) => {
				log(err);
				res.status(500).json(err);
			});
	});

	router.route('/logout').post((_req, res) =>
		res.status(200).json({
			success: true,
			message: null,
			data: null,
		})
	);

	return router;
};
