/**
 * Office.js
 *
 * @description :: Represents the office Proview currently serves
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

    prefix: {
      type: 'string',
      maxLength: 6,
      minLength: 2,
      alpha: true,
      required: false
    }
  },

  beforeCreate: function (office, callback) {
    if (!office.id) {
       office.id = uuid.v4();
     }
    callback();
  }
};

