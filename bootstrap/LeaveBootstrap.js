/**
 * LeaveBootstrap.js
 * Populate the leave schema
 */
module.exports = function (done) {
  require('fs').readFile(__dirname + '/../bootstrap/leave.json', function (err, data) {
    // exit if error in reading file
    if (err) {
      sails.log.error('Unable to read leave.json. %s', err);
      return done();
    }

    // parse in try-block to avoid crash during parsing error
    try {
      // convert default-data file to JSON
      data = JSON.parse(data);
    } catch (e) {
      // when parsing error, exit
      sails.log.error('Unable to parse leave.json. %s', e);
      return done();
    }

    Leave.count().then(function (count) {
      if (count === 0) {
        sails.log.info("Empty leave, populating it from json");

        Leave.create(data.leave).then(function (leaves) {
          if (leaves) {
            sails.log.info("Successfully inserted %d leave(s)", leaves.length);
          }
          done();
        }).catch(done);
      } else {
        done();
      }
    });
  });
};
