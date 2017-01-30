import fs from 'fs';
import path from 'path';

export default class ModelLoader {
	constructor() {
		this.pathModels = __dirname + '/model';
	}

	loadModels() {
		let index, name, models;
		try {
			models = fs.readdirSync(this.pathModels);
			for(index = 0; index < models.legth; index++) {
				name = (path.parse(models[index])).name;
				require(this.pathModels + '/' + name);
			}
		}
		catch(error) {
			
		}
	}
}