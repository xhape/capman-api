/**
 * DefaultDataBootstrap.js
 * Populate the office, client, user, and capacity schema
 */
module.exports = function (done) {
  require('fs').readFile(__dirname + '/../bootstrap/default-data.json', function (err, data) {
    // exit if error in reading file
    if (err) {
      sails.log.error('Unable to read default-data.json. %s', err);
      return done();
    }

    // parse in try-block to avoid crash during parsing error
    try {
      // convert default-data file to JSON
      data = JSON.parse(data);
    } catch (e) {
      // when parsing error, exit
      sails.log.error('Unable to parse default-data.json. %s', e);
      return done();
    }

    //all ok, populate database

    async.series([function(dbCallback){
      Office.count().then(function (count) {
        if (count === 0) {
          sails.log.info("Empty office, populating it from json");

          Office.create(data.office).then(function (offices) {
            if (offices) {
              sails.log.info("Successfully created %d office(s)", offices.length);
            }
            dbCallback();
          }).catch(dbCallback);
        } else {
          dbCallback();
        }
      });
    }, function(dbCallback){
      Client.count().then(function (count) {
        if (count === 0) {
          sails.log.info("Empty client, populating it from json");

          Client.create(data.client).then(function (clients) {
            if (clients) {
              sails.log.info("Successfully created %d client(s)", clients.length);
            }

            dbCallback();
          }).catch(dbCallback);
        } else {
          dbCallback();
        }
      });
    }, function(dbCallback) {
      User.count().then(function (count) {
        if (count === 0) {
          sails.log.info("Empty users, populating it from json");

          User.create(data.user).then(function (users) {
            if (users) {
              sails.log.info("Successfully created %d user(s)", users.length);
            }

            dbCallback();
          }).catch(dbCallback);
        } else {
          dbCallback();
        }
      });
    }, function(dbCallback) {
      Capacity.count().then(function (count) {
        if (count === 0) {
          sails.log.info("Empty office-capacity mapping, populating it from json");

          Capacity.create(data.capacity).then(function (capacity) {
            if (capacity) {
              sails.log.info("Successfully created %d office-capacity mapping", capacity.length);
            }
            dbCallback();
          }).catch(dbCallback);
        } else {
          dbCallback();
        }
      });
    }], done);
  });
};
