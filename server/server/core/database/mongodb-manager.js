import ModelLoader from './model-loader';
import DbConnection from './dbconnection';
import AdaterFactory from './adapter-factory';

let _singleton = Symbol();

export default class MongodbManager {
	constructor(singletonToken) {
		if(_singleton != singletonToken)
		{
			throw new Error('Cannot instantiate directly');
		}
		this.modelLoader = new ModelLoader();
		this.modelLoader.loadModels();
		this.dbConnection = new DbConnection();
		this.adapterFactory = new AdaterFactory();
		this.adapterFactory.loadAdapters();
	}

	static get instance() {
		if(!this[_singleton]) {
			this[_singleton] = new MongodbManager(_singleton);
		}
		return this[_singleton];
	}

	getAdapter(nameAdapter) {
		return this.adapterFactory.getAdapter(nameAdapter);
	}

	connect() {
		return this.dbConnection.connect();
	}

	disconnect() {
		return this.dbConnection.disconnect();
	}


}