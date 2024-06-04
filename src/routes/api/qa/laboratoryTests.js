import PDFDocument from 'pdfkit';
import fs from 'fs';
import moment from 'moment';
import nodeHtmlToImage from 'node-html-to-image';
import path from 'path';
import { Router } from 'express';

import LaboratoryTest from '../../../models/qa/LaboratoryTest';
import LaboratoryTestReport from '../../../models/qa/LaboratoryTestReport';
import LaboratoryTestRequest from '../../../models/qa/LaboratoryTestRequest';
import Statistic from '../../../models/common/Statistic';
import { formatDateDmmyyyy } from '../../../utils/date';
import { laboratoryTestUpload } from '../../../utils/io';
import { log } from '../../../utils/log';
import { autoWidth } from '../../../utils/excel';
import { pdfUrl, uploadUrl } from '../../../constants/url';

// polyfills required by exceljs
require('core-js/modules/es.promise');
require('core-js/modules/es.string.includes');
require('core-js/modules/es.object.assign');
require('core-js/modules/es.object.keys');
require('core-js/modules/es.symbol');
require('core-js/modules/es.symbol.async-iterator');
require('regenerator-runtime/runtime');

const ExcelJS = require('exceljs/dist/es5');

const router = Router();

export default (io) => {
	const logoImage = path.join(
		__dirname,
		'../../../../public/assets/img',
		'iae-logo.png'
	);

	const generateQaLaboratoryTestRequestPdf = function (id) {
		return new Promise((resolve) => {
			LaboratoryTestRequest.findById(id)
				.populate('requester')
				.populate('requestApprover')
				.then((qaLaboratoryTestRequest) => {
					if (qaLaboratoryTestRequest) {
						const {
							_id,
							requestDate,
							requester,
							requestNumber,
							laboratory,
							material,
							type,
							specification,
							program,
							budgetNumber,
							reasonOfTest,
							manufacturer,
							manufacturingDate,
							expiryDate,
							batchNumber,
							sample,
							condition,
							unit,
							quantity,
							typeOfTest,
							testAccordingToSpecification,
							requestApprover,
						} = qaLaboratoryTestRequest;
						const typeOfTests = typeOfTest?.split(', ');
						const writeStream = fs.createWriteStream(
							`./public/temp/QA Laboratory Test Request ${_id}.pdf`
						);
						const doc = new PDFDocument({
							size: 'FOLIO',
							margins: {
								top: 30,
								left: 40,
								right: 30,
							},
						});

						doc
							.image(logoImage, 60, 35, { width: 65 })
							.fillColor('#E0E0E0')
							.lineWidth(1)
							.moveTo(40, 30)
							.lineTo(40, 896)
							.lineTo(582, 896)
							.lineTo(582, 30)
							.lineTo(40, 30)
							.moveTo(40, 100)
							.lineTo(582, 100)
							.moveTo(140, 30)
							.lineTo(140, 100)
							.moveTo(482, 30)
							.lineTo(482, 100)
							.stroke()
							.fillColor('#E0E0E0')
							.lineWidth(0.5)
							.moveTo(205, 130)
							.lineTo(562, 130)
							.moveTo(205, 150)
							.lineTo(562, 150)
							.moveTo(205, 190)
							.lineTo(562, 190)
							.moveTo(205, 210)
							.lineTo(562, 210)
							.moveTo(205, 230)
							.lineTo(562, 230)
							.moveTo(205, 250)
							.lineTo(562, 250)
							.moveTo(205, 270)
							.lineTo(562, 270)
							.moveTo(205, 290)
							.lineTo(562, 290)
							.moveTo(205, 310)
							.lineTo(562, 310)
							.moveTo(205, 330)
							.lineTo(562, 330)
							.moveTo(205, 350)
							.lineTo(562, 350)
							.moveTo(205, 370)
							.lineTo(562, 370)
							.moveTo(205, 390)
							.lineTo(562, 390)
							.moveTo(205, 410)
							.lineTo(562, 410)
							.moveTo(205, 430)
							.lineTo(562, 430)
							.moveTo(205, 450)
							.lineTo(562, 450)
							.moveTo(205, 470)
							.lineTo(562, 470)
							.moveTo(205, 490)
							.lineTo(562, 490)
							.stroke()
							.fillColor('#E0E0E0')
							.lineWidth(1)
							.moveTo(60, 165)
							.lineTo(562, 165)
							.moveTo(60, 505)
							.lineTo(562, 505)
							.moveTo(60, 805)
							.lineTo(562, 805)
							.stroke()
							.moveDown(1.6)
							.fillColor('#424242')
							.font('Helvetica-Bold')
							.fontSize(16)
							.text('REQUEST FOR LABORATORY TEST', {
								align: 'center',
							})
							.fontSize(12)
							.text('QUALITY ASSURANCE LABORATORY', {
								align: 'center',
							})
							.text('NUMBER', 500, 55, { characterSpacing: 2 })
							.font('Helvetica')
							.fontSize(10)
							.text('Request for Laboratory', 60, 120)
							.text('Date of Request', 60, 140)
							.text('Material', 60, 180)
							.text('Type / Model / Code', 60, 200)
							.text('Material Specification', 60, 260)
							.text('Manufactured by', 60, 280)
							.text('Batch / Roll Number', 60, 300)
							.text('Manufacturing Date', 60, 320)
							.text('Expired Date', 60, 340)
							.text('Program', 60, 360)
							.text('Budget / RV / JID No.', 60, 380)
							.text('Condition', 60, 400)
							.text('Unit', 60, 420)
							.text('Quantity of Sample', 60, 440)
							.text('Quantity of Material', 60, 460)
							.text('Reason of Test', 60, 480)
							.text('Type of Test :', 60, 520, {
								underline: true,
							})
							.text('Test According to Specification :', 60, 760, {
								underline: true,
							})
							.fontSize(7)
							.text('F-DP 704.04.01', 60, 900)
							.text(
								'This document is generated by the system, retention record valid in system, no re-validation is required. Uncontrollable document after printing.',
								125,
								900
							)
							.fillColor('#424242')
							.font('Helvetica-Bold')
							.fontSize(10)
							.text('Requested By', 60, 820, {
								align: 'center',
								width: 231,
								underline: true,
							})
							.text('Checked & Approved By', 291, 820, {
								align: 'center',
								width: 231,
								underline: true,
							})
							.font('Helvetica')
							.fontSize(8)
							.text(`${requestNumber ?? ''}`, 481, 70, {
								align: 'center',
								underline: true,
								width: 100,
							})
							.font('Helvetica')
							.fontSize(10)
							.text(`: ${laboratory ?? ''}`, 200, 120)
							.text(
								`: ${
									requestDate
										? moment.utc(requestDate).local().format('ddd, D MMMM YYYY')
										: ''
								}`,
								200,
								140
							)
							.text(`:`, 200, 180)
							.text(`${material ?? ''}`, 205, 180)
							.text(`:`, 200, 200)
							.text(`${type.replace(/ {2,}/g, ' ')}`, 205, 200, {
								lineGap: 8,
								width: 365,
							})
							.text(`:`, 200, 260)
							.text(`${specification ?? ''}`, 205, 260)
							.text(`:`, 200, 280)
							.text(`${manufacturer ?? ''}`, 205, 280)
							.text(`:`, 200, 300)
							.text(`${batchNumber ?? ''}`, 205, 300)
							.text(`:`, 200, 320)
							.text(`${manufacturingDate ?? ''}`, 205, 320)
							.text(`:`, 200, 340)
							.text(`${expiryDate ?? ''}`, 205, 340)
							.text(`:`, 200, 360)
							.text(`${program ?? ''}`, 205, 360)
							.text(`:`, 200, 380)
							.text(`${budgetNumber ?? ''}`, 205, 380)
							.text(`:`, 200, 400)
							.text(`${condition ?? ''}`, 205, 400)
							.text(`:`, 200, 420)
							.text(`${unit ?? ''}`, 205, 420)
							.text(`:`, 200, 440)
							.text(`${sample ?? ''}`, 205, 440)
							.text(`:`, 200, 460)
							.text(`${quantity ?? ''}`, 205, 460)
							.text(`:`, 200, 480)
							.text(`${reasonOfTest ?? ''}`, 205, 480)
							.text(`${testAccordingToSpecification ?? ''}`, 80, 780)
							.text(`${requester?.name ?? ''}`, 60, 866, {
								align: 'center',
								width: 231,
								underline: true,
							})
							.text(`${requester?.nik ?? ''}`, 60, 876, {
								align: 'center',
								width: 231,
							})
							.text(`${requestApprover?.name ?? ''}`, 291, 866, {
								align: 'center',
								width: 231,
								underline: true,
							})
							.text(`${requestApprover?.nik ?? ''}`, 291, 876, {
								align: 'center',
								width: 231,
							});

						if (typeOfTests?.length > 10) {
							const typeOfTests1 = typeOfTests?.slice(0, 10);

							doc.list(
								typeOfTests1?.map((i) => i?.trim()),
								80,
								540,
								{
									lineGap: 10,
									height: 300,
								}
							);

							const typeOfTests2 = typeOfTests?.slice(10);

							doc.list(
								typeOfTests2?.map((i) => i?.trim()),
								331,
								540,
								{
									lineGap: 10,
									height: 300,
								}
							);
						} else if (typeOfTests?.length <= 10) {
							doc.list(
								typeOfTests?.map((i) => i?.trim()),
								80,
								540,
								{
									lineGap: 10,
									height: 300,
								}
							);
						}

						doc.end();
						doc.pipe(writeStream);
						writeStream.on('finish', () => resolve());
					}
				});
		});
	};

	const generateQaLaboratoryTestReportPdf = function (qaLaboratoryTestId, id) {
		return new Promise((resolve) => {
			LaboratoryTest.findById(qaLaboratoryTestId).then((qaLaboratoryTest) => {
				LaboratoryTestRequest.findById(
					qaLaboratoryTest?.qaLaboratoryTestRequests[
						qaLaboratoryTest?.qaLaboratoryTestRequests?.length - 1
					]
				)
					.populate('requester')
					.populate('requestApprover')
					.then((qaLaboratoryTestRequest) => {
						LaboratoryTestReport.findById(
							id ??
								qaLaboratoryTest?.qaLaboratoryTestReports[
									qaLaboratoryTest?.qaLaboratoryTestReports?.length - 1
								]
						)
							.populate('reporter')
							.populate('reportApprover')
							.then((qaLaboratoryTestReport) => {
								const reporterSignature = path.join(
									__dirname,
									'../../../../public/assets/img/user/signature',
									`${qaLaboratoryTestReport?.reporter?.nik}.jpg`
								);
								const reportApproverSignature = path.join(
									__dirname,
									'../../../../public/assets/img/user/signature',
									`${qaLaboratoryTestReport?.reportApprover?.nik}.jpg`
								);

								if (qaLaboratoryTestRequest && qaLaboratoryTestReport) {
									const {
										requestDate,
										requestNumber,
										material,
										type,
										specification,
										program,
										budgetNumber,
										manufacturer,
										manufacturingDate,
										expiryDate,
										batchNumber,
										typeOfTest,
									} = qaLaboratoryTestRequest;
									const {
										_id,
										reportDate,
										reportNumber,
										testResultHtml,
										reporter,
										reportApprover,
									} = qaLaboratoryTestReport;
									const writeStream = fs.createWriteStream(
										`./public/temp/QA Laboratory Test Report ${_id}.pdf`
									);
									const doc = new PDFDocument({
										size: 'FOLIO',
										margins: {
											top: 30,
											left: 40,
											right: 30,
										},
									});

									nodeHtmlToImage({
										output: `./public/temp/QA Laboratory Test Result ${_id}.png`,
										quality: 100,
										html: `<html>
                    <head>
                      <style>
                      body {
                        font-family: 'Helvetica', 'Arial', sans-serif;
                        width: 920px;
                      }
                      </style>
                    </head>
                    <body>${testResultHtml}</body>
                    </html>
                    `,
									})
										.then(() => {
											const testResultImage = path.join(
												__dirname,
												'../../../../public/temp',
												`QA Laboratory Test Result ${_id}.png`
											);
											return testResultImage;
										})
										.then((testResultImage) => {
											doc
												.image(logoImage, 60, 35, { width: 65 })
												.fillColor('#E0E0E0')
												.lineWidth(1)
												.moveTo(40, 30)
												.lineTo(40, 896)
												.lineTo(582, 896)
												.lineTo(582, 30)
												.lineTo(40, 30)
												.moveTo(40, 100)
												.lineTo(582, 100)
												.moveTo(140, 30)
												.lineTo(140, 100)
												.moveTo(482, 30)
												.lineTo(482, 100)
												.stroke()
												.fillColor('#E0E0E0')
												.lineWidth(0.5)
												.moveTo(205, 130)
												.lineTo(562, 130)
												.moveTo(205, 150)
												.lineTo(321, 150)
												.moveTo(446, 150)
												.lineTo(562, 150)
												.moveTo(205, 190)
												.lineTo(562, 190)
												.moveTo(205, 210)
												.lineTo(562, 210)
												.moveTo(205, 230)
												.lineTo(562, 230)
												.moveTo(205, 250)
												.lineTo(562, 250)
												.moveTo(205, 270)
												.lineTo(562, 270)
												.moveTo(205, 290)
												.lineTo(562, 290)
												.moveTo(205, 310)
												.lineTo(562, 310)
												.moveTo(205, 330)
												.lineTo(562, 330)
												.moveTo(205, 350)
												.lineTo(562, 350)
												.moveTo(205, 370)
												.lineTo(562, 370)
												.moveTo(205, 390)
												.lineTo(562, 390)
												.moveTo(205, 410)
												.lineTo(562, 410)
												.moveTo(205, 430)
												.lineTo(562, 430)
												.moveTo(205, 450)
												.lineTo(562, 450)
												.stroke()
												.fillColor('#E0E0E0')
												.lineWidth(1)
												.moveTo(60, 165)
												.lineTo(562, 165)
												.moveTo(60, 465)
												.lineTo(562, 465)
												.moveTo(60, 805)
												.lineTo(562, 805)
												.stroke()
												.moveDown(1.6)
												.fillColor('#424242')
												.font('Helvetica-Bold')
												.fontSize(16)
												.text('REPORT OF LABORATORY TEST', {
													align: 'center',
												})
												.fontSize(12)
												.text('QUALITY ASSURANCE LABORATORY', {
													align: 'center',
												})
												.text('NUMBER', 500, 55, { characterSpacing: 2 })
												.font('Helvetica')
												.fontSize(10)
												.text('Test According to Request No.', 60, 120)
												.text('Date of Report', 60, 140)
												.text('Date of Request', 331, 140)
												.text('Material', 60, 180)
												.text('Type / Model / Code', 60, 200)
												.text('Material Specification', 60, 260)
												.text('Manufactured by', 60, 280)
												.text('Batch / Roll Number', 60, 300)
												.text('Manufacturing Date', 60, 320)
												.text('Expired Date', 60, 340)
												.text('Program', 60, 360)
												.text('Budget / RV / JID No.', 60, 380)
												.text('Type of Test', 60, 400)
												.text('Description of Test Result :', 60, 480, {
													underline: true,
												})
												.fontSize(7)
												.text('F-DP 704.04.02', 60, 900)
												.text(
													'This document is generated by the system, retention record valid in system, no re-validation is required. Uncontrollable document after printing.',
													125,
													900
												)
												.fillColor('#424242')
												.font('Helvetica-Bold')
												.fontSize(10)
												.text('Reported By', 60, 820, {
													align: 'center',
													width: 231,
													underline: true,
												})
												.text('Checked & Approved by', 291, 820, {
													align: 'center',
													width: 231,
													underline: true,
												})
												.font('Helvetica')
												.fontSize(8)
												.text(`${reportNumber ?? ''}`, 481, 70, {
													align: 'center',
													underline: true,
													width: 100,
												})
												.font('Helvetica')
												.fontSize(10)
												.text(`: ${requestNumber ?? ''}`, 200, 120)
												.text(
													`: ${
														reportDate
															? moment
																	.utc(reportDate)
																	.local()
																	.format('ddd, D MMMM YYYY')
															: ''
													}`,
													200,
													140
												)
												.text(
													`: ${
														requestDate
															? moment
																	.utc(requestDate)
																	.local()
																	.format('ddd, D MMMM YYYY')
															: ''
													}`,
													441,
													140
												)
												.text(`:`, 200, 180)
												.text(`${material ?? ''}`, 205, 180)
												.text(`:`, 200, 200)
												.text(`${type.replace(/ {2,}/g, ' ')}`, 205, 200, {
													lineGap: 8,
													width: 365,
												})
												.text(`:`, 200, 260)
												.text(`${specification ?? ''}`, 205, 260)
												.text(`:`, 200, 280)
												.text(`${manufacturer ?? ''}`, 205, 280)
												.text(`:`, 200, 300)
												.text(`${batchNumber ?? ''}`, 205, 300)
												.text(`:`, 200, 320)
												.text(`${manufacturingDate ?? ''}`, 205, 320)
												.text(`:`, 200, 340)
												.text(`${expiryDate ?? ''}`, 205, 340)
												.text(`:`, 200, 360)
												.text(`${program ?? ''}`, 205, 360)
												.text(`:`, 200, 380)
												.text(`${budgetNumber ?? ''}`, 205, 380)
												.text(':', 200, 400)
												.text(
													`${typeOfTest.replace(/ {2,}/g, ' ')}`,
													205,
													400,
													{
														lineGap: 8,
														width: 365,
													}
												)
												.text(`${reporter?.name ?? ''}`, 60, 866, {
													align: 'center',
													width: 231,
													underline: true,
												})
												.text(`${reporter?.nik ?? ''}`, 60, 876, {
													align: 'center',
													width: 231,
												})
												.text(`${reportApprover?.name ?? ''}`, 291, 866, {
													align: 'center',
													width: 231,
													underline: true,
												})
												.text(`${reportApprover?.nik ?? ''}`, 291, 876, {
													align: 'center',
													width: 231,
												})
												.image(testResultImage, 80, 500, {
													fit: [482, 300],
													align: 'left',
													valign: 'center',
												});

											if (
												qaLaboratoryTestReport?.reporter &&
												fs.existsSync(reporterSignature)
											) {
												doc.image(reporterSignature, 60, 830, {
													fit: [231, 35],
													align: 'center',
													valign: 'center',
												});
											}

											if (
												qaLaboratoryTestReport?.reportApprover &&
												fs.existsSync(reportApproverSignature)
											) {
												doc.image(reportApproverSignature, 291, 830, {
													fit: [231, 35],
													align: 'center',
													valign: 'center',
												});
											}

											doc.end();
											doc.pipe(writeStream);
											writeStream.on('finish', () => resolve());
										});
								}
							});
					});
			});
		});
	};

	router.route('/all').get((_req, res) => {
		let qaLaboratoryTests = [];

		LaboratoryTest.find()
			.populate({
				path: 'qaLaboratoryTestRequests',
				model: 'qa.laboratory_test_requests',
				populate: [
					{
						path: 'requester',
						model: 'users',
					},
					{
						path: 'requestApprover',
						model: 'users',
					},
					{
						path: 'requestReceiver',
						model: 'users',
					},
				],
			})
			.populate({
				path: 'qaLaboratoryTestReports',
				model: 'qa.laboratory_test_reports',
				populate: [
					{
						path: 'reporter',
						model: 'users',
					},
					{
						path: 'reportApprover',
						model: 'users',
					},
				],
			})
			.lean()
			.then((results) => {
				for (let i = 0; i < results.length; i++) {
					const qaLaboratoryTest = results[i];
					const qaLaboratoryTestRequests =
						qaLaboratoryTest?.qaLaboratoryTestRequests;
					const qaLaboratoryTestReports =
						qaLaboratoryTest?.qaLaboratoryTestReports;
					const qaLaboratoryTestRequest =
						qaLaboratoryTestRequests[qaLaboratoryTestRequests?.length - 1];
					const qaLaboratoryTestReport =
						qaLaboratoryTestReports[qaLaboratoryTestReports?.length - 1];
					const {
						requestDate,
						requestNumber,
						laboratory,
						organizationUnit,
						material,
						type,
						specification,
						program,
						budgetNumber,
						reasonOfTest,
						manufacturer,
						manufacturingDate,
						expiryDate,
						batchNumber,
						sample,
						condition,
						unit,
						quantity,
						typeOfTest,
						testAccordingToSpecification,
						requestAttachmentFileName,
						requestAttachmentFileOriginalName,
						requester,
						requestApproveDate,
						requestApprover,
						requestReceiveDate,
						estimationCloseDate,
						requestReceiver,
						tempReportNumber,
					} = qaLaboratoryTestRequest ?? {};
					const {
						reportDate,
						reportNumber,
						testResult,
						reportAttachmentFileName,
						reportAttachmentFileOriginalName,
						reporter,
						reportApproveDate,
						reportApprover,
					} = qaLaboratoryTestReport ?? {};
					const e = {};

					e.id = qaLaboratoryTest?._id;
					e.requestIds = [];

					for (let i = 0; i < qaLaboratoryTestRequests.length; i++) {
						const f = qaLaboratoryTestRequests[i];

						e.requestIds?.push(f?._id);
					}

					e.requestDate = requestDate ?? null;
					e.requestDateFormated = formatDateDmmyyyy(requestDate);
					e.requestNumber = requestNumber ?? null;
					e.laboratory = laboratory ?? null;
					e.organizationUnit = organizationUnit ?? null;
					e.material = material ?? null;
					e.type = type ?? null;
					e.specification = specification ?? null;
					e.program = program ?? null;
					e.budgetNumber = budgetNumber ?? null;
					e.reasonOfTest = reasonOfTest ?? null;
					e.manufacturer = manufacturer ?? null;
					e.manufacturingDate = manufacturingDate ?? null;
					e.expiryDate = expiryDate ?? null;
					e.batchNumber = batchNumber ?? null;
					e.sample = sample ?? null;
					e.condition = condition ?? null;
					e.unit = unit ?? null;
					e.quantity = quantity ?? null;
					e.typeOfTest = typeOfTest ?? null;
					e.organization = requester?.organization?.substring(0, 2) ?? null;
					e.testAccordingToSpecification = testAccordingToSpecification ?? null;
					e.requestAttachmentFileName = requestAttachmentFileName ?? null;
					e.requestAttachmentFileOriginalName =
						requestAttachmentFileOriginalName ?? null;
					e.requesterName = requester?.name ?? null;
					e.requesterNik = requester?.nik ?? null;
					e.requesterOrganization = requester?.organization ?? null;
					e.requestApproveDate = requestApproveDate ?? null;
					e.requestApproveDateFormated = formatDateDmmyyyy(requestApproveDate);
					e.requestApproverName = requestApprover?.name ?? null;
					e.requestApproverNik = requestApprover?.nik ?? null;
					e.requestReceiveDate = requestReceiveDate ?? null;
					e.requestReceiveDateFormated = formatDateDmmyyyy(requestReceiveDate);
					e.estimationCloseDate = estimationCloseDate ?? null;
					e.estimationCloseDateFormated =
						formatDateDmmyyyy(estimationCloseDate);
					e.requestReceiverName = requestReceiver?.name ?? null;
					e.tempReportNumber = tempReportNumber ?? null;
					e.reportIds = [];

					for (let i = 0; i < qaLaboratoryTestReports.length; i++) {
						const f = qaLaboratoryTestReports[i];

						e.reportIds?.push(f?._id);
					}

					e.reportDate = reportDate ?? null;
					e.reportDateFormated = formatDateDmmyyyy(reportDate);
					e.reportNumber = reportNumber ?? tempReportNumber;
					e.testResult = testResult ?? null;
					e.reportAttachmentFileName = reportAttachmentFileName ?? null;
					e.reportAttachmentFileOriginalName =
						reportAttachmentFileOriginalName ?? null;
					e.reporterName = reporter?.name ?? null;
					e.reporterNik = reporter?.nik ?? null;
					e.reportApproveDate = reportApproveDate ?? null;
					e.reportApproveDateFormated = formatDateDmmyyyy(reportApproveDate);
					e.reportApproverName = reportApprover?.name ?? null;
					e.reportApproverNik = reportApprover?.nik ?? null;

					if (reportApprover?.name) {
						e.status = 'Completed';
					} else if (reporter?.name) {
						e.status = 'Report Awaiting Approval';
					} else if (requestReceiver?.name) {
						e.status = 'On Process';
					} else if (requestApprover?.name) {
						e.status = 'Awaiting Sample';
					} else {
						e.status = 'Request Awaiting Approval';
					}

					qaLaboratoryTests.push(e);
				}

				qaLaboratoryTests = qaLaboratoryTests.sort(
					(a, b) => b?.requestDate - a?.requestDate
				);

				return res.status(200).json({
					success: !!results,
					message: null,
					data: { qaLaboratoryTests },
				});
			})
			.catch((err) => {
				log(err);
				res.status(500).json(err);
			});
	});

	router.route('/all/:year').get((req, res) => {
		const { year } = req?.params;
		let qaLaboratoryTests = [];

		LaboratoryTest.find()
			.populate({
				path: 'qaLaboratoryTestRequests',
				model: 'qa.laboratory_test_requests',
				populate: [
					{
						path: 'requester',
						model: 'users',
					},
					{
						path: 'requestApprover',
						model: 'users',
					},
					{
						path: 'requestReceiver',
						model: 'users',
					},
				],
			})
			.populate({
				path: 'qaLaboratoryTestReports',
				model: 'qa.laboratory_test_reports',
				populate: [
					{
						path: 'reporter',
						model: 'users',
					},
					{
						path: 'reportApprover',
						model: 'users',
					},
				],
			})
			.lean()
			.then((results) => {
				for (let i = 0; i < results.length; i++) {
					const qaLaboratoryTest = results[i];
					const qaLaboratoryTestRequests =
						qaLaboratoryTest?.qaLaboratoryTestRequests;
					const qaLaboratoryTestReports =
						qaLaboratoryTest?.qaLaboratoryTestReports;
					const qaLaboratoryTestRequest =
						qaLaboratoryTestRequests[qaLaboratoryTestRequests?.length - 1];
					const qaLaboratoryTestReport =
						qaLaboratoryTestReports[qaLaboratoryTestReports?.length - 1];
					const yearRegex = /^\d{4}$/;

					if (!yearRegex.test(year)) {
						return res.status(400).json({
							success: false,
							message: 'bad request',
							data: null,
						});
					}

					const startDate = new Date(`${+year - 1}-01-01`);
					const endDate = new Date(`${+year}-12-31`);

					const {
						requestDate,
						requestNumber,
						laboratory,
						organizationUnit,
						material,
						type,
						specification,
						program,
						budgetNumber,
						reasonOfTest,
						manufacturer,
						manufacturingDate,
						expiryDate,
						batchNumber,
						sample,
						condition,
						unit,
						quantity,
						typeOfTest,
						testAccordingToSpecification,
						requestAttachmentFileName,
						requestAttachmentFileOriginalName,
						requester,
						requestApproveDate,
						requestApprover,
						requestReceiveDate,
						estimationCloseDate,
						requestReceiver,
						tempReportNumber,
					} = qaLaboratoryTestRequest ?? {};
					const {
						reportDate,
						reportNumber,
						testResult,
						reportAttachmentFileName,
						reportAttachmentFileOriginalName,
						reporter,
						reportApproveDate,
						reportApprover,
					} = qaLaboratoryTestReport ?? {};

					if (
						new Date(requestDate) >= startDate &&
						new Date(requestDate) <= endDate
					) {
						const e = {};

						e.id = qaLaboratoryTest?._id;
						e.requestIds = [];

						for (let i = 0; i < qaLaboratoryTestRequests.length; i++) {
							const f = qaLaboratoryTestRequests[i];

							e.requestIds?.push(f?._id);
						}

						e.requestDate = requestDate ?? null;
						e.requestDateFormated = formatDateDmmyyyy(requestDate);
						e.requestNumber = requestNumber ?? null;
						e.laboratory = laboratory ?? null;
						e.organizationUnit = organizationUnit ?? null;
						e.material = material ?? null;
						e.type = type ?? null;
						e.specification = specification ?? null;
						e.program = program ?? null;
						e.budgetNumber = budgetNumber ?? null;
						e.reasonOfTest = reasonOfTest ?? null;
						e.manufacturer = manufacturer ?? null;
						e.manufacturingDate = manufacturingDate ?? null;
						e.expiryDate = expiryDate ?? null;
						e.batchNumber = batchNumber ?? null;
						e.sample = sample ?? null;
						e.condition = condition ?? null;
						e.unit = unit ?? null;
						e.quantity = quantity ?? null;
						e.typeOfTest = typeOfTest ?? null;
						e.organization = requester?.organization?.substring(0, 2) ?? null;
						e.testAccordingToSpecification =
							testAccordingToSpecification ?? null;
						e.requestAttachmentFileName = requestAttachmentFileName ?? null;
						e.requestAttachmentFileOriginalName =
							requestAttachmentFileOriginalName ?? null;
						e.requesterName = requester?.name ?? null;
						e.requesterNik = requester?.nik ?? null;
						e.requesterOrganization = requester?.organization ?? null;
						e.requestApproveDate = requestApproveDate ?? null;
						e.requestApproveDateFormated =
							formatDateDmmyyyy(requestApproveDate);
						e.requestApproverName = requestApprover?.name ?? null;
						e.requestApproverNik = requestApprover?.nik ?? null;
						e.requestReceiveDate = requestReceiveDate ?? null;
						e.requestReceiveDateFormated =
							formatDateDmmyyyy(requestReceiveDate);
						e.estimationCloseDate = estimationCloseDate ?? null;
						e.estimationCloseDateFormated =
							formatDateDmmyyyy(estimationCloseDate);
						e.requestReceiverName = requestReceiver?.name ?? null;
						e.tempReportNumber = tempReportNumber ?? null;
						e.reportIds = [];

						for (let i = 0; i < qaLaboratoryTestReports.length; i++) {
							const f = qaLaboratoryTestReports[i];

							e.reportIds?.push(f?._id);
						}

						e.reportDate = reportDate ?? null;
						e.reportDateFormated = formatDateDmmyyyy(reportDate);
						e.reportNumber = reportNumber ?? tempReportNumber;
						e.testResult = testResult ?? null;
						e.reportAttachmentFileName = reportAttachmentFileName ?? null;
						e.reportAttachmentFileOriginalName =
							reportAttachmentFileOriginalName ?? null;
						e.reporterName = reporter?.name ?? null;
						e.reporterNik = reporter?.nik ?? null;
						e.reportApproveDate = reportApproveDate ?? null;
						e.reportApproveDateFormated = formatDateDmmyyyy(reportApproveDate);
						e.reportApproverName = reportApprover?.name ?? null;
						e.reportApproverNik = reportApprover?.nik ?? null;

						if (reportApprover?.name) {
							e.status = 'Completed';
						} else if (reporter?.name) {
							e.status = 'Report Awaiting Approval';
						} else if (requestReceiver?.name) {
							e.status = 'On Process';
						} else if (requestApprover?.name) {
							e.status = 'Awaiting Sample';
						} else {
							e.status = 'Request Awaiting Approval';
						}

						qaLaboratoryTests.push(e);
					}
				}

				qaLaboratoryTests = qaLaboratoryTests.sort(
					(a, b) => b?.requestDate - a?.requestDate
				);

				return res.status(200).json({
					success: !!results,
					message: null,
					data: { qaLaboratoryTests },
				});
			})
			.catch((err) => {
				log(err);
				res.status(500).json(err);
			});
	});

	router
		.route('/request/create')
		.post(laboratoryTestUpload.single('file'), (req, res) => {
			const newDoc = req?.body;

			newDoc.requestDate = Date.now();
			newDoc.requestAttachmentFileName = req?.file?.filename ?? null;
			newDoc.requestAttachmentFileOriginalName =
				req?.file?.originalname ?? null;

			new LaboratoryTestRequest(newDoc)
				.save()
				.then((qaLaboratoryTestRequest) => {
					const { _id } = qaLaboratoryTestRequest;
					const saveQaLaboratoryTest = new LaboratoryTest({
						qaLaboratoryTestRequests: [_id],
						qaLaboratoryTestReports: [],
					}).save();
					const generatePdf = generateQaLaboratoryTestRequestPdf(_id);

					return Promise.all([saveQaLaboratoryTest, generatePdf]);
				})
				.then(() => {
					io.sockets.emit('laboratory_test_data_updated');
					return res.status(200).json({
						success: true,
					});
				})
				.catch((err) => {
					log(err);
					res.status(500).json(err);
				});
		});

	router
		.route('/request/edit/:qaLaboratoryTestId')
		.post(laboratoryTestUpload.single('file'), (req, res) => {
			const { qaLaboratoryTestId } = req?.params;
			const filter = { _id: qaLaboratoryTestId };
			const deleteFile = req?.body?.file === 'null';
			const { reporter, reportApprover, ...update } = req?.body;
			let qaLaboratoryTest;
			let qaLaboratoryTestRequestId;
			let qaLaboratoryTestReportId;
			let requestNumberCount;
			let requestNumberWithThisIdCount;

			if (!update.requestDate) {
				update.requestDate = Date.now();
			}

			if (req?.file) {
				const { filename, originalname } = req?.file;

				update.requestAttachmentFileName = filename;
				update.requestAttachmentFileOriginalName = originalname;
			} else if (deleteFile) {
				update.requestAttachmentFileName = null;
				update.requestAttachmentFileOriginalName = null;
			}

			LaboratoryTest.findOne(filter)
				.then((laboratoryTest) => {
					const filter = { requestNumber: update?.requestNumber };

					qaLaboratoryTest = laboratoryTest;
					qaLaboratoryTestRequestId =
						qaLaboratoryTest?.qaLaboratoryTestRequests[
							qaLaboratoryTest?.qaLaboratoryTestRequests?.length - 1
						];
					qaLaboratoryTestReportId =
						qaLaboratoryTest?.qaLaboratoryTestReports[
							qaLaboratoryTest?.qaLaboratoryTestReports?.length - 1
						];

					return LaboratoryTestRequest.countDocuments(filter);
				})
				.then((count) => {
					const filter = {
						_id: qaLaboratoryTestRequestId,
						requestNumber: update?.requestNumber,
					};

					requestNumberCount = count;

					return LaboratoryTestRequest.countDocuments(filter);
				})
				.then((count) => {
					const filter = { _id: qaLaboratoryTestRequestId };
					requestNumberWithThisIdCount = count;

					// if (requestNumberCount > requestNumberWithThisIdCount) {
					// 	return res.status(200).json({
					// 		message: 'Request number already exists.',
					// 	});
					// }

					LaboratoryTestRequest.findOneAndUpdate(filter, update)
						.then((qaLaboratoryTestRequest) => {
							const { _id, requestAttachmentFileName } =
								qaLaboratoryTestRequest;
							const generatePdf = generateQaLaboratoryTestRequestPdf(_id);
							const oldFilePath = `./public/uploads/qaLaboratoryTests/${requestAttachmentFileName}`;
							const handleOldFile = new Promise((resolve) => {
								if ((req?.file && requestAttachmentFileName) || deleteFile) {
									fs.unlink(oldFilePath, (err) => {
										if (err) {
											console.error(err);
										}
									});
								}

								resolve();
							});

							return Promise.all([generatePdf, handleOldFile]);
						})
						.then(() => {
							if (qaLaboratoryTestReportId) {
								const filter = { _id: qaLaboratoryTestReportId };

								if (reporter && reportApprover) {
									return LaboratoryTestReport.findOneAndUpdate(
										filter,
										{ reporter, reportApprover },
										{ new: true }
									);
								} else if (reporter) {
									return LaboratoryTestReport.findOneAndUpdate(
										filter,
										{ reporter },
										{ new: true }
									);
								} else if (reportApprover) {
									return LaboratoryTestReport.findOneAndUpdate(
										filter,
										{ reportApprover },
										{ new: true }
									);
								} else {
									return LaboratoryTestReport.findOne(filter);
								}
							} else {
								return null;
							}
						})
						.then((qaLaboratoryTestReport) => {
							if (qaLaboratoryTestReport) {
								generateQaLaboratoryTestReportPdf(qaLaboratoryTestId);
							} else {
								return false;
							}
						})
						.then(() => {
							io.sockets.emit('laboratory_test_data_updated');

							return res.status(200).json({
								success: true,
							});
						});
				})
				.catch((err) => {
					log(err);
					res.status(500).json(err);
				});
		});

	router.route('/request/approve/:qaLaboratoryTestId').post((req, res) => {
		const { qaLaboratoryTestId } = req?.params;
		const filter = { _id: qaLaboratoryTestId };
		let qaLaboratoryTestRequestId;

		LaboratoryTest.findOne(filter)
			.then((qaLaboratoryTest) => {
				qaLaboratoryTestRequestId =
					qaLaboratoryTest?.qaLaboratoryTestRequests[
						qaLaboratoryTest?.qaLaboratoryTestRequests?.length - 1
					];
				const filter = { _id: qaLaboratoryTestRequestId };

				return LaboratoryTestRequest.findOne(filter);
			})
			.then((qaLaboratoryTestRequest) => {
				const { requestApprover } = qaLaboratoryTestRequest;
				const filter = { _id: qaLaboratoryTestRequestId };
				const update = req?.body;

				if (requestApprover) {
					throw new Error('This laboratory test request is already approved.');
				}

				update.requestApproveDate = Date.now();

				return LaboratoryTestRequest.findOneAndUpdate(filter, update);
			})
			.then((qaLaboratoryTestRequest) => {
				const { _id } = qaLaboratoryTestRequest;

				return generateQaLaboratoryTestRequestPdf(_id);
			})
			.then(() => {
				io.sockets.emit('laboratory_test_data_updated');

				return res.status(200).json({
					success: true,
				});
			})
			.catch((err) => {
				log(err);
				res.status(500).json(err);
			});
	});

	router.route('/request/delete/:qaLaboratoryTestId').post((req, res) => {
		const { qaLaboratoryTestId } = req?.params;
		const filter = { _id: qaLaboratoryTestId };
		let qaLaboratoryTestRequests = [];
		const requestAttachmentFileNames = [];
		const qaLaboratoryTestRequestPdfs = [];

		LaboratoryTest.findOneAndDelete(filter)
			.populate({
				path: 'qaLaboratoryTestRequests',
				model: 'qa.laboratory_test_requests',
			})
			.lean()
			.then((qaLaboratoryTest) => {
				qaLaboratoryTestRequests =
					qaLaboratoryTest?.qaLaboratoryTestRequests ?? [];

				if (qaLaboratoryTestRequests.length === 0) {
					throw new Error(`This laboratory test request doesn't exists.`);
				}

				return new Promise((resolve) => {
					for (let i = 0; i < qaLaboratoryTestRequests.length; i++) {
						const e = qaLaboratoryTestRequests[i];
						const { _id, requestAttachmentFileName } = e;
						const pdfFilePath = `./public/temp/QA Laboratory Test Request ${_id}.pdf`;

						if (requestAttachmentFileName) {
							const oldFilePath = `./public/uploads/qaLaboratoryTests/${requestAttachmentFileName}`;
							requestAttachmentFileNames.push(oldFilePath);
						}

						qaLaboratoryTestRequestPdfs.push(pdfFilePath);
					}

					resolve();
				});
			})
			.then(
				() =>
					new Promise((resolve) => {
						for (let i = 0; i < requestAttachmentFileNames.length; i++) {
							const e = requestAttachmentFileNames[i];

							fs.unlink(e, (err) => {
								if (err) {
									console.error(err);
								}
							});
						}

						for (let i = 0; i < qaLaboratoryTestRequestPdfs.length; i++) {
							const e = qaLaboratoryTestRequestPdfs[i];

							fs.unlink(e, (err) => {
								if (err) {
									console.error(err);
								}
							});
						}

						resolve();
					})
			)
			.then(() => {
				LaboratoryTestRequest.deleteMany(
					{
						_id: {
							$in: qaLaboratoryTestRequests,
						},
					},
					(_err, result) => {
						if (result.ok === 1) {
							io.sockets.emit('laboratory_test_data_updated');
							return res.status(200).json({
								success: true,
							});
						}
					}
				);
			})
			.catch((err) => {
				log(err);
				res.status(500).json(err);
			});
	});

	router
		.route('/request/receive/:qaLaboratoryTestId')
		.post(laboratoryTestUpload.single('file'), (req, res) => {
			const filter = { _id: '5fb48634caa46232ac8b10ca' };
			const update = req?.body;
			let statisticDb = {};
			let qaLaboratoryRequestId;

			Statistic.findOne(filter)
				.then((statistic) => {
					const { qaLaboratoryTestId } = req?.params;
					const filter = { _id: qaLaboratoryTestId };

					statisticDb = statistic;

					return LaboratoryTest.findOne(filter);
				})
				.then((qaLaboratoryTest) => {
					const qaLaboratoryTestRequestId =
						qaLaboratoryTest.qaLaboratoryTestRequests[
							qaLaboratoryTest?.qaLaboratoryTestRequests?.length - 1
						];
					const filter = { _id: qaLaboratoryTestRequestId };

					return LaboratoryTestRequest.findOne(filter);
				})
				.then((qaLaboratoryTestRequest) => {
					const { _id, laboratory, requestReceiver } = qaLaboratoryTestRequest;
					const {
						laboratoryTestReportCounterQa3100Sc,
						laboratoryTestReportCounterQa3100Pc,
						laboratoryTestReportCounterQa3100Kim,
						laboratoryTestReportCounterQa3200Bc,
						laboratoryTestReportCounterQa3200Mt,
						laboratoryTestReportCounterQa3100ScYear,
						laboratoryTestReportCounterQa3100PcYear,
						laboratoryTestReportCounterQa3100KimYear,
						laboratoryTestReportCounterQa3200BcYear,
						laboratoryTestReportCounterQa3200MtYear,
					} = statisticDb;
					const month = moment().month() + 1;
					const year = moment().year();
					const statisticUpdate = {};

					if (requestReceiver) {
						throw new Error(
							'This laboratory test request is already received.'
						);
					}

					qaLaboratoryRequestId = _id;

					switch (laboratory) {
						case 'QA 3100 - Solution Control':
							if (laboratoryTestReportCounterQa3100ScYear !== year) {
								update.tempReportNumber = `1/QA3100/SC/${`0${month}`.slice(
									-2
								)}/${year}`;
								statisticUpdate.laboratoryTestReportCounterQa3100Sc = 1;
								statisticUpdate.laboratoryTestReportCounterQa3100ScYear = year;
							} else {
								update.tempReportNumber = `${
									laboratoryTestReportCounterQa3100Sc + 1
								}/QA3100/SC/${`0${month}`.slice(-2)}/${year}`;
								statisticUpdate.laboratoryTestReportCounterQa3100Sc =
									laboratoryTestReportCounterQa3100Sc + 1;
							}
							break;
						case 'QA 3100 - Process Control':
							if (laboratoryTestReportCounterQa3100PcYear !== year) {
								update.tempReportNumber = `1/QA3100/PC/${`0${month}`.slice(
									-2
								)}/${year}`;
								statisticUpdate.laboratoryTestReportCounterQa3100Pc = 1;
								statisticUpdate.laboratoryTestReportCounterQa3100PcYear = year;
							} else {
								update.tempReportNumber = `${
									laboratoryTestReportCounterQa3100Pc + 1
								}/QA3100/PC/${`0${month}`.slice(-2)}/${year}`;
								statisticUpdate.laboratoryTestReportCounterQa3100Pc =
									laboratoryTestReportCounterQa3100Pc + 1;
							}
							break;
						case 'QA 3100 - Kimia':
							if (laboratoryTestReportCounterQa3100KimYear !== year) {
								update.tempReportNumber = `1/QA3100/KIM/${`0${month}`.slice(
									-2
								)}/${year}`;
								statisticUpdate.laboratoryTestReportCounterQa3100Kim = 1;
								statisticUpdate.laboratoryTestReportCounterQa3100KimYear = year;
							} else {
								update.tempReportNumber = `${
									laboratoryTestReportCounterQa3100Kim + 1
								}/QA3100/KIM/${`0${month}`.slice(-2)}/${year}`;
								statisticUpdate.laboratoryTestReportCounterQa3100Kim =
									laboratoryTestReportCounterQa3100Kim + 1;
							}
							break;
						case 'QA 3200 - Bonding & Composite':
							if (laboratoryTestReportCounterQa3200BcYear !== year) {
								update.tempReportNumber = `1/QA3200/BC/${`0${month}`.slice(
									-2
								)}/${year}`;
								statisticUpdate.laboratoryTestReportCounterQa3200Bc = 1;
								statisticUpdate.laboratoryTestReportCounterQa3200BcYear = year;
							} else {
								update.tempReportNumber = `${
									laboratoryTestReportCounterQa3200Bc + 1
								}/QA3200/BC/${`0${month}`.slice(-2)}/${year}`;
								statisticUpdate.laboratoryTestReportCounterQa3200Bc =
									laboratoryTestReportCounterQa3200Bc + 1;
							}
							break;
						case 'QA 3200 - Metallurgy':
							if (laboratoryTestReportCounterQa3200MtYear !== year) {
								update.tempReportNumber = `1/QA3200/MT/${`0${month}`.slice(
									-2
								)}/${year}`;
								statisticUpdate.laboratoryTestReportCounterQa3200Mt = 1;
								statisticUpdate.laboratoryTestReportCounterQa3200MtYear = year;
							} else {
								update.tempReportNumber = `${
									laboratoryTestReportCounterQa3200Mt + 1
								}/QA3200/MT/${`0${month}`.slice(-2)}/${year}`;
								statisticUpdate.laboratoryTestReportCounterQa3200Mt =
									laboratoryTestReportCounterQa3200Mt + 1;
							}
							break;
					}

					return Statistic.findOneAndUpdate(filter, statisticUpdate);
				})
				.then(() => {
					const filter = { _id: qaLaboratoryRequestId };

					return LaboratoryTestRequest.findOneAndUpdate(filter, update);
				})
				.then((qaLaboratoryTestRequest) => {
					const { _id } = qaLaboratoryTestRequest;

					return generateQaLaboratoryTestRequestPdf(_id);
				})
				.then(() => {
					io.sockets.emit('laboratory_test_data_updated');

					return res.status(200).json({
						success: true,
					});
				})
				.catch((err) => {
					log(err);
					res.status(500).json(err);
				});
		});

	router
		.route('/report/create/:qaLaboratoryTestId')
		.post(laboratoryTestUpload.single('file'), (req, res) => {
			const { qaLaboratoryTestId } = req?.params;
			const filter = { _id: qaLaboratoryTestId };
			const newDoc = req?.body;
			let qaLaboratoryTestReportId;

			newDoc.reportAttachmentFileName = req?.file?.filename ?? null;
			newDoc.reportAttachmentFileOriginalName = req?.file?.originalname ?? null;

			LaboratoryTest.findOne(filter)
				.then((qaLaboratoryTest) => {
					const { qaLaboratoryTestReports } = qaLaboratoryTest;

					if (qaLaboratoryTestReports && qaLaboratoryTestReports?.length > 1) {
						throw new Error('This laboratory request report already exists.');
					}

					return new LaboratoryTestReport(newDoc).save();
				})
				.then((qaLaboratoryTestReport) => {
					const { _id } = qaLaboratoryTestReport;
					const filter = { _id: qaLaboratoryTestId };

					qaLaboratoryTestReportId = _id;

					return LaboratoryTest.findOne(filter);
				})
				.then((qaLaboratoryTest) => {
					qaLaboratoryTest?.qaLaboratoryTestReports?.push(
						qaLaboratoryTestReportId
					);

					return qaLaboratoryTest?.save();
				})
				.then(() => generateQaLaboratoryTestReportPdf(qaLaboratoryTestId))
				.then(() => {
					io.sockets.emit('laboratory_test_data_updated');

					return res.status(200).json({
						success: true,
					});
				})
				.catch((err) => {
					log(err);
					res.status(500).json(err);
				});
		});

	router
		.route('/report/edit/:qaLaboratoryTestId')
		.post(laboratoryTestUpload.single('file'), (req, res) => {
			const { qaLaboratoryTestId } = req?.params;
			const filter = { _id: qaLaboratoryTestId };
			const deleteFile = req?.body?.file === 'null';
			const update = req?.body;
			let reports;

			if (req?.file) {
				const { filename, originalname } = req?.file;

				update.reportAttachmentFileName = filename;
				update.reportAttachmentFileOriginalName = originalname;
			} else if (deleteFile) {
				update.reportAttachmentFileName = null;
				update.reportAttachmentFileOriginalName = null;
			}

			LaboratoryTest.findOne(filter)
				.populate({
					path: 'qaLaboratoryTestReports',
					model: 'qa.laboratory_test_reports',
				})
				.lean()
				.then((qaLaboratoryTest) => {
					const { qaLaboratoryTestReports } = qaLaboratoryTest;
					const filter = {
						_id: qaLaboratoryTestReports[qaLaboratoryTestReports?.length - 1],
					};

					reports = qaLaboratoryTestReports;

					return LaboratoryTestReport.findOneAndUpdate(filter, update);
				})
				.then((qaLaboratoryTestReport) => {
					const { reportAttachmentFileName } = qaLaboratoryTestReport;
					const generatePdf =
						generateQaLaboratoryTestReportPdf(qaLaboratoryTestId);
					const handleOldFile = new Promise((resolve) => {
						const sameAttachmentReports = [];

						for (let i = 0; i < reports.length; i++) {
							const e = reports[i];

							if (e.reportAttachmentFileName === reportAttachmentFileName) {
								sameAttachmentReports.push(e);
							}
						}

						if (
							(req?.file &&
								reportAttachmentFileName &&
								sameAttachmentReports.length < 2) ||
							(deleteFile && sameAttachmentReports.length < 2)
						) {
							const oldFilePath = `./public/uploads/qaLaboratoryTests/${reportAttachmentFileName}`;

							fs.unlink(oldFilePath, (err) => {
								if (err) {
									console.error(err);
								}
							});
						}

						resolve();
					});

					return Promise.all([generatePdf, handleOldFile]);
				})
				.then(() => {
					io.sockets.emit('laboratory_test_data_updated');

					return res.status(200).json({
						success: true,
					});
				})
				.catch((err) => {
					log(err);
					res.status(500).json(err);
				});
		});

	router
		.route('/report/approve/:qaLaboratoryTestId')
		.post(laboratoryTestUpload.single('file'), (req, res) => {
			const { qaLaboratoryTestId } = req?.params;
			const filter = { _id: qaLaboratoryTestId };
			let qaLaboratoryTestReportId;

			LaboratoryTest.findOne(filter)
				.then((qaLaboratoryTest) => {
					qaLaboratoryTestReportId =
						qaLaboratoryTest?.qaLaboratoryTestReports[
							qaLaboratoryTest?.qaLaboratoryTestReports?.length - 1
						];
					const filter = { _id: qaLaboratoryTestReportId };

					return LaboratoryTestReport.findOne(filter);
				})
				.then((qaLaboratoryTestReport) => {
					const { reportApprover } = qaLaboratoryTestReport;
					const filter = { _id: qaLaboratoryTestReportId };
					const update = req?.body;

					if (reportApprover) {
						throw new Error('This laboratory test report is already approved.');
					}

					update.reportApproveDate = Date.now();

					return LaboratoryTestReport.findOneAndUpdate(filter, update);
				})
				.then(() => generateQaLaboratoryTestReportPdf(qaLaboratoryTestId))
				.then(() => {
					io.sockets.emit('laboratory_test_data_updated');

					return res.status(200).json({
						success: true,
					});
				})
				.catch((err) => {
					log(err);
					res.status(500).json(err);
				});
		});

	router
		.route('/report/revise/:qaLaboratoryTestId')
		.post(laboratoryTestUpload.single('file'), (req, res) => {
			const { qaLaboratoryTestId } = req?.params;
			const newDoc = req?.body;
			let qaLaboratoryTestReportId;

			if (req?.file) {
				newDoc.reportAttachmentFileName = req?.file?.filename;
				newDoc.reportAttachmentFileOriginalName = req?.file?.originalname;
			} else if (req?.body?.file === 'null') {
				newDoc.reportAttachmentFileName = null;
				newDoc.reportAttachmentFileOriginalName = null;
			}

			new LaboratoryTestReport(newDoc)
				.save()
				.then((qaLaboratoryTestReport) => {
					const { _id } = qaLaboratoryTestReport;
					const filter = { _id: qaLaboratoryTestId };

					qaLaboratoryTestReportId = _id;

					return LaboratoryTest.findOne(filter);
				})
				.then((qaLaboratoryTest) => {
					qaLaboratoryTest?.qaLaboratoryTestReports?.push(
						qaLaboratoryTestReportId
					);

					return qaLaboratoryTest?.save();
				})
				.then(() => generateQaLaboratoryTestReportPdf(qaLaboratoryTestId))
				.then(() => {
					io.sockets.emit('laboratory_test_data_updated');

					return res.status(200).json({
						success: true,
					});
				})
				.catch((err) => {
					log(err);
					res.status(500).json(err);
				});
		});

	router.route('/request/download/pdf/:qaLaboratoryTestId').get((req, res) => {
		const { qaLaboratoryTestId } = req?.params;
		const path = `./public/temp/QA Laboratory Test Request ${qaLaboratoryTestId}.pdf`;
		const file = fs.createReadStream(path);
		const stat = fs.statSync(path);

		res.setHeader('Content-Length', stat.size);
		res.setHeader('Content-Type', 'application/pdf');
		res.setHeader(
			'Content-Disposition',
			`attachment; filename=Request For Laboratory Test ${qaLaboratoryTestId}.pdf`
		);

		file.pipe(res);
	});

	router.route('/report/download/pdf/:qaLaboratoryTestId').get((req, res) => {
		const { qaLaboratoryTestId } = req?.params;
		const path = `./public/temp/QA Laboratory Test Report ${qaLaboratoryTestId}.pdf`;
		const file = fs.createReadStream(path);
		const stat = fs.statSync(path);

		res.setHeader('Content-Length', stat.size);
		res.setHeader('Content-Type', 'application/pdf');
		res.setHeader(
			'Content-Disposition',
			`attachment; filename=Report Of Laboratory Test ${qaLaboratoryTestId}.pdf`
		);

		file.pipe(res);
	});

	router.route('/attachment/download/:fileName').get((req, res) => {
		const { fileName } = req?.params;
		const path = `./public/uploads/qaLaboratoryTests/${fileName}`;
		const file = fs.createReadStream(path);
		const stat = fs.statSync(path);

		res.setHeader('Content-Length', stat.size);
		res.setHeader('Content-Disposition', 'attachment; filename=Attachment');

		file.pipe(res);
	});

	router.route('/excel').get((req, res) => {
		LaboratoryTest.find()
			.populate({
				path: 'qaLaboratoryTestRequests',
				model: 'qa.laboratory_test_requests',
				populate: [
					{
						path: 'requester',
						model: 'users',
					},
					{
						path: 'requestApprover',
						model: 'users',
					},
					{
						path: 'requestReceiver',
						model: 'users',
					},
				],
			})
			.populate({
				path: 'qaLaboratoryTestReports',
				model: 'qa.laboratory_test_reports',
				populate: [
					{
						path: 'reporter',
						model: 'users',
					},
					{
						path: 'reportApprover',
						model: 'users',
					},
				],
			})
			.lean()
			.then((results) => {
				const data = {
					columns: [
						{ name: 'No.', filterButton: false },
						{ name: 'ID', filterButton: false },
						{ name: 'Laboratory', filterButton: true },
						{ name: 'Status', filterButton: true },
						{ name: 'Request Date', filterButton: true },
						{ name: 'Request Number', filterButton: false },
						{ name: 'Requester', filterButton: true },
						{ name: 'Request Approver', filterButton: true },
						{ name: 'Sample Receive Date', filterButton: true },
						{ name: 'Sample Receiver', filterButton: true },
						{ name: 'Estimation Close Date', filterButton: true },
						{ name: 'Report Date', filterButton: true },
						{ name: 'Report Number', filterButton: false },
						{ name: 'Reporter', filterButton: true },
						{ name: 'Report Approver', filterButton: true },
						{ name: 'Request Pdf', filterButton: false },
						{ name: 'Request Attachment', filterButton: false },
						{ name: 'Report Pdf', filterButton: false },
						{ name: 'Report Attachment', filterButton: false },
					],
					rows: [],
				};

				results.map((result, index) => {
					const request =
						result.qaLaboratoryTestRequests[
							result.qaLaboratoryTestRequests.length - 1
						];
					const report =
						result.qaLaboratoryTestReports[
							result.qaLaboratoryTestReports.length - 1
						];

					const rows = [];
					let status = '';

					if (report?.reportApprover) {
						status = 'Completed';
					} else if (report?.reporter) {
						status = 'Report Awaiting Approval';
					} else if (request?.requestReceiver) {
						status = 'On Process';
					} else if (request?.requestApprover) {
						status = 'Awaiting Sample';
					} else if (request?.requester) {
						status = 'Request Awaiting Approval';
					}

					if (request) {
						rows[0] = index + 1;
						rows[1] = String(result?._id ?? '');
						rows[2] = request?.laboratory ?? '';
						rows[3] = status;
						rows[4] = request?.requestDate ? new Date(request.requestDate) : '';
						rows[5] = request?.requestNumber ?? '';
						rows[6] = request?.requester?.name ?? '';
						rows[7] = request?.requestApprover?.name ?? '';
						rows[8] = request?.requestReceiveDate
							? new Date(request?.requestReceiveDate)
							: '';
						rows[9] = request?.requestReceiver?.name ?? '';
						rows[10] = request?.estimationCloseDate ?? '';
						rows[15] = `${pdfUrl}QA Laboratory Test Request ${String(
							request?._id ?? ''
						)}.pdf`;
						rows[16] = request?.requestAttachmentFileName
							? `${uploadUrl}${request?.requestAttachmentFileName}`
							: '-';
					}

					if (report) {
						rows[11] = report?.reportDate ? new Date(report.reportDate) : '';
						rows[12] = report?.reportNumber ?? '';
						rows[13] = report?.reporter?.name ?? '';
						rows[14] = report?.reportApprover?.name ?? '';
						rows[17] = `${pdfUrl}QA Laboratory Test Report ${String(
							report?._id ?? ''
						)}.pdf`;
						rows[18] = report?.reportAttachmentFileName
							? `${uploadUrl}${report?.reportAttachmentFileName}`
							: '-';
					} else {
						rows[11] = '';
						rows[12] = '';
						rows[13] = '';
						rows[14] = '';
						rows[17] = '';
						rows[18] = '';
					}

					data.rows.push(rows);
				});

				return data;
			})
			.then((data) => {
				const fileName = 'F-DP 704.04.xlsx';
				const workbook = new ExcelJS.Workbook();

				workbook.creator = 'Super Admin';
				workbook.lastModifiedBy = 'Super Admin';
				workbook.created = new Date();
				workbook.modified = new Date();

				const worksheet = workbook.addWorksheet('My Sheet', {
					pageSetup: { orientation: 'landscape' },
				});

				worksheet.addTable({
					name: 'Table',
					ref: 'A1',
					headerRow: true,
					totalsRow: false,
					style: {
						theme: 'TableStyleMedium2',
						showRowStripes: false,
					},
					columns: data.columns,
					rows: data.rows,
				});

				autoWidth(worksheet, [4, 8, 10, 11]);

				res.setHeader(
					'Content-Type',
					'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
				);
				res.setHeader(
					'Content-Disposition',
					'attachment; filename=' + fileName
				);

				workbook.xlsx.write(res).then(function () {
					res.end();
				});
			});
	});

	router.route('/regenerate-pdfs').post((_req, res) => {
		let qaLaboratoryTests = [];

		LaboratoryTest.find()
			.populate({
				path: 'qaLaboratoryTestRequests',
				model: 'qa.laboratory_test_requests',
				populate: [
					{
						path: 'requester',
						model: 'users',
					},
					{
						path: 'requestApprover',
						model: 'users',
					},
					{
						path: 'requestReceiver',
						model: 'users',
					},
				],
			})
			.populate({
				path: 'qaLaboratoryTestReports',
				model: 'qa.laboratory_test_reports',
				populate: [
					{
						path: 'reporter',
						model: 'users',
					},
					{
						path: 'reportApprover',
						model: 'users',
					},
				],
			})
			.lean()
			.then((results) => {
				for (let i = 0; i < results.length; i++) {
					const qaLaboratoryTest = results[i];
					const qaLaboratoryTestRequests =
						qaLaboratoryTest?.qaLaboratoryTestRequests;
					const qaLaboratoryTestReports =
						qaLaboratoryTest?.qaLaboratoryTestReports;

					const e = {};

					e.id = qaLaboratoryTest?._id;
					e.requestIds = [];

					for (let i = 0; i < qaLaboratoryTestRequests.length; i++) {
						const f = qaLaboratoryTestRequests[i];

						e.requestIds?.push(f?._id);
					}

					e.reportIds = [];

					for (let i = 0; i < qaLaboratoryTestReports.length; i++) {
						const f = qaLaboratoryTestReports[i];

						e.reportIds?.push(f?._id);
					}

					qaLaboratoryTests.push(e);
				}

				qaLaboratoryTests = qaLaboratoryTests.sort(
					(a, b) => b?.requestDate - a?.requestDate
				);

				const promises = [];
				qaLaboratoryTests.forEach((test) => {
					test.requestIds.forEach((requestId) => {
						promises.push(generateQaLaboratoryTestRequestPdf(requestId));
					});

					test.reportIds.forEach((reportId) => {
						promises.push(generateQaLaboratoryTestReportPdf(e.id, reportId));
					});
				});

				Promise.all(promises)
					.then(() => {
						console.log('All PDFs regenerated successfully.');
					})
					.catch((err) => {
						log(err);
					});

				return res.status(200).json({
					success: !!results,
					message: null,
					data: 'Processing',
				});
			})
			.catch((err) => {
				log(err);
				res.status(500).json(err);
			});
	});

	return router;
};
