import mongoose from 'mongoose';

const { Schema } = mongoose;
const LaboratoryTestSchema = new Schema({
	qaLaboratoryTestRequests: [
		{
			type: Schema.Types.ObjectId,
			ref: 'qa.laboratory_test_requests',
			default: null,
		},
	],
	qaLaboratoryTestReports: [
		{
			type: Schema.Types.ObjectId,
			ref: 'qa.laboratory_test_reports',
			default: null,
		},
	],
});

LaboratoryTestSchema.virtual('id').get(function () {
	return this._id.toHexString();
});

LaboratoryTestSchema.set('toJSON', {
	virtuals: true,
	transform: function (_doc, ret) {
		delete ret._id;
		delete ret.__v;
	},
});

LaboratoryTestSchema.set('toObject', {
	virtuals: true,
	transform: function (_doc, ret) {
		delete ret._id;
		delete ret.__v;
	},
});

export default mongoose.model('qa.laboratory_tests', LaboratoryTestSchema);
