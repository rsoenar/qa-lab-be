import mongoose from 'mongoose';

const { Schema } = mongoose;
const LaboratoryTestReportSchema = new Schema({
	reportDate: { type: Date, default: null },
	reportNumber: { type: String, trim: true, default: '' },
	testResult: { type: String, default: '' },
	testResultHtml: { type: String, default: '' },
	reportAttachmentFileName: { type: String, default: '' },
	reportAttachmentFileOriginalName: { type: String, default: '' },
	reporter: { type: Schema.Types.ObjectId, ref: 'users', default: null },
	reportApproveDate: { type: Date, default: null },
	reportApprover: { type: Schema.Types.ObjectId, ref: 'users', default: null },
});

LaboratoryTestReportSchema.virtual('id').get(function () {
	return this._id.toHexString();
});

LaboratoryTestReportSchema.set('toJSON', {
	virtuals: true,
	transform: function (_doc, ret) {
		delete ret._id;
		delete ret.__v;
	},
});

LaboratoryTestReportSchema.set('toObject', {
	virtuals: true,
	transform: function (_doc, ret) {
		delete ret._id;
		delete ret.__v;
	},
});

export default mongoose.model(
	'qa.laboratory_test_reports',
	LaboratoryTestReportSchema
);
