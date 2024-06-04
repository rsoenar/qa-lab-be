import mongoose from 'mongoose';

// Schemas
const { Schema } = mongoose;
const SurfaceTreatmentTemplateSchema = new Schema(
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
const TestingTemplateSchema = new Schema(
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
const CorrosionResistanceTestTemplateSchema = new Schema(
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
const ControlOfElectroplatingAndChemicalProcessTemplateSchema = new Schema(
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
		surfaceTreatments: {
			type: [SurfaceTreatmentTemplateSchema],
			default: undefined,
		},
		testings: { type: [TestingTemplateSchema], default: undefined },
		corrosionResistanceTest: {
			type: CorrosionResistanceTestTemplateSchema,
			default: undefined,
		},
	},
	{ timestamps: true }
);

// Virtuals
SurfaceTreatmentTemplateSchema.virtual('id').get(function () {
	return this._id.toHexString();
});

SurfaceTreatmentTemplateSchema.virtual('createdAtMs').get(function () {
	return this.createdAt?.getTime();
});

SurfaceTreatmentTemplateSchema.virtual('updatedAtMs').get(function () {
	return this.updatedAt?.getTime();
});

TestingTemplateSchema.virtual('id').get(function () {
	return this._id.toHexString();
});

TestingTemplateSchema.virtual('createdAtMs').get(function () {
	return this.createdAt?.getTime();
});

TestingTemplateSchema.virtual('updatedAtMs').get(function () {
	return this.updatedAt?.getTime();
});

CorrosionResistanceTestTemplateSchema.virtual('id').get(function () {
	return this._id.toHexString();
});

CorrosionResistanceTestTemplateSchema.virtual('createdAtMs').get(function () {
	return this.createdAt?.getTime();
});

CorrosionResistanceTestTemplateSchema.virtual('updatedAtMs').get(function () {
	return this.updatedAt?.getTime();
});

CorrosionResistanceTestTemplateSchema.virtual('startDateMs').get(function () {
	return this.startDate?.getTime();
});

CorrosionResistanceTestTemplateSchema.virtual('finishDateMs').get(function () {
	return this.finishDate?.getTime();
});

ControlOfElectroplatingAndChemicalProcessTemplateSchema.virtual('id').get(
	function () {
		return this._id.toHexString();
	}
);

ControlOfElectroplatingAndChemicalProcessTemplateSchema.virtual(
	'createdAtMs'
).get(function () {
	return this.createdAt?.getTime();
});

ControlOfElectroplatingAndChemicalProcessTemplateSchema.virtual(
	'updatedAtMs'
).get(function () {
	return this.updatedAt?.getTime();
});

ControlOfElectroplatingAndChemicalProcessTemplateSchema.virtual(
	'operatorSignedDateMs'
).get(function () {
	return this.operatorSignedDate?.getTime();
});

ControlOfElectroplatingAndChemicalProcessTemplateSchema.virtual(
	'inspectorSignedDateMs'
).get(function () {
	return this.inspectorSignedDate?.getTime();
});

ControlOfElectroplatingAndChemicalProcessTemplateSchema.virtual(
	'laboratoriumPersonnelSignedDateMs'
).get(function () {
	return this.laboratoriumPersonnelSignedDate?.getTime();
});

ControlOfElectroplatingAndChemicalProcessTemplateSchema.virtual(
	'beforeSaltSprayTestingLaboratoriumPersonnelSignedDateMs'
).get(function () {
	return this.beforeSaltSprayTestingLaboratoriumPersonnelSignedDate?.getTime();
});

ControlOfElectroplatingAndChemicalProcessTemplateSchema.virtual(
	'afterSaltSprayTestingLaboratoriumPersonnelSignedDateMs'
).get(function () {
	return this.afterSaltSprayTestingLaboratoriumPersonnelSignedDate?.getTime();
});

// Setters
SurfaceTreatmentTemplateSchema.set('toJSON', {
	virtuals: true,
	transform: function (_doc, ret) {
		delete ret._id;
		delete ret.__v;
	},
});

SurfaceTreatmentTemplateSchema.set('toObject', {
	virtuals: true,
	transform: function (_doc, ret) {
		delete ret._id;
		delete ret.__v;
	},
});

TestingTemplateSchema.set('toJSON', {
	virtuals: true,
	transform: function (_doc, ret) {
		delete ret._id;
		delete ret.__v;
	},
});

TestingTemplateSchema.set('toObject', {
	virtuals: true,
	transform: function (_doc, ret) {
		delete ret._id;
		delete ret.__v;
	},
});

CorrosionResistanceTestTemplateSchema.set('toJSON', {
	virtuals: true,
	transform: function (_doc, ret) {
		delete ret._id;
		delete ret.__v;
	},
});

CorrosionResistanceTestTemplateSchema.set('toObject', {
	virtuals: true,
	transform: function (_doc, ret) {
		delete ret._id;
		delete ret.__v;
	},
});

ControlOfElectroplatingAndChemicalProcessTemplateSchema.set('toJSON', {
	virtuals: true,
	transform: function (_doc, ret) {
		delete ret._id;
		delete ret.__v;
	},
});

ControlOfElectroplatingAndChemicalProcessTemplateSchema.set('toObject', {
	virtuals: true,
	transform: function (_doc, ret) {
		delete ret._id;
		delete ret.__v;
	},
});

export default mongoose.model(
	'qa.control_of_electroplating_and_chemical_process_templates',
	ControlOfElectroplatingAndChemicalProcessTemplateSchema
);
