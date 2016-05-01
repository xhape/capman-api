/**
 * OfficeCapacity.js
 *
 * @description :: User capacity mapping
 *    User - The user to map for this capacity
 *    Office - The office to where this capacity is mapped
 *    Type - The type of task for this capacity
 *    Hours - Hours allotted for this capacity
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

    type: {
      type: 'string',
      enum: ['Design', 'Audit', 'Render', 'Audio Visual'],
      required: true
    },

    hours: {
      type: 'integer',
      defaultsTo: 0
    }
  },

  beforeCreate: function (officeCapacity, callback) {
    if (!officeCapacity.id) {
      officeCapacity.id = uuid.v4();
    }
    callback();
  }
};

