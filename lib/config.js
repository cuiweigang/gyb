var config = require("config");

var conf = {};

/**
 * 获取端口号
 * @returns {String} 返回端口号
 */
conf.port = function () {
    return config.get("port") || 3000;
};

/*数据库连接字符串*/
conf.dbConn = function () {
    return config.get("mongodb");
}

/**
 * 获取AppKey
 * @param platform
 */
conf.getAppKey = function (platform) {
    var appKeys = config.get("appKey");
    appKeys = appKeys || [];
    return appKeys[platform];
};

/**
 * 验签开关
 * @returns {*} ture:开启验签 false:关闭
 * @constructor
 */
conf.Sign = function () {
    return config.get("sign");
};

/**
 * 不需要登陆的授权的页面
 * @type {null}
 */
var noLoginPages = null;
function noLoginPage() {

    noLoginPages = new Array();
    var pages = config.get("noLoginPage");
    pages.forEach(function (item) {
        noLoginPages[item] = true;
    })
}

noLoginPage();
conf.NoLoginPages = noLoginPages;

module.exports = conf;