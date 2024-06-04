import mongoose from 'mongoose';

const { Schema } = mongoose;
const UserAuthorizationSchema = new Schema(
	{
		superAdmin: { type: Boolean, default: undefined },
		laboratoryTestAdmin: { type: Boolean, default: undefined },
		laboratoryTestView: { type: Boolean, default: undefined },
		laboratoryTestObserve: { type: Boolean, default: undefined },
		laboratoryTestRequest: { type: Boolean, default: undefined },
		laboratoryTestApproveRequest: { type: Boolean, default: undefined },
		laboratoryTestReceiveRequest: { type: Boolean, default: undefined },
		laboratoryTestReport: { type: Boolean, default: undefined },
		laboratoryTestApproveReport: { type: Boolean, default: undefined },
		chemicalSolutionControlAdmin: { type: Boolean, default: undefined },
		chemicalSolutionControlView: { type: Boolean, default: undefined },
		chemicalSolutionControlCreateWorksheet: {
			type: Boolean,
			default: undefined,
		},
		chemicalSolutionControlCreateRecord: { type: Boolean, default: undefined },
		chemicalSolutionControlVerifyRecord: { type: Boolean, default: undefined },
		electroplatingChemicalProcessControlAdmin: {
			type: Boolean,
			default: undefined,
		},
		electroplatingChemicalProcessControlView: {
			type: Boolean,
			default: undefined,
		},
		electroplatingChemicalProcessControlCreateTemplate: {
			type: Boolean,
			default: undefined,
		},
		electroplatingChemicalProcessControlOperator: {
			type: Boolean,
			default: undefined,
		},
		electroplatingChemicalProcessControlInspector: {
			type: Boolean,
			default: undefined,
		},
		electroplatingChemicalProcessControlLabPersonnel: {
			type: Boolean,
			default: undefined,
		},
		electroplatingChemicalProcessControlVerifier: {
			type: Boolean,
			default: undefined,
		},
	},
	{ timestamps: true }
);

UserAuthorizationSchema.virtual('id').get(function () {
	return this._id.toHexString();
});

UserAuthorizationSchema.set('toJSON', {
	virtuals: true,
	transform: function (_doc, ret) {
		delete ret._id;
		delete ret.__v;
	},
});

UserAuthorizationSchema.set('toObject', {
	virtuals: true,
	transform: function (_doc, ret) {
		delete ret._id;
		delete ret.__v;
	},
});

export default mongoose.model('users.authorizations', UserAuthorizationSchema);
