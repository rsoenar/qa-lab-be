import mongoose from 'mongoose';

const { Schema } = mongoose;
const MediaSchema = new Schema(
	{
		uploader: { type: Schema.Types.ObjectId, ref: 'users', default: null },
		fileName: { type: String, required: true },
		type: { type: String, trim: true, required: true },
		title: { type: String, trim: true, required: true },
		category: { type: [String], trim: true, default: undefined },
		viewCount: { type: Number, default: 0 },
	},
	{ timestamps: true }
);

MediaSchema.virtual('id').get(function () {
	return this._id.toHexString();
});

MediaSchema.set('toJSON', {
	virtuals: true,
	transform: function (_doc, ret) {
		delete ret._id;
		delete ret.__v;
	},
});

MediaSchema.set('toObject', {
	virtuals: true,
	transform: function (_doc, ret) {
		delete ret._id;
		delete ret.__v;
	},
});

export default mongoose.model('medias', MediaSchema);
