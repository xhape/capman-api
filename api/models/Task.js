/**
 * Task.js
 *
 * @description :: A project is consist of multiple task
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
      required: false
    },

    description: {
      type: 'string',
      required: false
    },

    number: {
      type: 'string',
      required: false
    },

    scope: {
      type: 'string',
      required: false
    },

    client: {
      model: 'client',
      required: false
    },

    parent: {
      model: 'task',
      required: false
    },

    subTasks: {
      collection: 'task',
      required: false
    },

    office: {
      model: 'office',
      required: true
    },

    hours: {
      type: 'integer',
      required: true
    },

    assignee: {
      model: 'user',
      required: false
    },

    date: {
      type: 'date',
      required: false
    },

    createdBy: {
      model: 'user',
      required: true
    },

    type: {
      type: 'string',
      enum: ['Project', 'Design', 'Audit', 'Rendering', 'Audio Visual'],
      required: true
    }
  },

  beforeCreate: function (task, callback) {
    if (!task.id) {
      task.id = uuid.v4();
    }
    callback();
  }
};

