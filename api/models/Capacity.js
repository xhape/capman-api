/**
 * OfficeCapacity.js
 *
 * @description :: Proview Users can be assigned to multiple offices at a given time.
 * OfficeCapacity maps the Proview User capacity for an office.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var uuid = require('uuid');
module.exports = {

  attributes: {

    id: {
      type: 'string',
      primaryKey: true,
      unique: true,
      uuidv4: true
    },

    user: {
      model: 'user',
      required: true
    },

    office: {
      model: 'office',
      required: true
    },

    hours: {
      type: 'integer',
      defaultsTo: 0
    },

    type: {
      type: 'string',
      enum: ['Design', 'Audit', 'Render', 'Audio Visual'],
      required: true
    }
  },

  beforeCreate: function (officeCapacity, callback) {
    if (!officeCapacity.id) {
      officeCapacity.id = uuid.v4();
    }
    callback();
  }
};

