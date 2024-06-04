/* eslint-disable no-console */
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import methodOverride from 'method-override';
import mongoose from 'mongoose';
import path from 'path';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { json, urlencoded } from 'body-parser';

import chemicalSolutionControls from './routes/api/qa/chemicalSolutionControls';
import controlOfElectroplatingAndChemicalProcesses from './routes/api/qa/controlOfElectroplatingAndChemicalProcesses';
import laboratoryTests from './routes/api/qa/laboratoryTests';
import medias from './routes/api/common/medias';
import users from './routes/api/common/users';
import usersAuthorizations from './routes/api/common/usersAuthorizations';
import { handleError } from './utils/errors/errorManager';
import { handleMongooseConnection } from './handlers/mongoose';
import { handleWsConnection } from './handlers/websocket';
import { log } from './utils/log';
import { scheduleMongoDbBackup } from './utils/schedule';
import { uri, options } from './config/mongoose';

const app = express();
const server = createServer(app);
const ws = new Server(server, cors);

// Job schedulers
scheduleMongoDbBackup();

// Settings
app.set('trust proxy', 1);

// Middleware
app.use(cors());
app.use(json());
app.use(helmet());
app.use(express.static(path.join(__dirname, '../public')));
app.use(compression());
app.use(methodOverride('_method'));
app.use(urlencoded({ extended: true }));

// Routes
app.use('/api/users', users(ws));
app.use('/api/users/authorizations', usersAuthorizations(ws));
app.use('/api/medias', medias(ws));
app.use('/api/qa/laboratory-tests', laboratoryTests(ws));
app.use('/api/qa/chemical-solution-controls', chemicalSolutionControls(ws));
app.use(
	'/api/qa/control-of-electroplating-and-chemical-processes',
	controlOfElectroplatingAndChemicalProcesses(ws)
);

// Custom middleware
app.use((err, _req, res, _next) => {
	if (err) {
		handleError(err, res);
	}
});

// Connect databases
mongoose.connect(uri, options).catch((error) => log(error));

// Handlers
handleMongooseConnection(mongoose.connection);
handleWsConnection(ws);

// Serve
server.listen(5000, () => {
	log('IAe Server up and running on port 5000.');
});
