import mongoose from 'mongoose';

const { Schema } = mongoose;
const StatisticSchema = new Schema(
	{
		laboratoryTestReportCounterQa3100Sc: { type: Number, default: 0 },
		laboratoryTestReportCounterQa3100Pc: { type: Number, default: 0 },
		laboratoryTestReportCounterQa3100Kim: { type: Number, default: 0 },
		laboratoryTestReportCounterQa3200Bc: {
			type: Number,
			default: 0,
		},
		laboratoryTestReportCounterQa3200Mt: { type: Number, default: 0 },
		laboratoryTestReportCounterQa3100ScYear: { type: Number, default: 0 },
		laboratoryTestReportCounterQa3100PcYear: { type: Number, default: 0 },
		laboratoryTestReportCounterQa3100KimYear: { type: Number, default: 0 },
		laboratoryTestReportCounterQa3200BcYear: {
			type: Number,
			default: 0,
		},
		laboratoryTestReportCounterQa3200MtYear: { type: Number, default: 0 },
	},
	{ timestamps: true }
);

StatisticSchema.virtual('id').get(function () {
	return this._id.toHexString();
});

StatisticSchema.set('toJSON', {
	virtuals: true,
	transform: function (_doc, ret) {
		delete ret._id;
		delete ret.__v;
	},
});

StatisticSchema.set('toObject', {
	virtuals: true,
	transform: function (_doc, ret) {
		delete ret._id;
		delete ret.__v;
	},
});

export default mongoose.model('statistics', StatisticSchema);
