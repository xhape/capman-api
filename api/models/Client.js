/**
 * Client.js
 *
 * @description :: Represents OWP client i.e. Google, Linkedin
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
      required: true,
      unique: true,
    }
  },

  beforeCreate: function (client, callback) {
    if (!client.id) {
    	client.id = uuid.v4();
    }
    callback();
  }
};

