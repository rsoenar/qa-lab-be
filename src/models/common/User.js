import mongoose from 'mongoose';

const { Schema } = mongoose;
const UserSchema = new Schema(
	{
		newUser: { type: Boolean, default: true },
		nik: { type: String, required: true },
		username: { type: String, required: true },
		password: { type: String, required: true },
		name: { type: String, trim: true, default: undefined },
		birthDate: { type: Date, default: undefined },
		gender: { type: String, trim: true, default: undefined },
		education: { type: String, trim: true, default: undefined },
		major: { type: String, trim: true, default: undefined },
		organization: { type: String, trim: true, default: undefined },
		duty: { type: String, trim: true, default: undefined },
		iaeEmail: { type: String, trim: true, default: undefined },
		phoneNo: { type: String, trim: true, default: undefined },
		location: { type: String, trim: true, default: undefined },
		authorization: { type: Schema.Types.ObjectId, ref: 'users.authorizations' },
	},
	{ timestamps: true }
);

UserSchema.virtual('id').get(function () {
	return this._id.toHexString();
});

UserSchema.set('toJSON', {
	virtuals: true,
	transform: function (_doc, ret) {
		delete ret._id;
		delete ret.__v;
	},
});

UserSchema.set('toObject', {
	virtuals: true,
	transform: function (_doc, ret) {
		delete ret._id;
		delete ret.__v;
	},
});

export default mongoose.model('users', UserSchema);
