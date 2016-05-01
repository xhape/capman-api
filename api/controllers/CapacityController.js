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

    //TODO return array of capacity instead of object
    //1. if office is not specified compute capacity of all offices
    //2. if type is ot specified compute for capacity off all type (except project)

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
      }, function(dbCallback) {
        if (req.param("date")) {
          query.date = req.param("date");
          Reservation.find(query).then(function (queryResult) {
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
        if (!userLeave) {
          //TODO consider HD leave
          capacity += officeCapacity.hours;
        }
      });
      result.capacity = capacity;

      var estimatedTaskHours = 0;
      if (results[2]) {
        _.forEach(results[2], function (task) {
          estimatedTaskHours += task.estimatedEffort;
        });

        result.estimatedTaskHours = estimatedTaskHours;
      }

      var reservedHours = 0;
      if (results[3]) {
        _.forEach(results[3], function (reservation) {
          reservedHours += reservation.reservedHours;
        });

        result.reservedHours = reservedHours;
      }

      result.remainingCapacity = capacity - estimatedTaskHours - reservedHours;
      return res.ok(result);
    });


  }
};

