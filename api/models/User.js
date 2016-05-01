/**
 * User.js
 *
 * @description :: Represents all user of the system
 *  name: "User's name"
 *  office: "The office where this user belongs. Some functionalities is only available to users of that office"
 *  team: "The team where this user belongs. Some functionalities is only available to users of that team"
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

