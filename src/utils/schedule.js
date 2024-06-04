import schedule from 'node-schedule';
import { spawn } from 'child_process';

import { log } from './log';

function scheduleMongoDbBackup() {
	schedule.scheduleJob('00 23 * * *', () => {
		const dailyBackup = spawn('mongodump', [
			'--db=iae_server',
			'--gzip',
			'-o',
			'public/backup/mongodb/iae_server_daily',
		]);

		dailyBackup.on('exit', (code, signal) => {
			if (code) {
				log(`Daily backup process exited with code ${code}`);
			} else if (signal) {
				log(`Daily backup process was killed with signal ${signal}`);
			} else {
				log('Daily backup success');
			}
		});
	});

	schedule.scheduleJob('10 23 * * 0', () => {
		const weeklyBackup = spawn('mongodump', [
			'--db=iae_server',
			'--gzip',
			'-o',
			'public/backup/mongodb/iae_server_weekly',
		]);

		weeklyBackup.on('exit', (code, signal) => {
			if (code) {
				log(`Weekly backup process exited with code ${code}`);
			} else if (signal) {
				log(`Weekly backup process was killed with signal ${signal}`);
			} else {
				log('Weekly backup success');
			}
		});
	});

	schedule.scheduleJob('20 23 1 * *', () => {
		const monthlyBackup = spawn('mongodump', [
			'--db=iae_server',
			'--gzip',
			'-o',
			'public/backup/mongodb/iae_server_monthly_' +
				String(new Date().getMonth() + 1).padStart(2, '0') +
				String(new Date().getFullYear()),
		]);

		monthlyBackup.on('exit', (code, signal) => {
			if (code) {
				log(`Monthly backup process exited with code ${code}`);
			} else if (signal) {
				log(`Monthly backup process was killed with signal ${signal}`);
			} else {
				log('Monthly backup success');
			}
		});
	});

	schedule.scheduleJob('30 23 1 1 *', () => {
		const annualBackup = spawn('mongodump', [
			'--db=iae_server',
			'--gzip',
			'-o',
			'public/backup/mongodb/iae_server_annual_' +
				String(new Date().getFullYear()),
		]);

		annualBackup.on('exit', (code, signal) => {
			if (code) {
				log(`Annual backup process exited with code ${code}`);
			} else if (signal) {
				log(`Annual backup process was killed with signal ${signal}`);
			} else {
				log('Annual backup success');
			}
		});
	});
}

module.exports = {
	scheduleMongoDbBackup,
};
