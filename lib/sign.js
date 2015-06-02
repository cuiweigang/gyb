var helper = require("./helper");
var config = require("./config");

/**
 * 验签操作
 * @param req  request
 * @param callback(result) result-> true or false
 * @constructor
 */
exports.Sign = function (req, callback) {

    /*
     * 时间戳+加APPKey+平台进行Md5加密，全部小写
     */

    var time = req.query.time;
    var platform = req.query.platform;
    var sign = req.query.sign;

    console.log(time, platform, sign);

    if (!(time && platform && sign)) {
        return callback(false);
    }

    var appKey = config.getAppKey(platform);

    var str = time + platform + appKey;
    var d = helper.md5(str);
    console.log(str, d);
    return callback(d == sign);
};