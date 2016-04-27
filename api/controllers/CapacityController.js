/**
 * OfficeCapacityController
 *
 * @description :: Server-side logic for managing Officecapacities
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  /**
   * TODO support multiple date
   * @param req
   *   req.param("office") - the office to check the capacity from i.e. North bay, Southbay etc
   *   req.param("type") - the type of work i.e. Audit, Design, Render, Audio Visual
   *   req.param("date") - The date to check
   * @param res
   */
  findCapacity: function (req, res) {
    var query = {};
    if (req.param("office")) {
      query.office = req.param("office");
    }
    if (req.param("type")) {
      query.type = req.param("type");
    } else {
      //query all task type except Project because of the following reason
      //1. project hours is computed from subtask
      //2. error occurs when querying from task table since Project have no date
      query.type = {'!' : 'Project'};
    }

    async.parallel([
      function (dbCallback) {
        Capacity.find(query).then(function (queryResult) {
          dbCallback(null, queryResult);
        }).catch(dbCallback);
      }, function (dbCallback) {
        if (req.param("date")) {
          Leave.find({date: req.param("date")}).then(function (queryResult) {
            dbCallback(null, queryResult);
          }).catch(dbCallback);
        } else {
          dbCallback();
        }
      }, function (dbCallback) {
        if (req.param("date")) {
          query.date = req.param("date");
          Task.find(query).then(function (queryResult) {
            dbCallback(null, queryResult);
          }).catch(dbCallback);
        } else {
          dbCallback();
        }

      }], function (err, results) {
      if (err) {
        return res.serverError(err);
      }

      var result = query;

      //compute for capacity
      var capacity = 0;
      _.forEach(results[0], function (officeCapacity) {
        var userLeave;
        if (results[1]) {
          userLeave = _.find(results[1], function (leave) {
            return officeCapacity.user == leave.user;
          });
        }

        //exclude the capacity of the employee if he/she is on leave on that day
        //TODO consider HD leave
        if (!userLeave) {
          capacity += officeCapacity.hours;
        }
      });
      result.capacity = capacity;

      if (results[2]) {
        var reservedHours = 0;
        _.forEach(results[2], function (task) {
          reservedHours += task.hours;
        });

        result.remainingCapacity = capacity - reservedHours;
      }

      return res.ok(result);
    });


  }
};

