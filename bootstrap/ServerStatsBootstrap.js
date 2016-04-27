/**
 * Created by ajavonitalla on 4/23/2016.
 */
/**
 * ServerStatsBootstrap.js
 * Bootstrap module to log server version from package file
 */
module.exports = function (done) {
  require('fs').readFile('package.json', function (err, data) {
    // exit if error in reading file
    if (err) {
      sails.log.error('Unable to read package. %s', err);
      return done();
    }

    // parse in try-block to avoid crash during parsing error
    try {
      // convert package file to JSON
      data = JSON.parse(data);
    }
    catch (e) { // when parsing error, exit
      sails.log.error('Unable to parse package. %s', e);
      return done();
    }

    // all ok, so log the package version
    sails.log.info('server version: %s', data.version);
    done();
  });
};
