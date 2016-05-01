/**
 * TaskBootstrap.js
 *
 * Populate the project and task schema
 */
module.exports = function (done) {
  require('fs').readFile(__dirname + '/../bootstrap/reservation.json', function (err, data) {
    // exit if error in reading file
    if (err) {
      sails.log.error('Unable to read reservation.json. %s', err);
      return done();
    }

    // parse in try-block to avoid crash during parsing error
    try {
      // convert default-data file to JSON
      data = JSON.parse(data);
    } catch (e) {
      // when parsing error, exit
      sails.log.error('Unable to parse reservation.json. %s', e);
      return done();
    }

    Reservation.count().then(function (count) {
      if (count === 0) {
        sails.log.info("Empty reservation, populating it from json");

        Reservation.create(data.reservation).then(function (reservations) {
          if (reservations) {
            sails.log.info("Successfully inserted %d reservation(s)", reservations.length);
          }
          done();
        }).catch(done);
      } else {
        done();
      }
    });
  });
};
