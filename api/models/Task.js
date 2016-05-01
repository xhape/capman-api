/**
 * Task.js
 *
 * @description :: A project is consist of multiple task
 *  name: "Short description of the task"
 *  description: "Additional information for the task"
 *  number: "Applicable for Projects types only. This will be supplied by the OWP designers/sales when making reservation for a project"
 *  scope: "The scope of work for this task. Additional information for PVS designers"
 *  subTasks: "Only applicable for Project type tasks"
 *  office: "Only applicable for Project type tasks"
 *  client: "Additional information. Should only be used for Project type tasks"
 *  estimatedEffort: "The estimated effort to perform this task. Supplied by OWP designer/sales. Effort is expressed in hours"
 *  actualEffort: "The actual hours spent on performing the task. Helpful when performing comparison between estimate and actual."
 *  assignee: "The PVS user who will work on this task. Can be applied on both project and subtask"
 *  date: "The date reserved for this task"
 *  createdBy: "The user who created this task"
 *  tyoe: "Task type"
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

    subTasks: {
      collection: 'task',
      required: false
    },

    office: {
      model: 'office',
      required: true
    },

    client: {
      model: 'client',
      required: false
    },

    estimatedEffort: {
      type: 'integer',
      required: false,
      defaultsTo: 0
    },

    actualEffort: {
      type: 'integer',
      required: false,
      defaultsTo: 0
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

