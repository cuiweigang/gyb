var log4js = require('log4js');

var log = function () {
    log4js.configure("config/log4js.json");
    var log = log4js.getLogger('gyb');
    return log;
};

module.exports = log();