import mongoose from 'mongoose';

const { Schema } = mongoose;
const ChemicalSolutionControlWorksheetSchema = new Schema({
	creationDate: { type: Date, default: Date.now },
	revised: { type: Boolean, default: false },
	revision: { type: Number, default: 0 },
	revisedWorksheet: {
		type: Schema.Types.ObjectId,
		ref: 'qa.chemical_solution_control_worksheets',
		default: null,
	},
	creator: { type: Schema.Types.ObjectId, ref: 'users', default: null },
	solutionProcess: { type: String, default: '' },
	tankNumber: { type: String, default: '' },
	tankSize: { type: String, default: '' },
	tankVolume: { type: String, default: '' },
	location: { type: String, default: '' },
	testMethod: { type: String, default: '' },
	frequencyOfTest: { type: String, default: '' },
	temperatureRangeInCelcius: { type: String, default: '' },
	solutionTargetLimits: [
		{
			solution: { type: String, default: '' },
			min: { type: String, default: '' },
			target: { type: String, default: '' },
			max: { type: String, default: '' },
		},
	],
	solutionSpecificationReferences: [
		{
			solution: { type: String, default: '' },
			organization: { type: String, default: '' },
			specification: { type: String, default: '' },
			value: { type: String, default: '' },
		},
	],
	analysisSolutions: [
		{
			solution: { type: String, default: '' },
		},
	],
	records: [
		{
			creationDate: { type: Date, default: Date.now },
			creator: { type: Schema.Types.ObjectId, ref: 'users', default: null },
			sampleTakenDate: { type: Date, default: null },
			sampleTakenTime: { type: String, default: '' },
			agitationInMinutes: { type: String, default: '' },
			temperatureInCelcius: { type: String, default: '' },
			sampleAnalysisDate: { type: Date, default: null },
			sampleAnalysisTime: { type: String, default: '' },
			result: { type: String, default: '' },
			verificationDate: { type: Date, default: null },
			verifier: { type: Schema.Types.ObjectId, ref: 'users', default: null },
			analysisResults: [
				{
					type: String,
					default: '',
				},
			],
			remarks: { type: String, default: '' },
			chemicalChargingRecordNumber: { type: String, default: '' },
			chemicalChargingRecordReceivedDate: { type: Date, default: null },
			recordAttachmentFileName: { type: String, default: '' },
			recordAttachmentFileOriginalName: { type: String, default: '' },
		},
	],
});

ChemicalSolutionControlWorksheetSchema.virtual('id').get(function () {
	return this._id.toHexString();
});

ChemicalSolutionControlWorksheetSchema.set('toJSON', {
	virtuals: true,
	transform: function (_doc, ret) {
		delete ret._id;
		delete ret.__v;
	},
});

ChemicalSolutionControlWorksheetSchema.set('toObject', {
	virtuals: true,
	transform: function (_doc, ret) {
		delete ret._id;
		delete ret.__v;
	},
});

export default mongoose.model(
	'qa.chemical_solution_control_worksheets',
	ChemicalSolutionControlWorksheetSchema
);
