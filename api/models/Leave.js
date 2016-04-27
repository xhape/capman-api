/**
 * Leave.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
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

    date: {
      type: 'date',
      required: true
    }
  },

  beforeCreate: function (leave, callback) {
    if (!leave.id) {
      leave.id = uuid.v4();
    }
    callback();
  }
};

