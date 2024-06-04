import multer from 'multer';
import nodemailer from 'nodemailer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Mail transporter
const iaeMailTransporter = nodemailer.createTransport({
	host: 'mail.indonesian-aerospace.com',
	port: 465,
	secure: true,
	auth: {
		user: 'arfajar',
		pass: '12345678',
	},
});

// QA storages
const laboratoryTestStorage = multer.diskStorage({
	destination(_req, _file, cb) {
		cb(null, './public/uploads/qaLaboratoryTests');
	},
	filename(_req, file, cb) {
		cb(null, `${uuidv4()}-${Date.now()}${path.extname(file.originalname)}`);
	},
});

const chemicalSolutionControlStorage = multer.diskStorage({
	destination(_req, _file, cb) {
		cb(null, './public/uploads/qaChemicalSolutionControls');
	},
	filename(_req, file, cb) {
		cb(null, `${uuidv4()}-${Date.now()}${path.extname(file.originalname)}`);
	},
});

const electroplatingChemicalProcessControlStorage = multer.diskStorage({
	destination(_req, _file, cb) {
		cb(null, './public/uploads/qa/electroplating-chemical-process-controls');
	},
	filename(_req, file, cb) {
		cb(null, `${uuidv4()}-${Date.now()}${path.extname(file.originalname)}`);
	},
});

// QA uploads
const laboratoryTestUpload = multer({ storage: laboratoryTestStorage });

const chemicalSolutionControlUpload = multer({
	storage: chemicalSolutionControlStorage,
});

const electroplatingChemicalProcessControlUpload = multer({
	storage: electroplatingChemicalProcessControlStorage,
});

module.exports = {
	mailTransporter: iaeMailTransporter,
	laboratoryTestUpload,
	chemicalSolutionControlUpload,
	electroplatingChemicalProcessControlUpload,
};
