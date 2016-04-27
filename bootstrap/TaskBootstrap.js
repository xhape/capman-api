/**
 * TaskBootstrap.js
 *
 * Populate the project and task schema
 */
module.exports = function (done) {
  require('fs').readFile(__dirname + '/../bootstrap/task.json', function (err, data) {
    // exit if error in reading file
    if (err) {
      sails.log.error('Unable to read task.json. %s', err);
      return done();
    }

    // parse in try-block to avoid crash during parsing error
    try {
      // convert default-data file to JSON
      data = JSON.parse(data);
    } catch (e) {
      // when parsing error, exit
      sails.log.error('Unable to parse task.json. %s', e);
      return done();
    }

    Task.count().then(function (count) {
      if (count === 0) {
        sails.log.info("Empty task, populating it from json");

        //_.forEach(data.task, function (task) {
        //  async.waterfall([function(dbCallback){
        //
        //  }], done)
        //});

        Task.create(data.task).then(function (tasks) {
          if (tasks) {
            sails.log.info("Successfully inserted %d task(s)", tasks.length);
          }
          done();
        }).catch(done);
      } else {
        done();
      }
    });
  });
};
