import moogse from 'mongoose';
import _ from 'lodash';
import Tools from './utils/tools';

const NOT_FOUND = 'Element not exist stored';
const ORDER_BY_DEFAULT = {
	'_id': 1
}
export default class ModelManager {
	constructor(modelName) {
		this.model = mongoose.model(modelName);
	}

	insert(data) {
		return new Promise((respose, reject) => {
			this.model.create(data)
			.then((data) => {
				respose(Tools.changeAttribute(data._doc, null));
			})
			.catch((error) => {
				reject(error);
			})

		});
	}

	update(id, dataObject) {
		if(!id) {
			throw new Error('id is indefined');
		}
		if(!dataObject) {
			throw new Error('data is undefined');
		}
		return new Promise((respose, reject) => {
			this.model.findOne({
				_id: id
			})
			.then((model) => {
				if(!model) {
					reject(new Error(NOT_FOUND));
				}
				else {
					model = _.extend(model, dataObject);
					model.save()
					.then((data) => {
						respose(Tools.changeAttribute(data._doc, null));
					})
					.catch((error) => {
						reject(error);
					});
				}
			})
			.catch((error) => {
				reject(error);
			});
		});
	}

	findOne(query) {
		return new Promise((respose, reject) => {
			this.model.findOne(query)
			.lean()
			.exec()
			.then((data) => {
				if(data) {
					respose(Tools.changeAttribute(data, null));
				}
				else {
					respose(null);
				}
			})
			.catch((error) => {
				reject(new Error(NOT_FOUND));
			});
		});
	}

	findAll(query) {
		let newQuery = {};
		let orderBy = ORDER_BY_DEFAULT;
		if(query.$orderby) {
			newQuery = query.$query;
			orderBy = query.$orderby;
		} 
		else {
			newQuery = query;
		}
		return new Promise((respose, reject) => {
			this.model.find(newQuery)
			.sort(orderBy)
			.lean()
			.exec()
			.then((data) => {
				if(data && data.length == 0) {
					respose(data);
				}
				else {
					respose(Tools.changeAttribute(data, null));
				}
			})
			.catch((error) => {
				reject(error);
			});
		});
	}

	remove(query) {
		return new Promise((respose, reject) => {
			this.model.remove(query)
			.then((data) => {
				if(data.result.n == 0) {
					reject(new Error(NOT_FOUND));
				} 
				else {
					respose(data.result.n);
				}
			})
			.catch((error) => {
				reject(error);
			})
		});
	}

	removeAll(query) {
		return new Promise((response, reject) => {
			this.model.remove(query)
			.then((data) => {
				response(data.result.n)
			})
			.catch((error) => {
				reject(error);
			});
		});
	}
}