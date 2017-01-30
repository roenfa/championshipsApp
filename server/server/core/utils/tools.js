/**
 * Set of utilities
 */
export default class Tools {

    /**
     * Returns a clone of an object.
     * @param {Object} object to clone data.
     * @param  {Array} excludeList is array of params to exclude clone.
     * @returns {object} return a new object.
     */
    static cloneObject(object, excludeList) {
        var newObject = {},
            key;
        if (!excludeList) {
            excludeList = [];
        }
        for (key in object) {
            if (object.hasOwnProperty(key) && excludeList.indexOf(key) === -1) {
                newObject[key] = object[key];
            }
        }
        return newObject;
    }

    /**
     * Changes attribute _id to id.
     * @param {Object} data to change attribute.
     * @param {String} properties to iterate.
     * @returns {Object} new object with attribute changed.
     */
    static changeAttribute(data, properties) {
        const oldKey = '_id',
            newKey = 'id';
        var key, value, newData, params;
        newData = {};
        if (properties && typeof properties === 'string') {
            params = properties.split(' ');
        }
        for (key in data) {
            value = data[key];
            if (params && params.length > 0 && params.indexOf(key) !== -1) {
                params.splice(params.indexOf(key), 1);
                newData[key] = Tools.changeAttribute(value, null);
            } else if (key === oldKey) {
                newData[newKey] = value;
            } else {
                newData[key] = value;
            }
        }
        return newData;
    }

    /**
     * Changes attribute in collection.
     * @param {Array} data to iterate.
     * @param {String} properties to change.
     * @returns {Array} return a new Array.
     */
    static changeAttributeInArray(data, properties) {
        var collection = [];
        if (!data) {
            return null;
        }
        data.forEach((item) => {
            collection.push(Tools.changeAttribute(item, properties));
        });
        return collection;
    };
}