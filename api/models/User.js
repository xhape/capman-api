/**
 * User.js
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

    name: {
      type: 'string',
      required: true
    },

    office: {
      model: 'office',
      required: true
    },

    team: {
      type: 'string',
      required: false
    }
  },

  beforeCreate: function (user, callback) {
    if (!user.id) {
      user.id = uuid.v4();
    }
    callback();
  }
};

