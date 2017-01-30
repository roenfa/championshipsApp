import express from 'express';
import bodyParser from 'body-parser';
import DbManager from './core/database';
import Team from './modules/team';

export default class App {
	constructor(config) {
		this.appServer = express();
		this.config = config;
		this.setConfiguration(this.appServer, config.server);
	}

	setConfiguration(app, config) {
		app.set('port', config.appPort);
		app.use(bodyParser.urlencoded({ extended: false }));
		app.use(bodyParser.json());

	}

	getAppServer() {
		return this.appServer;
	}
	
	loadModules() {
		return new Promise((resolve, reject) => {
			DbManager.connect()
			.then((status) => {
				resolve('ok');
				Team.registerModule(this.appServer);	
			})
			.catch((err) => {
				reject(err);
			})
			
		});
	}
}