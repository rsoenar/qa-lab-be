import mongoose from 'mongoose';

// Schemas
const { Schema } = mongoose;
const SurfaceTreatmentSchema = new Schema(
	{
		operationSequence: { type: String, default: undefined },
		tankNumber: { type: String, default: undefined },
		temperatureInCelciusNominal: { type: String, default: undefined },
		temperatureInCelciusActual: { type: String, default: undefined },
		voltageNominal: { type: String, default: undefined },
		voltageActual: { type: String, default: undefined },
		currentDensityNominal: { type: String, default: undefined },
		currentDensityActual: { type: String, default: undefined },
		ampereActual: { type: String, default: undefined },
		passOrFail: { type: String, default: undefined },
		timeInMinuteNominal: { type: String, default: undefined },
		timeInMinuteActual: { type: String, default: undefined },
	},
	{ timestamps: true }
);
const TestingSchema = new Schema(
	{
		materialAndCondition: { type: String, default: undefined },
		dimensionInMilimeter: { type: String, default: undefined },
		quantity: { type: String, default: undefined },
		typeOfTest: { type: String, default: undefined },
		resultNominals: { type: [String], default: undefined },
		resultActuals: { type: [String], default: undefined },
		resultActualAverage: { type: String, default: undefined },
		testMethods: { type: [String], default: undefined },
	},
	{ timestamps: true }
);
const CorrosionResistanceTestSchema = new Schema(
	{
		materialAndCondition: { type: String, default: undefined },
		dimensionInMilimeter: { type: String, default: undefined },
		quantity: { type: String, default: undefined },
		codes: { type: [String], default: undefined },
		angleOfSpecification: { type: String, default: undefined },
		saltCabinets: { type: [String], default: undefined },
		supporting: { type: String, default: undefined },
		durationTimeInHour: { type: String, default: undefined },
		startDate: { type: Date, default: undefined },
		finishDate: { type: Date, default: undefined },
		beforeSaltSprayTestingCleaning: { type: String, default: undefined },
		beforeSaltSprayTestingResults: { type: [String], default: undefined },
		afterSaltSprayTestingCleaning: { type: String, default: undefined },
		afterSaltSprayTestingResults: { type: [String], default: undefined },
		passOrFail: { type: String, default: undefined },
		note: { type: String, default: undefined },
	},
	{ timestamps: true }
);
const ControlOfElectroplatingAndChemicalProcessSheetSchema = new Schema(
	{
		sheetNumber: { type: String, default: undefined },
		process: { type: String, default: undefined },
		program: { type: String, default: undefined },
		specification: { type: String, default: undefined },
		attachmentFileName: { type: String, default: undefined },
		attachmentFileOriginalName: { type: String, default: undefined },
		operatorSignedDate: { type: Date, default: undefined },
		operator: { type: Schema.Types.ObjectId, ref: 'users', default: undefined },
		inspectorSignedDate: { type: Date, default: undefined },
		inspector: {
			type: Schema.Types.ObjectId,
			ref: 'users',
			default: undefined,
		},
		laboratoriumPersonnelSignedDate: { type: Date, default: undefined },
		laboratoriumPersonnel: {
			type: Schema.Types.ObjectId,
			ref: 'users',
			default: undefined,
		},
		beforeSaltSprayTestingLaboratoriumPersonnelSignedDate: {
			type: Date,
			default: undefined,
		},
		beforeSaltSprayTestingLaboratoriumPersonnel: {
			type: Schema.Types.ObjectId,
			ref: 'users',
			default: undefined,
		},
		afterSaltSprayTestingLaboratoriumPersonnelSignedDate: {
			type: Date,
			default: undefined,
		},
		afterSaltSprayTestingLaboratoriumPersonnel: {
			type: Schema.Types.ObjectId,
			ref: 'users',
			default: undefined,
		},
		verificatorSignedDate: { type: Date, default: undefined },
		verificator: {
			type: Schema.Types.ObjectId,
			ref: 'users',
			default: undefined,
		},
		testingNoteInHtml: { type: String, default: undefined },
		finalDecision: { type: String, default: undefined },
		validUntilDate: { type: Date, default: undefined },
		surfaceTreatments: { type: [SurfaceTreatmentSchema], default: undefined },
		testings: { type: [TestingSchema], default: undefined },
		corrosionResistanceTest: {
			type: CorrosionResistanceTestSchema,
			default: undefined,
		},
	},
	{ timestamps: true }
);

// Virtuals
SurfaceTreatmentSchema.virtual('id').get(function () {
	return this._id.toHexString();
});

SurfaceTreatmentSchema.virtual('createdAtMs').get(function () {
	return this.createdAt?.getTime();
});

SurfaceTreatmentSchema.virtual('updatedAtMs').get(function () {
	return this.updatedAt?.getTime();
});

TestingSchema.virtual('id').get(function () {
	return this._id.toHexString();
});

TestingSchema.virtual('createdAtMs').get(function () {
	return this.createdAt?.getTime();
});

TestingSchema.virtual('updatedAtMs').get(function () {
	return this.updatedAt?.getTime();
});

CorrosionResistanceTestSchema.virtual('id').get(function () {
	return this._id.toHexString();
});

CorrosionResistanceTestSchema.virtual('createdAtMs').get(function () {
	return this.createdAt?.getTime();
});

CorrosionResistanceTestSchema.virtual('updatedAtMs').get(function () {
	return this.updatedAt?.getTime();
});

CorrosionResistanceTestSchema.virtual('startDateMs').get(function () {
	return this.startDate?.getTime();
});

CorrosionResistanceTestSchema.virtual('finishDateMs').get(function () {
	return this.finishDate?.getTime();
});

ControlOfElectroplatingAndChemicalProcessSheetSchema.virtual('id').get(
	function () {
		return this._id.toHexString();
	}
);

ControlOfElectroplatingAndChemicalProcessSheetSchema.virtual(
	'createdAtMs'
).get(function () {
	return this.createdAt?.getTime();
});

ControlOfElectroplatingAndChemicalProcessSheetSchema.virtual(
	'updatedAtMs'
).get(function () {
	return this.updatedAt?.getTime();
});

ControlOfElectroplatingAndChemicalProcessSheetSchema.virtual(
	'operatorSignedDateMs'
).get(function () {
	return this.operatorSignedDate?.getTime();
});

ControlOfElectroplatingAndChemicalProcessSheetSchema.virtual(
	'inspectorSignedDateMs'
).get(function () {
	return this.inspectorSignedDate?.getTime();
});

ControlOfElectroplatingAndChemicalProcessSheetSchema.virtual(
	'laboratoriumPersonnelSignedDateMs'
).get(function () {
	return this.laboratoriumPersonnelSignedDate?.getTime();
});

ControlOfElectroplatingAndChemicalProcessSheetSchema.virtual(
	'beforeSaltSprayTestingLaboratoriumPersonnelSignedDateMs'
).get(function () {
	return this.beforeSaltSprayTestingLaboratoriumPersonnelSignedDate?.getTime();
});

ControlOfElectroplatingAndChemicalProcessSheetSchema.virtual(
	'afterSaltSprayTestingLaboratoriumPersonnelSignedDateMs'
).get(function () {
	return this.afterSaltSprayTestingLaboratoriumPersonnelSignedDate?.getTime();
});

// Setters
SurfaceTreatmentSchema.set('toJSON', {
	virtuals: true,
	transform: function (_doc, ret) {
		delete ret._id;
		delete ret.__v;
	},
});

SurfaceTreatmentSchema.set('toObject', {
	virtuals: true,
	transform: function (_doc, ret) {
		delete ret._id;
		delete ret.__v;
	},
});

TestingSchema.set('toJSON', {
	virtuals: true,
	transform: function (_doc, ret) {
		delete ret._id;
		delete ret.__v;
	},
});

TestingSchema.set('toObject', {
	virtuals: true,
	transform: function (_doc, ret) {
		delete ret._id;
		delete ret.__v;
	},
});

CorrosionResistanceTestSchema.set('toJSON', {
	virtuals: true,
	transform: function (_doc, ret) {
		delete ret._id;
		delete ret.__v;
	},
});

CorrosionResistanceTestSchema.set('toObject', {
	virtuals: true,
	transform: function (_doc, ret) {
		delete ret._id;
		delete ret.__v;
	},
});

ControlOfElectroplatingAndChemicalProcessSheetSchema.set('toJSON', {
	virtuals: true,
	transform: function (_doc, ret) {
		delete ret._id;
		delete ret.__v;
	},
});

ControlOfElectroplatingAndChemicalProcessSheetSchema.set('toObject', {
	virtuals: true,
	transform: function (_doc, ret) {
		delete ret._id;
		delete ret.__v;
	},
});

export default mongoose.model(
	'qa.control_of_electroplating_and_chemical_process_sheets',
	ControlOfElectroplatingAndChemicalProcessSheetSchema
);
