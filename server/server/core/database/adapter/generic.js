import ModelManager from '../model-manager';

/**
 * Generic adapter.
 */
export default class GenericAdapter {

    /**
     * @param {String} model name.
     */
    constructor(model) {
        this.modelManager = new ModelManager(model);
    }

    /**
     * Insert a element into database.
     * @param {Object} data example {name: 'paco'}
     * @returns {Promise} request promise request promise
     */
    insert(data) {
        return this.modelManager.insert(data);
    }

    /**
     * Finds a element by query
     * @param {Object} query example {_id: '55ss'}
     * @returns {Promise} request promise
     */
    findOne(query) {
        return this.modelManager.findOne(query);
    }

    /**
     * Updates a element by ID
     * @param {String} id model id
     * @param {Object} data model data to update
     * @returns {Promise} request promise
     */
    update(id, data) {
        return this.modelManager.update(id, data);
    }

    /**
     * Finds all elements by query
     * @param {Object} query example {}
     * @returns {Promise} request promise
     */
    findAll(query) {
        return this.modelManager.findAll(query);
    }

    /**
     * Removes a element by query
     * @param {Object} query example {_id: '55ss'}
     * @returns {Promise} request promise
     */
    remove(query) {
        return new Promise((response, reject) => {
            this.modelManager.findOne(query)
            .then((data) => {
                this.modelManager.remove(query)
                .then((affected) => {
                    response(data);
                })
                .catch((error) => {
                    reject(error);
                });
            })
            .catch((error) => {
                reject(error);
            });
        });
    };

    /**
     * Removes all elements.
     * @returns {Promise} request promise
     */
    removeAll() {
        return this.modelManager.removeAll({});
    }
}
