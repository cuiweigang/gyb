var crypto = require('crypto');

/**
 * 帮助类
 * @type {{md5: Function}}
 */
var helper = {
    md5: function (str) {
        var md5 = crypto.createHash('md5');
        md5.update(str);
        return md5.digest('hex');
    }
};

module.exports = helper;