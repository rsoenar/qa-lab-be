import { Router } from 'express';

import ChemicalSolutionControlWorksheet from '../../../models/qa/ChemicalSolutionControlWorksheet';
import { chemicalSolutionControlUpload } from '../../../utils/io';
import { formatDateDmmyyyy } from '../../../utils/date';
import { log } from '../../../utils/log';

const router = Router();

export default (io) => {
	router.route('/worksheet/all').get((_req, res) => {
		let qaChemicalSolutionControlWorksheets = [];

		ChemicalSolutionControlWorksheet.find()
			.populate('revisedWorksheet')
			.populate('creator')
			.populate('records.creator')
			.populate('records.verifier')
			.lean()
			.then((results) => {
				qaChemicalSolutionControlWorksheets = results
					.map((worksheet) => {
						const {
							_id,
							__v,
							revised,
							creator,
							solutionTargetLimits,
							solutionSpecificationReferences,
							analysisSolutions,
							records,
							...mappedWorksheet
						} = worksheet;

						mappedWorksheet.id = String(_id);
						mappedWorksheet.creationDateFormated = formatDateDmmyyyy(
							mappedWorksheet?.creationDate
						);
						mappedWorksheet.revised = revised ? 'Revised' : 'Active';
						mappedWorksheet.creatorName = creator?.name;

						for (let i = 0; i < analysisSolutions.length; i++) {
							const e = analysisSolutions[i];

							delete e._id;
						}

						mappedWorksheet.analysisSolutions = analysisSolutions;

						for (let i = 0; i < solutionSpecificationReferences.length; i++) {
							const e = solutionSpecificationReferences[i];

							delete e._id;
						}

						mappedWorksheet.solutionSpecificationReferences =
							solutionSpecificationReferences;

						for (let i = 0; i < solutionTargetLimits.length; i++) {
							const e = solutionTargetLimits[i];

							delete e._id;
						}

						mappedWorksheet.solutionTargetLimits = solutionTargetLimits;

						mappedWorksheet.records = [];

						for (let i = 0; i < records.length; i++) {
							let { _id, __v, creator, verifier, ...e } = records[i];

							e.id = _id;
							e.creatorName = creator?.name;
							e.verifierName = verifier?.name;
							e.sampleTakenDateFormated = formatDateDmmyyyy(e?.sampleTakenDate);
							e.sampleAnalysisDateFormated = formatDateDmmyyyy(
								e?.sampleAnalysisDate
							);
							e.chemicalChargingRecordReceivedDateFormated = formatDateDmmyyyy(
								e?.chemicalChargingRecordReceivedDate
							);

							mappedWorksheet.records.push(e);
						}

						mappedWorksheet.records.sort(
							(a, b) => b?.sampleTakenDate - a?.sampleTakenDate
						);

						return mappedWorksheet;
					})
					.sort((a, b) => a.solutionProcess.localeCompare(b.solutionProcess));

				return res.status(200).json({
					success: true,
					message: null,
					data: { qaChemicalSolutionControlWorksheets },
				});
			})
			.catch((err) => {
				log(err);
				res.status(500).json(err);
			});
	});

	router.route('/worksheet/all/:status').get((req, res) => {
		const { status } = req?.params;
		let qaChemicalSolutionControlWorksheets = [];

		ChemicalSolutionControlWorksheet.find()
			.populate('revisedWorksheet')
			.populate('creator')
			.populate('records.creator')
			.populate('records.verifier')
			.lean()
			.then((results) => {
				if (results?.length > 0 && status === 'active') {
					return results.filter((item) => {
						return item?.revised === false;
					});
				}

				if (results?.length > 0 && status === 'revised') {
					return results.filter((item) => {
						return item?.revised === true;
					});
				}

				return [];
			})
			.then((results) => {
				qaChemicalSolutionControlWorksheets = results
					.map((worksheet) => {
						const {
							_id,
							__v,
							revised,
							creator,
							solutionTargetLimits,
							solutionSpecificationReferences,
							analysisSolutions,
							records,
							...mappedWorksheet
						} = worksheet;

						mappedWorksheet.id = String(_id);
						mappedWorksheet.creationDateFormated = formatDateDmmyyyy(
							mappedWorksheet?.creationDate
						);
						mappedWorksheet.revised = revised ? 'Revised' : 'Active';
						mappedWorksheet.creatorName = creator?.name;

						for (let i = 0; i < analysisSolutions.length; i++) {
							const e = analysisSolutions[i];

							delete e._id;
						}

						mappedWorksheet.analysisSolutions = analysisSolutions;

						for (let i = 0; i < solutionSpecificationReferences.length; i++) {
							const e = solutionSpecificationReferences[i];

							delete e._id;
						}

						mappedWorksheet.solutionSpecificationReferences =
							solutionSpecificationReferences;

						for (let i = 0; i < solutionTargetLimits.length; i++) {
							const e = solutionTargetLimits[i];

							delete e._id;
						}

						mappedWorksheet.solutionTargetLimits = solutionTargetLimits;

						mappedWorksheet.records = [];

						for (let i = 0; i < records.length; i++) {
							let { _id, __v, creator, verifier, ...e } = records[i];

							e.id = _id;
							e.creatorName = creator?.name;
							e.verifierName = verifier?.name;
							e.sampleTakenDateFormated = formatDateDmmyyyy(e?.sampleTakenDate);
							e.sampleAnalysisDateFormated = formatDateDmmyyyy(
								e?.sampleAnalysisDate
							);
							e.chemicalChargingRecordReceivedDateFormated = formatDateDmmyyyy(
								e?.chemicalChargingRecordReceivedDate
							);

							mappedWorksheet.records.push(e);
						}

						mappedWorksheet.records.sort(
							(a, b) => b?.sampleTakenDate - a?.sampleTakenDate
						);

						return mappedWorksheet;
					})
					.sort((a, b) => a.solutionProcess.localeCompare(b.solutionProcess));

				return res.status(200).json({
					success: true,
					message: null,
					data: { qaChemicalSolutionControlWorksheets },
				});
			})
			.catch((err) => {
				log(err);
				res.status(500).json(err);
			});
	});

	router
		.route('/worksheet/create')
		.post(chemicalSolutionControlUpload.single('file'), (req, res) => {
			new ChemicalSolutionControlWorksheet(req?.body)
				.save()
				.then((result) => {
					io.sockets.emit('chemical_solution_data_updated');

					return res.status(201).json({
						success: !!result,
						message: null,
						data: null,
					});
				})
				.catch((err) => {
					log(err);
					res.status(500).json(err);
				});
		});

	router
		.route('/worksheet/edit/:ChemicalSolutionControlWorksheetId')
		.post(chemicalSolutionControlUpload.single('file'), (req, res) => {
			const { params, body } = req;
			const { ChemicalSolutionControlWorksheetId } = params ?? {};

			ChemicalSolutionControlWorksheet.findOne({
				_id: ChemicalSolutionControlWorksheetId,
			})
				.then((result) => {
					if (result?.records?.length > 0) {
						body.creationDate = result?.creationDate;
						body.records = result?.records;

						return ChemicalSolutionControlWorksheet.updateOne(
							{ _id: ChemicalSolutionControlWorksheetId },
							body
						);
					} else {
						body.creationDate = Date.now();

						return ChemicalSolutionControlWorksheet.updateOne(
							{ _id: ChemicalSolutionControlWorksheetId },
							body
						);
					}
				})
				.then((result) => {
					io.sockets.emit('chemical_solution_control_data_updated');

					return res.status(200).json({
						success: result.nModified === 1,
						message: null,
						data: null,
					});
				})
				.catch((err) => {
					log(err);
					res.status(500).json(err);
				});
		});

	router
		.route('/worksheet/delete/:ChemicalSolutionControlWorksheetId')
		.post(chemicalSolutionControlUpload.single('file'), (req, res) => {
			const { params, body } = req;

			ChemicalSolutionControlWorksheet.findOne({
				_id: body?.revisedWorksheet,
			})
				.then((result) => {
					if (result) {
						return ChemicalSolutionControlWorksheet.updateOne(
							{ _id: result._id },
							{ revised: false }
						);
					}

					return result;
				})
				.then(() => {
					return ChemicalSolutionControlWorksheet.deleteOne({
						_id: params?.ChemicalSolutionControlWorksheetId,
					});
				})
				.then((result) => {
					io.sockets.emit('chemical_solution_control_data_updated');

					return res.status(200).json({
						success: result.deletedCount === 1,
						message: null,
						data: null,
					});
				})
				.catch((err) => {
					log(err);
					res.status(500).json(err);
				});
		});

	router
		.route('/worksheet/revise/:ChemicalSolutionControlWorksheetId')
		.post(chemicalSolutionControlUpload.single('file'), (req, res) => {
			const { params, body } = req;

			body.creationDate = Date.now();

			ChemicalSolutionControlWorksheet.updateOne(
				{ _id: params?.ChemicalSolutionControlWorksheetId },
				{ revised: true }
			)
				.then((result) => {
					if (!result.nModified === 1) {
						return res.status(200).json({
							success: false,
							message: 'Revise chemical solution control worksheet error.',
							data: null,
						});
					}

					return new ChemicalSolutionControlWorksheet(body).save();
				})
				.then((result) => {
					io.sockets.emit('chemical_solution_control_data_updated');

					return res.status(201).json({
						success: !!result,
						message: null,
						data: null,
					});
				})
				.catch((err) => {
					log(err);
					res.status(500).json(err);
				});
		});

	router
		.route('/record/create/:ChemicalSolutionControlWorksheetId')
		.post(chemicalSolutionControlUpload.single('file'), (req, res) => {
			const { params, body } = req;

			ChemicalSolutionControlWorksheet.updateOne(
				{ _id: params?.ChemicalSolutionControlWorksheetId },
				{ $push: { records: body } }
			)
				.then((result) => {
					io.sockets.emit('chemical_solution_data_updated');

					return res.status(201).json({
						success: result.nModified === 1,
						message: null,
						data: null,
					});
				})
				.catch((err) => {
					log(err);
					res.status(500).json(err);
				});
		});

	router
		.route('/record/edit/:ChemicalSolutionControlWorksheetId/:recordId')
		.post(chemicalSolutionControlUpload.single('file'), (req, res) => {
			const { params, body } = req;

			ChemicalSolutionControlWorksheet.updateOne(
				{
					_id: params?.ChemicalSolutionControlWorksheetId,
					'records._id': `${params?.recordId}`,
				},
				{
					$set: {
						'records.$': body,
					},
				}
			)
				.then((result) => {
					io.sockets.emit('chemical_solution_data_updated');

					return res.status(200).json({
						success: result.nModified === 1,
						message: null,
						data: null,
					});
				})
				.catch((err) => {
					log(err);
					res.status(500).json(err);
				});
		});

	router
		.route('/record/delete/:ChemicalSolutionControlWorksheetId/:recordId')
		.post(chemicalSolutionControlUpload.single('file'), (req, res) => {
			const { params } = req;

			ChemicalSolutionControlWorksheet.updateOne(
				{
					_id: params?.ChemicalSolutionControlWorksheetId,
				},
				{
					$pull: { records: { _id: `${params?.recordId}` } },
				}
			)
				.then((result) => {
					io.sockets.emit('chemical_solution_control_data_updated');

					return res.status(200).json({
						success: result?.nModified === 1,
						message: null,
						data: null,
					});
				})
				.catch((err) => {
					log(err);
					res.status(500).json(err);
				});
		});

	router
		.route('/record/verify/:ChemicalSolutionControlWorksheetId/:recordId')
		.post(chemicalSolutionControlUpload.single('file'), (req, res) => {
			const { params, body } = req;

			ChemicalSolutionControlWorksheet.updateOne(
				{
					_id: params?.ChemicalSolutionControlWorksheetId,
					'records._id': `${params?.recordId}`,
				},
				{
					$set: {
						'records.$.verifier': body?.verifier,
						'records.$.verificationDate': Date.now(),
						'records.$.result': body?.result,
					},
				}
			)
				.then((result) => {
					io.sockets.emit('chemical_solution_data_updated');

					return res.status(200).json({
						success: result.nModified === 1,
						message: null,
						data: null,
					});
				})
				.catch((err) => {
					log(err);
					res.status(500).json(err);
				});
		});

	router
		.route('/record/ccr/:ChemicalSolutionControlWorksheetId/:recordId')
		.post(chemicalSolutionControlUpload.single('file'), (req, res) => {
			const { params, body } = req;

			ChemicalSolutionControlWorksheet.updateOne(
				{
					_id: params?.ChemicalSolutionControlWorksheetId,
					'records._id': `${params?.recordId}`,
				},
				{
					$set: {
						'records.$.chemicalChargingRecordNumber':
							body?.chemicalChargingRecordNumber,
						'records.$.chemicalChargingRecordReceivedDate':
							body?.chemicalChargingRecordReceivedDate,
					},
				}
			)
				.then((result) => {
					io.sockets.emit('chemical_solution_data_updated');

					return res.status(200).json({
						success: result.nModified === 1,
						message: null,
						data: null,
					});
				})
				.catch((err) => {
					log(err);
					res.status(500).json(err);
				});
		});

	return router;
};
