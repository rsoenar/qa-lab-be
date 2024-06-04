import { Router } from 'express';

import Sheet from '../../../models/qa/ControlOfElectroplatingAndChemicalProcessSheet';
import Template from '../../../models/qa/ControlOfElectroplatingAndChemicalProcessTemplate';
import { NotFoundError } from '../../../utils/errors/errorManager';
import { electroplatingChemicalProcessControlUpload as upload } from '../../../utils/io';
import { today } from '../../../utils/date';

const router = Router();

export default (io) => {
	const setSignedDate = (doc) => {
		const {
			operator,
			inspector,
			laboratoriumPersonnel,
			beforeSaltSprayTestingLaboratoriumPersonnel,
			afterSaltSprayTestingLaboratoriumPersonnel,
			verificator,
		} = doc;

		doc.operatorSignedDate = operator ? today : undefined;
		doc.inspectorSignedDate = inspector ? today : undefined;
		doc.laboratoriumPersonnelSignedDate = laboratoriumPersonnel
			? today
			: undefined;
		doc.beforeSaltSprayTestingLaboratoriumPersonnelSignedDate =
			beforeSaltSprayTestingLaboratoriumPersonnel ? today : undefined;
		doc.afterSaltSprayTestingLaboratoriumPersonnelSignedDate =
			afterSaltSprayTestingLaboratoriumPersonnel ? today : undefined;
		doc.verificatorSignedDate = verificator ? today : undefined;

		return doc;
	};

	// Template
	router.route('/templates').post(upload.single('file'), (req, res, next) => {
		const doc = setSignedDate(req?.body);

		new Template(doc)
			.save()
			.then((created) => {
				io.sockets.emit(
					'control_of_electroplating_and_chemical_process_templates_updated'
				);

				return res.status(201).json({
					status: created ? 'success' : 'fail',
					data: { created },
				});
			})
			.catch((err) => next(err));
	});

	router.route('/templates').get((_req, res, next) => {
		Template.find()
			.populate('operator')
			.populate('inspector')
			.populate('laboratoriumPersonnel')
			.populate('beforeSaltSprayTestingLaboratoriumPersonnel')
			.populate('afterSaltSprayTestingLaboratoriumPersonnel')
			.populate('verificator')
			.then((templates) => {
				io.sockets.emit(
					'control_of_electroplating_and_chemical_process_templates_updated'
				);

				return res.status(200).json({
					status: templates ? 'success' : 'fail',
					data: { templates },
				});
			})
			.catch((err) => next(err));
	});

	router
		.route('/templates/:templateId')
		.put(upload.single('file'), (req, res, next) => {
			const { params, body } = req;
			const replacement = setSignedDate(body);

			Template.findOneAndReplace({ _id: params?.templateId }, replacement)
				.then((replaced) => {
					if (replaced == null) {
						throw new NotFoundError('Template ID was not found');
					}
					io.sockets.emit(
						'control_of_electroplating_and_chemical_process_templates_updated'
					);

					return res.status(200).json({
						status: replaced ? 'success' : 'fail',
						data: { replaced },
					});
				})
				.catch((err) => next(err));
		});

	router
		.route('/templates/:templateId')
		.patch(upload.single('file'), (req, res, next) => {
			const { params, body } = req;
			const update = setSignedDate(body);

			Template.findOneAndUpdate({ _id: params?.templateId }, update)
				.then((updated) => {
					if (updated == null) {
						throw new NotFoundError('Template ID was not found');
					}
					io.sockets.emit(
						'control_of_electroplating_and_chemical_process_templates_updated'
					);

					return res.status(200).json({
						status: updated ? 'success' : 'fail',
						data: { updated },
					});
				})
				.catch((err) => next(err));
		});

	router
		.route('/templates/:templateId')
		.delete(upload.single('file'), (req, res, next) => {
			Template.findOneAndDelete({ _id: req?.params?.templateId })
				.then((deleted) => {
					if (deleted == null) {
						throw new NotFoundError('Template ID was not found');
					}
					io.sockets.emit(
						'control_of_electroplating_and_chemical_process_templates_updated'
					);

					return res.status(200).json({
						status: 'success',
						data: { deleted },
					});
				})
				.catch((err) => next(err));
		});

	// Sheets
	router.route('/sheets').post(upload.single('file'), (req, res, next) => {
		const doc = setSignedDate(req?.body);

		new Sheet(doc)
			.save()
			.then((created) => {
				io.sockets.emit(
					'control_of_electroplating_and_chemical_process_sheets_updated'
				);

				return res.status(201).json({
					status: created ? 'success' : 'fail',
					data: { created },
				});
			})
			.catch((err) => next(err));
	});

	router.route('/sheets').get((_req, res, next) => {
		Sheet.find()
			.populate('operator')
			.populate('inspector')
			.populate('laboratoriumPersonnel')
			.populate('beforeSaltSprayTestingLaboratoriumPersonnel')
			.populate('afterSaltSprayTestingLaboratoriumPersonnel')
			.populate('verificator')
			.then((sheets) => {
				io.sockets.emit(
					'control_of_electroplating_and_chemical_process_sheets_updated'
				);

				return res.status(200).json({
					status: sheets ? 'success' : 'fail',
					data: { sheets },
				});
			})
			.catch((err) => next(err));
	});

	router
		.route('/sheets/:sheetId')
		.put(upload.single('file'), (req, res, next) => {
			const { params, body } = req;
			const replacement = setSignedDate(body);

			Sheet.findOneAndReplace({ _id: params?.sheetId }, replacement)
				.then((replaced) => {
					if (replaced == null) {
						throw new NotFoundError('Sheet ID was not found');
					}
					io.sockets.emit(
						'control_of_electroplating_and_chemical_process_sheets_updated'
					);

					return res.status(200).json({
						status: replaced ? 'success' : 'fail',
						data: { replaced },
					});
				})
				.catch((err) => next(err));
		});

	router
		.route('/sheets/:sheetId')
		.patch(upload.single('file'), (req, res, next) => {
			const { params, body } = req;
			const update = setSignedDate(body);

			Sheet.findOneAndUpdate({ _id: params?.sheetId }, update)
				.then((updated) => {
					if (updated == null) {
						throw new NotFoundError('Sheet ID was not found');
					}
					io.sockets.emit(
						'control_of_electroplating_and_chemical_process_sheets_updated'
					);

					return res.status(200).json({
						status: updated ? 'success' : 'fail',
						data: { updated },
					});
				})
				.catch((err) => next(err));
		});

	router
		.route('/sheets/:sheetId')
		.delete(upload.single('file'), (req, res, next) => {
			Sheet.findOneAndDelete({ _id: req?.params?.sheetId })
				.then((deleted) => {
					if (deleted == null) {
						throw new NotFoundError('Sheet ID was not found');
					}
					io.sockets.emit(
						'control_of_electroplating_and_chemical_process_sheets_updated'
					);

					return res.status(200).json({
						status: 'success',
						data: { deleted },
					});
				})
				.catch((err) => next(err));
		});

	return router;
};
