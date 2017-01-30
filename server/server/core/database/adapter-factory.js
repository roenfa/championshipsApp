import fs from 'fs';
import path from 'path';

const GENERIC = 'generic';
const ADAPTER_FOLDER = 'adapter';
let pathAdapters = path.join(__dirname, ADAPTER_FOLDER);

/**
 * Module for load all adapters.
 */
export default class AdapterFactory {

    constructor() {
        this.adapters = [];
    }

    /**
     * Loads adapters.
     */
    loadAdapters() {
        let files, name;
        try {
            files = fs.readdirSync(__dirname + '/adapter');
            files.forEach((file) => {
                name = (path.parse(file)).name;
                if (name.indexOf('.spec') === -1) {
                    this.adapters[name] = require(pathAdapters + '/' + name);
                }
            });
        } catch (error) {
        }
    }

    /**
     * Gets adapter for request data.
     * @param {String} nameAdapter is name of Model or Adapter.
     * @returns {*} a instance of Adapter.
     */
    getAdapter(nameAdapter) {
        let GenericAdapter,
            SpecificAdapter,
            adapter = null;
        try {
            if (this.adapters[nameAdapter]) {
                SpecificAdapter = this.adapters[nameAdapter].default;
                adapter = new SpecificAdapter();
            } else {
                GenericAdapter = this.adapters[GENERIC].default;
                adapter = new GenericAdapter(nameAdapter);
            }
        } catch (error) {
        }
        return adapter;
    }
}
