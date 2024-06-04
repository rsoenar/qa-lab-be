import { sign } from 'jsonwebtoken';

import { secretKey } from '../config/common';

const createUserToken = (user) => {
	const {
		_id,
		createdAt,
		newUser,
		nik,
		username,
		name,
		organization,
		iaeEmail,
		phoneNo,
		authorization,
	} = user;

	return sign(
		{
			id: _id,
			createdAt,
			newUser,
			nik,
			username,
			name,
			organization,
			iaeEmail,
			phoneNo,
			authorization,
		},
		secretKey,
		{
			expiresIn: '4h',
		}
	);
};

module.exports = { createUserToken };
