var helper = require("./helper");
var config = require("./config");


/**
 * 验签操作
 * @param req  request
 * @param callback(result) result-> true or false
 * @constructor
 */
exports.Sign = function (req, callback) {

    if (!config.Sign()) {
        callback(true);
    }

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

    var str = "platform=" + platform + "&time=" + time + "&appkey=" + appKey;
    var d = helper.md5(str);
    console.log(str, d);
    return callback(d == sign);
};

/**
 * 判断此页面是否不需要已登陆验证操作
 * @param path
 * @returns {boolean}
 * @constructor
 */
var IsNoLoginPage = function (path) {
    return config.NoLoginPages[path] != null;
};

/**
 * 用户登录
 * @param req request
 * @param callback callback(isSuccess,userInfo)
 * isSuccess:登录成功 ture，否则 false
 * @constructor
 */
exports.Login = function (req, callback) {

    var path = req.path.toLowerCase();
    if (IsNoLoginPage(path)) {
        return callback(true, null);
    }
    var user = {uid: 0, name: "cuiweigang", token: ""};
    return callback(false, user);
};