import mongoose from 'mongoose';
import config from './config/config';

mongoose.Promise = global.Promise;


export default class DbConnection {
	constructor() {
		let configDevelop = config.develop;
		this.urlConnection = configDevelop.uri + configDevelop.nameDataBase;
	}

	connect() {
		return new Promise((response, reject) => {
			mongoose.connect(this.urlConnection);
			mongoose.connection.on('connected', () => {
				console.log('connect to database');
				response(true);
			});
			mongoose.connection.on('error', (err) => {
				console.log('Open connection is fail');
				reject(err);
			});
		});
	}

	disconnect() {
		return new Promise((response, reject) => {
			mongoose.disconnect(() => {
				response(true);
			});
		});
	}
}